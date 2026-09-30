"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  isHi: boolean;
  t: (en: string, hi: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  isHi: false,
  t: (en) => en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("willdrafting_lang");
      if (saved === "hi" || saved === "en") {
        setLangState(saved);
      }
    } catch {
      // ignore local storage errors
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "willdrafting_lang" && (e.newValue === "hi" || e.newValue === "en")) {
        setLangState(e.newValue);
      }
    };

    const handleCustomChange = (e: Event) => {
      const customEvent = e as CustomEvent<Language>;
      if (customEvent.detail === "hi" || customEvent.detail === "en") {
        setLangState(customEvent.detail);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("willdrafting_lang_change", handleCustomChange);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("willdrafting_lang_change", handleCustomChange);
    };
  }, []);

  const setLang = (nextLang: Language) => {
    setLangState(nextLang);
    try {
      window.localStorage.setItem("willdrafting_lang", nextLang);
      window.dispatchEvent(new CustomEvent("willdrafting_lang_change", { detail: nextLang }));
    } catch {
      // ignore
    }
  };

  const isHi = lang === "hi";
  const t = (en: string, hi: string) => (isHi ? hi : en);

  return (
    <LanguageContext.Provider value={{ lang, setLang, isHi, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
