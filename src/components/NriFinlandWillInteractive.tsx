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

interface NriFinlandScenario {
  id: string;
  label: string;
  icon: "globe" | "building" | "coins" | "landmark";
  heading: string; // Strictly <= 70 chars for Screaming Frog compliance
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedInstrument: string;
  checklist: string[];
}

const NRI_FINLAND_SCENARIOS: NriFinlandScenario[] = [
  {
    id: "perintokaari-lakiosa-ringfencing",
    label: "Perintökaari & Lakiosa",
    icon: "globe",
    heading: "Bypassing Finnish Lakiosa Forced Heirship for Indian Realty",
    challengeSummary:
      "Chapter 7 Section 1 of the Finnish Perintökaari grants direct heirs a forced share called lakiosa. A single worldwide Will puts your Indian property at risk of foreign forced share claims in Finnish or Indian courts.",
    legalMechanism:
      "Under Section 5 of the Indian Succession Act, Indian land and flats follow the lex situs doctrine. Indian courts apply Indian law alone. Section 59 gives you 100 percent testamentary freedom over self-earned assets.",
    statutoryPrecedent:
      "Finnish Code of Inheritance (Perintökaari 40/1965) & Indian Succession Act 1925 ss. 5 & 59",
    recommendedInstrument:
      "Standalone Indian Will with Brussels IV Choice of Law & Ring-Fencing Clause",
    checklist: [
      "Ring-fence Indian assets from separate Finnish testamentti",
      "Assert choice of Indian law under EU Brussels IV Article 22",
      "Shield Indian flats and plots from Finnish lakiosa claims",
    ],
  },
  {
    id: "dvv-apostille-embassy",
    label: "DVV Apostille & Execution",
    icon: "building",
    heading: "Finnish DVV Apostille & Indian Embassy Legalization",
    challengeSummary:
      "Tech professionals in Helsinki, Espoo, and Tampere often wonder if they must fly to India to register a Will. You do not need to travel to India to make a valid Will.",
    legalMechanism:
      "Section 63 lets you sign on plain paper before two adult witnesses in Finland. For evidentiary strength, an apostille from the Digital and Population Data Services Agency (DVV) ensures seamless acceptance by Indian revenue offices.",
    statutoryPrecedent:
      "Indian Succession Act 1925 s. 63 & Hague Apostille Convention 1961",
    recommendedInstrument:
      "Plain-Paper Will with Finnish Public Notary & DVV Hague Apostille",
    checklist: [
      "Sign in Finland before two adult witnesses who are not heirs",
      "Authenticate notary signatures via DVV (Digi- ja väestötietovirasto)",
      "Optional attestation at Indian Embassy in Kulosaarentie, Helsinki",
    ],
  },
  {
    id: "tech-equity-financial-assets",
    label: "NRE/NRO & Demat Portfolios",
    icon: "coins",
    heading: "NRE/NRO Accounts, Demat Shares & Mutual Fund Claims",
    challengeSummary:
      "Indian engineers and researchers in Finland often hold mutual funds, Demat shares, and bank deposits in India. Many believe bank nominations pass legal ownership. Under Indian law, this is incorrect.",
    legalMechanism:
      "The Supreme Court ruled in Sarbati Devi that nominees are merely fiduciary trustees. A registered or apostilled Indian Will names your true heirs, avoiding costly court succession certificates and frozen bank folios.",
    statutoryPrecedent:
      "Supreme Court of India (AIR 1984 SC 346) & RBI FEMA Master Directions",
    recommendedInstrument:
      "Schedule of Indian Movable Assets with Depository & Bank Folios",
    checklist: [
      "List NRE, NRO, and FCNR bank accounts with branch IFSC codes",
      "Record 16-digit Demat Client IDs with NSDL or CDSL depositories",
      "Name an India-resident executor to handle asset transmission",
    ],
  },
  {
    id: "finland-perintovero-tax",
    label: "Perintövero & Repatriation",
    icon: "landmark",
    heading: "Finnish Perintövero Tax & RBI 1M USD Repatriation",
    challengeSummary:
      "Finland levies inheritance tax (perintövero) on worldwide assets if the deceased or heir resides in Finland. India levies no estate duty, but property sales trigger Indian capital gains tax with 20 percent TDS.",
    legalMechanism:
      "Under the India-Finland Double Taxation Avoidance Agreement (DTAA Article 13), taxes paid on capital gains in India can be credited in Finland. Heirs can repatriate up to 1 million USD per year using RBI Form 15CA and 15CB.",
    statutoryPrecedent:
      "India-Finland DTAA Art. 13 & Income Tax Act s. 197 & RBI FEM Regulations",
    recommendedInstrument:
      "Repatriation-Compliant Estate Plan with Section 197 Lower TDS Advisory",
    checklist: [
      "Obtain Section 197 Nil or Lower TDS Certificate before property sale",
      "File Form 15CA and Form 15CB through a certified Chartered Accountant",
      "Remit inheritance proceeds to Finnish bank accounts via NRO channels",
    ],
  },
];

