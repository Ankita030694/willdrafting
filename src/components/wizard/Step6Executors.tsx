"use client";

import React, { useState } from "react";
import {
  WillDraftingState,
  PersonContact,
} from "@/lib/willDraftingStore";
import AppleSwitch from "@/components/dashboard/AppleSwitch";
import {
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  User,
  UserCheck,
  Plus,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Award,
} from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";

interface Step6ExecutorsProps {
  state: WillDraftingState;
  onUpdate: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
  onBack: () => void;
  lang?: "en" | "hi";
  onChangeLang?: (lang: "en" | "hi") => void;
}

export default function Step6Executors({
  state,
  onUpdate,
  onNext,
  onBack,
  lang: propLang,
  onChangeLang: propOnChangeLang,
}: Step6ExecutorsProps) {
  const context = useLanguage();
  const currentLang = propLang || context.lang || "en";
  const isHi = currentLang === "hi";
  const handleToggleLang = propOnChangeLang || context.setLang;
  // Existing primary executor or sensible default
  const defaultPrimary: PersonContact = state.executorPrimary?.name ? state.executorPrimary : {
    name: state.familyMembers.find((f) => !f.isMinor)?.name || "",
    relationship: state.familyMembers.find((f) => !f.isMinor)?.relationship || "Spouse",
    phone: "",
    email: "",
    address: "",
  };

  // Existing alternate executor
  const existingAlternate = state.executorAlternate?.name ? state.executorAlternate : null;
  const [hasAlternate, setHasAlternate] = useState(!!existingAlternate);

  const [primary, setPrimary] = useState<PersonContact>(defaultPrimary);
  const [alternate, setAlternate] = useState<PersonContact>(
    existingAlternate || {
      name: "",
      relationship: "",
      phone: "",
      email: "",
      address: "",
    }
  );

  const [errorMsg, setErrorMsg] = useState("");

  const adultFamily = state.familyMembers.filter((f) => !f.isMinor);

  const handleSelectPrimaryFromFamily = (f: typeof state.familyMembers[0]) => {
    setPrimary((prev: PersonContact) => ({
      ...prev,
      name: f.name,
      relationship: f.relationship,
      phone: f.phone || prev.phone,
      email: f.email || prev.email,
    }));
  };

  const handleSelectAlternateFromFamily = (f: typeof state.familyMembers[0]) => {
    setAlternate((prev: PersonContact) => ({
      ...prev,
      name: f.name,
      relationship: f.relationship,
      phone: f.phone || prev.phone,
      email: f.email || prev.email,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!primary.name.trim()) {
      setErrorMsg("Please provide the full legal name of your Primary Executor.");
      return;
    }

    if (hasAlternate && !alternate.name.trim()) {
      setErrorMsg("Please provide the full legal name of your Alternate Executor or disable the alternate toggle.");
      return;
    }

    if (hasAlternate && primary.name.trim().toLowerCase() === alternate.name.trim().toLowerCase()) {
      setErrorMsg("The Alternate Executor must be a distinct individual from the Primary Executor.");
      return;
    }

    onUpdate((prev: WillDraftingState) => ({
      ...prev,
      executorPrimary: primary,
      executorAlternate: hasAlternate ? alternate : { name: "", relationship: "", phone: "", email: "", address: "" },
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginBottom: "0.35rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <LanguageToggle size="sm" currentLang={currentLang} onToggle={handleToggleLang} />
            <AudioAssistantButton
              textToSpeak="Who will be the executor of your will? An executor is your trusted manager—like your spouse, brother, or friend—who ensures your instructions are carried out after you. Tap any family member or enter their name."
              label={isHi ? "सुनें 🔊" : "Listen 🔊"}
            />
            <span style={{ fontSize: "0.75rem", color: "var(--color-slate)" }}>
              {isHi ? "कोर्ट प्रोबेट (वसीयत का आधिकारिक अदालती प्रमाणीकरण)" : "Court Probate (Official court certification of your Will)"}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem", flexWrap: "wrap" }}>
          <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
            {isHi ? "वसीयत प्रबंधक एवं निष्पादक नियुक्त करें" : "Appoint your Executor (The person responsible for carrying out your Will)"}
          </h2>
        </div>
      </div>

      {errorMsg && (
        <div
          style={{
            padding: "0.6rem 1rem",
            backgroundColor: "rgba(225, 29, 72, 0.08)",
            border: "1px solid #FDA4AF",
            color: "#BE123C",
            borderRadius: "12px",
            fontSize: "0.825rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Single Unified Full-Width Form Container matching Step 2 About You */}
      <form
        onSubmit={handleSubmit}
        className="w-full flex-1 min-h-0 flex flex-col gap-4 overflow-x-hidden"
      >
        <div className="w-full flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-white rounded-[20px] border border-[#172228]/10 p-4 sm:p-6 lg:px-8 lg:py-6 shadow-sm flex flex-col gap-7">
          {/* Primary Executor Section */}
          <div className="flex flex-col gap-5 w-full min-w-0">
            <div className="flex flex-wrap justify-between items-center gap-3 pb-3 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-2.5">
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(198, 83, 120, 0.12)",
                    color: "var(--color-gold)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Award size={18} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.02rem", fontWeight: 700, color: "var(--color-navy)" }}>
                    {isHi ? "प्राथमिक एग्जीक्यूटर (वसीयत लागू कराने वाला मुख्य व्यक्ति)" : "Primary Executor (The person responsible for carrying out your Will)"}
                  </h3>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-slate)" }}>
                    {isHi ? "वसीयत की शर्तों को कानूनी रूप से पूरा करने वाला मुख्य प्रबंधक" : "First in line to administer estate and distribute assets"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Quick 1-click select chips */}
                {adultFamily.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#6B7280] mr-1">
                      Quick Select:
                    </span>
                    {adultFamily.map((f) => {
                      const isSel = primary.name === f.name;
                      return (
                        <button
                          type="button"
                          key={f.id}
                          onClick={() => handleSelectPrimaryFromFamily(f)}
                          style={{
                            padding: "0.22rem 0.6rem",
                            borderRadius: "999px",
                            border: isSel ? "1.5px solid var(--color-gold)" : "1px solid #E5E7EB",
                            backgroundColor: isSel ? "rgba(198, 83, 120, 0.1)" : "rgba(23, 34, 40, 0.03)",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            fontSize: "0.73rem",
                            fontWeight: isSel ? 700 : 500,
                            color: isSel ? "var(--color-gold)" : "var(--color-navy)",
                          }}
                        >
                          <span>{f.name}</span>
                          <span style={{ fontSize: "0.66rem", color: "var(--color-slate)" }}>
                            ({f.relationship})
                          </span>
                          {isSel && <CheckCircle2 size={12} color="var(--color-gold)" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    padding: "0.15rem 0.55rem",
                    borderRadius: "999px",
                    backgroundColor: "rgba(124, 148, 115, 0.15)",
                    color: "var(--color-sage)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <CheckCircle2 size={11} /> Required
                </span>
              </div>
            </div>

            {/* Primary Executor Fields (2 per row on desktop, 1 on mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 items-end w-full min-w-0">
              <div className="flex flex-col min-w-0 w-full">
                <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  value={primary.name}
                  onChange={(e) => setPrimary({ ...primary, name: e.target.value })}
                  placeholder="e.g., Sunita Sharma"
                  className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-[15px] text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-light outline-none transition-colors rounded-none shadow-none"
                  style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderRadius: 0,
                    paddingLeft: 0,
                    paddingRight: 0,
                    backgroundColor: "transparent",
                  }}
                />
              </div>

              <div className="flex flex-col min-w-0 w-full">
                <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5">
                  Relationship *
                </label>
                <input
                  type="text"
                  required
                  value={primary.relationship}
                  onChange={(e) => setPrimary({ ...primary, relationship: e.target.value })}
                  placeholder="e.g., Spouse / Adult Son"
                  className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-[15px] text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-light outline-none transition-colors rounded-none shadow-none"
                  style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderRadius: 0,
                    paddingLeft: 0,
                    paddingRight: 0,
                    backgroundColor: "transparent",
                  }}
                />
              </div>

              <div className="flex flex-col min-w-0 w-full">
                <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5">
                  Mobile Phone
                </label>
                <input
                  type="tel"
                  value={primary.phone || ""}
                  onChange={(e) => setPrimary({ ...primary, phone: e.target.value })}
                  placeholder="+91 98100 45211"
                  className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-[15px] text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-light outline-none transition-colors rounded-none shadow-none"
                  style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderRadius: 0,
                    paddingLeft: 0,
                    paddingRight: 0,
                    backgroundColor: "transparent",
                  }}
                />
              </div>

              <div className="flex flex-col min-w-0 w-full">
                <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={primary.email || ""}
                  onChange={(e) => setPrimary({ ...primary, email: e.target.value })}
                  placeholder="executor@example.com"
                  className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-[15px] text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-light outline-none transition-colors rounded-none shadow-none"
                  style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderRadius: 0,
                    paddingLeft: 0,
                    paddingRight: 0,
                    backgroundColor: "transparent",
                  }}
                />
              </div>

              <div className="flex flex-col min-w-0 w-full md:col-span-2">
                <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5">
                  Residential Address (Optional)
                </label>
                <input
                  type="text"
                  value={primary.address || ""}
                  onChange={(e) => setPrimary({ ...primary, address: e.target.value })}
                  placeholder="e.g., A-402, Green Glen Layout, Bengaluru"
                  className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-[15px] text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-light outline-none transition-colors rounded-none shadow-none"
                  style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderRadius: 0,
                    paddingLeft: 0,
                    paddingRight: 0,
                    backgroundColor: "transparent",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Alternate / Backup Executor Section */}
          <div className="flex flex-col gap-5 w-full min-w-0 pt-2 border-t border-[#E5E7EB]">
            <div className="flex flex-wrap justify-between items-center gap-3">
              <div className="flex items-center gap-2.5">
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(59, 81, 115, 0.1)",
                    color: "var(--color-slate)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <UserCheck size={18} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.02rem", fontWeight: 700, color: "var(--color-navy)" }}>
                    {isHi ? "वैकल्पिक एग्जीक्यूटर (मुख्य प्रबंधक के असमर्थ होने पर बैकअप)" : "Alternate / Backup Executor (Steps in if primary executor is unable to act)"}
                  </h3>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-slate)" }}>
                    {isHi ? "यदि प्राथमिक एग्जीक्यूटर पहले गुजर जाएं या कार्यभार न संभाल पाएं" : "Guarantees continuous estate management without court delay"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {hasAlternate && adultFamily.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#6B7280] mr-1">
                      Quick Select:
                    </span>
                    {adultFamily
                      .filter((f) => f.name !== primary.name)
                      .map((f) => {
                        const isSel = alternate.name === f.name;
                        return (
                          <button
                            type="button"
                            key={f.id}
                            onClick={() => handleSelectAlternateFromFamily(f)}
                            style={{
                              padding: "0.22rem 0.6rem",
                              borderRadius: "999px",
                              border: isSel ? "1.5px solid var(--color-gold)" : "1px solid #E5E7EB",
                              backgroundColor: isSel ? "rgba(198, 83, 120, 0.1)" : "rgba(23, 34, 40, 0.03)",
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.3rem",
                              fontSize: "0.73rem",
                              fontWeight: isSel ? 700 : 500,
                              color: isSel ? "var(--color-gold)" : "var(--color-navy)",
                            }}
                          >
                            <span>{f.name}</span>
                            <span style={{ fontSize: "0.66rem", color: "var(--color-slate)" }}>
                              ({f.relationship})
                            </span>
                            {isSel && <CheckCircle2 size={12} color="var(--color-gold)" />}
                          </button>
                        );
                      })}
                  </div>
                )}

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: hasAlternate ? "var(--color-navy)" : "var(--color-slate)" }}>
                    {hasAlternate ? "Enabled" : "Disabled"}
                  </span>
                  <AppleSwitch checked={hasAlternate} onChange={setHasAlternate} />
                </div>
              </div>
            </div>

            {!hasAlternate ? (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  padding: "1rem 1.25rem",
                  backgroundColor: "#FAFAFA",
                  borderRadius: "14px",
                  border: "1.5px dashed rgba(27, 42, 74, 0.12)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(198, 83, 120, 0.12)",
                      color: "var(--color-gold)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Plus size={18} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: "0.9rem", fontWeight: 700, color: "var(--color-navy)" }}>
                      No Alternate Executor Appointed
                    </h4>
                    <p style={{ margin: "0.15rem 0 0", fontSize: "0.76rem", color: "var(--color-slate)" }}>
                      An alternate prevents court administration delay if your primary executor predeceases or cannot serve.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setHasAlternate(true)}
                  style={{
                    padding: "0.45rem 1rem",
                    borderRadius: "999px",
                    border: "1.5px solid var(--color-navy)",
                    backgroundColor: "#FFFFFF",
                    color: "var(--color-navy)",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  + Add Backup Executor
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 items-end w-full min-w-0">
                <div className="flex flex-col min-w-0 w-full">
                  <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required={hasAlternate}
                    value={alternate.name}
                    onChange={(e) => setAlternate({ ...alternate, name: e.target.value })}
                    placeholder="e.g., Rajesh Sharma"
                    className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-[15px] text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-light outline-none transition-colors rounded-none shadow-none"
                    style={{
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      borderRadius: 0,
                      paddingLeft: 0,
                      paddingRight: 0,
                      backgroundColor: "transparent",
                    }}
                  />
                </div>

                <div className="flex flex-col min-w-0 w-full">
                  <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5">
                    Relationship *
                  </label>
                  <input
                    type="text"
                    required={hasAlternate}
                    value={alternate.relationship}
                    onChange={(e) => setAlternate({ ...alternate, relationship: e.target.value })}
                    placeholder="e.g., Brother / Friend"
                    className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-[15px] text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-light outline-none transition-colors rounded-none shadow-none"
                    style={{
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      borderRadius: 0,
                      paddingLeft: 0,
                      paddingRight: 0,
                      backgroundColor: "transparent",
                    }}
                  />
                </div>

                <div className="flex flex-col min-w-0 w-full">
                  <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5">
                    Mobile Phone
                  </label>
                  <input
                    type="tel"
                    value={alternate.phone || ""}
                    onChange={(e) => setAlternate({ ...alternate, phone: e.target.value })}
                    placeholder="+91 98100..."
                    className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-[15px] text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-light outline-none transition-colors rounded-none shadow-none"
                    style={{
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      borderRadius: 0,
                      paddingLeft: 0,
                      paddingRight: 0,
                      backgroundColor: "transparent",
                    }}
                  />
                </div>

                <div className="flex flex-col min-w-0 w-full">
                  <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={alternate.email || ""}
                    onChange={(e) => setAlternate({ ...alternate, email: e.target.value })}
                    placeholder="alternate@example.com"
                    className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-[15px] text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-light outline-none transition-colors rounded-none shadow-none"
                    style={{
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      borderRadius: 0,
                      paddingLeft: 0,
                      paddingRight: 0,
                      backgroundColor: "transparent",
                    }}
                  />
                </div>

                <div className="flex flex-col min-w-0 w-full md:col-span-2">
                  <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5">
                    Residential Address (Optional)
                  </label>
                  <input
                    type="text"
                    value={alternate.address || ""}
                    onChange={(e) => setAlternate({ ...alternate, address: e.target.value })}
                    placeholder="e.g., Delhi, NCR"
                    className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-[15px] text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-light outline-none transition-colors rounded-none shadow-none"
                    style={{
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      borderRadius: 0,
                      paddingLeft: 0,
                      paddingRight: 0,
                      backgroundColor: "transparent",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="flex flex-wrap justify-between items-center gap-3 px-4 py-2.5 bg-white rounded-[14px] border border-[#172228]/10 shadow-sm">
          <button
            type="button"
            onClick={onBack}
            style={{
              padding: "0.55rem 1.25rem",
              borderRadius: "999px",
              border: "1px solid #D1D5DB",
              backgroundColor: "#FFFFFF",
              color: "var(--color-slate)",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            ← Back
          </button>

          <button
            type="submit"
            className="btn btn-gold"
            style={{
              padding: "0.65rem 1.85rem",
              borderRadius: "999px",
              fontSize: "0.9rem",
              fontWeight: 700,
              boxShadow: "0 4px 16px rgba(198, 83, 120, 0.25)",
              cursor: "pointer",
            }}
          >
            Save & Continue to Guardians →
          </button>
        </div>
      </form>
    </div>
  );
}
