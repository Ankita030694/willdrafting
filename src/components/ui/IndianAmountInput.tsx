"use client";

import React from "react";
import { formatIndianNumber, parseIndianNumber } from "@/lib/inputSanitizers";

interface IndianAmountInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type"> {
  value: number | undefined;
  onValueChange: (value: number) => void;
  /** Show a leading ₹ symbol */
  showRupee?: boolean;
}

/**
 * Text-only amount input. Only digits are accepted and the displayed value is
 * automatically grouped in Indian style (12,34,567). Emits a plain number.
 */
export default function IndianAmountInput({
  value,
  onValueChange,
  showRupee = true,
  style,
  placeholder,
  ...rest
}: IndianAmountInputProps) {
  const display = value ? formatIndianNumber(value) : "";
  return (
    <div style={{ position: "relative", width: "100%" }}>
      {showRupee && (
        <span
          style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#64748b",
            fontWeight: 600,
            pointerEvents: "none",
          }}
        >
          ₹
        </span>
      )}
      <input
        {...rest}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={display}
        placeholder={placeholder ?? "0"}
        onChange={(e) => onValueChange(parseIndianNumber(e.target.value))}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: showRupee ? "12px 14px 12px 32px" : "12px 14px",
          borderRadius: 10,
          border: "1.5px solid #d6dbe4",
          fontSize: 16,
          fontWeight: 600,
          outline: "none",
          ...style,
        }}
      />
    </div>
  );
}
