"use client";

import React, { useState } from "react";
import {
  WillDraftingState,
  FamilyMember,
  calculateIsMinor,
  saveStoredWillState,
} from "@/lib/willDraftingStore";
import {
  Users,
  User,
  Baby,
  Heart,
  UserPlus,
  Plus,
  Trash2,
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Calendar,
  ArrowRight,
} from "lucide-react";

interface FamilyTreeCanvasProps {
  state: WillDraftingState;
  onStateChange: (newState: WillDraftingState) => void;
}

export default function FamilyTreeCanvas({ state, onStateChange }: FamilyTreeCanvasProps) {
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [defaultRelationship, setDefaultRelationship] = useState<FamilyMember["relationship"]>("son");
  const [activeFilter, setActiveFilter] = useState<"all" | "lineal" | "parents" | "minors">("all");

  // Form State for Add Member
  const [newName, setNewName] = useState("");
  const [newRelationship, setNewRelationship] = useState<FamilyMember["relationship"]>("son");
  const [newDob, setNewDob] = useState("2000-01-01");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const family = state.familyMembers || [];
  const testator = state.testator;

  // Segment family
  const spouse = family.find((f) => f.relationship === "spouse");
  const children = family.filter((f) => f.relationship === "son" || f.relationship === "daughter");
  const parents = family.filter((f) => f.relationship === "father" || f.relationship === "mother");
  const siblings = family.filter((f) => f.relationship === "brother" || f.relationship === "sister");

  const getAge = (dobString: string) => {
    if (!dobString) return null;
    const diffMs = Date.now() - new Date(dobString).getTime();
    const ageDate = new Date(diffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleOpenAdd = (rel: FamilyMember["relationship"]) => {
    setDefaultRelationship(rel);
    setNewRelationship(rel);
    setNewName("");
    setNewDob(rel === "father" || rel === "mother" ? "1945-05-15" : rel === "son" || rel === "daughter" ? "2005-08-20" : "1975-01-01");
    setNewPhone("");
    setNewEmail("");
    setIsAddModalOpen(true);
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const isMinor = calculateIsMinor(newDob);
    const newMember: FamilyMember = {
      id: `fam-${Date.now()}`,
      name: newName.trim(),
      relationship: newRelationship,
      dob: newDob,
      isMinor,
      phone: newPhone.trim() || undefined,
      email: newEmail.trim() || undefined,
      address: "Same as testator",
    };

    const updatedFamily = [...family, newMember];
    const updatedState = { ...state, familyMembers: updatedFamily };
    saveStoredWillState(updatedState);
    onStateChange(updatedState);
    setIsAddModalOpen(false);
  };

  const handleDeleteMember = (id: string) => {
    const updatedFamily = family.filter((f) => f.id !== id);
    const updatedState = {
      ...state,
      familyMembers: updatedFamily,
      allocations: state.allocations.filter((a) => a.beneficiaryId !== id),
    };
    saveStoredWillState(updatedState);
    onStateChange(updatedState);
    setSelectedMember(null);
  };

  const handleSetAsPrimaryExecutor = (member: FamilyMember) => {
    const updatedState = {
      ...state,
      executorPrimary: {
        name: member.name,
        relationship: member.relationship,
        phone: member.phone || "+91 98100 00000",
        email: member.email || "executor@example.com",
        address: member.address || "Same as testator",
      },
    };
    saveStoredWillState(updatedState);
    onStateChange(updatedState);
    alert(`${member.name} has been designated as your Primary Executor!`);
  };

  const handleSetAsResiduaryBeneficiary = (member: FamilyMember) => {
    const updatedState = {
      ...state,
      residuaryBeneficiaryName: member.name,
      residuaryBeneficiaryId: member.id,
    };
    saveStoredWillState(updatedState);
    onStateChange(updatedState);
    alert(`${member.name} designated as primary Residuary Beneficiary!`);
  };

  // Filtered children
  const displayedChildren = children.filter((c) => {
    if (activeFilter === "minors") return c.isMinor;
    return true;
  });

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "24px",
        border: "1px solid var(--border-card)",
        boxShadow: "0 12px 36px -8px rgba(27, 42, 74, 0.08)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Top Glass Header */}
      <div
        style={{
          padding: "1.5rem 2rem",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-gold)" }}>
              Interactive Kinship Architecture
            </span>
            <span style={{ color: "var(--text-muted)" }}>•</span>
            <span style={{ fontSize: "0.75rem", color: "var(--color-slate)", fontWeight: 500 }}>
              {family.length + 1} Total Family Nodes
            </span>
          </div>
          <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--color-navy)", margin: 0 }}>
            Visual Family Tree & Succession Network
          </h3>
        </div>

        {/* Filter & Add Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          {/* Segmented Control (Apple style) */}
          <div
            style={{
              display: "inline-flex",
              backgroundColor: "rgba(27, 42, 74, 0.06)",
              padding: "3px",
              borderRadius: "999px",
            }}
          >
            {[
              { id: "all", label: "All Network" },
              { id: "lineal", label: "Spouse & Children" },
              { id: "parents", label: "Parents & Siblings" },
              { id: "minors", label: "Minors Only" },
            ].map((f) => {
              const isActive = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id as typeof activeFilter)}
                  style={{
                    padding: "0.35rem 0.85rem",
                    fontSize: "0.75rem",
                    fontWeight: isActive ? 600 : 500,
                    borderRadius: "999px",
                    border: "none",
                    backgroundColor: isActive ? "#FFFFFF" : "transparent",
                    color: isActive ? "var(--color-navy)" : "var(--color-slate)",
                    cursor: "pointer",
                    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: isActive ? "0 2px 6px rgba(27, 42, 74, 0.1)" : "none",
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handleOpenAdd("son")}
            className="btn btn-gold"
            style={{
              padding: "0.45rem 1.15rem",
              fontSize: "0.8rem",
              borderRadius: "999px",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <span>+ Add Relative</span>
          </button>
        </div>
      </div>

      {/* Tree Canvas Stage */}
      <div
        style={{
          padding: "3rem 2rem",
          backgroundColor: "var(--bg-page)",
          backgroundImage: "radial-gradient(rgba(27, 42, 74, 0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          minHeight: "520px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2.5rem",
          position: "relative",
        }}
      >
        {/* Tier 1: Parents (Generation +1) */}
        {(activeFilter === "all" || activeFilter === "parents") && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
              Ancestral Tier • Parents
            </div>

            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
              {parents.length > 0 ? (
                parents.map((parent) => (
                  <div
                    key={parent.id}
                    onClick={() => setSelectedMember(parent)}
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "18px",
                      padding: "1rem 1.25rem",
                      boxShadow: "0 6px 20px rgba(27, 42, 74, 0.06)",
                      border: "1px solid var(--border-card)",
                      minWidth: "180px",
                      cursor: "pointer",
                      transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                      textAlign: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                      e.currentTarget.style.borderColor = "var(--color-gold)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.borderColor = "var(--border-card)";
                    }}
                  >
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "rgba(124, 148, 115, 0.15)", color: "var(--color-sage)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.35rem" }}>
                      <Users size={18} />
                    </div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--color-navy)" }}>
                      {parent.name}
                    </div>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "capitalize" }}>
                      {parent.relationship}
                    </span>
                  </div>
                ))
              ) : (
                <button
                  onClick={() => handleOpenAdd("father")}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                    borderRadius: "18px",
                    border: "2px dashed rgba(27, 42, 74, 0.2)",
                    padding: "0.85rem 1.5rem",
                    color: "var(--color-slate)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span>+ Add Parent</span>
                </button>
              )}
            </div>

            {/* Connecting Vertical Line */}
            <div
              style={{
                width: "2px",
                height: "28px",
                backgroundColor: "rgba(27, 42, 74, 0.2)",
                margin: "0.5rem 0 0",
              }}
            />
          </div>
        )}

        {/* Tier 2: Core Couple (Testator & Spouse) */}
        {(activeFilter === "all" || activeFilter === "lineal") && (
          <div style={{ display: "flex", alignItems: "center", gap: "2rem", position: "relative", flexWrap: "wrap", justifyContent: "center" }}>
            {/* Testator Card (YOU) */}
            <div
              style={{
                backgroundColor: "var(--color-navy)",
                color: "#FFFFFF",
                borderRadius: "22px",
                padding: "1.35rem 1.65rem",
                boxShadow: "0 14px 34px -6px rgba(27, 42, 74, 0.25)",
                border: "2px solid var(--color-gold)",
                minWidth: "220px",
                textAlign: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "var(--color-gold)",
                  color: "var(--color-charcoal)",
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  padding: "0.15rem 0.6rem",
                  borderRadius: "999px",
                  letterSpacing: "0.05em",
                }}
              >
                Testator (You)
              </div>

              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  color: "var(--color-gold)",
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0.5rem auto 0.5rem",
                  border: "2px solid var(--color-gold)",
                }}
              >
                {(testator.fullName || "You")
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>

              <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#FFFFFF" }}>
                {testator.fullName || "Rajesh Kumar Sharma"}
              </div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.7)", marginTop: "0.2rem" }}>
                {testator.maritalStatus.toUpperCase()} • {testator.religionPersonalLaw.toUpperCase()}
              </div>
            </div>

            {/* Marriage Connection Icon & Line */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-gold)" }}>
              <div style={{ width: "24px", height: "2px", backgroundColor: "var(--color-gold)" }} />
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "#FFFFFF",
                  border: "1.5px solid var(--color-gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.95rem",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                }}
                title="Lawful Marriage under Personal Law"
              >
                <Heart size={14} color="var(--color-gold)" />
              </div>
              <div style={{ width: "24px", height: "2px", backgroundColor: "var(--color-gold)" }} />
            </div>

            {/* Spouse Card */}
            {spouse ? (
              <div
                onClick={() => setSelectedMember(spouse)}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "22px",
                  padding: "1.35rem 1.65rem",
                  boxShadow: "0 10px 30px rgba(27, 42, 74, 0.08)",
                  border: "1.5px solid var(--border-card)",
                  minWidth: "220px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                  e.currentTarget.style.borderColor = "var(--color-gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.borderColor = "var(--border-card)";
                }}
              >
                <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(225, 29, 72, 0.1)", color: "#E11D48", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.35rem" }}>
                  <Heart size={20} />
                </div>
                <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--color-navy)" }}>
                  {spouse.name}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-slate)", marginTop: "0.2rem" }}>
                  Spouse • {getAge(spouse.dob) !== null ? `${getAge(spouse.dob)} Years` : "Adult"}
                </div>
                <div style={{ marginTop: "0.5rem" }}>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      backgroundColor: "rgba(124, 148, 115, 0.15)",
                      color: "var(--color-navy)",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "999px",
                    }}
                  >
                    Primary Residuary Legatee
                  </span>
                </div>
              </div>
            ) : (
              <button
                onClick={() => handleOpenAdd("spouse")}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "22px",
                  border: "2px dashed rgba(27, 42, 74, 0.25)",
                  padding: "1.5rem 1.75rem",
                  color: "var(--color-navy)",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.4rem",
                  minWidth: "180px",
                }}
              >
                <Heart size={22} color="var(--color-gold)" />
                <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>+ Add Spouse</span>
              </button>
            )}
          </div>
        )}

        {/* Tier 3: Children (Generation -1) */}
        {(activeFilter === "all" || activeFilter === "lineal" || activeFilter === "minors") && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            {/* Connecting Vertical Trunk */}
            <div
              style={{
                width: "2px",
                height: "32px",
                backgroundColor: "rgba(27, 42, 74, 0.25)",
                marginBottom: "0.5rem",
              }}
            />

            <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "1rem" }}>
              Next Generation • Children ({displayedChildren.length})
            </div>

            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
              {displayedChildren.map((child) => {
                const age = getAge(child.dob);
                return (
                  <div
                    key={child.id}
                    onClick={() => setSelectedMember(child)}
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "20px",
                      padding: "1.25rem 1.5rem",
                      boxShadow: "0 8px 26px rgba(27, 42, 74, 0.06)",
                      border: child.isMinor ? "1.5px solid #FDA4AF" : "1px solid var(--border-card)",
                      minWidth: "200px",
                      cursor: "pointer",
                      transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                      textAlign: "center",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
                      e.currentTarget.style.borderColor = "var(--color-gold)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.borderColor = child.isMinor ? "#FDA4AF" : "var(--border-card)";
                    }}
                  >
                    {child.isMinor && (
                      <div
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "12px",
                          backgroundColor: "#E11D48",
                          color: "#FFFFFF",
                          fontSize: "0.65rem",
                          fontWeight: 800,
                          padding: "0.15rem 0.5rem",
                          borderRadius: "999px",
                          letterSpacing: "0.04em",
                        }}
                      >
                        MINOR
                      </div>
                    )}

                    <div style={{ width: "38px", height: "38px", borderRadius: "10px", backgroundColor: child.relationship === "son" ? "rgba(37, 99, 235, 0.1)" : "rgba(219, 39, 119, 0.1)", color: child.relationship === "son" ? "#2563EB" : "#DB2777", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.35rem" }}>
                      <Baby size={18} />
                    </div>

                    <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--color-navy)" }}>
                      {child.name}
                    </div>

                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
                      {child.relationship === "son" ? "Son" : "Daughter"} • {age !== null ? `${age} Years Old` : "N/A"}
                    </div>

                    <div style={{ marginTop: "0.6rem" }}>
                      <span
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          backgroundColor: child.isMinor ? "rgba(225, 29, 72, 0.1)" : "rgba(201, 162, 39, 0.12)",
                          color: child.isMinor ? "#BE123C" : "var(--color-navy)",
                          padding: "0.15rem 0.5rem",
                          borderRadius: "999px",
                        }}
                      >
                        {child.isMinor ? "Testamentary Trust Required" : "Legal Heir (Class I)"}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Add Child Node Button */}
              <button
                onClick={() => handleOpenAdd("son")}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  borderRadius: "20px",
                  border: "2px dashed rgba(27, 42, 74, 0.25)",
                  padding: "1.25rem 1.5rem",
                  color: "var(--color-slate)",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.35rem",
                  minWidth: "160px",
                  transition: "var(--transition)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.6)")}
              >
                <Baby size={22} color="var(--color-slate)" />
                <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>+ Add Child</span>
              </button>
            </div>
          </div>
        )}

        {/* Tier 4: Siblings */}
        {(activeFilter === "all" || activeFilter === "parents") && siblings.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
              Collateral Line • Siblings ({siblings.length})
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              {siblings.map((sib) => (
                <div
                  key={sib.id}
                  onClick={() => setSelectedMember(sib)}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "16px",
                    padding: "0.85rem 1.15rem",
                    boxShadow: "var(--shadow-sm)",
                    border: "1px solid var(--border-card)",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "var(--color-navy)",
                  }}
                >
                  <UserPlus size={14} style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px", color: "var(--color-slate)" }} /> {sib.name} ({sib.relationship})
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Member Detail Popover / Inspector (Apple Sheet) */}
      {selectedMember && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(27, 42, 74, 0.65)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
          onClick={() => setSelectedMember(null)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              width: "100%",
              maxWidth: "480px",
              padding: "2rem",
              boxShadow: "0 25px 50px -12px rgba(27, 42, 74, 0.35)",
              border: "1px solid rgba(27, 42, 74, 0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Popover Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(27, 42, 74, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                  }}
                >
                  <User size={22} color="var(--color-navy)" />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700, color: "var(--color-navy)" }}>
                    {selectedMember.name}
                  </h4>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "capitalize" }}>
                    {selectedMember.relationship} • {getAge(selectedMember.dob) !== null ? `${getAge(selectedMember.dob)} Years` : "Age Unspecified"}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedMember(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex", alignItems: "center" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Member Details */}
            <div style={{ backgroundColor: "var(--bg-page)", borderRadius: "14px", padding: "1rem 1.25rem", marginBottom: "1.5rem", fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div><strong>Status:</strong> {selectedMember.isMinor ? "Minor Child (<18)" : "Major (Legal Adult)"}</div>
              <div><strong>Date of Birth:</strong> {selectedMember.dob || "Not recorded"}</div>
              <div><strong>Phone:</strong> {selectedMember.phone || "Not provided"}</div>
              <div><strong>Address:</strong> {selectedMember.address || "Same as testator"}</div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {!selectedMember.isMinor && (
                <button
                  onClick={() => handleSetAsPrimaryExecutor(selectedMember)}
                  style={{
                    width: "100%",
                    padding: "0.65rem 1rem",
                    borderRadius: "10px",
                    backgroundColor: "var(--color-navy)",
                    color: "#FFFFFF",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Appoint as Primary Executor</span>
                  <span>→</span>
                </button>
              )}

              <button
                onClick={() => handleSetAsResiduaryBeneficiary(selectedMember)}
                style={{
                  width: "100%",
                  padding: "0.65rem 1rem",
                  borderRadius: "10px",
                  backgroundColor: "rgba(201, 162, 39, 0.15)",
                  color: "var(--color-navy)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  border: "1px solid var(--color-gold)",
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Designate as Residuary Legatee</span>
                <span>→</span>
              </button>

              <button
                onClick={() => handleDeleteMember(selectedMember.id)}
                style={{
                  width: "100%",
                  padding: "0.65rem 1rem",
                  borderRadius: "10px",
                  backgroundColor: "transparent",
                  color: "#BE123C",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  border: "1px solid #FDA4AF",
                  cursor: "pointer",
                  textAlign: "center",
                  marginTop: "0.5rem",
                }}
              >
                Remove from Family Tree
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Popover / Modal */}
      {isAddModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(27, 42, 74, 0.65)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              width: "100%",
              maxWidth: "480px",
              padding: "2rem",
              boxShadow: "0 25px 50px -12px rgba(27, 42, 74, 0.35)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-navy)" }}>
              Add Relative to Family Tree
            </h3>
            <p style={{ margin: "0 0 1.25rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Register family members to establish legal heir awareness under the Indian Succession Act.
            </p>

            <form onSubmit={handleSaveMember} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Rohit Sharma"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "10px",
                    border: "1px solid var(--border-card)",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
                    Relationship *
                  </label>
                  <select
                    value={newRelationship}
                    onChange={(e) => setNewRelationship(e.target.value as FamilyMember["relationship"])}
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      borderRadius: "10px",
                      border: "1px solid var(--border-card)",
                      fontSize: "0.9rem",
                      outline: "none",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <option value="spouse">Spouse</option>
                    <option value="son">Son</option>
                    <option value="daughter">Daughter</option>
                    <option value="father">Father</option>
                    <option value="mother">Mother</option>
                    <option value="brother">Brother</option>
                    <option value="sister">Sister</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    required
                    value={newDob}
                    onChange={(e) => setNewDob(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      borderRadius: "10px",
                      border: "1px solid var(--border-card)",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{
                    padding: "0.6rem 1rem",
                    borderRadius: "10px",
                    border: "1px solid var(--border-card)",
                    backgroundColor: "#FFFFFF",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-gold"
                  style={{
                    padding: "0.6rem 1.5rem",
                    borderRadius: "10px",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                  }}
                >
                  Add to Tree
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
