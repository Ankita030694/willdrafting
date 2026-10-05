"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative w-full bg-[#FAF7F0] py-24 sm:py-32 lg:py-36 overflow-hidden flex items-center justify-center">
      {/* =========================================================================
          SCATTERED FLOATING ILLUSTRATIONS (Desktop: 6 illustrations from /cta)
          ========================================================================= */}

      {/* 1. Top-Left: Will document with wax seal */}
      <div className="hidden md:block absolute top-8 sm:top-12 left-4 lg:left-14 xl:left-20 w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 transition-transform duration-300 hover:scale-105 pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            src="/cta/1.png"
            alt="Court-ready legally binding Will document illustration"
            fill
            sizes="160px"
            className="object-contain"
          />
        </div>
      </div>

      {/* 2. Mid-Left: Confidential locked folder */}
      <div className="hidden md:block absolute top-[44%] left-6 lg:left-24 xl:left-36 w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 transition-transform duration-300 hover:scale-105 pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            src="/cta/2.png"
            alt="Confidential estate and asset protection folder"
            fill
            sizes="144px"
            className="object-contain"
          />
        </div>
      </div>

      {/* 3. Bottom-Left: Stamped letter in envelope */}
      <div className="hidden md:block absolute bottom-6 sm:bottom-10 left-4 lg:left-16 xl:left-24 w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 transition-transform duration-300 hover:scale-105 pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            src="/cta/3.png"
            alt="Bar Council advocate verified legal certificate"
            fill
            sizes="160px"
            className="object-contain"
          />
        </div>
      </div>

      {/* 4. Top-Right: Inspected document with magnifying glass */}
      <div className="hidden md:block absolute top-8 sm:top-12 right-4 lg:right-14 xl:right-20 w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 transition-transform duration-300 hover:scale-105 pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            src="/cta/4.png"
            alt="Comprehensive 7-point legal health check inspection"
            fill
            sizes="160px"
            className="object-contain"
          />
        </div>
      </div>

      {/* 5. Mid-Right: Family protection under estate plan */}
      <div className="hidden md:block absolute top-[44%] right-6 lg:right-24 xl:right-36 w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 transition-transform duration-300 hover:scale-105 pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            src="/cta/5.png"
            alt="Family asset protection and minor guardianship plan"
            fill
            sizes="144px"
            className="object-contain"
          />
        </div>
      </div>

      {/* 6. Bottom-Right: Parchment scroll with pen */}
      <div className="hidden md:block absolute bottom-6 sm:bottom-10 right-4 lg:right-16 xl:right-24 w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 transition-transform duration-300 hover:scale-105 pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            src="/cta/6.png"
            alt="Testamentary clause execution and witness attestation scroll"
            fill
            sizes="160px"
            className="object-contain"
          />
        </div>
      </div>

      {/* =========================================================================
          CENTER CONTENT & FORM
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-[760px] mx-auto px-4 sm:px-6 text-center">
        {/* Mobile Top Image Pair */}
        <div className="md:hidden grid grid-cols-2 gap-6 max-w-[320px] mx-auto mb-8 px-2">
          <div className="relative aspect-square w-full flex items-center justify-center">
            <Image
              src="/cta/1.png"
              alt="Court-ready legally binding Will document"
              fill
              sizes="160px"
              className="object-contain scale-[1.2]"
            />
          </div>
          <div className="relative aspect-square w-full flex items-center justify-center">
            <Image
              src="/cta/4.png"
              alt="Comprehensive legal health check report"
              fill
              sizes="160px"
              className="object-contain scale-[1.2]"
            />
          </div>
        </div>

        {/* Main Heading */}
        <h2 className="text-[2.2rem] sm:text-[3rem] lg:text-[3.4rem] font-normal leading-[1.12] tracking-tight mb-2">
          <span className="text-[#172228] block">
            Don&apos;t Leave Your Family Guessing.
          </span>
        </h2>

        {/* Subtitle / Description */}
        <div className="text-[0.96rem] sm:text-[1.08rem] leading-[1.65] text-[#55636D] max-w-[620px] mx-auto mb-8 space-y-4">
          <p>You spend a lifetime building what matters. Make sure your wishes are known when you&apos;re no longer there to explain them.</p>
          <p>Create a personalised Will that clearly records your wishes for your family, property and assets.</p>
        </div>

        {/* Simple CTA Button */}
        <div className="mb-6 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[#C65378] px-8 py-3 text-[14px] font-medium text-[#FFFFFF] shadow-sm transition-all hover:bg-[#a13c5d] active:scale-95"
            style={{
              paddingLeft: "1.75rem",
              paddingRight: "1.75rem",
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
            }}
          >
            Create My Will in Minutes
          </Link>
        </div>

        {/* Social Proof Avatars & Tagline */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2.5 text-xs text-[#7B8791] mt-3 text-center">
          <div className="flex -space-x-1.5 overflow-hidden justify-center">
            <div className="inline-block h-5 w-5 rounded-full ring-2 ring-white overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                alt="Client avatar Priya Sharma"
                fill
                className="object-cover"
              />
            </div>
            <div className="inline-block h-5 w-5 rounded-full ring-2 ring-white overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                alt="Client avatar Rajesh Verma"
                fill
                className="object-cover"
              />
            </div>
            <div className="inline-block h-5 w-5 rounded-full ring-2 ring-white overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80"
                alt="Client avatar Sunita Mehta"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <span className="text-center max-w-[290px] sm:max-w-none leading-snug">
            <strong className="font-semibold text-[#172228]">1,000+ families</strong> have taken the first step toward protecting their future.
          </span>
        </div>

        {/* Mobile Bottom Image Pair */}
        <div className="md:hidden grid grid-cols-2 gap-6 max-w-[320px] mx-auto mt-8 px-2">
          <div className="relative aspect-square w-full flex items-center justify-center">
            <Image
              src="/cta/2.png"
              alt="Secure digital vault estate document folder"
              fill
              sizes="160px"
              className="object-contain scale-[1.2]"
            />
          </div>
          <div className="relative aspect-square w-full flex items-center justify-center">
            <Image
              src="/cta/6.png"
              alt="Legal Will execution testament scroll"
              fill
              sizes="160px"
              className="object-contain scale-[1.2]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
