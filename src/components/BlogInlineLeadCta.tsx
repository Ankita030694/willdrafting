"use client";

import React from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { ArrowUpRight, FileText, PhoneCall, ShieldCheck } from "lucide-react";

interface BlogInlineLeadCtaProps {
  slug: string;
}

export default function BlogInlineLeadCta({ slug }: BlogInlineLeadCtaProps) {
  const handleOpenConsultModal = () => {
    try {
      track("cta_clicked", {
        location: "blog_mid_article_consult",
        slug,
      });
    } catch {
      // ignore
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-intake-popup", {
          detail: {
            title: "Speak With an Estate & Succession Advocate",
            subtitle:
              "Get step-by-step legal assistance for Will drafting, property mutation, or deceased claim recovery.",
            source: "blog_inline_cta",
          },
        })
      );
    }
  };

  const handleTrackWillStart = () => {
    try {
      track("cta_clicked", {
        location: "blog_mid_article_start_will",
        slug,
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="my-9 rounded-2xl border-2 border-[#C65378]/25 bg-gradient-to-br from-[#FAF7F0] via-white to-[#F4EFE6] p-6 sm:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#C65378]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Advocate-Verified Estate &amp; Succession Desk</span>
          </div>
          <div className="text-lg sm:text-xl font-semibold text-[#172228] leading-snug">
            Protect Your Family From 6-Month Court Delays &amp; Property Disputes
          </div>
          <p className="text-xs sm:text-sm text-[#49585F] leading-relaxed">
            Draft a legally valid Indian Will in 15 minutes (compliant with Section 63, Indian Succession Act) or request a callback from our succession advocates for property mutation &amp; claim filing.
          </p>
        </div>

        <div className="flex flex-col sm:flex-col gap-2.5 shrink-0 sm:min-w-[235px]">
          <Link
            href="/start"
            onClick={handleTrackWillStart}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#172228] hover:bg-[#C65378] text-white font-semibold text-xs sm:text-sm py-3 px-4 transition-colors shadow-xs"
          >
            <FileText className="w-4 h-4" />
            <span>Draft Your Will Online</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={handleOpenConsultModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-[#FAF7F0] text-[#172228] border border-[#172228]/20 hover:border-[#C65378] font-semibold text-xs py-2.5 px-4 transition-colors cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#C65378]" />
            <span>Request Free Legal Callback</span>
          </button>
        </div>
      </div>
    </div>
  );
}
