"use client";

import React from "react";
import { WillDraftingState } from "@/lib/willDraftingStore";
import {
  User,
  Users,
  Landmark,
  PieChart,
  Scale,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Edit3,
} from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";

interface Step10ReviewProps {
  state: WillDraftingState;
  onJumpToStep: (step: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step10Review({
  state,
  onJumpToStep,
  onNext,
  onBack,
}: Step10ReviewProps) {
  const testator = state.testator;
  const family = state.familyMembers || [];
  const assets = state.assets || [];
  const totalValuation = assets.reduce((sum, a) => sum + (a.approximateValue || 0), 0);

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹ ${(val / 100000).toFixed(2)} Lakhs`;
    return `₹ ${val.toLocaleString("en-IN")}`;
  };

  const reviewModules = [
    {
      num: 1,
      step: 2,
      Icon: User,
      color: "var(--color-navy)",
      title: "Testator Identification",
      details: [
        { label: "Full Legal Name", val: testator.fullName || "Not provided" },
        { label: "DOB & Gender", val: `${testator.dob || "N/A"} (${testator.gender || "N/A"})` },
        { label: "Marital Status", val: testator.maritalStatus },
        { label: "Personal Law", val: testator.religionPersonalLaw.replace("_", " ").toUpperCase() },
        { label: "Permanent Domicile", val: [testator.address, testator.city, testator.state, testator.pincode].filter(Boolean).join(", ") || "India" },
      ],
    },
    {
      num: 2,
      step: 3,
      Icon: Users,
      color: "var(--color-gold)",
      title: `Family Directory (${family.length} Registered Heirs)`,
      customContent: (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.4rem" }}>
          {family.map((f) => (
            <span
              key={f.id}
              style={{
                padding: "0.35rem 0.75rem",
                borderRadius: "999px",
                backgroundColor: "rgba(27, 42, 74, 0.05)",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "var(--color-navy)",
              }}
            >
              {f.name} ({f.relationship}) {f.isMinor && "• Minor"}
            </span>
          ))}
        </div>
      ),
    },
    {
      num: 3,
      step: 4,
      Icon: Landmark,
      color: "var(--color-sage)",
      title: `Asset Register (${assets.length} Items • ${formatCurrency(totalValuation)})`,
      details: assets.map((a) => ({
        label: a.name,
        val: `${a.category.replace("_", " ")} • ${formatCurrency(a.approximateValue || 0)} (${a.ownership})`,
      })),
    },
    {
      num: 4,
      step: 5,
      Icon: PieChart,
      color: "#2563EB",
      title: "Residuary Estate & Specific Bequests",
      details: [
        { label: "Primary Residuary Legatee", val: state.residuaryBeneficiaryName || "Sunita Sharma" },
        { label: "Alternate Residuary Legatee", val: state.residuaryAlternateName || "Rahul Sharma" },
        { label: "Specific Allocations Configured", val: `${state.allocations.length} allocation rule(s)` },
      ],
    },
    {
      num: 5,
      step: 6,
      Icon: Scale,
      color: "#8B5CF6",
      title: "Fiduciary Appointments (Executors)",
      details: [
        { label: "Primary Executor", val: `${state.executorPrimary?.name || "Sunita Sharma"}` },
        { label: "Alternate Executor", val: `${state.executorAlternate?.name || "None specified"}` },
      ],
    },
    {
      num: 6,
      step: 7,
      Icon: ShieldCheck,
      color: "#059669",
      title: "Testamentary Guardians",
      details: family.some((f) => f.isMinor)
        ? [
            { label: "Primary Guardian", val: state.guardianPrimary?.name || "Appointed" },
            { label: "Alternate Guardian", val: state.guardianAlternate?.name || "Appointed" },
          ]
        : [{ label: "Minor Children Clause", val: "No minor children registered (Clause not invoked)" }],
    },
  ];

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
            Step 10 of 14 • Pre-Compilation Audit
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <AudioAssistantButton
              textToSpeak="Review your complete will summary. Check your personal details, family members, assets, and executors. Tap any card to make changes."
              label="Listen / सुनें 🔊"
            />
            <span style={{ fontSize: "0.75rem", color: "var(--color-slate)" }}>
              Tap any module below to edit directly
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem", flexWrap: "wrap" }}>
          <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
            Comprehensive Will Summary
          </h2>
          <span style={{ fontSize: "0.88rem", color: "#8A6D1B", fontWeight: 600 }}>
            (विवरण की संपूर्ण समीक्षा)
          </span>
        </div>
      </div>

      {/* Review Modules 2-Column Bento Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.85rem",
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          paddingRight: "0.25rem",
        }}
      >
        {reviewModules.map((mod) => {
          const ModIcon = mod.Icon;
          return (
            <div
              key={mod.num}
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid rgba(27, 42, 74, 0.08)",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.02)",
                padding: "0.95rem 1.15rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(27, 42, 74, 0.05)",
                      color: mod.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <ModIcon size={16} />
                  </div>
                  <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: "var(--color-navy)" }}>
                    {mod.title}
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() => onJumpToStep(mod.step)}
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--color-navy)",
                    padding: "0.25rem 0.65rem",
                    borderRadius: "8px",
                    backgroundColor: "rgba(27, 42, 74, 0.05)",
                    border: "none",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <Edit3 size={11} /> Edit
                </button>
              </div>

              {mod.details && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", paddingTop: "0.4rem", borderTop: "1px solid rgba(27, 42, 74, 0.05)" }}>
                  {mod.details.map((d, i) => (
                    <div key={i} style={{ fontSize: "0.78rem" }}>
                      <span style={{ color: "var(--color-slate)", fontSize: "0.7rem", display: "block" }}>{d.label}</span>
                      <span style={{ fontWeight: 600, color: "var(--color-navy)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block" }}>
                        {d.val}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {mod.customContent}
            </div>
          );
        })}
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
          Run Statutory Health Check <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
