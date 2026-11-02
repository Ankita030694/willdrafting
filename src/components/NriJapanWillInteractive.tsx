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

interface NriJapanScenario {
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

const NRI_JAPAN_SCENARIOS: NriJapanScenario[] = [
  {
    id: "japan-55-percent-tax",
    label: "55% Inheritance Tax Ring-Fencing",
    icon: "globe",
    heading: "Ring-Fencing Indian Assets from Japanese 55% Inheritance Tax",
    challengeSummary:
      "Japan taxes inheritance up to 55%. If you live in Japan over 10 years, you become an Unlimited Taxpayer. Japan may tax your worldwide assets. Without a separate Indian Will, Japanese tax offices can audit your Indian land and flats.",
    legalMechanism:
      "Section 5 of the Indian Succession Act sets the Lex Situs rule for land. Indian law governs Indian real estate. A separate Indian Will draws a clear line between estates. It ring-fences your Indian assets and shields your family from dual taxes.",
    statutoryPrecedent:
      "Japanese Inheritance Tax Act ss. 1-2 & Indian Succession Act 1925 s. 5",
    recommendedInstrument:
      "Standalone Indian Will with Explicit Geographic Ring-Fencing Clause",
    checklist: [
      "Review your Japan residency years to check your tax class",
      "Isolate Indian properties from your Japanese estate filings",
      "Elect Indian Succession Act 1925 for all assets situated in India",
    ],
  },
  {
    id: "minpo-civil-code-iryubun",
    label: "Civil Code & Forced Heirship",
    icon: "landmark",
    heading: "Navigating Minpo Part V Forced Heirship & Indian Free Bequest",
    challengeSummary:
      "Part V of the Japanese Civil Code enforces forced heirship (Iryubun). It reserves up to half the estate for legal heirs. NRIs in Tokyo or Kobe often want to leave self-acquired Indian assets to chosen family members without forced shares.",
    legalMechanism:
      "Section 59 of the Indian Succession Act gives you 100% testamentary freedom. You can give your self-acquired Indian property to anyone you choose. A separate Indian Will protects your wishes and blocks foreign forced share claims.",
    statutoryPrecedent:
      "Japanese Civil Code Articles 882-1049 & Indian Succession Act s. 59",
    recommendedInstrument:
      "Non-Forced Heirship Testamentary Deed for Indian Real Estate",
    checklist: [
      "Demarcate self-acquired flats from ancestral coparcenary shares",
      "Expressly exclude foreign forced heirship claims over Indian assets",
      "Appoint an independent executor resident in India for local administration",
    ],
  },
  {
    id: "japanese-notary-mofa-apostille",
    label: "Notary & MOFA Apostille",
    icon: "building",
    heading: "Japanese Notary Public Execution & MOFA Apostille Protocol",
    challengeSummary:
      "NRIs in Tokyo, Yokohama, or Osaka often ask if they must fly to India to make a Will. You do not need to travel to India. You can sign your Indian Will while living in Japan.",
    legalMechanism:
      "Under Section 63 of the Indian Succession Act, you can sign on plain A4 paper. You need two adult witnesses who watch you sign. For extra proof, you can add a Japanese Notary stamp and MOFA Apostille, or visit the Indian Embassy in Tokyo.",
    statutoryPrecedent:
      "Indian Succession Act 1925 s. 63 & Hague Apostille Convention 1961",
    recommendedInstrument:
      "Two-Witness Plain Paper Will with MOFA Apostille or Embassy Attestation",
    checklist: [
      "Sign before two adult witnesses who are not beneficiaries in the Will",
      "Use Tokyo or Kanagawa One-Stop Notary & MOFA Apostille if desired",
      "Alternatively, book an attestation slot at the Indian Embassy in Tokyo",
    ],
  },
  {
    id: "tokyo-kobe-expats-repatriation",
    label: "IT & Merchant Wealth Claims",
    icon: "coins",
    heading: "Tokyo IT & Kobe Merchant Wealth: NRE/NRO Bank Transmission",
    challengeSummary:
      "Indian expats and merchants in Tokyo and Kobe hold bank accounts and mutual funds in India. Many believe bank nominees own the funds. Under Indian Supreme Court rulings, nominees are only interim caretakers.",
    legalMechanism:
      "In Sarbati Devi, the Supreme Court held that nominees must hand over funds to legal heirs. A valid Indian Will names your true heirs. This avoids civil court succession cases and speeds up RBI fund transfers to Japan.",
    statutoryPrecedent:
      "Supreme Court Sarbati Devi Precedent & RBI FEMA Master Direction No. 13",
    recommendedInstrument:
      "Financial Asset Schedule Will with Direct Depository & IFSC Demarcation",
    checklist: [
      "List NRE, NRO, and FCNR account numbers with branch IFSC codes",
      "Specify 16-digit Demat client IDs for mutual funds and equity holdings",
      "Empower your executor to obtain Form 15CA and 15CB tax clearances",
    ],
  },
];

export default function NriJapanWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("japan-55-percent-tax");

  // Diagnostic State
  const [assetType, setAssetType] = useState<"urban_realty" | "financial_portfolios" | "ancestral_business">(
    "urban_realty"
  );
  const [japanResidency, setJapanResidency] = useState<"under_10_years" | "over_10_years">(
    "under_10_years"
  );
  const [willPreference, setWillPreference] = useState<"separate_wills" | "single_will">(
    "separate_wills"
  );

  const currentScenario =
    NRI_JAPAN_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_JAPAN_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationSummary = "";
  let actionPoints: string[] = [];

