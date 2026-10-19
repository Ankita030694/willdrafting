"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="w-full pt-4 sm:pt-5 pb-8 sm:pb-16 px-2.5 sm:px-6 flex items-center justify-center"
    >
      {/* Hero Card */}
      <div className="relative w-full max-w-[1400px] md:min-h-[calc(100vh-1rem)] rounded-[28px] sm:rounded-[44px] overflow-hidden grid grid-cols-1 md:grid-cols-2 items-stretch bg-[#FAF7F0]">

        {/* Left Column: Full Top-to-Bottom Cover Image (Desktop Only) */}
        <div className="hidden md:block relative w-full h-full md:min-h-full bg-[#FAF7F0]">
          <Image
            src="/images/heronewnewnew.svg"
            alt="Legally valid online will drafting and estate protection platform in India"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>

        {/* Content Column */}
        <div className="relative flex flex-col items-center justify-center px-5 pt-24 pb-6 sm:px-10 sm:pt-28 sm:pb-8 lg:px-16 text-center bg-[#FAF7F0] w-full md:h-full md:min-h-full">
          <div className="w-full max-w-[620px] flex flex-col items-center justify-center my-auto">
            <h1 className="text-[0.98rem] xs:text-[1.12rem] sm:text-xs font-bold tracking-[0.14em] sm:tracking-[0.18em] uppercase text-[#C65378] mb-2 sm:mb-3">
              India&apos;s first online will drafting platform
            </h1>

            <h2 className="text-[1.85rem] xs:text-[2.2rem] sm:text-[3rem] lg:text-[3.4rem] font-medium leading-[1.12] sm:leading-[1.08] tracking-[-0.025em] text-[#172228] mb-3.5 sm:mb-6 max-w-[540px]">
              Plan with love, protect with <span className="text-[1.85rem] xs:text-[2.2rem] sm:text-[3rem] lg:text-[3.4rem] font-bold text-[#C65378]">WILL</span>
            </h2>

            <p className="text-[0.84rem] sm:text-[0.9rem] leading-[1.58] text-[#49585F] font-normal max-w-[500px] mb-6 sm:mb-8 px-1 sm:px-0">
              Plan for the people and assets that matter most. Answer simple guided questions in English or Hindi, generate your Will document online, and get professional legal assistance to help ensure your wishes are clearly documented.
            </p>

            {/* CTA Buttons */}
            <div className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-[320px] sm:max-w-none">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[#C65378] py-3.5 px-8 text-[15.5px] sm:text-[17px] font-medium text-[#FFFFFF] shadow-sm hover:bg-[#a13c5d] hover:shadow-md transition-all active:scale-95"
              >
                Create My Will
              </Link>
              <a
                href="#sample-will-section"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("sample-will-section");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "center" });
                  }
                  window.dispatchEvent(new CustomEvent("open-sample-will"));
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border-2 border-[#C65378] bg-transparent py-3 px-7 text-[14.5px] sm:text-[16px] font-medium text-[#C65378] hover:bg-[#C65378]/10 hover:shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                See What You’ll Create
              </a>
            </div>

            {/* Google & Trustpilot 5-Star Ratings */}
            <div className="flex flex-row flex-wrap items-center justify-center gap-4 sm:gap-8 mt-2 sm:mt-4">
              {/* Google Rating */}
              <div className="flex items-center gap-2">
                <Image
                  src="/ggle.png"
                  alt="Google Reviews rating 4.9 stars for WillDrafting.in"
                  width={72}
                  height={25}
                  className="h-5 sm:h-6 w-auto object-contain"
                />
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="#FBBC04" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Trustpilot Rating */}
              <div className="flex items-center gap-2">
                <Image
                  src="/trustpilot.svg"
                  alt="Trustpilot 5 star rating for WillDrafting.in"
                  width={86}
                  height={25}
                  className="h-5 sm:h-6 w-auto object-contain"
                />
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="#00B67A" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Image */}
        <div className="block md:hidden relative w-full h-[260px] xs:h-[320px] sm:h-[380px] bg-[#FAF7F0] mt-2 pt-1.5 overflow-hidden">
          <Image
            src="/images/heronewnewnew.svg"
            alt="Court-ready legal will drafting preview on mobile device"
            fill
            sizes="100vw"
            className="object-contain object-top scale-[1.10] xs:scale-[1.08] sm:scale-[1.05] origin-top"
            priority
          />
        </div>
      </div>
    </section>
  );
}
