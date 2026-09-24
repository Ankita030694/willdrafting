"use client";

import React, { useState, useEffect } from "react";
import { WillDraftingState, generateWillClauses } from "@/lib/willDraftingStore";
import { Cpu, Check, Sparkles, ArrowRight } from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";

interface Step12AssemblyProps {
  state: WillDraftingState;
  onUpdate: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
}

export default function Step12Assembly({
  state,
  onUpdate,
  onNext,
}: Step12AssemblyProps) {
  const [progress, setProgress] = useState(15);
  const [currentStageText, setCurrentStageText] = useState("Initializing Legal Decision Matrix...");

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(40);
      setCurrentStageText("Harmonizing Personal Law with Indian Succession Act 1925...");
    }, 600);

    const timer2 = setTimeout(() => {
      setProgress(70);
      setCurrentStageText("Compiling Asset Schedules & Formulating Residuary Devise...");
    }, 1300);

    const timer3 = setTimeout(() => {
      setProgress(90);
      setCurrentStageText("Structuring Attestation Clause & Section 63 Witness Block...");
    }, 2000);

    const timer4 = setTimeout(() => {
      setProgress(100);
      setCurrentStageText("Will Document Successfully Assembled & Legally Certified!");

      onUpdate((prev) => ({
        ...prev,
        clauses: generateWillClauses(prev),
        willStatus: prev.willStatus === "drafting" ? "draft_ready" : prev.willStatus,
      }));
    }, 2700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onUpdate]);

  const stages = [
    { label: "1. Raw Structured Questionnaire Ingestion", completed: progress >= 20 },
    { label: "2. Statutory Personal Law & Succession Act Matrix", completed: progress >= 40 },
    { label: "3. Asset Schedules & Percentage Apportionment", completed: progress >= 70 },
    { label: "4. Section 102 Residuary Devise & Fiduciary Appointments", completed: progress >= 90 },
    { label: "5. Section 63 Attestation, Testimonium & Execution Block", completed: progress >= 100 },
  ];

  return (
    <div
      style={{
        maxWidth: "640px",
        margin: "1rem auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "1.75rem",
      }}
    >
      {/* Central Apple Glowing Icon */}
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "24px",
          background: "linear-gradient(135deg, var(--color-navy), var(--color-slate))",
          color: "var(--color-gold)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2.25rem",
          boxShadow: "0 12px 30px rgba(27, 42, 74, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
          position: "relative",
        }}
      >
        <Cpu size={36} color="var(--color-gold)" />
      </div>

      <div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.3rem 0.75rem", borderRadius: "999px", backgroundColor: "rgba(201, 162, 39, 0.12)", color: "var(--color-navy)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-gold)" }}></span>
          Step 12 of 14 • Dynamic Clause Compiler
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.5rem" }}>
          <AudioAssistantButton
            textToSpeak="Assembling your legal instrument under the Indian Succession Act 1925. Our automated legal compiler is formatting all clauses, schedules, and witness blocks."
            label="Listen / सुनें 🔊"
          />
        </div>
        <h2 style={{ fontSize: "2.1rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
          Assembling Your Legal Instrument
        </h2>
        <div style={{ fontSize: "0.95rem", color: "#8A6D1B", fontWeight: 600, marginTop: "0.25rem" }}>
          (कानूनी वसीयतनामा का संकलन एवं प्रमाणीकरण)
        </div>
        <p style={{ fontSize: "0.95rem", color: "var(--color-slate)", margin: "0.5rem 0 0", minHeight: "24px" }}>
          {currentStageText}
        </p>
      </div>

      {/* Apple Minimalist Progress Bar */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <div
          style={{
            height: "8px",
            backgroundColor: "rgba(27, 42, 74, 0.08)",
            borderRadius: "999px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: progress === 100 ? "var(--color-sage)" : "linear-gradient(90deg, var(--color-navy), var(--color-gold))",
              borderRadius: "999px",
              transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
          <span>Compilation Pipeline</span>
          <span>{progress}%</span>
        </div>
      </div>

      {/* Pipeline Steps Inset Group */}
      <div
        style={{
          width: "100%",
          background: "#FFFFFF",
          borderRadius: "22px",
          border: "1px solid rgba(27, 42, 74, 0.08)",
          boxShadow: "0 4px 24px rgba(27, 42, 74, 0.03)",
          padding: "1.25rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          textAlign: "left",
        }}
      >
        {stages.map((stg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem 1rem",
              borderRadius: "14px",
              backgroundColor: stg.completed ? "rgba(124, 148, 115, 0.1)" : "rgba(27, 42, 74, 0.02)",
              border: stg.completed ? "1px solid rgba(124, 148, 115, 0.25)" : "1px solid transparent",
              transition: "all 0.3s ease",
            }}
          >
            <span style={{ fontSize: "0.85rem", fontWeight: stg.completed ? 700 : 500, color: stg.completed ? "var(--color-navy)" : "var(--color-slate)" }}>
              {stg.label}
            </span>

            <span
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                backgroundColor: stg.completed ? "var(--color-sage)" : "rgba(27, 42, 74, 0.1)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                fontWeight: 800,
              }}
            >
              {stg.completed ? <Check size={12} strokeWidth={3} /> : "•"}
            </span>
          </div>
        ))}
      </div>

      {/* Button unlocks when progress is 100 */}
      <button
        onClick={onNext}
        disabled={progress < 100}
        className="btn btn-gold"
        style={{
          padding: "0.95rem 2.5rem",
          fontSize: "1rem",
          borderRadius: "14px",
          fontWeight: 700,
          opacity: progress < 100 ? 0.4 : 1,
          cursor: progress < 100 ? "not-allowed" : "pointer",
          boxShadow: progress === 100 ? "0 6px 20px rgba(201, 162, 39, 0.3)" : "none",
          transition: "all 0.25s ease",
        }}
      >
        Select Plan & View Final Will →
      </button>
    </div>
  );
}
