"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  WillDraftingState,
  setActiveUser,
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
import WizardStepProgressBar from "@/components/wizard/WizardStepProgressBar";
import DevQuickFillBar from "@/components/dev/DevQuickFillBar";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";
import { applyLanguageTranslation } from "@/lib/translations";
import { normalizeWillState } from "@/lib/inputSanitizers";
import { useWillStore } from "@/lib/useWillStore";
import CloudSyncBadge from "@/components/wizard/CloudSyncBadge";
import {
  getStepFromParam,
  getUrlForStep,
  getNextStepNumber,
  getPrevStepNumber,
} from "@/lib/questionnaireFlow";

function WizardContent() {
  const router = useRouter();
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const params = useParams<{ step?: string }>();
  const searchParams = useSearchParams();
  const rawStepParam = params?.step || searchParams.get("step");
  const initialStep = getStepFromParam(rawStepParam);

  const [currentStep, setCurrentStep] = useState(initialStep);
  const state = useWillStore((s) => s.state);
  const [devKey, setDevKey] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const mainRef = React.useRef<HTMLElement | null>(null);

  useEffect(() => {
    setCurrentStep(initialStep);
    if (!rawStepParam || rawStepParam === "dashboard") {
      router.replace("/start/dashboard");
    }
  }, [initialStep, rawStepParam, router]);

  useEffect(() => {
    if (userEmail) {
      setActiveUser(userEmail);
    }
    // Initialize central store session (handles local read + server hydration for guests & users)
    void useWillStore.getState().initSession(userEmail).then(() => {
      if (session?.user) {
        const cur = useWillStore.getState().state;
        if (!cur.detailsVerified) {
          let changed = false;
          const testator = { ...cur.testator };
          if (!testator.fullName && session.user.name) {
            testator.fullName = session.user.name;
            changed = true;
          }
          if (!testator.email && session.user.email) {
            testator.email = session.user.email;
            changed = true;
          }
          if (!testator.phone && session.user.phone) {
            testator.phone = session.user.phone;
            changed = true;
          }
          if (changed) {
            useWillStore.getState().updateState((prev) => ({
              ...prev,
              testator,
            }));
          }
        }
      }
      setMounted(true);
    });
  }, [userEmail, session?.user]);

  const handleChangeLang = (nextLang: "en" | "hi") => {
    setLang(nextLang);
  };

  useEffect(() => {
    const container = mainRef.current;
    if (!container) return;

    const runTranslation = () => {
      applyLanguageTranslation(container, lang === "hi");
    };

    runTranslation();

    let debounceTimer: NodeJS.Timeout;
    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        runTranslation();
      }, 40);
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
      clearTimeout(debounceTimer);
    };
  }, [lang, currentStep, state]);

  const handleUpdateState = (updater: (prev: WillDraftingState) => WillDraftingState) => {
    useWillStore.getState().updateState(updater);
  };

  const handleDevUpdateState = (newState: WillDraftingState) => {
    useWillStore.getState().setFullState(newState);
    setDevKey((prev) => prev + 1);
  };

  const handleStepJump = (step: number) => {
    const clampedStep = Math.min(14, Math.max(1, step));
    setCurrentStep(clampedStep);
    setMobileSidebarOpen(false);
    const targetUrl = getUrlForStep(clampedStep);
    router.push(targetUrl);
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
      className="wizard-shell-root"
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#FAF7F0",
        backgroundImage: "radial-gradient(circle at 10% 20%, rgba(198, 83, 120, 0.05) 0%, transparent 45%), radial-gradient(circle at 90% 80%, rgba(95, 126, 117, 0.05) 0%, transparent 45%)",
      }}
    >
      {/* Desktop Left Sidebar Stepper */}
      <div className="wizard-desktop-sidebar">
        <WizardSidebar
          currentStep={currentStep}
          onJumpToStep={handleStepJump}
          lang={lang}
          onChangeLang={handleChangeLang}
        />
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(23, 34, 40, 0.7)",
            backdropFilter: "blur(6px)",
            zIndex: 999,
          }}
          onClick={() => setMobileSidebarOpen(false)}
        >
          <div
            className="wizard-mobile-drawer-panel"
            style={{ width: "310px", height: "100%", backgroundColor: "var(--color-navy)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <WizardSidebar
              currentStep={currentStep}
              onJumpToStep={handleStepJump}
              lang={lang}
              onChangeLang={handleChangeLang}
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
            padding: "0.75rem 1rem",
            backgroundColor: "rgba(23, 34, 40, 0.95)",
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
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <CloudSyncBadge lang={lang} />
            <LanguageToggle lang={lang} onChangeLang={handleChangeLang} size="sm" />
            {currentStep === 10 && (
              <div className="wizard-mobile-header-step-pill" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <span style={{ fontWeight: 700, fontSize: "0.825rem" }}>
                  {lang === "hi" ? `चरण ${currentStep - 1} / 13` : `Step ${currentStep - 1} of 13`}
                </span>
                <span style={{ fontSize: "0.7rem", color: "var(--color-gold)", fontWeight: 700, padding: "0.15rem 0.45rem", borderRadius: "999px", backgroundColor: "rgba(198, 83, 120, 0.15)" }}>
                  {`${Math.round(((currentStep - 1) / 13) * 100)}%`}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content Viewport */}
        <main
          ref={mainRef}
          className="wizard-main-viewport"
          style={{
            flex: 1,
            padding: "0.85rem 1.25rem 2.5rem",
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
          {/* Progress Bar over Main Step Heading showing progress of filling steps (suppressed on step 10 to eliminate duplicate noise) */}
          {currentStep !== 10 && (
            <WizardStepProgressBar
              currentStep={currentStep}
              onJumpToStep={handleStepJump}
              lang={lang}
            />
          )}

          {/* Dev Quick-Fill Bar (Only visible in Development/Localhost when not locked) */}
          {!state.detailsVerified && (
            <DevQuickFillBar
              currentStep={currentStep}
              onUpdateState={handleDevUpdateState}
              userEmail={userEmail}
            />
          )}

          {state.detailsVerified && currentStep >= 2 && currentStep <= 9 && (
            <div
              className="wizard-locked-banner"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "0.75rem",
                padding: "0.75rem 1.15rem",
                marginBottom: "0.85rem",
                backgroundColor: "#ECFDF5",
                border: "1.5px solid #10B981",
                borderRadius: "14px",
                color: "#065F46",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", fontSize: "0.82rem", fontWeight: 700 }}>
                <span>🔒</span>
                <span>
                  {lang === "hi"
                    ? "वसीयत विवरण OTP द्वारा सत्यापित और स्थायी रूप से लॉक हैं (केवल पढ़ने हेतु)"
                    : "Will Details Verified via OTP & Permanently Locked (Read-Only Mode)"}
                </span>
              </div>
              <div className="wizard-locked-banner-actions" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <button
                  type="button"
                  className="wizard-locked-btn-prev"
                  onClick={() => handleStepJump(getPrevStepNumber(currentStep, hasMinors))}
                  style={{
                    padding: "0.35rem 0.75rem",
                    borderRadius: "8px",
                    border: "1px solid #059669",
                    backgroundColor: "#FFFFFF",
                    color: "#065F46",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  ← {lang === "hi" ? "पिछला चरण" : "Previous Step"}
                </button>
                <button
                  type="button"
                  className="wizard-locked-btn-next"
                  onClick={() => handleStepJump(getNextStepNumber(currentStep, hasMinors))}
                  style={{
                    padding: "0.35rem 0.75rem",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#059669",
                    color: "#FFFFFF",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {lang === "hi" ? "अगला चरण" : "Next Step"} →
                </button>
                <button
                  type="button"
                  className="wizard-locked-btn-review"
                  onClick={() => handleStepJump(10)}
                  style={{
                    padding: "0.35rem 0.75rem",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#172228",
                    color: "#FFFFFF",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {lang === "hi" ? "समीक्षा (चरण 9) →" : "Back to Review →"}
                </button>
              </div>
            </div>
          )}

          <div style={{ width: "100%", minWidth: 0, flex: 1, minHeight: "auto", display: "flex", flexDirection: "column" }}>
          {currentStep === 1 && (
            <Step1Welcome
              key={`step-1-${devKey}`}
              onNext={() => handleStepJump(2)}
              lang={lang}
              onChangeLang={handleChangeLang}
            />
          )}

          {currentStep >= 2 && currentStep <= 9 && (
            <fieldset
              className="wizard-step-fieldset"
              disabled={Boolean(state.detailsVerified)}
              style={{
                border: "none",
                margin: 0,
                padding: 0,
                minWidth: 0,
                minInlineSize: 0,
                width: "100%",
                maxWidth: "100%",
                pointerEvents: state.detailsVerified ? "none" : "auto",
                opacity: state.detailsVerified ? 0.88 : 1,
              }}
            >
              {currentStep === 2 && (
                <Step2AboutYou
                  key={`step-2-${devKey}`}
                  onNext={() => handleStepJump(3)}
                  onBack={() => handleStepJump(1)}
                  lang={lang}
                  onChangeLang={handleChangeLang}
                />
              )}

              {currentStep === 3 && (
                <Step3Family
                  key={`step-3-${devKey}`}
                  onNext={() => handleStepJump(4)}
                  onBack={() => handleStepJump(2)}
                  lang={lang}
                  onChangeLang={handleChangeLang}
                />
              )}

              {currentStep === 4 && (
                <Step4Assets
                  key={`step-4-${devKey}`}
                  onNext={() => handleStepJump(5)}
                  onBack={() => handleStepJump(3)}
                  lang={lang}
                  onChangeLang={handleChangeLang}
                />
              )}

              {currentStep === 5 && (
                <Step5Allocations
                  key={`step-5-${devKey}`}
                  onNext={() => handleStepJump(6)}
                  onBack={() => handleStepJump(4)}
                  lang={lang}
                  onChangeLang={handleChangeLang}
                />
              )}

              {currentStep === 6 && (
                <Step6Executors
                  key={`step-6-${devKey}`}
                  onNext={() => handleStepJump(hasMinors ? 7 : 8)}
                  onBack={() => handleStepJump(5)}
                  lang={lang}
                  onChangeLang={handleChangeLang}
                />
              )}

              {currentStep === 7 && (
                <Step7Guardians
                  key={`step-7-${devKey}`}
                  onNext={() => handleStepJump(8)}
                  onBack={() => handleStepJump(6)}
                  lang={lang}
                  onChangeLang={handleChangeLang}
                />
              )}

              {currentStep === 8 && (
                <Step8SpecialWishes
                  key={`step-8-${devKey}`}
                  onNext={() => handleStepJump(9)}
                  onBack={() => handleStepJump(hasMinors ? 7 : 6)}
                  lang={lang}
                  onChangeLang={handleChangeLang}
                />
              )}

              {currentStep === 9 && (
                <Step9Motivation
                  key={`step-9-${devKey}`}
                  onNext={() => handleStepJump(10)}
                  onBack={() => handleStepJump(8)}
                  lang={lang}
                  onChangeLang={handleChangeLang}
                />
              )}
            </fieldset>
          )}

          {currentStep === 10 && (
            <Step10Review
              key={`step-10-${devKey}`}
              onJumpToStep={handleStepJump}
              onNext={() => handleStepJump(11)}
              onBack={() => handleStepJump(9)}
              lang={lang}
              onChangeLang={handleChangeLang}
            />
          )}

          {currentStep === 11 && (
            <Step11HealthCheck
              key={`step-11-${devKey}`}
              onNext={() => handleStepJump(12)}
              onBack={() => handleStepJump(10)}
              lang={lang}
              onChangeLang={handleChangeLang}
            />
          )}

          {currentStep === 12 && (
            <Step12Assembly
              key={`step-12-${devKey}`}
              onNext={() => {
                const isPaid = session?.user?.paymentStatus === "paid";
                handleStepJump(isPaid ? 14 : 13);
              }}
              lang={lang}
              onChangeLang={handleChangeLang}
            />
          )}

          {currentStep === 13 && (
            <Step13PlanSelect
              key={`step-13-${devKey}`}
              onNext={() => handleStepJump(14)}
              onBack={() => handleStepJump(11)}
              lang={lang}
              onChangeLang={handleChangeLang}
            />
          )}

          {currentStep === 14 && (
            <Step14FinalWill
              key={`step-14-${devKey}`}
              onBack={() => handleStepJump(13)}
              lang={lang}
              onChangeLang={handleChangeLang}
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
          .hide-on-mobile-step {
            display: none !important;
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
