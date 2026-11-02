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

interface NriSpainScenario {
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

const NRI_SPAIN_SCENARIOS: NriSpainScenario[] = [
  {
    id: "brussels-iv-legitima-exemption",
    label: "Brussels IV & Legítima",
    icon: "globe",
    heading: "Electing Indian Law via Brussels IV Article 22",
    challengeSummary:
      "Under Spanish Civil Code Articles 806 to 822, forced heirship (legítima) reserves two-thirds of your estate for children. If you live in Madrid, Barcelona, or Valencia without electing national law, Spanish courts may apply forced heirship to your worldwide wealth.",
    legalMechanism:
      "Article 22 of EU Succession Regulation 650/2012 (Brussels IV) allows you to choose your national law (professio juris). By choosing the Indian Succession Act 1925 in an Indian Will, you completely exempt your Indian assets from Spanish legítima rules and preserve 100% testamentary freedom.",
    statutoryPrecedent:
      "EU Regulation 650/2012 Art. 22 & Spanish Civil Code Arts. 806-822 & Indian Succession Act 1925 s. 59",
    recommendedInstrument:
      "Standalone Indian Will with Brussels IV Professio Juris & Autonomous Recital",
    checklist: [
      "Declare your Indian citizenship and passport or OCI card numbers",
      "Explicitly invoke Article 22 of EU Regulation 650/2012 in your Will",
      "Ring-fence all Indian immovable and movable assets from Spanish forced shares",
    ],
  },
  {
    id: "colegio-notarial-apostille",
    label: "Spanish Notary & Apostille",
    icon: "building",
    heading: "Spanish Notary Signing & Hague Apostille Protocol",
    challengeSummary:
      "NRIs in Barcelona, Madrid, Valencia, and the Canary Islands often worry that signing an Indian Will requires traveling to India. You do not need to fly to India to execute your Will.",
    legalMechanism:
      "Under Section 63 of the Indian Succession Act, you can sign your Will on plain paper before two adult witnesses in Spain. For maximum legal weight, a Spanish Notary (Colegio Notarial) can certify your signature, followed by a Hague Apostille under the 1961 Convention. Indian registries accept apostilled papers without question.",
    statutoryPrecedent:
      "Hague Apostille Convention 1961 & Indian Succession Act 1925 s. 63",
    recommendedInstrument:
      "Plain-Paper Will with Colegio Notarial Attestation & Hague Apostille",
    checklist: [
      "Sign before two adult witnesses who are not named as heirs",
      "Optional notarial certification before a Spanish Notary Public",
      "Attach a Hague Apostille seal for easy verification by Indian municipal offices",
    ],
  },
  {
    id: "sindhi-canary-ancestral-realty",
    label: "Canary Islands & Sindhi Realty",
    icon: "landmark",
    heading: "Canary Islands Diaspora & Multi-City Indian Property",
    challengeSummary:
      "Sindhi business families in Tenerife, Las Palmas, and mainland Spain own valuable ancestral houses, commercial showrooms, and tenanted flats in Mumbai, Pune, Gujarat, and Delhi. Missing property papers can stall family transfers.",
    legalMechanism:
      "Our High Court advocates draft tailored asset schedules. We demarcate ancestral coparcenary shares from self-bought properties. We also add specific Housing Society share transmission clauses and revenue mutation directions.",
    statutoryPrecedent:
      "Hindu Succession Act 1956 s. 6 & Vineeta Sharma v. Rakesh Sharma (2020 SC)",
    recommendedInstrument:
      "Multi-Asset Indian Will with Municipal Schedule & Society Nominee Directives",
    checklist: [
      "Verify 7/12 land records, city survey extracts, and municipal tax receipts",
      "Name all legal heirs to preempt civil partition suits in Indian courts",
      "Grant clear administrative powers to India-resident executors for land mutations",
    ],
  },
  {
    id: "tech-expats-nro-repatriation",
    label: "Tech Expats & Bank Portfolios",
    icon: "coins",
    heading: "Indian Demat Portfolios, NRO Accounts & Repatriation",
    challengeSummary:
      "Indian tech professionals and corporate leaders in Madrid and Barcelona accumulate mutual funds, demat shares, and NRE or NRO fixed deposits in India. Many believe bank nominations transfer true ownership.",
    legalMechanism:
      "In Sarbati Devi, the Supreme Court ruled that nominees are only temporary custodians. Legal ownership passes strictly via a Will. A clear Indian Will names your true heirs, avoiding costly court succession certificates and speeding up RBI fund transfers.",
    statutoryPrecedent:
      "Supreme Court Sarbati Devi Precedent & RBI FEMA Master Direction No. 13",
    recommendedInstrument:
      "Financial Schedule Will with Demat Folios & FEMA Repatriation Roadmap",
    checklist: [
      "List all NRE, NRO, and FCNR bank accounts with branch IFSC codes",
      "Document 16-digit Demat Client IDs with NSDL and CDSL depositories",
      "Empower your executor to obtain Section 197 Lower TDS and Form 15CA/15CB",
    ],
  },
];

export default function NriSpainWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>(
    "brussels-iv-legitima-exemption"
  );

