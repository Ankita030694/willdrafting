import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { auth } from "@/auth";
import { leadsCol, ordersCol, usersCol, willsCol } from "@/lib/db/collections";
import { QUESTIONNAIRE_STEPS } from "@/lib/questionnaireFlow";
import { BLANK_STATE, runLegalHealthCheck, type WillDraftingState } from "@/lib/willDraftingStore";

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

export type DraftCategory =
  | "logged_in_unpaid"
  | "guest_not_logged_in"
  | "logged_in_no_will"
  | "paid_customer";

export type GuestContactState = "no_email" | "typed_in_form" | null;

export function analyzeWillState(rawState?: WillDraftingState | null) {
  if (!rawState) {
    return {
      currentStep: 0,
      currentStepTitle: "No Will Started",
      willStatus: "not_started",
      selectedPlan: null,
      sectionsCompleted: 0,
      completionPercent: 0,
      filledSections: [] as string[],
      missingSections: ["Personal Profile", "Family", "Assets", "Allocations", "Executors", "Special Wishes"],
      familyCount: 0,
      assetsCount: 0,
      allocationsCount: 0,
      totalEstateValue: 0,
      hasExecutor: false,
      hasGuardian: false,
      hasMinors: false,
      healthIssuesCount: 0,
      criticalIssuesCount: 0,
      healthIssues: [] as Array<{ severity: string; title: string; category: string }>,
    };
  }

  const state = { ...BLANK_STATE, ...rawState } as WillDraftingState;
  const stepNum = state.currentStep || 1;
  const stepObj = QUESTIONNAIRE_STEPS.find((s) => s.step === stepNum);
  const t = state.testator;

  const filledSections: string[] = [];
  const missingSections: string[] = [];

  const hasPersonal = Boolean(
    t?.fullName?.trim() &&
      (t?.dob?.trim() ||
        t?.phone?.trim() ||
        t?.address?.trim() ||
        t?.city?.trim() ||
        t?.state?.trim() ||
        t?.pan?.trim())
  );
  if (hasPersonal) filledSections.push("About You");
  else missingSections.push("About You");

  const familyCount = Array.isArray(state.familyMembers) ? state.familyMembers.length : 0;
  if (familyCount > 0) filledSections.push(`Family (${familyCount})`);
  else missingSections.push("Family");

  const assetsCount = Array.isArray(state.assets) ? state.assets.length : 0;
  if (assetsCount > 0) filledSections.push(`Assets (${assetsCount})`);
  else missingSections.push("Assets");

  const allocationsCount = Array.isArray(state.allocations) ? state.allocations.length : 0;
  const hasResiduary = Boolean(state.residuaryBeneficiaryName?.trim());
  if (allocationsCount > 0 || hasResiduary) {
    filledSections.push(`Allocations (${allocationsCount})`);
  } else {
    missingSections.push("Allocations");
  }

  const hasExecutor = Boolean(state.executorPrimary?.name?.trim());
  if (hasExecutor) filledSections.push("Executor");
  else missingSections.push("Executor");

  const hasWrittenWishes = Boolean(
    state.specialWishes?.jewelleryInstructions?.trim() ||
      state.specialWishes?.personalBelongings?.trim() ||
      state.specialWishes?.petsCare?.trim() ||
      state.specialWishes?.charitableGifts?.trim() ||
      state.specialWishes?.digitalAccounts?.trim() ||
      state.specialWishes?.funeralCeremonyWishes?.trim() ||
      state.specialWishes?.personalMessageToFamily?.trim() ||
      state.emotionalReason?.trim()
  );
  const hasWishes =
    hasWrittenWishes || Boolean(stepNum > 8 && state.specialWishes?.hasNoSpecialWishes);
  if (hasWishes) filledSections.push("Wishes & Purpose");
  else missingSections.push("Wishes & Purpose");

  const totalEstateValue = Array.isArray(state.assets)
    ? state.assets.reduce((sum, a) => sum + (Number(a.approximateValue) || 0), 0)
    : 0;

  const hasMinors = Array.isArray(state.familyMembers) && state.familyMembers.some((m) => m.isMinor);
  const hasGuardian = Boolean(state.guardianPrimary?.name?.trim());

  let healthIssues: Array<{ severity: string; title: string; category: string }> = [];
  try {
    healthIssues = runLegalHealthCheck(state)
      .filter((i) => i.severity !== "pass")
      .map((i) => ({ severity: i.severity, title: i.title, category: i.category }));
  } catch {
    healthIssues = [];
  }

  const sectionsCompleted = filledSections.length;
  return {
    currentStep: stepNum,
    currentStepTitle: stepObj?.title || `Step ${stepNum}`,
    willStatus: state.willStatus || "drafting",
    selectedPlan: state.selectedPlan || null,
    sectionsCompleted,
    completionPercent: Math.round((sectionsCompleted / 6) * 100),
    filledSections,
    missingSections,
    familyCount,
    assetsCount,
    allocationsCount,
    totalEstateValue,
    hasExecutor,
    hasGuardian,
    hasMinors,
    healthIssuesCount: healthIssues.length,
    criticalIssuesCount: healthIssues.filter((i) => i.severity === "critical").length,
    healthIssues,
  };
}

