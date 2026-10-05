"use client";

import React from "react";
import Link from "next/link";
import { X, Check, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

interface ComparisonRow {
  topic: string;
  withoutWill: string;
  withWill: string;
}

const comparisonRows: ComparisonRow[] = [
  {
    topic: "Asset Distribution",
    withoutWill:
      "Assets are distributed according to the law, which may not match your wishes.",
    withWill:
      "You decide how your assets should be distributed among your chosen beneficiaries.",
  },
  {
    topic: "Bank Accounts & Investments",
    withoutWill:
      "Family may face legal procedures and paperwork to access or transfer assets.",
    withWill:
      "Your Will names beneficiaries and an executor to help manage your estate.",
  },
  {
    topic: "Guardianship for Minor Children",
    withoutWill:
      "Guardianship decisions may be handled according to applicable law and by the relevant authority.",
    withWill:
      "You can state your wishes for who should care for your minor children.",
  },
  {
    topic: "Family Disputes & Estate Administration",
    withoutWill:
      "Uncertainty can lead to disagreements, delays and additional legal work.",
    withWill:
      "Clear instructions can reduce confusion, disputes and unnecessary legal work.",
  },
];

export default function EstateComparison() {
  return (
    <section className="w-full bg-[#FAF7F0] py-16 sm:py-24 lg:py-28 flex justify-center">
      <div className="w-full max-w-[1400px] 2xl:max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* =========================================================================
            HEADER: Eyebrow Pill, Headline, and Subheading
            ========================================================================= */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Eyebrow badge */}
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            
            <span className="text-[0.75rem] font-bold tracking-[0.16em] uppercase text-[#C65378]">
              Intestacy vs. Estate Planning
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-[2.2rem] sm:text-[3rem] lg:text-[3.4rem] font-medium text-[#172228] leading-[1.08] tracking-tight mb-4 sm:mb-5">
            What Happens to Your Family If You Die Without a Will?
          </h2>
          <p className= "text-[1rem] sm:text-[1.1rem] text-[#55636D] leading-relaxed max-w-2xl">You may spend a lifetime building your home, savings and family security. But without a Will, you may leave the decisions about your estate to the law, not to the people you chose.</p>

          
        </div>

        {/* =========================================================================
            COMPARISON TABLE CARD: Max-W-8xl Editorial Design
            ========================================================================= */}
        <div className="w-full md:rounded-[36px] md:bg-[#EBE7DF] md:p-2 md:shadow-[0_4px_24px_rgba(0,0,0,0.03)] md:border md:border-[#1B2A4A]/5">
          <div className="md:bg-white md:rounded-[30px] md:overflow-hidden md:border md:border-[#1B2A4A]/5">
            
            {/* Desktop Table Header */}
            <div className="hidden md:grid md:grid-cols-12 gap-8 px-8 lg:px-10 py-5 bg-[#FAF7F0]/70 border-b border-[#1B2A4A]/5 text-xs font-bold uppercase tracking-[0.12em]">
              <div className="col-span-4 text-[#55636D]">
                Estate Scenario
              </div>
              <div className="col-span-4 text-[#B91C1C] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#B91C1C] inline-block" />
                <span>Dying Without a Will</span>
              </div>
              <div className="col-span-4 text-[#047857] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#047857] inline-block" />
                <span>With WillDrafting</span>
              </div>
            </div>

            {/* Comparison Rows */}
            <div 
              className="flex md:block gap-4 md:gap-0 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none md:divide-y md:divide-[#1B2A4A]/5 scrollbar-none w-full pb-4 md:pb-0"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {comparisonRows.map((row, idx) => (
                <div
                  key={idx}
                  className="w-[85vw] max-w-5xl shrink-0 md:w-auto md:max-w-none md:shrink snap-center md:snap-align-none grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 px-6 sm:px-8 lg:px-10 py-6 sm:py-7 transition-colors md:hover:bg-[#FAF7F0]/40 bg-white rounded-[24px] border border-[#1B2A4A]/10 shadow-sm md:bg-transparent md:border-0 md:rounded-none md:shadow-none"
                >
                  {/* Topic Title */}
                  <div className="md:col-span-4 flex items-center">
                    <h3 className="text-[1.12rem] sm:text-[1.22rem] font-semibold text-[#172228] leading-snug tracking-tight">
                      {row.topic}
                    </h3>
                  </div>

                  {/* Without Will */}
                  <div className="md:col-span-4">
                    {/* Mobile Label */}
                    <span className="md:hidden inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#B91C1C] mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B91C1C]" />
                      <span>Dying Without a Will</span>
                    </span>
                    <div className="flex items-start gap-3 p-3.5 md:p-0 rounded-xl bg-red-50/40 md:bg-transparent">
                      <div className="w-5 h-5 rounded-full bg-red-100/80 text-red-700 flex items-center justify-center shrink-0 mt-0.5">
                        <X size={12} strokeWidth={2.5} />
                      </div>
                      <p className="text-[0.88rem] sm:text-[0.92rem] text-[#55636D] leading-relaxed">
                        {row.withoutWill}
                      </p>
                    </div>
                  </div>

                  {/* With WillDrafting */}
                  <div className="md:col-span-4">
                    {/* Mobile Label */}
                    <span className="md:hidden inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#047857] mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#047857]" />
                      <span>With WillDrafting</span>
                    </span>
                    <div className="flex items-start gap-3 p-3.5 md:p-0 rounded-xl bg-emerald-50/40 md:bg-transparent">
                      <div className="w-5 h-5 rounded-full bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} strokeWidth={2.5} />
                      </div>
                      <p className="text-[0.88rem] sm:text-[0.92rem] text-[#172228] font-medium leading-relaxed">
                        {row.withWill}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Swipe Indicator */}
            <div className="flex md:hidden items-center justify-center gap-2 pt-2 pb-6 text-[#55636D] text-xs font-semibold uppercase tracking-wider">
              <ChevronLeft size={16} className="opacity-60" />
              <span>Drag to See more</span>
              <ChevronRight size={16} className="opacity-60" />
            </div>

          </div>
        </div>

        {/* =========================================================================
            BOTTOM CTA BUTTON
            ========================================================================= */}
        <div className="mt-10 sm:mt-12 text-center flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C65378] px-7 py-3.5 text-[0.95rem] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#9F3B5C] active:scale-95"
          >
            <span>Protect Your Family Today</span>
            <ArrowUpRight size={18} strokeWidth={2.2} />
          </Link>
        </div>

      </div>
    </section>
  );
}
