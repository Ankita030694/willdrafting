"use client";

import React from "react";
import { INDIAN_STATES_AND_UTS } from "@/lib/pincode";
import { ChevronDown, CheckCircle2 } from "lucide-react";

interface StateDropdownProps {
  value: string;
  onChange: (state: string) => void;
  name?: string;
  id?: string;
  autoFilled?: boolean;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function StateDropdown({
  value,
  onChange,
  name = "state",
  id,
  autoFilled = false,
  disabled = false,
  required = false,
  placeholder = "Select State / UT",
  className = "",
  style = {},
}: StateDropdownProps) {
  // Normalize match if existing value differs slightly in casing
  const matchedState = INDIAN_STATES_AND_UTS.find(
    (st) => st.toLowerCase() === (value || "").toLowerCase()
  );

  return (
    <div style={{ position: "relative", width: "100%", ...style }} className={className}>
      <select
        id={id}
        name={name}
        value={matchedState || value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-[15px] text-[#111827] outline-none transition-colors rounded-none shadow-none font-medium appearance-none cursor-pointer"
        style={{
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          borderRadius: 0,
          paddingLeft: 0,
          paddingRight: "1.8rem",
          backgroundColor: "transparent",
        }}
      >
        <option value="" disabled className="text-[#9CA3AF]">
          {placeholder}
        </option>
        {INDIAN_STATES_AND_UTS.map((st) => (
          <option key={st} value={st} className="text-[#111827] bg-[#FFFFFF] py-1">
            {st}
          </option>
        ))}
      </select>

      {/* Trailing Chevron indicator */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          color: "#6B7280",
        }}
      >
        {autoFilled && (
          <CheckCircle2 size={13} color="var(--color-sage)" />
        )}
        <ChevronDown size={15} />
      </div>
    </div>
  );
}
