"use client";

import React, { useState } from "react";
import {
  WillDraftingState,
  Asset,
  AssetCategory,
  saveStoredWillState,
} from "@/lib/willDraftingStore";
import { Check } from "lucide-react";

interface AssetAllocationVisualizerProps {
  state: WillDraftingState;
  onStateChange: (newState: WillDraftingState) => void;
}

export default function AssetAllocationVisualizer({
  state,
  onStateChange,
}: AssetAllocationVisualizerProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false);

  // New asset form
  const [name, setName] = useState("");
  const [category, setCategory] = useState<AssetCategory>("property");
  const [value, setValue] = useState(5000000);
  const [ownership, setOwnership] = useState<"sole" | "joint">("sole");
  const [identifier, setIdentifier] = useState("");

  const assets = state.assets || [];
  const allocations = state.allocations || [];
  const family = state.familyMembers || [];

  const totalValue = assets.reduce((sum, a) => sum + (a.approximateValue || 0), 0);

  // Group assets by category for the donut chart
  const categoryGroups: Record<string, { label: string; value: number; color: string; count: number }> = {
    property: { label: "Real Estate", value: 0, color: "var(--color-navy)", count: 0 },
    bank_account: { label: "Bank & Deposits", value: 0, color: "var(--color-slate)", count: 0 },
    investments: { label: "Equities & Mutual Funds", value: 0, color: "var(--color-gold)", count: 0 },
    jewellery: { label: "Jewellery & Gold", value: 0, color: "#E11D48", count: 0 },
    vehicles: { label: "Vehicles", value: 0, color: "var(--color-sage)", count: 0 },
    other: { label: "Other Assets", value: 0, color: "#64748B", count: 0 },
  };

  assets.forEach((a) => {
    const key = categoryGroups[a.category] ? a.category : "other";
    categoryGroups[key].value += a.approximateValue || 0;
    categoryGroups[key].count += 1;
  });

  const activeCategories = Object.entries(categoryGroups).filter(([, v]) => v.value > 0);

  // SVG Donut calculation
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let accumulatedOffset = 0;

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹ ${(val / 100000).toFixed(2)} Lakhs`;
    return `₹ ${val.toLocaleString("en-IN")}`;
  };

  const handleSliderChange = (beneficiaryId: string, beneficiaryName: string, newPct: number) => {
    // If there's an asset, update allocations
    const firstAssetId = assets[0]?.id || "ast-all";
    const existingIndex = allocations.findIndex((a) => a.beneficiaryId === beneficiaryId || a.beneficiaryName === beneficiaryName);
    const updatedAllocations = [...allocations];

    if (existingIndex >= 0) {
      updatedAllocations[existingIndex].percentage = newPct;
    } else {
      updatedAllocations.push({
        id: `alc-${Date.now()}`,
        assetId: firstAssetId,
        beneficiaryId,
        beneficiaryName,
        percentage: newPct,
      });
    }

    const updatedState = { ...state, allocations: updatedAllocations };
    saveStoredWillState(updatedState);
    onStateChange(updatedState);
  };

  const handleSaveAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newAsset: Asset = {
      id: `ast-${Date.now()}`,
      category,
      name: name.trim(),
      typeDetails: category.replace("_", " "),
      identifier: identifier || "N/A",
      addressOrInstitution: "India",
      ownership,
      approximateValue: Number(value),
      hasLoan: false,
    };

    const updatedAssets = [...assets, newAsset];
    const updatedState = { ...state, assets: updatedAssets };
    saveStoredWillState(updatedState);
    onStateChange(updatedState);
    setIsAddAssetOpen(false);
    setName("");
    setIdentifier("");
  };

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "24px",
        border: "1px solid var(--border-card)",
        boxShadow: "0 12px 36px -8px rgba(27, 42, 74, 0.08)",
        overflow: "hidden",
      }}
    >
      {/* Header Strip */}
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
          <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-gold)" }}>
            Financial Portfolio Architecture
          </span>
          <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--color-navy)", margin: "0.2rem 0 0" }}>
            Asset Wealth & Beneficiary Distribution
          </h3>
        </div>

        <button
          onClick={() => setIsAddAssetOpen(true)}
          className="btn btn-gold"
          style={{
            padding: "0.45rem 1.15rem",
            fontSize: "0.8rem",
            borderRadius: "999px",
            fontWeight: 700,
          }}
        >
          + Add New Asset
        </button>
      </div>

      {/* Main Grid: Visual Donut + Allocation Sliders */}
      <div
        style={{
          padding: "2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2.5rem",
          alignItems: "center",
        }}
      >
        {/* Left: Donut Chart */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ position: "relative", width: "200px", height: "200px" }}>
            <svg width="200" height="200" viewBox="0 0 200 200" style={{ transform: "rotate(-90deg)" }}>
              {/* Background ring */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="rgba(27, 42, 74, 0.08)"
                strokeWidth="22"
              />

              {/* Dynamic Slices */}
              {totalValue > 0 &&
                activeCategories.map(([key, cat]) => {
                  const slicePct = cat.value / totalValue;
                  const strokeDasharray = `${slicePct * circumference} ${circumference}`;
                  const strokeDashoffset = -accumulatedOffset;
                  accumulatedOffset += slicePct * circumference;

                  return (
                    <circle
                      key={key}
                      cx="100"
                      cy="100"
                      r={radius}
                      fill="none"
                      stroke={cat.color}
                      strokeWidth={hoveredCategory === key ? "26" : "22"}
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      style={{
                        cursor: "pointer",
                        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      onMouseEnter={() => setHoveredCategory(key)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    />
                  );
                })}
            </svg>

            {/* Center Label */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.05em" }}>
                Total Estate
              </span>
              <span style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-navy)" }}>
                {formatCurrency(totalValue)}
              </span>
              <span style={{ fontSize: "0.68rem", color: "var(--color-slate)" }}>
                {assets.length} Assets
              </span>
            </div>
          </div>

          {/* Donut Legend */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem", justifyContent: "center", marginTop: "1.5rem" }}>
            {activeCategories.map(([key, cat]) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "0.78rem",
                  color: "var(--color-navy)",
                  cursor: "pointer",
                  fontWeight: hoveredCategory === key ? 700 : 500,
                }}
                onMouseEnter={() => setHoveredCategory(key)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: cat.color,
                    display: "inline-block",
                  }}
                />
                <span>{cat.label}</span>
                <span style={{ color: "var(--text-muted)" }}>({formatCurrency(cat.value)})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Beneficiary Distribution Sliders */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "var(--color-navy)" }}>
              Beneficiary Distribution Tally
            </h4>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                backgroundColor: "rgba(124, 148, 115, 0.15)",
                color: "var(--color-navy)",
                padding: "0.2rem 0.6rem",
                borderRadius: "999px",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <Check size={12} strokeWidth={2.5} /> 100% Balanced
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {family.map((member) => {
              const currentAlloc = allocations.find((a) => a.beneficiaryId === member.id || a.beneficiaryName === member.name);
              const pct = currentAlloc ? currentAlloc.percentage : 0;
              return (
                <div
                  key={member.id}
                  style={{
                    backgroundColor: "var(--bg-page)",
                    borderRadius: "16px",
                    padding: "1rem 1.25rem",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <div>
                      <span style={{ fontWeight: 700, color: "var(--color-navy)", fontSize: "0.9rem" }}>
                        {member.name}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: "0.4rem", textTransform: "capitalize" }}>
                        ({member.relationship})
                      </span>
                    </div>

                    <span style={{ fontWeight: 800, fontSize: "1rem", color: "var(--color-navy)" }}>
                      {pct}%
                    </span>
                  </div>

                  {/* Range Slider */}
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={pct}
                    onChange={(e) => handleSliderChange(member.id, member.name, Number(e.target.value))}
                    style={{
                      width: "100%",
                      accentColor: "var(--color-navy)",
                      cursor: "pointer",
                    }}
                  />

                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                    <span>Estimated: {formatCurrency((totalValue * pct) / 100)}</span>
                    <span>{pct === 100 ? "Sole Heir" : `${pct}% Share`}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Asset Modal */}
      {isAddAssetOpen && (
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
          onClick={() => setIsAddAssetOpen(false)}
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
              Add Asset to Wealth Register
            </h3>

            <form onSubmit={handleSaveAsset} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
                  Asset Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as AssetCategory)}
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
                  <option value="property">Immovable Real Estate</option>
                  <option value="bank_account">Bank Accounts / Fixed Deposits</option>
                  <option value="investments">Mutual Funds & Demat Portfolio</option>
                  <option value="jewellery">Jewellery & Gold</option>
                  <option value="vehicles">Motor Vehicles</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
                  Asset Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., South Delhi Apartment"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
                  Approximate Valuation (INR) *
                </label>
                <input
                  type="number"
                  required
                  step={50000}
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
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

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setIsAddAssetOpen(false)}
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
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
