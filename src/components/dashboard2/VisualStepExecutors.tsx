"use client";

import React, { useState } from "react";
import {
  WillDraftingState,
  PersonContact,
} from "@/lib/willDraftingStore";
import {
  ShieldCheck,
  UserCheck,
  Plus,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  User,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";
import VisualChoiceCard from "@/components/ui/VisualChoiceCard";
import BottomSheetDrawer from "@/components/ui/BottomSheetDrawer";
import MobileStickyActionBar from "@/components/ui/MobileStickyActionBar";

interface VisualStepExecutorsProps {
  state: WillDraftingState;
  onUpdate: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function VisualStepExecutors({
  state,
  onUpdate,
  onNext,
  onBack,
}: VisualStepExecutorsProps) {
  const [primary, setPrimary] = useState<PersonContact>(
    state.executorPrimary?.name
      ? state.executorPrimary
      : {
          name: "Mr. Ashok Ajmera",
          relationship: "Sole Executor / Trusted Advisor",
          phone: "+91 98201 22334",
          email: "ashok.ajmera@example.com",
          address: "Mumbai, Maharashtra",
        }
  );

  const [alternate, setAlternate] = useState<PersonContact>(
    state.executorAlternate?.name
      ? state.executorAlternate
      : {
          name: "Mrs. Alpana Prakash",
          relationship: "Wife / Alternate Executor",
          phone: "+91 98200 98766",
          email: "alpana.prakash@example.com",
          address: "201 Barberry, Nahar Amrit Shakti, Chandivali, Mumbai – 400072",
        }
  );

  const [hasAlternate, setHasAlternate] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTarget, setDrawerTarget] = useState<"primary" | "alternate">("primary");

  // Form states for drawer
  const [tempName, setTempName] = useState("");
  const [tempRel, setTempRel] = useState("");
  const [tempPhone, setTempPhone] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [tempAddress, setTempAddress] = useState("");

  const adultFamily = state.familyMembers.filter((f) => !f.isMinor);

  const openEditDrawer = (target: "primary" | "alternate") => {
    setDrawerTarget(target);
    const targetData = target === "primary" ? primary : alternate;
    setTempName(targetData.name);
    setTempRel(targetData.relationship);
    setTempPhone(targetData.phone);
    setTempEmail(targetData.email);
    setTempAddress(targetData.address);
    setDrawerOpen(true);
  };

  const handleSaveDrawer = () => {
    const updated: PersonContact = {
      name: tempName,
      relationship: tempRel,
      phone: tempPhone,
      email: tempEmail,
      address: tempAddress,
    };

    if (drawerTarget === "primary") {
      setPrimary(updated);
    } else {
      setAlternate(updated);
    }
    setDrawerOpen(false);
  };

  const handleSelectFromFamily = (f: typeof state.familyMembers[0], target: "primary" | "alternate") => {
    const updated: PersonContact = {
      name: f.name,
      relationship: f.relationship === "spouse" ? "Wife / Alternate Executor" : f.relationship,
      phone: f.phone || "",
      email: f.email || "",
      address: f.address || "",
    };

    if (target === "primary") {
      setPrimary(updated);
    } else {
      setAlternate(updated);
    }
  };

  const handleContinue = () => {
    onUpdate((prev) => ({
      ...prev,
      executorPrimary: primary,
      executorAlternate: hasAlternate ? alternate : { name: "", relationship: "", phone: "", email: "", address: "" },
      lastUpdated: new Date().toISOString().split("T")[0],
    }));
    onNext();
  };

  const speechText =
    "Who will carry out your will? The Executor is like the captain of a ship who ensures your assets are handed over smoothly to your family. You can pick a trusted family member or an advisor.";

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "1.25rem 1rem 6rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.25rem 0.65rem", borderRadius: "12px", background: "rgba(201, 162, 39, 0.12)", color: "var(--color-navy)", fontSize: "0.78rem", fontWeight: 700, marginBottom: "0.4rem" }}>
            <Sparkles size={13} color="var(--color-gold)" /> Step 5 of 6 • भरोसेमंद साथी
          </div>
          <h1 style={{ fontSize: "1.65rem", fontWeight: 800, color: "var(--color-navy)", margin: "0 0 0.35rem" }}>
            Choose Your Will’s Captain (Executor)
          </h1>
          <p style={{ fontSize: "0.92rem", color: "var(--color-slate)", margin: 0, lineHeight: 1.45 }}>
            An Executor is the trusted person who will present your Will to banks, companies, and courts.
          </p>
        </div>
        <AudioAssistantButton textToSpeak={speechText} label="Listen / सुनें 🔊" />
      </div>

      {/* Concept Card */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(27, 42, 74, 0.04) 0%, rgba(201, 162, 39, 0.06) 100%)",
          borderRadius: "16px",
          border: "1px solid rgba(27, 42, 74, 0.08)",
          padding: "1rem 1.25rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1.75rem",
        }}
      >
        <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", flexShrink: 0 }}>
          <HeartHandshake size={24} color="var(--color-gold)" />
        </div>
        <div>
          <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--color-navy)" }}>
            What does an Executor do? (एग्जीक्यूटर क्या करता है?)
          </div>
          <div style={{ fontSize: "0.82rem", color: "var(--color-slate)", lineHeight: 1.4 }}>
            They submit your Will to banks for account transfers, inform companies for equity transmission, and distribute your property exactly as written.
          </div>
        </div>
      </div>

      {/* 1. Primary Executor Section */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--color-navy)", margin: 0 }}>
              1. Primary Executor (मुख्य प्रबंधक)
            </h2>
            <div style={{ fontSize: "0.8rem", color: "var(--color-slate)" }}>
              First choice to handle all estate tasks
            </div>
          </div>
          <button
            onClick={() => openEditDrawer("primary")}
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "var(--color-gold)",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Edit Details ✏️
          </button>
        </div>

        {/* Selected Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            border: "2px solid var(--color-gold)",
            padding: "1.25rem",
            boxShadow: "0 4px 16px rgba(201, 162, 39, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.3rem",
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {primary.name.charAt(0) || "E"}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--color-navy)" }}>
                  {primary.name || "None Selected"}
                </div>
                <span style={{ fontSize: "0.72rem", background: "rgba(46, 125, 50, 0.1)", color: "#2E7D32", padding: "0.15rem 0.5rem", borderRadius: "10px", fontWeight: 700 }}>
                  Primary Selected ✓
                </span>
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--color-slate)", marginTop: "0.15rem" }}>
                {primary.relationship || "Trusted Contact"} • {primary.phone || "Phone on record"}
              </div>
              {primary.address && (
                <div style={{ fontSize: "0.78rem", color: "#64748B", marginTop: "0.15rem" }}>
                  📍 {primary.address}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Pick From Family */}
        <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--color-slate)", marginBottom: "0.5rem" }}>
          Or select from your family members:
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.65rem" }}>
          {adultFamily.map((f) => (
            <button
              key={f.id}
              onClick={() => handleSelectFromFamily(f, "primary")}
              style={{
                background: primary.name === f.name ? "rgba(201, 162, 39, 0.08)" : "#FFFFFF",
                border: primary.name === f.name ? "2px solid var(--color-gold)" : "1px solid rgba(27, 42, 74, 0.12)",
                borderRadius: "12px",
                padding: "0.65rem 0.85rem",
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div style={{ fontSize: "1.2rem" }}>
                {f.relationship === "spouse" ? "💍" : f.relationship === "brother" ? "👨‍💼" : "👤"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-navy)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {f.name}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--color-slate)", textTransform: "capitalize" }}>
                  {f.relationship}
                </div>
              </div>
              {primary.name === f.name && (
                <CheckCircle2 size={16} color="var(--color-gold)" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Alternate Executor Section */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--color-navy)", margin: 0 }}>
              2. Alternate Executor (बैकअप प्रबंधक)
            </h2>
            <div style={{ fontSize: "0.8rem", color: "var(--color-slate)" }}>
              Steps in if primary executor is unavailable
            </div>
          </div>
          <button
            onClick={() => openEditDrawer("alternate")}
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "var(--color-gold)",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Edit Details ✏️
          </button>
        </div>

        {/* Selected Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            border: "2px solid rgba(27, 42, 74, 0.15)",
            padding: "1.25rem",
            boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #334155 0%, #475569 100%)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.3rem",
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {alternate.name.charAt(0) || "A"}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--color-navy)" }}>
                  {alternate.name || "None Selected"}
                </div>
                <span style={{ fontSize: "0.72rem", background: "rgba(201, 162, 39, 0.15)", color: "var(--color-navy)", padding: "0.15rem 0.5rem", borderRadius: "10px", fontWeight: 700 }}>
                  Backup Alternate
                </span>
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--color-slate)", marginTop: "0.15rem" }}>
                {alternate.relationship || "Trusted Contact"} • {alternate.phone || "Phone on record"}
              </div>
              {alternate.address && (
                <div style={{ fontSize: "0.78rem", color: "#64748B", marginTop: "0.15rem" }}>
                  📍 {alternate.address}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Pick From Family for Alternate */}
        <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--color-slate)", marginBottom: "0.5rem" }}>
          Or select from your family members:
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.65rem" }}>
          {adultFamily.map((f) => (
            <button
              key={f.id}
              onClick={() => handleSelectFromFamily(f, "alternate")}
              style={{
                background: alternate.name === f.name ? "rgba(201, 162, 39, 0.08)" : "#FFFFFF",
                border: alternate.name === f.name ? "2px solid var(--color-gold)" : "1px solid rgba(27, 42, 74, 0.12)",
                borderRadius: "12px",
                padding: "0.65rem 0.85rem",
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div style={{ fontSize: "1.2rem" }}>
                {f.relationship === "spouse" ? "💍" : f.relationship === "brother" ? "👨‍💼" : "👤"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-navy)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {f.name}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--color-slate)", textTransform: "capitalize" }}>
                  {f.relationship}
                </div>
              </div>
              {alternate.name === f.name && (
                <CheckCircle2 size={16} color="var(--color-gold)" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Statutory Legal Tip */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid rgba(46, 125, 50, 0.2)",
          padding: "1rem 1.25rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
        }}
      >
        <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(46, 125, 50, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <ShieldCheck size={20} color="#2E7D32" />
        </div>
        <div style={{ fontSize: "0.85rem", color: "#1B2A4A", lineHeight: 1.4 }}>
          <strong>Section 222 Compliant (Indian Succession Act 1925):</strong> An executor can be a beneficiary under the Will (e.g. your spouse). Probate can be granted to an executor appointed either expressly or by necessary implication.
        </div>
      </div>

      {/* Drawer for Editing Contact Details */}
      <BottomSheetDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={drawerTarget === "primary" ? "Edit Primary Executor Details" : "Edit Alternate Executor Details"}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--color-navy)", display: "block", marginBottom: "0.3rem" }}>
              Full Legal Name (पूरा नाम) *
            </label>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="e.g. Mr. Ashok Ajmera"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "12px",
                border: "1.5px solid rgba(27, 42, 74, 0.18)",
                fontSize: "0.95rem",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--color-navy)", display: "block", marginBottom: "0.3rem" }}>
              Role or Relationship (रिश्ता / पद)
            </label>
            <input
              type="text"
              value={tempRel}
              onChange={(e) => setTempRel(e.target.value)}
              placeholder="e.g. Sole Executor / Trusted Advisor"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "12px",
                border: "1.5px solid rgba(27, 42, 74, 0.18)",
                fontSize: "0.95rem",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
            <div>
              <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--color-navy)", display: "block", marginBottom: "0.3rem" }}>
                Phone Number (मोबाइल)
              </label>
              <input
                type="text"
                value={tempPhone}
                onChange={(e) => setTempPhone(e.target.value)}
                placeholder="+91 98200 00000"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  border: "1.5px solid rgba(27, 42, 74, 0.18)",
                  fontSize: "0.95rem",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--color-navy)", display: "block", marginBottom: "0.3rem" }}>
                Email (ईमेल)
              </label>
              <input
                type="email"
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
                placeholder="executor@example.com"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  border: "1.5px solid rgba(27, 42, 74, 0.18)",
                  fontSize: "0.95rem",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--color-navy)", display: "block", marginBottom: "0.3rem" }}>
              Address (पता)
            </label>
            <input
              type="text"
              value={tempAddress}
              onChange={(e) => setTempAddress(e.target.value)}
              placeholder="e.g. Mumbai, Maharashtra"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "12px",
                border: "1.5px solid rgba(27, 42, 74, 0.18)",
                fontSize: "0.95rem",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            onClick={handleSaveDrawer}
            style={{
              marginTop: "0.5rem",
              padding: "0.85rem",
              borderRadius: "12px",
              background: "linear-gradient(135deg, var(--color-navy) 0%, #1a2f55 100%)",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "0.95rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Save Executor Details
          </button>
        </div>
      </BottomSheetDrawer>

      {/* Sticky Bottom Bar */}
      <MobileStickyActionBar
        onPrimary={handleContinue}
        primaryLabel="Generate Final Legal Will Deed →"
        onSecondary={onBack}
        secondaryLabel="← Back"
        disabled={!primary.name.trim()}
      />
    </div>
  );
}
