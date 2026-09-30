"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { WillDraftingState } from "@/lib/willDraftingStore";
import LanguageToggle from "@/components/ui/LanguageToggle";
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
  ChevronDown,
} from "lucide-react";

interface SidebarStepItem {
  num: number;
  displayNum?: number;
  isWelcome?: boolean;
  title: string;
  hindi: string;
  icon: React.ElementType;
  optionalNote?: string;
}

interface SidebarPhaseItem {
  id: string;
  title: string;
  hindiTitle: string;
  steps: SidebarStepItem[];
}

interface WizardSidebarProps {
  currentStep: number;
  onJumpToStep: (step: number) => void;
  state: WillDraftingState;
  lang?: "en" | "hi";
  onChangeLang?: (lang: "en" | "hi") => void;
}

export default function WizardSidebar({
  currentStep,
  onJumpToStep,
  state,
  lang = "en",
  onChangeLang,
}: WizardSidebarProps) {
  const isHi = lang === "hi";
  const hasMinors = state.familyMembers.some((f) => f.isMinor);

  const phases: SidebarPhaseItem[] = [
    {
      id: "phase-1",
      title: "Phase 1: Personal & Family",
      hindiTitle: "व्यक्तिगत एवं परिवार",
      steps: [
        { num: 1, isWelcome: true, title: "Welcome & Overview", hindi: "स्वागत", icon: Sparkles },
        { num: 2, displayNum: 1, title: "About You", hindi: "अपनी जानकारी", icon: User },
        { num: 3, displayNum: 2, title: "My Family", hindi: "परिवार", icon: Users },
      ],
    },
    {
      id: "phase-2",
      title: "Phase 2: Estate & Wealth",
      hindiTitle: "संपत्ति एवं धन",
      steps: [
        { num: 4, displayNum: 3, title: "Assets Register", hindi: "संपत्ति", icon: Landmark },
        { num: 5, displayNum: 4, title: "Allocations", hindi: "बंटवारा", icon: PieChart },
        { num: 6, displayNum: 5, title: "Executors", hindi: "प्रबंधक", icon: Scale },
        { num: 7, displayNum: 6, title: "Testamentary Guardians", hindi: "अभिभावक", icon: ShieldCheck, optionalNote: !hasMinors ? "(No Minors)" : undefined },
      ],
    },
    {
      id: "phase-3",
      title: "Phase 3: Directives & Intent",
      hindiTitle: "विशेष इच्छाएं",
      steps: [
        { num: 8, displayNum: 7, title: "Special Wishes", hindi: "उपहार", icon: ScrollText },
        { num: 9, displayNum: 8, title: "Emotional Purpose", hindi: "संदेश", icon: HeartHandshake },
      ],
    },
    {
      id: "phase-4",
      title: "Phase 4: Verification & Will",
      hindiTitle: "कानूनी वसीयत",
      steps: [
        { num: 10, displayNum: 9, title: "Full Review", hindi: "समीक्षा", icon: Search },
        { num: 11, displayNum: 10, title: "Legal Health Check", hindi: "कानूनी जांच", icon: Activity },
        { num: 12, displayNum: 11, title: "Clause Assembly", hindi: "संकलन", icon: Cpu },
        { num: 13, displayNum: 12, title: "Plan Selection", hindi: "योजना", icon: Tag },
        { num: 14, displayNum: 13, title: "Final Will Document", hindi: "मूल वसीयत", icon: FileText },
      ],
    },
  ];

  const getActivePhaseId = (stepNum: number) => {
    if (stepNum <= 3) return "phase-1";
    if (stepNum <= 7) return "phase-2";
    if (stepNum <= 9) return "phase-3";
    return "phase-4";
  };

  const [openPhases, setOpenPhases] = useState<Record<string, boolean>>(() => {
    const activeId = getActivePhaseId(currentStep);
    return {
      "phase-1": activeId === "phase-1",
      "phase-2": activeId === "phase-2",
      "phase-3": activeId === "phase-3",
      "phase-4": activeId === "phase-4",
    };
  });

  useEffect(() => {
    const activeId = getActivePhaseId(currentStep);
    setOpenPhases((prev) => ({
      ...prev,
      [activeId]: true,
    }));
  }, [currentStep]);

  const togglePhase = (phaseId: string) => {
    setOpenPhases((prev) => ({
      ...prev,
      [phaseId]: !prev[phaseId],
    }));
  };

  const totalSteps = 13;
  const progressPercent =
    currentStep <= 1
      ? 0
      : Math.min(100, Math.round(((currentStep - 1) / totalSteps) * 100));

  // SVG Circular progress
  const ringRadius = 18;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (progressPercent / 100) * ringCircumference;

  return (
    <aside
      style={{
        width: "260px",
        backgroundColor: "rgba(23, 34, 40, 0.97)",
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
              src="/Logofinal.svg"
              alt="WillDrafting.in"
              width={125}
              height={32}
              style={{ height: "32px", width: "auto", objectFit: "contain" }}
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
            <span>←</span> {isHi ? "डैशबोर्ड" : "Dashboard"}
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
              {currentStep <= 1
                ? (isHi ? "स्वागत एवं अवलोकन" : "Welcome Overview")
                : (isHi ? `चरण ${currentStep - 1} / ${totalSteps}` : `Step ${currentStep - 1} of ${totalSteps}`)}
            </div>
            <div style={{ fontSize: "0.72rem", color: "rgba(255, 255, 255, 0.6)", marginTop: "2px" }}>
              {currentStep === 14
                ? isHi
                  ? "निष्पादन के लिए तैयार"
                  : "Ready to execute"
                : isHi
                ? "कानूनी वसीयत प्रश्नोत्तरी"
                : "Statutory Questionnaire"}
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
          gap: "0.45rem",
        }}
      >
        {phases.map((phase) => {
          const isOpen = !!openPhases[phase.id];
          const hasActiveStep = phase.steps.some((s) => s.num === currentStep);
          const allPhaseCompleted = phase.steps.every((s) => currentStep > s.num);

          return (
            <div
              key={phase.id}
              style={{
                borderRadius: "12px",
                backgroundColor: isOpen ? "rgba(255, 255, 255, 0.03)" : "transparent",
                border: isOpen
                  ? "1px solid rgba(255, 255, 255, 0.07)"
                  : "1px solid transparent",
                transition: "all 0.2s ease",
              }}
            >
              <button
                type="button"
                onClick={() => togglePhase(phase.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.4rem",
                  padding: "0.55rem 0.6rem",
                  borderRadius: "10px",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  color: hasActiveStep
                    ? "#FFFFFF"
                    : allPhaseCompleted
                    ? "rgba(255, 255, 255, 0.85)"
                    : "rgba(255, 255, 255, 0.55)",
                  transition: "background-color 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      color: hasActiveStep ? "var(--color-gold)" : "inherit",
                    }}
                  >
                    {isHi ? phase.hindiTitle : phase.title}
                  </span>
                </div>

                <ChevronDown
                  size={15}
                  style={{
                    flexShrink: 0,
                    opacity: 0.75,
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </button>

              <div
                style={{
                  display: "grid",
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows 0.24s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.15rem",
                      padding: "0.15rem 0.35rem 0.45rem",
                    }}
                  >
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
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        flexShrink: 0,
                        boxShadow: isActive ? "0 0 10px rgba(198, 83, 120, 0.45)" : "none",
                      }}
                    >
                      {isCompleted ? (
                        <Check size={12} strokeWidth={3} />
                      ) : step.isWelcome ? (
                        <Sparkles size={11} strokeWidth={2.5} />
                      ) : (
                        step.displayNum ?? (step.num - 1)
                      )}
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
                        {isHi && step.hindi ? step.hindi : step.title}
                      </span>
                    </div>

                    {step.optionalNote && (
                      <span style={{ fontSize: "0.65rem", color: "rgba(255, 255, 255, 0.45)" }}>
                        {isHi ? "(नाबालिग नहीं)" : step.optionalNote}
                      </span>
                    )}
                  </button>
                );
              })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

