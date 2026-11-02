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

interface NriDenmarkScenario {
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

const NRI_DENMARK_SCENARIOS: NriDenmarkScenario[] = [
  {
    id: "arveloven-tvangsarv-ringfencing",
    label: "Arveloven & Tvangsarv",
    heading: "Protecting Indian Property from Danish Forced Heirship",
    challengeSummary:
      "Danish Arveloven gives a 25 percent forced share to spouses and direct children. A single Danish Will puts your Indian land and flats at risk of foreign forced heirship claims.",
    legalMechanism:
      "Section 5 of the Indian Succession Act applies Indian law to Indian land. Section 59 grants complete testamentary freedom. A separate Indian Will shields Indian assets from Danish Arveloven forced shares.",
    statutoryPrecedent:
      "Danish Inheritance Act 2007 ss. 5 & 10 and Indian Succession Act 1925 ss. 5 & 59",
    recommendedInstrument:
      "Standalone Indian Will with Geographic Ring-Fencing Clause",
    checklist: [
      "Ring-fence Indian assets from separate Danish testamente",
      "Apply Indian Succession Act under the lex situs rule",
      "Exclude Danish forced heirship claims on Indian property",
    ],
  },
  {
    id: "denmark-brussels-iv-optout",
    label: "EU Brussels IV Opt-Out",
    heading: "Denmark Brussels IV Opt-Out & Dual-Will Architecture",
    challengeSummary:
      "Denmark opted out of EU Succession Regulation Brussels IV. Choice-of-law clauses valid in other EU nations do not apply under Danish law. Danish courts follow Danish domicile rules.",
    legalMechanism:
      "Without Brussels IV, you need two separate wills. A Danish Will handles your Danish home, pension, and accounts. A separate Indian Will controls your Indian land, bank accounts, and shares under Indian law.",
    statutoryPrecedent:
      "Protocol 22 to EU Treaties & Danish Private International Law Lex Domicilii",
    recommendedInstrument:
      "Harmonized Dual-Will Framework with Mutual Non-Revocation Clauses",
    checklist: [
      "Draft separate Danish Will for assets in Denmark",
      "Draft separate Indian Will for all Indian assets",
      "Include cross-referencing non-revocation clauses in both",
    ],
  },
  {
    id: "copenhagen-um-apostille",
    label: "Notar & UM Apostille",
    heading: "Danish Notary Certification & Foreign Ministry Apostille",
    challengeSummary:
      "Many Indians in Copenhagen, Aarhus, or Odense wonder if they must fly to India. You do not need to travel to India to sign a valid Will.",
    legalMechanism:
      "Section 63 allows signing on plain paper with two witnesses in Denmark. For added legal certainty in India, you can get it notarized at a Danish district court and apostilled by the Ministry of Foreign Affairs.",
    statutoryPrecedent:
      "Indian Succession Act 1925 s. 63 and Hague Apostille Convention 1961",
    recommendedInstrument:
      "Plain-Paper Will with Danish Notary and UM Apostille Verification",
    checklist: [
      "Sign before two adult witnesses who are not beneficiaries",
      "Optionally certify before a Danish Court Notary (Notar)",
      "Apostille via Danish Ministry of Foreign Affairs (Udenrigsministeriet)",
    ],
  },
  {
    id: "nre-nro-repatriation-tax",
    label: "Bank Claims & Repatriation",
    heading: "NRE/NRO Bank Accounts, Demat Shares & RBI Remittances",
    challengeSummary:
      "Tech and pharma professionals hold NRE or NRO accounts, mutual funds, and Demat shares. Bank nominees are only temporary caretakers under Indian law, not owners.",
    legalMechanism:
      "A clear Indian Will names exact beneficiaries for bank folios and Demat shares. When selling inherited land, heirs can send up to 1 million USD per year to Denmark under RBI rules using Form 15CA and 15CB.",
    statutoryPrecedent:
      "Supreme Court Sarbati Devi Precedent & RBI FEMA Master Directions",
    recommendedInstrument:
      "Asset Schedule with Demat Folios and Section 197 Tax Certificate",
    checklist: [
      "Record 16-digit Demat IDs with NSDL or CDSL depositories",
      "Specify NRE, NRO, and FCNR account branch details",
      "Secure Section 197 Lower TDS Certificate for property sales",
    ],
  },
];

export default function NriDenmarkWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>(
    "arveloven-tvangsarv-ringfencing"
  );

  // Diagnostic State
  const [assetType, setAssetType] = useState<
    "urban_realty" | "financial_portfolios" | "ancestral_family"
  >("urban_realty");

  const currentScenario =
    NRI_DENMARK_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_DENMARK_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationSummary = "";
  let actionPoints: string[] = [];

