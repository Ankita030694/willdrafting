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

interface NriBahrainScenario {
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

const NRI_BAHRAIN_SCENARIOS: NriBahrainScenario[] = [
  {
    id: "manama-seef-corporate-real-estate",
    label: "Manama & Seef: Real Estate",
    icon: "building",
    heading: "Manama & Seef Expats with Flats in Kerala, Mumbai, or Delhi",
    challengeSummary:
      "Leaders, traders, and business owners in Manama and Seef put their main family savings into Indian homes and shops. Bahrain civil courts cannot transfer land or flats in India.",
    legalMechanism:
      "Section 5 of the Indian Succession Act 1925 sets the Lex Situs rule. Indian law alone governs all land and flats in India. A separate Indian Will keeps your Bahrain CPR assets safe and stops long court freezes.",
    statutoryPrecedent:
      "Section 5 Indian Succession Act 1925 & Lex Situs",
    recommendedInstrument:
      "Separate Indian Will with Bahrain Asset Ring-Fencing",
    checklist: [
      "Add city survey numbers, floor borders, and land shares",
      "Use ring-fencing clauses to limit the Will to Indian assets",
      "Name an adult executor in India to handle land records",
    ],
  },
  {
    id: "juffair-adliya-nre-portfolio",
    label: "Juffair: NRE & Demat Wealth",
    icon: "coins",
    heading: "NRE/NRO Bank Accounts, Demat Shares, and Mutual Funds",
    challengeSummary:
      "Salaried staff and managers in Juffair, Adliya, and Sanabis hold high savings in NRE, NRO, and FCNR bank accounts. Bank nominees do not become true owners when an account holder dies.",
    legalMechanism:
      "In Sarbati Devi, the Supreme Court ruled that a bank nominee is just a trustee. Without a valid Indian Will, banks freeze accounts and ask heirs for a court certificate.",
    statutoryPrecedent:
      "Sarbati Devi Ruling & RBI Banking Rules",
    recommendedInstrument:
      "Indian Will Listing Bank Branches & Demat Folios",
    checklist: [
      "List NRE, NRO, and FCNR account numbers with bank IFSC codes",
      "Write 16-digit Demat IDs with NSDL or CDSL",
      "Help heirs use the yearly USD 1 Million FEMA transfer limit",
    ],
  },
  {
    id: "muslim-wasiyat-bahrain",
    label: "Muslim NRIs: Wasiyat Rules",
    icon: "landmark",
    heading: "Muslim Personal Law Shariat Act 1937 & Bahrain Family Law",
    challengeSummary:
      "Muslim Indian expats in Bahrain want to leave gifts to loved ones or charities while following Islamic law for Indian land and bank funds.",
    legalMechanism:
      "Under the Muslim Personal Law (Shariat) Act 1937 in India, a Muslim Will maker can give up to one-third of net wealth via Wasiyat to non-heirs. The other two-thirds goes to fixed Quranic heirs.",
    statutoryPrecedent:
      "Muslim Personal Law (Shariat) Act 1937",
    recommendedInstrument:
      "Shariah-Compliant Indian Wasiyat with Heir Shares",
    checklist: [
      "Keep Wasiyat gifts strictly within the 1/3 legal limit",
      "List all primary legal heirs and fixed shares clearly",
      "Add heir consent clauses if shares go beyond standard rules",
    ],
  },
  {
    id: "riffa-muharraq-ancestral-farmland",
    label: "Riffa & Muharraq: Farmland",
    icon: "globe",
    heading: "Ancestral Farm Land in Kerala, Punjab, or Telangana",
    challengeSummary:
      "Long-term expat families in Riffa, Muharraq, and Saar often inherit family farm plots, rubber estates, and groves in Kerala, Punjab, and Telangana.",
    legalMechanism:
      "Under FEMA 1999 rules, NRIs can legally inherit farm land and family homes from Indian residents through a valid Will, even though buying new farm land is barred.",
    statutoryPrecedent:
      "FEMA 1999 Reg 3(1)(b) & Section 63 Succession Act",
    recommendedInstrument:
      "Plain-Paper Indian Will with Land Mutation Steps",
    checklist: [
      "Check land tax records, Thandaper, and Patta papers",
      "List Class-I legal heirs clearly under the Succession Act",
      "Stop joint family fights with clear boundary maps",
    ],
  },
];

export default function NriBahrainWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("manama-seef-corporate-real-estate");
  const [successionLaw, setSuccessionLaw] = useState<"secular" | "muslim">("secular");
  const [indiaAssetType, setIndiaAssetType] = useState<"property" | "banking" | "mixed">("mixed");
  const [attestationPref, setAttestationPref] = useState<"embassy" | "plain_paper">("embassy");

