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
  Scale,
} from "lucide-react";

interface NriNepalScenario {
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

const NRI_NEPAL_SCENARIOS: NriNepalScenario[] = [
  {
    id: "terai-border-farmland",
    label: "Terai & Border Farmland",
    icon: "globe",
    heading: "Ancestral Farmland in UP, Bihar and Uttarakhand",
    challengeSummary:
      "Families in Birgunj, Biratnagar, or Kathmandu hold farm plots in Gorakhpur, East Champaran, or Udham Singh Nagar. Local land officers often pause mutation across the open border.",
    legalMechanism:
      "Under Section 5 of the Indian Succession Act 1925, Indian land follows Indian law only. Indian citizens living in Nepal hold full rights to inherit farmland under FEMA and state land codes.",
    statutoryPrecedent:
      "1950 Indo-Nepal Treaty Art. 7 & UP Revenue Code 2006 s. 33",
    recommendedInstrument:
      "Indian Will with Khasra & Land Khatauni Schedules",
    checklist: [
      "Check Tehsil Khasra, Khatauni, and Khesra plot survey entries",
      "Draft clear gifts to avoid long oral family disputes",
      "Name an Indian resident agent for smooth border land mutation",
    ],
  },
  {
    id: "kathmandu-urban-assets",
    label: "Urban Flats & Commercial Units",
    icon: "building",
    heading: "Commercial Plots & Flats in Delhi-NCR, Patna or Lucknow",
    challengeSummary:
      "Business owners in Kathmandu and Pokhara invest money into shops and city flats. Housing societies ask for clear legal proof before they transfer membership names.",
    legalMechanism:
      "Section 59 of the Indian Succession Act gives total freedom over self-made city wealth. A dedicated Indian Will enables swift municipal tax and flat society share transfer.",
    statutoryPrecedent:
      "Indian Succession Act 1925 ss. 5, 59 & Municipal Corporation Acts",
    recommendedInstrument:
      "Indian Will with Clear Flat Demarcations & Society Directives",
    checklist: [
      "State flat numbers, floor maps, and land share (UDS)",
      "Attach registered title deed facts and municipal tax IDs",
      "Name back-up agents to handle local city tax updates",
    ],
  },
  {
    id: "cross-border-banking",
    label: "NRE/NRO & Demat Portfolios",
    icon: "coins",
    heading: "NRE/NRO Bank Accounts, Mutual Funds & Stock Folios",
    challengeSummary:
      "NRIs in Nepal send funds to Indian NRE/NRO deposits and demat shares in SBI, PNB, or HDFC. Many people think bank nominees become full owners upon death.",
    legalMechanism:
      "In Sarbati Devi, the Supreme Court ruled that nominees are only caretakers. Without an Indian Will, bank branches freeze funds and ask for court orders.",
    statutoryPrecedent:
      "Sarbati Devi Precedent & RBI Master Directions on Remittance",
    recommendedInstrument:
      "Will Schedule Naming Bank CIFs & Depository Client IDs",
    checklist: [
      "List NRE, NRO, and local bank accounts with IFSC codes",
      "Record Demat Client IDs with NSDL or CDSL depositories",
      "Set clear heir shares to avoid bank freezes and court delays",
    ],
  },
  {
    id: "muluki-samhita-ringfencing",
    label: "Dual-Will & Muluki Samhita",
    icon: "landmark",
    heading: "Dual-Will Strategy: Isolating Nepalese Civil Code Rules",
    challengeSummary:
      "Nepal Civil Code (Muluki Dewani Samhita 2074) has strict partition rules. Using one combined will forces Indian courts to demand slow ancillary probate under Section 228.",
    legalMechanism:
      "A dual-will plan separates both lands. Your Nepali Will covers local assets under Nepal law. Your Indian Will covers Indian assets under Indian law without cross-border clashes.",
    statutoryPrecedent:
      "Muluki Dewani Samhita 2074 & Indian Succession Act 1925 s. 228",
    recommendedInstrument:
      "Indian Will with Strict Border Ring-Fencing Clause",
    checklist: [
      "Add border ring-fencing terms in both instruments",
      "Keep Indian assets out of Nepalese court papers",
      "Sign on plain A4 paper before two adult witnesses",
    ],
  },
];

export default function NriNepalWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("terai-border-farmland");

