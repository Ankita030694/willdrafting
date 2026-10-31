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
  FileText,
  Calculator,
} from "lucide-react";

interface NriMalaysiaScenario {
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

const NRI_MALAYSIA_SCENARIOS: NriMalaysiaScenario[] = [
  {
    id: "ancestral-tamil-nadu",
    label: "Penang/KL OCI: Ancestral Land",
    icon: "globe",
    heading: "Ancestral Agricultural Land in Tamil Nadu or Kerala",
    challengeSummary:
      "Many Malaysian OCIs hold ancestral land in Tamil Nadu or Kerala. They own village homes or farm plots. Local land officers in India reject foreign wills.",
    legalMechanism:
      "Under Indian law, land rules follow the Lex Situs doctrine under Section 5. Under FEMA rules, OCIs can lawfully inherit farm land. An Indian Will allows fast land mutation.",
    statutoryPrecedent:
      "FEMA 1999 Reg 3(1)(b) & Section 5 Indian Succession Act",
    recommendedInstrument:
      "Standalone Indian Will with Patta / Revenue Mutation Directive",
    checklist: [
      "Check village survey numbers, sub-division records, and patta copies",
      "Draft clear ring-fencing clauses to protect Malaysian assets",
      "Name an Indian resident agent for local revenue office filings",
    ],
  },
  {
    id: "kl-corporate-nri",
    label: "KL Tech Exec: Urban Flats",
    icon: "building",
    heading: "Urban Residential Apartments in Bengaluru or Chennai",
    challengeSummary:
      "Indian citizens working in Kuala Lumpur or Cyberjaya own flats in Bengaluru or Chennai. They also hold Malaysian EPF and local bank accounts.",
    legalMechanism:
      "A Malaysian Will requires long probate in Malaysian courts. Then heirs must file under Section 228 in India. An Indian Will passes flats to heirs without court delays.",
    statutoryPrecedent:
      "Section 63 & Section 228 Indian Succession Act 1925",
    recommendedInstrument:
      "Bespoke NRI Indian Will with Housing Society Transmission Directives",
    checklist: [
      "Add full flat details with undivided land share (UDS)",
      "Name alternate executors for city tax and khata transfers",
      "Keep Malaysian EPF and local bank savings separate and safe",
    ],
  },
  {
    id: "nre-financial-portfolio",
    label: "Selangor NRI: NRE & Demat",
    icon: "coins",
    heading: "NRE/NRO Fixed Deposits, Mutual Funds & Demat Shares",
    challengeSummary:
      "NRIs in Selangor hold NRE and NRO bank deposits and Indian shares. Many believe bank nominees own the funds. Indian law gives funds to legal heirs, not nominees.",
    legalMechanism:
      "The Supreme Court ruled in Sarbati Devi that nominees act only as trustees. An Indian Will gives clean title. It stops bank freezes and helps heirs send money home.",
    statutoryPrecedent:
      "Sarbati Devi Precedent & RBI Master Direction on Remittances",
    recommendedInstrument:
      "Testamentary Schedule Specifying Bank Accounts & DP Client IDs",
    checklist: [
      "List NRE and NRO accounts with branch IFSC codes",
      "Record Demat 16-digit Client IDs with CDSL or NSDL names",
      "Prepare Form 15CA and 15CB papers for swift fund transfers",
    ],
  },
  {
    id: "dual-jurisdiction-couple",
    label: "Senior Couple: Dual Wills",
    icon: "landmark",
    heading: "Cross-Border Dual Wills for Malaysian and Indian Assets",
    challengeSummary:
      "Senior couples in Malaysia want simple inheritance in both countries. They want their spouse to inherit without waiting two years for overseas court probate.",
    legalMechanism:
      "Concurrent Wills solve this problem. The Malaysian Will applies in Malaysia. The Indian Will acts in India under the Indian Succession Act. Both operate side by side.",
    statutoryPrecedent:
      "Malaysian Wills Act 1959 & Indian Succession Act 1925",
    recommendedInstrument:
      "Mirror Concurrent Wills with Mutual Survivorship Clauses",
    checklist: [
      "Draft mutual mirror clauses for full spouse protection",
      "Name trusted alternate executors in India for family peace",
      "Use High Commission of India attestation in Kuala Lumpur",
    ],
  },
];

export default function NriMalaysiaWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("ancestral-tamil-nadu");

  // 3-Question Cross-Border Diagnostic State
  const [assetType, setAssetType] = useState<"ancestral" | "urban" | "financial">(
    "ancestral"
  );
  const [status, setStatus] = useState<"oci" | "nri">("oci");
  const [hasMalaysiaWill, setHasMalaysiaWill] = useState<"yes" | "no">("yes");

  const currentScenario =
    NRI_MALAYSIA_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_MALAYSIA_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationDetails = "";
  let recommendationAction = "";

  if (assetType === "ancestral" && status === "oci") {
    recommendationTitle = "OCI Ancestral Land Claim & Indian Will Drafting";
    recommendationDetails =
      "As a Malaysian OCI, you can inherit farm land under FEMA rules. You need an Indian Will with clear survey numbers. This stops village cousin fights.";
    recommendationAction = "Draft Ancestral Land Will";
  } else if (hasMalaysiaWill === "yes" && assetType === "urban") {
    recommendationTitle = "Dedicated Indian Will with Cross-Border Ring-Fencing";
    recommendationDetails =
      "A Malaysian Will cannot transfer flats in India. It also risks court fights across borders. Our advocates write an Indian Will for your flats. It leaves your Malaysian assets safe.";
    recommendationAction = "Ring-Fence Indian Assets";
  } else if (assetType === "financial") {
    recommendationTitle = "Indian Will Specifying NRE/NRO & Demat Accounts";
    recommendationDetails =
      "Indian banks ask for a Will to release fixed deposits and shares. An Indian Will stops account freezes. It also helps your heirs send money back to Malaysia.";
    recommendationAction = "Secure Bank Accounts";
  } else {
    recommendationTitle = "Standard NRI Indian Will under Section 63 ISA";
    recommendationDetails =
      "As an Indian citizen in Malaysia, you can sign your Will on plain paper before two witnesses. No Indian stamp paper or travel to India is needed.";
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
          Malaysia-India Estate Succession Diagnostic
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Explore real-life scenarios faced by Malaysian NRIs and OCIs with
          properties in India. Compare your personal profile or select a legal
          case below:
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
        {NRI_MALAYSIA_SCENARIOS.map((scenario) => {
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
              Governing Precedent:{" "}
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
                { val: "ancestral", label: "Ancestral Land / Village Home" },
                { val: "urban", label: "Urban Flat / Residential Plot" },
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
                { val: "oci", label: "Malaysian Citizen (OCI / PIO Card)" },
                { val: "nri", label: "Indian Passport Holder (NRI in Malaysia)" },
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
              3. Existing Malaysian Will?
            </label>
            <div className="flex flex-col gap-2">
              {[
                { val: "yes", label: "Yes, I have a Malaysian Will" },
                { val: "no", label: "No, no Will drafted yet" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() =>
                    setHasMalaysiaWill(opt.val as "yes" | "no")
                  }
                  className={`px-3.5 py-2.5 rounded-xl text-xs text-left font-medium border transition-all cursor-pointer ${
                    hasMalaysiaWill === opt.val
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
