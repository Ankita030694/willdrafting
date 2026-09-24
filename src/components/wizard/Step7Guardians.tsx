"use client";

import React, { useState } from "react";
import {
  WillDraftingState,
  PersonContact,
} from "@/lib/willDraftingStore";
import AppleSwitch from "@/components/dashboard/AppleSwitch";
import AppleSegmentedControl from "@/components/dashboard/AppleSegmentedControl";
import {
  ShieldCheck,
  Baby,
  Users,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  User,
  HeartHandshake,
  Lock,
} from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";

interface Step7GuardiansProps {
  state: WillDraftingState;
  onUpdate: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step7Guardians({
  state,
  onUpdate,
  onNext,
  onBack,
}: Step7GuardiansProps) {
  const minorChildren = state.familyMembers.filter((f) => f.isMinor);
  const adultFamily = state.familyMembers.filter((f) => !f.isMinor);
  const hasMinors = minorChildren.length > 0;

  // Optional future-proofing clause if no minors
  const [enableFutureClause, setEnableFutureClause] = useState(false);

  // Existing guardians
  const defaultPrimary: PersonContact = state.guardianPrimary?.name ? state.guardianPrimary : {
    name: adultFamily[0]?.name || "",
    relationship: adultFamily[0]?.relationship || "",
    phone: "",
    email: "",
    address: "",
  };

  const existingAlternate = state.guardianAlternate?.name ? state.guardianAlternate : null;
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

  const [guardianScope, setGuardianScope] = useState<string>("full");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSelectPrimary = (f: typeof state.familyMembers[0]) => {
    setPrimary((prev: PersonContact) => ({
      ...prev,
      name: f.name,
      relationship: f.relationship,
      phone: f.phone || prev.phone,
      email: f.email || prev.email,
    }));
  };

  const handleSelectAlternate = (f: typeof state.familyMembers[0]) => {
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

    if (hasMinors || enableFutureClause) {
      if (!primary.name.trim()) {
        setErrorMsg("Please specify the full legal name of your Testamentary Guardian.");
        return;
      }

      if (hasAlternate && !alternate.name.trim()) {
        setErrorMsg("Please specify the alternate guardian's name or disable the alternate toggle.");
        return;
      }
    }

    const emptyPerson: PersonContact = { name: "", relationship: "", phone: "", email: "", address: "" };

    onUpdate((prev: WillDraftingState) => ({
      ...prev,
      guardianPrimary: (hasMinors || enableFutureClause) ? primary : emptyPerson,
      guardianAlternate: (hasMinors || enableFutureClause) && hasAlternate ? alternate : emptyPerson,
      guardianSpecialInstructions: guardianScope === "full" ? "Full custody of person and property." : guardianScope === "person" ? "Custody of person only." : "Custody of property only.",
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
            Step 7 of 14 • Custodial Directives
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <AudioAssistantButton
              textToSpeak="Who will be the legal guardian of your minor children? A testamentary guardian cares for their physical custody and financial well-being until they turn 18. You can select a trusted family member."
              label="Listen / सुनें 🔊"
            />
            <span style={{ fontSize: "0.75rem", color: "var(--color-slate)" }}>
              ISA S.60 & HMG Act S.9 • Child Custody Protection
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem", flexWrap: "wrap" }}>
          <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
            Testamentary Guardianship
          </h2>
          <span style={{ fontSize: "0.88rem", color: "#8A6D1B", fontWeight: 600 }}>
            (नाबालिग बच्चों के कानूनी अभिभावक / गार्जियन)
          </span>
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

      {/* Case 1: No Minors Registered */}
      {!hasMinors && !enableFutureClause ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: 0,
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              border: "1px solid rgba(27, 42, 74, 0.08)",
              padding: "2.5rem 2rem",
              boxShadow: "0 4px 20px rgba(27, 42, 74, 0.03)",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              gap: "1rem",
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "16px",
                backgroundColor: "rgba(124, 148, 115, 0.15)",
                color: "var(--color-sage)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShieldCheck size={28} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--color-navy)", margin: 0 }}>
                No Minor Children Registered
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--color-slate)", maxWidth: "480px", margin: "0.4rem 0 0", lineHeight: 1.5 }}>
                All family members added are 18 years of age or older. Testamentary guardianship clauses are only statutory for minor children under legal majority.
              </p>
            </div>

            {/* Future proofing switch */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.65rem 1.15rem",
                borderRadius: "12px",
                backgroundColor: "rgba(27, 42, 74, 0.03)",
                border: "1px solid rgba(27, 42, 74, 0.06)",
              }}
            >
              <span style={{ fontSize: "0.8rem", color: "var(--color-navy)", fontWeight: 600 }}>
                Future-proofing: Add contingent guardian clause for any future children
              </span>
              <AppleSwitch checked={enableFutureClause} onChange={setEnableFutureClause} />
            </div>
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
              marginTop: "0.75rem",
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
              Continue to Special Wishes <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ) : (
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
          {/* Main 2-Column Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.25rem",
              flex: 1,
              minHeight: 0,
            }}
          >
            {/* Primary Guardian Column */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                border: "1px solid rgba(27, 42, 74, 0.08)",
                boxShadow: "0 4px 20px rgba(27, 42, 74, 0.03)",
                padding: "1.15rem 1.35rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
                overflowY: "auto",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(201, 162, 39, 0.15)",
                      color: "var(--color-gold)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Baby size={18} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "var(--color-navy)" }}>
                      Primary Guardian
                    </h3>
                    <span style={{ fontSize: "0.75rem", color: "var(--color-slate)" }}>
                      Designated custodian for personal welfare
                    </span>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    padding: "0.15rem 0.5rem",
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

              {/* Quick family chips */}
              {adultFamily.length > 0 && (
                <div>
                  <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
                    Quick select from trusted family:
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {adultFamily.map((f) => {
                      const isSel = primary.name === f.name;
                      return (
                        <button
                          type="button"
                          key={f.id}
                          onClick={() => handleSelectPrimary(f)}
                          style={{
                            padding: "0.35rem 0.65rem",
                            borderRadius: "8px",
                            border: isSel ? "1.5px solid var(--color-gold)" : "1px solid rgba(27, 42, 74, 0.12)",
                            backgroundColor: isSel ? "rgba(201, 162, 39, 0.1)" : "#FAFAFA",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            fontSize: "0.75rem",
                            fontWeight: isSel ? 700 : 500,
                            color: "var(--color-navy)",
                          }}
                        >
                          <span>{f.name}</span>
                          <span style={{ fontSize: "0.68rem", color: "var(--color-slate)" }}>({f.relationship})</span>
                          {isSel && <CheckCircle2 size={12} color="var(--color-gold)" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={primary.name}
                    onChange={(e) => setPrimary({ ...primary, name: e.target.value })}
                    placeholder="e.g., Sunita Sharma"
                    style={{
                      width: "100%",
                      padding: "0.55rem 0.75rem",
                      borderRadius: "10px",
                      border: "1px solid rgba(27, 42, 74, 0.12)",
                      fontSize: "0.85rem",
                      color: "var(--color-navy)",
                      outline: "none",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                    Relationship *
                  </label>
                  <input
                    type="text"
                    required
                    value={primary.relationship}
                    onChange={(e) => setPrimary({ ...primary, relationship: e.target.value })}
                    placeholder="e.g., Maternal Aunt / Sister"
                    style={{
                      width: "100%",
                      padding: "0.55rem 0.75rem",
                      borderRadius: "10px",
                      border: "1px solid rgba(27, 42, 74, 0.12)",
                      fontSize: "0.85rem",
                      color: "var(--color-navy)",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* Guardian Powers Scope */}
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                  Guardian Authority Scope
                </label>
                <AppleSegmentedControl
                  options={[
                    { value: "full", label: "Full Custody & Trust" },
                    { value: "person_only", label: "Personal Custody" },
                    { value: "property_only", label: "Property Trustee" },
                  ]}
                  value={guardianScope}
                  onChange={setGuardianScope}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                    Mobile Phone
                  </label>
                  <input
                    type="tel"
                    value={primary.phone || ""}
                    onChange={(e) => setPrimary({ ...primary, phone: e.target.value })}
                    placeholder="+91 98100 45211"
                    style={{
                      width: "100%",
                      padding: "0.55rem 0.75rem",
                      borderRadius: "10px",
                      border: "1px solid rgba(27, 42, 74, 0.12)",
                      fontSize: "0.85rem",
                      color: "var(--color-navy)",
                      outline: "none",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={primary.email || ""}
                    onChange={(e) => setPrimary({ ...primary, email: e.target.value })}
                    placeholder="guardian@example.com"
                    style={{
                      width: "100%",
                      padding: "0.55rem 0.75rem",
                      borderRadius: "10px",
                      border: "1px solid rgba(27, 42, 74, 0.12)",
                      fontSize: "0.85rem",
                      color: "var(--color-navy)",
                      outline: "none",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Alternate Guardian Column */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                border: "1px solid rgba(27, 42, 74, 0.08)",
                boxShadow: "0 4px 20px rgba(27, 42, 74, 0.03)",
                padding: "1.15rem 1.35rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
                overflowY: "auto",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
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
                    <HeartHandshake size={18} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "var(--color-navy)" }}>
                      Alternate Guardian
                    </h3>
                    <span style={{ fontSize: "0.75rem", color: "var(--color-slate)" }}>
                      Contingent custodian if primary cannot act
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: hasAlternate ? "var(--color-navy)" : "var(--color-slate)" }}>
                    {hasAlternate ? "Enabled" : "Disabled"}
                  </span>
                  <AppleSwitch checked={hasAlternate} onChange={setHasAlternate} />
                </div>
              </div>

              {!hasAlternate ? (
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem 1.5rem",
                    textAlign: "center",
                    backgroundColor: "#FAFAFA",
                    borderRadius: "14px",
                    border: "1.5px dashed rgba(27, 42, 74, 0.12)",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(201, 162, 39, 0.12)",
                      color: "var(--color-gold)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <Users size={22} />
                  </div>
                  <h4 style={{ margin: "0 0 0.35rem", fontSize: "0.95rem", fontWeight: 700, color: "var(--color-navy)" }}>
                    No Alternate Guardian Appointed
                  </h4>
                  <p style={{ margin: "0 0 1rem", fontSize: "0.78rem", color: "var(--color-slate)", maxWidth: "300px" }}>
                    Provides vital redundancy if your primary guardian is unavailable or unwell when required.
                  </p>
                  <button
                    type="button"
                    onClick={() => setHasAlternate(true)}
                    style={{
                      padding: "0.45rem 1rem",
                      borderRadius: "10px",
                      border: "1.5px solid var(--color-navy)",
                      backgroundColor: "#FFFFFF",
                      color: "var(--color-navy)",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    + Add Alternate Guardian
                  </button>
                </div>
              ) : (
                <>
                  {/* Quick family chips for alternate */}
                  {adultFamily.length > 0 && (
                    <div>
                      <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
                        Quick select from other family:
                      </span>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                        {adultFamily
                          .filter((f) => f.name !== primary.name)
                          .map((f) => {
                            const isSel = alternate.name === f.name;
                            return (
                              <button
                                type="button"
                                key={f.id}
                                onClick={() => handleSelectAlternate(f)}
                                style={{
                                  padding: "0.35rem 0.65rem",
                                  borderRadius: "8px",
                                  border: isSel ? "1.5px solid var(--color-gold)" : "1px solid rgba(27, 42, 74, 0.12)",
                                  backgroundColor: isSel ? "rgba(201, 162, 39, 0.1)" : "#FAFAFA",
                                  cursor: "pointer",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "0.35rem",
                                  fontSize: "0.75rem",
                                  fontWeight: isSel ? 700 : 500,
                                  color: "var(--color-navy)",
                                }}
                              >
                                <span>{f.name}</span>
                                <span style={{ fontSize: "0.68rem", color: "var(--color-slate)" }}>({f.relationship})</span>
                                {isSel && <CheckCircle2 size={12} color="var(--color-gold)" />}
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  )}

                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "0.75rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                        Full Legal Name *
                      </label>
                      <input
                        type="text"
                        required={hasAlternate}
                        value={alternate.name}
                        onChange={(e) => setAlternate({ ...alternate, name: e.target.value })}
                        placeholder="e.g., Rajesh Sharma"
                        style={{
                          width: "100%",
                          padding: "0.55rem 0.75rem",
                          borderRadius: "10px",
                          border: "1px solid rgba(27, 42, 74, 0.12)",
                          fontSize: "0.85rem",
                          color: "var(--color-navy)",
                          outline: "none",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                        Relationship *
                      </label>
                      <input
                        type="text"
                        required={hasAlternate}
                        value={alternate.relationship}
                        onChange={(e) => setAlternate({ ...alternate, relationship: e.target.value })}
                        placeholder="e.g., Paternal Uncle / Brother"
                        style={{
                          width: "100%",
                          padding: "0.55rem 0.75rem",
                          borderRadius: "10px",
                          border: "1px solid rgba(27, 42, 74, 0.12)",
                          fontSize: "0.85rem",
                          color: "var(--color-navy)",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                        Mobile Phone
                      </label>
                      <input
                        type="tel"
                        value={alternate.phone || ""}
                        onChange={(e) => setAlternate({ ...alternate, phone: e.target.value })}
                        placeholder="+91 98100..."
                        style={{
                          width: "100%",
                          padding: "0.55rem 0.75rem",
                          borderRadius: "10px",
                          border: "1px solid rgba(27, 42, 74, 0.12)",
                          fontSize: "0.85rem",
                          color: "var(--color-navy)",
                          outline: "none",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={alternate.email || ""}
                        onChange={(e) => setAlternate({ ...alternate, email: e.target.value })}
                        placeholder="alternate@example.com"
                        style={{
                          width: "100%",
                          padding: "0.55rem 0.75rem",
                          borderRadius: "10px",
                          border: "1px solid rgba(27, 42, 74, 0.12)",
                          fontSize: "0.85rem",
                          color: "var(--color-navy)",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
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
              Save & Continue to Special Wishes <ArrowRight size={16} />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