  const currentScenario =
    NRI_BAHRAIN_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_BAHRAIN_SCENARIOS[0];

  return (
    <section className="w-full my-16 sm:my-24">
      {/* Section Header */}
      <div className="max-w-3xl mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <Scale className="w-4 h-4" />
          <span>Interactive Cross-Border Tool</span>
        </div>
        <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
          Explore Bahrain-India Will Strategies by Expat Profile
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Planning your estate across borders means matching Bahrain life with
          the Indian Succession Act 1925. Pick your profile below to see the
          rules, laws, and clear steps:
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-8 pb-2 border-b border-[#172228]/10">
        {NRI_BAHRAIN_SCENARIOS.map((scenario) => {
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
            <h4 className="text-xl sm:text-2xl font-medium text-[#111827]">
              {currentScenario.heading}
            </h4>
          </div>
          <div className="inline-flex items-center gap-2 self-start lg:self-auto bg-[#FAF7F0] border border-[#172228]/10 px-4 py-2 rounded-full text-xs font-semibold text-[#172228]">
            <ShieldCheck className="w-4 h-4 text-[#047857]" />
            <span>{currentScenario.statutoryPrecedent}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-7 space-y-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] mb-1.5">
                The Practical Challenge in Bahrain
              </div>
              <p className="text-[14.5px] sm:text-[15px] leading-[1.65] text-[#374151]">
                {currentScenario.challengeSummary}
              </p>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] mb-1.5">
                Statutory Rule Under Indian Law
              </div>
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
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#172228] mb-3.5">
                Bahrain-India Execution Checklist
              </div>
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
          <h4 className="text-xl sm:text-2xl font-medium text-[#111827] mb-2">
            30-Second Cross-Border Succession Check
          </h4>
          <p className="text-sm text-[#49585F]">
            Answer three quick questions to find the right legal plan for your wealth:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Question 1: Succession Regime */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#55636D] block mb-2">
              1. Personal Law Rule
            </span>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setSuccessionLaw("secular")}
                className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  successionLaw === "secular"
                    ? "bg-[#172228] text-white"
                    : "bg-[#FAF7F0] text-[#172228] hover:bg-[#172228]/5"
                }`}
              >
                Hindu, Christian, Sikh, Jain, Parsi
                <span className="block text-[11px] font-normal opacity-80 mt-0.5">
                  100% Free Choice (Succession Act 1925)
                </span>
              </button>
              <button
                type="button"
                onClick={() => setSuccessionLaw("muslim")}
                className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  successionLaw === "muslim"
                    ? "bg-[#172228] text-white"
                    : "bg-[#FAF7F0] text-[#172228] hover:bg-[#172228]/5"
                }`}
              >
                Muslim Indian Expat
                <span className="block text-[11px] font-normal opacity-80 mt-0.5">
                  Shariat Wasiyat Rules (1/3rd Gift Limit)
                </span>
              </button>
            </div>
          </div>

