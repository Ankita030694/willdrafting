"use client";

import React from "react";
import Link from "next/link";

export default function CallToActionBanner() {
  const handleStartClick = () => {
    const el = document.getElementById("start-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      const input = el.querySelector("input");
      if (input) input.focus();
    } else if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-intake-popup"));
    }
  };

  return (
    <section
      className="cta-banner-section"
      style={{
        backgroundColor: "var(--bg-header)",
        color: "#FFFFFF",
        padding: "4.5rem 0",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="container" style={{ textAlign: "center", maxWidth: "760px" }}>
        <h2
          style={{
            fontSize: "clamp(1.55rem, 5vw, 2.6rem)",
            color: "#FFFFFF",
            fontFamily: "var(--font-heading)",
            lineHeight: 1.25,
            marginBottom: "1rem",
            fontWeight: 700,
          }}
        >
          Take 15 minutes today to protect what took a lifetime to build.
        </h2>

        <p
          style={{
            fontSize: "clamp(0.92rem, 2.5vw, 1.05rem)",
            color: "rgba(255, 255, 255, 0.82)",
            lineHeight: 1.65,
            marginBottom: "2rem",
            maxWidth: "580px",
            margin: "0 auto 2rem auto",
          }}
        >
          Do not leave your family&apos;s inheritance to state intestacy laws and contentious court probate.
          Draft your airtight, legally valid will online.
        </p>

        <div
          className="cta-banner-actions"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.85rem",
          }}
        >
          <button
            type="button"
            onClick={handleStartClick}
            className="btn btn-gold"
            style={{ padding: "0.85rem 2rem", fontSize: "0.95rem" }}
          >
            <span>Start My Will Now</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>

          <Link
            href="/login"
            style={{
              color: "#FFFFFF",
              fontSize: "0.9rem",
              fontWeight: 500,
              padding: "0.85rem 1.5rem",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "var(--radius-md)",
            }}
          >
            Existing Member Login
          </Link>
        </div>

        <div
          style={{
            marginTop: "2.25rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1.25rem",
            fontSize: "0.8rem",
            color: "rgba(255, 255, 255, 0.6)",
            flexWrap: "wrap",
          }}
        >
          <span>✓ Free to begin questionnaire</span>
          <span>✓ Court-tested legal format</span>
          <span>✓ 256-bit bank-grade encryption</span>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .cta-banner-section {
            padding: 2.75rem 0 !important;
          }
          :global(.cta-banner-actions > *) {
            width: 100% !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
