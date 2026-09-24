"use client";

import React, { useState } from "react";
import {
  WillDraftingState,
  FamilyMember,
  calculateIsMinor,
} from "@/lib/willDraftingStore";
import AppleSwitch from "@/components/dashboard/AppleSwitch";
import {
  Users,
  Heart,
  Baby,
  User,
  UserPlus,
  Plus,
  Trash2,
  X,
  ShieldCheck,
  AlertTriangle,
  Calendar,
  Sparkles,
  Info,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";

interface Step3FamilyProps {
  state: WillDraftingState;
  onUpdate: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3Family({
  state,
  onUpdate,
  onNext,
  onBack,
}: Step3FamilyProps) {
  const [family, setFamily] = useState<FamilyMember[]>(state.familyMembers || []);
  const [modalOpen, setModalOpen] = useState(false);

  // Form state for adding/editing a member
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState<FamilyMember["relationship"]>("spouse");
  const [ageSlider, setAgeSlider] = useState<number>(35);
  const [useExactDob, setUseExactDob] = useState(false);
  const [exactDob, setExactDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pan, setPan] = useState("");
  const [sameAddress, setSameAddress] = useState(true);

  // Open modal with preselected relation
  const handleOpenAdd = (defaultRel?: FamilyMember["relationship"]) => {
    const rel = defaultRel || "spouse";
    setRelationship(rel);
    // Sensible default age based on relation
    if (rel === "father" || rel === "mother") setAgeSlider(68);
    else if (rel === "son" || rel === "daughter") setAgeSlider(14);
    else if (rel === "spouse") setAgeSlider(42);
    else setAgeSlider(38);

    setName("");
    setUseExactDob(false);
    setExactDob("");
    setPhone("");
    setEmail("");
    setPan("");
    setSameAddress(true);
    setModalOpen(true);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    let finalDob = exactDob;
    if (!useExactDob || !exactDob) {
      const birthYear = new Date().getFullYear() - ageSlider;
      finalDob = `${birthYear}-06-15`;
    }

    const isMinor = ageSlider < 18;

    const newMember: FamilyMember = {
      id: `fam-${Date.now()}`,
      name: name.trim(),
      relationship,
      dob: finalDob,
      isMinor,
      pan: pan.trim() ? pan.trim().toUpperCase() : undefined,
      phone: phone.trim() || undefined,
      email: email.trim() || undefined,
      address: sameAddress ? "Same as testator" : undefined,
    };

    const updatedFamily = [...family, newMember];
    setFamily(updatedFamily);
    onUpdate((prev) => ({
      ...prev,
      familyMembers: updatedFamily,
    }));

    setModalOpen(false);
  };

  const handleDeleteMember = (id: string) => {
    const updatedFamily = family.filter((f) => f.id !== id);
    setFamily(updatedFamily);
    onUpdate((prev) => ({
      ...prev,
      familyMembers: updatedFamily,
    }));
  };

  const getAge = (dobString: string) => {
    if (!dobString) return null;
    const diffMs = Date.now() - new Date(dobString).getTime();
    const ageDate = new Date(diffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // Relationship metadata with Lucide icons
  const relConfig: Record<
    FamilyMember["relationship"],
    { label: string; Icon: React.ElementType; color: string; desc: string }
  > = {
    spouse: { label: "Spouse", Icon: Heart, color: "#E11D48", desc: "Wife / Husband" },
    son: { label: "Son", Icon: Baby, color: "#2563EB", desc: "Male Child" },
    daughter: { label: "Daughter", Icon: Baby, color: "#DB2777", desc: "Female Child" },
    father: { label: "Father", Icon: Users, color: "#7C9473", desc: "Paternal Ascendant" },
    mother: { label: "Mother", Icon: Users, color: "#C9A227", desc: "Maternal Ascendant" },
    brother: { label: "Brother", Icon: UserPlus, color: "#3B5173", desc: "Sibling" },
    sister: { label: "Sister", Icon: UserPlus, color: "#9333EA", desc: "Sibling" },
    other: { label: "Other Relative", Icon: User, color: "#64748B", desc: "Extended Family" },
  };

  // Group into generations for visual tree
  const parents = family.filter((f) => f.relationship === "father" || f.relationship === "mother");
  const immediate = family.filter(
    (f) => f.relationship === "spouse" || f.relationship === "brother" || f.relationship === "sister"
  );
  const children = family.filter(
    (f) => f.relationship === "son" || f.relationship === "daughter" || f.relationship === "other"
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", width: "100%", height: "100%", justifyContent: "space-between" }}>
      {/* Compact Header with Quick Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.2rem 0.65rem", borderRadius: "999px", backgroundColor: "rgba(201, 162, 39, 0.12)", color: "var(--color-navy)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-gold)" }}></span>
            Step 3 of 14 • Family Directory & Heirs
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem" }}>
            <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
              Your Family Circle
            </h2>
            <span style={{ fontSize: "0.88rem", color: "#8A6D1B", fontWeight: 600 }}>
              (परिवार एवं कानूनी वारिसदार)
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--color-slate)", fontWeight: 600 }}>
              • {family.length} Registered
            </span>
          </div>
        </div>

        {/* Quick Add Buttons with Audio Assistant */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", alignItems: "center" }}>
          <AudioAssistantButton
            textToSpeak="Who is in your family? Tap the quick buttons to add your spouse, children, parents, or siblings. We will help you assign your assets to them in the next steps."
            label="Listen / सुनें 🔊"
          />
          <button
            type="button"
            onClick={() => handleOpenAdd("spouse")}
            style={{
              padding: "0.45rem 0.85rem",
              borderRadius: "10px",
              backgroundColor: "rgba(225, 29, 72, 0.08)",
              border: "1px solid rgba(225, 29, 72, 0.2)",
              color: "#BE123C",
              fontSize: "0.8rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <Heart size={13} /> + Spouse (पति/पत्नी)
          </button>
          <button
            type="button"
            onClick={() => handleOpenAdd("son")}
            style={{
              padding: "0.45rem 0.85rem",
              borderRadius: "10px",
              backgroundColor: "rgba(37, 99, 235, 0.08)",
              border: "1px solid rgba(37, 99, 235, 0.2)",
              color: "#1D4ED8",
              fontSize: "0.8rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <Baby size={13} /> + Child (बच्चे)
          </button>
          <button
            type="button"
            onClick={() => handleOpenAdd("father")}
            style={{
              padding: "0.45rem 0.85rem",
              borderRadius: "10px",
              backgroundColor: "rgba(124, 148, 115, 0.12)",
              border: "1px solid rgba(124, 148, 115, 0.25)",
              color: "var(--color-sage)",
              fontSize: "0.8rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <Users size={13} /> + Parent (माता-पिता)
          </button>
          <button
            type="button"
            onClick={() => handleOpenAdd("brother")}
            style={{
              padding: "0.45rem 0.95rem",
              borderRadius: "10px",
              backgroundColor: "var(--color-navy)",
              border: "none",
              color: "#FFFFFF",
              fontSize: "0.8rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <Plus size={13} /> + Custom Relative
          </button>
        </div>
      </div>

      {/* 3-Column Horizontal Generations Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr 1fr",
          gap: "0.85rem",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* Column 1: Parents (Ascendants) */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "18px",
            border: "1px solid rgba(27, 42, 74, 0.08)",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.65rem",
            boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            minHeight: 0,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(27, 42, 74, 0.05)", paddingBottom: "0.4rem" }}>
            <span style={{ fontSize: "0.74rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-slate)" }}>
              Parents (Ascendants)
            </span>
            <button
              type="button"
              onClick={() => handleOpenAdd("father")}
              style={{
                fontSize: "0.72rem",
                color: "var(--color-sage)",
                fontWeight: 700,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              + Add
            </button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
            {parents.length === 0 ? (
              <div
                onClick={() => handleOpenAdd("father")}
                style={{
                  padding: "1.25rem 1rem",
                  borderRadius: "12px",
                  border: "1.5px dashed rgba(27, 42, 74, 0.12)",
                  backgroundColor: "rgba(27, 42, 74, 0.01)",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.4rem",
                  color: "var(--color-slate)",
                  fontSize: "0.8rem",
                  textAlign: "center",
                  height: "100%",
                }}
              >
                <Users size={20} color="var(--color-slate)" />
                <span>+ Record Father or Mother</span>
              </div>
            ) : (
              parents.map((m) => renderFamilyNode(m))
            )}
          </div>
        </div>

        {/* Column 2: Testator (You) + Spouse + Siblings */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "18px",
            border: "1px solid rgba(27, 42, 74, 0.08)",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.65rem",
            boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            minHeight: 0,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(27, 42, 74, 0.05)", paddingBottom: "0.4rem" }}>
            <span style={{ fontSize: "0.74rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-navy)" }}>
              Testator & Peers
            </span>
            <div style={{ display: "flex", gap: "0.45rem" }}>
              <button
                type="button"
                onClick={() => handleOpenAdd("spouse")}
                style={{ fontSize: "0.72rem", color: "#BE123C", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}
              >
                + Spouse
              </button>
              <button
                type="button"
                onClick={() => handleOpenAdd("brother")}
                style={{ fontSize: "0.72rem", color: "var(--color-slate)", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}
              >
                + Sibling
              </button>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
            {/* Testator Card (Self) */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(27, 42, 74, 0.04), rgba(201, 162, 39, 0.06))",
                borderRadius: "14px",
                border: "1.5px solid var(--color-gold)",
                padding: "0.75rem 0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
              }}
            >
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "10px",
                  backgroundColor: "var(--color-navy)",
                  color: "var(--color-gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <User size={18} />
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <h4 style={{ margin: 0, fontSize: "0.88rem", fontWeight: 800, color: "var(--color-navy)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {state.testator.fullName || "You (Testator)"}
                  </h4>
                  <span style={{ fontSize: "0.64rem", fontWeight: 800, backgroundColor: "var(--color-gold)", color: "var(--color-navy)", padding: "0.08rem 0.35rem", borderRadius: "999px" }}>
                    Author
                  </span>
                </div>
                <div style={{ fontSize: "0.7rem", color: "var(--color-slate)", marginTop: "0.1rem" }}>
                  Sound Disposing Mind • S.59 ISA
                </div>
              </div>
            </div>

            {/* Immediate Family Members */}
            {immediate.map((m) => renderFamilyNode(m))}
          </div>
        </div>

        {/* Column 3: Children & Descendants */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "18px",
            border: "1px solid rgba(27, 42, 74, 0.08)",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.65rem",
            boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            minHeight: 0,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(27, 42, 74, 0.05)", paddingBottom: "0.4rem" }}>
            <span style={{ fontSize: "0.74rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-slate)" }}>
              Children & Descendants
            </span>
            <button
              type="button"
              onClick={() => handleOpenAdd("son")}
              style={{ fontSize: "0.72rem", color: "#1D4ED8", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}
            >
              + Add Child
            </button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
            {children.length === 0 ? (
              <div
                onClick={() => handleOpenAdd("son")}
                style={{
                  padding: "1.25rem 1rem",
                  borderRadius: "12px",
                  border: "1.5px dashed rgba(27, 42, 74, 0.12)",
                  backgroundColor: "rgba(27, 42, 74, 0.01)",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.4rem",
                  color: "var(--color-slate)",
                  fontSize: "0.8rem",
                  textAlign: "center",
                  height: "100%",
                }}
              >
                <Baby size={20} color="var(--color-slate)" />
                <span>+ Record Son, Daughter or Dependent</span>
              </div>
            ) : (
              children.map((m) => renderFamilyNode(m))
            )}
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
          type="button"
          onClick={onNext}
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
          Save & Continue to Assets →
        </button>
      </div>

      {/* Apple Sheet Modal for Adding/Configuring Family Member */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(22, 35, 60, 0.65)",
            backdropFilter: "blur(14px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              width: "100%",
              maxWidth: "540px",
              maxHeight: "92vh",
              overflowY: "auto",
              padding: "2rem 2.25rem",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Handle Bar */}
            <div
              style={{
                width: "42px",
                height: "4px",
                borderRadius: "999px",
                backgroundColor: "rgba(27, 42, 74, 0.2)",
                margin: "-0.5rem auto 1.5rem",
              }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div>
                <h3 style={{ margin: 0, color: "var(--color-navy)", fontSize: "1.35rem", fontWeight: 800 }}>
                  Add Family Member
                </h3>
                <p style={{ margin: "0.25rem 0 0", fontSize: "0.825rem", color: "var(--color-slate)" }}>
                  Registered as a recognized natural heir in your testament.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(27, 42, 74, 0.06)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-slate)",
                }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddMember} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Relationship Picker Cards */}
              <div>
                <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.5rem" }}>
                  Relationship to You *
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
                  {(
                    [
                      "spouse",
                      "son",
                      "daughter",
                      "father",
                      "mother",
                      "brother",
                      "sister",
                      "other",
                    ] as FamilyMember["relationship"][]
                  ).map((rel) => {
                    const cfg = relConfig[rel];
                    const isSel = relationship === rel;
                    const RelIcon = cfg.Icon;
                    return (
                      <button
                        key={rel}
                        type="button"
                        onClick={() => {
                          setRelationship(rel);
                          if (rel === "father" || rel === "mother") setAgeSlider(68);
                          else if (rel === "son" || rel === "daughter") setAgeSlider(14);
                          else if (rel === "spouse") setAgeSlider(42);
                        }}
                        style={{
                          padding: "0.65rem 0.4rem",
                          borderRadius: "14px",
                          border: isSel ? `2px solid ${cfg.color}` : "1px solid rgba(27, 42, 74, 0.1)",
                          backgroundColor: isSel ? `${cfg.color}10` : "#FFFFFF",
                          color: isSel ? "var(--color-navy)" : "var(--color-slate)",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "0.35rem",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <RelIcon size={18} color={isSel ? cfg.color : "var(--color-slate)"} />
                        <span style={{ fontSize: "0.725rem", fontWeight: isSel ? 700 : 500 }}>{cfg.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Full Legal Name */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                  <label style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)" }}>
                    Full Legal Name *
                  </label>
                  {/* Quick Salutation Chips */}
                  <div style={{ display: "flex", gap: "0.25rem" }}>
                    {(relationship === "son" || (relationship === "daughter" && ageSlider < 18)
                      ? ["Master", "Miss"]
                      : ["Shri", "Smt.", "Dr."]
                    ).map((prefix) => (
                      <button
                        key={prefix}
                        type="button"
                        onClick={() => {
                          const clean = name.replace(/^(Master|Miss|Shri|Smt\.|Dr\.)\s*/i, "");
                          setName(`${prefix} ${clean}`.trim());
                        }}
                        style={{
                          padding: "0.15rem 0.45rem",
                          borderRadius: "999px",
                          fontSize: "0.675rem",
                          fontWeight: 600,
                          backgroundColor: name.startsWith(prefix) ? "var(--color-navy)" : "rgba(27, 42, 74, 0.05)",
                          color: name.startsWith(prefix) ? "#FFFFFF" : "var(--color-slate)",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        {prefix}
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  type="text"
                  required
                  placeholder={
                    relationship === "spouse"
                      ? "e.g., Sunita Sharma"
                      : relationship === "son"
                      ? "e.g., Aryan Sharma"
                      : "e.g., Relative Name"
                  }
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "12px",
                    border: "1px solid rgba(27, 42, 74, 0.12)",
                    fontSize: "0.95rem",
                    color: "var(--color-navy)",
                    outline: "none",
                  }}
                />
              </div>

              {/* Interactive Age Slider with Legal Capacity Indicator */}
              <div
                style={{
                  backgroundColor: "rgba(27, 42, 74, 0.02)",
                  borderRadius: "16px",
                  padding: "1.25rem",
                  border: "1px solid rgba(27, 42, 74, 0.08)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)" }}>
                    Approximate Age
                  </span>

                  {/* Dynamic Status Badge */}
                  {ageSlider < 18 ? (
                    <span
                      style={{
                        fontSize: "0.725rem",
                        fontWeight: 700,
                        padding: "0.2rem 0.6rem",
                        borderRadius: "999px",
                        backgroundColor: "rgba(225, 29, 72, 0.1)",
                        color: "#BE123C",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <AlertTriangle size={12} /> Minor (Guardian Legally Required)
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: "0.725rem",
                        fontWeight: 700,
                        padding: "0.2rem 0.6rem",
                        borderRadius: "999px",
                        backgroundColor: "rgba(124, 148, 115, 0.15)",
                        color: "var(--color-sage)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <CheckCircle2 size={12} /> Adult Beneficiary (18+)
                    </span>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--color-navy)" }}>
                    {ageSlider}
                  </span>
                  <span style={{ fontSize: "0.85rem", color: "var(--color-slate)", fontWeight: 600 }}>
                    Years Old (Born approx. {new Date().getFullYear() - ageSlider})
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="95"
                  value={ageSlider}
                  onChange={(e) => setAgeSlider(parseInt(e.target.value, 10))}
                  style={{
                    width: "100%",
                    height: "8px",
                    borderRadius: "999px",
                    accentColor: ageSlider < 18 ? "#E11D48" : "var(--color-gold)",
                    cursor: "pointer",
                  }}
                />

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.4rem", fontSize: "0.7rem", color: "var(--color-slate)" }}>
                  <span>Infant (0y)</span>
                  <span style={{ color: "#BE123C", fontWeight: 700 }}>Majority Mark (18y)</span>
                  <span>Senior (95y)</span>
                </div>

                {/* Optional Exact DOB Toggle */}
                <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px dashed rgba(27, 42, 74, 0.1)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.775rem", color: "var(--color-slate)" }}>
                      Have exact passport / birth certificate date?
                    </span>
                    <button
                      type="button"
                      onClick={() => setUseExactDob(!useExactDob)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--color-navy)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      {useExactDob ? "Use age slider" : "Enter exact date"}
                    </button>
                  </div>
                  {useExactDob && (
                    <input
                      type="date"
                      value={exactDob}
                      onChange={(e) => {
                        setExactDob(e.target.value);
                        if (e.target.value) {
                          const year = new Date(e.target.value).getFullYear();
                          if (!isNaN(year)) setAgeSlider(new Date().getFullYear() - year);
                        }
                      }}
                      style={{
                        marginTop: "0.5rem",
                        width: "100%",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "10px",
                        border: "1px solid rgba(27, 42, 74, 0.15)",
                        fontSize: "0.85rem",
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Optional Contact Fields (Phone & Address) */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.775rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98100..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      borderRadius: "10px",
                      border: "1px solid rgba(27, 42, 74, 0.12)",
                      fontSize: "0.85rem",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.775rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="relative@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      borderRadius: "10px",
                      border: "1px solid rgba(27, 42, 74, 0.12)",
                      fontSize: "0.85rem",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* PAN Number Field */}
              <div>
                <label style={{ display: "block", fontSize: "0.775rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                  Permanent Account Number (PAN) (Recommended for identification)
                </label>
                <input
                  type="text"
                  placeholder="e.g. CJDPP6174L or UNGPS6807G"
                  maxLength={10}
                  value={pan}
                  onChange={(e) => setPan(e.target.value.toUpperCase())}
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "10px",
                    border: "1px solid rgba(27, 42, 74, 0.12)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    outline: "none",
                  }}
                />
              </div>

              {/* Same Address Switch */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  backgroundColor: "rgba(27, 42, 74, 0.03)",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--color-navy)" }}>
                    Resides at your address
                  </div>
                  <div style={{ fontSize: "0.725rem", color: "var(--color-slate)" }}>
                    Uses same permanent residence as testator
                  </div>
                </div>
                <AppleSwitch checked={sameAddress} onChange={setSameAddress} />
              </div>

              {/* Submit Buttons */}
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  style={{
                    flex: 1,
                    padding: "0.8rem",
                    borderRadius: "12px",
                    border: "1px solid rgba(27, 42, 74, 0.15)",
                    backgroundColor: "#FFFFFF",
                    color: "var(--color-navy)",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-gold"
                  style={{
                    flex: 2,
                    padding: "0.8rem",
                    borderRadius: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(201, 162, 39, 0.3)",
                  }}
                >
                  Confirm & Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  // Helper renderer for each relative card node in tree
  function renderFamilyNode(member: FamilyMember) {
    const age = getAge(member.dob);
    const cfg = relConfig[member.relationship] || relConfig.other;
    const NodeIcon = cfg.Icon;

    return (
      <div
        key={member.id}
        style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid rgba(27, 42, 74, 0.08)",
          padding: "1rem 1.15rem",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.02)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
          transition: "all 0.15s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              backgroundColor: `${cfg.color}15`,
              color: cfg.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <NodeIcon size={20} />
          </div>

          <div>
            <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: "var(--color-navy)" }}>
              {member.name}
            </h4>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.2rem" }}>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  backgroundColor: "rgba(27, 42, 74, 0.05)",
                  color: "var(--color-navy)",
                  padding: "0.1rem 0.45rem",
                  borderRadius: "999px",
                }}
              >
                {cfg.label}
              </span>

              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  backgroundColor: member.isMinor ? "rgba(225, 29, 72, 0.1)" : "rgba(124, 148, 115, 0.15)",
                  color: member.isMinor ? "#BE123C" : "var(--color-sage)",
                  padding: "0.1rem 0.45rem",
                  borderRadius: "999px",
                }}
              >
                {member.isMinor ? `Minor (${age !== null ? `${age}y` : "<18"})` : `Adult (${age !== null ? `${age}y` : "18+"})`}
              </span>

              {member.pan && (
                <span
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    backgroundColor: "rgba(201, 162, 39, 0.15)",
                    color: "var(--color-navy)",
                    padding: "0.1rem 0.45rem",
                    borderRadius: "999px",
                    letterSpacing: "0.03em",
                  }}
                >
                  PAN: {member.pan}
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleDeleteMember(member.id)}
          aria-label="Remove member"
          style={{
            background: "none",
            border: "none",
            color: "rgba(27, 42, 74, 0.3)",
            cursor: "pointer",
            padding: "0.35rem",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#E11D48")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(27, 42, 74, 0.3)")}
        >
          <Trash2 size={16} />
        </button>
      </div>
    );
  }
}
