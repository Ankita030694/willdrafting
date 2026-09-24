"use client";

import React, { useState } from "react";
import Link from "next/link";

const steps = [
  {
    step: "01",
    title: "Basic Family Details",
    duration: "3 minutes",
    description:
      "Enter your basic personal details, marital status, and immediate family members. We identify your legal heirs under personal succession law.",
    sampleQuestion: "What is your marital status and how many children or dependents do you have?",
  },
  {
    step: "02",
    title: "Secure Member Registration",
    duration: "Instant access",
    description:
      "Create your secure account. A nominal, affordable registration fee unlocks your private dashboard with 256-bit encryption.",
    sampleQuestion: "Verify your email and mobile number for secure document vault access.",
  },
  {
    step: "03",
    title: "Asset Allocation & Executors",
    duration: "8 minutes",
    description:
      "List your real estate properties, bank accounts, investments, and jewelry. Nominate primary and alternate executors and minor guardians.",
    sampleQuestion: "Whom do you wish to appoint as the primary executor to administer your estate?",
  },
  {
    step: "04",
    title: "Download, Sign & Attest",
    duration: "Instant generation",
    description:
      "Download your court-compliant will in PDF format. Print on standard plain paper and sign in the presence of two witnesses.",
    sampleQuestion: "Follow our clear 2-witness signing checklist to ensure absolute statutory validity.",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="section" style={{ backgroundColor: "var(--bg-page)" }}>
      <div className="container">
        {/* Section Header */}
        <div className="how-header-wrap" style={{ maxWidth: "680px", margin: "0 auto 3rem auto", textAlign: "center" }}>
          <h2
            style={{
              fontSize: "clamp(1.55rem, 4.5vw, 2.5rem)",
              color: "var(--color-navy)",
              marginBottom: "0.85rem",
              fontWeight: 700,
              lineHeight: 1.25,
            }}
          >
            How WillDrafting Works
          </h2>
          <p style={{ fontSize: "clamp(0.92rem, 2.5vw, 1.05rem)", color: "var(--color-charcoal)", lineHeight: 1.65, margin: 0 }}>
            You don&apos;t need to know legal terminology. Our platform asks simple, plain-English questions
            and translates your answers into a legally enforceable testament.
          </p>
        </div>

        {/* 4 Step Timeline */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
          className="steps-grid"
        >
          {steps.map((item, idx) => {
            const isSelected = activeStep === idx;
            return (
              <div
                key={idx}
                className="step-card"
                onClick={() => setActiveStep(idx)}
                style={{
                  cursor: "pointer",
                  padding: "1.5rem",
                  backgroundColor: isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
                  border: isSelected ? "1.5px solid var(--color-navy)" : "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: isSelected ? "var(--shadow-editorial)" : "none",
                  transition: "var(--transition)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.4rem",
                        fontWeight: 700,
                        color: isSelected ? "var(--color-navy)" : "var(--color-slate)",
                      }}
                    >
                      {item.step}
                    </span>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--color-slate)",
                        fontWeight: 500,
                      }}
                    >
                      {item.duration}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "1.05rem",
                      color: isSelected ? "var(--color-navy)" : "var(--color-slate)",
                      marginBottom: "0.5rem",
                      lineHeight: 1.35,
                      fontWeight: 600,
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: 1.55,
                      color: "var(--color-charcoal)",
                      marginBottom: 0,
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: "1.25rem",
                    paddingTop: "0.75rem",
                    borderTop: "1px solid var(--border-subtle)",
                    fontSize: "0.75rem",
                    color: isSelected ? "var(--color-navy)" : "var(--text-muted)",
                    fontWeight: 600,
                  }}
                >
                  {isSelected ? "● Currently Viewing" : "Click to inspect details"}
                </div>
              </div>
            );
          })}
        </div>

        {/* Step Detail Spotlight */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid var(--border-card)",
            borderRadius: "var(--radius-lg)",
            padding: "2rem 2.5rem",
            boxShadow: "var(--shadow-editorial)",
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "2.5rem",
            alignItems: "center",
          }}
          className="spotlight-grid"
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-navy)" }}>
                Phase {steps[activeStep].step}
              </span>
              <span style={{ color: "var(--border-subtle)" }}>•</span>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{steps[activeStep].duration}</span>
            </div>
            <h3 style={{ fontSize: "clamp(1.2rem, 3vw, 1.5rem)", color: "var(--color-navy)", marginBottom: "0.75rem" }}>
              {steps[activeStep].title}
            </h3>
            <p style={{ fontSize: "0.95rem", color: "var(--color-charcoal)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              {steps[activeStep].description}
            </p>
            <div
              style={{
                backgroundColor: "var(--bg-page)",
                padding: "1rem 1.25rem",
                borderRadius: "var(--radius-md)",
                borderLeft: "3px solid var(--color-slate)",
                fontSize: "0.875rem",
                color: "var(--color-slate)",
              }}
            >
              <span style={{ fontWeight: 600, display: "block", marginBottom: "0.2rem" }}>
                Typical guided prompt:
              </span>
              &ldquo;{steps[activeStep].sampleQuestion}&rdquo;
            </div>
          </div>

          <div
            style={{
              backgroundColor: "var(--bg-card-subtle)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-md)",
              padding: "1.75rem",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-navy)", marginBottom: "0.5rem" }}>
              Ready to begin Step 01?
            </div>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
              No legal documents required upfront. Start with your basic family information.
            </p>
            <Link href="/start" className="btn btn-gold" style={{ width: "100%", padding: "0.75rem" }}>
              <span>Start Questionnaire</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          :global(.steps-grid) {
            grid-template-columns: 1fr 1fr !important;
            gap: 1rem !important;
            margin-bottom: 2rem !important;
          }
          :global(.spotlight-grid) {
            grid-template-columns: 1fr !important;
            padding: 1.5rem 1.15rem !important;
            gap: 1.5rem !important;
          }
          .how-header-wrap {
            margin-bottom: 2rem !important;
          }
        }
        @media (max-width: 600px) {
          :global(.steps-grid) {
            grid-template-columns: 1fr !important;
          }
          :global(.step-card) {
            padding: 1.15rem 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
