"use client";

import React, { useState } from "react";
import { WillDraftingState } from "@/lib/willDraftingStore";
import { Check, Sparkles, ChevronRight } from "lucide-react";

export interface StepMeta {
  stepNum: number;
  displayNum: number;
  title: string;
  hindiTitle: string;
  phaseId: string;
  phaseTitle: string;
  hindiPhaseTitle: string;
}

export const WIZARD_PROGRESS_STEPS: StepMeta[] = [
  { stepNum: 2, displayNum: 1, title: "About You", hindiTitle: "अपनी जानकारी", phaseId: "p1", phaseTitle: "Phase 1: Personal & Family", hindiPhaseTitle: "चरण 1: व्यक्तिगत एवं परिवार" },
  { stepNum: 3, displayNum: 2, title: "My Family", hindiTitle: "परिवार", phaseId: "p1", phaseTitle: "Phase 1: Personal & Family", hindiPhaseTitle: "चरण 1: व्यक्तिगत एवं परिवार" },
  { stepNum: 4, displayNum: 3, title: "Assets Register", hindiTitle: "संपत्ति", phaseId: "p2", phaseTitle: "Phase 2: Estate & Wealth", hindiPhaseTitle: "चरण 2: संपत्ति एवं धन" },
  { stepNum: 5, displayNum: 4, title: "Allocations", hindiTitle: "बंटवारा", phaseId: "p2", phaseTitle: "Phase 2: Estate & Wealth", hindiPhaseTitle: "चरण 2: संपत्ति एवं धन" },
  { stepNum: 6, displayNum: 5, title: "Executors", hindiTitle: "प्रबंधक", phaseId: "p2", phaseTitle: "Phase 2: Estate & Wealth", hindiPhaseTitle: "चरण 2: संपत्ति एवं धन" },
  { stepNum: 7, displayNum: 6, title: "Guardians", hindiTitle: "अभिभावक", phaseId: "p2", phaseTitle: "Phase 2: Estate & Wealth", hindiPhaseTitle: "चरण 2: संपत्ति एवं धन" },
  { stepNum: 8, displayNum: 7, title: "Special Wishes", hindiTitle: "विशेष इच्छाएं", phaseId: "p3", phaseTitle: "Phase 3: Directives & Intent", hindiPhaseTitle: "चरण 3: विशेष इच्छाएं" },
  { stepNum: 9, displayNum: 8, title: "Emotional Purpose", hindiTitle: "संदेश", phaseId: "p3", phaseTitle: "Phase 3: Directives & Intent", hindiPhaseTitle: "चरण 3: विशेष इच्छाएं" },
  { stepNum: 10, displayNum: 9, title: "Full Review", hindiTitle: "समीक्षा", phaseId: "p4", phaseTitle: "Phase 4: Verification & Will", hindiPhaseTitle: "चरण 4: कानूनी वसीयत" },
  { stepNum: 11, displayNum: 10, title: "Health Check", hindiTitle: "कानूनी जांच", phaseId: "p4", phaseTitle: "Phase 4: Verification & Will", hindiPhaseTitle: "चरण 4: कानूनी वसीयत" },
  { stepNum: 12, displayNum: 11, title: "Clause Assembly", hindiTitle: "संकलन", phaseId: "p4", phaseTitle: "Phase 4: Verification & Will", hindiPhaseTitle: "चरण 4: कानूनी वसीयत" },
  { stepNum: 13, displayNum: 12, title: "Plan Select", hindiTitle: "योजना", phaseId: "p4", phaseTitle: "Phase 4: Verification & Will", hindiPhaseTitle: "चरण 4: कानूनी वसीयत" },
  { stepNum: 14, displayNum: 13, title: "Final Will", hindiTitle: "मूल वसीयत", phaseId: "p4", phaseTitle: "Phase 4: Verification & Will", hindiPhaseTitle: "चरण 4: कानूनी वसीयत" },
];

