import type { ObjectId } from "mongodb";
import { leadsCol, ordersCol, usersCol, whatsappMessagesCol, willsCol } from "@/lib/db/collections";
import type { WillDoc } from "@/lib/db/types";
import { QUESTIONNAIRE_STEPS } from "@/lib/questionnaireFlow";
import { hasUserInput } from "@/lib/whatsapp/campaign";

const DAY = 24 * 60 * 60 * 1000;
const IST_OFFSET = 330 * 60 * 1000;

/** Funnel stages in order; each account counts towards every stage up to the deepest it reached. */
const STAGES = [
  { key: "lead", label: "Leads captured", hint: "Filled the popup / a form, or signed up" },
  { key: "verified", label: "Email verified", hint: "Entered the email code or signed in with Google" },
  { key: "opened", label: "Opened the will form", hint: "Went past the dashboard into the questions" },
  { key: "started", label: "Started filling", hint: "Typed anything beyond the signup details" },
  { key: "assets", label: "Reached Assets", hint: "Got to step 3 (Assets) or added an asset" },
  { key: "payment", label: "Reached payment", hint: "Opened plan selection or created an order" },
  { key: "paid", label: "Paid", hint: "Became a paying customer" },
  { key: "downloaded", label: "Downloaded will", hint: "Verified and downloaded the final will" },
] as const;

interface Account {
  id: ObjectId;
  kind: "lead" | "user";
  email: string;
  phone: string;
  source: string;
  landingPage: string;
  createdAt: Date;
  verified: boolean;
  marketingConsent: boolean;
  paidAt: Date | null;
}

/**
 * Deepest stage reached, where each stage requires the one before it: clicking ahead in the
 * sidebar without typing anything does not count as "started" or "reached payment".
 * Paying customers count through "Paid" whatever their will looks like.
 */
function deepestStage(a: Account, will: WillDoc | undefined, hasOrder: boolean): number {
  const furthest = will?.furthestStep ?? 0;
  const started = hasUserInput(will?.state);
  const paid = a.kind === "user";
  const reached = [
    true,
    a.verified,
    Boolean(will) && (furthest >= 2 || started),
    started,
    furthest >= 4 || (will?.state?.assets?.length ?? 0) > 0,
    furthest >= 13 || hasOrder,
    paid,
    paid && (will?.downloadCount ?? 0) > 0,
  ];
  let stage = 0;
  while (stage + 1 < reached.length && reached[stage + 1]) stage++;
  return paid ? Math.max(stage, 6) : stage;
}

function istDay(d: Date): string {
  return new Date(d.getTime() + IST_OFFSET).toISOString().slice(0, 10);
}

/**
 * Conversion funnel for the admin Users page.
 * Cohort = accounts created in the last `days` days (null = all time); team/test accounts
 * (WHATSAPP_EXCLUDE) are left out unless `includeInternal`.
 */
