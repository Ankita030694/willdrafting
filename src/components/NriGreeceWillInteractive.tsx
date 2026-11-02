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

interface NriGreeceScenario {
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

const NRI_GREECE_SCENARIOS: NriGreeceScenario[] = [
  {
    id: "brussels-iv-choice-of-law",
    label: "Brussels IV Art. 22 Choice",
    icon: "globe",
    heading: "Electing Indian Succession Law Under Brussels IV",
    challengeSummary:
      "Under EU Regulation 650/2012 Article 21, living in Athens, Thessaloniki, or Crete defaults your succession to Greek law. This subjects your Indian assets to Greek court rules and forced shares.",
    legalMechanism:
      "Article 22 allows Indian passport holders to choose Indian law in their Will. Electing the Indian Succession Act ensures Indian law governs your Indian land, flats, and bank accounts.",
    statutoryPrecedent:
      "EU Succession Regulation No 650/2012 Art. 22 & Indian Succession Act 1925",
    recommendedInstrument:
      "Indian Will with Express Article 22 Choice of Law Clause",
    checklist: [
      "State your Indian passport number and residence in Greece",
      "Insert explicit Article 22 election of Indian succession law",
      "Ring-fence Indian assets from your separate Greek estate",
    ],
  },
  {
    id: "greek-forced-heirship-shield",
    label: "Greek Forced Heirship Shield",
    icon: "landmark",
    heading: "Shielding Indian Assets from Greek Forced Heirship",
    challengeSummary:
      "The Greek Civil Code (Articles 1825-1830) reserves forced shares (Nomimi Moira) of up to 50% for children, spouses, and parents. This can disrupt your intended distribution in India.",
    legalMechanism:
      "Section 59 of the Indian Succession Act grants 100% testamentary freedom over self-acquired wealth. Choosing Indian law insulates your Indian flats and bank deposits from Greek forced share claims.",
    statutoryPrecedent:
      "Greek Civil Code (Astikos Kodikas) Arts. 1825-1830 & Indian Succession Act s. 59",
    recommendedInstrument:
      "Standalone Indian Will with Complete Testamentary Freedom",
    checklist: [
      "Confirm full ownership over self-acquired assets in India",
      "Allocate specific shares to chosen beneficiaries without forced limits",
      "State clear testamentary intent to avoid cross-border disputes",
    ],
  },
  {
    id: "greek-notary-protodikeio-apostille",
    label: "Greek Notary & Apostille",
    icon: "building",
    heading: "Signing in Greece: Notary & Protodikeio Apostille",
    challengeSummary:
      "NRIs in Athens or Thessaloniki often ask if they must fly to India to sign a Will. You do not need to travel to India. You can execute your Will locally in Greece.",
    legalMechanism:
      "Section 63 allows signing on plain paper before two adult witnesses in Greece. For added security, attestation by a Greek Notary (Symvolaiografos) and a Protodikeio court apostille under the 1961 Hague Convention prevents disputes in India.",
    statutoryPrecedent:
      "Indian Succession Act 1925 s. 63 & Hague Apostille Convention 1961",
    recommendedInstrument:
      "Plain-Paper Will with Greek Notary Attestation or Indian Embassy Seal",
    checklist: [
      "Sign before two adult witnesses who are not beneficiaries in the Will",
      "Optional: Obtain Greek Notary attestation and Protodikeio court apostille",
      "Alternative: Attest the Will before the Embassy of India in Athens",
    ],
  },
  {
    id: "nre-nro-repatriation-workforce",
    label: "NRE/NRO & Demat Accounts",
    icon: "coins",
    heading: "Indian Mutual Funds, Demat Shares & Bank Accounts",
    challengeSummary:
      "Many Indian professionals and workers across Greece hold NRE, NRO, and fixed deposit accounts. Many believe bank nominees become legal owners. Under Indian law, this is incorrect.",
    legalMechanism:
      "The Supreme Court held in Sarbati Devi that bank nominees are only temporary custodians. A valid Indian Will grants legal ownership, avoids court succession certificates, and simplifies RBI fund repatriation.",
    statutoryPrecedent:
      "Supreme Court Sarbati Devi Precedent & RBI FEMA Master Direction No. 13",
    recommendedInstrument:
      "Financial Asset Schedule Will with Direct Depository & IFSC Demarcation",
    checklist: [
      "List NRE, NRO, and FCNR accounts with branch IFSC codes",
      "Record 16-digit Demat Client IDs with NSDL or CDSL depositories",
      "Name a trusted India-resident executor to handle asset claims",
    ],
  },
];

export default function NriGreeceWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("brussels-iv-choice-of-law");

  // Diagnostic State
  const [assetType, setAssetType] = useState<"urban_realty" | "financial_portfolios" | "ancestral_family">(
    "urban_realty"
  );
  const [citizenshipStatus, setCitizenshipStatus] = useState<"indian_nri" | "greek_citizen_oci">(
    "indian_nri"
  );
  const [dualWillPreference, setDualWillPreference] = useState<"separate_wills" | "undecided">(
    "separate_wills"
  );

