"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Landmark,
  Coins,
  Globe2,
} from "lucide-react";

interface NriSingaporeScenario {
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

const NRI_SINGAPORE_SCENARIOS: NriSingaporeScenario[] = [
  {
    id: "tanjong-rhu-condo-nri",
    label: "Central / East Coast: Realty",
    icon: "building",
    heading: "Singapore Condos & Indian Real Estate Portfolios",
    challengeSummary:
      "Expats living in Tanjong Rhu, Marine Parade, or Bukit Timah own private condominiums in Singapore and residential apartments in Gurgaon, Bengaluru, or Mumbai. A single Singapore Will cannot transfer Indian land directly.",
    legalMechanism:
      "Lex Situs under Section 5 of the Indian Succession Act, 1925 mandates Indian succession laws for Indian properties. A dedicated Indian Will ring-fences Singapore real estate and prevents lengthy probate delays.",
    statutoryPrecedent:
      "Section 5 ISA 1925 & Lex Situs Real Property Doctrine",
    recommendedInstrument:
      "Standalone Indian Will with Singapore Asset Ring-Fencing",
    checklist: [
      "Specify survey numbers, floor details, and undivided land shares (UDS)",
      "Insert express ring-fencing clauses excluding Singapore real estate",
      "Appoint a reliable Indian resident executor to handle local land offices",
    ],
  },
  {
    id: "cpf-demat-finance",
    label: "Singapore CPF & Indian Demat",
    icon: "coins",
    heading: "Singapore CPF Savings & Indian Demat Account Succession",
    challengeSummary:
      "NRIs often believe a Will can dispose of Singapore Central Provident Fund (CPF) savings. Under Singapore law, CPF monies do NOT pass via a Will. In India, bank nominees do not become legal owners.",
    legalMechanism:
      "The Singapore CPF Act requires an explicit CPF Nomination with the CPF Board. In India, the Supreme Court ruled in Sarbati Devi that nominees are mere trustees. An Indian Will directly names legal heirs for NRE/NRO and demats.",
    statutoryPrecedent:
      "Singapore CPF Act & Sarbati Devi (1984 AIR 346)",
    recommendedInstrument:
      "Coordinated Singapore CPF Nomination & Indian Demat Will",
    checklist: [
      "File a formal Singapore CPF Nomination online via Singpass",
      "Detail 16-digit Demat Client IDs with NSDL or CDSL depositories",
      "List NRE and NRO account numbers with branch IFSC codes",
    ],
  },
  {
    id: "oci-ancestral-farmland",
    label: "Jurong / OCI: Farmland",
    icon: "globe",
    heading: "Ancestral Agricultural Land in Punjab, Kerala or Tamil Nadu",
    challengeSummary:
      "Long-term Singapore citizens of Indian origin (OCIs) often inherit ancestral agricultural holdings in India, worrying that foreign citizenship prevents them from claiming farmlands.",
    legalMechanism:
      "Under FEMA 1999 regulations, OCIs can legally inherit agricultural land and farmhouses from Indian residents. Plain-paper Indian Wills under Section 63 allow swift revenue mutation without court suits.",
    statutoryPrecedent:
      "FEMA 1999 Reg 3(1)(b) & Section 63 ISA 1925",
    recommendedInstrument:
      "Plain-Paper Indian Will with Revenue Mutation Protocol",
    checklist: [
      "Review ancestral land records, patta, and fard jamabandi extracts",
      "Appoint a local family representative or Power of Attorney for SRO",
      "Prepare clear distribution schedules to prevent family partition disputes",
    ],
  },
  {
    id: "dual-will-resealing",
    label: "HNW: Dual Will & Resealing",
    icon: "landmark",
    heading: "Singapore-India Dual Wills & High Court Resealing Avoidance",
    challengeSummary:
      "High-net-worth families with business assets in Singapore and commercial properties in India face multi-year court freezes if they attempt to reseal a Singapore Grant of Probate in Indian High Courts under Section 228.",
    legalMechanism:
      "Dual concurrent Wills operate independently. The Singapore Will applies solely to Singapore assets. The Indian Will acts solely in India without waiting for foreign court orders or apostille procedures.",
    statutoryPrecedent:
      "Singapore Wills Act (Cap 352) & Section 228 ISA 1925",
    recommendedInstrument:
      "Concurrent Dual Wills with Mutual Non-Revocation Recitals",
    checklist: [
      "Harmonize execution dates to avoid accidental revocation clauses",
      "Retain independent witnesses not named as beneficiaries under Section 10",
      "Opt for consular attestation at High Commission of India at 31 Grange Road",
    ],
  },
];

export default function NriSingaporeWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("tanjong-rhu-condo-nri");

