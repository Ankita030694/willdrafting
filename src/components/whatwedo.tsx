"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface ServiceCard {
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
  isComingSoon?: boolean;
  illustration: React.ReactNode;
}

const services: ServiceCard[] = [
  {
    title: "Online Will Drafting",
    description: "Protect your assets, choose your beneficiaries, name guardians for your minor children, and clearly record how your estate should be distributed through a professionally drafted Will in India.",
    linkText: "Write your Will",
    linkHref: "/contact",
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src="/new1servcie.png"
          alt="Online Will Drafting Service under Indian Law"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain scale-[1.2] transition-transform duration-300"
        />
      </div>
    ),
  },
  {
    title: "Coming Soon",
    description: "Power of Attorney and additional estate planning services in India are coming soon, giving you more ways to plan, manage and protect your family's legal and financial interests.",
    linkText: "Coming Soon",
    isComingSoon: true,
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src="/comingsoon.png"
          alt="Power of Attorney and Private Trust Advisory Services in India"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain scale-[1.2] transition-transform duration-300"
        />
      </div>
    ),
  },
];

export default function WhatWeDo() {
  return (
    <section className="w-full bg-[#FAF7F0] py-16 sm:py-20 flex justify-center">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12 sm:mb-16 max-w-[800px]">
          {/* Eyebrow with leading rule */}
          <div className="flex items-center gap-3 mb-4 text-left">
            <span className="text-xs font-bold tracking-[0.16em] uppercase text-[#C65378]">
              Estate Planning
            </span>
          </div>

          {/* Section Heading */}
          <h2 className="text-[2.2rem] sm:text-[3rem] lg:text-[3.4rem] font-medium text-[#172228] leading-[1.12] tracking-tight mb-5">
            Put Your Estate Plan in Writing.
          </h2>

          {/* Subheading / Description */}
          <p className="text-[1.05rem] sm:text-[1.15rem] leading-[1.65] text-[#49585F] font-normal max-w-[640px]">
            Create a professionally structured <span className="font-bold">legal Will online</span> from the comfort of your home. Clearly document your wishes, protect your assets, provide for your family and children, and have your Will reviewed by WillDrafting Law.
          </p>
        </div>

        {/* 2-Card Services Grid (Desktop) / Carousel (Mobile) */}
        <div 
          className="flex md:grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-4 md:pb-0 w-full scrollbar-none"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="min-w-[85vw] sm:min-w-[400px] md:min-w-0 shrink-0 md:shrink snap-center md:snap-align-none bg-white rounded-[24px] overflow-hidden flex flex-col justify-between transition-all duration-300 group"
            >
              {/* Top Illustration Container */}
              <div className="relative w-full bg-gradient-to-b from-[#F5EBF4]/40 to-transparent flex items-center justify-center h-[220px] sm:h-[285px] overflow-hidden">
                {service.illustration}
              </div>

              {/* Bottom Text & CTA Container - Compact Padding */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 border-t border-[#1B2A4A]/5">
                <div>
                  <h3 className="text-[1.35rem] sm:text-[1.5rem] font-semibold text-[#172228] mb-1.5 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-[0.90rem] sm:text-[0.95rem] leading-relaxed text-[#49585F] mb-4 max-w-[480px]">
                    {service.description}
                  </p>
                </div>

                {/* Link / Status */}
                <div>
                  {service.isComingSoon ? (
                    <span className="inline-flex items-center gap-1.5 text-[0.90rem] font-medium text-[#C65378]">
                      <span>{service.linkText}</span>
                    </span>
                  ) : (
                    <Link
                      href={service.linkHref || "#"}
                      className="inline-flex items-center gap-1.5 text-[0.90rem] font-medium text-[#C65378] group-hover:text-[#9F3B5C] transition-colors"
                    >
                      <span>{service.linkText}</span>
                      <ArrowUpRight size={15} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
