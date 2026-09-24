"use client";

import React from "react";
import Link from "next/link";

const assets = [
  {
    title: "Residential Property & Real Estate",
    tag: "Immovable Assets",
    description: "Specify exact ownership shares for apartments, independent houses, land, and ancestral shares without ambiguity.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Bank Deposits, Demat & Mutual Funds",
    tag: "Financial Holdings",
    description: "Nominees are merely custodians. A valid will ensures legal ownership transfers smoothly to your intended heirs.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Guardianship for Minor Children",
    tag: "Family Care",
    description: "Designate the trusted family members you choose to raise your minor children, avoiding protracted court guardianship hearings.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Gold, Jewelry & Family Heirlooms",
    tag: "Physical Valuables",
    description: "Distribute gold, jewelry sets, art, and treasured family keepsakes to specific beneficiaries to prevent sibling discord.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
  },
  {
    title: "Digital Assets, Crypto & Portals",
    tag: "Modern Legacy",
    description: "Provide instructions for cryptocurrency keys, social media archives, cloud files, and intellectual property royalties.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "Residuary Estate & Future Wealth",
    tag: "Universal Protection",
    description: "An airtight residuary clause captures any assets acquired in the future, guaranteeing zero assets fall into intestacy.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export default function AssetCoverage() {
  return (
    <section className="section" style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid var(--border-subtle)" }}>
      <div className="container">
        {/* Section Header */}
        <div className="asset-header-wrap" style={{ maxWidth: "700px", margin: "0 auto 3rem auto", textAlign: "center" }}>
          <h2
            style={{
              fontSize: "clamp(1.55rem, 5vw, 2.6rem)",
              color: "var(--color-navy)",
              marginBottom: "0.85rem",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            Everything you can protect in your will.
          </h2>
          <p style={{ fontSize: "clamp(0.92rem, 2.5vw, 1.05rem)", color: "var(--color-charcoal)", lineHeight: 1.65, margin: 0 }}>
            Many people believe having a nominee in their bank accounts is enough. Under Indian law, a nominee is merely a
            temporary caretaker; only a valid will confers permanent legal ownership.
          </p>
        </div>

        {/* 6 Asset Grid */}
        <div
          className="asset-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "1.5rem",
          }}
        >
          {assets.map((item, idx) => (
            <div
              key={idx}
              className="asset-card"
              style={{
                backgroundColor: "var(--bg-card-subtle)",
                borderRadius: "var(--radius-lg)",
                padding: "2rem",
                border: "1px solid var(--border-subtle)",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "var(--transition)",
              }}
            >
              <div>
                <div style={{ marginBottom: "1.25rem" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: "var(--color-navy)",
                      color: "var(--color-gold)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </div>
                </div>

                <h3 style={{ fontSize: "1.15rem", color: "var(--color-navy)", fontWeight: 700, marginBottom: "0.6rem" }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: "0.925rem", color: "var(--color-charcoal)", lineHeight: 1.6, margin: 0 }}>
                  {item.description}
                </p>
              </div>

              <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid var(--border-subtle)" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--color-slate)", fontWeight: 600 }}>
                  Included in standard inventory questionnaire →
                </span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
          <Link href="/start" className="btn btn-gold" style={{ padding: "0.85rem 1.85rem", fontWeight: 700 }}>
            <span>Catalog Your Assets in 15 Minutes</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .asset-header-wrap {
            margin-bottom: 2rem !important;
          }
          :global(.asset-card) {
            padding: 1.35rem 1.15rem !important;
          }
        }
      `}</style>
    </section>
  );
}
