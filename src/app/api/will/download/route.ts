import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { logFunnelEvent } from "@/lib/accounts";
import { jsonError } from "@/lib/http";
import { checkRateLimit } from "@/lib/rateLimit";
import { authorizeDownload, resolveSessionAccount } from "@/lib/wills";

export const dynamic = "force-dynamic";

/**
 * The single gate for printing / saving the Will as PDF. Succeeds only for the owner of a PAID,
 * VERIFIED and unchanged Will. Every grant is counted on the will document (audit trail).
 */
export async function POST(_request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id || session.user.role === "superadmin") return jsonError("Please sign in.", 401);
    const me = await resolveSessionAccount(session.user.id);
    if (!me) return jsonError("Please sign in.", 401);

    const limit = await checkRateLimit(`will_download_${me.userId.toString()}`, 30, 60 * 60 * 1000);
    if (!limit.allowed) return jsonError("Too many download attempts. Please try later.", 429);

    const check = await authorizeDownload(me);
    if (!check.ok) return jsonError(check.error, check.status);

    void logFunnelEvent(me.userId, me.email, "will_downloaded", { version: check.will.version });
    return NextResponse.json({ success: true, authorized: true });
  } catch (error) {
    console.error("POST /api/will/download error:", error);
    return jsonError("Could not authorise the download.", 500);
  }
}
