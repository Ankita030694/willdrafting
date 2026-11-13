/**
 * Thin client for WATI's "send template message" API.
 *
 * Env: WATI_API_ENDPOINT (e.g. https://live-mt-server.wati.io/<tenantId>, with or without /api/v1)
 *      WATI_ACCESS_TOKEN (from WATI → API Docs; with or without the "Bearer " prefix)
 */

export type WatiSendResult =
  | { ok: true; messageId: string | null; raw: string }
  | { ok: false; error: string; raw: string; retryable: boolean };

/** Normalises an Indian mobile number to WhatsApp's 91XXXXXXXXXX form; null when it isn't one. */
export function toWhatsAppNumber(phone: string | null | undefined): string | null {
  const digits = String(phone ?? "").replace(/\D/g, "");
  const local = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
  return /^[6-9]\d{9}$/.test(local) ? `91${local}` : null;
}

function watiConfig(): { base: string; token: string } | null {
  const endpoint = process.env.WATI_API_ENDPOINT?.trim();
  const token = process.env.WATI_ACCESS_TOKEN?.trim().replace(/^Bearer\s+/i, "");
  if (!endpoint || !token) return null;
  return { base: endpoint.replace(/\/+$/, "").replace(/\/api\/v\d+$/, ""), token };
}

export function isWatiConfigured(): boolean {
  return watiConfig() !== null;
}

/** WATI's response nests the id that its status webhooks later quote; find it wherever it sits. */
function findMessageId(data: unknown): string | null {
  const keys = ["localMessageId", "whatsappMessageId"];
  const queue: unknown[] = [data];
  while (queue.length) {
    const node = queue.shift();
    if (!node || typeof node !== "object") continue;
    for (const key of keys) {
      const v = (node as Record<string, unknown>)[key];
      if (typeof v === "string" && v) return v;
    }
    queue.push(...Object.values(node as Record<string, unknown>));
  }
  return null;
}

export async function sendWatiTemplate(input: {
  whatsappNumber: string;
  template: string;
  broadcastName: string;
  params: Record<string, string>;
}): Promise<WatiSendResult> {
  const config = watiConfig();
  if (!config) return { ok: false, error: "WATI is not configured.", raw: "", retryable: false };

  const url = `${config.base}/api/v1/sendTemplateMessage?whatsappNumber=${encodeURIComponent(input.whatsappNumber)}`;
  let raw = "";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${config.token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        template_name: input.template,
        broadcast_name: input.broadcastName,
        parameters: Object.entries(input.params).map(([name, value]) => ({ name, value })),
      }),
      signal: AbortSignal.timeout(20_000),
    });
    const text = await res.text();
    raw = text.slice(0, 4000);
    if (!res.ok) {
      return { ok: false, error: `WATI HTTP ${res.status}`, raw, retryable: res.status >= 500 || res.status === 429 };
    }
    let data: Record<string, unknown>;
    try {
      data = JSON.parse(text || "{}") as Record<string, unknown>;
    } catch {
      // HTTP 200 means WATI took the message; never retry it (that could send it twice).
      return { ok: true, messageId: null, raw };
    }
    // WATI answers 200 with `result: false` when it refuses the request (bad template, bad number…).
    if (data.result === false) {
      return { ok: false, error: String(data.info ?? data.message ?? "WATI rejected the message."), raw, retryable: false };
    }
    return { ok: true, messageId: findMessageId(data), raw };
  } catch (err) {
    return { ok: false, error: `WATI request failed: ${String(err).slice(0, 200)}`, raw, retryable: true };
  }
}
