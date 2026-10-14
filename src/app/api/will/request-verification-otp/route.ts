import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { cleanName } from "@/lib/authValidation";
import { sendWillVerificationOtpEmail } from "@/lib/emailService";
import { getClientIp, jsonError } from "@/lib/http";
import { issueWillVerificationOtp } from "@/lib/otp";
import { checkRateLimit } from "@/lib/rateLimit";
import { assessWillCompleteness, getWill, resolveSessionAccount } from "@/lib/wills";

export const dynamic = "force-dynamic";

/**
 * Emails a 6-digit code to the SIGNED-IN account's own email (never an address from the request)
 * after the server has confirmed the saved Will is complete and the customer has paid.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id || session.user.role === "superadmin") return jsonError("Please sign in.", 401);
    const me = await resolveSessionAccount(session.user.id);
    if (!me) return jsonError("Please sign in.", 401);

    const ip = getClientIp(request);
    const ipLimit = await checkRateLimit(`will_verify_ip_${ip}`, 15, 15 * 60 * 1000);
    if (!ipLimit.allowed) {
      return jsonError(`Too many attempts. Please retry in ${ipLimit.retryAfterSeconds} seconds.`, 429);
    }
    const emailLimit = await checkRateLimit(`will_verify_email_${me.email}`, 10, 60 * 60 * 1000);
    if (!emailLimit.allowed) {
      return jsonError(`Too many codes requested. Please retry in ${emailLimit.retryAfterSeconds} seconds.`, 429);
    }

    const will = await getWill(me.userId);
    if (!will) {
      return jsonError("Your Will has not been saved yet. Please wait a moment and try again.", 409, { code: "NOT_SAVED" });
    }
    if (will.detailsVerified || will.lockedAt) {
      return jsonError("Your Will details are already verified and permanently locked.", 409, { code: "ALREADY_VERIFIED" });
    }

    const completeness = assessWillCompleteness(will.state);
    if (!completeness.ok) {
      return jsonError("Some essential details are still missing.", 422, { code: "INCOMPLETE", problems: completeness.problems });
    }

    const issued = await issueWillVerificationOtp(me.email);
    if (!issued.ok) {
      return jsonError(
        `A code was recently sent. You can request a new code in ${issued.retryAfterSeconds} seconds.`,
        429,
        { retryAfterSeconds: issued.retryAfterSeconds }
      );
    }

    await sendWillVerificationOtpEmail(me.email, issued.code, cleanName(me.account.doc.name) || undefined);

    // The code is only echoed back when a developer explicitly opts in locally.
    const echo = process.env.NODE_ENV !== "production" && process.env.EXPOSE_DEV_OTP === "true";
    return NextResponse.json({
      success: true,
      email: me.email,
      message: `A 6-digit verification code has been sent to ${me.email}.`,
      ...(echo ? { devCode: issued.code } : {}),
    });
  } catch (error) {
    console.error("Request will verification OTP error:", error);
    return jsonError("Unable to send verification code. Please try again.", 500);
  }
}
