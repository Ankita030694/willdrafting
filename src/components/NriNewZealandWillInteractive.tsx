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

interface NriNewZealandScenario {
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

const NRI_NZ_SCENARIOS: NriNewZealandScenario[] = [
  {
    id: "auckland-wellington-dual-will",
    label: "Auckland & Wellington Dual-Will",
    icon: "landmark",
    heading: "Auckland & Wellington Home vs Indian Immovable Property",
    challengeSummary:
      "Indo-New Zealanders in Auckland, Wellington, Christchurch, or Hamilton often draft a New Zealand Will with local solicitors under the Wills Act 2007. Standard Kiwi solicitor templates include blanket revocation clauses that inadvertently revoke Indian Wills, plunging Indian ancestral lands into multi-year intestate disputes.",
    legalMechanism:
      "Under Section 5 of the Indian Succession Act 1925 (Lex Situs), succession to immovable property in India is governed exclusively by Indian law. A New Zealand High Court probate grant cannot directly transfer Indian land without an ancillary Indian court proceeding under Section 228. A separate Indian Will with territorial ring-fencing ensures direct mutation and shields Indian assets.",
    statutoryPrecedent:
      "NZ Wills Act 2007 s. 11 & Indian Succession Act 1925 s. 5",
    recommendedInstrument:
      "Standalone Indian Will with Cross-Border Ring-Fencing",
    checklist: [
      "Insert express territorial ring-fencing clause limiting scope to India",
      "Carve out New Zealand real estate, family trusts, and KiwiSaver accounts",
      "Coordinate with NZ solicitor to insert reciprocal exclusion terms",
    ],
  },
  {
    id: "family-protection-act-defense",
    label: "Family Protection Act Defense",
    icon: "building",
    heading: "NZ Family Protection Act 1955: Moral Duty Claims Defense",
    challengeSummary:
      "Under the New Zealand Family Protection Act 1955, the High Court of New Zealand can alter a deceased person's Will if moral duty for proper maintenance and support of adult children, spouses, or de facto partners was not fulfilled. Disgruntled relatives in NZ may attempt to include Indian assets in Family Protection claims.",
    legalMechanism:
      "Private international law and Section 5 of the Indian Succession Act restrict foreign court jurisdiction over immovable property situated in India. Indian land registries, Sub-Registrars, and municipal bodies recognize only Indian testamentary instruments. Ring-fencing your Indian Will insulates ancestral and self-acquired properties from NZ family provision litigation.",
    statutoryPrecedent:
      "NZ Family Protection Act 1955 & Indian Succession Act 1925 s. 5",
    recommendedInstrument:
      "Indian Lex Situs Testamentary Deed with Moral Duty Exclusion",
    checklist: [
      "Define Indian immovable assets strictly under Indian Lex Situs doctrine",
      "Explicitly exclude Indian ancestral land from NZ estate inventory",
      "Obtain High Court advocate verification to block cross-border claims",
    ],
  },
  {
    id: "kiwisaver-nre-nro-accounts",
    label: "KiwiSaver & NRE/NRO Portfolios",
    icon: "coins",
    heading: "KiwiSaver & Bank Transmission: NRE, NRO & Demat Shares",
    challengeSummary:
      "Many NRIs assume KiwiSaver death nominations and Indian bank nominee forms confer full ownership of money. In India, the Supreme Court ruled in Sarbati Devi that bank nominees are only temporary custodians. Without a valid Indian Will, Indian bank deposits and demat shares remain frozen upon death.",
    legalMechanism:
      "Under RBI FEMA regulations and Indian banking guidelines, transmission of NRE/NRO deposits, mutual funds, and demat accounts to NRI legal heirs requires clear testamentary title. A comprehensive Indian Will names specific executors and beneficiaries, facilitating swift bank transmission and enabling annual repatriation up to USD 1,000,000 under Form 15CA/15CB.",
    statutoryPrecedent:
      "Sarbati Devi Precedent & RBI Master Direction on Remittance",
    recommendedInstrument:
      "Dual Financial Asset Schedule with Executor Demarcation",
    checklist: [
      "Separate KiwiSaver provider nominations from Indian bank accounts",
      "Schedule all NRE, NRO, fixed deposit, and demat accounts with IFSCs",
      "Authorize resident or NRI executors for smooth bank transmission",
    ],
  },
  {
    id: "nz-dia-apostille-execution",
    label: "NZ DIA Apostille & Execution",
    icon: "globe",
    heading: "NZ DIA Hague Apostille: Plain-Paper Legal Will Execution",
    challengeSummary:
      "NRIs in Sandringham, Papatoetoe, Mount Roskill, or Riccarton often assume they must travel to India or book consular appointments at the High Commission of India in Wellington or Consulate in Auckland to make a valid Indian Will.",
    legalMechanism:
      "Both New Zealand and India are signatories to the 1961 Hague Apostille Convention. Under Section 63 of the Indian Succession Act 1925, an Indian Will executed on plain A4 paper in New Zealand before two adult independent witnesses is legally valid. Notarization by an authorized New Zealand Notary Public followed by an Apostille from the Department of Internal Affairs (DIA) in Wellington provides ironclad legal proof.",
    statutoryPrecedent:
      "Hague Apostille Convention 1961 & Indian Succession Act s. 63",
    recommendedInstrument:
      "NZ Notarized & DIA Apostilled Indian Plain-Paper Will",
    checklist: [
      "Print Will on plain A4 paper in New Zealand (no Indian stamp paper)",
      "Sign before two adult independent witnesses who are not beneficiaries",
      "Obtain NZ DIA Authentications Unit Apostille certificate in Wellington",
      "Maintain certified duplicate copy with legal counsel in India",
    ],
  },
];

export default function NriNewZealandWillInteractive() {
  const [selectedId, setSelectedId] = useState<string>("auckland-wellington-dual-will");

  const currentScenario =
    NRI_NZ_SCENARIOS.find((s) => s.id === selectedId) ||
    NRI_NZ_SCENARIOS[0];

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
          Select Your New Zealand NRI Estate Scenario
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Explore tailored legal blueprints for Auckland and Wellington dual wills, NZ Family Protection Act defense, KiwiSaver carve-outs, and Wellington DIA Hague apostille execution:
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
        {NRI_NZ_SCENARIOS.map((s) => {
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
                The Practical Challenge in New Zealand &amp; India
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
            Need tailored drafting for New Zealand succession and Indian revenue laws?
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
