"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Check, ArrowUpRight, Home, Landmark, Users, HeartHandshake } from "lucide-react";

const items = [
  {
    icon: <Home className="w-4 h-4 text-[#C65378]" />,
    topic: "Property & Land",
    without: "Divided by state law; family disputes likely",
    with: "100% your choice; zero dispute",
  },
  {
    icon: <Landmark className="w-4 h-4 text-[#C65378]" />,
    topic: "Banks & Savings",
    without: "Months of court runs & blocked accounts",
    with: "Quick, hassle-free access for family",
  },
  {
    icon: <Users className="w-4 h-4 text-[#C65378]" />,
    topic: "Minor Children",
    without: "Court decides who raises them",
    with: "You choose their trusted guardian",
  },
  {
    icon: <HeartHandshake className="w-4 h-4 text-[#C65378]" />,
    topic: "Family Peace",
    without: "Confusion, fights & legal battles",
    with: "Clear written wishes; peace of mind",
  },
];

export default function EstateComparison() {
  return (
    <section
      id="comparison"
      aria-label="Without a Will vs With a Will Comparison"
      className="w-full bg-[#FAF7F0] py-4 sm:py-6 lg:py-8 flex justify-center"
    >
      <div className="w-full max-w-[1280px] mx-auto px-3 sm:px-6">
        <div className="relative w-full rounded-2xl sm:rounded-3xl bg-white border border-[#172228]/8 p-4 sm:p-6 lg:p-7 shadow-xs">
          
          {/* Header - Compact */}
          <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-6">
            <span className="inline-block text-[10.5px] sm:text-[11px] font-bold tracking-wider uppercase text-[#C65378] bg-[#C65378]/10 px-3 py-0.5 rounded-full mb-1.5">
              Without a Will vs. With a Will
            </span>
            <h3 className="text-[1.25rem] sm:text-[1.65rem] lg:text-[1.85rem] font-bold text-[#172228] leading-tight">
              What Happens If You Die Without a Will?
            </h3>
            <p className="text-[0.80rem] sm:text-[0.86rem] text-[#55636D] mt-1">
              Without a Will, government rules decide your family&apos;s inheritance. With a Will, you stay in full control.
            </p>
          </div>

          {/* Desktop Table (sm and above) */}
          <div className="hidden sm:block rounded-xl border border-[#172228]/10 overflow-hidden bg-white">
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-[#FAF7F0] border-b border-[#172228]/10 text-xs font-bold uppercase tracking-wider text-[#172228] py-2.5 px-4">
              <div className="col-span-3 text-[#55636D] flex items-center">Area</div>
              <div className="col-span-4 text-[#DC2626] flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#FEE2E2] flex items-center justify-center shrink-0">
                  <X size={10} strokeWidth={3} />
                </span>
                <span>Without a Will</span>
              </div>
              <div className="col-span-5 text-[#16A34A] flex items-center gap-1.5 pl-2">
                <span className="w-4 h-4 rounded-full bg-[#DCFCE7] flex items-center justify-center shrink-0">
                  <Check size={10} strokeWidth={3} />
                </span>
                <span>With a Will</span>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-[#172228]/6">
              {items.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 items-center px-4 py-3 text-[13px] hover:bg-[#FAF7F0]/40 transition-colors"
                >
                  {/* Topic */}
                  <div className="col-span-3 flex items-center gap-2 font-semibold text-[#172228] pr-2">
                    <span className="shrink-0">{row.icon}</span>
                    <span className="truncate">{row.topic}</span>
                  </div>

                  {/* Without Will */}
                  <div className="col-span-4 text-[#DC2626] text-[12.5px] leading-snug pr-2">
                    {row.without}
                  </div>

                  {/* With Will */}
                  <div className="col-span-5 text-[#166534] font-medium text-[12.5px] leading-snug pl-2">
                    {row.with}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile View (under sm) - Clean, spacious cards without clustering */}
          <div className="sm:hidden space-y-2.5">
            {items.map((row, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#172228]/10 bg-[#FAF7F0]/50 p-3 shadow-2xs"
              >
                {/* Topic Header */}
                <div className="flex items-center gap-2 font-bold text-[13px] text-[#172228] mb-2 pb-1.5 border-b border-[#172228]/8">
                  <span className="shrink-0">{row.icon}</span>
                  <span>{row.topic}</span>
                </div>

                {/* 2 Roomy Comparison Panels */}
                <div className="grid grid-cols-2 gap-2 text-[11.5px] leading-snug">
                  {/* Without Will */}
                  <div className="bg-[#FEF2F2] border border-[#DC2626]/15 rounded-lg p-2 flex flex-col justify-between">
                    <div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#DC2626] mb-1">
                        <X size={10} strokeWidth={3} />
                        Without Will
                      </span>
                      <p className="text-[#991B1B] text-[11px] leading-snug">
                        {row.without}
                      </p>
                    </div>
                  </div>

                  {/* With Will */}
                  <div className="bg-[#F0FDF4] border border-[#16A34A]/20 rounded-lg p-2 flex flex-col justify-between">
                    <div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#16A34A] mb-1">
                        <Check size={10} strokeWidth={3} />
                        With Will
                      </span>
                      <p className="text-[#166534] font-medium text-[11px] leading-snug">
                        {row.with}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA Bar - Ultra Compact */}
          <div className="mt-3.5 sm:mt-4 pt-3 border-t border-[#172228]/8 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
            <p className="text-[12px] sm:text-[13px] text-[#55636D]">
              <strong className="text-[#172228]">Don&apos;t leave your family&apos;s future to chance.</strong> Draft your lawyer-verified Will online in 15 mins.
            </p>
            <Link
              href="/contact"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#C65378] px-4 sm:px-5 py-2 text-[12px] sm:text-[13px] font-semibold text-white shadow-xs hover:bg-[#a13c5d] transition-all"
            >
              <span>Protect Your Family</span>
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
