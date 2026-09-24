"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { ArrowUpRight, Check, Star } from "lucide-react";
import Link from "next/link";

const animVariant: Variants = {
  initial: { opacity: 0, y: 14, filter: "blur(2px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 24, stiffness: 300 },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(2px)",
    transition: { duration: 0.15 },
  },
};

type WillPlanTier = {
  value: string;
  step: string;
  label: string;
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
    label: "Essential Will",
    tagline: "Simple & Clear",
    description: "For individuals who want to put their basic wishes in writing.",
    ctaText: "Get Started",
    features: [
      "Personalised Will drafting",
      "Basic asset & beneficiary details",
      "Nominee / beneficiary information",
      "Executor details",
      "Guardianship instructions, where applicable",
      "Professional review of the draft",
      "One revision",
      "Final Will document",
    ],
  },
  {
    value: "family",
    step: "02",
    label: "Family Will",
    tagline: "Complete Family Protection",
    badge: "Most Popular",
    description: "For individuals with multiple assets, beneficiaries, or family considerations.",
    ctaText: "Choose Family",
    features: [
      "Everything in Essential",
      "Detailed asset distribution",
      "Multiple beneficiaries",
      "Family-specific instructions",
      "Executor & guardian planning",
      "Multiple revisions",
      "Detailed professional review",
      "Final Will document & guidance",
    ],
  },
  {
    value: "comprehensive",
    step: "03",
    label: "Comprehensive Will",
    tagline: "Complete Estate Planning",
    description: "For complex assets, larger estates, or more detailed wishes.",
    ctaText: "Get Comprehensive",
    features: [
      "Everything in Family",
      "Complex asset distribution",
      "Multiple properties / investments",
      "Detailed inheritance instructions",
      "Business or special-asset considerations",
      "Extended consultation",
      "Priority professional review",
      "Comprehensive final documentation",
    ],
  },
];

