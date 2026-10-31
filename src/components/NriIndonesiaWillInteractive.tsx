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
  Scale,
} from "lucide-react";

interface NriIndonesiaScenario {
  id: string;
  label: string;
  icon: "globe" | "building" | "coins" | "landmark";
  heading: string;
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedInstrument: string;
  checklist: string[];
}

const NRI_INDONESIA_SCENARIOS: NriIndonesiaScenario[] = [
  {
    id: "jakarta-sindhi-business-assets",
    label: "Sindhi Businesses & City Flats",
    icon: "building",
    heading: "Sindhi Family Businesses & Real Estate in Delhi, Mumbai or Pune",
    challengeSummary:
      "Sindhi families in Jakarta, Sunter, and Surabaya own flats and shops in Mumbai, Pune, or Delhi. Without an Indian Will, local housing societies pause name transfers. They ask for court orders.",
    legalMechanism:
      "Section 59 of the Indian Succession Act gives total freedom over self-made wealth. An Indian Will allows fast society share transfer. It enables city record updates without court probate.",
    statutoryPrecedent:
      "Indian Succession Act 1925 ss. 5, 59 & State Co-operative Societies Acts",
    recommendedInstrument:
      "Indian Will with Specific Flat Demarcations & Society Transmission Clauses",
    checklist: [
      "State flat numbers, floor borders, and undivided land shares (UDS)",
      "Attach registered sale deeds and city property tax IDs",
      "Name a trusted Indian resident agent for local land office visits",
    ],
  },
  {
    id: "medan-tamil-ancestral-holdings",
    label: "Medan Tamils & South India Land",
    icon: "globe",
    heading: "Tamil Families in Medan & Ancestral Land Across Tamil Nadu",
    challengeSummary:
      "Tamil families in Medan and Sumatra own ancestral plots in Chennai, Madurai, or Thanjavur. Local revenue officers ask for clear proof when heirs live abroad. They require formal documents.",
    legalMechanism:
      "Under Section 5 of the Indian Succession Act (Lex Situs), Indian soil follows Indian law only. An Indian Will drafted under Indian personal succession acts prevents local relatives from seizing property or claiming adverse possession.",
    statutoryPrecedent:
      "Lex Situs Rule & Tamil Nadu Patta Pass Book Act 1983",
    recommendedInstrument:
      "Indian Will with Patta Survey Numbers & Agricultural Boundaries",
    checklist: [
      "List exact Survey Numbers, Patta entries, and four-side borders",
      "Set undivided family shares to prevent court partition fights",
      "Name trusted agents for local Tehsil land record filings",
    ],
  },
  {
    id: "civil-code-forced-heirship",
    label: "Civil Code & Dual-Will Strategy",
    icon: "landmark",
    heading: "Indonesian Civil Code (BW Book II) Forced Heirship Ring-Fencing",
    challengeSummary:
      "Under the Indonesian Civil Code, forced heirship limits will freedom for local assets. One worldwide will risks putting Indian wealth under foreign forced shares. It creates probate gridlock.",
    legalMechanism:
      "A two-will plan keeps each country separate. Your Indonesian will covers local assets. Your Indian Will covers Indian homes, flats, and bank funds without clashes. Both instruments work smoothly.",
    statutoryPrecedent:
      "Indonesian Civil Code Arts. 913-916 vs Indian Succession Act 1925 s. 5",
    recommendedInstrument:
      "Territorially Ring-Fenced Indian Will with Foreign Non-Revocation Clause",
    checklist: [
      "Add clear foreign asset exclusions and border ring-fencing terms",
      "Ensure both Wills never cancel or clash with each other",
      "Sign on plain A4 paper before two neutral adult witnesses",
    ],
  },
  {
    id: "cross-border-banking-repatriation",
    label: "NRE/NRO & FEMA Repatriation",
    icon: "coins",
    heading: "NRE/NRO Bank Accounts, Demat Shares & $1 Million USD Repatriation",
    challengeSummary:
      "Expats in Jakarta, Bali, and Surabaya hold NRE and NRO bank deposits in India. Many people think bank nominees become true owners upon death. That is a costly mistake.",
    legalMechanism:
      "In Sarbati Devi, the Supreme Court ruled nominees are only caretakers. Without an Indian Will, banks freeze funds. Under FEMA, heirs can send up to 1 Million USD abroad yearly. A Will keeps funds flowing.",
    statutoryPrecedent:
      "Sarbati Devi Precedent (AIR 1984 SC 346) & RBI Remittance of Assets Regulations",
    recommendedInstrument:
      "Indian Will Naming Bank Folios with FEMA Form 15CA/15CB Transmission Protocol",
    checklist: [
      "List NRE, NRO, and savings accounts with bank branch IFSC codes",
      "Record Demat Client IDs with NSDL or CDSL and mutual fund folios",
      "Name trusted agents for Form 15CA and 15CB tax remittance clearance",
    ],
  },
];

