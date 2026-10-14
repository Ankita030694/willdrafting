import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { findAccountById } from "@/lib/accounts";
import { jsonError } from "@/lib/http";
import { PLANS } from "@/lib/plans";

export const dynamic = "force-dynamic";

/**
 * Direct check of the current authenticated user's payment and plan status from MongoDB.
 * Allows wizard steps (Step 12, Step 13, Step 14) and dashboard to stay 100% in sync with
 * verified database payment status even before JWT token refresh cycles.
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id || session.user.role === "superadmin") {
      return NextResponse.json({ success: true, authenticated: false, paymentStatus: "unpaid" });
    }

    const account = await findAccountById(session.user.id);
    if (!account) {
      return NextResponse.json({ success: true, authenticated: true, paymentStatus: "unpaid" });
    }

    if (account.kind === "user" && account.doc.paymentStatus === "paid") {
      const planId = account.doc.planId || "essential";
      return NextResponse.json({
        success: true,
        authenticated: true,
        paymentStatus: "paid",
        planId,
        planName: PLANS[planId]?.name || planId,
        paidAmount: PLANS[planId]?.priceRupees ?? 0,
        paidAt: account.doc.paidAt,
        willCredits: account.doc.willCredits ?? 1,
      });
    }

    return NextResponse.json({
      success: true,
      authenticated: true,
      paymentStatus: "unpaid",
      authStatus: account.doc.authStatus,
    });
  } catch (error) {
    console.error("user-status API error:", error);
    return jsonError("Failed to check status", 500);
  }
}
