"use client";

import React, { useState } from "react";
import { WillDraftingState } from "@/lib/willDraftingStore";
import { Check, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";

interface Step13PlanSelectProps {
  state: WillDraftingState;
  onUpdate: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step13PlanSelect({
  state,
  onUpdate,
  onNext,
  onBack,
}: Step13PlanSelectProps) {
  const [selectedPlan, setSelectedPlan] = useState<WillDraftingState["selectedPlan"]>(
    state.selectedPlan || "lawyer_verified"
  );

  const plans = [
    {
      id: "essential" as const,
      name: "Essential Will",
      price: "₹ 1,499",
      desc: "Legally sound automated draft under ISA 1925 for straightforward estates.",
      features: [
        "Full Legal Will Document (PDF)",
        "Section 63 Statutory Execution Guide",
        "1-Year Access to Encrypted Will Vault",
        "Annual Review Reminders",
      ],
      recommended: false,
    },
    {
      id: "lawyer_verified" as const,
      name: "Lawyer Verified Will",
      price: "₹ 3,999",
      desc: "Line-by-line review and digital certification by a qualified Bar Council estate planning advocate.",
      features: [
        "Everything in Essential",
        "Line-by-Line Review by High Court Advocate",
        "Statutory Compliance Certificate",
        "Direct Clarification Messaging Channel",
        "Unlimited Updates for 1 Year",
      ],
      recommended: true,
    },
    {
      id: "premium" as const,
      name: "Comprehensive Estate Plan",
      price: "₹ 8,999",
      desc: "Dedicated senior advocate strategy session, family trust structuring, and Sub-Registrar support.",
      features: [
        "Everything in Lawyer Verified",
        "30-Minute 1-on-1 Video Consultation",
        "Testamentary Trust & Minor Care Structuring",
        "Sub-Registrar Registration Guidance",
        "Priority Concierge Support",
      ],
      recommended: false,
    },
  ];

  const handleConfirmPlan = () => {
    onUpdate((prev) => ({
      ...prev,
      selectedPlan,
      willStatus: selectedPlan === "lawyer_verified" ? "approved" : "finalised",
    }));
    onNext();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.85rem",
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      {/* Header */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.35rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.2rem 0.6rem",
              borderRadius: "999px",
              backgroundColor: "rgba(201, 162, 39, 0.12)",
              color: "var(--color-navy)",
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "var(--color-gold)" }}></span>
            Step 13 of 14 • Legal Verification Tier
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <AudioAssistantButton
              textToSpeak="Choose your legal plan. You can pick Essential Will for instant download, or Lawyer Verified for complete review by a qualified advocate."
              label="Listen / सुनें 🔊"
            />
            <span style={{ fontSize: "0.75rem", color: "var(--color-slate)" }}>
              Transparent Pricing • No Hidden Court Fees
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem", flexWrap: "wrap" }}>
          <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
            Choose your legal certification tier
          </h2>
          <span style={{ fontSize: "0.88rem", color: "#8A6D1B", fontWeight: 600 }}>
            (योजना चयन एवं कानूनी सत्यापन)
          </span>
        </div>
      </div>

      {/* Plan Cards 3-Column Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
          flex: 1,
          minHeight: 0,
        }}
      >
        {plans.map((p) => {
          const isSelected = selectedPlan === p.id;
          return (
            <div
              key={p.id}
              onClick={() => setSelectedPlan(p.id)}
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                border: isSelected ? "2.5px solid var(--color-gold)" : "1px solid rgba(27, 42, 74, 0.08)",
                padding: "1.25rem 1.35rem",
                boxShadow: isSelected
                  ? "0 8px 30px rgba(201, 162, 39, 0.15)"
                  : "0 2px 10px rgba(0, 0, 0, 0.02)",
                cursor: "pointer",
                transition: "all 0.18s ease",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              {p.recommended && (
                <div
                  style={{
                    position: "absolute",
                    top: "-11px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "var(--color-gold)",
                    color: "#FFFFFF",
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    padding: "0.2rem 0.75rem",
                    borderRadius: "999px",
                    letterSpacing: "0.05em",
                    boxShadow: "0 2px 8px rgba(201, 162, 39, 0.35)",
                  }}
                >
                  Recommended
                </div>
              )}

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                  <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800, color: "var(--color-navy)" }}>
                    {p.name}
                  </h4>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      border: isSelected ? "2px solid var(--color-gold)" : "2px solid rgba(27, 42, 74, 0.2)",
                      backgroundColor: isSelected ? "var(--color-gold)" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {isSelected && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>

                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-navy)", margin: "0.3rem 0" }}>
                  {p.price}
                </div>

                <p style={{ fontSize: "0.78rem", color: "var(--color-slate)", margin: "0 0 0.85rem", lineHeight: 1.4 }}>
                  {p.desc}
                </p>

                <div style={{ height: "1px", backgroundColor: "rgba(27, 42, 74, 0.06)", marginBottom: "0.85rem" }} />

                {/* Features List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                  {p.features.map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.45rem", fontSize: "0.78rem", color: "var(--color-charcoal)" }}>
                      <Check size={13} color="var(--color-sage)" strokeWidth={3} style={{ flexShrink: 0, marginTop: "2px" }} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlan(p.id);
                    handleConfirmPlan();
                  }}
                  className={isSelected ? "btn btn-gold" : "btn"}
                  style={{
                    width: "100%",
                    padding: "0.55rem",
                    borderRadius: "10px",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    backgroundColor: isSelected ? "var(--color-gold)" : "rgba(27, 42, 74, 0.05)",
                    color: isSelected ? "#FFFFFF" : "var(--color-navy)",
                    border: "none",
                  }}
                >
                  {isSelected ? "Selected ✓" : "Select Plan"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.6rem 1rem",
          borderRadius: "14px",
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(27, 42, 74, 0.08)",
          boxShadow: "0 2px 10px rgba(27, 42, 74, 0.03)",
          marginTop: "auto",
        }}
      >
        <button
          type="button"
          onClick={onBack}
          style={{
            padding: "0.65rem 1.4rem",
            borderRadius: "10px",
            border: "1px solid rgba(27, 42, 74, 0.15)",
            backgroundColor: "#FFFFFF",
            color: "var(--color-navy)",
            fontWeight: 700,
            fontSize: "0.875rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <button
          type="button"
          onClick={handleConfirmPlan}
          className="btn btn-gold"
          style={{
            padding: "0.65rem 1.85rem",
            borderRadius: "10px",
            fontSize: "0.9rem",
            fontWeight: 700,
            boxShadow: "0 4px 16px rgba(201, 162, 39, 0.25)",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          Confirm Plan & View Final Will <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
