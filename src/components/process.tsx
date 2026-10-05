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
    <section className="w-full bg-[#FAF7F0] py-16 sm:py-24 lg:py-28 overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* =========================================================================
            HEADER: Eyebrow and Main Title
            ========================================================================= */}
        <div className="mb-12 sm:mb-16">
          {/* Eyebrow badge */}
          <div className="flex items-center gap-2 mb-5 sm:mb-6">
            <span className="text-[0.75rem] font-bold tracking-[0.16em] uppercase text-[#C65378]">
              Working Process
            </span>
          </div>

          {/* Editorial Title */}
          <h2 className="text-[2.2rem] sm:text-[3rem] lg:text-[3.4rem] font-medium text-[#172228] leading-[1.08] tracking-tight">
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
              className="w-[82vw] max-w-[320px] sm:w-[340px] lg:w-auto shrink-0 lg:shrink snap-start lg:snap-align-none bg-white rounded-[24px] xl:rounded-[28px] p-5 sm:p-7 xl:p-8 min-h-[220px] sm:min-h-[280px] lg:min-h-[300px] flex flex-col justify-between transition-all duration-300 group"
            >
              {/* Top: Large Number */}
              <div>
                <span className="text-[2.6rem] sm:text-[3rem] xl:text-[3.25rem] font-regular text-[#172228] tracking-tight leading-none block">
                  {step.number}
                </span>
              </div>

              {/* Bottom: Title & Body Description */}
              <div className="pt-8 sm:pt-14">
                <h3 className="text-[1.25rem] sm:text-[1.4rem] xl:text-[1.55rem] font-semibold text-[#172228] leading-snug tracking-tight mb-2.5">
                  {step.title}
                </h3>
                <p className="text-[0.85rem] sm:text-[0.88rem] xl:text-[0.90rem] text-[#55636D] leading-[1.65]">
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
