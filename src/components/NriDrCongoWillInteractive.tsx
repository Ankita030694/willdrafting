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
  ShieldCheck,
} from "lucide-react";

interface NriDrCongoScenario {
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

const NRI_DR_CONGO_SCENARIOS: NriDrCongoScenario[] = [
  {
    id: "drc-family-code-ringfencing",
    label: "DRC Family Code",
    icon: "globe",
    heading: "DRC Family Code vs Indian Succession Act Harmonization",
    challengeSummary:
      "Under Articles 758 to 765 of the DR Congo Family Code (Code de la Famille), forced heirship rules protect certain family shares. If you live in Kinshasa or Lubumbashi, local succession rules apply by default. A Will made only in DR Congo causes long delays in India. Indian land offices do not accept foreign Congolese court orders directly.",
    legalMechanism:
      "Section 5 of the Indian Succession Act follows the lex situs rule. Indian land and flats follow Indian law. Section 59 grants you full testamentary freedom over Indian assets. A separate Indian Will protects your properties. It keeps your Indian estate free from foreign court delays.",
    statutoryPrecedent:
      "DRC Code de la Famille arts. 758-765 & Indian Succession Act 1925 s. 5/59",
    recommendedInstrument:
      "Standalone Indian Will with Explicit Foreign Asset Ring-Fencing Clause",
    checklist: [
      "State your residence in Kinshasa, Lubumbashi, or Goma clearly",
      "Keep Congolese business assets separate from your Indian estate",
      "Elect Indian Succession Act 1925 for all assets situated in India",
    ],
  },
  {
    id: "embassy-consular-attestation",
    label: "Embassy Attestation",
    icon: "building",
    heading: "Indian Embassy Kinshasa Attestation & Non-Hague Rules",
    challengeSummary:
      "DR Congo is not a party to the 1961 Hague Apostille Convention. Expats in Kinshasa and Katanga often wonder how to make an Indian Will valid without an apostille certificate.",
    legalMechanism:
      "Under Section 63 of the Indian Succession Act, you can sign on plain paper before two adult witnesses. For extra proof, you can get consular attestation at the Embassy of India in Kinshasa. You can also legalize documents through the DRC Foreign Ministry and the Indian Embassy.",
    statutoryPrecedent:
      "Indian Succession Act 1925 s. 63 & Diplomatic and Consular Officers Act",
    recommendedInstrument:
      "Plain-Paper Will with Indian Embassy Consular Attestation",
    checklist: [
      "Sign before two adult witnesses who are not named as heirs",
      "Optional consular attestation at Embassy of India in Kinshasa",
      "Keep original signed copies with your trusted India executor",
    ],
  },
  {
    id: "mining-business-realty",
    label: "Mining & Urban Realty",
    icon: "landmark",
    heading: "Mining Expat Real Estate & Ancestral Land Protection",
    challengeSummary:
      "Many Indian entrepreneurs in Kinshasa and Lubumbashi own valuable flats, commercial plots, and ancestral property in Gujarat, Maharashtra, Punjab, and Delhi NCR. Missing title records can stall property transfers.",
    legalMechanism:
      "Our advocates draft detailed property schedules. We separate ancestral coparcenary shares from self-bought properties. This gives your executor legal authority. Your family can update municipal land records and Society share books without civil court battles.",
    statutoryPrecedent:
      "Registration Act 1908 s. 17 & Supreme Court Vineeta Sharma (2020)",
    recommendedInstrument:
      "Bespoke Real Estate Succession Will with Specific Municipal Schedules",
    checklist: [
      "Review registered sale deeds, survey numbers, and municipal tax IDs",
      "Identify all legal heirs clearly to prevent future court disputes",
      "Provide step-by-step instructions for municipal land mutation",
    ],
  },
  {
    id: "nro-remittance-fema",
    label: "NRE/NRO & FEMA Repatriation",
    icon: "coins",
    heading: "Indian Bank FDs, Demat Shares & RBI Remittance Rules",
    challengeSummary:
      "Indian professionals in DRC hold substantial balances in NRE and NRO bank accounts. Many believe bank nominees own the funds after death. Under Indian Supreme Court law, nominees act only as interim caretakers.",
    legalMechanism:
      "In Sarbati Devi, the Supreme Court held that bank nominees must transfer funds to legal heirs. A valid Indian Will names your true heirs. This avoids costly court succession certificates and enables smooth repatriation under RBI FEMA rules.",
    statutoryPrecedent:
      "Supreme Court Sarbati Devi Precedent & RBI FEMA Master Direction No. 13",
    recommendedInstrument:
      "Financial Portfolio Will with Direct Depository & IFSC Demarcation",
    checklist: [
      "List NRE, NRO, and FCNR bank accounts with branch IFSC codes",
      "Record depository 16-digit Demat Client IDs with NSDL or CDSL",
      "Appoint an India-resident executor to handle Form 15CA and 15CB filings",
    ],
  },
];

export default function NriDrCongoWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("drc-family-code-ringfencing");

