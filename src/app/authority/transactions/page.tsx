"use client";

import React, { useState } from "react";

interface TransactionRecord {
  txnId: string;
  name: string;
  phone: string;
  email: string;
  amount: number;
  status: "SUCCESS" | "PENDING" | "FAILED";
  date: string;
  payuRef: string;
  method: string;
}

const INITIAL_TRANSACTIONS: TransactionRecord[] = [
  {
    txnId: "PAYU_TXN_9812481",
    name: "Sunil Narang",
    phone: "98112 34567",
    email: "sunil.narang@gmail.com",
    amount: 1499,
    status: "SUCCESS",
    date: "2026-09-07 14:55",
    payuRef: "PU_MI_9812739120",
    method: "UPI (GooglePay)",
  },
  {
    txnId: "PAYU_TXN_9812479",
    name: "Dr. Ananya Roy",
    phone: "98301 88231",
    email: "ananya.roy@yahoo.co.in",
    amount: 1499,
    status: "SUCCESS",
    date: "2026-09-07 14:30",
    payuRef: "PU_MI_9812739118",
    method: "NetBanking (HDFC)",
  },
  {
    txnId: "PAYU_TXN_9812462",
    name: "Harpreet Singh",
    phone: "98722 99110",
    email: "harpreet.s@gmail.com",
    amount: 1499,
    status: "SUCCESS",
    date: "2026-09-07 11:45",
    payuRef: "PU_MI_9812738992",
    method: "Card (Mastercard •••• 4012)",
  },
  {
    txnId: "PAYU_TXN_9812450",
    name: "Rameshwar Patel",
    phone: "98250 11928",
    email: "r.patel@yahoo.com",
    amount: 1499,
    status: "FAILED",
    date: "2026-09-07 10:15",
    payuRef: "PU_MI_9812738760",
    method: "UPI (PhonePe)",
  },
  {
    txnId: "PAYU_TXN_9812431",
    name: "Karan Malhotra",
    phone: "98100 11223",
    email: "karan.malhotra@rediffmail.com",
    amount: 2998,
    status: "SUCCESS",
    date: "2026-09-06 18:35",
    payuRef: "PU_MI_9812737550",
    method: "UPI (BHIM)",
  },
];

