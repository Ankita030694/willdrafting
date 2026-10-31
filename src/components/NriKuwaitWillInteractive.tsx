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

interface NriKuwaitScenario {
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

const NRI_KUWAIT_SCENARIOS: NriKuwaitScenario[] = [
  {
    id: "ahmadi-kuwait-city-engineers",
    label: "Ahmadi & Kuwait City: Corporate",
    icon: "building",
    heading: "Ahmadi & Kuwait City Expats with Flats in Kerala, Mumbai or Delhi",
    challengeSummary:
      "Oil and corporate professionals in Ahmadi and Kuwait City channel high Dinar earnings into Indian real estate. Kuwait court decrees or local civil contracts cannot transfer Indian land.",
    legalMechanism:
      "Section 5 of the Indian Succession Act 1925 applies the Lex Situs rule. Real estate in India is governed solely by Indian succession law. An Indian Will ring-fenced from Kuwait indemnity prevents multi-year probate disputes.",
    statutoryPrecedent:
      "Section 5 Indian Succession Act 1925 & Lex Situs",
    recommendedInstrument:
      "Dedicated Indian Will with Kuwait Asset Ring-Fencing",
    checklist: [
      "Include municipality survey numbers, floor demarcations, and undivided land shares",
      "Insert ring-fencing clauses limiting the Will strictly to Indian territory",
      "Appoint an adult executor resident in India to handle SRO mutation",
    ],
  },
  {
    id: "salmiya-nre-portfolio",
    label: "Salmiya & Hawalli: NRE & Demat",
    icon: "coins",
    heading: "NRE/NRO Bank Deposits, Mutual Funds & Demat Portfolios",
    challengeSummary:
      "Expats across Salmiya and Hawalli maintain substantial savings in NRE, NRO, and FCNR accounts. Bank nominees do not acquire beneficial ownership upon demise.",
    legalMechanism:
      "In Sarbati Devi, the Supreme Court ruled that a bank nominee is merely a collection trustee. Without a registered Indian Will, banks freeze accounts and demand a court succession certificate.",
    statutoryPrecedent:
      "Sarbati Devi Precedent & RBI Master Directions",
    recommendedInstrument:
      "Indian Will Specifying Bank Branches & Demat Folios",
    checklist: [
      "List NRE, NRO, and FCNR account numbers with Indian branch IFSC codes",
      "State 16-digit Demat Client IDs with NSDL or CDSL depositories",
      "Guide heirs on the annual USD 1 Million FEMA repatriation limit",
    ],
  },
  {
    id: "muslim-wasiyat-kuwait",
    label: "Farwaniya: Wasiyat & Shariat",
    icon: "landmark",
    heading: "Muslim Personal Law Shariat Act 1937 & Wasiyat Compliance",
    challengeSummary:
      "Muslim expats in Farwaniya and Abbasiya often wish to bequeath assets to specific family members or charities while honoring Islamic succession principles.",
    legalMechanism:
      "Under the Muslim Personal Law (Shariat) Application Act 1937 in India, a Muslim can bequeath up to one-third of the net estate via Wasiyat to non-heirs. The remaining two-thirds passes to Quranic heirs.",
    statutoryPrecedent:
      "Muslim Personal Law (Shariat) Application Act 1937",
    recommendedInstrument:
      "Shariah-Compliant Indian Wasiyat with Heir Allocation",
    checklist: [
      "Structure bequests strictly within the 1/3 bequeathable limit",
      "Detail primary legal heirs (Sharers and Residuaries) explicitly",
      "Include post-mortem consent clauses for non-standard distributions",
    ],
  },
  {
    id: "kerala-ancestral-realty",
    label: "Kerala & Coast: Farmland",
    icon: "globe",
    heading: "Ancestral Agricultural Land in Kerala, Karnataka & Telangana",
    challengeSummary:
      "Long-term expat families in Kuwait frequently inherit ancestral agricultural plots, coconut groves, and rubber plantations in Kerala and coastal Karnataka.",
    legalMechanism:
      "Under FEMA 1999 regulations, NRIs can legally inherit agricultural land and farmhouses from Indian residents through a valid Will, even though direct purchase of farmland is prohibited.",
    statutoryPrecedent:
      "FEMA 1999 Reg 3(1)(b) & Section 63 Succession Act",
    recommendedInstrument:
      "Plain-Paper Indian Will with Revenue Mutation Protocol",
    checklist: [
      "Verify ancestral land revenue records, Thandaper, and Patta papers",
      "Include clear Class-I legal heir attestations under the Succession Act",
      "Prevent joint property disputes through explicit schedule schedules",
    ],
  },
];

export default function NriKuwaitWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("ahmadi-kuwait-city-engineers");
  const [successionLaw, setSuccessionLaw] = useState<"secular" | "muslim">("secular");
  const [indiaAssetType, setIndiaAssetType] = useState<"property" | "banking" | "mixed">("mixed");
  const [attestationPref, setAttestationPref] = useState<"embassy" | "plain_paper">("embassy");

  const currentScenario =
    NRI_KUWAIT_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_KUWAIT_SCENARIOS[0];

