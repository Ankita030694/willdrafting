import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/faq";
import CTA from "@/components/cta";
import Process from "@/components/process";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Services | WillDrafting.in — Comprehensive Succession & Legal Advisory",
  description:
    "We handle the legal issues, you handle the businesses. Expert-vetted testamentary drafting, business succession, private trusts, and estate governance.",
};

interface ServiceCard {
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
  isComingSoon?: boolean;
  illustrationSrc: string;
}

const services: ServiceCard[] = [
  {
    title: "Online Will Drafting",
    description:
      "Create a professionally structured legal Will online from the comfort of your home. Clearly document your wishes, protect your assets, provide for your family and children, and have your Will reviewed by WillDrafting Law.",
    linkText: "Write your Will",
    linkHref: "/start",
    illustrationSrc: "/new1servcie.png",
  },
  {
    title: "Coming Soon",
    description:
      "Power of Attorney and additional estate planning services in India are coming soon, giving you more ways to plan, manage and protect your family's legal and financial interests.",
    linkText: "Coming Soon",
    isComingSoon: true,
    illustrationSrc: "/comingsoon.png",
  },
];

export default function ServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <Navbar />

      <main className="flex-1 w-full max-w-8xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-40 pb-20">
        {/* =========================================================================
            HERO SECTION: Exact match to user reference design
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          {/* Main Editorial Headline with Pill and Subheading */}
          <div className="mb-8 sm:mb-12 max-w-[1200px]">
            {/* Pill Badge */}
            <div className="inline-flex items-center text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-4 sm:mb-5 ">

              <span>Will Drafting Services</span>
            </div>

            <h1 className="text-[2rem] sm:text-[2.2rem] lg:text-[3.4rem] font-medium leading-[1.08] tracking-[-0.025em] text-[#111827] mb-4 sm:mb-5">
              Protect What You’ve Built. <br /> Secure Who You Leave Behind.
            </h1>

            {/* Subheading for Will Drafting Service */}
            <p className="text-[1.05rem] sm:text-[1.18rem] leading-[1.65] text-[#49585F] font-normal max-w-[720px]">
              <span className=" font-bold">Lawyer-drafted Wills, estate planning and succession solutions tailored to your family, assets and wishes. Ensure your property, investments, business interests and beneficiaries</span> are clearly protected through a legally sound Will under applicable Indian succession laws.
            </p>
          </div>

          
        </section>

        {/* =========================================================================
            SERVICES CARDS: Matching WhatWeDo
            ========================================================================= */}
        <section className="w-full mb-16 sm:mb-20">
          {/* Header Section */}
          

          {/* 2-Card Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-[24px] overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-[#1B2A4A]/5"
              >
                {/* Top Illustration Container */}
                <div className="relative w-full bg-gradient-to-b from-[#F5EBF4]/40 to-transparent flex items-center justify-center h-[220px] sm:h-[285px] overflow-hidden">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={service.illustrationSrc}
                      alt={service.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain scale-[1.2] transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Bottom Text & CTA Container */}
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
                        <ArrowUpRight
                          size={15}
                          strokeWidth={2.5}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Process Section */}
      <Process />

      {/* Reusable FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <CTA />

      {/* Site Footer */}
      <Footer />
    </div>
  );
}
