"use client";

import React from "react";import WizardButton from "./button";

import {
  WillDraftingState,
  runLegalHealthCheck,
} from "@/lib/willDraftingStore";
import {
  ShieldCheck,
  AlertTriangle,
  Check,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Scale,
} from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";

interface Step11HealthCheckProps {
  state: WillDraftingState;
  onNext: () => void;
  onBack: () => void;
}

export default function Step11HealthCheck({
  state,
  onNext,
  onBack,
}: Step11HealthCheckProps) {
  const issues = runLegalHealthCheck(state);
  const critical = issues.filter((i) => i.severity === "critical");
  const warnings = issues.filter((i) => i.severity === "warning");
  const passes = issues.filter((i) => i.severity === "pass");

  const hasBlocks = critical.length > 0;
  const score = Math.max(70, 100 - critical.length * 20 - warnings.length * 5);

  // Circular progress
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginBottom: "0.35rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <AudioAssistantButton
              textToSpeak="Our legal check has verified your will against Indian inheritance rules. Your will readiness score is displayed here."
              label="Listen / सुनें 🔊"
            />
            <span style={{ fontSize: "0.75rem", color: "var(--color-slate)" }}>
              Legal requirement check (Under Indian succession law)
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem", flexWrap: "wrap" }}>
          <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
            Legal Health Check Engine
          </h2>
          <span style={{ fontSize: "0.88rem", color: "var(--color-gold)", fontWeight: 600 }}>
            (कानूनी जांच एवं अनुपालन स्कोर)
          </span>
        </div>
      </div>

      {/* Main 2-Column Bento Grid */}
      <div className="healthcheck-grid">
        {/* Left Column: Audit Score Gauge Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            border: "1px solid rgba(27, 42, 74, 0.08)",
            boxShadow: "0 4px 20px rgba(27, 42, 74, 0.03)",
            padding: "1.5rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "1rem",
          }}
        >
          {/* Circular Progress Gauge */}
          <div style={{ position: "relative", width: "110px", height: "110px" }}>
            <svg width="110" height="110" viewBox="0 0 92 92" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="46" cy="46" r={radius} stroke="rgba(27, 42, 74, 0.08)" strokeWidth="8" fill="none" />
              <circle
                cx="46"
                cy="46"
                r={radius}
                stroke={hasBlocks ? "#E11D48" : "var(--color-sage)"}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                style={{ transition: "stroke-dashoffset 0.4s ease" }}
              />
            </svg>
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--color-navy)", lineHeight: 1 }}>
                {score}
              </span>
              <span style={{ fontSize: "0.62rem", color: "var(--text-muted)", fontWeight: 700, marginTop: "3px" }}>
                AUDIT SCORE
              </span>
            </div>
          </div>

          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.2rem 0.65rem",
                borderRadius: "999px",
                backgroundColor: hasBlocks ? "rgba(225, 29, 72, 0.1)" : "rgba(124, 148, 115, 0.15)",
                color: hasBlocks ? "#BE123C" : "var(--color-sage)",
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                marginBottom: "0.45rem",
              }}
            >
              {hasBlocks ? <AlertTriangle size={12} /> : <ShieldCheck size={12} />}
              {hasBlocks ? "Notices Detected" : "Audit Passed"}
            </div>

            <h3 style={{ margin: "0 0 0.25rem", fontSize: "1.05rem", fontWeight: 800, color: "var(--color-navy)" }}>
              {hasBlocks ? "Attention Required" : "Legal Requirements Verified"}
            </h3>
            <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--color-slate)", lineHeight: 1.4 }}>
              {issues.length} legal checkpoints verified according to Indian law.
            </p>
          </div>

          {/* Quick Metrics */}
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.5rem",
              paddingTop: "0.75rem",
              borderTop: "1px solid rgba(27, 42, 74, 0.08)",
            }}
          >
            <div style={{ backgroundColor: "rgba(124, 148, 115, 0.08)", padding: "0.5rem", borderRadius: "10px" }}>
              <span style={{ display: "block", fontSize: "1.1rem", fontWeight: 800, color: "var(--color-sage)" }}>
                {passes.length}
              </span>
              <span style={{ fontSize: "0.68rem", fontWeight: 600, color: "var(--color-navy)" }}>Passed Checks</span>
            </div>
            <div style={{ backgroundColor: "rgba(198, 83, 120, 0.08)", padding: "0.5rem", borderRadius: "10px" }}>
              <span style={{ display: "block", fontSize: "1.1rem", fontWeight: 800, color: "var(--color-gold)" }}>
                {critical.length + warnings.length}
              </span>
              <span style={{ fontSize: "0.68rem", fontWeight: 600, color: "var(--color-navy)" }}>Advisories</span>
            </div>
          </div>
        </div>

        {/* Right Column: Scrollable Checkpoints */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.65rem",
            overflowY: "auto",
            minHeight: 0,
            paddingRight: "0.25rem",
          }}
        >
          {issues.map((issue) => {
            const isCritical = issue.severity === "critical";
            const isWarning = issue.severity === "warning";
            const isPass = issue.severity === "pass";

            return (
              <div
                key={issue.id}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "14px",
                  border: isCritical ? "1.5px solid #FDA4AF" : "1px solid rgba(27, 42, 74, 0.08)",
                  padding: "0.85rem 1.1rem",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    backgroundColor: isCritical ? "#E11D48" : isWarning ? "var(--color-gold)" : "var(--color-sage)",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    flexShrink: 0,
                    marginTop: "0.1rem",
                  }}
                >
                  {isPass ? <Check size={14} strokeWidth={3} /> : <AlertCircle size={14} strokeWidth={2.5} />}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
                    <h4 style={{ margin: 0, fontSize: "0.9rem", fontWeight: 700, color: "var(--color-navy)" }}>
                      {issue.title}
                    </h4>
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        padding: "0.15rem 0.45rem",
                        borderRadius: "5px",
                        textTransform: "uppercase",
                        backgroundColor: isCritical ? "rgba(225, 29, 72, 0.1)" : isWarning ? "rgba(198, 83, 120, 0.12)" : "rgba(124, 148, 115, 0.12)",
                        color: isCritical ? "#E11D48" : isWarning ? "var(--color-gold)" : "var(--color-sage)",
                      }}
                    >
                      {issue.severity}
                    </span>
                  </div>

                  <p style={{ margin: "0.25rem 0 0", fontSize: "0.78rem", color: "var(--color-charcoal)", lineHeight: 1.4 }}>
                    {issue.explanation}
                  </p>

                  {issue.actionRecommendation && (
                    <div
                      style={{
                        fontSize: "0.74rem",
                        color: "var(--color-navy)",
                        backgroundColor: "rgba(27, 42, 74, 0.03)",
                        padding: "0.4rem 0.65rem",
                        borderRadius: "8px",
                        marginTop: "0.35rem",
                        lineHeight: 1.35,
                      }}
                    >
                      <strong>Guidance:</strong> {issue.actionRecommendation}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wizard Button Footer */}
      <WizardButton onBack={onBack} onNext={onNext} />
    </div>
  );
}
