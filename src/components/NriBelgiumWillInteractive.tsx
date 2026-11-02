"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Building2,
  Coins,
  Globe2,
  Scale,
  ShieldCheck,
  Gem,
} from "lucide-react";

interface NriBelgiumScenario {
  id: string;
  label: string;
  icon: "gem" | "globe" | "building" | "coins";
  heading: string; // Strictly <= 70 chars for Screaming Frog
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedInstrument: string;
  checklist: string[];
}

const NRI_BELGIUM_SCENARIOS: NriBelgiumScenario[] = [
  {
    id: "antwerp-diamond-syndicate",
    label: "Antwerp Diamond Trade",
    icon: "gem",
    heading: "Antwerp Diamond Families & Multi-Generation Business Wealth",
    challengeSummary:
      "Palanpuri Jain and Gujarati families in Antwerp run diamond firms. They own shares, trade dues, and stock in Mumbai and Surat. Without an Indian Will, business accounts freeze when a partner dies. Trade grinds to a halt.",
    legalMechanism:
      "A clear Indian Will names your true heirs. It covers company shares, Bharat Diamond Bourse offices, and firm stakes. It gives executors full power to sign trade papers and run bank accounts without court delay.",
    statutoryPrecedent:
      "Indian Succession Act 1925 s. 59 & Indian Partnership Act 1932 s. 42",
    recommendedInstrument:
      "Commercial Estate Will with Specific Corporate Share Bequests",
    checklist: [
      "List Bharat Diamond Bourse and Surat office commercial properties",
      "List private limited company shares and demat equity accounts",
      "Name business executors who understand the diamond trade",
    ],
  },
  {
    id: "belgian-forced-heirship-eu-choice",
    label: "Belgian Forced Heirship",
    icon: "globe",
    heading: "Belgian Civil Code Forced Heirship vs Indian Will Freedom",
    challengeSummary:
      "Belgian civil law gives children a fixed 50 percent share of your estate. This is forced heirship. NRIs in Brussels or Antwerp face forced asset splits unless they choose their national law in their Will.",
    legalMechanism:
      "Article 22 of EU Regulation 650/2012 lets Indian passport holders choose Indian law. Under Section 59 of the Indian Succession Act, you enjoy total freedom. You can leave your Indian wealth to anyone you wish.",
    statutoryPrecedent:
      "EU Regulation 650/2012 Art. 22 & Indian Succession Act 1925 s. 59",
    recommendedInstrument:
      "Indian Will with EU Brussels IV Article 22 Choice of Law Clause",
    checklist: [
      "Choose Indian succession law under EU Brussels IV rules",
      "Protect Indian land and flats from Belgian forced shares",
      "Share copies with your Belgian Notaire to keep both Wills in sync",
    ],
  },
  {
    id: "brussels-corporate-expats",
    label: "Brussels & Leuven Expats",
    icon: "building",
    heading: "Brussels Corporate Expats & Indian Urban Real Estate",
    challengeSummary:
      "Indian IT staff and consultants in Brussels, Ghent, and Leuven own flats in Bengaluru, Pune, and NCR. Foreign Belgian court orders cannot update land records in India directly. Indian registries need local papers.",
    legalMechanism:
      "A separate Indian Will lets city offices and housing societies update names fast. This avoids long probate cases in Indian High Courts. Your family saves time and money.",
    statutoryPrecedent:
      "Indian Succession Act 1925 s. 5 (Lex Situs) & State Mutation Rules",
    recommendedInstrument:
      "Standalone Indian Will for Urban Residential & Commercial Property",
    checklist: [
      "List sale deed numbers, survey plots, and society shares",
      "Name India-resident executors to visit local land registry offices",
      "Keep your Indian Will separate from your Belgian Will",
    ],
  },
  {
    id: "nre-nro-demat-investments",
    label: "NRE/NRO & Demat Claims",
    icon: "coins",
    heading: "Indian Bank Accounts, Demat Portfolios & RBI Repatriation",
    challengeSummary:
      "NRIs in Belgium hold NRE fixed deposits, mutual funds, and demat shares. Many think bank nominees become legal owners. Under Indian law, bank nominees act only as temporary caretakers.",
    legalMechanism:
      "The Supreme Court ruled in Sarbati Devi that nominees must give funds to legal heirs. An Indian Will names your true heirs. It speeds up bank claims and lets heirs send money abroad under RBI rules.",
    statutoryPrecedent:
      "Sarbati Devi Precedent (AIR 1984 SC 346) & RBI FEMA Master Direction 13",
    recommendedInstrument:
      "Financial Asset Schedule Will with Direct Nominee Demarcations",
    checklist: [
      "Record NRE, NRO, and FCNR account numbers with IFSC codes",
      "List NSDL and CDSL demat account numbers and folio details",
      "Use Form 15CA and 15CB to send money to your Belgian bank",
    ],
  },
];

