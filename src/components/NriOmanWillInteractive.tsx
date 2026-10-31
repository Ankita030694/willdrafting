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

interface NriOmanScenario {
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

const NRI_OMAN_SCENARIOS: NriOmanScenario[] = [
  {
    id: "muscat-merchant-corporate",
    label: "Muscat: Business & Realty",
    icon: "building",
    heading: "Muscat Merchant Families & Expats with Real Estate in India",
    challengeSummary:
      "Prominent business families and executives in Ruwi, Al Khuwair, and Ghubrah hold substantial commercial and residential property across Gujarat, Mumbai, and Delhi. Local Omani courts have no legal jurisdiction to distribute immovable assets situated in India.",
    legalMechanism:
      "Section 5 of the Indian Succession Act, 1925 applies the universal Lex Situs principle. Succession to immovable property is governed exclusively by the laws of India. A separate Indian Will prevents complex court disputes and years of estate paralysis.",
    statutoryPrecedent:
      "Section 5 Indian Succession Act 1925 & Lex Situs",
    recommendedInstrument:
      "Dedicated Indian Will with Oman Asset Ring-Fencing",
    checklist: [
      "Detail land survey numbers, municipal khata, and undivided share in land",
      "Insert explicit ring-fencing clauses limiting the Will to Indian assets",
      "Appoint an adult executor based in India for smooth registry mutation",
    ],
  },
  {
    id: "nre-demat-portfolio",
    label: "Sohar & Muscat: NRE & Demat",
    icon: "coins",
    heading: "NRE/NRO Bank Fixed Deposits, Mutual Funds & Demat Holdings",
    challengeSummary:
      "Indian professionals in Muscat, Sohar, and Salalah channel Omani Rial earnings into Indian NRE, NRO, and FCNR deposits, PMS accounts, and listed equities. Bank account nominees do not acquire absolute ownership when the holder passes away.",
    legalMechanism:
      "Under the landmark Supreme Court ruling in Smt. Sarbati Devi, a bank nominee is merely a collection trustee for the legal heirs. Without an explicit Indian Will, Indian banks freeze high-value accounts and demand an onerous court succession certificate.",
    statutoryPrecedent:
      "Sarbati Devi Precedent & RBI Master Directions",
    recommendedInstrument:
      "Indian Will Specifying Bank Accounts & Demat Folios",
    checklist: [
      "Itemize NRE and NRO account numbers along with bank IFSC codes",
      "Record 16-digit Demat Client IDs with NSDL and CDSL depositories",
      "Enable heirs to utilize the USD 1 Million annual FEMA repatriation route",
    ],
  },
  {
    id: "muslim-wasiyat-oman",
    label: "Muslim NRIs: Wasiyat Rules",
    icon: "landmark",
    heading: "Muslim Personal Law Shariat Act 1937 & Wasiyat Compliance",
    challengeSummary:
      "Muslim Indian expatriates in Oman frequently seek to leave specific properties or monetary gifts to charities or selected family members while ensuring full harmony with Islamic inheritance jurisprudence.",
    legalMechanism:
      "Under the Muslim Personal Law (Shariat) Application Act, 1937 in India, a Muslim testator can bequeath up to one-third of the net estate via Wasiyat to non-heirs. Any bequest exceeding one-third or made in favor of a legal heir requires post-mortem consent from all Quranic heirs.",
    statutoryPrecedent:
      "Muslim Personal Law (Shariat) Application Act 1937",
    recommendedInstrument:
      "Shariah-Compliant Indian Wasiyat with Heir Allocation",
    checklist: [
      "Structure bequests strictly within the one-third bequeathable limit",
      "Enumerate all Quranic sharers and residuaries under applicable Shariat",
      "Include explicit post-mortem consent clauses for non-standard distributions",
    ],
  },
  {
    id: "salalah-ancestral-farmland",
    label: "Salalah: Ancestral Farmland",
    icon: "globe",
    heading: "Ancestral Agricultural Land in Kerala, Tamil Nadu & Punjab",
    challengeSummary:
      "Long-settled expatriates in Salalah, Nizwa, and Sur often inherit ancestral farmlands, rubber estates, and ancestral family homes in India, worrying whether foreign tax residency forfeits their inheritance rights.",
    legalMechanism:
      "Under FEMA 1999 regulations, NRIs and OCIs have full legal authority to inherit agricultural land, plantation property, and farmhouses from Indian residents. While NRIs cannot buy farmland in India, inheriting it via a valid Will is completely lawful.",
    statutoryPrecedent:
      "FEMA 1999 Reg 3(1)(b) & Section 63 Succession Act",
    recommendedInstrument:
      "Plain-Paper Indian Will with Revenue Mutation Protocol",
    checklist: [
      "Verify ancestral land revenue records, Patta, and RTC mutation extracts",
      "Sign before two adult independent witnesses who are not beneficiaries",
      "Optionally obtain consular attestation at the Indian Embassy in Muscat",
    ],
  },
];

export default function NriOmanWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("muscat-merchant-corporate");

  // 3-Question Cross-Border Diagnostic State
  const [successionLaw, setSuccessionLaw] = useState<"secular" | "muslim">("secular");
  const [indiaAssetType, setIndiaAssetType] = useState<"property" | "financial">(
    "property"
  );
  const [cityHub, setCityHub] = useState<"muscat" | "salalah" | "sohar">("muscat");

  const currentScenario =
    NRI_OMAN_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_OMAN_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationDetails = "";
  let recommendationAction = "";