  if (assetType === "urban_realty") {
    recommendationTitle = "Indian Real Estate & Urban Property Protection Plan";
    recommendationSummary =
      "For flats and land in Bengaluru, Mumbai, Pune, or Delhi NCR. Your Will needs deed details and survey numbers.";
    actionPoints = [
      "List deed numbers, sub-district details, and land shares",
      "Ring-fence Indian flats to avoid Japanese court delays",
      "Name an India-resident executor to handle local property mutation",
    ];
  } else if (assetType === "financial_portfolios") {
    recommendationTitle = "Liquid Banking, Demat & Mutual Fund Portfolio Plan";
    recommendationSummary =
      "For NRE and NRO bank accounts, fixed deposits, and Demat shares. Nominees act only as caretakers under Indian law.";
    actionPoints = [
      "List Demat client IDs and bank IFSC codes clearly",
      "Help your heirs with fast Form 15CA and 15CB money transfer",
      "Protect your family from costly court succession cases",
    ];
  } else {
    recommendationTitle = "Ancestral Property & Family Business Heritage Plan";
    recommendationSummary =
      "For ancestral land and family business shares in Gujarat or Maharashtra. Your Will must ring-fence your distinct share.";
    actionPoints = [
      "Check 7/12 land records, mutation entries, and tax receipts",
      "Confirm shares of all Class-I heirs to avoid family disputes",
      "Sign the Will before two non-beneficiary witnesses in Japan",
    ];
  }

  return (
    <div className="w-full my-12 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
        <Scale className="w-4 h-4 text-[#C65378]" />
        <span>Japan-India Succession Assessment Framework</span>
      </div>

      <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-3">
        Interactive Succession Planner for NRIs in Japan
      </h3>

      <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F] mb-8 max-w-3xl">
        Select your legal concern below to evaluate Japanese inheritance tax ring-fencing,
        Minpo forced heirship rules, and Indian Will drafting protocols:
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 pb-6 mb-8 border-b border-[#172228]/10">
        {NRI_JAPAN_SCENARIOS.map((sc) => {
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
              Key legal checks for NRIs in Japan before signing your Will:
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
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-xs font-bold uppercase tracking-[0.14em] py-3.5 px-5 transition-colors"
            >
              <span>Consult Indian Estate Lawyer</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Estate Configuration Tool */}
      <div className="rounded-[24px] bg-[#FAF7F0] p-6 sm:p-8 border border-[#172228]/10">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Interactive Estate Configuration Tool</span>
        </div>
        <h4 className="text-lg sm:text-xl font-semibold text-[#111827] mb-6">
          Tailor Your Japan-India Cross-Border Succession Plan
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Question 1 */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#172228] mb-2">
              1. Primary Indian Asset Portfolio
            </label>
            <select
              value={assetType}
              onChange={(e) =>
                setAssetType(
                  e.target.value as "urban_realty" | "financial_portfolios" | "ancestral_business"
                )
              }
              className="w-full bg-white border border-[#172228]/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#172228] focus:outline-hidden focus:border-[#C65378]"
            >
              <option value="urban_realty">Urban Flats, Villas &amp; Commercial Real Estate</option>
              <option value="financial_portfolios">NRE/NRO Fixed Deposits, Mutual Funds &amp; Demat</option>
              <option value="ancestral_business">Ancestral Agricultural Land &amp; Family Business</option>
            </select>
          </div>

          {/* Question 2 */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#172228] mb-2">
              2. Japan Residency Duration
            </label>
            <select
              value={japanResidency}
              onChange={(e) =>
                setJapanResidency(
                  e.target.value as "under_10_years" | "over_10_years"
                )
              }
              className="w-full bg-white border border-[#172228]/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#172228] focus:outline-hidden focus:border-[#C65378]"
            >
              <option value="under_10_years">Under 10 Years (Limited Taxpayer)</option>
              <option value="over_10_years">Over 10 Years / Permanent Resident (Unlimited Taxpayer)</option>
            </select>
          </div>

          {/* Question 3 */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#172228] mb-2">
              3. Will Architecture Preference
            </label>
            <select
              value={willPreference}
              onChange={(e) =>
                setWillPreference(
                  e.target.value as "separate_wills" | "single_will"
                )
              }
              className="w-full bg-white border border-[#172228]/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#172228] focus:outline-hidden focus:border-[#C65378]"
            >
              <option value="separate_wills">Separate Indian Will (Recommended Dual-Will Model)</option>
              <option value="single_will">Single Global Will (Higher Dispute &amp; Probate Risk)</option>
            </select>
          </div>
        </div>

        {/* Dynamic Recommendation Output */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-4 border-b border-[#172228]/10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C65378]">
                Customized Legal Advisory
              </span>
              <h4 className="text-base sm:text-lg font-semibold text-[#111827]">
                {recommendationTitle}
              </h4>
            </div>
            {japanResidency === "over_10_years" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
                High Priority: 55% Global Tax Exposure
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-[#49585F] leading-relaxed mb-4">
            {recommendationSummary}{" "}
            {japanResidency === "over_10_years"
              ? "You lived in Japan over 10 years. You are an Unlimited Taxpayer. Ring-fencing your Indian assets is vital."
              : "You lived in Japan under 10 years. Making a separate Indian Will now secures your estate early."}
          </p>

          <div className="space-y-2 mb-6">
            {actionPoints.map((pt, i) => (
              <div key={i} className="flex items-start gap-2 text-xs sm:text-[13px] text-[#374151]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#047857] shrink-0 mt-0.5" />
                <span>{pt}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Link
              href="/start"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.14em] py-3 px-6 transition-colors text-center"
            >
              <span>Draft Indian Will Online</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#374151] text-white text-xs font-bold uppercase tracking-[0.14em] py-3 px-6 transition-colors text-center"
            >
              <span>Schedule Cross-Border Advocate Consultation</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
