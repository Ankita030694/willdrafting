import { ObjectId } from "mongodb";
import { leadsCol, whatsappMessagesCol, willsCol } from "@/lib/db/collections";
import type { LeadDoc, WhatsAppMessageDoc, WhatsAppTemplateName, WillDoc } from "@/lib/db/types";
import { STEP_WORDS } from "@/lib/questionnaireFlow";
import type { WillDraftingState } from "@/lib/willDraftingStore";
import { sendWatiTemplate, toWhatsAppNumber } from "@/lib/whatsapp/wati";

/**
 * WhatsApp re-engagement for leads (paying customers live in `users` and are never messaged here).
 *
 *  A — signed up, filled nothing           → will_not_started: A1 1 h after signup, A2 2 days later
 *                                             at the hour they signed up.
 *  B — started the will, then stopped       → will_left_midway: B1 3 h after the last save, B2 3 days
 *                                             later at the hour they were active. Starts over when they
 *                                             save again, but only 7+ days after the last message.
 *  Backfill — one message, once, to leads that existed before consent was collected.
 *
 * Every message needs: a valid Indian mobile, consent (except backfill), no opt-out, no invalid
 * number, no reply since the drop-off, an unverified will, at most 1 message per 24 h and 4 ever.
 * Messages are only sent 09:00–21:00 IST.
 */

export type CampaignMode = "off" | "dry_run" | "test" | "live";

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;
const IST_OFFSET = 330 * 60 * 1000;

const A1_DELAY = 1 * HOUR;
const A2_GAP = 2 * DAY;
const B1_DELAY = 3 * HOUR;
const B2_GAP = 3 * DAY;
const MIN_GAP_BETWEEN_MESSAGES = 24 * HOUR;
const B_RESTART_GAP = 7 * DAY;
const LIFETIME_CAP = 4;
const MAX_AGE = 30 * DAY;
const BACKFILL_MAX_AGE = 45 * DAY;
const SEND_WINDOW = { start: 9 * 60, end: 21 * 60 }; // IST minutes of the day
const ACTIVE_HOUR_CLAMP = { start: 10 * 60, end: 20 * 60 + 30 };
const MAX_SENDS_PER_RUN = 40;
const MAX_ATTEMPTS = 3;
const RETRY_DELAY = 20 * HOUR;

/** Statuses that mean the message actually went out (count towards caps and gaps). */
const DELIVERED_STATUSES = new Set(["sent", "delivered", "read", "replied"]);

// ---------------------------------------------------------------------------------------------
// Time helpers (IST)
// ---------------------------------------------------------------------------------------------

function istMinutes(d: Date): number {
  return Math.floor((((d.getTime() + IST_OFFSET) % DAY) + DAY) % DAY / 60_000);
}

function isInSendWindow(d: Date): boolean {
  const m = istMinutes(d);
  return m >= SEND_WINDOW.start && m < SEND_WINDOW.end;
}

/** `base` moved to `minutes` past IST midnight on the same IST day. */
function atIstMinutes(base: Date, minutes: number): Date {
  const istMidnight = Math.floor((base.getTime() + IST_OFFSET) / DAY) * DAY - IST_OFFSET;
  return new Date(istMidnight + minutes * 60_000);
}

/** The first moment at or after `notBefore` that falls at the person's own active hour. */
function atActiveHour(notBefore: Date, activeAt: Date): Date {
  const m = Math.min(ACTIVE_HOUR_CLAMP.end, Math.max(ACTIVE_HOUR_CLAMP.start, istMinutes(activeAt)));
  const candidate = atIstMinutes(notBefore, m);
  return candidate.getTime() >= notBefore.getTime() ? candidate : new Date(candidate.getTime() + DAY);
}

// ---------------------------------------------------------------------------------------------
// Will progress helpers
// ---------------------------------------------------------------------------------------------

const has = (v: unknown) => typeof v === "string" && v.trim().length > 0;