  if (assetType === "urban_realty") {
    recommendationTitle = "Indian Real Estate & Urban Flat Protection Plan";
    recommendationSummary =
      "For flats and plots in Delhi NCR, Mumbai, Bengaluru, Chennai, or Hyderabad, your Will needs exact deed registration numbers and municipal revenue survey marks.";
    actionPoints = [
      "Record undivided land share (UDS) and registered sale deed folios",
      "Ring-fence Indian real estate to block Danish Arveloven forced claims",
      "Appoint an India-resident executor for prompt municipal mutation",
    ];
  } else if (assetType === "financial_portfolios") {
    recommendationTitle = "Liquid Banking, Demat & Mutual Fund Portfolio Plan";
    recommendationSummary =
      "For NRE and NRO bank accounts, mutual funds, and Demat shares, a Will is vital because nominees act only as temporary caretakers under Indian law.";
    actionPoints = [
      "List depository participant IDs and bank branch IFSC details clearly",
      "Guide heirs on RBI Form 15CA and 15CB fund repatriation procedures",
      "Protect your family from prolonged civil court succession proceedings",
    ];
  } else {
    recommendationTitle = "Ancestral Property & Coparcenary Rights Protection Plan";
    recommendationSummary =
      "For ancestral family property in India, your Will must ring-fence your specific share under the Hindu Succession Act, 1956, without infringing on other coparceners.";
    actionPoints = [
      "Collect revenue mutation extracts and verified Khasra or Khatauni records",
      "Confirm shares of Class-I legal heirs to prevent future partition suits",
      "Execute the Will before two neutral witnesses who are not beneficiaries",
    ];
  }

  return (
    <div className="w-full my-12 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
        <Scale className="w-4 h-4 text-[#C65378]" />
        <span>Denmark-India Succession Assessment Framework</span>
      </div>

      <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-3">
        Interactive Succession Planner for NRIs in Denmark
      </h3>

      <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F] mb-8 max-w-3xl">
        Select your legal concern below to evaluate Danish Arveloven rules,
        forced heirship risks, and drafting steps under Indian law:
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 pb-6 mb-8 border-b border-[#172228]/10">
        {NRI_DENMARK_SCENARIOS.map((sc) => {
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
              Key legal checks for NRIs in Denmark before signing your Will:
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
              <span>Schedule Denmark NRI Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Asset Diagnostic Tool */}
      <div className="pt-8 border-t border-[#172228]/10">
        <div className="max-w-3xl mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C65378] block mb-1">
            Tailored Legal Diagnostic
          </span>
          <h4 className="text-xl sm:text-2xl font-semibold text-[#111827] mb-2">
            Select Your Primary Indian Asset Category
          </h4>
          <p className="text-xs sm:text-[13.5px] text-[#55636D]">
            Review tailored drafting requirements based on your specific asset portfolio in India:
          </p>
        </div>

        {/* Buttons for Asset Type */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {[
            {
              id: "urban_realty",
              label: "Flats & Land Plots",
              sub: "Apartments, commercial units, villas",
            },
            {
              id: "financial_portfolios",
              label: "Banking & Demat Funds",
              sub: "NRE/NRO accounts, shares, mutual funds",
            },
            {
              id: "ancestral_family",
              label: "Ancestral Family Land",
              sub: "HUF coparcenary shares, rural property",
            },
          ].map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() =>
                setAssetType(
                  type.id as
                    | "urban_realty"
                    | "financial_portfolios"
                    | "ancestral_family"
                )
              }
              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                assetType === type.id
                  ? "bg-[#FAF7F0] border-[#C65378] ring-1 ring-[#C65378]"
                  : "bg-white border-[#172228]/10 hover:border-[#172228]/30"
              }`}
            >
              <div className="text-sm font-semibold text-[#111827] mb-1">
                {type.label}
              </div>
              <div className="text-xs text-[#55636D]">{type.sub}</div>
            </button>
          ))}
        </div>

        {/* Output Box */}
        <div className="bg-[#FAF7F0] rounded-2xl p-6 border border-[#172228]/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#C65378] mb-1">
              Recommended Legal Action
            </div>
            <h4 className="text-lg font-semibold text-[#111827] mb-1">
              {recommendationTitle}
            </h4>
            <p className="text-xs sm:text-[13.5px] text-[#49585F] max-w-2xl mb-3">
              {recommendationSummary}
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-medium text-[#111827]">
              {actionPoints.map((pt, i) => (
                <span key={i} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#047857]" />
                  <span>{pt}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/start"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-xs font-semibold px-5 py-3 transition-colors"
            >
              <span>Draft Indian Will Online</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