export default function AuthorityTransactionsPage() {
  const [transactions] = useState<TransactionRecord[]>(INITIAL_TRANSACTIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [viewingTxn, setViewingTxn] = useState<TransactionRecord | null>(null);

  const filteredTxns = transactions.filter((t) => {
    const matchesSearch =
      t.txnId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.phone.includes(searchTerm) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (filterStatus !== "all" && t.status !== filterStatus) return false;
    return true;
  });

  const totalSuccess = transactions
    .filter((t) => t.status === "SUCCESS")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const handleExportCSV = () => {
    const headers = ["Txn ID", "Name", "Phone", "Email", "Amount", "Status", "Date", "Method", "PayU Ref"];
    const rows = filteredTxns.map((t) => [
      t.txnId,
      `"${t.name}"`,
      `"+91 ${t.phone}"`,
      t.email,
      t.amount,
      t.status,
      t.date,
      `"${t.method}"`,
      t.payuRef,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `transactions_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <h1 style={{ fontSize: "1.4rem", color: "var(--color-navy)", fontWeight: 700, margin: 0 }}>
          Transactions
        </h1>
        <button
          type="button"
          onClick={handleExportCSV}
          style={{
            padding: "0.45rem 0.85rem",
            fontSize: "0.82rem",
            backgroundColor: "#0F172A",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "4px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Export CSV
        </button>
      </div>

      {/* Metrics Row */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "160px", backgroundColor: "#FFFFFF", padding: "1rem 1.15rem", borderRadius: "var(--radius-md)", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.75rem", color: "var(--color-slate)", fontWeight: 500 }}>Total Collected</div>
          <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--color-navy)", marginTop: "0.2rem" }}>
            ₹{totalSuccess.toLocaleString("en-IN")}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: "160px", backgroundColor: "#FFFFFF", padding: "1rem 1.15rem", borderRadius: "var(--radius-md)", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.75rem", color: "var(--color-slate)", fontWeight: 500 }}>Successful</div>
          <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#166534", marginTop: "0.2rem" }}>
            {transactions.filter((t) => t.status === "SUCCESS").length}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: "160px", backgroundColor: "#FFFFFF", padding: "1rem 1.15rem", borderRadius: "var(--radius-md)", border: "1px solid #E2E8F0" }}>
          <div style={{ fontSize: "0.75rem", color: "var(--color-slate)", fontWeight: 500 }}>Failed</div>
          <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#DC2626", marginTop: "0.2rem" }}>
            {transactions.filter((t) => t.status === "FAILED").length}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search txn id, name, phone, email..."
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
          <option value="SUCCESS">Success</option>
          <option value="FAILED">Failed</option>
          <option value="PENDING">Pending</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "var(--radius-md)", border: "1px solid #E2E8F0", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #E2E8F0", textAlign: "left" }}>
              <th style={{ padding: "0.65rem 0.75rem", color: "var(--color-slate)", fontWeight: 600 }}>Txn ID</th>
              <th style={{ padding: "0.65rem 0.75rem", color: "var(--color-slate)", fontWeight: 600 }}>Customer</th>
              <th style={{ padding: "0.65rem 0.75rem", color: "var(--color-slate)", fontWeight: 600 }}>Amount</th>
              <th style={{ padding: "0.65rem 0.75rem", color: "var(--color-slate)", fontWeight: 600 }}>Method</th>
              <th style={{ padding: "0.65rem 0.75rem", color: "var(--color-slate)", fontWeight: 600 }}>Status</th>
              <th style={{ padding: "0.65rem 0.75rem", color: "var(--color-slate)", fontWeight: 600 }}>Date</th>
              <th style={{ padding: "0.65rem 0.75rem", color: "var(--color-slate)", fontWeight: 600, textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTxns.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "2rem", textAlign: "center", color: "var(--color-slate)" }}>
                  No transactions found.
                </td>
              </tr>
            ) : (
              filteredTxns.map((t) => (
                <tr key={t.txnId} style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <td style={{ padding: "0.65rem 0.75rem", fontFamily: "monospace", fontWeight: 600, color: "var(--color-navy)" }}>
                    {t.txnId}
                  </td>
                  <td style={{ padding: "0.65rem 0.75rem" }}>
                    <div style={{ fontWeight: 600, color: "var(--color-navy)" }}>{t.name}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--color-slate)" }}>+91 {t.phone}</div>
                  </td>
                  <td style={{ padding: "0.65rem 0.75rem", fontWeight: 600 }}>₹{t.amount}</td>
                  <td style={{ padding: "0.65rem 0.75rem", color: "var(--color-slate)" }}>{t.method}</td>
                  <td style={{ padding: "0.65rem 0.75rem" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 600, color: t.status === "SUCCESS" ? "#166534" : "#DC2626" }}>
                      {t.status}
                    </span>
                  </td>
                  <td style={{ padding: "0.65rem 0.75rem", color: "var(--color-slate)", fontSize: "0.75rem" }}>{t.date}</td>
                  <td style={{ padding: "0.65rem 0.75rem", textAlign: "right" }}>
                    <button
                      type="button"
                      onClick={() => setViewingTxn(t)}
                      style={{ padding: "0.25rem 0.55rem", fontSize: "0.75rem", border: "1px solid #CBD5E1", background: "#FFFFFF", borderRadius: "4px", cursor: "pointer" }}
                    >
                      Receipt
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL: RECEIPT */}
      {viewingTxn && (
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
            if (e.target === e.currentTarget) setViewingTxn(null);
          }}
        >
          <div style={{ width: "100%", maxWidth: "420px", backgroundColor: "#FFFFFF", borderRadius: "8px", padding: "1.5rem", border: "1px solid #E2E8F0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-navy)", margin: 0 }}>
                Transaction Details
              </h2>
              <button
                type="button"
                onClick={() => setViewingTxn(null)}
                style={{ background: "none", border: "none", fontSize: "1.1rem", cursor: "pointer", color: "#64748B" }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.82rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid #F1F5F9" }}>
                <span style={{ color: "#64748B" }}>Txn ID:</span>
                <span style={{ fontFamily: "monospace", fontWeight: 600 }}>{viewingTxn.txnId}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid #F1F5F9" }}>
                <span style={{ color: "#64748B" }}>PayU Ref:</span>
                <span style={{ fontFamily: "monospace" }}>{viewingTxn.payuRef}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid #F1F5F9" }}>
                <span style={{ color: "#64748B" }}>Customer:</span>
                <span>{viewingTxn.name} (+91 {viewingTxn.phone})</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid #F1F5F9" }}>
                <span style={{ color: "#64748B" }}>Amount:</span>
                <strong style={{ fontSize: "0.95rem" }}>₹{viewingTxn.amount}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid #F1F5F9" }}>
                <span style={{ color: "#64748B" }}>Status:</span>
                <strong style={{ color: viewingTxn.status === "SUCCESS" ? "#166534" : "#DC2626" }}>{viewingTxn.status}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0" }}>
                <span style={{ color: "#64748B" }}>Date:</span>
                <span>{viewingTxn.date}</span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.25rem" }}>
              <button
                type="button"
                onClick={() => setViewingTxn(null)}
                style={{ padding: "0.45rem 0.85rem", fontSize: "0.82rem", background: "#0F172A", color: "#FFFFFF", border: "none", borderRadius: "4px", cursor: "pointer" }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
