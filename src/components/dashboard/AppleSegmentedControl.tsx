"use client";

import React from "react";

export interface SegmentOption<T extends string = string> {
  value: T;
  label: string;
  icon?: string;
  badge?: string;
}

interface AppleSegmentedControlProps<T extends string = string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export default function AppleSegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  size = "md",
  fullWidth = true,
}: AppleSegmentedControlProps<T>) {
  const paddingMap = {
    sm: "0.35rem 0.65rem",
    md: "0.5rem 1rem",
    lg: "0.65rem 1.25rem",
  };

  const fontMap = {
    sm: "0.8rem",
    md: "0.875rem",
    lg: "0.95rem",
  };

  return (
    <div
      role="tablist"
      style={{
        display: fullWidth ? "flex" : "inline-flex",
        backgroundColor: "rgba(27, 42, 74, 0.06)",
        borderRadius: "14px",
        padding: "3px",
        gap: "3px",
        border: "1px solid rgba(27, 42, 74, 0.04)",
        userSelect: "none",
        width: fullWidth ? "100%" : "auto",
      }}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(option.value)}
            style={{
              flex: fullWidth ? 1 : undefined,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.45rem",
              padding: paddingMap[size],
              fontSize: fontMap[size],
              fontWeight: isSelected ? 700 : 500,
              color: isSelected ? "var(--color-navy)" : "var(--color-slate)",
              backgroundColor: isSelected ? "#FFFFFF" : "transparent",
              borderRadius: "11px",
              border: "none",
              boxShadow: isSelected
                ? "0 2px 8px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.12)"
                : "none",
              cursor: "pointer",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              position: "relative",
              whiteSpace: "nowrap",
            }}
          >
            {option.icon && <span style={{ fontSize: "1.05em" }}>{option.icon}</span>}
            <span>{option.label}</span>
            {option.badge && (
              <span
                style={{
                  fontSize: "0.65rem",
                  padding: "0.15rem 0.4rem",
                  borderRadius: "999px",
                  backgroundColor: isSelected ? "rgba(201, 162, 39, 0.15)" : "rgba(27, 42, 74, 0.08)",
                  color: isSelected ? "#A37A12" : "var(--color-slate)",
                  fontWeight: 700,
                }}
              >
                {option.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
