"use client";

import React, { useState } from "react";
import { WillDraftingState, SpecialWishes } from "@/lib/willDraftingStore";
import {
  Gem,
  Globe,
  Heart,
  HandHeart,
  Flame,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Plus,
} from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";

interface Step8SpecialWishesProps {
  state: WillDraftingState;
  onUpdate: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step8SpecialWishes({
  state,
  onUpdate,
  onNext,
  onBack,
}: Step8SpecialWishesProps) {
  const [wishes, setWishes] = useState<SpecialWishes>(
    state.specialWishes || {
      jewelleryInstructions: "Ancestral gold necklace to elder daughter; diamond ring to son.",
      personalBelongings: "My library of rare books and journals to the university library.",
      petsCare: "Our family pet to be cared for by spouse, with ₹2,00,000 maintenance fund.",
      charitableGifts: "₹1,00,000 to the Prime Minister's National Relief Fund.",
      digitalAccounts: "Apple ID and Google photos archive transferred to spouse, then social accounts deleted.",
      funeralCeremonyWishes: "Simple Hindu Vedic rites at local electric crematorium with immediate family only.",
      personalMessageToFamily: "To my beloved family: I worked hard to build a peaceful life for us. Please always stand united, support each other with love, and live with integrity.",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate((prev) => ({
      ...prev,
      specialWishes: wishes,
    }));
    onNext();
  };

  const appendSuggestion = (key: keyof SpecialWishes, text: string) => {
    setWishes((prev) => {
      const current = prev[key] || "";
      if (!current.trim()) return { ...prev, [key]: text };
      if (current.includes(text)) return prev;
      return { ...prev, [key]: `${current.trim()}; ${text}` };
    });
  };

  const sections: {
    key: keyof SpecialWishes;
    Icon: React.ElementType;
    color: string;
    title: string;
    desc: string;
    placeholder: string;
    suggestions: string[];
  }[] = [
    {
      key: "jewelleryInstructions",
      Icon: Gem,
      color: "#E11D48",
      title: "Sentimental Jewellery & Heirlooms",
      desc: "Specific heirloom bequests (wedding jewellery, watches, vintage art, ancestral artifacts).",
      placeholder: "e.g., Diamond necklace to daughter Priya...",
      suggestions: [
        "Ancestral gold necklace to elder daughter",
        "Vintage luxury wristwatch to son",
        "Diamond solitaire ring to spouse",
        "Divide all remaining gold ornaments equally among daughters",
      ],
    },
    {
      key: "digitalAccounts",
      Icon: Globe,
      color: "#2563EB",
      title: "Digital Legacy & Online Assets",
      desc: "Cloud photo archives, email accounts, cryptocurrency hardware wallets, and social profile memorialization.",
      placeholder: "e.g., Apple ID and Google drive photos to be archived...",
      suggestions: [
        "Transfer Apple ID & Google Photos family vault to spouse",
        "Permanently delete all social media accounts after 60 days",
        "Entrust hardware cryptocurrency seed phrase to Primary Executor",
        "Transfer digital domain names and YouTube/creator IP to son",
      ],
    },
    {
      key: "petsCare",
      Icon: Heart,
      color: "#059669",
      title: "Pet Care & Maintenance Trust",
      desc: "Designated caregiver for domestic pets and dedicated funds for veterinary maintenance.",
      placeholder: "e.g., Family pet to be cared for by...",
      suggestions: [
        "Entrust family pet to spouse with ₹2,00,000 maintenance fund",
        "Entrust pet to sibling with monthly veterinary allowance",
        "Rehome pet with animal welfare society with ₹50,000 donation",
      ],
    },
    {
      key: "charitableGifts",
      Icon: HandHeart,
      color: "#C9A227",
      title: "Charitable Bequests & Philanthropy",
      desc: "Optional donations to educational institutions, orphanages, hospitals, or religious trusts.",
      placeholder: "e.g., ₹50,000 to PM National Relief Fund...",
      suggestions: [
        "₹1,00,000 to Prime Minister's National Relief Fund",
        "₹50,000 to local orphan education trust",
        "5% of liquid mutual fund portfolio to cancer research hospital",
      ],
    },
    {
      key: "funeralCeremonyWishes",
      Icon: Flame,
      color: "#EA580C",
      title: "Funeral & Memorial Rites",
      desc: "Rites, crematorium preferences, and anatomical organ donation declarations.",
      placeholder: "e.g., Vedic rituals with immediate family only...",
      suggestions: [
        "Pledged organ donor (corneas and organs to AIIMS / civil hospital)",
        "Simple Hindu Vedic antim sanskar in home city",
        "Eco-friendly electric cremation with immediate family only",
        "Scatter ashes in holy river Ganges (Haridwar / Rishikesh)",
      ],
    },
  ];

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
            Step 8 of 14 • Sentimental & Digital Legacy
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <AudioAssistantButton
              textToSpeak="Do you have special wishes like heirloom jewelry, family photos, pet care, charity, or funeral preferences? Tap any suggestion to add it."
              label="Listen / सुनें 🔊"
            />
            <span style={{ fontSize: "0.75rem", color: "var(--color-slate)" }}>
              Optional • Preserves personal sentimental values
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem", flexWrap: "wrap" }}>
          <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
            Special Wishes & Sentimental Bequests
          </h2>
          <span style={{ fontSize: "0.88rem", color: "#8A6D1B", fontWeight: 600 }}>
            (विशेष इच्छाएं, गहने एवं डिजिटल विरासत)
          </span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
          justifyContent: "space-between",
          gap: "0.75rem",
        }}
      >
        {/* Responsive Grid for Wishes */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "0.85rem",
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            paddingRight: "0.25rem",
          }}
        >
          {sections.map((sec) => {
            const SecIcon = sec.Icon;
            const currentVal = wishes[sec.key] || "";
            return (
              <div
                key={sec.key}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  border: "1px solid rgba(27, 42, 74, 0.08)",
                  padding: "1rem 1.15rem",
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.02)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      backgroundColor: `${sec.color}15`,
                      color: sec.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <SecIcon size={17} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: "var(--color-navy)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {sec.title}
                    </h3>
                  </div>
                </div>

                {/* Suggestions */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                  {sec.suggestions.slice(0, 3).map((sug) => {
                    const alreadyAdded = currentVal.includes(sug);
                    return (
                      <button
                        key={sug}
                        type="button"
                        onClick={() => appendSuggestion(sec.key, sug)}
                        style={{
                          padding: "0.2rem 0.55rem",
                          borderRadius: "6px",
                          fontSize: "0.72rem",
                          fontWeight: 500,
                          backgroundColor: alreadyAdded ? "rgba(124, 148, 115, 0.12)" : "#FAFAFA",
                          border: alreadyAdded ? "1px solid var(--color-sage)" : "1px solid rgba(27, 42, 74, 0.1)",
                          color: alreadyAdded ? "var(--color-sage)" : "var(--color-navy)",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.25rem",
                        }}
                      >
                        {alreadyAdded ? <CheckCircle2 size={10} /> : <Plus size={10} />}
                        <span>{sug}</span>
                      </button>
                    );
                  })}
                </div>

                <textarea
                  rows={2}
                  placeholder={sec.placeholder}
                  value={currentVal}
                  onChange={(e) => setWishes({ ...wishes, [sec.key]: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "10px",
                    border: "1px solid rgba(27, 42, 74, 0.12)",
                    fontSize: "0.825rem",
                    color: "var(--color-navy)",
                    backgroundColor: "#FAFAFA",
                    outline: "none",
                    fontFamily: "var(--font-main)",
                    lineHeight: 1.45,
                    resize: "none",
                  }}
                />
              </div>
            );
          })}
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
            type="submit"
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
            Save & Continue to Purpose Note <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
