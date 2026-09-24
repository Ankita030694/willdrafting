"use client";

import React, { useState } from "react";
import { WillDraftingState } from "@/lib/willDraftingStore";
import { Check, X } from "lucide-react";

interface ExecutionGuideTabProps {
  state: WillDraftingState;
}

export default function ExecutionGuideTab({ state }: ExecutionGuideTabProps) {
  const [assistanceBooked, setAssistanceBooked] = useState(false);
  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
  const [city, setCity] = useState(state.testator.city || "Gurugram");
  const [phone, setPhone] = useState(state.testator.phone || "+91 98100 45210");

  const rules = [
    {
      num: "01",
      title: "Print on Plain White Bond Paper",
      tag: "No Stamp Paper Required",
      explanation:
        "Under the Indian Stamp Act and Court Fees Act, a Will is completely exempt from stamp duty. Do not print on judicial or non-judicial stamp paper. Use sturdy A4 white paper.",
    },
    {
      num: "02",
      title: "Signature on Every Page",
      tag: "Section 63(a), ISA 1925",
      explanation:
        "The Testator should sign or initial at the bottom right corner of every single sheet of the Will. The full signature must be appended at the end of the Testimonium block on the final page.",
    },
    {
      num: "03",
      title: "Two Independent Attesting Witnesses",
      tag: "Mandatory Attestation",
      explanation:
        "Two adult witnesses with valid government photo IDs must be physically present together, witness the testator signing, and sign the attestation clause in each other's presence.",
    },
    {
      num: "04",
      title: "Witnesses Must NOT Be Beneficiaries",
      tag: "Section 67, ISA 1925",
      explanation:
        "CRITICAL: If a beneficiary or the spouse of a beneficiary signs as an attesting witness, the bequest to that person becomes completely void under Indian law. Choose independent friends, doctors, or colleagues.",
    },
    {
      num: "05",
      title: "Doctor's Fitness Certificate (Recommended)",
      tag: "Proof of Sound Mind",
      explanation:
        "For testators aged 60+ or undergoing medical treatments, obtaining a brief fitness certificate from a registered medical practitioner (MBBS) stating 'testator is of sound disposing mind' prevents future probate challenges.",
    },
    {
      num: "06",
      title: "Registration at Sub-Registrar's Office (Optional)",
      tag: "Section 18, Registration Act 1908",
      explanation:
        "Registration of a Will is optional in India. An unregistered Will is 100% legally valid. However, registration provides strong evidentiary presumption in court that the testator executed the Will voluntarily.",
    },
  ];

  const handleBookAssistance = (e: React.FormEvent) => {
    e.preventDefault();
    setAssistanceBooked(true);
    setAssistanceModalOpen(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Header Banner */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border-card)",
          padding: "2.25rem 2rem",
          boxShadow: "var(--shadow-sm)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-navy)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "var(--color-gold)" }}></span>
            Sections 35 & 41 • Statutory Execution Protocol
          </div>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--color-navy)", margin: 0 }}>
            How to Legally Execute Your Will in India
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", margin: "0.5rem 0 0", maxWidth: "700px" }}>
            A Will in India requires strict statutory compliance with Section 63 of the Indian Succession Act 1925 to be legally enforceable. Follow these 6 steps to ensure your wishes cannot be disputed.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            onClick={() => window.print()}
            style={{
              padding: "0.65rem 1.15rem",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-card)",
              backgroundColor: "#FFFFFF",
              color: "var(--color-navy)",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            Print Checklist
          </button>

          <button
            onClick={() => setAssistanceModalOpen(true)}
            className="btn btn-gold"
            style={{
              padding: "0.65rem 1.35rem",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.85rem",
              fontWeight: 700,
            }}
          >
            {assistanceBooked ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                <Check size={14} /> Assistance Booked
              </span>
            ) : (
              "Get Registration Assistance"
            )}
          </button>
        </div>
      </div>

      {/* Confirmation notice if booked */}
      {assistanceBooked && (
        <div
          style={{
            padding: "1rem 1.25rem",
            backgroundColor: "rgba(124, 148, 115, 0.18)",
            border: "1px solid var(--color-sage)",
            borderRadius: "var(--radius-sm)",
            color: "var(--color-navy)",
            fontSize: "0.9rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--color-sage)" }}></span>
          Registration assistance booked for {city}. Our local legal executive will contact you at {phone} within 24 hours with the Sub-Registrar appointment slot.
        </div>
      )}

      {/* 6 Legal Rules Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {rules.map((rule) => (
          <div
            key={rule.num}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-card)",
              padding: "1.75rem",
              boxShadow: "var(--shadow-sm)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "var(--color-gold)",
                  }}
                >
                  {rule.num}
                </span>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    backgroundColor: "rgba(27, 42, 74, 0.06)",
                    color: "var(--color-navy)",
                    padding: "0.2rem 0.55rem",
                    borderRadius: "999px",
                  }}
                >
                  {rule.tag}
                </span>
              </div>

              <h4 style={{ margin: "0 0 0.5rem", fontSize: "1.05rem", fontWeight: 700, color: "var(--color-navy)" }}>
                {rule.title}
              </h4>

              <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-main)", lineHeight: 1.55 }}>
                {rule.explanation}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Registration Assistance Modal (Section 41) */}
      {assistanceModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(27, 42, 74, 0.65)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setAssistanceModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "var(--radius-lg)",
              width: "100%",
              maxWidth: "500px",
              padding: "2rem",
              boxShadow: "var(--shadow-lg)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
              <div>
                <h3 style={{ margin: 0, color: "var(--color-navy)", fontSize: "1.25rem", fontWeight: 700 }}>
                  Sub-Registrar Registration Assistance
                </h3>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  Section 41 • End-to-End Execution Support
                </span>
              </div>
              <button
                onClick={() => setAssistanceModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: "0 0 1.25rem" }}>
              Our paralegal executives book your official slot at the local Sub-Registrar&apos;s Office, verify witness documents, and accompany you through the registration desk.
            </p>

            <form onSubmit={handleBookAssistance} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
                  City / Jurisdiction
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.85rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-card)",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
                  Contact Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.85rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-card)",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setAssistanceModalOpen(false)}
                  style={{
                    padding: "0.55rem 1rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-card)",
                    backgroundColor: "#FFFFFF",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-gold"
                  style={{
                    padding: "0.55rem 1.35rem",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                  }}
                >
                  Request Assistance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
