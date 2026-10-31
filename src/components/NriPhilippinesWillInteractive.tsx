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

interface NriPhilippinesScenario {
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

const NRI_PHILIPPINES_SCENARIOS: NriPhilippinesScenario[] = [
  {
    id: "sindhi-punjabi-mercantile",
    label: "Sindhi & Punjabi Portfolios",
    icon: "globe",
    heading: "Sindhi & Punjabi Portfolios Across India",
    challengeSummary:
      "Trading families in Manila, Cebu, and Davao own shops, flats, and plots in Mumbai, Gujarat, and Punjab. Sibling disputes and old land records risk property lock-in.",
    legalMechanism:
      "Under Section 5 of the Indian Succession Act 1925, Indian land follows Indian law only. An Indian Will passes shops and flats cleanly without court bottlenecks.",
    statutoryPrecedent:
      "Indian Succession Act 1925 s. 5 & Hindu Succession Act s. 30",
    recommendedInstrument:
      "Registered Indian Will with Comprehensive Municipal Asset Schedules",
    checklist: [
      "Collate registered sale deeds, city survey numbers, and municipal tax IDs",
      "Demarcate distinct shop, floor, and coparcenary commercial shares",
      "Appoint a trusted resident executor in India for municipal mutation",
    ],
  },
  {
    id: "philippines-legitime-shield",
    label: "Legitime vs Lex Situs",
    icon: "landmark",
    heading: "Shielding Indian Assets from Philippine Legitime Rules",
    challengeSummary:
      "Philippine law reserves 50% or more of an estate for forced heirs. Many expats worry this hurts them. In fact, Indian law gives total Will freedom over Indian assets.",
    legalMechanism:
      "Article 16 of the Philippine Civil Code says Will rights follow national law. For Indian citizens, Indian law gives 100% freedom over your self-acquired wealth.",
    statutoryPrecedent:
      "Civil Code of Philippines Art. 16 & Bellis v. Bellis (1967)",
    recommendedInstrument:
      "Separate Indian Will with Non-Revocation & Territorial Limitation Clause",
    checklist: [
      "Insert explicit territorial ring-fencing isolating Philippine assets",
      "Specify governing jurisdiction as the Indian Succession Act 1925",
      "Ensure foreign wills do not contain worldwide revocation clauses",
    ],
  },
  {
    id: "manila-cebu-nro-demat",
    label: "NRE/NRO & Demat Wealth",
    icon: "coins",
    heading: "NRE/NRO Accounts, Fixed Deposits & Stock Holdings",
    challengeSummary:
      "Indians in Manila and Cebu send funds to Indian NRE/NRO bank accounts and shares. Many think bank nominees own the funds upon death.",
    legalMechanism:
      "In Sarbati Devi, the Supreme Court ruled nominees act only as caretakers. Without a Will, banks freeze funds and demand court certificates.",
    statutoryPrecedent:
      "Sarbati Devi Precedent & Indian Succession Act 1925 s. 372",
    recommendedInstrument:
      "Indian Will Schedule Specifying Bank CIFs & Depository Client IDs",
    checklist: [
      "List all NRE, NRO, and resident savings accounts with IFSC codes",
      "Record Demat Client IDs with NSDL and CDSL depositories",
      "Define exact percentage shares to avert multi-heir bank freezes",
    ],
  },
  {
    id: "hague-apostille-execution",
    label: "Apostille & Embassy Signing",
    icon: "building",
    heading: "Hague Apostille & Embassy Execution in Manila",
    challengeSummary:
      "NRIs in Manila or Cebu often think an Indian Will needs Indian stamp paper or trips to India to be legal in court.",
    legalMechanism:
      "Under Section 63 of the Act, an Indian Will is signed on plain paper before two witnesses. A DFA apostille or Indian Embassy seal gives full legal proof.",
    statutoryPrecedent:
      "Hague Apostille Convention 2019 & ISA 1925 s. 63",
    recommendedInstrument:
      "Plain-Paper Will with Manila Notary & DFA Apostille Legalization",
    checklist: [
      "Print Will on plain white A4 paper without Indian stamp paper",
      "Sign before two independent adult witnesses who are not beneficiaries",
      "Obtain DFA Apostille in Manila or consular attestation at Makati embassy",
    ],
  },
];

export default function NriPhilippinesWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("sindhi-punjabi-mercantile");

  // 3-Question Cross-Border Diagnostic State
  const [assetType, setAssetType] = useState<"commercial" | "urban" | "financial">(
    "commercial"
  );
  const [hasForeignWill, setHasForeignWill] = useState<"yes" | "no">("yes");

  const currentScenario =
    NRI_PHILIPPINES_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_PHILIPPINES_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationSummary = "";
  let actionPoints: string[] = [];

