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

interface NriAustraliaScenario {
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

const NRI_AUSTRALIA_SCENARIOS: NriAustraliaScenario[] = [
  {
    id: "melbourne-sydney-dual-will",
    label: "NSW & VIC: Dual-Will",
    icon: "landmark",
    heading: "NSW & VIC: Sydney & Melbourne Home vs Indian Real Estate",
    challengeSummary:
      "Indo-Australians in Sydney, Melbourne, Brisbane, or Perth often draft an Australian Will via local solicitors under the NSW Succession Act 2006 or VIC Administration and Probate Act 1958. Standard Australian templates include blanket revocation clauses that inadvertently revoke Indian Wills, exposing Indian ancestral homes and plots to multi-year intestacy battles.",
    legalMechanism:
      "Under Section 5 of the Indian Succession Act 1925 (Lex Situs), succession to immovable property in India is governed exclusively by Indian law. An Australian Supreme Court probate grant cannot directly transfer Indian land without an ancillary Indian High Court probate order under Section 228. A separate Indian Will with territorial ring-fencing ensures direct mutation and prevents Australian probate delays from freezing Indian assets.",
    statutoryPrecedent:
      "NSW Succession Act 2006 s. 6 & Indian Succession Act 1925 s. 5",
    recommendedInstrument:
      "Standalone Indian Will with Cross-Border Ring-Fencing",
    checklist: [
      "Insert express territorial ring-fencing clause limiting scope to India",
      "Carve out Australian homes, family trusts, and SMSFs from Indian Will",
      "Coordinate with Australian solicitor to insert mirror exclusion clause",
    ],
  },
  {
    id: "superannuation-smsf-bdbn",
    label: "Superannuation & SMSF",
    icon: "building",
    heading: "Superannuation & SMSF: Binding Death Benefit Nominations",
    challengeSummary:
      "Many NRIs mistakenly believe Australian superannuation balances and Self-Managed Super Funds (SMSF) automatically form part of their estate governed by a Will. Under Australian superannuation law, superannuation does not automatically pass through a Will unless explicitly paid to the Legal Personal Representative (LPR).",
    legalMechanism:
      "Under Section 59 of the Superannuation Industry (Supervision) Act 1993 (SIS Act), super benefits pass via a Binding Death Benefit Nomination (BDBN) or trustee discretion. Commingling superannuation with Indian estate planning causes severe tax friction. A dual-will plan separates superannuation completely from Indian land, securing tax-free death benefits for dependants under ITAA 1997 Section 302-60.",
    statutoryPrecedent:
      "SIS Act 1993 s. 59 & ITAA 1997 Division 302",
    recommendedInstrument:
      "BDBN Superannuation Protocol + Independent Indian Will",
    checklist: [
      "Execute a valid non-lapsing Binding Death Benefit Nomination (BDBN)",
      "Ring-fence superannuation and SMSF assets completely outside Indian Will",
      "Appoint distinct resident executors for Indian and Australian estates",
    ],
  },
  {
    id: "ato-foreign-cgt-dtaa",
    label: "ATO: Foreign CGT & DTAA",
    icon: "coins",
    heading: "ATO Capital Gains Tax: Inherited Foreign Real Estate & DTAA",
    challengeSummary:
      "Australian tax residents face Australian Taxation Office (ATO) Capital Gains Tax on their worldwide capital assets under the Income Tax Assessment Act 1997 (ITAA 1997). Heirs who inherit apartments in Mumbai, Bengaluru, or Delhi NCR often worry about punitive double taxation when selling ancestral assets.",
    legalMechanism:
      "In India, property inheritance carries zero capital gains tax or estate duty under Section 47 of the Income Tax Act, 1961. For Australian tax purposes under ITAA 1997 Section 128-15, the cost base of inherited property is generally fair market value at the date of death (if the deceased was a non-resident). Foreign Income Tax Offsets (FITO) under Division 770 and Article 13 of the India-Australia DTAA prevent double taxation upon property liquidation.",
    statutoryPrecedent:
      "Australian ITAA 1997 Div 128 & India-Australia DTAA Article 13",
    recommendedInstrument:
      "Tax-Synchronized Indian Will with Cost-Base Audit",
    checklist: [
      "Obtain certified market valuation report on date of inheritance for ATO",
      "Secure Section 197 lower TDS certificate from Indian Income Tax Dept",
      "Process Form 15CA & 15CB certifications for USD 1M annual repatriation",
    ],
  },
  {
    id: "dfat-apostille-plain-paper",
    label: "DFAT: Plain-Paper Will",
    icon: "globe",
    heading: "DFAT Apostille Convention: Plain-Paper Will Execution",
    challengeSummary:
      "Indo-Australians living in Parramatta, Blacktown, Tarneit, or Point Cook often assume they must travel to India or book appointments at the Indian High Commission in Canberra or Consulates in Sydney, Melbourne, or Perth to sign an Indian Will.",
    legalMechanism:
      "Both Australia and India are signatories to the 1961 Hague Apostille Convention. An Indian Will executed on plain paper in Australia and notarized by an Australian Public Notary requires only an Apostille from the Department of Foreign Affairs and Trade (DFAT). No Indian consular legalization is required. Under the Indian Stamp Act, 1899, Wills are completely exempt from stamp paper.",
    statutoryPrecedent:
      "Hague Apostille Convention 1961 & Indian Succession Act s. 63",
    recommendedInstrument:
      "Australian Notarized & DFAT Apostilled Indian Will",
    checklist: [
      "Print Will on plain A4 paper in Australia (no Indian stamp paper needed)",
      "Sign before two adult independent witnesses who are not beneficiaries",
      "Obtain DFAT Apostille certificate on Australian Notary Public seal",
      "Deposit registered copy with legal counsel in India for safe custody",
    ],
  },
];

export default function NriAustraliaWillInteractive() {
  const [selectedId, setSelectedId] = useState<string>("melbourne-sydney-dual-will");

  const currentScenario =
    NRI_AUSTRALIA_SCENARIOS.find((s) => s.id === selectedId) ||
    NRI_AUSTRALIA_SCENARIOS[0];

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
          Select Your Australian NRI Estate Scenario
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Explore tailored legal blueprints for Sydney and Melbourne dual wills, Australian superannuation carve-outs, ATO foreign capital gains tax, and DFAT Hague apostille execution:
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
        {NRI_AUSTRALIA_SCENARIOS.map((s) => {
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
                The Practical Challenge in Australia &amp; India
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
            Need tailored drafting for Australian state succession and Indian revenue laws?
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