export async function buildConversionFunnel(options: { days: number | null; includeInternal: boolean }) {
  const days = options.days;
  const includeInternal = options.includeInternal;
  const now = new Date();
  const since = days ? new Date(now.getTime() - days * DAY) : new Date(0);

  const [leads, users, wills, orders, messages] = await Promise.all([
    leadsCol(),
    usersCol(),
    willsCol(),
    ordersCol(),
    whatsappMessagesCol(),
  ]);
  const [leadDocs, userDocs, willDocs, orderDocs, messageDocs] = await Promise.all([
    leads.find({}).toArray(),
    users.find({}).toArray(),
    wills.find({ userId: { $exists: true } }).toArray(),
    orders.find({}, { projection: { accountId: 1, status: 1 } }).toArray(),
    messages.find({ mode: "live", createdAt: { $gte: since } }).toArray(),
  ]);

  const internal = new Set(
    String(process.env.WHATSAPP_EXCLUDE ?? "")
      .split(",")
      .map((v) => v.trim().toLowerCase())
      .filter(Boolean)
  );
  const isInternal = (email: string, phone: string) =>
    internal.has(email.toLowerCase()) || internal.has(String(phone).slice(-10));

  const accounts: Account[] = [
    ...leadDocs.map((l) => ({
      id: l._id,
      kind: "lead" as const,
      email: l.email,
      phone: l.phone,
      source: l.source,
      landingPage: l.landingPage || "",
      createdAt: l.createdAt,
      verified: l.authStatus === "verified",
      marketingConsent: Boolean(l.marketingConsent),
      paidAt: null,
    })),
    ...userDocs.map((u) => ({
      id: u._id,
      kind: "user" as const,
      email: u.email,
      phone: u.phone,
      source: u.leadSource || "direct",
      landingPage: "",
      createdAt: u.leadCreatedAt || u.createdAt,
      verified: true,
      marketingConsent: Boolean(u.marketingConsent),
      paidAt: u.paidAt,
    })),
  ].filter((a) => a.createdAt >= since && (includeInternal || !isInternal(a.email, a.phone)));

  const willBy = new Map(willDocs.map((w) => [String(w.userId), w]));
  const orderAccounts = new Set(orderDocs.map((o) => String(o.accountId)));

  // --- Funnel ---------------------------------------------------------------------------
  const stageCounts = new Array<number>(STAGES.length).fill(0);
  const stoppedAt = new Map<string, number>();
  let untrackedStops = 0;
  const bySource = new Map<string, { leads: number; started: number; paid: number }>();
  const byPage = new Map<string, { leads: number; started: number; paid: number }>();
  const byDay = new Map<string, number>();

  for (const a of accounts) {
    const will = willBy.get(String(a.id));
    const deepest = deepestStage(a, will, orderAccounts.has(String(a.id)));
    for (let i = 0; i <= deepest; i++) stageCounts[i]++;

    if (a.kind === "lead" && deepest >= 2) {
      // The last step they had open, not the furthest: people click ahead in the sidebar to look around.
      const stopStep = will?.lastStep && will.lastStep >= 2 ? will.lastStep : will?.furthestStep;
      if (stopStep && stopStep >= 2) {
        const title = QUESTIONNAIRE_STEPS.find((s) => s.step === stopStep)?.title ?? `Step ${stopStep}`;
        stoppedAt.set(title, (stoppedAt.get(title) ?? 0) + 1);
      } else {
        untrackedStops++;
      }
    }

    const src = bySource.get(a.source) ?? { leads: 0, started: 0, paid: 0 };
    src.leads++;
    if (deepest >= 3) src.started++;
    if (a.kind === "user") src.paid++;
    bySource.set(a.source, src);

    if (a.landingPage) {
      const page = byPage.get(a.landingPage) ?? { leads: 0, started: 0, paid: 0 };
      page.leads++;
      if (deepest >= 3) page.started++;
      if (a.kind === "user") page.paid++;
      byPage.set(a.landingPage, page);
    }

    const day = istDay(a.createdAt);
    byDay.set(day, (byDay.get(day) ?? 0) + 1);
  }

  const funnel = STAGES.map((s, i) => ({
    ...s,
    count: stageCounts[i],
    pctOfTop: stageCounts[0] ? Math.round((stageCounts[i] / stageCounts[0]) * 1000) / 10 : 0,
    pctOfPrevious: i === 0 ? 100 : stageCounts[i - 1] ? Math.round((stageCounts[i] / stageCounts[i - 1]) * 1000) / 10 : 0,
  }));

  // Daily leads, including zero days, so quiet stretches are visible.
  const firstDay = days ? since : accounts.reduce((min, a) => (a.createdAt < min ? a.createdAt : min), now);
  const daily: Array<{ day: string; leads: number }> = [];
  for (let t = new Date(istDay(firstDay)).getTime(); t <= new Date(istDay(now)).getTime(); t += DAY) {
    const day = new Date(t).toISOString().slice(0, 10);
    daily.push({ day, leads: byDay.get(day) ?? 0 });
  }

  // --- WhatsApp -------------------------------------------------------------------------
  const userPaidAt = new Map(userDocs.map((u) => [String(u._id), u.paidAt]));
  // Messages sent in the window, whatever the lead's signup date (backfill reaches older leads too).
  const internalIds = new Set(
    [...leadDocs, ...userDocs].filter((d) => isInternal(d.email, d.phone)).map((d) => String(d._id))
  );
  const relevant = messageDocs.filter((m) => includeInternal || !internalIds.has(String(m.accountId)));
  const wentOut = relevant.filter((m) => ["sent", "delivered", "read", "replied"].includes(m.status));
  const cameBack = wentOut.filter((m) => {
    const w = willBy.get(String(m.accountId));
    return m.sentAt && w && w.updatedAt > m.sentAt && w.updatedAt.getTime() - m.sentAt.getTime() <= 3 * DAY;
  }).length;
  const paidAfter = wentOut.filter((m) => {
    const paidAt = userPaidAt.get(String(m.accountId));
    return m.sentAt && paidAt && paidAt > m.sentAt && paidAt.getTime() - m.sentAt.getTime() <= 14 * DAY;
  }).length;

  const leadsInCohort = accounts.filter((a) => a.kind === "lead");
  const whatsapp = {
    consented: accounts.filter((a) => a.marketingConsent).length,
    consentBase: leadsInCohort.length + accounts.filter((a) => a.kind === "user").length,
    sent: wentOut.length,
    delivered: relevant.filter((m) => ["delivered", "read", "replied"].includes(m.status)).length,
    read: relevant.filter((m) => ["read", "replied"].includes(m.status)).length,
    replied: relevant.filter((m) => m.status === "replied").length,
    failed: relevant.filter((m) => m.status === "failed").length,
    cameBack,
    paidAfter,
    byTemplate: ["will_not_started", "will_left_midway"].map((template) => ({
      template,
      sent: wentOut.filter((m) => m.template === template).length,
      read: relevant.filter((m) => m.template === template && ["read", "replied"].includes(m.status)).length,
    })),
  };

  const sortRows = (map: Map<string, { leads: number; started: number; paid: number }>) =>
    [...map.entries()].map(([name, v]) => ({ name, ...v })).sort((a, b) => b.leads - a.leads);

  return {
    window: { days: days ?? "all", since: since.toISOString(), includeInternal },
    funnel,
    stoppedAt: [...stoppedAt.entries()]
      .map(([step, count]) => ({ step, count }))
      .sort(
        (a, b) =>
          (QUESTIONNAIRE_STEPS.find((s) => s.title === a.step)?.step ?? 99) -
          (QUESTIONNAIRE_STEPS.find((s) => s.title === b.step)?.step ?? 99)
      ),
    untrackedStops,
    bySource: sortRows(bySource),
    byPage: sortRows(byPage).slice(0, 10),
    daily,
    whatsapp,
  };
}
