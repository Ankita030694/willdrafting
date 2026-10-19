"use client";

import React, { useState, useEffect, useCallback } from "react";
import WillDetailInspectorModal, {
  type InspectorTarget,
  type InspectorOrderItem,
} from "@/components/admin/WillDetailInspectorModal";
import type { WillDraftingState } from "@/lib/willDraftingStore";

interface DraftRecord {
  id: string;
  willId: string | null;
  accountId: string | null;
  category:
    | "logged_in_unpaid"
    | "guest_not_logged_in"
    | "logged_in_no_will"
    | "paid_customer";
  guestContactState: "no_email" | "typed_in_form" | null;
  isGuest: boolean;
  sessionId: string | null;
  expiresAt: string | null;
  name: string;
  email: string;
  phone: string;
  stateLocation: string;
  account: {
    id: string;
    kind: "user" | "lead";
    name: string;
    email: string;
    phone: string;
    state: string;
    authStatus: string;
    status: string;
    source: string;
    googleId: string | null;
    planId?: string | null;
    interestedPlanId?: string | null;
    lastCheckoutAt?: string | null;
    message?: string | null;
    createdAt: string;
  } | null;
  version: number;
  detailsVerified: boolean;
  detailsVerifiedAt: string | null;
  lockedAt: string | null;
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
  progress: {
    currentStep: number;
    currentStepTitle: string;
    willStatus: string;
    selectedPlan: string | null;
    sectionsCompleted: number;
    completionPercent: number;
    filledSections: string[];
    missingSections: string[];
    familyCount: number;
    assetsCount: number;
    allocationsCount: number;
    totalEstateValue: number;
    hasExecutor: boolean;
    hasGuardian: boolean;
    hasMinors: boolean;
    healthIssuesCount: number;
    criticalIssuesCount: number;
    healthIssues: Array<{ severity: string; title: string; category: string }>;
  };
  orders: InspectorOrderItem[];
  willState: WillDraftingState | null;
}

interface DraftCounts {
  loggedInUnpaidWithWill: number;
  guestNotLoggedIn: number;
  guestNoEmail: number;
  guestTypedEmail: number;
  loggedInNoWill: number;
  paidCustomerWills: number;
  unpaidAll: number;
}

