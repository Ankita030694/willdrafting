"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const pillars = [
  {
    code: "Section 63",
    title: "Written on Plain Paper (No Stamp Duty)",
    statute: "Indian Succession Act, 1925",
    description:
      "Under Indian law, a will does NOT require non-judicial stamp paper or stamp duty. It can be legally printed on standard A4 plain white paper and signed with permanent ink.",
  },
  {
    code: "Section 63(c)",
    title: "Dual Independent Witnesses",
    statute: "Mandatory Attestation Rule",
    description:
      "The testator must sign in the concurrent physical presence of two independent adult witnesses who attest the signature. Beneficiaries must not act as witnesses.",
  },
  {
    code: "Section 18",
    title: "Registration is Voluntary",
    statute: "Registration Act, 1908",
    description:
      "Registering your will at the Sub-Registrar's office is strictly optional. An unregistered will executed properly with two witnesses carries complete evidentiary validity before Indian courts.",
  },
];

export default function LegalValidity() {
  return (
    <section id="legal-validity" className="section" style={{ backgroundColor: "var(--bg-page)", borderBottom: "1px solid var(--border-subtle)" }}>
      <div className="container">
        {/* Section Header */}
        <div className="validity-header-wrap" style={{ maxWidth: "700px", margin: "0 auto 3rem auto", textAlign: "center" }}>
          <h2
            style={{
              fontSize: "clamp(1.55rem, 5vw, 2.6rem)",
              color: "var(--color-navy)",
              marginBottom: "0.85rem",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            The legal foundation of an online will in India.
          </h2>
          <p style={{ fontSize: "clamp(0.92rem, 2.5vw, 1.05rem)", color: "var(--color-charcoal)", lineHeight: 1.65, margin: 0 }}>
            Indian succession law provides clear statutory rules for creating a legally enforceable will.
            WillDrafting incorporates every mandatory requirement to ensure your testament is airtight.
          </p>
        </div>

        {/* Advocate Photo + 3 Pillars Split */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.9fr 1.1fr",
            gap: "3.5rem",
            alignItems: "center",
            marginBottom: "3.5rem",
          }}
          className="validity-split"
        >
          {/* Advocate Photo Card */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                boxShadow: "var(--shadow-lg)",
                border: "1px solid var(--border-card)",
              }}
            >
              <Image
                src="/images/advocate.jpg"
                alt="Distinguished Indian advocate reviewing legal will documentation at a library desk"
                width={700}
                height={550}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Floating verification badge */}
            <div
              className="advocate-badge"
              style={{
                position: "absolute",
                bottom: "-1.25rem",
                left: "1.5rem",
                right: "1.5rem",
                backgroundColor: "var(--color-navy)",
                color: "#FFFFFF",
                borderRadius: "var(--radius-md)",
                padding: "1rem 1.25rem",
                boxShadow: "var(--shadow-md)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(201, 162, 39, 0.2)",
                  color: "var(--color-gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "1rem",
                  flexShrink: 0,
                }}
              >
                ⚖
              </div>
              <div style={{ fontSize: "0.82rem", lineHeight: 1.4 }}>
                <strong>Vetted by Senior Advocates:</strong> Formatted to withstand probate scrutiny under Section 63.
              </div>
            </div>
          </div>

          {/* 3 Pillars Accordion / Stack */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="pillar-card"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.75rem 2rem",
                  border: "1px solid var(--border-subtle)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--color-navy)" }}>
                    {pillar.code}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "var(--color-slate)", fontWeight: 500 }}>{pillar.statute}</span>
                </div>

                <h3 style={{ fontSize: "1.12rem", color: "var(--color-slate)", fontWeight: 700, marginBottom: "0.4rem" }}>
                  {pillar.title}
                </h3>

                <p style={{ fontSize: "0.9rem", color: "var(--color-charcoal)", lineHeight: 1.6, margin: 0 }}>
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Callout */}
        <div
          className="validity-bottom-callout"
          style={{
            backgroundColor: "var(--color-navy)",
            borderRadius: "var(--radius-lg)",
            padding: "2rem 2.5rem",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div style={{ maxWidth: "680px" }}>
            <div style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.35rem" }}>
              Have unique family trusts or ancestral claims?
            </div>
            <div style={{ fontSize: "0.88rem", color: "#CBD5E1", lineHeight: 1.6 }}>
              WillDrafting handles 95% of standard Indian family estates seamlessly. For specialized high-value ancestral coparcenary splits, our network of certified legal advocates is available to review your draft.
            </div>
          </div>

          <Link href="/start" className="btn btn-gold" style={{ padding: "0.85rem 1.85rem", fontWeight: 700 }}>
            <span>Start Legal Draft</span>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .validity-header-wrap {
            margin-bottom: 2rem !important;
          }
          :global(.validity-split) {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            margin-bottom: 2rem !important;
          }
          :global(.advocate-badge) {
            position: static !important;
            margin-top: 0.85rem !important;
          }
          :global(.pillar-card) {
            padding: 1.35rem 1.15rem !important;
          }
          :global(.validity-bottom-callout) {
            padding: 1.5rem 1.15rem !important;
          }
        }
      `}</style>
    </section>
  );
}
