import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { auth } from "@/auth";
import { cleanName, isValidEmail, normalizeEmail, normalizePhone } from "@/lib/authValidation";
import { sendAdminInviteEmail } from "@/lib/emailService";
import {
  convertLeadToUser,
  findAccountByEmail,
  findAccountById,
  logFunnelEvent,
  updateAccount,
} from "@/lib/accounts";
import { leadsCol, ordersCol, usersCol, willsCol } from "@/lib/db/collections";
import type { LeadDoc, OrderDoc, UserDoc } from "@/lib/db/types";
import type { PlanId } from "@/lib/authTypes";
import { unlockWill } from "@/lib/wills";
import { analyzeWillState } from "@/app/api/admin/drafts/route";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const session = await auth();
  return session?.user?.role === "superadmin" ? session : null;
}

const denied = () =>
  NextResponse.json({ error: "Access denied. Administrator privileges required." }, { status: 403 });

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Prevents spreadsheet formula injection when admins open the CSV export. */
function csvCell(value: unknown): string {
  let text = String(value ?? "");
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

/** Records a zero-amount order so admin grants are auditable like any other purchase. */
async function grantPlan(lead: LeadDoc, planId: PlanId, adminEmail: string): Promise<UserDoc> {
  const orders = await ordersCol();
  const now = new Date();
  const order: OrderDoc = {
    _id: new ObjectId(),
    txnId: `ADMIN-${new ObjectId().toHexString()}`,
    accountId: lead._id,
    accountKind: "lead",
    email: lead.email,
    planId,
    kind: "first_purchase",
    baseAmount: 0,
    discount: 0,
    amount: 0,
    status: "paid",
    gateway: "admin_grant",
    failureReason: `Granted by ${adminEmail}`,
    createdAt: now,
    updatedAt: now,
    paidAt: now,
  };
  await orders.insertOne(order);
  return convertLeadToUser(lead._id, { planId, orderId: order._id });
}

export async function GET(request: NextRequest) {
  try {
    if (!(await requireAdmin())) return denied();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim().slice(0, 100);
    const filter = searchParams.get("filter") || "all";
    const exportCsv = searchParams.get("export") === "csv";

    const [users, leads, wills, orders] = await Promise.all([
      usersCol(),
      leadsCol(),
      willsCol(),
      ordersCol(),
    ]);

    const query: Record<string, unknown> = {};
    if (filter === "verified") query.authStatus = "verified";
    if (filter === "banned") query.isBanned = true;
    if (filter === "checkout_started") query.status = "checkout_started";
    if (filter === "captured") query.status = "captured";

    if (search) {
      const rx = { $regex: escapeRegex(search), $options: "i" };
      query.$or = [{ name: rx }, { email: rx }, { phone: rx }, { state: rx }];
    }

    const wantUsers =
      filter !== "unpaid" &&
      filter !== "leads" &&
      filter !== "checkout_started" &&
      filter !== "captured";
    const wantLeads = filter !== "paid" && filter !== "banned";
    const LIMIT = 1000;

    const [userDocs, leadDocs, willDocs, orderDocs] = await Promise.all([
      wantUsers ? users.find(query).sort({ createdAt: -1 }).limit(LIMIT).toArray() : [],
      wantLeads ? leads.find(query).sort({ createdAt: -1 }).limit(LIMIT).toArray() : [],
      wills.find({ userId: { $exists: true } }).toArray(),
      orders.find({}).sort({ createdAt: -1 }).toArray(),
    ]);

    const willByUserId = new Map(
      willDocs.filter((w) => w.userId).map((w) => [w.userId!.toString(), w])
    );

    const ordersByAccountId = new Map<string, OrderDoc[]>();
    for (const o of orderDocs) {
      const key = o.accountId.toString();
      const arr = ordersByAccountId.get(key) || [];
      arr.push(o);
      ordersByAccountId.set(key, arr);
    }

    const buildWillPayload = (accountId: string) => {
      const w = willByUserId.get(accountId);
      if (!w) return null;
      const progress = analyzeWillState(w.state);
      return {
        willId: w._id.toString(),
        version: w.version || 1,
        detailsVerified: Boolean(w.detailsVerified),
        detailsVerifiedAt: w.detailsVerifiedAt || null,
        lockedAt: w.lockedAt || null,
        downloadCount: w.downloadCount || 0,
        lastDownloadedAt: w.lastDownloadedAt || null,
        updatedAt: w.updatedAt,
        createdAt: w.createdAt,
        progress,
        state: w.state,
      };
    };

    const buildOrdersPayload = (accountId: string) => {
      const accOrders = ordersByAccountId.get(accountId) || [];
      const paidOrders = accOrders.filter((o) => o.status === "paid");
      const totalPaidAmount = paidOrders.reduce((s, o) => s + Number(o.amount || 0), 0);
      return {
        totalOrders: accOrders.length,
        paidOrdersCount: paidOrders.length,
        totalPaidAmount,
        lastOrder: accOrders[0]
          ? {
              txnId: accOrders[0].txnId,
              amount: accOrders[0].amount,
              status: accOrders[0].status,
              planId: accOrders[0].planId,
              gateway: accOrders[0].gateway,
              createdAt: accOrders[0].createdAt,
            }
          : null,
        list: accOrders.map((o) => ({
          id: o._id.toString(),
          txnId: o.txnId,
          invoiceNo: o.invoiceNo || null,
          planId: o.planId,
          amount: o.amount,
          status: o.status,
          gateway: o.gateway,
          failureReason: o.failureReason || null,
          createdAt: o.createdAt,
          paidAt: o.paidAt || null,
        })),
      };
    };

    let rows = [
      ...userDocs.map((u) => {
        const idStr = u._id.toString();
        const will = buildWillPayload(idStr);
        const ordersInfo = buildOrdersPayload(idStr);
        return {
          id: idStr,
          kind: "user" as const,
          name: u.name || will?.state?.testator?.fullName || "Unnamed Customer",
          email: u.email || "",
          phone: u.phone || will?.state?.testator?.phone || "",
          state: u.state || will?.state?.testator?.state || "",
          googleId: u.googleId || null,
          authStatus: u.authStatus || "unverified",
          paymentStatus: "paid" as const,
          funnelStage: "customer" as const,
          leadStatus: "converted" as string | null,
          source: u.leadSource || "direct",
          message: null as string | null,
          planId: u.planId ?? null,
          isBanned: Boolean(u.isBanned),
          willCredits: typeof u.willCredits === "number" ? u.willCredits : 0,
          paidAt: u.paidAt || null,
          lastCheckoutAt: u.paidAt || null,
          createdAt: u.createdAt,
          updatedAt: u.updatedAt,
          will,
          orders: ordersInfo,
        };
      }),
      ...leadDocs.map((l) => {
        const idStr = l._id.toString();
        const will = buildWillPayload(idStr);
        const ordersInfo = buildOrdersPayload(idStr);
        return {
          id: idStr,
          kind: "lead" as const,
          name: l.name || will?.state?.testator?.fullName || "Unnamed Lead",
          email: l.email || "",
          phone: l.phone || will?.state?.testator?.phone || "",
          state: l.state || will?.state?.testator?.state || "",
          googleId: l.googleId || null,
          authStatus: l.authStatus || "unverified",
          paymentStatus: "unpaid" as const,
          funnelStage: (l.status === "captured" ? "lead" : "registered") as "lead" | "registered",
          leadStatus: l.status as string | null,
          source: l.source || "unknown",
          message: l.message || null,
          planId: l.interestedPlanId ?? will?.progress?.selectedPlan ?? null,
          isBanned: false,
          willCredits: 0,
          paidAt: null,
          lastCheckoutAt: l.lastCheckoutAt || null,
          createdAt: l.createdAt,
          updatedAt: l.updatedAt,
          will,
          orders: ordersInfo,
        };
      }),
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (filter === "with_will") {
      rows = rows.filter((r) => Boolean(r.will));
    }

    if (exportCsv) {
      const headers = [
        "ID",
        "Account Type",
        "Name",
        "Email",
        "Phone",
        "State",
        "Source",
        "Auth Status",
        "Payment Status",
        "Lead Status",
        "Plan",
        "Will Started",
        "Will Completion %",
        "Will Verified",
        "Total Paid (INR)",
        "Created At",
      ];
      const lines = rows.map((r) =>
        [
          r.id,
          r.kind,
          r.name,
          r.email,
          r.phone,
          r.state,
          r.source,
          r.authStatus,
          r.paymentStatus,
          r.leadStatus ?? "",
          r.planId ?? "",
          r.will ? "Yes" : "No",
          r.will ? `${r.will.progress.completionPercent}%` : "0%",
          r.will?.detailsVerified ? "Yes" : "No",
          r.orders.totalPaidAmount,
          r.createdAt ? new Date(r.createdAt).toISOString() : "",
        ]
          .map(csvCell)
          .join(",")
      );
      return new NextResponse([headers.map(csvCell).join(","), ...lines].join("\n"), {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="willdrafting_users_${Date.now()}.csv"`,
        },
      });
    }

    const [paid, leadCount, verifiedUsers, verifiedLeads, checkoutStartedCount] = await Promise.all([
      users.countDocuments(),
      leads.countDocuments(),
      users.countDocuments({ authStatus: "verified" }),
      leads.countDocuments({ authStatus: "verified" }),
      leads.countDocuments({ status: "checkout_started" }),
    ]);

    return NextResponse.json({
      users: rows,
      stats: {
        total: paid + leadCount,
        paid,
        verified: verifiedUsers + verifiedLeads,
        leads: leadCount,
        checkoutStarted: checkoutStartedCount,
        withWill: willDocs.length,
      },
    });
  } catch (error) {
    console.error("Admin users API error:", error);
    return NextResponse.json({ error: "Failed to fetch users list." }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) return denied();

    const body = await request.json().catch(() => ({}));
    const {
      id,
      isPaid,
      isBanned,
      willCredits,
      planId,
      authStatus,
      unlockUserWill,
    } = body as Record<string, unknown>;

    if (typeof id !== "string" || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "A valid account ID is required." }, { status: 400 });
    }

    const account = await findAccountById(id);
    if (!account) {
      return NextResponse.json({ error: "Account not found." }, { status: 404 });
    }

    // 1. Unlock locked will if requested
    if (unlockUserWill === true) {
      await unlockWill(account.doc._id);
      return NextResponse.json({ success: true, message: "Will unlocked for editing." });
    }

    // 2. Toggle email verification status (works for both leads and users)
    if (authStatus === "verified" || authStatus === "unverified") {
      const patch: Record<string, unknown> = { authStatus };
      if (account.kind === "lead" && authStatus === "verified" && account.doc.status === "captured") {
        patch.status = "email_verified";
      }
      await updateAccount(account, patch);
      return NextResponse.json({ success: true, message: `Email marked as ${authStatus}.` });
    }

    // 3. Granting access to a lead converts it into a paying customer (audited via an order).
    if (isPaid === true) {
      if (account.kind === "user") {
        if (planId === "essential" || planId === "lawyer_verified" || planId === "premium") {
          await updateAccount(account, { planId });
          return NextResponse.json({ success: true, message: "Customer plan updated." });
        }
        return NextResponse.json({ success: true, message: "Account is already a customer." });
      }
      const plan: PlanId =
        planId === "lawyer_verified" || planId === "premium" ? planId : "essential";
      await grantPlan(account.doc, plan, session.user?.email || "superadmin");
      return NextResponse.json({ success: true, message: "Plan granted. Account is now a paid customer." });
    }
    if (isPaid === false) {
      return NextResponse.json(
        { error: "Paid customers cannot be reverted to leads. Use Ban or adjust credits instead." },
        { status: 400 }
      );
    }

    // 4. Customer-only patches (ban, credits, planId)
    if (account.kind !== "user") {
      return NextResponse.json(
        { error: "Only paying customers can be banned or have credits adjusted." },
        { status: 400 }
      );
    }

    const patch: Record<string, unknown> = {};
    if (typeof isBanned === "boolean") patch.isBanned = isBanned;
    if (planId === "essential" || planId === "lawyer_verified" || planId === "premium") {
      patch.planId = planId;
    }
    if (willCredits !== undefined) {
      if (!Number.isInteger(willCredits) || (willCredits as number) < 0 || (willCredits as number) > 100) {
        return NextResponse.json({ error: "Credits must be a whole number from 0 to 100." }, { status: 400 });
      }
      patch.willCredits = willCredits;
    }
    if (Object.keys(patch).length === 0) {
      return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
    }

    await updateAccount(account, patch);
    return NextResponse.json({ success: true, message: "User updated successfully." });
  } catch (error) {
    console.error("Admin user PATCH error:", error);
    return NextResponse.json({ error: "Failed to update user." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) return denied();

    const body = await request.json().catch(() => ({}));
    const { name, email, phone, state, isPaid, planId } = body as Record<string, unknown>;

    const trimmedName = cleanName(name);
    const cleanEmail = normalizeEmail(email);
    const cleanPhone = normalizePhone(phone);
    const selectedPlan: PlanId =
      planId === "lawyer_verified" || planId === "premium" ? planId : "essential";

    if (!trimmedName || !cleanEmail || !isValidEmail(cleanEmail)) {
      return NextResponse.json({ error: "A valid name and email address are required." }, { status: 400 });
    }

    if (await findAccountByEmail(cleanEmail)) {
      return NextResponse.json({ error: "An account with this email address already exists." }, { status: 409 });
    }

    const now = new Date();
    const lead: LeadDoc = {
      _id: new ObjectId(),
      name: trimmedName,
      email: cleanEmail,
      phone: cleanPhone || "",
      state: typeof state === "string" && state ? state.slice(0, 60) : undefined,
      authStatus: "verified",
      status: "email_verified",
      source: "admin",
      interestedPlanId: selectedPlan,
      marketingConsent: false,
      createdAt: now,
      updatedAt: now,
    };
    await (await leadsCol()).insertOne(lead);
    await logFunnelEvent(lead._id, cleanEmail, "signup", { source: "admin" });

    if (isPaid === true) {
      await grantPlan(lead, selectedPlan, session.user?.email || "superadmin");
    }

    await sendAdminInviteEmail(cleanEmail, trimmedName);

    return NextResponse.json({
      success: true,
      message: "Account created and invitation email dispatched.",
      id: lead._id.toString(),
    });
  } catch (error) {
    console.error("Admin create user error:", error);
    return NextResponse.json({ error: "Failed to create user account." }, { status: 500 });
  }
}
