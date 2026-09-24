"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const reviews = [
  {
    quote:
      "Writing a will was something my wife and I put off for 12 years because visiting a law firm felt overwhelming and expensive. WillDrafting helped us catalog our flat in Bengaluru, our Demat accounts, and appoint our daughter as executor in 20 minutes.",
    author: "Ramesh & Sunita Sharma",
    location: "Bengaluru, Karnataka",
    role: "Retired Bank General Manager & Educator",
  },
  {
    quote:
      "As an army veteran with properties across two states, I needed clarity to avoid family disputes. The Indian Succession Act Section 63 checklist made execution and witnessing straightforward.",
    author: "Col. Sanjeev Varma (Retd.)",
    location: "New Delhi",
    role: "Indian Army Veteran",
  },
  {
    quote:
      "As a single mother, my number one worry was who would be the legal guardian of my 8-year-old son if something happened to me. WillDrafting gave me absolute peace of mind by legally appointing my sister.",
    author: "Ananya Deshmukh",
    location: "Mumbai, Maharashtra",
    role: "Healthcare Consultant",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section" style={{ backgroundColor: "#FAF7F0", borderBottom: "1px solid var(--border-subtle)" }}>
      <div className="container">
        {/* Lifestyle Senior Story Card */}
        <div
          style={{
            backgroundColor: "var(--bg-card-subtle)",
            borderRadius: "var(--radius-xl)",
            overflow: "hidden",
            border: "1px solid var(--border-subtle)",
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            alignItems: "center",
            marginBottom: "4rem",
            boxShadow: "var(--shadow-md)",
          }}
          className="story-grid"
        >
          <div style={{ padding: "3rem 3.5rem" }} className="story-content">
            <h2
              style={{
                fontSize: "clamp(1.45rem, 4vw, 2.25rem)",
                color: "var(--color-navy)",
                fontWeight: 800,
                lineHeight: 1.25,
                marginBottom: "0.85rem",
                letterSpacing: "-0.02em",
              }}
            >
              &ldquo;The greatest gift we left our children was certainty.&rdquo;
            </h2>
            <p style={{ fontSize: "clamp(0.92rem, 2.5vw, 1.05rem)", color: "var(--color-charcoal)", lineHeight: 1.65, marginBottom: "1.5rem" }}>
              Planning your estate is not about death—it is about sparing your loved ones the agonizing delays,
              expenses, and emotional strain of contested succession certificates in probate court.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Link href="/start" className="btn btn-gold" style={{ fontWeight: 700, padding: "0.85rem 1.85rem" }}>
                <span>Start Your Will in 15 Minutes</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="story-image-wrap" style={{ position: "relative", height: "100%", minHeight: "360px" }}>
            <Image
              src="/images/senior-couple.jpg"
              alt="Happy senior Indian couple enjoying retirement together in a lush garden"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* 3 Review Cards */}
        <div className="reviews-header-wrap" style={{ maxWidth: "650px", margin: "0 auto 2.5rem auto", textAlign: "center" }}>
          <h3 style={{ fontSize: "clamp(1.35rem, 3.8vw, 1.85rem)", color: "var(--color-navy)", fontWeight: 800 }}>
            Trusted by over 10,000 Indian families
          </h3>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "1.5rem",
          }}
        >
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="review-card"
              style={{
                backgroundColor: "var(--bg-page)",
                padding: "2rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-subtle)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div>
                {/* 5 gold stars */}
                <div style={{ color: "var(--color-gold)", fontSize: "1.1rem", marginBottom: "0.75rem" }}>
                  ★★★★★
                </div>
                <p style={{ fontSize: "0.92rem", color: "var(--color-charcoal)", lineHeight: 1.65, fontStyle: "italic", marginBottom: "1.25rem" }}>
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1rem" }}>
                <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--color-navy)" }}>
                  {rev.author}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--color-slate)", fontWeight: 500 }}>
                  {rev.role} • {rev.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.story-grid) {
            grid-template-columns: 1fr !important;
            margin-bottom: 2.5rem !important;
          }
          :global(.story-content) {
            padding: 1.5rem 1.15rem !important;
          }
          :global(.story-image-wrap) {
            min-height: 220px !important;
            height: 220px !important;
          }
          :global(.review-card) {
            padding: 1.35rem 1.15rem !important;
          }
          .reviews-header-wrap {
            margin-bottom: 1.75rem !important;
          }
        }
      `}</style>
    </section>
  );
}
