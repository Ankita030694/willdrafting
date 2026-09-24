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

interface Step6ExecutorsProps {
  state: WillDraftingState;
  onUpdate: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step6Executors({
  state,
  onUpdate,
  onNext,
  onBack,
}: Step6ExecutorsProps) {
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
            Step 6 of 14 • Fiduciary Appointment
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <AudioAssistantButton
              textToSpeak="Who will be the executor of your will? An executor is your trusted manager—like your spouse, brother, or friend—who ensures your instructions are carried out after you. Tap any family member or enter their name."
              label="Listen / सुनें 🔊"
            />
            <span style={{ fontSize: "0.75rem", color: "var(--color-slate)" }}>
              ISA 1925 S.222 • Court Probate Representative
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem", flexWrap: "wrap" }}>
          <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
            Appoint your Trusted Executors
          </h2>
          <span style={{ fontSize: "0.88rem", color: "#8A6D1B", fontWeight: 600 }}>
            (वसीयत प्रबंधक एवं निष्पादक)
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

      {/* Main 2-Column Grid */}
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.25rem",
            flex: 1,
            minHeight: 0,
          }}
        >
          {/* Primary Executor Column */}
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
                  <Award size={18} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "var(--color-navy)" }}>
                    Primary Executor
                  </h3>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-slate)" }}>
                    First in line to administer estate
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

            {/* Quick 1-click select chips */}
            {adultFamily.length > 0 && (
              <div>
                <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
                  Quick select from adult family:
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {adultFamily.map((f) => {
                    const isSel = primary.name === f.name;
                    return (
                      <button
                        type="button"
                        key={f.id}
                        onClick={() => handleSelectPrimaryFromFamily(f)}
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
                  placeholder="e.g., Spouse / Adult Son"
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
                  placeholder="executor@example.com"
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

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                Residential Address (Optional)
              </label>
              <input
                type="text"
                value={primary.address || ""}
                onChange={(e) => setPrimary({ ...primary, address: e.target.value })}
                placeholder="e.g., A-402, Green Glen Layout, Bengaluru"
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

          {/* Alternate Executor Column */}
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
                  <UserCheck size={18} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "var(--color-navy)" }}>
                    Alternate / Backup Executor
                  </h3>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-slate)" }}>
                    Steps in if primary is unable to act
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
                  <Plus size={22} />
                </div>
                <h4 style={{ margin: "0 0 0.35rem", fontSize: "0.95rem", fontWeight: 700, color: "var(--color-navy)" }}>
                  No Alternate Executor Appointed
                </h4>
                <p style={{ margin: "0 0 1rem", fontSize: "0.78rem", color: "var(--color-slate)", maxWidth: "300px" }}>
                  An alternate prevents court administration delay if your primary executor predeceases or cannot serve.
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
                  + Add Backup Executor
                </button>
              </div>
            ) : (
              <>
                {/* Quick 1-click select chips */}
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
                              onClick={() => handleSelectAlternateFromFamily(f)}
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
                      placeholder="e.g., Brother / Friend"
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

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.3rem" }}>
                    Residential Address (Optional)
                  </label>
                  <input
                    type="text"
                    value={alternate.address || ""}
                    onChange={(e) => setAlternate({ ...alternate, address: e.target.value })}
                    placeholder="e.g., Delhi, NCR"
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
            Save & Continue to Guardians <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
