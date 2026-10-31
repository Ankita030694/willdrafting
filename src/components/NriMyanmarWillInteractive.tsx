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

interface NriMyanmarScenario {
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

const NRI_MYANMAR_SCENARIOS: NriMyanmarScenario[] = [
  {
    id: "ancestral-tamil-bengal",
    label: "Yangon PIO: Ancestral Land",
    icon: "globe",
    heading: "Ancestral Land in Tamil Nadu, West Bengal or Bihar",
    challengeSummary:
      "Over 2 million Myanmar PIOs trace lineages to Tamil Nadu, Bengal, and Bihar. Colonial family deeds were often lost during 1962 events. Indian revenue officers demand clear lineage proof.",
    legalMechanism:
      "Under Bharatiya Sakshya Adhiniyam 2023 & Indian Succession Act ss. 370-388, family pedigree (Pedhinama/Kursinama) and thirty-year-old records establish legal heirship for revenue mutation.",
    statutoryPrecedent:
      "BSA 2023 ss. 26 & 92 (IEA ss. 32 & 90) & ISA 1925 ss. 370-388",
    recommendedInstrument:
      "Lineage-Affirmed Indian Will with Revenue Mutation Directive",
    checklist: [
      "Gather village survey numbers, ancient tax receipts, and family tree records",
      "Draft clear ring-fencing clauses to protect domestic Myanmar assets",
      "Name a trusted resident Indian executor or power of attorney holder",
    ],
  },
  {
    id: "mandalay-urban-property",
    label: "Mandalay Merchant: Urban Plots",
    icon: "building",
    heading: "Commercial & Residential Plots in Kolkata or Chennai",
    challengeSummary:
      "Families in Mandalay own heritage buildings, shops, or flats in Kolkata, Chennai, or Patna. Myanmar probate orders have no direct legal enforceability before Indian Sub-Registrars.",
    legalMechanism:
      "Under Section 5 of the Indian Succession Act 1925 (Lex Situs doctrine), Indian immovable property requires succession under Indian law. A separate Indian Will eliminates dual-probate court delays.",
    statutoryPrecedent:
      "Section 5 & Section 63 Indian Succession Act 1925",
    recommendedInstrument:
      "Bespoke NRI Indian Will with City Corporation Title Directives",
    checklist: [
      "Record municipal tax ward numbers, building holding numbers, and UDS shares",
      "Draft territorial exclusion clauses preserving domestic Myanmar estates",
      "Ensure plain-paper signing before two independent adult witnesses",
    ],
  },
  {
    id: "yangon-expat-accounts",
    label: "Yangon NRI: NRE & Demat",
    icon: "coins",
    heading: "NRE/NRO Fixed Deposits, Mutual Funds & Demat Portfolios",
    challengeSummary:
      "Indian professionals and business executives in Yangon hold NRE/NRO accounts, mutual funds, and Indian shares. Bank nominations do not confer absolute property ownership.",
    legalMechanism:
      "The Supreme Court ruled in Sarbati Devi that nominees act merely as custodial trustees for legal heirs. An explicit Indian Will enables smooth bank account transmission and RBI repatriation.",
    statutoryPrecedent:
      "Sarbati Devi Precedent & RBI FEMA Remittance Guidelines",
    recommendedInstrument:
      "Financial Asset Schedule Specifying NRE/NRO & CDSL/NSDL Demat Accounts",
    checklist: [
      "Document NRE/NRO account numbers, branch IFSC codes, and Demat IDs",
      "Name alternate beneficiaries to eliminate interstate court litigation",
      "Structure distribution for seamless Form 15CA and Form 15CB repatriation",
    ],
  },
  {
    id: "embassy-attestation-dual-will",
    label: "Yangon Embassy: Consular Will",
    icon: "landmark",
    heading: "Consular Attestation & Cross-Border Dual Will Strategy",
    challengeSummary:
      "NRIs and OCIs in Myanmar require ironclad evidentiary proof to satisfy Indian civil courts and Tehsildars without undertaking personal travel to India during political transitions.",
    legalMechanism:
      "Under Diplomatic and Consular Officers (Oaths and Fees) Act 1948, wills attested at the Embassy of India in Yangon or Consulate in Mandalay carry statutory presumption of authentic execution.",
    statutoryPrecedent:
      "Diplomatic & Consular Officers Act 1948 s. 3 & ISA 1925 s. 63",
    recommendedInstrument:
      "Consular-Attested Indian Will with Embassy Safe Custody Duplicate",
    checklist: [
      "Execute Will on plain paper in Yangon before two independent adult witnesses",
      "Book consular attestation slot at Embassy of India on Merchant Street",
      "Transmit sealed duplicates to Indian legal counsel for safe registry custody",
    ],
  },
];

export default function NriMyanmarWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("ancestral-tamil-bengal");