  if (successionLaw === "muslim") {
    recommendationTitle = "Shariah-Compliant Wasiyat with 1/3rd Allocation Clause";
    recommendationDetails =
      "Your estate follows the Muslim Personal Law (Shariat) Application Act, 1937. You can bequeath up to one-third of your estate to non-heirs or charities, with two-thirds distributed to Quranic sharers.";
    recommendationAction = "Draft Islamic Wasiyat";
  } else if (indiaAssetType === "property") {
    recommendationTitle = "Indian Will with Oman Ring-Fencing & Lex Situs Protection";
    recommendationDetails =
      "Indian flats and ancestral land follow Section 5 of the Indian Succession Act, 1925. A separate Indian Will drafted by High Court advocates ensures seamless local revenue mutation.";
    recommendationAction = "Draft Separate Indian Will";
  } else if (indiaAssetType === "financial") {
    recommendationTitle = "Indian Will Covering NRE/NRO Deposits & Demat Portfolios";
    recommendationDetails =
      "Indian banks and mutual fund AMCs require an Indian Will to release funds without civil court succession certificate delays. Our draft names your heirs and covers FEMA USD 1M repatriation.";
    recommendationAction = "Protect Banking & Demat Assets";
  } else {
    recommendationTitle = "Consular Plain-Paper Indian Will under Section 63";
    recommendationDetails =
      "Sign your Indian Will on plain A4 paper in Oman with two independent witnesses. You do not need Indian stamp paper or travel to India, and you can attest it at the Indian Embassy in Muscat.";
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
          Explore Oman-India Will Strategies by Asset Profile
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Planning your estate across borders means harmonizing Omani residency rules
          with the Indian Succession Act, 1925. Choose your profile below to review
          the statutory rules, precedents, and practical steps:
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-8 pb-2 border-b border-[#172228]/10">
        {NRI_OMAN_SCENARIOS.map((scenario) => {
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
                The Practical Challenge in Oman
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
            <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#C65378] block mb-1">
                Recommended Cross-Border Instrument
              </span>
              <p className="text-sm font-semibold text-[#111827]">
                {currentScenario.recommendedInstrument}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#FAF7F0]/60 rounded-2xl p-6 border border-[#172228]/10 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#111827] mb-3">
                Mandatory Drafting Checklist
              </h4>
              <ul className="space-y-2.5 text-[13.5px] text-[#374151]">
                {currentScenario.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-[#172228]/10 flex flex-col gap-2.5">
              <Link
                href="/start"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-semibold py-3 px-4 transition-colors"
              >
                <span>Draft Indian Will Online</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-semibold py-2.5 px-4 transition-colors text-center"
              >
                <span>Consult Senior Advocate</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Cross-Border Diagnostic Selector Box */}
      <div className="bg-[#FAF7F0] rounded-[28px] border border-[#172228]/10 p-6 sm:p-9">
        <div className="max-w-2xl mb-6">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] block mb-1">
            Instant Legal Assessment
          </span>
          <h3 className="text-xl sm:text-2xl font-medium text-[#111827] mb-2">
            Configure Your Oman Expat Will Requirements
          </h3>
          <p className="text-sm text-[#49585F]">
            Select your personal status law, primary Indian asset class, and Omani residence to view your statutory blueprint:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.12em] text-[#55636D] mb-2">
              1. Succession Law Regime
            </label>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setSuccessionLaw("secular")}
                className={`p-3 text-left rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  successionLaw === "secular"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-white text-[#374151] border-[#172228]/15 hover:border-[#172228]/40"
                }`}
              >
                Hindu, Christian, Sikh, Parsi (Secular ISA 1925)
              </button>
              <button
                type="button"
                onClick={() => setSuccessionLaw("muslim")}
                className={`p-3 text-left rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  successionLaw === "muslim"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-white text-[#374151] border-[#172228]/15 hover:border-[#172228]/40"
                }`}
              >
                Muslim Expat (Shariat Act 1937 Wasiyat)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.12em] text-[#55636D] mb-2">
              2. Primary Indian Asset Base
            </label>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setIndiaAssetType("property")}
                className={`p-3 text-left rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  indiaAssetType === "property"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-white text-[#374151] border-[#172228]/15 hover:border-[#172228]/40"
                }`}
              >
                Real Estate (Flats, Plots &amp; Farmland)
              </button>
              <button
                type="button"
                onClick={() => setIndiaAssetType("financial")}
                className={`p-3 text-left rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  indiaAssetType === "financial"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-white text-[#374151] border-[#172228]/15 hover:border-[#172228]/40"
                }`}
              >
                Financial (NRE/NRO Deposits &amp; Demat)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.12em] text-[#55636D] mb-2">
              3. Residence Hub in Oman
            </label>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setCityHub("muscat")}
                className={`p-3 text-left rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  cityHub === "muscat"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-white text-[#374151] border-[#172228]/15 hover:border-[#172228]/40"
                }`}
              >
                Muscat Capital (Ruwi, Al Khuwair, Seeb)
              </button>
              <button
                type="button"
                onClick={() => setCityHub("salalah")}
                className={`p-3 text-left rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  cityHub === "salalah"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-white text-[#374151] border-[#172228]/15 hover:border-[#172228]/40"
                }`}
              >
                Salalah, Sohar or Interior Governorates
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Recommendation Output */}
        <div className="p-6 rounded-2xl bg-white border border-[#172228]/10 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-[#047857]" />
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#047857]">
                Statutory Recommendation
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-semibold text-[#111827] mb-1">
              {recommendationTitle}
            </h4>
            <p className="text-[13.5px] leading-relaxed text-[#49585F] max-w-2xl">
              {recommendationDetails}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/start"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-xs font-semibold px-5 py-3 transition-colors text-center"
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
