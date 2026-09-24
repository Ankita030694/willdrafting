"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  WillDraftingState,
  loadStoredWillState,
  saveStoredWillState,
  generateWillClauses,
  SCENARIO_1_STANDARD_MARRIED,
} from "@/lib/willDraftingStore";
import VisualStepAboutYou from "./VisualStepAboutYou";
import VisualStepFamily from "./VisualStepFamily";
import VisualStepAssets from "./VisualStepAssets";
import VisualStepAllocations from "./VisualStepAllocations";
import VisualStepExecutors from "./VisualStepExecutors";
import VisualStepFinalWill from "./VisualStepFinalWill";
import {
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  LayoutDashboard,
  RotateCcw,
} from "lucide-react";

const WIZARD_STEPS = [
  { id: 1, label: "Identity", hindi: "पहचान", icon: "👤" },
  { id: 2, label: "Family", hindi: "परिवार", icon: "👨‍👩‍👧" },
  { id: 3, label: "Assets", hindi: "संपत्ति", icon: "🏦" },
  { id: 4, label: "Allocations", hindi: "बंटवारा", icon: "⚖️" },
  { id: 5, label: "Executors", hindi: "प्रबंधक", icon: "🤝" },
  { id: 6, label: "Will Deed", hindi: "वसीयत", icon: "📜" },
];

export default function VisualWillWizard() {
  const [state, setState] = useState<WillDraftingState>(() => {
    const s = loadStoredWillState();
    if (!s.clauses || s.clauses.length === 0) {
      s.clauses = generateWillClauses(s);
    }
    return s;
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const loaded = loadStoredWillState();
    if (!loaded.clauses || loaded.clauses.length === 0) {
      loaded.clauses = generateWillClauses(loaded);
    }
    setState(loaded);
  }, []);

  const handleUpdate = (updater: (prev: WillDraftingState) => WillDraftingState) => {
    setState((prev) => {
      const next = updater(prev);
      next.clauses = generateWillClauses(next);
      saveStoredWillState(next);
      return next;
    });
  };

  const handleNext = () => {
    if (currentStep < 6) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      // Compile clauses whenever moving forward
      setState((prev) => {
        const next = { ...prev, currentStep: nextStep };
        next.clauses = generateWillClauses(next);
        saveStoredWillState(next);
        return next;
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleResetToDemo = () => {
    if (confirm("Reset to Dr. Rohit Srivastava's complete verified will profile?")) {
      const demo = JSON.parse(JSON.stringify(SCENARIO_1_STANDARD_MARRIED));
      demo.clauses = generateWillClauses(demo);
      saveStoredWillState(demo);
      setState(demo);
      setCurrentStep(1);
    }
  };

  if (!isClient) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC" }}>
        <div style={{ color: "var(--color-navy)", fontWeight: 700 }}>Loading visual wizard...</div>
      </div>
    );
  }

  const progressPercent = Math.round(((currentStep - 1) / (WIZARD_STEPS.length - 1)) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", color: "var(--color-navy)" }}>
      {/* Top Floating App Bar */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(27, 42, 74, 0.08)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0.75rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          {/* Logo & Back to Dashboard */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link
              href="/dashboard2"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "var(--color-navy)",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.85rem",
                padding: "0.4rem 0.75rem",
                borderRadius: "10px",
                background: "rgba(27, 42, 74, 0.05)",
              }}
            >
              <ArrowLeft size={14} /> Dashboard
            </Link>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ fontSize: "1.1rem" }}>🏛️</span>
                <span style={{ fontWeight: 800, fontSize: "1.05rem", letterSpacing: "-0.01em", color: "var(--color-navy)" }}>
                  WillDrafting<span style={{ color: "var(--color-gold)" }}>.com</span>
                </span>
                <span style={{ fontSize: "0.7rem", background: "rgba(201, 162, 39, 0.15)", color: "var(--color-navy)", padding: "0.1rem 0.45rem", borderRadius: "8px", fontWeight: 800 }}>
                  EASY BHARAT UX
                </span>
              </div>
            </div>
          </div>

          {/* Legal Readiness Badge & Demo Reset */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.45rem",
                background: "rgba(46, 125, 50, 0.08)",
                border: "1px solid rgba(46, 125, 50, 0.2)",
                padding: "0.35rem 0.75rem",
                borderRadius: "20px",
              }}
            >
              <ShieldCheck size={16} color="#2E7D32" />
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#2E7D32" }}>
                ISA 1925 Legal Shield Active
              </span>
            </div>

            <button
              onClick={handleResetToDemo}
              title="Reset data to Dr. Rohit Srivastava"
              style={{
                background: "none",
                border: "1px solid rgba(27, 42, 74, 0.15)",
                padding: "0.35rem 0.65rem",
                borderRadius: "10px",
                color: "var(--color-slate)",
                fontSize: "0.75rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <RotateCcw size={12} /> Reset Data
            </button>
          </div>
        </div>

        {/* Stepper Navigation Bar */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1rem 0.65rem" }}>
          {/* Visual Step Pills */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "0.5rem",
              overflowX: "auto",
              paddingBottom: "0.25rem",
            }}
          >
            {WIZARD_STEPS.map((step) => {
              const isActive = currentStep === step.id;
              const isPast = currentStep > step.id;

              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setCurrentStep(step.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    padding: "0.45rem 0.85rem",
                    borderRadius: "14px",
                    background: isActive
                      ? "linear-gradient(135deg, var(--color-navy) 0%, #1a2f55 100%)"
                      : isPast
                      ? "rgba(46, 125, 50, 0.08)"
                      : "#FFFFFF",
                    color: isActive ? "#FFFFFF" : isPast ? "#2E7D32" : "var(--color-slate)",
                    border: isActive
                      ? "none"
                      : isPast
                      ? "1px solid rgba(46, 125, 50, 0.25)"
                      : "1px solid rgba(27, 42, 74, 0.1)",
                    cursor: "pointer",
                    fontSize: "0.82rem",
                    fontWeight: isActive || isPast ? 700 : 500,
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    transition: "all 0.15s ease",
                  }}
                >
                  <span style={{ fontSize: "0.95rem" }}>{step.icon}</span>
                  <span>{step.label}</span>
                  <span style={{ fontSize: "0.7rem", opacity: 0.75 }}>({step.hindi})</span>
                  {isPast && <CheckCircle2 size={13} color="#2E7D32" />}
                </button>
              );
            })}
          </div>

          {/* Thin Progress Bar */}
          <div style={{ height: "4px", background: "#E2E8F0", borderRadius: "2px", marginTop: "0.5rem", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${Math.max(5, progressPercent)}%`,
                background: "linear-gradient(90deg, var(--color-gold) 0%, #2E7D32 100%)",
                borderRadius: "2px",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Step Body */}
      <main>
        {currentStep === 1 && (
          <VisualStepAboutYou
            state={state}
            onUpdate={handleUpdate}
            onNext={handleNext}
          />
        )}
        {currentStep === 2 && (
          <VisualStepFamily
            state={state}
            onUpdate={handleUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 3 && (
          <VisualStepAssets
            state={state}
            onUpdate={handleUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 4 && (
          <VisualStepAllocations
            state={state}
            onUpdate={handleUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 5 && (
          <VisualStepExecutors
            state={state}
            onUpdate={handleUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 6 && (
          <VisualStepFinalWill
            state={state}
            onBack={handleBack}
          />
        )}
      </main>
    </div>
  );
}
