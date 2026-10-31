"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Scale,
  ShieldCheck,
  Building2,
  Landmark,
  Coins,
  Globe2,
} from "lucide-react";

interface NriUaeScenario {
  id: string;
  label: string;
  icon: "building" | "globe" | "coins" | "landmark";
  heading: string; // Strictly <= 70 chars for Screaming Frog
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedInstrument: string;
  checklist: string[];
}

const NRI_UAE_SCENARIOS: NriUaeScenario[] = [
  {
    id: "dubai-golden-visa",
    label: "Dubai: Golden Visa & Realty",
    icon: "building",
    heading: "Dubai Golden Visa Holder with Flats in Mumbai or Delhi",
    challengeSummary:
      "Expats in Dubai often buy flats in Mumbai, Gurugram, or Bengaluru. Transferring Indian flats through a DIFC Will alone fails at Indian land offices.",
    legalMechanism:
      "Indian property follows the Lex Situs rule under Section 5 of the Indian Succession Act, 1925. Indian registries do not accept foreign orders. A separate Indian Will protects your properties cleanly.",
    statutoryPrecedent:
      "Section 5 Indian Succession Act, 1925 & Lex Situs Rule",
    recommendedInstrument:
      "Separate Indian Will with UAE Ring-Fencing Clause",
    checklist: [
      "Include survey numbers, floor details, and undivided land share",
      "Draft a non-revocation clause protecting your UAE DIFC Will",
      "Name an adult executor in India to handle local land records",
    ],
  },
  {
    id: "abu-dhabi-finance",
    label: "Abu Dhabi / Sharjah: NRE & Demat",
    icon: "coins",
    heading: "NRE/NRO Fixed Deposits, Mutual Funds & Demat Portfolios",
    challengeSummary:
      "Many expats in Abu Dhabi and Sharjah hold big savings in NRE/NRO deposits and mutual funds. Bank nominees do not become legal owners.",
    legalMechanism:
      "In Sarbati Devi, the Supreme Court ruled that a nominee is only a trustee. Without an Indian Will, bank funds freeze. A clear Indian Will transfers money to your heirs without court fights.",
    statutoryPrecedent:
      "Sarbati Devi Precedent & RBI Account Rules",
    recommendedInstrument:
      "Indian Will Specifying Bank & Demat Client Portfolios",
    checklist: [
      "List NRE, NRO, and FCNR accounts with bank branch codes",
      "Record Demat 16-digit Client IDs with CDSL or NSDL names",
      "Explain the USD 1 Million annual RBI repatriation rules to heirs",
    ],
  },
  {
    id: "civil-personal-status",
    label: "UAE Non-Muslim Personal Status",
    icon: "landmark",
    heading: "UAE Federal Decree-Law No. 41 of 2022 Civil Will Harmony",
    challengeSummary:
      "Non-Muslim expats can register civil wills under UAE Decree-Law No. 41 of 2022. But relying only on a UAE Will causes long court delays in India.",
    legalMechanism:
      "A foreign will needs ancillary probate under Section 228 of the Indian Succession Act. This takes up to two years. A separate Indian Will lets your family claim assets in India right away.",
    statutoryPrecedent:
      "UAE Decree-Law No. 41 of 2022 & Section 228 ISA 1925",
    recommendedInstrument:
      "Concurrent Indian Will Matched with UAE Civil Will",
    checklist: [
      "Match your estate choices across both countries cleanly",
      "Sign your Indian Will before two adult witnesses in the UAE",
      "Optionally get consular attestation in Dubai or Abu Dhabi",
    ],
  },
  {
    id: "ancestral-business",
    label: "Tradeline: Farmland & LLC",
    icon: "globe",
    heading: "Ancestral Agricultural Land in Punjab, Gujarat or Kerala",
    challengeSummary:
      "Trading families in Deira or Bur Dubai often inherit family farmland in Gujarat, Punjab, or Kerala. Many worry that living abroad blocks inheritance.",
    legalMechanism:
      "Under FEMA 1999 rules, NRIs can legally inherit agricultural land from an Indian resident. A clear Indian Will prevents partition lawsuits among extended relatives.",
    statutoryPrecedent:
      "FEMA 1999 Reg 3(1)(b) & Section 63 Indian Succession Act",
    recommendedInstrument:
      "Plain-Paper Indian Will with Revenue Mutation Instructions",
    checklist: [
      "Check ancestral land jamabandi, 7/12 extract, or patta papers",
      "Sign on plain A4 paper with two independent witnesses in the UAE",
      "Appoint an attorney in India to handle local Tehsil mutation",
    ],
  },
];

