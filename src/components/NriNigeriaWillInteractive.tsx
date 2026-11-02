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

interface NriNigeriaScenario {
  id: string;
  label: string;
  icon: "globe" | "building" | "coins" | "landmark";
  heading: string; // Strictly <= 70 chars for Screaming Frog compliance
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedInstrument: string;
  checklist: string[];
}

const NRI_NIGERIA_SCENARIOS: NriNigeriaScenario[] = [
  {
    id: "lagos-abuja-industrial-family",
    label: "Lagos / Abuja: Industrialists",
    icon: "globe",
    heading: "Lagos & Abuja: Industrial Wealth & Family Land in India",
    challengeSummary:
      "Indian families in Lagos and Abuja often run businesses in Nigeria and own homes in India. When land papers are old, relatives in India can dispute ownership or delay land mutation.",
    legalMechanism:
      "Under Section 5 and Section 59 of the Indian Succession Act, Indian real estate follows Indian law. A separate Will keeps personal land safe from business debts. It makes property transfer simple before the Tehsildar.",
    statutoryPrecedent:
      "ISA 1925 s. 5 & FEMA 1999 s. 6(5)",
    recommendedInstrument:
      "Dual-Track Industrial & Family Estate Indian Will",
    checklist: [
      "Verify registered sale deeds, property tax receipts, and Jamabandi records",
      "Ring-fence Indian personal assets from Nigerian corporate business debt",
      "Name a trusted India-based executor for quick local administration",
    ],
  },
  {
    id: "nigeria-estates-act-sec-228",
    label: "Lagos Estates Law vs Sec 228",
    icon: "landmark",
    heading: "Lagos Estates Law vs Section 228 Indian Probate Delays",
    challengeSummary:
      "Under Lagos State estate laws, probate orders from Nigerian courts have no legal standing in India. Indian banks and land registries reject Nigerian court orders.",
    legalMechanism:
      "Using a Nigerian court grant in India needs an extra court petition under Section 228. This case takes 2 to 3 years. A separate Indian Will avoids Section 228 delays and allows direct local transfer.",
    statutoryPrecedent:
      "ISA 1925 s. 228 & Lagos Estates Law Cap A3",
    recommendedInstrument:
      "Separate Standalone Indian Will for Non-Probate Cities",
    checklist: [
      "Check if assets lie in Mumbai, Kolkata, Chennai, or non-probate states",
      "Elect Indian succession statutes exclusively for all Indian properties",
      "Keep probate proceedings in Lagos and India completely independent",
    ],
  },
  {
    id: "dual-will-revocation-defense",
    label: "Dual-Will Revocation Defense",
    icon: "coins",
    heading: "Preventing Accidental Will Revocation by Nigerian Wills",
    challengeSummary:
      "Standard wills written by Nigerian lawyers often contain clauses that cancel all past wills. This accidentally cancels your Indian Will under Section 62 of the Indian Succession Act.",
    legalMechanism:
      "Our lawyers draft matched twin Wills. Your Nigerian Will covers your local firms. Your Indian Will covers your Indian flats and bank accounts. Both wills protect each other from cancellation.",
    statutoryPrecedent:
      "ISA 1925 s. 62 & Nigerian Common Law",
    recommendedInstrument:
      "Synchronized Cross-Border Twin Will Framework",
    checklist: [
      "Review Nigerian company and estate documents with local counsel",
      "Insert reciprocal non-revocation clauses in both legal documents",
      "Ensure independent signing before two adult non-beneficiary witnesses",
    ],
  },
  {
    id: "abuja-lagos-consular-attestation",
    label: "Abuja / Lagos Attestation",
    icon: "building",
    heading: "Abuja High Commission Attestation & MFA Legalization",
    challengeSummary:
      "Nigeria is not part of the Hague Apostille treaty. Indians in Lagos and Abuja often wonder how to sign an Indian Will without traveling to India.",
    legalMechanism:
      "Under Section 63 of the Indian Succession Act, your Will is valid when signed on plain A4 paper before two adult witnesses. You can also sign before the Indian High Commission in Abuja or Lagos for extra proof.",
    statutoryPrecedent:
      "ISA 1925 s. 63 & Diplomatic Act 1948",
    recommendedInstrument:
      "Consular Attested Plain-Paper Indian Testament",
    checklist: [
      "Print draft on standard plain A4 paper with zero Indian stamp paper required",
      "Sign before two adult witnesses who are not beneficiaries in the Will",
      "Optional attestation at Indian High Commission in Abuja or Lagos",
    ],
  },
];

export default function NriNigeriaWillInteractive() {
  const [selectedId, setSelectedId] = useState<string>("lagos-abuja-industrial-family");

  const currentScenario =
    NRI_NIGERIA_SCENARIOS.find((s) => s.id === selectedId) ||
    NRI_NIGERIA_SCENARIOS[0];

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
          Select Your Nigerian NRI Estate Scenario
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Explore tailored legal paths for Nigerian industrial assets, Lagos Administration of Estates Law, dual-will harmonization, and Abuja High Commission attestation:
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
        {NRI_NIGERIA_SCENARIOS.map((s) => {
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
                The Practical Challenge in Nigeria &amp; India
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
            Need advice on Nigerian estate laws and Indian property transfer?
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
