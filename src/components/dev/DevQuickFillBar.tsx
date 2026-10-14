// src/components/dev/DevQuickFillBar.tsx
"use client";

import React, { useState, useEffect } from "react";
import { WillDraftingState, resetToBlankState } from "@/lib/willDraftingStore";
import { useWillStore } from "@/lib/useWillStore";
import {
  fillStepDummyData,
  fillAllDummyData,
  clearStepData,
  getStepFillMeta,
} from "@/lib/devDummyData";
import { saveWillStateToServer } from "@/lib/willSync";
import {
  Sparkles,
  Zap,
  RotateCcw,
  Check,
  ChevronDown,
  ChevronUp,
  Layers,
  Wrench,
  Code2,
  Trash2,
} from "lucide-react";

interface DevQuickFillBarProps {
  currentStep: number;
  state?: WillDraftingState;
  onUpdateState?: (newState: WillDraftingState) => void;
  userEmail?: string | null;
}

export default function DevQuickFillBar({
  currentStep,
  state: propState,
  onUpdateState: propOnUpdateState,
  userEmail: propUserEmail,
}: DevQuickFillBarProps) {
  const storeState = useWillStore((s) => s.state);
  const storeSetFullState = useWillStore((s) => s.setFullState);
  const storeEmail = useWillStore((s) => s.userEmail);
  const state = propState || storeState;
  const onUpdateState = propOnUpdateState || storeSetFullState;
  const userEmail = propUserEmail !== undefined ? propUserEmail : storeEmail;
  const [isDev, setIsDev] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    // Only show in development or localhost environments
    const isDevelopment =
      process.env.NODE_ENV !== "production" ||
      (typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1" ||
          window.location.hostname.includes("ngrok") ||
          window.location.hostname.endsWith(".local")));

    setIsDev(isDevelopment);
  }, []);

  // Keyboard shortcut: Alt + D to quick fill current step
  useEffect(() => {
    if (!isDev) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === "d" || e.key === "D")) {
        e.preventDefault();
        handleFillCurrentStep();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  if (!isDev) return null;

  const stepMeta = getStepFillMeta(currentStep);

  const showNotification = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => {
      setFeedback("");
    }, 3500);
  };

  /** Writes to the DB first; the UI/cache is only updated once the DB accepted it. */
  const persist = async (updated: WillDraftingState, okMsg: string) => {
    const r = await saveWillStateToServer(updated);
    if (!r.ok) {
      showNotification(`DB save failed: ${r.error}`);
      return;
    }
    onUpdateState(updated);
    showNotification(`${okMsg} (saved to DB)`);
  };

  const handleFillCurrentStep = () => {
    const updated = fillStepDummyData(currentStep, state, userEmail);
    void persist(updated, `Filled dummy data for Step ${currentStep}: ${stepMeta.title}`);
  };

  const handleFillAll = () => {
    const updated = fillAllDummyData(state, userEmail);
    void persist(updated, "Filled all 14 questionnaire steps with complete sample data!");
  };

  const handleClearCurrentStep = () => {
    const updated = clearStepData(currentStep, state);
    void persist(updated, `Cleared data for Step ${currentStep} (${stepMeta.title})`);
  };

  const handleResetEntireWill = () => {
    const blank = resetToBlankState(userEmail);
    void persist(blank, "Reset entire will to fresh blank state (all steps cleared)!");
  };

  return (
    <div
      style={{
        width: "100%",
        marginBottom: "0.85rem",
        backgroundColor: "#172228",
        border: "1px solid rgba(201, 162, 39, 0.45)",
        borderRadius: "14px",
        boxShadow: "0 8px 24px -6px rgba(23, 34, 40, 0.28)",
        color: "#FFFFFF",
        overflow: "hidden",
        transition: "all 0.2s ease-in-out",
        flexShrink: 0,
        position: "relative",
      }}
    >
      {/* Top Banner Row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.55rem 0.85rem",
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          borderBottom: collapsed ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
          gap: "0.5rem",
          flexWrap: "wrap",
        }}
      >
        {/* Left: Dev Badge & Step Name */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              padding: "0.2rem 0.55rem",
              borderRadius: "6px",
              backgroundColor: "rgba(201, 162, 39, 0.22)",
              color: "#FACC15",
              fontSize: "0.72rem",
              fontWeight: 800,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              border: "1px solid rgba(201, 162, 39, 0.4)",
            }}
          >
            <Zap size={12} fill="#FACC15" />
            Dev Mode
          </span>

          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#F3F4F6" }}>
            Step {currentStep}: {stepMeta.title}
          </span>

          <span style={{ fontSize: "0.74rem", color: "rgba(255, 255, 255, 0.55)" }}>
            • {stepMeta.description}
          </span>
        </div>

        {/* Right: Quick Action Buttons & Collapse */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          {/* Primary Quick Fill Button for Active Step */}
          <button
            type="button"
            onClick={handleFillCurrentStep}
            title={`Fill dummy data for Step ${currentStep} (Shortcut: Alt + D)`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.4rem 0.85rem",
              borderRadius: "8px",
              backgroundColor: "#FACC15",
              color: "#172228",
              fontSize: "0.78rem",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(250, 204, 21, 0.35)",
              transition: "transform 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Zap size={13} fill="#172228" />
            <span>{stepMeta.actionLabel}</span>
            <span
              style={{
                fontSize: "0.65rem",
                opacity: 0.65,
                marginLeft: "0.2rem",
                padding: "0.1rem 0.35rem",
                borderRadius: "4px",
                backgroundColor: "rgba(0,0,0,0.12)",
              }}
            >
              Alt+D
            </span>
          </button>

          {/* Fill All Steps Button */}
          <button
            type="button"
            onClick={handleFillAll}
            title="Populate complete dummy estate across all 14 wizard steps"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              padding: "0.4rem 0.75rem",
              borderRadius: "8px",
              backgroundColor: "rgba(95, 126, 117, 0.28)",
              color: "#A7F3D0",
              fontSize: "0.76rem",
              fontWeight: 600,
              border: "1px solid rgba(95, 126, 117, 0.45)",
              cursor: "pointer",
              transition: "background-color 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(95, 126, 117, 0.4)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(95, 126, 117, 0.28)")}
          >
            <Layers size={13} />
            <span>Fill All 14 Steps</span>
          </button>

          {/* Clear Current Step Button */}
          <button
            type="button"
            onClick={handleClearCurrentStep}
            title="Reset this step's inputs back to 0 data"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              padding: "0.4rem 0.65rem",
              borderRadius: "8px",
              backgroundColor: "rgba(225, 29, 72, 0.15)",
              color: "#FDA4AF",
              fontSize: "0.76rem",
              fontWeight: 600,
              border: "1px solid rgba(225, 29, 72, 0.3)",
              cursor: "pointer",
              transition: "background-color 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(225, 29, 72, 0.25)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(225, 29, 72, 0.15)")}
          >
            <Trash2 size={12} />
            <span>Clear Step</span>
          </button>

          {/* Reset Entire Will Button */}
          <button
            type="button"
            onClick={handleResetEntireWill}
            title="Reset all 14 steps back to fresh blank state"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              padding: "0.4rem 0.65rem",
              borderRadius: "8px",
              backgroundColor: "rgba(225, 29, 72, 0.22)",
              color: "#FDA4AF",
              fontSize: "0.76rem",
              fontWeight: 700,
              border: "1px solid rgba(225, 29, 72, 0.45)",
              cursor: "pointer",
              transition: "background-color 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(225, 29, 72, 0.35)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(225, 29, 72, 0.22)")}
          >
            <RotateCcw size={12} />
            <span>Reset Entire Will</span>
          </button>

          {/* Collapse/Expand Toggle */}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand Dev Bar" : "Collapse Dev Bar"}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255, 255, 255, 0.5)",
              cursor: "pointer",
              padding: "0.25rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>
      </div>

      {/* Expanded Quick-Jump Step Pills Strip (if not collapsed) */}
      {!collapsed && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.4rem 0.85rem",
            overflowX: "auto",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            fontSize: "0.72rem",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.45)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.68rem" }}>
            Step Shortcuts:
          </span>
          {[
            { num: 2, label: "2. About You" },
            { num: 3, label: "3. Family (4)" },
            { num: 4, label: "4. Assets (5)" },
            { num: 5, label: "5. Allocations" },
            { num: 6, label: "6. Executors" },
            { num: 7, label: "7. Guardians" },
            { num: 8, label: "8. Wishes" },
            { num: 9, label: "9. Purpose" },
            { num: 10, label: "10. Review" },
          ].map((item) => (
            <button
              key={item.num}
              type="button"
              onClick={() => {
                const updated = fillStepDummyData(item.num, state, userEmail);
                void persist(updated, `Quick-filled data for ${item.label}!`);
              }}
              style={{
                background: currentStep === item.num ? "rgba(250, 204, 21, 0.2)" : "rgba(255, 255, 255, 0.06)",
                border: currentStep === item.num ? "1px solid #FACC15" : "1px solid rgba(255, 255, 255, 0.1)",
                color: currentStep === item.num ? "#FACC15" : "rgba(255, 255, 255, 0.75)",
                padding: "0.2rem 0.5rem",
                borderRadius: "6px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontSize: "0.7rem",
                fontWeight: currentStep === item.num ? 700 : 500,
                transition: "all 0.15s ease",
              }}
            >
              ⚡ Fill {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Floating feedback toast */}
      {feedback && (
        <div
          style={{
            position: "absolute",
            bottom: "6px",
            right: "12px",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            backgroundColor: "#10B981",
            color: "#FFFFFF",
            padding: "0.25rem 0.75rem",
            borderRadius: "6px",
            fontSize: "0.74rem",
            fontWeight: 700,
            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.4)",
            animation: "fadeIn 0.2s ease-in-out",
            zIndex: 20,
          }}
        >
          <Check size={13} strokeWidth={3} />
          <span>{feedback}</span>
        </div>
      )}
    </div>
  );
}
