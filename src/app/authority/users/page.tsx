"use client";

import React, { useState, useEffect, useCallback } from "react";
import { formatDDMMYYYY } from "@/lib/utils";

interface UserRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  state: string;
  authStatus: "verified" | "unverified";
  paymentStatus: "paid" | "unpaid";
  funnelStage: "lead" | "registered" | "customer";
  hasPassword?: boolean;
  willCredits: number;
  isBanned: boolean;
  createdAt?: string;
  willDraft?: {
    maritalStatus: string;
    hasChildren: boolean;
    primaryBeneficiary: string;
    executor: string;
    totalAssetsCount: number;
  };
}

interface StatsData {
  total: number;
  paid: number;
  verified: number;
  leads: number;
}

export default function AuthorityUsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [stats, setStats] = useState<StatsData>({ total: 0, paid: 0, verified: 0, leads: 0 });
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

      const res = await fetch(`/api/admin/users?${params.toString()}`);
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
      fetchUsers();
    }, 250);
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
      setCreateForm({ name: "", email: "", phone: "", state: "Delhi", isPaid: false });
      fetchUsers();
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
        setUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, isBanned: !u.isBanned } : u))
        );
      }
    } catch (err) {
      console.error("Failed to toggle ban", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleTogglePayment = async (user: UserRecord) => {
    setActionLoading(user.id);
    try {
      const nextPaid = user.paymentStatus !== "paid";
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, isPaid: nextPaid }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === user.id
              ? {
                  ...u,
                  paymentStatus: nextPaid ? "paid" : "unpaid",
                  funnelStage: nextPaid ? "customer" : "registered",
                }
              : u
          )
        );
        setStats((prev) => ({
          ...prev,
          paid: nextPaid ? prev.paid + 1 : Math.max(0, prev.paid - 1),
        }));
      }
    } catch (err) {
      console.error("Failed to toggle payment", err);
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
        setUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, authStatus: nextStatus } : u))
        );
        setStats((prev) => ({
          ...prev,
          verified: nextStatus === "verified" ? prev.verified + 1 : Math.max(0, prev.verified - 1),
        }));
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
        setUsers((prev) =>
          prev.map((u) =>
            u.id === adjustingUser.id ? { ...u, willCredits: newCredits } : u
          )
        );
      }
    } catch (err) {
      console.error("Failed to adjust credits", err);
    }

    setAdjustingUser(null);
    setCreditDelta(1);
    setCreditReason("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Header and Top Action Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.4rem", color: "var(--color-navy)", fontWeight: 700, margin: 0 }}>
            Unified User Registry
          </h1>
          <p style={{ margin: "0.25rem 0 0", fontSize: "0.82rem", color: "#64748B" }}>
            Real-time accounts, leads, inquiries, and subscriber access control
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            type="button"
            onClick={handleExportCsv}
            style={{
              padding: "0.5rem 0.85rem",
              fontSize: "0.82rem",
              fontWeight: 600,
              backgroundColor: "#FFFFFF",
              color: "#0F172A",
              border: "1px solid #CBD5E1",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export CSV
          </button>

          <button
            type="button"
            onClick={() => setCreateModalOpen(true)}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.82rem",
              fontWeight: 600,
              backgroundColor: "#0F172A",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create User
          </button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "0.75rem",
        }}
      >
        <div style={{ backgroundColor: "#FFFFFF", padding: "0.85rem 1rem", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 600, textTransform: "uppercase" }}>Total In Registry</div>
          <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0F172A", marginTop: "0.2rem" }}>{stats.total}</div>
        </div>
        <div style={{ backgroundColor: "#FFFFFF", padding: "0.85rem 1rem", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.72rem", color: "#166534", fontWeight: 600, textTransform: "uppercase" }}>Paid Subscribers</div>
          <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#166534", marginTop: "0.2rem" }}>{stats.paid}</div>
        </div>
        <div style={{ backgroundColor: "#FFFFFF", padding: "0.85rem 1rem", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.72rem", color: "#854D0E", fontWeight: 600, textTransform: "uppercase" }}>Email Verified</div>
          <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#854D0E", marginTop: "0.2rem" }}>{stats.verified}</div>
        </div>
        <div style={{ backgroundColor: "#FFFFFF", padding: "0.85rem 1rem", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.72rem", color: "#475569", fontWeight: 600, textTransform: "uppercase" }}>Inquiry Leads</div>
          <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#475569", marginTop: "0.2rem" }}>{stats.leads}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: "240px" }}>
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ width: "100%", fontSize: "0.85rem", padding: "0.55rem 0.75rem" }}
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="form-input"
          style={{ fontSize: "0.85rem", padding: "0.55rem 0.75rem", width: "auto", minWidth: "150px" }}
        >
          <option value="all">All Records</option>
          <option value="paid">Paid Customers</option>
          <option value="unpaid">Unpaid Users</option>
          <option value="verified">Email Verified</option>
          <option value="leads">Inquiry Leads Only</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #E2E8F0", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #E2E8F0", textAlign: "left", backgroundColor: "#F8FAFC" }}>
              <th style={{ padding: "0.75rem 0.85rem", color: "#475569", fontWeight: 600 }}>User / Lead</th>
              <th style={{ padding: "0.75rem 0.85rem", color: "#475569", fontWeight: 600 }}>Phone</th>
              <th style={{ padding: "0.75rem 0.85rem", color: "#475569", fontWeight: 600 }}>Email</th>
              <th style={{ padding: "0.75rem 0.85rem", color: "#475569", fontWeight: 600 }}>Stage</th>
              <th style={{ padding: "0.75rem 0.85rem", color: "#475569", fontWeight: 600 }}>Auth & Pay</th>
              <th style={{ padding: "0.75rem 0.85rem", color: "#475569", fontWeight: 600 }}>Credits</th>
              <th style={{ padding: "0.75rem 0.85rem", color: "#475569", fontWeight: 600, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} style={{ padding: "2.5rem", textAlign: "center", color: "#64748B" }}>
                  Loading user records from MongoDB...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "2.5rem", textAlign: "center", color: "#64748B" }}>
                  No users found matching current filters.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} style={{ borderBottom: "1px solid #F1F5F9", opacity: actionLoading === u.id ? 0.6 : 1 }}>
                  <td style={{ padding: "0.75rem 0.85rem", fontWeight: 600, color: "#0F172A" }}>
                    <div>
                      {u.name} {u.isBanned && <span style={{ color: "#DC2626", fontSize: "0.72rem", marginLeft: "4px" }}>(Banned)</span>}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#94A3B8", fontWeight: 400 }}>
                      {u.createdAt ? formatDDMMYYYY(u.createdAt) : "Recent"}
                    </div>
                  </td>
                  <td style={{ padding: "0.75rem 0.85rem", whiteSpace: "nowrap" }}>
                    {u.phone ? `+91 ${u.phone}` : <span style={{ color: "#CBD5E1" }}>—</span>}
                  </td>
                  <td style={{ padding: "0.75rem 0.85rem", color: "#334155" }}>
                    {u.email || <span style={{ color: "#CBD5E1" }}>—</span>}
                  </td>
                  <td style={{ padding: "0.75rem 0.85rem" }}>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontWeight: 600,
                        backgroundColor:
                          u.funnelStage === "customer"
                            ? "#DCFCE7"
                            : u.funnelStage === "registered"
                            ? "#E0F2FE"
                            : "#F1F5F9",
                        color:
                          u.funnelStage === "customer"
                            ? "#15803D"
                            : u.funnelStage === "registered"
                            ? "#0369A1"
                            : "#475569",
                        textTransform: "capitalize",
                      }}
                    >
                      {u.funnelStage || "lead"}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem 0.85rem" }}>
                    <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                      {u.paymentStatus === "paid" ? (
                        <span style={{ color: "#166534", backgroundColor: "#DCFCE7", padding: "2px 6px", borderRadius: "4px", fontWeight: 600, fontSize: "0.72rem" }}>
                          Paid
                        </span>
                      ) : (
                        <span style={{ color: "#64748B", backgroundColor: "#F1F5F9", padding: "2px 6px", borderRadius: "4px", fontSize: "0.72rem" }}>
                          Unpaid
                        </span>
                      )}
                      {u.authStatus === "verified" ? (
                        <span style={{ color: "#854D0E", backgroundColor: "#FEF9C3", padding: "2px 6px", borderRadius: "4px", fontWeight: 600, fontSize: "0.72rem" }}>
                          Verified
                        </span>
                      ) : (
                        <span style={{ color: "#94A3B8", backgroundColor: "#F8FAFC", padding: "2px 6px", borderRadius: "4px", fontSize: "0.72rem" }}>
                          Unverified
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: "0.75rem 0.85rem", fontWeight: 600 }}>{u.willCredits}</td>
                  <td style={{ padding: "0.75rem 0.85rem", textAlign: "right", whiteSpace: "nowrap" }}>
                    <div style={{ display: "inline-flex", gap: "0.35rem" }}>
                      <button
                        type="button"
                        onClick={() => setInspectingUser(u)}
                        style={{ padding: "0.3rem 0.55rem", fontSize: "0.75rem", border: "1px solid #CBD5E1", background: "#FFFFFF", borderRadius: "4px", cursor: "pointer" }}
                      >
                        Inspect
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTogglePayment(u)}
                        title={u.paymentStatus === "paid" ? "Revoke Paid Status" : "Mark as Paid"}
                        style={{
                          padding: "0.3rem 0.55rem",
                          fontSize: "0.75rem",
                          border: "1px solid #CBD5E1",
                          background: u.paymentStatus === "paid" ? "#FEF2F2" : "#F0FDF4",
                          color: u.paymentStatus === "paid" ? "#DC2626" : "#166534",
                          borderRadius: "4px",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        {u.paymentStatus === "paid" ? "Set Unpaid" : "Set Paid"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleAuthStatus(u)}
                        title={u.authStatus === "verified" ? "Revoke Verification" : "Mark Email Verified"}
                        style={{
                          padding: "0.3rem 0.55rem",
                          fontSize: "0.75rem",
                          border: "1px solid #CBD5E1",
                          background: u.authStatus === "verified" ? "#FEF9C3" : "#F0FDF4",
                          color: u.authStatus === "verified" ? "#854D0E" : "#166534",
                          borderRadius: "4px",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        {u.authStatus === "verified" ? "Unverify" : "Verify"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setAdjustingUser(u)}
                        style={{ padding: "0.3rem 0.55rem", fontSize: "0.75rem", border: "1px solid #CBD5E1", background: "#FFFFFF", borderRadius: "4px", cursor: "pointer" }}
                      >
                        Credits
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleBan(u)}
                        style={{
                          padding: "0.3rem 0.55rem",
                          fontSize: "0.75rem",
                          border: "1px solid #CBD5E1",
                          background: u.isBanned ? "#F1F5F9" : "#FEF2F2",
                          color: u.isBanned ? "#0F172A" : "#DC2626",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        {u.isBanned ? "Unban" : "Ban"}
                      </button>
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
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setCreateModalOpen(false);
          }}
        >
          <div style={{ width: "100%", maxWidth: "440px", backgroundColor: "#FFFFFF", borderRadius: "8px", padding: "1.5rem", border: "1px solid #E2E8F0" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--color-navy)", margin: "0 0 0.25rem" }}>
              Provision User Account
            </h2>
            <p style={{ fontSize: "0.8rem", color: "#64748B", margin: "0 0 1rem" }}>
              Creates a verified account and dispatches an invitation link for the user to set their password.
            </p>

            {createError && (
              <div style={{ padding: "0.6rem 0.75rem", backgroundColor: "#FEF2F2", color: "#991B1B", borderRadius: "6px", fontSize: "0.8rem", marginBottom: "1rem" }}>
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
                  style={{ width: "100%", fontSize: "0.85rem", padding: "0.5rem" }}
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
                  style={{ width: "100%", fontSize: "0.85rem", padding: "0.5rem" }}
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
                  style={{ width: "100%", fontSize: "0.85rem", padding: "0.5rem" }}
                />
              </div>

              <div>
                <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem", display: "block" }}>
                  Jurisdiction / State
                </label>
                <select
                  value={createForm.state}
                  onChange={(e) => setCreateForm({ ...createForm, state: e.target.value })}
                  className="form-input"
                  style={{ width: "100%", fontSize: "0.85rem", padding: "0.5rem" }}
                >
                  <option value="Delhi">Delhi / NCR</option>
                  <option value="Maharashtra">Maharashtra (Mumbai / Pune)</option>
                  <option value="Karnataka">Karnataka (Bengaluru)</option>
                  <option value="Tamil Nadu">Tamil Nadu (Chennai)</option>
                  <option value="West Bengal">West Bengal (Kolkata)</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Other">Other State / UT</option>
                </select>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
                <input
                  type="checkbox"
                  id="create-isPaid"
                  checked={createForm.isPaid}
                  onChange={(e) => setCreateForm({ ...createForm, isPaid: e.target.checked })}
                  style={{ width: "16px", height: "16px", cursor: "pointer" }}
                />
                <label htmlFor="create-isPaid" style={{ fontSize: "0.82rem", color: "#334155", cursor: "pointer" }}>
                  Mark as Paid Customer immediately (unlock document generation)
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.75rem" }}>
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  style={{ padding: "0.45rem 0.85rem", fontSize: "0.82rem", background: "none", border: "1px solid #CBD5E1", borderRadius: "4px", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createLoading}
                  style={{ padding: "0.45rem 0.95rem", fontSize: "0.82rem", background: "#0F172A", color: "#FFFFFF", border: "none", borderRadius: "4px", fontWeight: 600, cursor: "pointer" }}
                >
                  {createLoading ? "Creating..." : "Dispatch Invitation"}
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
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setAdjustingUser(null);
          }}
        >
          <div style={{ width: "100%", maxWidth: "380px", backgroundColor: "#FFFFFF", borderRadius: "8px", padding: "1.5rem", border: "1px solid #E2E8F0" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-navy)", margin: "0 0 0.5rem" }}>
              Adjust Credits: {adjustingUser.name}
            </h2>
            <p style={{ fontSize: "0.8rem", color: "#64748B", margin: "0 0 1rem" }}>
              Current credits: <strong>{adjustingUser.willCredits || 0}</strong>
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
                        padding: "0.45rem",
                        borderRadius: "4px",
                        border: creditDelta === delta ? "2px solid #0F172A" : "1px solid #CBD5E1",
                        backgroundColor: creditDelta === delta ? "#0F172A" : "#FFFFFF",
                        color: creditDelta === delta ? "#FFFFFF" : "#0F172A",
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
                  style={{ width: "100%", fontSize: "0.85rem", padding: "0.5rem" }}
                  autoFocus
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setAdjustingUser(null)}
                  style={{ padding: "0.45rem 0.85rem", fontSize: "0.82rem", background: "none", border: "1px solid #CBD5E1", borderRadius: "4px", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "0.45rem 0.95rem", fontSize: "0.82rem", background: "#0F172A", color: "#FFFFFF", border: "none", borderRadius: "4px", fontWeight: 600, cursor: "pointer" }}
                >
                  Save Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: INSPECT USER DETAILS */}
      {inspectingUser && (
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
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setInspectingUser(null);
          }}
        >
          <div style={{ width: "100%", maxWidth: "480px", backgroundColor: "#FFFFFF", borderRadius: "8px", padding: "1.5rem", border: "1px solid #E2E8F0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-navy)", margin: 0 }}>
                User Details: {inspectingUser.name}
              </h2>
              <button
                type="button"
                onClick={() => setInspectingUser(null)}
                style={{ background: "none", border: "none", fontSize: "1.1rem", cursor: "pointer", color: "#64748B" }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.82rem" }}>
              <div style={{ padding: "0.6rem 0.75rem", backgroundColor: "#F8FAFC", borderRadius: "4px" }}>
                <span style={{ color: "#64748B" }}>Database ID:</span> <code style={{ fontSize: "0.75rem" }}>{inspectingUser.id}</code>
              </div>
              <div style={{ padding: "0.6rem 0.75rem", backgroundColor: "#F8FAFC", borderRadius: "4px" }}>
                <span style={{ color: "#64748B" }}>Email:</span> <strong>{inspectingUser.email || "None"}</strong>
              </div>
              <div style={{ padding: "0.6rem 0.75rem", backgroundColor: "#F8FAFC", borderRadius: "4px" }}>
                <span style={{ color: "#64748B" }}>Phone:</span> <strong>{inspectingUser.phone ? `+91 ${inspectingUser.phone}` : "None"}</strong>
              </div>
              <div style={{ padding: "0.6rem 0.75rem", backgroundColor: "#F8FAFC", borderRadius: "4px" }}>
                <span style={{ color: "#64748B" }}>Jurisdiction State:</span> <strong>{inspectingUser.state || "Delhi"}</strong>
              </div>
              <div style={{ padding: "0.6rem 0.75rem", backgroundColor: "#F8FAFC", borderRadius: "4px" }}>
                <span style={{ color: "#64748B" }}>Auth Status:</span> <strong>{inspectingUser.authStatus}</strong> | Payment: <strong>{inspectingUser.paymentStatus}</strong>
              </div>
              <div style={{ padding: "0.6rem 0.75rem", backgroundColor: "#F8FAFC", borderRadius: "4px" }}>
                <span style={{ color: "#64748B" }}>Has Password Set:</span> <strong>{inspectingUser.hasPassword ? "Yes" : "No (Google OAuth or uninvited lead)"}</strong>
              </div>
              <div style={{ padding: "0.6rem 0.75rem", backgroundColor: "#F8FAFC", borderRadius: "4px" }}>
                <span style={{ color: "#64748B" }}>Created At:</span> <strong>{inspectingUser.createdAt ? new Date(inspectingUser.createdAt).toLocaleString("en-IN") : "Unknown"}</strong>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1.25rem" }}>
              {inspectingUser.email && (
                <button
                  type="button"
                  onClick={() => window.open(`/thank-you?email=${encodeURIComponent(inspectingUser.email)}`, "_blank")}
                  style={{
                    padding: "0.45rem 0.85rem",
                    fontSize: "0.82rem",
                    background: "var(--color-navy)",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "4px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <span>Open in Test Console</span>
                  <span>↗</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setInspectingUser(null)}
                style={{ padding: "0.45rem 0.85rem", fontSize: "0.82rem", background: "#F1F5F9", color: "#0F172A", border: "1px solid #CBD5E1", borderRadius: "4px", fontWeight: 600, cursor: "pointer" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