  // Diagnostic Decision State
  const [assetType, setAssetType] = useState<
    "urban_realty" | "financial_portfolios" | "ancestral_family"
  >("urban_realty");
  const [citizenshipStatus, setCitizenshipStatus] = useState<
    "indian_nri" | "spanish_citizen_oci"
  >("indian_nri");
  const [dualWillPreference, setDualWillPreference] = useState<
    "separate_wills" | "undecided"
  >("separate_wills");

  const currentScenario =
    NRI_SPAIN_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_SPAIN_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationSummary = "";
  let actionPoints: string[] = [];

  if (assetType === "urban_realty") {
    recommendationTitle = "Indian Real Estate & Urban Property Protection Plan";
    recommendationSummary =
      "For apartments, villas, and plots in Mumbai, Delhi NCR, Bengaluru, or Pune, your Will needs exact deed details, survey numbers, and municipal tax IDs.";
    actionPoints = [
      "List registered sale deed numbers, survey coordinates, and undivided land shares",
      "Invoke Brussels IV Article 22 to exempt Indian real estate from Spanish legítima rules",
      "Name an India-resident executor to handle Society transfers and Tehsildar mutation",
    ];
  } else if (assetType === "financial_portfolios") {
    recommendationTitle = "Liquid Banking, Demat & Mutual Fund Portfolio Plan";
    recommendationSummary =
      "For NRE and NRO bank accounts, fixed deposits, and demat shares, an Indian Will is vital because nominees act only as trustees under Indian law.";
    actionPoints = [
      "Document NSDL and CDSL depository client IDs and bank branch IFSC details",
      "Enable your heirs to utilize the 1 million USD annual FEMA remittance window",
      "Protect your family from costly and protracted succession certificate court cases",
    ];
  } else {
    recommendationTitle =
      "Ancestral Property & Coparcenary Rights Protection Plan";
    recommendationSummary =
      "For ancestral family homes, shops, and land across Maharashtra, Gujarat, or Punjab, your Will must ring-fence your distinct coparcenary share.";
    actionPoints = [
      "Delineate ancestral coparcenary shares from self-acquired real estate clearly",
      "Name all Class-I legal heirs under Section 6 of the Hindu Succession Act",
      "Specify dispute resolution clauses to protect against sibling partition suits",
    ];
  }

