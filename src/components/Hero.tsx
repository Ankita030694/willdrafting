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
        
        {/* Left Column: Full Top-to-Bottom Cover Image & Testimonial Card */}
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
              className="text-[2.35rem] sm:text-[3.2rem] lg:text-[3.85rem] font-regular leading-[1.12] tracking-[-0.03em] text-[#172228] mb-6 sm:mb-8"
              style={{ marginBottom: "1rem" }}
            >
              Your Wishes. Your Family. Your Will.
            </h1>

            <p
              className="text-[1.02rem] sm:text-[1.15rem] leading-[1.6] text-[#49585F] font-normal max-w-[440px] mb-8"
              style={{ marginBottom: "2rem" }}
            >
              Put your wishes in writing and give your family clarity for the future.
            </p>

            {/* CTA Button */}
            <div style={{ marginBottom: "1.75rem" }}>
              <Link
                href="/start"
                className="inline-flex items-center justify-center rounded-full bg-[#C65378] px-6 py-2.5 text-[14px] font-regular text-[#FFFFFF] shadow-sm active:scale-95"
                style={{
                  paddingLeft: "1.5rem",
                  paddingRight: "1.5rem",
                  paddingTop: "0.65rem",
                  paddingBottom: "0.65rem",
                }}
              >
                Create My Will
              </Link>
            </div>

            {/* Trust Highlights */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.65rem",
                width: "100%",
              }}
            >
              {/* Row 1: Two in a single row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1.5rem",
                  flexWrap: "wrap",
                }}
              >
                <div
                  className="inline-flex items-center gap-1.5 text-[0.86rem] sm:text-[0.90rem] font-medium text-[#212F35] whitespace-nowrap"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", whiteSpace: "nowrap" }}
                >
                  <span style={{ color: "#5F7E75", fontWeight: 700, fontSize: "0.95rem" }}>✓</span>
                  <span>Plain paper valid (No stamp duty)</span>
                </div>

                <div
                  className="inline-flex items-center gap-1.5 text-[0.86rem] sm:text-[0.90rem] font-medium text-[#212F35] whitespace-nowrap"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", whiteSpace: "nowrap" }}
                >
                  <span style={{ color: "#5F7E75", fontWeight: 700, fontSize: "0.95rem" }}>✓</span>
                  <span>Two-witness attestation guide</span>
                </div>
              </div>

              {/* Row 2: Third one centered below */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  className="inline-flex items-center gap-1.5 text-[0.86rem] sm:text-[0.90rem] font-medium text-[#212F35] whitespace-nowrap"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", whiteSpace: "nowrap" }}
                >
                  <span style={{ color: "#5F7E75", fontWeight: 700, fontSize: "0.95rem" }}>✓</span>
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
