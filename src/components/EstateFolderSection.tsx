"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  X,
  FileText,
  Eye,
} from "lucide-react";
import Folder from "./Folder";

export default function EstateFolderSection() {
  const [folderOpen, setFolderOpen] = useState(false);
  const [sampleModalOpen, setSampleModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenSample = () => {
      setFolderOpen(true);
      setSampleModalOpen(true);
    };

    window.addEventListener("open-sample-will", handleOpenSample);
    if (typeof window !== "undefined" && window.location.hash === "#sample-will-section") {
      handleOpenSample();
    }

    return () => {
      window.removeEventListener("open-sample-will", handleOpenSample);
    };
  }, []);

  const folderDocuments = [
    // Paper 1: Last Will & Testament
    <div
      key="doc-1"
      className="p-2 h-full flex flex-col justify-between text-[7.5px] leading-tight bg-white select-none border border-black/5"
    >
      <div>
        <div className="flex items-center justify-between border-b border-black/10 pb-1 mb-1.5">
          <span className="font-bold text-[#C65378] tracking-wider uppercase text-[7px]">
            Last Will
          </span>
          <span className="text-[6px] font-mono text-gray-400">SAMPLE</span>
        </div>
        <div className="space-y-1">
          <div className="h-1 bg-[#172228]/20 rounded-full w-4/5" />
          <div className="h-1 bg-[#172228]/10 rounded-full w-full" />
          <div className="h-1 bg-[#172228]/10 rounded-full w-3/4" />
        </div>
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-black/5">
        <span className="text-[6px] text-[#5F7E75] font-semibold flex items-center gap-0.5">
          ✓ View Sample
        </span>
        <div className="w-2.5 h-2.5 rounded-full bg-[#C65378] flex items-center justify-center text-white text-[5px] font-bold">
          ★
        </div>
      </div>
    </div>,

    // Paper 2: Asset Schedule & Nomination
    <div
      key="doc-2"
      className="p-2 h-full flex flex-col justify-between text-[7.5px] leading-tight bg-white select-none border border-black/5"
    >
      <div>
        <div className="flex items-center justify-between border-b border-black/10 pb-1 mb-1.5">
          <span className="font-bold text-[#172228] tracking-wider uppercase text-[7px]">
            Asset Inventory
          </span>
        </div>
        <div className="space-y-1">
          <div className="h-1 bg-[#172228]/20 rounded-full w-full" />
          <div className="h-1 bg-[#172228]/10 rounded-full w-5/6" />
          <div className="h-1 bg-[#172228]/10 rounded-full w-2/3" />
        </div>
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-black/5">
        <span className="text-[6px] text-[#55636D] font-mono">Schedule A</span>
        <span className="text-[6px] text-[#C65378] font-bold">Preview</span>
      </div>
    </div>,

    // Paper 3: Attestation & Witness Protocol
    <div
      key="doc-3"
      className="p-2 h-full flex flex-col justify-between text-[7.5px] leading-tight bg-white select-none border border-black/5"
    >
      <div>
        <div className="flex items-center justify-between border-b border-black/10 pb-1 mb-1.5">
          <span className="font-bold text-[#5F7E75] tracking-wider uppercase text-[7px]">
            Witness Guide
          </span>
          <span className="text-[6px] text-[#C65378] font-bold">LEGAL</span>
        </div>
        <div className="space-y-1">
          <div className="h-1 bg-[#172228]/20 rounded-full w-3/4" />
          <div className="h-1 bg-[#172228]/10 rounded-full w-full" />
          <div className="h-1 bg-[#172228]/10 rounded-full w-4/5" />
        </div>
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-black/5">
        <span className="text-[6px] text-[#172228] font-semibold">2 Witnesses</span>
        <span className="text-[6px] text-[#5F7E75] font-mono">Ready</span>
      </div>
    </div>,
  ];

  const handleRightAreaClick = () => {
    if (folderOpen) {
      setSampleModalOpen(true);
    }
  };

  return (
    <section
      id="sample-will-section"
      className="w-full bg-[#FAF7F0] py-16 sm:py-24 lg:py-28 overflow-hidden scroll-mt-20"
    >
      <div className="w-full max-w-[1400px] 2xl:max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          onClick={handleRightAreaClick}
          className={`relative rounded-[32px] sm:rounded-[44px] bg-white p-8 sm:p-12 lg:p-16 border border-[#1B2A4A]/5 shadow-[0_4px_30px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center ${
            folderOpen ? "cursor-pointer" : ""
          }`}
        >
          {/* Left Column: Pill, Heading, Subtitle & Highlights */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold text-[#C65378] mb-4">
              <span className="tracking-[0.14em] uppercase text-[11px] font-bold">
                Digital Estate Plan
              </span>
            </div>

            {/* Main Editorial Heading */}
            <h2 className="text-[2.2rem] sm:text-[3rem] lg:text-[3.4rem] font-medium text-[#172228] leading-[1.12] tracking-tight mb-4">
              All Your Important Will &amp; Estate Documents in One Secure Place.
            </h2>

            {/* Subtitle */}
            <p className="text-[1rem] sm:text-[1.1rem] text-[#55636D] leading-relaxed max-w-xl mb-6">
              From your Last Will and Testament and detailed asset schedule to witness attestation guidance, everything you need for your estate planning in India is neatly organised in one secure place.
            </p>

            {/* Checklist Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#2D3A41]">
                <CheckCircle2 size={16} className="text-[#5F7E75] shrink-0" />
                <span>Professionally structured Will clauses</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#2D3A41]">
                <CheckCircle2 size={16} className="text-[#5F7E75] shrink-0" />
                <span>Bank-grade 256-bit encryption</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#2D3A41]">
                <CheckCircle2 size={16} className="text-[#5F7E75] shrink-0" />
                <span>Instant PDF &amp; print-ready Will formats</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#2D3A41]">
                <CheckCircle2 size={16} className="text-[#5F7E75] shrink-0" />
                <span>Complete step-by-step witness guide</span>
              </div>
            </div>

            {/* Action CTA Button */}
            <div
              className="flex flex-wrap items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#C65378] px-7 py-3 text-[14px] font-medium text-white shadow-sm hover:bg-[#a13c5d] hover:shadow-md transition-all active:scale-95"
              >
                <span>Start Your Estate Plan</span>
                <ArrowUpRight size={16} strokeWidth={2.2} />
              </Link>
              <span className="text-xs text-[#7B8791] font-medium">
                Takes ~15 minutes · Plain paper Will format
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Folder Experience */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center pt-8 pb-4 lg:py-10">
            <div className="relative w-full flex flex-col items-center justify-center min-h-[280px] sm:min-h-[340px]">
              {/* Subtle background glow */}
              <div className="absolute w-56 h-56 rounded-full bg-[#C65378]/10 blur-3xl pointer-events-none" />

              {/* Folder Component with Website Color */}
              <div
                className="relative z-10 flex items-center justify-center py-10"
                onClick={(e) => e.stopPropagation()}
              >
                <Folder
                  size={2.2}
                  color="#C65378"
                  items={folderDocuments}
                  className="transition-transform duration-300"
                  isOpen={folderOpen}
                  onOpenChange={(isOpen) => setFolderOpen(isOpen)}
                  onOpenFolderClick={() => setSampleModalOpen(true)}
                />
              </div>

              {/* Click / Tap Prompt Pill */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!folderOpen) {
                    setFolderOpen(true);
                  } else {
                    setSampleModalOpen(true);
                  }
                }}
                className="relative z-10 mt-6 inline-flex items-center gap-2 rounded-full bg-[#FAF7F0] border border-[#172228]/10 px-4 py-1.5 text-xs font-medium text-[#172228] shadow-sm hover:border-[#C65378]/40 transition-colors cursor-pointer"
              >
                {folderOpen ? (
                  <>
                    <Eye size={13} className="text-[#C65378]" />
                    <span>Click anywhere to view Sample Will</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={13} className="text-[#C65378]" />
                    <span>Click folder to open &amp; explore papers</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Sample Will Preview Modal */}
      {sampleModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4 sm:p-6 animate-fadeIn"
          onClick={() => setSampleModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-3xl bg-[#FAF7F0] border border-[#172228]/15 shadow-2xl p-5 sm:p-8 text-[#172228]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Modal Header */}
            <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-[#172228]/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#C65378]/10 text-[#C65378] flex items-center justify-center">
                  <FileText size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#C65378] block">
                    Sample Document Preview
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#172228]">
                    Sample Last Will &amp; Testament
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSampleModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#172228]/10 flex items-center justify-center text-[#55636D] hover:text-[#172228] cursor-pointer"
                aria-label="Close sample Will modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Clean A4 Paper Sheet — Professional Sample Excerpt */}
            <div className="relative bg-white rounded-2xl border border-[#172228]/12 shadow-sm p-6 sm:p-9 font-serif text-[#172228] overflow-hidden select-none">
              {/* Subtle Diagonal Watermark */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.035] -rotate-24 text-4xl sm:text-5xl font-sans font-black tracking-widest uppercase text-center"
              >
                SAMPLE WILL
              </div>

              {/* Document Header */}
              <div className="text-center border-b-2 border-[#172228] pb-4 mb-6">
                <p className="text-[10px] font-sans font-bold tracking-[0.22em] uppercase text-[#55636D] mb-1">
                  Last Will &amp; Testament
                </p>
                <h4 className="text-lg sm:text-xl font-bold tracking-wide uppercase text-[#172228]">
                  LAST WILL AND TESTAMENT OF SHRI RAJESHWAR VERMA
                </h4>
                <p className="text-xs text-[#49585F] mt-1 font-sans">
                  Executed at Bengaluru, Karnataka
                </p>
              </div>

              {/* Opening Declaration */}
              <div className="space-y-4 text-[13px] sm:text-[13.5px] leading-[1.75] text-[#2D3A41]">
                <p>
                  I, <strong>Rajeshwar Prasad Verma</strong>, son of Late Shri Mohanlal Verma, aged 58 years, residing at 402, Palm Grove Residency, Indiranagar, Bengaluru, Karnataka – 560038, being of sound mind and disposing memory, do hereby voluntarily make and publish this as my Last Will and Testament, and revoke all previous Wills and codicils made by me.
                </p>

                <div>
                  <p className="font-sans text-xs font-bold uppercase tracking-wider text-[#172228] mb-1">
                    1. Appointment of Executor
                  </p>
                  <p>
                    I appoint my wife, <strong>Smt. Sunita Rajeshwar Verma</strong>, as the Sole Executor of this Will to administer my estate and carry out the directions contained herein.
                  </p>
                </div>

                {/* Clean Sample Asset Table */}
                <div>
                  <p className="font-sans text-xs font-bold uppercase tracking-wider text-[#172228] mb-2">
                    2. Summary of Asset Bequests
                  </p>
                  <div className="border border-[#172228]/15 rounded-lg overflow-hidden text-xs font-sans">
                    <div className="grid grid-cols-12 bg-[#FAF7F0] font-semibold text-[#172228] px-3.5 py-2 border-b border-[#172228]/10">
                      <span className="col-span-4">Asset</span>
                      <span className="col-span-5">Particulars</span>
                      <span className="col-span-3 text-right">Beneficiary</span>
                    </div>
                    <div className="grid grid-cols-12 px-3.5 py-2.5 border-b border-[#172228]/10 items-center">
                      <span className="col-span-4 font-medium text-[#172228]">Residential Apartment</span>
                      <span className="col-span-5 text-[#55636D]">Flat 402, Indiranagar, Bengaluru</span>
                      <span className="col-span-3 text-right font-semibold text-[#172228]">Sunita Verma (100%)</span>
                    </div>
                    <div className="grid grid-cols-12 px-3.5 py-2.5 border-b border-[#172228]/10 items-center">
                      <span className="col-span-4 font-medium text-[#172228]">Bank &amp; Fixed Deposits</span>
                      <span className="col-span-5 text-[#55636D]">HDFC Bank A/c &amp; Term Deposits</span>
                      <span className="col-span-3 text-right font-semibold text-[#172228]">Rohan Verma (50%)<br />Meera Verma (50%)</span>
                    </div>
                    <div className="grid grid-cols-12 px-3.5 py-2.5 items-center">
                      <span className="col-span-4 font-medium text-[#172228]">Family Jewellery</span>
                      <span className="col-span-5 text-[#55636D]">Ancestral Gold &amp; Bank Locker</span>
                      <span className="col-span-3 text-right font-semibold text-[#172228]">Meera Verma (100%)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-sans text-xs font-bold uppercase tracking-wider text-[#172228] mb-1">
                    3. Residuary Clause
                  </p>
                  <p>
                    Any remaining movable or immovable assets belonging to me and not specifically mentioned above shall pass absolutely to my wife, <strong>Smt. Sunita Rajeshwar Verma</strong>.
                  </p>
                </div>

                {/* Attestation Block */}
                <div className="pt-4 mt-4 border-t border-[#172228]/15">
                  <p className="font-sans text-xs font-bold uppercase tracking-wider text-[#172228] mb-2">
                    4. Signature &amp; Two-Witness Attestation
                  </p>
                  <p className="text-xs text-[#49585F] mb-4">
                    Signed by the above-named Testator in our joint physical presence, and attested by us as witnesses in the presence of the Testator and of each other.
                  </p>
                  <div className="grid grid-cols-3 gap-4 pt-2 font-sans text-[11px] text-[#55636D]">
                    <div className="border-t border-[#172228]/30 pt-1.5">
                      <strong className="text-[#172228] block">Testator Signature</strong>
                      <span>R. P. Verma</span>
                    </div>
                    <div className="border-t border-[#172228]/30 pt-1.5">
                      <strong className="text-[#172228] block">Witness 1</strong>
                      <span>Anil K. Nair · Bengaluru</span>
                    </div>
                    <div className="border-t border-[#172228]/30 pt-1.5">
                      <strong className="text-[#172228] block">Witness 2</strong>
                      <span>Dr. Vivek Rao · Bengaluru</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Call-to-Action inside Modal */}
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
              <p className="text-xs text-[#55636D]">
                Your finished Will is custom-drafted in full detail based on your family and assets.
              </p>
              <Link
                href="/start"
                className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-[#C65378] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#a13c5d] transition-colors"
              >
                <span>Create Your Will Now</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
