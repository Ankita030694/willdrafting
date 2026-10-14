import { NextRequest, NextResponse } from "next/server";
import { getPublicOrigin } from "@/lib/http";
import { verifyResponseHash } from "@/lib/payu";
import { settleOrder } from "@/lib/payments/settle";

function redirectTo(request: NextRequest, query: string, success = false) {
  const base = getPublicOrigin(request);
  // On success redirect to Step 14 (Final Will); all other outcomes go to dashboard.
  const path = success ? `/start/14?${query}` : `/start/dashboard?${query}`;
  // 303 turns PayU's cross-site POST into a normal GET so the session cookie is sent again.
  return NextResponse.redirect(`${base}${path}`, 303);
}

/**
 * Browser lands here after PayU checkout (success OR failure; both surl and furl point here).
 * This is cross-site, so the session cookie is not available: we identify the order purely by
 * the signed txnid and let settleOrder confirm the real outcome directly with PayU.
 */
export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const data: Record<string, string> = {};
    form.forEach((value, key) => {
      if (typeof value === "string") data[key] = value;
    });

    // Reject forged posts before spending an outbound API call.
    if (!verifyResponseHash(data)) {
      console.warn("[payments] return: invalid hash for txnid", data.txnid);
      return redirectTo(request, "payment=invalid");
    }

    const result = await settleOrder(data.txnid, "redirect");
    const isPaid = result.outcome === "paid";
    const status = isPaid ? "success" : result.outcome === "failed" ? "failed" : "pending";
    return redirectTo(request, `payment=${status}&txn=${encodeURIComponent(data.txnid)}`, isPaid);
  } catch (error) {
    console.error("[payments] return handler error:", error);
    return redirectTo(request, "payment=pending");
  }
}
