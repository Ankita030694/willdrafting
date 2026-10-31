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

interface NriGermanyScenario {
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

const NRI_GERMANY_SCENARIOS: NriGermanyScenario[] = [
  {
    id: "brussels-iv-choice-of-law",
    label: "Brussels IV Art. 22 Choice",
    icon: "globe",
    heading: "Electing Indian Succession Law Under Brussels IV",
    challengeSummary:
      "Under EU Regulation 650/2012 Article 21, living in Frankfurt, Munich, or Berlin defaults your estate to German law. This subjects your Indian assets to foreign court rules.",
    legalMechanism:
      "Article 22 lets Indian citizens choose Indian law in a Will. Electing the Indian Succession Act ensures Indian law governs your Indian land, flats, and bank accounts.",
    statutoryPrecedent:
      "EU Succession Regulation No 650/2012 Art. 22 & Indian Succession Act 1925",
    recommendedInstrument:
      "Indian Will with Express Article 22 Choice of Law Clause",
    checklist: [
      "State your Indian passport number and German home city",
      "Insert explicit Article 22 choice electing Indian law",
      "Ring-fence Indian assets from separate German estate papers",
    ],
  },
  {
    id: "prevent-german-pflichtteil",
    label: "German Pflichtteil Shield",
    icon: "landmark",
    heading: "Shielding Indian Assets from German Forced Heirship",
    challengeSummary:
      "German Civil Code Section 2303 gives children and spouses a forced cash claim of 50%. This can disrupt your gifts to parents or siblings in India.",
    legalMechanism:
      "Indian law gives you 100% freedom over your self-made wealth under Section 59. Choosing Indian law stops German forced heirship claims against your Indian estate.",
    statutoryPrecedent:
      "German Civil Code (BGB) ss. 2303-2338 & Indian Succession Act 1925 s. 59",
    recommendedInstrument:
      "Standalone Indian Will with Complete Testamentary Freedom",
    checklist: [
      "Confirm full ownership over self-acquired assets in India",
      "Give specific shares to chosen heirs without forced limits",
      "State clear reasons for gifts to avoid family disputes",
    ],
  },
  {
    id: "tech-diaspora-investments",
    label: "NRE/NRO & Demat Folios",
    icon: "coins",
    heading: "Indian Mutual Funds, Demat Shares & Bank Deposits",
    challengeSummary:
      "Indian tech pros in Munich and Berlin hold NRE and NRO accounts. Many think bank nominees become true owners. This is incorrect.",
    legalMechanism:
      "The Supreme Court ruled in Sarbati Devi that nominees are only temporary caretakers. A valid Indian Will gives true ownership and avoids court succession certificates.",
    statutoryPrecedent:
      "Supreme Court Sarbati Devi Precedent & RBI FEMA Master Directions",
    recommendedInstrument:
      "Will Schedule with Depository Client IDs & Bank CIFs",
    checklist: [
      "List NRE, NRO, and FCNR accounts with branch IFSC codes",
      "Record 16-digit Demat Client IDs with NSDL or CDSL",
      "Name a trusted India-resident executor to handle asset claims",
    ],
  },
  {
    id: "landgericht-notar-execution",
    label: "German Notary & Apostille",
    icon: "building",
    heading: "Signing in Germany: German Notar & Landgericht Apostille",
    challengeSummary:
      "NRIs often wonder if they must fly to India to make a valid Will. You do not need to travel to India.",
    legalMechanism:
      "Section 63 lets you sign on plain paper before two adult witnesses in Germany. For extra proof, a German Notary seal and Landgericht apostille prevent court fights.",
    statutoryPrecedent:
      "Indian Succession Act 1925 s. 63 & Hague Apostille Convention 1961",
    recommendedInstrument:
      "Plain-Paper Will with Notar Verification or Consular Seal",
    checklist: [
      "Sign before two adult witnesses who are not heirs in the Will",
      "Optional: Get German Notar attestation and Landgericht apostille",
      "Attach a doctor fitness certificate to prove sound mind",
    ],
  },
];

export default function NriGermanyWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("brussels-iv-choice-of-law");

  // Diagnostic State
  const [assetType, setAssetType] = useState<"urban_realty" | "financial_portfolios" | "ancestral_family">(
    "urban_realty"
  );
  const [citizenshipStatus, setCitizenshipStatus] = useState<"indian_nri" | "german_citizen_oci">(
    "indian_nri"
  );
  const [dualWillPreference, setDualWillPreference] = useState<"separate_wills" | "undecided">(
    "separate_wills"
  );

  const currentScenario =
    NRI_GERMANY_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_GERMANY_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationSummary = "";
  let actionPoints: string[] = [];

  if (assetType === "urban_realty") {
    recommendationTitle = "Indian Real Estate & City Property Protection Plan";
    recommendationSummary =
      "For flats and plots in Bengaluru, Pune, Delhi NCR, or Hyderabad, your Will needs exact deed details and municipal tax registration IDs.";
    actionPoints = [
      "List undivided land shares (UDS) and registered sale deed numbers",
      "Use Article 22 Brussels IV to stop German forced heirship claims",
      "Name an India-resident executor for fast municipal mutation",
    ];
  } else if (assetType === "financial_portfolios") {
    recommendationTitle = "Liquid Banking, Demat & Mutual Fund Portfolio Plan";
    recommendationSummary =
      "For NRE and NRO bank accounts, mutual funds, and demat shares, a Will is vital because nominees act only as trustees under Indian law.";
    actionPoints = [
      "List depository participant IDs and bank branch IFSC details clearly",
      "Guide heirs on RBI Form 15CA and 15CB money transfer steps",
      "Protect your family from costly court succession certificate fees",
    ];
  } else {
    recommendationTitle = "Ancestral Property & Coparcenary Rights Protection Plan";
    recommendationSummary =
      "For ancestral family land in India, your Will must ring-fence your share under the Hindu Succession Act, 1956, without harming other heirs.";
    actionPoints = [
      "Collect revenue mutation extracts and clear Khasra or Khatauni records",
      "Confirm shares of Class-I legal heirs to prevent partition suits",
      "Sign the Will before two neutral witnesses who are not heirs",
    ];
  }

  return (
    <div className="w-full my-12 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
        <Scale className="w-4 h-4 text-[#C65378]" />
        <span>Germany-India Succession Assessment Framework</span>
      </div>

      <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-3">
        Interactive Succession Planner for NRIs in Germany
      </h3>

      <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F] mb-8 max-w-3xl">
        Select your legal concern below to evaluate EU Brussels IV rules,
        German forced heirship risks, and drafting steps under Indian law:
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 pb-6 mb-8 border-b border-[#172228]/10">
        {NRI_GERMANY_SCENARIOS.map((sc) => {
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
              Key legal checks for NRIs in Germany before signing your Will:
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
            Configure Your Germany-India Estate Blueprint
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
              2. Nationality &amp; Residence Status
            </label>
            <div className="space-y-2">
              {[
                { val: "indian_nri", label: "Indian Passport Holder (NRI)" },
                { val: "german_citizen_oci", label: "German Passport / OCI Card" },
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
                { val: "separate_wills", label: "Separate Indian & German Wills" },
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
