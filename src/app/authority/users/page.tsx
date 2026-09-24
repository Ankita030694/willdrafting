"use client";

import React, { useState } from "react";

interface UserRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  state: string;
  otpVerified: boolean;
  isPaid: boolean;
  willCredits: number;
  isBanned: boolean;
  createdAt: string;
  willDraft: {
    maritalStatus: string;
    hasChildren: boolean;
    primaryBeneficiary: string;
    executor: string;
    totalAssetsCount: number;
  };
}

const INITIAL_USERS: UserRecord[] = [
  {
    id: "usr_01",
    name: "Sunil Narang",
    phone: "98112 34567",
    email: "sunil.narang@gmail.com",
    state: "Delhi",
    otpVerified: true,
    isPaid: true,
    willCredits: 1,
    isBanned: false,
    createdAt: "2026-09-07",
    willDraft: {
      maritalStatus: "Married",
      hasChildren: true,
      primaryBeneficiary: "Anita Narang (Spouse - 100%)",
      executor: "Rohit Narang (Brother)",
      totalAssetsCount: 4,
    },
  },
  {
    id: "usr_02",
    name: "Dr. Ananya Roy",
    phone: "98301 88231",
    email: "ananya.roy@yahoo.co.in",
    state: "West Bengal",
    otpVerified: true,
    isPaid: true,
    willCredits: 1,
    isBanned: false,
    createdAt: "2026-09-07",
    willDraft: {
      maritalStatus: "Married",
      hasChildren: true,
      primaryBeneficiary: "Subhashish Roy (Spouse - 50%), Sourav Roy (Son - 50%)",
      executor: "Adv. Pinaki Mukherjee",
      totalAssetsCount: 6,
    },
  },
  {
    id: "usr_03",
    name: "Venkatesh Iyer",
    phone: "99401 22910",
    email: "venkat.iyer@outlook.com",
    state: "Tamil Nadu",
    otpVerified: true,
    isPaid: false,
    willCredits: 0,
    isBanned: false,
    createdAt: "2026-09-07",
    willDraft: {
      maritalStatus: "Single",
      hasChildren: false,
      primaryBeneficiary: "S. Iyer (Father - 100%)",
      executor: "Karthik Subramanian",
      totalAssetsCount: 2,
    },
  },
  {
    id: "usr_04",
    name: "Pooja Deshmukh",
    phone: "98220 54129",
    email: "pooja.d@gmail.com",
    state: "Maharashtra",
    otpVerified: false,
    isPaid: false,
    willCredits: 0,
    isBanned: false,
    createdAt: "2026-09-07",
    willDraft: {
      maritalStatus: "Married",
      hasChildren: false,
      primaryBeneficiary: "Not configured",
      executor: "Not configured",
      totalAssetsCount: 0,
    },
  },
  {
    id: "usr_05",
    name: "Karan Malhotra",
    phone: "98100 11223",
    email: "karan.malhotra@rediffmail.com",
    state: "Punjab",
    otpVerified: true,
    isPaid: true,
    willCredits: 2,
    isBanned: false,
    createdAt: "2026-09-06",
    willDraft: {
      maritalStatus: "Married",
      hasChildren: true,
      primaryBeneficiary: "Simran Malhotra (Spouse - 100%)",
      executor: "Harpreet Malhotra (Brother)",
      totalAssetsCount: 8,
    },
  },
];

