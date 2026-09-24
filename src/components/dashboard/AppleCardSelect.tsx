"use client";

import React from "react";

interface AppleCardSelectProps {
  selected: boolean;
  onSelect: () => void;
  icon?: string | React.ReactNode;
  title: string;
  description?: string;
  badge?: string;
  statutoryTag?: string;
}

export default function AppleCardSelect({
  selected,
  onSelect,
  icon,
  title,
  description,
  badge,
  statutoryTag,
}: AppleCardSelectProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      style={{
        padding: "1.25rem 1.35rem",
        borderRadius: "18px",
        backgroundColor: selected ? "rgba(255, 255, 255, 0.98)" : "rgba(255, 255, 255, 0.75)",
        border: selected ? "2px solid var(--color-gold)" : "1px solid rgba(27, 42, 74, 0.08)",
        boxShadow: selected
          ? "0 6px 20px rgba(201, 162, 39, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)"
          : "0 2px 8px rgba(27, 42, 74, 0.03)",
        cursor: "pointer",
        position: "relative",
        transition: "all 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        backdropFilter: "blur(20px)",
        outline: "none",
        userSelect: "none",
      }}
    >
      {/* Top row: Icon and checkmark */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {icon && (
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              backgroundColor: selected ? "rgba(201, 162, 39, 0.12)" : "rgba(27, 42, 74, 0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.25rem",
            }}
          >
            {icon}
          </div>
        )}

        <div
          style={{
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            border: selected ? "2px solid var(--color-gold)" : "2px solid rgba(27, 42, 74, 0.2)",
            backgroundColor: selected ? "var(--color-gold)" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            marginLeft: "auto",
          }}
        >
          {selected && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "var(--color-navy)" }}>
            {title}
          </h4>
          {badge && (
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                padding: "0.15rem 0.45rem",
                borderRadius: "6px",
                backgroundColor: "rgba(124, 148, 115, 0.15)",
                color: "var(--color-sage)",
              }}
            >
              {badge}
            </span>
          )}
        </div>

        {description && (
          <p style={{ margin: "0.35rem 0 0", fontSize: "0.825rem", color: "var(--color-slate)", lineHeight: 1.45 }}>
            {description}
          </p>
        )}

        {statutoryTag && (
          <div
            style={{
              marginTop: "0.5rem",
              fontSize: "0.725rem",
              color: "var(--text-muted)",
              fontStyle: "italic",
            }}
          >
            {statutoryTag}
          </div>
        )}
      </div>
    </div>
  );
}
