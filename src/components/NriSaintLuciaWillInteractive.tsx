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
  Scale,
} from "lucide-react";

interface NriSaintLuciaScenario {
  id: string;
  label: string;
  icon: "globe" | "building" | "coins" | "landmark" | "scale";
  heading: string; // Strictly <= 70 chars for Screaming Frog
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedInstrument: string;
  checklist: string[];
}

const NRI_SAINT_LUCIA_SCENARIOS: NriSaintLuciaScenario[] = [
  {
    id: "castries-ancestral-genealogy",
    label: "Ancestral Land & Roots",
    icon: "globe",
    heading: "Ancestral Land & Indo-Caribbean Lineage in India",
    challengeSummary:
      "Families in Castries, Gros Islet, or Vieux Fort tracing descent from 19th-century arrivals on the Palmyra face difficulties claiming ancestral land in Uttar Pradesh, Bihar, or Bengal. Distant relatives in India often attempt unauthorized adverse possession or illegal property transfers.",
    legalMechanism:
      "Under Section 5 of the Indian Succession Act 1925 (Lex Situs) and FEMA Non-Debt Rules 2019, OCI cardholders are legally entitled to inherit agricultural land and family homes. A standalone Indian Will combined with village genealogical records (Pedhinama) establishes clear title before the local Tehsildar.",
    statutoryPrecedent: "ISA 1925 s. 5 & FEMA Non-Debt Rules 2019",
    recommendedInstrument: "Indo-Caribbean Ancestral Land Will & Lineage Record",
    checklist: [
      "Verify village Khatauni and Khasra land entries with local revenue officials",
      "Draft a plain-paper Indian Will designating OCI or resident Indian heirs",
      "Prepare sworn lineage genealogy linking Saint Lucian family to Indian records",
    ],
  },
  {
    id: "saint-lucia-civil-code-ring-fence",
    label: "Civil Code & Dual Wills",
    icon: "landmark",
    heading: "Saint Lucia Civil Code: Ring-Fencing Indian Assets",
    challengeSummary:
      "Saint Lucia's legal system is governed by the Civil Code of Saint Lucia. Standard local wills drafted by Saint Lucian attorneys or Notaries Royal contain blanket revocation clauses. These clauses can accidentally revoke your Indian Will, creating total intestacy across your Indian assets.",
    legalMechanism:
      "Under Indian law, succession to Indian real estate follows the Lex Situs rule. We structure matched dual wills: your Saint Lucian will governs Caribbean property, while an autonomous Indian Will governs Indian assets. Explicit non-revocation clauses protect both legal documents.",
    statutoryPrecedent: "Civil Code of Saint Lucia (Cap. 4.01) vs ISA 1925",
    recommendedInstrument: "Territorially Ring-Fenced Separate Indian Will",
    checklist: [
      "Include explicit territorial exclusion of all assets situated outside India",
      "Incorporate reciprocal non-revocation terms in both testamentary documents",
      "Appoint a reliable Indian resident executor for expedited revenue mutation",
    ],
  },
  {
    id: "cbi-investor-estate-planning",
    label: "CBI Portfolios & Demat",
    icon: "scale",
    heading: "CBI HNIs: Indian Shares, Mutual Funds & Accounts",
    challengeSummary:
      "Citizenship-by-Investment (CBI) passport holders in Rodney Bay or Cap Estate holding Indian demat folios, startup equity, and NRE/NRO fixed deposits often rely on bank nominees, mistakenly assuming nomination transfers legal ownership.",
    legalMechanism:
      "Under the Supreme Court Sarbati Devi ruling, bank and depository nominees act solely as temporary custodial trustees. Beneficial title passes exclusively through a valid Will. An Indian Will specifies exact shareholdings and bank folios, bypassing the need for a civil court succession certificate.",
    statutoryPrecedent: "SC Sarbati Devi Ruling & ISA 1925 s. 59",
    recommendedInstrument: "High-Net-Worth NRI/OCI Comprehensive Testamentary Will",
    checklist: [
      "Collate demat client master list (CML) and depository participant folios",
      "Designate primary and contingent beneficiaries for NRE/NRO accounts",
      "Ensure corporate shares and commercial real estate have distinct executors",
    ],
  },
  {
    id: "castries-apostille-plain-paper",
    label: "Castries Apostille & Signing",
    icon: "building",
    heading: "Castries Hague Apostille & Plain-Paper Execution",
    challengeSummary:
      "Many Saint Lucian residents believe they must travel to India or obtain Indian non-judicial stamp paper to sign a valid Indian Will, creating unnecessary delays and high travel costs.",
    legalMechanism:
      "Under Section 63 of the Indian Succession Act, an Indian Will executed on plain A4 paper in Saint Lucia before two adult independent witnesses is 100% valid with zero stamp paper. Following Saint Lucia's accession to the Hague Apostille Convention, an apostille seal from the Registrar of the High Court in Castries gives complete legal certainty in Indian courts.",
    statutoryPrecedent: "Hague Apostille Convention & ISA 1925 s. 63",
    recommendedInstrument: "Apostilled or Consular-Attested Indian Will",
    checklist: [
      "Print final draft on clean A4 paper with zero Indian stamp paper duty",
      "Sign before two adult independent witnesses who are not named as heirs",
      "Obtain Hague Apostille seal in Castries or Indian High Commission stamp",
    ],
  },
  {
    id: "fema-repatriation-section-197",
    label: "FEMA Remittance & Lower Tax",
    icon: "coins",
    heading: "FEMA USD 1M Asset Repatriation & Section 197",
    challengeSummary:
      "When Saint Lucian heirs inherit Indian residential flats or ancestral plots and decide to sell, Indian purchasers are mandated to deduct withholding tax at 20% plus surcharge under Section 195, locking up significant financial capital.",
    legalMechanism:
      "Under RBI FEMA regulations, foreign heirs can repatriate up to 1 Million US Dollars per financial year via an NRO account. Our advocates assist in securing a Section 197 Lower TDS Certificate (Form 13) and CA certificates (Form 15CA and Form 15CB) so you pay only actual tax dues.",
    statutoryPrecedent: "RBI FEMA Remittance Regs & IT Act s. 195/197",
    recommendedInstrument: "FEMA Asset Transmission & Section 197 Tax Protocol",
    checklist: [
      "Open an estate NRO bank account in India with full banking mandates",
      "File Form 13 with the Indian income tax department for lower TDS deduction",
      "Obtain Form 15CA and Form 15CB from an Indian CA for wire remittance",
    ],
  },
];

