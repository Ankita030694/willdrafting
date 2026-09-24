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
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.2rem 0.65rem", borderRadius: "999px", backgroundColor: "rgba(201, 162, 39, 0.12)", color: "var(--color-navy)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
            <Sparkles size={12} color="var(--color-gold)" />
            Step 2 of 14 • Testator Identity
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
              Tell us about yourself
            </h2>
            <span style={{ fontSize: "0.95rem", color: "#8A6D1B", fontWeight: 600 }}>
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

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.85rem", flex: 1, minHeight: 0 }}>
        {/* 2-Column Full Width Bento Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "0.85rem",
            flex: 1,
            minHeight: 0,
          }}
        >
          {/* Left Column: Official Identity & Domicile */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "18px",
              border: "1px solid rgba(27, 42, 74, 0.08)",
              padding: "1.1rem 1.25rem",
              boxShadow: "0 2px 12px rgba(27, 42, 74, 0.03)",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(27, 42, 74, 0.05)", paddingBottom: "0.4rem" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--color-slate)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Official Identity & Domicile
              </span>
            </div>

            {/* Full Legal Name */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-navy)" }}>
                  Full Legal Name (as per Aadhaar / PAN) *
                </label>
                <div style={{ display: "flex", gap: "0.25rem" }}>
                  {["Mr.", "Mrs.", "Ms.", "Dr.", "Adv."].map((title) => (
                    <button
                      key={title}
                      type="button"
                      onClick={() => {
                        const currentName = formData.fullName.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Adv\.)\s*/i, "");
                        setFormData({ ...formData, fullName: `${title} ${currentName}`.trim() });
                      }}
                      style={{
                        padding: "0.15rem 0.45rem",
                        borderRadius: "999px",
                        fontSize: "0.68rem",
                        fontWeight: 600,
                        border: "1px solid rgba(27, 42, 74, 0.12)",
                        backgroundColor: formData.fullName.startsWith(title) ? "var(--color-navy)" : "rgba(27, 42, 74, 0.04)",
                        color: formData.fullName.startsWith(title) ? "#FFFFFF" : "var(--color-slate)",
                        cursor: "pointer",
                      }}
                    >
                      {title}
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="text"
                required
                name="fullName"
                placeholder="Dr. Rohit Srivastava"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.55rem 0.85rem",
                  borderRadius: "10px",
                  border: "1px solid rgba(27, 42, 74, 0.12)",
                  fontSize: "0.85rem",
                  color: "var(--color-navy)",
                  backgroundColor: "rgba(27, 42, 74, 0.02)",
                  outline: "none",
                }}
              />
            </div>

            {/* Parent Name (Son / Daughter of) & Workplace */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.25rem" }}>
                  Parent&apos;s Name (Son/Daughter of)
                </label>
                <input
                  type="text"
                  name="fatherOrMotherName"
                  placeholder="Late Mrs. Manju Srivastava"
                  value={formData.fatherOrMotherName || ""}
                  onChange={(e) => setFormData({ ...formData, fatherOrMotherName: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "8px",
                    border: "1px solid rgba(27, 42, 74, 0.12)",
                    fontSize: "0.82rem",
                    color: "var(--color-navy)",
                    backgroundColor: "rgba(27, 42, 74, 0.02)",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.25rem" }}>
                  Workplace / Institutional Affiliation
                </label>
                <input
                  type="text"
                  name="workplace"
                  placeholder="Room 505, Dept of Biosciences, IIT Bombay"
                  value={formData.workplace || ""}
                  onChange={(e) => setFormData({ ...formData, workplace: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "8px",
                    border: "1px solid rgba(27, 42, 74, 0.12)",
                    fontSize: "0.82rem",
                    color: "var(--color-navy)",
                    backgroundColor: "rgba(27, 42, 74, 0.02)",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Statutory Tax & Identity: PAN & Aadhaar */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.25rem" }}>
                  Permanent Account Number (PAN)
                </label>
                <input
                  type="text"
                  name="pan"
                  placeholder="BAZPS9068N"
                  maxLength={10}
                  value={formData.pan || ""}
                  onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "8px",
                    border: "1px solid rgba(27, 42, 74, 0.12)",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    color: "var(--color-navy)",
                    backgroundColor: "rgba(27, 42, 74, 0.02)",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.25rem" }}>
                  Aadhaar Number (12-Digit / Masked)
                </label>
                <input
                  type="text"
                  name="aadhaar"
                  placeholder="3546 XXXX XXXX"
                  maxLength={16}
                  value={formData.aadhaar || ""}
                  onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "8px",
                    border: "1px solid rgba(27, 42, 74, 0.12)",
                    fontSize: "0.82rem",
                    letterSpacing: "0.05em",
                    color: "var(--color-navy)",
                    backgroundColor: "rgba(27, 42, 74, 0.02)",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Gender & Age / DOB in 1 Row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: "0.75rem", alignItems: "flex-end" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                  Gender
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.35rem" }}>
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
                        onClick={() => setFormData({ ...formData, gender: g.id as any })}
                        style={{
                          padding: "0.45rem 0.4rem",
                          borderRadius: "8px",
                          border: isSel ? "2px solid var(--color-gold)" : "1px solid rgba(27, 42, 74, 0.12)",
                          backgroundColor: isSel ? "rgba(201, 162, 39, 0.1)" : "#FFFFFF",
                          color: "var(--color-navy)",
                          fontSize: "0.8rem",
                          fontWeight: isSel ? 700 : 500,
                          cursor: "pointer",
                          textAlign: "center",
                        }}
                      >
                        {g.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--color-navy)" }}>
                    Date of Birth & Age
                  </label>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--color-gold)" }}>
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
                  style={{
                    width: "100%",
                    padding: "0.55rem 0.75rem",
                    borderRadius: "10px",
                    border: "1px solid rgba(27, 42, 74, 0.12)",
                    fontSize: "0.85rem",
                    color: "var(--color-navy)",
                    backgroundColor: "rgba(27, 42, 74, 0.02)",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Phone & Email */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.25rem" }}>
                  Mobile Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98100 45210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.55rem 0.75rem",
                    borderRadius: "10px",
                    border: "1px solid rgba(27, 42, 74, 0.12)",
                    fontSize: "0.85rem",
                    color: "var(--color-navy)",
                    backgroundColor: "rgba(27, 42, 74, 0.02)",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.25rem" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.55rem 0.75rem",
                    borderRadius: "10px",
                    border: "1px solid rgba(27, 42, 74, 0.12)",
                    fontSize: "0.85rem",
                    color: "var(--color-navy)",
                    backgroundColor: "rgba(27, 42, 74, 0.02)",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.25rem" }}>
                Permanent Residential Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="House/Apt No., Street, Sector / Landmark"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.55rem 0.75rem",
                  borderRadius: "10px",
                  border: "1px solid rgba(27, 42, 74, 0.12)",
                  fontSize: "0.85rem",
                  color: "var(--color-navy)",
                  backgroundColor: "rgba(27, 42, 74, 0.02)",
                  outline: "none",
                }}
              />
            </div>

            {/* City, State, PIN */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 0.85fr", gap: "0.65rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.2rem" }}>
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Gurugram"
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.65rem",
                    borderRadius: "8px",
                    border: "1px solid rgba(27, 42, 74, 0.12)",
                    fontSize: "0.82rem",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.2rem" }}>
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="Haryana"
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.65rem",
                    borderRadius: "8px",
                    border: "1px solid rgba(27, 42, 74, 0.12)",
                    fontSize: "0.82rem",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.2rem" }}>
                  PIN Code
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  placeholder="122002"
                  style={{
                    width: "100%",
                    padding: "0.5rem 0.65rem",
                    borderRadius: "8px",
                    border: "1px solid rgba(27, 42, 74, 0.12)",
                    fontSize: "0.82rem",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Quick Metro City Pills */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--color-slate)" }}>
                Quick:
              </span>
              {cityPresets.slice(0, 5).map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => handleCityPreset(c.name, c.state, c.pin)}
                  style={{
                    padding: "0.2rem 0.5rem",
                    borderRadius: "999px",
                    backgroundColor: formData.city === c.name ? "rgba(201, 162, 39, 0.15)" : "rgba(27, 42, 74, 0.04)",
                    border: formData.city === c.name ? "1px solid var(--color-gold)" : "1px solid transparent",
                    color: "var(--color-navy)",
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

          {/* Right Column: Marital, Legal Framework, Prior Will */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              minHeight: 0,
              overflowY: "auto",
            }}
          >
            {/* Marital Status (Compact 2x2 Grid) */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "18px",
                border: "1px solid rgba(27, 42, 74, 0.08)",
                padding: "0.85rem 1rem",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.02)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.45rem" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--color-navy)" }}>
                  Marital Status
                </span>
                <span style={{ fontSize: "0.7rem", color: "var(--color-slate)" }}>
                  Determines spousal legal rights
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.45rem" }}>
                {maritalOptions.map((opt) => {
                  const isSel = formData.maritalStatus === opt.id;
                  const OptIcon = opt.Icon;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setFormData({ ...formData, maritalStatus: opt.id })}
                      style={{
                        borderRadius: "10px",
                        border: isSel ? "2px solid var(--color-gold)" : "1px solid rgba(27, 42, 74, 0.1)",
                        backgroundColor: isSel ? "rgba(201, 162, 39, 0.08)" : "rgba(27, 42, 74, 0.01)",
                        padding: "0.5rem 0.65rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <OptIcon size={16} color={isSel ? "var(--color-navy)" : "var(--color-slate)"} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--color-navy)" }}>
                          {opt.title}
                        </div>
                      </div>
                      {isSel && <CheckCircle2 size={14} color="var(--color-gold)" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Personal Law Framework (Compact Grid of 6 Pills) */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "18px",
                border: "1px solid rgba(27, 42, 74, 0.08)",
                padding: "0.85rem 1rem",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.02)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.45rem" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--color-navy)" }}>
                  Personal Law / Succession Act Framework
                </span>
                <span style={{ fontSize: "0.7rem", color: "var(--color-slate)" }}>
                  Governing jurisprudence
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.45rem" }}>
                {religionOptions.map((opt) => {
                  const isSel = formData.religionPersonalLaw === opt.id;
                  const OptIcon = opt.Icon;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setFormData({ ...formData, religionPersonalLaw: opt.id })}
                      style={{
                        borderRadius: "10px",
                        border: isSel ? "2px solid var(--color-gold)" : "1px solid rgba(27, 42, 74, 0.1)",
                        backgroundColor: isSel ? "rgba(201, 162, 39, 0.08)" : "rgba(27, 42, 74, 0.01)",
                        padding: "0.45rem 0.65rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "0.4rem",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", minWidth: 0 }}>
                        <OptIcon size={14} color="var(--color-navy)" />
                        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--color-navy)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {opt.title.split("/")[0].trim()}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: "0.62rem",
                          fontWeight: 700,
                          padding: "0.1rem 0.35rem",
                          borderRadius: "4px",
                          backgroundColor: "rgba(124, 148, 115, 0.15)",
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

            {/* Prior Will & Statutory Revocation (Compact Rows) */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "18px",
                border: "1px solid rgba(27, 42, 74, 0.08)",
                padding: "0.75rem 1rem",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.02)",
                display: "flex",
                flexDirection: "column",
                gap: "0.55rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-navy)" }}>
                    Prior Testamentary Documents
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "var(--color-slate)" }}>
                    Have you previously executed a Will or Codicil?
                  </div>
                </div>
                <AppleSwitch
                  checked={formData.hasPreviousWill || false}
                  onChange={(checked) => setFormData((prev) => ({ ...prev, hasPreviousWill: checked }))}
                />
              </div>

              <div style={{ height: "1px", backgroundColor: "rgba(27, 42, 74, 0.06)" }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-navy)" }}>
                    Statutory Revocation Clause (S.62 ISA)
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "var(--color-slate)" }}>
                    Explicitly revoke all prior testamentary instruments
                  </div>
                </div>
                <AppleSwitch
                  checked={formData.revokePreviousWill ?? true}
                  onChange={(checked) => setFormData((prev) => ({ ...prev, revokePreviousWill: checked }))}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Action Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.6rem 1rem",
            backgroundColor: "#FFFFFF",
            borderRadius: "14px",
            border: "1px solid rgba(27, 42, 74, 0.08)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
          }}
        >
          <button
            type="button"
            onClick={onBack}
            style={{
              padding: "0.55rem 1.25rem",
              borderRadius: "10px",
              border: "1px solid rgba(27, 42, 74, 0.15)",
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
              borderRadius: "10px",
              fontSize: "0.9rem",
              fontWeight: 700,
              boxShadow: "0 4px 16px rgba(201, 162, 39, 0.25)",
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
