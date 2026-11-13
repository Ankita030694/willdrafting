"use client";

import React, { useCallback, useEffect, useState } from "react";

interface FunnelStage {
  key: string;
  label: string;
  hint: string;
  count: number;
  pctOfTop: number;
  pctOfPrevious: number;
}

interface BreakdownRow {
  name: string;
  leads: number;
  started: number;
  paid: number;
}

interface FunnelData {
  window: { days: number | "all"; since: string; includeInternal: boolean };
  funnel: FunnelStage[];
  stoppedAt: Array<{ step: string; count: number }>;
  untrackedStops: number;
  bySource: BreakdownRow[];
  byPage: BreakdownRow[];
  daily: Array<{ day: string; leads: number }>;
  whatsapp: {
    consented: number;
    consentBase: number;
    sent: number;
    delivered: number;
    read: number;
    replied: number;
    failed: number;
    cameBack: number;
    paidAfter: number;
    byTemplate: Array<{ template: string; sent: number; read: number }>;
  };
}

const INK = "#172228";
const INK_2 = "#49585F";
const INK_3 = "#7A8790";
const MARK = "#C65378";
const MARK_2 = "#5F7E75";
const TRACK = "rgba(23, 34, 40, 0.05)";
const CARD: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  padding: "1.1rem 1.25rem",
  borderRadius: "16px",
  border: "1px solid rgba(23, 34, 40, 0.08)",
  boxShadow: "0 6px 20px -4px rgba(23, 34, 40, 0.05)",
};
const SECTION_TITLE: React.CSSProperties = { fontSize: "0.92rem", fontWeight: 700, color: INK, margin: 0 };
const NOTE: React.CSSProperties = { fontSize: "0.75rem", color: INK_3, margin: "0.2rem 0 0" };

const RANGES: Array<{ value: string; label: string }> = [
  { value: "7", label: "7 days" },
  { value: "30", label: "30 days" },
  { value: "90", label: "90 days" },
  { value: "all", label: "All time" },
];

const SOURCE_LABELS: Record<string, string> = {
  intake_popup: "Website popup",
  google: "Google sign-in",
  login_signup: "Email sign-up",
  contact_form: "Contact form",
  calculator_cta: "Calculator CTA",
  blog_inline_cta: "Blog CTA",
  template_download: "Template download",
  wizard_signup: "Will form sign-up",
  admin: "Added by admin",
  direct: "Direct",
};

const pct = (n: number, d: number) => (d ? `${Math.round((n / d) * 100)}%` : "–");

