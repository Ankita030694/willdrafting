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

interface NriRussiaScenario {
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

const NRI_RUSSIA_SCENARIOS: NriRussiaScenario[] = [
  {
    id: "civil-code-part-iii-ringfencing",
    label: "Civil Code Part III",
    icon: "globe",
    heading: "Harmonizing Russian Civil Code with Indian Succession Act",
    challengeSummary:
      "Under Article 1224 of the Russian Civil Code, your home city at death sets the basic rule. If you live in Moscow or Saint Petersburg, Russian law applies by default. A Will made only in Russia causes delays in India. Indian land offices and banks may not accept foreign court papers.",
    legalMechanism:
      "Article 1224 respects local land rules for real estate abroad. Section 5 of the Indian Succession Act governs Indian land and flats. A separate Indian Will protects your assets. It keeps your Indian estate free from foreign court delays.",
    statutoryPrecedent:
      "Civil Code of the Russian Federation Art. 1224 & Indian Succession Act 1925 s. 5",
    recommendedInstrument:
      "Standalone Indian Will with Explicit Geographic Ring-Fencing Clause",
    checklist: [
      "State your home city and passport details in Russia",
      "Keep Indian assets separate from your Russian Will",
      "Elect Indian Succession Act 1925 for all assets in India",
    ],
  },
  {
    id: "embassy-attestation-apostille",
    label: "Embassy & Apostille",
    icon: "building",
    heading: "Indian Embassy Attestation & Russian Notary Protocol",
    challengeSummary:
      "NRIs in Moscow, Saint Petersburg, and Kursk often ask if they must fly to India to sign a Will. You do not need to travel to India. You can sign your Will right from Russia.",
    legalMechanism:
      "Under Section 63 of the Indian Succession Act, you can sign on plain paper before two adult witnesses. For extra proof, an attestation at the Embassy of India in Moscow or Russian Notary apostille gives strong legal backing. Indian land registries accept apostilled papers under the 1961 Hague Convention.",
    statutoryPrecedent:
      "Indian Succession Act 1925 s. 63 & Hague Apostille Convention 1961",
    recommendedInstrument:
      "Plain-Paper Will with Consular Attestation or Russian Notary Apostille",
    checklist: [
      "Sign before two adult witnesses who are not heirs in the Will",
      "Optional: Add an Indian Embassy consular attestation in Moscow",
      "Attach a Russian Notary Hague Apostille for easy India use",
    ],
  },
  {
    id: "medical-trading-ancestral-realty",
    label: "Medical & Realty Assets",
    icon: "landmark",
    heading: "Ancestral Homes, Land & Urban Flats Succession in India",
    challengeSummary:
      "Many Indian doctors, researchers, and traders in Russia hold ancestral homes or flats in Delhi NCR, Punjab, and Maharashtra. Missing land papers can stall property transfer.",
    legalMechanism:
      "Our lawyers draft clear Wills. We separate family shares from self-bought flats. This gives your executor full legal power. Your family can update municipal tax books and Society share certificates smoothly.",
    statutoryPrecedent:
      "Hindu Succession Act 1956 ss. 6, 8 & Indian Succession Act 1925 s. 59",
    recommendedInstrument:
      "Bespoke Succession Will with Municipal Schedule & Society Directives",
    checklist: [
      "Check registered sale deeds, tax bills, and municipal records",
      "Name all Class-I heirs to avoid family partition suits in court",
      "Write clear steps for Co-operative Housing Society transfers",
    ],
  },
  {
    id: "vostro-banking-fema-repatriation",
    label: "Vostro & Banking Repatriation",
    icon: "coins",
    heading: "NRE/NRO Banking, Vostro Accounts & RBI Repatriation Quotas",
    challengeSummary:
      "Indian professionals in Russia hold NRE and NRO bank accounts. Many think bank nominees own the money. Under Indian Supreme Court rules, nominees are only temporary caretakers.",
    legalMechanism:
      "In Sarbati Devi, the Supreme Court ruled that nominees must hand over funds to legal heirs. A clear Indian Will names your true heirs. This saves your family from costly court succession certificates and speeds up RBI fund transfer.",
    statutoryPrecedent:
      "Supreme Court Sarbati Devi Precedent & RBI FEMA Master Direction No. 13",
    recommendedInstrument:
      "Financial Asset Schedule Will with Direct Depository & IFSC Demarcation",
    checklist: [
      "List NRE, NRO, and FCNR accounts with branch IFSC codes",
      "Write down 16-digit Demat Client IDs with NSDL or CDSL",
      "Name an India-resident executor to handle Form 15CA and 15CB filings",
    ],
  },
];

export default function NriRussiaWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("civil-code-part-iii-ringfencing");

  // Diagnostic State
  const [assetType, setAssetType] = useState<"urban_realty" | "financial_portfolios" | "ancestral_family">(
    "urban_realty"
  );
  const [citizenshipStatus, setCitizenshipStatus] = useState<"indian_nri" | "russian_citizen_oci">(
    "indian_nri"
  );
  const [dualWillPreference, setDualWillPreference] = useState<"separate_wills" | "undecided">(
    "separate_wills"
  );

  const currentScenario =
    NRI_RUSSIA_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_RUSSIA_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationSummary = "";
  let actionPoints: string[] = [];

