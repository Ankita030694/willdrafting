"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Heart } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="w-full pt-5 pb-12 sm:pb-16 px-3 sm:px-6 flex items-center justify-center"
    >
      {/* Full-height Hero Card */}
      <div className="relative w-full max-w-[1400px] min-h-[calc(100vh-1rem)] rounded-[32px] sm:rounded-[44px] overflow-hidden grid grid-cols-1 md:grid-cols-2 items-stretch bg-[#FAF7F0]">
        
        {/* Left Column: Full Top-to-Bottom Cover Image */}
        <div className="hidden md:block relative w-full h-full md:min-h-full bg-[#FAF7F0]">
          <Image
            src="/images/heronewnewnew.svg"
            alt="Hero illustration"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>

        {/* Right Column: Centered Content */}
        <div
          className="relative flex flex-col items-center justify-center px-6 pt-24 pb-8 sm:px-10 sm:py-8 lg:px-16 text-center bg-[#FAF7F0] h-full w-full min-h-full"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            minHeight: "100%",
          }}
        >
          <div
            className="w-full max-w-[620px] flex flex-col items-center justify-center my-auto"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto 0",
            }}
          >
            <span className="block text-[0.7rem] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#C65378] mb-3 sm:mb-4">
              ONLINE WILL DRAFTING IN INDIA
            </span>
            <h1
              className="text-[2.2rem] sm:text-[3rem] lg:text-[3.4rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#172228] mb-4 sm:mb-6"
            >
              Your Wishes. Your Family. Your Will.
            </h1>

            <p
              className="text-[0.84rem] sm:text-[0.9rem] leading-[1.6] text-[#49585F] font-normal max-w-[460px] mb-8"
            >
              Create your Will online in simple steps. Answer guided questions about your family, assets and beneficiaries, and our legal-tech platform helps structure your Will for professional legal review.
            </p>

            {/* CTA Buttons */}
            <div className="mb-8 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/contactus"
                className="inline-flex items-center justify-center rounded-full bg-[#C65378] text-[16px] sm:text-[17px] font-medium text-[#FFFFFF] shadow-sm hover:bg-[#a13c5d] hover:shadow-md transition-all active:scale-95"
                style={{
                  paddingLeft: "2.25rem",
                  paddingRight: "2.25rem",
                  paddingTop: "0.88rem",
                  paddingBottom: "0.88rem",
                }}
              >
                Create My Will
              </Link>
              <Link
                href="/samplewill"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#C65378] bg-transparent text-[15px] sm:text-[16px] font-medium text-[#C65378] hover:bg-[#C65378]/10 hover:shadow-sm transition-all active:scale-95"
                style={{
                  paddingLeft: "2rem",
                  paddingRight: "2rem",
                  paddingTop: "0.7rem",
                  paddingBottom: "0.7rem",
                }}
              >
                See What You’ll Create
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="flex flex-col items-center gap-1.5 sm:gap-3 w-full">
              <span className="text-[0.7rem] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#C65378] mb-1 sm:mb-2">
                How It Works
              </span>
              {/* Row 1 - always side by side */}
              <div className="flex flex-row items-center justify-center gap-3 sm:gap-6 flex-nowrap">
                <div className="inline-flex items-center gap-1 sm:gap-2 text-[0.68rem] sm:text-[0.94rem] font-medium text-[#212F35]">
                  <span className="text-[#5F7E75] font-bold text-[0.7rem] sm:text-[1.05rem]">✓</span>
                  <span>Guided Process</span>
                </div>

                <div className="inline-flex items-center gap-1 sm:gap-2 text-[0.68rem] sm:text-[0.94rem] font-medium text-[#212F35]">
                  <span className="text-[#5F7E75] font-bold text-[0.7rem] sm:text-[1.05rem]">✓</span>
                  <span>Professionally Structured</span> 
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex flex-row items-center justify-center gap-3 sm:gap-6 flex-nowrap">
                <div className="inline-flex items-center gap-1 sm:gap-2 text-[0.68rem] sm:text-[0.94rem] font-medium text-[#212F35]">
                  <span className="text-[#5F7E75] font-bold text-[0.7rem] sm:text-[1.05rem]">✓</span>
                  <span>Lawyer Reviewed</span>
                </div>

                <div className="inline-flex items-center gap-1 sm:gap-2 text-[0.68rem] sm:text-[0.94rem] font-medium text-[#212F35]">
                  <span className="text-[#5F7E75] font-bold text-[0.7rem] sm:text-[1.05rem]">✓</span>
                  <span>Private & Secure</span> 
                </div>
              </div>
            </div>

            {/* Google & Trustpilot 5-Star Ratings */}
            <div className="flex flex-row items-center justify-center gap-5 sm:gap-8 mt-6">
              {/* Google Rating */}
              <div className="flex items-center gap-2.5">
                <Image
                  src="/ggle.png"
                  alt="Google"
                  width={80}
                  height={28}
                  className="object-contain"
                />
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#FBBC04" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Trustpilot Rating */}
              <div className="flex items-center gap-2.5">
                <Image
                  src="/trustpilot.svg"
                  alt="Trustpilot"
                  width={100}
                  height={28}
                  className="object-contain"
                />
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#00B67A" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Image */}
        <div className="block md:hidden relative w-full h-[400px] bg-[#FAF7F0] mt-2">
          <Image
            src="/images/heronewnewnew.svg"
            alt="Hero illustration"
            fill
            sizes="100vw"
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}
