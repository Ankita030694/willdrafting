"use client";

import React, { useState } from "react";
import {
  WillDraftingState,
  setScenario,
  setWillStatus,
} from "@/lib/willDraftingStore";

interface DemoSandboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentState: WillDraftingState;
  onStateChange: (state: WillDraftingState) => void;
}

export default function DemoSandboxModal({
  isOpen,
  onClose,
  currentState,
  onStateChange,
}: DemoSandboxModalProps) {
  const [copiedNotification, setCopiedNotification] = useState("");

  if (!isOpen) return null;

  const handleSelectScenario = (key: "scenario_1" | "scenario_2" | "blank") => {
    const updated = setScenario(key);
    onStateChange(updated);
    setCopiedNotification(
      key === "scenario_1"
        ? "Loaded Scenario 1: Standard Family (Clean Pass)"
        : key === "scenario_2"
        ? "Loaded Scenario 2: Edge-Case (Minor Child & Joint Asset)"
        : "Reset to Blank Slate"
    );
    setTimeout(() => setCopiedNotification(""), 3000);
  };

  const handleStatusChange = (status: WillDraftingState["willStatus"]) => {
    const updated = setWillStatus(status);
    onStateChange(updated);
    setCopiedNotification(`Will Status switched to: ${status.replace("_", " ").toUpperCase()}`);
    setTimeout(() => setCopiedNotification(""), 3000);
  };

  return (
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
        padding: "1.25rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-lg)",
          width: "100%",
          maxWidth: "640px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 25px 50px -12px rgba(27, 42, 74, 0.25)",
          border: "1px solid rgba(27, 42, 74, 0.12)",
          padding: "2rem",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.25rem 0.65rem", borderRadius: "999px", backgroundColor: "rgba(201, 162, 39, 0.12)", color: "var(--color-navy)", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-gold)" }}></span>
              Demo Evaluation Sandbox
            </div>
            <h3 style={{ color: "var(--color-navy)", fontSize: "1.35rem", fontWeight: 700, margin: 0 }}>
              Test Personas & Simulator
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "0.25rem", marginBottom: 0 }}>
              Switch preloaded master data or simulate verification stages instantly.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.4rem",
              borderRadius: "50%",
              color: "var(--text-muted)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Feedback alert if switched */}
        {copiedNotification && (
          <div
            style={{
              padding: "0.75rem 1rem",
              backgroundColor: "rgba(124, 148, 115, 0.15)",
              border: "1px solid var(--color-sage)",
              borderRadius: "var(--radius-sm)",
              color: "var(--color-navy)",
              fontSize: "0.85rem",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.25rem",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-sage)" strokeWidth="2.5">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            {copiedNotification}
          </div>
        )}

        {/* Section 1: Preloaded Personas */}
        <div style={{ marginBottom: "1.75rem" }}>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--color-slate)", marginBottom: "0.75rem" }}>
            1. Select Master Context Scenario
          </label>
          <div style={{ display: "grid", gap: "0.85rem" }}>
            {/* Scenario 1 */}
            <div
              onClick={() => handleSelectScenario("scenario_1")}
              style={{
                border: currentState.testator.fullName === "Rajesh Kumar Sharma" && currentState.familyMembers.length === 3 ? "2px solid var(--color-gold)" : "1px solid var(--border-card)",
                backgroundColor: currentState.testator.fullName === "Rajesh Kumar Sharma" && currentState.familyMembers.length === 3 ? "rgba(201, 162, 39, 0.05)" : "#FFFFFF",
                borderRadius: "var(--radius-md)",
                padding: "1rem 1.15rem",
                cursor: "pointer",
                transition: "var(--transition)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 600, color: "var(--color-navy)", fontSize: "0.95rem" }}>
                  Scenario 1: Standard Married Family (Clean Pass)
                </div>
                {currentState.testator.fullName === "Rajesh Kumar Sharma" && currentState.familyMembers.length === 3 && (
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, backgroundColor: "var(--color-gold)", color: "var(--color-charcoal)", padding: "0.2rem 0.5rem", borderRadius: "999px" }}>
                    ACTIVE
                  </span>
                )}
              </div>
              <p style={{ margin: "0.35rem 0 0", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Testator Rajesh Sharma, spouse Sunita, 2 adult children (Rahul & Priya), Gurgaon luxury apartment, HDFC deposits & Zerodha portfolio. All legal health checks clean.
              </p>
            </div>

            {/* Scenario 2 */}
            <div
              onClick={() => handleSelectScenario("scenario_2")}
              style={{
                border: currentState.familyMembers.some((f) => f.isMinor) ? "2px solid #E11D48" : "1px solid var(--border-card)",
                backgroundColor: currentState.familyMembers.some((f) => f.isMinor) ? "rgba(225, 29, 72, 0.04)" : "#FFFFFF",
                borderRadius: "var(--radius-md)",
                padding: "1rem 1.15rem",
                cursor: "pointer",
                transition: "var(--transition)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 600, color: "var(--color-navy)", fontSize: "0.95rem" }}>
                  Scenario 2: Edge-Case Test (Triggers Health Checks)
                </div>
                {currentState.familyMembers.some((f) => f.isMinor) && (
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, backgroundColor: "#E11D48", color: "#FFFFFF", padding: "0.2rem 0.5rem", borderRadius: "999px" }}>
                    ACTIVE
                  </span>
                )}
              </div>
              <p style={{ margin: "0.35rem 0 0", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Testator Vikram Verma with minor child (age 8), jointly owned property without survivorship clarity, and no residuary beneficiary. Triggers 3 live legal health check warnings.
              </p>
            </div>

            {/* Blank State */}
            <div
              onClick={() => handleSelectScenario("blank")}
              style={{
                border: "1px solid var(--border-card)",
                backgroundColor: "#FFFFFF",
                borderRadius: "var(--radius-md)",
                padding: "0.85rem 1.15rem",
                cursor: "pointer",
                transition: "var(--transition)",
              }}
            >
              <div style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Reset to Fresh Blank Slate
              </div>
              <p style={{ margin: "0.25rem 0 0", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Clears all entries for manual testing of the 14-step onboarding wizard.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Simulate Will Status */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--color-slate)", marginBottom: "0.75rem" }}>
            2. Simulate Will Lifecycle Status
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {(
              [
                { key: "drafting", label: "Drafting in Progress" },
                { key: "draft_ready", label: "Draft Ready" },
                { key: "lawyer_review", label: "Under Lawyer Review" },
                { key: "clarification_requested", label: "Clarification Needed" },
                { key: "approved", label: "Lawyer Approved" },
                { key: "finalised", label: "Finalised & Ready" },
              ] as const
            ).map((item) => {
              const isActive = currentState.willStatus === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleStatusChange(item.key)}
                  style={{
                    padding: "0.45rem 0.85rem",
                    borderRadius: "999px",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    border: isActive ? "1px solid var(--color-navy)" : "1px solid var(--border-card)",
                    backgroundColor: isActive ? "var(--color-navy)" : "#FFFFFF",
                    color: isActive ? "#FFFFFF" : "var(--color-slate)",
                    cursor: "pointer",
                    transition: "var(--transition)",
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", borderTop: "1px solid var(--border-subtle)", paddingTop: "1.25rem" }}>
          <button
            onClick={onClose}
            className="btn btn-gold"
            style={{
              padding: "0.6rem 1.5rem",
              fontSize: "0.875rem",
              borderRadius: "var(--radius-sm)",
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