  // 3-Question Cross-Border Diagnostic State
  const [assetType, setAssetType] = useState<"urban" | "cpf" | "ancestral">("urban");
  const [status, setStatus] = useState<"nri" | "oci">("nri");
  const [hasSingaporeWill, setHasSingaporeWill] = useState<"yes" | "no">("yes");

  const currentScenario =
    NRI_SINGAPORE_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_SINGAPORE_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationDetails = "";
  let recommendationAction = "";

  if (assetType === "ancestral" && status === "oci") {
    recommendationTitle = "OCI Farmland Inheritance & Indian Will Structuring";
    recommendationDetails =
      "As a Singapore OCI, you can lawfully inherit agricultural land under FEMA regulations. You need an Indian Will with clear survey demarcations to prevent village mutation disputes.";
    recommendationAction = "Protect Ancestral Land";
  } else if (hasSingaporeWill === "yes" && assetType === "urban") {
    recommendationTitle = "Dedicated Indian Will with Singapore Asset Ring-Fencing";
    recommendationDetails =
      "A Singapore Will cannot transfer Indian apartments directly and triggers costly Section 228 High Court petitions. Our advocates draft an Indian Will that leaves your Singapore assets untouched.";
    recommendationAction = "Ring-Fence Singapore Assets";
  } else if (assetType === "cpf") {
    recommendationTitle = "Singapore CPF Nomination & Indian Demat Testamentary Plan";
    recommendationDetails =
      "Singapore CPF savings require a direct CPF Board nomination, while Indian bank accounts and demats require an Indian Will. Nominees are only trustees under the Sarbati Devi precedent.";
    recommendationAction = "Coordinate CPF & Indian Demat";
  } else {
    recommendationTitle = "Standard NRI Indian Will under Section 63 ISA";
    recommendationDetails =
      "As an Indian citizen in Singapore, you can execute your Indian Will on plain paper before two witnesses. No Indian stamp paper or travel to India is required.";
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
          Singapore-India Estate Succession Diagnostic
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Explore typical succession scenarios faced by Singapore NRIs and OCIs
          with assets in India. Compare your personal profile or select a legal
          case below:
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
        {NRI_SINGAPORE_SCENARIOS.map((scenario) => {
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
                  {scenario.icon === "globe" && <Globe2 className="w-4 h-4 text-inherit" />}
                  {scenario.icon === "building" && <Building2 className="w-4 h-4 text-inherit" />}
                  {scenario.icon === "coins" && <Coins className="w-4 h-4 text-inherit" />}
                  {scenario.icon === "landmark" && <Landmark className="w-4 h-4 text-inherit" />}
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

      {/* Selected Scenario Panel */}
      <div className="bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 mb-6 border-b border-[#172228]/10">
          <div>
            <span className="inline-block text-[11px] font-bold tracking-[0.16em] uppercase text-[#C65378] mb-2">
              Cross-Border Case Analysis
            </span>
            <h4 className="text-xl sm:text-2xl font-medium text-[#111827] leading-snug mb-3">
              {currentScenario.heading}
            </h4>
            <p className="text-[14.5px] leading-[1.65] text-[#49585F] max-w-3xl">
              {currentScenario.challengeSummary}
            </p>
          </div>
          <div className="shrink-0 flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D]">
              Recommended Instrument
            </span>
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#5F7E75]/10 text-[#2C5248] border border-[#5F7E75]/25">
              {currentScenario.recommendedInstrument}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10">
            <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#C65378] mb-2">
              Legal Mechanism &amp; Indian Law
            </span>
            <p className="text-[13.5px] leading-[1.65] text-[#374151]">
              {currentScenario.legalMechanism}
            </p>
            <div className="mt-3 pt-3 border-t border-[#172228]/10 text-xs text-[#55636D]">
              <strong>Governing Rule:</strong> {currentScenario.statutoryPrecedent}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10">
            <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#C65378] mb-2">
              Statutory Checklist for NRIs
            </span>
            <ul className="space-y-2 text-[13px] text-[#374151]">
              {currentScenario.checklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#047857] mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <span className="text-xs text-[#55636D]">
            Need advice tailored to your Singapore residence and Indian properties?
          </span>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] px-6 py-3 transition-colors"
          >
            <span>Consult Cross-Border Advocate</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 3-Step Interactive Diagnostic Filter */}
      <div className="bg-[#172228] text-white rounded-[28px] p-6 sm:p-8">
        <div className="max-w-2xl mb-6">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-2">
            Instant Succession Diagnostic
          </span>
          <h4 className="text-xl sm:text-2xl font-medium text-white mb-2">
            Calculate Your Cross-Border Will Requirement
          </h4>
          <p className="text-xs sm:text-[13px] text-white/70 leading-relaxed">
            Select your Indian asset profile and residency status to reveal the exact
            statutory framework needed under Singapore and Indian succession laws:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {/* Question 1 */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <label className="block text-xs font-semibold text-white/90 mb-2.5">
              1. Primary Indian Asset Type
            </label>
            <div className="space-y-2">
              {[
                { id: "urban", label: "Flats & Commercial Realty" },
                { id: "cpf", label: "CPF + NRE / Demats" },
                { id: "ancestral", label: "Farmland & Ancestral Home" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAssetType(opt.id as "urban" | "cpf" | "ancestral")}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    assetType === opt.id
                      ? "bg-[#C65378] text-white font-semibold"
                      : "bg-white/10 text-white/80 hover:bg-white/15"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <label className="block text-xs font-semibold text-white/90 mb-2.5">
              2. Singapore Residency Status
            </label>
            <div className="space-y-2">
              {[
                { id: "nri", label: "NRI (Indian Passport / EP / PR)" },
                { id: "oci", label: "OCI (Singapore Citizen)" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setStatus(opt.id as "nri" | "oci")}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    status === opt.id
                      ? "bg-[#C65378] text-white font-semibold"
                      : "bg-white/10 text-white/80 hover:bg-white/15"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3 */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <label className="block text-xs font-semibold text-white/90 mb-2.5">
              3. Existing Singapore Will
            </label>
            <div className="space-y-2">
              {[
                { id: "yes", label: "Yes (Singapore Will in place)" },
                { id: "no", label: "No (No Will drafted yet)" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setHasSingaporeWill(opt.id as "yes" | "no")}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    hasSingaporeWill === opt.id
                      ? "bg-[#C65378] text-white font-semibold"
                      : "bg-white/10 text-white/80 hover:bg-white/15"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Diagnostic Output */}
        <div className="p-5 rounded-2xl bg-white/10 border border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#C65378] mb-1">
              Diagnostic Result
            </span>
            <div className="text-base font-semibold text-white mb-1">
              {recommendationTitle}
            </div>
            <p className="text-xs sm:text-[13px] text-white/80 max-w-2xl leading-relaxed">
              {recommendationDetails}
            </p>
          </div>
          <Link
            href="/start"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#172228] hover:bg-[#C65378] hover:text-white text-xs font-bold uppercase tracking-[0.12em] px-6 py-3.5 transition-colors shrink-0"
          >
            <span>{recommendationAction}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
