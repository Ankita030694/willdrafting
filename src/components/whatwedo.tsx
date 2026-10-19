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
          className="object-contain scale-100 sm:scale-[1.2] transition-transform duration-300"
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
          className="object-contain scale-100 sm:scale-[1.2] transition-transform duration-300"
        />
      </div>
    ),
  },
];

export default function WhatWeDo() {
  return (
    <section className="w-full bg-[#FAF7F0] py-8 sm:py-14 flex justify-center">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-5 sm:mb-11 max-w-[800px]">
          {/* Eyebrow with leading rule */}
          <div className="flex items-center gap-3 mb-2 sm:mb-2.5 text-left">
            <span className="text-[0.68rem] sm:text-[11px] font-bold tracking-[0.12em] uppercase text-[#C65378] leading-snug">
              Online Will Drafting &amp; Estate Planning India
            </span>
          </div>

          {/* Section Heading */}
          <h2 className="text-[1.55rem] sm:text-[2.2rem] lg:text-[2.45rem] font-medium text-[#172228] leading-[1.15] sm:leading-[1.12] tracking-tight mb-2.5 sm:mb-3">
            Put Your Estate Plan in Writing.
          </h2>

          {/* Subheading / Description */}
          <p className="text-[0.82rem] sm:text-[0.92rem] leading-[1.55] sm:leading-[1.6] text-[#49585F] font-normal max-w-[680px]">
            Create a professionally structured, <span className="font-bold">legally valid online Will in India</span> from the comfort of your home. Whether you are a Resident Indian or an NRI/OCI abroad, our bilingual (English &amp; Hindi) online Will generator structures your estate under the Indian Succession Act, 1925, Hindu Succession Act, 1956, and Muslim Personal Law (Wasiyat), backed by AMA Legal Solutions.
          </p>
        </div>

        {/* 2-Card Services Grid: stacked on mobile, 2 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full">
          {services.map((service, index) => (
            <div
              key={index}
              className="w-full bg-white rounded-[24px] overflow-hidden flex flex-col justify-between transition-all duration-300 group"
            >
              {/* Top Illustration Container */}
              <div className="relative w-full bg-gradient-to-b from-[#F5EBF4]/40 to-transparent flex items-center justify-center h-[140px] sm:h-[200px] overflow-hidden">
                {service.illustration}
              </div>

              {/* Bottom Text & CTA Container - Compact Padding */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 border-t border-[#1B2A4A]/5">
                <div>
                  <h3 className="text-[1.1rem] sm:text-[1.22rem] font-semibold text-[#172228] mb-1 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-[0.80rem] sm:text-[0.84rem] leading-relaxed text-[#49585F] mb-2.5 max-w-[480px]">
                    {service.description}
                  </p>
                </div>

                {/* Link / Status */}
                <div>
                  {service.isComingSoon ? (
                    <span className="inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-[#C65378]">
                      <span>{service.linkText}</span>
                    </span>
                  ) : (
                    <Link
                      href={service.linkHref || "#"}
                      className="inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-[#C65378] group-hover:text-[#9F3B5C] transition-colors"
                    >
                      <span>{service.linkText}</span>
                      <ArrowUpRight size={14} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