export default function AuthorityUsersPage() {
  const [users, setUsers] = useState<UserRecord[]>(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [adjustingUser, setAdjustingUser] = useState<UserRecord | null>(null);
  const [creditDelta, setCreditDelta] = useState<number>(1);
  const [creditReason, setCreditReason] = useState("");

  const [inspectingUser, setInspectingUser] = useState<UserRecord | null>(null);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.state.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (filterStatus === "paid") return u.isPaid;
    if (filterStatus === "unpaid") return !u.isPaid;
    if (filterStatus === "verified") return u.otpVerified;
    if (filterStatus === "pending") return !u.otpVerified;
    if (filterStatus === "banned") return u.isBanned;

    return true;
  });

  const handleToggleBan = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isBanned: !u.isBanned } : u))
    );
  };

  const handleSaveCreditAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustingUser) return;

    setUsers((prev) =>
      prev.map((u) =>
        u.id === adjustingUser.id
          ? { ...u, willCredits: Math.max(0, u.willCredits + creditDelta) }
          : u
      )
    );

    setAdjustingUser(null);
    setCreditDelta(1);
    setCreditReason("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Title */}
      <h1 style={{ fontSize: "1.4rem", color: "var(--color-navy)", fontWeight: 700, margin: 0 }}>
        Users
      </h1>

      {/* Filter Bar */}
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search name, phone, email, state..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input"
          style={{ flex: 1, minWidth: "220px", fontSize: "0.85rem", padding: "0.5rem 0.75rem" }}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="form-input"
          style={{ fontSize: "0.85rem", padding: "0.5rem 0.75rem", width: "auto" }}
        >
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="verified">Verified</option>
          <option value="pending">Pending</option>
          <option value="banned">Banned</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "var(--radius-md)", border: "1px solid #E2E8F0", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #E2E8F0", textAlign: "left" }}>
              <th style={{ padding: "0.65rem 0.75rem", color: "var(--color-slate)", fontWeight: 600 }}>Name</th>
              <th style={{ padding: "0.65rem 0.75rem", color: "var(--color-slate)", fontWeight: 600 }}>Phone</th>
              <th style={{ padding: "0.65rem 0.75rem", color: "var(--color-slate)", fontWeight: 600 }}>Email</th>
              <th style={{ padding: "0.65rem 0.75rem", color: "var(--color-slate)", fontWeight: 600 }}>State</th>
              <th style={{ padding: "0.65rem 0.75rem", color: "var(--color-slate)", fontWeight: 600 }}>Status</th>
              <th style={{ padding: "0.65rem 0.75rem", color: "var(--color-slate)", fontWeight: 600 }}>Credits</th>
              <th style={{ padding: "0.65rem 0.75rem", color: "var(--color-slate)", fontWeight: 600, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "2rem", textAlign: "center", color: "var(--color-slate)" }}>
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <td style={{ padding: "0.7rem 0.75rem", fontWeight: 600, color: "var(--color-navy)" }}>
                    {u.name} {u.isBanned && <span style={{ color: "#DC2626", fontSize: "0.72rem" }}>(Banned)</span>}
                  </td>
                  <td style={{ padding: "0.7rem 0.75rem", whiteSpace: "nowrap" }}>+91 {u.phone}</td>
                  <td style={{ padding: "0.7rem 0.75rem", color: "var(--color-slate)" }}>{u.email}</td>
                  <td style={{ padding: "0.7rem 0.75rem", color: "var(--color-slate)" }}>{u.state}</td>
                  <td style={{ padding: "0.7rem 0.75rem" }}>
                    {u.isPaid ? (
                      <span style={{ color: "#166534", fontWeight: 600, fontSize: "0.75rem" }}>Paid</span>
                    ) : u.otpVerified ? (
                      <span style={{ color: "#854D0E", fontWeight: 600, fontSize: "0.75rem" }}>Verified</span>
                    ) : (
                      <span style={{ color: "#64748B", fontSize: "0.75rem" }}>Pending</span>
                    )}
                  </td>
                  <td style={{ padding: "0.7rem 0.75rem", fontWeight: 600 }}>{u.willCredits}</td>
                  <td style={{ padding: "0.7rem 0.75rem", textAlign: "right", whiteSpace: "nowrap" }}>
                    <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                      <button
                        type="button"
                        onClick={() => setInspectingUser(u)}
                        style={{ padding: "0.25rem 0.55rem", fontSize: "0.75rem", border: "1px solid #CBD5E1", background: "#FFFFFF", borderRadius: "4px", cursor: "pointer" }}
                      >
                        Inspect
                      </button>
                      <button
                        type="button"
                        onClick={() => setAdjustingUser(u)}
                        style={{ padding: "0.25rem 0.55rem", fontSize: "0.75rem", border: "1px solid #CBD5E1", background: "#FFFFFF", borderRadius: "4px", cursor: "pointer" }}
                      >
                        Credits
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleBan(u.id)}
                        style={{
                          padding: "0.25rem 0.55rem",
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

            <form onSubmit={handleSaveCreditAdjustment} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div>
                <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem" }}>
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
                <label className="form-label" style={{ fontSize: "0.8rem", marginBottom: "0.25rem" }}>
                  Reason *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Reason for change"
                  value={creditReason}
                  onChange={(e) => setCreditReason(e.target.value)}
                  className="form-input"
                  style={{ fontSize: "0.85rem", padding: "0.5rem" }}
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
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: INSPECT DRAFT */}
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
                {inspectingUser.name}&apos;s Will Draft
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
                <span style={{ color: "#64748B" }}>Marital Status:</span> <strong>{inspectingUser.willDraft.maritalStatus}</strong> (Children: {inspectingUser.willDraft.hasChildren ? "Yes" : "No"})
              </div>
              <div style={{ padding: "0.6rem 0.75rem", backgroundColor: "#F8FAFC", borderRadius: "4px" }}>
                <span style={{ color: "#64748B" }}>Beneficiary:</span> <strong>{inspectingUser.willDraft.primaryBeneficiary}</strong>
              </div>
              <div style={{ padding: "0.6rem 0.75rem", backgroundColor: "#F8FAFC", borderRadius: "4px" }}>
                <span style={{ color: "#64748B" }}>Executor:</span> <strong>{inspectingUser.willDraft.executor}</strong>
              </div>
              <div style={{ padding: "0.6rem 0.75rem", backgroundColor: "#F8FAFC", borderRadius: "4px" }}>
                <span style={{ color: "#64748B" }}>Assets:</span> <strong>{inspectingUser.willDraft.totalAssetsCount} scheduled</strong>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1.25rem" }}>
              <button
                type="button"
                onClick={() => setInspectingUser(null)}
                style={{ padding: "0.45rem 0.85rem", fontSize: "0.82rem", background: "none", border: "1px solid #CBD5E1", borderRadius: "4px", cursor: "pointer" }}
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => alert(`Generating PDF for ${inspectingUser.name}...`)}
                style={{ padding: "0.45rem 0.95rem", fontSize: "0.82rem", background: "#0F172A", color: "#FFFFFF", border: "none", borderRadius: "4px", fontWeight: 600, cursor: "pointer" }}
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
