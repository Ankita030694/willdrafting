"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Building2,
  Landmark,
  Coins,
  Scale,
  ShieldCheck,
} from "lucide-react";

interface NriBrazilScenario {
  id: string;
  label: string;
  icon: "scale" | "shield" | "building" | "coins";
  heading: string; // Strictly <= 70 chars for Screaming Frog
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedInstrument: string;
  checklist: string[];
}

const NRI_BRAZIL_SCENARIOS: NriBrazilScenario[] = [
  {
    id: "brazilian-civil-code-legitima",
    label: "Código Civil 50% Legítima",
    icon: "scale",
    heading: "Resolving Brazil Forced Share with Indian Succession Act",
    challengeSummary:
      "Articles 1.789 and 1.846 of the Brazilian Civil Code require a 50% forced share (legítima) for necessary heirs. If you live in São Paulo, Rio de Janeiro, or Curitiba, your family might argue this forced share applies to your Indian land and flats. A generic Will can cause years of dispute.",
    legalMechanism:
      "Under Article 8 and Article 10 of Brazilian LINDB rules, Brazilian courts respect local land laws for real estate abroad (lex rei sitae). Section 5 of the Indian Succession Act 1925 applies Indian law to Indian land. A separate Indian Will ring-fences your Indian assets and prevents Brazilian forced share claims.",
    statutoryPrecedent:
      "Brazilian Código Civil Arts. 1.789 & 1.846, LINDB Art. 8 & Indian Succession Act s. 5",
    recommendedInstrument:
      "Standalone Indian Will with Foreign Asset Ring-Fencing Clause",
    checklist: [
      "State your residence in Brazil and your passport details",
      "Ring-fence all Brazilian assets out of your Indian Will",
      "Elect the Indian Succession Act 1925 for all assets in India",
    ],
  },
  {
    id: "cartorio-apostille-hague",
    label: "Cartório Apostille & Signing",
    icon: "shield",
    heading: "Cartório de Notas Notarization & Hague Apostille Protocol",
    challengeSummary:
      "NRIs in Brazil often ask if they must fly to India to execute their Will. You do not need to fly to India. You can sign your Will right in Brazil.",
    legalMechanism:
      "Under Section 63 of the Indian Succession Act, you can sign your Will on plain paper before two adult witnesses. For extra proof in Indian courts, you can get your signature notarized at a Brazilian Cartório de Notas and add a Hague Apostille (Apostila de Haia). Indian registries accept apostilled papers under the 1961 Hague Convention.",
    statutoryPrecedent:
      "Indian Succession Act 1925 s. 63 & Hague Apostille Convention 1961 (CNJ Res. 228)",
    recommendedInstrument:
      "Plain-Paper Will with Cartório Attestation & Hague Apostille",
    checklist: [
      "Sign before two adult witnesses who are not heirs in the Will",
      "Get signature recognition (reconhecimento de firma) at a Cartório",
      "Attach a Hague Apostille (Apostila de Haia) for use in India",
    ],
  },
  {
    id: "sao-paulo-expats-urban-realty",
    label: "Urban Realty & Farmland",
    icon: "building",
    heading: "Flats & Farmland in Delhi NCR, Mumbai, Bengaluru & Punjab",
    challengeSummary:
      "Indian pharma, agro, and IT professionals in Brazil often own apartments in Mumbai, Bengaluru, or Delhi NCR, or ancestral farmland in Punjab and Gujarat. Missing land survey records can stall ownership transfer.",
    legalMechanism:
      "Our High Court lawyers draft clear Wills. We separate self-bought flats from family ancestral land. We record survey numbers, municipal tax codes, and Society share details. This gives your executor legal power to update municipal tax and land records smoothly.",
    statutoryPrecedent:
      "Hindu Succession Act 1956 s. 6 & Vineeta Sharma v. Rakesh Sharma (2020 SC)",
    recommendedInstrument:
      "Bespoke Succession Will with Municipal Schedule & Society Directives",
    checklist: [
      "Verify 7/12 extracts, Jamabandi, or City Survey property cards",
      "Name all Class-I heirs to avoid family partition suits in court",
      "Provide clear steps for Co-operative Housing Society transfers",
    ],
  },
  {
    id: "nre-nro-repatriation-fema",
    label: "Banking & RBI Repatriation",
    icon: "coins",
    heading: "NRE/NRO Bank Accounts, Demat Shares & RBI Fund Repatriation",
    challengeSummary:
      "NRIs in Brazil hold NRE, NRO, and FCNR bank accounts, fixed deposits, and mutual funds in India. Many believe bank nominees own the funds. Under Indian law, bank nominees are only temporary custodians.",
    legalMechanism:
      "In the Sarbati Devi case, the Supreme Court ruled that nominees must hand over funds to legal heirs. A separate Indian Will names your true heirs. This saves your family from expensive court succession certificates and speeds up RBI fund remittance to Brazil.",
    statutoryPrecedent:
      "Supreme Court Sarbati Devi Precedent & RBI FEMA Master Direction No. 13",
    recommendedInstrument:
      "Financial Asset Schedule Will with IFSC & Demat Demarcation",
    checklist: [
      "List NRE, NRO, and FCNR accounts with branch IFSC codes",
      "Record 16-digit Demat Client IDs with NSDL or CDSL depositories",
      "Appoint an India-resident executor to file Form 15CA and Form 15CB",
    ],
  },
];

