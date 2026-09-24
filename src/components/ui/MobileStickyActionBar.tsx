"use client";

import React from "react";

export interface MobileStickyActionBarProps {
  currentStep?: number;
  totalSteps?: number;
  onBack?: () => void;
  onNext?: () => void;
  onPrimary?: () => void;
  onSecondary?: () => void;
  nextLabel?: string;
  primaryLabel?: string;
  backLabel?: string;
  secondaryLabel?: string;
  isSaving?: boolean;
  disabled?: boolean;
}

export default function MobileStickyActionBar({
  currentStep,
  totalSteps = 6,
  onBack,
  onNext,
  onPrimary,
  onSecondary,
  nextLabel,
  primaryLabel,
  backLabel,
  secondaryLabel,
  isSaving = false,
  disabled = false,
}: MobileStickyActionBarProps) {
  const handlePrimary = onPrimary || onNext;
  const handleSecondary = onSecondary || onBack;
  const mainLabel = primaryLabel || nextLabel || "Save & Continue ➔";
  const prevLabel = secondaryLabel || backLabel || "Back";

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(255, 255, 255, 0.96)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(27, 42, 74, 0.12)",
        padding: "0.75rem 1.25rem",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 -4px 16px rgba(15, 29, 56, 0.08)",
      }}
    >
      {/* Left: Back button / step indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {handleSecondary ? (
          <button
            type="button"
            onClick={handleSecondary}
            style={{
              padding: "0.6rem 1rem",
              borderRadius: "12px",
              border: "1px solid rgba(27, 42, 74, 0.15)",
              backgroundColor: "#FFFFFF",
              color: "#334155",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {prevLabel}
          </button>
        ) : currentStep ? (
          <div style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 600 }}>
            Step {currentStep}/{totalSteps}
          </div>
        ) : null}
      </div>

      {/* Right: Primary Action */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {handlePrimary && (
          <button
            type="button"
            disabled={disabled || isSaving}
            onClick={handlePrimary}
            style={{
              padding: "0.7rem 1.5rem",
              borderRadius: "12px",
              border: "none",
              backgroundColor: disabled ? "#CBD5E1" : "var(--color-navy)",
              color: "#FFFFFF",
              fontSize: "0.92rem",
              fontWeight: 700,
              cursor: disabled ? "not-allowed" : "pointer",
              boxShadow: disabled ? "none" : "0 4px 14px rgba(27, 42, 74, 0.25)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              transition: "all 0.15s ease",
            }}
          >
            {isSaving ? "Saving..." : mainLabel}
          </button>
        )}
      </div>
    </div>
  );
}
