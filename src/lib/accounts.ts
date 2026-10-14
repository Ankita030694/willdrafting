import { ObjectId, type UpdateFilter } from "mongodb";
import { connectToDatabase } from "@/lib/mongodb";
import {
  funnelEventsCol,
  getDb,
  leadsCol,
  usersCol,
} from "@/lib/db/collections";
import type {
  FunnelEventType,
  LeadDoc,
  LeadSource,
  LeadStatus,
  UserDoc,
} from "@/lib/db/types";
import type { AuthStatus, FunnelStage, PaymentStatus, PlanId } from "@/lib/authTypes";

/**
 * Identity layer over the two account collections.
 *  - `users`: paid customers only
 *  - `leads`: everyone else (incl. unpaid signups that already have a password)
 * Every auth route must go through here so login/reset/verify work for both.
 */

export type Account =
  | { kind: "lead"; doc: LeadDoc }
  | { kind: "user"; doc: UserDoc };

export interface AccountClaims {
  name: string;
  phone: string | null;
  needsPhone: boolean;
  authStatus: AuthStatus;
  paymentStatus: PaymentStatus;
  funnelStage: FunnelStage;
}

function toObjectId(id: string | ObjectId): ObjectId | null {
  if (id instanceof ObjectId) return id;
  return ObjectId.isValid(id) ? new ObjectId(id) : null;
}

function wrapUser(doc: UserDoc | null): Account | null {
  return doc ? { kind: "user", doc } : null;
}
function wrapLead(doc: LeadDoc | null): Account | null {
  return doc ? { kind: "lead", doc } : null;
}

export async function findAccountById(id: string | ObjectId): Promise<Account | null> {
  const _id = toObjectId(id);
  if (!_id) return null;
  const [users, leads] = await Promise.all([usersCol(), leadsCol()]);
  return wrapUser(await users.findOne({ _id })) ?? wrapLead(await leads.findOne({ _id }));
}

export async function findAccountByEmail(email: string): Promise<Account | null> {
  if (!email) return null;
  const [users, leads] = await Promise.all([usersCol(), leadsCol()]);
  return wrapUser(await users.findOne({ email })) ?? wrapLead(await leads.findOne({ email }));
}

export interface SignInAccountInput {
  email: string;
  name?: string;
  phone?: string | null;
  googleId?: string | null;
  source: LeadSource;
  interestedPlanId?: PlanId;
}

/**
 * Called after the email has been proven (valid OTP or Google). Returns the existing account
 * (marking it verified) or creates a verified lead. Never creates a lead for a paying customer's
 * email: customers are found in `users` first.
 */
export async function findOrCreateVerifiedAccount(input: SignInAccountInput): Promise<Account> {
  const existing = await findAccountByEmail(input.email);
  const now = new Date();

  if (existing) {
    const patch: Record<string, unknown> = {};
    if (existing.doc.authStatus !== "verified") {
      patch.authStatus = "verified";
      void logFunnelEvent(existing.doc._id, input.email, "email_verified");
    }
    if (!existing.doc.name && input.name) patch.name = input.name;
    if (!existing.doc.phone && input.phone) patch.phone = input.phone;
    if (input.googleId && !existing.doc.googleId) patch.googleId = input.googleId;
    if (existing.kind === "lead") {
      if (existing.doc.status === "captured" || existing.doc.status === "registered") {
        patch.status = "email_verified";
      }
      if (input.interestedPlanId) patch.interestedPlanId = input.interestedPlanId;
    }
    if (Object.keys(patch).length === 0) return existing;
    await updateAccount(existing, patch);
    return { kind: existing.kind, doc: { ...existing.doc, ...patch } } as Account;
  }

  const lead: LeadDoc = {
    _id: new ObjectId(),
    name: input.name || "",
    email: input.email,
    phone: input.phone || "",
    googleId: input.googleId ?? null,
    authStatus: "verified",
    status: "email_verified",
    source: input.source,
    interestedPlanId: input.interestedPlanId,
    marketingConsent: false,
    createdAt: now,
    updatedAt: now,
  };

  const leads = await leadsCol();
  try {
    await leads.insertOne(lead);
  } catch (err) {
    // Parallel sign-in (e.g. double click) created it first: use that one.
    if ((err as { code?: number }).code === 11000) {
      const winner = await findAccountByEmail(input.email);
      if (winner) return winner;
    }
    throw err;
  }

  // Same cross-collection race guard as ensureLead().
  const users = await usersCol();
  const customer = await users.findOne({ email: input.email });
  if (customer) {
    await leads.deleteOne({ _id: lead._id });
    return { kind: "user", doc: customer };
  }

  await logFunnelEvent(lead._id, input.email, "signup", { source: input.source });
  await logFunnelEvent(lead._id, input.email, "email_verified");
  return { kind: "lead", doc: lead };
}

