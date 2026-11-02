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

interface NriNorwayScenario {
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

const NRI_NORWAY_SCENARIOS: NriNorwayScenario[] = [
  {
    id: "arveloven-pliktdelsarv-ringfencing",
    label: "Arveloven & Pliktdelsarv",
    icon: "globe",
    heading: "Bypassing Arveloven Forced Heirship for Indian Realty",
    challengeSummary:
      "Section 50 of the Norwegian Arveloven gives children a two-thirds forced share called pliktdelsarv. A single global Will puts your Indian land at risk. Foreign heirs may claim shares in court.",
    legalMechanism:
      "Section 5 of the Indian Succession Act applies Indian law to Indian land. Section 59 gives you full freedom over your self-earned assets. This shields your Indian flats from Norwegian forced shares.",
    statutoryPrecedent:
      "Norwegian Succession Act 2019 s. 50 & Indian Succession Act 1925 ss. 5 & 59",
    recommendedInstrument:
      "Standalone Indian Will with Explicit Geographic Ring-Fencing Clause",
    checklist: [
      "Ring-fence Indian assets from separate Norwegian testamente",
      "Assert Indian Succession Act 1925 under the lex situs doctrine",
      "Exclude Norwegian pliktdelsarv claims over Indian land and flats",
    ],
  },
  {
    id: "statsforvalteren-apostille",
    label: "Statsforvalteren Apostille",
    icon: "building",
    heading: "County Governor Apostille & Indian Embassy Attestation",
    challengeSummary:
      "NRIs often ask if they must fly to India to sign a Will. You do not need to travel to India. You can sign your Will right from Norway.",
    legalMechanism:
      "Section 63 lets you sign on plain paper before two adult witnesses in Norway. For extra proof, a County Governor apostille gives strong legal backing. Indian land registries accept apostilled papers under the 1961 Hague Convention.",
    statutoryPrecedent:
      "Indian Succession Act 1925 s. 63 & Hague Apostille Convention 1961",
    recommendedInstrument:
      "Plain-Paper Will with Notarius Publicus & Statsforvalteren Apostille",
    checklist: [
      "Sign before two adult witnesses who are not beneficiaries in the Will",
      "Notarize via Norwegian Tingrett or Notarius Publicus",
      "Obtain Hague Apostille from County Governor (Statsforvalteren)",
    ],
  },
  {
    id: "energy-tech-financial-assets",
    label: "NRE/NRO & Demat Portfolios",
    icon: "coins",
    heading: "NRE/NRO Accounts, Demat Shares & Offshore Remittances",
    challengeSummary:
      "Indian tech and energy specialists hold Demat shares, mutual funds, and bank deposits. Many believe bank nominees become true owners. This is incorrect.",
    legalMechanism:
      "The Supreme Court ruled in Sarbati Devi that nominees are only caretakers. A valid Indian Will names true owners. This avoids court succession certificates and speeds up bank claims under RBI rules.",
    statutoryPrecedent:
      "Supreme Court Sarbati Devi Precedent & RBI FEMA Master Directions",
    recommendedInstrument:
      "Will Schedule with Depository Demat IDs & Bank Branch Folios",
    checklist: [
      "List NRE, NRO, and FCNR accounts with branch IFSC codes",
      "Record 16-digit Demat Client IDs with NSDL or CDSL",
      "Name an India-resident executor to handle asset transmission",
    ],
  },
  {
    id: "norway-tax-kontinuitet",
    label: "Tax Continuity & Repatriation",
    icon: "landmark",
    heading: "Norwegian Tax Continuity & RBI Repatriation Protocol",
    challengeSummary:
      "Norway ended inheritance tax in 2014. But selling inherited Indian land later brings Indian capital gains tax. Buyers may deduct up to 20 percent tax at source.",
    legalMechanism:
      "Under the India-Norway tax treaty, India taxes land capital gains. Heirs in Norway can get a Section 197 Lower TDS Certificate. They can send up to 1 million USD per year to Norway under RBI rules using Forms 15CA and 15CB.",
    statutoryPrecedent:
      "India-Norway DTAA Art. 13 & Income Tax Act s. 197 & RBI FEM Regulations",
    recommendedInstrument:
      "Repatriation-Compliant Estate Plan with Section 197 Tax Advisory",
    checklist: [
      "Obtain Section 197 Nil or Lower TDS Certificate before property sale",
      "Prepare Chartered Accountant certified Forms 15CA and 15CB",
      "Remit proceeds to Norwegian bank accounts via authorized NRO channels",
    ],
  },
];

export default function NriNorwayWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("arveloven-pliktdelsarv-ringfencing");

  // Diagnostic State
  const [assetType, setAssetType] = useState<"urban_realty" | "financial_portfolios" | "ancestral_family">(
    "urban_realty"
  );
  const [citizenshipStatus, setCitizenshipStatus] = useState<"indian_nri" | "norwegian_citizen_oci">(
    "indian_nri"
  );
  const [dualWillPreference, setDualWillPreference] = useState<"separate_wills" | "undecided">(
    "separate_wills"
  );

  const currentScenario =
    NRI_NORWAY_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_NORWAY_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationSummary = "";
  let actionPoints: string[] = [];

