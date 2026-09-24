"use client";

import React from "react";
import { useVoiceAssistant } from "@/hooks/useVoiceAssistant";

interface AudioAssistantButtonProps {
  textToSpeak: string;
  hindiText?: string;
  label?: string;
  style?: React.CSSProperties;
}

export default function AudioAssistantButton({
  textToSpeak,
  hindiText,
  label = "Listen / सुनें",
  style,
}: AudioAssistantButtonProps) {
  const { speak, stop, isPlaying, supported } = useVoiceAssistant();

  if (!supported) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      stop();
    } else {
      // Speak the prompt
      speak(textToSpeak, "en-IN");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={isPlaying ? "Stop audio" : "Listen to question in simple language"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45rem",
        padding: "0.35rem 0.75rem",
        borderRadius: "9999px",
        backgroundColor: isPlaying ? "rgba(212, 175, 55, 0.2)" : "rgba(27, 42, 74, 0.06)",
        border: isPlaying ? "1px solid var(--color-gold)" : "1px solid rgba(27, 42, 74, 0.12)",
        color: isPlaying ? "#B8860B" : "#334155",
        fontSize: "0.78rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s ease",
        userSelect: "none",
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
      <span>{isPlaying ? "Playing... / रोकें" : label}</span>
    </button>
  );
}
