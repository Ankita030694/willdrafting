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
import { leadsCol, ordersCol, usersCol } from "@/lib/db/collections";
import type { LeadDoc, OrderDoc, UserDoc } from "@/lib/db/types";
import type { PlanId } from "@/lib/authTypes";

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

    const [users, leads] = await Promise.all([usersCol(), leadsCol()]);

    const query: Record<string, unknown> = {};
    if (filter === "verified") query.authStatus = "verified";
    if (search) {
      const rx = { $regex: escapeRegex(search), $options: "i" };
      query.$or = [{ name: rx }, { email: rx }, { phone: rx }];
    }

    const wantUsers = filter !== "unpaid" && filter !== "leads";
    const wantLeads = filter !== "paid";
    const LIMIT = 1000;

    const [userDocs, leadDocs] = await Promise.all([
      wantUsers ? users.find(query).sort({ createdAt: -1 }).limit(LIMIT).toArray() : [],
      wantLeads ? leads.find(query).sort({ createdAt: -1 }).limit(LIMIT).toArray() : [],
    ]);

    const rows = [
      ...userDocs.map((u) => ({
        id: u._id.toString(),
        kind: "user" as const,
        name: u.name || "Unnamed",
        email: u.email || "",
        phone: u.phone || "",
        state: u.state || "",
        authStatus: u.authStatus || "unverified",
        paymentStatus: "paid" as const,
        funnelStage: "customer" as const,
        leadStatus: null as string | null,
        planId: u.planId ?? null,
        hasPassword: false,
        isBanned: Boolean(u.isBanned),
        willCredits: typeof u.willCredits === "number" ? u.willCredits : 0,
        createdAt: u.createdAt,
      })),
      ...leadDocs.map((l) => ({
        id: l._id.toString(),
        kind: "lead" as const,
        name: l.name || "Unnamed Lead",
        email: l.email || "",
        phone: l.phone || "",
        state: l.state || "",
        authStatus: l.authStatus || "unverified",
        paymentStatus: "unpaid" as const,
        funnelStage: (l.status === "captured" ? "lead" : "registered") as "lead" | "registered",
        leadStatus: l.status as string | null,
        planId: l.interestedPlanId ?? null,
        hasPassword: false,
        isBanned: false,
        willCredits: 0,
        createdAt: l.createdAt,
      })),
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (exportCsv) {
      const headers = ["ID", "Type", "Name", "Email", "Phone", "Auth Status", "Payment Status", "Lead Status", "Created At"];
      const lines = rows.map((r) =>
        [
          r.id,
          r.kind,
          r.name,
          r.email,
          r.phone,
          r.authStatus,
          r.paymentStatus,
          r.leadStatus ?? "",
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

    const [paid, leadCount, verifiedUsers, verifiedLeads] = await Promise.all([
      users.countDocuments(),
      leads.countDocuments(),
      users.countDocuments({ authStatus: "verified" }),
      leads.countDocuments({ authStatus: "verified" }),
    ]);

    return NextResponse.json({
      users: rows,
      stats: {
        total: paid + leadCount,
        paid,
        verified: verifiedUsers + verifiedLeads,
        leads: leadCount,
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
    const { id, isPaid, isBanned, willCredits, planId } = body as Record<string, unknown>;

    if (typeof id !== "string" || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "A valid account ID is required." }, { status: 400 });
    }

    const account = await findAccountById(id);
    if (!account) {
      return NextResponse.json({ error: "Account not found." }, { status: 404 });
    }

    // Granting access to a lead converts it into a paying customer (audited via an order).
    if (isPaid === true) {
      if (account.kind === "user") {
        return NextResponse.json({ success: true, message: "Account is already a customer." });
      }
      const plan: PlanId =
        planId === "lawyer_verified" || planId === "premium" ? planId : "essential";
      await grantPlan(account.doc, plan, session.user?.email || "superadmin");
      return NextResponse.json({ success: true, message: "Plan granted. Account is now a customer." });
    }
    if (isPaid === false) {
      return NextResponse.json(
        { error: "Customers cannot be reverted to leads. Use ban or adjust credits instead." },
        { status: 400 }
      );
    }

    if (account.kind !== "user") {
      return NextResponse.json(
        { error: "Only paying customers can be banned or have credits adjusted." },
        { status: 400 }
      );
    }

    const patch: Record<string, unknown> = {};
    if (typeof isBanned === "boolean") patch.isBanned = isBanned;
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
    const { name, email, phone, state, isPaid } = body as Record<string, unknown>;

    const trimmedName = cleanName(name);
    const cleanEmail = normalizeEmail(email);
    const cleanPhone = normalizePhone(phone);

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
      authStatus: "verified", // admin vouches for the contact; login still needs an emailed code
      status: "email_verified",
      source: "admin",
      marketingConsent: false,
      createdAt: now,
      updatedAt: now,
    };
    await (await leadsCol()).insertOne(lead);
    await logFunnelEvent(lead._id, cleanEmail, "signup", { source: "admin" });

    if (isPaid === true) {
      await grantPlan(lead, "essential", session.user?.email || "superadmin");
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
