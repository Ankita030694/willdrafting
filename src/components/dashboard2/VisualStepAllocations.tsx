"use client";

import React, { useState } from "react";
import { WillDraftingState, BeneficiaryAllocation } from "@/lib/willDraftingStore";
import AudioAssistantButton from "@/components/ui/AudioAssistantButton";
import SmartAllocationSlider from "@/components/ui/SmartAllocationSlider";
import { Sparkles, Check, AlertCircle, Scale, Heart, Users } from "lucide-react";

interface VisualStepAllocationsProps {
  state: WillDraftingState;
  onUpdate: (updater: (prev: WillDraftingState) => WillDraftingState) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function VisualStepAllocations({ state, onUpdate, onNext, onBack }: VisualStepAllocationsProps) {
  const [allocations, setAllocations] = useState<BeneficiaryAllocation[]>(state.allocations || []);
  const assets = state.assets || [];
  const family = state.familyMembers || [];

  const spouse = family.find((f) => f.relationship === "spouse");
  const children = family.filter((f) => f.relationship === "son" || f.relationship === "daughter");

  const getAssetTotalPct = (assetId: string) => {
    return allocations
      .filter((a) => a.assetId === assetId)
      .reduce((sum, a) => sum + (a.percentage || 0), 0);
  };

  const handleUpdatePercentage = (assetId: string, memberId: string, memberName: string, pct: number) => {
    setAllocations((prev) => {
      const idx = prev.findIndex((a) => a.assetId === assetId && a.beneficiaryId === memberId);
      if (idx >= 0) {
        const copy = [...prev];
        if (pct <= 0) copy.splice(idx, 1);
        else copy[idx].percentage = pct;
        return copy;
      } else if (pct > 0) {
        return [
          ...prev,
          {
            id: `alc-${Date.now()}-${Math.random()}`,
            assetId,
            beneficiaryId: memberId,
            beneficiaryName: memberName,
            percentage: pct,
          },
        ];
      }
      return prev;
    });
  };

  const applyPreset = (assetId: string, type: "100_spouse" | "50_50" | "equal_children") => {
    const remaining = allocations.filter((a) => a.assetId !== assetId);
    const newAdds: BeneficiaryAllocation[] = [];

    if (type === "100_spouse" && spouse) {
      newAdds.push({
        id: `alc-${Date.now()}-sp`,
        assetId,
        beneficiaryId: spouse.id,
        beneficiaryName: spouse.name,
        percentage: 100,
      });
    } else if (type === "equal_children" && children.length > 0) {
      const share = Math.floor(100 / children.length);
      const rem = 100 - share * children.length;
      children.forEach((c, i) => {
        newAdds.push({
          id: `alc-${Date.now()}-ch-${i}`,
          assetId,
          beneficiaryId: c.id,
          beneficiaryName: c.name,
          percentage: i === 0 ? share + rem : share,
        });
      });
    } else if (type === "50_50") {
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
        const rem = pool - share * children.length;
        children.forEach((c, i) => {
          newAdds.push({
            id: `alc-${Date.now()}-ch-${i}`,
            assetId,
            beneficiaryId: c.id,
            beneficiaryName: c.name,
            percentage: i === 0 ? share + rem : share,
          });
        });
      }
    }

    const updated = [...remaining, ...newAdds];
    setAllocations(updated);
    onUpdate((p) => ({ ...p, allocations: updated }));
  };

  const handleSave = () => {
    onUpdate((p) => ({ ...p, allocations }));
    onNext();
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
            Step 4 of 6 • Distribution Studio
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--color-navy)", margin: 0 }}>
            Who Gets What?
          </h2>
          <div style={{ fontSize: "0.95rem", color: "#8A6D1B", fontWeight: 600, marginTop: "0.2rem" }}>
            (कौन सी संपत्ति किसे मिलनी चाहिए?)
          </div>
        </div>

        <AudioAssistantButton
          textToSpeak="Who gets what? You can tap the magic buttons like 100 percent to spouse or equal split among children, or slide to set exact shares. When an asset reaches 100 percent, it turns green."
          label="Listen / सुनें 🔊"
        />
      </div>

