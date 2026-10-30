"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface InfoTooltipProps {
  text: string;
  hindiText?: string;
  lang?: "en" | "hi";
  className?: string;
}

export default function InfoTooltip({
  text,
  hindiText,
  lang: propLang,
  className = "",
}: InfoTooltipProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState<{
    top: number;
    left: number;
    arrowLeft: number;
    placeBelow: boolean;
  }>({ top: 0, left: 0, arrowLeft: 140, placeBelow: false });

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const languageCtx = useLanguage();
  const activeLang = propLang || languageCtx?.lang || "en";
  const displayContent = activeLang === "hi" && hindiText ? hindiText : text;

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || typeof window === "undefined") return;
    const rect = triggerRef.current.getBoundingClientRect();
    const tooltipWidth = Math.min(296, window.innerWidth - 24);
    const halfWidth = tooltipWidth / 2;
    const centerX = rect.left + rect.width / 2;

    const minLeft = 12;
    const maxLeft = Math.max(12, window.innerWidth - tooltipWidth - 12);
    const clampedLeft = Math.min(Math.max(centerX - halfWidth, minLeft), maxLeft);
    const arrowLeft = Math.min(
      Math.max(centerX - clampedLeft, 16),
      tooltipWidth - 16
    );

    const placeBelow = rect.top < 150;
    const top = placeBelow ? rect.bottom + 8 : rect.top - 8;

    setCoords({
      top,
      left: clampedLeft,
      arrowLeft,
      placeBelow,
    });
  }, []);

  const handleOpen = useCallback(() => {
    updatePosition();
    setOpen(true);
  }, [updatePosition]);

  const handleToggle = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (open) {
      setOpen(false);
    } else {
      handleOpen();
    }
  };

  useEffect(() => {
    if (!open) return;

    const handleOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        tooltipRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const handleScrollOrResize = () => {
      updatePosition();
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [open, updatePosition]);

  return (
    <span
      className={`inline-flex items-center align-middle ml-1.5 shrink-0 ${className}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label="What to fill in this field"
        aria-expanded={open}
        onMouseEnter={handleOpen}
        onMouseLeave={() => setOpen(false)}
        onFocus={handleOpen}
        onBlur={() => setOpen(false)}
        onClick={handleToggle}
        className={`inline-flex items-center justify-center w-4 h-4 rounded-full transition-colors cursor-help focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 ${
          open
            ? "bg-[#D4AF37] text-white shadow-sm"
            : "bg-[#D4AF37]/15 text-[#9A7B2C] hover:bg-[#D4AF37] hover:text-white"
        }`}
      >
        <Info className="w-3 h-3 stroke-[2.4]" />
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            ref={tooltipRef}
            role="tooltip"
            style={{
              position: "fixed",
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              width: "min(296px, calc(100vw - 24px))",
              transform: coords.placeBelow ? "translateY(0)" : "translateY(-100%)",
              zIndex: 99999,
            }}
            className="pointer-events-none select-none animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="relative rounded-xl bg-[#1C1917] text-[#FAF9F6] px-3.5 py-2.5 text-[12px] font-normal normal-case tracking-normal leading-relaxed shadow-xl border border-[#D4AF37]/30">
              <div className="flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{displayContent}</span>
              </div>
              <span
                style={{ left: `${coords.arrowLeft}px` }}
                className={`absolute -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-[#1C1917] border-[#D4AF37]/30 ${
                  coords.placeBelow
                    ? "-top-[5px] border-t border-l"
                    : "-bottom-[5px] border-b border-r"
                }`}
              />
            </div>
          </div>,
          document.body
        )}
    </span>
  );
}
