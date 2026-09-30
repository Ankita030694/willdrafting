"use client";

import React, { useState } from "react";
import { WillDraftingState, ReligionPersonalLaw, MaritalStatus } from "@/lib/willDraftingStore";
import AppleSwitch from "@/components/dashboard/AppleSwitch";
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

interface Step2AboutYouProps {
  state: WillDraftingState;
  onUpdate: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2AboutYou({
  state,
  onUpdate,
  onNext,
  onBack,
}: Step2AboutYouProps) {
  const [formData, setFormData] = useState(state.testator);
  const [errorMsg, setErrorMsg] = useState("");

  // Calculate approximate age from DOB or default to 45
  const calculateAgeFromDob = (dobStr: string) => {
    if (!dobStr) return 45;
    const birthYear = new Date(dobStr).getFullYear();
    if (isNaN(birthYear)) return 45;
    return new Date().getFullYear() - birthYear;
  };

  const [currentAge, setCurrentAge] = useState<number>(calculateAgeFromDob(formData.dob));

  const handleAgeChange = (newAge: number) => {
    setCurrentAge(newAge);
    const targetYear = new Date().getFullYear() - newAge;
    const currentMonthDay = formData.dob && formData.dob.includes("-")
      ? formData.dob.substring(4)
      : "-06-15";
    const newDob = `${targetYear}${currentMonthDay}`;
    setFormData((prev) => ({ ...prev, dob: newDob }));
  };

  const handleCityPreset = (city: string, st: string, pin: string) => {
    setFormData((prev) => ({
      ...prev,
      city,
      state: st,
      pincode: pin,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg("Please enter your full legal name as per official ID (Aadhaar / PAN).");
      return;
    }
    if (!formData.dob) {
      setErrorMsg("Please provide your date of birth.");
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
    { id: "married", title: "Married", Icon: HeartHandshake, desc: "Spouse has statutory rights under personal law" },
    { id: "single", title: "Single", Icon: User, desc: "Never married; parents/siblings as primary natural heirs" },
    { id: "widowed", title: "Widowed", Icon: Heart, desc: "Children and lineal descendants inherit" },
    { id: "divorced", title: "Divorced", Icon: FileX, desc: "Former spouse claims superseded by decree" },
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
      title: "Hindu / Sikh / Jain / Buddhist",
      description: "Governed by Hindu Succession Act 1956. Full testamentary freedom over self-acquired property.",
      badge: "HSA 1956",
      Icon: Scale,
    },
    {
      id: "special_marriage_act",
      title: "Special Marriage Act / Civil",
      description: "Universal application of Indian Succession Act 1925 without personal law restrictions.",
      badge: "SMA 1954",
      Icon: HeartHandshake,
    },
    {
      id: "christian",
      title: "Christian",
      description: "Governed by Indian Succession Act 1925 (Part V). Free disposition with executor probate.",
      badge: "ISA 1925",
      Icon: BookOpen,
    },
    {
      id: "muslim",
      title: "Muslim Personal Law",
      description: "Subject to Shariat testamentary rules (1/3rd maximum to non-heirs without heir consent).",
      badge: "Shariat",
      Icon: Scale,
    },
    {
      id: "parsi",
      title: "Parsi",
      description: "Indian Succession Act 1925 (Special Rules for Parsis). Testamentary capacity covers all assets.",
      badge: "ISA 1925",
      Icon: Scale,
    },
    {
      id: "other",
      title: "Other / Secular",
      description: "Universal provisions under the Indian Succession Act 1925.",
      badge: "General",
      Icon: Globe,
    },
  ];

  const cityPresets = [
    { name: "Delhi NCR", state: "Delhi", pin: "110001" },
    { name: "Gurugram", state: "Haryana", pin: "122002" },
    { name: "Mumbai", state: "Maharashtra", pin: "400001" },
    { name: "Bengaluru", state: "Karnataka", pin: "560001" },
    { name: "Hyderabad", state: "Telangana", pin: "500001" },
    { name: "Pune", state: "Maharashtra", pin: "411001" },
    { name: "Chennai", state: "Tamil Nadu", pin: "600001" },
    { name: "Kolkata", state: "West Bengal", pin: "700001" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", width: "100%", height: "100%", justifyContent: "space-between" }}>
      {/* Compact Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.2rem 0.65rem", borderRadius: "999px", backgroundColor: "rgba(198, 83, 120, 0.12)", color: "var(--color-gold)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
            <Sparkles size={12} color="var(--color-gold)" />
            Step 2 of 14 • Testator Identity
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
              Tell us about yourself
            </h2>
            <span style={{ fontSize: "0.95rem", color: "var(--color-gold)", fontWeight: 600 }}>
              (अपनी जानकारी दर्ज करें)
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <AudioAssistantButton
            textToSpeak="Tell us about yourself. Your full legal name, parent's name, PAN number, and address are recorded so your identity cannot be contested. Simply tap and fill each field."
            label="Listen / सुनें 🔊"
          />
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
            <CheckCircle2 size={13} strokeWidth={2.5} /> S.59 ISA 1925 Qualified Adult
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
                  Full Legal Name (as per Aadhaar / PAN) *
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
                          setFormData({
                            ...formData,
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
                placeholder="Dr. Rohit Srivastava"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
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
                Parent&apos;s Name (Son/Daughter of)
              </label>
              <input
                type="text"
                name="fatherOrMotherName"
                placeholder="Late Mrs. Manju Srivastava"
                value={formData.fatherOrMotherName || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fatherOrMotherName: e.target.value,
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
                Workplace / Institutional Affiliation
              </label>
              <input
                type="text"
                name="workplace"
                placeholder="Room 505, Dept of Biosciences, IIT Bombay"
                value={formData.workplace || ""}
                onChange={(e) =>
                  setFormData({ ...formData, workplace: e.target.value })
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
                Permanent Account Number (PAN)
              </label>
              <input
                type="text"
                name="pan"
                placeholder="BAZPS9068N"
                maxLength={10}
                value={formData.pan || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pan: e.target.value.toUpperCase(),
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
                Aadhaar Number (12-Digit / Masked)
              </label>
              <input
                type="text"
                name="aadhaar"
                placeholder="3546 XXXX XXXX"
                maxLength={16}
                value={formData.aadhaar || ""}
                onChange={(e) =>
                  setFormData({ ...formData, aadhaar: e.target.value })
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
                Gender
              </label>
              <div className="grid grid-cols-3 gap-1.5 border-b border-[#D1D5DB] pb-1.5">
                {[
                  { id: "male", label: "Male" },
                  { id: "female", label: "Female" },
                  { id: "other", label: "Other" },
                ].map((g) => {
                  const isSel = formData.gender === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, gender: g.id as any })
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

            {/* 7. Date of Birth & Age */}
            <div className="flex flex-col min-w-0 w-full">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280]">
                  Date of Birth & Age
                </label>
                <span className="text-[11px] font-bold text-[#C65378]">
                  {currentAge} yrs
                </span>
              </div>
              <input
                type="date"
                value={formData.dob || ""}
                onChange={(e) => {
                  const newDob = e.target.value;
                  setFormData({ ...formData, dob: newDob });
                  setCurrentAge(calculateAgeFromDob(newDob));
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
              <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5">
                Mobile Phone
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="+91 98100 45210"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
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

            {/* 9. Email Address */}
            <div className="flex flex-col min-w-0 w-full">
              <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
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
                Permanent Residential Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="House/Apt No., Street, Sector / Landmark"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
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

            {/* 11. City */}
            <div className="flex flex-col min-w-0 w-full">
              <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                placeholder="Gurugram"
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

            {/* 12. State */}
            <div className="flex flex-col min-w-0 w-full">
              <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                placeholder="Haryana"
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

            {/* 13. PIN Code */}
            <div className="flex flex-col min-w-0 w-full">
              <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5">
                PIN Code
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={(e) =>
                  setFormData({ ...formData, pincode: e.target.value })
                }
                placeholder="122002"
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

            {/* 14. Quick Metro City Pills */}
            <div className="flex flex-col min-w-0 w-full border-b border-[#D1D5DB] pb-1.5">
              <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5">
                Quick City Select
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {cityPresets.slice(0, 5).map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => handleCityPreset(c.name, c.state, c.pin)}
                    style={{
                      padding: "0.22rem 0.55rem",
                      borderRadius: "999px",
                      backgroundColor:
                        formData.city === c.name
                          ? "rgba(198, 83, 120, 0.12)"
                          : "rgba(23, 34, 40, 0.04)",
                      border:
                        formData.city === c.name
                          ? "1px solid var(--color-gold)"
                          : "1px solid transparent",
                      color:
                        formData.city === c.name
                          ? "var(--color-gold)"
                          : "var(--color-navy)",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row: Marital Status & Personal Law / Succession Act Framework (2 columns on desktop, 1 on mobile) */}
          <div className="step2-fields-grid grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-1 w-full min-w-0">
            {/* Marital Status */}
            <div className="flex flex-col min-w-0 w-full">
              <div className="flex flex-wrap justify-between items-center gap-1 mb-2">
                <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280]">
                  Marital Status
                </label>
                <span className="text-[11px] text-[#9CA3AF]">
                  Determines spousal legal rights
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
                        setFormData({ ...formData, maritalStatus: opt.id })
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

            {/* Personal Law / Succession Act Framework */}
            <div className="flex flex-col min-w-0 w-full">
              <div className="flex flex-wrap justify-between items-center gap-1 mb-2">
                <label className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280]">
                  Personal Law / Succession Act Framework
                </label>
                <span className="text-[11px] text-[#9CA3AF]">
                  Governing jurisprudence
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {religionOptions.map((opt) => {
                  const isSel = formData.religionPersonalLaw === opt.id;
                  const OptIcon = opt.Icon;
                  return (
                    <div
                      key={opt.id}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          religionPersonalLaw: opt.id,
                        })
                      }
                      style={{
                        borderRadius: "10px",
                        border: isSel
                          ? "1.5px solid var(--color-gold)"
                          : "1px solid #E5E7EB",
                        backgroundColor: isSel
                          ? "rgba(198, 83, 120, 0.06)"
                          : "transparent",
                        padding: "0.55rem 0.65rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "0.35rem",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          minWidth: 0,
                        }}
                      >
                        <OptIcon
                          size={14}
                          color={isSel ? "var(--color-gold)" : "#6B7280"}
                        />
                        <span
                          style={{
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            color: "#111827",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {opt.title.split("/")[0].trim()}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: "0.6rem",
                          fontWeight: 700,
                          padding: "0.1rem 0.35rem",
                          borderRadius: "4px",
                          backgroundColor: "rgba(95, 126, 117, 0.14)",
                          color: "var(--color-sage)",
                          flexShrink: 0,
                        }}
                      >
                        {opt.badge}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Row: Prior Testamentary Documents & Statutory Revocation Clause (2 columns on desktop, 1 on mobile) */}
          <div className="step2-fields-grid grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 pt-3 border-t border-[#E5E7EB] mt-auto w-full min-w-0">
            <div className="flex justify-between items-center gap-3 min-w-0">
              <div className="min-w-0">
                <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#111827]">
                  Prior Testamentary Documents
                </div>
                <div className="text-xs text-[#6B7280] mt-0.5">
                  Have you previously executed a Will or Codicil?
                </div>
              </div>
              <AppleSwitch
                checked={formData.hasPreviousWill || false}
                onChange={(checked) =>
                  setFormData((prev) => ({ ...prev, hasPreviousWill: checked }))
                }
              />
            </div>

            <div className="flex justify-between items-center gap-3 min-w-0">
              <div className="min-w-0">
                <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#111827]">
                  Statutory Revocation Clause (S.62 ISA)
                </div>
                <div className="text-xs text-[#6B7280] mt-0.5">
                  Explicitly revoke all prior testamentary instruments
                </div>
              </div>
              <AppleSwitch
                checked={formData.revokePreviousWill ?? true}
                onChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    revokePreviousWill: checked,
                  }))
                }
              />
            </div>
          </div>
        </div>

        {/* Navigation Action Bar */}
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
            Save & Continue to Family →
          </button>
        </div>
      </form>
    </div>
  );
}