  // Diagnostic State
  const [assetType, setAssetType] = useState<"urban_realty" | "financial_portfolios" | "ancestral_family">(
    "urban_realty"
  );
  const [citizenshipStatus, setCitizenshipStatus] = useState<"indian_nri" | "foreign_citizen_oci">(
    "indian_nri"
  );
  const [dualWillPreference, setDualWillPreference] = useState<"separate_wills" | "undecided">(
    "separate_wills"
  );

  const currentScenario =
    NRI_DR_CONGO_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_DR_CONGO_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationSummary = "";
  let actionPoints: string[] = [];

  if (assetType === "urban_realty") {
    recommendationTitle = "Indian Real Estate & Commercial Property Protection Plan";
    recommendationSummary =
      "For flats, commercial offices, and plots in Mumbai, Ahmedabad, Delhi NCR, or Bengaluru, your Will needs exact deed details and municipal tax IDs.";
    actionPoints = [
      "List sale deed registration numbers, plot boundaries, and survey IDs",
      "Ring-fence Indian flats to avoid Congolese court probate bottlenecks",
      "Name an India-resident executor for prompt property tax mutations",
    ];
  } else if (assetType === "financial_portfolios") {
    recommendationTitle = "Banking, Demat Shares & Mutual Fund Transmission Plan";
    recommendationSummary =
      "For NRE and NRO bank accounts, fixed deposits, and demat shares, an Indian Will is essential because bank nominees act only as trustees under Indian law.";
    actionPoints = [
      "Specify depository client IDs and bank branch IFSC details clearly",
      "Assist your heirs with fast Form 15CA and 15CB RBI remittance filings",
      "Shield your family from costly court succession certificate delays",
    ];
  } else {
    recommendationTitle = "Ancestral Property & Coparcenary Rights Protection Plan";
    recommendationSummary =
      "For ancestral houses and farmland in Gujarat, Punjab, or Maharashtra, your Will must ring-fence your distinct share under Indian succession laws.";
    actionPoints = [
      "Gather land revenue records, mutation extracts, and municipal tax cards",
      "Confirm shares of Class-I legal heirs to prevent court partition suits",
      "Execute the Will before two adult witnesses who are not beneficiaries",
    ];
  }

