"use client";

import React, { useRef, useState } from "react";

interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Tell Us About Your Family & Assets",
    description:
      "Share the details that matter, including your family, beneficiaries, property, investments and other assets. We help you understand what should be included in your Will and estate plan.",
  },
  {
    number: "02",
    title: "Strategy Session",
    description:
      "Your information is structured into a clear, personalised Will in India, covering your beneficiaries, asset distribution, executor, guardianship and other important provisions.",
  },
  {
    number: "03",
    title: "Relentless Execution",
    description:
      "Review your Will clauses and estate planning provisions carefully. Make sure your property, financial assets and family wishes are clearly recorded before your Will is finalised.",
  },
  {
    number: "04",
    title: "Resolution & Peace of Mind",
    description:
      "Complete the Will execution and witness attestation process correctly. Your final Will gives your family clear instructions about your assets and wishes for the future.",
  },
];

export default function Process() {
  return (
    <section className="w-full bg-[#FAF7F0] py-5 sm:py-7 lg:py-9 overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* =========================================================================
            HEADER: Eyebrow and Main Title
            ========================================================================= */}
        <div className="mb-8 sm:mb-11">
          {/* Eyebrow badge */}
          <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
            <span className="text-[0.70rem] font-bold tracking-[0.14em] uppercase text-[#C65378]">
              Working Process
            </span>
          </div>

          {/* Editorial Title */}
          <h2 className="text-[1.65rem] sm:text-[2.25rem] lg:text-[2.5rem] font-medium text-[#172228] leading-[1.1] tracking-tight">
            Four Simple Steps to Put <br /> Your Family&apos;s Future in Writing
          </h2>
        </div>

        {/* =========================================================================
            CARDS: Draggable Horizontal Carousel on Mobile/Tablet, 4-in-a-row on Desktop
            ========================================================================= */}
        <div
          className={`flex lg:grid lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none -mx-6 px-6 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 pb-4 lg:pb-0 scroll-smooth`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="w-[82vw] max-w-[320px] sm:w-[340px] lg:w-auto shrink-0 lg:shrink snap-start lg:snap-align-none bg-white rounded-[24px] xl:rounded-[28px] p-4 sm:p-5 xl:p-5 min-h-[155px] sm:min-h-[195px] lg:min-h-[200px] flex flex-col justify-between transition-all duration-300 group"
            >
              {/* Top: Large Number */}
              <div>
                <span className="text-[2rem] sm:text-[2.3rem] xl:text-[2.5rem] font-regular text-[#172228] tracking-tight leading-none block">
                  {step.number}
                </span>
              </div>

              {/* Bottom: Title & Body Description */}
              <div className="pt-4 sm:pt-7">
                <h3 className="text-[1.05rem] sm:text-[1.15rem] xl:text-[1.22rem] font-semibold text-[#172228] leading-snug tracking-tight mb-1.5">
                  {step.title}
                </h3>
                <p className="text-[0.78rem] sm:text-[0.80rem] xl:text-[0.84rem] text-[#55636D] leading-[1.6]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