  if (assetType === "urban_realty") {
    recommendationTitle = "Indian Real Estate & Urban Property Protection Plan";
    recommendationSummary =
      "For flats, offices, and plots in Delhi NCR, Mumbai, Bengaluru, or Hyderabad, your Will needs exact deed details, survey numbers, and municipal tax IDs.";
    actionPoints = [
      "List sale deed numbers, survey details, and undivided land shares",
      "Ring-fence Indian flats to avoid Russian notary and probate bottlenecks",
      "Name an India-resident executor for fast mutation and Society transfer",
    ];
  } else if (assetType === "financial_portfolios") {
    recommendationTitle = "Liquid Banking, Demat & Mutual Fund Portfolio Plan";
    recommendationSummary =
      "For NRE and NRO bank accounts, fixed deposits, and demat shares, a Will is vital because nominees act only as trustees under Indian law.";
    actionPoints = [
      "Write down depository client IDs and bank branch IFSC details clearly",
      "Help your heirs with fast Form 15CA and 15CB RBI money transfer",
      "Protect your family from costly court succession certificate delays",
    ];
  } else {
    recommendationTitle = "Ancestral Property & Coparcenary Rights Protection Plan";
    recommendationSummary =
      "For ancestral houses and land in Punjab, Haryana, Kerala, or Gujarat, your Will must ring-fence your distinct share under Indian succession laws.";
    actionPoints = [
      "Collect revenue records, mutation entries, and municipal tax receipts",
      "Confirm shares of Class-I legal heirs to prevent court partition fights",
      "Sign the Will before two adult witnesses who are not heirs in the Will",
    ];
  }

  return (
    <div className="w-full my-12 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
        <Scale className="w-4 h-4 text-[#C65378]" />
        <span>Russia-India Succession Assessment Framework</span>
      </div>

      <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-3">
        Interactive Succession Planner for NRIs in Russia
      </h3>

      <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F] mb-8 max-w-3xl">
        Select your legal concern below to evaluate Russian Civil Code Part III,
        Embassy attestation rules, and drafting steps under Indian succession law:
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 pb-6 mb-8 border-b border-[#172228]/10">
        {NRI_RUSSIA_SCENARIOS.map((sc) => {
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
              Key legal checks for NRIs in Russia before signing your Will:
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
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-xs font-bold uppercase tracking-[0.14em] py-3.5 px-4 transition-colors"
            >
              <span>Verify Russia NRI Assets</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Diagnostic Tool */}
      <div className="bg-[#FAF7F0] rounded-[24px] p-6 sm:p-8 border border-[#172228]/10">
        <div className="max-w-3xl mb-6">
          <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Interactive Estate Diagnostic</span>
          </div>
          <h4 className="text-xl sm:text-2xl font-medium text-[#111827] mb-2">
            Customize Your Russia Expat Estate Strategy
          </h4>
          <p className="text-xs sm:text-sm text-[#49585F]">
            Select your Indian asset class, citizenship status, and Will structure
            to view tailored legal recommendations:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Asset Classification */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#172228] mb-2.5">
              1. Primary Indian Asset Base
            </label>
            <div className="space-y-2">
              {[
                { id: "urban_realty", label: "Self-Acquired Urban Flats & Land" },
                { id: "financial_portfolios", label: "NRE/NRO Deposits & Demat Shares" },
                { id: "ancestral_family", label: "Ancestral Property & Coparcenary" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAssetType(opt.id as any)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
                    assetType === opt.id
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-white text-[#374151] border-[#172228]/10 hover:border-[#C65378]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Expat Status */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#172228] mb-2.5">
              2. Citizenship &amp; Passport Status
            </label>
            <div className="space-y-2">
              {[
                { id: "indian_nri", label: "Indian Passport Holder (NRI in Russia)" },
                { id: "russian_citizen_oci", label: "Russian Citizen / OCI Cardholder" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setCitizenshipStatus(opt.id as any)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
                    citizenshipStatus === opt.id
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-white text-[#374151] border-[#172228]/10 hover:border-[#C65378]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Will Strategy */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#172228] mb-2.5">
              3. Will Architecture Preference
            </label>
            <div className="space-y-2">
              {[
                { id: "separate_wills", label: "Separate Indian & Russian Wills" },
                { id: "undecided", label: "Single Worldwide Will (High Risk)" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setDualWillPreference(opt.id as any)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
                    dualWillPreference === opt.id
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-white text-[#374151] border-[#172228]/10 hover:border-[#C65378]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Diagnostic Output Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <h4 className="text-lg font-semibold text-[#111827]">
              {recommendationTitle}
            </h4>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#047857] bg-[#EBF6EE] px-3 py-1 rounded-full border border-[#047857]/20 w-fit">
              Tailored Strategy
            </span>
          </div>

          <p className="text-xs sm:text-[13.5px] text-[#49585F] leading-relaxed mb-4">
            {recommendationSummary}
          </p>

          <div className="space-y-2 mb-6">
            {actionPoints.map((pt, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-[#374151]">
                <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                <span>{pt}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/start"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.14em] py-3.5 px-6 transition-colors"
            >
              <span>Draft Your Indian Will Online</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-xs font-bold uppercase tracking-[0.14em] py-3.5 px-6 transition-colors"
            >
              <span>Schedule Lawyer Consultation</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
