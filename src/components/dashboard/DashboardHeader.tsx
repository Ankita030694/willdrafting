"use client";

import React, { useState } from "react";
import Link from "next/link";
import { WillDraftingState } from "@/lib/willDraftingStore";
import DemoSandboxModal from "./DemoSandboxModal";
import WillPreviewModal from "./WillPreviewModal";

interface DashboardHeaderProps {
  state: WillDraftingState;
  onStateChange: (newState: WillDraftingState) => void;
}

export default function DashboardHeader({
  state,
  onStateChange,
}: DashboardHeaderProps) {
  const [sandboxOpen, setSandboxOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const testatorName = state.testator.fullName || "Valued Client";
  const firstName = testatorName.split(" ")[0] || "Client";
  const initials = testatorName
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const getStatusBadge = () => {
    switch (state.willStatus) {
      case "approved":
        return {
          label: "Lawyer Approved & Certified",
          bg: "rgba(124, 148, 115, 0.15)",
          color: "var(--color-navy)",
          border: "var(--color-sage)",
          dot: "var(--color-sage)",
        };
      case "finalised":
        return {
          label: "Finalised • Ready to Execute",
          bg: "rgba(201, 162, 39, 0.15)",
          color: "var(--color-navy)",
          border: "var(--color-gold)",
          dot: "var(--color-gold)",
        };
      case "lawyer_review":
        return {
          label: "Under Lawyer Review",
          bg: "rgba(27, 42, 74, 0.1)",
          color: "var(--color-navy)",
          border: "var(--color-slate)",
          dot: "var(--color-slate)",
        };
      case "clarification_requested":
        return {
          label: "Clarification Needed",
          bg: "rgba(225, 29, 72, 0.1)",
          color: "#BE123C",
          border: "#FDA4AF",
          dot: "#E11D48",
        };
      case "draft_ready":
        return {
          label: "Draft Ready for Verification",
          bg: "rgba(59, 81, 115, 0.1)",
          color: "var(--color-slate)",
          border: "var(--color-slate)",
          dot: "var(--color-slate)",
        };
      case "drafting":
      default:
        return {
          label: "Drafting in Progress",
          bg: "rgba(201, 162, 39, 0.12)",
          color: "var(--color-navy)",
          border: "var(--color-gold)",
          dot: "var(--color-gold)",
        };
    }
  };

  const status = getStatusBadge();

  return (
    <>
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid var(--border-subtle)",
          padding: "2rem 0",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            {/* Left Column: Greeting & Identity */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-navy)",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  boxShadow: "0 4px 12px rgba(27, 42, 74, 0.18)",
                  border: "2px solid var(--color-gold)",
                  flexShrink: 0,
                }}
              >
                {initials || "WD"}
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                  <h1
                    style={{
                      fontSize: "1.75rem",
                      fontWeight: 700,
                      color: "var(--color-navy)",
                      margin: 0,
                    }}
                  >
                    Welcome back, {firstName}
                  </h1>

                  {/* Status badge */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "999px",
                      backgroundColor: status.bg,
                      border: `1px solid ${status.border}`,
                      color: status.color,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    <span
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        backgroundColor: status.dot,
                        display: "inline-block",
                      }}
                    ></span>
                    {status.label}
                  </div>
                </div>

                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.875rem",
                    margin: "0.35rem 0 0",
                  }}
                >
                  Estate Portfolio Dashboard • Indian Succession Act 1925 • Plan:{" "}
                  <strong style={{ color: "var(--color-navy)", textTransform: "capitalize" }}>
                    {state.selectedPlan.replace("_", " ")}
                  </strong>
                </p>
              </div>
            </div>

            {/* Right Column: Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", flexWrap: "wrap" }}>
              {/* Preview Will button */}
              <button
                onClick={() => setPreviewOpen(true)}
                style={{
                  padding: "0.6rem 1.15rem",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--border-card)",
                  color: "var(--color-navy)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  transition: "var(--transition)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Preview Will
              </button>

              {/* Edit Will in Wizard link */}
              <Link
                href="/start"
                className="btn btn-gold"
                style={{
                  padding: "0.6rem 1.35rem",
                  fontSize: "0.85rem",
                  borderRadius: "var(--radius-sm)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  textDecoration: "none",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                Edit in Wizard
              </Link>

              {/* Unobtrusive Demo Sandbox Button */}
              <button
                onClick={() => setSandboxOpen(true)}
                title="Open Test Scenario Sandbox & Switcher"
                style={{
                  padding: "0.6rem 0.85rem",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: "rgba(27, 42, 74, 0.05)",
                  border: "1px solid rgba(27, 42, 74, 0.12)",
                  color: "var(--color-navy)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  transition: "var(--transition)",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <span>Sandbox</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <DemoSandboxModal
        isOpen={sandboxOpen}
        onClose={() => setSandboxOpen(false)}
        currentState={state}
        onStateChange={onStateChange}
      />

      <WillPreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        state={state}
      />
    </>
  );
}