export default function NriBelgiumWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("antwerp-diamond-syndicate");

  // Diagnostic State
  const [assetType, setAssetType] = useState<"diamond_business" | "urban_realty" | "financial_portfolios">(
    "diamond_business"
  );
  const [citizenshipStatus, setCitizenshipStatus] = useState<"indian_nri" | "belgian_oci">(
    "indian_nri"
  );
  const [dualWillPreference, setDualWillPreference] = useState<"separate_wills" | "single_will">(
    "separate_wills"
  );

  const activeScenario =
    NRI_BELGIUM_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_BELGIUM_SCENARIOS[0];

  return (
    <div className="w-full space-y-12">
      {/* Scenario Selector Section */}
      <div className="rounded-[28px] bg-white border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2">
            <Scale className="w-4 h-4" />
            <span>Interactive Estate Guidance</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-medium text-[#111827] tracking-tight mb-3">
            Common Cross-Border Estate Situations in Belgium
          </h3>
          <p className="text-[15px] leading-relaxed text-[#49585F]">
            Select your situation below. Learn how Indian laws, EU rules, and clean
            Will drafting protect your family wealth in India.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {NRI_BELGIUM_SCENARIOS.map((scenario) => {
            const isSelected = scenario.id === activeTab;
            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => setActiveTab(scenario.id)}
                className={`flex items-center gap-2.5 p-3.5 sm:p-4 rounded-2xl text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-[#172228] text-white border-[#172228] shadow-sm"
                    : "bg-[#FAF7F0] text-[#374151] border-[#172228]/10 hover:border-[#C65378]/40 hover:bg-white"
                }`}
              >
                {scenario.icon === "gem" && (
                  <Gem
                    className={`w-4 h-4 shrink-0 ${
                      isSelected ? "text-[#C65378]" : "text-[#55636D]"
                    }`}
                  />
                )}
                {scenario.icon === "globe" && (
                  <Globe2
                    className={`w-4 h-4 shrink-0 ${
                      isSelected ? "text-[#C65378]" : "text-[#55636D]"
                    }`}
                  />
                )}
                {scenario.icon === "building" && (
                  <Building2
                    className={`w-4 h-4 shrink-0 ${
                      isSelected ? "text-[#C65378]" : "text-[#55636D]"
                    }`}
                  />
                )}
                {scenario.icon === "coins" && (
                  <Coins
                    className={`w-4 h-4 shrink-0 ${
                      isSelected ? "text-[#C65378]" : "text-[#55636D]"
                    }`}
                  />
                )}
                <span className="truncate">{scenario.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Scenario Card */}
        <div className="rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[#172228]/10 mb-6">
            <div>
              <span className="inline-block text-[11px] font-bold uppercase tracking-[0.16em] text-[#C65378] mb-1.5">
                Statutory Blueprint &amp; Framework
              </span>
              <div className="text-xl sm:text-2xl font-semibold text-[#111827] leading-snug">
                {activeScenario.heading}
              </div>
            </div>
            <div className="shrink-0 bg-white px-4 py-2 rounded-full border border-[#172228]/10 text-xs font-semibold text-[#172228]">
              {activeScenario.statutoryPrecedent}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] mb-2">
                Cross-Border Legal Obstacle
              </div>
              <p className="text-[14px] leading-relaxed text-[#374151]">
                {activeScenario.challengeSummary}
              </p>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#047857] mb-2">
                Advocate Resolution Protocol
              </div>
              <p className="text-[14px] leading-relaxed text-[#374151]">
                {activeScenario.legalMechanism}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-[#172228]/10">
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#111827] mb-3">
              Essential Will Drafting Checklist
            </div>
            <ul className="space-y-2.5">
              {activeScenario.checklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13.5px] text-[#49585F]">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Cross-Border Estate Diagnostic Tool */}
      <div className="rounded-[28px] bg-white border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Interactive Legal Diagnostic</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-medium text-[#111827] tracking-tight mb-3">
            Belgium-India Cross-Border Estate Planner
          </h3>
          <p className="text-[15px] leading-relaxed text-[#49585F]">
            Answer three quick questions about your Indian assets and status in Belgium.
            See our direct legal advice below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Question 1 */}
          <div className="bg-[#FAF7F0] p-5 rounded-2xl border border-[#172228]/10">
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#C65378] mb-3">
              1. Primary Indian Asset Base
            </div>
            <div className="space-y-2">
              {[
                { key: "diamond_business", label: "Diamond Firm / Business Shares" },
                { key: "urban_realty", label: "Residential / Commercial Property" },
                { key: "financial_portfolios", label: "NRE/NRO Deposits & Demat Folios" },
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() =>
                    setAssetType(opt.key as "diamond_business" | "urban_realty" | "financial_portfolios")
                  }
                  className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-all border ${
                    assetType === opt.key
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-white text-[#374151] border-[#172228]/10 hover:border-[#C65378]/30"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="bg-[#FAF7F0] p-5 rounded-2xl border border-[#172228]/10">
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#C65378] mb-3">
              2. Belgian Residency / Passport
            </div>
            <div className="space-y-2">
              {[
                { key: "indian_nri", label: "Indian Passport Holder (NRI)" },
                { key: "belgian_oci", label: "Belgian Citizen (OCI / PIO Card)" },
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() =>
                    setCitizenshipStatus(opt.key as "indian_nri" | "belgian_oci")
                  }
                  className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-all border ${
                    citizenshipStatus === opt.key
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-white text-[#374151] border-[#172228]/10 hover:border-[#C65378]/30"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3 */}
          <div className="bg-[#FAF7F0] p-5 rounded-2xl border border-[#172228]/10">
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#C65378] mb-3">
              3. Desired Will Architecture
            </div>
            <div className="space-y-2">
              {[
                { key: "separate_wills", label: "Dual-Will Strategy (Recommended)" },
                { key: "single_will", label: "Single Worldwide Will" },
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() =>
                    setDualWillPreference(opt.key as "separate_wills" | "single_will")
                  }
                  className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-all border ${
                    dualWillPreference === opt.key
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-white text-[#374151] border-[#172228]/10 hover:border-[#C65378]/30"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Diagnostic Output Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#172228] text-[#FAF7F0] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C65378]">
              <span>Tailored Advisory Recommendation</span>
            </div>
            <div className="text-lg sm:text-xl font-semibold text-white">
              {dualWillPreference === "separate_wills"
                ? "Optimal Strategy: Standalone Indian Will with EU Article 22 Choice"
                : "Risk Alert: Single Worldwide Will Causes Indian Land Office Delays"}
            </div>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
              {dualWillPreference === "separate_wills"
                ? "Your Indian assets stay apart from your Belgian estate. This shields your Indian land and shares from Belgian forced heirship claims. It also stops probate delays."
                : "A single Belgian Will needs foreign probate translation and court legalization under Section 228 in India. This stalls property transfers for years."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] px-6 py-3.5 transition-all text-center"
            >
              <span>Book Lawyer Consult</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/start"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-[0.12em] px-6 py-3.5 transition-all border border-white/15 text-center"
            >
              <span>Start Online Intake</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
