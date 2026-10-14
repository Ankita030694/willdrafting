"use client";

import React from "react";
import { ArrowUpRight, Check, Star, ShieldCheck, Lock, FileCheck } from "lucide-react";
import Link from "next/link";

type WillPlanTier = {
  value: string;
  step: string;
  label: string;
  shortLabel: string;
  price: string;
  tagline: string;
  badge?: string;
  description: string;
  ctaText: string;
  features: string[];
};

const tiers: WillPlanTier[] = [
  {
    value: "essential",
    step: "01",
    label: "Auto Verified (Essential Will)",
    shortLabel: "Auto Verified",
    price: "₹2,490",
    tagline: "Automated & Legally Sound",
    badge: "Recommended",
    description: "Official automated Will draft complying with Indian succession rules.",
    ctaText: "Choose Auto Verified",
    features: [
      "Official automated Will draft (PDF)",
      "Statutory Indian Succession Act compliance",
      "Full immovable & movable asset scheduling",
      "Nominee & beneficiary allocations",
      "Executor & guardian appointments",
      "Dual-witness attestation signing guide",
    ],
  },
  {
    value: "lawyer_verified",
    step: "02",
    label: "Manually Verified (Lawyer Verified)",
    shortLabel: "Lawyer Verified",
    price: "₹4,990",
    tagline: "High Court Advocate Vetted & Certified",
    description: "Line-by-line review and digital certification by a qualified Bar Council advocate.",
    ctaText: "Choose Lawyer Verified",
    features: [
      "Everything in Auto Verified",
      "Line-by-line review by High Court advocate",
    ],
  },
  {
    value: "premium",
    step: "03",
    label: "Connect to Lawyer (Lawyer Verified or for further queries)",
    shortLabel: "Connect to Lawyer",
    price: "₹9,990",
    tagline: "Advocate Phone Call & Complete Legal Advisory",
    description: "Advocate will connect on call for Will verification and resolution of all legal queries.",
    ctaText: "Connect to Lawyer",
    features: [
      "Everything in Lawyer Verified",
      "Advocate connects on call",
      "Comprehensive resolution for further queries",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="plans" aria-label="Will Plans" className="w-full bg-[#FAF7F0] py-16 sm:py-24 lg:py-28 flex justify-center">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col items-center">
        
        {/* =========================================================================
            HEADER: Eyebrow, Editorial Title, Subtitle
            ========================================================================= */}
        <div className="flex flex-col items-center text-center max-w-3xl mb-12 sm:mb-16">
          {/* Eyebrow badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[0.75rem] font-bold tracking-[0.16em] uppercase text-[#C65378] bg-[#C65378]/10 px-3.5 py-1 rounded-full">
              Transparent Legal Plans
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-[2.2rem] sm:text-[3rem] lg:text-[3.4rem] font-medium text-[#172228] leading-[1.08] tracking-tight mb-4">
            Choose The Right Plan For Your Family & Estate.
          </h2>

          <p className="text-[1rem] sm:text-[1.1rem] text-[#55636D] leading-relaxed max-w-2xl">
            Pick a tier tailored to your unique requirements. Upgrade seamlessly anytime your family or assets evolve.
          </p>
        </div>

        {/* =========================================================================
            3 PLAN CARDS DISPLAYED AT ONCE (No Tab Switching)
            ========================================================================= */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 items-stretch max-w-7xl">
          {tiers.map((tier) => {
            const isRecommended = Boolean(tier.badge);

            return (
              <div
                key={tier.value}
                className={`relative rounded-[30px] sm:rounded-[34px] p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 ${
                  isRecommended
                    ? "bg-white border-2 border-[#C65378] shadow-[0_12px_36px_rgba(198,83,120,0.14)] hover:shadow-[0_18px_48px_rgba(198,83,120,0.22)] hover:-translate-y-1.5"
                    : "bg-white border border-[#172228]/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:border-[#172228]/25 hover:shadow-[0_12px_32px_rgba(23,34,40,0.08)] hover:-translate-y-1"
                }`}
              >
                {/* Recommended Badge on Top Center */}
                {isRecommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C65378] text-white text-[11px] font-bold tracking-wider uppercase px-4 py-1 rounded-full shadow-sm flex items-center gap-1.5 z-10 whitespace-nowrap">
                    <Star size={12} className="fill-white" />
                    <span>{tier.badge}</span>
                  </div>
                )}

                {/* Top Section: Header, Price & Description */}
                <div>
                  {/* Step Pill */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#C65378] bg-[#C65378]/10 px-3 py-0.5 rounded-full">
                      Option {tier.step}
                    </span>
                    {isRecommended && (
                      <span className="text-[11px] font-bold text-[#C65378] tracking-wide">
                        Most Popular
                      </span>
                    )}
                  </div>

                  {/* Plan Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#172228] leading-tight min-h-[3rem] flex items-center">
                    {tier.label}
                  </h3>

                  {/* Price Block */}
                  <div className="flex items-baseline gap-2 mt-3 mb-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#172228] tracking-tight">
                      {tier.price}
                    </span>
                    <span className="text-xs font-semibold text-[#55636D]">/- flat fee</span>
                  </div>

                  {/* Tagline */}
                  <p className="text-[0.92rem] font-medium italic text-[#C65378] mb-2 min-h-[1.4rem]">
                    {tier.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-[0.88rem] leading-relaxed text-[#55636D] min-h-[2.75rem]">
                    {tier.description}
                  </p>

                  {/* Hairline Divider */}
                  <div className="w-full h-px bg-[#172228]/8 my-6" />
                </div>

                {/* Features List (Expands to fill vertical height evenly) */}
                <div className="flex-1 flex flex-col mb-8">
                  <p className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-[#172228] mb-3.5">
                    Features Included:
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-[#10B981]/15 text-[#059669]">
                          <Check size={11} strokeWidth={2.5} />
                        </div>
                        <span className="text-[0.85rem] sm:text-[0.88rem] text-[#49585F] leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-2 mt-auto">
                  <Link
                    href="/start/01"
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[0.92rem] font-semibold shadow-sm transition-all duration-200 active:scale-95 ${
                      isRecommended
                        ? "bg-[#C65378] text-white hover:bg-[#A83D5F] shadow-[0_4px_14px_rgba(198,83,120,0.3)]"
                        : "bg-[#172228] text-white hover:bg-[#253640]"
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowUpRight size={17} strokeWidth={2.2} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            TRUST STRIP & BOTTOM HELPER CONTACT
            ========================================================================= */}
        <div className="mt-14 sm:mt-16 flex flex-col items-center gap-6 max-w-3xl text-center">
          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-[0.82rem] font-medium text-[#49585F]">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#5F7E75]" />
              <span>Indian Succession Act, 1925 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock size={15} className="text-[#5F7E75]" />
              <span>Bank-Grade AES-256 Vault Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <FileCheck size={16} className="text-[#5F7E75]" />
              <span>Court-Admissible Dual-Witness Draft</span>
            </div>
          </div>

          {/* Contact helper */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 text-[0.90rem] text-[#55636D]">
            <span>Not sure which plan is right for your estate?</span>
            <a
              href="mailto:hello@willdrafting.com"
              className="inline-flex items-center gap-1 font-semibold text-[#C65378] hover:text-[#9F3B5C] transition-colors"
            >
              <span>Talk to our legal team</span>
              <ArrowUpRight size={15} strokeWidth={2.2} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
