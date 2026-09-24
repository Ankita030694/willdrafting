"use client";

import React from "react";
import Link from "next/link";

const comparisonRows = [
  {
    topic: "Asset Distribution",
    withoutWill: "Divided strictly per statutory formulas under Hindu Succession Act / Indian Succession Act, regardless of your personal wishes.",
    withWill: "Distributed exactly according to your specified percentages to named beneficiaries, spouses, and children.",
  },
  {
    topic: "Access to Bank Accounts & Shares",
    withoutWill: "Financial institutions freeze funds until heirs obtain an expensive Succession Certificate or Letter of Administration from court.",
    withWill: "Your appointed Executor claims assets directly with the certified copy of your legally attested will.",
  },
  {
    topic: "Guardianship for Minor Children",
    withoutWill: "A family court judge decides who raises your minor children after evaluating competing claims from relatives.",
    withWill: "You designate the exact trusted legal guardians you want caring for your children.",
  },
  {
    topic: "Settlement Timeline & Legal Costs",
    withoutWill: "Typically takes 12 to 24 months in court proceedings, costing tens of thousands in legal representation.",
    withWill: "Drafted in 15 minutes, immediately legally binding upon signing before two independent witnesses.",
  },
];

export default function EstateComparison() {
  return (
    <section className="section" style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid var(--border-subtle)" }}>
      <div className="container">
        {/* Section Header */}
        <div className="comparison-header-wrap" style={{ maxWidth: "680px", margin: "0 auto 3rem auto", textAlign: "center" }}>
          <h2
            style={{
              fontSize: "clamp(1.55rem, 4.5vw, 2.5rem)",
              color: "var(--color-navy)",
              marginBottom: "0.85rem",
              fontWeight: 700,
              lineHeight: 1.25,
            }}
          >
            What happens if you don&apos;t have a will?
          </h2>
          <p style={{ fontSize: "clamp(0.92rem, 2.5vw, 1.05rem)", color: "var(--color-charcoal)", lineHeight: 1.65, margin: 0 }}>
            In India, dying without a will is called dying intestate. The state decides how your estate is distributed,
            frequently leading to prolonged court disputes among family members.
          </p>
        </div>

        {/* Comparison Table / Grid */}
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            boxShadow: "var(--shadow-editorial)",
          }}
        >
          {/* Table Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr 1fr",
              backgroundColor: "var(--bg-card-subtle)",
              borderBottom: "1px solid var(--border-subtle)",
              padding: "1.25rem 1.75rem",
              fontWeight: 600,
              fontSize: "0.9rem",
            }}
            className="comparison-header"
          >
            <div style={{ color: "var(--color-slate)" }}>Estate Scenario</div>
            <div style={{ color: "#991B1B" }}>Dying Without a Will</div>
            <div style={{ color: "var(--color-navy)" }}>With WillDrafting</div>
          </div>

          {/* Comparison Rows */}
          {comparisonRows.map((row, idx) => (
            <div
              key={idx}
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr 1fr",
                padding: "1.5rem 1.75rem",
                borderBottom: idx === comparisonRows.length - 1 ? "none" : "1px solid var(--border-subtle)",
                backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "var(--bg-page)",
                gap: "1rem",
                alignItems: "flex-start",
              }}
              className="comparison-row"
            >
              <div>
                <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-navy)" }}>
                  {row.topic}
                </span>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                  <span style={{ color: "#DC2626", fontWeight: 700, fontSize: "0.9rem", marginTop: "1px" }}>✕</span>
                  <span style={{ fontSize: "0.875rem", color: "var(--color-charcoal)", lineHeight: 1.55 }}>
                    {row.withoutWill}
                  </span>
                </div>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                  <span style={{ color: "var(--color-sage)", fontWeight: 700, fontSize: "0.9rem", marginTop: "1px" }}>✓</span>
                  <span style={{ fontSize: "0.875rem", color: "var(--color-charcoal)", lineHeight: 1.55 }}>
                    {row.withWill}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bar below comparison */}
        <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
          <Link href="/start" className="btn btn-gold" style={{ padding: "0.85rem 1.85rem", fontWeight: 700 }}>
            <span>Protect Your Family Today</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .comparison-header-wrap {
            margin-bottom: 2rem !important;
          }
          :global(.comparison-header) {
            display: none !important;
          }
          :global(.comparison-row) {
            grid-template-columns: 1fr !important;
            padding: 1.15rem 1rem !important;
            gap: 0.75rem !important;
          }
        }
      `}</style>
    </section>
  );
}