          {/* Question 2: Primary Asset Type in India */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#55636D] block mb-2">
              2. Main Indian Assets
            </span>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setIndiaAssetType("property")}
                className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  indiaAssetType === "property"
                    ? "bg-[#172228] text-white"
                    : "bg-[#FAF7F0] text-[#172228] hover:bg-[#172228]/5"
                }`}
              >
                Flats, Plots &amp; Shops
                <span className="block text-[11px] font-normal opacity-80 mt-0.5">
                  Lex Situs Real Estate Rules
                </span>
              </button>
              <button
                type="button"
                onClick={() => setIndiaAssetType("banking")}
                className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  indiaAssetType === "banking"
                    ? "bg-[#172228] text-white"
                    : "bg-[#FAF7F0] text-[#172228] hover:bg-[#172228]/5"
                }`}
              >
                NRE, NRO &amp; Demat Shares
                <span className="block text-[11px] font-normal opacity-80 mt-0.5">
                  Sarbati Devi Nominee Rule
                </span>
              </button>
              <button
                type="button"
                onClick={() => setIndiaAssetType("mixed")}
                className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  indiaAssetType === "mixed"
                    ? "bg-[#172228] text-white"
                    : "bg-[#FAF7F0] text-[#172228] hover:bg-[#172228]/5"
                }`}
              >
                Full Mixed Estate
                <span className="block text-[11px] font-normal opacity-80 mt-0.5">
                  Homes, Bank Funds &amp; Farm Land
                </span>
              </button>
            </div>
          </div>

          {/* Question 3: Execution Preference */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#55636D] block mb-2">
              3. Signing in Bahrain
            </span>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setAttestationPref("embassy")}
                className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  attestationPref === "embassy"
                    ? "bg-[#172228] text-white"
                    : "bg-[#FAF7F0] text-[#172228] hover:bg-[#172228]/5"
                }`}
              >
                Embassy of India Manama Stamp
                <span className="block text-[11px] font-normal opacity-80 mt-0.5">
                  Consular Act 1948 Official Seal
                </span>
              </button>
              <button
                type="button"
                onClick={() => setAttestationPref("plain_paper")}
                className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  attestationPref === "plain_paper"
                    ? "bg-[#172228] text-white"
                    : "bg-[#FAF7F0] text-[#172228] hover:bg-[#172228]/5"
                }`}
              >
                Section 63 Two-Witness Signing
                <span className="block text-[11px] font-normal opacity-80 mt-0.5">
                  Fast Plain-Paper Signing in Bahrain
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Statutory Output Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-[#172228]/10">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#C65378]">
              <ShieldCheck className="w-4 h-4 text-[#047857]" />
              <span>Your Custom Estate Plan</span>
            </div>
            <span className="text-xs text-[#55636D]">
              Verified by High Court Lawyers
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2.5">
              <p className="text-sm sm:text-[15px] font-medium text-[#111827]">
                {successionLaw === "secular"
                  ? "Under Section 59 of the Indian Succession Act 1925, you have 100% free choice to leave self-acquired Indian assets to any heir."
                  : "Under the Muslim Personal Law (Shariat) Act 1937, you can give up to 1/3rd of your net Indian estate via Wasiyat to non-heirs."}
              </p>
              <p className="text-xs sm:text-[13.5px] text-[#49585F] leading-relaxed">
                {indiaAssetType === "property" &&
                  "Indian land offices need clear flat and plot details. A separate Indian Will stops foreign court delays."}
                {indiaAssetType === "banking" &&
                  "Under the Sarbati Devi rule, bank nominees are only trustees. A valid Will gives your chosen heirs full ownership."}
                {indiaAssetType === "mixed" &&
                  "A complete Will covers flats, NRE/NRO deposits, and Demat shares while protecting your yearly FEMA USD 1 Million transfer rights."}
              </p>
              <p className="text-xs sm:text-[13.5px] text-[#49585F] leading-relaxed">
                {attestationPref === "embassy"
                  ? "Signing at the Embassy of India in Manama (Bu Ghazal) gives strong proof of genuine signing under Section 3 of the Consular Act 1948."
                  : "Under Section 63 of the Indian Succession Act 1925, signing on plain A4 paper before two adult witnesses in Bahrain is 100% valid in India."}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-2.5">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
              >
                <span>Consult Bahrain NRI Lawyer</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#FAF7F0] hover:bg-[#172228] text-[#172228] hover:text-white border border-[#172228]/15 text-xs font-bold uppercase tracking-[0.12em] py-3 px-5 transition-colors"
              >
                <span>Start Online Will Intake</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
