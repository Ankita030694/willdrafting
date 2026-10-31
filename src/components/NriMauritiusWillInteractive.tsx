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

interface NriMauritiusScenario {
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

const NRI_MAURITIUS_SCENARIOS: NriMauritiusScenario[] = [
  {
    id: "ebene-port-louis-offshore",
    label: "Ebène & Port Louis: Offshore Trusts",
    icon: "landmark",
    heading: "Ebène Cybercity & Port Louis: Offshore Trusts & Indian Assets",
    challengeSummary:
      "Indo-Mauritian business leaders and families frequently use Mauritius Category 1 Global Business Companies (GBC1), private trusts, and family offices to manage wealth, while owning residential flats, commercial properties, or ancestral land across India.",
    legalMechanism:
      "Under Indian property rules, foreign trust structures cannot hold Indian agricultural land directly. A distinct Indian Will ensures personal Indian real estate and demat portfolios pass directly to designated heirs without being entangled in Mauritian corporate liquidation.",
    statutoryPrecedent: "ISA 1925 s. 5 & FEMA Reg 3(1)(b)",
    recommendedInstrument: "Dual-Track Indian Will & Offshore Asset Ring-Fence",
    checklist: [
      "Map individual personal holdings in India vs corporate offshore entities",
      "Carve out Indian immovable properties from blanket trust transfers",
      "Appoint a trusted Indian resident executor for seamless local mutation",
    ],
  },
  {
    id: "code-civil-forced-heirship",
    label: "Code Civil: Forced Heirship",
    icon: "coins",
    heading: "Code Civil Mauricien: Overcoming Forced Heirship Restrictions",
    challengeSummary:
      "Articles 913 to 930 of the Code Civil Mauricien mandate a reserved portion (réserve héréditaire) for children, restricting testamentary freedom to the quotité disponible. Mauritian wills attempting to govern Indian land trigger severe title disputes.",
    legalMechanism:
      "Under Section 5 of the Indian Succession Act 1925, succession to immovable property in India is governed exclusively by the Lex Situs (Indian law). Indian law grants 100% testamentary freedom over self-acquired property under Section 30 of the Hindu Succession Act, overriding Mauritian forced heirship claims for Indian land.",
    statutoryPrecedent: "Code Civil Arts 913-930 vs ISA 1925 s. 5",
    recommendedInstrument: "Lex Situs Ring-Fenced Indian Testamentary Will",
    checklist: [
      "State explicitly that Indian immovable assets are governed by Indian law",
      "Affirm complete testamentary freedom under Section 30 of HSA 1956",
      "Ring-fence the Will to avoid triggering Mauritian reduction claims",
    ],
  },
  {
    id: "pmo-apostille-hague",
    label: "PMO Apostille & Consular",
    icon: "building",
    heading: "PMO Port Louis Apostille & Indian High Commission Attestation",
    challengeSummary:
      "NRIs and OCIs residing in Grand Baie, Curepipe, or Port Louis need legal certainty when executing an Indian Will without traveling to India or facing Sub-Registrar registration challenges.",
    legalMechanism:
      "Mauritius and India are signatories to the Hague Apostille Convention 1961. An Indian Will executed before two adult witnesses in Mauritius can be apostilled by the Prime Minister's Office (Home Affairs Division) in Port Louis, or attested by the High Commission of India in Ebène, making it legally admissible before Indian courts and land authorities.",
    statutoryPrecedent: "Hague Apostille Convention 1961 & Indian Evidence Act",
    recommendedInstrument: "PMO Apostilled or Consular-Attested Indian Will",
    checklist: [
      "Print on standard A4 paper in Mauritius (zero Indian stamp paper required)",
      "Sign before two independent adult witnesses who are not beneficiaries",
      "Obtain PMO Home Affairs Apostille seal in Port Louis or High Commission attestation",
    ],
  },
  {
    id: "dtaa-fema-repatriation",
    label: "DTAA & FEMA Repatriation",
    icon: "globe",
    heading: "India-Mauritius DTAA: NRE Accounts & USD 1M Asset Repatriation",
    challengeSummary:
      "Indo-Mauritian heirs who inherit property or bank balances often face heavy 20% plus surcharge TDS deductions under Section 195 when liquidating Indian assets.",
    legalMechanism:
      "Under the India-Mauritius DTAA and RBI FEMA Remittance of Assets Regulations 2016, Mauritian NRI and OCI heirs can repatriate up to USD 1,000,000 per financial year through NRO bank accounts after obtaining a Section 197 Lower TDS Certificate (Form 13) and chartered accountant certifications (Form 15CA and Form 15CB).",
    statutoryPrecedent: "FEMA Remittance Reg 2016 & IT Act s. 195/197",
    recommendedInstrument: "FEMA-Compliant Asset Transmission & Repatriation Protocol",
    checklist: [
      "Update NRE, NRO, and FCNR bank nominations with registered mandates",
      "File Form 13 with the Indian Assessing Officer for lower TDS deduction",
      "Obtain Form 15CA and 15CB certifications for smooth foreign outward remittance",
    ],
  },
];

export default function NriMauritiusWillInteractive() {
  const [selectedId, setSelectedId] = useState<string>("ebene-port-louis-offshore");

  const currentScenario =
    NRI_MAURITIUS_SCENARIOS.find((s) => s.id === selectedId) ||
    NRI_MAURITIUS_SCENARIOS[0];

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
          Select Your Mauritius NRI Estate Scenario
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Explore tailored legal paths for Ebène Cybercity offshore vehicles, Code Civil Mauricien forced heirship harmonization, PMO Port Louis apostille, and India-Mauritius DTAA asset repatriation:
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
        {NRI_MAURITIUS_SCENARIOS.map((s) => {
          const isActive = s.id === selectedId;
          return (
            <button
              key={s.id}
              onClick={() => setSelectedId(s.id)}
              className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
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
                The Practical Challenge in Mauritius &amp; India
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
            Need help harmonizing Mauritius civil code rules with Indian succession law?
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
