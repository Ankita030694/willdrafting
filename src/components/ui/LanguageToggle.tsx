"use client";

import React from "react";
import { Globe } from "lucide-react";
import { useLanguage, Language } from "@/context/LanguageContext";

interface LanguageToggleProps {
  lang?: Language;
  currentLang?: Language;
  onChangeLang?: (lang: Language) => void;
  onToggle?: (lang: Language) => void;
  size?: "sm" | "md";
  className?: string;
  style?: React.CSSProperties;
}

export default function LanguageToggle({
  lang: propLang,
  currentLang: propCurrentLang,
  onChangeLang: propOnChangeLang,
  onToggle: propOnToggle,
  size = "md",
  className = "",
  style = {},
}: LanguageToggleProps) {
  const context = useLanguage();
  const currentLang = propCurrentLang || propLang || context.lang || "en";
  const handleToggle = propOnToggle || propOnChangeLang || context.setLang;

  const isHi = currentLang === "hi";
  const isSm = size === "sm";

  return (
    <div
      role="radiogroup"
      aria-label="Select Language / भाषा चुनें"
      className={`language-toggle-pill ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: "rgba(23, 34, 40, 0.06)",
        border: "1px solid rgba(23, 34, 40, 0.12)",
        borderRadius: "999px",
        padding: isSm ? "2px" : "3px",
        gap: "2px",
        userSelect: "none",
        flexShrink: 0,
        ...style,
      }}
    >
      <button
        type="button"
        role="radio"
        aria-checked={!isHi}
        onClick={() => handleToggle("en")}
        title="Switch to English"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.3rem",
          padding: isSm ? "0.2rem 0.55rem" : "0.26rem 0.75rem",
          borderRadius: "999px",
          border: "none",
          fontSize: isSm ? "0.72rem" : "0.76rem",
          fontWeight: 700,
          cursor: "pointer",
          backgroundColor: !isHi ? "var(--color-gold)" : "transparent",
          color: !isHi ? "#FFFFFF" : "var(--color-navy)",
          boxShadow: !isHi ? "0 2px 8px rgba(198, 83, 120, 0.3)" : "none",
          transition: "all 0.18s ease",
        }}
      >
        <Globe size={isSm ? 11 : 12} />
        <span>English</span>
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={isHi}
        onClick={() => handleToggle("hi")}
        title="हिंदी में बदलें"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.3rem",
          padding: isSm ? "0.2rem 0.6rem" : "0.26rem 0.8rem",
          borderRadius: "999px",
          border: "none",
          fontSize: isSm ? "0.74rem" : "0.78rem",
          fontWeight: 700,
          cursor: "pointer",
          backgroundColor: isHi ? "var(--color-gold)" : "transparent",
          color: isHi ? "#FFFFFF" : "var(--color-navy)",
          boxShadow: isHi ? "0 2px 8px rgba(198, 83, 120, 0.3)" : "none",
          transition: "all 0.18s ease",
        }}
      >
        <span>हिंदी</span>
      </button>
    </div>
  );
}