/** True when the person typed anything beyond what signup fills in automatically. */
export function hasUserInput(state?: WillDraftingState | null): boolean {
  if (!state) return false;
  const t = (state.testator ?? {}) as unknown as Record<string, unknown>;
  const typedProfile = ["fatherOrMotherName", "pan", "aadhaar", "workplace", "dob", "address", "city", "state", "pincode"].some(
    (k) => has(t[k])
  );
  const wishes = state.specialWishes as unknown as Record<string, unknown> | undefined;
  return (
    typedProfile ||
    (state.familyMembers?.length ?? 0) > 0 ||
    (state.assets?.length ?? 0) > 0 ||
    (state.allocations?.length ?? 0) > 0 ||
    has(state.residuaryBeneficiaryName) ||
    has(state.executorPrimary?.name) ||
    has(state.emotionalReason) ||
    Object.values(wishes ?? {}).some(has)
  );
}

/** The step to send people back to: the last one they opened, else the first section left empty. */
function resumeStep(will: WillDoc): number {
  if (will.lastStep && will.lastStep >= 2) return will.lastStep;
  const s = will.state;
  const t = (s?.testator ?? {}) as unknown as Record<string, unknown>;
  if (!["dob", "address", "city", "pincode"].some((k) => has(t[k]))) return 2;
  if (!s.familyMembers?.length) return 3;
  if (!s.assets?.length) return 4;
  if (!s.allocations?.length && !has(s.residuaryBeneficiaryName)) return 5;
  if (!has(s.executorPrimary?.name)) return 6;
  return 8;
}

