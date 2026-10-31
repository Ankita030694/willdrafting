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

interface NriQatarScenario {
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

const NRI_QATAR_SCENARIOS: NriQatarScenario[] = [
  {
    id: "doha-corporate-real-estate",
    label: "Doha & Lusail: Real Estate",
    icon: "building",
    heading: "Doha & Lusail Expats with Flats in Mumbai, Delhi or Bangalore",
    challengeSummary:
      "Executives and corporate leaders in Doha, West Bay, and Lusail invest primary family savings in Indian residential and commercial property. Under Qatar laws, local wills cannot transfer Indian real estate.",
    legalMechanism:
      "Section 5 of the Indian Succession Act, 1925 enforces the Lex Situs rule. Indian immovable properties follow Indian succession law only. A dedicated Indian Will prevents costly court disputes and probate hurdles.",
    statutoryPrecedent:
      "Section 5 Indian Succession Act 1925 & Lex Situs",
    recommendedInstrument:
      "Dedicated Indian Will with Qatar Asset Ring-Fencing",
    checklist: [
      "Include survey numbers, floor dimensions, and undivided land share",
      "Insert ring-fencing clauses limiting the Will strictly to Indian assets",
      "Appoint an adult executor residing in India to handle property mutation",
    ],
  },
  {
    id: "al-rayyan-energy-nre",
    label: "Al Rayyan: NRE & Demat Portfolios",
    icon: "coins",
    heading: "NRE/NRO Bank Fixed Deposits, Mutual Funds & Demat Portfolios",
    challengeSummary:
      "Professionals across Al Rayyan and Ras Laffan hold significant wealth in NRE and NRO bank accounts, shares, and mutual funds. Bank nominees act only as temporary trustees upon demise.",
    legalMechanism:
      "In Sarbati Devi, the Supreme Court ruled that bank nominees are merely trustees, not absolute owners. Without an Indian Will, bank branches in India freeze accounts until heirs obtain a succession certificate.",
    statutoryPrecedent:
      "Sarbati Devi Precedent & RBI Master Direction",
    recommendedInstrument:
      "Indian Will Specifying Bank Branches & Demat Folios",
    checklist: [
      "Record NRE and NRO account numbers with bank IFSC codes",
      "List 16-digit Demat Client IDs with NSDL or CDSL depositories",
      "Structure fund transfers under RBI's USD 1 Million repatriation scheme",
    ],
  },
  {
    id: "muslim-wasiyat-qatar",
    label: "Muslim NRIs: Wasiyat & Shariat",
    icon: "landmark",
    heading: "Muslim Personal Law Shariat Act 1937 & Qatar Civil Code Rules",
    challengeSummary:
      "Muslim NRIs residing in Qatar often seek to bequeath specific assets to charities or non-heirs while ensuring full harmony with Islamic inheritance jurisprudence.",
    legalMechanism:
      "Under the Muslim Personal Law (Shariat) Application Act, 1937, an Indian Muslim testator can bequeath up to one-third of their net estate via Wasiyat. Distributing more than one-third requires unanimous consent from legal heirs.",
    statutoryPrecedent:
      "Muslim Personal Law (Shariat) Application Act 1937",
    recommendedInstrument:
      "Shariah-Compliant Indian Wasiyat with Heir Allocation",
    checklist: [
      "Limit discretionary gifts strictly to the one-third bequeathable quota",
      "Detail primary Quranic heirs (Sharers and Residuaries) precisely",
      "Incorporate post-mortem heir consent clauses for custom distributions",
    ],
  },
  {
    id: "al-wakrah-ancestral-farmland",
    label: "Al Wakrah: Ancestral Land",
    icon: "globe",
    heading: "Ancestral Agricultural Land in Kerala, Telangana, Punjab or UP",
    challengeSummary:
      "Long-term Indian families in Al Wakrah and Doha frequently inherit ancestral farmland, groves, or plantation estates across India, fearing NRI regulations bar ownership.",
    legalMechanism:
      "Under FEMA 1999 regulations, NRIs and OCIs can lawfully inherit agricultural land and farmhouses from resident Indians through a testamentary Will. Inheriting agricultural land is 100% legal.",
    statutoryPrecedent:
      "FEMA 1999 Reg 3(1)(b) & Section 63 Succession Act",
    recommendedInstrument:
      "Plain-Paper Indian Will with Mutation Protocols",
    checklist: [
      "Verify village revenue records, jamabandi, and land patta documents",
      "Sign before two adult independent witnesses in Qatar",
      "Complete consular notarization at the Embassy of India in Doha",
    ],
  },
];

export default function NriQatarWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("doha-corporate-real-estate");

  // 3-Question Cross-Border Diagnostic State
  const [successionLaw, setSuccessionLaw] = useState<"secular" | "muslim">("secular");
  const [indiaAssetType, setIndiaAssetType] = useState<"property" | "financial">(
    "property"
  );
  const [cityHub, setCityHub] = useState<"doha" | "al-rayyan" | "al-wakrah">("doha");

  const currentScenario =
    NRI_QATAR_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_QATAR_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationDetails = "";
  let recommendationAction = "";