function formatDay(day: string): string {
  return new Date(`${day}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: "UTC" });
}

export default function ConversionFunnel({ endpoint = "/api/admin/funnel" }: { endpoint?: string }) {
  const [range, setRange] = useState("30");
  const [includeInternal, setIncludeInternal] = useState(false);
  const [data, setData] = useState<FunnelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hoverStage, setHoverStage] = useState<number | null>(null);
  const [hoverDay, setHoverDay] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ days: range });
      if (includeInternal) params.set("internal", "1");
      const res = await fetch(`${endpoint}?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load the funnel");
      setData(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load the funnel");
    } finally {
      setLoading(false);
    }
  }, [endpoint, range, includeInternal]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void load();
    }, 0);
    return () => clearTimeout(timer);
  }, [load]);

  const top = data?.funnel[0]?.count ?? 0;
  const biggestDrop = data?.funnel
    .slice(1)
    .map((s, i) => ({ from: data.funnel[i], to: s }))
    .filter((d) => d.from.count > 0)
    .sort((a, b) => a.to.count / a.from.count - b.to.count / b.from.count)[0];
  const maxDaily = Math.max(1, ...(data?.daily.map((d) => d.leads) ?? [1]));
  const maxStop = Math.max(1, ...(data?.stoppedAt.map((s) => s.count) ?? [1]));
  const wa = data?.whatsapp;

  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }} aria-labelledby="conversion-funnel-title">
      {/* Controls: one row above every chart */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <h3 id="conversion-funnel-title" style={{ fontSize: "1.1rem", fontWeight: 700, color: INK, margin: 0 }}>
            Conversion funnel
          </h3>
          <p style={NOTE}>People who signed up in the selected period, and how far each one got.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
          <div role="group" aria-label="Date range" style={{ display: "flex", background: "#FFFFFF", border: "1px solid rgba(23, 34, 40, 0.12)", borderRadius: "999px", padding: "3px" }}>
            {RANGES.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRange(r.value)}
                aria-pressed={range === r.value}
                style={{
                  padding: "0.35rem 0.8rem",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  borderRadius: "999px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: range === r.value ? INK : "transparent",
                  color: range === r.value ? "#FFFFFF" : INK_2,
                }}
              >
                {r.label}
              </button>
            ))}
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.78rem", color: INK_2, cursor: "pointer" }}>
            <input type="checkbox" checked={includeInternal} onChange={(e) => setIncludeInternal(e.target.checked)} />
            Include team &amp; test accounts
          </label>
        </div>
      </div>

      {error && <div style={{ ...CARD, color: "#991B1B", fontSize: "0.85rem" }}>{error}</div>}

      {data && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "0.85rem", opacity: loading ? 0.55 : 1, transition: "opacity 0.15s" }}>
          {/* Funnel */}
          <div style={{ ...CARD, gridColumn: "1 / -1" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.9rem" }}>
              <h4 style={SECTION_TITLE}>From lead to paid customer</h4>
              {biggestDrop && top > 0 && (
                <span style={{ fontSize: "0.78rem", color: INK_2 }}>
                  Biggest drop: <strong style={{ color: INK }}>{biggestDrop.from.label}</strong> → <strong style={{ color: INK }}>{biggestDrop.to.label}</strong>{" "}
                  (only {pct(biggestDrop.to.count, biggestDrop.from.count)} continue)
                </span>
              )}
            </div>
            {top === 0 ? (
              <p style={{ fontSize: "0.85rem", color: INK_2, margin: 0 }}>No sign-ups in this period.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                {data.funnel.map((s, i) => (
                  <div
                    key={s.key}
                    onMouseEnter={() => setHoverStage(i)}
                    onMouseLeave={() => setHoverStage(null)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(130px, 190px) 1fr 210px",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.4rem 0.35rem",
                      borderRadius: "8px",
                      backgroundColor: hoverStage === i ? "rgba(23, 34, 40, 0.035)" : "transparent",
                      position: "relative",
                    }}
                  >
                    <div style={{ fontSize: "0.82rem", fontWeight: 600, color: INK }}>{s.label}</div>
                    <div style={{ height: "22px", backgroundColor: TRACK, borderRadius: "4px", overflow: "hidden" }}>
                      <div
                        style={{
                          width: `${Math.max(s.count ? 0.8 : 0, (s.count / top) * 100)}%`,
                          height: "100%",
                          backgroundColor: MARK,
                          borderRadius: "0 4px 4px 0",
                        }}
                      />
                    </div>
                    <div style={{ fontSize: "0.8rem", color: INK_2, whiteSpace: "nowrap", textAlign: "right" }}>
                      <strong style={{ color: INK, fontSize: "0.9rem" }}>{s.count}</strong>
                      <span style={{ marginLeft: "0.45rem" }}>{s.pctOfTop}%</span>
                      {i > 0 && <span style={{ marginLeft: "0.45rem", color: INK_3 }}>({s.pctOfPrevious}% of previous)</span>}
                    </div>
                    {hoverStage === i && (
                      <div
                        role="tooltip"
                        style={{
                          position: "absolute",
                          left: "min(210px, 40%)",
                          top: "100%",
                          zIndex: 5,
                          backgroundColor: INK,
                          color: "#FFFFFF",
                          fontSize: "0.75rem",
                          padding: "0.45rem 0.6rem",
                          borderRadius: "8px",
                          boxShadow: "0 6px 18px rgba(23, 34, 40, 0.2)",
                          pointerEvents: "none",
                          maxWidth: "320px",
                        }}
                      >
                        <div style={{ fontWeight: 700 }}>{s.label}</div>
                        <div style={{ opacity: 0.85 }}>{s.hint}</div>
                        <div style={{ marginTop: "0.2rem" }}>
                          {s.count} of {top} leads{i > 0 ? ` · lost ${data.funnel[i - 1].count - s.count} at this step` : ""}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Where people stop */}
          <div style={CARD}>
            <h4 style={SECTION_TITLE}>Where unpaid people stopped</h4>
            <p style={NOTE}>Last step each unpaid lead had open in the will form.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginTop: "0.75rem" }}>
              {data.stoppedAt.length === 0 && <p style={{ fontSize: "0.82rem", color: INK_2, margin: 0 }}>No tracked steps yet.</p>}
              {data.stoppedAt.map((s) => (
                <div key={s.step} title={`${s.count} stopped at ${s.step}`} style={{ display: "grid", gridTemplateColumns: "130px 1fr 32px", alignItems: "center", gap: "0.6rem", padding: "0.25rem 0" }}>
                  <span style={{ fontSize: "0.8rem", color: INK }}>{s.step}</span>
                  <div style={{ height: "16px", backgroundColor: TRACK, borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ width: `${(s.count / maxStop) * 100}%`, height: "100%", backgroundColor: MARK_2, borderRadius: "0 4px 4px 0" }} />
                  </div>
                  <strong style={{ fontSize: "0.82rem", color: INK, textAlign: "right" }}>{s.count}</strong>
                </div>
              ))}
            </div>
            {data.untrackedStops > 0 && (
              <p style={{ ...NOTE, marginTop: "0.6rem" }}>
                + {data.untrackedStops} who opened the form before step tracking started (5 Nov).
              </p>
            )}
          </div>

          {/* Daily leads */}
          <div style={CARD}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h4 style={SECTION_TITLE}>New leads per day</h4>
              <span style={{ fontSize: "0.75rem", color: INK_3 }}>
                {hoverDay !== null && data.daily[hoverDay]
                  ? `${formatDay(data.daily[hoverDay].day)}: ${data.daily[hoverDay].leads} lead${data.daily[hoverDay].leads === 1 ? "" : "s"}`
                  : `max ${maxDaily}/day`}
              </span>
            </div>
            <div
              style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "120px", marginTop: "0.9rem", borderBottom: "1px solid rgba(23, 34, 40, 0.12)" }}
              onMouseLeave={() => setHoverDay(null)}
            >
              {data.daily.map((d, i) => (
                <div
                  key={d.day}
                  onMouseEnter={() => setHoverDay(i)}
                  title={`${formatDay(d.day)}: ${d.leads}`}
                  style={{ flex: 1, height: "100%", display: "flex", alignItems: "flex-end", cursor: "default" }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: d.leads ? `${(d.leads / maxDaily) * 100}%` : "2px",
                      backgroundColor: d.leads ? MARK : "rgba(23, 34, 40, 0.12)",
                      borderRadius: d.leads ? "4px 4px 0 0" : 0,
                      opacity: hoverDay === null || hoverDay === i ? 1 : 0.45,
                    }}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: INK_3, marginTop: "0.3rem" }}>
              <span>{data.daily[0] ? formatDay(data.daily[0].day) : ""}</span>
              <span>{data.daily.length ? formatDay(data.daily[data.daily.length - 1].day) : ""}</span>
            </div>
          </div>

          {/* Sources and pages */}
          {[
            { title: "By source", note: "Where each lead came in.", rows: data.bySource, label: (n: string) => SOURCE_LABELS[n] ?? n },
            { title: "Top landing pages", note: "Page the popup or form was filled on (new leads only).", rows: data.byPage, label: (n: string) => n },
          ].map((table) => (
            <div key={table.title} style={CARD}>
              <h4 style={SECTION_TITLE}>{table.title}</h4>
              <p style={NOTE}>{table.note}</p>
              {table.rows.length === 0 ? (
                <p style={{ fontSize: "0.82rem", color: INK_2, margin: "0.6rem 0 0" }}>No data yet.</p>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem", marginTop: "0.6rem" }}>
                  <thead>
                    <tr style={{ color: INK_3, textAlign: "right" }}>
                      <th style={{ textAlign: "left", fontWeight: 600, padding: "0.3rem 0" }}>{table.title === "By source" ? "Source" : "Page"}</th>
                      <th style={{ fontWeight: 600 }}>Leads</th>
                      <th style={{ fontWeight: 600 }}>Started</th>
                      <th style={{ fontWeight: 600 }}>Paid</th>
                      <th style={{ fontWeight: 600 }}>Paid %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((r) => (
                      <tr key={r.name} style={{ borderTop: "1px solid rgba(23, 34, 40, 0.06)", textAlign: "right", color: INK }}>
                        <td style={{ textAlign: "left", padding: "0.35rem 0.5rem 0.35rem 0", maxWidth: "220px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={r.name}>
                          {table.label(r.name)}
                        </td>
                        <td>{r.leads}</td>
                        <td>{r.started}</td>
                        <td>{r.paid}</td>
                        <td style={{ color: INK_2 }}>{pct(r.paid, r.leads)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}

          {/* WhatsApp */}
          {wa && (
            <div style={{ ...CARD, gridColumn: "1 / -1" }}>
              <h4 style={SECTION_TITLE}>WhatsApp reminders</h4>
              <p style={NOTE}>Messages sent in this period, and what people did within 3 days (came back) or 14 days (paid).</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(105px, 1fr))", gap: "0.6rem", marginTop: "0.75rem" }}>
                {[
                  { label: "Gave consent", value: `${wa.consented}`, sub: `${pct(wa.consented, wa.consentBase)} of sign-ups` },
                  { label: "Sent", value: `${wa.sent}`, sub: wa.byTemplate.map((t) => `${t.template === "will_left_midway" ? "Midway" : "Not started"}: ${t.sent}`).join(" · ") },
                  { label: "Delivered", value: `${wa.delivered}`, sub: pct(wa.delivered, wa.sent) },
                  { label: "Read", value: `${wa.read}`, sub: pct(wa.read, wa.sent) },
                  { label: "Replied", value: `${wa.replied}`, sub: pct(wa.replied, wa.sent) },
                  { label: "Came back", value: `${wa.cameBack}`, sub: `${pct(wa.cameBack, wa.sent)} within 3 days` },
                  { label: "Paid after", value: `${wa.paidAfter}`, sub: `${pct(wa.paidAfter, wa.sent)} within 14 days` },
                  { label: "Failed", value: `${wa.failed}`, sub: "Not on WhatsApp, limits, errors" },
                ].map((tile) => (
                  <div key={tile.label} style={{ border: "1px solid rgba(23, 34, 40, 0.07)", borderRadius: "12px", padding: "0.6rem 0.75rem" }}>
                    <div style={{ fontSize: "0.68rem", color: INK_2, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em" }}>{tile.label}</div>
                    <div style={{ fontSize: "1.25rem", fontWeight: 700, color: INK, marginTop: "0.15rem" }}>{tile.value}</div>
                    <div style={{ fontSize: "0.7rem", color: INK_3, marginTop: "0.1rem" }}>{tile.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!data && loading && <div style={{ ...CARD, fontSize: "0.85rem", color: INK_2 }}>Loading funnel…</div>}
    </section>
  );
}