export default function NriUaeWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("dubai-golden-visa");

  // 3-Question Cross-Border Diagnostic State
  const [hasUaeWill, setHasUaeWill] = useState<"difc" | "none">("difc");
  const [indiaAssetType, setIndiaAssetType] = useState<"property" | "financial">(
    "property"
  );
  const [visaType, setVisaType] = useState<"golden" | "residence">("golden");

  const currentScenario =
    NRI_UAE_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_UAE_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationDetails = "";
  let recommendationAction = "";

  if (hasUaeWill === "difc" && indiaAssetType === "property") {
    recommendationTitle = "Dedicated Indian Will with DIFC Ring-Fencing";
    recommendationDetails =
      "Your DIFC Will cannot transfer land in India under the Lex Situs rule. You need an independent Indian Will. It protects your UAE assets and transfers Indian flats smoothly.";
    recommendationAction = "Draft Separate Indian Will";
  } else if (hasUaeWill === "difc" && indiaAssetType === "financial") {
    recommendationTitle = "Indian Will Specifying NRE/NRO & Demat Accounts";
    recommendationDetails =
      "Indian banks need an Indian Will to release deposits and mutual funds quickly. A clear Indian Will names your heirs and avoids court disputes in India.";
    recommendationAction = "Protect Indian Accounts";
  } else if (visaType === "golden") {
    recommendationTitle = "Golden Visa Cross-Border Two-Will Strategy";
    recommendationDetails =
      "As a UAE Golden Visa holder, two separate wills protect you best. Keep a UAE Will for local company shares, and an Indian Will for assets in India under Section 63.";
    recommendationAction = "Prepare Dual Estate Plan";
  } else {
    recommendationTitle = "NRI Indian Will under Section 63 Succession Act";
    recommendationDetails =
      "As an Indian citizen in the UAE, you can sign your Indian Will on plain A4 paper with two witnesses. You do not need Indian stamp paper or travel to India.";
    recommendationAction = "Start Online NRI Will";
  }

  return (
    <section className="w-full mb-16 sm:mb-24">
      <div className="max-w-3xl mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <Scale className="w-4 h-4" />
          <span>Interactive Cross-Border Tool</span>
        </div>
        <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
          Explore UAE-India Will Strategies by Asset Profile
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Planning your estate across borders means balancing UAE rules with
          the Indian Succession Act, 1925. Choose your profile below to review
          the rules, laws, and practical steps:
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-8 pb-2 border-b border-[#172228]/10">
        {NRI_UAE_SCENARIOS.map((scenario) => {
          const isActive = activeTab === scenario.id;
          return (
            <button
              key={scenario.id}
              onClick={() => setActiveTab(scenario.id)}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#172228] text-white shadow-sm"
                  : "bg-white text-[#49585F] hover:text-[#172228] border border-[#172228]/10 hover:border-[#172228]/30"
              }`}
            >
              {scenario.icon === "building" && <Building2 className="w-4 h-4" />}
              {scenario.icon === "globe" && <Globe2 className="w-4 h-4" />}
              {scenario.icon === "coins" && <Coins className="w-4 h-4" />}
              {scenario.icon === "landmark" && <Landmark className="w-4 h-4" />}
              <span>{scenario.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Panel */}
      <div className="bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#172228]/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] block mb-1">
              Cross-Border Legal Framework
            </span>
            <h3 className="text-xl sm:text-2xl font-medium text-[#111827]">
              {currentScenario.heading}
            </h3>
          </div>
          <div className="inline-flex items-center gap-2 self-start lg:self-auto bg-[#FAF7F0] border border-[#172228]/10 px-4 py-2 rounded-full text-xs font-semibold text-[#172228]">
            <ShieldCheck className="w-4 h-4 text-[#047857]" />
            <span>{currentScenario.statutoryPrecedent}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-7 space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] mb-1.5">
                The Practical Challenge in the UAE
              </h4>
              <p className="text-[14.5px] sm:text-[15px] leading-[1.65] text-[#374151]">
                {currentScenario.challengeSummary}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] mb-1.5">
                Statutory Rule Under Indian Law
              </h4>
              <p className="text-[14.5px] sm:text-[15px] leading-[1.65] text-[#374151]">
                {currentScenario.legalMechanism}
              </p>
            </div>
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] block mb-1">
                Recommended Solution
              </span>
              <span className="inline-block text-sm font-semibold text-[#172228] bg-[#FAF7F0] px-3.5 py-1.5 rounded-lg border border-[#172228]/10">
                {currentScenario.recommendedInstrument}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#FAF7F0]/60 rounded-2xl p-5 sm:p-6 border border-[#172228]/10 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-[#172228] mb-3.5">
                UAE-India Execution Checklist
              </h4>
              <ul className="space-y-3 text-[13.5px] sm:text-[14px] text-[#49585F] leading-snug">
                {currentScenario.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-6">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
              >
                <span>Consult Cross-Border Counsel</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Question Diagnostic Decision Matrix */}
      <div className="bg-[#FAF7F0] rounded-[28px] border border-[#172228]/15 p-6 sm:p-9">
        <div className="max-w-2xl mb-6">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] block mb-1">
            Diagnostic Tool
          </span>
          <h3 className="text-xl sm:text-2xl font-medium text-[#111827] mb-2">
            Quick Cross-Border Estate Diagnostic
          </h3>
          <p className="text-sm text-[#49585F]">
            Answer three brief questions to see how your UAE estate setup
            interacts with Indian succession laws:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Question 1 */}
          <div className="bg-white p-5 rounded-2xl border border-[#172228]/10">
            <label className="text-xs font-bold uppercase tracking-[0.12em] text-[#55636D] block mb-2.5">
              1. UAE Estate Plan Status
            </label>
            <div className="space-y-2 text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => setHasUaeWill("difc")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl border transition-all ${
                  hasUaeWill === "difc"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-white text-[#374151] border-[#172228]/15 hover:border-[#172228]/40"
                }`}
              >
                DIFC, ADGM or ADJD Will
              </button>
              <button
                type="button"
                onClick={() => setHasUaeWill("none")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl border transition-all ${
                  hasUaeWill === "none"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-white text-[#374151] border-[#172228]/15 hover:border-[#172228]/40"
                }`}
              >
                No UAE Will Registered Yet
              </button>
            </div>
          </div>

          {/* Question 2 */}
          <div className="bg-white p-5 rounded-2xl border border-[#172228]/10">
            <label className="text-xs font-bold uppercase tracking-[0.12em] text-[#55636D] block mb-2.5">
              2. Assets Located in India
            </label>
            <div className="space-y-2 text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => setIndiaAssetType("property")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl border transition-all ${
                  indiaAssetType === "property"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-white text-[#374151] border-[#172228]/15 hover:border-[#172228]/40"
                }`}
              >
                House, Flat or Land in India
              </button>
              <button
                type="button"
                onClick={() => setIndiaAssetType("financial")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl border transition-all ${
                  indiaAssetType === "financial"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-white text-[#374151] border-[#172228]/15 hover:border-[#172228]/40"
                }`}
              >
                NRE/NRO Bank &amp; Shares Only
              </button>
            </div>
          </div>

          {/* Question 3 */}
          <div className="bg-white p-5 rounded-2xl border border-[#172228]/10">
            <label className="text-xs font-bold uppercase tracking-[0.12em] text-[#55636D] block mb-2.5">
              3. UAE Residency Category
            </label>
            <div className="space-y-2 text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => setVisaType("golden")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl border transition-all ${
                  visaType === "golden"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-white text-[#374151] border-[#172228]/15 hover:border-[#172228]/40"
                }`}
              >
                UAE Golden Visa / Investor
              </button>
              <button
                type="button"
                onClick={() => setVisaType("residence")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl border transition-all ${
                  visaType === "residence"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-white text-[#374151] border-[#172228]/15 hover:border-[#172228]/40"
                }`}
              >
                Standard Residence Visa
              </button>
            </div>
          </div>
        </div>

        {/* Diagnostic Output Card */}
        <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#C65378] mb-1">
              Your Customized Estate Strategy
            </div>
            <h4 className="text-lg font-semibold text-[#111827] mb-1.5">
              {recommendationTitle}
            </h4>
            <p className="text-sm leading-relaxed text-[#49585F]">
              {recommendationDetails}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/start"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] px-6 py-3.5 transition-all text-center"
            >
              <span>{recommendationAction}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-all text-center"
            >
              <span>Speak with Advocate</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
