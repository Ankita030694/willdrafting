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

interface NriMaldivesScenario {
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

const NRI_MALDIVES_SCENARIOS: NriMaldivesScenario[] = [
  {
    id: "hci-male-consular-attestation",
    label: "HCI Malé Consular Attestation",
    icon: "building",
    heading: "Indian Will Execution via High Commission of India in Malé",
    challengeSummary:
      "Many Indian doctors, teachers, and resort workers in Malé ask if they must fly to India to write a Will. You do not need to travel to India. You can sign your Will right from the Maldives.",
    legalMechanism:
      "Under Section 3 of the Consular Officers Act, 1948, consular officers at the High Commission of India in Hulhumalé can attest your signature. Under Section 63 of the Indian Succession Act, this seal gives strong proof in Indian courts.",
    statutoryPrecedent:
      "Diplomatic & Consular Officers Act 1948 s. 3 & Indian Succession Act s. 63",
    recommendedInstrument:
      "Consular-Attested Indian Will with Hulhumalé HCI Official Notarial Stamp",
    checklist: [
      "Book a visit with the High Commission of India in Hulhumalé",
      "Bring two valid Indian passport copies and two adult Indian witnesses",
      "Sign the Will before the Consular Officer for official seal and stamp",
    ],
  },
  {
    id: "maldives-sharia-ringfencing",
    label: "Maldives Law vs Indian Lex Situs",
    icon: "globe",
    heading: "Harmonizing Maldives Succession Rules with Indian Succession Act",
    challengeSummary:
      "Succession in the Maldives follows local Islamic rules. Maldivian court orders and inheritance shares do not apply to land, flats, and wealth in India.",
    legalMechanism:
      "Under private international law and Section 5 of the Indian Succession Act, Indian land and flats follow the rule of the land where they sit. A separate Indian Will keeps your Indian assets safe and avoids foreign court delays.",
    statutoryPrecedent:
      "Indian Succession Act 1925 ss. 5 & 59 & Maldives Civil Code Rules",
    recommendedInstrument:
      "Standalone Indian Will with Explicit Foreign Asset Ring-Fencing Clause",
    checklist: [
      "State your home city in Malé, Hulhumalé, or resort atolls with passport info",
      "Keep all Indian land, flats, and bank deposits under Indian law",
      "Protect your local Maldives job benefits from unwanted changes",
    ],
  },
  {
    id: "medical-hospitality-portfolios",
    label: "Doctors & Resort Expats",
    icon: "coins",
    heading: "Indian NRE/NRO Bank Accounts, Demat Shares & Remittance Claims",
    challengeSummary:
      "Indian doctors at IGMH, Tree Top, and ADK Hospital save money in NRE/NRO accounts and mutual funds. Many think bank nominees own the money. Nominees are only caretakers under Indian law.",
    legalMechanism:
      "In Sarbati Devi, the Supreme Court ruled that nominees must hand over funds to legal heirs. A clear Indian Will names your true heirs. This saves your family from long court cases and lets them claim funds fast.",
    statutoryPrecedent:
      "Supreme Court Sarbati Devi Precedent & RBI FEMA Master Direction No. 13",
    recommendedInstrument:
      "Financial Asset Schedule Will with Direct Depository & IFSC Demarcation",
    checklist: [
      "Record 16-digit CDSL or NSDL Demat client IDs and mutual fund folios",
      "List NRE, NRO, and FCNR bank accounts with branch IFSC codes",
      "Name an India-resident executor to handle Form 15CA and 15CB money transfer",
    ],
  },
  {
    id: "plain-paper-atoll-execution",
    label: "Plain-Paper Signing on Atolls",
    icon: "landmark",
    heading: "Valid Will Signing Across Outer Atolls & Resort Islands",
    challengeSummary:
      "Expatriates living on distant resort islands in Baa, Ari, or Addu Atolls cannot easily visit Hulhumalé. Many worry that their Will is not valid without an embassy stamp or Indian stamp paper.",
    legalMechanism:
      "Under Section 63 of the Indian Succession Act, an Indian Will needs no stamp paper. You can print the draft on plain A4 paper on your island. You sign before two adult witnesses who are not heirs in the Will.",
    statutoryPrecedent:
      "Indian Succession Act 1925 s. 63 (Plain-Paper Testamentary Signing)",
    recommendedInstrument:
      "Dual-Witness Attested Plain-Paper Will with Medical Fitness Certificate",
    checklist: [
      "Print the approved legal draft on standard plain A4 paper",
      "Sign each page before two adult witnesses who watch you sign",
      "Make sure witnesses sign in your presence and are not named as heirs",
    ],
  },
];

export default function NriMaldivesWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>(
    "hci-male-consular-attestation"
  );

