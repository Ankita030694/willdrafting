"use client";

import { useEffect } from "react";

interface HtmlLangSyncProps {
  lang: string;
}

/**
 * Synchronizes the document <html> tag's lang attribute with the active page's
 * target language. Sets the lang on mount and restores the previous lang on unmount.
 */
export default function HtmlLangSync({ lang }: HtmlLangSyncProps) {
  useEffect(() => {
    const prevLang = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = prevLang || "en";
    };
  }, [lang]);

  return null;
}
