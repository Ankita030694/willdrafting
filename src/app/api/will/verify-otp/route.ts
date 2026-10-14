import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { logFunnelEvent } from "@/lib/accounts";
import { jsonError, readJson } from "@/lib/http";
import { verifyWillVerificationOtp } from "@/lib/otp";
import { checkRateLimit } from "@/lib/rateLimit";
import { assessWillCompleteness, getWill, markWillVerified, resolveSessionAccount } from "@/lib/wills";

export const dynamic = "force-dynamic";

/**
 * Verifies the emailed code for the SIGNED-IN account only, re-checks completeness on the server,
 * then marks the Will verified and LOCKS it (immutable until explicitly unlocked).
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id || session.user.role === "superadmin") return jsonError("Please sign in.", 401);
    const me = await resolveSessionAccount(session.user.id);
    if (!me) return jsonError("Please sign in.", 401);

    const limit = await checkRateLimit(`will_verify_try_${me.userId.toString()}`, 20, 15 * 60 * 1000);
    if (!limit.allowed) {
      return jsonError(`Too many attempts. Please retry in ${limit.retryAfterSeconds} seconds.`, 429);
    }

    const body = await readJson(request);
    const verifiedViaLoginOtp = body.verifiedViaLoginOtp === true;
    const code = String(body.code ?? "").trim();
    if (!verifiedViaLoginOtp && !/^\d{6}$/.test(code)) {
      return jsonError("Please enter the complete 6-digit code received on your email.", 400);
    }

    const will = await getWill(me.userId);
    if (!will) return jsonError("No saved Will was found.", 404);

    // Check completeness BEFORE burning the code, so a user is never locked out of a fixable error.
    const completeness = assessWillCompleteness(will.state);
    if (!completeness.ok) {
      return jsonError("Some essential details are still missing.", 422, { code: "INCOMPLETE", problems: completeness.problems });
    }

    if (verifiedViaLoginOtp) {
      if (me.account.doc.authStatus !== "verified") {
        return jsonError("Email verification required before locking Will details.", 403);
      }
    } else {
      const result = await verifyWillVerificationOtp(me.email, code);
      if (!result.ok) {
        return jsonError("Invalid or expired verification code. Please check your email or request a new code.", 400);
      }
    }

    const verified = await markWillVerified(me.userId);
    if (!verified) {
      return jsonError("Your Will is already verified and locked.", 409);
    }
    void logFunnelEvent(me.userId, me.email, "will_verified", { version: verified.version });

    return NextResponse.json({
      success: true,
      verified: true,
      locked: true,
      verifiedAt: verified.detailsVerifiedAt?.toISOString(),
      message: "All Will details verified and permanently locked!",
    });
  } catch (error) {
    console.error("Verify will OTP error:", error);
    return jsonError("Unable to verify the code. Please try again.", 500);
  }
}
