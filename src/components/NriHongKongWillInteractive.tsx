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

interface NriHongKongScenario {
  id: string;
  label: string;
  icon?: "globe" | "building" | "coins" | "landmark";
  heading: string; // Strictly <= 70 chars for Screaming Frog
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedInstrument: string;
  checklist: string[];
}

const NRI_HONG_KONG_SCENARIOS: NriHongKongScenario[] = [
  {
    id: "hk-wills-ordinance-ringfencing",
    label: "Wills Ordinance Cap 30",
    heading: "Harmonizing HK Wills Ordinance Cap 30 & Indian Succession Act",
    challengeSummary:
      "Under Section 5 of the Hong Kong Wills Ordinance (Cap 30), a Will requires signature before two concurrent witnesses. NRIs residing in Central, Wan Chai, or Kowloon often ask if a Hong Kong Will covers Indian flats or accounts. Without strict ring-fencing, a global Hong Kong Will forces Indian heirs into costly foreign probate procedures.",
    legalMechanism:
      "Section 5 of the Indian Succession Act 1925 mandates that succession to immovable property in India is regulated exclusively by Indian law (lex situs). A separate Indian Will with an express geographic ring-fencing clause ensures Indian assets bypass Hong Kong probate entirely, allowing direct execution in India.",
    statutoryPrecedent:
      "HK Wills Ordinance (Cap 30) s. 5 & Indian Succession Act 1925 s. 5",
    recommendedInstrument:
      "Dual Will Framework with Geographic Ring-Fencing Clause",
    checklist: [
      "Declare your residence and address in Hong Kong SAR",
      "Explicitly limit the Indian Will to assets located in India",
      "Prevent accidental revocation of your Hong Kong Will under Cap 30",
    ],
  },
  {
    id: "section-228-resealing-moat",
    label: "Probate Resealing & Sec 228",
    heading: "Section 228 Indian Succession Act Probate & Resealing Moat",
    challengeSummary:
      "When an NRI dies leaving a single worldwide Will proved in Hong Kong, the original Will is permanently retained by the High Court Probate Registry in Wan Chai. Indian land registries and banks cannot act on a simple foreign probate certificate.",
    legalMechanism:
      "To enforce a Hong Kong grant in India, executors must petition Indian High Courts under Section 228 of the Indian Succession Act 1925 for Letters of Administration with an authenticated court copy annexed. This can take 2 to 4 years. A standalone Indian Will completely bypasses Section 228 delays.",
    statutoryPrecedent:
      "Indian Succession Act 1925 s. 228 & HK Probate Ordinance Cap 10",
    recommendedInstrument:
      "Independent Indian Will with India-Resident Executor Appointment",
    checklist: [
      "Appoint an India-based executor to file local probate or mutation directly",
      "Avoid expensive court exemplification at the High Court of Hong Kong",
      "Enable swift transfer of Indian properties without foreign court delays",
    ],
  },
  {
    id: "business-fintech-demat-transmission",
    label: "Gems, Banking & FinTech",
    heading: "Indian Demat Shares, Mutual Funds & Business Asset Transfer",
    challengeSummary:
      "Indian entrepreneurs in Tsim Sha Tsui gem trading, Hung Hom electronics, and Central fintech firms hold substantial NRE/NRO fixed deposits, PMS portfolios, and Demat shares in India. Many mistakenly believe bank nominees become absolute owners.",
    legalMechanism:
      "Under the Supreme Court ruling in Sarbati Devi v. Usha Devi, nominees act merely as custodial trustees for legal heirs. Without an explicit Indian Will, financial institutions demand civil court Succession Certificates under Section 372. A Will specifying Demat IDs ensures direct transmission.",
    statutoryPrecedent:
      "Supreme Court Sarbati Devi Precedent & RBI FEMA Master Direction No. 13",
    recommendedInstrument:
      "Financial Asset Transmission Schedule Will with IFSC & DP Demarcation",
    checklist: [
      "Record 16-digit Demat Client IDs with NSDL and CDSL",
      "List NRE and NRO bank accounts with branch IFSC codes",
      "Specify succession rights for private corporate shares and LLP interests",
    ],
  },
  {
    id: "zero-estate-duty-repatriation",
    label: "Zero Estate Duty & Remittance",
    heading: "Hong Kong Zero Estate Duty & India Capital Gains Repatriation",
    challengeSummary:
      "Hong Kong abolished estate duty in 2006, and India abolished estate duty in 1985. While inheritance is tax-free in both jurisdictions, the subsequent sale of inherited Indian real estate attracts Indian capital gains tax and mandatory Section 195 TDS.",
    legalMechanism:
      "Under RBI FEMA regulations and the India-Hong Kong Double Taxation Avoidance Agreement (Comprehensive DTAA), heirs in Hong Kong can repatriate up to USD 1,000,000 per financial year through NRO accounts using Form 15CA and Form 15CB after securing a Section 197 Lower TDS Certificate.",
    statutoryPrecedent:
      "HK Revenue (Abolition of Estate Duty) Ord 2005 & RBI FEMA Master Direction 13",
    recommendedInstrument:
      "Tax-Optimized Estate Plan with Form 15CA/CB Repatriation Structure",
    checklist: [
      "Obtain Section 197 Lower TDS Certificate before selling inherited Indian land",
      "File Form 15CA and chartered accountant Form 15CB with dealer bank",
      "Remit up to USD 1,000,000 annually under RBI Liberalised Remittance routes",
    ],
  },
];

