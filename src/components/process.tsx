"use client";

import React from "react";

interface Step {
  number: string;
  title: string;
  description: string;
  mobileTitle?: string;
  mobileDescription?: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Tell Us About Your Family & Assets",
    mobileTitle: "Family & Assets",
    description:
      "Share the details that matter, including your family, beneficiaries, property, investments and other assets. We help you understand what should be included in your Will and estate plan.",
    mobileDescription: "Add your family, property and investment details.",
  },
  {
    number: "02",
    title: "Strategy Session",
    mobileTitle: "Strategy Session",
    description:
      "Your information is structured into a clear, personalised Will in India, covering your beneficiaries, asset distribution, executor, guardianship and other important provisions.",
    mobileDescription: "Personalised draft covering nominees & executors.",
  },
  {
    number: "03",
    title: "Relentless Execution",
    mobileTitle: "Lawyer Review",
    description:
      "Review your Will clauses and estate planning provisions carefully. Make sure your property, financial assets and family wishes are clearly recorded before your Will is finalised.",
    mobileDescription: "Review clauses vetted by High Court advocates.",
  },
  {
    number: "04",
    title: "Resolution & Peace of Mind",
    mobileTitle: "Peace of Mind",
    description:
      "Complete the Will execution and witness attestation process correctly. Your final Will gives your family clear instructions about your assets and wishes for the future.",
    mobileDescription: "Sign before two witnesses for 100% legal validity.",
  },
];

export default function Process() {
  return (
    <section className="w-full bg-[#FAF7F0] py-3.5 sm:py-7 lg:py-9 overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* =========================================================================
            HEADER: Eyebrow and Main Title
            ========================================================================= */}
        <div className="mb-4 sm:mb-8 lg:mb-11">
          {/* Eyebrow badge */}
          <div className="flex items-center gap-2 mb-1.5 sm:mb-3">
            <span className="text-[0.68rem] sm:text-[0.70rem] font-bold tracking-[0.14em] uppercase text-[#C65378]">
              Working Process
            </span>
          </div>

          {/* Editorial Title */}
          <h3 className="text-[1.35rem] sm:text-[2.25rem] lg:text-[2.5rem] font-medium text-[#172228] leading-[1.15] sm:leading-[1.1] tracking-tight">
            Four Simple Steps to Put <br className="hidden sm:inline" /> Your Family&apos;s Future in Writing
          </h3>
        </div>

        {/* =========================================================================
            DESKTOP / TABLET: Original 4-in-a-row (Preserved intact)
            ========================================================================= */}
        <div
          className="hidden sm:flex lg:grid lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none -mx-6 px-6 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 pb-4 lg:pb-0 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {steps.map((step, idx) => {
            const isPink = step.number === "02" || step.number === "04";
            return (
              <div
                key={idx}
                className={`w-[82vw] max-w-[320px] sm:w-[340px] lg:w-auto shrink-0 lg:shrink snap-start lg:snap-align-none rounded-[24px] xl:rounded-[28px] p-4 sm:p-5 xl:p-5 min-h-[155px] sm:min-h-[195px] lg:min-h-[200px] flex flex-col justify-between transition-all duration-300 group ${
                  isPink ? "bg-[#C65378] text-white shadow-sm" : "bg-white"
                }`}
              >
                {/* Top: Large Number */}
                <div>
                  <span
                    className={`text-[2rem] sm:text-[2.3rem] xl:text-[2.5rem] font-regular tracking-tight leading-none block ${
                      isPink ? "text-white" : "text-[#172228]"
                    }`}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Bottom: Title & Body Description */}
                <div className="pt-4 sm:pt-7">
                  <h3
                    className={`text-[1.05rem] sm:text-[1.15rem] xl:text-[1.22rem] font-semibold leading-snug tracking-tight mb-1.5 ${
                      isPink ? "text-white" : "text-[#172228]"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-[0.78rem] sm:text-[0.80rem] xl:text-[0.84rem] leading-[1.6] ${
                      isPink ? "text-white/90" : "text-[#55636D]"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            MOBILE VIEW: Concise 2x2 grid (Compact, zero horizontal scrolling)
            ========================================================================= */}
        <div className="grid grid-cols-2 gap-2.5 sm:hidden">
          {steps.map((step, idx) => {
            const isPink = step.number === "02" || step.number === "04";
            return (
              <div
                key={idx}
                className={`rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between min-h-[130px] ${
                  isPink
                    ? "bg-[#C65378] text-white shadow-xs"
                    : "bg-white border border-[#172228]/8 text-[#172228]"
                }`}
              >
                <div>
                  <span
                    className={`text-[1.35rem] font-medium tracking-tight leading-none block ${
                      isPink ? "text-white" : "text-[#172228]"
                    }`}
                  >
                    {step.number}
                  </span>
                </div>

                <div className="pt-2">
                  <h3
                    className={`text-[12px] font-bold leading-tight mb-1 ${
                      isPink ? "text-white" : "text-[#172228]"
                    }`}
                  >
                    {step.mobileTitle || step.title}
                  </h3>
                  <p
                    className={`text-[10.5px] leading-snug ${
                      isPink ? "text-white/85" : "text-[#55636D]"
                    }`}
                  >
                    {step.mobileDescription || step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