function firstName(name: string | undefined): string {
  const first = (String(name ?? "").trim().split(/\s+/)[0] ?? "").replace(/[^\p{L}\p{M}'-]+$/u, "");
  if (!first) return "there";
  return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
}

// ---------------------------------------------------------------------------------------------
// Planning
// ---------------------------------------------------------------------------------------------

export interface PlannedMessage {
  accountId: ObjectId;
  name: string;
  phoneLast4: string;
  whatsappNumber: string;
  template: WhatsAppTemplateName;
  sequenceKey: string;
  params: Record<string, string>;
  dueAt: Date;
  /** Present when this retries an earlier failed attempt. */
  retryOf?: ObjectId;
}

function excludedSet(): Set<string> {
  return new Set(
    String(process.env.WHATSAPP_EXCLUDE ?? "")
      .split(",")
      .map((v) => v.trim().toLowerCase())
      .filter(Boolean)
  );
}

function planFor(
  lead: LeadDoc,
  will: WillDoc | undefined,
  history: WhatsAppMessageDoc[],
  now: Date,
  backfill: boolean
): PlannedMessage | null {
  const whatsappNumber = toWhatsAppNumber(lead.phone);
  if (!whatsappNumber) return null;
  if (lead.unsubscribedAt || lead.whatsappInvalidAt) return null;
  if (will?.detailsVerified || will?.lockedAt) return null;

  const live = history.filter((m) => m.mode === "live");
  const delivered = live.filter((m) => DELIVERED_STATUSES.has(m.status));
  const lastSentAt = delivered.reduce<Date | null>((acc, m) => (m.sentAt && (!acc || m.sentAt > acc) ? m.sentAt : acc), null);
  if (delivered.length >= LIFETIME_CAP) return null;
  if (lastSentAt && now.getTime() - lastSentAt.getTime() < MIN_GAP_BETWEEN_MESSAGES) return null;

  const started = hasUserInput(will?.state);
  const step = started && will ? resumeStep(will) : 0;
  const base = {
    accountId: lead._id,
    name: firstName(lead.name),
    phoneLast4: whatsappNumber.slice(-4),
    whatsappNumber,
  };
  const forTemplate = (template: WhatsAppTemplateName): { template: WhatsAppTemplateName; params: Record<string, string> } =>
    template === "will_left_midway"
      ? { template, params: { "1": base.name, "2": STEP_WORDS[step] ?? "Details" } }
      : { template, params: { "1": base.name } };

  // A failed attempt that may be retried takes priority over starting anything new.
  const retry = live.find(
    (m) => m.status === "failed" && m.attempts < MAX_ATTEMPTS && m.nextAttemptAt && m.nextAttemptAt <= now
  );
  if (retry) {
    return { ...base, template: retry.template, params: retry.params, sequenceKey: retry.sequenceKey, dueAt: retry.nextAttemptAt!, retryOf: retry._id };
  }
  const inFlight = live.some((m) => m.status === "sending" || (m.status === "failed" && m.attempts < MAX_ATTEMPTS && m.nextAttemptAt));
  if (inFlight) return null;

  if (backfill) {
    if (live.length > 0) return null;
    if (now.getTime() - lead.createdAt.getTime() > BACKFILL_MAX_AGE) return null;
    return { ...base, ...forTemplate(started ? "will_left_midway" : "will_not_started"), sequenceKey: "backfill", dueAt: now };
  }

  if (!lead.marketingConsent) return null;
  const byKey = new Map(live.map((m) => [m.sequenceKey, m]));

  if (!started) {
    const anchor = lead.createdAt;
    if (now.getTime() - anchor.getTime() > MAX_AGE) return null;
    if (lead.whatsappLastReplyAt && lead.whatsappLastReplyAt >= anchor) return null;
    const a1 = byKey.get("A1");
    if (!a1) return { ...base, ...forTemplate("will_not_started"), sequenceKey: "A1", dueAt: new Date(anchor.getTime() + A1_DELAY) };
    if (!byKey.has("A2") && a1.sentAt && DELIVERED_STATUSES.has(a1.status)) {
      return { ...base, ...forTemplate("will_not_started"), sequenceKey: "A2", dueAt: atActiveHour(new Date(a1.sentAt.getTime() + A2_GAP), anchor) };
    }
    return null;
  }

  if (!will) return null;
  const anchor = will.updatedAt;
  if (now.getTime() - anchor.getTime() > MAX_AGE) return null;
  if (lead.whatsappLastReplyAt && lead.whatsappLastReplyAt >= anchor) return null;
  const anchorKey = anchor.toISOString().slice(0, 16);
  const b1 = byKey.get(`B1:${anchorKey}`);
  if (!b1) {
    const earlierB = delivered.some((m) => m.sequenceKey.startsWith("B"));
    if (earlierB && lastSentAt && now.getTime() - lastSentAt.getTime() < B_RESTART_GAP) return null;
    return { ...base, ...forTemplate("will_left_midway"), sequenceKey: `B1:${anchorKey}`, dueAt: new Date(anchor.getTime() + B1_DELAY) };
  }
  if (!byKey.has(`B2:${anchorKey}`) && b1.sentAt && DELIVERED_STATUSES.has(b1.status)) {
    return { ...base, ...forTemplate("will_left_midway"), sequenceKey: `B2:${anchorKey}`, dueAt: atActiveHour(new Date(b1.sentAt.getTime() + B2_GAP), anchor) };
  }
  return null;
}

async function planAll(now: Date, backfill: boolean): Promise<PlannedMessage[]> {
  const [leads, wills, messages] = await Promise.all([leadsCol(), willsCol(), whatsappMessagesCol()]);
  const since = new Date(now.getTime() - Math.max(MAX_AGE, BACKFILL_MAX_AGE) - B2_GAP);
  const leadDocs = await leads.find({ updatedAt: { $gte: since }, phone: { $gt: "" } }).toArray();
  if (!leadDocs.length) return [];

  const ids = leadDocs.map((l) => l._id);
  const [willDocs, history] = await Promise.all([
    wills.find({ userId: { $in: ids } }).toArray(),
    messages.find({ accountId: { $in: ids } }).toArray(),
  ]);
  const willBy = new Map(willDocs.map((w) => [String(w.userId), w]));
  const historyBy = new Map<string, WhatsAppMessageDoc[]>();
  for (const m of history) {
    const key = String(m.accountId);
    historyBy.set(key, [...(historyBy.get(key) ?? []), m]);
  }

  const excluded = excludedSet();
  // Several lead records can share one phone (popup + Google sign-up): message each number once,
  // preferring the record with the most progress, and never a number another record was messaged on.
  const messagedNumbers = new Set(history.filter((m) => m.mode === "live").map((m) => m.phone));
  const byNumber = new Map<string, PlannedMessage>();
  for (const lead of leadDocs) {
    if (excluded.has(lead.email.toLowerCase()) || excluded.has(String(lead.phone).slice(-10))) continue;
    const plan = planFor(lead, willBy.get(String(lead._id)), historyBy.get(String(lead._id)) ?? [], now, backfill);
    if (!plan) continue;
    if (!plan.retryOf && messagedNumbers.has(plan.whatsappNumber) && !historyBy.has(String(lead._id))) continue;
    const current = byNumber.get(plan.whatsappNumber);
    if (!current || (plan.template === "will_left_midway" && current.template !== "will_left_midway")) {
      byNumber.set(plan.whatsappNumber, plan);
    }
  }
  const plans = [...byNumber.values()];
  return plans.sort((a, b) => a.dueAt.getTime() - b.dueAt.getTime());
}

// ---------------------------------------------------------------------------------------------
// Running
// ---------------------------------------------------------------------------------------------

export interface CampaignRunSummary {
  mode: CampaignMode;
  backfill: boolean;
  now: string;
  inSendWindow: boolean;
  due: Array<Record<string, string>>;
  upcoming: Array<Record<string, string>>;
  sent: number;
  failed: Array<{ sequenceKey: string; phoneLast4: string; error: string }>;
  skippedDuplicates: number;
}

const describe = (p: PlannedMessage) => ({
  name: p.name,
  phone: `…${p.phoneLast4}`,
  template: p.template,
  step: p.sequenceKey,
  params: JSON.stringify(p.params),
  dueAt: p.dueAt.toISOString(),
});

function broadcastName(template: string, now: Date): string {
  return `wd_${template}_${new Date(now.getTime() + IST_OFFSET).toISOString().slice(0, 10).replace(/-/g, "")}`;
}

export async function runWhatsAppCampaign(options: {
  mode: CampaignMode;
  backfill?: boolean;
  now?: Date;
}): Promise<CampaignRunSummary> {
  const now = options.now ?? new Date();
  const backfill = Boolean(options.backfill);
  const summary: CampaignRunSummary = {
    mode: options.mode,
    backfill,
    now: now.toISOString(),
    inSendWindow: isInSendWindow(now),
    due: [],
    upcoming: [],
    sent: 0,
    failed: [],
    skippedDuplicates: 0,
  };
  if (options.mode === "off") return summary;

  const plans = await planAll(now, backfill);
  const due = plans.filter((p) => p.dueAt <= now);
  summary.due = due.map(describe);
  summary.upcoming = plans.filter((p) => p.dueAt > now).map(describe);
  if (options.mode === "dry_run" || !summary.inSendWindow) return summary;

  const col = await whatsappMessagesCol();

  if (options.mode === "test") {
    // One real example of each template, sent only to the test number; never counts for the person.
    const testNumber = toWhatsAppNumber(process.env.WHATSAPP_TEST_NUMBER);
    if (!testNumber) throw new Error("WHATSAPP_TEST_NUMBER is not set to a valid Indian mobile number.");
    const samples = [...new Map([...plans].reverse().map((p) => [p.template, p])).values()];
    for (const p of samples) {
      const result = await sendWatiTemplate({
        whatsappNumber: testNumber,
        template: p.template,
        broadcastName: `${broadcastName(p.template, now)}_test`,
        params: p.params,
      });
      await col.insertOne({
        _id: new ObjectId(),
        accountId: p.accountId,
        sequenceKey: `test:${p.sequenceKey}:${now.getTime()}`,
        mode: "test",
        template: p.template,
        phone: testNumber,
        params: p.params,
        status: result.ok ? "sent" : "failed",
        attempts: 1,
        failedDetail: result.ok ? null : result.error,
        watiMessageId: result.ok ? result.messageId : null,
        watiResponse: result.raw,
        sentAt: result.ok ? now : null,
        createdAt: now,
        updatedAt: now,
      });
      if (result.ok) summary.sent++;
      else summary.failed.push({ sequenceKey: p.sequenceKey, phoneLast4: testNumber.slice(-4), error: result.error });
    }
    return summary;
  }

  for (const p of due.slice(0, MAX_SENDS_PER_RUN)) {
    let id: ObjectId;
    if (p.retryOf) {
      id = p.retryOf;
      const claimed = await col.updateOne({ _id: id, status: "failed" }, { $set: { status: "sending", updatedAt: now } });
      if (!claimed.modifiedCount) continue;
    } else {
      id = new ObjectId();
      try {
        // Inserting first (unique accountId + sequenceKey) is the lock that stops double sends.
        await col.insertOne({
          _id: id,
          accountId: p.accountId,
          sequenceKey: p.sequenceKey,
          mode: "live",
          template: p.template,
          phone: p.whatsappNumber,
          params: p.params,
          status: "sending",
          attempts: 0,
          createdAt: now,
          updatedAt: now,
        });
      } catch (err) {
        if ((err as { code?: number }).code === 11000) {
          summary.skippedDuplicates++;
          continue;
        }
        throw err;
      }
    }

    const result = await sendWatiTemplate({
      whatsappNumber: p.whatsappNumber,
      template: p.template,
      broadcastName: broadcastName(p.template, now),
      params: p.params,
    });
    if (result.ok) {
      await col.updateOne(
        { _id: id },
        {
          $set: { status: "sent", sentAt: now, watiMessageId: result.messageId, watiResponse: result.raw, nextAttemptAt: null, updatedAt: now },
          $inc: { attempts: 1 },
        }
      );
      summary.sent++;
    } else {
      const doc = await col.findOne({ _id: id }, { projection: { attempts: 1 } });
      const attempts = (doc?.attempts ?? 0) + 1;
      await col.updateOne(
        { _id: id },
        {
          $set: {
            status: "failed",
            attempts,
            failedDetail: result.error,
            watiResponse: result.raw,
            nextAttemptAt: result.retryable && attempts < MAX_ATTEMPTS ? new Date(now.getTime() + RETRY_DELAY) : null,
            updatedAt: now,
          },
        }
      );
      summary.failed.push({ sequenceKey: p.sequenceKey, phoneLast4: p.phoneLast4, error: result.error });
    }
  }
  return summary;
}

// ---------------------------------------------------------------------------------------------
// Status updates (from the WATI webhook)
// ---------------------------------------------------------------------------------------------

/** Meta error codes: 131049 = per-user marketing limit (try again tomorrow), 131050 = user stopped marketing. */
const RETRY_TOMORROW_CODES = new Set(["131049"]);
const OPTED_OUT_CODES = new Set(["131050"]);
const INVALID_NUMBER_CODES = new Set(["131026", "1013"]);

export async function applyMessageFailure(message: WhatsAppMessageDoc, code: string, detail: string, now = new Date()) {
  const col = await whatsappMessagesCol();
  const retry = RETRY_TOMORROW_CODES.has(code) && message.attempts < MAX_ATTEMPTS && message.mode === "live";
  await col.updateOne(
    { _id: message._id },
    {
      $set: {
        status: "failed",
        failedCode: code,
        failedDetail: detail,
        nextAttemptAt: retry ? new Date(now.getTime() + RETRY_DELAY) : null,
        updatedAt: now,
      },
    }
  );
  if (message.mode !== "live") return;
  const leads = await leadsCol();
  if (OPTED_OUT_CODES.has(code)) {
    await leads.updateOne({ _id: message.accountId }, { $set: { unsubscribedAt: now, marketingConsent: false, updatedAt: now } });
  } else if (INVALID_NUMBER_CODES.has(code)) {
    await leads.updateOne({ _id: message.accountId }, { $set: { whatsappInvalidAt: now, updatedAt: now } });
  }
}
