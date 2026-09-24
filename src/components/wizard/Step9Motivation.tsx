"use client";

import React, { useState } from "react";
import { WillDraftingState } from "@/lib/willDraftingStore";
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

interface Step9MotivationProps {
  state: WillDraftingState;
  onUpdate: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step9Motivation({
  state,
  onUpdate,
  onNext,
  onBack,
}: Step9MotivationProps) {
  const [selectedReason, setSelectedReason] = useState(
    state.emotionalReason || "Protecting my spouse and ensuring total family harmony"
  );

  const [personalLetter, setPersonalLetter] = useState(
    state.specialWishes?.personalMessageToFamily ||
      "To my beloved family: Everything I have built was with your happiness in mind. Please stay united with mutual love, support each other in all seasons of life, and live with truth and honor."
  );

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
      desc: "Knowing that a lifetime of hard work is safeguarded under the Indian Succession Act 1925.",
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

  const handleInsertStarter = (text: string) => {
    if (!personalLetter.trim()) {
      setPersonalLetter(text);
    } else {
      setPersonalLetter(`${personalLetter.trim()}\n\n${text}`);
    }
  };

  const handleNext = () => {
    onUpdate((prev) => ({
      ...prev,
      emotionalReason: selectedReason,
      specialWishes: {
        ...(prev.specialWishes || {}),
        personalMessageToFamily: personalLetter,
      },
    }));
    onNext();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.85rem",
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      {/* Header */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.35rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.2rem 0.6rem",
              borderRadius: "999px",
              backgroundColor: "rgba(201, 162, 39, 0.12)",
              color: "var(--color-navy)",
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "var(--color-gold)" }}></span>
            Step 9 of 14 • Purpose & Legacy Statement
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <AudioAssistantButton
              textToSpeak="Leave a personal message of love and explain your wishes to your family. When your loved ones read your own words, it brings comfort and prevents misunderstandings."
              label="Listen / सुनें 🔊"
            />
            <span style={{ fontSize: "0.75rem", color: "var(--color-slate)" }}>
              Creates personal letter of wishes
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem", flexWrap: "wrap" }}>
          <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
            Primary Motivation & Personal Message
          </h2>
          <span style={{ fontSize: "0.88rem", color: "#8A6D1B", fontWeight: 600 }}>
            (वसीयत का उद्देश्य एवं परिवार के नाम संदेश)
          </span>
        </div>
      </div>

      {/* Main 2-Column Bento Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.05fr 1.15fr",
          gap: "1.25rem",
          flex: 1,
          minHeight: 0,
        }}
      >
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
                backgroundColor: "rgba(201, 162, 39, 0.15)",
                color: "var(--color-gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Shield size={16} />
            </div>
            <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "var(--color-navy)" }}>
              What drives this Will?
            </h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {reasons.map((r) => {
              const RIcon = r.Icon;
              const isSel = selectedReason === r.title;
              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedReason(r.title)}
                  style={{
                    padding: "0.65rem 0.85rem",
                    borderRadius: "12px",
                    border: isSel ? "2px solid var(--color-gold)" : "1px solid rgba(27, 42, 74, 0.08)",
                    backgroundColor: isSel ? "rgba(201, 162, 39, 0.07)" : "#FAFAFA",
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
                backgroundColor: "rgba(201, 162, 39, 0.15)",
                color: "var(--color-gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MessageSquare size={16} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "var(--color-navy)" }}>
                Personal Letter to Family
              </h3>
            </div>
          </div>

          {/* Tone Picker Chips */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--color-slate)", marginRight: "0.2rem" }}>
              Tone:
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
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--color-slate)", marginRight: "0.2rem" }}>
              Insert:
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
                  backgroundColor: "rgba(201, 162, 39, 0.08)",
                  border: "1px solid rgba(201, 162, 39, 0.2)",
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
            onChange={(e) => setPersonalLetter(e.target.value)}
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

      {/* Navigation Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.6rem 1rem",
          borderRadius: "14px",
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(27, 42, 74, 0.08)",
          boxShadow: "0 2px 10px rgba(27, 42, 74, 0.03)",
          marginTop: "auto",
        }}
      >
        <button
          type="button"
          onClick={onBack}
          style={{
            padding: "0.65rem 1.4rem",
            borderRadius: "10px",
            border: "1px solid rgba(27, 42, 74, 0.15)",
            backgroundColor: "#FFFFFF",
            color: "var(--color-navy)",
            fontWeight: 700,
            fontSize: "0.875rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="btn btn-gold"
          style={{
            padding: "0.65rem 1.85rem",
            borderRadius: "10px",
            fontSize: "0.9rem",
            fontWeight: 700,
            boxShadow: "0 4px 16px rgba(201, 162, 39, 0.25)",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          Proceed to Full Review <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
