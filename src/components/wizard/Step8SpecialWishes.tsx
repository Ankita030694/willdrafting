"use client";

import React, { useState } from "react";import WizardButton from "./button";

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
  ChevronDown,
  BookOpen,
} from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";
import AppleSwitch from "@/components/dashboard/AppleSwitch";

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
  const [noSpecialWishes, setNoSpecialWishes] = useState<boolean>(
    Boolean(state.specialWishes?.hasNoSpecialWishes)
  );
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

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({
    jewelleryInstructions: true,
  });

  const toggleRow = (key: string) => {
    setOpenRows((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate((prev) => ({
      ...prev,
      specialWishes: {
        ...wishes,
        hasNoSpecialWishes: noSpecialWishes,
      },
    }));
    onNext();
  };

  type SpecialWishFieldKey = Exclude<keyof SpecialWishes, "hasNoSpecialWishes">;

  const appendSuggestion = (key: SpecialWishFieldKey, text: string) => {
    setWishes((prev) => {
      const current = (prev[key] as string) || "";
      if (!current.trim()) return { ...prev, [key]: text };
      if (current.includes(text)) return prev;
      return { ...prev, [key]: `${current.trim()}; ${text}` };
    });
  };

  const sections: {
    key: SpecialWishFieldKey;
    shortLabel: string;
    categoryLabel: string;
    Icon: React.ElementType;
    color: string;
    title: string;
    desc: string;
    placeholder: string;
    suggestions: string[];
  }[] = [
    {
      key: "jewelleryInstructions",
      shortLabel: "Jewellery & Heirlooms",
      categoryLabel: "Heirlooms & Ornaments",
      Icon: Gem,
      color: "#C65378",
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
      key: "personalBelongings",
      shortLabel: "Personal Belongings",
      categoryLabel: "Books, Collectibles & Keepsakes",
      Icon: BookOpen,
      color: "#172228",
      title: "Personal Belongings & Keepsakes",
      desc: "Books, journals, musical instruments, awards, and personal mementos.",
      placeholder: "e.g., My library of rare books and journals...",
      suggestions: [
        "Personal library of books and journals to university department",
        "Watches and personal memorabilia to son",
        "Handwritten diaries and family albums to spouse",
      ],
    },
    {
      key: "digitalAccounts",
      shortLabel: "Digital Legacy",
      categoryLabel: "Cloud, Crypto & Online IP",
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
      shortLabel: "Pet Care",
      categoryLabel: "Domestic Animal Welfare",
      Icon: Heart,
      color: "#5F7E75",
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
      shortLabel: "Charitable Gifts",
      categoryLabel: "Philanthropy & Endowments",
      Icon: HandHeart,
      color: "#8B5CF6",
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
      shortLabel: "Funeral Rites",
      categoryLabel: "Memorial & Organ Donation",
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

  const visibleSections =
    activeFilter === "all"
      ? sections
      : sections.filter((s) => s.key === activeFilter);

  const recordedCount = sections.filter((s) => ((wishes[s.key] as string) || "").trim().length > 0).length;

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          

          <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem", flexWrap: "wrap" }}>
            <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
              Special Wishes & Sentimental Bequests
            </h2>
            <span style={{ fontSize: "0.88rem", color: "var(--color-gold)", fontWeight: 600 }}>
              (विशेष इच्छाएं, गहने एवं डिजिटल विरासत)
            </span>
            {noSpecialWishes ? (
              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "var(--color-sage)",
                  backgroundColor: "rgba(95, 126, 117, 0.12)",
                  padding: "0.15rem 0.55rem",
                  borderRadius: "999px",
                }}
              >
                No Special Wishes (Skipped)
              </span>
            ) : (
              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "var(--color-gold)",
                  backgroundColor: "rgba(198, 83, 120, 0.12)",
                  padding: "0.15rem 0.55rem",
                  borderRadius: "999px",
                }}
              >
                {recordedCount} of {sections.length} Configured
              </span>
            )}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <AudioAssistantButton
            textToSpeak="Do you have special wishes like heirloom jewelry, family photos, pet care, charity, or funeral preferences? You can also toggle 'I have no special wishes' to proceed directly."
            label="Listen / सुनें 🔊"
          />
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
        {/* "I have no special wishes" Progressive Disclosure Toggle Card */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.85rem 1.25rem",
            borderRadius: "14px",
            backgroundColor: noSpecialWishes ? "rgba(95, 126, 117, 0.08)" : "#FFFFFF",
            border: noSpecialWishes
              ? "1.5px solid var(--color-sage)"
              : "1px solid rgba(27, 42, 74, 0.1)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
            transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                backgroundColor: noSpecialWishes ? "var(--color-sage)" : "rgba(27, 42, 74, 0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: noSpecialWishes ? "#FFFFFF" : "var(--color-navy)",
                transition: "all 0.2s ease",
              }}
            >
              <Sparkles size={18} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-navy)" }}>
                  I have no special wishes
                </span>
                <span style={{ fontSize: "0.8rem", color: "var(--color-slate)", fontWeight: 500 }}>
                  (मेरी कोई विशेष इच्छाएं नहीं हैं)
                </span>
              </div>
              <p style={{ margin: "2px 0 0", fontSize: "0.76rem", color: "var(--color-slate)", lineHeight: 1.3 }}>
                {noSpecialWishes
                  ? "Turn OFF if you wish to record specific heirloom bequests, pet care funds, or funeral instructions."
                  : "Toggle ON to skip separate heirloom bequests, pet trusts, funeral rites, and charity directives."}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span
              style={{
                fontSize: "0.82rem",
                fontWeight: 800,
                color: noSpecialWishes ? "var(--color-sage)" : "var(--color-slate)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {noSpecialWishes ? "ON" : "OFF"}
            </span>
            <AppleSwitch
              checked={noSpecialWishes}
              onChange={setNoSpecialWishes}
              activeColor="var(--color-sage)"
            />
          </div>
        </div>

        {noSpecialWishes ? (
          <div style={{ flex: 1 }} />
        ) : (
          <>
            {/* Step 4-Style Category Filter Strip */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                flexWrap: "wrap",
                backgroundColor: "rgba(23, 34, 40, 0.04)",
                padding: "0.3rem",
                borderRadius: "12px",
              }}
            >
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                style={{
                  padding: "0.38rem 0.75rem",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: activeFilter === "all" ? "var(--color-navy)" : "transparent",
                  color: activeFilter === "all" ? "#FFFFFF" : "var(--color-slate)",
                  fontSize: "0.76rem",
                  fontWeight: activeFilter === "all" ? 700 : 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                All ({sections.length})
              </button>

              {sections.map((sec) => {
                const isSel = activeFilter === sec.key;
                const SecIcon = sec.Icon;
                const hasMsg = ((wishes[sec.key] as string) || "").trim().length > 0;
                return (
                  <button
                    key={sec.key}
                    type="button"
                    onClick={() => {
                      setActiveFilter(sec.key);
                      setOpenRows((prev) => ({ ...prev, [sec.key]: true }));
                    }}
                    style={{
                      padding: "0.38rem 0.75rem",
                      borderRadius: "8px",
                      border: "none",
                      backgroundColor: isSel ? "var(--color-gold)" : "transparent",
                      color: isSel ? "#FFFFFF" : "var(--color-slate)",
                      fontSize: "0.76rem",
                      fontWeight: isSel ? 700 : 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <SecIcon size={13} />
                    <span>{sec.shortLabel}</span>
                    {hasMsg && (
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor: isSel ? "#FFFFFF" : "var(--color-sage)",
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Single-Column Categorized Horizontal Rows with Message Dropdown */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.65rem",
                flex: 1,
                minHeight: 0,
                overflowY: "auto",
                paddingRight: "0.25rem",
              }}
            >
          {visibleSections.map((sec) => {
            const SecIcon = sec.Icon;
            const currentVal = (wishes[sec.key] as string) || "";
            const hasContent = currentVal.trim().length > 0;
            const isOpen = !!openRows[sec.key] || activeFilter === sec.key;

            return (
              <div
                key={sec.key}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "14px",
                  border: isOpen
                    ? "1.5px solid rgba(198, 83, 120, 0.45)"
                    : "1px solid rgba(23, 34, 40, 0.1)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
              >
                {/* Horizontal Single-Line Row Header */}
                <div
                  onClick={() => toggleRow(sec.key)}
                  className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-5 px-4 py-3 cursor-pointer hover:bg-[#FAF7F0]/60 transition-colors"
                >
                  {/* 1. Icon + Title + Category Tag */}
                  <div className="flex items-center gap-3 min-w-0 lg:w-[32%] shrink-0">
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
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
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3
                          style={{
                            margin: 0,
                            fontSize: "0.9rem",
                            fontWeight: 700,
                            color: "var(--color-navy)",
                          }}
                          className="truncate"
                        >
                          {sec.title}
                        </h3>
                        <span
                          style={{
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            backgroundColor: "rgba(23, 34, 40, 0.05)",
                            color: "var(--color-navy)",
                            padding: "0.08rem 0.45rem",
                            borderRadius: "999px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {sec.categoryLabel}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#6B7280] truncate mt-0.5">
                        {sec.desc}
                      </div>
                    </div>
                  </div>

                  {/* 2. Inline Message Preview */}
                  <div className="min-w-0 flex-1 text-xs text-[#49585F] lg:border-l lg:border-[#172228]/10 lg:pl-4">
                    {hasContent ? (
                      <div className="truncate" title={currentVal}>
                        <span className="font-bold text-[#172228]">Message: </span>
                        {currentVal}
                      </div>
                    ) : (
                      <span className="text-[#9CA3AF] italic">
                        No special directive written — click to open message box
                      </span>
                    )}
                  </div>

                  {/* 3. Status Badge & Dropdown Toggle */}
                  <div className="flex items-center justify-between lg:justify-end gap-3 shrink-0 lg:border-l lg:border-[#172228]/10 lg:pl-4">
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        padding: "0.18rem 0.55rem",
                        borderRadius: "999px",
                        backgroundColor: hasContent
                          ? "rgba(95, 126, 117, 0.14)"
                          : "rgba(23, 34, 40, 0.05)",
                        color: hasContent ? "var(--color-sage)" : "var(--color-slate)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {hasContent && <CheckCircle2 size={11} />}
                      {hasContent ? "Directive Recorded" : "Optional"}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRow(sec.key);
                      }}
                      style={{
                        padding: "0.28rem 0.65rem",
                        borderRadius: "8px",
                        border: "1px solid rgba(23, 34, 40, 0.12)",
                        backgroundColor: isOpen ? "var(--color-gold)" : "#FFFFFF",
                        color: isOpen ? "#FFFFFF" : "var(--color-navy)",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <span>{isOpen ? "Hide Message" : "View / Edit Message"}</span>
                      <ChevronDown
                        size={14}
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.2s ease",
                        }}
                      />
                    </button>
                  </div>
                </div>

                {/* Collapsible Dropdown Content for Message & Quick Suggestions */}
                {isOpen && (
                  <div
                    style={{
                      padding: "0.85rem 1rem 1rem",
                      borderTop: "1px solid rgba(23, 34, 40, 0.08)",
                      backgroundColor: "#FDFBF7",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.6rem",
                    }}
                  >
                    {/* Quick Suggestions */}
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.35rem" }}>
                      <span
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "var(--color-slate)",
                          marginRight: "0.25rem",
                        }}
                      >
                        Quick Add:
                      </span>
                      {sec.suggestions.map((sug) => {
                        const alreadyAdded = currentVal.includes(sug);
                        return (
                          <button
                            key={sug}
                            type="button"
                            onClick={() => appendSuggestion(sec.key, sug)}
                            style={{
                              padding: "0.22rem 0.6rem",
                              borderRadius: "999px",
                              fontSize: "0.72rem",
                              fontWeight: 600,
                              backgroundColor: alreadyAdded
                                ? "rgba(95, 126, 117, 0.14)"
                                : "#FFFFFF",
                              border: alreadyAdded
                                ? "1px solid var(--color-sage)"
                                : "1px solid rgba(23, 34, 40, 0.12)",
                              color: alreadyAdded ? "var(--color-sage)" : "var(--color-navy)",
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.25rem",
                            }}
                          >
                            {alreadyAdded ? <CheckCircle2 size={11} /> : <Plus size={11} />}
                            <span>{sug}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Message Textarea */}
                    <div>
                      <label className="block text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5">
                        Your Message / Directive for {sec.shortLabel}
                      </label>
                      <textarea
                        rows={2}
                        placeholder={sec.placeholder}
                        value={currentVal}
                        onChange={(e) => setWishes({ ...wishes, [sec.key]: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.6rem 0.85rem",
                          borderRadius: "10px",
                          border: "1px solid rgba(23, 34, 40, 0.15)",
                          fontSize: "0.85rem",
                          color: "var(--color-navy)",
                          backgroundColor: "#FFFFFF",
                          outline: "none",
                          fontFamily: "var(--font-main)",
                          lineHeight: 1.5,
                          resize: "vertical",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </>
    )}

        {/* Wizard Button Footer */}
      <WizardButton onBack={onBack} isSubmit={true} />
      </form>
    </div>
  );
}