  // 3-Question Diagnostic State
  const [assetType, setAssetType] = useState<"ancestral" | "urban" | "financial">(
    "ancestral"
  );
  const [status, setStatus] = useState<"pio" | "nri">("pio");
  const [hasOriginalDeeds, setHasOriginalDeeds] = useState<"yes" | "no">("no");

  const currentScenario =
    NRI_MYANMAR_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_MYANMAR_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationDetails = "";
  let recommendationAction = "";

  if (assetType === "ancestral" && hasOriginalDeeds === "no") {
    recommendationTitle = "Ancestral Title Restoration & Lineage-Affirmed Will";
    recommendationDetails =
      "For missing colonial deeds, our advocates use genealogical records under BSA 2023 and apply for certified revenue copies in India before drafting your Will.";
    recommendationAction = "Restore Ancestral Title & Will";
  } else if (status === "pio" && assetType === "ancestral") {
    recommendationTitle = "PIO/OCI Ancestral Land Will with Mutation Directives";
    recommendationDetails =
      "Myanmar PIOs can lawfully inherit ancestral farm land under FEMA regulations. A dedicated Indian Will prevents unlawful village encroachments.";
    recommendationAction = "Draft Ancestral Land Will";
  } else if (assetType === "financial") {
    recommendationTitle = "Indian Will Specifying NRE/NRO & Demat Portfolios";
    recommendationDetails =
      "Indian banks demand a Will to release fixed deposits and shares. An Indian Will prevents account freezes and streamlines RBI 1 Million USD repatriation.";
    recommendationAction = "Secure Financial Assets";
  } else {
    recommendationTitle = "Standard NRI Indian Will with Ring-Fencing Clause";
    recommendationDetails =
      "Sign your Indian Will on plain paper before two witnesses in Yangon or Mandalay. No Indian stamp paper or travel to India is required under Section 63.";
    recommendationAction = "Draft Online Indian Will";
  }

  return (
    <section className="w-full mb-16 sm:mb-24">
      <div className="max-w-3xl mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <Globe2 className="w-4 h-4" />
          <span>Interactive Cross-Border Diagnostic</span>
        </div>
        <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
          Myanmar-India Estate Succession Diagnostic
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Explore real-life succession scenarios faced by Myanmar NRIs and PIOs
          with family properties in India. Review your personal profile or select
          a legal case below:
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
        {NRI_MYANMAR_SCENARIOS.map((scenario) => {
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
            Answer 3 quick questions about your Indian properties and family lineage to
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
                { val: "urban", label: "Urban Commercial / Flat" },
                { val: "financial", label: "NRE / NRO Bank & Shares" },
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
              2. Your Status in Myanmar
            </label>
            <div className="flex flex-col gap-2">
              {[
                { val: "pio", label: "Myanmar PIO / OCI Cardholder" },
                { val: "nri", label: "Indian Passport Holder (NRI)" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setStatus(opt.val as "pio" | "nri")}
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
              3. Original Indian Title Deeds
            </label>
            <div className="flex flex-col gap-2">
              {[
                { val: "no", label: "Lost / Only Colonial Genealogy" },
                { val: "yes", label: "Original Deeds / Patta Available" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setHasOriginalDeeds(opt.val as "yes" | "no")}
                  className={`px-3.5 py-2.5 rounded-xl text-xs text-left font-medium border transition-all cursor-pointer ${
                    hasOriginalDeeds === opt.val
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

        {/* Dynamic Diagnostic Output */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#CDAF73] mb-1 block">
              Diagnostic Legal Assessment
            </span>
            <h4 className="text-base sm:text-lg font-semibold text-white mb-1.5">
              {recommendationTitle}
            </h4>
            <p className="text-xs sm:text-[13px] text-gray-300 leading-relaxed">
              {recommendationDetails}
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer"
          >
            <span>{recommendationAction}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