function formatDateTime(val?: string | null): string {
  if (!val) return "-";
  const d = new Date(val);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AuthorityDraftsPage() {
  const [drafts, setDrafts] = useState<DraftRecord[]>([]);
  const [counts, setCounts] = useState<DraftCounts>({
    loggedInUnpaidWithWill: 0,
    guestNotLoggedIn: 0,
    guestNoEmail: 0,
    guestTypedEmail: 0,
    loggedInNoWill: 0,
    paidCustomerWills: 0,
    unpaidAll: 0,
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("unpaid_all");
  const [searchTerm, setSearchTerm] = useState("");
  const [inspecting, setInspecting] = useState<DraftRecord | null>(null);

  const fetchDrafts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.set("filter", filter);
      if (searchTerm.trim()) params.set("search", searchTerm.trim());

      const res = await fetch(`/api/admin/drafts?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch drafts");
      const data = await res.json();
      setDrafts(data.drafts || []);
      if (data.counts) setCounts(data.counts);
    } catch (err) {
      console.error("Failed to fetch will drafts:", err);
    } finally {
      setLoading(false);
    }
  }, [filter, searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchDrafts();
    }, 200);
    return () => clearTimeout(timer);
  }, [fetchDrafts]);

  const handleExportCsv = () => {
    const params = new URLSearchParams();
    params.set("filter", filter);
    if (searchTerm.trim()) params.set("search", searchTerm.trim());
    params.set("export", "csv");
    window.open(`/api/admin/drafts?${params.toString()}`, "_blank");
  };

  const handleGrantPlan = async (accountId: string, planId: string) => {
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: accountId, isPaid: true, planId }),
    });
    if (res.ok) {
      setInspecting(null);
      await fetchDrafts();
    }
  };

  const handleUnlockWill = async (accountId: string) => {
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: accountId, unlockUserWill: true }),
    });
    if (res.ok) {
      setInspecting(null);
      await fetchDrafts();
    }
  };

  const handleDeleteGuestDraft = async (willId: string | null) => {
    if (!willId) return;
    if (!confirm("Delete this anonymous guest Will draft from the database?")) return;
    const res = await fetch(`/api/admin/drafts?willId=${encodeURIComponent(willId)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      await fetchDrafts();
    }
  };

  const buildInspectorTarget = (d: DraftRecord): InspectorTarget => ({
    title: d.name,
    category: d.category,
    guestContactState: d.guestContactState,
    accountId: d.accountId,
    willId: d.willId,
    sessionId: d.sessionId,
    expiresAt: d.expiresAt,
    name: d.name,
    email: d.email,
    phone: d.phone,
    stateLocation: d.stateLocation,
    authStatus: d.account?.authStatus,
    leadStatus: d.account?.status || null,
    source: d.account?.source || (d.isGuest ? "guest_session" : null),
    googleId: d.account?.googleId || null,
    planId: d.account?.planId || d.account?.interestedPlanId || d.progress.selectedPlan,
    message: d.account?.message || null,
    version: d.version,
    detailsVerified: d.detailsVerified,
    detailsVerifiedAt: d.detailsVerifiedAt,
    lockedAt: d.lockedAt,
    downloadCount: d.downloadCount,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
    progress: d.progress,
    willState: d.willState,
    orders: d.orders,
    onGrantPlan: handleGrantPlan,
    onUnlockWill: handleUnlockWill,
  });

  const FILTER_TABS = [
    {
      id: "unpaid_all",
      label: "All Unpaid Activity",
      count: counts.unpaidAll,
      desc: "Both logged-in unpaid drafts & anonymous guest sessions",
    },
    {
      id: "logged_in_unpaid",
      label: "Logged In & Filled Will (Unpaid)",
      count: counts.loggedInUnpaidWithWill,
      desc: "Authenticated users who entered Will details but have not paid yet",
    },
    {
      id: "guest_not_logged_in",
      label: "Guest Entering Details (Not Logged In)",
      count: counts.guestNotLoggedIn,
      desc: "Anonymous sessions entering Will details before logging in or verifying email",
    },
    {
      id: "logged_in_no_will",
      label: "Leads Without Will Draft",
      count: counts.loggedInNoWill,
      desc: "Logged-in or form-captured leads who have not saved Will steps yet",
    },
    {
      id: "paid_customer",
      label: "Paid Customer Wills",
      count: counts.paidCustomerWills,
      desc: "Completed/active Wills belonging to paying customers",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.35rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", color: "#172228", fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
            Unpaid Will Drafts & Live Guest Sessions
          </h1>
          <p style={{ margin: "0.25rem 0 0", fontSize: "0.84rem", color: "#55636D" }}>
            Differentiates <strong style={{ color: "#172228" }}>Logged-In Unpaid Users</strong> (<code>leads</code> + <code>wills.userId</code>) from <strong style={{ color: "#172228" }}>Unauthenticated Guest Sessions</strong> (<code>wills.isGuest = true</code>, <code>sessionId</code>)
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.55rem" }}>
          <button
            type="button"
            onClick={fetchDrafts}
            style={{
              padding: "0.48rem 0.9rem",
              fontSize: "0.82rem",
              fontWeight: 600,
              backgroundColor: "#FFFFFF",
              color: "#172228",
              border: "1px solid rgba(23, 34, 40, 0.14)",
              borderRadius: "999px",
              cursor: "pointer",
            }}
          >
            ↻ Refresh
          </button>
          <button
            type="button"
            onClick={handleExportCsv}
            style={{
              padding: "0.48rem 1rem",
              fontSize: "0.82rem",
              fontWeight: 600,
              backgroundColor: "#C65378",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "999px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(198, 83, 120, 0.2)",
            }}
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Differentiation KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "0.95rem",
        }}
      >
        <div
          onClick={() => setFilter("logged_in_unpaid")}
          style={{
            backgroundColor: filter === "logged_in_unpaid" ? "#FDFBF7" : "#FFFFFF",
            padding: "1.1rem 1.25rem",
            borderRadius: "16px",
            border: filter === "logged_in_unpaid" ? "2px solid #C65378" : "1px solid rgba(23, 34, 40, 0.08)",
            boxShadow: "0 6px 20px -4px rgba(23, 34, 40, 0.05)",
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#A13C5D", textTransform: "uppercase", letterSpacing: "0.03em" }}>
              Logged In • Filled Will • Unpaid
            </span>
            <span style={{ fontSize: "0.68rem", backgroundColor: "rgba(198, 83, 120, 0.12)", color: "#A13C5D", padding: "2px 8px", borderRadius: "999px", fontWeight: 700 }}>
              Account Verified
            </span>
          </div>
          <div style={{ fontSize: "1.65rem", fontWeight: 700, color: "#172228", marginTop: "0.3rem" }}>
            {counts.loggedInUnpaidWithWill}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#49585F", marginTop: "0.2rem" }}>
            Signed in via OTP/Google & saved Will details, not yet paid
          </div>
        </div>

        <div
          onClick={() => setFilter("guest_not_logged_in")}
          style={{
            backgroundColor: filter.startsWith("guest_") ? "#FEF6E7" : "#FFFFFF",
            padding: "1.1rem 1.25rem",
            borderRadius: "16px",
            border: filter.startsWith("guest_") ? "2px solid #B45309" : "1px solid rgba(23, 34, 40, 0.08)",
            boxShadow: "0 6px 20px -4px rgba(23, 34, 40, 0.05)",
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#9A5B13", textTransform: "uppercase", letterSpacing: "0.03em" }}>
              Entering Details • Not Logged In
            </span>
            <span style={{ fontSize: "0.68rem", backgroundColor: "#FEF6E7", color: "#9A5B13", border: "1px solid rgba(180,83,9,0.22)", padding: "2px 8px", borderRadius: "999px", fontWeight: 700 }}>
              Guest Session
            </span>
          </div>
          <div style={{ fontSize: "1.65rem", fontWeight: 700, color: "#172228", marginTop: "0.3rem" }}>
            {counts.guestNotLoggedIn}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#49585F", marginTop: "0.2rem" }}>
            <strong>{counts.guestNoEmail}</strong> no email yet • <strong>{counts.guestTypedEmail}</strong> typed contact in wizard
          </div>
        </div>

        <div
          onClick={() => setFilter("logged_in_no_will")}
          style={{
            backgroundColor: filter === "logged_in_no_will" ? "#FAF7F0" : "#FFFFFF",
            padding: "1.1rem 1.25rem",
            borderRadius: "16px",
            border: filter === "logged_in_no_will" ? "2px solid #49585F" : "1px solid rgba(23, 34, 40, 0.08)",
            boxShadow: "0 6px 20px -4px rgba(23, 34, 40, 0.05)",
            cursor: "pointer",
          }}
        >
          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#49585F", textTransform: "uppercase", letterSpacing: "0.03em" }}>
            Leads Without Will Draft Yet
          </div>
          <div style={{ fontSize: "1.65rem", fontWeight: 700, color: "#172228", marginTop: "0.3rem" }}>
            {counts.loggedInNoWill}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#55636D", marginTop: "0.2rem" }}>
            Logged in or submitted popup, 0 Will steps saved
          </div>
        </div>

        <div
          onClick={() => setFilter("paid_customer")}
          style={{
            backgroundColor: filter === "paid_customer" ? "rgba(95, 126, 117, 0.08)" : "#FFFFFF",
            padding: "1.1rem 1.25rem",
            borderRadius: "16px",
            border: filter === "paid_customer" ? "2px solid #5F7E75" : "1px solid rgba(23, 34, 40, 0.08)",
            boxShadow: "0 6px 20px -4px rgba(23, 34, 40, 0.05)",
            cursor: "pointer",
          }}
        >
          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#3F5C53", textTransform: "uppercase", letterSpacing: "0.03em" }}>
            Paid Customer Wills
          </div>
          <div style={{ fontSize: "1.65rem", fontWeight: 700, color: "#3F5C53", marginTop: "0.3rem" }}>
            {counts.paidCustomerWills}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#49585F", marginTop: "0.2rem" }}>
            Converted accounts in <code>users</code> collection
          </div>
        </div>
      </div>

      {/* Filter Tabs + Search */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
        <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
          {FILTER_TABS.map((t) => {
            const active = filter === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setFilter(t.id)}
                style={{
                  padding: "0.48rem 0.9rem",
                  borderRadius: "999px",
                  fontSize: "0.78rem",
                  fontWeight: active ? 700 : 500,
                  backgroundColor: active ? "#C65378" : "#FFFFFF",
                  color: active ? "#FFFFFF" : "#49585F",
                  border: active ? "1px solid #C65378" : "1px solid rgba(23, 34, 40, 0.14)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.45rem",
                }}
              >
                <span>{t.label}</span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    padding: "1px 7px",
                    borderRadius: "999px",
                    backgroundColor: active ? "rgba(255,255,255,0.22)" : "#FAF7F0",
                    color: active ? "#FFFFFF" : "#172228",
                    fontWeight: 700,
                  }}
                >
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sub-filters when viewing Guest Drafts */}
        {(filter === "guest_not_logged_in" || filter === "guest_no_email" || filter === "guest_typed_email") && (
          <div style={{ display: "flex", gap: "0.45rem", alignItems: "center", flexWrap: "wrap", padding: "0.55rem 0.85rem", backgroundColor: "#FEF6E7", borderRadius: "12px", border: "1px solid rgba(180, 83, 9, 0.25)" }}>
            <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "#9A5B13", marginRight: "0.3rem" }}>
              Guest Sub-Filter:
            </span>
            {[
              { id: "guest_not_logged_in", label: `All Guests (${counts.guestNotLoggedIn})` },
              { id: "guest_no_email", label: `No Email Entered Yet (${counts.guestNoEmail})` },
              { id: "guest_typed_email", label: `Typed Email/Phone in Form - Not Logged In (${counts.guestTypedEmail})` },
            ].map((sub) => (
              <button
                key={sub.id}
                type="button"
                onClick={() => setFilter(sub.id)}
                style={{
                  padding: "0.3rem 0.75rem",
                  fontSize: "0.74rem",
                  fontWeight: filter === sub.id ? 700 : 500,
                  borderRadius: "999px",
                  border: "1px solid rgba(180, 83, 9, 0.3)",
                  backgroundColor: filter === sub.id ? "#9A5B13" : "#FFFFFF",
                  color: filter === sub.id ? "#FFFFFF" : "#9A5B13",
                  cursor: "pointer",
                }}
              >
                {sub.label}
              </button>
            ))}
          </div>
        )}

        <input
          type="text"
          placeholder="Search by testator name, email, phone, state, or guest session ID (gst_...)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input"
          style={{ width: "100%", fontSize: "0.85rem", padding: "0.6rem 0.9rem", backgroundColor: "#FFFFFF" }}
        />
      </div>

      {/* Main Table */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid rgba(23, 34, 40, 0.08)",
          boxShadow: "0 6px 20px -4px rgba(23, 34, 40, 0.05)",
          overflowX: "auto",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(23, 34, 40, 0.08)", textAlign: "left", backgroundColor: "#FAF7F0" }}>
              <th style={{ padding: "0.75rem 0.9rem", color: "#49585F", fontWeight: 600 }}>Differentiation & Auth</th>
              <th style={{ padding: "0.75rem 0.9rem", color: "#49585F", fontWeight: 600 }}>Testator / Contact</th>
              <th style={{ padding: "0.75rem 0.9rem", color: "#49585F", fontWeight: 600 }}>Will Progress & Sections</th>
              <th style={{ padding: "0.75rem 0.9rem", color: "#49585F", fontWeight: 600 }}>Family & Assets</th>
              <th style={{ padding: "0.75rem 0.9rem", color: "#49585F", fontWeight: 600 }}>Checkout / Plan</th>
              <th style={{ padding: "0.75rem 0.9rem", color: "#49585F", fontWeight: 600 }}>Last Active</th>
              <th style={{ padding: "0.75rem 0.9rem", color: "#49585F", fontWeight: 600, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} style={{ padding: "2.5rem", textAlign: "center", color: "#55636D" }}>
                  Loading Will drafts and guest sessions from MongoDB...
                </td>
              </tr>
            ) : drafts.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "2.5rem", textAlign: "center", color: "#55636D" }}>
                  No records match the current filter.
                </td>
              </tr>
            ) : (
              drafts.map((d) => {
                const lastOrder = d.orders && d.orders.length > 0 ? d.orders[0] : null;
                const t = d.willState?.testator;
                return (
                  <tr key={d.id} style={{ borderBottom: "1px solid rgba(23, 34, 40, 0.06)" }}>
                    {/* Column 1: Differentiation Badge */}
                    <td style={{ padding: "0.8rem 0.9rem", verticalAlign: "top" }}>
                      {d.category === "logged_in_unpaid" && (
                        <div>
                          <span
                            style={{
                              display: "inline-block",
                              fontSize: "0.68rem",
                              fontWeight: 700,
                              padding: "2px 8px",
                              borderRadius: "999px",
                              backgroundColor: "rgba(198, 83, 120, 0.12)",
                              color: "#A13C5D",
                              border: "1px solid rgba(198, 83, 120, 0.28)",
                            }}
                          >
                            LOGGED IN • UNPAID
                          </span>
                          <div style={{ fontSize: "0.7rem", color: "#49585F", marginTop: "4px" }}>
                            Auth: <strong>{d.account?.googleId ? "Google OAuth" : "Email OTP"}</strong> ({d.account?.authStatus})
                          </div>
                        </div>
                      )}

                      {d.category === "guest_not_logged_in" && (
                        <div>
                          <span
                            style={{
                              display: "inline-block",
                              fontSize: "0.68rem",
                              fontWeight: 700,
                              padding: "2px 8px",
                              borderRadius: "999px",
                              backgroundColor: "#FEF6E7",
                              color: "#9A5B13",
                              border: "1px solid rgba(180, 83, 9, 0.25)",
                            }}
                          >
                            {d.guestContactState === "no_email"
                              ? "GUEST • NO EMAIL ENTERED"
                              : "GUEST • TYPED CONTACT (NOT LOGGED IN)"}
                          </span>
                          <div style={{ fontSize: "0.68rem", color: "#55636D", marginTop: "4px", fontFamily: "monospace" }}>
                            {d.sessionId || "Anonymous Session"}
                          </div>
                        </div>
                      )}

                      {d.category === "logged_in_no_will" && (
                        <div>
                          <span
                            style={{
                              display: "inline-block",
                              fontSize: "0.68rem",
                              fontWeight: 700,
                              padding: "2px 8px",
                              borderRadius: "999px",
                              backgroundColor: "rgba(73, 88, 95, 0.1)",
                              color: "#49585F",
                              border: "1px solid rgba(73, 88, 95, 0.22)",
                            }}
                          >
                            LEAD • NO WILL DRAFT YET
                          </span>
                          <div style={{ fontSize: "0.7rem", color: "#55636D", marginTop: "4px", textTransform: "capitalize" }}>
                            Source: {d.account?.source?.replace(/_/g, " ") || "Form"}
                          </div>
                        </div>
                      )}

                      {d.category === "paid_customer" && (
                        <div>
                          <span
                            style={{
                              display: "inline-block",
                              fontSize: "0.68rem",
                              fontWeight: 700,
                              padding: "2px 8px",
                              borderRadius: "999px",
                              backgroundColor: "rgba(95, 126, 117, 0.14)",
                              color: "#3F5C53",
                              border: "1px solid rgba(95, 126, 117, 0.35)",
                            }}
                          >
                            PAID CUSTOMER
                          </span>
                          {d.detailsVerified && (
                            <div style={{ fontSize: "0.68rem", color: "#3F5C53", fontWeight: 600, marginTop: "3px" }}>
                              ✓ OTP Verified ({d.downloadCount} downloads)
                            </div>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Column 2: Testator / Contact */}
                    <td style={{ padding: "0.8rem 0.9rem", verticalAlign: "top" }}>
                      <div style={{ fontWeight: 700, color: "#172228" }}>{d.name}</div>
                      <div style={{ fontSize: "0.74rem", color: "#49585F", marginTop: "2px" }}>
                        {d.email || <span style={{ color: "#8C98A0" }}>No email entered</span>}
                      </div>
                      <div style={{ fontSize: "0.73rem", color: "#55636D", marginTop: "1px" }}>
                        {d.phone ? `+91 ${d.phone}` : "No phone"}
                        {d.stateLocation ? ` • ${d.stateLocation}` : ""}
                      </div>
                      {t?.dob || t?.maritalStatus ? (
                        <div style={{ fontSize: "0.7rem", color: "#55636D", marginTop: "2px", textTransform: "capitalize" }}>
                          {[t.gender, t.maritalStatus, t.religionPersonalLaw].filter(Boolean).join(" • ")}
                        </div>
                      ) : null}
                    </td>

                    {/* Column 3: Progress & Filled Sections */}
                    <td style={{ padding: "0.8rem 0.9rem", verticalAlign: "top", minWidth: "200px" }}>
                      {!d.willId ? (
                        <span style={{ color: "#8C98A0", fontSize: "0.75rem" }}>No Will steps saved</span>
                      ) : (
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", fontWeight: 600, color: "#172228" }}>
                            <span>
                              Step {d.progress.currentStep}/14 ({d.progress.currentStepTitle})
                            </span>
                            <span style={{ color: "#C65378" }}>{d.progress.completionPercent}%</span>
                          </div>
                          <div
                            style={{
                              height: "5px",
                              backgroundColor: "rgba(23, 34, 40, 0.08)",
                              borderRadius: "999px",
                              overflow: "hidden",
                              margin: "5px 0 6px",
                            }}
                          >
                            <div
                              style={{
                                width: `${Math.max(6, d.progress.completionPercent)}%`,
                                height: "100%",
                                backgroundColor:
                                  d.progress.completionPercent >= 80
                                    ? "#5F7E75"
                                    : "#C65378",
                              }}
                            />
                          </div>
                          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                            {d.progress.filledSections.map((sec) => (
                              <span
                                key={sec}
                                style={{
                                  fontSize: "0.66rem",
                                  padding: "1px 6px",
                                  backgroundColor: "#FAF7F0",
                                  color: "#49585F",
                                  border: "1px solid rgba(23, 34, 40, 0.08)",
                                  borderRadius: "4px",
                                  fontWeight: 600,
                                }}
                              >
                                ✓ {sec}
                              </span>
                            ))}
                            <span style={{ fontSize: "0.66rem", color: "#8C98A0" }}>v{d.version}</span>
                          </div>
                        </div>
                      )}
                    </td>

                    {/* Column 4: Family & Assets */}
                    <td style={{ padding: "0.8rem 0.9rem", verticalAlign: "top" }}>
                      {!d.willId ? (
                        <span style={{ color: "#8C98A0" }}>-</span>
                      ) : (
                        <div>
                          <div style={{ fontWeight: 600, color: "#172228" }}>
                            {d.progress.familyCount} Family • {d.progress.assetsCount} Assets
                          </div>
                          <div style={{ fontSize: "0.73rem", color: "#3F5C53", fontWeight: 600, marginTop: "2px" }}>
                            Estate: ₹{d.progress.totalEstateValue.toLocaleString("en-IN")}
                          </div>
                          {d.willState?.executorPrimary?.name && (
                            <div style={{ fontSize: "0.7rem", color: "#55636D", marginTop: "2px" }}>
                              Exec: {d.willState.executorPrimary.name}
                            </div>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Column 5: Checkout / Plan */}
                    <td style={{ padding: "0.8rem 0.9rem", verticalAlign: "top" }}>
                      <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#172228", textTransform: "capitalize" }}>
                        Plan: {(d.account?.planId || d.account?.interestedPlanId || d.progress.selectedPlan || "None").replace(/_/g, " ")}
                      </div>
                      {lastOrder ? (
                        <div style={{ marginTop: "4px" }}>
                          <span
                            style={{
                              fontSize: "0.68rem",
                              fontWeight: 700,
                              padding: "2px 7px",
                              borderRadius: "999px",
                              textTransform: "uppercase",
                              backgroundColor:
                                lastOrder.status === "paid"
                                  ? "rgba(95, 126, 117, 0.14)"
                                  : lastOrder.status === "failed"
                                  ? "#FEE2E2"
                                  : "#FEF6E7",
                              color:
                                lastOrder.status === "paid"
                                  ? "#3F5C53"
                                  : lastOrder.status === "failed"
                                  ? "#991B1B"
                                  : "#9A5B13",
                            }}
                          >
                            Order {lastOrder.status}: ₹{lastOrder.amount}
                          </span>
                        </div>
                      ) : (
                        <div style={{ fontSize: "0.7rem", color: "#55636D", marginTop: "2px", textTransform: "capitalize" }}>
                          {(d.account?.status || (d.isGuest ? "No checkout yet" : "Unpaid")).replace(/_/g, " ")}
                        </div>
                      )}
                    </td>

                    {/* Column 6: Last Active */}
                    <td style={{ padding: "0.8rem 0.9rem", verticalAlign: "top", fontSize: "0.73rem", color: "#55636D", whiteSpace: "nowrap" }}>
                      {formatDateTime(d.updatedAt || d.createdAt)}
                    </td>

                    {/* Column 7: Actions */}
                    <td style={{ padding: "0.8rem 0.9rem", verticalAlign: "top", textAlign: "right", whiteSpace: "nowrap" }}>
                      <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                        <button
                          type="button"
                          onClick={() => setInspecting(d)}
                          style={{
                            padding: "0.38rem 0.75rem",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            backgroundColor: "#C65378",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                          }}
                        >
                          Inspect Details
                        </button>
                        {d.isGuest && d.willId && (
                          <button
                            type="button"
                            onClick={() => handleDeleteGuestDraft(d.willId)}
                            style={{
                              padding: "0.38rem 0.6rem",
                              fontSize: "0.74rem",
                              backgroundColor: "#FEF2F2",
                              color: "#B91C1C",
                              border: "1px solid #FECACA",
                              borderRadius: "8px",
                              cursor: "pointer",
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Deep Will & Account Inspector Modal */}
      <WillDetailInspectorModal
        target={inspecting ? buildInspectorTarget(inspecting) : null}
        onClose={() => setInspecting(null)}
      />
    </div>
  );
}
