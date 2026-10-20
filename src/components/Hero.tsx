"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Languages,
  Clock,
  ArrowRight,
  Eye,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      aria-label="Online Will Drafting Platform Hero"
      className="w-full pt-24 sm:pt-28 pb-3 sm:pb-4 px-2.5 sm:px-6 flex items-center justify-center"
    >
      {/* Hero Card */}
      <div className="relative w-full max-w-[1400px] min-h-[calc(100dvh-6.75rem)] md:min-h-[580px] lg:min-h-[660px] rounded-[28px] sm:rounded-[44px] overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch bg-[#FAF7F0] border border-[#172228]/[0.06] shadow-[0_12px_40px_-16px_rgba(23,34,40,0.07)]">
        {/* Mobile Background Hero Image (faded, same treatment as blog detail hero) */}
        <div className="md:hidden absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          <Image
            src="/images/heronewnewnew.svg"
            alt="Court-ready legal will drafting preview on mobile device"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-[0.1] saturate-[1.15] contrast-[1.25]"
            priority
          />
          {/* Lighter tint: image stays prominent, text keeps a soft wash for legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F0]/55 via-[#FAF7F0]/30 to-[#FAF7F0]/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F0]/45 via-transparent to-[#FAF7F0]/55" />
        </div>

        {/* Subtle decorative background glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#C65378]/[0.06] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 right-1/3 w-72 h-72 rounded-full bg-[#5F7E75]/[0.06] blur-3xl"
        />

        {/* Left Column: Full Image (Desktop Only) */}
        <div className="hidden md:flex md:col-span-5 lg:col-span-6 relative w-full h-full md:min-h-full items-center justify-center bg-[#FAF7F0] p-2 lg:p-3">
          <div className="relative w-full h-full min-h-[550px] lg:min-h-[650px]">
            <Image
              src="/images/heronewnewnew.svg"
              alt="Legally valid online will drafting and estate protection platform in India"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain object-center"
            />
          </div>
        </div>

        {/* Right / Content Column */}
        <div className="md:col-span-7 lg:col-span-6 relative flex flex-col items-center justify-center px-5 pt-8 pb-4 sm:px-8 sm:pt-10 sm:pb-6 lg:px-12 text-center bg-transparent md:bg-[#FAF7F0] z-10 w-full md:h-full md:min-h-full">
          <div className="w-full max-w-[560px] flex flex-col items-center justify-center my-auto">
            {/* SEO H1: Clean eyebrow on mobile, badge on desktop */}
            <div className="inline-flex items-center justify-center gap-2 md:rounded-full md:bg-white md:px-3.5 md:py-1 md:border md:border-[#C65378]/25 md:shadow-2xs mb-2 md:mb-3">
              <span
                className="hidden md:inline-block w-2 h-2 rounded-full bg-[#C65378] shrink-0"
                aria-hidden="true"
              />
              <h1 className="text-[0.74rem] xs:text-[0.80rem] md:text-[0.74rem] font-bold tracking-[0.12em] md:tracking-[0.14em] uppercase text-[#C65378]">
                India&apos;s first online will drafting platform
              </h1>
            </div>

            {/* SEO H2 Main Headline */}
            <h2 className="text-[1.55rem] xs:text-[1.85rem] sm:text-[2.25rem] lg:text-[2.55rem] font-medium leading-[1.12] sm:leading-[1.10] tracking-[-0.025em] text-[#172228] mb-2.5 md:mb-3 max-w-[500px]">
              Plan with love, protect with{" "}
              <span className="relative inline-block font-bold text-[#C65378]">
                WILL
                <svg
                  aria-hidden="true"
                  viewBox="0 0 120 12"
                  fill="none"
                  className="hidden md:block absolute -bottom-1 left-0 w-full h-2 text-[#C65378]/40"
                >
                  <path
                    d="M2 9.5C32 3 88 3 118 9.5"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            {/* Plain-Language Lead Paragraph */}
            <p className="text-[0.80rem] sm:text-[0.86rem] leading-[1.55] text-[#49585F] font-normal max-w-[460px] mb-4 px-1 sm:px-0">
              Plan for the people and assets that matter most. Answer simple
              guided questions in English or Hindi, generate your Will document
              online, and get professional legal assistance to help ensure your
              wishes are clearly documented.
            </p>

            {/* Quick Visual Feature Pills (Desktop Only to keep Mobile clean) */}
            <div className="hidden md:flex flex-wrap items-center justify-center gap-2.5 mb-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 border border-[#172228]/10 px-3 py-1 text-[12.5px] font-medium text-[#172228]">
                <Languages className="w-3.5 h-3.5 text-[#C65378]" />
                English &amp; हिंदी
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 border border-[#172228]/10 px-3 py-1 text-[12.5px] font-medium text-[#172228]">
                <Clock className="w-3.5 h-3.5 text-[#5F7E75]" />
                Takes ~15 Mins
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 border border-[#172228]/10 px-3 py-1 text-[12.5px] font-medium text-[#172228]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C65378]" />
                No Legal Jargon
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="mb-5 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-[320px] sm:max-w-none">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] py-3.5 px-8 text-[15.5px] sm:text-[16.5px] font-medium text-[#FFFFFF] shadow-sm hover:bg-[#a13c5d] hover:shadow-md transition-all active:scale-95"
              >
                <span>Create My Will</span>
                <ArrowRight className="hidden md:inline-block w-4 h-4" />
              </Link>
              <a
                href="#plans"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("sample-will-section") || document.getElementById("plans");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                  window.dispatchEvent(new CustomEvent("open-sample-will"));
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#C65378] bg-transparent md:bg-white/70 py-3 px-7 md:px-6 text-[14.5px] sm:text-[15.5px] font-medium text-[#C65378] hover:bg-[#C65378]/10 hover:shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <Eye className="hidden md:inline-block w-4 h-4" />
                <span>See What You’ll Create</span>
              </a>
            </div>

            {/* Google & Trustpilot 5-Star Ratings */}
            <div className="flex flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 pt-1">
              {/* Google Rating */}
              <div className="flex items-center gap-2 md:bg-white/80 md:border md:border-[#172228]/[0.07] md:rounded-full md:px-3.5 md:py-1.5">
                <Image
                  src="/ggle.png"
                  alt="Google Reviews rating 4.9 stars for WillDrafting.in"
                  width={72}
                  height={25}
                  className="h-5 w-auto object-contain"
                />
                <div
                  className="flex items-center gap-0.5"
                  aria-label="5 out of 5 stars on Google"
                >
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="#FBBC04"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Trustpilot Rating */}
              <div className="flex items-center gap-2 md:bg-white/80 md:border md:border-[#172228]/[0.07] md:rounded-full md:px-3.5 md:py-1.5">
                <Image
                  src="/trustpilot.svg"
                  alt="Trustpilot 5 star rating for WillDrafting.in"
                  width={86}
                  height={25}
                  className="h-5 w-auto object-contain"
                />
                <div
                  className="flex items-center gap-0.5"
                  aria-label="5 out of 5 stars on Trustpilot"
                >
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="#00B67A"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