  // 3-Question Cross-Border Diagnostic State
  const [assetType, setAssetType] = useState<"agricultural" | "urban" | "financial">(
    "agricultural"
  );
  const [citizenshipStatus, setCitizenshipStatus] = useState<"indian_nri" | "cross_border">(
    "indian_nri"
  );
  const [hasNepalWill, setHasNepalWill] = useState<"yes" | "no">("yes");

  const currentScenario =
    NRI_NEPAL_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_NEPAL_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationSummary = "";
  let actionPoints: string[] = [];

  if (assetType === "agricultural") {
    recommendationTitle = "Border District Farmland Protection Plan";
    recommendationSummary =
      "Because you own farmland in UP, Bihar, or Uttarakhand, your Will needs exact Tehsil Khasra and Khatauni plot numbers to avoid land clerk disputes.";
    actionPoints = [
      "Write exact Khasra plot numbers to avoid land clerk doubts",
      "State clear rights under the 1950 Treaty and state land acts",
      "Sign the Will before two neutral witnesses who are not heirs",
    ];
  } else if (assetType === "urban") {
    recommendationTitle = "City Flat & Commercial Shop Protection Plan";
    recommendationSummary =
      "For flats, shops, and house plots in Indian cities, your Indian Will should name local agents to help with fast municipal tax and flat society updates.";
    actionPoints = [
      "List undivided land shares (UDS) and registered deed details",
      "Name clear shares for spouse, children, or kin without doubt",
      "Sign your Will in Nepal or register it on your next trip home",
    ];
  } else {
    recommendationTitle = "Liquid Banking & Mutual Fund Protection Plan";
    recommendationSummary =
      "For NRE/NRO accounts and stock funds, a Will is vital because nominees act only as caretakers under the Supreme Court Sarbati Devi ruling.";
    actionPoints = [
      "List bank branch IFSC codes and Demat IDs with NSDL or CDSL",
      "Guide heirs on RBI Form 15CA and Form 15CB fund transfer steps",
      "Spare your heirs from costly court succession certificate fights",
    ];
  }

