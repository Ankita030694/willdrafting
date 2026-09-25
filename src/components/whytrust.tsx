"use client";

import React from "react";
import Image from "next/image";
import { Phone, Banknote, Languages } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Phone size={22} strokeWidth={1.75} color="#FFFFFF" className="text-white" />,
    title: "Direct access",
    description: "Your attorney's number is in your phone. You call, they answer.",
  },
  {
    icon: <Banknote size={22} strokeWidth={1.75} color="#FFFFFF" className="text-white" />,
    title: "Flat fee options",
    description: "Many of our services are fixed-price. You'll know the cost before we start.",
  },
  {
    icon: <Languages size={22} strokeWidth={1.75} color="#FFFFFF" className="text-white" />,
    title: "No legal jargon",
    description: "We explain your options in plain language. You make the decision.",
  },
];

export default function WhyTrust() {
  return (
    <section className="w-full bg-[#FAF7F0] py-8 sm:py-12 lg:py-16 flex justify-center">
      <div className="w-full max-w-[1400px] 2xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            HERO CARD: Atmospheric Photographic Canvas with Dark Overlay
            ========================================================================= */}
        <div className="relative w-full overflow-hidden min-h-[540px] sm:min-h-[600px] lg:min-h-[660px] flex flex-col justify-between p-7 sm:p-12 lg:p-16 shadow-[0_8px_32px_rgba(0,0,0,0.12)] text-white" style={{ color: "#FFFFFF" }}>
          
          {/* Mobile Background Photography */}
          <div className="absolute inset-0 block md:hidden">
            <Image
              src="/mobileusp.jpg"
              alt="Why trust us background"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          {/* Desktop Background Photography */}
          <div className="absolute inset-0 hidden md:block">
            <Image
              src="/desktopusp.jpg"
              alt="Why trust us background"
              fill
              priority
              sizes="(max-width: 1440px) 100vw, 1400px"
              className="object-cover object-center lg:object-[center_35%]"
            />
          </div>

          {/* Dark Cinematic Gradient Vignette Overlays for Maximum Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/85" />
          <div className="absolute inset-0 bg-black/25" />

          {/* =========================================================================
              TOP: Centered Playfair Headline
              ========================================================================= */}
          <div className="relative z-10 w-full text-left max-w-8xl mx-auto pt-2 sm:pt-4">
            <h2
              className="text-[2.2rem] sm:text-[3.2rem] lg:text-[3.65rem] font-normal font-playfair font-serif !text-white leading-[1.12] tracking-tight"
              style={{ color: "#FFFFFF" }}
            >
              You&apos;ll talk to your attorney.<br />
              <span className="italic font-normal" style={{ color: "#FFFFFF" }}>Not their assistant.</span>
            </h2>
          </div>

          {/* =========================================================================
              BOTTOM: 3 Features (Horizontal with Vertical Lines on Desktop,
              Stacked with Horizontal Lines on Mobile)
              ========================================================================= */}
          <div className="relative z-10 w-full pt-16 sm:pt-20 lg:pt-28">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y divide-white/20 md:divide-y-0 md:divide-x md:divide-white/20">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="py-6 first:pt-0 last:pb-0 md:py-0 md:px-8 lg:px-12 md:first:pl-0 md:last:pr-0 flex flex-col justify-between"
                  style={{ color: "#FFFFFF" }}
                >
                  <div>
                    {/* Icon */}
                    <div className="mb-3.5 inline-block !text-white" style={{ color: "#FFFFFF" }}>
                      {feature.icon}
                    </div>

                    {/* Title in Playfair Serif */}
                    <h3
                      className="text-[1.35rem] sm:text-[1.5rem] font-normal font-playfair font-serif !text-white tracking-tight leading-snug mb-2.5"
                      style={{ color: "#FFFFFF" }}
                    >
                      {feature.title}
                    </h3>
                  </div>

                  {/* Description in Clean Sans - Solid White */}
                  <p
                    className="text-[0.88rem] sm:text-[0.92rem] !text-white leading-relaxed font-sans max-w-[340px]"
                    style={{ color: "#FFFFFF" }}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