  const currentScenario =
    NRI_GREECE_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_GREECE_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationSummary = "";
  let actionPoints: string[] = [];

  if (assetType === "urban_realty") {
    recommendationTitle = "Indian Real Estate & City Property Protection Plan";
    recommendationSummary =
      "For flats, commercial units, and plots across Indian cities, your Will requires exact registered deed citations and municipal tax identification numbers.";
    actionPoints = [
      "Record undivided land shares (UDS) and registered sale deed numbers",
      "Elect Indian law under Article 22 Brussels IV to stop Greek forced shares",
      "Appoint an India-resident executor for swift municipal property mutation",
    ];
  } else if (assetType === "financial_portfolios") {
    recommendationTitle = "Liquid Banking, Demat & Mutual Fund Portfolio Plan";
    recommendationSummary =
      "For NRE/NRO accounts, fixed deposits, and demat folios, an Indian Will is essential because bank nominees act strictly as interim trustees under Indian law.";
    actionPoints = [
      "Specify depository client IDs and bank branch IFSC details clearly",
      "Prepare your executors for RBI Form 15CA and 15CB capital repatriation",
      "Avoid costly civil court succession certificate proceedings in India",
    ];
  } else {
    recommendationTitle = "Ancestral Property & Coparcenary Rights Protection Plan";
    recommendationSummary =
      "For agricultural land and ancestral property in India, your Will must ring-fence your undivided share under the Hindu Succession Act, 1956.";
    actionPoints = [
      "Verify latest revenue mutation entries, Jamabandi, or Khatauni records",
      "Identify all Class-I legal heirs to safeguard against partition suits",
      "Execute the Will before two independent witnesses who are not heirs",
    ];
  }

  return (
    <div className="w-full my-12 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
        <Scale className="w-4 h-4 text-[#C65378]" />
        <span>Greece-India Succession Assessment Framework</span>
      </div>

      <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-3">
        Interactive Succession Planner for NRIs in Greece
      </h3>

      <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F] mb-8 max-w-3xl">
        Select your legal concern below to evaluate EU Brussels IV rules,
        Greek forced heirship risks, and drafting steps under Indian law:
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 pb-6 mb-8 border-b border-[#172228]/10">
        {NRI_GREECE_SCENARIOS.map((sc) => {
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
              Key legal checks for NRIs in Greece before signing your Will:
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
            Configure Your Greece-India Estate Blueprint
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
              {(
                [
                  { val: "urban_realty", label: "Flats & Commercial Realty" },
                  {
                    val: "financial_portfolios",
                    label: "NRE/NRO Bank & Demat Shares",
                  },
                  {
                    val: "ancestral_family",
                    label: "Ancestral Family Land & Plots",
                  },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setAssetType(opt.val)}
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
              2. Status in Greece
            </label>
            <div className="space-y-2">
              {(
                [
                  { val: "indian_nri", label: "Indian Passport Holder (NRI)" },
                  { val: "greek_citizen_oci", label: "Greek Citizen / OCI Holder" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setCitizenshipStatus(opt.val)}
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
              3. Estate Architecture
            </label>
            <div className="space-y-2">
              {(
                [
                  { val: "separate_wills", label: "Separate Ring-Fenced Indian Will" },
                  { val: "undecided", label: "Undecided / Advocate Guidance" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setDualWillPreference(opt.val)}
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
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378] mb-2">
            <span>Recommended Succession Action Plan</span>
          </div>
          <h4 className="text-lg sm:text-xl font-semibold text-[#111827] mb-2">
            {recommendationTitle}
          </h4>
          <p className="text-xs sm:text-[14px] text-[#49585F] leading-relaxed mb-4">
            {recommendationSummary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {actionPoints.map((pt, i) => (
              <div
                key={i}
                className="bg-[#FAF7F0] rounded-xl p-3 border border-[#172228]/10 text-xs text-[#374151] flex items-start gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                <span>{pt}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-[#172228]/10">
            <span className="text-xs text-[#55636D]">
              {citizenshipStatus === "indian_nri"
                ? "Indian Passport Holder: Full protection under Indian Succession Act 1925."
                : "OCI / Greek Citizen: Brussels IV Article 22 election required for Indian assets."}
            </span>
            <div className="flex items-center gap-3">
              <Link
                href="/start"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#172228] bg-[#FAF7F0] hover:bg-[#172228] hover:text-white px-5 py-3 rounded-full border border-[#172228]/15 transition-colors"
              >
                <span>Draft Online Will</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white bg-[#C65378] hover:bg-[#a13c5d] px-5 py-3 rounded-full transition-colors"
              >
                <span>Consult Advocate</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
