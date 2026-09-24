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
    title: "Free Case Evaluation",
    description:
      "We listen to your full story — no interruptions, no judgment — and give you an honest, actionable assessment of where you stand. There's no cost, no obligation, and absolutely no pressure.",
  },
  {
    number: "02",
    title: "Strategy Session",
    description:
      "We turn your situation into a concrete legal roadmap, mapping out every option, timeline, and likely outcome. You’ll walk away knowing exactly what we recommend and why.",
  },
  {
    number: "03",
    title: "Relentless Execution",
    description:
      "From evidence gathering to aggressive negotiation, we move forward with precision and urgency. You’ll get plain-language updates the whole way — no legal jargon, no unanswered calls.",
  },
  {
    number: "04",
    title: "Resolution & Peace of Mind",
    description:
      "We guide your matter across the finish line — executing every binding document, securing official legal validity, and ensuring your wishes and family are fully protected for generations.",
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

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

          {/* Editorial Title with italic accents */}
          <h2 className="text-[2.35rem] sm:text-[3.2rem] lg:text-[3.65rem] font-normal font-playfair font-serif text-[#172228] leading-[1.08] tracking-tight">
            Four Clear Steps From <br />Uncertainty  To Resolution
          </h2>
        </div>

        {/* =========================================================================
            CARDS: Draggable Horizontal Carousel on Mobile/Tablet, 4-in-a-row on Desktop
            ========================================================================= */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex lg:grid lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none -mx-6 px-6 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 pb-4 lg:pb-0 scroll-smooth ${
            isDragging ? "cursor-grabbing select-none" : "cursor-grab lg:cursor-default"
          }`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="w-[82vw] max-w-[320px] sm:w-[340px] lg:w-auto shrink-0 lg:shrink snap-start lg:snap-align-none bg-white rounded-[24px] xl:rounded-[28px] p-5 sm:p-7 xl:p-8 min-h-[220px] sm:min-h-[280px] lg:min-h-[300px] flex flex-col justify-between transition-all duration-300 group select-none"
            >
              {/* Top: Large Serif Number */}
              <div>
                <span className="text-[2.6rem] sm:text-[3rem] xl:text-[3.25rem] font-normal font-playfair font-serif text-[#172228] tracking-tight leading-none block">
                  {step.number}
                </span>
              </div>

              {/* Bottom: Title & Body Description */}
              <div className="pt-8 sm:pt-14">
                <h3 className="text-[1.25rem] sm:text-[1.4rem] xl:text-[1.55rem] font-normal font-playfair font-serif text-[#172228] leading-snug tracking-tight mb-2.5">
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
