"use client";

import React, { useState, useEffect } from "react";
import WizardButton from "./button";

import { WillDraftingState, generateWillClauses } from "@/lib/willDraftingStore";
import { useWillStore } from "@/lib/useWillStore";
import AppleCardSelect from "@/components/dashboard/AppleCardSelect";
import {
  Shield,
  Sprout,
  HeartHandshake,
  ScrollText,
  Sun,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Plus,
} from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";
import { useLanguage } from "@/context/LanguageContext";
import InfoTooltip from "./InfoTooltip";

interface Step9MotivationProps {
  state?: WillDraftingState;
  onUpdate?: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
  onBack: () => void;
  lang?: "en" | "hi";
  onChangeLang?: (lang: "en" | "hi") => void;
}

export default function Step9Motivation({
  state: propState,
  onUpdate: propOnUpdate,
  onNext,
  onBack,
  lang: propLang,
}: Step9MotivationProps) {
  const storeState = useWillStore((s) => s.state);
  const storeUpdateState = useWillStore((s) => s.updateState);
  const state = propState || storeState;
  const onUpdate = propOnUpdate || storeUpdateState;

  const context = useLanguage();
  const isHi = propLang === "hi" || context.lang === "hi";
  const [selectedReason, setSelectedReason] = useState(
    state.emotionalReason || "Protecting my spouse and ensuring total family harmony"
  );

  const [personalLetter, setPersonalLetter] = useState(
    state.specialWishes?.personalMessageToFamily ||
      "To my beloved family: Everything I have built was with your happiness in mind. Please stay united with mutual love, support each other in all seasons of life, and live with truth and honor."
  );

  useEffect(() => {
    if (state.emotionalReason) {
      setSelectedReason(state.emotionalReason);
    }
    if (state.specialWishes?.personalMessageToFamily) {
      setPersonalLetter(state.specialWishes.personalMessageToFamily);
    }
  }, [state.emotionalReason, state.specialWishes?.personalMessageToFamily]);

  const [selectedTone, setSelectedTone] = useState("Warm & Affectionate");

  const reasons = [
    {
      id: "spouse",
      title: "Protecting my spouse's financial independence",
      desc: "Ensuring undisputed sole ownership of our residential home and bank deposits without needing NOCs from distant relatives.",
      Icon: Shield,
      color: "var(--color-gold)",
    },
    {
      id: "children",
      title: "Safeguarding my children's future & education",
      desc: "Securing higher education funds, appointing trusted guardians, and eliminating civil court delays.",
      Icon: Sprout,
      color: "var(--color-sage)",
    },
    {
      id: "disputes",
      title: "Preventing future family conflict & partition suits",
      desc: "Leaving crystal-clear statutory bequests so there is never ambiguity, bitterness, or court litigation among heirs.",
      Icon: HeartHandshake,
      color: "#2563EB",
    },
    {
      id: "clarity",
      title: "Consolidating a fragmented asset portfolio",
      desc: "Unifying real estate, mutual funds, and digital accounts into a clean, verifiable legal schedule.",
      Icon: ScrollText,
      color: "var(--color-slate)",
    },
    {
      id: "peace",
      title: "Complete peace of mind & legal certainty",
      desc: "Knowing that a lifetime of hard work is safeguarded under Indian succession law.",
      Icon: Sun,
      color: "#D97706",
    },
  ];

  const starters = [
    {
      label: "Spousal Gratitude",
      text: "To my beloved spouse: thank you for a lifetime of unconditional love, partnership, and strength. You remain the rock of our family.",
    },
    {
      label: "Plea for Family Unity",
      text: "My earnest prayer to my children: please remain united, cherish one another, and never allow material wealth to cause distance between you.",
    },
    {
      label: "Allocation Rationale",
      text: "Every distribution made in this Will was guided by love, balance, and the genuine needs of each family member, free from prejudice.",
    },
    {
      label: "Moral Legacy & Advice",
      text: "Remember that true wealth lies in honor, kindness, humility, and service to society. Live courageously and with empathy.",
    },
  ];

  const patchReason = (reason: string) => {
    setSelectedReason(reason);
    onUpdate((prev) => {
      const nextState: WillDraftingState = {
        ...prev,
        emotionalReason: reason,
      };
      return {
        ...nextState,
        clauses: generateWillClauses(nextState),
      };
    });
  };

  const patchPersonalLetter = (letter: string) => {
    setPersonalLetter(letter);
    onUpdate((prev) => {
      const nextState: WillDraftingState = {
        ...prev,
        specialWishes: {
          ...(prev.specialWishes || {
            jewelleryInstructions: "",
            personalBelongings: "",
            petsCare: "",
            charitableGifts: "",
            digitalAccounts: "",
            funeralCeremonyWishes: "",
            personalMessageToFamily: "",
          }),
          personalMessageToFamily: letter,
        },
      };
      return {
        ...nextState,
        clauses: generateWillClauses(nextState),
      };
    });
  };

  const handleInsertStarter = (text: string) => {
    const next = !personalLetter.trim() ? text : `${personalLetter.trim()}\n\n${text}`;
    patchPersonalLetter(next);
  };

  const handleNext = () => {
    onUpdate((prev) => {
      const nextState: WillDraftingState = {
        ...prev,
        emotionalReason: selectedReason,
        specialWishes: {
          ...(prev.specialWishes || {
            jewelleryInstructions: "",
            personalBelongings: "",
            petsCare: "",
            charitableGifts: "",
            digitalAccounts: "",
            funeralCeremonyWishes: "",
            personalMessageToFamily: "",
          }),
          personalMessageToFamily: personalLetter,
        },
      };
      return {
        ...nextState,
        clauses: generateWillClauses(nextState),
      };
    });
    onNext();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        width: "100%",
      }}
    >
      {/* Header */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginBottom: "0.35rem" }}>
          <div className="wizard-step-header-meta" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <AudioAssistantButton
              textToSpeak={
                isHi
                  ? "अपने परिवार के लिए प्रेम का व्यक्तिगत संदेश छोड़ें और अपनी वसीयत का उद्देश्य समझाएं। जब आपके प्रियजन आपके अपने शब्द पढ़ते हैं, तो इससे शांति मिलती है और गलतफहमियां दूर होती हैं।"
                  : "Leave a personal message of love and explain your wishes to your family. When your loved ones read your own words, it brings comfort and prevents misunderstandings."
              }
              label={isHi ? "सुनें 🔊" : "Listen 🔊"}
            />
            <span style={{ fontSize: "0.75rem", color: "var(--color-slate)" }}>
              {isHi ? "प्रियजनों के लिए व्यक्तिगत पत्र तैयार करता है" : "Creates personal letter of wishes"}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem", flexWrap: "wrap" }}>
          <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
            {isHi ? "वसीयत का उद्देश्य एवं व्यक्तिगत संदेश" : "Primary Motivation & Personal Message"}
          </h2>
        </div>
      </div>

      {/* Main 2-Column Bento Grid */}
      <div className="motivation-grid">
        {/* Left Column: Reasons */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            border: "1px solid rgba(27, 42, 74, 0.08)",
            boxShadow: "0 4px 20px rgba(27, 42, 74, 0.03)",
            padding: "1.15rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            overflowY: "auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                backgroundColor: "rgba(198, 83, 120, 0.12)",
                color: "var(--color-gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Shield size={16} />
            </div>
            <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "var(--color-navy)", display: "flex", alignItems: "center" }}>
              What drives this Will?
              <InfoTooltip
                text="Select the primary motivation behind your Will. This shapes the introductory preamble of your Will to demonstrate clear, rational intent under Indian succession law."
                hindiText="अपनी वसीयत का मुख्य उद्देश्य चुनें। यह वसीयत की प्रस्तावना में आपकी स्पष्ट और तर्कसंगत मंशा को स्थापित करता है।"
              />
            </h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {reasons.map((r) => {
              const RIcon = r.Icon;
              const isSel = selectedReason === r.title;
              return (
                <div
                  key={r.id}
                  onClick={() => patchReason(r.title)}
                  style={{
                    padding: "0.65rem 0.85rem",
                    borderRadius: "12px",
                    border: isSel ? "2px solid var(--color-gold)" : "1px solid rgba(23, 34, 40, 0.08)",
                    backgroundColor: isSel ? "rgba(198, 83, 120, 0.06)" : "#FAFAFA",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.65rem",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ color: r.color, marginTop: "2px", flexShrink: 0 }}>
                    <RIcon size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)", lineHeight: 1.3 }}>
                      {r.title}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--color-slate)", marginTop: "0.15rem", lineHeight: 1.35 }}>
                      {r.desc}
                    </div>
                  </div>
                  {isSel && <CheckCircle2 size={16} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: "2px" }} />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Personal Letter of Wishes */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            border: "1px solid rgba(27, 42, 74, 0.08)",
            boxShadow: "0 4px 20px rgba(27, 42, 74, 0.03)",
            padding: "1.15rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.65rem",
            overflowY: "auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                backgroundColor: "rgba(198, 83, 120, 0.12)",
                color: "var(--color-gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MessageSquare size={16} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "var(--color-navy)", display: "flex", alignItems: "center" }}>
                Personal Letter to Family
                <InfoTooltip
                  text="Write a heartfelt message explaining your values, blessings, and the loving intent behind your estate decisions. This helps preserve family unity and prevents misunderstandings."
                  hindiText="अपने परिवार के लिए प्रेमपूर्ण संदेश, आशीर्वाद और अपने निर्णयों के पीछे की भावना लिखें। इससे परिवार में एकता बनी रहती है और गलतफहमियां दूर होती हैं।"
                />
              </h3>
            </div>
          </div>

          {/* Tone Picker Chips */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--color-slate)", marginRight: "0.2rem", display: "inline-flex", alignItems: "center" }}>
              Tone:
              <InfoTooltip
                text="Choose the emotional tone that best reflects how you wish to address your loved ones."
                hindiText="अपने प्रियजनों को संबोधित करने के लिए उपयुक्त भावनात्मक शैली चुनें।"
              />
            </span>
            {["Warm & Affectionate", "Principled & Firm", "Philosophical", "Pragmatic"].map((tone) => (
              <button
                key={tone}
                type="button"
                onClick={() => setSelectedTone(tone)}
                style={{
                  padding: "0.2rem 0.55rem",
                  borderRadius: "999px",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  backgroundColor: selectedTone.includes(tone) ? "var(--color-navy)" : "rgba(27, 42, 74, 0.05)",
                  color: selectedTone.includes(tone) ? "#FFFFFF" : "var(--color-navy)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {tone}
              </button>
            ))}
          </div>

          {/* Prompt Starters */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--color-slate)", marginRight: "0.2rem", display: "inline-flex", alignItems: "center" }}>
              Insert:
              <InfoTooltip
                text="Tap any prompt chip to append a pre-written paragraph of gratitude, family unity, or moral legacy into your letter."
                hindiText="कृतज्ञता, पारिवारिक एकता या नैतिक मूल्यों से जुड़े तैयार वाक्य अपने पत्र में जोड़ने के लिए किसी भी विकल्प पर टैप करें।"
              />
            </span>
            {starters.map((starter) => (
              <button
                key={starter.label}
                type="button"
                onClick={() => handleInsertStarter(starter.text)}
                style={{
                  padding: "0.2rem 0.55rem",
                  borderRadius: "6px",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  backgroundColor: "rgba(198, 83, 120, 0.08)",
                  border: "1px solid rgba(198, 83, 120, 0.2)",
                  color: "var(--color-navy)",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                <Plus size={10} /> {starter.label}
              </button>
            ))}
          </div>

          <textarea
            value={personalLetter}
            onChange={(e) => patchPersonalLetter(e.target.value)}
            placeholder="Share your life philosophies, reasons for specific allocations, and words of encouragement..."
            style={{
              flex: 1,
              minHeight: "130px",
              width: "100%",
              padding: "0.75rem",
              borderRadius: "12px",
              border: "1px solid rgba(27, 42, 74, 0.12)",
              fontSize: "0.85rem",
              color: "var(--color-navy)",
              backgroundColor: "#FAFAFA",
              outline: "none",
              fontFamily: "var(--font-main)",
              lineHeight: 1.5,
              resize: "none",
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--color-slate)" }}>
            <span>Private non-probated accompanying schedule</span>
            <span>{personalLetter.length} Characters</span>
          </div>
        </div>
      </div>

      {/* Wizard Button Footer */}
      <WizardButton onBack={onBack} onNext={handleNext} />

      <style jsx>{`
        .motivation-grid {
          display: grid;
          grid-template-columns: 1.05fr 1.15fr;
          gap: 1.25rem;
          flex: 1;
          min-height: 0;
        }
        @media (max-width: 900px) {
          .motivation-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: min-content;
            overflow-y: auto;
          }
        }
      `}</style>
    </div>
  );
}
