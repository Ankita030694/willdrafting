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

interface NriSwitzerlandScenario {
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

const NRI_SWITZERLAND_SCENARIOS: NriSwitzerlandScenario[] = [
  {
    id: "swiss-pila-art-90-choice",
    label: "Swiss PILA Art. 90 Choice",
    icon: "globe",
    heading: "Electing Indian Law Under Swiss PILA Article 90",
    challengeSummary:
      "Living in Zurich, Geneva, Basel, or Lausanne makes Swiss law apply by default. This causes conflicts between Swiss codes and Indian property laws.",
    legalMechanism:
      "Article 90(2) gives you the legal right to choose the law of your home country. Choosing Indian law ensures Indian courts hold sole authority over your Indian assets.",
    statutoryPrecedent:
      "Swiss PILA (IPRG) Art. 90(2) & Indian Succession Act 1925 Section 5",
    recommendedInstrument:
      "Indian Will with Express PILA Article 90 Choice of Law Recital",
    checklist: [
      "Record Indian passport details and Swiss residence address",
      "Insert explicit Swiss PILA Article 90(2) choice of law clause",
      "Separate Indian estate completely from Swiss testamentary documents",
    ],
  },
  {
    id: "zgb-forced-share-shield",
    label: "Swiss ZGB Pflichtteil Shield",
    icon: "landmark",
    heading: "Shielding Indian Assets from Swiss Forced Heirship",
    challengeSummary:
      "Swiss law gives forced shares to children and spouses. Even after recent legal reforms, forced shares restrict how you can give away your wealth.",
    legalMechanism:
      "Section 59 of the Indian Succession Act gives you 100% freedom over your self-acquired property. Electing Indian law protects your Indian assets from foreign forced share claims.",
    statutoryPrecedent:
      "Swiss Civil Code (ZGB) Arts. 457-640 & Indian Succession Act 1925 s. 59",
    recommendedInstrument:
      "Standalone Indian Will with 100% Testamentary Freedom",
    checklist: [
      "Confirm full individual ownership of self-acquired Indian flats and plots",
      "Bequeath assets based on your wishes without Swiss forced share cuts",
      "Name backup beneficiaries to protect family wealth across generations",
    ],
  },
  {
    id: "banking-pharma-exec-wealth",
    label: "Banking & Pharma Executives",
    icon: "coins",
    heading: "Indian Demat Shares, NRO Deposits & Mutual Funds",
    challengeSummary:
      "Indian professionals in Zurich, Basel, and Geneva hold bank deposits, mutual funds, and demat shares in India. Bank nominees do not own this money under Indian law.",
    legalMechanism:
      "The Supreme Court ruled that nominees are only temporary caretakers. A clear Indian Will transfers assets directly to heirs. Your family avoids costly court certificates.",
    statutoryPrecedent:
      "Supreme Court Sarbati Devi & Shakti Yezdani Precedents; RBI FEMA Rules",
    recommendedInstrument:
      "Asset Schedule with Demat Folios, PAN & Bank CIF Details",
    checklist: [
      "Document all NRE, NRO, and FCNR bank accounts with IFSC codes",
      "List 16-digit Demat Client IDs with NSDL or CDSL depositories",
      "Name an India-based executor to coordinate local asset transfers",
    ],
  },
  {
    id: "swiss-notary-chancellery-signing",
    label: "Swiss Notary & Apostille",
    icon: "building",
    heading: "Signing in Switzerland: Plain-Paper & Apostille SOP",
    challengeSummary:
      "Many NRIs think they must travel to India to sign on stamp paper. Traveling to India is not needed at all.",
    legalMechanism:
      "Signing on plain A4 paper before two witnesses in Switzerland is 100% valid under Section 63. You can also get a Swiss Notary seal and State Chancellery apostille for extra legal safety in India.",
    statutoryPrecedent:
      "Indian Succession Act 1925 s. 63 & Hague Apostille Convention 1961",
    recommendedInstrument:
      "Plain-Paper Execution with Optional Swiss Notary & Apostille",
    checklist: [
      "Sign in the presence of two independent adult witnesses in Switzerland",
      "Confirm witnesses are not beneficiaries or married to beneficiaries",
      "Optional: Notary signature authentication and State Chancellery apostille",
    ],
  },
];

export default function NriSwitzerlandWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("swiss-pila-art-90-choice");

  // Diagnostic State
  const [assetType, setAssetType] = useState<"urban_realty" | "financial_portfolios" | "ancestral_family">(
    "urban_realty"
  );
  const [citizenshipStatus, setCitizenshipStatus] = useState<"indian_nri" | "swiss_citizen_oci">(
    "indian_nri"
  );
  const [dualWillPreference, setDualWillPreference] = useState<"separate_wills" | "undecided">(
    "separate_wills"
  );

  const currentScenario =
    NRI_SWITZERLAND_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_SWITZERLAND_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationSummary = "";
  let actionPoints: string[] = [];