  return (
    <section className="w-full mb-16 sm:mb-24">
      {/* Header */}
      <div className="max-w-3xl mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <ShieldCheck className="w-4 h-4" />
          <span>Interactive Cross-Border Diagnostic</span>
        </div>
        <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
          Spain-India Estate Planning Roadmap
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Explore key succession challenges under Spanish law and the Indian
          Succession Act, or use our diagnostic tool to generate a tailored estate
          plan for your Indian assets:
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
        {NRI_SPAIN_SCENARIOS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-3.5 sm:p-4 rounded-2xl text-left transition-all border flex flex-col justify-between gap-3 ${
                isActive
                  ? "bg-[#172228] text-white border-[#172228] shadow-md"
                  : "bg-white text-[#172228] border-[#172228]/10 hover:border-[#C65378]/50"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`p-2 rounded-xl text-xs ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "bg-[#FAF7F0] text-[#C65378]"
                  }`}
                >
                  {tab.icon === "globe" && <Globe2 className="w-4 h-4" />}
                  {tab.icon === "building" && <Building2 className="w-4 h-4" />}
                  {tab.icon === "landmark" && <Landmark className="w-4 h-4" />}
                  {tab.icon === "coins" && <Coins className="w-4 h-4" />}
                </span>
                <span
                  className={`text-[10px] uppercase font-bold tracking-widest ${
                    isActive ? "text-[#C65378]" : "text-[#55636D]"
                  }`}
                >
                  Scenario
                </span>
              </div>
              <div className="text-xs sm:text-sm font-semibold leading-snug">
                {tab.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Tab Scenario Card */}
      <div className="bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#172228]/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] block mb-1">
              Statutory Precedent: {currentScenario.statutoryPrecedent}
            </span>
            <h4 className="text-xl sm:text-2xl font-medium text-[#111827] leading-snug">
              {currentScenario.heading}
            </h4>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#FAF7F0] border border-[#172228]/10 rounded-full px-4 py-2 text-xs font-semibold text-[#172228] shrink-0">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>Recommended: {currentScenario.recommendedInstrument}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#55636D] mb-1.5">
                The Cross-Border Challenge in Spain
              </h5>
              <p className="text-[14.5px] leading-[1.68] text-[#374151]">
                {currentScenario.challengeSummary}
              </p>
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#55636D] mb-1.5">
                The Legal Solution &amp; Statutory Mechanism
              </h5>
              <p className="text-[14.5px] leading-[1.68] text-[#374151]">
                {currentScenario.legalMechanism}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#FAF7F0] rounded-2xl p-5 sm:p-6 border border-[#172228]/10">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#172228] mb-3">
              Statutory Compliance Checklist
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#374151]">
              {currentScenario.checklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive Estate Plan Builder */}
      <div className="bg-[#172228] text-[#FAF7F0] rounded-[28px] p-6 sm:p-8 lg:p-10 shadow-lg">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] block mb-2">
            Tailored Strategy Builder
          </span>
          <h4 className="text-2xl sm:text-3xl font-medium text-white mb-3">
            Spain-India Estate Planning Roadmap
          </h4>
          <p className="text-xs sm:text-[13.5px] text-white/70 leading-relaxed">
            Select your Indian asset portfolio, Spanish residency status, and
            preferred estate structure to review our High Court advocate roadmap:
          </p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Asset Selection */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <label className="text-xs font-mono tracking-wider uppercase text-white/70 block mb-3">
              1. Primary Indian Asset Base
            </label>
            <div className="space-y-2">
              {[
                { id: "urban_realty", label: "Urban Residential Flats & Land" },
                {
                  id: "financial_portfolios",
                  label: "Demat Equities & NRO Accounts",
                },
                {
                  id: "ancestral_family",
                  label: "Ancestral & Commercial Realty",
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setAssetType(opt.id as any)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-medium transition-all ${
                    assetType === opt.id
                      ? "bg-[#C65378] text-white font-semibold"
                      : "bg-white/5 text-white/80 hover:bg-white/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Citizenship Status */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <label className="text-xs font-mono tracking-wider uppercase text-white/70 block mb-3">
              2. Status in Spain
            </label>
            <div className="space-y-2">
              {[
                {
                  id: "indian_nri",
                  label: "Indian Passport Holder (NRI Expat)",
                },
                {
                  id: "spanish_citizen_oci",
                  label: "Spanish Citizen (OCI Cardholder)",
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setCitizenshipStatus(opt.id as any)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-medium transition-all ${
                    citizenshipStatus === opt.id
                      ? "bg-[#C65378] text-white font-semibold"
                      : "bg-white/5 text-white/80 hover:bg-white/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Architecture Preference */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <label className="text-xs font-mono tracking-wider uppercase text-white/70 block mb-3">
              3. Will Architecture
            </label>
            <div className="space-y-2">
              {[
                {
                  id: "separate_wills",
                  label: "Dual-Will (Ring-Fenced India Will)",
                },
                {
                  id: "undecided",
                  label: "Undecided / Single Global Will",
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setDualWillPreference(opt.id as any)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-medium transition-all ${
                    dualWillPreference === opt.id
                      ? "bg-[#C65378] text-white font-semibold"
                      : "bg-white/5 text-white/80 hover:bg-white/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Recommendation Output */}
        <div className="bg-white/10 rounded-2xl p-6 sm:p-7 border border-white/15">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10">
            <div>
              <span className="text-[11px] font-mono tracking-wider uppercase text-[#C65378] block mb-1">
                Recommended Cross-Border Legal Protocol
              </span>
              <h5 className="text-lg sm:text-xl font-medium text-white">
                {recommendationTitle}
              </h5>
            </div>
            <span className="text-xs text-white/60">
              {citizenshipStatus === "indian_nri"
                ? "Indian Citizen · Spain Resident"
                : "Spanish National · OCI Cardholder"}
            </span>
          </div>

          <p className="text-xs sm:text-[13.5px] text-white/85 leading-relaxed mb-5">
            {recommendationSummary}
          </p>

          <div className="mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-white/70 mb-2.5">
              Priority Legal Actions for Spain NRIs
            </div>
            <ul className="space-y-2 text-xs sm:text-[13px] text-white/90">
              {actionPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-white/10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.14em] py-3.5 px-6 transition-colors text-center"
            >
              <span>Consult Cross-Border Lawyer</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/start"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-[0.14em] py-3.5 px-6 transition-colors text-center"
            >
              <span>Draft Indian Will Online</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
