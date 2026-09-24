"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { WillDraftingState } from "@/lib/willDraftingStore";
import {
  Sparkles,
  User,
  Users,
  Landmark,
  PieChart,
  Scale,
  ShieldCheck,
  ScrollText,
  HeartHandshake,
  Search,
  Activity,
  Cpu,
  Tag,
  FileText,
  Check,
  Lock,
} from "lucide-react";

interface WizardSidebarProps {
  currentStep: number;
  onJumpToStep: (step: number) => void;
  state: WillDraftingState;
}

export default function WizardSidebar({
  currentStep,
  onJumpToStep,
  state,
}: WizardSidebarProps) {
  const hasMinors = state.familyMembers.some((f) => f.isMinor);

  const phases = [
    {
      title: "Phase 1: Personal & Family",
      hindiTitle: "व्यक्तिगत एवं परिवार",
      steps: [
        { num: 1, title: "Welcome & Overview", hindi: "स्वागत", icon: Sparkles },
        { num: 2, title: "About You", hindi: "अपनी जानकारी", icon: User },
        { num: 3, title: "My Family", hindi: "परिवार", icon: Users },
      ],
    },
    {
      title: "Phase 2: Estate & Wealth",
      hindiTitle: "संपत्ति एवं धन",
      steps: [
        { num: 4, title: "Assets Register", hindi: "संपत्ति", icon: Landmark },
        { num: 5, title: "Allocations", hindi: "बंटवारा", icon: PieChart },
        { num: 6, title: "Executors", hindi: "प्रबंधक", icon: Scale },
        { num: 7, title: "Testamentary Guardians", hindi: "अभिभावक", icon: ShieldCheck, optionalNote: !hasMinors ? "(No Minors)" : undefined },
      ],
    },
    {
      title: "Phase 3: Directives & Intent",
      hindiTitle: "विशेष इच्छाएं",
      steps: [
        { num: 8, title: "Special Wishes", hindi: "उपहार", icon: ScrollText },
        { num: 9, title: "Emotional Purpose", hindi: "संदेश", icon: HeartHandshake },
      ],
    },
    {
      title: "Phase 4: Verification & Will",
      hindiTitle: "कानूनी वसीयत",
      steps: [
        { num: 10, title: "Full Review", hindi: "समीक्षा", icon: Search },
        { num: 11, title: "Legal Health Check", hindi: "कानूनी जांच", icon: Activity },
        { num: 12, title: "Clause Assembly", hindi: "संकलन", icon: Cpu },
        { num: 13, title: "Plan Selection", hindi: "योजना", icon: Tag },
        { num: 14, title: "Final Will Document", hindi: "मूल वसीयत", icon: FileText },
      ],
    },
  ];

  const totalSteps = 14;
  const progressPercent = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);

  // SVG Circular progress
  const ringRadius = 18;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (progressPercent / 100) * ringCircumference;

  return (
    <aside
      style={{
        width: "260px",
        backgroundColor: "rgba(22, 35, 60, 0.96)",
        backdropFilter: "blur(28px) saturate(190%)",
        color: "#FFFFFF",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        borderRight: "1px solid rgba(255, 255, 255, 0.08)",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
      className="wizard-sidebar-container"
    >
      {/* macOS-style Header & Return Action */}
      <div
        style={{
          padding: "1rem 1rem 0.85rem",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Image
              src="/images/With Text.svg"
              alt="WillDrafting.in"
              width={125}
              height={20}
              style={{ height: "20px", width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }}
              priority
            />
          </Link>

          <Link
            href="/dashboard"
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.8)",
              padding: "0.3rem 0.65rem",
              borderRadius: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              transition: "all 0.15s ease",
            }}
          >
            <span>←</span> Dashboard
          </Link>
        </div>

        {/* Apple Watch style Progress Card */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "16px",
            padding: "0.85rem 1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.85rem",
          }}
        >
          {/* Progress Ring */}
          <div style={{ position: "relative", width: "44px", height: "44px", flexShrink: 0 }}>
            <svg width="44" height="44" viewBox="0 0 44 44" style={{ transform: "rotate(-90deg)" }}>
              <circle
                cx="22"
                cy="22"
                r={ringRadius}
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="22"
                cy="22"
                r={ringRadius}
                stroke="var(--color-gold)"
                strokeWidth="4"
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringOffset}
                strokeLinecap="round"
                fill="none"
                style={{ transition: "stroke-dashoffset 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
              />
            </svg>
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                fontWeight: 800,
                color: "var(--color-gold)",
              }}
            >
              {progressPercent}%
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#FFFFFF" }}>
              Step {currentStep} of {totalSteps}
            </div>
            <div style={{ fontSize: "0.72rem", color: "rgba(255, 255, 255, 0.6)", marginTop: "2px" }}>
              {currentStep === 14 ? "Ready to execute" : "Statutory Questionnaire"}
            </div>
          </div>
        </div>
      </div>

      {/* macOS Translucent Stepper List */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0.75rem 0.65rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {phases.map((phase) => (
          <div key={phase.title}>
            <div
              style={{
                fontSize: "0.64rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "rgba(255, 255, 255, 0.45)",
                marginBottom: "0.3rem",
                paddingLeft: "0.4rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{phase.title}</span>
              <span style={{ opacity: 0.7, fontWeight: 500 }}>{phase.hindiTitle}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
              {phase.steps.map((step) => {
                const isActive = currentStep === step.num;
                const isCompleted = currentStep > step.num;

                return (
                  <button
                    key={step.num}
                    onClick={() => onJumpToStep(step.num)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.55rem",
                      padding: "0.35rem 0.6rem",
                      borderRadius: "10px",
                      backgroundColor: isActive
                        ? "rgba(255, 255, 255, 0.14)"
                        : "transparent",
                      border: "none",
                      color: isActive
                        ? "#FFFFFF"
                        : isCompleted
                        ? "rgba(255, 255, 255, 0.9)"
                        : "rgba(255, 255, 255, 0.48)",
                      cursor: "pointer",
                      fontSize: "0.78rem",
                      fontWeight: isActive ? 700 : 500,
                      textAlign: "left",
                      transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {/* Indicator Dot/Badge */}
                    <span
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        backgroundColor: isActive
                          ? "var(--color-gold)"
                          : isCompleted
                          ? "var(--color-sage)"
                          : "rgba(255, 255, 255, 0.1)",
                        color: isActive ? "var(--color-navy)" : "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        flexShrink: 0,
                        boxShadow: isActive ? "0 0 10px rgba(201, 162, 39, 0.5)" : "none",
                      }}
                    >
                      {isCompleted ? <Check size={12} strokeWidth={3} /> : step.num}
                    </span>

                    {/* Step Icon */}
                    {React.createElement(step.icon, {
                      size: 15,
                      style: {
                        flexShrink: 0,
                        color: isActive ? "var(--color-gold)" : "rgba(255, 255, 255, 0.7)",
                      },
                    })}

                    <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {step.title}
                      </span>
                      {step.hindi && (
                        <span style={{ fontSize: "0.64rem", color: isActive ? "var(--color-gold)" : "rgba(255, 255, 255, 0.45)", lineHeight: 1.1 }}>
                          {step.hindi}
                        </span>
                      )}
                    </div>

                    {step.optionalNote && (
                      <span style={{ fontSize: "0.65rem", color: "rgba(255, 255, 255, 0.35)" }}>
                        {step.optionalNote}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Provenance & Security Footer */}
      <div
        style={{
          padding: "1rem 1.25rem",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          backgroundColor: "rgba(14, 23, 40, 0.7)",
          fontSize: "0.725rem",
          color: "rgba(255, 255, 255, 0.6)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.25rem" }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "var(--color-sage)", boxShadow: "0 0 6px var(--color-sage)" }}></span>
          <span style={{ fontWeight: 600, color: "#FFFFFF" }}>Browser Encrypted Vault</span>
        </div>
        <div>Indian Succession Act 1925 • ISA §30 Compliant</div>
      </div>
    </aside>
  );
}

