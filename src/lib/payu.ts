import crypto from "crypto";
import { toRupeeString, parseRupees } from "@/lib/plans";

/**
 * PayU hosted checkout helpers. Hash formats follow the official PayU docs:
 *  - request : sha512(key|txnid|amount|productinfo|firstname|email|udf1..udf5||||||SALT)
 *  - response: sha512([additional_charges|]SALT|status||||||udf5..udf1|email|firstname|productinfo|amount|txnid|key)
 *  - verify  : sha512(key|verify_payment|txnid|SALT)
 */

export interface PayuConfig {
  key: string;
  salt: string;
  checkoutUrl: string;
  verifyUrl: string;
  env: "test" | "live";
}

export class PayuNotConfiguredError extends Error {
  constructor() {
    super("PayU is not configured (set PAYU_API_KEY and PAYU_SALT_32BIT).");
    this.name = "PayuNotConfiguredError";
  }
}

export function getPayuConfig(): PayuConfig {
  const key = process.env.PAYU_KEY || process.env.PAYU_API_KEY;
  // Classic sha512 checkout uses the standard (32-bit) salt, not the 256-bit one.
  const salt = process.env.PAYU_SALT || process.env.PAYU_SALT_32BIT;
  if (!key || !salt) throw new PayuNotConfiguredError();

  const env = process.env.PAYU_ENV === "live" ? "live" : "test";
  return {
    key,
    salt,
    env,
    checkoutUrl:
      env === "live" ? "https://secure.payu.in/_payment" : "https://test.payu.in/_payment",
    verifyUrl:
      env === "live"
        ? "https://info.payu.in/merchant/postservice.php?form=2"
        : "https://test.payu.in/merchant/postservice?form=2",
  };
}

function sha512(input: string): string {
  return crypto.createHash("sha512").update(input).digest("hex");
}

export interface CheckoutInput {
  txnId: string;
  amount: number;
  productInfo: string;
  firstName: string;
  email: string;
  phone: string;
  /** Our order _id, echoed back by PayU in udf1. */
  orderRef: string;
  successUrl: string;
  failureUrl: string;
}

/** Builds the exact set of fields the browser must POST to PayU's checkout URL. */
export function buildCheckoutFields(input: CheckoutInput): { action: string; fields: Record<string, string> } {
  const cfg = getPayuConfig();
  const amount = toRupeeString(input.amount);
  const udf = [input.orderRef, "", "", "", ""];

  const hashString = [
    cfg.key,
    input.txnId,
    amount,
    input.productInfo,
    input.firstName,
    input.email,
    ...udf,
    "", "", "", "", "", // udf6-udf10 (unused)
    cfg.salt,
  ].join("|");

  return {
    action: cfg.checkoutUrl,
    fields: {
      key: cfg.key,
      txnid: input.txnId,
      amount,
      productinfo: input.productInfo,
      firstname: input.firstName,
      email: input.email,
      phone: input.phone,
      surl: input.successUrl,
      furl: input.failureUrl,
      udf1: udf[0],
      hash: sha512(hashString),
    },
  };
}

function field(data: Record<string, string>, name: string): string {
  return data[name] ?? "";
}

/** Verifies the `hash` PayU sends with a redirect / webhook. Constant-time compare. */
export function verifyResponseHash(data: Record<string, string>): boolean {
  const cfg = getPayuConfig();
  const received = field(data, "hash").toLowerCase();
  if (!received) return false;

  const parts = [
    cfg.salt,
    field(data, "status"),
    "", "", "", "", "", // udf10-udf6
    field(data, "udf5"),
    field(data, "udf4"),
    field(data, "udf3"),
    field(data, "udf2"),
    field(data, "udf1"),
    field(data, "email"),
    field(data, "firstname"),
    field(data, "productinfo"),
    field(data, "amount"),
    field(data, "txnid"),
    cfg.key,
  ];
  // PayU prepends additional charges to the sequence when it applied any.
  if (field(data, "additionalCharges")) parts.unshift(field(data, "additionalCharges"));
  else if (field(data, "additional_charges")) parts.unshift(field(data, "additional_charges"));

  const expected = sha512(parts.join("|"));
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(received, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export interface PayuTransactionResult {
  found: boolean;
  /** PayU's status for the transaction: "success", "failure", "pending", ... */
  status: string;
  unmappedStatus: string;
  amount: number | null;
  mihpayid: string | null;
  raw: Record<string, unknown>;
}

/**
 * Source of truth for a payment: asks PayU directly instead of trusting browser-posted fields.
 */
export async function verifyPaymentWithPayu(txnId: string): Promise<PayuTransactionResult> {
  const cfg = getPayuConfig();
  const command = "verify_payment";
  const hash = sha512([cfg.key, command, txnId, cfg.salt].join("|"));

  const res = await fetch(cfg.verifyUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ key: cfg.key, command, var1: txnId, hash }).toString(),
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new Error(`PayU verify_payment HTTP ${res.status}`);

  const json = (await res.json()) as {
    status?: number | string;
    transaction_details?: Record<string, Record<string, unknown> | string>;
  };

  const detail = json.transaction_details?.[txnId];
  if (!detail || typeof detail !== "object") {
    return { found: false, status: "notfound", unmappedStatus: "", amount: null, mihpayid: null, raw: { ...json } };
  }

  const amountRaw = detail.transaction_amount ?? detail.amt ?? detail.amount;
  return {
    found: true,
    status: String(detail.status ?? "").toLowerCase(),
    unmappedStatus: String(detail.unmappedstatus ?? "").toLowerCase(),
    amount: amountRaw !== undefined ? parseRupees(String(amountRaw)) : null,
    mihpayid: detail.mihpayid ? String(detail.mihpayid) : null,
    raw: detail,
  };
}