export default function NriIndonesiaWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("jakarta-sindhi-business-assets");

  // 3-Question Cross-Border Diagnostic State
  const [assetType, setAssetType] = useState<"urban_commercial" | "ancestral_land" | "financial_liquid">(
    "urban_commercial"
  );
  const [indonesianHolding, setIndonesianHolding] = useState<"hak_pakai_pma" | "pure_indian_assets">(
    "hak_pakai_pma"
  );
  const [hasIndonesianWill, setHasIndonesianWill] = useState<"yes" | "no">("yes");

  const currentScenario =
    NRI_INDONESIA_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_INDONESIA_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationSummary = "";
  let actionPoints: string[] = [];

  if (assetType === "urban_commercial") {
    recommendationTitle = "Urban Flat & Commercial Shop Protection Plan";
    recommendationSummary =
      "For flats and shops in Indian cities, your Indian Will should name local agents. They help with fast city tax and flat society updates.";
    actionPoints = [
      "List flat numbers, floor borders, and undivided land shares (UDS)",
      "Set clear gift shares to prevent family inheritance fights",
      "Sign your Will in Indonesia on plain paper with two witnesses",
    ];
  } else if (assetType === "ancestral_land") {
    recommendationTitle = "Ancestral Land & Village Revenue Protection Plan";
    recommendationSummary =
      "Because you own ancestral plots in India, your Will needs exact Patta and survey numbers. This stops relatives from making false claims.";
    actionPoints = [
      "Record exact Survey and Patta numbers with village land offices",
      "State clear rights under Indian succession acts to stop disputes",
      "Sign your Will before two neutral adult witnesses who are not heirs",
    ];
  } else {
    recommendationTitle = "Liquid Banking & Mutual Fund Transmission Plan";
    recommendationSummary =
      "For NRE and NRO accounts, a Will is vital. Nominees act only as caretakers under the Supreme Court Sarbati Devi ruling.";
    actionPoints = [
      "List bank branch IFSC codes and Demat IDs with NSDL or CDSL",
      "Guide heirs on Form 15CA and Form 15CB money transfer rules",
      "Spare your family from long and costly civil court battles",
    ];
  }

  return (
    <div className="w-full my-12 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
        <Scale className="w-4 h-4 text-[#C65378]" />
        <span>Indo-Indonesian Succession Assessment Framework</span>
      </div>

      <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-3">
        Interactive Succession Planner for NRIs in Indonesia
      </h3>

      <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F] mb-8 max-w-3xl">
        Pick your asset type and city below to check legal risks, Civil Code rules, and drafting steps under Indian law:
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 pb-6 mb-8 border-b border-[#172228]/10">
        {NRI_INDONESIA_SCENARIOS.map((sc) => {
          const isActive = sc.id === activeTab;
          return (
            <button
              key={sc.id}
              type="button"
              onClick={() => setActiveTab(sc.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#172228] text-white shadow-xs"
                  : "bg-[#FAF7F0] text-[#49585F] hover:bg-[#F4EFE6] hover:text-[#172228] border border-[#172228]/10"
              }`}
            >
              {sc.icon === "globe" && <Globe2 className="w-3.5 h-3.5" />}
              {sc.icon === "building" && <Building2 className="w-3.5 h-3.5" />}
              {sc.icon === "coins" && <Coins className="w-3.5 h-3.5" />}
              {sc.icon === "landmark" && <Landmark className="w-3.5 h-3.5" />}
              <span>{sc.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Scenario Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        <div className="lg:col-span-7 bg-[#FAF7F0] rounded-[24px] p-6 sm:p-8 border border-[#172228]/10 flex flex-col justify-between">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-2">
              Cross-Border Case Analysis
            </span>
            <h4 className="text-xl font-semibold text-[#111827] mb-3 leading-snug">
              {currentScenario.heading}
            </h4>
            <div className="space-y-4 text-xs sm:text-[14px] leading-[1.68] text-[#374151]">
              <p>
                <strong className="text-[#111827]">Legal Bottleneck: </strong>
                {currentScenario.challengeSummary}
              </p>
              <p>
                <strong className="text-[#111827]">Statutory Framework: </strong>
                {currentScenario.legalMechanism}
              </p>
              <div className="p-3.5 rounded-xl bg-white border border-[#172228]/10 text-xs text-[#55636D]">
                <strong className="text-[#111827]">Statutory Precedent: </strong>
                {currentScenario.statutoryPrecedent}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#172228]/10">
            <span className="block text-xs font-semibold uppercase tracking-wider text-[#55636D] mb-1">
              Recommended Legal Strategy
            </span>
            <p className="text-sm font-bold text-[#047857]">
              {currentScenario.recommendedInstrument}
            </p>
          </div>
        </div>

        {/* Action Checklist Box */}
        <div className="lg:col-span-5 bg-white rounded-[24px] p-6 sm:p-8 border border-[#172228]/10 shadow-xs flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-semibold text-[#111827] mb-3">
              Essential Legal Checklist
            </h4>
            <p className="text-xs text-[#55636D] mb-4">
              Steps to ensure complete statutory compliance in India:
            </p>
            <ul className="space-y-3 text-xs sm:text-[13.5px] text-[#374151]">
              {currentScenario.checklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 mt-6 border-t border-[#172228]/10 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-wider transition-colors text-center"
            >
              <span>Consult Advocate</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/start"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-full bg-[#172228] hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-colors text-center"
            >
              <span>Draft Online Will</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3-Question Diagnostic Assessment Section */}
      <div className="pt-8 border-t border-[#172228]/10">
        <div className="max-w-2xl mb-6">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] block mb-1">
            Personalized Diagnostic Tool
          </span>
          <h4 className="text-xl font-semibold text-[#111827]">
            Evaluate Your Indo-Indonesian Estate Protection Needs
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Question 1 */}
          <div className="bg-[#FAF7F0] p-5 rounded-2xl border border-[#172228]/10">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-2.5">
              1. Primary Asset in India
            </label>
            <select
              value={assetType}
              onChange={(e) => setAssetType(e.target.value as "urban_commercial" | "ancestral_land" | "financial_liquid")}
              className="w-full bg-white text-xs sm:text-[13px] font-medium text-[#111827] border border-[#172228]/20 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
            >
              <option value="urban_commercial">City Apartment or Commercial Shop</option>
              <option value="ancestral_land">Ancestral Land or Farmland</option>
              <option value="financial_liquid">NRE/NRO Bank Accounts &amp; Demat</option>
            </select>
          </div>

          {/* Question 2 */}
          <div className="bg-[#FAF7F0] p-5 rounded-2xl border border-[#172228]/10">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-2.5">
              2. Indonesian Holding Profile
            </label>
            <select
              value={indonesianHolding}
              onChange={(e) => setIndonesianHolding(e.target.value as "hak_pakai_pma" | "pure_indian_assets")}
              className="w-full bg-white text-xs sm:text-[13px] font-medium text-[#111827] border border-[#172228]/20 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
            >
              <option value="hak_pakai_pma">Hak Pakai, HGB or PT PMA Shares</option>
              <option value="pure_indian_assets">Pure Indian Estate Retained</option>
            </select>
          </div>

          {/* Question 3 */}
          <div className="bg-[#FAF7F0] p-5 rounded-2xl border border-[#172228]/10">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-2.5">
              3. Existing Indonesian Will
            </label>
            <select
              value={hasIndonesianWill}
              onChange={(e) => setHasIndonesianWill(e.target.value as "yes" | "no")}
              className="w-full bg-white text-xs sm:text-[13px] font-medium text-[#111827] border border-[#172228]/20 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
            >
              <option value="yes">Yes (Need Dual-Will Isolation)</option>
              <option value="no">No (Creating First Will)</option>
            </select>
          </div>
        </div>

        {/* Diagnostic Output Card */}
        <div className="p-6 rounded-2xl bg-[#172228] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C65378] block mb-1">
              Assessment Recommendation
            </span>
            <h4 className="text-lg font-semibold mb-2">
              {recommendationTitle}
            </h4>
            <p className="text-xs sm:text-[13.5px] text-[#A8B8C0] leading-relaxed max-w-2xl mb-3">
              {recommendationSummary}
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-[#E07090]">
              {actionPoints.map((pt, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-white/90">
                  <CheckCircle2 className="w-3 h-3 text-[#047857]" />
                  <span>{pt}</span>
                </span>
              ))}
            </div>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 transition-colors shrink-0"
          >
            <span>Get Advocate Advice</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