  return (
    <section className="w-full my-16 sm:my-24">
      {/* Section Header */}
      <div className="max-w-3xl mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <Scale className="w-4 h-4" />
          <span>Interactive Cross-Border Tool</span>
        </div>
        <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
          Explore Kuwait-India Will Strategies by Expat Profile
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Planning your estate across borders means balancing Kuwait residency realities
          with the Indian Succession Act 1925. Choose your profile below to review
          the rules, laws, and practical steps:
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-8 pb-2 border-b border-[#172228]/10">
        {NRI_KUWAIT_SCENARIOS.map((scenario) => {
          const isActive = activeTab === scenario.id;
          return (
            <button
              key={scenario.id}
              type="button"
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
                The Practical Challenge in Kuwait
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
                Kuwait-India Execution Checklist
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
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-medium transition-all cursor-pointer ${
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
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-medium transition-all cursor-pointer ${
                  successionLaw === "muslim"
                    ? "bg-[#172228] text-white"
                    : "bg-[#FAF7F0] text-[#49585F] hover:bg-[#172228]/5"
                }`}
              >
                Muslim Expat (Shariat Act &amp; Wasiyat)
              </button>
            </div>
          </div>

          {/* Question 2: Primary Indian Assets */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#55636D] block mb-2">
              2. Primary Indian Assets
            </span>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setIndiaAssetType("property")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-medium transition-all cursor-pointer ${
                  indiaAssetType === "property"
                    ? "bg-[#172228] text-white"
                    : "bg-[#FAF7F0] text-[#49585F] hover:bg-[#172228]/5"
                }`}
              >
                Real Estate (Flats, Plots, Farmland)
              </button>
              <button
                type="button"
                onClick={() => setIndiaAssetType("banking")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-medium transition-all cursor-pointer ${
                  indiaAssetType === "banking"
                    ? "bg-[#172228] text-white"
                    : "bg-[#FAF7F0] text-[#49585F] hover:bg-[#172228]/5"
                }`}
              >
                NRE/NRO Deposits, Demat, Shares
              </button>
              <button
                type="button"
                onClick={() => setIndiaAssetType("mixed")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-medium transition-all cursor-pointer ${
                  indiaAssetType === "mixed"
                    ? "bg-[#172228] text-white"
                    : "bg-[#FAF7F0] text-[#49585F] hover:bg-[#172228]/5"
                }`}
              >
                Mixed Portfolio (Properties &amp; Liquid Funds)
              </button>
            </div>
          </div>

          {/* Question 3: Attestation Route */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#55636D] block mb-2">
              3. Execution &amp; Attestation
            </span>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setAttestationPref("embassy")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-medium transition-all cursor-pointer ${
                  attestationPref === "embassy"
                    ? "bg-[#172228] text-white"
                    : "bg-[#FAF7F0] text-[#49585F] hover:bg-[#172228]/5"
                }`}
              >
                Indian Embassy Kuwait Attestation
              </button>
              <button
                type="button"
                onClick={() => setAttestationPref("plain_paper")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-medium transition-all cursor-pointer ${
                  attestationPref === "plain_paper"
                    ? "bg-[#172228] text-white"
                    : "bg-[#FAF7F0] text-[#49585F] hover:bg-[#172228]/5"
                }`}
              >
                Plain Paper 2-Witness Signing in Kuwait
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Recommendation Result Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#C65378]/25 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-[#172228]/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#C65378]/10 flex items-center justify-center text-[#C65378]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-[#111827]">
                Recommended Legal Protocol for Your Portfolio
              </h4>
            </div>
            <span className="text-xs font-mono text-[#55636D] bg-[#FAF7F0] px-3 py-1 rounded-full border border-[#172228]/10">
              Customized Roadmap
            </span>
          </div>

          <p className="text-[14.5px] leading-[1.68] text-[#374151] mb-5">
            {successionLaw === "secular"
              ? "Under the Indian Succession Act 1925, you have complete testamentary freedom over 100% of your self-acquired Indian assets. "
              : "Under the Muslim Personal Law (Shariat) Application Act 1937, your estate will follow the one-third Wasiyat rule for non-heir bequests. "}
            {indiaAssetType === "property" &&
              "Your real estate requires Lex Situs ring-fencing to avoid conflict with Kuwait probate or indemnity declarations. "}
            {indiaAssetType === "banking" &&
              "Your NRE and NRO bank accounts must name direct legatees to overcome the Supreme Court Sarbati Devi nominee limitation. "}
            {indiaAssetType === "mixed" &&
              "Your mixed portfolio requires Schedule A (properties) and Schedule B (bank accounts and Demat folios) demarcation. "}
            {attestationPref === "embassy"
              ? "You can complete consular attestation at the Embassy of India in Kuwait (Diplomatic Enclave) under the Consular Act 1948."
              : "You can execute the Will on plain A4 paper in Kuwait before two adult independent witnesses under Section 63 of the Act."}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/start"
              className="inline-flex items-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] px-6 py-3 transition-colors"
            >
              <span>Draft Your Indian Will Online</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#FAF7F0] hover:bg-[#172228] text-[#172228] hover:text-white border border-[#172228]/15 text-xs font-bold uppercase tracking-[0.12em] px-6 py-3 transition-colors"
            >
              <span>Book Advocate Consultation</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
