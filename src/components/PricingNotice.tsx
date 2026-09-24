"use client";

import React from "react";
import Link from "next/link";

const deliverables = [
  "Guided step-by-step estate questionnaire",
  "Statutory compliance under Indian Succession Act, 1925",
  "Executor & Alternate Executor nomination clauses",
  "Guardianship provisions for minor children",
  "Multi-asset schedule (Real Estate, Demat, Bank Accounts, Jewelry)",
  "Instant court-ready PDF document generation",
  "Clear dual-witness signing and attestation instructions",
  "256-bit encrypted secure digital vault",
  "Lifetime free edits whenever your assets or family changes",
];

export default function PricingNotice() {
  return (
    <section id="registration" className="section" style={{ backgroundColor: "#FAF7F0", borderBottom: "1px solid var(--border-subtle)" }}>
      <div className="container">
        {/* Section Header */}
        <div className="pricing-header-wrap" style={{ maxWidth: "680px", margin: "0 auto 3rem auto", textAlign: "center" }}>
          <h2
            style={{
              fontSize: "clamp(1.55rem, 4.5vw, 2.5rem)",
              color: "var(--color-navy)",
              marginBottom: "0.85rem",
              fontWeight: 700,
              lineHeight: 1.25,
            }}
          >
            Accessible estate planning for every family.
          </h2>
          <p style={{ fontSize: "clamp(0.92rem, 2.5vw, 1.05rem)", color: "var(--color-charcoal)", lineHeight: 1.65, margin: 0 }}>
            Traditional law firms charge between ₹15,000 and ₹40,000 for drafting a standard personal will.
            WillDrafting gives you the same legal certainty for a nominal, transparent fee.
          </p>
        </div>

        {/* Pricing & Deliverables Card */}
        <div
          className="editorial-card pricing-split"
          style={{
            maxWidth: "920px",
            margin: "0 auto",
            backgroundColor: "#FFFFFF",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
          }}
        >
          {/* Left Column: What's Included */}
          <div className="pricing-split-left" style={{ padding: "2.75rem" }}>
            <h3 style={{ fontSize: "clamp(1.2rem, 3.5vw, 1.45rem)", color: "var(--color-navy)", marginTop: "0.25rem", marginBottom: "0.75rem" }}>
              Everything needed to generate a valid will
            </h3>
            <p style={{ fontSize: "0.92rem", color: "var(--color-charcoal)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              Your member account gives you access to the complete guided legal drafting engine, secure cloud storage,
              and lifetime amendments.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.75rem" }}>
              {deliverables.map((item, index) => (
                <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                  <span style={{ color: "var(--color-sage)", fontWeight: 700, fontSize: "0.85rem", marginTop: "2px" }}>✓</span>
                  <span style={{ fontSize: "0.88rem", color: "var(--color-charcoal)", lineHeight: 1.45 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Fee Notice */}
          <div
            className="pricing-split-right"
            style={{
              backgroundColor: "var(--bg-card-subtle)",
              padding: "2.75rem 2.25rem",
              borderLeft: "1px solid var(--border-subtle)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>

              <div
                style={{
                  fontSize: "clamp(1.25rem, 3.5vw, 1.5rem)",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  color: "var(--color-navy)",
                  marginBottom: "0.25rem",
                }}
              >
                ₹1,499 Flat One-Time Fee
              </div>

              <div style={{ fontSize: "0.8rem", color: "#166534", fontWeight: 600, marginBottom: "0.75rem" }}>
                ✓ No hidden charges · Lifetime revisions
              </div>

              <p style={{ fontSize: "0.875rem", color: "var(--color-slate)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                Start answering your estate questionnaire today completely free. You only pay when your preview is ready and you wish to download your court-ready Will.
              </p>

              <div style={{ marginBottom: "1.5rem" }}>
                <Link
                  href="/pricing"
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--color-gold)",
                    fontWeight: 600,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                  }}
                >
                  <span>View full pricing & legal fee breakdown →</span>
                </Link>
              </div>

              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.8rem",
                  color: "var(--color-charcoal)",
                  marginBottom: "1.75rem",
                }}
              >
                <strong style={{ color: "var(--color-navy)", display: "block", marginBottom: "0.25rem" }}>
                  Free Questionnaire Access
                </strong>
                Answer all personal, family, and asset distribution questions without paying or entering card details.
              </div>
            </div>

            <div>
              <Link
                href="/start"
                className="btn btn-gold"
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  fontSize: "0.95rem",
                }}
              >
                <span>Start Questionnaire Free</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <div style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.75rem" }}>
                Takes approximately 15 minutes to complete
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 820px) {
          :global(.pricing-split) {
            grid-template-columns: 1fr !important;
          }
          :global(.pricing-split-left) {
            padding: 1.5rem 1.15rem !important;
          }
          :global(.pricing-split-right) {
            padding: 1.5rem 1.15rem !important;
            border-left: none !important;
            border-top: 1px solid var(--border-subtle) !important;
          }
          .pricing-header-wrap {
            margin-bottom: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
