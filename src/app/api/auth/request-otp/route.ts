import { NextRequest, NextResponse } from "next/server";
import { isValidEmail, normalizeEmail, normalizePhone, cleanName } from "@/lib/authValidation";
import { PLAN_IDS, type PlanId } from "@/lib/authTypes";
import { sendLoginOtpEmail } from "@/lib/emailService";
import { getClientIp, jsonError, readJson } from "@/lib/http";
import { issueLoginOtp } from "@/lib/otp";
import { checkRateLimit } from "@/lib/rateLimit";

/**
 * Starts passwordless sign-in / sign-up. Always answers the same way whether or not the email
 * already has an account, so it cannot be used to discover who is a customer.
 */
export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const ipLimit = await checkRateLimit(`otp_ip_${ip}`, 15, 15 * 60 * 1000);
    if (!ipLimit.allowed) {
      return jsonError(
        `Too many attempts. Please retry in ${ipLimit.retryAfterSeconds} seconds.`,
        429
      );
    }

    const body = await readJson(request);
    const email = normalizeEmail(body.email);
    if (!email || !isValidEmail(email)) {
      return jsonError("Please enter a valid email address.", 400);
    }

    const emailLimit = await checkRateLimit(`otp_email_${email}`, 6, 60 * 60 * 1000);
    if (!emailLimit.allowed) {
      return jsonError(
        `Too many codes requested for this email. Please retry in ${emailLimit.retryAfterSeconds} seconds.`,
        429
      );
    }

    // Optional sign-up details (only applied if this email has no account yet).
    const name = cleanName(body.name);
    let phone: string | undefined;
    if (body.phone !== undefined && String(body.phone).trim() !== "") {
      const cleaned = normalizePhone(body.phone);
      if (!cleaned) {
        return jsonError("Please enter a valid 10-digit Indian mobile number.", 400);
      }
      phone = cleaned;
    }
    const interestedPlanId = PLAN_IDS.includes(body.interestedPlanId as PlanId)
      ? (body.interestedPlanId as PlanId)
      : undefined;

    const issued = await issueLoginOtp(email, {
      ...(name ? { name } : {}),
      ...(phone ? { phone } : {}),
      ...(interestedPlanId ? { interestedPlanId } : {}),
    });

    if (!issued.ok) {
      return jsonError(
        `A code was already sent. You can request another in ${issued.retryAfterSeconds} seconds.`,
        429,
        { retryAfterSeconds: issued.retryAfterSeconds }
      );
    }

    await sendLoginOtpEmail(email, issued.code, name || undefined);

    return NextResponse.json({
      success: true,
      message: "We have emailed you a 6-digit code. It expires in 10 minutes.",
    });
  } catch (error) {
    console.error("Request OTP error:", error);
    return jsonError("We could not send the code. Please try again.", 500);
  }
}