  // Diagnostic State
  const [assetType, setAssetType] = useState<
    "urban_realty" | "financial_portfolios" | "ancestral_family"
  >("urban_realty");
  const [locationHub, setLocationHub] = useState<
    "male_hulhumale" | "resort_atolls" | "addu_south"
  >("male_hulhumale");
  const [executionPreference, setExecutionPreference] = useState<
    "consular_hci" | "plain_paper"
  >("consular_hci");

  const currentScenario =
    NRI_MALDIVES_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_MALDIVES_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationSummary = "";
  let actionPoints: string[] = [];

  if (assetType === "urban_realty") {
    recommendationTitle =
      "Indian Real Estate & Urban Property Protection Plan";
    recommendationSummary =
      "For flats, offices, and plots in Kochi, Chennai, Bengaluru, Mumbai, or Delhi NCR, your Will needs exact deed details and municipal tax IDs.";
    actionPoints = [
      "List sale deed numbers, sub-registrar details, and undivided land shares",
      "Keep Indian flats separate from foreign rules to avoid court delays",
      "Name an India-based executor to handle land tax and Society transfers",
    ];
  } else if (assetType === "financial_portfolios") {
    recommendationTitle =
      "Liquid Banking, Demat & Mutual Fund Portfolio Plan";
    recommendationSummary =
      "For NRE and NRO bank accounts, fixed deposits, and demat shares, a Will is vital because nominees act only as trustees under Indian law.";
    actionPoints = [
      "Write down depository client IDs and bank branch IFSC details clearly",
      "Help your heirs with fast Form 15CA and 15CB RBI money transfer",
      "Protect your family from costly succession certificate court cases",
    ];
  } else {
    recommendationTitle =
      "Ancestral Property & Family Land Protection Plan";
    recommendationSummary =
      "For ancestral homes and joint family land in Kerala, Tamil Nadu, or elsewhere in India, your Will must ring-fence your distinct share.";
    actionPoints = [
      "Collect land revenue papers, patta records, and mutation extracts",
      "Confirm shares of Class-I legal heirs to prevent court partition fights",
      "Sign the Will before two adult witnesses who are not heirs in the Will",
    ];
  }

  return (
    <div className="w-full my-12 bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
        <Scale className="w-4 h-4 text-[#C65378]" />
        <span>Maldives-India Succession Assessment Framework</span>
      </div>

      <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-3">
        Interactive Succession Planner for NRIs in Maldives
      </h3>

      <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F] mb-8 max-w-3xl">
        Select your legal concern below to evaluate High Commission of India attestation,
        outer atoll plain-paper signing rules, and drafting steps under Indian law:
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 pb-6 mb-8 border-b border-[#172228]/10">
        {NRI_MALDIVES_SCENARIOS.map((sc) => {
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
              {sc.icon === "building" && <Building2 className="w-3.5 h-3.5" />}
              {sc.icon === "globe" && <Globe2 className="w-3.5 h-3.5" />}
              {sc.icon === "coins" && <Coins className="w-3.5 h-3.5" />}
              {sc.icon === "landmark" && <Landmark className="w-3.5 h-3.5" />}
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
              Key legal checks for NRIs in Maldives before executing your Will:
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
            Configure Your Maldives-India Estate Blueprint
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
              2. Your Maldives Base
            </label>
            <div className="space-y-2">
              {[
                { val: "male_hulhumale", label: "Malé / Hulhumalé Metropolitan" },
                { val: "resort_atolls", label: "Resort Islands & Atolls" },
                { val: "addu_south", label: "Addu City & Southern Atolls" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setLocationHub(opt.val as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    locationHub === opt.val
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
              3. Execution Preference
            </label>
            <div className="space-y-2">
              {[
                { val: "consular_hci", label: "Consular Attestation at HCI Malé" },
                { val: "plain_paper", label: "Plain-Paper Signing with 2 Witnesses" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setExecutionPreference(opt.val as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    executionPreference === opt.val
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
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#172228]/10 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-[#172228]/10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C65378] block mb-1">
                Custom Recommendation
              </span>
              <h4 className="text-lg font-semibold text-[#111827]">
                {recommendationTitle}
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#047857]/10 text-[#047857]">
                {executionPreference === "consular_hci"
                  ? "Consular Channel (HCI Malé)"
                  : "Plain Paper (Outer Atolls)"}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-[13.5px] text-[#49585F] leading-relaxed mb-4">
            {recommendationSummary}
          </p>

          <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151] mb-6">
            {actionPoints.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/start"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] px-6 py-3.5 transition-colors text-center"
            >
              <span>Draft Indian Will Online</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#172228]/20 hover:border-[#172228] text-[#172228] text-xs font-semibold px-5 py-3.5 transition-colors text-center"
            >
              <span>Schedule Advocate Call</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
