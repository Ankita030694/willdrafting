"use client";

import React, { useState, useEffect, useCallback } from "react";

interface PaymentEventItem {
  eventId: string;
  source: string;
  status: string;
  createdAt: string;
  payload: Record<string, unknown>;
}

interface TransactionRecord {
  id: string;
  txnId: string;
  invoiceNo: string | null;
  accountId: string;
  accountKind: "lead" | "user";
  currentAccountKind: "lead" | "user";
  customerName: string;
  email: string;
  phone: string;
  planId: string;
  planName: string;
  kind: string;
  baseAmount: number;
  discount: number;
  amount: number;
  couponCode: string | null;
  status: "created" | "pending" | "paid" | "failed" | "abandoned";
  gateway: "payu" | "admin_grant";
  gatewayPaymentId: string | null;
  bankRefNum: string | null;
  method: string;
  failureReason: string | null;
  field9: string | null;
  addedOn: string | null;
  createdAt: string;
  updatedAt: string;
  paidAt: string | null;
  events: PaymentEventItem[];
}

interface TxnStats {
  totalOrders: number;
  totalRevenue: number;
  paidCount: number;
  pendingCount: number;
  failedCount: number;
  adminGrantsCount: number;
}

function formatDateTime(val?: string | null): string {
  if (!val) return "—";
  const d = new Date(val);
  if (isNaN(d.getTime())) return String(val);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AuthorityTransactionsPage() {
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [stats, setStats] = useState<TxnStats>({
    totalOrders: 0,
    totalRevenue: 0,
    paidCount: 0,
    pendingCount: 0,
    failedCount: 0,
    adminGrantsCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [gatewayFilter, setGatewayFilter] = useState<string>("all");
  const [viewingTxn, setViewingTxn] = useState<TransactionRecord | null>(null);
  const [verifyingTxnId, setVerifyingTxnId] = useState<string | null>(null);
  const [verifyNotice, setVerifyNotice] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm.trim()) params.set("search", searchTerm.trim());
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (gatewayFilter !== "all") params.set("gateway", gatewayFilter);

      const res = await fetch(`/api/admin/transactions?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load transactions");
      const data = await res.json();
      setTransactions(data.transactions || []);
      if (data.stats) setStats(data.stats);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter, gatewayFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchTransactions();
    }, 200);
    return () => clearTimeout(timer);
  }, [fetchTransactions]);

  const handleExportCSV = () => {
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("search", searchTerm.trim());
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (gatewayFilter !== "all") params.set("gateway", gatewayFilter);
    params.set("export", "csv");
    window.open(`/api/admin/transactions?${params.toString()}`, "_blank");
  };

  const handleVerifyWithPayU = async (txnId: string) => {
    setVerifyingTxnId(txnId);
    setVerifyNotice(null);
    try {
      const res = await fetch("/api/admin/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txnId }),
      });
      const data = await res.json();
      if (res.ok) {
        setVerifyNotice(`PayU verification result for ${txnId}: ${String(data.outcome).toUpperCase()}`);
        await fetchTransactions();
      } else {
        setVerifyNotice(data.error || "Could not verify with PayU.");
      }
    } catch {
      setVerifyNotice("Network error while verifying with PayU.");
    } finally {
      setVerifyingTxnId(null);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.35rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", color: "#172228", fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
            Transactions & Orders Ledger
          </h1>
          <p style={{ margin: "0.25rem 0 0", fontSize: "0.84rem", color: "#55636D" }}>
            Live payment orders from MongoDB <code>orders</code> collection with PayU callback/webhook event logs
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.55rem" }}>
          <button
            type="button"
            onClick={fetchTransactions}
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
            onClick={handleExportCSV}
            style={{
              padding: "0.48rem 1rem",
              fontSize: "0.82rem",
              backgroundColor: "#C65378",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "999px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(198, 83, 120, 0.2)",
            }}
          >
            Export CSV
          </button>
        </div>
      </div>

      {verifyNotice && (
        <div
          style={{
            padding: "0.7rem 1rem",
            backgroundColor: "#FAF7F0",
            border: "1px solid rgba(198, 83, 120, 0.3)",
            borderRadius: "12px",
            color: "#A13C5D",
            fontSize: "0.82rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{verifyNotice}</span>
          <button
            type="button"
            onClick={() => setVerifyNotice(null)}
            style={{ background: "none", border: "none", color: "#A13C5D", cursor: "pointer", fontWeight: 700 }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Metrics Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.85rem" }}>
        <div style={{ backgroundColor: "#FFFFFF", padding: "0.95rem 1.15rem", borderRadius: "16px", border: "1px solid rgba(23, 34, 40, 0.08)", boxShadow: "0 6px 20px -4px rgba(23, 34, 40, 0.05)" }}>
          <div style={{ fontSize: "0.7rem", color: "#55636D", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em" }}>Total Collected</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#3F5C53", marginTop: "0.2rem" }}>
            ₹{stats.totalRevenue.toLocaleString("en-IN")}
          </div>
        </div>
        <div style={{ backgroundColor: "#FFFFFF", padding: "0.95rem 1.15rem", borderRadius: "16px", border: "1px solid rgba(23, 34, 40, 0.08)", boxShadow: "0 6px 20px -4px rgba(23, 34, 40, 0.05)" }}>
          <div style={{ fontSize: "0.7rem", color: "#55636D", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em" }}>Total Orders</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#172228", marginTop: "0.2rem" }}>
            {stats.totalOrders}
          </div>
        </div>
        <div style={{ backgroundColor: "#FFFFFF", padding: "0.95rem 1.15rem", borderRadius: "16px", border: "1px solid rgba(23, 34, 40, 0.08)", boxShadow: "0 6px 20px -4px rgba(23, 34, 40, 0.05)" }}>
          <div style={{ fontSize: "0.7rem", color: "#3F5C53", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em" }}>Paid / Settled</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#3F5C53", marginTop: "0.2rem" }}>
            {stats.paidCount}
          </div>
        </div>
        <div style={{ backgroundColor: "#FFFFFF", padding: "0.95rem 1.15rem", borderRadius: "16px", border: "1px solid rgba(23, 34, 40, 0.08)", boxShadow: "0 6px 20px -4px rgba(23, 34, 40, 0.05)" }}>
          <div style={{ fontSize: "0.7rem", color: "#9A5B13", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em" }}>Initiated / Pending</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#9A5B13", marginTop: "0.2rem" }}>
            {stats.pendingCount}
          </div>
        </div>
        <div style={{ backgroundColor: "#FFFFFF", padding: "0.95rem 1.15rem", borderRadius: "16px", border: "1px solid rgba(23, 34, 40, 0.08)", boxShadow: "0 6px 20px -4px rgba(23, 34, 40, 0.05)" }}>
          <div style={{ fontSize: "0.7rem", color: "#B91C1C", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em" }}>Failed / Abandoned</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#B91C1C", marginTop: "0.2rem" }}>
            {stats.failedCount}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search txnId, invoice no, PayU mihpayid, bank ref, customer name, phone, email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input"
          style={{ flex: 1, minWidth: "240px", fontSize: "0.85rem", padding: "0.6rem 0.9rem", backgroundColor: "#FFFFFF" }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="form-input"
          style={{ fontSize: "0.85rem", padding: "0.6rem 0.85rem", width: "auto", backgroundColor: "#FFFFFF" }}
        >
          <option value="all">All Statuses</option>
          <option value="paid">Paid Only</option>
          <option value="pending_all">Initiated / Pending</option>
          <option value="created">Created (Checkout Opened)</option>
          <option value="pending">Pending Verification</option>
          <option value="failed">Failed</option>
        </select>
        <select
          value={gatewayFilter}
          onChange={(e) => setGatewayFilter(e.target.value)}
          className="form-input"
          style={{ fontSize: "0.85rem", padding: "0.6rem 0.85rem", width: "auto", backgroundColor: "#FFFFFF" }}
        >
          <option value="all">All Gateways</option>
          <option value="payu">PayU Gateway</option>
          <option value="admin_grant">Admin Grants</option>
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
              <th style={{ padding: "0.75rem 0.9rem", color: "#49585F", fontWeight: 600 }}>Txn ID & Invoice</th>
              <th style={{ padding: "0.75rem 0.9rem", color: "#49585F", fontWeight: 600 }}>Customer</th>
              <th style={{ padding: "0.75rem 0.9rem", color: "#49585F", fontWeight: 600 }}>Plan & Kind</th>
              <th style={{ padding: "0.75rem 0.9rem", color: "#49585F", fontWeight: 600 }}>Amount</th>
              <th style={{ padding: "0.75rem 0.9rem", color: "#49585F", fontWeight: 600 }}>Method / Gateway Ref</th>
              <th style={{ padding: "0.75rem 0.9rem", color: "#49585F", fontWeight: 600 }}>Status</th>
              <th style={{ padding: "0.75rem 0.9rem", color: "#49585F", fontWeight: 600 }}>Date</th>
              <th style={{ padding: "0.75rem 0.9rem", color: "#49585F", fontWeight: 600, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} style={{ padding: "2.5rem", textAlign: "center", color: "#55636D" }}>
                  Loading transactions from MongoDB...
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: "2.5rem", textAlign: "center", color: "#55636D" }}>
                  No transactions found matching filters.
                </td>
              </tr>
            ) : (
              transactions.map((t) => (
                <tr key={t.id} style={{ borderBottom: "1px solid rgba(23, 34, 40, 0.06)" }}>
                  <td style={{ padding: "0.75rem 0.9rem" }}>
                    <div style={{ fontFamily: "monospace", fontWeight: 700, color: "#172228" }}>{t.txnId}</div>
                    {t.invoiceNo && (
                      <div style={{ fontSize: "0.7rem", color: "#3F5C53", fontWeight: 600 }}>
                        Invoice: {t.invoiceNo}
                      </div>
                    )}
                  </td>

                  <td style={{ padding: "0.75rem 0.9rem" }}>
                    <div style={{ fontWeight: 600, color: "#172228" }}>
                      {t.customerName}{" "}
                      <span
                        style={{
                          fontSize: "0.66rem",
                          padding: "1px 6px",
                          borderRadius: "999px",
                          backgroundColor: t.currentAccountKind === "user" ? "rgba(95, 126, 117, 0.14)" : "rgba(198, 83, 120, 0.12)",
                          color: t.currentAccountKind === "user" ? "#3F5C53" : "#A13C5D",
                          fontWeight: 600,
                        }}
                      >
                        {t.currentAccountKind === "user" ? "Customer" : "Lead"}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#55636D" }}>
                      {t.email} {t.phone ? `• +91 ${t.phone}` : ""}
                    </div>
                  </td>

                  <td style={{ padding: "0.75rem 0.9rem" }}>
                    <div style={{ fontWeight: 600, color: "#172228" }}>{t.planName}</div>
                    <div style={{ fontSize: "0.7rem", color: "#55636D", textTransform: "capitalize" }}>
                      {t.kind.replace(/_/g, " ")}
                    </div>
                  </td>

                  <td style={{ padding: "0.75rem 0.9rem", fontWeight: 700, color: "#172228" }}>
                    ₹{t.amount.toLocaleString("en-IN")}
                    {t.discount > 0 && (
                      <div style={{ fontSize: "0.68rem", color: "#3F5C53", fontWeight: 500 }}>
                        (-₹{t.discount} discount)
                      </div>
                    )}
                  </td>

                  <td style={{ padding: "0.75rem 0.9rem", color: "#49585F" }}>
                    <div style={{ fontWeight: 500, color: "#172228" }}>{t.method}</div>
                    {t.gatewayPaymentId && (
                      <div style={{ fontSize: "0.7rem", color: "#55636D", fontFamily: "monospace" }}>
                        PayU ID: {t.gatewayPaymentId}
                      </div>
                    )}
                    {t.bankRefNum && (
                      <div style={{ fontSize: "0.68rem", color: "#55636D", fontFamily: "monospace" }}>
                        UTR/Ref: {t.bankRefNum}
                      </div>
                    )}
                  </td>

                  <td style={{ padding: "0.75rem 0.9rem" }}>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: "999px",
                        textTransform: "uppercase",
                        backgroundColor:
                          t.status === "paid"
                            ? "rgba(95, 126, 117, 0.14)"
                            : t.status === "failed" || t.status === "abandoned"
                            ? "#FEE2E2"
                            : "#FEF6E7",
                        color:
                          t.status === "paid"
                            ? "#3F5C53"
                            : t.status === "failed" || t.status === "abandoned"
                            ? "#991B1B"
                            : "#9A5B13",
                      }}
                    >
                      {t.status}
                    </span>
                    {t.failureReason && (
                      <div style={{ fontSize: "0.68rem", color: "#55636D", marginTop: "3px", maxWidth: "180px" }}>
                        {t.failureReason}
                      </div>
                    )}
                  </td>

                  <td style={{ padding: "0.75rem 0.9rem", color: "#55636D", fontSize: "0.74rem", whiteSpace: "nowrap" }}>
                    <div>{formatDateTime(t.paidAt || t.createdAt)}</div>
                  </td>

                  <td style={{ padding: "0.75rem 0.9rem", textAlign: "right", whiteSpace: "nowrap" }}>
                    <div style={{ display: "inline-flex", gap: "0.35rem" }}>
                      {t.gateway === "payu" && t.status !== "paid" && (
                        <button
                          type="button"
                          disabled={verifyingTxnId === t.txnId}
                          onClick={() => handleVerifyWithPayU(t.txnId)}
                          style={{
                            padding: "0.35rem 0.65rem",
                            fontSize: "0.74rem",
                            fontWeight: 600,
                            border: "1px solid rgba(198, 83, 120, 0.3)",
                            background: "rgba(198, 83, 120, 0.1)",
                            color: "#A13C5D",
                            borderRadius: "8px",
                            cursor: "pointer",
                          }}
                        >
                          {verifyingTxnId === t.txnId ? "Checking..." : "Verify PayU"}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setViewingTxn(t)}
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
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL: TRANSACTION & GATEWAY EVENT DETAILS */}
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
            backgroundColor: "rgba(23, 34, 40, 0.58)",
            backdropFilter: "blur(3px)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setViewingTxn(null);
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "680px",
              maxHeight: "88vh",
              backgroundColor: "#FFFFFF",
              borderRadius: "18px",
              border: "1px solid rgba(23, 34, 40, 0.1)",
              boxShadow: "0 24px 60px -12px rgba(23, 34, 40, 0.28)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "1.1rem 1.35rem", borderBottom: "1px solid rgba(23, 34, 40, 0.08)", backgroundColor: "#FAF7F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#172228", margin: 0 }}>
                  Order & Gateway Audit: {viewingTxn.txnId}
                </h2>
                <div style={{ fontSize: "0.75rem", color: "#55636D", marginTop: "2px" }}>
                  MongoDB Order ID: <code style={{ color: "#172228" }}>{viewingTxn.id}</code>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingTxn(null)}
                style={{ background: "#FFFFFF", border: "1px solid rgba(23, 34, 40, 0.14)", borderRadius: "8px", width: "32px", height: "32px", fontSize: "1rem", cursor: "pointer", color: "#49585F" }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: "1.25rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.82rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.65rem", padding: "0.95rem", backgroundColor: "#FAF7F0", borderRadius: "12px", border: "1px solid rgba(23, 34, 40, 0.08)" }}>
                <div><span style={{ color: "#55636D" }}>Customer:</span> <strong style={{ color: "#172228" }}>{viewingTxn.customerName}</strong></div>
                <div><span style={{ color: "#55636D" }}>Email:</span> <strong style={{ color: "#172228" }}>{viewingTxn.email}</strong></div>
                <div><span style={{ color: "#55636D" }}>Phone:</span> <strong style={{ color: "#172228" }}>{viewingTxn.phone ? `+91 ${viewingTxn.phone}` : "—"}</strong></div>
                <div><span style={{ color: "#55636D" }}>Account ID:</span> <code style={{ fontSize: "0.75rem", color: "#172228" }}>{viewingTxn.accountId}</code></div>
                <div><span style={{ color: "#55636D" }}>Plan:</span> <strong style={{ color: "#172228" }}>{viewingTxn.planName}</strong></div>
                <div><span style={{ color: "#55636D" }}>Order Kind:</span> <strong style={{ textTransform: "capitalize", color: "#172228" }}>{viewingTxn.kind.replace(/_/g, " ")}</strong></div>
                <div><span style={{ color: "#55636D" }}>Amount:</span> <strong style={{ color: "#3F5C53" }}>₹{viewingTxn.amount}</strong> (Base: ₹{viewingTxn.baseAmount})</div>
                <div><span style={{ color: "#55636D" }}>Status:</span> <strong style={{ textTransform: "uppercase", color: "#172228" }}>{viewingTxn.status}</strong></div>
                <div><span style={{ color: "#55636D" }}>Invoice No:</span> <strong style={{ color: "#172228" }}>{viewingTxn.invoiceNo || "—"}</strong></div>
                <div><span style={{ color: "#55636D" }}>Gateway Method:</span> <strong style={{ color: "#172228" }}>{viewingTxn.method}</strong></div>
                <div><span style={{ color: "#55636D" }}>PayU mihpayid:</span> <code style={{ color: "#172228" }}>{viewingTxn.gatewayPaymentId || "—"}</code></div>
                <div><span style={{ color: "#55636D" }}>Bank Ref / UTR:</span> <code style={{ color: "#172228" }}>{viewingTxn.bankRefNum || "—"}</code></div>
                <div><span style={{ color: "#55636D" }}>Created At:</span> <strong style={{ color: "#172228" }}>{formatDateTime(viewingTxn.createdAt)}</strong></div>
                <div><span style={{ color: "#55636D" }}>Paid At:</span> <strong style={{ color: "#172228" }}>{formatDateTime(viewingTxn.paidAt)}</strong></div>
                {viewingTxn.failureReason && (
                  <div style={{ gridColumn: "1 / -1" }}>
                    <span style={{ color: "#55636D" }}>Note / Failure Reason:</span> <strong style={{ color: "#172228" }}>{viewingTxn.failureReason}</strong>
                  </div>
                )}
              </div>

              {/* Gateway Events Log */}
              <div>
                <div style={{ fontWeight: 700, color: "#172228", marginBottom: "0.5rem" }}>
                  Gateway Event Trail ({viewingTxn.events?.length || 0} notifications)
                </div>
                {!viewingTxn.events || viewingTxn.events.length === 0 ? (
                  <div style={{ padding: "0.95rem", backgroundColor: "#FAF7F0", borderRadius: "10px", color: "#55636D", fontSize: "0.78rem", border: "1px solid rgba(23, 34, 40, 0.08)" }}>
                    No PayU callback/webhook events recorded on this order yet (user may have closed the payment tab before completing).
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {viewingTxn.events.map((ev) => (
                      <div key={ev.eventId} style={{ border: "1px solid rgba(23, 34, 40, 0.08)", borderRadius: "10px", overflow: "hidden" }}>
                        <div style={{ padding: "0.55rem 0.8rem", backgroundColor: "#FAF7F0", borderBottom: "1px solid rgba(23, 34, 40, 0.08)", display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#172228" }}>
                          <span>
                            <strong>{ev.source.toUpperCase()}</strong> • Status: <strong style={{ color: "#C65378" }}>{ev.status}</strong>
                          </span>
                          <span style={{ color: "#55636D" }}>{formatDateTime(ev.createdAt)}</span>
                        </div>
                        <pre
                          style={{
                            margin: 0,
                            padding: "0.7rem 0.85rem",
                            backgroundColor: "#172228",
                            color: "#FAF7F0",
                            fontSize: "0.72rem",
                            overflowX: "auto",
                            maxHeight: "220px",
                          }}
                        >
                          {JSON.stringify(ev.payload, null, 2)}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div style={{ padding: "0.85rem 1.35rem", borderTop: "1px solid rgba(23, 34, 40, 0.08)", backgroundColor: "#FAF7F0", display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setViewingTxn(null)}
                style={{ padding: "0.48rem 1.05rem", fontSize: "0.82rem", background: "#C65378", color: "#FFFFFF", border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}
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