  if (assetType === "urban_realty") {
    recommendationTitle = "Indian Real Estate & Urban Flat Protection Plan";
    recommendationSummary =
      "For flats and land parcels in India, your Will needs exact deed numbers. It also needs municipal property tax IDs.";
    actionPoints = [
      "List undivided land shares (UDS) and registered conveyance deed numbers",
      "Incorporate PILA Article 90 election to bar Swiss forced share claims",
      "Designate an India-resident executor for prompt municipal mutation",
    ];
  } else if (assetType === "financial_portfolios") {
    recommendationTitle = "Liquid Banking, Demat & Mutual Fund Portfolio Plan";
    recommendationSummary =
      "For bank deposits, mutual funds, and demat shares, an Indian Will is vital. Nominees act only as caretakers under Indian law.";
    actionPoints = [
      "Record depository participant IDs and bank branch IFSC details with precision",
      "Equip heirs with RBI Form 15CA and 15CB remittance procedural guidelines",
      "Eliminate the need for expensive civil court succession certificate petitions",
    ];
  } else {
    recommendationTitle = "Ancestral Property & Coparcenary Rights Protection Plan";
    recommendationSummary =
      "For ancestral land in India, your Will must protect your family share under the Hindu Succession Act, 1956.";
    actionPoints = [
      "Obtain certified revenue records including Khasra, Khatauni, or 7/12 extracts",
      "Confirm Class-I legal heir entitlements to prevent family partition disputes",
      "Attest before two independent witnesses who are not beneficiaries",
    ];
  }

  return (
    <div className="w-full my-12 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
        <Scale className="w-4 h-4 text-[#C65378]" />
        <span>Switzerland-India Succession Assessment Framework</span>
      </div>

      <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-3">
        Interactive Succession Planner for NRIs in Switzerland
      </h3>

      <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F] mb-8 max-w-3xl">
        Select your legal concern below to evaluate Swiss PILA rules,
        Swiss Civil Code forced share risks, and drafting steps under Indian law:
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 pb-6 mb-8 border-b border-[#172228]/10">
        {NRI_SWITZERLAND_SCENARIOS.map((sc) => {
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
              Key legal checks for NRIs in Switzerland before signing your Will:
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
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.14em] py-3.5 px-5 transition-colors shadow-xs"
            >
              <span>Consult Cross-Border Advocate</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Diagnostic Interactive Assessment Box */}
      <div className="bg-[#F4EFE6] rounded-[24px] p-6 sm:p-8 border border-[#172228]/10">
        <div className="max-w-2xl mb-6">
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-1.5">
            Personalized Diagnostic Tool
          </div>
          <h4 className="text-lg sm:text-xl font-semibold text-[#111827] mb-2">
            Configure Your Switzerland-India Estate Architecture
          </h4>
          <p className="text-xs sm:text-[13px] text-[#55636D]">
            Select your Indian asset profile and citizenship status to generate
            a customized legal roadmap:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Asset Category */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#172228] mb-2">
              Primary Indian Assets
            </label>
            <div className="space-y-2">
              {[
                { id: "urban_realty", label: "Residential Flats & Commercial Plots" },
                { id: "financial_portfolios", label: "Bank Deposits, Demat & Mutual Funds" },
                { id: "ancestral_family", label: "Ancestral Agricultural & Family Land" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAssetType(opt.id as any)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    assetType === opt.id
                      ? "bg-white border-2 border-[#C65378] text-[#111827] font-semibold shadow-xs"
                      : "bg-white/70 border border-[#172228]/10 text-[#49585F] hover:bg-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Citizenship / Nationality */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#172228] mb-2">
              Citizenship Status
            </label>
            <div className="space-y-2">
              {[
                { id: "indian_nri", label: "Indian Passport Holder (NRI in Switzerland)" },
                { id: "swiss_citizen_oci", label: "Swiss Citizen with OCI Card" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setCitizenshipStatus(opt.id as any)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    citizenshipStatus === opt.id
                      ? "bg-white border-2 border-[#C65378] text-[#111827] font-semibold shadow-xs"
                      : "bg-white/70 border border-[#172228]/10 text-[#49585F] hover:bg-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dual-Will Architecture */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#172228] mb-2">
              Testamentary Structure
            </label>
            <div className="space-y-2">
              {[
                { id: "separate_wills", label: "Separate Indian & Swiss Wills (Recommended)" },
                { id: "undecided", label: "Single Worldwide Will (High Dispute Risk)" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setDualWillPreference(opt.id as any)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    dualWillPreference === opt.id
                      ? "bg-white border-2 border-[#C65378] text-[#111827] font-semibold shadow-xs"
                      : "bg-white/70 border border-[#172228]/10 text-[#49585F] hover:bg-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Advisory Output */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#172228]/10 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#047857] mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Tailored Estate Architecture: {recommendationTitle}</span>
          </div>
          <p className="text-[13.5px] leading-relaxed text-[#374151] mb-4">
            {recommendationSummary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {actionPoints.map((pt, idx) => (
              <div
                key={idx}
                className="bg-[#FAF7F0] p-3 rounded-xl border border-[#172228]/10 text-xs text-[#49585F] leading-snug flex items-start gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-1.5 shrink-0" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
