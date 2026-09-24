"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Heart } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full py-5 px-3 sm:px-6 flex items-center justify-center">
      {/* Full-height Hero Card */}
      <div className="relative w-full max-w-[1400px] min-h-[calc(100vh-2.5rem)] rounded-[32px] sm:rounded-[44px] overflow-hidden grid grid-cols-1 md:grid-cols-2 bg-[#DCE7E6] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.06)]">
        
        {/* Left Column: Full Top-to-Bottom Cover Image & Testimonial Card */}
        <div className="relative w-full h-full min-h-[460px] md:min-h-full bg-[#c4d7d6]">
          <Image
            src="/hero.jpeg"
            alt="People smiling outdoors under clear sky"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center md:object-[center_20%]"
          />

          
        </div>

        {/* Right Column: Centered Content */}
        <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 lg:p-16 text-center bg-[#DCE7E6]">
          <div className="w-full max-w-[500px] flex flex-col items-center">
            <h1 className="text-[2.35rem] sm:text-[3.2rem] lg:text-[3.85rem] font-medium leading-[1.12] tracking-[-0.03em] text-[#172228] mb-5">
              Make space for a
              <br />
              clearer way forward.
            </h1>

            <p className="text-[1.02rem] sm:text-[1.15rem] leading-[1.6] text-[#49585F] font-normal max-w-[440px] mb-9">
              Thoughtwell helps you understand your thoughts, identify unhelpful
              patterns, and gain greater clarity.
            </p>

            {/* CTA Button */}
            <div className="mb-10 sm:mb-12">
              <a
                href="#start"
                className="inline-flex items-center justify-center rounded-full bg-[#D6F542] px-9 py-3.5 text-[1.05rem] font-semibold text-[#141D22] shadow-[0_4px_16px_rgba(214,245,66,0.38)] transition-all duration-200 hover:bg-[#cbf033] hover:shadow-[0_8px_24px_rgba(214,245,66,0.55)] hover:-translate-y-0.5 active:translate-y-0"
              >
                Request a demo
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              <div className="inline-flex items-center gap-2 text-[0.94rem] font-medium text-[#212F35] tracking-tight">
                <ShieldCheck size={20} strokeWidth={1.8} className="text-[#212F35] shrink-0" />
                <span>Confidential & private</span>
              </div>

              <div className="inline-flex items-center gap-2 text-[0.94rem] font-medium text-[#212F35] tracking-tight">
                <Heart size={20} strokeWidth={1.8} className="text-[#212F35] shrink-0" />
                <span>Judgement-free support</span>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
}