export default function NriSaintLuciaWillInteractive() {
  const [selectedId, setSelectedId] = useState<string>(
    "castries-ancestral-genealogy"
  );

  const currentScenario =
    NRI_SAINT_LUCIA_SCENARIOS.find((s) => s.id === selectedId) ||
    NRI_SAINT_LUCIA_SCENARIOS[0];

  const getIcon = (icon: "globe" | "building" | "coins" | "landmark" | "scale") => {
    switch (icon) {
      case "globe":
        return <Globe2 className="w-5 h-5 text-[#C65378]" />;
      case "building":
        return <Building2 className="w-5 h-5 text-[#C65378]" />;
      case "coins":
        return <Coins className="w-5 h-5 text-[#C65378]" />;
      case "landmark":
        return <Landmark className="w-5 h-5 text-[#C65378]" />;
      case "scale":
        return <Scale className="w-5 h-5 text-[#C65378]" />;
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
          Select Your Saint Lucia Estate Scenario
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Explore tailored legal paths for Indo-Caribbean ancestral lands,
          Saint Lucia Civil Code ring-fencing, Castries apostilles, and
          FEMA money transfers:
        </p>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3 mb-8">
        {NRI_SAINT_LUCIA_SCENARIOS.map((s) => {
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
                className={`text-xs sm:text-[13px] font-semibold leading-snug ${
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
                The Practical Challenge in Saint Lucia &amp; India
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
            Need advice on Saint Lucia succession or ancestral property?
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
              <span>Draft Indian Will Online</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
