"use client";

import React, { useState, useEffect } from "react";import WizardButton from "./button";

import { WillDraftingState, ReligionPersonalLaw, MaritalStatus } from "@/lib/willDraftingStore";
import {
  User,
  HeartHandshake,
  Heart,
  FileX,
  Scale,
  BookOpen,
  Globe,
  MapPin,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Building,
  Briefcase,
} from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";
import { lookupStateFromPin, fetchPincodeDetails } from "@/lib/pincode";
import StateDropdown from "@/components/ui/StateDropdown";
import { formatAadhaar, sanitizeAadhaar, sanitizeNameInput, sanitizePan, normalizeEmail, AADHAAR_ERROR_MSG } from "@/lib/inputSanitizers";
import { useWillStore } from "@/lib/useWillStore";

interface Step2AboutYouProps {
  state?: WillDraftingState;
  onUpdate?: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
  onBack: () => void;
  lang?: "en" | "hi";
  onChangeLang?: (lang: "en" | "hi") => void;
}

export default function Step2AboutYou({
  state: propState,
  onUpdate: propOnUpdate,
  onNext,
  onBack,
  lang: propLang,
  onChangeLang: propOnChangeLang,
}: Step2AboutYouProps) {
  const storeState = useWillStore((s) => s.state);
  const storeUpdateState = useWillStore((s) => s.updateState);
  const state = propState || storeState;
  const onUpdate = propOnUpdate || storeUpdateState;

  const context = useLanguage();
  const currentLang = propLang || context.lang || "en";
  const isHi = currentLang === "hi";
  const handleToggleLang = propOnChangeLang || context.setLang;
  const formData = state.testator;
  const [errorMsg, setErrorMsg] = useState("");
  const [autoFilledState, setAutoFilledState] = useState(false);

  const patchTestator = (patch: Partial<typeof formData>) => {
    onUpdate((prevState) => ({
      ...prevState,
      testator: {
        ...prevState.testator,
        ...patch,
      },
    }));
  };

  // Calculate approximate age from DOB or default to 45
  const calculateAgeFromDob = (dobStr: string) => {
    if (!dobStr) return 45;
    const birthYear = new Date(dobStr).getFullYear();
    if (isNaN(birthYear)) return 45;
    return new Date().getFullYear() - birthYear;
  };

  const currentAge = calculateAgeFromDob(formData.dob);

  const handleAgeChange = (newAge: number) => {
    const targetYear = new Date().getFullYear() - newAge;
    const currentMonthDay = formData.dob && formData.dob.includes("-")
      ? formData.dob.substring(4)
      : "-06-15";
    const newDob = `${targetYear}${currentMonthDay}`;
    patchTestator({ dob: newDob });
  };

  const handlePincodeChange = async (pinInput: string) => {
    const cleanPin = pinInput.replace(/\D/g, "").slice(0, 6);
    const detected = lookupStateFromPin(cleanPin);

    if (cleanPin.length < 2) {
      patchTestator({
        pincode: cleanPin,
        state: "",
        city: "",
      });
      setAutoFilledState(false);
      return;
    }

    patchTestator({
      pincode: cleanPin,
      state: detected?.state || "",
      city: detected?.city || "",
    });
    setAutoFilledState(Boolean(detected?.state));

    if (cleanPin.length === 6) {
      const details = await fetchPincodeDetails(cleanPin);
      if (details) {
        onUpdate((prevState) => {
          if (prevState.testator.pincode !== cleanPin) return prevState;
          return {
            ...prevState,
            testator: {
              ...prevState.testator,
              state: details.state || detected?.state || prevState.testator.state,
              city: details.city || detected?.city || prevState.testator.city,
            },
          };
        });
        if (details.state || detected?.state) {
          setAutoFilledState(true);
        }
      }
    }
  };

  const handleStateChange = (newSt: string) => {
    patchTestator({ state: newSt });
    setAutoFilledState(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg("Please enter your full legal name as per official ID (Aadhaar / PAN).");
      return;
    }
    const corporatePattern = /\b(solutions|pvt|private|ltd|limited|llp|inc|corp|corporation|enterprise|enterprises|company|co\.|associates|firm|consultancy|technologies|services|group|agency|foundation|trust|huf)\b/i;
    if (corporatePattern.test(formData.fullName.trim())) {
      setErrorMsg(
        isHi
          ? "भारतीय उत्तराधिकार अधिनियम की धारा 59 के तहत केवल एक जीवित व्यक्ति ही वसीयत बना सकता है, कोई कंपनी या फर्म नहीं। कृपया अपना व्यक्तिगत नाम दर्ज करें।"
          : "Under Section 59 of the Indian Succession Act, 1925, only a natural living person can make a Will (not a company, firm, or organization). Please enter your personal legal name."
      );
      return;
    }
    if (!formData.dob) {
      setErrorMsg("Please provide your date of birth.");
      return;
    }

    const birthDate = new Date(formData.dob);
    if (!isNaN(birthDate.getTime())) {
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        setErrorMsg(
          isHi
            ? "वसीयत बनाने के लिए आपकी उम्र कम से कम 18 वर्ष होनी चाहिए। कृपया अपनी जन्म तिथि जांचें।"
            : "You need to be at least 18 years old to make a will. Please check your date of birth."
        );
        return;
      }
    }

    const cleanPhone = (formData.phone || "").replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length !== 10) {
      setErrorMsg(
        isHi
          ? "मोबाइल नंबर में ठीक 10 अंक होने चाहिए।"
          : "Mobile number must contain exactly 10 digits."
      );
      return;
    }
    const cleanAadhaar = sanitizeAadhaar(formData.aadhaar || "");
    if (cleanAadhaar.length > 0 && cleanAadhaar.length !== 12) {
      setErrorMsg(
        isHi ? "आधार नंबर में ठीक 12 अंक होने चाहिए।" : AADHAAR_ERROR_MSG
      );
      return;
    }

    onUpdate((prev) => ({
      ...prev,
      testator: {
        ...formData,
      },
    }));

    onNext();
  };

  const maritalOptions: {
    id: MaritalStatus;
    title: string;
    Icon: React.ElementType;
    desc: string;
  }[] = [
    { id: "married", title: isHi ? "विवाहित" : "Married", Icon: HeartHandshake, desc: isHi ? "जीवनसाथी का कानूनी उत्तराधिकार अधिकार" : "Spouse has legal inheritance rights" },
    { id: "single", title: isHi ? "अविवाहित" : "Single", Icon: User, desc: isHi ? "माता-पिता या भाई-बहन प्राथमिक उत्तराधिकारी" : "Never married; parents or siblings as primary heirs" },
    { id: "widowed", title: isHi ? "विधवा / विधुर" : "Widowed", Icon: Heart, desc: isHi ? "बच्चे एवं प्रत्यक्ष परिवार उत्तराधिकारी" : "Children and direct family inherit" },
    { id: "divorced", title: isHi ? "तलाकशुदा" : "Divorced", Icon: FileX, desc: isHi ? "पूर्व जीवनसाथी के दावे कानूनी रूप से अलग" : "Former spouse claims are legally separated" },
  ];

  const religionOptions: {
    id: ReligionPersonalLaw;
    title: string;
    description: string;
    badge: string;
    Icon: React.ElementType;
  }[] = [
    {
      id: "hindu",
      title: isHi ? "हिन्दू / सिख / जैन / बौद्ध" : "Hindu / Sikh / Jain / Buddhist",
      description: isHi ? "स्व-अर्जित संपत्ति पर पूर्ण वसीयती स्वतंत्रता।" : "Full testamentary freedom over self-acquired property.",
      badge: isHi ? "कानूनी स्वतंत्रता" : "Testamentary Freedom",
      Icon: Scale,
    },
    {
      id: "christian",
      title: isHi ? "ईसाई" : "Christian",
      description: isHi ? "भारतीय उत्तराधिकार प्रावधानों द्वारा शासित। निष्पादक प्रोबेट के साथ स्वतंत्र हस्तांतरण।" : "Governed by applicable Indian succession provisions. Free disposition with executor probate.",
      badge: isHi ? "कानूनी मानक" : "Statutory Law",
      Icon: BookOpen,
    },
    {
      id: "muslim",
      title: isHi ? "मुस्लिम व्यक्तिगत कानून" : "Muslim Personal Law",
      description: isHi ? "शरीयत वसीयत नियमों के अधीन (वारिसों की सहमति के बिना गैर-वारिसों को अधिकतम 1/3 भाग)।" : "Subject to Shariat testamentary rules (1/3rd maximum to non-heirs without heir consent).",
      badge: isHi ? "शरीयत" : "Shariat",
      Icon: Scale,
    },
    {
      id: "parsi",
      title: isHi ? "पारसी" : "Parsi",
      description: isHi ? "पारसियों के लिए विशेष उत्तराधिकार नियम। समस्त संपत्तियों पर वसीयती अधिकार।" : "Special testamentary provisions for Parsis. Testamentary capacity covers all assets.",
      badge: isHi ? "कानूनी मानक" : "Statutory Law",
      Icon: Scale,
    },
    {
      id: "other",
      title: isHi ? "अन्य / धर्मनिरपेक्ष" : "Other / Secular",
      description: isHi ? "भारतीय उत्तराधिकार अधिनियम के सार्वभौमिक प्रावधान।" : "Universal provisions under Indian succession law.",
      badge: isHi ? "सामान्य" : "General",
      Icon: Globe,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", width: "100%" }}>
      {/* Compact Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
              {isHi ? "अपनी व्यक्तिगत जानकारी दर्ज करें" : "Tell us about yourself"}
            </h2>
          </div>
        </div>

        <div className="wizard-step-header-meta" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <AudioAssistantButton
            textToSpeak={
              isHi
                ? "अपने बारे में बताएं। आपका पूर्ण कानूनी नाम, माता-पिता का नाम, पैन और पता दर्ज किया जाता है ताकि आपकी पहचान पर विवाद न हो।"
                : "Tell us about yourself. Your full legal name, parent's name, PAN number, and address are recorded so your identity cannot be contested. Simply tap and fill each field."
            }
            label={isHi ? "सुनें 🔊" : "Listen 🔊"}
          />
          <LanguageToggle lang={currentLang} onChangeLang={handleToggleLang} size="sm" />
          <span
            style={{
              fontSize: "0.76rem",
              fontWeight: 700,
              padding: "0.25rem 0.65rem",
              borderRadius: "999px",
              backgroundColor: "rgba(124, 148, 115, 0.15)",
              color: "var(--color-sage)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            <CheckCircle2 size={13} strokeWidth={2.5} /> {isHi ? "कानूनी रूप से योग्य वयस्क (18+ वर्ष)" : "Legally Qualified Adult (18+ years)"}
          </span>
        </div>
      </div>

      {errorMsg && (
        <div
          style={{
            padding: "0.6rem 1rem",
            backgroundColor: "rgba(225, 29, 72, 0.1)",
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

      <form
        onSubmit={handleSubmit}
        className="w-full flex-1 min-h-0 flex flex-col gap-4 overflow-x-hidden"
      >
        {/* Single Unified Full-Width Form Container */}
        <div
          className="step2-form-card w-full flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-white rounded-[20px] border border-[#172228]/10 p-4 sm:p-6 lg:px-8 lg:py-6 shadow-sm flex flex-col gap-6"
        >
          {/* Main 2-Column Desktop / 1-Column Mobile Fields Grid */}
          <div className="step2-fields-grid grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 items-end w-full min-w-0">
            {/* 1. Full Legal Name */}
            <div className="flex flex-col min-w-0 w-full">
              <div className="flex flex-wrap justify-between items-center gap-2 mb-1.5">
                <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280]">
                  {isHi ? "पूर्ण कानूनी नाम (आधार / पैन के अनुसार) *" : "Full Legal Name (as per Aadhaar / PAN) *"}
                </label>
                <div className="flex flex-wrap gap-1">
                  {["Mr.", "Mrs.", "Ms.", "Dr.", "Adv."].map((title) => {
                    const active = formData.fullName.startsWith(title);
                    return (
                      <button
                        key={title}
                        type="button"
                        onClick={() => {
                          const currentName = formData.fullName.replace(
                            /^(Mr\.|Mrs\.|Ms\.|Dr\.|Adv\.)\s*/i,
                            ""
                          );
                          patchTestator({
                            fullName: `${title} ${currentName}`.trim(),
                          });
                        }}
                        style={{
                          padding: "0.12rem 0.45rem",
                          borderRadius: "999px",
                          fontSize: "0.66rem",
                          fontWeight: 700,
                          border: active
                            ? "1px solid var(--color-gold)"
                            : "1px solid #E5E7EB",
                          backgroundColor: active
                            ? "var(--color-gold)"
                            : "transparent",
                          color: active ? "#FFFFFF" : "#6B7280",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {title}
                      </button>
                    );
                  })}
                </div>
              </div>
              <input
                type="text"
                required
                name="fullName"
                placeholder="e.g., Rajesh Sharma"
                value={formData.fullName}
                onChange={(e) =>
                  patchTestator({ fullName: sanitizeNameInput(e.target.value) })
                }
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

            {/* 2. Parent's Name (Son/Daughter of) */}
            <div className="flex flex-col min-w-0 w-full">
              <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5">
                {isHi ? "माता / पिता का नाम (पुत्र / पुत्री)" : "Parent's Name (Son/Daughter of)"}
              </label>
              <input
                type="text"
                name="fatherOrMotherName"
                placeholder="e.g., Ramesh Sharma"
                value={formData.fatherOrMotherName || ""}
                onChange={(e) =>
                  patchTestator({
                    fatherOrMotherName: sanitizeNameInput(e.target.value),
                  })
                }
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

            {/* 3. Workplace / Institutional Affiliation */}
            <div className="flex flex-col min-w-0 w-full">
              <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5">
                {isHi ? "कार्यस्थल / संस्थान संबद्धता" : "Workplace / Institutional Affiliation"}
              </label>
              <input
                type="text"
                name="workplace"
                placeholder="e.g., Company Name or Profession"
                value={formData.workplace || ""}
                onChange={(e) =>
                  patchTestator({ workplace: e.target.value })
                }
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

            {/* 4. PAN */}
            <div className="flex flex-col min-w-0 w-full">
              <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5">
                {isHi ? "स्थायी खाता संख्या (पैन)" : "Permanent Account Number (PAN)"}
              </label>
              <input
                type="text"
                name="pan"
                placeholder="ABCDE1234F"
                maxLength={10}
                value={formData.pan || ""}
                onChange={(e) =>
                  patchTestator({
                    pan: sanitizePan(e.target.value),
                  })
                }
                className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-[15px] font-semibold tracking-wider text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-light outline-none transition-colors rounded-none shadow-none"
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

            {/* 5. Aadhaar */}
            <div className="flex flex-col min-w-0 w-full">
              <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5">
                {isHi ? "आधार नंबर (12 अंक)" : "Aadhaar Number (12 digits)"}
              </label>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="off"
                name="aadhaar"
                placeholder="1234 5678 9012"
                maxLength={14}
                value={formatAadhaar(formData.aadhaar || "")}
                onChange={(e) =>
                  patchTestator({ aadhaar: formatAadhaar(e.target.value) })
                }
                className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-[15px] tracking-wider text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-light outline-none transition-colors rounded-none shadow-none"
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

            {/* 6. Gender */}
            <div className="flex flex-col min-w-0 w-full">
              <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5">
                {isHi ? "लिंग" : "Gender"}
              </label>
              <div className="grid grid-cols-3 gap-1.5 border-b border-[#D1D5DB] pb-1.5">
                {[
                  { id: "male", label: isHi ? "पुरुष" : "Male" },
                  { id: "female", label: isHi ? "महिला" : "Female" },
                  { id: "other", label: isHi ? "अन्य" : "Other" },
                ].map((g) => {
                  const isSel = formData.gender === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() =>
                        patchTestator({ gender: g.id as any })
                      }
                      style={{
                        padding: "0.3rem 0.4rem",
                        borderRadius: "999px",
                        border: isSel
                          ? "1.5px solid var(--color-gold)"
                          : "1px solid transparent",
                        backgroundColor: isSel
                          ? "rgba(198, 83, 120, 0.1)"
                          : "rgba(23, 34, 40, 0.04)",
                        color: isSel ? "var(--color-gold)" : "#111827",
                        fontSize: "0.78rem",
                        fontWeight: isSel ? 700 : 500,
                        cursor: "pointer",
                        textAlign: "center",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {g.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 7. Date of Birth */}
            <div className="flex flex-col min-w-0 w-full">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280]">
                  {isHi ? "जन्म तिथि एवं आयु" : "Date of Birth & Age"}
                </label>
                <span className="text-[11px] font-bold text-[#C65378]">
                  {currentAge} {isHi ? "वर्ष" : "yrs"}
                </span>
              </div>
              <input
                type="date"
                value={formData.dob || ""}
                onChange={(e) => {
                  const newDob = e.target.value;
                  patchTestator({ dob: newDob });
                }}
                className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-[15px] text-[#111827] outline-none transition-colors rounded-none shadow-none"
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

            {/* 8. Mobile Phone */}
            <div className="flex flex-col min-w-0 w-full">
              <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5 flex items-center justify-between">
                <span>{isHi ? "मोबाइल नंबर" : "Mobile Phone"}</span>
                {formData.phone && formData.phone.length === 10 ? (
                  <span className="text-[10px] text-emerald-600 font-semibold lowercase tracking-normal flex items-center gap-0.5">
                    ✓ {isHi ? "10 अंक मान्य" : "10 digits valid"}
                  </span>
                ) : formData.phone && formData.phone.length > 0 ? (
                  <span className="text-[10px] text-amber-600 font-medium lowercase tracking-normal">
                    {formData.phone.length}/10 {isHi ? "अंक" : "digits"}
                  </span>
                ) : null}
              </label>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                name="phone"
                placeholder="Enter 10-digit number"
                value={formData.phone}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                  patchTestator({ phone: digits });
                  if (errorMsg && digits.length === 10) setErrorMsg("");
                }}
                className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-[15px] text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-light outline-none transition-colors rounded-none shadow-none font-medium"
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
              {formData.phone && formData.phone.length > 0 && formData.phone.length < 10 && (
                <span className="text-[11px] text-red-500 font-medium mt-1">
                  {isHi ? "मोबाइल नंबर में ठीक 10 अंक होने चाहिए।" : "Mobile number must contain exactly 10 digits."}
                </span>
              )}
            </div>

            {/* 9. Email Address */}
            <div className="flex flex-col min-w-0 w-full">
              <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5">
                {isHi ? "ईमेल पता" : "Email Address"}
              </label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) =>
                  patchTestator({ email: normalizeEmail(e.target.value) })
                }
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

            {/* 10. Permanent Residential Address */}
            <div className="flex flex-col min-w-0 w-full">
              <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5">
                {isHi ? "स्थायी आवासीय पता" : "Permanent Residential Address"}
              </label>
              <input
                type="text"
                name="address"
                placeholder="House/Apt No., Street, Sector / Landmark"
                value={formData.address}
                onChange={(e) =>
                  patchTestator({ address: e.target.value })
                }
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

            {/* 11. PIN Code */}
            <div className="flex flex-col min-w-0 w-full">
              <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5 flex items-center justify-between">
                <span>{isHi ? "पिन कोड" : "PIN Code"}</span>
                <span className="text-[10px] text-emerald-600 font-semibold tracking-normal normal-case">
                  {isHi ? "शहर व राज्य स्वतः भरेगा" : "Auto-fills City & State"}
                </span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                name="pincode"
                maxLength={6}
                value={formData.pincode}
                onChange={(e) => handlePincodeChange(e.target.value)}
                placeholder="e.g., 110001"
                className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-[15px] text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-light outline-none transition-colors rounded-none shadow-none font-medium"
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

            {/* 12. City */}
            <div className="flex flex-col min-w-0 w-full">
              <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5">
                {isHi ? "शहर / जिला" : "City"}
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={(e) =>
                  patchTestator({ city: sanitizeNameInput(e.target.value) })
                }
                placeholder="e.g., New Delhi"
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

            {/* 13. State (Standard Dropdown) */}
            <div className="flex flex-col min-w-0 w-full">
              <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5 flex items-center justify-between">
                <span>{isHi ? "राज्य" : "State"}</span>
                {autoFilledState && (
                  <span className="text-[10px] text-emerald-600 font-semibold tracking-normal normal-case flex items-center gap-1">
                    ✓ {isHi ? "पिन से स्वतः भरा" : "Auto-filled from PIN"}
                  </span>
                )}
              </label>
              <StateDropdown
                value={formData.state}
                onChange={handleStateChange}
                autoFilled={autoFilledState}
                placeholder={isHi ? "राज्य चुनें" : "Select State"}
              />
            </div>
          </div>

          {/* Row: Marital Status & Personal Law / Succession Act Framework (2 columns on desktop, 1 on mobile) */}
          <div className="step2-fields-grid grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-1 w-full min-w-0">
            {/* Marital Status */}
            <div className="flex flex-col min-w-0 w-full">
              <div className="flex flex-wrap justify-between items-center gap-1 mb-2">
                <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280]">
                  {isHi ? "वैवाहिक स्थिति *" : "Marital Status *"}
                </label>
                <span className="text-[11px] text-[#9CA3AF]">
                  {isHi ? "जीवनसाथी के कानूनी अधिकार तय करता है" : "Determines spousal legal rights"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {maritalOptions.map((opt) => {
                  const isSel = formData.maritalStatus === opt.id;
                  const OptIcon = opt.Icon;
                  return (
                    <div
                      key={opt.id}
                      onClick={() =>
                        patchTestator({ maritalStatus: opt.id })
                      }
                      style={{
                        borderRadius: "10px",
                        border: isSel
                          ? "1.5px solid var(--color-gold)"
                          : "1px solid #E5E7EB",
                        backgroundColor: isSel
                          ? "rgba(198, 83, 120, 0.06)"
                          : "transparent",
                        padding: "0.55rem 0.75rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <OptIcon
                        size={15}
                        color={isSel ? "var(--color-gold)" : "#6B7280"}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: "0.82rem",
                            fontWeight: 700,
                            color: "#111827",
                          }}
                        >
                          {opt.title}
                        </div>
                      </div>
                      {isSel && (
                        <CheckCircle2 size={14} color="var(--color-gold)" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Religion / Governing Succession Law */}
            <div className="flex flex-col min-w-0 w-full">
              <div className="flex flex-wrap justify-between items-center gap-1 mb-2">
                <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280]">
                  {isHi ? "लागू उत्तराधिकार कानून / धर्म *" : "Governing Succession Law / Religion *"}
                </label>
                <span className="text-[11px] text-[#9CA3AF]">
                  {isHi ? "प्रोबेट व उत्तराधिकार नियम तय करता है" : "Determines applicable Indian Succession Act rules"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {religionOptions.map((opt) => {
                  const isSel = (formData.religionPersonalLaw || "hindu") === opt.id;
                  const OptIcon = opt.Icon;
                  return (
                    <div
                      key={opt.id}
                      onClick={() =>
                        patchTestator({ religionPersonalLaw: opt.id })
                      }
                      style={{
                        borderRadius: "10px",
                        border: isSel
                          ? "1.5px solid var(--color-gold)"
                          : "1px solid #E5E7EB",
                        backgroundColor: isSel
                          ? "rgba(198, 83, 120, 0.06)"
                          : "transparent",
                        padding: "0.55rem 0.75rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <OptIcon
                        size={15}
                        color={isSel ? "var(--color-gold)" : "#6B7280"}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            color: "#111827",
                          }}
                        >
                          {opt.title}
                        </div>
                      </div>
                      {isSel && (
                        <CheckCircle2 size={14} color="var(--color-gold)" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Prior Will Revocation Status (Section 70, Indian Succession Act, 1925) */}
          <div
            className="step2-revocation-box"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "0.75rem",
              padding: "0.75rem 1rem",
              borderRadius: "12px",
              backgroundColor: "rgba(23, 34, 40, 0.02)",
              border: "1px solid #E5E7EB",
            }}
          >
            <div>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#111827" }}>
                {isHi
                  ? "क्या आपने पहले कोई वसीयत या कोडिसिल बनाई है? (धारा 70 निरस्तीकरण)"
                  : "Have you made any previous Will or Codicil? (Section 70 Revocation)"}
              </div>
              <div style={{ fontSize: "0.73rem", color: "#6B7280" }}>
                {isHi
                  ? "यह वसीयत आपके द्वारा पूर्व में बनाई गई सभी वसीयतों को कानूनी रूप से रद्द और प्रतिस्थापित कर देगी।"
                  : "This Will automatically revokes and supersedes any prior Wills or testamentary writings."}
              </div>
            </div>
            <div className="step2-revocation-btns" style={{ display: "flex", gap: "0.45rem" }}>
              {[
                { val: false, label: isHi ? "नहीं (यह मेरी पहली वसीयत है)" : "No (First Will)" },
                { val: true, label: isHi ? "हाँ (पुरानी वसीयत रद्द करें)" : "Yes (Revoke Prior Will)" },
              ].map((opt) => {
                const active = Boolean(formData.hasPreviousWill) === opt.val;
                return (
                  <button
                    key={String(opt.val)}
                    type="button"
                    onClick={() => patchTestator({ hasPreviousWill: opt.val })}
                    style={{
                      padding: "0.35rem 0.75rem",
                      borderRadius: "999px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      border: active ? "1.5px solid var(--color-gold)" : "1px solid #D1D5DB",
                      backgroundColor: active ? "rgba(198, 83, 120, 0.1)" : "#FFFFFF",
                      color: active ? "var(--color-gold)" : "#4B5563",
                      cursor: "pointer",
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Navigation Action Bar */}
        <div className="flex flex-wrap justify-between items-center gap-3 px-4 py-2.5 bg-white rounded-[14px] border border-[#172228]/10 shadow-sm step2-bottom-nav">
          <button
            type="button"
            onClick={onBack}
            className="step2-back-btn"
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
            {isHi ? "← पीछे जाएं" : "← Back"}
          </button>

          <button
            type="submit"
            className="btn btn-gold step2-next-btn"
            style={{
              padding: "0.65rem 1.85rem",
              borderRadius: "999px",
              fontSize: "0.9rem",
              fontWeight: 700,
              boxShadow: "0 4px 16px rgba(198, 83, 120, 0.25)",
              cursor: "pointer",
            }}
          >
            {isHi ? "सहेजें और परिवार विवरण पर आगे बढ़ें →" : "Save & Continue to Family →"}
          </button>
        </div>
      </form>
    </div>
  );
}
