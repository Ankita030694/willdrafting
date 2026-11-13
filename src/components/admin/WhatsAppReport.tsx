"use client";

import React, { useEffect, useState } from "react";

interface ReportRow {
  id: string;
  name: string;
  phone: string;
  template: "will_not_started" | "will_left_midway";
  step: string | null;
  sentAt: string;
  status: "sending" | "sent" | "delivered" | "read" | "replied" | "failed";
  failedDetail: string | null;
  clickedAt: string | null;
  optedOut: boolean;
}

interface ReportData {
  summary: { sent: number; delivered: number; read: number; clicked: number; failed: number; people: number };
  rows: ReportRow[];
}

const INK = "#172228";
const INK_2 = "#49585F";
const INK_3 = "#7A8790";
const MARK = "#C65378";
const CARD: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  padding: "1.1rem 1.25rem",
  borderRadius: "16px",
  border: "1px solid rgba(23, 34, 40, 0.08)",
  boxShadow: "0 6px 20px -4px rgba(23, 34, 40, 0.05)",
};

const TEMPLATE_LABEL: Record<ReportRow["template"], string> = {
  will_not_started: "Not started",
  will_left_midway: "Left midway",
};

const STATUS_LABEL: Record<ReportRow["status"], string> = {
  sending: "Sending",
  sent: "Sent",
  delivered: "Delivered",
  read: "Read",
  replied: "Replied",
  failed: "Failed",
};

function when(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}

/** WhatsApp template messages sent, and who clicked through to the site afterwards. */
export default function WhatsAppReport() {
  const [data, setData] = useState<ReportData | null>(null);
  const [error, setError] = useState("");
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/whatsapp-report", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load the WhatsApp report");
        return (await res.json()) as ReportData;
      })
      .then((json) => !cancelled && setData(json))
      .catch((err: unknown) => !cancelled && setError(err instanceof Error ? err.message : "Failed to load"));
    return () => {
      cancelled = true;
    };
  }, []);

  const s = data?.summary;
  const stages = s
    ? [
        { label: "Sent", count: s.sent, hint: "WhatsApp accepted the message" },
        { label: "Delivered", count: s.delivered, hint: "Reached the phone (reported by the WATI webhook)" },
        { label: "Read", count: s.read, hint: "Opened in WhatsApp (only if read receipts are on)" },
        { label: "Clicked", count: s.clicked, hint: "Came back to the site signed in within 7 days of the message" },
      ]
    : [];
  const top = s?.sent || 0;

  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }} aria-labelledby="wa-report-title">
      <div>
        <h3 id="wa-report-title" style={{ fontSize: "1.1rem", fontWeight: 700, color: INK, margin: 0 }}>
          WhatsApp messages
        </h3>
        <p style={{ fontSize: "0.75rem", color: INK_3, margin: "0.2rem 0 0" }}>
          Who was sent a WhatsApp reminder, and who clicked through to the site.
        </p>
      </div>

      {error && <div style={{ ...CARD, color: "#991B1B", fontSize: "0.85rem" }}>{error}</div>}
      {!data && !error && <div style={{ ...CARD, fontSize: "0.85rem", color: INK_2 }}>Loading…</div>}

      {data && (
        <div style={CARD}>
          {top === 0 ? (
            <p style={{ fontSize: "0.85rem", color: INK_2, margin: 0 }}>No WhatsApp messages sent yet.</p>
          ) : (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                {stages.map((st, i) => (
                  <div
                    key={st.label}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                    title={st.hint}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "90px 1fr 120px",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.35rem",
                      borderRadius: "8px",
                      backgroundColor: hover === i ? "rgba(23, 34, 40, 0.035)" : "transparent",
                    }}
                  >
                    <span style={{ fontSize: "0.82rem", fontWeight: 600, color: INK }}>{st.label}</span>
                    <div style={{ height: "20px", backgroundColor: "rgba(23, 34, 40, 0.05)", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ width: `${(st.count / top) * 100}%`, height: "100%", backgroundColor: MARK, borderRadius: "0 4px 4px 0" }} />
                    </div>
                    <span style={{ fontSize: "0.8rem", color: INK_2, textAlign: "right" }}>
                      <strong style={{ color: INK, fontSize: "0.9rem" }}>{st.count}</strong> · {Math.round((st.count / top) * 100)}%
                    </span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "0.72rem", color: INK_3, margin: "0.6rem 0 0" }}>
                {hover !== null ? stages[hover].hint : "Hover a bar for what it counts."}
                {s && s.failed > 0 ? ` · ${s.failed} failed` : ""}
              </p>

              <div style={{ overflowX: "auto", marginTop: "0.9rem" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem", minWidth: "640px" }}>
                  <thead>
                    <tr style={{ color: INK_3, textAlign: "left" }}>
                      <th style={{ fontWeight: 600, padding: "0.35rem 0.5rem 0.35rem 0" }}>Name</th>
                      <th style={{ fontWeight: 600 }}>Phone</th>
                      <th style={{ fontWeight: 600 }}>Message</th>
                      <th style={{ fontWeight: 600 }}>Sent</th>
                      <th style={{ fontWeight: 600 }}>Status</th>
                      <th style={{ fontWeight: 600 }}>Clicked</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.rows.map((r) => (
                      <tr key={r.id} style={{ borderTop: "1px solid rgba(23, 34, 40, 0.06)", color: INK }}>
                        <td style={{ padding: "0.45rem 0.5rem 0.45rem 0", fontWeight: 600 }}>{r.name}</td>
                        <td style={{ color: INK_2 }}>{r.phone}</td>
                        <td>
                          {TEMPLATE_LABEL[r.template]}
                          {r.step && <span style={{ color: INK_3 }}> · {r.step}</span>}
                        </td>
                        <td style={{ color: INK_2, whiteSpace: "nowrap" }}>{when(r.sentAt)}</td>
                        <td title={r.failedDetail ?? undefined} style={{ color: r.status === "failed" ? "#991B1B" : INK_2 }}>
                          {STATUS_LABEL[r.status]}
                          {r.optedOut && <span style={{ color: INK_3 }}> · opted out</span>}
                        </td>
                        <td style={{ whiteSpace: "nowrap", fontWeight: r.clickedAt ? 600 : 400, color: r.clickedAt ? "#3F5C53" : INK_3 }}>
                          {r.clickedAt ? `Yes · ${when(r.clickedAt)}` : "No"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}