  return (
    <div className="w-full my-12 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
        <Scale className="w-4 h-4 text-[#C65378]" />
        <span>DR Congo-India Succession Assessment Framework</span>
      </div>

      <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-3">
        Interactive Succession Planner for NRIs in DR Congo
      </h3>

      <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F] mb-8 max-w-3xl">
        Select your legal concern below to evaluate DRC Family Code rules,
        Indian Embassy attestation steps, and drafting protocols under Indian law:
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 pb-6 mb-8 border-b border-[#172228]/10">
        {NRI_DR_CONGO_SCENARIOS.map((sc) => {
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
              {sc.icon === "landmark" && <Landmark className="w-3.5 h-3.5" />}
              {sc.icon === "coins" && <Coins className="w-3.5 h-3.5" />}
              {sc.icon === "building" && <Building2 className="w-3.5 h-3.5" />}
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
              Case Review &amp; Statutory Moat
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#111827] mb-3 leading-snug">
              {currentScenario.heading}
            </h3>
            <p className="text-[14.5px] leading-[1.68] text-[#374151] mb-5">
              {currentScenario.challengeSummary}
            </p>

            <div className="bg-white rounded-xl p-4 border border-[#172228]/10 mb-5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#172228] mb-1">
                Legal Rule &amp; Statutory Authority:
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
              Key legal checks for NRIs in DR Congo before signing your Will:
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

          <Link
            href="/contact"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
          >
            <span>Consult Cross-Border Lawyer</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 3-Question Diagnostic Assessment */}
      <div className="bg-[#FAF7F0] rounded-[24px] p-6 sm:p-8 border border-[#172228]/10">
        <div className="max-w-2xl mb-6">
          <span className="inline-block text-xs font-bold tracking-[0.16em] uppercase text-[#C65378] mb-1">
            Quick Diagnostic Tool
          </span>
          <h4 className="text-xl sm:text-2xl font-semibold text-[#111827] mb-2">
            Configure Your DR Congo-India Estate Blueprint
          </h4>
          <p className="text-xs sm:text-[13.5px] text-[#49585F] leading-relaxed">
            Answer 3 quick questions to receive a personalized legal action
            summary for your Indian properties and investments:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Question 1 */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#172228] mb-3">
              1. Primary Indian Asset Category
            </label>
            <div className="space-y-2">
              {[
                { val: "urban_realty", label: "Flats & Commercial Realty" },
                { val: "financial_portfolios", label: "NRE/NRO Bank & Demat Shares" },
                { val: "ancestral_family", label: "Ancestral Family Land & Plots" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setAssetType(opt.val as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    assetType === opt.val
                      ? "bg-[#172228] text-white font-semibold"
                      : "bg-[#FAF7F0] text-[#374151] hover:bg-[#F4EFE6]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#172228] mb-3">
              2. Nationality &amp; Diaspora Status
            </label>
            <div className="space-y-2">
              {[
                { val: "indian_nri", label: "Indian Passport Holder (NRI)" },
                { val: "foreign_citizen_oci", label: "Foreign Passport / OCI Card" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setCitizenshipStatus(opt.val as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    citizenshipStatus === opt.val
                      ? "bg-[#172228] text-white font-semibold"
                      : "bg-[#FAF7F0] text-[#374151] hover:bg-[#F4EFE6]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3 */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#172228] mb-3">
              3. Will Strategy Preference
            </label>
            <div className="space-y-2">
              {[
                { val: "separate_wills", label: "Separate Indian & DRC Wills" },
                { val: "undecided", label: "Single Combined Worldwide Will" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setDualWillPreference(opt.val as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    dualWillPreference === opt.val
                      ? "bg-[#172228] text-white font-semibold"
                      : "bg-[#FAF7F0] text-[#374151] hover:bg-[#F4EFE6]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Diagnostic Output Card */}
        <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#047857] mb-1.5">
              <ShieldCheck className="w-4 h-4 text-[#047857]" />
              <span>Recommended Legal Strategy</span>
            </div>
            <h4 className="text-lg font-semibold text-[#111827] mb-2">
              {recommendationTitle}
            </h4>
            <p className="text-xs sm:text-[13.5px] text-[#49585F] leading-relaxed mb-3">
              {recommendationSummary}
            </p>
            <ul className="space-y-1.5">
              {actionPoints.map((pt, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-xs sm:text-[13px] text-[#374151]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2.5 w-full md:w-auto shrink-0">
            <Link
              href="/start"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] px-6 py-3.5 transition-colors text-center"
            >
              <span>Draft Indian Will Online</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-xs font-bold uppercase tracking-[0.12em] px-6 py-3 transition-colors text-center"
            >
              <span>Speak to Advocate</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
