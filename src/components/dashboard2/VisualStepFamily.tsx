"use client";

import React, { useState } from "react";
import { WillDraftingState, FamilyMember } from "@/lib/willDraftingStore";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";
import BottomSheetDrawer from "@/components/ui/BottomSheetDrawer";
import { Users, Heart, Baby, Plus, Trash2, Shield, Sparkles, Check, Phone, CreditCard } from "lucide-react";

interface VisualStepFamilyProps {
  state: WillDraftingState;
  onUpdate: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function VisualStepFamily({ state, onUpdate, onNext, onBack }: VisualStepFamilyProps) {
  const [family, setFamily] = useState<FamilyMember[]>(state.familyMembers || []);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // New member form
  const [newRel, setNewRel] = useState<FamilyMember["relationship"]>("spouse");
  const [newName, setNewName] = useState("");
  const [newPan, setNewPan] = useState("");
  const [newIsMinor, setNewIsMinor] = useState(false);

  const getEmoji = (rel: FamilyMember["relationship"], isMinor?: boolean) => {
    if (rel === "spouse") return "💍";
    if (rel === "daughter") return isMinor ? "👧" : "👩";
    if (rel === "son") return isMinor ? "👦" : "👨";
    if (rel === "brother") return "👨‍💼";
    if (rel === "sister") return "👩‍💼";
    if (rel === "father") return "👴";
    if (rel === "mother") return "👵";
    return "🤝";
  };

  const getHindiRel = (rel: FamilyMember["relationship"]) => {
    const map: Record<string, string> = {
      spouse: "जीवनसाथी / पत्नी",
      daughter: "बेटी (पुत्री)",
      son: "बेटा (पुत्र)",
      brother: "भाई",
      sister: "बहन",
      father: "पिताजी",
      mother: "माताजी",
      other: "संबंधी / मित्र",
    };
    return map[rel] || rel;
  };

  const handleOpenAdd = (rel: FamilyMember["relationship"]) => {
    setNewRel(rel);
    setNewName("");
    setNewPan("");
    setNewIsMinor(rel === "son" || rel === "daughter" ? false : false);
    setDrawerOpen(true);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const member: FamilyMember = {
      id: `fam-${Date.now()}`,
      name: newName.trim(),
      relationship: newRel,
      dob: "",
      isMinor: newIsMinor,
      pan: newPan.trim() ? newPan.trim().toUpperCase() : undefined,
    };

    const updated = [...family, member];
    setFamily(updated);
    onUpdate((p) => ({ ...p, familyMembers: updated }));
    setDrawerOpen(false);
  };

  const handleDelete = (id: string) => {
    const updated = family.filter((f) => f.id !== id);
    setFamily(updated);
    onUpdate((p) => ({ ...p, familyMembers: updated }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "800px", margin: "0 auto", paddingBottom: "5rem" }}>
      {/* Header */}
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
            Step 2 of 6 • Family Tree
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--color-navy)", margin: 0 }}>
            Who are your Loved Ones?
          </h2>
          <div style={{ fontSize: "0.95rem", color: "#8A6D1B", fontWeight: 600, marginTop: "0.2rem" }}>
            (आपके परिवार में कौन-कौन है?)
          </div>
        </div>

        <AudioAssistantButton
          textToSpeak="Who are your loved ones? Tap the buttons below to add your spouse, children, siblings, or friends. They will be registered as natural heirs in your will."
          label="Listen / सुनें 🔊"
        />
      </div>

      {/* Quick Add Buttons Bar */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", padding: "1.25rem 1.5rem", border: "1px solid rgba(15, 29, 56, 0.08)" }}>
        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.75rem", display: "block" }}>
          Tap to add a family member / परिवार का सदस्य जोड़ें:
        </span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
          <button
            type="button"
            onClick={() => handleOpenAdd("spouse")}
            style={{
              padding: "0.65rem 1.1rem",
              borderRadius: "12px",
              backgroundColor: "rgba(225, 29, 72, 0.08)",
              border: "1.5px solid rgba(225, 29, 72, 0.25)",
              color: "#BE123C",
              fontSize: "0.9rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
            }}
          >
            💍 + Spouse (पत्नी / पति)
          </button>
          <button
            type="button"
            onClick={() => handleOpenAdd("daughter")}
            style={{
              padding: "0.65rem 1.1rem",
              borderRadius: "12px",
              backgroundColor: "rgba(219, 39, 119, 0.08)",
              border: "1.5px solid rgba(219, 39, 119, 0.25)",
              color: "#DB2777",
              fontSize: "0.9rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
            }}
          >
            👧 + Daughter (बेटी)
          </button>
          <button
            type="button"
            onClick={() => handleOpenAdd("son")}
            style={{
              padding: "0.65rem 1.1rem",
              borderRadius: "12px",
              backgroundColor: "rgba(37, 99, 235, 0.08)",
              border: "1.5px solid rgba(37, 99, 235, 0.25)",
              color: "#1D4ED8",
              fontSize: "0.9rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
            }}
          >
            👦 + Son (बेटा)
          </button>
          <button
            type="button"
            onClick={() => handleOpenAdd("brother")}
            style={{
              padding: "0.65rem 1.1rem",
              borderRadius: "12px",
              backgroundColor: "rgba(124, 148, 115, 0.12)",
              border: "1.5px solid rgba(124, 148, 115, 0.25)",
              color: "var(--color-sage)",
              fontSize: "0.9rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
            }}
          >
            👨‍💼 + Brother (भाई)
          </button>
          <button
            type="button"
            onClick={() => handleOpenAdd("other")}
            style={{
              padding: "0.65rem 1.1rem",
              borderRadius: "12px",
              backgroundColor: "rgba(15, 29, 56, 0.06)",
              border: "1.5px solid rgba(15, 29, 56, 0.15)",
              color: "var(--color-navy)",
              fontSize: "0.9rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
            }}
          >
            🤝 + Other (अन्य / मित्र)
          </button>
        </div>
      </div>

      {/* Visual Cards Grid for Added Family Members */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
        {family.map((member) => (
          <div
            key={member.id}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "18px",
              padding: "1.25rem",
              border: "1.5px solid rgba(15, 29, 56, 0.1)",
              boxShadow: "0 4px 14px rgba(15, 29, 56, 0.04)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "0.85rem",
              position: "relative",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ fontSize: "2.5rem", lineHeight: 1 }}>{getEmoji(member.relationship, member.isMinor)}</div>
                <button
                  type="button"
                  onClick={() => handleDelete(member.id)}
                  title="Remove"
                  style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", padding: "0.3rem" }}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <h4 style={{ margin: "0.75rem 0 0.15rem", fontSize: "1.1rem", fontWeight: 800, color: "var(--color-navy)" }}>
                {member.name}
              </h4>
              <div style={{ fontSize: "0.82rem", color: "#64748B", fontWeight: 600 }}>
                {getHindiRel(member.relationship)}
              </div>
            </div>

            {/* Badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", paddingTop: "0.5rem", borderTop: "1px solid rgba(15, 29, 56, 0.06)" }}>
              {member.pan && (
                <span style={{ fontSize: "0.7rem", fontWeight: 700, backgroundColor: "rgba(212, 175, 55, 0.15)", color: "#8A6D1B", padding: "0.15rem 0.45rem", borderRadius: "6px" }}>
                  PAN: {member.pan}
                </span>
              )}
              {member.isMinor && (
                <span style={{ fontSize: "0.7rem", fontWeight: 700, backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#EF4444", padding: "0.15rem 0.45rem", borderRadius: "6px" }}>
                  Minor (&lt;18)
                </span>
              )}
              <span style={{ fontSize: "0.7rem", fontWeight: 600, backgroundColor: "rgba(15, 29, 56, 0.05)", color: "var(--color-navy)", padding: "0.15rem 0.45rem", borderRadius: "6px" }}>
                Legal Beneficiary
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Slide-Up Bottom Sheet Drawer for Adding Member */}
      <BottomSheetDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={`Add ${newRel.charAt(0).toUpperCase() + newRel.slice(1)}`}
        hindiTitle={`(${getHindiRel(newRel)} का नाम दर्ज करें)`}
      >
        <form onSubmit={handleAddMember} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.4rem" }}>
              Full Legal Name (पूरा कानूनी नाम) *
            </label>
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Mrs. Alpana Prakash"
              style={{
                width: "100%",
                padding: "0.85rem 1rem",
                borderRadius: "12px",
                border: "1.5px solid rgba(15, 29, 56, 0.15)",
                fontSize: "1rem",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.4rem" }}>
              Permanent Account Number (PAN) / पैन कार्ड (Optional)
            </label>
            <input
              type="text"
              maxLength={10}
              value={newPan}
              onChange={(e) => setNewPan(e.target.value.toUpperCase())}
              placeholder="e.g. CJDPP6174L"
              style={{
                width: "100%",
                padding: "0.85rem 1rem",
                borderRadius: "12px",
                border: "1.5px solid rgba(15, 29, 56, 0.15)",
                fontSize: "1rem",
                letterSpacing: "0.08em",
                fontWeight: 600,
                outline: "none",
              }}
            />
          </div>

          {(newRel === "son" || newRel === "daughter") && (
            <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={newIsMinor}
                onChange={(e) => setNewIsMinor(e.target.checked)}
                style={{ width: "18px", height: "18px", accentColor: "var(--color-gold)" }}
              />
              <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-navy)" }}>
                This child is under 18 years old / नाबालिग (18 वर्ष से कम)
              </span>
            </label>
          )}

          <button
            type="submit"
            className="btn btn-gold"
            style={{
              padding: "0.9rem 1.5rem",
              borderRadius: "12px",
              fontSize: "1rem",
              fontWeight: 800,
              cursor: "pointer",
              border: "none",
              marginTop: "0.5rem",
            }}
          >
            ✓ Save Family Member / सुरक्षित करें
          </button>
        </form>
      </BottomSheetDrawer>

      {/* Navigation Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            padding: "0.85rem 1.5rem",
            borderRadius: "12px",
            border: "1.5px solid rgba(15, 29, 56, 0.15)",
            backgroundColor: "#FFFFFF",
            color: "var(--color-navy)",
            fontWeight: 700,
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
            padding: "0.85rem 2rem",
            borderRadius: "12px",
            fontSize: "1rem",
            fontWeight: 800,
            cursor: "pointer",
            border: "none",
            flex: 1,
          }}
        >
          Save & Continue to Assets (संपत्ति सूची) ➔
        </button>
      </div>
    </div>
  );
}