  if (assetType === "commercial") {
    recommendationTitle = "Mercantile Commercial Property Protection Plan";
    recommendationSummary =
      "For family shops and plots in Mumbai, Gujarat, or Punjab, your Will must list sale deed numbers and city map boundaries.";
    actionPoints = [
      "Write down city ward numbers, tax IDs, and shop bounds",
      "Set clear shares for each heir to stop family fights",
      "Name a trusted person in India to update city tax books",
    ];
  } else if (assetType === "urban") {
    recommendationTitle = "Residential Apartment & Plot Protection Plan";
    recommendationSummary =
      "For flats and plots in Delhi, Pune, or Bangalore, an Indian Will gives fast society transfer without court delays.";
    actionPoints = [
      "List land share parts and registered title deed numbers",
      "Keep your Indian home safe from foreign forced share rules",
      "Sign the Will before two neutral friends who are not heirs",
    ];
  } else {
    recommendationTitle = "Liquid Banking & Mutual Fund Protection Plan";
    recommendationSummary =
      "For bank deposits and stock shares, a Will is vital because nominees act only as caretakers under the law.";
    actionPoints = [
      "List bank branch codes and Demat IDs with NSDL or CDSL",
      "Guide heirs on simple RBI forms to send money abroad",
      "Stop bank account freezes and avoid slow court cases",
    ];
  }

  return (
    <div className="w-full my-12 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
        <Scale className="w-4 h-4 text-[#C65378]" />
        <span>Philippines-India Succession Assessment Framework</span>
      </div>

      <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-3">
        Interactive Succession Planner for NRIs in Philippines
      </h3>

      <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F] mb-8 max-w-3xl">
        Select your asset category below to examine statutory succession rules,
        Philippine Civil Code interactions, and verified drafting protocols:
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 pb-6 mb-8 border-b border-[#172228]/10">
        {NRI_PHILIPPINES_SCENARIOS.map((sc) => {
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
              Key legal checks for NRIs in the Philippines before executing an Indian Will:
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

          <div className="pt-4 border-t border-[#172228]/10">
            <Link
              href="/contact"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
            >
              <span>Consult Cross-Border Advocate</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Diagnostic Card */}
      <div className="bg-[#FAF7F0] rounded-[24px] p-6 sm:p-8 border border-[#172228]/10">
        <h4 className="text-base sm:text-lg font-semibold text-[#111827] mb-2">
          Personalized Indian Estate Assessment
        </h4>
        <p className="text-xs sm:text-[13.5px] text-[#49585F] mb-6">
          Answer two brief questions to receive custom statutory drafting guidance:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#172228] mb-2">
              Primary Indian Asset Class:
            </label>
            <div className="flex flex-col gap-2">
              {[
                { id: "commercial", label: "Mercantile Shops & Ancestral Commercial" },
                { id: "urban", label: "Residential Flats & Urban Plots" },
                { id: "financial", label: "NRE/NRO Bank Deposits & Mutual Funds" },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-colors ${
                    assetType === opt.id
                      ? "bg-white border-[#C65378] text-[#111827] font-semibold"
                      : "bg-white/50 border-[#172228]/10 text-[#49585F] hover:bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="ph_assetType"
                    checked={assetType === opt.id}
                    onChange={() => setAssetType(opt.id as any)}
                    className="accent-[#C65378]"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#172228] mb-2">
              Do You Hold Assets or a Will in the Philippines?
            </label>
            <div className="flex flex-col gap-2">
              {[
                { id: "yes", label: "Yes, I hold business shares/assets in the Philippines" },
                { id: "no", label: "No, all my valuable assets are situated in India" },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-colors ${
                    hasForeignWill === opt.id
                      ? "bg-white border-[#C65378] text-[#111827] font-semibold"
                      : "bg-white/50 border-[#172228]/10 text-[#49585F] hover:bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="ph_foreignWill"
                    checked={hasForeignWill === opt.id}
                    onChange={() => setHasForeignWill(opt.id as any)}
                    className="accent-[#C65378]"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Diagnostic Output */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#172228]/10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378] mb-2">
            <CheckCircle2 className="w-4 h-4 text-[#047857]" />
            <span>Recommended Succession Strategy:</span>
          </div>
          <div className="text-base font-semibold text-[#111827] mb-2">
            {recommendationTitle}
          </div>
          <p className="text-xs sm:text-[13.5px] text-[#49585F] leading-relaxed mb-4">
            {recommendationSummary}
          </p>

          <div className="space-y-2 mb-4">
            {actionPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-[#374151]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-1.5 shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          {hasForeignWill === "yes" && (
            <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 text-xs text-[#55636D] leading-relaxed">
              <strong>Dual-Will Ring-Fencing Note:</strong> Because you hold Philippine assets, our High Court advocates will insert a non-revocation territorial clause in your Indian Will to ensure Philippine dispositions remain completely separate and protected.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