export async function GET(request: NextRequest) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: "Access denied. Administrator privileges required." }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim().toLowerCase() || "";
    const filter = searchParams.get("filter") || "unpaid_all"; // unpaid_all | logged_in_unpaid | guest_not_logged_in | guest_no_email | guest_typed_email | logged_in_no_will | paid_customer
    const exportCsv = searchParams.get("export") === "csv";

    const [users, leads, wills, orders] = await Promise.all([
      usersCol(),
      leadsCol(),
      willsCol(),
      ordersCol(),
    ]);

    const [userDocs, leadDocs, willDocs, orderDocs] = await Promise.all([
      users.find({}).sort({ createdAt: -1 }).toArray(),
      leads.find({}).sort({ createdAt: -1 }).toArray(),
      wills.find({}).sort({ updatedAt: -1 }).toArray(),
      orders.find({}).sort({ createdAt: -1 }).toArray(),
    ]);

    const userMap = new Map(userDocs.map((u) => [u._id.toString(), u]));
    const leadMap = new Map(leadDocs.map((l) => [l._id.toString(), l]));

    const ordersByAccount = new Map<string, typeof orderDocs>();
    for (const o of orderDocs) {
      const key = o.accountId.toString();
      const arr = ordersByAccount.get(key) || [];
      arr.push(o);
      ordersByAccount.set(key, arr);
    }

    const willUserIds = new Set<string>();
    const records: Array<Record<string, unknown>> = [];

    // 1. Process all Will documents (both Logged-in and Anonymous Guests)
    for (const w of willDocs) {
      const userIdStr = w.userId ? w.userId.toString() : null;
      if (userIdStr) willUserIds.add(userIdStr);

      const isGuest = Boolean(w.isGuest || !userIdStr);
      const userDoc = userIdStr ? userMap.get(userIdStr) : null;
      const leadDoc = userIdStr ? leadMap.get(userIdStr) : null;

      let category: DraftCategory;
      if (isGuest) {
        category = "guest_not_logged_in";
      } else if (userDoc) {
        category = "paid_customer";
      } else {
        category = "logged_in_unpaid";
      }

      const t = w.state?.testator;
      const typedEmail = t?.email?.trim() || w.email?.trim() || "";
      const typedPhone = t?.phone?.trim() || "";
      const typedName = t?.fullName?.trim() || "";

      const guestContactState: GuestContactState = isGuest
        ? typedEmail || typedPhone
          ? "typed_in_form"
          : "no_email"
        : null;

      const progress = analyzeWillState(w.state);
      const accOrders = userIdStr ? ordersByAccount.get(userIdStr) || [] : [];

      const displayName =
        userDoc?.name ||
        leadDoc?.name ||
        typedName ||
        (isGuest ? `Guest (${(w.sessionId || w._id.toString()).slice(0, 12)})` : "Unnamed User");

      const displayEmail = userDoc?.email || leadDoc?.email || typedEmail || "";
      const displayPhone = userDoc?.phone || leadDoc?.phone || typedPhone || "";
      const displayState = userDoc?.state || leadDoc?.state || t?.state || "";

      records.push({
        id: w._id.toString(),
        willId: w._id.toString(),
        accountId: userIdStr,
        category,
        guestContactState,
        isGuest,
        sessionId: w.sessionId || null,
        expiresAt: w.expiresAt || null,
        name: displayName,
        email: displayEmail,
        phone: displayPhone,
        stateLocation: displayState,
        account: userDoc
          ? {
              id: userDoc._id.toString(),
              kind: "user" as const,
              name: userDoc.name,
              email: userDoc.email,
              phone: userDoc.phone,
              state: userDoc.state || "",
              authStatus: userDoc.authStatus,
              status: "paid_customer",
              source: userDoc.leadSource || "direct",
              googleId: userDoc.googleId || null,
              planId: userDoc.planId,
              paidAt: userDoc.paidAt,
              createdAt: userDoc.createdAt,
            }
          : leadDoc
          ? {
              id: leadDoc._id.toString(),
              kind: "lead" as const,
              name: leadDoc.name,
              email: leadDoc.email,
              phone: leadDoc.phone,
              state: leadDoc.state || "",
              authStatus: leadDoc.authStatus,
              status: leadDoc.status,
              source: leadDoc.source,
              googleId: leadDoc.googleId || null,
              interestedPlanId: leadDoc.interestedPlanId || null,
              lastCheckoutAt: leadDoc.lastCheckoutAt || null,
              message: leadDoc.message || null,
              createdAt: leadDoc.createdAt,
            }
          : null,
        version: w.version || 1,
        detailsVerified: Boolean(w.detailsVerified),
        detailsVerifiedAt: w.detailsVerifiedAt || null,
        lockedAt: w.lockedAt || null,
        downloadCount: w.downloadCount || 0,
        lastDownloadedAt: w.lastDownloadedAt || null,
        createdAt: w.createdAt,
        updatedAt: w.updatedAt,
        progress,
        orders: accOrders.map((o) => ({
          id: o._id.toString(),
          txnId: o.txnId,
          planId: o.planId,
          amount: o.amount,
          status: o.status,
          gateway: o.gateway,
          failureReason: o.failureReason || null,
          createdAt: o.createdAt,
          paidAt: o.paidAt || null,
        })),
        willState: w.state,
      });
    }

    // 2. Also include unpaid leads who have logged in / submitted form but haven't saved a Will doc yet
    for (const l of leadDocs) {
      const leadIdStr = l._id.toString();
      if (willUserIds.has(leadIdStr)) continue;

      const accOrders = ordersByAccount.get(leadIdStr) || [];
      const progress = analyzeWillState(null);

      records.push({
        id: `lead_${leadIdStr}`,
        willId: null,
        accountId: leadIdStr,
        category: "logged_in_no_will" as DraftCategory,
        guestContactState: null,
        isGuest: false,
        sessionId: null,
        expiresAt: null,
        name: l.name || "Unnamed Lead",
        email: l.email || "",
        phone: l.phone || "",
        stateLocation: l.state || "",
        account: {
          id: leadIdStr,
          kind: "lead" as const,
          name: l.name,
          email: l.email,
          phone: l.phone,
          state: l.state || "",
          authStatus: l.authStatus,
          status: l.status,
          source: l.source,
          googleId: l.googleId || null,
          interestedPlanId: l.interestedPlanId || null,
          lastCheckoutAt: l.lastCheckoutAt || null,
          message: l.message || null,
          createdAt: l.createdAt,
        },
        version: 0,
        detailsVerified: false,
        detailsVerifiedAt: null,
        lockedAt: null,
        downloadCount: 0,
        lastDownloadedAt: null,
        createdAt: l.createdAt,
        updatedAt: l.updatedAt,
        progress,
        orders: accOrders.map((o) => ({
          id: o._id.toString(),
          txnId: o.txnId,
          planId: o.planId,
          amount: o.amount,
          status: o.status,
          gateway: o.gateway,
          failureReason: o.failureReason || null,
          createdAt: o.createdAt,
          paidAt: o.paidAt || null,
        })),
        willState: null,
      });
    }

    // Sort all by most recently updated
    records.sort(
      (a, b) =>
        new Date(String(b.updatedAt || b.createdAt)).getTime() -
        new Date(String(a.updatedAt || a.createdAt)).getTime()
    );

    // Compute counts across all categories before filtering
    const counts = {
      loggedInUnpaidWithWill: records.filter((r) => r.category === "logged_in_unpaid").length,
      guestNotLoggedIn: records.filter((r) => r.category === "guest_not_logged_in").length,
      guestNoEmail: records.filter(
        (r) => r.category === "guest_not_logged_in" && r.guestContactState === "no_email"
      ).length,
      guestTypedEmail: records.filter(
        (r) => r.category === "guest_not_logged_in" && r.guestContactState === "typed_in_form"
      ).length,
      loggedInNoWill: records.filter((r) => r.category === "logged_in_no_will").length,
      paidCustomerWills: records.filter((r) => r.category === "paid_customer").length,
      unpaidAll: records.filter((r) => r.category !== "paid_customer").length,
    };

    // Filter records
    const filtered = records.filter((r) => {
      if (filter === "unpaid_all" && r.category === "paid_customer") return false;
      if (filter === "logged_in_unpaid" && r.category !== "logged_in_unpaid") return false;
      if (filter === "guest_not_logged_in" && r.category !== "guest_not_logged_in") return false;
      if (
        filter === "guest_no_email" &&
        !(r.category === "guest_not_logged_in" && r.guestContactState === "no_email")
      ) {
        return false;
      }
      if (
        filter === "guest_typed_email" &&
        !(r.category === "guest_not_logged_in" && r.guestContactState === "typed_in_form")
      ) {
        return false;
      }
      if (filter === "logged_in_no_will" && r.category !== "logged_in_no_will") return false;
      if (filter === "paid_customer" && r.category !== "paid_customer") return false;

      if (search) {
        const hay = [
          r.name,
          r.email,
          r.phone,
          r.sessionId,
          r.stateLocation,
          r.willId,
          r.accountId,
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
        "Category",
        "Guest Contact State",
        "Name",
        "Email",
        "Phone",
        "State",
        "Session ID",
        "Current Step",
        "Completion %",
        "Family Count",
        "Assets Count",
        "Total Estate Value (INR)",
        "Selected Plan",
        "Save Version",
        "Last Active",
      ];
      const lines = filtered.map((r) => {
        const p = r.progress as ReturnType<typeof analyzeWillState>;
        return [
          r.category,
          r.guestContactState || "N/A",
          r.name,
          r.email,
          r.phone,
          r.stateLocation,
          r.sessionId || "",
          `${p.currentStep} (${p.currentStepTitle})`,
          `${p.completionPercent}%`,
          p.familyCount,
          p.assetsCount,
          p.totalEstateValue,
          p.selectedPlan || "",
          r.version,
          r.updatedAt ? new Date(String(r.updatedAt)).toISOString() : "",
        ]
          .map(csvCell)
          .join(",");
      });

      return new NextResponse([headers.map(csvCell).join(","), ...lines].join("\n"), {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="willdrafting_drafts_${Date.now()}.csv"`,
        },
      });
    }

    return NextResponse.json({
      drafts: filtered,
      counts,
    });
  } catch (error) {
    console.error("GET /api/admin/drafts error:", error);
    return NextResponse.json({ error: "Failed to load will drafts." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: "Access denied. Administrator privileges required." }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const willId = searchParams.get("willId");
    if (!willId || !ObjectId.isValid(willId)) {
      return NextResponse.json({ error: "Valid willId is required." }, { status: 400 });
    }

    const wills = await willsCol();
    const res = await wills.deleteOne({ _id: new ObjectId(willId) });
    if (res.deletedCount === 0) {
      return NextResponse.json({ error: "Will draft not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Draft deleted." });
  } catch (error) {
    console.error("DELETE /api/admin/drafts error:", error);
    return NextResponse.json({ error: "Failed to delete draft." }, { status: 500 });
  }
}
