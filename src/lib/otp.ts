import crypto from "crypto";
import type { Collection, Document, ObjectId } from "mongodb";
import { ensureLead, findAccountByEmail, type Account } from "@/lib/accounts";
import { leadsCol, usersCol } from "@/lib/db/collections";
import type { OtpState } from "@/lib/db/types";
import type { PlanId } from "@/lib/authTypes";

export const OTP_TTL_MS = 10 * 60 * 1000;
export const OTP_RESEND_COOLDOWN_MS = 45 * 1000;
export const OTP_MAX_ATTEMPTS = 5;

function otpSecret(): string {
  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("AUTH_SECRET must be set to hash login codes.");
    }
    return "dev-only-otp-secret";
  }
  return secret;
}

/** Keyed hash, so a leaked database cannot be used to brute-force the 6 digit codes offline. */
function hashCode(email: string, code: string): string {
  return crypto.createHmac("sha256", otpSecret()).update(`${email}:${code}`).digest("hex");
}

function safeEqualHex(a: string, b: string): boolean {
  const ab = Buffer.from(a, "hex");
  const bb = Buffer.from(b, "hex");
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}

export type IssueOtpResult =
  | { ok: true; code: string }
  | { ok: false; retryAfterSeconds: number };

export type VerifyOtpResult = { ok: true } | { ok: false };

type OtpField = "loginOtp" | "willOtp";

/** The OTP lives on the account document itself (leads or users); no separate collection. */
async function accountCollection(account: Account): Promise<Collection<Document>> {
  const col = account.kind === "user" ? await usersCol() : await leadsCol();
  return col as unknown as Collection<Document>;
}

async function issueOtpFor(account: Account, field: OtpField, hashKey: string): Promise<IssueOtpResult> {
  const now = new Date();
  const existing = (account.doc as { [k in OtpField]?: OtpState | null })[field];
  if (existing) {
    const waitMs = new Date(existing.lastSentAt).getTime() + OTP_RESEND_COOLDOWN_MS - now.getTime();
    if (waitMs > 0) return { ok: false, retryAfterSeconds: Math.ceil(waitMs / 1000) };
  }

  const code = String(crypto.randomInt(0, 1_000_000)).padStart(6, "0");
  const state: OtpState = {
    codeHash: hashCode(hashKey, code),
    attempts: 0,
    lastSentAt: now,
    expiresAt: new Date(now.getTime() + OTP_TTL_MS),
  };
  const col = await accountCollection(account);
  await col.updateOne({ _id: account.doc._id as ObjectId }, { $set: { [field]: state, updatedAt: now } });
  return { ok: true, code };
}

/**
 * Checks a code. Each wrong guess burns an attempt (atomically), and a correct code can be used
 * exactly once. Every failure looks the same to the caller on purpose.
 */
async function verifyOtpFor(
  email: string,
  field: OtpField,
  hashKey: string,
  code: string
): Promise<VerifyOtpResult> {
  if (!/^\d{6}$/.test(code)) return { ok: false };
  const account = await findAccountByEmail(email);
  if (!account) return { ok: false };

  const col = await accountCollection(account);
  const _id = account.doc._id;
  const doc = await col.findOneAndUpdate(
    { _id, [`${field}.expiresAt`]: { $gt: new Date() }, [`${field}.attempts`]: { $lt: OTP_MAX_ATTEMPTS } },
    { $inc: { [`${field}.attempts`]: 1 } },
    { returnDocument: "after" }
  );
  const state = doc?.[field] as OtpState | undefined;
  if (!doc || !state) return { ok: false };

  if (!safeEqualHex(state.codeHash, hashCode(hashKey, code))) return { ok: false };

  // Single use: only the request that actually clears the code may proceed.
  const cleared = await col.updateOne({ _id, [`${field}.codeHash`]: state.codeHash }, { $unset: { [field]: "" } });
  if (cleared.modifiedCount !== 1) return { ok: false };
  return { ok: true };
}

export interface LoginSignupDetails {
  name?: string;
  phone?: string;
  interestedPlanId?: PlanId;
}

/**
 * Creates (or replaces) the single active login code for an email. An email with no account yet
 * gets an unverified lead (carrying any sign-up form details) that holds the code. Existing
 * accounts are never modified by unauthenticated input other than their code.
 */
export async function issueLoginOtp(email: string, signup?: LoginSignupDetails): Promise<IssueOtpResult> {
  let account = await findAccountByEmail(email);
  if (!account) {
    await ensureLead({ email, name: signup?.name, phone: signup?.phone, interestedPlanId: signup?.interestedPlanId, source: "login_signup" });
    account = await findAccountByEmail(email);
    if (!account) return { ok: false, retryAfterSeconds: 5 };
  }
  return issueOtpFor(account, "loginOtp", email);
}

export async function verifyLoginOtp(email: string, code: string): Promise<VerifyOtpResult> {
  return verifyOtpFor(email, "loginOtp", email, code);
}

export async function issueWillVerificationOtp(email: string): Promise<IssueOtpResult> {
  const normalized = email.trim().toLowerCase();
  const account = await findAccountByEmail(normalized);
  if (!account) return { ok: false, retryAfterSeconds: 5 };
  return issueOtpFor(account, "willOtp", `verify:${normalized}`);
}

export async function verifyWillVerificationOtp(email: string, code: string): Promise<VerifyOtpResult> {
  const normalized = email.trim().toLowerCase();
  return verifyOtpFor(normalized, "willOtp", `verify:${normalized}`, code);
}
