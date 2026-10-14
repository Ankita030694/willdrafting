import crypto from "crypto";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { findAccountById, logFunnelEvent, updateAccount } from "@/lib/accounts";
import { PLAN_IDS, type PlanId } from "@/lib/authTypes";
import { ordersCol } from "@/lib/db/collections";
import { getPublicOrigin, jsonError, readJson } from "@/lib/http";
import { PLANS, quotePlan, quotePlanUpgrade } from "@/lib/plans";
import { buildCheckoutFields, PayuNotConfiguredError } from "@/lib/payu";
import { checkRateLimit } from "@/lib/rateLimit";

function appBaseUrl(request: NextRequest): string {
  return getPublicOrigin(request);
}

/**
 * Creates a payment order for the signed-in lead and returns the signed fields the browser
 * must POST to PayU. The price is derived from the plan id on the server, never from the client.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id || session.user.role === "superadmin") {
      return jsonError("Please sign in to continue.", 401);
    }

    const limit = await checkRateLimit(`create_order_${session.user.id}`, 10, 10 * 60 * 1000);
    if (!limit.allowed) {
      return jsonError(`Too many attempts. Please retry in ${limit.retryAfterSeconds} seconds.`, 429);
    }

    const body = await readJson(request);
    const planId = body.planId as PlanId;
    if (!PLAN_IDS.includes(planId)) return jsonError("Invalid plan selected.", 400);

    const account = await findAccountById(session.user.id);
    if (!account) return jsonError("Account not found. Please sign in again.", 404);

    let orderKind: "first_purchase" | "plan_upgrade" = "first_purchase";
    let baseAmount: number;
    let discount = 0;
    let amount: number;
    const accountDoc = account.doc;

    if (account.kind === "user") {
      const user = account.doc;
      const currentPlan = user.planId;
      const upgrade = quotePlanUpgrade(currentPlan, planId);
      if (!upgrade) {
        return jsonError(`Your account is already on ${PLANS[currentPlan]?.name || currentPlan}. Please select a higher tier plan to upgrade.`, 400);
      }
      orderKind = "plan_upgrade";
      baseAmount = upgrade.upgradeAmount;
      amount = upgrade.upgradeAmount;
    } else {
      const lead = accountDoc;
      if (lead.authStatus !== "verified") {
        return jsonError("Please verify your email before paying.", 403, { needsVerification: true });
      }
      if (!lead.email) return jsonError("Please add an email address before paying.", 400);
      if (!lead.phone) {
        return jsonError("Please add your mobile number before paying.", 400, { needsPhone: true });
      }

      const quote = quotePlan(planId);
      baseAmount = quote.baseAmount;
      discount = quote.discount;
      amount = quote.amount;
    }

    const now = new Date();
    const order = {
      _id: new ObjectId(),
      txnId: `WD${crypto.randomBytes(7).toString("hex")}`,
      accountId: accountDoc._id,
      accountKind: account.kind,
      email: accountDoc.email,
      planId,
      kind: orderKind,
      baseAmount,
      discount,
      amount,
      couponCode: null,
      status: "created" as const,
      gateway: "payu" as const,
      createdAt: now,
      updatedAt: now,
    };

    // Build (and validate PayU config) before persisting so a misconfiguration leaves no orphan order.
    const base = appBaseUrl(request);
    const checkout = buildCheckoutFields({
      txnId: order.txnId,
      amount: order.amount,
      productInfo: (orderKind === "plan_upgrade"
        ? `WillDrafting Upgrade to ${PLANS[planId].name}`
        : `WillDrafting ${PLANS[planId].name}`).slice(0, 100),
      firstName: (accountDoc.name || "Customer").replace(/[^\p{L}\p{N} .'-]/gu, "").slice(0, 60) || "Customer",
      email: accountDoc.email,
      phone: accountDoc.phone || "9999999999",
      orderRef: order._id.toHexString(),
      successUrl: `${base}/api/payment/payu/return`,
      failureUrl: `${base}/api/payment/payu/return`,
    });

    const orders = await ordersCol();
    await orders.insertOne(order);

    await updateAccount(account, {
      status: "checkout_started",
      interestedPlanId: planId,
      lastCheckoutAt: now,
    });
    await logFunnelEvent(accountDoc._id, accountDoc.email, "checkout_started", {
      planId,
      amount: order.amount,
      txnId: order.txnId,
      orderKind,
    });

    return NextResponse.json({ success: true, txnId: order.txnId, ...checkout });
  } catch (error) {
    if (error instanceof PayuNotConfiguredError) {
      console.error("[payments]", error.message);
      return jsonError("Online payments are temporarily unavailable. Please try again shortly.", 503);
    }
    console.error("Create order error:", error);
    return jsonError("Could not start the payment. Please try again.", 500);
  }
}
