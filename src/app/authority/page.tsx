"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";

interface OverviewStats {
  totalAccounts: number;
  paidCustomers: number;
  unpaidLeads: number;
  verifiedAccounts: number;
  checkoutStartedLeads: number;
  totalWills: number;
  paidWills: number;
  loggedInUnpaidWills: number;
  guestWills: number;
  verifiedWills: number;
  totalDownloads: number;
  totalRevenue: number;
  paidOrdersCount: number;
  pendingOrdersCount: number;
  failedOrdersCount: number;
}

interface RecentAccount {
  id: string;
  kind: "user" | "lead";
  name: string;
  email: string;
  phone: string;
  authStatus: string;
  paymentStatus: "paid" | "unpaid";
  leadStatus?: string;
  planId?: string | null;
  source: string;
  hasWill: boolean;
  willVerified: boolean;
  willProgress: {
    currentStep: number;
    currentStepTitle: string;
    completionPercent: number;
    familyCount: number;
    assetsCount: number;
  };
  createdAt: string;
}

interface RecentUnpaidDraft {
  id: string;
  category: "logged_in_unpaid" | "guest_not_logged_in";
  guestContactState: "no_email" | "typed_in_form" | null;
  sessionId: string | null;
  name: string;
  email: string;
  phone: string;
  leadStatus: string | null;
  source: string | null;
  version: number;
  detailsVerified: boolean;
  progress: {
    currentStep: number;
    currentStepTitle: string;
    completionPercent: number;
    sectionsCompleted: number;
    familyCount: number;
    assetsCount: number;
    totalEstateValue: number;
    selectedPlan: string | null;
  };
  updatedAt: string;
}

interface RecentTxn {
  id: string;
  txnId: string;
  invoiceNo: string | null;
  customerName: string;
  email: string;
  phone: string;
  planName: string;
  amount: number;
  status: string;
  gateway: string;
  method: string;
  createdAt: string;
}

interface RecentFunnelEvent {
  id: string;
  accountId: string;
  email: string;
  type: string;
  meta: Record<string, unknown> | null;
  createdAt: string;
}