function isStepDataFilled(stepNum: number, state: WillDraftingState): boolean {
  switch (stepNum) {
    case 2:
      return Boolean(state.testator?.fullName && state.testator.fullName.trim().length > 2);
    case 3:
      return Boolean(state.familyMembers && state.familyMembers.length > 0);
    case 4:
      return Boolean(state.assets && state.assets.length > 0);
    case 5:
      return Boolean(state.allocations && state.allocations.length > 0);
    case 6:
      return Boolean(state.executorPrimary?.name && state.executorPrimary.name.trim().length > 0);
    case 7:
      return (
        !state.familyMembers?.some((f) => f.isMinor) ||
        Boolean(state.guardianPrimary?.name && state.guardianPrimary.name.trim().length > 0)
      );
    case 8:
      return Boolean(
        state.specialWishes?.funeralCeremonyWishes ||
        state.specialWishes?.digitalAccounts ||
        state.specialWishes?.jewelleryInstructions ||
        state.specialWishes?.hasNoSpecialWishes
      );
    case 9:
      return Boolean(state.emotionalReason && state.emotionalReason.trim().length > 0);
    case 10:
    case 11:
    case 12:
      return false;
    case 13:
      return Boolean(state.selectedPlan);
    case 14:
      return false;
    default:
      return false;
  }
}

interface WizardStepProgressBarProps {
  currentStep: number;
  onJumpToStep: (step: number) => void;
  state: WillDraftingState;
  lang?: "en" | "hi";
}

