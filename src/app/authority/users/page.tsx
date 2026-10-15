"use client";

import React, { useState, useEffect, useCallback } from "react";
import { formatDDMMYYYY } from "@/lib/utils";
import WillDetailInspectorModal, {
  type InspectorTarget,
  type InspectorOrderItem,
} from "@/components/admin/WillDetailInspectorModal";
import type { WillDraftingState } from "@/lib/willDraftingStore";

interface UserWillInfo {
  willId: string;
  version: number;
  detailsVerified: boolean;
  detailsVerifiedAt: string | null;
  lockedAt: string | null;
  downloadCount: number;
  lastDownloadedAt: string | null;
  updatedAt: string;
  createdAt: string;
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
    healthIssues: Array<{ severity: string; title: string; category: string }>;
  };
  state: WillDraftingState;
}

interface UserRecord {
  id: string;
  kind: "user" | "lead";
  name: string;
  phone: string;
  email: string;
  state: string;
  googleId: string | null;
  authStatus: "verified" | "unverified";
  paymentStatus: "paid" | "unpaid";
  funnelStage: "lead" | "registered" | "customer";
  leadStatus: string | null;
  source: string;
  message: string | null;
  planId: string | null;
  willCredits: number;
  isBanned: boolean;
  paidAt?: string | null;
  lastCheckoutAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  will: UserWillInfo | null;
  orders: {
    totalOrders: number;
    paidOrdersCount: number;
    totalPaidAmount: number;
    lastOrder: {
      txnId: string;
      amount: number;
      status: string;
      planId: string;
      gateway: string;
      createdAt: string;
    } | null;
    list: InspectorOrderItem[];
  };
}

interface StatsData {
  total: number;
  paid: number;
  verified: number;
  leads: number;
  checkoutStarted: number;
  withWill: number;
}

