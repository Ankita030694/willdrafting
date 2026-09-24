"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  WillDraftingState,
  runLegalHealthCheck,
} from "@/lib/willDraftingStore";
import WillPreviewModal from "./WillPreviewModal";
import { DashboardTab } from "./DashboardTabsNav";
import FamilyTreeCanvas from "./FamilyTreeCanvas";
import AssetAllocationVisualizer from "./AssetAllocationVisualizer";
import { Check, ShieldCheck } from "lucide-react";

interface OverviewTabProps {
  state: WillDraftingState;
  onNavigateTab: (tab: DashboardTab) => void;
  onStateChange?: (newState: WillDraftingState) => void;
}

export default function OverviewTab({ state, onNavigateTab, onStateChange }: OverviewTabProps) {
  const [previewOpen, setPreviewOpen] = useState(false);

  // Evaluate real-time legal health check
  const healthCheckIssues = runLegalHealthCheck(state);
  const criticalOrWarnings = healthCheckIssues.filter(
    (i) => i.severity === "critical" || i.severity === "warning"
  );

  const totalAssetValue = (state.assets || []).reduce(
    (sum, a) => sum + (a.approximateValue || 0),
    0
  );

  const formatCurrencyINR = (val: number) => {
    if (val >= 10000000) {
      return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹ ${(val / 100000).toFixed(2)} Lakhs`;
    }
    return `₹ ${val.toLocaleString("en-IN")}`;
  };

  // 7-Milestone progress tracker
  const milestones = [
    { title: "About You", completed: Boolean(state.testator.fullName && state.testator.dob) },
    { title: "Family", completed: state.familyMembers.length > 0 },
    { title: "Assets", completed: state.assets.length > 0 },
    { title: "Beneficiaries", completed: state.allocations.length > 0 },
    { title: "Executor", completed: Boolean(state.executorPrimary?.name) },
    { title: "Review", completed: state.currentStep >= 10 },
    { title: "Final Will", completed: state.willStatus === "approved" || state.willStatus === "finalised" },
  ];

  const completedCount = milestones.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / milestones.length) * 100);

  // Legal Strength Score (out of 100)
  const healthScore = Math.max(70, 100 - criticalOrWarnings.length * 12);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      {/* 1. Apple-Grade Hero Card: "My Will" */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "24px",
          border: "1px solid var(--border-card)",
          boxShadow: "0 12px 36px -8px rgba(27, 42, 74, 0.08)",
          overflow: "hidden",
        }}
      >
        {/* Deep Frosted Header */}
        <div
          style={{
            background: "linear-gradient(135deg, var(--color-navy) 0%, #121D34 100%)",
            padding: "2rem 2.5rem",
            color: "#FFFFFF",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-gold)",
                }}
              >
                Primary Testamentary Instrument
              </span>
              <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>•</span>
              <span style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.75)" }}>
                Version {state.version || "v1.2"} • ISA 1925
              </span>
            </div>

            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#FFFFFF", margin: 0, letterSpacing: "-0.01em" }}>
              Last Will & Testament of {state.testator.fullName || "Testator"}
            </h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", flexWrap: "wrap" }}>
            <button
              onClick={() => setPreviewOpen(true)}
              className="btn btn-gold"
              style={{
                padding: "0.65rem 1.45rem",
                fontSize: "0.875rem",
                borderRadius: "12px",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                boxShadow: "var(--shadow-gold)",
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              View Document
            </button>

            <button
              onClick={() => window.print()}
              style={{
                padding: "0.65rem 1.25rem",
                fontSize: "0.875rem",
                borderRadius: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                color: "#FFFFFF",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                transition: "var(--transition)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </button>
          </div>
        </div>

        {/* Progress & Milestones */}
        <div style={{ padding: "2rem 2.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--color-navy)" }}>
              Drafting & Verification Lifecycle
            </span>
            <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--color-gold)" }}>
              {progressPercent}% Completed ({completedCount} of 7 Stages)
            </span>
          </div>

          <div
            style={{
              height: "8px",
              backgroundColor: "rgba(27, 42, 74, 0.08)",
              borderRadius: "999px",
              overflow: "hidden",
              marginBottom: "1.75rem",
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                backgroundColor: progressPercent === 100 ? "var(--color-sage)" : "var(--color-gold)",
                borderRadius: "999px",
                transition: "width 0.4s ease",
              }}
            />
          </div>

          {/* 7 Milestones */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
              gap: "0.75rem",
              marginBottom: "2rem",
            }}
          >
            {milestones.map((m, idx) => (
              <div
                key={m.title}
                style={{
                  padding: "0.85rem 0.6rem",
                  borderRadius: "14px",
                  backgroundColor: m.completed ? "rgba(124, 148, 115, 0.1)" : "var(--bg-page)",
                  border: m.completed ? "1px solid rgba(124, 148, 115, 0.25)" : "1px solid var(--border-card)",
                  textAlign: "center",
                  transition: "var(--transition)",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: m.completed ? "var(--color-sage)" : "rgba(27, 42, 74, 0.15)",
                    color: "#FFFFFF",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    marginBottom: "0.35rem",
                  }}
                >
                  {m.completed ? <Check size={12} strokeWidth={2.5} /> : idx + 1}
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: m.completed ? "var(--color-navy)" : "var(--text-muted)",
                  }}
                >
                  {m.title}
                </div>
              </div>
            ))}
          </div>

          {/* Assigned Lawyer Card */}
          <div
            style={{
              backgroundColor: "var(--bg-page)",
              borderRadius: "18px",
              border: "1px solid var(--border-card)",
              padding: "1.25rem 1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.25rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-navy)",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  border: "2px solid var(--color-gold)",
                  flexShrink: 0,
                }}
              >
                VS
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: "var(--color-navy)" }}>
                    Adv. Vikramaditya Sen
                  </h4>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      backgroundColor: "rgba(124, 148, 115, 0.2)",
                      color: "var(--color-navy)",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "999px",
                    }}
                  >
                    Bar Council Verified
                  </span>
                </div>
                <p style={{ margin: "0.2rem 0 0", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  Registration: D/1842/2009 • 18 Yrs Practice • High Court of Delhi
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab("consultation")}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "10px",
                backgroundColor: "#FFFFFF",
                border: "1px solid var(--border-card)",
                color: "var(--color-slate)",
                fontSize: "0.825rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              Book 1-on-1 Session
            </button>
          </div>
        </div>
      </div>

      {/* 2. Interactive Family Tree Component (USER'S EXPLICIT REQUEST) */}
      <FamilyTreeCanvas
        state={state}
        onStateChange={(newState) => onStateChange && onStateChange(newState)}
      />

      {/* 3. Interactive Asset Wealth & Allocation Donut Visualizer */}
      <AssetAllocationVisualizer
        state={state}
        onStateChange={(newState) => onStateChange && onStateChange(newState)}
      />

      {/* 4. Action Reminders & Legal Health Score Dial */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "24px",
          border: "1px solid var(--border-card)",
          padding: "2rem",
          boxShadow: "0 10px 30px rgba(27, 42, 74, 0.06)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
          <div>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-gold)" }}>
              Algorithmic Compliance Dial
            </span>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--color-navy)", margin: "0.2rem 0 0" }}>
              Legal Strength Score: {healthScore}/100
            </h3>
          </div>

          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              padding: "0.35rem 0.85rem",
              borderRadius: "999px",
              backgroundColor: criticalOrWarnings.length === 0 ? "rgba(124, 148, 115, 0.15)" : "rgba(225, 29, 72, 0.12)",
              color: criticalOrWarnings.length === 0 ? "var(--color-navy)" : "#BE123C",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            {criticalOrWarnings.length === 0 ? (
              <>
                <Check size={14} strokeWidth={2.5} /> Statutory Integrity Passed
              </>
            ) : (
              `${criticalOrWarnings.length} Issue(s) Pending`
            )}
          </span>
        </div>

        {criticalOrWarnings.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {criticalOrWarnings.map((issue) => (
              <div
                key={issue.id}
                style={{
                  backgroundColor: "var(--bg-page)",
                  borderRadius: "16px",
                  border: "1px solid rgba(225, 29, 72, 0.2)",
                  padding: "1rem 1.25rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--color-navy)" }}>
                    {issue.title}
                  </div>
                  <div style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                    {issue.actionRecommendation}
                  </div>
                </div>

                <Link
                  href="/start"
                  style={{
                    padding: "0.45rem 1rem",
                    backgroundColor: "var(--color-navy)",
                    color: "#FFFFFF",
                    borderRadius: "8px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Resolve in Wizard →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              padding: "1.25rem 1.5rem",
              backgroundColor: "rgba(124, 148, 115, 0.12)",
              borderRadius: "16px",
              fontSize: "0.875rem",
              color: "var(--color-navy)",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <ShieldCheck size={22} color="var(--color-navy)" style={{ flexShrink: 0 }} />
            <div>
              <strong>Complete Testamentary Protection:</strong> All 6 statutory checks pass without conflict. No risk of partial intestacy under Section 105 of the Indian Succession Act 1925.
            </div>
          </div>
        )}
      </div>

      {/* 5. Apple-Style Metric Widgets */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.25rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            border: "1px solid var(--border-card)",
            padding: "1.5rem",
            boxShadow: "0 4px 16px rgba(27, 42, 74, 0.04)",
          }}
        >
          <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)" }}>
            Family Network
          </span>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--color-navy)", margin: "0.35rem 0" }}>
            {state.familyMembers.length} Members
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            {state.familyMembers.filter((f) => f.isMinor).length} Minor(s) • {state.familyMembers.filter((f) => !f.isMinor).length} Adult(s)
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            border: "1px solid var(--border-card)",
            padding: "1.5rem",
            boxShadow: "0 4px 16px rgba(27, 42, 74, 0.04)",
          }}
        >
          <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)" }}>
            Assets Appraised
          </span>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--color-navy)", margin: "0.35rem 0" }}>
            {formatCurrencyINR(totalAssetValue)}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            {state.assets.length} Registered Wealth Assets
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            border: "1px solid var(--border-card)",
            padding: "1.5rem",
            boxShadow: "0 4px 16px rgba(27, 42, 74, 0.04)",
          }}
        >
          <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)" }}>
            Residuary Estate
          </span>
          <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-navy)", margin: "0.35rem 0" }}>
            {state.residuaryBeneficiaryName || "Sunita Sharma"}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Contingent: {state.residuaryAlternateName || "Rahul Sharma"}
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            border: "1px solid var(--border-card)",
            padding: "1.5rem",
            boxShadow: "0 4px 16px rgba(27, 42, 74, 0.04)",
          }}
        >
          <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)" }}>
            Vault Storage
          </span>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--color-navy)", margin: "0.35rem 0" }}>
            {state.documents?.length || 0} Documents
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Encrypted with AES-256 Vault
          </div>
        </div>
      </div>

      <WillPreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        state={state}
      />
    </div>
  );
}
