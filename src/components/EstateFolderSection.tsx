"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Sparkles, FolderLock, FileText, CheckCircle2 } from "lucide-react";
import Folder from "./Folder";

export default function EstateFolderSection() {
  const folderDocuments = [
    // Paper 1: Last Will & Testament
    <div
      key="doc-1"
      className="p-2 h-full flex flex-col justify-between text-[7.5px] leading-tight bg-white select-none border border-black/5"
    >
      <div>
        <div className="flex items-center justify-between border-b border-black/10 pb-1 mb-1.5">
          <span className="font-bold text-[#C65378] tracking-wider uppercase text-[7px]">
            Last Will
          </span>
          <span className="text-[6px] font-mono text-gray-400">ACT 1925</span>
        </div>
        <div className="space-y-1">
          <div className="h-1 bg-[#172228]/20 rounded-full w-4/5" />
          <div className="h-1 bg-[#172228]/10 rounded-full w-full" />
          <div className="h-1 bg-[#172228]/10 rounded-full w-3/4" />
        </div>
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-black/5">
        <span className="text-[6px] text-[#5F7E75] font-semibold flex items-center gap-0.5">
          ✓ Verified
        </span>
        <div className="w-2.5 h-2.5 rounded-full bg-[#C65378] flex items-center justify-center text-white text-[5px] font-bold">
          ★
        </div>
      </div>
    </div>,

    // Paper 2: Asset Schedule & Nomination
    <div
      key="doc-2"
      className="p-2 h-full flex flex-col justify-between text-[7.5px] leading-tight bg-white select-none border border-black/5"
    >
      <div>
        <div className="flex items-center justify-between border-b border-black/10 pb-1 mb-1.5">
          <span className="font-bold text-[#172228] tracking-wider uppercase text-[7px]">
            Asset Inventory
          </span>
        </div>
        <div className="space-y-1">
          <div className="h-1 bg-[#172228]/20 rounded-full w-full" />
          <div className="h-1 bg-[#172228]/10 rounded-full w-5/6" />
          <div className="h-1 bg-[#172228]/10 rounded-full w-2/3" />
        </div>
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-black/5">
        <span className="text-[6px] text-[#55636D] font-mono">100% Encrypted</span>
        <span className="text-[6px] text-[#C65378] font-bold">256-bit</span>
      </div>
    </div>,

    // Paper 3: Attestation & Witness Protocol
    <div
      key="doc-3"
      className="p-2 h-full flex flex-col justify-between text-[7.5px] leading-tight bg-white select-none border border-black/5"
    >
      <div>
        <div className="flex items-center justify-between border-b border-black/10 pb-1 mb-1.5">
          <span className="font-bold text-[#5F7E75] tracking-wider uppercase text-[7px]">
            Witness Guide
          </span>
          <span className="text-[6px] text-[#C65378] font-bold">LEGAL</span>
        </div>
        <div className="space-y-1">
          <div className="h-1 bg-[#172228]/20 rounded-full w-3/4" />
          <div className="h-1 bg-[#172228]/10 rounded-full w-full" />
          <div className="h-1 bg-[#172228]/10 rounded-full w-4/5" />
        </div>
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-black/5">
        <span className="text-[6px] text-[#172228] font-semibold">2 Witnesses</span>
        <span className="text-[6px] text-[#5F7E75] font-mono">Ready</span>
      </div>
    </div>,
  ];

  return (
    <section className="w-full bg-[#FAF7F0] py-16 sm:py-24 lg:py-28 overflow-hidden">
      <div className="w-full max-w-[1400px] 2xl:max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="relative rounded-[32px] sm:rounded-[44px] bg-white p-8 sm:p-12 lg:p-16 border border-[#1B2A4A]/5 shadow-[0_4px_30px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Pill, Heading, Subtitle & Highlights */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#C65378]/10 px-3.5 py-1.5 text-xs font-semibold text-[#C65378] mb-4">
              <FolderLock size={14} className="text-[#C65378]" />
              <span className="tracking-[0.14em] uppercase text-[11px] font-bold">
                Digital Estate Dossier
              </span>
            </div>

            {/* Main Editorial Heading */}
            <h2 className="text-[2.2rem] sm:text-[2.85rem] lg:text-[3.35rem] font-bold text-[#172228] leading-[1.12] tracking-tight mb-4">
              All your vital documents in one secure place.
            </h2>

            {/* Subtitle */}
            <p className="text-[1rem] sm:text-[1.1rem] text-[#55636D] leading-relaxed max-w-xl mb-6">
              From your Last Will and detailed asset schedule to witness attestation guides — everything is neatly compiled into a tamper-proof digital dossier.
            </p>

            {/* Checklist Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#2D3A41]">
                <CheckCircle2 size={16} className="text-[#5F7E75] shrink-0" />
                <span>Court-tested testamentary clauses</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#2D3A41]">
                <CheckCircle2 size={16} className="text-[#5F7E75] shrink-0" />
                <span>Bank-grade 256-bit encryption</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#2D3A41]">
                <CheckCircle2 size={16} className="text-[#5F7E75] shrink-0" />
                <span>Instant PDF & print-ready formats</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#2D3A41]">
                <CheckCircle2 size={16} className="text-[#5F7E75] shrink-0" />
                <span>Complete step-by-step witness guide</span>
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/start"
                className="inline-flex items-center gap-2 rounded-full bg-[#C65378] px-7 py-3 text-[14px] font-medium text-white shadow-sm hover:bg-[#a13c5d] hover:shadow-md transition-all active:scale-95"
              >
                <span>Start Your Dossier</span>
                <ArrowUpRight size={16} strokeWidth={2.2} />
              </Link>
              <span className="text-xs text-[#7B8791] font-medium">
                Takes ~15 minutes · Plain paper valid
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Folder Experience */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center pt-8 pb-4 lg:py-10">
            <div className="relative w-full flex flex-col items-center justify-center min-h-[280px] sm:min-h-[340px]">
              
              {/* Subtle background glow */}
              <div className="absolute w-56 h-56 rounded-full bg-[#C65378]/10 blur-3xl pointer-events-none" />

              {/* Folder Component with Website Color */}
              <div className="relative z-10 flex items-center justify-center py-10">
                <Folder
                  size={2.2}
                  color="#C65378"
                  items={folderDocuments}
                  className="transition-transform duration-300"
                />
              </div>

              {/* Click / Tap Prompt Pill */}
              <div className="relative z-10 mt-6 inline-flex items-center gap-2 rounded-full bg-[#FAF7F0] border border-[#172228]/10 px-4 py-1.5 text-xs font-medium text-[#172228] shadow-sm">
                <Sparkles size={13} className="text-[#C65378]" />
                <span>Click folder to open &amp; explore papers</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
