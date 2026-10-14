"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Scale, Award, CheckCircle2, ArrowUpRight, Building2 } from "lucide-react";

const PILLARS = [
  {
    icon: <Scale size={20} className="text-[#C65378]" />,
    title: "Bar Council Enrolled Advocates",
    description:
      "Every clause template and manual Will review is supervised by practising advocates from AMA Legal Solutions with deep expertise in Indian succession and probate law.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#5F7E75]" />,
    title: "Statutory & Sub-Registrar Ready",
    description:
      "Engineered in strict compliance with the Indian Succession Act, 1925, Hindu Succession Act, 1956, and the Registration Act, 1908 for hassle-free execution across India.",
  },
  {
    icon: <Award size={20} className="text-[#D29E0D]" />,
    title: "18-Point Legal Health Check",
    description:
      "Powered by AMA Legal Solutions' proprietary succession audit rules to catch beneficiary share mismatches, minor guardianship gaps, and Section 167 loan encumbrances.",
  },
];

export default function PoweredByAma() {
  return (
    <section
      aria-label="Powered by AMA Legal Solutions"
      className="w-full bg-[#FAF7F0] pt-8 pb-12 sm:py-20 flex justify-center"
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="relative rounded-[32px] sm:rounded-[40px] bg-white border border-[#172228]/10 shadow-[0_8px_36px_rgba(23,34,40,0.04)] overflow-hidden p-7 sm:p-12 lg:p-16">
          {/* Subtle top-right radial accent */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-br from-[#D29E0D]/10 via-[#C65378]/8 to-transparent blur-3xl" />

          {/* Top Co-Branded Lockup Bar */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pb-10 mb-10 border-b border-[#172228]/10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#C65378]/10 px-3.5 py-1 text-[11px] font-bold tracking-[0.16em] uppercase text-[#C65378] mb-4">
                <Building2 size={13} />
                <span>Institutional Legal Backing</span>
              </div>
              <h2 className="text-[2rem] sm:text-[2.75rem] lg:text-[3.15rem] font-medium text-[#172228] leading-[1.12] tracking-tight max-w-2xl">
                WillDrafting.in is Powered by{" "}
                <span className="text-[#30261C] underline decoration-[#D29E0D]/60 decoration-2 underline-offset-8">
                  AMA Legal Solutions
                </span>
                .
              </h2>
            </div>

            {/* Dual Logo Lockup Card: WillDrafting.in × AMA Legal Solutions */}
            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-5 sm:gap-7 bg-[#FAF7F0] border border-[#172228]/10 rounded-2xl px-6 py-5 sm:px-8 sm:py-6 shadow-xs">
              {/* WillDrafting Logo */}
              <div className="flex items-center">
                <Image
                  src="/Logofinal.svg"
                  alt="WillDrafting.in Logo"
                  width={150}
                  height={48}
                  className="h-10 sm:h-11 w-auto object-contain"
                />
              </div>

              {/* Divider */}
              <div className="flex items-center justify-center">
                <div className="hidden sm:block h-12 w-px bg-[#172228]/15" />
                <div className="block sm:hidden w-24 h-px bg-[#172228]/15" />
              </div>

              {/* AMA Legal Solutions Logo */}
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#D29E0D] mb-1.5">
                  Powered By
                </span>
                <Image
                  src="/ama.svg"
                  alt="AMA Legal Solutions Logo"
                  width={195}
                  height={42}
                  className="h-9 sm:h-10 w-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Middle Narrative + Key Credentials */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
            <div className="lg:col-span-7">
              <p className="text-[1.02rem] sm:text-[1.12rem] leading-[1.7] text-[#49585F] mb-6">
                Behind WillDrafting.in&apos;s guided 15-minute digital experience stands{" "}
                <strong className="text-[#172228] font-semibold">AMA Legal Solutions</strong>, a
                full-service Indian law firm specializing in estate succession, probate litigation,
                property documentation, and family wealth protection. Every statutory clause,
                personal law mapping, and legal health check rule in our engine is authored and
                continuously updated by practising advocates.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex items-center gap-2.5 text-sm text-[#172228] font-medium">
                  <CheckCircle2 size={17} className="text-[#5F7E75] shrink-0" />
                  <span>Direct Advocate Review &amp; Consultation Tiers</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[#172228] font-medium">
                  <CheckCircle2 size={17} className="text-[#5F7E75] shrink-0" />
                  <span>Hindu, Indian Succession &amp; Personal Law Compliant</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[#172228] font-medium">
                  <CheckCircle2 size={17} className="text-[#5F7E75] shrink-0" />
                  <span>OTP-Verified Tamper-Proof Audit Trail</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[#172228] font-medium">
                  <CheckCircle2 size={17} className="text-[#5F7E75] shrink-0" />
                  <span>Courtroom-Tested Schedule A Asset Formatting</span>
                </div>
              </div>
            </div>

            {/* Right Trust Highlights Box */}
            <div className="lg:col-span-5 bg-[#172228] text-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 pb-5 mb-5 border-b border-white/15">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D29E0D] mb-1">
                      Legal Authority Guarantee
                    </p>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">
                      Technology Speed. Law Firm Precision.
                    </h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                  Whether you choose our instant <strong className="text-white">Auto Verified</strong>{" "}
                  Will, a line-by-line <strong className="text-white">Advocate Vetted</strong> review,
                  or a 1-on-1 <strong className="text-white">Legal Consultation Call</strong>, your
                  estate plan is backed by AMA Legal Solutions&apos; succession practice.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <Link
                  href="/start"
                  className="inline-flex items-center gap-2 rounded-full bg-[#C65378] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#b04366] transition-all"
                >
                  <span>Start Drafting Your Will</span>
                  <ArrowUpRight size={15} />
                </Link>
                <span className="text-[11px] font-mono text-white/65">
                  AMA Legal Desk · Pan-India
                </span>
              </div>
            </div>
          </div>

          {/* Bottom 3-Pillar Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#FAF7F0] border border-[#172228]/8 p-6 transition-all hover:border-[#172228]/20"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#172228]/10 flex items-center justify-center mb-4 shadow-2xs">
                  {pillar.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-[#172228] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#55636D] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
