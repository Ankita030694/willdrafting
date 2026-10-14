"use client";

import React, { useState, useEffect } from "react";
import WizardButton from "./button";
import { useLanguage } from "@/context/LanguageContext";
import { WillDraftingState, generateWillClauses } from "@/lib/willDraftingStore";
import { useWillStore } from "@/lib/useWillStore";
import { Cpu, Check } from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";

interface Step12AssemblyProps {
  state?: WillDraftingState;
  onUpdate?: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
  lang?: "en" | "hi";
  onChangeLang?: (lang: "en" | "hi") => void;
}

export default function Step12Assembly({
  state: propState,
  onUpdate: propOnUpdate,
  onNext,
}: Step12AssemblyProps) {
  const storeState = useWillStore((s) => s.state);
  const storeUpdateState = useWillStore((s) => s.updateState);
  const state = propState || storeState;
  const onUpdate = propOnUpdate || storeUpdateState;
  const { lang } = useLanguage();
  const isHi = lang === "hi";

  const [progress, setProgress] = useState(15);
  const [stageIndex, setStageIndex] = useState(0);

  const stageMessages = [
    { en: "Initializing Legal Decision Matrix...", hi: "कानूनी प्रारूप का आरंभीकरण..." },
    { en: "Harmonizing Personal Law with Indian Succession Framework...", hi: "व्यक्तिगत कानून व भारतीय उत्तराधिकार नियमों का समन्वय..." },
    { en: "Compiling Asset Schedules & Formulating Residuary Devise...", hi: "संपत्ति अनुसूची का संकलन व अवशिष्ट धारा का निर्माण..." },
    { en: "Structuring Attestation Clause & Section 63 Witness Block...", hi: "साक्षी अनुभाग व धारा 63 सत्यापन का गठन..." },
    { en: "Will Document Successfully Assembled & Legally Certified!", hi: "वसीयत दस्तावेज सफलतापूर्वक संकलित और सत्यापित!" },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(40);
      setStageIndex(1);
    }, 600);

    const timer2 = setTimeout(() => {
      setProgress(70);
      setStageIndex(2);
    }, 1300);

    const timer3 = setTimeout(() => {
      setProgress(90);
      setStageIndex(3);
    }, 2000);

    const timer4 = setTimeout(() => {
      setProgress(100);
      setStageIndex(4);

      if (!state.detailsVerified) {
        onUpdate((prev) => ({
          ...prev,
          clauses: generateWillClauses(prev),
          willStatus: prev.willStatus === "drafting" ? "draft_ready" : prev.willStatus,
        }));
      }
    }, 2700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onUpdate, state.detailsVerified]);

  const stages = [
    {
      label: isHi ? "1. प्रश्नावली की जानकारी संसाधित की गई" : "1. Questionnaire Information Processed",
      completed: progress >= 20,
    },
    {
      label: isHi ? "2. व्यक्तिगत कानून एवं उत्तराधिकार नियमों का सत्यापन" : "2. Personal Law & Succession Rule Verification",
      completed: progress >= 40,
    },
    {
      label: isHi ? "3. संपत्ति सूची एवं वितरण प्रतिशत" : "3. Asset Lists & Distribution Percentages",
      completed: progress >= 70,
    },
    {
      label: isHi ? "4. अवशिष्ट संपत्ति एवं निष्पादक नियुक्ति" : "4. Remaining Assets & Executor Appointments",
      completed: progress >= 90,
    },
    {
      label: isHi ? "5. हस्ताक्षर एवं साक्षी प्रमाणन अनुभाग" : "5. Signing & Witness Certification Sections",
      completed: progress >= 100,
    },
  ];

  const currentStageText = isHi ? stageMessages[stageIndex].hi : stageMessages[stageIndex].en;

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
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.5rem" }}>
          <AudioAssistantButton
            textToSpeak="Creating your official Will document. Formatting all clauses, lists of assets, and signature sections according to Indian law."
            hindiText="आपकी आधिकारिक वसीयत तैयार की जा रही है। भारतीय कानून के अनुसार सभी धाराएं, संपत्ति सूची और हस्ताक्षर अनुभाग संकलित किए जा रहे हैं।"
            label={isHi ? "सुनें 🔊" : "Listen 🔊"}
          />
        </div>
        <h2 style={{ fontSize: "2.1rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
          {isHi ? "आपकी आधिकारिक वसीयत तैयार की जा रही है" : "Creating Your Official Will Document"}
        </h2>
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
          <span>{isHi ? "संकलन प्रगति" : "Compilation Pipeline"}</span>
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
        className="btn btn-gold assembly-cta-btn"
        style={{
          padding: "0.95rem 2.5rem",
          fontSize: "1rem",
          borderRadius: "14px",
          fontWeight: 700,
          opacity: progress < 100 ? 0.4 : 1,
          cursor: progress < 100 ? "not-allowed" : "pointer",
          boxShadow: progress === 100 ? "0 6px 20px rgba(198, 83, 120, 0.3)" : "none",
          transition: "all 0.25s ease",
        }}
      >
        {state.willStatus === "finalised" || state.willStatus === "approved"
          ? isHi
            ? "अपनी अंतिम वसीयत देखें (चरण 14) →"
            : "View Final Will Document (Step 14) →"
          : isHi
          ? "योजना चुनें और अंतिम वसीयत देखें →"
          : "Select Plan & View Final Will →"}
      </button>
    </div>
  );
}
