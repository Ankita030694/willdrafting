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

interface NriReunionScenario {
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

const NRI_REUNION_SCENARIOS: NriReunionScenario[] = [
  {
    id: "french-civil-code-forced-heirship",
    label: "French Code Civil: Forced Heirship",
    icon: "landmark",
    heading: "French Civil Code: Overcoming Reserve Hereditaire Rules",
    challengeSummary:
      "French citizens of Indian origin (Malbars and Zarabes) in Saint-Denis, Saint-Paul, and Saint-Pierre own homes, plots, and farm land in India. French Civil Code Articles 912 to 930 fix a strict reserve share for children. A French will trying to divide Indian land sparks long court fights.",
    legalMechanism:
      "Under Section 5 of the Indian Succession Act 1925, land and flats in India follow Indian law (Lex Situs). Under Section 30 of the Hindu Succession Act 1956, you have full freedom to give self-acquired Indian land to anyone you choose. A separate Indian Will keeps Indian property safe from French forced share claims.",
    statutoryPrecedent: "Code Civil Arts 912-930 vs ISA 1925 s. 5",
    recommendedInstrument: "Lex Situs Ring-Fenced Indian Testamentary Will",
    checklist: [
      "State clearly that Indian land and flats follow Indian law under Section 5",
      "Confirm full freedom to give self-acquired land under Section 30 of HSA 1956",
      "Add non-revocation wording so your French will never cancels your Indian Will",
    ],
  },
  {
    id: "saint-denis-apostille-hague",
    label: "Reunion Apostille & Consular",
    icon: "building",
    heading: "Reunion Apostille & Indian Consulate Legalization",
    challengeSummary:
      "NRIs and OCIs living in Saint-Denis, Saint-Paul, or Saint-Pierre need a legal way to sign an Indian Will without flying to India or visiting an Indian Sub-Registrar office.",
    legalMechanism:
      "Both France (including La Reunion) and India belong to the Hague Apostille Convention 1961. You can sign your Indian Will on plain A4 paper before two adult witnesses in Reunion. You can then obtain a Hague Apostille seal in Reunion or attestation through the Indian Consulate in Saint-Denis so Indian courts accept it directly.",
    statutoryPrecedent: "Hague Apostille Convention 1961 & Indian Evidence Act",
    recommendedInstrument: "Apostilled or Consular-Attested Indian Will",
    checklist: [
      "Print on plain A4 paper in Reunion (zero Indian stamp paper needed)",
      "Sign before two adult witnesses who are not named as heirs in the Will",
      "Get a Hague Apostille seal or Consulate General of India attestation in Saint-Denis",
    ],
  },
  {
    id: "oci-farm-land-malbar-zarabe",
    label: "OCI Farm & Ancestral Land",
    icon: "globe",
    heading: "Malbar & Zarabe OCI Families: Farm Land Inheritance",
    challengeSummary:
      "Over 300,000 PIOs and OCIs in Reunion trace family roots to Tamil Nadu, Puducherry, Gujarat, and Bihar. Many hold ancestral plots, village houses, and farm land in India that need smooth name change for children holding French passports.",
    legalMechanism:
      "Under FEMA Regulation 3(1)(b), OCIs can legally inherit farm land, plantation plots, and homes in India from Indian parents or relatives. Foreign citizens cannot buy Indian farm land directly, but inheriting through a valid Indian Will is 100% legal and lets heirs update local Tehsildar records.",
    statutoryPrecedent: "FEMA Reg 3(1)(b) & IT Act s. 56(2)(x)",
    recommendedInstrument: "OCI-Compliant Ancestral & Farm Land Will",
    checklist: [
      "List every plot with exact survey number, village, Taluka, and District",
      "Include FEMA Regulation 3(1)(b) recitals for OCI farm land inheritance",
      "Name an Indian resident executor or lawyer Power of Attorney for land office mutation",
    ],
  },
  {
    id: "fema-dtaa-euro-repatriation",
    label: "FEMA & Euro Repatriation",
    icon: "coins",
    heading: "India-France DTAA: NRE Accounts & USD 1M Euro Transfer",
    challengeSummary:
      "Heirs in Reunion who inherit Indian flats, fixed deposits, or bank balances face 20% plus surcharge TDS deductions under Section 195 when sending sale proceeds to bank accounts in Reunion.",
    legalMechanism:
      "Under the India-France DTAA and RBI FEMA Remittance of Assets Regulations 2016, NRI and OCI heirs in Reunion can send up to USD 1,000,000 (in Euros) per financial year through NRO bank accounts after getting a Section 197 Lower TDS Certificate (Form 13) and CA certificates (Form 15CA and Form 15CB).",
    statutoryPrecedent: "FEMA Remittance Reg 2016 & IT Act s. 195/197",
    recommendedInstrument: "FEMA-Compliant Asset Transmission & Euro Remittance Plan",
    checklist: [
      "Match NRE, NRO, and FCNR bank nominations with your Indian Will beneficiaries",
      "Apply for Form 13 before the Indian tax officer for lower TDS on property sales",
      "Secure Form 15CA and Form 15CB CA certificates for fast wire transfer to Reunion",
    ],
  },
];

export default function NriReunionWillInteractive() {
  const [selectedId, setSelectedId] = useState<string>("french-civil-code-forced-heirship");

  const currentScenario =
    NRI_REUNION_SCENARIOS.find((s) => s.id === selectedId) ||
    NRI_REUNION_SCENARIOS[0];

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
          Select Your Reunion NRI Estate Scenario
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Explore legal paths for French Civil Code forced heirship rules, Saint-Denis apostille steps, OCI farm land inheritance, and India-France DTAA bank transfers:
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
        {NRI_REUNION_SCENARIOS.map((s) => {
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
                The Practical Challenge in Reunion &amp; India
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
            Need help harmonizing French Civil Code rules with Indian succession law?
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
