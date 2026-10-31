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
  FileText,
  Calculator,
} from "lucide-react";

interface NriSouthAfricaScenario {
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

const NRI_SOUTH_AFRICA_SCENARIOS: NriSouthAfricaScenario[] = [
  {
    id: "durban-kzn-ancestral-land",
    label: "Durban / KZN: Ancestral Land",
    icon: "globe",
    heading: "Durban & KZN: Tracing Ancestral Land in Gujarat & Tamil Nadu",
    challengeSummary:
      "Families in Durban, Phoenix, or Chatsworth often have ancestral land in Gujarat or Tamil Nadu. If land records are old, relatives in India may try to take over the plots.",
    legalMechanism:
      "Under FEMA rule 3(1)(b), OCIs can inherit farm land, plots, and homes. A standalone Indian Will with certified family tree papers stops land disputes before the local Tehsildar.",
    statutoryPrecedent:
      "FEMA Reg 3(1)(b) & State Land Revenue Rules",
    recommendedInstrument:
      "Ancestral Land Indian Will with Revenue Mutation Protocol",
    checklist: [
      "Check 7/12 extract or Patta pass details with the local Tehsildar",
      "Sign a plain-paper Will before two adult witnesses in South Africa",
      "Name a trusted Indian Power of Attorney agent for land office work",
    ],
  },
  {
    id: "master-high-court-act-66",
    label: "Master of High Court (Act 66)",
    icon: "landmark",
    heading: "Master of High Court: Ring-Fencing Indian Assets from SA Probate",
    challengeSummary:
      "Under the Estates Act 66 of 1965, the Master oversees estate assets. Listing Indian land in a South African Will causes tax delays. Indian courts do not accept Master court letters.",
    legalMechanism:
      "Under Section 5 of the Indian Succession Act, 1925, Indian land follows Indian law. Executing a separate Indian Will keeps Indian homes and land out of South African court hands.",
    statutoryPrecedent:
      "ISA 1925 s. 5 & SA Estates Act 66 of 1965",
    recommendedInstrument:
      "Jurisdictionally Ring-Fenced Separate Indian Will",
    checklist: [
      "Add a territorial clause to leave out South African assets",
      "Stop blanket revocation words in SA Wills from cancelling Indian Wills",
      "Name an Indian executor for quick local administration",
    ],
  },
  {
    id: "sa-wills-act-dual-will",
    label: "SA Wills Act: Dual Wills",
    icon: "coins",
    heading: "SA Wills Act 7 of 1953: Dual-Will Harmonization & Revocation",
    challengeSummary:
      "Standard South African Wills have wording that cancels all past wills. Under Section 2 of the SA Wills Act, this can wipe out an earlier Indian Will by mistake.",
    legalMechanism:
      "We draft twin, matched Wills. Your South African Will covers local assets. Your Indian Will covers Indian assets and protects both testaments from accidental cancellation.",
    statutoryPrecedent:
      "SA Wills Act 7 of 1953 s. 2 & ISA 1925 s. 62",
    recommendedInstrument:
      "Harmonized Dual-Will Plan with Non-Revocation Terms",
    checklist: [
      "Share details with your South African attorney in Joburg or Cape Town",
      "Include non-revocation clauses in both legal documents",
      "Ensure two witnesses sign both pages under Section 2(1)(a) rules",
    ],
  },
  {
    id: "dirco-apostille-hague",
    label: "DIRCO Apostille & Consular",
    icon: "building",
    heading: "DIRCO Pretoria Apostille & High Commission Attestation Guide",
    challengeSummary:
      "People in Durban, Joburg, or Cape Town often wonder if they must travel to India or visit the Indian Embassy to sign an Indian Will.",
    legalMechanism:
      "South Africa and India follow the Hague Apostille treaty. Sign your Will before two witnesses in SA. Get a DIRCO seal in Pretoria. It is fully valid in Indian courts with no embassy visit.",
    statutoryPrecedent:
      "Hague Apostille Convention 1961 & Indian Evidence Act",
    recommendedInstrument:
      "DIRCO Apostilled or Indian Mission Certified Will",
    checklist: [
      "Print on plain A4 paper in South Africa with zero Indian stamp paper",
      "Sign before two adult witnesses who are not named as heirs",
      "Get a DIRCO Apostille seal in Pretoria for official court proof",
    ],
  },
];

export default function NriSouthAfricaWillInteractive() {
  const [selectedId, setSelectedId] = useState<string>("durban-kzn-ancestral-land");

  const currentScenario =
    NRI_SOUTH_AFRICA_SCENARIOS.find((s) => s.id === selectedId) ||
    NRI_SOUTH_AFRICA_SCENARIOS[0];

  const getIcon = (icon: "globe" | "building" | "coins" | "landmark") => {
    switch (icon) {
      case "globe":
        return <Globe2 className="w-5 h-5 text-[#C65378]" />;
      case "building":
        return <Building2 className="w-5 h-5 text-[#C65378]" />;
      case "coins":
        return <Coins className="w-5 h-5 text-[#C65378]" />;
      case "landmark":
        return <Landmark className="w-5 h-5 text-[#C65378]" />;
      default:
        return <FileText className="w-5 h-5 text-[#C65378]" />;
    }
  };

  return (
    <section className="w-full bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-16 sm:mb-24">
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <Calculator className="w-4 h-4" />
          <span>Interactive Estate Check</span>
        </div>
        <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-3">
          Select Your South African NRI Estate Scenario
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Explore tailored legal paths for ancestral property in Gujarat or Tamil Nadu, Master of the High Court rules, SA dual wills, and DIRCO seals:
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
        {NRI_SOUTH_AFRICA_SCENARIOS.map((s) => {
          const isActive = s.id === selectedId;
          return (
            <button
              key={s.id}
              onClick={() => setSelectedId(s.id)}
              className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isActive
                  ? "bg-[#FAF7F0] border-[#C65378] shadow-xs"
                  : "bg-white border-[#172228]/10 hover:border-[#172228]/30 hover:bg-[#FAF7F0]/40"
              }`}
            >
              <div className="mb-2.5">{getIcon(s.icon)}</div>
              <div
                className={`text-xs sm:text-[13.5px] font-semibold leading-snug ${
                  isActive ? "text-[#111827]" : "text-[#55636D]"
                }`}
              >
                {s.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Scenario Details Container */}
      <div className="rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 mb-6 border-b border-[#172228]/10">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#C65378] mb-1.5">
              Legal Diagnostic Analysis
            </div>
            <h3 className="text-xl sm:text-2xl font-medium text-[#111827] leading-snug">
              {currentScenario.heading}
            </h3>
          </div>
          <div className="shrink-0 bg-white px-4 py-2 rounded-xl border border-[#172228]/10 text-xs text-[#55636D] self-start">
            <span className="font-semibold text-[#111827]">Authority: </span>
            {currentScenario.statutoryPrecedent}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-6">
          <div className="lg:col-span-7 space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-[#55636D] mb-1.5">
                The Practical Challenge in South Africa &amp; India
              </h4>
              <p className="text-[14px] sm:text-[15px] leading-[1.68] text-[#374151]">
                {currentScenario.challengeSummary}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-[#55636D] mb-1.5">
                Statutory Legal Mechanism &amp; Protection
              </h4>
              <p className="text-[14px] sm:text-[15px] leading-[1.68] text-[#374151]">
                {currentScenario.legalMechanism}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-xl p-5 border border-[#172228]/10 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-[#C65378] mb-2">
                Mandatory Execution Checklist
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#374151] mb-5">
                {currentScenario.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-[#172228]/10">
              <div className="text-[11px] text-[#55636D] mb-1">
                Recommended Cross-Border Instrument:
              </div>
              <div className="text-xs sm:text-[13px] font-bold text-[#111827]">
                {currentScenario.recommendedInstrument}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-[#172228]/10">
          <span className="text-xs text-[#55636D]">
            Need help with South African and Indian succession rules?
          </span>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white bg-[#C65378] hover:bg-[#a13c5d] px-5 py-2.5 rounded-full transition-colors"
            >
              <span>Consult Cross-Border Advocate</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/start"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#172228] bg-white hover:bg-[#FAF7F0] border border-[#172228]/15 px-4 py-2.5 rounded-full transition-colors"
            >
              <span>Start Online Intake</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