      {/* Assets Allocation Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {assets.map((asset) => {
          const totalPct = getAssetTotalPct(asset.id);
          const isComplete = totalPct === 100;
          const isOver = totalPct > 100;

          return (
            <div
              key={asset.id}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                padding: "1.5rem",
                border: isComplete ? "2px solid #10B981" : isOver ? "2px solid #EF4444" : "1.5px solid rgba(15, 29, 56, 0.12)",
                boxShadow: "0 4px 16px rgba(15, 29, 56, 0.04)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {/* Asset Title Bar + Status */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 800, color: "var(--color-navy)" }}>
                    {asset.name}
                  </h4>
                  <div style={{ fontSize: "0.8rem", color: "#64748B", marginTop: "0.2rem" }}>
                    {asset.identifier || asset.typeDetails}
                  </div>
                </div>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    padding: "0.35rem 0.75rem",
                    borderRadius: "999px",
                    backgroundColor: isComplete ? "rgba(16, 185, 129, 0.15)" : isOver ? "rgba(239, 68, 68, 0.15)" : "rgba(212, 175, 55, 0.15)",
                    color: isComplete ? "#059669" : isOver ? "#DC2626" : "#B45309",
                    fontWeight: 800,
                    fontSize: "0.82rem",
                  }}
                >
                  {isComplete ? (
                    <>
                      <Check size={14} strokeWidth={3} /> 100% Balanced / संतुलित
                    </>
                  ) : isOver ? (
                    `Over by ${totalPct - 100}%`
                  ) : (
                    `${totalPct}% Allocated (${100 - totalPct}% remaining)`
                  )}
                </div>
              </div>

              {/* 1-Tap Magic Presets */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", padding: "0.5rem 0", borderTop: "1px solid rgba(15, 29, 56, 0.06)", borderBottom: "1px solid rgba(15, 29, 56, 0.06)" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748B" }}>Magic 1-Tap Split / आसान विकल्प:</span>
                {spouse && (
                  <button
                    type="button"
                    onClick={() => applyPreset(asset.id, "100_spouse")}
                    style={{
                      padding: "0.35rem 0.75rem",
                      borderRadius: "8px",
                      border: "1px solid rgba(212, 175, 55, 0.3)",
                      backgroundColor: "rgba(212, 175, 55, 0.1)",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "var(--color-navy)",
                      cursor: "pointer",
                    }}
                  >
                    ✨ 100% Spouse (100% जीवनसाथी)
                  </button>
                )}
                {children.length > 0 && (
                  <button
                    type="button"
                    onClick={() => applyPreset(asset.id, "equal_children")}
                    style={{
                      padding: "0.35rem 0.75rem",
                      borderRadius: "8px",
                      border: "1px solid rgba(37, 99, 235, 0.25)",
                      backgroundColor: "rgba(37, 99, 235, 0.08)",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "#1D4ED8",
                      cursor: "pointer",
                    }}
                  >
                    👨‍👧‍👦 Equal Children (बच्चों में बराबर)
                  </button>
                )}
                {spouse && children.length > 0 && (
                  <button
                    type="button"
                    onClick={() => applyPreset(asset.id, "50_50")}
                    style={{
                      padding: "0.35rem 0.75rem",
                      borderRadius: "8px",
                      border: "1px solid rgba(16, 185, 129, 0.25)",
                      backgroundColor: "rgba(16, 185, 129, 0.08)",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "#059669",
                      cursor: "pointer",
                    }}
                  >
                    ⚖️ 50% Spouse / 50% Children
                  </button>
                )}
              </div>

              {/* Sliders for Each Beneficiary */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {family.map((member) => {
                  const alc = allocations.find((a) => a.assetId === asset.id && a.beneficiaryId === member.id);
                  const currentVal = alc ? alc.percentage : 0;

                  return (
                    <SmartAllocationSlider
                      key={member.id}
                      beneficiaryName={`${member.name} (${member.relationship})`}
                      percentage={currentVal}
                      totalAllocated={totalPct}
                      onChange={(val) => handleUpdatePercentage(asset.id, member.id, member.name, val)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

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
          onClick={handleSave}
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
          Save & Continue to Executors (वसीयत प्रबंधक) ➔
        </button>
      </div>
    </div>
  );
}
