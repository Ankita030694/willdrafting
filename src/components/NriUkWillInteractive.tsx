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

interface NriUkScenario {
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

const NRI_UK_SCENARIOS: NriUkScenario[] = [
  {
    id: "london-birmingham-iht",
    label: "HMRC 40% IHT & Domicile",
    icon: "coins",
    heading: "HMRC 40% IHT Protection: Ring-Fencing Indian Assets",
    challengeSummary:
      "British-Indian families in London or Birmingham face 40% UK inheritance tax on worldwide wealth if HMRC treats them as UK domiciled.",
    legalMechanism:
      "Keeping your Indian Domicile of Origin protects foreign assets. A separate Indian Will ring-fences your Indian flats, land, and bank funds from HMRC tax claims.",
    statutoryPrecedent:
      "UK Inheritance Tax Act 1984 s. 6 & Indian Succession Act 1925",
    recommendedInstrument:
      "Dual-Will Architecture with Foreign Asset Ring-Fencing",
    checklist: [
      "Leave out Indian assets from your UK Will",
      "Add mutual non-revocation terms in both Wills",
      "Keep records that show your ties to India",
    ],
  },
  {
    id: "punjab-gujarat-ancestral",
    label: "Punjab & Gujarat Land",
    icon: "globe",
    heading: "Ancestral Farmland & Urban Flats: Jamabandi Mutation",
    challengeSummary:
      "NRIs in Leicester or Southall inherit farm land in Punjab, Haryana, or Gujarat. Relatives in India often dispute verbal splits.",
    legalMechanism:
      "Under RBI FEMA rules, foreign citizens with OCI can inherit farm land. An Indian Will with survey numbers (Khasra) ensures smooth revenue land transfer.",
    statutoryPrecedent:
      "FEMA Regulation 3(1)(b) & Punjab Land Revenue Act 1887",
    recommendedInstrument:
      "Standalone Indian Will with Land Survey & Khasra Numbers",
    checklist: [
      "List land survey and Khasra numbers clearly",
      "State shares clearly to stop family court fights",
      "Name an Indian Power of Attorney for local land office visits",
    ],
  },
  {
    id: "fcdo-apostille-notary",
    label: "FCDO Apostille Legalization",
    icon: "building",
    heading: "FCDO Apostille Legalization: Plain-Paper Signing in UK",
    challengeSummary:
      "Booking in-person appointments at the Indian High Commission in London or Consulates in Birmingham takes weeks.",
    legalMechanism:
      "The UK and India both follow the Hague Apostille Convention 1961. You can sign your Indian Will on plain paper before two witnesses, notarize it, and get an FCDO Apostille.",
    statutoryPrecedent:
      "Hague Apostille Convention 1961 & Indian Stamp Act 1899",
    recommendedInstrument:
      "UK Notarized & FCDO Apostilled Indian Succession Instrument",
    checklist: [
      "Sign on plain A4 paper without Indian stamp paper",
      "Sign before two independent adult witnesses",
      "Get an FCDO Apostille certificate in the UK",
    ],
  },
  {
    id: "probate-registry-sec228",
    label: "Probate Lag & Section 228",
    icon: "landmark",
    heading: "Section 228 Ancillary Probate: Bypassing UK Court Delays",
    challengeSummary:
      "Probate in the UK takes months. Resealing that English grant in an Indian High Court under Section 228 takes 2 to 4 years.",
    legalMechanism:
      "Under Section 5 of the Indian Succession Act 1925, Indian land follows Indian law. A standalone Indian Will lets your family claim assets without waiting for UK court probate.",
    statutoryPrecedent:
      "Indian Succession Act 1925 ss. 5, 63 & 228",
    recommendedInstrument:
      "Independent Indian Will with Direct Executor Nomination",
    checklist: [
      "Name an executor in India for easy bank claims",
      "List Indian bank accounts, fixed deposits, and mutual funds",
      "Avoid heavy Section 228 Indian court fees",
    ],
  },
];

export default function NriUkWillInteractive() {
  const [selectedId, setSelectedId] = useState<string>("london-birmingham-iht");

  const currentScenario =
    NRI_UK_SCENARIOS.find((s) => s.id === selectedId) ||
    NRI_UK_SCENARIOS[0];

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
          <span>Interactive Cross-Border Diagnostic</span>
        </div>
        <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-3">
          Select Your UK NRI Estate Scenario
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Explore tailored legal paths for HMRC tax defense, land transfers, FCDO apostille signing, and probate bypass:
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
        {NRI_UK_SCENARIOS.map((s) => {
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
            <h4 className="text-xl sm:text-2xl font-medium text-[#111827] leading-snug">
              {currentScenario.heading}
            </h4>
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
                The Practical Challenge in the UK &amp; India
              </h4>
              <p className="text-[14px] sm:text-[15px] leading-[1.68] text-[#374151]">
                {currentScenario.challengeSummary}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-[#55636D] mb-1.5">
                Statutory Remedy &amp; Precedent
              </h4>
              <p className="text-[14px] sm:text-[15px] leading-[1.68] text-[#374151]">
                {currentScenario.legalMechanism}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-xl border border-[#172228]/10 p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C65378] mb-2">
                Recommended Solution
              </div>
              <div className="text-sm font-semibold text-[#111827] mb-4">
                {currentScenario.recommendedInstrument}
              </div>
              <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#55636D] mb-2">
                Execution Checklist
              </div>
              <ul className="space-y-2 text-xs sm:text-[13px] text-[#374151]">
                {currentScenario.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#047857] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-5 mt-4 border-t border-[#172228]/10 flex items-center justify-between">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#C65378] hover:text-[#a13c5d] transition-colors"
              >
                <span>Consult UK-India Counsel</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
