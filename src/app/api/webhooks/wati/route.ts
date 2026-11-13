import { NextRequest, NextResponse } from "next/server";
import { leadsCol, whatsappMessagesCol } from "@/lib/db/collections";
import { jsonError } from "@/lib/http";
import { applyMessageFailure } from "@/lib/whatsapp/campaign";

export const dynamic = "force-dynamic";

/**
 * WATI webhook (configure in WATI → Webhooks with URL /api/webhooks/wati?token=$WATI_WEBHOOK_SECRET).
 * WATI does not sign webhooks, so the shared token in the URL is what authenticates the call.
 *
 * Handles: delivery / read / replied / failed status of our template messages, and inbound
 * messages (any reply hands the person to a human; STOP or "Stop promotions" opts them out).
 */

const STOP_PATTERN = /^\s*(stop|stop promotions|unsubscribe|opt ?out)\s*$/i;

type Payload = Record<string, unknown>;
const str = (v: unknown) => (typeof v === "string" ? v : v == null ? "" : String(v));

function last10(waId: string): string {
  return waId.replace(/\D/g, "").slice(-10);
}

export async function POST(request: NextRequest) {
  const secret = process.env.WATI_WEBHOOK_SECRET;
  if (!secret || request.nextUrl.searchParams.get("token") !== secret) {
    return jsonError("Unauthorized.", 401);
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return jsonError("Invalid JSON.", 400);
  }

  try {
    const event = str(body.eventType);
    const now = new Date();
    const messages = await whatsappMessagesCol();

    if (event === "message" || event === "messageReceived") {
      const phone = last10(str(body.waId));
      if (!phone) return NextResponse.json({ ok: true });
      const text = str(body.text) || str((body.buttonReply as Payload | undefined)?.text) || str((body.listReply as Payload | undefined)?.title);
      const leads = await leadsCol();
      const patch: Record<string, unknown> = { whatsappLastReplyAt: now, updatedAt: now };
      if (STOP_PATTERN.test(text)) Object.assign(patch, { unsubscribedAt: now, marketingConsent: false });
      await leads.updateMany({ phone }, { $set: patch });
      await messages.updateOne(
        { phone: `91${phone}`, mode: "live" },
        { $set: { status: "replied", repliedAt: now, updatedAt: now } },
        { sort: { createdAt: -1 } }
      );
      return NextResponse.json({ ok: true });
    }

    // Status events for messages we sent: match on WATI's id, else on the latest message to that number.
    const ids = [str(body.localMessageId), str(body.id), str(body.whatsappMessageId)].filter(Boolean);
    let message = ids.length ? await messages.findOne({ watiMessageId: { $in: ids } }) : null;
    if (!message && body.waId) {
      message = await messages.findOne(
        { phone: `91${last10(str(body.waId))}` },
        { sort: { createdAt: -1 } }
      );
    }
    if (!message) return NextResponse.json({ ok: true, matched: false });

    if (event.startsWith("templateMessageFailed")) {
      await applyMessageFailure(message, str(body.failedCode), str(body.failedDetail), now);
    } else if (event.startsWith("sentMessageDELIVERED")) {
      await messages.updateOne({ _id: message._id, status: { $in: ["sent", "sending"] } }, { $set: { status: "delivered", deliveredAt: now, updatedAt: now } });
    } else if (event.startsWith("sentMessageREAD")) {
      await messages.updateOne({ _id: message._id, status: { $in: ["sent", "sending", "delivered"] } }, { $set: { status: "read", readAt: now, updatedAt: now } });
    } else if (event.startsWith("sentMessageREPLIED")) {
      await messages.updateOne({ _id: message._id }, { $set: { status: "replied", repliedAt: now, updatedAt: now } });
      if (message.mode === "live") {
        const leads = await leadsCol();
        await leads.updateOne({ _id: message.accountId }, { $set: { whatsappLastReplyAt: now, updatedAt: now } });
      }
    }
    return NextResponse.json({ ok: true, matched: true });
  } catch (error) {
    console.error("[wati-webhook] failed:", error);
    return jsonError("Webhook processing failed.", 500);
  }
}