  return (
    <div className="w-full my-12 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
        <Scale className="w-4 h-4 text-[#C65378]" />
        <span>Indo-Nepal Succession Assessment Framework</span>
      </div>

      <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-3">
        Interactive Succession Planner for NRIs in Nepal
      </h3>

      <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F] mb-8 max-w-3xl">
        Pick your asset type below to check legal risks, court rules,
        and drafting tips under Indian law:
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 pb-6 mb-8 border-b border-[#172228]/10">
        {NRI_NEPAL_SCENARIOS.map((sc) => {
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
            <span className="inline-block text-xs font-bold tracking-[0.16em] uppercase text-[#C65378] mb-2.5">
              Case Review &amp; Legal Moat
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#111827] mb-3 leading-snug">
              {currentScenario.heading}
            </h3>
            <p className="text-[14.5px] leading-[1.68] text-[#374151] mb-5">
              {currentScenario.challengeSummary}
            </p>

            <div className="bg-white rounded-xl p-4 border border-[#172228]/10 mb-5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#172228] mb-1">
                Legal Rule &amp; Court Ground:
              </div>
              <p className="text-xs sm:text-[13.5px] text-[#49585F] leading-relaxed">
                {currentScenario.legalMechanism}
              </p>
              <div className="mt-2 text-[11px] font-mono text-[#C65378] font-medium">
                Governing Law: {currentScenario.statutoryPrecedent}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#172228]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-semibold text-[#172228]">
              Recommended Step: {currentScenario.recommendedInstrument}
            </span>
          </div>
        </div>

        {/* Right Checklist Box */}
        <div className="lg:col-span-5 bg-white rounded-[24px] p-6 sm:p-7 border border-[#172228]/10 flex flex-col justify-between shadow-2xs">
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-[#111827] mb-3">
              Essential Verification Checklist
            </h4>
            <p className="text-xs text-[#55636D] mb-4">
              Key legal checks for NRIs in Nepal before you sign your Will:
            </p>

            <ul className="space-y-3 text-xs sm:text-[13.5px] text-[#374151] mb-6">
              {currentScenario.checklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-[#172228]/10 flex flex-col gap-2.5">
            <Link
              href="/contact"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors shadow-2xs"
            >
              <span>Book Cross-Border Talk</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3-Question Diagnostic Calculator */}
      <div className="mt-8 rounded-[24px] bg-[#172228] text-white p-6 sm:p-8">
        <div className="flex items-center gap-2 text-[#C65378] text-xs font-bold uppercase tracking-[0.16em] mb-2">
          <Calculator className="w-4 h-4 text-[#C65378]" />
          <span>Quick Estate Check Tool</span>
        </div>
        <h4 className="text-lg sm:text-xl font-semibold text-white mb-6">
          Tailor Your Indo-Nepal Estate Succession Strategy
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6 text-xs sm:text-sm">
          {/* Question 1 */}
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <label className="block text-white/70 font-medium mb-2">
              1. Main Indian Asset Type:
            </label>
            <select
              value={assetType}
              onChange={(e) =>
                setAssetType(e.target.value as "agricultural" | "urban" | "financial")
              }
              className="w-full bg-[#172228] border border-white/20 rounded-lg p-2.5 text-white text-xs focus:outline-none focus:border-[#C65378]"
            >
              <option value="agricultural">Terai / Border Farmland (UP, Bihar, UK)</option>
              <option value="urban">City Flats &amp; Commercial Shops</option>
              <option value="financial">NRE/NRO Bank Accounts &amp; Demat Funds</option>
            </select>
          </div>

          {/* Question 2 */}
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <label className="block text-white/70 font-medium mb-2">
              2. Family Citizenship Status:
            </label>
            <select
              value={citizenshipStatus}
              onChange={(e) =>
                setCitizenshipStatus(
                  e.target.value as "indian_nri" | "cross_border"
                )
              }
              className="w-full bg-[#172228] border border-white/20 rounded-lg p-2.5 text-white text-xs focus:outline-none focus:border-[#C65378]"
            >
              <option value="indian_nri">Indian Passport Holder (NRI in Nepal)</option>
              <option value="cross_border">Cross-Border Family / Nepal Heirs</option>
            </select>
          </div>

          {/* Question 3 */}
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <label className="block text-white/70 font-medium mb-2">
              3. Existing Will in Nepal?
            </label>
            <select
              value={hasNepalWill}
              onChange={(e) => setHasNepalWill(e.target.value as "yes" | "no")}
              className="w-full bg-[#172228] border border-white/20 rounded-lg p-2.5 text-white text-xs focus:outline-none focus:border-[#C65378]"
            >
              <option value="yes">Yes (Will under Nepal Civil Code)</option>
              <option value="no">No (No Nepali Will Made Yet)</option>
            </select>
          </div>
        </div>

        {/* Dynamic Advice Box */}
        <div className="bg-white/10 p-5 rounded-xl border border-white/15">
          <div className="text-xs font-bold uppercase tracking-wider text-[#C65378] mb-1.5">
            Legal Tip: {recommendationTitle}
          </div>
          <p className="text-xs sm:text-[13.5px] text-white/90 leading-relaxed mb-4">
            {recommendationSummary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-xs">
            {actionPoints.map((pt, i) => (
              <div key={i} className="flex items-start gap-2 text-white/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#047857] shrink-0 mt-0.5" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
