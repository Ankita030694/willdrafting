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

interface NriMozambiqueScenario {
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

const NRI_MOZAMBIQUE_SCENARIOS: NriMozambiqueScenario[] = [
  {
    id: "codigo-civil-forced-heirship",
    label: "Civil Code & Forced Heirs",
    icon: "globe",
    heading: "Harmonizing Mozambican Civil Code with Indian Succession Act",
    challengeSummary:
      "Under the Mozambican Civil Code, forced heir rules reserve up to two-thirds of an estate. A single Will made in Mozambique can lead to family friction. Mozambican courts cannot enforce forced heir rules on Indian land and flats.",
    legalMechanism:
      "Under Section 5 of the Indian Succession Act 1925, succession to Indian land follows Indian law. This is the lex situs rule. Indian law gives you 100% testamentary freedom over self-bought assets. A separate Indian Will protects your assets and avoids foreign forced heir claims.",
    statutoryPrecedent:
      "Mozambican Civil Code Arts. 2156-2167 & Indian Succession Act 1925 s. 5",
    recommendedInstrument:
      "Standalone Indian Will with Explicit Geographic Ring-Fencing Clause",
    checklist: [
      "State your home city in Maputo, Beira, or Nampula",
      "Ring-fence and exclude Mozambican business and land",
      "Elect Indian law for all Indian flats, land, and bank funds",
    ],
  },
  {
    id: "consular-attestation-hci-maputo",
    label: "HCI Maputo Consular Verification",
    icon: "building",
    heading: "Execution in Mozambique & HCI Maputo Attestation",
    challengeSummary:
      "NRIs in Maputo, Matola, and Nampula ask if they must travel to India to sign a Will. You do not need to travel to India. You can sign your Will right from Mozambique.",
    legalMechanism:
      "Under Section 63 of the Indian Succession Act 1925, you sign on plain white A4 paper before two adult witnesses. For extra proof, a Notary stamp and High Commission of India attestation in Maputo confirm genuine execution before Indian sub-registrars.",
    statutoryPrecedent:
      "Indian Succession Act 1925 s. 63 & Diplomatic Officers Act 1948",
    recommendedInstrument:
      "Plain-Paper Will with Consular Attestation from HCI Maputo",
    checklist: [
      "Sign before two adult witnesses who are not named heirs",
      "Add optional consular attestation at HCI Maputo on Av. Kenneth Kaunda",
      "Avoid Portuguese translations by writing your Indian Will in English",
    ],
  },
  {
    id: "gujarati-diaspora-ancestral-land",
    label: "Gujarati Diaspora & Ancestral Land",
    icon: "landmark",
    heading: "Ancestral Land Mutation & Pedhinama in Gujarat & Maharashtra",
    challengeSummary:
      "Many Gujarati families in Mozambique hold ancestral farm lands and family houses in Diu, Daman, Surat, Jamnagar, Rajkot, and Mumbai. Missing land records can freeze mutation when elders pass away.",
    legalMechanism:
      "A tailored Indian Will details your ancestral share under Section 6 of the Hindu Succession Act 1956. It references 7/12 land records, tax bills, and your family tree (Pedhinama) to stop distant relatives from grabbing family land.",
    statutoryPrecedent:
      "Hindu Succession Act 1956 s. 6 & Vineeta Sharma v. Rakesh Sharma",
    recommendedInstrument:
      "Ancestral Estate Schedule Will with Dedicated Mutation Powers",
    checklist: [
      "Check 7/12 land records, Khata numbers, and city survey cards",
      "Name all legal heirs to prevent partition suits in civil court",
      "Grant clear mutation powers to a trusted India-resident executor",
    ],
  },
  {
    id: "nre-nro-repatriation-fema",
    label: "NRE/NRO Banking & FEMA Remittance",
    icon: "coins",
    heading: "Indian Mutual Funds, Demat Shares & Bank Asset Transmission",
    challengeSummary:
      "NRIs in Mozambique hold NRE/NRO bank accounts, fixed deposits, and demat shares in India. Many think bank nominees become full owners upon death. Under Indian law, nominees are only temporary caretakers.",
    legalMechanism:
      "In Sarbati Devi, the Supreme Court ruled that nominees hold funds in trust for true legal heirs. A clear Indian Will names your heirs with bank details. This saves your family from court succession certificates and lets them send money out under RBI rules.",
    statutoryPrecedent:
      "Supreme Court Sarbati Devi Precedent & RBI FEMA Master Direction 13",
    recommendedInstrument:
      "Financial Asset Transmission Will with IFSC & Demat Demarcation",
    checklist: [
      "List NRE, NRO, and FCNR accounts with branch IFSC codes",
      "Write down 16-digit Demat Client IDs with NSDL or CDSL",
      "Name an executor to handle Form 15CA and 15CB tax compliance",
    ],
  },
];

export default function NriMozambiqueWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("codigo-civil-forced-heirship");

