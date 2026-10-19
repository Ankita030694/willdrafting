"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Check,
  ArrowUpRight,
  Scale,
  Landmark,
  ShieldAlert,
  HeartHandshake,
  FileCheck2,
  Home,
  Lock,
  Users,
} from "lucide-react";

interface ComparisonScenario {
  step: string;
  topic: string;
  categoryTag: string;
  illustration: string;
  illustrationAlt: string;
  withoutWillBadge: string;
  withoutWill: string;
  withWillBadge: string;
  withWill: string;
  withoutIcon: React.ReactNode;
  withIcon: React.ReactNode;
}

const scenarios: ComparisonScenario[] = [
  {
    step: "01",
    topic: "Asset Distribution",
    categoryTag: "Home, Property & Savings",
    illustration: "/1.jpg",
    illustrationAlt: "Passing sealed Will document to chosen beneficiary",
    withoutWillBadge: "Decided by Intestacy Law",
    withoutWill:
      "Assets are distributed according to the law, which may not match your wishes.",
    withWillBadge: "100% Your Chosen Beneficiaries",
    withWill:
      "You decide how your assets should be distributed among your chosen beneficiaries.",
    withoutIcon: <Scale size={14} strokeWidth={2} />,
    withIcon: <Home size={14} strokeWidth={2} />,
  },
  {
    step: "02",
    topic: "Bank Accounts & Investments",
    categoryTag: "Bank A/c, FDs, Mutual Funds & Demat",
    illustration: "/cta/2.png",
    illustrationAlt: "Protected financial and estate folder",
    withoutWillBadge: "Paperwork & Procedural Delays",
    withoutWill:
      "Family may face legal procedures and paperwork to access or transfer assets.",
    withWillBadge: "Named Executor & Smooth Access",
    withWill:
      "Your Will names beneficiaries and an executor to help manage your estate.",
    withoutIcon: <Lock size={14} strokeWidth={2} />,
    withIcon: <Landmark size={14} strokeWidth={2} />,
  },
  {
    step: "03",
    topic: "Guardianship for Minor Children",
    categoryTag: "Child Custody & Future Care",
    illustration: "/4.jpg",
    illustrationAlt: "Indian parents protecting their child with a legal Will",
    withoutWillBadge: "Handled by Legal Authority",
    withoutWill:
      "Guardianship decisions may be handled according to applicable law and by the relevant authority.",
    withWillBadge: "Parents' Chosen Guardian",
    withWill:
      "You can state your wishes for who should care for your minor children.",
    withoutIcon: <ShieldAlert size={14} strokeWidth={2} />,
    withIcon: <Users size={14} strokeWidth={2} />,
  },
  {
    step: "04",
    topic: "Family Disputes & Estate Administration",
    categoryTag: "Family Harmony & Legal Clarity",
    illustration: "/3.jpg",
    illustrationAlt: "Indian family sitting together in peace and harmony",
    withoutWillBadge: "Uncertainty & Disagreements",
    withoutWill:
      "Uncertainty can lead to disagreements, delays and additional legal work.",
    withWillBadge: "Clear Written Instructions",
    withWill:
      "Clear instructions can reduce confusion, disputes and unnecessary legal work.",
    withoutIcon: <Scale size={14} strokeWidth={2} />,
    withIcon: <HeartHandshake size={14} strokeWidth={2} />,
  },
];