export default function NriBrazilWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("brazilian-civil-code-legitima");

  // Diagnostic State
  const [assetType, setAssetType] = useState<"urban_realty" | "financial_portfolios" | "ancestral_family">(
    "urban_realty"
  );
  const [citizenshipStatus, setCitizenshipStatus] = useState<"indian_nri" | "brazilian_citizen_oci">(
    "indian_nri"
  );
  const [dualWillPreference, setDualWillPreference] = useState<"separate_wills" | "undecided">(
    "separate_wills"
  );

  const currentScenario =
    NRI_BRAZIL_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_BRAZIL_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationSummary = "";
  let actionPoints: string[] = [];

  if (assetType === "urban_realty") {
    recommendationTitle = "Indian Real Estate & Flat Succession Plan";
    recommendationSummary =
      "For flats, offices, and plots in Mumbai, Delhi NCR, Bengaluru, or Pune, your Will needs exact deed details and municipal tax IDs.";
    actionPoints = [
      "List registered sale deed numbers, survey details, and undivided land shares",
      "Ring-fence Indian flats to avoid Brazilian probate and forced share claims",
      "Name an India-resident executor for quick municipal mutation and Society transfer",
    ];
  } else if (assetType === "financial_portfolios") {
    recommendationTitle = "Indian Bank Deposits, Demat & Mutual Fund Portfolio Plan";
    recommendationSummary =
      "For NRE and NRO bank accounts, fixed deposits, and demat shares, an Indian Will is vital because nominees act only as trustees under Indian law.";
    actionPoints = [
      "Record depository client IDs and bank branch IFSC details clearly",
      "Help your heirs with fast Form 15CA and 15CB RBI money remittance to Brazil",
      "Protect your family from costly succession certificate court cases",
    ];
  } else {
    recommendationTitle = "Ancestral Property & Coparcenary Rights Protection Plan";
    recommendationSummary =
      "For ancestral houses and farmland in Punjab, Gujarat, or Maharashtra, your Will must ring-fence your distinct share under Indian laws.";
    actionPoints = [
      "Collect 7/12 land records, mutation entries, and municipal cards",
      "Confirm shares of Class-I legal heirs to prevent court partition fights",
      "Sign the Will before two adult witnesses who are not heirs in the Will",
    ];
  }

  return (
    <div className="w-full my-12 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
      {/* Eyebrow */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-[#172228]/10">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase">
          <Scale className="w-4 h-4" />
          <span>Interactive Cross-Border Legal Advisory</span>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#FAF7F0] border border-[#172228]/10 text-[#55636D]">
          Brazil-India Estate Diagnostic
        </span>
      </div>

      {/* Main Grid: Left Scenario Tabs / Right Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        {/* Scenario Selectors */}
        <div className="lg:col-span-4 flex flex-col gap-2.5">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] mb-1">
            Select Legal Scenario
          </span>
          {NRI_BRAZIL_SCENARIOS.map((scenario) => {
            const isActive = scenario.id === activeTab;
            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => setActiveTab(scenario.id)}
                className={`text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  isActive
                    ? "bg-[#172228] text-[#FAF7F0] border-[#172228] shadow-sm"
                    : "bg-[#FAF7F0]/60 hover:bg-[#FAF7F0] text-[#172228] border-[#172228]/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  {scenario.icon === "scale" && (
                    <Scale
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? "text-[#C65378]" : "text-[#55636D]"
                      }`}
                    />
                  )}
                  {scenario.icon === "shield" && (
                    <ShieldCheck
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? "text-[#C65378]" : "text-[#55636D]"
                      }`}
                    />
                  )}
                  {scenario.icon === "building" && (
                    <Building2
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? "text-[#C65378]" : "text-[#55636D]"
                      }`}
                    />
                  )}
                  {scenario.icon === "coins" && (
                    <Coins
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? "text-[#C65378]" : "text-[#55636D]"
                      }`}
                    />
                  )}
                  <span className="text-sm font-semibold leading-tight">
                    {scenario.label}
                  </span>
                </div>
                <span
                  className={`text-xs font-bold uppercase ${
                    isActive ? "text-[#C65378]" : "text-[#55636D]/60"
                  }`}
                >
                  View
                </span>
              </button>
            );
          })}
        </div>

        {/* Scenario Details Box */}
        <div className="lg:col-span-8 bg-[#FAF7F0]/40 rounded-2xl border border-[#172228]/10 p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#C65378] mb-2">
              Cross-Border Analysis
            </div>
            <h3 className="text-xl sm:text-2xl font-medium text-[#111827] mb-3 leading-snug">
              {currentScenario.heading}
            </h3>
            <p className="text-[14.5px] leading-[1.65] text-[#49585F] mb-4">
              {currentScenario.challengeSummary}
            </p>

            <div className="p-4 rounded-xl bg-white border border-[#172228]/10 mb-4">
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#172228] block mb-1.5">
                Indian Legal Solution:
              </span>
              <p className="text-[13.5px] leading-[1.6] text-[#374151]">
                {currentScenario.legalMechanism}
              </p>
            </div>

            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#55636D] block mb-2">
                Mandatory Execution Checklist:
              </span>
              <ul className="space-y-2 text-xs sm:text-[13px] text-[#374151]">
                {currentScenario.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-[#172228]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#55636D]">
            <span>
              <strong>Statute:</strong> {currentScenario.statutoryPrecedent}
            </span>
            <span className="font-semibold text-[#111827]">
              {currentScenario.recommendedInstrument}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Estate Diagnostic Section */}
      <div className="pt-8 border-t border-[#172228]/10">
        <div className="mb-6">
          <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#C65378] mb-1">
            Personalized NRI Diagnostic
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-[#111827]">
            Tailor Your Brazil-India Will Drafting Strategy
          </h3>
          <p className="text-xs sm:text-sm text-[#49585F]">
            Select your Indian asset profile, citizenship status, and Will structure preference:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Asset Type Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-[0.12em] text-[#55636D] block mb-2">
              Primary Indian Assets
            </label>
            <select
              value={assetType}
              onChange={(e) =>
                setAssetType(e.target.value as "urban_realty" | "financial_portfolios" | "ancestral_family")
              }
              aria-label="Primary Indian Assets"
              className="w-full bg-[#FAF7F0] border border-[#172228]/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#111827] focus:outline-hidden focus:border-[#C65378]"
            >
              <option value="urban_realty">Flats, Plots &amp; Commercial Realty</option>
              <option value="financial_portfolios">NRE/NRO Bank Accounts &amp; Demat</option>
              <option value="ancestral_family">Ancestral Farmland &amp; Family Homes</option>
            </select>
          </div>

          {/* Citizenship Status Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-[0.12em] text-[#55636D] block mb-2">
              Passport / Status
            </label>
            <select
              value={citizenshipStatus}
              onChange={(e) =>
                setCitizenshipStatus(e.target.value as "indian_nri" | "brazilian_citizen_oci")
              }
              aria-label="Passport / Status"
              className="w-full bg-[#FAF7F0] border border-[#172228]/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#111827] focus:outline-hidden focus:border-[#C65378]"
            >
              <option value="indian_nri">NRI (Indian Passport Holder)</option>
              <option value="brazilian_citizen_oci">OCI / Brazilian Passport Holder</option>
            </select>
          </div>

          {/* Dual Will Preference */}
          <div>
            <label className="text-xs font-bold uppercase tracking-[0.12em] text-[#55636D] block mb-2">
              Will Structure
            </label>
            <select
              value={dualWillPreference}
              onChange={(e) =>
                setDualWillPreference(e.target.value as "separate_wills" | "undecided")
              }
              aria-label="Will Structure"
              className="w-full bg-[#FAF7F0] border border-[#172228]/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#111827] focus:outline-hidden focus:border-[#C65378]"
            >
              <option value="separate_wills">Separate Wills (India &amp; Brazil)</option>
              <option value="undecided">Undecided / Review Needed</option>
            </select>
          </div>
        </div>

        {/* Dynamic Diagnostic Output Card */}
        <div className="p-6 rounded-2xl bg-[#172228] text-[#FAF7F0]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#C65378] block mb-1">
                Diagnostic Legal Strategy
              </span>
              <h4 className="text-base sm:text-lg font-semibold text-white">
                {recommendationTitle}
              </h4>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/90">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#047857]" />
              <span>Lex Situs Compliant</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-white/80 mb-5">
            {recommendationSummary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {actionPoints.map((point, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/90 leading-snug flex items-start gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-1.5 shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.14em] px-6 py-3 transition-colors"
            >
              <span>Consult High Court Advocate</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/start"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-[0.14em] px-6 py-3 transition-colors"
            >
              <span>Draft Online Will for India</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
