"use client";

import React, { useState } from "react";
import { WillDraftingState } from "@/lib/willDraftingStore";

interface WillPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: WillDraftingState;
}

export default function WillPreviewModal({
  isOpen,
  onClose,
  state,
}: WillPreviewModalProps) {
  const [showWatermark, setShowWatermark] = useState(
    state.willStatus !== "approved" && state.willStatus !== "finalised"
  );

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const testator = state.testator;
  const isMale = testator.gender === "male";
  const pronounTitle = isMale ? "Mr." : testator.gender === "female" ? "Ms." : "";
  const sonDaughterOf = isMale ? "son of" : "daughter of";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(27, 42, 74, 0.7)",
        backdropFilter: "blur(5px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-lg)",
          width: "100%",
          maxWidth: "880px",
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 50px -12px rgba(27, 42, 74, 0.35)",
          border: "1px solid rgba(27, 42, 74, 0.15)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div
          style={{
            padding: "1rem 1.5rem",
            backgroundColor: "var(--color-navy)",
            color: "#FFFFFF",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "rgba(201, 162, 39, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-gold)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 600, color: "#FFFFFF" }}>
                Legal Document Preview • Indian Succession Act 1925
              </h4>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.7)" }}>
                Version {state.version || "v1.2"} • {state.clauses?.length || 8} Clauses Assembled
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.75rem",
                color: "rgba(255, 255, 255, 0.8)",
                cursor: "pointer",
                marginRight: "0.5rem",
              }}
            >
              <input
                type="checkbox"
                checked={showWatermark}
                onChange={(e) => setShowWatermark(e.target.checked)}
                style={{ accentColor: "var(--color-gold)", cursor: "pointer" }}
              />
              Show Watermark
            </label>

            <button
              onClick={handlePrint}
              style={{
                padding: "0.45rem 0.9rem",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "var(--color-gold)",
                color: "var(--color-charcoal)",
                fontSize: "0.8rem",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Print / Save PDF
            </button>

            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255, 255, 255, 0.8)",
                cursor: "pointer",
                padding: "0.4rem",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Document Body (Legal paper view) */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            backgroundColor: "#F1F5F9",
            padding: "2rem 1.5rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            id="printable-will-document"
            style={{
              width: "100%",
              maxWidth: "720px",
              backgroundColor: "#FFFFFF",
              boxShadow: "0 10px 25px rgba(27, 42, 74, 0.08)",
              border: "1px solid rgba(27, 42, 74, 0.12)",
              padding: "3.5rem 3rem",
              fontFamily: "var(--font-main)",
              color: "#1E293B",
              position: "relative",
              lineHeight: 1.8,
            }}
          >
            {/* Watermark overlay */}
            {showWatermark && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) rotate(-35deg)",
                  fontSize: "4.5rem",
                  fontWeight: 900,
                  color: "rgba(201, 162, 39, 0.08)",
                  pointerEvents: "none",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.15em",
                  userSelect: "none",
                  textTransform: "uppercase",
                }}
              >
                {state.willStatus === "approved" || state.willStatus === "finalised"
                  ? "CERTIFIED COPY"
                  : "DRAFT • WILLDRAFTING.COM"}
              </div>
            )}

            {/* Document Header */}
            <div style={{ textAlign: "center", borderBottom: "2px solid #1E293B", paddingBottom: "1.5rem", marginBottom: "2rem" }}>
              <div style={{ fontSize: "0.95rem", fontWeight: 800, letterSpacing: "0.15em", color: "#1B2A4A", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                WILL DEED
              </div>
              <h2 style={{ fontSize: "1.45rem", fontWeight: 700, color: "#0F172A", margin: 0, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                LAST WILL AND TESTAMENT OF
              </h2>
              <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#1B2A4A", marginTop: "0.35rem", textTransform: "uppercase" }}>
                {testator.fullName || "DR. ROHIT SRIVASTAVA"}
              </div>
            </div>

            {/* Clauses List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", fontSize: "0.95rem" }}>
              {/* Preamble / Declaration */}
              <div style={{ textAlign: "justify", lineHeight: 1.8 }}>
                I, <strong>{testator.fullName || "Dr. Rohit Srivastava"}</strong>
                {testator.fatherOrMotherName ? `, ${sonDaughterOf} ${testator.fatherOrMotherName}` : ""}
                , aged about {testator.dob ? new Date().getFullYear() - new Date(testator.dob).getFullYear() : "49"} years
                {testator.pan ? `, holding Permanent Account Number (PAN) ${testator.pan}` : ""}
                {testator.aadhaar ? ` and Aadhaar Number ${testator.aadhaar}` : ""}
                , presently residing at{" "}
                <strong>
                  {[testator.address, testator.city ? `${testator.city} – ${testator.pincode || ""}` : testator.pincode].filter(Boolean).join(", ") ||
                    "201 Barberry, Nahar Amrit Shakti, Chandivali, Mumbai – 400072"}
                </strong>
                {testator.workplace ? `, and working at ${testator.workplace}` : ""}
                , being of sound mind, in good health, and fully competent to make this Will, do hereby declare this to be my Last Will and Testament, made voluntarily and without any coercion, undue influence, or misrepresentation, and hereby revoke all prior Wills and testamentary dispositions made by me.
              </div>

              {/* Dynamic Clauses from store */}
              {state.clauses && state.clauses.length > 0 ? (
                state.clauses.map((clause, idx) => (
                  <div key={clause.id || idx} style={{ textAlign: "justify" }}>
                    <div style={{ fontWeight: 800, color: "#0F172A", marginBottom: "0.5rem", fontSize: "0.95rem", letterSpacing: "0.02em" }}>
                      {clause.clauseNumber}. {clause.title}
                    </div>
                    <div style={{ whiteSpace: "pre-line", color: "#334155", lineHeight: 1.8 }}>
                      {clause.currentText || clause.standardText}
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div style={{ textAlign: "justify" }}>
                    <strong>1. REVOCATION OF PRIOR TESTAMENTARY DISPOSITIONS:</strong> I hereby revoke, cancel, and annul all former Wills, Codicils, and testamentary dispositions of every nature and kind made by me at any time heretofore, and declare this to be my sole operative Will.
                  </div>
                  <div style={{ textAlign: "justify" }}>
                    <strong>2. APPOINTMENT OF EXECUTOR:</strong> I hereby nominate, constitute, and appoint{" "}
                    <strong>{state.executorPrimary?.name || "Sunita Sharma"}</strong> to be the sole Executor of this my Will. In the event the said Executor predeceases me or is unable or unwilling to act, I appoint{" "}
                    <strong>{state.executorAlternate?.name || "Rahul Sharma"}</strong> as the Alternate Executor.
                  </div>
                  <div style={{ textAlign: "justify" }}>
                    <strong>3. RESIDUARY ESTATE:</strong> I give, devise, and bequeath all the rest, residue, and remainder of my estate, whether movable or immovable, unto{" "}
                    <strong>{state.residuaryBeneficiaryName || "Sunita Sharma"}</strong> absolutely and forever.
                  </div>
                </>
              )}
            </div>

            {/* Seal / Footer */}
            <div style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px dashed #CBD5E1", fontSize: "0.75rem", color: "#94A3B8", textAlign: "center" }}>
              Generated via WillDrafting.com Legal Engine • Formatted in accordance with Section 63, Indian Succession Act, 1925
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: "0.85rem 1.5rem",
            backgroundColor: "#FFFFFF",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Status:{" "}
            <strong style={{ color: "var(--color-navy)", textTransform: "uppercase" }}>
              {state.willStatus.replace("_", " ")}
            </strong>
          </span>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={handlePrint}
              className="btn btn-gold"
              style={{ padding: "0.5rem 1.25rem", fontSize: "0.85rem", borderRadius: "var(--radius-sm)" }}
            >
              Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.85rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-card)",
                backgroundColor: "#FFFFFF",
                color: "var(--color-slate)",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
