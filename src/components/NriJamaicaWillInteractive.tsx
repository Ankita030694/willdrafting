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

interface NriJamaicaScenario {
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

const NRI_JAMAICA_SCENARIOS: NriJamaicaScenario[] = [
  {
    id: "kingston-ancestral-heritage",
    label: "Ancestral Land & Roots",
    icon: "globe",
    heading: "Ancestral Land & Indo-Jamaican Heritage in India",
    challengeSummary:
      "Families in Kingston or Montego Bay often have ancestral land in India. Old land records may have distant relatives named. These relatives in India may try to take over the plots or sell them without consent.",
    legalMechanism:
      "Under Section 5 of the Indian Succession Act 1925 and FEMA rules, OCI holders can inherit farm land and ancestral homes. A standalone Indian Will with certified family tree papers stops land disputes before the local Tehsildar.",
    statutoryPrecedent: "ISA 1925 s. 5 & FEMA Non-Debt Rules 2019",
    recommendedInstrument: "Indo-Jamaican Ancestral Land Will & Lineage Record",
    checklist: [
      "Check village Khata or Khasra land papers with the local Tehsildar",
      "Draft a plain-paper Indian Will naming designated OCI or resident heirs",
      "Sign family tree papers linking Jamaican roots to Indian village records",
    ],
  },
  {
    id: "jamaica-wills-act-ring-fence",
    label: "Jamaica Wills Act Dual Wills",
    icon: "landmark",
    heading: "Jamaica Wills Act: Ring-Fencing Indian Assets",
    challengeSummary:
      "Wills made under the Jamaican Wills Act often have terms that cancel all past wills. If not matched, a new will in Jamaica can cancel your Indian Will by mistake. This leaves Indian assets without a clear owner.",
    legalMechanism:
      "Under Indian law, succession to Indian land follows the Lex Situs rule. We write twin wills. Your Jamaican will covers local Caribbean assets. Your Indian Will covers Indian assets and protects both testaments from accidental cancellation.",
    statutoryPrecedent: "Jamaican Wills Act Cap 414 vs ISA 1925 s. 5",
    recommendedInstrument: "Territorially Ring-Fenced Separate Indian Will",
    checklist: [
      "Add clear terms to leave out assets outside India",
      "Include non-revocation terms in both legal documents",
      "Name a trusted Indian resident executor for fast land work",
    ],
  },
  {
    id: "mfajt-kingston-apostille",
    label: "Kingston Apostille & Embassy",
    icon: "building",
    heading: "Kingston MFAFT Apostille & Embassy Attestation",
    challengeSummary:
      "Many people in Kingston or Montego Bay wonder if they must fly to India to make a valid Indian Will. They also worry about finding Indian stamp paper abroad.",
    legalMechanism:
      "Jamaica follows the Hague Apostille treaty. Print your Will on plain A4 paper in Jamaica. Sign before two adult witnesses. Get an Apostille seal from the MFAFT in Kingston. It is 100% valid in Indian courts with zero stamp duty.",
    statutoryPrecedent: "Hague Apostille Convention & ISA 1925 s. 63",
    recommendedInstrument: "Apostilled or Consular-Attested Indian Will",
    checklist: [
      "Print your Will on plain A4 paper with zero Indian stamp paper",
      "Sign before two adult witnesses who are not named as heirs",
      "Get a Hague Apostille seal from MFAFT Kingston or Embassy attestation",
    ],
  },
  {
    id: "fema-repatriation-section-197",
    label: "FEMA Remittance & Lower Tax",
    icon: "coins",
    heading: "FEMA USD 1M Asset Remittance & Section 197 Tax Relief",
    challengeSummary:
      "When OCI heirs in Jamaica inherit flats or farm plots in India and sell them, Indian buyers cut a high 20% plus tax under Section 195. This cuts into the cash heirs receive.",
    legalMechanism:
      "Under RBI FEMA rules, foreign heirs can send up to 1 Million US Dollars home each financial year through an NRO account. Our team helps you get a Section 197 lower tax certificate and CA forms (Form 15CA and Form 15CB) so you pay only actual tax.",
    statutoryPrecedent: "RBI FEMA Remittance Regs 2016 & IT Act s. 195/197",
    recommendedInstrument: "FEMA Asset Transmission & Lower Tax Protocol",
    checklist: [
      "Set up an estate NRO bank account for inheritance funds",
      "File Form 13 with the Indian tax office for a lower tax certificate",
      "Get Form 15CA and Form 15CB from an Indian CA for bank wire transfers",
    ],
  },
];

export default function NriJamaicaWillInteractive() {
  const [selectedId, setSelectedId] = useState<string>(
    "kingston-ancestral-heritage"
  );

  const currentScenario =
    NRI_JAMAICA_SCENARIOS.find((s) => s.id === selectedId) ||
    NRI_JAMAICA_SCENARIOS[0];

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
          Select Your Jamaica Estate Scenario
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Explore tailored legal paths for Indo-Jamaican ancestral lands,
          Jamaican Wills Act ring-fencing, Kingston apostilles, and
          FEMA money transfers:
        </p>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
        {NRI_JAMAICA_SCENARIOS.map((s) => {
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
                The Practical Challenge in Jamaica &amp; India
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

          <div className="lg:col-span-5 bg-white rounded-xl p-5 border border-[#172228]/10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C65378] mb-2">
                Recommended Solution
              </div>
              <div className="text-sm font-semibold text-[#111827] mb-3 leading-snug">
                {currentScenario.recommendedInstrument}
              </div>
              <ul className="space-y-2 text-xs sm:text-[13px] text-[#49585F] mb-4">
                {currentScenario.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#047857] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-[#172228]/10 flex flex-col sm:flex-row gap-2">
              <Link
                href="/contact"
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-colors text-center"
              >
                <span>Consult Counsel</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/start"
                className="inline-flex items-center justify-center gap-1 bg-[#172228] hover:bg-[#2c3d47] text-white text-xs font-medium px-4 py-2.5 rounded-full transition-colors text-center"
              >
                <span>Start Draft</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
