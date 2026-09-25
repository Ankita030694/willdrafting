"use client";

import React from "react";
import Link from "next/link";
import { X, Check, ArrowUpRight } from "lucide-react";

interface ComparisonRow {
  topic: string;
  withoutWill: string;
  withWill: string;
}

const comparisonRows: ComparisonRow[] = [
  {
    topic: "Asset Distribution",
    withoutWill:
      "Divided strictly per statutory formulas under Hindu Succession Act / Indian Succession Act, regardless of your personal wishes.",
    withWill:
      "Distributed exactly according to your specified percentages to named beneficiaries, spouses, and children.",
  },
  {
    topic: "Access to Bank Accounts & Shares",
    withoutWill:
      "Financial institutions freeze funds until heirs obtain an expensive Succession Certificate or Letter of Administration from court.",
    withWill:
      "Your appointed Executor claims assets directly with the certified copy of your legally attested will.",
  },
  {
    topic: "Guardianship for Minor Children",
    withoutWill:
      "A family court judge decides who raises your minor children after evaluating competing claims from relatives.",
    withWill:
      "You designate the exact trusted legal guardians you want caring for your children.",
  },
  {
    topic: "Settlement Timeline & Legal Costs",
    withoutWill:
      "Typically takes 12 to 24 months in court proceedings, costing tens of thousands in legal representation.",
    withWill:
      "Drafted in 15 minutes, immediately legally binding upon signing before two independent witnesses.",
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
              Intestacy vs Planning
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-[2.35rem] sm:text-[3.2rem] lg:text-[3.65rem] font-bold text-[#172228] leading-[1.08] tracking-tight mb-4 sm:mb-5">
            What happens if you don&apos;t have a will?
          </h2>

          
        </div>

        {/* =========================================================================
            COMPARISON TABLE CARD: Max-W-8xl Editorial Design
            ========================================================================= */}
        <div className="w-full rounded-[28px] sm:rounded-[36px] bg-[#EBE7DF] p-1.5 sm:p-2 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-[#1B2A4A]/5">
          <div className="bg-white rounded-[24px] sm:rounded-[30px] overflow-hidden border border-[#1B2A4A]/5">
            
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
            <div className="divide-y divide-[#1B2A4A]/5">
              {comparisonRows.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 px-6 sm:px-8 lg:px-10 py-6 sm:py-7 transition-colors hover:bg-[#FAF7F0]/40"
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

          </div>
        </div>

        {/* =========================================================================
            BOTTOM CTA BUTTON
            ========================================================================= */}
        <div className="mt-10 sm:mt-12 text-center flex justify-center">
          <Link
            href="/start"
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
