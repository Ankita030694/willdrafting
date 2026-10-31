"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Scale,
  ShieldCheck,
  Building2,
  Landmark,
  Coins,
  Globe2,
} from "lucide-react";

interface NriUsaScenario {
  id: string;
  label: string;
  icon: "building" | "globe" | "coins" | "landmark";
  heading: string; // Strictly <= 70 chars for Screaming Frog
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedInstrument: string;
  checklist: string[];
}

const NRI_USA_SCENARIOS: NriUsaScenario[] = [
  {
    id: "tech-exec",
    label: "Tech Exec: 401(k) & India Flat",
    icon: "building",
    heading: "US Tech Professional with Bangalore or Hyderabad Flat",
    challengeSummary:
      "Tech professionals in California or Washington state hold 401(k), RSUs, and US realty alongside residential flats in Bengaluru, Hyderabad, or Pune. Transferring Indian flats into a California Living Trust fails at Indian registries.",
    legalMechanism:
      "Under Section 5 of the Indian Succession Act, 1925, succession to immovable property is governed by Lex Situs (law of India). Indian Sub-Registrars do not recognize foreign trust assignments. A standalone Indian Will protects your flat without disturbing US retirement assets.",
    statutoryPrecedent:
      "Section 5 Indian Succession Act, 1925 & Lex Situs Doctrine",
    recommendedInstrument:
      "Dedicated Indian Will with Cross-Border Ring-Fencing Clause",
    checklist: [
      "Include clear schedule with survey numbers and undivided land share",
      "Draft non-revocation clause protecting US 401(k) and living trusts",
      "Name a trusted resident executor in India to handle local municipal khata",
    ],
  },
  {
    id: "ancestral-land",
    label: "Texas NRI: Ancestral Farmland",
    icon: "globe",
    heading: "Ancestral Agricultural Land Inheritance in Punjab or Gujarat",
    challengeSummary:
      "Second-generation OCIs or US green card holders often inherit ancestral farm plots in Punjab, Haryana, or Gujarat. Foreign heirs worry if FEMA rules permit them to inherit farmland.",
    legalMechanism:
      "Under FEMA Regulation 3(1)(b) (Transfer of Immovable Property in India), NRIs and OCIs can lawfully inherit any agricultural land or farmhouse from a person resident in India. A specific Indian Will avoids intestacy fights among cousins.",
    statutoryPrecedent:
      "FEMA 1999 Reg 3(1)(b) & Section 63 Indian Succession Act",
    recommendedInstrument:
      "Section 63 Attested Indian Will with Revenue Mutation Mandate",
    checklist: [
      "Verify ancestral land jamabandi, 7/12 extract, or khatian records",
      "Execute plain-paper Will before two adult non-beneficiary witnesses in US",
      "Appoint an Indian Power of Attorney agent for Revenue Tehsil mutation",
    ],
  },
  {
    id: "finance-nre",
    label: "NY/NJ Finance: NRE & Demat",
    icon: "coins",
    heading: "NRE/NRO Fixed Deposits, Mutual Funds & Demat Shares",
    challengeSummary:
      "Financial executives in New York and New Jersey accumulate large balances in NRE/NRO fixed deposits, portfolio mutual funds, and Zerodha or Groww demat holdings. Bank nominations alone do not give legal ownership.",
    legalMechanism:
      "In Sarbati Devi (Supreme Court), judges confirmed that a bank nominee is merely a trustee for lawful heirs. Without a Will, Indian bank funds freeze until heirs get a court Succession Certificate. A clear Indian Will transfers accounts smoothly.",
    statutoryPrecedent:
      "Sarbati Devi Precedent & RBI Master Directions on Accounts",
    recommendedInstrument:
      "Testamentary Bequest Specifying Bank & DP Client ID Portfolios",
    checklist: [
      "List NRE, NRO, and FCNR account numbers with respective IFSC branches",
      "Record Demat 16-digit Client IDs with CDSL or NSDL depository names",
      "Ensure heirs understand RBI annual 1 Million USD remittance via Form 15CA/CB",
    ],
  },
  {
    id: "senior-dual-will",
    label: "Senior Couple: Dual Wills",
    icon: "landmark",
    heading: "Dual US-India Concurrent Wills Without Court Delays",
    challengeSummary:
      "Retired NRI couples living in Illinois, Florida, or California want their surviving spouse to inherit assets smoothly in both nations without waiting 2 years for overseas probate resealing.",
    legalMechanism:
      "Concurrent Wills allow the US Will to be probated in local county surrogate courts while the Indian Will is acted on immediately in India under Section 228 of the Succession Act. Mutual mirror clauses protect both spouses.",
    statutoryPrecedent:
      "Hague Apostille Convention 1961 & Section 228 ISA 1925",
    recommendedInstrument:
      "Mirror Concurrent Indian Wills for Husband and Wife",
    checklist: [
      "Draft simultaneous mirror clauses conferring absolute survivor rights",
      "Designate alternate adult executors in India if survivor is overseas",
      "Obtain Hague Apostille stamp from US State Secretary of State for safety",
    ],
  },
];

