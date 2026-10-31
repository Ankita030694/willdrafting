"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Building2,
  Landmark,
  Coins,
  Globe2,
  Calculator,
} from "lucide-react";

interface NriSriLankaScenario {
  id: string;
  label: string;
  icon: "globe" | "building" | "coins" | "landmark";
  heading: string; // Strictly <= 70 chars for Screaming Frog
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedInstrument: string;
  checklist: string[];
}

const NRI_SRI_LANKA_SCENARIOS: NriSriLankaScenario[] = [
  {
    id: "cross-palk-ancestral",
    label: "Ancestral Land & Farmland",
    icon: "globe",
    heading: "Ancestral Farmland & Plantation Land in Tamil Nadu or Kerala",
    challengeSummary:
      "Families in Colombo, Jaffna, or Kandy own farm land and village homes in Tamil Nadu or Kerala. Local revenue officers often claim foreign citizens cannot hold Indian farm land.",
    legalMechanism:
      "FEMA Section 6(5) allows foreign citizens to inherit farm land from an Indian resident. A clear Indian Will with survey numbers lets the Tahsildar grant clean Patta transfer without court fights.",
    statutoryPrecedent:
      "FEMA 1999 s. 6(5) & Tamil Nadu Patta Pass Book Act 1983",
    recommendedInstrument:
      "Standalone Indian Will with Survey Schedules & Patta Directives",
    checklist: [
      "Check village survey numbers, sub-divisions, and Patta records",
      "Add clear FEMA Section 6(5) clauses to stop officer objections",
      "Appoint an Indian resident Power of Attorney for Taluk filings",
    ],
  },
  {
    id: "colombo-kandy-urban",
    label: "Urban Flats & Commercial Units",
    icon: "building",
    heading: "Urban Residential Apartments in Chennai, Bengaluru or Kochi",
    challengeSummary:
      "Business families in Colombo or Kandy own city flats in Chennai, Bengaluru, or Kochi. Housing societies and municipal bodies ask for complex court orders before transferring titles.",
    legalMechanism:
      "Under Section 5 of the Indian Succession Act 1925, Indian flats follow Indian law. An Indian Will naming an executor enables fast transfer of society shares and property tax records.",
    statutoryPrecedent:
      "Indian Succession Act 1925 ss. 5 & 213 (Probate rules)",
    recommendedInstrument:
      "Indian Will with Housing Society & Municipal Khata Directives",
    checklist: [
      "List flat number, floor, and undivided share of land (UDS)",
      "Add registered sale deed and builder society allotment numbers",
      "Name alternate executors to manage local property tax transfer",
    ],
  },
  {
    id: "nre-nro-financial",
    label: "NRE/NRO & Demat Portfolios",
    icon: "coins",
    heading: "NRE/NRO Fixed Deposits, Mutual Funds & Demat Shares",
    challengeSummary:
      "NRIs in Sri Lanka hold NRE and NRO bank deposits and Indian shares. Many think bank nominees become full owners. Under Indian law, nominees act only as caretakers.",
    legalMechanism:
      "The Supreme Court ruled in Sarbati Devi that nominees do not own the money. An Indian Will gives clean title, prevents bank freezes, and helps heirs send funds back to Sri Lanka.",
    statutoryPrecedent:
      "Sarbati Devi Precedent & RBI Master Direction on Remittances",
    recommendedInstrument:
      "Testamentary Schedule Specifying Bank Accounts & DP Client IDs",
    checklist: [
      "List NRE and NRO bank accounts with branch IFSC codes",
      "Record Demat Client IDs with NSDL or CDSL depositories",
      "Prepare Form 15CA and Form 15CB papers for fund remittance",
    ],
  },
  {
    id: "dual-will-probate",
    label: "Dual Wills & Probate Lag",
    icon: "landmark",
    heading: "Dual-Will Framework: Bypassing Sri Lankan District Courts",
    challengeSummary:
      "Sri Lankan courts take years to probate a Will. A single worldwide Will locks your original papers in Sri Lanka. Heirs face long Section 228 court delays in India.",
    legalMechanism:
      "Two separate Wills solve this problem. Your Sri Lankan Will covers local assets. Your Indian Will covers Indian assets. Both operate side by side without court delays.",
    statutoryPrecedent:
      "Indian Succession Act 1925 s. 228 & Sri Lanka Civil Procedure Code s. 516",
    recommendedInstrument:
      "Concurrent Dual Wills with Strict Territorial Ring-Fencing",
    checklist: [
      "Add territorial ring-fencing clauses in both instruments",
      "Ensure Sri Lankan revocation words exclude Indian properties",
      "Sign your Indian Will on plain paper before two adult witnesses",
    ],
  },
];