export default function Pricing() {
  // Set Family Will (Most Popular) as default selected plan
  const [selected, setSelected] = useState<string>("family");

  const currentTier = tiers.find((t) => t.value === selected) ?? tiers[1];

  return (
    <section id="plans" aria-label="Will Plans" className="w-full bg-[#FAF7F0] py-16 sm:py-24 lg:py-28 flex justify-center">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center">
        
        {/* =========================================================================
            HEADER: Eyebrow, Editorial Title, Subtitle
            ========================================================================= */}
        <div className="flex flex-col items-center text-center max-w-3xl mb-10 sm:mb-12">
          {/* Eyebrow badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 bg-[#172228] inline-block rounded-[1px]" />
            <span className="text-[0.75rem] font-bold tracking-[0.16em] uppercase text-[#C65378]">
              Will Options
            </span>
          </div>

          {/* Main Title with Playfair Serif & Italic Accents */}
          <h2 className="text-[2.35rem] sm:text-[3.2rem] lg:text-[3.65rem] font-normal font-playfair font-serif text-[#172228] leading-[1.08] tracking-tight mb-4">
            Choose The Right Plan For <br className="hidden sm:block" />
            <span className="italic font-normal">Your Family & Estate.</span>
          </h2>

          <p className="text-[1rem] sm:text-[1.1rem] text-[#55636D] leading-relaxed max-w-2xl">
            Pick a tier tailored to your unique requirements. Upgrade seamlessly anytime your family or assets evolve.
          </p>
        </div>

        {/* =========================================================================
            TOGGLE PILL GROUP: 01 Essential / 02 Family ⭐ / 03 Comprehensive
            ========================================================================= */}
        <div className="flex justify-center mb-10 w-full overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex items-center p-1.5 rounded-full bg-[#EBE7DF] border border-[#1B2A4A]/5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)]">
            {tiers.map((tier) => {
              const isSelected = selected === tier.value;
              return (
                <button
                  key={tier.value}
                  onClick={() => setSelected(tier.value)}
                  className={`flex items-center gap-1.5 rounded-full py-2.5 px-4 sm:px-6 text-[0.85rem] sm:text-[0.92rem] font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? "bg-white text-[#172228] font-semibold shadow-sm"
                      : "text-[#55636D] hover:text-[#172228]"
                  }`}
                >
                  <span className="opacity-70 text-xs font-mono">{tier.step}</span>
                  <span>{tier.label}</span>
                  {tier.badge && (
                    <span className="inline-flex items-center text-[#C65378] ml-0.5">
                      <Star size={13} className="fill-[#C65378]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            PLAN CARD WITH ANIMATED CONTENT (motion/react)
            ========================================================================= */}
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTier.value}
              variants={animVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              className="rounded-[32px] sm:rounded-[36px] bg-[#EBE7DF] p-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.03)]"
            >
              <div className="grid grid-cols-1 items-start gap-8 rounded-[28px] sm:rounded-[32px] bg-white p-7 sm:p-10 border border-[#1B2A4A]/5 md:grid-cols-[1.3fr_auto_1.1fr]">
                
                {/* Right / Top Order on Mobile: Plan Header, Tagline, Description & CTA */}
                <div className="flex flex-col gap-6 md:order-3 justify-between h-full">
                  <div className="flex flex-col gap-3">
                    {/* Badge if available */}
                    {currentTier.badge && (
                      <span className="inline-flex items-center gap-1.5 w-fit rounded-full bg-[#C65378]/10 text-[#C65378] px-3.5 py-1 text-xs font-semibold">
                        <Star size={12} className="fill-[#C65378]" />
                        <span>{currentTier.badge}</span>
                      </span>
                    )}

                    {/* Step & Plan Label */}
                    <div>
                      <span className="text-xs font-bold tracking-[0.16em] uppercase text-[#C65378] block mb-1">
                        Option {currentTier.step}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-normal font-playfair font-serif text-[#172228] leading-tight">
                        {currentTier.label}
                      </h3>
                    </div>

                    {/* Tagline */}
                    <p className="text-[1.05rem] font-normal font-playfair font-serif italic text-[#172228]/85">
                      {currentTier.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-[0.90rem] leading-relaxed text-[#55636D] pt-1">
                      {currentTier.description}
                    </p>
                  </div>

                  {/* Primary CTA Button */}
                  <div className="pt-2">
                    <Link
                      href="/start"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C65378] px-6 py-4 text-[0.95rem] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#9F3B5C] active:scale-95"
                    >
                      <span>{currentTier.ctaText}</span>
                      <ArrowUpRight size={18} strokeWidth={2.2} />
                    </Link>
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="hidden w-px self-stretch bg-[#1B2A4A]/10 md:order-2 md:block" />

                {/* Left: Features List */}
                <div className="flex flex-col gap-4 md:order-1 pt-4 md:pt-0 border-t border-[#1B2A4A]/10 md:border-t-0">
                  <p className="text-[0.75rem] font-bold tracking-[0.14em] uppercase text-[#172228] mb-1">
                    Features Included:
                  </p>
                  <ul className="flex flex-col gap-3">
                    {currentTier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#10B981]/15 text-[#059669]">
                          <Check size={12} strokeWidth={2.5} />
                        </div>
                        <span className="text-[0.88rem] sm:text-[0.92rem] text-[#49585F] leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* =========================================================================
            BOTTOM HELPER CONTACT
            ========================================================================= */}
        <div className="flex flex-col items-center gap-1.5 text-center mt-10">
          <p className="text-[0.90rem] text-[#55636D]">
            Not sure which plan is right for your estate? We&apos;re happy to help.
          </p>
          <a
            href="mailto:hello@willdrafting.com"
            className="inline-flex items-center gap-1 text-[0.92rem] font-semibold text-[#C65378] hover:text-[#9F3B5C] transition-colors"
          >
            <span>Talk to our legal team</span>
            <ArrowUpRight size={15} strokeWidth={2.2} />
          </a>
        </div>

      </div>
    </section>
  );
}