  if (successionLaw === "muslim") {
    recommendationTitle = "Shariah-Compliant Wasiyat with 1/3rd Allocation Clause";
    recommendationDetails =
      "Your Indian estate follows the Muslim Personal Law (Shariat) Application Act, 1937. You can bequeath up to one-third of your estate to non-heirs or charities, with two-thirds distributed among Quranic heirs.";
    recommendationAction = "Draft Islamic Wasiyat";
  } else if (indiaAssetType === "property") {
    recommendationTitle = "Indian Will with Qatar Ring-Fencing & Lex Situs Protection";
    recommendationDetails =
      "Indian flats and ancestral land follow Section 5 of the Indian Succession Act, 1925. A separate Indian Will drafted by High Court advocates ensures seamless local revenue mutation.";
    recommendationAction = "Draft Separate Indian Will";
  } else if (indiaAssetType === "financial") {
    recommendationTitle = "Indian Will Covering NRE/NRO Deposits & Demat Portfolios";
    recommendationDetails =
      "Indian banks and mutual fund houses require a valid Indian Will to release funds without succession certificate delays. Our draft names your heirs and covers FEMA USD 1M repatriation.";
    recommendationAction = "Protect Banking & Demat Assets";
  } else {
    recommendationTitle = "Consular Plain-Paper Indian Will under Section 63";
    recommendationDetails =
      "Sign your Indian Will on plain A4 paper in Qatar before two adult witnesses. You do not need Indian stamp paper or travel to India, and you can attest it at the Embassy of India in Doha.";
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
          Explore Qatar-India Will Strategies by Asset Profile
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Planning your estate across borders means balancing Qatar expat rules with the Indian Succession Act, 1925. Choose your profile below to review the governing laws, pitfalls, and practical steps:
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-8 pb-2 border-b border-[#172228]/10">
        {NRI_QATAR_SCENARIOS.map((scenario) => {
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
                The Practical Challenge in Qatar
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
                Qatar-India Execution Checklist
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
                <span>Consult Senior Advocate</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Question Cross-Border Diagnostic Selector */}
      <div className="bg-[#FAF7F0] rounded-[28px] border border-[#172228]/10 p-6 sm:p-9">
        <div className="max-w-2xl mb-6">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] block mb-1">
            Personalized Estate Audit
          </span>
          <h3 className="text-xl sm:text-2xl font-medium text-[#111827] mb-2">
            30-Second Cross-Border Succession Diagnostic
          </h3>
          <p className="text-sm text-[#49585F]">
            Answer three quick questions to identify the legal roadmap for your assets:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Question 1: Succession Regime */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#55636D] block mb-2">
              1. Personal Law Regime
            </span>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setSuccessionLaw("secular")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-medium transition-all ${
                  successionLaw === "secular"
                    ? "bg-[#172228] text-white"
                    : "bg-[#FAF7F0] text-[#49585F] hover:bg-[#172228]/5"
                }`}
              >
                Secular / Hindu / Christian (ISA 1925)
              </button>
              <button
                type="button"
                onClick={() => setSuccessionLaw("muslim")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-medium transition-all ${
                  successionLaw === "muslim"
                    ? "bg-[#172228] text-white"
                    : "bg-[#FAF7F0] text-[#49585F] hover:bg-[#172228]/5"
                }`}
              >
                Muslim Personal Law (Shariat 1937)
              </button>
            </div>
          </div>

          {/* Question 2: Primary Asset Type */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#55636D] block mb-2">
              2. Major Indian Asset Class
            </span>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setIndiaAssetType("property")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-medium transition-all ${
                  indiaAssetType === "property"
                    ? "bg-[#172228] text-white"
                    : "bg-[#FAF7F0] text-[#49585F] hover:bg-[#172228]/5"
                }`}
              >
                Flats, Plots &amp; Farmland
              </button>
              <button
                type="button"
                onClick={() => setIndiaAssetType("financial")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-medium transition-all ${
                  indiaAssetType === "financial"
                    ? "bg-[#172228] text-white"
                    : "bg-[#FAF7F0] text-[#49585F] hover:bg-[#172228]/5"
                }`}
              >
                NRE FDs, Demat &amp; Mutual Funds
              </button>
            </div>
          </div>

          {/* Question 3: Qatar Location Hub */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#55636D] block mb-2">
              3. Qatar Metropolitan Base
            </span>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setCityHub("doha")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-medium transition-all ${
                  cityHub === "doha"
                    ? "bg-[#172228] text-white"
                    : "bg-[#FAF7F0] text-[#49585F] hover:bg-[#172228]/5"
                }`}
              >
                Doha, West Bay &amp; Lusail
              </button>
              <button
                type="button"
                onClick={() => setCityHub("al-rayyan")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-medium transition-all ${
                  cityHub === "al-rayyan"
                    ? "bg-[#172228] text-white"
                    : "bg-[#FAF7F0] text-[#49585F] hover:bg-[#172228]/5"
                }`}
              >
                Al Rayyan &amp; Ras Laffan Hubs
              </button>
            </div>
          </div>
        </div>

        {/* Diagnostic Output Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C65378]">
              Recommended Succession Strategy
            </span>
            <h4 className="text-lg sm:text-xl font-semibold text-[#111827]">
              {recommendationTitle}
            </h4>
            <p className="text-xs sm:text-sm text-[#49585F] leading-relaxed">
              {recommendationDetails}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <Link
              href="/start"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] px-6 py-3.5 transition-colors"
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
