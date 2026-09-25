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
    title: "Online Wills",
    description: "Protect your assets, name guardians for your children, leave instructions that hold up.",
    linkText: "Write your Will",
    linkHref: "/start",
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src="/new1servcie.png"
          alt="Online Wills"
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
    description: "Power of Attorney and additional estate planning services are launching soon.",
    linkText: "Coming Soon",
    isComingSoon: true,
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src="/comingsoon.png"
          alt="Coming Soon"
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
          <h2 className="text-[2.35rem] sm:text-[3.2rem] lg:text-[3.65rem] font-bold text-[#172228] leading-[1.12] tracking-tight mb-5">
            Your plan, on paper.
          </h2>

          {/* Subheading / Description */}
          <p className="text-[1.05rem] sm:text-[1.15rem] leading-[1.65] text-[#49585F] font-normal max-w-[640px]">
            A legally valid Will or Power of Attorney, written from home in under twenty minutes and reviewable by WillDrafting Law.
          </p>
        </div>

        {/* 2-Card Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-[24px] overflow-hidden flex flex-col justify-between transition-all duration-300 group"
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
