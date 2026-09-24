"use client";

import React, { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    question: "Is an online will legally valid and enforceable in Indian courts?",
    answer:
      "Yes. Under Section 63 of the Indian Succession Act, 1925, a will is legally valid provided it is in writing, executed by a person of sound mind with free volition, and signed by the testator in the concurrent presence of two independent adult witnesses who attest it. Our system generates the exact statutory language recognized and enforced by Indian courts.",
  },
  {
    question: "Does my will require non-judicial stamp paper or notarization?",
    answer:
      "No. In India, a will does NOT require stamp paper or stamp duty. It can be printed on standard white A4 plain paper. While optional notarization or registration at the sub-registrar's office provides an extra layer of official record, an unregistered will executed on plain paper before two witnesses is 100% legal and binding.",
  },
  {
    question: "Who can be appointed as an executor, and who can act as a witness?",
    answer:
      "An executor is the trusted person responsible for distributing your assets according to your wishes. You can name any adult, including your spouse, adult child, or trusted friend. For witnesses: Any two adult individuals of sound mind can sign. However, critical legal rule: A witness must NOT be a beneficiary or spouse of a beneficiary under the will, to prevent conflicts of interest.",
  },
  {
    question: "Can I bequeath ancestral property through my will?",
    answer:
      "Under Hindu personal law, you have absolute freedom to bequeath 100% of your self-acquired property, personal earnings, investments, and assets. For ancestral property (coparcenary property), you can only bequeath your undivided share/interest in the ancestral estate, which our questionnaire helps you calculate and declare correctly.",
  },
  {
    question: "Can I edit or revoke my will after generating it?",
    answer:
      "Yes. A will only takes effect upon death. During your lifetime, you maintain complete testamentary freedom to amend, update, or revoke your will at any time. When you create an account, you can log in to your dashboard anytime family circumstances change (such as the birth of a grandchild or purchase of a new property) to regenerate an updated draft.",
  },
  {
    question: "How does the registration fee and dashboard setup work?",
    answer:
      "You can start answering all your personal, family, and asset questions free of charge. Once you are ready to access your private dashboard, catalog detailed properties, and generate the final court-compliant document, you complete a quick registration with a nominal, one-time fee.",
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faqs" className="section" style={{ backgroundColor: "var(--bg-page)", borderBottom: "1px solid var(--border-subtle)" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        {/* Section Header */}
        <div className="faq-header-wrap" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "clamp(1.55rem, 4.5vw, 2.5rem)",
              color: "var(--color-navy)",
              marginBottom: "0.85rem",
              fontWeight: 700,
              lineHeight: 1.25,
            }}
          >
            Frequently Asked Questions
          </h2>
          <p style={{ fontSize: "clamp(0.92rem, 2.5vw, 1.05rem)", color: "var(--color-charcoal)", lineHeight: 1.65, margin: 0 }}>
            Common questions about Indian succession law, online drafting, and execution.
          </p>
        </div>

        {/* FAQ List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-md)",
                  transition: "var(--transition)",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="faq-toggle-btn"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.15rem 1.35rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.96rem",
                      fontWeight: 600,
                      color: isOpen ? "var(--color-navy)" : "var(--color-slate)",
                      lineHeight: 1.4,
                    }}
                  >
                    {faq.question}
                  </span>
                  <span
                    style={{
                      fontSize: "1.2rem",
                      color: isOpen ? "var(--color-navy)" : "var(--text-muted)",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "var(--transition)",
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div
                    className="faq-answer-body"
                    style={{
                      padding: "0 1.35rem 1.25rem 1.35rem",
                      fontSize: "0.9rem",
                      lineHeight: 1.65,
                      color: "var(--color-charcoal)",
                      borderTop: "1px solid var(--border-subtle)",
                      paddingTop: "0.85rem",
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Advisory Box */}
        <div
          className="faq-advisory-box"
          style={{
            marginTop: "2.5rem",
            padding: "1.5rem 2rem",
            backgroundColor: "#FFFFFF",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-md)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--color-navy)" }}>
              Have a specific question about your family situation?
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--color-slate)" }}>
              Our estate planning team is available to assist you.
            </div>
          </div>
          <Link href="/start" className="btn btn-outline-navy" style={{ padding: "0.6rem 1.25rem", fontSize: "0.875rem" }}>
            <span>Start Free Consultation</span>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .faq-header-wrap {
            margin-bottom: 2rem !important;
          }
          :global(.faq-toggle-btn) {
            padding: 1rem 1.1rem !important;
          }
          :global(.faq-answer-body) {
            padding: 0 1.1rem 1rem 1.1rem !important;
            padding-top: 0.75rem !important;
          }
          :global(.faq-advisory-box) {
            padding: 1.25rem 1.1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
