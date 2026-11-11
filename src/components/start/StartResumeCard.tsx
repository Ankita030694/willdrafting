"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, LayoutDashboard, FileText, CheckCircle2, RotateCcw } from "lucide-react";
import { useWillStore } from "@/lib/useWillStore";
import { getUrlForStep } from "@/lib/questionnaireFlow";

export default function StartResumeCard() {
  const [mounted, setMounted] = useState(false);
  const state = useWillStore((s) => s.state);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const hasDraftData =
    Boolean(state.testator.fullName?.trim()) ||
    Boolean(state.testator.phone?.trim()) ||
    state.assets.length > 0 ||
    state.familyMembers.length > 0;

  if (!hasDraftData) {
    return null;
  }

  const testatorName = state.testator.fullName?.trim() || "You";
  const assetCount = state.assets.length;
  const familyCount = state.familyMembers.length;

  return (
    <div className="mb-8 rounded-2xl border-2 border-[#10B981] bg-[#ECFDF5] p-5 text-[#065F46] shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#10B981] text-white">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
                Draft Found in Browser Vault
              </span>
            </div>
            <p className="mt-0.5 text-sm font-semibold text-[#065F46]">
              Draft for {testatorName} ({assetCount} assets, {familyCount} heirs listed)
            </p>
            <p className="mt-0.5 text-xs text-[#047857]">
              Your draft is saved on this device. You can continue where you left off or start from step 1.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/start/01"
            className="inline-flex items-center gap-2 rounded-xl bg-[#059669] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#047857]"
          >
            <span>Resume Questionnaire</span>
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/start/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-[#059669] bg-white px-3.5 py-2.5 text-xs font-bold text-[#065F46] transition hover:bg-[#F0FDF4]"
          >
            <LayoutDashboard size={14} />
            <span>Open Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
