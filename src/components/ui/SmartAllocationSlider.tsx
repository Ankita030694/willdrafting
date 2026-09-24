"use client";

import React from "react";

interface SmartAllocationSliderProps {
  percentage: number;
  onChange: (val: number) => void;
  label?: string;
  beneficiaryName?: string;
  totalAllocated?: number;
  max?: number;
}

export default function SmartAllocationSlider({
  percentage,
  onChange,
  label,
  beneficiaryName,
  totalAllocated = 100,
  max = 100,
}: SmartAllocationSliderProps) {
  const isComplete = totalAllocated === 100;
  const isOver = totalAllocated > 100;

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(27, 42, 74, 0.1)",
        borderRadius: "12px",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1E293B" }}>
            {beneficiaryName || label || "Beneficiary Share"}
          </div>
          <div style={{ fontSize: "0.74rem", color: "#64748B" }}>
            Slide to adjust or tap quick presets below
          </div>
        </div>

        {/* Big percentage pill */}
        <div
          style={{
            fontSize: "1.2rem",
            fontWeight: 800,
            padding: "0.25rem 0.75rem",
            borderRadius: "8px",
            backgroundColor: percentage > 0 ? "rgba(212, 175, 55, 0.15)" : "#F1F5F9",
            color: percentage > 0 ? "var(--color-navy)" : "#94A3B8",
          }}
        >
          {percentage}%
        </div>
      </div>

      {/* Slider */}
      <input
        type="range"
        min={0}
        max={max}
        step={5}
        value={percentage}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: "100%",
          accentColor: "var(--color-gold)",
          cursor: "pointer",
          height: "8px",
        }}
      />

      {/* Quick Presets for Effortless 1-Tap Adjustments */}
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", paddingTop: "0.25rem" }}>
        <button
          type="button"
          onClick={() => onChange(100)}
          style={{
            padding: "0.25rem 0.6rem",
            borderRadius: "6px",
            border: percentage === 100 ? "1px solid var(--color-gold)" : "1px solid #E2E8F0",
            backgroundColor: percentage === 100 ? "rgba(212, 175, 55, 0.15)" : "#F8FAFC",
            fontSize: "0.74rem",
            fontWeight: 600,
            color: percentage === 100 ? "var(--color-navy)" : "#475569",
            cursor: "pointer",
          }}
        >
          100% (All / पूरा)
        </button>
        <button
          type="button"
          onClick={() => onChange(50)}
          style={{
            padding: "0.25rem 0.6rem",
            borderRadius: "6px",
            border: percentage === 50 ? "1px solid var(--color-gold)" : "1px solid #E2E8F0",
            backgroundColor: percentage === 50 ? "rgba(212, 175, 55, 0.15)" : "#F8FAFC",
            fontSize: "0.74rem",
            fontWeight: 600,
            color: percentage === 50 ? "var(--color-navy)" : "#475569",
            cursor: "pointer",
          }}
        >
          50% (Half / आधा)
        </button>
        <button
          type="button"
          onClick={() => onChange(33.33)}
          style={{
            padding: "0.25rem 0.6rem",
            borderRadius: "6px",
            border: Math.round(percentage) === 33 ? "1px solid var(--color-gold)" : "1px solid #E2E8F0",
            backgroundColor: Math.round(percentage) === 33 ? "rgba(212, 175, 55, 0.15)" : "#F8FAFC",
            fontSize: "0.74rem",
            fontWeight: 600,
            color: Math.round(percentage) === 33 ? "var(--color-navy)" : "#475569",
            cursor: "pointer",
          }}
        >
          33.3% (1/3rd)
        </button>
        <button
          type="button"
          onClick={() => onChange(25)}
          style={{
            padding: "0.25rem 0.6rem",
            borderRadius: "6px",
            border: percentage === 25 ? "1px solid var(--color-gold)" : "1px solid #E2E8F0",
            backgroundColor: percentage === 25 ? "rgba(212, 175, 55, 0.15)" : "#F8FAFC",
            fontSize: "0.74rem",
            fontWeight: 600,
            color: percentage === 25 ? "var(--color-navy)" : "#475569",
            cursor: "pointer",
          }}
        >
          25% (1/4th)
        </button>
      </div>
    </div>
  );
}
