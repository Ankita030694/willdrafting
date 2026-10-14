import { convertLeadToUser, logFunnelEvent } from "@/lib/accounts";
import { getDb, leadsCol, ordersCol, usersCol } from "@/lib/db/collections";
import type { OrderDoc } from "@/lib/db/types";
import { sendPaymentReceiptEmail } from "@/lib/emailService";
import { PLANS, toRupeeString } from "@/lib/plans";
import { verifyPaymentWithPayu, type PayuTransactionResult } from "@/lib/payu";

export type SettleOutcome =
  | "paid"
  | "failed"
  | "pending"
  | "unknown_order"
  | "amount_mismatch";

export interface SettleResult {
  outcome: SettleOutcome;
  txnId: string;
}

const FAILED_STATUSES = new Set(["failure", "failed", "usercancelled", "dropped", "bounced", "cancelled"]);

async function nextInvoiceNo(): Promise<string> {
  const db = await getDb();
  const year = new Date().getFullYear();
  const res = await db
    .collection<{ _id: string; seq: number }>("counters")
    .findOneAndUpdate(
      { _id: `invoice_${year}` },
      { $inc: { seq: 1 } },
      { upsert: true, returnDocument: "after" }
    );
  return `WD-${year}-${String(res?.seq ?? 1).padStart(5, "0")}`;
}

/** Keeps the audit trail on the order, bounded so a flapping gateway cannot grow it forever. */
const MAX_ORDER_EVENTS = 25;

async function logPaymentEvent(
  order: OrderDoc,
  source: "redirect" | "webhook" | "verify_api",
  result: PayuTransactionResult
) {
  try {
    const col = await ordersCol();
    // Same notification delivered twice produces the same id, so it is stored once.
    const eventId = `${source}:${order.txnId}:${result.status}:${result.mihpayid ?? ""}`;
    await col.updateOne(
      { _id: order._id, "events.eventId": { $ne: eventId } },
      {
        $push: {
          events: {
            $each: [{ eventId, source, status: result.status, payload: result.raw, createdAt: new Date() }],
            $slice: -MAX_ORDER_EVENTS,
          },
        },
      }
    );
  } catch (err) {
    console.error("[payments] event log failed:", err);
  }
}

/**
 * Single place that decides whether an order is paid. It never trusts browser/webhook fields:
 * it asks PayU (verify_payment), checks the amount against OUR order, then fulfils exactly once.
 * Safe to call repeatedly and concurrently (redirect + webhook + manual retry).
 */
export async function settleOrder(
  txnId: string,
  source: "redirect" | "webhook" | "verify_api"
): Promise<SettleResult> {
  const orders = await ordersCol();
  const order = await orders.findOne({ txnId });
  if (!order) return { outcome: "unknown_order", txnId };
  if (order.status === "paid") return { outcome: "paid", txnId };

  const result = await verifyPaymentWithPayu(txnId);
  await logPaymentEvent(order, source, result);

  // ---- success ----
  if (result.found && result.status === "success") {
    if (result.amount === null || Math.abs(result.amount - order.amount) > 0.005) {
      console.error(
        `[payments] AMOUNT MISMATCH for ${txnId}: expected ₹${order.amount}, PayU says ₹${result.amount}. Manual review needed.`
      );
      await orders.updateOne(
        { _id: order._id, status: { $ne: "paid" } },
        { $set: { status: "pending", failureReason: "AMOUNT_MISMATCH: manual review", updatedAt: new Date() } }
      );
      return { outcome: "amount_mismatch", txnId };
    }

    // Atomic claim so only one concurrent caller fulfils the order.
    const now = new Date();
    const claimed = await orders.findOneAndUpdate(
      { _id: order._id, status: { $ne: "paid" } },
      {
        $set: {
          status: "paid",
          paidAt: now,
          gatewayPaymentId: result.mihpayid,
          failureReason: null,
          updatedAt: now,
        },
      },
      { returnDocument: "before" }
    );
    if (!claimed) return { outcome: "paid", txnId };

    try {
      if (order.accountKind === "user") {
        const users = await usersCol();
        await users.updateOne(
          { _id: order.accountId },
          {
            $set: {
              planId: order.planId,
              lastOrderId: order._id,
              updatedAt: new Date(),
            },
            $inc: { willCredits: 1 },
          }
        );
      } else {
        await convertLeadToUser(order.accountId, {
          planId: order.planId,
          orderId: order._id,
          credits: 1,
        });
      }
      const invoiceNo = await nextInvoiceNo();
      await orders.updateOne({ _id: order._id }, { $set: { invoiceNo, updatedAt: new Date() } });
      await logFunnelEvent(order.accountId, order.email, "payment_succeeded", {
        planId: order.planId,
        amount: order.amount,
        txnId,
      });
      // Receipt is best-effort: a mail outage must never undo or block a completed payment.
      sendPaymentReceiptEmail({
        email: order.email,
        planName: PLANS[order.planId].name,
        amountRupees: toRupeeString(order.amount),
        txnId,
        invoiceNo,
      }).catch((mailErr) => console.error("[payments] receipt email failed:", mailErr));
    } catch (err) {
      // Money is captured but fulfilment failed: reopen the order so the next callback / retry
      // completes it instead of leaving the customer paid-but-locked.
      console.error(`[payments] Fulfilment failed for ${txnId}, reopening order:`, err);
      await orders.updateOne(
        { _id: order._id },
        { $set: { status: "pending", failureReason: "FULFILMENT_ERROR: retry", updatedAt: new Date() } }
      );
      throw err;
    }
    return { outcome: "paid", txnId };
  }

  // ---- failure ----
  if (result.found && FAILED_STATUSES.has(result.status)) {
    const failed = await orders.findOneAndUpdate(
      { _id: order._id, status: { $in: ["created", "pending"] } },
      {
        $set: {
          status: "failed",
          failureReason: String(result.raw.error_Message ?? result.raw.field9 ?? result.status).slice(0, 300),
          updatedAt: new Date(),
        },
      },
      { returnDocument: "before" }
    );
    if (failed) {
      const leads = await leadsCol();
      await leads.updateOne(
        { _id: order.accountId },
        { $set: { status: "payment_failed", updatedAt: new Date() } }
      );
      await logFunnelEvent(order.accountId, order.email, "payment_failed", { txnId });
    }
    return { outcome: "failed", txnId };
  }

  // ---- not completed yet (pending / user left the page) ----
  if (order.status === "created") {
    await orders.updateOne(
      { _id: order._id, status: "created" },
      { $set: { status: "pending", updatedAt: new Date() } }
    );
  }
  return { outcome: "pending", txnId };
}
