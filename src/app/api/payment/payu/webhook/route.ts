import { NextRequest, NextResponse } from "next/server";
import { verifyResponseHash } from "@/lib/payu";
import { settleOrder } from "@/lib/payments/settle";

/**
 * Server-to-server notification from PayU. It covers the case where the customer pays but closes
 * the tab before the redirect. Accepts form-encoded or JSON bodies.
 */
export async function POST(request: NextRequest) {
  try {
    const data: Record<string, string> = {};
    const type = request.headers.get("content-type") || "";
    if (type.includes("application/json")) {
      const json = (await request.json()) as Record<string, unknown>;
      for (const [k, v] of Object.entries(json)) {
        if (v !== null && v !== undefined) data[k] = String(v);
      }
    } else {
      const form = await request.formData();
      form.forEach((value, key) => {
        if (typeof value === "string") data[key] = value;
      });
    }

    if (!data.txnid || !verifyResponseHash(data)) {
      console.warn("[payments] webhook: invalid hash for txnid", data.txnid);
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    await settleOrder(data.txnid, "webhook");
    return NextResponse.json({ ok: true });
  } catch (error) {
    // 500 makes PayU retry the notification, which is what we want for transient failures.
    console.error("[payments] webhook error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