  // Diagnostic State
  const [assetType, setAssetType] = useState<"ancestral_family" | "urban_realty" | "financial_portfolios">(
    "ancestral_family"
  );
  const [citizenshipStatus, setCitizenshipStatus] = useState<"indian_nri" | "mozambique_citizen_oci">(
    "indian_nri"
  );
  const [dualWillPreference, setDualWillPreference] = useState<"separate_wills" | "undecided">(
    "separate_wills"
  );

  const currentScenario =
    NRI_MOZAMBIQUE_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_MOZAMBIQUE_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationSummary = "";
  let actionPoints: string[] = [];

  if (assetType === "urban_realty") {
    recommendationTitle = "Indian Real Estate & Urban Property Protection Plan";
    recommendationSummary =
      "For flats, shops, and plots in Ahmedabad, Mumbai, Pune, or Delhi NCR, your Will needs sale deed numbers and municipal tax codes.";
    actionPoints = [
      "List registered sale deed numbers, sub-registrar details, and land shares",
      "Ring-fence Indian flats to avoid complex Mozambican court probate delays",
      "Name an India-resident executor to speed up city mutation and Society NOC",
    ];
  } else if (assetType === "financial_portfolios") {
    recommendationTitle = "Liquid Banking, Demat & Mutual Fund Portfolio Plan";
    recommendationSummary =
      "For NRE and NRO bank accounts, fixed deposits, and demat shares, a Will is vital because nominees act only as trustees under Indian law.";
    actionPoints = [
      "Write down depository client IDs and bank IFSC codes with care",
      "Help heirs send inherited funds home under RBI 1 million USD yearly rule",
      "Save your family from costly court succession certificate petitions",
    ];
  } else {
    recommendationTitle = "Ancestral Property & Coparcenary Rights Protection Plan";
    recommendationSummary =
      "For ancestral houses and farm land in Gujarat, Diu, Daman, or Maharashtra, your Will must ring-fence your share under Indian law.";
    actionPoints = [
      "Collect 7/12 land records, form 6 entries, and property cards",
      "Confirm shares of all legal heirs to stop civil partition suits",
      "Sign the Will before two adult witnesses who are not heirs in the Will",
    ];
  }

  return (
    <div className="w-full my-12 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
        <Scale className="w-4 h-4 text-[#C65378]" />
        <span>Mozambique-India Succession Assessment Framework</span>
      </div>

      <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-3">
        Interactive Succession Planner for NRIs in Mozambique
      </h3>

      <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F] mb-8 max-w-3xl">
        Select your legal concern below to evaluate Mozambican Civil Code rules,
        High Commission of India attestation, and statutory steps under Indian law:
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 pb-6 mb-8 border-b border-[#172228]/10">
        {NRI_MOZAMBIQUE_SCENARIOS.map((sc) => {
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
              Key legal checks for NRIs in Mozambique before signing your Will:
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
            Configure Your Mozambique-India Estate Blueprint
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
                { val: "ancestral_family", label: "Ancestral Family Land & Plots" },
                { val: "urban_realty", label: "Flats & Commercial Realty" },
                { val: "financial_portfolios", label: "NRE/NRO Bank & Demat Shares" },
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
                { val: "mozambique_citizen_oci", label: "Mozambican / Portuguese (OCI)" },
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
                { val: "separate_wills", label: "Separate Indian & Mozambican Wills" },
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
