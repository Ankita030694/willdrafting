"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  WillDraftingState,
  loadStoredWillState,
  saveStoredWillState,
  SCENARIO_1_STANDARD_MARRIED,
} from "@/lib/willDraftingStore";
import WizardSidebar from "@/components/wizard/WizardSidebar";
import Step1Welcome from "@/components/wizard/Step1Welcome";
import Step2AboutYou from "@/components/wizard/Step2AboutYou";
import Step3Family from "@/components/wizard/Step3Family";
import Step4Assets from "@/components/wizard/Step4Assets";
import Step5Allocations from "@/components/wizard/Step5Allocations";
import Step6Executors from "@/components/wizard/Step6Executors";
import Step7Guardians from "@/components/wizard/Step7Guardians";
import Step8SpecialWishes from "@/components/wizard/Step8SpecialWishes";
import Step9Motivation from "@/components/wizard/Step9Motivation";
import Step10Review from "@/components/wizard/Step10Review";
import Step11HealthCheck from "@/components/wizard/Step11HealthCheck";
import Step12Assembly from "@/components/wizard/Step12Assembly";
import Step13PlanSelect from "@/components/wizard/Step13PlanSelect";
import Step14FinalWill from "@/components/wizard/Step14FinalWill";

function WizardContent() {
  const searchParams = useSearchParams();
  const stepParam = searchParams.get("step");
  const initialStep = stepParam ? Math.min(14, Math.max(1, parseInt(stepParam, 10))) : 1;

  const [currentStep, setCurrentStep] = useState(initialStep);
  const [state, setState] = useState<WillDraftingState>(SCENARIO_1_STANDARD_MARRIED);
  const [mounted, setMounted] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const loaded = loadStoredWillState();
    setState(loaded);
    setMounted(true);

    const handleStateChange = () => {
      setState(loadStoredWillState());
    };
    window.addEventListener("willdrafting_state_change", handleStateChange);
    return () => {
      window.removeEventListener("willdrafting_state_change", handleStateChange);
    };
  }, []);

  const handleUpdateState = (updater: (prev: WillDraftingState) => WillDraftingState) => {
    setState((prev) => {
      const updated = updater(prev);
      saveStoredWillState(updated);
      return updated;
    });
  };

  const handleStepJump = (step: number) => {
    setCurrentStep(step);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasMinors = state.familyMembers.some((f) => f.isMinor);

  if (!mounted) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "var(--bg-page)",
          color: "var(--color-navy)",
          fontFamily: "var(--font-main)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: "24px",
              height: "24px",
              border: "3px solid var(--border-card)",
              borderTopColor: "var(--color-gold)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <span style={{ fontWeight: 600 }}>Loading Will Questionnaire...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#FAF7F0",
        backgroundImage: "radial-gradient(circle at 10% 20%, rgba(201, 162, 39, 0.05) 0%, transparent 45%), radial-gradient(circle at 90% 80%, rgba(124, 148, 115, 0.05) 0%, transparent 45%)",
      }}
    >
      {/* Desktop Left Sidebar Stepper */}
      <div className="wizard-desktop-sidebar">
        <WizardSidebar
          currentStep={currentStep}
          onJumpToStep={handleStepJump}
          state={state}
        />
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(22, 35, 60, 0.7)",
            backdropFilter: "blur(6px)",
            zIndex: 999,
          }}
          onClick={() => setMobileSidebarOpen(false)}
        >
          <div
            style={{ width: "310px", height: "100%", backgroundColor: "var(--color-navy)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <WizardSidebar
              currentStep={currentStep}
              onJumpToStep={handleStepJump}
              state={state}
            />
          </div>
        </div>
      )}

      {/* Main Questionnaire Stage */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, height: "100%", overflow: "hidden" }}>
        {/* Mobile Header */}
        <div
          className="wizard-mobile-header"
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 1.25rem",
            backgroundColor: "rgba(22, 35, 60, 0.95)",
            backdropFilter: "blur(20px)",
            color: "#FFFFFF",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <button
            onClick={() => setMobileSidebarOpen(true)}
            style={{
              background: "none",
              border: "none",
              color: "#FFFFFF",
              cursor: "pointer",
              padding: "0.35rem",
              display: "flex",
              alignItems: "center",
            }}
            aria-label="Toggle step navigation"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontWeight: 700, fontSize: "0.875rem" }}>
              Step {currentStep} of 14
            </span>
            <span style={{ fontSize: "0.725rem", color: "var(--color-gold)", fontWeight: 700, padding: "0.15rem 0.45rem", borderRadius: "999px", backgroundColor: "rgba(201, 162, 39, 0.15)" }}>
              {Math.round(((currentStep - 1) / 13) * 100)}%
            </span>
          </div>
        </div>

        {/* Content Viewport */}
        <main
          style={{
            flex: 1,
            padding: "0.85rem 1.25rem 1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            width: "100%",
            minWidth: 0,
            boxSizing: "border-box",
            height: "100%",
            overflowY: "auto",
          }}
        >
          <div style={{ width: "100%", minWidth: 0, flex: 1, display: "flex", flexDirection: "column" }}>
          {currentStep === 1 && (
            <Step1Welcome state={state} onNext={() => handleStepJump(2)} />
          )}

          {currentStep === 2 && (
            <Step2AboutYou
              state={state}
              onUpdate={handleUpdateState}
              onNext={() => handleStepJump(3)}
              onBack={() => handleStepJump(1)}
            />
          )}

          {currentStep === 3 && (
            <Step3Family
              state={state}
              onUpdate={handleUpdateState}
              onNext={() => handleStepJump(4)}
              onBack={() => handleStepJump(2)}
            />
          )}

          {currentStep === 4 && (
            <Step4Assets
              state={state}
              onUpdate={handleUpdateState}
              onNext={() => handleStepJump(5)}
              onBack={() => handleStepJump(3)}
            />
          )}

          {currentStep === 5 && (
            <Step5Allocations
              state={state}
              onUpdate={handleUpdateState}
              onNext={() => handleStepJump(6)}
              onBack={() => handleStepJump(4)}
            />
          )}

          {currentStep === 6 && (
            <Step6Executors
              state={state}
              onUpdate={handleUpdateState}
              onNext={() => handleStepJump(hasMinors ? 7 : 8)}
              onBack={() => handleStepJump(5)}
            />
          )}

          {currentStep === 7 && (
            <Step7Guardians
              state={state}
              onUpdate={handleUpdateState}
              onNext={() => handleStepJump(8)}
              onBack={() => handleStepJump(6)}
            />
          )}

          {currentStep === 8 && (
            <Step8SpecialWishes
              state={state}
              onUpdate={handleUpdateState}
              onNext={() => handleStepJump(9)}
              onBack={() => handleStepJump(hasMinors ? 7 : 6)}
            />
          )}

          {currentStep === 9 && (
            <Step9Motivation
              state={state}
              onUpdate={handleUpdateState}
              onNext={() => handleStepJump(10)}
              onBack={() => handleStepJump(8)}
            />
          )}

          {currentStep === 10 && (
            <Step10Review
              state={state}
              onJumpToStep={handleStepJump}
              onNext={() => handleStepJump(11)}
              onBack={() => handleStepJump(9)}
            />
          )}

          {currentStep === 11 && (
            <Step11HealthCheck
              state={state}
              onNext={() => handleStepJump(12)}
              onBack={() => handleStepJump(10)}
            />
          )}

          {currentStep === 12 && (
            <Step12Assembly
              state={state}
              onUpdate={handleUpdateState}
              onNext={() => handleStepJump(13)}
            />
          )}

          {currentStep === 13 && (
            <Step13PlanSelect
              state={state}
              onUpdate={handleUpdateState}
              onNext={() => handleStepJump(14)}
              onBack={() => handleStepJump(11)}
            />
          )}

          {currentStep === 14 && (
            <Step14FinalWill
              state={state}
              onBack={() => handleStepJump(13)}
            />
          )}
          </div>
        </main>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .wizard-desktop-sidebar {
            display: none !important;
          }
          .wizard-mobile-header {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function StartPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "var(--bg-page)",
          }}
        >
          <div style={{ fontWeight: 600, color: "var(--color-navy)" }}>
            Loading Questionnaire...
          </div>
        </div>
      }
    >
      <WizardContent />
    </Suspense>
  );
}
