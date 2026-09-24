"use client";

import React from "react";

export interface ChipOption {
  id: string;
  label: string;
  hindiLabel?: string;
  icon?: string;
}

interface QuickChipGroupProps {
  options: (ChipOption | string)[];
  value?: string | string[];
  onChange: (val: string) => void;
  isMulti?: boolean;
  label?: string;
  style?: React.CSSProperties;
}

export default function QuickChipGroup({
  options,
  value,
  onChange,
  isMulti = false,
  label,
  style,
}: QuickChipGroupProps) {
  const isSelected = (id: string) => {
    if (Array.isArray(value)) {
      return value.includes(id);
    }
    return value === id;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", ...style }}>
      {label && (
        <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#475569" }}>
          {label}
        </span>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {options.map((opt) => {
          const item: ChipOption =
            typeof opt === "string"
              ? { id: opt, label: opt }
              : opt;

          const selected = isSelected(item.id);

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.45rem 0.85rem",
                borderRadius: "9999px",
                border: selected
                  ? "1.5px solid var(--color-gold)"
                  : "1.5px solid rgba(27, 42, 74, 0.12)",
                backgroundColor: selected ? "rgba(212, 175, 55, 0.14)" : "#FFFFFF",
                color: selected ? "var(--color-navy)" : "#334155",
                fontSize: "0.82rem",
                fontWeight: selected ? 700 : 500,
                cursor: "pointer",
                transition: "all 0.15s ease",
                userSelect: "none",
                minHeight: "36px",
              }}
            >
              {item.icon && <span style={{ fontSize: "1rem" }}>{item.icon}</span>}
              <span>{item.label}</span>
              {item.hindiLabel && (
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: selected ? "#8A6D1B" : "#94A3B8",
                    fontWeight: 400,
                  }}
                >
                  ({item.hindiLabel})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
