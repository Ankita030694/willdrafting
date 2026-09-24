"use client";

import React, { useState } from "react";
import {
  WillDraftingState,
  BeneficiaryAllocation,
} from "@/lib/willDraftingStore";
import {
  PieChart,
  Sliders,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  User,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Split,
  RotateCcw,
} from "lucide-react";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";

interface Step5AllocationsProps {
  state: WillDraftingState;
  onUpdate: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step5Allocations({
  state,
  onUpdate,
  onNext,
  onBack,
}: Step5AllocationsProps) {
  const [allocations, setAllocations] = useState<BeneficiaryAllocation[]>(state.allocations || []);
  const [residuaryName, setResiduaryName] = useState(
    state.residuaryBeneficiaryName || (state.familyMembers[0]?.name || "")
  );
  const [residuaryAltName, setResiduaryAltName] = useState(
    state.residuaryAlternateName || (state.familyMembers[1]?.name || "")
  );
  const [validationError, setValidationError] = useState("");

  const assets = state.assets || [];
  const family = state.familyMembers || [];

  // Helper: Get allocations for an asset
  const getAssetAllocations = (assetId: string) => {
    return allocations.filter((alc) => alc.assetId === assetId);
  };

  // Helper: Get total percentage for an asset
  const getAssetTotalPct = (assetId: string) => {
    return getAssetAllocations(assetId).reduce((sum, a) => sum + (a.percentage || 0), 0);
  };

  const handleUpdatePercentage = (assetId: string, beneficiaryId: string, beneficiaryName: string, pct: number) => {
    setAllocations((prev) => {
      const existingIndex = prev.findIndex(
        (a) => a.assetId === assetId && (a.beneficiaryId === beneficiaryId || a.beneficiaryName === beneficiaryName)
      );

      if (existingIndex >= 0) {
        const copy = [...prev];
        if (pct <= 0) {
          copy.splice(existingIndex, 1);
        } else {
          copy[existingIndex].percentage = pct;
        }
        return copy;
      } else if (pct > 0) {
        return [
          ...prev,
          {
            id: `alc-${Date.now()}-${Math.random()}`,
            assetId,
            beneficiaryId,
            beneficiaryName,
            percentage: pct,
          },
        ];
      }
      return prev;
    });
  };

  // Preset split strategies
  const applyPresetSplit = (assetId: string, strategy: "spouse_100" | "equal_children" | "spouse_children_50_50" | "clear") => {
    // Remove all current allocations for this asset
    const remaining = allocations.filter((a) => a.assetId !== assetId);

    if (strategy === "clear") {
      setAllocations(remaining);
      return;
    }

    const spouse = family.find((f) => f.relationship === "spouse");
    const children = family.filter((f) => f.relationship === "son" || f.relationship === "daughter");

    const newAdds: BeneficiaryAllocation[] = [];

    if (strategy === "spouse_100" && spouse) {
      newAdds.push({
        id: `alc-${Date.now()}-1`,
        assetId,
        beneficiaryId: spouse.id,
        beneficiaryName: spouse.name,
        percentage: 100,
      });
    } else if (strategy === "equal_children" && children.length > 0) {
      const share = Math.floor(100 / children.length);
      const remainder = 100 - share * children.length;
      children.forEach((child, idx) => {
        newAdds.push({
          id: `alc-${Date.now()}-${idx}`,
          assetId,
          beneficiaryId: child.id,
          beneficiaryName: child.name,
          percentage: idx === 0 ? share + remainder : share,
        });
      });
    } else if (strategy === "spouse_children_50_50") {
      if (spouse) {
        newAdds.push({
          id: `alc-${Date.now()}-sp`,
          assetId,
          beneficiaryId: spouse.id,
          beneficiaryName: spouse.name,
          percentage: 50,
        });
      }
      if (children.length > 0) {
        const pool = spouse ? 50 : 100;
        const share = Math.floor(pool / children.length);
        const remainder = pool - share * children.length;
        children.forEach((child, idx) => {
          newAdds.push({
            id: `alc-${Date.now()}-ch-${idx}`,
            assetId,
            beneficiaryId: child.id,
            beneficiaryName: child.name,
            percentage: idx === 0 ? share + remainder : share,
          });
        });
      }
    }

    setAllocations([...remaining, ...newAdds]);
  };

  const handleSaveAndNext = () => {
    for (const asset of assets) {
      const total = getAssetTotalPct(asset.id);
      if (total !== 100 && total > 0) {
        setValidationError(
          `Allocation for "${asset.name}" equals ${total}%. Under Indian law, specific bequests must total exactly 100% to avoid partial intestacy.`
        );
        return;
      }
    }

    if (!residuaryName.trim()) {
      setValidationError("Please specify a primary Residuary Estate Beneficiary.");
      return;
    }

    onUpdate((prev) => ({
      ...prev,
      allocations,
      residuaryBeneficiaryName: residuaryName.trim(),
      residuaryAlternateName: residuaryAltName.trim(),
    }));

    onNext();
  };

  const spouse = family.find((f) => f.relationship === "spouse");
  const children = family.filter((f) => f.relationship === "son" || f.relationship === "daughter");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", width: "100%", height: "100%", justifyContent: "space-between" }}>
      {/* Compact Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.2rem 0.65rem", borderRadius: "999px", backgroundColor: "rgba(201, 162, 39, 0.12)", color: "var(--color-navy)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-gold)" }}></span>
            Step 5 of 14 • Testamentary Bequests & Shares
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem", flexWrap: "wrap" }}>
            <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.02em" }}>
              Distribute Your Assets
            </h2>
            <span style={{ fontSize: "0.88rem", color: "#8A6D1B", fontWeight: 600 }}>
              (संपत्ति का बंटवारा एवं हिस्सेदारी)
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <AudioAssistantButton
            textToSpeak="Decide who receives each asset. You can tap the quick split buttons like 100% to spouse or equal split among children, or slide the bar to adjust. Make sure each asset adds up to 100%."
            label="Listen / सुनें 🔊"
          />
          <span style={{ fontSize: "0.76rem", fontWeight: 700, padding: "0.25rem 0.65rem", borderRadius: "999px", backgroundColor: "rgba(124, 148, 115, 0.15)", color: "var(--color-sage)" }}>
            Section 102 ISA Compliant
          </span>
        </div>
      </div>

      {validationError && (
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
          <span>{validationError}</span>
        </div>
      )}

      {/* 2-Column Bento Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "0.85rem",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* Left Column: Specific Asset Allocations (Scrollable) */}
        <div style={{ flex: 1, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.75rem", paddingRight: "0.25rem" }}>
          {assets.length > 0 ? (
            assets.map((asset) => {
              const totalPct = getAssetTotalPct(asset.id);
              const isComplete = totalPct === 100;
              const isOver = totalPct > 100;

              return (
                <div
                  key={asset.id}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "16px",
                    border: isComplete
                      ? "1.5px solid var(--color-sage)"
                      : isOver
                      ? "1.5px solid #E11D48"
                      : "1.5px solid rgba(201, 162, 39, 0.4)",
                    padding: "1rem 1.15rem",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.02)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "var(--color-navy)" }}>
                        {asset.name}
                      </h4>
                      <span style={{ fontSize: "0.75rem", color: "var(--color-slate)" }}>
                        {asset.typeDetails}
                      </span>
                    </div>

                    <span
                      style={{
                        padding: "0.2rem 0.55rem",
                        borderRadius: "999px",
                        backgroundColor: isComplete
                          ? "rgba(124, 148, 115, 0.15)"
                          : isOver
                          ? "rgba(225, 29, 72, 0.12)"
                          : "rgba(201, 162, 39, 0.15)",
                        color: isComplete ? "var(--color-sage)" : isOver ? "#BE123C" : "#A37A12",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                      }}
                    >
                      {isComplete ? "100% Balanced" : `${totalPct}% Allocated`}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div
                    style={{
                      width: "100%",
                      height: "6px",
                      borderRadius: "999px",
                      backgroundColor: "rgba(27, 42, 74, 0.06)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.min(totalPct, 100)}%`,
                        height: "100%",
                        backgroundColor: isComplete ? "var(--color-sage)" : isOver ? "#E11D48" : "var(--color-gold)",
                        transition: "width 0.2s ease",
                      }}
                    />
                  </div>

                  {/* Quick Presets */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--color-slate)" }}>Quick:</span>
                    {spouse && (
                      <button
                        type="button"
                        onClick={() => applyPresetSplit(asset.id, "spouse_100")}
                        style={{
                          padding: "0.2rem 0.5rem",
                          borderRadius: "999px",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          backgroundColor: "rgba(27, 42, 74, 0.04)",
                          border: "1px solid rgba(27, 42, 74, 0.1)",
                          cursor: "pointer",
                        }}
                      >
                        100% Spouse
                      </button>
                    )}
                    {children.length > 0 && (
                      <button
                        type="button"
                        onClick={() => applyPresetSplit(asset.id, "equal_children")}
                        style={{
                          padding: "0.2rem 0.5rem",
                          borderRadius: "999px",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          backgroundColor: "rgba(27, 42, 74, 0.04)",
                          border: "1px solid rgba(27, 42, 74, 0.1)",
                          cursor: "pointer",
                        }}
                      >
                        Equal Children
                      </button>
                    )}
                    {spouse && children.length > 0 && (
                      <button
                        type="button"
                        onClick={() => applyPresetSplit(asset.id, "spouse_children_50_50")}
                        style={{
                          padding: "0.2rem 0.5rem",
                          borderRadius: "999px",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          backgroundColor: "rgba(27, 42, 74, 0.04)",
                          border: "1px solid rgba(27, 42, 74, 0.1)",
                          cursor: "pointer",
                        }}
                      >
                        50% Spouse / 50% Children
                      </button>
                    )}
                  </div>

                  {/* Sliders for Family Members */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", borderTop: "1px solid rgba(27, 42, 74, 0.05)", paddingTop: "0.5rem" }}>
                    {family.map((member) => {
                      const alc = allocations.find(
                        (a) => a.assetId === asset.id && (a.beneficiaryId === member.id || a.beneficiaryName === member.name)
                      );
                      const currentVal = alc ? alc.percentage : 0;

                      return (
                        <div key={member.id} style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                          <div style={{ width: "110px", flexShrink: 0 }}>
                            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-navy)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {member.name}
                            </div>
                            <span style={{ fontSize: "0.68rem", color: "var(--color-slate)", textTransform: "capitalize" }}>
                              {member.relationship}
                            </span>
                          </div>

                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={currentVal}
                            onChange={(e) => handleUpdatePercentage(asset.id, member.id, member.name, Number(e.target.value))}
                            style={{ flex: 1, accentColor: "var(--color-navy)", cursor: "pointer", height: "5px" }}
                          />

                          <div style={{ width: "45px", textAlign: "right", fontSize: "0.82rem", fontWeight: 800, color: currentVal > 0 ? "var(--color-navy)" : "var(--color-slate)" }}>
                            {currentVal}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: "1.5px dashed rgba(27, 42, 74, 0.12)",
                padding: "2rem 1.5rem",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <PieChart size={24} color="var(--color-slate)" />
              <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: "var(--color-navy)" }}>
                No specific assets cataloged
              </h4>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--color-slate)" }}>
                All estate wealth will automatically pass under the Residuary Legatee safety net.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Residuary Estate Safety Net */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "18px",
            border: "1px solid rgba(27, 42, 74, 0.08)",
            padding: "1.1rem 1.25rem",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.02)",
            display: "flex",
            flexDirection: "column",
            gap: "0.85rem",
            minHeight: 0,
            overflowY: "auto",
          }}
        >
          <div>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--color-gold)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Mandatory Statutory Clause • ISA §102
            </span>
            <h3 style={{ margin: "0.15rem 0 0", fontSize: "1.1rem", fontWeight: 700, color: "var(--color-navy)" }}>
              Residuary Estate Safety Net
            </h3>
            <p style={{ margin: "0.2rem 0 0", fontSize: "0.78rem", color: "var(--color-slate)", lineHeight: 1.45 }}>
              Who receives all unmentioned or future wealth? Appointing a residuary legatee guarantees zero intestacy.
            </p>
          </div>

          {/* Primary Residuary Beneficiary */}
          <div>
            <span style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.4rem" }}>
              Select Primary Residuary Legatee:
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
              {family.map((member) => {
                const isSelected = residuaryName === member.name;
                return (
                  <div
                    key={member.id}
                    onClick={() => setResiduaryName(member.name)}
                    style={{
                      padding: "0.5rem 0.65rem",
                      borderRadius: "10px",
                      border: isSelected ? "2px solid var(--color-gold)" : "1px solid rgba(27, 42, 74, 0.1)",
                      backgroundColor: isSelected ? "rgba(201, 162, 39, 0.08)" : "#FFFFFF",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-navy)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {member.name}
                      </div>
                      <span style={{ fontSize: "0.68rem", color: "var(--color-slate)", textTransform: "capitalize" }}>
                        {member.relationship}
                      </span>
                    </div>
                    {isSelected && <CheckCircle2 size={14} color="var(--color-gold)" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Alternate Residuary Beneficiary */}
          <div>
            <span style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "0.4rem" }}>
              Alternate Residuary Legatee (If primary predeceases):
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
              {family.map((member) => {
                const isSelected = residuaryAltName === member.name;
                return (
                  <div
                    key={member.id}
                    onClick={() => setResiduaryAltName(member.name)}
                    style={{
                      padding: "0.5rem 0.65rem",
                      borderRadius: "10px",
                      border: isSelected ? "2px solid var(--color-navy)" : "1px solid rgba(27, 42, 74, 0.1)",
                      backgroundColor: isSelected ? "rgba(27, 42, 74, 0.06)" : "#FFFFFF",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-navy)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {member.name}
                      </div>
                      <span style={{ fontSize: "0.68rem", color: "var(--color-slate)", textTransform: "capitalize" }}>
                        {member.relationship}
                      </span>
                    </div>
                    {isSelected && <CheckCircle2 size={14} color="var(--color-navy)" />}
                  </div>
                );
              })}
            </div>
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
          onClick={handleSaveAndNext}
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
          Save & Continue to Executors →
        </button>
      </div>
    </div>
  );
}
