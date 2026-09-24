"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CTA() {

  return (
    <section className="relative w-full bg-[#FAF7F0] py-24 sm:py-32 lg:py-36 overflow-hidden flex items-center justify-center">
      {/* =========================================================================
          SCATTERED FLOATING CARDS (Matching exact reference positions)
          ========================================================================= */}

      {/* 1. Top-Left: Team around meeting desk */}
      <div className="hidden md:block absolute top-10 sm:top-14 left-4 lg:left-16 xl:left-24 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-2xl overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80"
          alt="Legal team in meeting"
          fill
          sizes="130px"
          className="object-cover"
        />
      </div>

      {/* 2. Mid-Left: Consultation across desk */}
      <div className="hidden md:block absolute top-[46%] left-8 lg:left-28 xl:left-40 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=400&q=80"
          alt="Confidential consultation"
          fill
          sizes="100px"
          className="object-cover"
        />
      </div>

      {/* 3. Bottom-Left: Smiling Portrait */}
      <div className="hidden md:block absolute bottom-8 sm:bottom-12 left-6 lg:left-20 xl:left-28 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-2xl overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
          alt="Client portrait"
          fill
          sizes="130px"
          className="object-cover"
        />
      </div>

      {/* 4. Top-Right: Lawyer with client */}
      <div className="hidden md:block absolute top-10 sm:top-14 right-4 lg:right-16 xl:right-24 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-2xl overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&q=80"
          alt="Lawyer consultation"
          fill
          sizes="130px"
          className="object-cover"
        />
      </div>

      {/* 5. Mid-Right: Reviewing legal files */}
      <div className="hidden md:block absolute top-[46%] right-8 lg:right-28 xl:right-40 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ">
        <Image
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80"
          alt="Legal records and folders"
          fill
          sizes="100px"
          className="object-cover"
        />
      </div>

      

      {/* 6. Bottom-Right: Woman on phone at office desk */}
      <div className="hidden md:block absolute bottom-8 sm:bottom-12 right-6 lg:right-20 xl:right-28 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-xl overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80"
          alt="Client speaking with advisor"
          fill
          sizes="130px"
          className="object-cover"
        />
      </div>

      {/* =========================================================================
          CENTER CONTENT & FORM (With Mobile Image Grid Pairs)
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-[760px] mx-auto px-4 sm:px-6 text-center">
        
        {/* Mobile Top Image Pair (matching mobile screenshot) */}
        <div className="md:hidden grid grid-cols-2 gap-8 max-w-[340px] mx-auto mb-8 px-2">
          <div className="relative aspect-square w-full overflow-hidden shadow-sm border border-[#1B2A4A]/5">
            <Image
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80"
              alt="Legal team in meeting"
              fill
              sizes="170px"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square w-full overflow-hidden shadow-sm border border-[#1B2A4A]/5">
            <Image
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&q=80"
              alt="Lawyer consultation"
              fill
              sizes="170px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Main Heading */}
        <h2 className="text-[2rem] sm:text-[3rem] lg:text-[3.5rem] font-normal leading-[1.12] tracking-tight mb-2">
          <span className="text-[#172228] block">
            Ready to protect what matters most?
          </span>
        </h2>

        {/* Subtitle / Description */}
        <p className="text-[0.96rem] sm:text-[1.08rem] leading-[1.65] text-[#55636D] max-w-[620px] mx-auto mb-8">
          Create a clear, personalised Will and make sure your wishes are taken care of.
        </p>

        {/* Simple CTA Button (Hero section style) */}
        <div className="mb-6 flex justify-center">
          <Link
            href="/start"
            className="inline-flex items-center justify-center rounded-full bg-[#C65378] px-8 py-3 text-[14px] font-medium text-[#FFFFFF] shadow-sm transition-all hover:bg-[#a13c5d] active:scale-95"
            style={{
              paddingLeft: "1.75rem",
              paddingRight: "1.75rem",
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
            }}
          >
            Create My Will 
          </Link>
        </div>

        {/* Social Proof Avatars & Tagline */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2.5 text-xs text-[#7B8791] mt-3 text-center">
          <div className="flex -space-x-1.5 overflow-hidden justify-center">
            <div className="inline-block h-5 w-5 rounded-full ring-2 ring-white overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                alt="Avatar 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="inline-block h-5 w-5 rounded-full ring-2 ring-white overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                alt="Avatar 2"
                fill
                className="object-cover"
              />
            </div>
            <div className="inline-block h-5 w-5 rounded-full ring-2 ring-white overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80"
                alt="Avatar 3"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <span className="text-center max-w-[290px] sm:max-w-none leading-snug">
            <strong className="font-semibold text-[#172228]">1,000+ families</strong> have taken the first step toward protecting their future.
          </span>
        </div>

        {/* Mobile Bottom Image Pair (matching mobile screenshot) */}
        <div className="md:hidden grid grid-cols-2 gap-8 max-w-[340px] mx-auto mt-8 px-2">
          <div className="relative aspect-square w-full overflow-hidden shadow-sm border border-[#1B2A4A]/5">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
              alt="Client portrait"
              fill
              sizes="170px"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square w-full overflow-hidden shadow-sm border border-[#1B2A4A]/5">
            <Image
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80"
              alt="Client speaking with advisor"
              fill
              sizes="170px"
              className="object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