export default function NriUsaWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("tech-exec");

  // 3-Question Cross-Border Diagnostic State
  const [hasUsTrust, setHasUsTrust] = useState<"trust" | "none">("trust");
  const [indiaAssetType, setIndiaAssetType] = useState<"property" | "financial">(
    "property"
  );
  const [citizenship, setCitizenship] = useState<"nri" | "oci">("nri");

  const currentScenario =
    NRI_USA_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_USA_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationDetails = "";
  let recommendationAction = "";

  if (hasUsTrust === "trust" && indiaAssetType === "property") {
    recommendationTitle = "Dedicated Indian Will with Trust Ring-Fencing";
    recommendationDetails =
      "Your US Revocable Living Trust cannot legally convey real estate situated in India due to the Lex Situs doctrine. You need a standalone Indian Will that expressly excludes US trust assets and provides clean title transfer for Indian properties.";
    recommendationAction = "Draft Separate Indian Will";
  } else if (hasUsTrust === "trust" && indiaAssetType === "financial") {
    recommendationTitle = "Indian Will Specifying NRE/NRO & Demat Accounts";
    recommendationDetails =
      "Indian banks and RTAs demand an Indian Will or Succession Certificate to release fixed deposits and shares. Ensure your Indian Will names your chosen heirs and coordinates with your US estate plan.";
    recommendationAction = "Protect Indian Accounts";
  } else if (citizenship === "oci") {
    recommendationTitle = "OCI-Compliant Indian Will with Apostille Attestation";
    recommendationDetails =
      "As a US Citizen with an OCI card, you can inherit any immovable property including farmland under FEMA 1999. Execute your Indian Will on plain paper with two witnesses, backed by a Hague Apostille from your US state.";
    recommendationAction = "Prepare OCI Indian Will";
  } else {
    recommendationTitle = "NRI Indian Will under Section 63 Succession Act";
    recommendationDetails =
      "As an Indian passport holder residing in the United States, your Indian Will is fully valid when signed on plain A4 paper before two witnesses. No Indian stamp paper or travel to India is required.";
    recommendationAction = "Start Online NRI Will";
  }

  return (
    <section className="w-full mb-16 sm:mb-24">
      <div className="max-w-3xl mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <Scale className="w-4 h-4" />
          <span>Interactive Cross-Border Navigator</span>
        </div>
        <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
          Explore US-India Will Strategies by Asset Profile
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Cross-border estate planning requires coordinating United States state laws
          with the Indian Succession Act, 1925. Choose your profile below to examine
          the governing statutes, execution rules, and practical checklists:
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-8 pb-2 border-b border-[#172228]/10">
        {NRI_USA_SCENARIOS.map((scenario) => {
          const isActive = activeTab === scenario.id;
          return (
            <button
              key={scenario.id}
              onClick={() => setActiveTab(scenario.id)}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#172228] text-white shadow-sm"
                  : "bg-white text-[#49585F] hover:text-[#172228] border border-[#172228]/10 hover:border-[#172228]/30"
              }`}
            >
              {scenario.icon === "building" && <Building2 className="w-4 h-4" />}
              {scenario.icon === "globe" && <Globe2 className="w-4 h-4" />}
              {scenario.icon === "coins" && <Coins className="w-4 h-4" />}
              {scenario.icon === "landmark" && <Landmark className="w-4 h-4" />}
              <span>{scenario.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Panel */}
      <div className="bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#172228]/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] block mb-1">
              Cross-Border Legal Framework
            </span>
            <h3 className="text-xl sm:text-2xl font-medium text-[#111827]">
              {currentScenario.heading}
            </h3>
          </div>
          <div className="inline-flex items-center gap-2 self-start lg:self-auto bg-[#FAF7F0] border border-[#172228]/10 px-4 py-2 rounded-full text-xs font-semibold text-[#172228]">
            <ShieldCheck className="w-4 h-4 text-[#047857]" />
            <span>{currentScenario.statutoryPrecedent}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-7 space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] mb-1.5">
                The Practical Challenge in the United States
              </h4>
              <p className="text-[14.5px] sm:text-[15px] leading-[1.65] text-[#374151]">
                {currentScenario.challengeSummary}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] mb-1.5">
                Statutory Harmonization &amp; Indian Law Rule
              </h4>
              <p className="text-[14.5px] sm:text-[15px] leading-[1.65] text-[#374151]">
                {currentScenario.legalMechanism}
              </p>
            </div>
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] block mb-1">
                Recommended Solution
              </span>
              <span className="inline-block text-sm font-semibold text-[#172228] bg-[#FAF7F0] px-3.5 py-1.5 rounded-lg border border-[#172228]/10">
                {currentScenario.recommendedInstrument}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#FAF7F0]/60 rounded-2xl p-5 sm:p-6 border border-[#172228]/10 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-[#172228] mb-3.5">
                US-India Execution Checklist
              </h4>
              <ul className="space-y-3 text-[13.5px] sm:text-[14px] text-[#49585F] leading-snug">
                {currentScenario.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-6">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
              >
                <span>Consult Cross-Border Counsel</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Question Diagnostic Decision Matrix */}
      <div className="bg-[#FAF7F0] rounded-[28px] border border-[#172228]/15 p-6 sm:p-9">
        <div className="max-w-2xl mb-6">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] block mb-1">
            Diagnostic Tool
          </span>
          <h3 className="text-xl sm:text-2xl font-medium text-[#111827] mb-2">
            Quick Cross-Border Estate Diagnostic
          </h3>
          <p className="text-sm text-[#49585F]">
            Answer three brief questions to see how your United States estate setup
            interacts with Indian succession laws:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Question 1 */}
          <div className="bg-white p-5 rounded-2xl border border-[#172228]/10">
            <label className="text-xs font-bold uppercase tracking-[0.12em] text-[#55636D] block mb-2.5">
              1. US Estate Plan Type
            </label>
            <div className="space-y-2 text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => setHasUsTrust("trust")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl border transition-all ${
                  hasUsTrust === "trust"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-white text-[#374151] border-[#172228]/15 hover:border-[#172228]/40"
                }`}
              >
                Living Trust or Will in US
              </button>
              <button
                type="button"
                onClick={() => setHasUsTrust("none")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl border transition-all ${
                  hasUsTrust === "none"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-white text-[#374151] border-[#172228]/15 hover:border-[#172228]/40"
                }`}
              >
                No US Estate Plan Yet
              </button>
            </div>
          </div>

          {/* Question 2 */}
          <div className="bg-white p-5 rounded-2xl border border-[#172228]/10">
            <label className="text-xs font-bold uppercase tracking-[0.12em] text-[#55636D] block mb-2.5">
              2. Assets Located in India
            </label>
            <div className="space-y-2 text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => setIndiaAssetType("property")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl border transition-all ${
                  indiaAssetType === "property"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-white text-[#374151] border-[#172228]/15 hover:border-[#172228]/40"
                }`}
              >
                House, Flat or Land in India
              </button>
              <button
                type="button"
                onClick={() => setIndiaAssetType("financial")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl border transition-all ${
                  indiaAssetType === "financial"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-white text-[#374151] border-[#172228]/15 hover:border-[#172228]/40"
                }`}
              >
                NRE/NRO Bank &amp; Shares Only
              </button>
            </div>
          </div>

          {/* Question 3 */}
          <div className="bg-white p-5 rounded-2xl border border-[#172228]/10">
            <label className="text-xs font-bold uppercase tracking-[0.12em] text-[#55636D] block mb-2.5">
              3. Current Citizenship
            </label>
            <div className="space-y-2 text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => setCitizenship("nri")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl border transition-all ${
                  citizenship === "nri"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-white text-[#374151] border-[#172228]/15 hover:border-[#172228]/40"
                }`}
              >
                NRI (Indian Passport)
              </button>
              <button
                type="button"
                onClick={() => setCitizenship("oci")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl border transition-all ${
                  citizenship === "oci"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-white text-[#374151] border-[#172228]/15 hover:border-[#172228]/40"
                }`}
              >
                OCI / US Citizen
              </button>
            </div>
          </div>
        </div>

        {/* Diagnostic Output Card */}
        <div className="bg-white rounded-2xl p-6 border border-[#172228]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#C65378] mb-1">
              Your Customized Estate Strategy
            </div>
            <h4 className="text-lg font-semibold text-[#111827] mb-1.5">
              {recommendationTitle}
            </h4>
            <p className="text-sm leading-relaxed text-[#49585F]">
              {recommendationDetails}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/start"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] px-6 py-3.5 transition-all text-center"
            >
              <span>{recommendationAction}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 transition-all text-center"
            >
              <span>Speak with Advocate</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
