"use client";

import React from "react";

interface AppleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  activeColor?: string;
}

export default function AppleSwitch({
  checked,
  onChange,
  disabled = false,
  label,
  activeColor = "var(--color-sage)",
}: AppleSwitchProps) {
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.75rem",
        cursor: disabled ? "not-allowed" : "pointer",
        userSelect: "none",
      }}
    >
      <div
        onClick={() => !disabled && onChange(!checked)}
        style={{
          width: "48px",
          height: "28px",
          borderRadius: "999px",
          backgroundColor: checked ? activeColor : "rgba(27, 42, 74, 0.15)",
          padding: "2px",
          transition: "background-color 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: checked
            ? "0 2px 8px rgba(124, 148, 115, 0.3)"
            : "inset 0 1px 3px rgba(0, 0, 0, 0.08)",
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.18), 0 0 1px rgba(0, 0, 0, 0.12)",
            transform: checked ? "translateX(20px)" : "translateX(0px)",
            transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>
      {label && (
        <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--color-navy)" }}>
          {label}
        </span>
      )}
    </label>
  );
}
