"use client";

import React from "react";
import IntakeForm from "@/components/IntakeForm";

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "calc(100vh - 4.75rem)",
        display: "flex",
        alignItems: "center",
        paddingTop: "3rem",
        paddingBottom: "4rem",
        borderBottom: "1px solid var(--border-subtle)",
        backgroundColor: "var(--bg-page)",
      }}
      className="hero-section"
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 0.95fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left Column: Heading & Value Proposition */}
          <div>
            <h1
              style={{
                fontSize: "clamp(1.55rem, 4.5vw, 3.4rem)",
                color: "var(--color-navy)",
                lineHeight: 1.2,
                marginBottom: "1.2rem",
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}
            >
              Leave a legacy of love, not legal disputes.
            </h1>

            <p
              style={{
                fontSize: "clamp(0.92rem, 2.5vw, 1.08rem)",
                lineHeight: 1.6,
                color: "var(--color-charcoal)",
                marginBottom: "1.75rem",
                maxWidth: "540px",
              }}
            >
              Without a will, state intestacy laws dictate what happens to your hard-earned assets.
              Complete a guided 15-minute questionnaire, designate your executors, and generate a
              court-ready legal will ready for witness signatures.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.85rem",
                marginBottom: "2rem",
              }}
              className="hero-ctas"
            >
              <a
                href="#start-form"
                className="btn btn-gold"
                style={{
                  padding: "0.85rem 1.75rem",
                  fontSize: "0.96rem",
                  fontWeight: 700,
                }}
                onClick={(e) => {
                  const el = document.getElementById("start-form");
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: "smooth" });
                    const input = el.querySelector("input");
                    if (input) input.focus();
                  }
                }}
              >
                <span>Start My Will Now</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>

              <a
                href="#how-it-works"
                className="btn btn-outline-slate"
                style={{
                  padding: "0.85rem 1.5rem",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                }}
              >
                <span>See How It Works</span>
              </a>
            </div>

            {/* Trust highlights */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))",
                gap: "0.85rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ color: "var(--color-sage)", fontWeight: 800, fontSize: "1rem" }}>✓</span>
                <span style={{ fontSize: "0.84rem", color: "var(--color-slate)", fontWeight: 600 }}>
                  Plain paper valid (No stamp duty)
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ color: "var(--color-sage)", fontWeight: 800, fontSize: "1rem" }}>✓</span>
                <span style={{ fontSize: "0.84rem", color: "var(--color-slate)", fontWeight: 600 }}>
                  Two-witness attestation guide
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ color: "var(--color-sage)", fontWeight: 800, fontSize: "1rem" }}>✓</span>
                <span style={{ fontSize: "0.84rem", color: "var(--color-slate)", fontWeight: 600 }}>
                  256-bit private encrypted
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Intake Form Card (Replaces /start redirect) */}
          <div id="start-form" style={{ position: "relative" }}>
            <div
              className="editorial-card hero-intake-card"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "var(--radius-xl)",
                padding: "2rem 2.25rem",
                boxShadow: "var(--shadow-lg)",
                border: "1px solid var(--border-card)",
              }}
            >
              <div style={{ marginBottom: "1.25rem" }}>
                <h2
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    color: "var(--color-navy)",
                    margin: 0,
                  }}
                >
                  Start Your Will
                </h2>
              </div>

              <IntakeForm />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          :global(.hero-grid) {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .hero-section {
            padding-top: 2rem !important;
            padding-bottom: 2.5rem !important;
            min-height: auto !important;
          }
          :global(.hero-intake-card) {
            padding: 1.5rem 1.15rem !important;
            border-radius: var(--radius-lg) !important;
          }
        }
        @media (max-width: 640px) {
          .hero-section {
            padding-top: 1.5rem !important;
            padding-bottom: 2rem !important;
          }
          :global(.hero-ctas) {
            flex-direction: column !important;
            width: 100% !important;
          }
          :global(.hero-ctas .btn) {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
