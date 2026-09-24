"use client";

import React from "react";

interface VisualChoiceCardProps {
  icon?: React.ReactNode | string;
  title: string;
  hindiSubtitle?: string;
  description?: string;
  badge?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function VisualChoiceCard({
  icon,
  title,
  hindiSubtitle,
  description,
  badge,
  selected = false,
  disabled = false,
  onClick,
  style,
}: VisualChoiceCardProps) {
  return (
    <div
      onClick={() => {
        if (!disabled && onClick) onClick();
      }}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          if (onClick) onClick();
        }
      }}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1rem 1.1rem",
        borderRadius: "14px",
        backgroundColor: selected ? "#FEFDF8" : "#FFFFFF",
        border: selected
          ? "2px solid #D4AF37"
          : "1.5px solid rgba(27, 42, 74, 0.12)",
        boxShadow: selected
          ? "0 8px 20px -4px rgba(212, 175, 55, 0.25), 0 2px 6px -1px rgba(15, 29, 56, 0.05)"
          : "0 2px 8px rgba(15, 29, 56, 0.04)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: selected ? "translateY(-2px)" : "none",
        outline: "none",
        userSelect: "none",
        ...style,
      }}
    >
      {/* Top row: Icon + Tick / Badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
        <div
          style={{
            fontSize: "1.6rem",
            lineHeight: 1,
            width: "42px",
            height: "42px",
            borderRadius: "10px",
            backgroundColor: selected ? "rgba(212, 175, 55, 0.18)" : "rgba(27, 42, 74, 0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          {badge && (
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                padding: "0.15rem 0.45rem",
                borderRadius: "4px",
                backgroundColor: "rgba(212, 175, 55, 0.15)",
                color: "#9A7B1C",
                textTransform: "uppercase",
              }}
            >
              {badge}
            </span>
          )}
          {/* Selected Tick Indicator */}
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              border: selected ? "none" : "1.5px solid rgba(27, 42, 74, 0.2)",
              backgroundColor: selected ? "var(--color-gold)" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              transition: "all 0.15s ease",
            }}
          >
            {selected && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <div>
        <div
          style={{
            fontSize: "0.95rem",
            fontWeight: 700,
            color: selected ? "var(--color-navy)" : "#1E293B",
            lineHeight: 1.3,
          }}
        >
          {title}
        </div>
        {hindiSubtitle && (
          <div
            style={{
              fontSize: "0.78rem",
              color: selected ? "#8A6D1B" : "#64748B",
              marginTop: "0.15rem",
              fontWeight: 500,
            }}
          >
            {hindiSubtitle}
          </div>
        )}
        {description && (
          <div
            style={{
              fontSize: "0.74rem",
              color: "#64748B",
              marginTop: "0.35rem",
              lineHeight: 1.35,
            }}
          >
            {description}
          </div>
        )}
      </div>
    </div>
  );
}
