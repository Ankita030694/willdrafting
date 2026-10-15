import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  funnelEventsCol,
  leadsCol,
  ordersCol,
  usersCol,
  willsCol,
} from "@/lib/db/collections";
import { QUESTIONNAIRE_STEPS } from "@/lib/questionnaireFlow";
import { PLANS } from "@/lib/plans";
import type { WillDraftingState } from "@/lib/willDraftingStore";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const session = await auth();
  return session?.user?.role === "superadmin" ? session : null;
}

function summarizeWillProgress(state?: WillDraftingState | null) {
  if (!state) {
    return {
      currentStep: 1,
      currentStepTitle: "Not Started",
      willStatus: "drafting",
      selectedPlan: null,
      sectionsCompleted: 0,
      completionPercent: 0,
      familyCount: 0,
      assetsCount: 0,
      allocationsCount: 0,
      totalEstateValue: 0,
      testatorName: "",
      testatorEmail: "",
      testatorPhone: "",
    };
  }

  const stepNum = state.currentStep || 1;
  const stepObj = QUESTIONNAIRE_STEPS.find((s) => s.step === stepNum);
  const t = state.testator;
  const hasPersonal = Boolean(t?.fullName?.trim() && (t?.dob || t?.phone || t?.address || t?.state));
  const familyCount = Array.isArray(state.familyMembers) ? state.familyMembers.length : 0;
  const assetsCount = Array.isArray(state.assets) ? state.assets.length : 0;
  const allocationsCount = Array.isArray(state.allocations) ? state.allocations.length : 0;
  const hasAllocations = allocationsCount > 0 || Boolean(state.residuaryBeneficiaryName?.trim());
  const hasExecutor = Boolean(state.executorPrimary?.name?.trim());
  const hasWishes = Boolean(
    state.specialWishes?.hasNoSpecialWishes ||
      state.specialWishes?.funeralCeremonyWishes?.trim() ||
      state.specialWishes?.personalMessageToFamily?.trim() ||
      state.emotionalReason?.trim()
  );

  let sectionsCompleted = 0;
  if (hasPersonal) sectionsCompleted++;
  if (familyCount > 0) sectionsCompleted++;
  if (assetsCount > 0) sectionsCompleted++;
  if (hasAllocations) sectionsCompleted++;
  if (hasExecutor) sectionsCompleted++;
  if (hasWishes) sectionsCompleted++;

  const totalEstateValue = Array.isArray(state.assets)
    ? state.assets.reduce((sum, a) => sum + (Number(a.approximateValue) || 0), 0)
    : 0;

  return {
    currentStep: stepNum,
    currentStepTitle: stepObj?.title || `Step ${stepNum}`,
    willStatus: state.willStatus || "drafting",
    selectedPlan: state.selectedPlan || null,
    sectionsCompleted,
    completionPercent: Math.round((sectionsCompleted / 6) * 100),
    familyCount,
    assetsCount,
    allocationsCount,
    totalEstateValue,
    testatorName: t?.fullName?.trim() || "",
    testatorEmail: t?.email?.trim() || "",
    testatorPhone: t?.phone?.trim() || "",
  };
}