export default function NriHongKongWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("hk-wills-ordinance-ringfencing");

  // Diagnostic State
  const [assetType, setAssetType] = useState<"urban_realty" | "financial_portfolios" | "ancestral_family">(
    "urban_realty"
  );
  const [citizenshipStatus, setCitizenshipStatus] = useState<"indian_nri" | "hk_permanent_resident_oci">(
    "indian_nri"
  );
  const [dualWillPreference, setDualWillPreference] = useState<"separate_wills" | "undecided">(
    "separate_wills"
  );

  const currentScenario =
    NRI_HONG_KONG_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_HONG_KONG_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationSummary = "";
  let actionPoints: string[] = [];

  if (assetType === "urban_realty") {
    recommendationTitle = "Indian Real Estate & Urban Property Protection Plan";
    recommendationSummary =
      "For flats, commercial floors, and plots in Delhi NCR, Mumbai, Bengaluru, or Punjab, your Will needs exact deed registration numbers and municipal survey IDs.";
    actionPoints = [
      "Detail registered sale deed numbers, sub-registrar details, and undivided land shares",
      "Ring-fence Indian real estate to avoid Hong Kong High Court probate delays",
      "Designate an India-resident executor for swift municipal tax mutation",
    ];
  } else if (assetType === "financial_portfolios") {
    recommendationTitle = "Liquid Banking, Demat & Mutual Fund Portfolio Plan";
    recommendationSummary =
      "For NRE and NRO bank deposits, equity shares, and mutual funds, an Indian Will is vital because nominees act solely as caretakers under Indian law.";
    actionPoints = [
      "Document depository client IDs and bank branch IFSC details clearly",
      "Facilitate seamless Form 15CA and 15CB RBI cross-border capital repatriation",
      "Protect your heirs from lengthy succession certificate court proceedings",
    ];
  } else {
    recommendationTitle = "Ancestral Property & Coparcenary Rights Protection Plan";
    recommendationSummary =
      "For ancestral agricultural land, family homes, or HUF shares in Punjab, Haryana, Gujarat, or Maharashtra, your Will must ring-fence your distinct share.";
    actionPoints = [
      "Collate Jamabandi, 7/12 extracts, and municipal property tax receipts",
      "Clarify Class-I legal heir entitlements to prevent family partition disputes",
      "Execute the Will before two adult witnesses who are not beneficiaries",
    ];
  }

  return (
    <div className="w-full my-12 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
        <Scale className="w-4 h-4 text-[#C65378]" />
        <span>Hong Kong-India Cross-Border Succession Framework</span>
      </div>

      <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-3">
        Interactive Succession Planner for NRIs in Hong Kong
      </h3>

      <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F] mb-8 max-w-3xl">
        Select your legal concern below to evaluate Hong Kong Wills Ordinance Cap 30,
        Section 228 Indian Succession Act probate resealing, and drafting steps:
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 pb-6 mb-8 border-b border-[#172228]/10">
        {NRI_HONG_KONG_SCENARIOS.map((sc) => {
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
              Key legal checks for NRIs in Hong Kong before executing your Will:
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
            Configure Your Hong Kong-India Estate Blueprint
          </h4>
          <p className="text-xs sm:text-[13.5px] text-[#49585F] leading-relaxed">
            Answer 3 quick questions to receive a tailored legal action
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
                { val: "hk_permanent_resident_oci", label: "HK Permanent Resident / OCI" },
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
                { val: "separate_wills", label: "Separate Indian & HK Wills" },
                { val: "undecided", label: "Single Combined Global Will" },
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
