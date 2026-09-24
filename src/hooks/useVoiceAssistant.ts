"use client";

import { useState, useEffect, useCallback } from "react";

export function useVoiceAssistant() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSupported(true);
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, []);

  const speak = useCallback(
    (text: string, lang: "en-IN" | "hi-IN" = "en-IN") => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        return;
      }

      // If already playing, toggle off
      if (isPlaying) {
        stop();
        return;
      }

      window.speechSynthesis.cancel(); // Stop any pending speech

      const cleanText = text.replace(/[*_#`[\]()]/g, "").trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = lang;
      utterance.rate = 0.95; // Slightly slower for clear Indian comprehension
      utterance.pitch = 1.0;

      // Try to find an Indian English or Hindi voice if available
      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find(
        (v) =>
          v.lang === lang ||
          v.lang.startsWith("en-IN") ||
          v.name.toLowerCase().includes("india") ||
          v.name.toLowerCase().includes("hindi")
      );
      if (indianVoice) {
        utterance.voice = indianVoice;
      }

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    },
    [isPlaying, stop]
  );

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return { speak, stop, isPlaying, supported };
}