export async function GET() {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: "Access denied. Administrator privileges required." }, { status: 403 });
    }

    const [users, leads, wills, orders, funnelEvents] = await Promise.all([
      usersCol(),
      leadsCol(),
      willsCol(),
      ordersCol(),
      funnelEventsCol(),
    ]);

    const [userDocs, leadDocs, willDocs, orderDocs, recentEvents] = await Promise.all([
      users.find({}).sort({ createdAt: -1 }).toArray(),
      leads.find({}).sort({ createdAt: -1 }).toArray(),
      wills.find({}).sort({ updatedAt: -1 }).toArray(),
      orders.find({}).sort({ createdAt: -1 }).toArray(),
      funnelEvents.find({}).sort({ createdAt: -1 }).limit(15).toArray(),
    ]);

    const userMap = new Map(userDocs.map((u) => [u._id.toString(), u]));
    const leadMap = new Map(leadDocs.map((l) => [l._id.toString(), l]));
    const willByUserId = new Map<string, (typeof willDocs)[number]>();
    for (const w of willDocs) {
      if (w.userId) {
        willByUserId.set(w.userId.toString(), w);
      }
    }

    // Categorize wills
    let paidWillsCount = 0;
    let loggedInUnpaidWillsCount = 0;
    let guestWillsCount = 0;
    let verifiedWillsCount = 0;
    let totalDownloads = 0;

    for (const w of willDocs) {
      if (w.detailsVerified) verifiedWillsCount++;
      totalDownloads += Number(w.downloadCount || 0);

      if (w.isGuest || !w.userId) {
        guestWillsCount++;
      } else if (userMap.has(w.userId.toString())) {
        paidWillsCount++;
      } else {
        loggedInUnpaidWillsCount++;
      }
    }

    // Orders & Revenue metrics
    let totalRevenue = 0;
    let paidOrdersCount = 0;
    let pendingOrdersCount = 0;
    let failedOrdersCount = 0;

    for (const o of orderDocs) {
      if (o.status === "paid") {
        paidOrdersCount++;
        totalRevenue += Number(o.amount || 0);
      } else if (o.status === "created" || o.status === "pending") {
        pendingOrdersCount++;
      } else if (o.status === "failed" || o.status === "abandoned") {
        failedOrdersCount++;
      }
    }

    const verifiedUsersCount = userDocs.filter((u) => u.authStatus === "verified").length;
    const verifiedLeadsCount = leadDocs.filter((l) => l.authStatus === "verified").length;
    const checkoutStartedLeadsCount = leadDocs.filter((l) => l.status === "checkout_started").length;

    // Recent unified accounts (latest 8)
    const allAccounts = [
      ...userDocs.map((u) => {
        const w = willByUserId.get(u._id.toString());
        return {
          id: u._id.toString(),
          kind: "user" as const,
          name: u.name || w?.state?.testator?.fullName || "Unnamed Customer",
          email: u.email || "",
          phone: u.phone || w?.state?.testator?.phone || "",
          authStatus: u.authStatus,
          paymentStatus: "paid" as const,
          planId: u.planId,
          source: u.leadSource || "direct",
          hasWill: Boolean(w),
          willVerified: Boolean(w?.detailsVerified),
          willProgress: summarizeWillProgress(w?.state),
          createdAt: u.createdAt,
          updatedAt: u.updatedAt,
        };
      }),
      ...leadDocs.map((l) => {
        const w = willByUserId.get(l._id.toString());
        return {
          id: l._id.toString(),
          kind: "lead" as const,
          name: l.name || w?.state?.testator?.fullName || "Unnamed Lead",
          email: l.email || "",
          phone: l.phone || w?.state?.testator?.phone || "",
          authStatus: l.authStatus,
          paymentStatus: "unpaid" as const,
          leadStatus: l.status,
          planId: l.interestedPlanId || null,
          source: l.source,
          hasWill: Boolean(w),
          willVerified: Boolean(w?.detailsVerified),
          willProgress: summarizeWillProgress(w?.state),
          createdAt: l.createdAt,
          updatedAt: l.updatedAt,
        };
      }),
    ]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 8);

    // Recent unpaid & guest will drafts (latest 8)
    const unpaidAndGuestDrafts = willDocs
      .filter((w) => {
        if (w.isGuest || !w.userId) return true;
        return !userMap.has(w.userId.toString());
      })
      .slice(0, 8)
      .map((w) => {
        const isGuest = Boolean(w.isGuest || !w.userId);
        const lead = w.userId ? leadMap.get(w.userId.toString()) : null;
        const progress = summarizeWillProgress(w.state);
        const hasTypedContact = Boolean(progress.testatorEmail || progress.testatorPhone || progress.testatorName);

        return {
          id: w._id.toString(),
          category: isGuest ? ("guest_not_logged_in" as const) : ("logged_in_unpaid" as const),
          guestContactState: isGuest ? (hasTypedContact ? "typed_in_form" : "no_email") : null,
          sessionId: w.sessionId || null,
          name: lead?.name || progress.testatorName || (isGuest ? "Anonymous Guest" : "Unnamed User"),
          email: lead?.email || w.email || progress.testatorEmail || "",
          phone: lead?.phone || progress.testatorPhone || "",
          leadStatus: lead?.status || null,
          source: lead?.source || (isGuest ? "guest_wizard" : null),
          version: w.version,
          detailsVerified: Boolean(w.detailsVerified),
          progress,
          updatedAt: w.updatedAt,
          createdAt: w.createdAt,
        };
      });

    // Recent transactions (latest 8)
    const recentTransactions = orderDocs.slice(0, 8).map((o) => {
      const accId = o.accountId.toString();
      const user = userMap.get(accId);
      const lead = leadMap.get(accId);
      const lastEvent = Array.isArray(o.events) && o.events.length > 0 ? o.events[o.events.length - 1] : null;
      const payload = (lastEvent?.payload || {}) as Record<string, unknown>;
      const mode = payload.mode ? String(payload.mode) : "";
      const appName = payload.App_Name ? String(payload.App_Name) : "";

      return {
        id: o._id.toString(),
        txnId: o.txnId,
        invoiceNo: o.invoiceNo || null,
        customerName:
          user?.name ||
          lead?.name ||
          (typeof payload.firstname === "string" ? payload.firstname : "") ||
          o.email.split("@")[0] ||
          "Customer",
        email: o.email,
        phone: user?.phone || lead?.phone || "",
        planId: o.planId,
        planName: PLANS[o.planId]?.name || o.planId,
        amount: o.amount,
        status: o.status,
        gateway: o.gateway,
        method:
          o.gateway === "admin_grant"
            ? "Admin Grant"
            : mode
            ? `${mode}${appName ? ` (${appName})` : ""}`
            : "PayU Checkout",
        createdAt: o.createdAt,
        paidAt: o.paidAt || null,
      };
    });

    return NextResponse.json({
      stats: {
        totalAccounts: userDocs.length + leadDocs.length,
        paidCustomers: userDocs.length,
        unpaidLeads: leadDocs.length,
        verifiedAccounts: verifiedUsersCount + verifiedLeadsCount,
        checkoutStartedLeads: checkoutStartedLeadsCount,
        totalWills: willDocs.length,
        paidWills: paidWillsCount,
        loggedInUnpaidWills: loggedInUnpaidWillsCount,
        guestWills: guestWillsCount,
        verifiedWills: verifiedWillsCount,
        totalDownloads,
        totalRevenue,
        paidOrdersCount,
        pendingOrdersCount,
        failedOrdersCount,
      },
      recentAccounts: allAccounts,
      recentUnpaidDrafts: unpaidAndGuestDrafts,
      recentTransactions,
      recentEvents: recentEvents.map((ev) => ({
        id: ev._id.toString(),
        accountId: ev.accountId.toString(),
        email: ev.email,
        type: ev.type,
        meta: ev.meta || null,
        createdAt: ev.createdAt,
      })),
    });
  } catch (error) {
    console.error("GET /api/admin/overview error:", error);
    return NextResponse.json({ error: "Failed to load dashboard overview." }, { status: 500 });
  }
}