export default function NriSriLankaWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("cross-palk-ancestral");

  // 3-Question Cross-Border Diagnostic State
  const [assetType, setAssetType] = useState<"ancestral" | "urban" | "financial">(
    "ancestral"
  );
  const [status, setStatus] = useState<"oci" | "nri">("oci");
  const [hasSriLankaWill, setHasSriLankaWill] = useState<"yes" | "no">("yes");

  const currentScenario =
    NRI_SRI_LANKA_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_SRI_LANKA_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationDetails = "";
  let recommendationAction = "";

  if (assetType === "ancestral" && status === "oci") {
    recommendationTitle = "FEMA Section 6(5) Farmland Succession & Patta Transfer";
    recommendationDetails =
      "As an OCI or Sri Lankan citizen, you can inherit farm land under FEMA Section 6(5). An Indian Will with village survey numbers ensures smooth Patta transfer.";
    recommendationAction = "Draft Farmland Will";
  } else if (hasSriLankaWill === "yes" && assetType === "urban") {
    recommendationTitle = "Dedicated Indian Will with Cross-Border Ring-Fencing";
    recommendationDetails =
      "A Sri Lankan Will cannot transfer Indian flats without years of court delay. A separate Indian Will transfers flats directly and leaves Sri Lankan assets safe.";
    recommendationAction = "Ring-Fence Indian Assets";
  } else if (assetType === "financial") {
    recommendationTitle = "Indian Will Specifying NRE/NRO & Demat Portfolios";
    recommendationDetails =
      "Indian banks need a Will to release fixed deposits and shares. An Indian Will stops account freezes and supports smooth fund transfers under Form 15CA and 15CB.";
    recommendationAction = "Secure Bank Accounts";
  } else {
    recommendationTitle = "Standard NRI Indian Will under Section 63 ISA";
    recommendationDetails =
      "As an Indian citizen in Sri Lanka, you can sign your Will on plain paper before two witnesses. No Indian stamp paper or travel to India is needed.";
    recommendationAction = "Start Online Indian Will";
  }

  return (
    <section className="w-full mb-16 sm:mb-24">
      <div className="max-w-3xl mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <Globe2 className="w-4 h-4" />
          <span>Interactive Cross-Border Diagnostic</span>
        </div>
        <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
          Sri Lanka-India Estate Succession Diagnostic
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Explore common cross-border succession scenarios faced by Sri Lankan
          NRIs and PIO families holding assets in India. Compare your profile or
          select a legal scenario below:
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
        {NRI_SRI_LANKA_SCENARIOS.map((scenario) => {
          const isActive = scenario.id === activeTab;
          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() => setActiveTab(scenario.id)}
              className={`p-3.5 sm:p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? "bg-[#172228] text-white border-[#172228] shadow-md"
                  : "bg-white text-[#374151] border-[#172228]/10 hover:border-[#C65378]/50"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`p-2 rounded-lg ${
                    isActive ? "bg-white/10 text-white" : "bg-[#FAF7F0] text-[#C65378]"
                  }`}
                >
                  {scenario.icon === "globe" && <Globe2 className="w-4 h-4" />}
                  {scenario.icon === "building" && <Building2 className="w-4 h-4" />}
                  {scenario.icon === "coins" && <Coins className="w-4 h-4" />}
                  {scenario.icon === "landmark" && <Landmark className="w-4 h-4" />}
                </span>
                {isActive && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C65378]">
                    Selected
                  </span>
                )}
              </div>
              <span className="text-xs sm:text-[13px] font-semibold leading-snug">
                {scenario.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Scenario Content Card */}
      <div className="bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-10">
        <div className="max-w-3xl mb-6">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.16em] text-[#C65378] mb-1.5">
            Cross-Border Legal Case Study
          </span>
          <h4 className="text-xl sm:text-2xl font-semibold text-[#111827] mb-3">
            {currentScenario.heading}
          </h4>
          <p className="text-[14.5px] leading-[1.68] text-[#49585F] mb-4">
            {currentScenario.challengeSummary}
          </p>
          <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-xs sm:text-[13.5px] leading-relaxed text-[#172228]">
            <strong className="text-[#C65378]">Indian Law Solution: </strong>
            {currentScenario.legalMechanism}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#172228]/10">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] mb-3">
              Advocate Recommended Protocol
            </h4>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#111827] mb-2">
              <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
              <span>{currentScenario.recommendedInstrument}</span>
            </div>
            <div className="text-xs text-[#55636D]">
              Governing Authority:{" "}
              <strong className="text-[#111827]">
                {currentScenario.statutoryPrecedent}
              </strong>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] mb-3">
              Essential Execution Checklist
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] text-[#374151]">
              {currentScenario.checklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 3-Question Interactive Tool */}
      <div className="bg-[#172228] text-white rounded-[28px] p-6 sm:p-10 shadow-lg">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 text-[#CDAF73] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2">
            <Calculator className="w-4 h-4" />
            <span>Instant Succession Planner</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-[#FAF7F0] mb-2">
            Find Your Recommended Cross-Border Estate Plan
          </h3>
          <p className="text-xs sm:text-sm text-gray-300">
            Answer 3 quick questions about your citizenship and Indian assets to
            receive advocate-tailored guidance:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {/* Question 1 */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2.5">
              1. Primary Indian Asset Type
            </label>
            <div className="flex flex-col gap-2">
              {[
                { val: "ancestral", label: "Farmland / Ancestral Groves" },
                { val: "urban", label: "Urban Apartment / Commercial Plot" },
                { val: "financial", label: "NRE / NRO Bank & Demat Shares" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() =>
                    setAssetType(opt.val as "ancestral" | "urban" | "financial")
                  }
                  className={`px-3.5 py-2.5 rounded-xl text-xs text-left font-medium border transition-all cursor-pointer ${
                    assetType === opt.val
                      ? "bg-[#C65378] text-white border-[#C65378]"
                      : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2.5">
              2. Citizenship / Visa Status
            </label>
            <div className="flex flex-col gap-2">
              {[
                { val: "oci", label: "Sri Lankan Citizen (OCI / PIO Card)" },
                { val: "nri", label: "Indian Passport Holder (NRI in Sri Lanka)" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setStatus(opt.val as "oci" | "nri")}
                  className={`px-3.5 py-2.5 rounded-xl text-xs text-left font-medium border transition-all cursor-pointer ${
                    status === opt.val
                      ? "bg-[#C65378] text-white border-[#C65378]"
                      : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3 */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2.5">
              3. Existing Sri Lankan Will?
            </label>
            <div className="flex flex-col gap-2">
              {[
                { val: "yes", label: "Yes, I have a Sri Lankan Will" },
                { val: "no", label: "No, no Will drafted yet" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() =>
                    setHasSriLankaWill(opt.val as "yes" | "no")
                  }
                  className={`px-3.5 py-2.5 rounded-xl text-xs text-left font-medium border transition-all cursor-pointer ${
                    hasSriLankaWill === opt.val
                      ? "bg-[#C65378] text-white border-[#C65378]"
                      : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Diagnostic Output */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white/10 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#CDAF73]">
              Diagnostic Result
            </span>
            <h4 className="text-base sm:text-lg font-semibold text-[#FAF7F0] mt-0.5 mb-1.5">
              {recommendationTitle}
            </h4>
            <p className="text-xs sm:text-[13px] text-gray-300 leading-relaxed">
              {recommendationDetails}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-semibold px-5 py-3 transition-colors text-center"
            >
              <span>{recommendationAction}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
