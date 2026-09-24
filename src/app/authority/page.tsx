"use client";

import React from "react";
import Link from "next/link";

const STATS = [
  { label: "Total Users", value: "1,284" },
  { label: "Finalized Wills", value: "492" },
  { label: "Total Revenue", value: "₹7,37,508" },
  { label: "Pending Verification", value: "38" },
];

const RECENT_USERS = [
  {
    name: "Sunil Narang",
    phone: "98112 34567",
    email: "sunil.narang@gmail.com",
    otpVerified: true,
    paid: true,
    date: "10m ago",
  },
  {
    name: "Dr. Ananya Roy",
    phone: "98301 88231",
    email: "ananya.roy@yahoo.co.in",
    otpVerified: true,
    paid: true,
    date: "35m ago",
  },
  {
    name: "Venkatesh Iyer",
    phone: "99401 22910",
    email: "venkat.iyer@outlook.com",
    otpVerified: true,
    paid: false,
    date: "1h ago",
  },
  {
    name: "Pooja Deshmukh",
    phone: "98220 54129",
    email: "pooja.d@gmail.com",
    otpVerified: false,
    paid: false,
    date: "2h ago",
  },
];

const RECENT_TXNS = [
  {
    txnId: "PAYU_TXN_9812481",
    user: "Sunil Narang",
    amount: "₹1,499",
    status: "SUCCESS",
    date: "10m ago",
  },
  {
    txnId: "PAYU_TXN_9812479",
    user: "Dr. Ananya Roy",
    amount: "₹1,499",
    status: "SUCCESS",
    date: "35m ago",
  },
  {
    txnId: "PAYU_TXN_9812462",
    user: "Harpreet Singh",
    amount: "₹1,499",
    status: "SUCCESS",
    date: "3h ago",
  },
  {
    txnId: "PAYU_TXN_9812450",
    user: "Rameshwar Patel",
    amount: "₹1,499",
    status: "FAILED",
    date: "4h ago",
  },
];

export default function AuthorityOverviewPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Page Title */}
      <h1 style={{ fontSize: "1.4rem", color: "var(--color-navy)", fontWeight: 700, margin: 0 }}>
        Overview
      </h1>

      {/* Clean KPI Numbers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
        }}
      >
        {STATS.map((st) => (
          <div
            key={st.label}
            style={{
              backgroundColor: "#FFFFFF",
              padding: "1.1rem 1.25rem",
              borderRadius: "var(--radius-md)",
              border: "1px solid #E2E8F0",
            }}
          >
            <div style={{ fontSize: "0.75rem", color: "var(--color-slate)", fontWeight: 500 }}>
              {st.label}
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--color-navy)", marginTop: "0.25rem" }}>
              {st.value}
            </div>
          </div>
        ))}
      </div>

      {/* 2 Tables: Recent Users & Transactions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 1fr",
          gap: "1.25rem",
        }}
        className="overview-split-grid"
      >
        {/* Recent Users */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: "1.25rem",
            borderRadius: "var(--radius-md)",
            border: "1px solid #E2E8F0",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
            <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--color-navy)" }}>
              Recent Signups
            </span>
            <Link href="/authority/users" style={{ fontSize: "0.78rem", color: "var(--color-slate)", textDecoration: "none" }}>
              All Users →
            </Link>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #E2E8F0", textAlign: "left" }}>
                <th style={{ padding: "0.5rem 0.35rem", color: "var(--color-slate)", fontWeight: 600 }}>User</th>
                <th style={{ padding: "0.5rem 0.35rem", color: "var(--color-slate)", fontWeight: 600 }}>Status</th>
                <th style={{ padding: "0.5rem 0.35rem", color: "var(--color-slate)", fontWeight: 600, textAlign: "right" }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_USERS.map((u) => (
                <tr key={u.email} style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <td style={{ padding: "0.6rem 0.35rem" }}>
                    <div style={{ fontWeight: 600, color: "var(--color-navy)" }}>{u.name}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--color-slate)" }}>+91 {u.phone}</div>
                  </td>
                  <td style={{ padding: "0.6rem 0.35rem" }}>
                    {u.paid ? (
                      <span style={{ fontSize: "0.72rem", color: "#166534", fontWeight: 600 }}>Paid</span>
                    ) : u.otpVerified ? (
                      <span style={{ fontSize: "0.72rem", color: "#854D0E", fontWeight: 600 }}>Verified</span>
                    ) : (
                      <span style={{ fontSize: "0.72rem", color: "#64748B" }}>Pending</span>
                    )}
                  </td>
                  <td style={{ padding: "0.6rem 0.35rem", textAlign: "right", color: "var(--color-slate)", fontSize: "0.75rem" }}>
                    {u.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Transactions */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: "1.25rem",
            borderRadius: "var(--radius-md)",
            border: "1px solid #E2E8F0",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
            <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--color-navy)" }}>
              Recent Transactions
            </span>
            <Link href="/authority/transactions" style={{ fontSize: "0.78rem", color: "var(--color-slate)", textDecoration: "none" }}>
              Ledger →
            </Link>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #E2E8F0", textAlign: "left" }}>
                <th style={{ padding: "0.5rem 0.35rem", color: "var(--color-slate)", fontWeight: 600 }}>Txn</th>
                <th style={{ padding: "0.5rem 0.35rem", color: "var(--color-slate)", fontWeight: 600 }}>Amount</th>
                <th style={{ padding: "0.5rem 0.35rem", color: "var(--color-slate)", fontWeight: 600, textAlign: "right" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_TXNS.map((t) => (
                <tr key={t.txnId} style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <td style={{ padding: "0.6rem 0.35rem" }}>
                    <div style={{ fontWeight: 600, color: "var(--color-navy)" }}>{t.user}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--color-slate)", fontFamily: "monospace" }}>{t.txnId}</div>
                  </td>
                  <td style={{ padding: "0.6rem 0.35rem", fontWeight: 600, color: "var(--color-navy)" }}>
                    {t.amount}
                  </td>
                  <td style={{ padding: "0.6rem 0.35rem", textAlign: "right" }}>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        color: t.status === "SUCCESS" ? "#166534" : "#DC2626",
                      }}
                    >
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
