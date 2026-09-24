"use client";

import React, { useState } from "react";
import { WillDraftingState, TestatorProfile } from "@/lib/willDraftingStore";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";
import QuickChipGroup from "@/components/ui/QuickChipGroup";
import { User, MapPin, Sparkles, Check, Building, CreditCard, Shield } from "lucide-react";

interface VisualStepAboutYouProps {
  state: WillDraftingState;
  onUpdate: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
}

export default function VisualStepAboutYou({ state, onUpdate, onNext }: VisualStepAboutYouProps) {
  const [formData, setFormData] = useState<TestatorProfile>(state.testator);

  const cityChips = [
    { id: "Mumbai", label: "Mumbai", hindiLabel: "मुंबई", icon: "🏙️" },
    { id: "Delhi NCR", label: "Delhi NCR", hindiLabel: "दिल्ली", icon: "🏛️" },
    { id: "Bengaluru", label: "Bengaluru", hindiLabel: "बेंगलुरु", icon: "💻" },
    { id: "Pune", label: "Pune", hindiLabel: "पुणे", icon: "🌳" },
    { id: "Hyderabad", label: "Hyderabad", hindiLabel: "हैदराबाद", icon: "💎" },
    { id: "Patna", label: "Patna", hindiLabel: "पटना", icon: "🌾" },
    { id: "Kolkata", label: "Kolkata", hindiLabel: "कोलकाता", icon: "🚋" },
    { id: "Lucknow", label: "Lucknow", hindiLabel: "लखनऊ", icon: "🏰" },
  ];

  const handleSave = () => {
    onUpdate((prev) => ({
      ...prev,
      testator: formData,
    }));
    onNext();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "800px", margin: "0 auto", paddingBottom: "5rem" }}>
      {/* Question Header Card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "20px",
          padding: "1.5rem 1.75rem",
          border: "1px solid rgba(15, 29, 56, 0.08)",
          boxShadow: "0 4px 20px rgba(15, 29, 56, 0.04)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.25rem 0.65rem", borderRadius: "999px", backgroundColor: "rgba(212, 175, 55, 0.15)", color: "var(--color-navy)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.35rem" }}>
            <Sparkles size={13} color="var(--color-gold)" />
            Step 1 of 6 • Identity
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--color-navy)", margin: 0 }}>
            Who is making this Will?
          </h2>
          <div style={{ fontSize: "0.95rem", color: "#8A6D1B", fontWeight: 600, marginTop: "0.2rem" }}>
            (यह वसीयत किसके नाम पर बनाई जा रही है?)
          </div>
        </div>

        <AudioAssistantButton
          textToSpeak="Who is making this will? Please select your gender, enter your legal name as on PAN or Aadhaar, your parent's name, and residential address. This ensures your will is legally undisputed."
          label="Listen / सुनें 🔊"
        />
      </div>

      {/* 1. Gender Selection (Large Tactile Avatar Cards) */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", padding: "1.5rem", border: "1px solid rgba(15, 29, 56, 0.08)" }}>
        <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.75rem" }}>
          1. Select Gender / लिंग चुनें *
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.85rem" }}>
          {[
            { id: "male", emoji: "👨", title: "Male", hindi: "पुरुष", prefix: "Mr." },
            { id: "female", emoji: "👩", title: "Female", hindi: "महिला", prefix: "Mrs." },
            { id: "other", emoji: "🧑", title: "Other", hindi: "अन्य", prefix: "" },
          ].map((item) => {
            const isSelected = formData.gender === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setFormData((prev) => ({ ...prev, gender: item.id as any }))}
                style={{
                  padding: "1.25rem 1rem",
                  borderRadius: "16px",
                  border: isSelected ? "2.5px solid var(--color-gold)" : "1.5px solid rgba(15, 29, 56, 0.1)",
                  backgroundColor: isSelected ? "rgba(212, 175, 55, 0.08)" : "#F8FAFC",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  boxShadow: isSelected ? "0 6px 16px rgba(212, 175, 55, 0.2)" : "none",
                }}
              >
                <span style={{ fontSize: "2.4rem", marginBottom: "0.35rem" }}>{item.emoji}</span>
                <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--color-navy)" }}>{item.title}</span>
                <span style={{ fontSize: "0.8rem", color: "#64748B", fontWeight: 500 }}>{item.hindi}</span>
                {isSelected && (
                  <div style={{ marginTop: "0.4rem", width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "var(--color-gold)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF" }}>
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Full Name & Parent's Name */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", padding: "1.5rem", border: "1px solid rgba(15, 29, 56, 0.08)", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
            2. Full Legal Name / आपका पूरा नाम (as per PAN / Aadhaar) *
          </label>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
              placeholder="e.g. Dr. Rohit Srivastava"
              style={{
                width: "100%",
                padding: "0.85rem 1rem 0.85rem 2.75rem",
                borderRadius: "12px",
                border: "1.5px solid rgba(15, 29, 56, 0.15)",
                fontSize: "1rem",
                fontWeight: 600,
                color: "var(--color-navy)",
                outline: "none",
                backgroundColor: "#FFFFFF",
              }}
            />
            <User size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
              Parent&apos;s Name / माता-पिता का नाम (Son/Daughter of)
            </label>
            <input
              type="text"
              value={formData.fatherOrMotherName || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, fatherOrMotherName: e.target.value }))}
              placeholder="e.g. Late Mrs. Manju Srivastava"
              style={{
                width: "100%",
                padding: "0.8rem 1rem",
                borderRadius: "12px",
                border: "1.5px solid rgba(15, 29, 56, 0.15)",
                fontSize: "0.95rem",
                color: "var(--color-navy)",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
              Workplace / कार्यस्थल (Institution or Business)
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                value={formData.workplace || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, workplace: e.target.value }))}
                placeholder="e.g. IIT Bombay, Powai, Mumbai"
                style={{
                  width: "100%",
                  padding: "0.8rem 1rem 0.8rem 2.5rem",
                  borderRadius: "12px",
                  border: "1.5px solid rgba(15, 29, 56, 0.15)",
                  fontSize: "0.95rem",
                  color: "var(--color-navy)",
                  outline: "none",
                }}
              />
              <Building size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Statutory Tax IDs: PAN & Aadhaar */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", padding: "1.5rem", border: "1px solid rgba(15, 29, 56, 0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <Shield size={18} color="var(--color-gold)" />
          <label style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--color-navy)", margin: 0 }}>
            3. Official Identity Cards (PAN & Aadhaar) / पहचान पत्र
          </label>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <span style={{ fontSize: "0.8rem", color: "#64748B", fontWeight: 600 }}>PAN Number (पैन कार्ड)</span>
            <input
              type="text"
              maxLength={10}
              value={formData.pan || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, pan: e.target.value.toUpperCase() }))}
              placeholder="BAZPS9068N"
              style={{
                width: "100%",
                padding: "0.8rem 1rem",
                borderRadius: "12px",
                border: "1.5px solid rgba(15, 29, 56, 0.15)",
                fontSize: "1rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "var(--color-navy)",
                marginTop: "0.25rem",
                outline: "none",
              }}
            />
          </div>

          <div>
            <span style={{ fontSize: "0.8rem", color: "#64748B", fontWeight: 600 }}>Aadhaar Number (आधार नंबर)</span>
            <input
              type="text"
              maxLength={16}
              value={formData.aadhaar || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, aadhaar: e.target.value }))}
              placeholder="3546 XXXX XXXX"
              style={{
                width: "100%",
                padding: "0.8rem 1rem",
                borderRadius: "12px",
                border: "1.5px solid rgba(15, 29, 56, 0.15)",
                fontSize: "1rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "var(--color-navy)",
                marginTop: "0.25rem",
                outline: "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* 4. Residential Address & Quick City Tap */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", padding: "1.5rem", border: "1px solid rgba(15, 29, 56, 0.08)", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, color: "var(--color-navy)" }}>
          4. Permanent Residential Address / निवास स्थान का पता *
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
          placeholder="e.g. 201 Barberry, Nahar Amrit Shakti, Chandivali"
          style={{
            width: "100%",
            padding: "0.85rem 1rem",
            borderRadius: "12px",
            border: "1.5px solid rgba(15, 29, 56, 0.15)",
            fontSize: "0.95rem",
            color: "var(--color-navy)",
            outline: "none",
          }}
        />

        {/* Quick City Presets */}
        <div>
          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748B", marginBottom: "0.4rem", display: "block" }}>
            Tap your city for 1-click fill / शहर चुनें:
          </span>
          <QuickChipGroup
            options={cityChips}
            value={formData.city}
            onChange={(city) => {
              if (city === "Mumbai") setFormData((p) => ({ ...p, city: "Mumbai", state: "Maharashtra", pincode: "400072" }));
              else if (city === "Delhi NCR") setFormData((p) => ({ ...p, city: "New Delhi", state: "Delhi", pincode: "110001" }));
              else if (city === "Bengaluru") setFormData((p) => ({ ...p, city: "Bengaluru", state: "Karnataka", pincode: "560001" }));
              else if (city === "Pune") setFormData((p) => ({ ...p, city: "Pune", state: "Maharashtra", pincode: "411001" }));
              else if (city === "Patna") setFormData((p) => ({ ...p, city: "Patna", state: "Bihar", pincode: "800001" }));
              else setFormData((p) => ({ ...p, city }));
            }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 0.8fr", gap: "0.75rem", marginTop: "0.5rem" }}>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
            placeholder="City"
            style={{ padding: "0.75rem 0.85rem", borderRadius: "10px", border: "1.5px solid rgba(15, 29, 56, 0.15)", fontSize: "0.9rem" }}
          />
          <input
            type="text"
            value={formData.state}
            onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value }))}
            placeholder="State"
            style={{ padding: "0.75rem 0.85rem", borderRadius: "10px", border: "1.5px solid rgba(15, 29, 56, 0.15)", fontSize: "0.9rem" }}
          />
          <input
            type="text"
            value={formData.pincode}
            onChange={(e) => setFormData((prev) => ({ ...prev, pincode: e.target.value }))}
            placeholder="PIN Code"
            style={{ padding: "0.75rem 0.85rem", borderRadius: "10px", border: "1.5px solid rgba(15, 29, 56, 0.15)", fontSize: "0.9rem" }}
          />
        </div>
      </div>

      {/* Next CTA Button */}
      <button
        type="button"
        onClick={handleSave}
        className="btn btn-gold"
        style={{
          padding: "1rem 2rem",
          borderRadius: "14px",
          fontSize: "1.05rem",
          fontWeight: 800,
          boxShadow: "0 8px 24px rgba(212, 175, 55, 0.35)",
          cursor: "pointer",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.65rem",
          width: "100%",
        }}
      >
        <span>Save & Continue to Family (परिवार की जानकारी) ➔</span>
      </button>
    </div>
  );
}