export default function WizardStepProgressBar({
  currentStep,
  onJumpToStep,
  state,
  lang = "en",
}: WizardStepProgressBarProps) {
  const isHi = lang === "hi";
  const [hoveredStep, setHoveredStep] = useState<StepMeta | null>(null);

  const totalSteps = 13;
  const currentMeta = WIZARD_PROGRESS_STEPS.find((s) => s.stepNum === currentStep) || null;
  const currentDisplayNum = currentMeta ? currentMeta.displayNum : currentStep <= 1 ? 0 : 13;

  // Progress percentage matching sidebar and mobile header
  const progressPercent =
    currentStep <= 1
      ? 0
      : Math.min(100, Math.round(((currentStep - 1) / totalSteps) * 100));

  // Count how many steps have either been passed or filled with data
  const filledStepsCount = WIZARD_PROGRESS_STEPS.filter(
    (s) => currentStep > s.stepNum || isStepDataFilled(s.stepNum, state)
  ).length;

  const nextStep = WIZARD_PROGRESS_STEPS.find((s) => s.stepNum === currentStep + 1);

  return (
    <div
      role="progressbar"
      aria-valuenow={progressPercent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={isHi ? "प्रश्नोत्तरी प्रगति बार" : "Questionnaire Progress Bar"}
      style={{
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(23, 34, 40, 0.08)",
        borderRadius: "16px",
        padding: "0.6rem 0.95rem 0.65rem",
        boxShadow: "0 2px 10px rgba(23, 34, 40, 0.03)",
        marginBottom: "0.65rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.45rem",
        transition: "all 0.25s ease",
      }}
    >
      {/* Top Meta Details Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        {/* Left: Phase and Current Step info */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          {currentStep <= 1 ? (
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                padding: "0.15rem 0.55rem",
                borderRadius: "999px",
                backgroundColor: "rgba(198, 83, 120, 0.12)",
                color: "var(--color-gold)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              <Sparkles size={11} />
              {isHi ? "शुरुआत" : "Getting Started"}
            </span>
          ) : (
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                padding: "0.15rem 0.55rem",
                borderRadius: "999px",
                backgroundColor: "rgba(95, 126, 117, 0.12)",
                color: "var(--color-sage)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {isHi ? currentMeta?.hindiPhaseTitle : currentMeta?.phaseTitle}
            </span>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--color-navy)" }}>
              {currentStep <= 1
                ? isHi
                  ? "स्वागत एवं अवलोकन"
                  : "Welcome & Overview"
                : isHi
                ? `चरण ${currentDisplayNum} / ${totalSteps}: ${currentMeta?.hindiTitle}`
                : `Step ${currentDisplayNum} of ${totalSteps}: ${currentMeta?.title}`}
            </span>

            {nextStep && (
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "#6B7280",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.2rem",
                  marginLeft: "0.35rem",
                }}
                className="hidden sm:inline-flex"
              >
                <ChevronRight size={12} />
                {isHi ? `आगे: ${nextStep.hindiTitle}` : `Next: ${nextStep.title}`}
              </span>
            )}
          </div>
        </div>

        {/* Right: Filled counter & Percentage Pill */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "var(--color-slate)",
            }}
            className="hidden sm:inline-block"
          >
            {isHi
              ? `${filledStepsCount} / ${totalSteps} चरण भरे गए`
              : `${filledStepsCount} of ${totalSteps} Steps Filled`}
          </span>

          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 800,
              padding: "0.18rem 0.55rem",
              borderRadius: "999px",
              backgroundColor: "rgba(198, 83, 120, 0.12)",
              color: "var(--color-gold)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "var(--color-gold)",
                display: "inline-block",
                boxShadow: "0 0 6px rgba(198, 83, 120, 0.7)",
              }}
            />
            {progressPercent}% {isHi ? "पूर्ण" : "Completed"}
          </span>
        </div>
      </div>

      {/* 13-Segment Responsive Interactive Track */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${totalSteps}, minmax(0, 1fr))`,
          gap: "4px",
          alignItems: "center",
          width: "100%",
          paddingTop: "2px",
        }}
      >
        {WIZARD_PROGRESS_STEPS.map((step) => {
          const isCurrent = currentStep === step.stepNum;
          const isPast = currentStep > step.stepNum;
          const hasData = isStepDataFilled(step.stepNum, state);
          const isCompleted = isPast || hasData;
          const canClick = isPast || hasData || isCurrent;

          let bg = "rgba(23, 34, 40, 0.08)";
          let height = "6px";
          let boxShadow = "none";

          if (isCurrent) {
            bg = "linear-gradient(90deg, #C65378 0%, #E06D92 100%)";
            height = "7px";
            boxShadow = "0 0 8px rgba(198, 83, 120, 0.55)";
          } else if (isCompleted) {
            bg = "linear-gradient(90deg, #5F7E75 0%, #7C9473 100%)";
          }

          const tooltip = isHi
            ? `चरण ${step.displayNum}: ${step.hindiTitle} ${
                isCurrent
                  ? "(वर्तमान चरण - भरा जा रहा है)"
                  : isCompleted
                  ? "(पूर्ण - संपादित करने हेतु क्लिक करें)"
                  : "(आगामी चरण)"
              }`
            : `Step ${step.displayNum}: ${step.title} ${
                isCurrent
                  ? "(Active Step - In Progress)"
                  : isCompleted
                  ? "(Completed - Click to view)"
                  : "(Upcoming Step)"
              }`;

          return (
            <button
              key={step.stepNum}
              type="button"
              onClick={() => {
                if (canClick) {
                  onJumpToStep(step.stepNum);
                }
              }}
              onMouseEnter={() => setHoveredStep(step)}
              onMouseLeave={() => setHoveredStep(null)}
              title={tooltip}
              aria-label={tooltip}
              style={{
                background: bg,
                height,
                borderRadius: "999px",
                border: "none",
                padding: 0,
                margin: 0,
                cursor: canClick ? "pointer" : "default",
                transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                outline: "none",
                position: "relative",
                boxShadow,
              }}
            />
          );
        })}
      </div>

      {/* Floating Hover Step Info (if hovering a step) */}
      {hoveredStep && (
        <div
          style={{
            fontSize: "0.68rem",
            color: "var(--color-navy)",
            backgroundColor: "rgba(250, 247, 240, 0.95)",
            padding: "0.15rem 0.5rem",
            borderRadius: "6px",
            alignSelf: "flex-start",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            fontWeight: 600,
            border: "1px solid rgba(23, 34, 40, 0.08)",
          }}
        >
          <span>
            {isHi
              ? `चरण ${hoveredStep.displayNum}: ${hoveredStep.hindiTitle}`
              : `Step ${hoveredStep.displayNum}: ${hoveredStep.title}`}
          </span>
          <span style={{ color: "#6B7280", fontWeight: 500 }}>
            {currentStep === hoveredStep.stepNum
              ? isHi
                ? "• सक्रिय चरण"
                : "• Current Step"
              : currentStep > hoveredStep.stepNum || isStepDataFilled(hoveredStep.stepNum, state)
              ? isHi
                ? "• पूर्ण (क्लिक कर सकते हैं)"
                : "• Completed (Click to jump)"
              : isHi
                ? "• आगामी चरण"
                : "• Upcoming"}
          </span>
        </div>
      )}
    </div>
  );
}
