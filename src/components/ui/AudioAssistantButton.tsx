"use client";

import React from "react";
import { useVoiceAssistant } from "@/hooks/useVoiceAssistant";
import { useLanguage } from "@/context/LanguageContext";

interface AudioAssistantButtonProps {
  textToSpeak: string;
  hindiText?: string;
  label?: string;
  style?: React.CSSProperties;
}

export default function AudioAssistantButton({
  textToSpeak,
  hindiText,
  label,
  style,
}: AudioAssistantButtonProps) {
  const { isHi } = useLanguage();
  const { speak, stop, isPlaying, supported } = useVoiceAssistant();

  if (!supported) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      stop();
    } else {
      if (isHi && (hindiText || textToSpeak)) {
        speak(hindiText || textToSpeak, "hi-IN");
      } else {
        speak(textToSpeak, "en-IN");
      }
    }
  };

  // Derive strictly single-language label (without duplicate speaker emoji since SVG icon is rendered)
  let displayLabel: string;
  if (label) {
    if (label.includes(" / ")) {
      displayLabel = isHi ? "सुनें" : "Listen";
    } else {
      displayLabel = label.replace(/\s*🔊/g, "").trim();
    }
  } else {
    displayLabel = isHi ? "सुनें" : "Listen";
  }

  const playingLabel = isHi ? "रोकें" : "Stop";

  return (
    <button
      type="button"
      className="audio-assistant-btn"
      onClick={handleClick}
      title={isPlaying ? "Stop audio" : "Listen to question in simple language"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        padding: "0.35rem 0.75rem",
        borderRadius: "9999px",
        backgroundColor: isPlaying ? "rgba(198, 83, 120, 0.15)" : "rgba(23, 34, 40, 0.06)",
        border: isPlaying ? "1px solid var(--color-gold)" : "1px solid rgba(23, 34, 40, 0.12)",
        color: isPlaying ? "var(--color-gold)" : "var(--color-navy)",
        fontSize: "0.78rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s ease",
        userSelect: "none",
        whiteSpace: "nowrap",
        flexShrink: 0,
        ...style,
      }}
    >
      {/* Speaker Icon with optional animated pulse */}
      <span style={{ display: "inline-flex", alignItems: "center" }}>
        {isPlaying ? (
          <span style={{ display: "flex", alignItems: "center", gap: "2px", height: "14px" }}>
            <span
              style={{
                width: "3px",
                height: "12px",
                backgroundColor: "var(--color-gold)",
                borderRadius: "2px",
                animation: "pulse 0.6s ease infinite alternate",
              }}
            />
            <span
              style={{
                width: "3px",
                height: "8px",
                backgroundColor: "var(--color-gold)",
                borderRadius: "2px",
                animation: "pulse 0.4s ease infinite alternate",
              }}
            />
            <span
              style={{
                width: "3px",
                height: "14px",
                backgroundColor: "var(--color-gold)",
                borderRadius: "2px",
                animation: "pulse 0.7s ease infinite alternate",
              }}
            />
          </span>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </span>
      <span>{isPlaying ? playingLabel : displayLabel}</span>
    </button>
  );
}