function timeAgo(dateStr?: string | null): string {
  if (!dateStr) return "—";
  const diff = Date.now() - new Date(dateStr).getTime();
  if (isNaN(diff)) return "—";
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function AuthorityOverviewPage() {
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [recentAccounts, setRecentAccounts] = useState<RecentAccount[]>([]);
  const [recentUnpaidDrafts, setRecentUnpaidDrafts] = useState<RecentUnpaidDraft[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<RecentTxn[]>([]);
  const [recentEvents, setRecentEvents] = useState<RecentFunnelEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/overview", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      setStats(data.stats);
      setRecentAccounts(data.recentAccounts || []);
      setRecentUnpaidDrafts(data.recentUnpaidDrafts || []);
      setRecentTransactions(data.recentTransactions || []);
      setRecentEvents(data.recentEvents || []);
    } catch (err) {
      console.error("Failed to load overview:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
      {/* Page Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", color: "#172228", fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
            Dashboard
          </h1>
          <p style={{ margin: "0.25rem 0 0", fontSize: "0.84rem", color: "#55636D" }}>
            Live telemetry from MongoDB (<code>users</code>, <code>leads</code>, <code>wills</code>, <code>orders</code>, <code>funnel_events</code>)
          </p>
        </div>

        <button
          type="button"
          onClick={loadDashboard}
          disabled={loading}
          style={{
            padding: "0.5rem 0.95rem",
            fontSize: "0.82rem",
            fontWeight: 600,
            backgroundColor: "#FFFFFF",
            color: "#172228",
            border: "1px solid rgba(23, 34, 40, 0.14)",
            borderRadius: "999px",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(23, 34, 40, 0.04)",
          }}
        >
          {loading ? "Refreshing..." : "↻ Refresh Live Data"}
        </button>
      </div>

      {/* Top KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        <Link
          href="/authority/users"
          style={{
            backgroundColor: "#FFFFFF",
            padding: "1.2rem 1.35rem",
            borderRadius: "16px",
            border: "1px solid rgba(23, 34, 40, 0.08)",
            boxShadow: "0 6px 20px -4px rgba(23, 34, 40, 0.05)",
            textDecoration: "none",
          }}
        >
          <div style={{ fontSize: "0.72rem", color: "#55636D", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Total Accounts (Users + Leads)
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#172228", marginTop: "0.3rem", letterSpacing: "-0.02em" }}>
            {stats ? stats.totalAccounts : "—"}
          </div>
          <div style={{ fontSize: "0.76rem", color: "#49585F", marginTop: "0.35rem", display: "flex", gap: "0.55rem", flexWrap: "wrap" }}>
            <span style={{ color: "#3F5C53", fontWeight: 600 }}>{stats?.paidCustomers ?? 0} Paid</span>
            <span>•</span>
            <span style={{ color: "#C65378", fontWeight: 600 }}>{stats?.unpaidLeads ?? 0} Unpaid Leads</span>
            <span>•</span>
            <span>{stats?.verifiedAccounts ?? 0} Verified</span>
          </div>
        </Link>

        <Link
          href="/authority/drafts"
          style={{
            backgroundColor: "#FFFFFF",
            padding: "1.2rem 1.35rem",
            borderRadius: "16px",
            border: "1px solid rgba(23, 34, 40, 0.08)",
            boxShadow: "0 6px 20px -4px rgba(23, 34, 40, 0.05)",
            textDecoration: "none",
          }}
        >
          <div style={{ fontSize: "0.72rem", color: "#55636D", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Unpaid & Guest Will Drafts
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#C65378", marginTop: "0.3rem", letterSpacing: "-0.02em" }}>
            {stats ? stats.loggedInUnpaidWills + stats.guestWills : "—"}
          </div>
          <div style={{ fontSize: "0.76rem", color: "#49585F", marginTop: "0.35rem", display: "flex", gap: "0.55rem", flexWrap: "wrap" }}>
            <span style={{ color: "#A13C5D", fontWeight: 600 }}>{stats?.loggedInUnpaidWills ?? 0} Logged-In Unpaid</span>
            <span>•</span>
            <span style={{ color: "#9A5B13", fontWeight: 600 }}>{stats?.guestWills ?? 0} Guest (Not Logged In)</span>
          </div>
        </Link>

        <Link
          href="/authority/drafts?filter=paid_customer"
          style={{
            backgroundColor: "#FFFFFF",
            padding: "1.2rem 1.35rem",
            borderRadius: "16px",
            border: "1px solid rgba(23, 34, 40, 0.08)",
            boxShadow: "0 6px 20px -4px rgba(23, 34, 40, 0.05)",
            textDecoration: "none",
          }}
        >
          <div style={{ fontSize: "0.72rem", color: "#55636D", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Total Wills & Downloads
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#172228", marginTop: "0.3rem", letterSpacing: "-0.02em" }}>
            {stats ? stats.totalWills : "—"}
          </div>
          <div style={{ fontSize: "0.76rem", color: "#49585F", marginTop: "0.35rem", display: "flex", gap: "0.55rem", flexWrap: "wrap" }}>
            <span style={{ color: "#3F5C53", fontWeight: 600 }}>{stats?.verifiedWills ?? 0} OTP Locked</span>
            <span>•</span>
            <span>{stats?.paidWills ?? 0} Paid Wills</span>
            <span>•</span>
            <span>{stats?.totalDownloads ?? 0} PDF Downloads</span>
          </div>
        </Link>

        <Link
          href="/authority/transactions"
          style={{
            backgroundColor: "#FFFFFF",
            padding: "1.2rem 1.35rem",
            borderRadius: "16px",
            border: "1px solid rgba(23, 34, 40, 0.08)",
            boxShadow: "0 6px 20px -4px rgba(23, 34, 40, 0.05)",
            textDecoration: "none",
          }}
        >
          <div style={{ fontSize: "0.72rem", color: "#55636D", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Total Revenue Collected
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#3F5C53", marginTop: "0.3rem", letterSpacing: "-0.02em" }}>
            ₹{stats ? stats.totalRevenue.toLocaleString("en-IN") : "0"}
          </div>
          <div style={{ fontSize: "0.76rem", color: "#49585F", marginTop: "0.35rem", display: "flex", gap: "0.55rem", flexWrap: "wrap" }}>
            <span style={{ color: "#3F5C53", fontWeight: 600 }}>{stats?.paidOrdersCount ?? 0} Paid</span>
            <span>•</span>
            <span style={{ color: "#9A5B13", fontWeight: 600 }}>{stats?.pendingOrdersCount ?? 0} Initiated</span>
            <span>•</span>
            <span style={{ color: "#B91C1C" }}>{stats?.failedOrdersCount ?? 0} Failed</span>
          </div>
        </Link>
      </div>

      {/* Highlight Table: Unpaid Will Drafts & Guest Sessions */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "1.35rem",
          borderRadius: "16px",
          border: "1px solid rgba(23, 34, 40, 0.08)",
          boxShadow: "0 6px 20px -4px rgba(23, 34, 40, 0.05)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.95rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <div>
            <span style={{ fontSize: "0.98rem", fontWeight: 700, color: "#172228" }}>
              Live Unpaid Will Drafts & Guest Sessions
            </span>
            <span style={{ fontSize: "0.78rem", color: "#55636D", marginLeft: "0.6rem" }}>
              Differentiating logged-in unpaid users vs unauthenticated guests entering details
            </span>
          </div>
          <Link
            href="/authority/drafts"
            style={{ fontSize: "0.82rem", fontWeight: 600, color: "#C65378", textDecoration: "none" }}
          >
            Inspect All Drafts →
          </Link>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(23, 34, 40, 0.08)", textAlign: "left", backgroundColor: "#FAF7F0" }}>
                <th style={{ padding: "0.65rem 0.75rem", color: "#49585F", fontWeight: 600 }}>Identity & Session Type</th>
                <th style={{ padding: "0.65rem 0.75rem", color: "#49585F", fontWeight: 600 }}>Person / Contact</th>
                <th style={{ padding: "0.65rem 0.75rem", color: "#49585F", fontWeight: 600 }}>Wizard Progress</th>
                <th style={{ padding: "0.65rem 0.75rem", color: "#49585F", fontWeight: 600 }}>Entered Details</th>
                <th style={{ padding: "0.65rem 0.75rem", color: "#49585F", fontWeight: 600 }}>Checkout Stage</th>
                <th style={{ padding: "0.65rem 0.75rem", color: "#49585F", fontWeight: 600, textAlign: "right" }}>Last Active</th>
              </tr>
            </thead>
            <tbody>
              {recentUnpaidDrafts.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "1.75rem", textAlign: "center", color: "#55636D" }}>
                    {loading ? "Loading drafts..." : "No unpaid or guest Will drafts found."}
                  </td>
                </tr>
              ) : (
                recentUnpaidDrafts.map((d) => {
                  const isGuest = d.category === "guest_not_logged_in";
                  return (
                    <tr key={d.id} style={{ borderBottom: "1px solid rgba(23, 34, 40, 0.06)" }}>
                      <td style={{ padding: "0.7rem 0.75rem" }}>
                        {isGuest ? (
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
                              GUEST • NOT LOGGED IN
                            </span>
                            <div style={{ fontSize: "0.7rem", color: "#55636D", marginTop: "3px" }}>
                              {d.guestContactState === "no_email"
                                ? "No email entered yet"
                                : "Typed contact in wizard (unverified)"}
                            </div>
                          </div>
                        ) : (
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
                            <div style={{ fontSize: "0.7rem", color: "#55636D", marginTop: "3px", textTransform: "capitalize" }}>
                              Source: {d.source?.replace(/_/g, " ") || "Account"}
                            </div>
                          </div>
                        )}
                      </td>

                      <td style={{ padding: "0.7rem 0.75rem" }}>
                        <div style={{ fontWeight: 600, color: "#172228" }}>{d.name}</div>
                        <div style={{ fontSize: "0.72rem", color: "#55636D" }}>
                          {d.email || (d.sessionId ? `Session: ${d.sessionId.slice(0, 14)}…` : "No email")}
                          {d.phone ? ` • +91 ${d.phone}` : ""}
                        </div>
                      </td>

                      <td style={{ padding: "0.7rem 0.75rem" }}>
                        <div style={{ fontWeight: 600, color: "#172228" }}>
                          {d.progress.completionPercent}% ({d.progress.sectionsCompleted}/6 sections)
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "#55636D" }}>
                          Step {d.progress.currentStep}: {d.progress.currentStepTitle} (v{d.version})
                        </div>
                      </td>

                      <td style={{ padding: "0.7rem 0.75rem", color: "#49585F" }}>
                        <div>
                          {d.progress.familyCount} Family • {d.progress.assetsCount} Assets
                        </div>
                        {d.progress.totalEstateValue > 0 && (
                          <div style={{ fontSize: "0.72rem", color: "#3F5C53", fontWeight: 600 }}>
                            Estate: ₹{d.progress.totalEstateValue.toLocaleString("en-IN")}
                          </div>
                        )}
                      </td>

                      <td style={{ padding: "0.7rem 0.75rem" }}>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            padding: "2px 8px",
                            borderRadius: "999px",
                            backgroundColor:
                              d.leadStatus === "checkout_started"
                                ? "#FEF6E7"
                                : d.leadStatus === "payment_failed"
                                ? "#FEE2E2"
                                : "rgba(23, 34, 40, 0.06)",
                            color:
                              d.leadStatus === "checkout_started"
                                ? "#9A5B13"
                                : d.leadStatus === "payment_failed"
                                ? "#991B1B"
                                : "#49585F",
                            textTransform: "capitalize",
                          }}
                        >
                          {(d.leadStatus || (isGuest ? "Entering Details" : "Drafting")).replace(/_/g, " ")}
                        </span>
                      </td>

                      <td style={{ padding: "0.7rem 0.75rem", textAlign: "right", color: "#55636D", fontSize: "0.75rem" }}>
                        {timeAgo(d.updatedAt)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Split Grid: Recent Accounts & Recent Transactions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "1.25rem",
        }}
        className="overview-split-grid"
      >
        {/* Recent Accounts */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: "1.35rem",
            borderRadius: "16px",
            border: "1px solid rgba(23, 34, 40, 0.08)",
            boxShadow: "0 6px 20px -4px rgba(23, 34, 40, 0.05)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
            <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#172228" }}>
              Recent Accounts (Users & Leads)
            </span>
            <Link href="/authority/users" style={{ fontSize: "0.8rem", color: "#C65378", textDecoration: "none", fontWeight: 600 }}>
              All Users →
            </Link>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(23, 34, 40, 0.08)", textAlign: "left" }}>
                <th style={{ padding: "0.5rem 0.35rem", color: "#55636D", fontWeight: 600 }}>Account</th>
                <th style={{ padding: "0.5rem 0.35rem", color: "#55636D", fontWeight: 600 }}>Will Draft</th>
                <th style={{ padding: "0.5rem 0.35rem", color: "#55636D", fontWeight: 600 }}>Status</th>
                <th style={{ padding: "0.5rem 0.35rem", color: "#55636D", fontWeight: 600, textAlign: "right" }}>Joined</th>
              </tr>
            </thead>
            <tbody>
              {recentAccounts.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: "1.5rem", textAlign: "center", color: "#55636D" }}>
                    No accounts yet.
                  </td>
                </tr>
              ) : (
                recentAccounts.map((u) => (
                  <tr key={u.id} style={{ borderBottom: "1px solid rgba(23, 34, 40, 0.06)" }}>
                    <td style={{ padding: "0.6rem 0.35rem" }}>
                      <div style={{ fontWeight: 600, color: "#172228" }}>{u.name}</div>
                      <div style={{ fontSize: "0.72rem", color: "#55636D" }}>
                        {u.email || (u.phone ? `+91 ${u.phone}` : "—")}
                      </div>
                    </td>
                    <td style={{ padding: "0.6rem 0.35rem", fontSize: "0.75rem", color: "#49585F" }}>
                      {u.hasWill ? (
                        <span>
                          {u.willProgress.completionPercent}%{" "}
                          {u.willVerified && <strong style={{ color: "#3F5C53" }}>• Verified</strong>}
                        </span>
                      ) : (
                        <span style={{ color: "#8C98A0" }}>Not started</span>
                      )}
                    </td>
                    <td style={{ padding: "0.6rem 0.35rem" }}>
                      {u.paymentStatus === "paid" ? (
                        <span style={{ fontSize: "0.7rem", backgroundColor: "rgba(95, 126, 117, 0.14)", color: "#3F5C53", padding: "2px 8px", borderRadius: "999px", fontWeight: 600 }}>
                          Paid Customer
                        </span>
                      ) : (
                        <span style={{ fontSize: "0.7rem", backgroundColor: "rgba(198, 83, 120, 0.12)", color: "#A13C5D", padding: "2px 8px", borderRadius: "999px", fontWeight: 600, textTransform: "capitalize" }}>
                          {(u.leadStatus || "Lead").replace(/_/g, " ")}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "0.6rem 0.35rem", textAlign: "right", color: "#55636D", fontSize: "0.74rem" }}>
                      {timeAgo(u.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Recent Transactions */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: "1.35rem",
            borderRadius: "16px",
            border: "1px solid rgba(23, 34, 40, 0.08)",
            boxShadow: "0 6px 20px -4px rgba(23, 34, 40, 0.05)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
            <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#172228" }}>
              Recent Transactions & Orders
            </span>
            <Link href="/authority/transactions" style={{ fontSize: "0.8rem", color: "#C65378", textDecoration: "none", fontWeight: 600 }}>
              Full Ledger →
            </Link>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(23, 34, 40, 0.08)", textAlign: "left" }}>
                <th style={{ padding: "0.5rem 0.35rem", color: "#55636D", fontWeight: 600 }}>Customer & Txn</th>
                <th style={{ padding: "0.5rem 0.35rem", color: "#55636D", fontWeight: 600 }}>Method</th>
                <th style={{ padding: "0.5rem 0.35rem", color: "#55636D", fontWeight: 600 }}>Amount</th>
                <th style={{ padding: "0.5rem 0.35rem", color: "#55636D", fontWeight: 600, textAlign: "right" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: "1.5rem", textAlign: "center", color: "#55636D" }}>
                    No transactions recorded yet.
                  </td>
                </tr>
              ) : (
                recentTransactions.map((t) => (
                  <tr key={t.id} style={{ borderBottom: "1px solid rgba(23, 34, 40, 0.06)" }}>
                    <td style={{ padding: "0.6rem 0.35rem" }}>
                      <div style={{ fontWeight: 600, color: "#172228" }}>{t.customerName}</div>
                      <div style={{ fontSize: "0.7rem", color: "#55636D", fontFamily: "monospace" }}>
                        {t.txnId}
                      </div>
                    </td>
                    <td style={{ padding: "0.6rem 0.35rem", fontSize: "0.74rem", color: "#49585F" }}>
                      {t.method}
                    </td>
                    <td style={{ padding: "0.6rem 0.35rem", fontWeight: 600, color: "#172228" }}>
                      ₹{t.amount.toLocaleString("en-IN")}
                    </td>
                    <td style={{ padding: "0.6rem 0.35rem", textAlign: "right" }}>
                      <span
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "999px",
                          textTransform: "uppercase",
                          backgroundColor:
                            t.status === "paid"
                              ? "rgba(95, 126, 117, 0.14)"
                              : t.status === "failed"
                              ? "#FEE2E2"
                              : "#FEF6E7",
                          color:
                            t.status === "paid"
                              ? "#3F5C53"
                              : t.status === "failed"
                              ? "#991B1B"
                              : "#9A5B13",
                        }}
                      >
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Funnel Events Stream */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "1.2rem 1.35rem",
          borderRadius: "16px",
          border: "1px solid rgba(23, 34, 40, 0.08)",
          boxShadow: "0 6px 20px -4px rgba(23, 34, 40, 0.05)",
        }}
      >
        <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#172228", marginBottom: "0.8rem" }}>
          Recent Funnel Activity Trail (<code>funnel_events</code>)
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {recentEvents.map((ev) => (
            <div
              key={ev.id}
              style={{
                padding: "0.42rem 0.78rem",
                backgroundColor: "#FAF7F0",
                border: "1px solid rgba(23, 34, 40, 0.08)",
                borderRadius: "999px",
                fontSize: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.45rem",
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  color:
                    ev.type === "payment_succeeded" || ev.type === "lead_converted"
                      ? "#3F5C53"
                      : ev.type === "will_downloaded"
                      ? "#C65378"
                      : "#172228",
                  textTransform: "uppercase",
                  fontSize: "0.68rem",
                }}
              >
                {ev.type.replace(/_/g, " ")}
              </span>
              <span style={{ color: "#49585F" }}>{ev.email || "anonymous"}</span>
              <span style={{ color: "#8C98A0", fontSize: "0.7rem" }}>{timeAgo(ev.createdAt)}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.overview-split-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