export default function EstateComparison() {
  return (
    <section className="w-full bg-[#FAF7F0] py-5 sm:py-7 lg:py-9 flex justify-center">
      <div className="w-full max-w-[1400px] 2xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            OUTER EDITORIAL INFOGRAPHIC CONTAINER
            ========================================================================= */}
        <div className="relative w-full rounded-[32px] sm:rounded-[44px] bg-white border border-[#172228]/8 shadow-[0_4px_30px_rgba(23,34,40,0.03)] overflow-hidden p-5 sm:p-8 lg:p-10">
          {/* Decorative soft background accents */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#C65378]/[0.05] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#5F7E75]/[0.06] blur-3xl"
          />

          {/* =========================================================================
              INFOGRAPHIC HEADER: Eyebrow, Headline & Subtitle
              ========================================================================= */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FAF7F0] border border-[#C65378]/20 px-3.5 py-1 mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C65378]" />
              <span className="text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[#C65378]">
                Intestacy vs. Estate Planning
              </span>
            </div>

            <h2 className="text-[1.55rem] sm:text-[2.15rem] lg:text-[2.45rem] font-medium text-[#172228] leading-[1.12] tracking-tight mb-2.5">
              What Happens to Your Family If You Die Without a Will?
            </h2>

            <p className="text-[0.82rem] sm:text-[0.90rem] text-[#55636D] leading-relaxed max-w-2xl">
              You may spend a lifetime building your home, savings and family
              security. But without a Will, you may leave the decisions about
              your estate to the law, not to the people you chose.
            </p>
          </div>

          {/* =========================================================================
              DESKTOP INFOGRAPHIC COLUMN HEADERS (Visual Path Comparison)
              ========================================================================= */}
          <div className="relative z-10 hidden lg:grid lg:grid-cols-12 gap-5 mb-4 px-1">
            {/* Col 1-4: Scenario Pillar Header */}
            <div className="col-span-4 rounded-2xl bg-[#FAF7F0] border border-[#172228]/8 px-5 py-3.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#55636D] block mb-0.5">
                  4 Key Life Areas
                </span>
                <span className="text-[0.95rem] font-semibold text-[#172228]">
                  Estate Scenario
                </span>
              </div>
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src="/cta/4.png"
                  alt="Estate scenario inspection"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Col 5-8: Path A (Dying Without a Will) */}
            <div className="col-span-4 rounded-2xl bg-[#FDF6F6] border border-[#B91C1C]/15 px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FEE2E2] text-[#B91C1C] flex items-center justify-center shrink-0">
                  <X size={16} strokeWidth={2.5} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#B91C1C] block mb-0.5">
                    Path A · Unplanned Intestacy
                  </span>
                  <span className="text-[0.95rem] font-semibold text-[#172228]">
                    Dying Without a Will
                  </span>
                </div>
              </div>
              <span className="text-[10.5px] font-semibold px-2.5 py-1 rounded-full bg-white/90 text-[#B91C1C] border border-[#B91C1C]/15">
                Law Decides
              </span>
            </div>

            {/* Col 9-12: Path B (With WillDrafting) */}
            <div className="col-span-4 rounded-2xl bg-[#F3FAF7] border border-[#5F7E75]/25 px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#5F7E75] text-white flex items-center justify-center shrink-0">
                  <Check size={16} strokeWidth={2.5} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#5F7E75] block mb-0.5">
                    Path B · Planned Protection
                  </span>
                  <span className="text-[0.95rem] font-semibold text-[#172228]">
                    With WillDrafting
                  </span>
                </div>
              </div>
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src="/cta/1.png"
                  alt="Sealed legal Will"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* =========================================================================
              INFOGRAPHIC ROWS: 4 Visual Scenario Nodes
              ========================================================================= */}
          <div className="relative z-10 space-y-3.5 sm:space-y-4">
            {scenarios.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-[24px] bg-[#FAF7F0]/75 hover:bg-[#FAF7F0] border border-[#172228]/8 p-3.5 sm:p-5 transition-all duration-200"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 lg:gap-5 items-stretch">
                  {/* 1. LEFT: Illustrated Scenario Identity Card */}
                  <div className="lg:col-span-4 flex items-center gap-3.5 sm:gap-4 bg-white rounded-2xl p-3 sm:p-3.5 border border-[#172228]/6 shadow-2xs">
                    {/* Hand-drawn Brand Illustration Thumbnail */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#FAF7F0] border border-[#172228]/8 overflow-hidden shrink-0">
                      <Image
                        src={item.illustration}
                        alt={item.illustrationAlt}
                        fill
                        sizes="80px"
                        className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute top-1 left-1 rounded-md bg-[#172228]/85 px-1.5 py-0.5 text-[9px] font-bold text-white leading-none">
                        {item.step}
                      </span>
                    </div>

                    {/* Topic & Subtitle Tag */}
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#C65378] block mb-0.5">
                        {item.categoryTag}
                      </span>
                      <h3 className="text-[0.95rem] sm:text-[1.05rem] font-semibold text-[#172228] leading-snug tracking-tight">
                        {item.topic}
                      </h3>
                    </div>
                  </div>

                  {/* 2. MIDDLE: Dying Without a Will (Path A) */}
                  <div className="lg:col-span-4 flex flex-col justify-between rounded-2xl bg-white border border-[#B91C1C]/12 p-3.5 sm:p-4 relative overflow-hidden">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider text-[#B91C1C]">
                        <span className="w-4 h-4 rounded-full bg-[#FEE2E2] text-[#B91C1C] flex items-center justify-center shrink-0">
                          <X size={10} strokeWidth={2.8} />
                        </span>
                        <span className="lg:hidden">Dying Without a Will</span>
                        <span className="hidden lg:inline">
                          {item.withoutWillBadge}
                        </span>
                      </span>
                      <span className="text-[#B91C1C]/60 shrink-0">
                        {item.withoutIcon}
                      </span>
                    </div>

                    <p className="text-[0.78rem] sm:text-[0.83rem] text-[#55636D] leading-relaxed">
                      {item.withoutWill}
                    </p>
                  </div>

                  {/* 3. RIGHT: With WillDrafting (Path B) */}
                  <div className="lg:col-span-4 flex flex-col justify-between rounded-2xl bg-white border border-[#5F7E75]/25 p-3.5 sm:p-4 relative overflow-hidden shadow-2xs">
                    {/* Subtle left accent bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#5F7E75]" />

                    <div className="flex items-center justify-between gap-2 mb-2 pl-1">
                      <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider text-[#047857]">
                        <span className="w-4 h-4 rounded-full bg-[#D1FAE5] text-[#047857] flex items-center justify-center shrink-0">
                          <Check size={10} strokeWidth={2.8} />
                        </span>
                        <span className="lg:hidden">With WillDrafting</span>
                        <span className="hidden lg:inline">
                          {item.withWillBadge}
                        </span>
                      </span>
                      <span className="text-[#5F7E75] shrink-0">
                        {item.withIcon}
                      </span>
                    </div>

                    <p className="text-[0.78rem] sm:text-[0.83rem] text-[#172228] font-medium leading-relaxed pl-1">
                      {item.withWill}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* =========================================================================
              BOTTOM INFOGRAPHIC TAKEAWAY BANNER & CTA
              ========================================================================= */}
          <div className="relative z-10 mt-6 sm:mt-7 pt-5 sm:pt-6 border-t border-[#172228]/8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="hidden sm:flex relative w-12 h-12 rounded-2xl bg-[#FAF7F0] border border-[#172228]/8 items-center justify-center shrink-0 overflow-hidden">
                <Image
                  src="/cta/5.png"
                  alt="Protected Indian family under legal Will"
                  fill
                  sizes="48px"
                  className="object-contain p-1"
                />
              </div>
              <div>
                <p className="text-[0.85rem] sm:text-[0.92rem] font-semibold text-[#172228]">
                  Don&apos;t leave your family&apos;s future to default succession laws.
                </p>
                <p className="text-[0.75rem] sm:text-[0.80rem] text-[#55636D]">
                  Put your wishes in writing in simple English or Hindi with lawyer-verified clarity.
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] px-6 py-2.5 text-[0.84rem] sm:text-[0.88rem] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#9F3B5C] active:scale-95"
            >
              <span>Protect Your Family Today</span>
              <ArrowUpRight size={16} strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