/** Patches the account in whichever collection it lives in. Returns false when nothing matched. */
export async function updateAccount(
  account: Pick<Account, "kind"> & { doc: { _id: ObjectId } },
  patch: Record<string, unknown>,
  unset?: string[]
): Promise<boolean> {
  const update: Record<string, unknown> = { $set: { ...patch, updatedAt: new Date() } };
  if (unset?.length) update.$unset = Object.fromEntries(unset.map((k) => [k, ""]));

  if (account.kind === "user") {
    const col = await usersCol();
    const res = await col.updateOne({ _id: account.doc._id }, update as UpdateFilter<UserDoc>);
    return res.matchedCount > 0;
  }
  const col = await leadsCol();
  const res = await col.updateOne({ _id: account.doc._id }, update as UpdateFilter<LeadDoc>);
  return res.matchedCount > 0;
}

/** True when `phone` already belongs to a different account (used for profile completion). */
export async function isPhoneTakenByOther(phone: string, selfId: ObjectId): Promise<boolean> {
  const [users, leads] = await Promise.all([usersCol(), leadsCol()]);
  const query = { phone, _id: { $ne: selfId } };
  const [u, l] = await Promise.all([
    users.findOne(query, { projection: { _id: 1 } }),
    leads.findOne(query, { projection: { _id: 1 } }),
  ]);
  return Boolean(u || l);
}

export function claimsFor(account: Account): AccountClaims {
  const { doc } = account;
  const phone = doc.phone ? doc.phone : null;
  if (account.kind === "user") {
    return {
      name: doc.name || "User",
      phone,
      needsPhone: !phone,
      authStatus: doc.authStatus || "unverified",
      paymentStatus: "paid",
      funnelStage: "customer",
    };
  }
  return {
    name: doc.name || "User",
    phone,
    needsPhone: !phone,
    authStatus: doc.authStatus || "unverified",
    paymentStatus: "unpaid",
    funnelStage: account.doc.status === "captured" ? "lead" : "registered",
  };
}

export async function logFunnelEvent(
  accountId: ObjectId,
  email: string,
  type: FunnelEventType,
  meta?: Record<string, unknown>
): Promise<void> {
  try {
    const col = await funnelEventsCol();
    await col.insertOne({
      _id: new ObjectId(),
      accountId,
      email,
      type,
      meta,
      createdAt: new Date(),
    });
  } catch (err) {
    // Analytics must never break a user-facing flow.
    console.error("[funnel] Failed to log event:", type, err);
  }
}

export interface EnsureLeadInput {
  /** May be empty for popup submissions that only collected a phone number. */
  email: string;
  name?: string;
  phone?: string | null;
  source: LeadSource;
  message?: string;
  state?: string;
  marketingConsent?: boolean;
  interestedPlanId?: PlanId;
}

export type EnsureLeadResult =
  | { outcome: "created" | "updated"; lead: LeadDoc }
  | { outcome: "already_customer" };

/**
 * Idempotent lead capture used by every form: never touches credentials, never creates
 * a lead for an email that already belongs to a paying customer.
 */
