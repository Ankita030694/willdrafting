import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { funnelEventsCol, leadsCol, usersCol, whatsappMessagesCol, willsCol } from "@/lib/db/collections";

export const dynamic = "force-dynamic";

/** How long after a message a return visit still counts as having come from it. */
const CLICK_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * WhatsApp report for the admin Users page: every live template message, and whether the person
 * clicked through. The template buttons carry no per-person link, so "clicked" means the person
 * came back to the site signed in (dashboard / will form opened, will saved, signed in) after the
 * message — the link sends logged-out visitors to the login page, so anyone who follows it through
 * shows up here.
 */
export async function GET() {
  const session = await auth();
  if (session?.user?.role !== "superadmin") {
    return NextResponse.json({ error: "Access denied. Administrator privileges required." }, { status: 403 });
  }

  try {
    const [messages, leads, users, wills, events] = await Promise.all([
      whatsappMessagesCol(),
      leadsCol(),
      usersCol(),
      willsCol(),
      funnelEventsCol(),
    ]);
    const sent = await messages.find({ mode: "live" }).sort({ createdAt: -1 }).limit(1000).toArray();
    const ids = [...new Set(sent.map((m) => String(m.accountId)))];
    const objectIds = sent.map((m) => m.accountId);

    const [leadDocs, userDocs, willDocs, eventDocs] = await Promise.all([
      leads.find({ _id: { $in: objectIds } }).toArray(),
      users.find({ _id: { $in: objectIds } }).toArray(),
      wills.find({ userId: { $in: objectIds } }).toArray(),
      events
        .find({ accountId: { $in: objectIds }, type: { $ne: "lead_captured" } }, { projection: { accountId: 1, createdAt: 1 } })
        .toArray(),
    ]);

    const accountBy = new Map([...leadDocs, ...userDocs].map((a) => [String(a._id), a]));
    const willBy = new Map(willDocs.map((w) => [String(w.userId), w]));
    const eventTimes = new Map<string, Date[]>();
    for (const e of eventDocs) {
      const key = String(e.accountId);
      eventTimes.set(key, [...(eventTimes.get(key) ?? []), e.createdAt]);
    }

    const rows = sent.map((m) => {
      const key = String(m.accountId);
      const account = accountBy.get(key);
      const will = willBy.get(key);
      const sentAt = m.sentAt ?? m.createdAt;
      const candidates = [
        account?.lastActiveAt,
        will?.lastStepAt,
        will?.updatedAt,
        ...(eventTimes.get(key) ?? []),
      ].filter((d): d is Date => d instanceof Date && d > sentAt && d.getTime() - sentAt.getTime() <= CLICK_WINDOW_MS);
      const clickedAt = candidates.length ? new Date(Math.min(...candidates.map((d) => d.getTime()))) : null;

      return {
        id: String(m._id),
        name: account?.name || "Unknown",
        phone: m.phone.replace(/^91/, ""),
        template: m.template,
        step: m.template === "will_left_midway" ? m.params["2"] ?? null : null,
        sentAt: sentAt.toISOString(),
        status: m.status,
        failedDetail: m.failedDetail ?? null,
        deliveredAt: m.deliveredAt?.toISOString() ?? null,
        readAt: m.readAt?.toISOString() ?? null,
        repliedAt: m.repliedAt?.toISOString() ?? null,
        clickedAt: clickedAt?.toISOString() ?? null,
        optedOut: Boolean(account?.unsubscribedAt),
      };
    });

    const reached = (statuses: string[]) => rows.filter((r) => statuses.includes(r.status)).length;
    return NextResponse.json({
      summary: {
        sent: reached(["sent", "delivered", "read", "replied"]),
        delivered: reached(["delivered", "read", "replied"]),
        read: reached(["read", "replied"]),
        clicked: rows.filter((r) => r.clickedAt).length,
        failed: reached(["failed"]),
        people: ids.length,
      },
      rows,
    });
  } catch (error) {
    console.error("Admin WhatsApp report error:", error);
    return NextResponse.json({ error: "Failed to load the WhatsApp report." }, { status: 500 });
  }
}
