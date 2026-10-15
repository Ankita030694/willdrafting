import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { leadsCol, ordersCol, usersCol } from "@/lib/db/collections";
import { PLANS } from "@/lib/plans";
import { settleOrder } from "@/lib/payments/settle";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const session = await auth();
  return session?.user?.role === "superadmin" ? session : null;
}

function csvCell(value: unknown): string {
  let text = String(value ?? "");
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET(request: NextRequest) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: "Access denied. Administrator privileges required." }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim().toLowerCase() || "";
    const statusFilter = searchParams.get("status") || "all";
    const gatewayFilter = searchParams.get("gateway") || "all";
    const exportCsv = searchParams.get("export") === "csv";

    const [orders, users, leads] = await Promise.all([ordersCol(), usersCol(), leadsCol()]);
    const [orderDocs, userDocs, leadDocs] = await Promise.all([
      orders.find({}).sort({ createdAt: -1 }).toArray(),
      users.find({}).toArray(),
      leads.find({}).toArray(),
    ]);

    const userMap = new Map(userDocs.map((u) => [u._id.toString(), u]));
    const leadMap = new Map(leadDocs.map((l) => [l._id.toString(), l]));

    let totalRevenue = 0;
    let paidCount = 0;
    let pendingCount = 0;
    let failedCount = 0;
    let adminGrantsCount = 0;

    const allTransactions = orderDocs.map((o) => {
      const accId = o.accountId.toString();
      const user = userMap.get(accId);
      const lead = leadMap.get(accId);

      if (o.status === "paid") {
        paidCount++;
        totalRevenue += Number(o.amount || 0);
      } else if (o.status === "created" || o.status === "pending") {
        pendingCount++;
      } else {
        failedCount++;
      }

      if (o.gateway === "admin_grant") {
        adminGrantsCount++;
      }

      const events = Array.isArray(o.events) ? o.events : [];
      const latestEvent = events.length > 0 ? events[events.length - 1] : null;
      const payload = (latestEvent?.payload || {}) as Record<string, unknown>;

      const mode = payload.mode ? String(payload.mode) : "";
      const appName = payload.App_Name ? String(payload.App_Name) : "";
      const pgType = payload.PG_TYPE ? String(payload.PG_TYPE) : "";
      const bankRefNum = payload.bank_ref_num ? String(payload.bank_ref_num) : "";
      const field9 = payload.field9 ? String(payload.field9) : "";
      const errorMessage = payload.error_Message ? String(payload.error_Message) : "";
      const addedOn = payload.addedon ? String(payload.addedon) : "";

      let methodLabel = "PayU Checkout";
      if (o.gateway === "admin_grant") {
        methodLabel = "Admin Grant";
      } else if (mode) {
        methodLabel = `${mode}${appName ? ` (${appName})` : pgType ? ` (${pgType})` : ""}`;
      } else if (o.status === "created") {
        methodLabel = "PayU (Checkout Opened)";
      }

      const customerName =
        user?.name ||
        lead?.name ||
        (typeof payload.firstname === "string" ? payload.firstname : "") ||
        o.email.split("@")[0] ||
        "Customer";

      const customerPhone = user?.phone || lead?.phone || "";
      const currentAccountKind = user ? "user" : lead ? "lead" : o.accountKind;

      return {
        id: o._id.toString(),
        txnId: o.txnId,
        invoiceNo: o.invoiceNo || null,
        accountId: accId,
        accountKind: o.accountKind,
        currentAccountKind,
        customerName,
        email: o.email,
        phone: customerPhone,
        planId: o.planId,
        planName: PLANS[o.planId]?.name || o.planId,
        kind: o.kind,
        baseAmount: o.baseAmount,
        discount: o.discount,
        amount: o.amount,
        couponCode: o.couponCode || null,
        status: o.status,
        gateway: o.gateway,
        gatewayPaymentId: o.gatewayPaymentId || (payload.mihpayid ? String(payload.mihpayid) : null),
        bankRefNum: bankRefNum || null,
        method: methodLabel,
        failureReason: o.failureReason || (errorMessage && errorMessage !== "NO ERROR" ? errorMessage : null),
        field9: field9 || null,
        addedOn: addedOn || null,
        createdAt: o.createdAt,
        updatedAt: o.updatedAt,
        paidAt: o.paidAt || null,
        events: events.map((ev) => ({
          eventId: ev.eventId,
          source: ev.source,
          status: ev.status,
          createdAt: ev.createdAt,
          payload: ev.payload,
        })),
      };
    });

    const filtered = allTransactions.filter((t) => {
      if (statusFilter !== "all") {
        if (statusFilter === "pending_all") {
          if (t.status !== "created" && t.status !== "pending") return false;
        } else if (t.status !== statusFilter) {
          return false;
        }
      }
      if (gatewayFilter !== "all" && t.gateway !== gatewayFilter) {
        return false;
      }
      if (search) {
        const hay = [
          t.txnId,
          t.invoiceNo,
          t.gatewayPaymentId,
          t.bankRefNum,
          t.customerName,
          t.email,
          t.phone,
          t.planId,
          t.method,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(search)) return false;
      }
      return true;
    });

    if (exportCsv) {
      const headers = [
        "Txn ID",
        "Invoice No",
        "Customer Name",
        "Email",
        "Phone",
        "Plan",
        "Order Kind",
        "Base Amount",
        "Discount",
        "Final Amount (INR)",
        "Status",
        "Gateway",
        "Method",
        "PayU MihPayId",
        "Bank Ref No",
        "Failure / Note",
        "Created At",
        "Paid At",
      ];
      const lines = filtered.map((t) =>
        [
          t.txnId,
          t.invoiceNo || "",
          t.customerName,
          t.email,
          t.phone,
          t.planName,
          t.kind,
          t.baseAmount,
          t.discount,
          t.amount,
          t.status,
          t.gateway,
          t.method,
          t.gatewayPaymentId || "",
          t.bankRefNum || "",
          t.failureReason || "",
          t.createdAt ? new Date(t.createdAt).toISOString() : "",
          t.paidAt ? new Date(t.paidAt).toISOString() : "",
        ]
          .map(csvCell)
          .join(",")
      );

      return new NextResponse([headers.map(csvCell).join(","), ...lines].join("\n"), {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="willdrafting_transactions_${Date.now()}.csv"`,
        },
      });
    }

    return NextResponse.json({
      transactions: filtered,
      stats: {
        totalOrders: orderDocs.length,
        totalRevenue,
        paidCount,
        pendingCount,
        failedCount,
        adminGrantsCount,
      },
    });
  } catch (error) {
    console.error("GET /api/admin/transactions error:", error);
    return NextResponse.json({ error: "Failed to load transactions." }, { status: 500 });
  }
}

/**
 * Triggers a live PayU verification check (`settleOrder(txnId, "verify_api")`)
 * so the superadmin can reconcile a pending/created order directly from the ledger.
 */
export async function POST(request: NextRequest) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: "Access denied. Administrator privileges required." }, { status: 403 });
    }

    const body = await request.json().catch(() => ({}));
    const txnId = typeof body.txnId === "string" ? body.txnId.trim() : "";
    if (!txnId) {
      return NextResponse.json({ error: "txnId is required." }, { status: 400 });
    }

    const result = await settleOrder(txnId, "verify_api");
    return NextResponse.json({
      success: true,
      outcome: result.outcome,
      txnId: result.txnId,
    });
  } catch (error) {
    console.error("POST /api/admin/transactions verify error:", error);
    return NextResponse.json({ error: "Could not verify transaction with PayU." }, { status: 500 });
  }
}