export async function ensureLead(input: EnsureLeadInput): Promise<EnsureLeadResult> {
  const [users, leads] = await Promise.all([usersCol(), leadsCol()]);
  const email = input.email;
  const phone = input.phone || "";
  if (!email && !phone) throw new Error("ensureLead needs an email or a phone number");

  const customerQuery = email ? { email } : { phone };
  if (await users.findOne(customerQuery, { projection: { _id: 1 } })) {
    return { outcome: "already_customer" };
  }

  const now = new Date();
  // Prefer the email match; otherwise merge into an earlier phone-only lead.
  let existing = email ? await leads.findOne({ email }) : null;
  if (!existing && phone) existing = await leads.findOne({ phone, email: "" });

  if (existing) {
    const patch: Record<string, unknown> = { updatedAt: now };
    if (email && !existing.email) patch.email = email;
    if (input.name && !existing.name) patch.name = input.name;
    if (phone && !existing.phone) patch.phone = phone;
    if (input.state && !existing.state) patch.state = input.state;
    if (input.message) patch.message = input.message;
    if (input.interestedPlanId) patch.interestedPlanId = input.interestedPlanId;
    // Consent can be granted by a later form but is never silently revoked here.
    if (input.marketingConsent) patch.marketingConsent = true;
    try {
      await leads.updateOne({ _id: existing._id }, { $set: patch });
    } catch (err) {
      // Adding an email that another lead just claimed: keep the data we already had.
      if ((err as { code?: number }).code !== 11000) throw err;
    }
    return { outcome: "updated", lead: { ...existing, ...patch } as LeadDoc };
  }

  const lead: LeadDoc = {
    _id: new ObjectId(),
    name: input.name || "",
    email,
    phone: input.phone || "",
    state: input.state,
    authStatus: "unverified",
    status: "captured" as LeadStatus,
    source: input.source,
    message: input.message,
    marketingConsent: Boolean(input.marketingConsent),
    interestedPlanId: input.interestedPlanId,
    createdAt: now,
    updatedAt: now,
  };

  try {
    await leads.insertOne(lead);
  } catch (err) {
    // Lost a race with a parallel submission for the same email: fall back to the update path.
    if ((err as { code?: number }).code === 11000) {
      const winner = await leads.findOne({ email });
      if (winner) return { outcome: "updated", lead: winner };
    }
    throw err;
  }

  // A payment may have converted this email to a user between our check and the insert.
  // Two collections cannot share a unique index, so re-check and back out if needed.
  if (await users.findOne(customerQuery, { projection: { _id: 1 } })) {
    await leads.deleteOne({ _id: lead._id });
    return { outcome: "already_customer" };
  }

  await logFunnelEvent(lead._id, email, "lead_captured", { source: input.source });
  return { outcome: "created", lead };
}

export interface ConvertOptions {
  planId: PlanId;
  orderId: ObjectId;
  /** Credits granted by this order (a will purchase grants 1). */
  credits?: number;
}

/**
 * Promotes a lead to a paying user. The user keeps the lead's `_id`, so JWT sessions and every
 * future reference (wills.userId, orders.accountId) stay valid. Runs in a transaction and is
 * idempotent: if the user already exists (webhook + redirect race) it simply returns it.
 */
export async function convertLeadToUser(
  leadId: ObjectId,
  opts: ConvertOptions
): Promise<UserDoc> {
  const db = await getDb();
  const { client } = await connectToDatabase();
  const users = db.collection<UserDoc>("users");
  const leads = db.collection<LeadDoc>("leads");
  const session = client.startSession();

  let result: UserDoc | null = null;
  try {
    await session.withTransaction(async () => {
      result = null;
      const already = await users.findOne({ _id: leadId }, { session });
      if (already) {
        result = already;
        return;
      }

      const lead = await leads.findOne({ _id: leadId }, { session });
      if (!lead) throw new Error(`Cannot convert: lead ${leadId.toHexString()} not found`);

      const now = new Date();
      const user: UserDoc = {
        _id: lead._id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        state: lead.state,
        googleId: lead.googleId ?? null,
        authStatus: lead.authStatus,
        marketingConsent: lead.marketingConsent,
        unsubscribedAt: lead.unsubscribedAt ?? null,
        role: "user",
        paymentStatus: "paid",
        funnelStage: "customer",
        planId: opts.planId,
        willCredits: opts.credits ?? 1,
        paidAt: now,
        lastOrderId: opts.orderId,
        leadSource: lead.source,
        leadCreatedAt: lead.createdAt,
        createdAt: lead.createdAt,
        updatedAt: now,
      };

      await users.insertOne(user, { session });
      await leads.deleteOne({ _id: lead._id }, { session });
      await db.collection("funnel_events").insertOne(
        {
          accountId: lead._id,
          email: lead.email,
          type: "lead_converted",
          meta: { planId: opts.planId, orderId: opts.orderId.toHexString(), source: lead.source },
          createdAt: now,
        },
        { session }
      );
      result = user;
    });
  } finally {
    await session.endSession();
  }

  if (!result) throw new Error("Lead conversion produced no user");
  return result;
}