export default function AuthorityUsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [stats, setStats] = useState<StatsData>({
    total: 0,
    paid: 0,
    verified: 0,
    leads: 0,
    checkoutStarted: 0,
    withWill: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Modals & Actions
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    phone: "",
    state: "Delhi",
    isPaid: false,
    planId: "essential",
  });
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState("");

  const [adjustingUser, setAdjustingUser] = useState<UserRecord | null>(null);
  const [creditDelta, setCreditDelta] = useState<number>(1);
  const [creditReason, setCreditReason] = useState("");

  const [inspectingUser, setInspectingUser] = useState<UserRecord | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm.trim()) params.set("search", searchTerm.trim());
      if (filterStatus !== "all") params.set("filter", filterStatus);

      const res = await fetch(`/api/admin/users?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load users");
      const data = await res.json();
      setUsers(data.users || []);
      if (data.stats) setStats(data.stats);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filterStatus]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchUsers();
    }, 200);
    return () => clearTimeout(timer);
  }, [fetchUsers]);

  const handleExportCsv = () => {
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("search", searchTerm.trim());
    if (filterStatus !== "all") params.set("filter", filterStatus);
    params.set("export", "csv");
    window.open(`/api/admin/users?${params.toString()}`, "_blank");
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateLoading(true);
    setCreateError("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create user");
      }
      setCreateModalOpen(false);
      setCreateForm({
        name: "",
        email: "",
        phone: "",
        state: "Delhi",
        isPaid: false,
        planId: "essential",
      });
      await fetchUsers();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create user";
      setCreateError(msg);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleToggleBan = async (user: UserRecord) => {
    setActionLoading(user.id);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, isBanned: !user.isBanned }),
      });
      if (res.ok) {
        await fetchUsers();
      }
    } catch (err) {
      console.error("Failed to toggle ban", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleGrantPaid = async (accountId: string, planId = "essential") => {
    setActionLoading(accountId);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: accountId, isPaid: true, planId }),
      });
      if (res.ok) {
        setInspectingUser(null);
        await fetchUsers();
      }
    } catch (err) {
      console.error("Failed to grant paid status", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleUnlockWill = async (accountId: string) => {
    setActionLoading(accountId);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: accountId, unlockUserWill: true }),
      });
      if (res.ok) {
        setInspectingUser(null);
        await fetchUsers();
      }
    } catch (err) {
      console.error("Failed to unlock will", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleAuthStatus = async (user: UserRecord) => {
    setActionLoading(user.id);
    try {
      const nextStatus = user.authStatus === "verified" ? "unverified" : "verified";
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, authStatus: nextStatus }),
      });
      if (res.ok) {
        await fetchUsers();
      }
    } catch (err) {
      console.error("Failed to toggle verification", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleSaveCreditAdjustment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustingUser) return;

    const newCredits = Math.max(0, (adjustingUser.willCredits || 0) + creditDelta);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: adjustingUser.id, willCredits: newCredits }),
      });
      if (res.ok) {
        await fetchUsers();
      }
    } catch (err) {
      console.error("Failed to adjust credits", err);
    }

    setAdjustingUser(null);
    setCreditDelta(1);
    setCreditReason("");
  };

  const buildInspectorTarget = (u: UserRecord): InspectorTarget => ({
    title: u.name,
    category:
      u.paymentStatus === "paid"
        ? "paid_customer"
        : u.will
        ? "logged_in_unpaid"
        : "logged_in_no_will",
    accountId: u.id,
    willId: u.will?.willId || null,
    name: u.name,
    email: u.email,
    phone: u.phone,
    stateLocation: u.state,
    authStatus: u.authStatus,
    leadStatus: u.leadStatus,
    source: u.source,
    googleId: u.googleId,
    planId: u.planId,
    willCredits: u.willCredits,
    isBanned: u.isBanned,
    message: u.message,
    version: u.will?.version,
    detailsVerified: u.will?.detailsVerified,
    detailsVerifiedAt: u.will?.detailsVerifiedAt,
    lockedAt: u.will?.lockedAt,
    downloadCount: u.will?.downloadCount,
    createdAt: u.createdAt,
    updatedAt: u.will?.updatedAt || u.updatedAt,
    progress: u.will?.progress || null,
    willState: u.will?.state || null,
    orders: u.orders?.list || [],
    onGrantPlan: handleGrantPaid,
    onUnlockWill: handleUnlockWill,
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.35rem" }}>
      {/* Header and Top Action Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", color: "#172228", fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
            Users & Accounts Directory
          </h1>
          <p style={{ margin: "0.25rem 0 0", fontSize: "0.84rem", color: "#55636D" }}>
            Unified registry across <code>users</code> (paid customers) and <code>leads</code> (unpaid signups & inquiries), joined with <code>wills</code> & <code>orders</code>
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.55rem" }}>
          <button
            type="button"
            onClick={handleExportCsv}
            style={{
              padding: "0.5rem 0.95rem",
              fontSize: "0.82rem",
              fontWeight: 600,
              backgroundColor: "#FFFFFF",
              color: "#172228",
              border: "1px solid rgba(23, 34, 40, 0.14)",
              borderRadius: "999px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            Export CSV
          </button>

          <button
            type="button"
            onClick={() => setCreateModalOpen(true)}
            style={{
              padding: "0.5rem 1.05rem",
              fontSize: "0.82rem",
              fontWeight: 600,
              backgroundColor: "#C65378",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "999px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(198, 83, 120, 0.2)",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            + Create Account
          </button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "0.85rem",
        }}
      >
        <div style={{ backgroundColor: "#FFFFFF", padding: "0.95rem 1.15rem", borderRadius: "16px", border: "1px solid rgba(23, 34, 40, 0.08)", boxShadow: "0 6px 20px -4px rgba(23, 34, 40, 0.05)" }}>
          <div style={{ fontSize: "0.7rem", color: "#55636D", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em" }}>Total Accounts</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#172228", marginTop: "0.2rem" }}>{stats.total}</div>
        </div>
        <div style={{ backgroundColor: "#FFFFFF", padding: "0.95rem 1.15rem", borderRadius: "16px", border: "1px solid rgba(23, 34, 40, 0.08)", boxShadow: "0 6px 20px -4px rgba(23, 34, 40, 0.05)" }}>
          <div style={{ fontSize: "0.7rem", color: "#3F5C53", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em" }}>Paid Customers</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#3F5C53", marginTop: "0.2rem" }}>{stats.paid}</div>
        </div>
        <div style={{ backgroundColor: "#FFFFFF", padding: "0.95rem 1.15rem", borderRadius: "16px", border: "1px solid rgba(23, 34, 40, 0.08)", boxShadow: "0 6px 20px -4px rgba(23, 34, 40, 0.05)" }}>
          <div style={{ fontSize: "0.7rem", color: "#A13C5D", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em" }}>Unpaid Leads</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#C65378", marginTop: "0.2rem" }}>{stats.leads}</div>
        </div>
        <div style={{ backgroundColor: "#FFFFFF", padding: "0.95rem 1.15rem", borderRadius: "16px", border: "1px solid rgba(23, 34, 40, 0.08)", boxShadow: "0 6px 20px -4px rgba(23, 34, 40, 0.05)" }}>
          <div style={{ fontSize: "0.7rem", color: "#9A5B13", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em" }}>Checkout Started</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#9A5B13", marginTop: "0.2rem" }}>{stats.checkoutStarted}</div>
        </div>
        <div style={{ backgroundColor: "#FFFFFF", padding: "0.95rem 1.15rem", borderRadius: "16px", border: "1px solid rgba(23, 34, 40, 0.08)", boxShadow: "0 6px 20px -4px rgba(23, 34, 40, 0.05)" }}>
          <div style={{ fontSize: "0.7rem", color: "#49585F", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em" }}>Email Verified</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#172228", marginTop: "0.2rem" }}>{stats.verified}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: "240px" }}>
          <input
            type="text"
            placeholder="Search by name, phone, email, or state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ width: "100%", fontSize: "0.85rem", padding: "0.6rem 0.9rem", backgroundColor: "#FFFFFF" }}
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="form-input"
          style={{ fontSize: "0.85rem", padding: "0.6rem 0.85rem", width: "auto", minWidth: "180px", backgroundColor: "#FFFFFF" }}
        >
          <option value="all">All Accounts (Users + Leads)</option>
          <option value="paid">Paid Customers Only (users)</option>
          <option value="unpaid">Unpaid Leads Only (leads)</option>
          <option value="with_will">Accounts With Saved Will</option>
          <option value="checkout_started">Checkout Started (Unpaid)</option>
          <option value="verified">Email Verified</option>
          <option value="captured">Form Captures Only</option>
          <option value="banned">Banned Customers</option>
        </select>
      </div>

      {/* Table */}
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
              <th style={{ padding: "0.75rem 0.9rem", color: "#49585F", fontWeight: 600 }}>Account & Source</th>
              <th style={{ padding: "0.75rem 0.9rem", color: "#49585F", fontWeight: 600 }}>Contact</th>
              <th style={{ padding: "0.75rem 0.9rem", color: "#49585F", fontWeight: 600 }}>Stage & Auth</th>
              <th style={{ padding: "0.75rem 0.9rem", color: "#49585F", fontWeight: 600 }}>Will Draft Status</th>
              <th style={{ padding: "0.75rem 0.9rem", color: "#49585F", fontWeight: 600 }}>Plan & Orders</th>
              <th style={{ padding: "0.75rem 0.9rem", color: "#49585F", fontWeight: 600, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ padding: "2.5rem", textAlign: "center", color: "#55636D" }}>
                  Loading user records from MongoDB...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "2.5rem", textAlign: "center", color: "#55636D" }}>
                  No accounts found matching current filters.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} style={{ borderBottom: "1px solid rgba(23, 34, 40, 0.06)", opacity: actionLoading === u.id ? 0.6 : 1 }}>
                  <td style={{ padding: "0.8rem 0.9rem" }}>
                    <div style={{ fontWeight: 700, color: "#172228" }}>
                      {u.name}
                      {u.isBanned && (
                        <span style={{ color: "#B91C1C", fontSize: "0.7rem", marginLeft: "6px" }}>(Banned)</span>
                      )}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#55636D", marginTop: "2px", textTransform: "capitalize" }}>
                      {u.createdAt ? formatDDMMYYYY(u.createdAt) : "Recent"} • {u.source.replace(/_/g, " ")}{" "}
                      {u.googleId ? "(Google)" : ""}
                    </div>
                  </td>

                  <td style={{ padding: "0.8rem 0.9rem" }}>
                    <div style={{ color: "#172228", fontWeight: 500 }}>
                      {u.email || <span style={{ color: "#8C98A0" }}>No email</span>}
                    </div>
                    <div style={{ fontSize: "0.73rem", color: "#55636D", marginTop: "2px" }}>
                      {u.phone ? `+91 ${u.phone}` : "No phone"} {u.state ? `• ${u.state}` : ""}
                    </div>
                  </td>

                  <td style={{ padding: "0.8rem 0.9rem" }}>
                    <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                      {u.paymentStatus === "paid" ? (
                        <span style={{ color: "#3F5C53", backgroundColor: "rgba(95, 126, 117, 0.14)", padding: "2px 8px", borderRadius: "999px", fontWeight: 700, fontSize: "0.7rem" }}>
                          PAID CUSTOMER
                        </span>
                      ) : (
                        <span style={{ color: "#A13C5D", backgroundColor: "rgba(198, 83, 120, 0.12)", padding: "2px 8px", borderRadius: "999px", fontWeight: 600, fontSize: "0.7rem", textTransform: "uppercase" }}>
                          {(u.leadStatus || "lead").replace(/_/g, " ")}
                        </span>
                      )}

                      {u.authStatus === "verified" ? (
                        <span style={{ color: "#3F5C53", backgroundColor: "#FAF7F0", border: "1px solid rgba(95, 126, 117, 0.3)", padding: "2px 7px", borderRadius: "999px", fontWeight: 600, fontSize: "0.7rem" }}>
                          Verified
                        </span>
                      ) : (
                        <span style={{ color: "#55636D", backgroundColor: "rgba(23, 34, 40, 0.06)", padding: "2px 7px", borderRadius: "999px", fontSize: "0.7rem" }}>
                          Unverified
                        </span>
                      )}
                    </div>
                  </td>

                  <td style={{ padding: "0.8rem 0.9rem" }}>
                    {u.will ? (
                      <div>
                        <div style={{ fontWeight: 600, color: "#172228" }}>
                          {u.will.progress.completionPercent}% ({u.will.progress.sectionsCompleted}/6 sections)
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "#55636D" }}>
                          Step {u.will.progress.currentStep}: {u.will.progress.currentStepTitle} (v{u.will.version})
                          {u.will.detailsVerified && (
                            <span style={{ color: "#3F5C53", fontWeight: 700, marginLeft: "4px" }}>• Locked</span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <span style={{ color: "#8C98A0", fontSize: "0.75rem" }}>No Will saved</span>
                    )}
                  </td>

                  <td style={{ padding: "0.8rem 0.9rem" }}>
                    <div style={{ fontWeight: 600, color: "#172228", textTransform: "capitalize" }}>
                      {(u.planId || "None").replace(/_/g, " ")}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#55636D" }}>
                      {u.paymentStatus === "paid"
                        ? `Credits: ${u.willCredits} • Paid ₹${u.orders.totalPaidAmount}`
                        : u.orders.totalOrders > 0
                        ? `${u.orders.totalOrders} order attempt(s)`
                        : "0 orders"}
                    </div>
                  </td>

                  <td style={{ padding: "0.8rem 0.9rem", textAlign: "right", whiteSpace: "nowrap" }}>
                    <div style={{ display: "inline-flex", gap: "0.35rem" }}>
                      <button
                        type="button"
                        onClick={() => setInspectingUser(u)}
                        style={{
                          padding: "0.35rem 0.7rem",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          border: "none",
                          background: "#C65378",
                          color: "#FFFFFF",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                      >
                        Inspect
                      </button>

                      {u.paymentStatus !== "paid" && (
                        <button
                          type="button"
                          onClick={() => handleGrantPaid(u.id, u.planId || "essential")}
                          title="Grant Paid Customer Plan"
                          style={{
                            padding: "0.35rem 0.65rem",
                            fontSize: "0.74rem",
                            border: "1px solid rgba(95, 126, 117, 0.35)",
                            background: "rgba(95, 126, 117, 0.12)",
                            color: "#3F5C53",
                            borderRadius: "8px",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          Grant Paid
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleToggleAuthStatus(u)}
                        style={{
                          padding: "0.35rem 0.6rem",
                          fontSize: "0.74rem",
                          border: "1px solid rgba(23, 34, 40, 0.14)",
                          background: "#FFFFFF",
                          color: "#49585F",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                      >
                        {u.authStatus === "verified" ? "Unverify" : "Verify"}
                      </button>

                      {u.kind === "user" && (
                        <>
                          <button
                            type="button"
                            onClick={() => setAdjustingUser(u)}
                            style={{
                              padding: "0.35rem 0.6rem",
                              fontSize: "0.74rem",
                              border: "1px solid rgba(23, 34, 40, 0.14)",
                              background: "#FFFFFF",
                              color: "#49585F",
                              borderRadius: "8px",
                              cursor: "pointer",
                            }}
                          >
                            Credits
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleBan(u)}
                            style={{
                              padding: "0.35rem 0.6rem",
                              fontSize: "0.74rem",
                              border: "1px solid #FECACA",
                              background: u.isBanned ? "#FAF7F0" : "#FEF2F2",
                              color: u.isBanned ? "#172228" : "#B91C1C",
                              borderRadius: "8px",
                              cursor: "pointer",
                            }}
                          >
                            {u.isBanned ? "Unban" : "Ban"}
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL: CREATE USER ACCOUNT */}
      {createModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            backgroundColor: "rgba(23, 34, 40, 0.55)",
            backdropFilter: "blur(3px)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setCreateModalOpen(false);
          }}
        >
          <div style={{ width: "100%", maxWidth: "450px", backgroundColor: "#FFFFFF", borderRadius: "18px", padding: "1.6rem", border: "1px solid rgba(23, 34, 40, 0.1)", boxShadow: "0 20px 50px rgba(23, 34, 40, 0.25)" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#172228", margin: "0 0 0.25rem" }}>
              Provision Account
            </h2>
            <p style={{ fontSize: "0.8rem", color: "#55636D", margin: "0 0 1rem" }}>
              Creates a verified account and dispatches an email invitation for passwordless OTP / Google sign-in.
            </p>

            {createError && (
              <div style={{ padding: "0.6rem 0.75rem", backgroundColor: "#FEF2F2", color: "#991B1B", borderRadius: "8px", fontSize: "0.8rem", marginBottom: "1rem" }}>
                {createError}
              </div>
            )}

            <form onSubmit={handleCreateUser} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div>
                <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem", display: "block" }}>
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra Sharma"
                  value={createForm.name}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  className="form-input"
                  style={{ width: "100%", fontSize: "0.85rem", padding: "0.55rem 0.75rem" }}
                  autoFocus
                />
              </div>

              <div>
                <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem", display: "block" }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="ramesh@example.com"
                  value={createForm.email}
                  onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                  className="form-input"
                  style={{ width: "100%", fontSize: "0.85rem", padding: "0.55rem 0.75rem" }}
                />
              </div>

              <div>
                <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem", display: "block" }}>
                  Mobile Phone (10 digits)
                </label>
                <input
                  type="tel"
                  placeholder="9810012345"
                  maxLength={10}
                  value={createForm.phone}
                  onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })}
                  className="form-input"
                  style={{ width: "100%", fontSize: "0.85rem", padding: "0.55rem 0.75rem" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
                <div>
                  <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem", display: "block" }}>
                    State
                  </label>
                  <select
                    value={createForm.state}
                    onChange={(e) => setCreateForm({ ...createForm, state: e.target.value })}
                    className="form-input"
                    style={{ width: "100%", fontSize: "0.85rem", padding: "0.55rem 0.75rem" }}
                  >
                    <option value="Delhi">Delhi / NCR</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Other">Other State / UT</option>
                  </select>
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem", display: "block" }}>
                    Plan Tier
                  </label>
                  <select
                    value={createForm.planId}
                    onChange={(e) => setCreateForm({ ...createForm, planId: e.target.value })}
                    className="form-input"
                    style={{ width: "100%", fontSize: "0.85rem", padding: "0.55rem 0.75rem" }}
                  >
                    <option value="essential">Essential (₹2,490)</option>
                    <option value="lawyer_verified">Lawyer Verified (₹4,990)</option>
                    <option value="premium">Connect to Lawyer (₹9,990)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
                <input
                  type="checkbox"
                  id="create-isPaid"
                  checked={createForm.isPaid}
                  onChange={(e) => setCreateForm({ ...createForm, isPaid: e.target.checked })}
                  style={{ width: "16px", height: "16px", cursor: "pointer", accentColor: "#C65378" }}
                />
                <label htmlFor="create-isPaid" style={{ fontSize: "0.82rem", color: "#49585F", cursor: "pointer" }}>
                  Grant Paid Customer access immediately (creates audited admin order)
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.75rem" }}>
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  style={{ padding: "0.48rem 0.9rem", fontSize: "0.82rem", background: "#FFFFFF", color: "#49585F", border: "1px solid rgba(23, 34, 40, 0.14)", borderRadius: "8px", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createLoading}
                  style={{ padding: "0.48rem 1.05rem", fontSize: "0.82rem", background: "#C65378", color: "#FFFFFF", border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}
                >
                  {createLoading ? "Creating..." : "Create & Invite"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADJUST CREDITS */}
      {adjustingUser && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            backgroundColor: "rgba(23, 34, 40, 0.55)",
            backdropFilter: "blur(3px)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setAdjustingUser(null);
          }}
        >
          <div style={{ width: "100%", maxWidth: "390px", backgroundColor: "#FFFFFF", borderRadius: "18px", padding: "1.6rem", border: "1px solid rgba(23, 34, 40, 0.1)", boxShadow: "0 20px 50px rgba(23, 34, 40, 0.25)" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#172228", margin: "0 0 0.5rem" }}>
              Adjust Credits: {adjustingUser.name}
            </h2>
            <p style={{ fontSize: "0.8rem", color: "#55636D", margin: "0 0 1rem" }}>
              Current credits: <strong style={{ color: "#172228" }}>{adjustingUser.willCredits || 0}</strong>
            </p>

            <form onSubmit={handleSaveCreditAdjustment} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div>
                <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem", display: "block" }}>
                  Credits Delta
                </label>
                <div style={{ display: "flex", gap: "0.4rem" }}>
                  {[-1, +1, +2, +5].map((delta) => (
                    <button
                      key={delta}
                      type="button"
                      onClick={() => setCreditDelta(delta)}
                      style={{
                        flex: 1,
                        padding: "0.48rem",
                        borderRadius: "8px",
                        border: creditDelta === delta ? "2px solid #C65378" : "1px solid rgba(23, 34, 40, 0.14)",
                        backgroundColor: creditDelta === delta ? "#C65378" : "#FFFFFF",
                        color: creditDelta === delta ? "#FFFFFF" : "#172228",
                        fontWeight: 600,
                        fontSize: "0.82rem",
                        cursor: "pointer",
                      }}
                    >
                      {delta > 0 ? `+${delta}` : delta}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem", display: "block" }}>
                  Reason (Internal Audit Note)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Complimentary consultation credit"
                  value={creditReason}
                  onChange={(e) => setCreditReason(e.target.value)}
                  className="form-input"
                  style={{ width: "100%", fontSize: "0.85rem", padding: "0.55rem 0.75rem" }}
                  autoFocus
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setAdjustingUser(null)}
                  style={{ padding: "0.48rem 0.9rem", fontSize: "0.82rem", background: "#FFFFFF", color: "#49585F", border: "1px solid rgba(23, 34, 40, 0.14)", borderRadius: "8px", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "0.48rem 1rem", fontSize: "0.82rem", background: "#C65378", color: "#FFFFFF", border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}
                >
                  Save Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DEEP INSPECTOR MODAL (Will Questionnaire + Account + Orders) */}
      <WillDetailInspectorModal
        target={inspectingUser ? buildInspectorTarget(inspectingUser) : null}
        onClose={() => setInspectingUser(null)}
      />
    </div>
  );
}
