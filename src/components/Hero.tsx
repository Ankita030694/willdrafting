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
        <div className="relative w-full h-full min-h-[460px] md:min-h-full bg-[#FAF7F0]">
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
          className="relative flex flex-col items-center justify-center px-6 py-8 sm:px-10 lg:px-16 text-center bg-[#FAF7F0] h-full w-full min-h-full"
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
            <h1
              className="text-[2.65rem] sm:text-[3.35rem] lg:text-[4rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#172228] mb-4 sm:mb-6"
            >
              Your Wishes. Your Family. Your Will.
            </h1>

            <p
              className="text-[1.12rem] sm:text-[1.2rem] leading-[1.6] text-[#49585F] font-normal max-w-[460px] mb-8"
            >
              Put your wishes in writing and give your family clarity for the future.
            </p>

            {/* CTA Button */}
            <div className="mb-8">
              <Link
                href="/start"
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
            </div>

            {/* Trust Highlights */}
            <div className="flex flex-col items-center gap-2.5 sm:gap-3 w-full">
              {/* Row 1 */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-6 flex-wrap">
                <div className="inline-flex items-center gap-2 text-[0.94rem] sm:text-[0.98rem] font-medium text-[#212F35]">
                  <span className="text-[#5F7E75] font-bold text-[1.05rem]">✓</span>
                  <span>Plain paper valid (No stamp duty)</span>
                </div>

                <div className="inline-flex items-center gap-2 text-[0.94rem] sm:text-[0.98rem] font-medium text-[#212F35]">
                  <span className="text-[#5F7E75] font-bold text-[1.05rem]">✓</span>
                  <span>Two-witness attestation guide</span>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex items-center justify-center">
                <div className="inline-flex items-center gap-2 text-[0.94rem] sm:text-[0.98rem] font-medium text-[#212F35]">
                  <span className="text-[#5F7E75] font-bold text-[1.05rem]">✓</span>
                  <span>256-bit private encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