export default function NriFinlandWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("perintokaari-lakiosa-ringfencing");

  // Diagnostic State
  const [assetType, setAssetType] = useState<"urban_realty" | "financial_portfolios" | "ancestral_family">(
    "urban_realty"
  );
  const [citizenshipStatus, setCitizenshipStatus] = useState<"indian_nri" | "finnish_citizen_oci">(
    "indian_nri"
  );
  const [dualWillPreference, setDualWillPreference] = useState<"separate_wills" | "undecided">(
    "separate_wills"
  );

  const currentScenario =
    NRI_FINLAND_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_FINLAND_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationSummary = "";
  let actionPoints: string[] = [];

  if (assetType === "urban_realty") {
    recommendationTitle = "Indian Real Estate & Urban Flat Protection Plan";
    recommendationSummary =
      "For apartments and land in Bengaluru, Hyderabad, Delhi NCR, Mumbai, Chennai, or Pune, your Will requires precise registered sale deed folios and municipal revenue survey numbers.";
    actionPoints = [
      "Record undivided land share (UDS) and registered sale deed numbers",
      "Ring-fence Indian realty to prevent Finnish lakiosa forced claims",
      "Appoint an India-resident executor for prompt municipal mutation",
    ];
  } else if (assetType === "financial_portfolios") {
    recommendationTitle = "Liquid Banking, Demat & Mutual Fund Portfolio Plan";
    recommendationSummary =
      "For NRE and NRO bank accounts, mutual funds, and demat shares, a Will is vital because nominees act only as temporary caretakers under Indian Supreme Court rulings.";
    actionPoints = [
      "List depository participant IDs and bank branch IFSC details clearly",
      "Guide heirs on RBI Form 15CA and 15CB fund repatriation procedures",
      "Protect your family from prolonged civil court succession proceedings",
    ];
  } else {
    recommendationTitle = "Ancestral Property & Coparcenary Rights Protection Plan";
    recommendationSummary =
      "For ancestral family property in India, your Will must ring-fence your specific partitioned share under the Hindu Succession Act, 1956, without infringing on other coparceners.";
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
        <span>Finland-India Succession Assessment Framework</span>
      </div>

      <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-3">
        Interactive Succession Planner for NRIs in Finland
      </h3>

      <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F] mb-8 max-w-3xl">
        Select your legal concern below to evaluate Finnish Perintökaari rules,
        forced heirship risks, and drafting steps under Indian law:
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 pb-6 mb-8 border-b border-[#172228]/10">
        {NRI_FINLAND_SCENARIOS.map((sc) => {
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
              Key legal checks for NRIs in Finland before signing your Will:
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
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>Consult Indian Estate Lawyer</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Diagnostics Section */}
      <div className="pt-8 border-t border-[#172228]/10">
        <div className="max-w-2xl mb-6">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-1 block">
            Self-Assessment Tool
          </span>
          <h4 className="text-xl sm:text-2xl font-semibold text-[#111827] mb-2">
            Configure Your Cross-Border Estate Profile
          </h4>
          <p className="text-xs sm:text-[13.5px] text-[#49585F] leading-relaxed">
            Select your primary Indian asset class, citizenship status, and
            testamentary strategy to review tailored legal recommendations:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Asset Selection */}
          <div className="bg-[#FAF7F0] p-4 sm:p-5 rounded-2xl border border-[#172228]/10">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#172228] mb-3">
              1. Primary Indian Asset Base
            </label>
            <div className="space-y-2">
              {[
                { id: "urban_realty", label: "Apartments & Land (Realty)" },
                { id: "financial_portfolios", label: "NRE/NRO, Demat & MF" },
                { id: "ancestral_family", label: "Ancestral Family Property" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAssetType(opt.id as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    assetType === opt.id
                      ? "bg-[#172228] text-white"
                      : "bg-white text-[#374151] hover:bg-[#F4EFE6] border border-[#172228]/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Status Selection */}
          <div className="bg-[#FAF7F0] p-4 sm:p-5 rounded-2xl border border-[#172228]/10">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#172228] mb-3">
              2. Status in Finland
            </label>
            <div className="space-y-2">
              {[
                { id: "indian_nri", label: "Indian Passport Holder (NRI)" },
                { id: "finnish_citizen_oci", label: "Finnish Citizen (OCI Cardholder)" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setCitizenshipStatus(opt.id as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    citizenshipStatus === opt.id
                      ? "bg-[#172228] text-white"
                      : "bg-white text-[#374151] hover:bg-[#F4EFE6] border border-[#172228]/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Testamentary Strategy */}
          <div className="bg-[#FAF7F0] p-4 sm:p-5 rounded-2xl border border-[#172228]/10">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#172228] mb-3">
              3. Will Strategy Choice
            </label>
            <div className="space-y-2">
              {[
                { id: "separate_wills", label: "Separate India & Finland Wills" },
                { id: "undecided", label: "Single Worldwide Will (High Risk)" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setDualWillPreference(opt.id as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    dualWillPreference === opt.id
                      ? "bg-[#172228] text-white"
                      : "bg-white text-[#374151] hover:bg-[#F4EFE6] border border-[#172228]/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Diagnostics Result Box */}
        <div className="bg-[#FAF7F0] rounded-2xl p-5 sm:p-7 border border-[#172228]/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-[#172228]/10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C65378]">
                Customized Action Plan
              </span>
              <h4 className="text-lg font-semibold text-[#111827]">
                {recommendationTitle}
              </h4>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-white text-[#172228] border border-[#172228]/10 font-semibold self-start sm:self-auto">
              {citizenshipStatus === "indian_nri" ? "NRI Legal Profile" : "OCI Legal Profile"}
            </span>
          </div>

          <p className="text-xs sm:text-[14px] text-[#49585F] leading-relaxed mb-4">
            {recommendationSummary}
          </p>

          {dualWillPreference === "undecided" && (
            <div className="p-3.5 mb-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
              <strong>Caution on Global Wills:</strong> A single worldwide Will executed in Finland requires costly ancillary probate before High Courts in India. Having two distinct Wills prevents court bottlenecks in both jurisdictions.
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {actionPoints.map((pt, idx) => (
              <div
                key={idx}
                className="bg-white p-3 rounded-xl border border-[#172228]/10 text-xs text-[#374151] flex items-start gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#047857] shrink-0 mt-0.5" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