  if (assetType === "urban_realty") {
    recommendationTitle = "Indian Real Estate & Urban Flat Protection Plan";
    recommendationSummary =
      "For flats and land in Bengaluru, Mumbai, Pune, Delhi NCR, or Hyderabad, your Will requires precise deed registration numbers and municipal revenue identification.";
    actionPoints = [
      "Record undivided land shares (UDS) and registered sale deed folios",
      "Ring-fence Indian realty to prevent Norwegian pliktdelsarv forced claims",
      "Appoint an India-resident executor for prompt municipal mutation",
    ];
  } else if (assetType === "financial_portfolios") {
    recommendationTitle = "Liquid Banking, Demat & Mutual Fund Portfolio Plan";
    recommendationSummary =
      "For NRE and NRO bank accounts, mutual funds, and demat shares, a Will is vital because nominees act only as temporary caretakers under Indian law.";
    actionPoints = [
      "List depository participant IDs and bank branch IFSC details clearly",
      "Guide heirs on RBI Form 15CA and 15CB fund repatriation procedures",
      "Protect your family from prolonged civil court succession proceedings",
    ];
  } else {
    recommendationTitle = "Ancestral Property & Coparcenary Rights Protection Plan";
    recommendationSummary =
      "For ancestral family property in India, your Will must ring-fence your specific share under the Hindu Succession Act, 1956, without infringing on other coparceners.",
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
        <span>Norway-India Succession Assessment Framework</span>
      </div>

      <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-3">
        Interactive Succession Planner for NRIs in Norway
      </h3>

      <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F] mb-8 max-w-3xl">
        Select your legal concern below to evaluate Norwegian Arveloven rules,
        forced heirship risks, and drafting steps under Indian law:
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 pb-6 mb-8 border-b border-[#172228]/10">
        {NRI_NORWAY_SCENARIOS.map((sc) => {
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
              Key legal checks for NRIs in Norway before signing your Will:
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

      {/* Interactive Estate Profile Diagnostic Tool */}
      <div className="pt-8 border-t border-[#172228]/10">
        <div className="max-w-2xl mb-6">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-1.5 block">
            Self-Assessment Tool
          </span>
          <h4 className="text-xl sm:text-2xl font-semibold text-[#111827] mb-2">
            Configure Your Norway-India Estate Profile
          </h4>
          <p className="text-xs sm:text-[13.5px] text-[#55636D]">
            Select your Indian asset holdings and citizenship status to receive
            tailored estate planning guidance:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Asset Category */}
          <div className="bg-[#FAF7F0] p-4 sm:p-5 rounded-2xl border border-[#172228]/10">
            <label className="text-xs font-bold uppercase tracking-wider text-[#172228] block mb-2">
              Primary Indian Asset Base
            </label>
            <select
              value={assetType}
              onChange={(e) =>
                setAssetType(
                  e.target.value as
                    | "urban_realty"
                    | "financial_portfolios"
                    | "ancestral_family"
                )
              }
              className="w-full bg-white border border-[#172228]/15 rounded-xl px-3 py-2 text-xs sm:text-sm text-[#111827] focus:outline-hidden focus:border-[#C65378]"
            >
              <option value="urban_realty">Self-Acquired Flats &amp; Plots</option>
              <option value="financial_portfolios">
                NRE/NRO Bank Accounts &amp; Demat
              </option>
              <option value="ancestral_family">
                Ancestral / HUF Family Property
              </option>
            </select>
          </div>

          {/* Legal Residency / Passport */}
          <div className="bg-[#FAF7F0] p-4 sm:p-5 rounded-2xl border border-[#172228]/10">
            <label className="text-xs font-bold uppercase tracking-wider text-[#172228] block mb-2">
              Immigration &amp; Passport Status
            </label>
            <select
              value={citizenshipStatus}
              onChange={(e) =>
                setCitizenshipStatus(
                  e.target.value as "indian_nri" | "norwegian_citizen_oci"
                )
              }
              className="w-full bg-white border border-[#172228]/15 rounded-xl px-3 py-2 text-xs sm:text-sm text-[#111827] focus:outline-hidden focus:border-[#C65378]"
            >
              <option value="indian_nri">NRI (Indian Passport Holder)</option>
              <option value="norwegian_citizen_oci">
                OCI / Norwegian Passport Holder
              </option>
            </select>
          </div>

          {/* Will Strategy */}
          <div className="bg-[#FAF7F0] p-4 sm:p-5 rounded-2xl border border-[#172228]/10">
            <label className="text-xs font-bold uppercase tracking-wider text-[#172228] block mb-2">
              Will Architecture Choice
            </label>
            <select
              value={dualWillPreference}
              onChange={(e) =>
                setDualWillPreference(
                  e.target.value as "separate_wills" | "undecided"
                )
              }
              className="w-full bg-white border border-[#172228]/15 rounded-xl px-3 py-2 text-xs sm:text-sm text-[#111827] focus:outline-hidden focus:border-[#C65378]"
            >
              <option value="separate_wills">
                Dual Wills (Separate Norway &amp; India)
              </option>
              <option value="undecided">
                Single Worldwide Will (High Delay Risk)
              </option>
            </select>
          </div>
        </div>

        {/* Dynamic Recommendation Card */}
        <div className="bg-[#172228] text-white rounded-2xl p-6 sm:p-7 border border-[#172228]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-[#C65378] text-[11px] font-bold uppercase tracking-[0.14em] mb-1">
              <span>Personalized Diagnostic Strategy</span>
            </div>
            <h4 className="text-lg sm:text-xl font-medium text-white mb-2">
              {recommendationTitle}
            </h4>
            <p className="text-xs sm:text-[13.5px] text-white/70 leading-relaxed mb-4">
              {recommendationSummary}
            </p>
            <ul className="space-y-1.5 text-xs text-white/90">
              {actionPoints.map((pt, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="shrink-0 flex flex-col gap-2.5 w-full md:w-auto">
            <Link
              href="/start"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] px-6 py-3.5 transition-colors text-center"
            >
              <span>Draft Online Will Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-5 py-2.5 transition-colors text-center"
            >
              <span>Speak to AMA Advocate</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
