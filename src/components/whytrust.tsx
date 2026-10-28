"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Languages, Sparkles } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <CheckCircle2 size={20} strokeWidth={1.85} className="text-[#C65378]" />,
    title: "Register in Few Steps",
    description: "No complicated paperwork. Answer simple guided questions about your family and assets to complete your Will in minutes.",
  },
  {
    icon: <Languages size={20} strokeWidth={1.85} className="text-[#5F7E75]" />,
    title: "Available in Hindi & English",
    description: "Draft your Will in the language you feel most comfortable with. Easily switch between English and Hindi anytime.",
  },
  {
    icon: <Sparkles size={20} strokeWidth={1.85} className="text-[#C65378]" />,
    title: "Simple & Easy to Use",
    description: "A clean, friendly design created for everyone. Clear guidance at every step with no confusing legal words.",
  },
];

export default function WhyTrust() {
  return (
    <section className="w-full bg-[#FAF7F0] py-5 sm:py-7 lg:py-9 flex justify-center">
      <div className="w-full max-w-[1400px] 2xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full rounded-[32px] sm:rounded-[44px] bg-white border border-[#172228]/8 shadow-[0_4px_30px_rgba(23,34,40,0.03)] overflow-hidden p-5 sm:p-8 lg:p-11">
          {/* =========================================================================
              TOP: Editorial Headline, Description, CTA & Brand Illustration
              ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center pb-7 sm:pb-8 mb-7 sm:mb-8 border-b border-[#172228]/10">
            <div className="lg:col-span-7 text-left">
              <h2 className="text-[1.65rem] sm:text-[2.25rem] lg:text-[2.5rem] font-medium text-[#172228] leading-[1.14] tracking-tight mb-3">
                It&apos;s Not About What You Leave Behind. <br />
                It&apos;s About Who You Leave It For.
              </h2>
              <p className="text-[0.85rem] sm:text-[0.92rem] text-[#49585F] leading-[1.6] max-w-2xl mb-4 font-sans">
                You&apos;ve spent years building your home, savings, investments, business, and everything that matters to you. A Will puts your wishes in writing, helps protect your assets, and gives your family clarity about your future plans.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#C65378] text-[13.5px] sm:text-[14.5px] font-semibold text-white hover:bg-[#a13c5d] hover:shadow-md transition-all active:scale-95 shadow-sm"
                style={{
                  paddingLeft: "1.75rem",
                  paddingRight: "1.75rem",
                  paddingTop: "0.68rem",
                  paddingBottom: "0.68rem",
                }}
              >
                Make My Will Today &rarr;
              </Link>
            </div>

            {/* Right Illustration Canvas */}
            <div className="lg:col-span-5">
              <div className="relative w-full aspect-[4/3] rounded-[24px] sm:rounded-[28px] bg-[#FAF7F0] border border-[#172228]/8 overflow-hidden">
                <Image
                  src="/desktopusp.jpg"
                  alt="Why Indian families trust WillDrafting for lawyer-verified estate planning"
                  width={1200} height={675}
                  priority
                  sizes="(max-width: 1024px) 100vw, 540px"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* =========================================================================
              BOTTOM: 3 Feature Pillars in WillDrafting Editorial Cards
              ========================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-[24px] bg-[#FAF7F0] border border-[#172228]/8 p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:border-[#C65378]/30"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#172228]/10 flex items-center justify-center mb-2.5 shadow-2xs">
                    {feature.icon}
                  </div>

                  <h3 className="text-[1.05rem] sm:text-[1.15rem] font-semibold text-[#172228] tracking-tight leading-snug mb-1.5">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-[0.80rem] sm:text-[0.84rem] text-[#55636D] leading-relaxed font-sans mb-0">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
