import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { ordersCol } from "@/lib/db/collections";
import { jsonError } from "@/lib/http";
import { PayuNotConfiguredError } from "@/lib/payu";
import { settleOrder } from "@/lib/payments/settle";
import { checkRateLimit } from "@/lib/rateLimit";

/**
 * Lets the signed-in customer check (and, if PayU has completed it, finalise) their own order.
 * This is the recovery path for "paid but the redirect/webhook never arrived".
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id || session.user.role === "superadmin") {
      return jsonError("Please sign in.", 401);
    }

    const limit = await checkRateLimit(`payment_status_${session.user.id}`, 30, 5 * 60 * 1000);
    if (!limit.allowed) {
      return jsonError(`Too many requests. Retry in ${limit.retryAfterSeconds} seconds.`, 429);
    }

    const txnId = request.nextUrl.searchParams.get("txn") || "";
    if (!/^[A-Za-z0-9]{6,40}$/.test(txnId)) return jsonError("Invalid transaction.", 400);

    const orders = await ordersCol();
    const order = await orders.findOne({ txnId });
    // Same response for "not found" and "someone else's order" so txn ids cannot be probed.
    if (!order || order.accountId.toHexString() !== session.user.id) {
      return jsonError("Transaction not found.", 404);
    }

    const result = await settleOrder(txnId, "verify_api");
    return NextResponse.json({ success: true, outcome: result.outcome });
  } catch (error) {
    if (error instanceof PayuNotConfiguredError) {
      return jsonError("Payment verification is temporarily unavailable.", 503);
    }
    console.error("Payment status error:", error);
    return jsonError("Could not check the payment. Please try again.", 500);
  }
}
