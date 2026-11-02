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

interface NriKenyaScenario {
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

const NRI_KENYA_SCENARIOS: NriKenyaScenario[] = [
  {
    id: "nairobi-mombasa-ancestral-land",
    label: "Nairobi / Mombasa: Ancestral Land",
    icon: "globe",
    heading: "Nairobi & Mombasa: Ancestral Land in Gujarat & Punjab",
    challengeSummary:
      "Kenyan-Indian families living in Nairobi (Parklands, Westlands) or Mombasa (Nyali) often own ancestral land in Gujarat or Punjab. If land records are old, relatives in India may try to claim the plots through adverse possession or illegal mutation.",
    legalMechanism:
      "Under FEMA rule 3(1)(b) and Section 6(5) of FEMA 1999, OCIs and foreign passport holders can legally inherit farm land and ancestral homes. A standalone Indian Will with certified Pedhinama (family tree) and 7/12 extract details stops disputes before the local Tehsildar.",
    statutoryPrecedent:
      "FEMA Reg 3(1)(b) & ISA 1925 s. 5",
    recommendedInstrument:
      "Ancestral Land Indian Will with Revenue Mutation Protocol",
    checklist: [
      "Check 7/12 land records in Gujarat or Jamabandi in Punjab with the Tehsildar",
      "Sign a plain-paper Will before two adult witnesses in Kenya",
      "Name a trusted Indian Power of Attorney agent for land office work",
    ],
  },
  {
    id: "kenya-cap-160-foreign-probate",
    label: "Cap 160 vs Sec 228 Probate",
    icon: "landmark",
    heading: "Kenya Cap 160 vs Section 228 Indian Probate Resealing",
    challengeSummary:
      "Under Kenya's Law of Succession Act (Cap 160), grants of probate issued by the High Court of Kenya have no direct force in India. Indian land registries and banks reject Kenyan court grants without formal Indian court recognition.",
    legalMechanism:
      "Under Section 228 of the Indian Succession Act, 1925, using a Kenyan grant requires filing a fresh case in an Indian High Court with an authenticated copy. This takes 18 to 36 months. A separate Indian Will avoids Section 228 delays and allows direct local transfer.",
    statutoryPrecedent:
      "ISA 1925 s. 228 & Kenya Cap 160 s. 47",
    recommendedInstrument:
      "Jurisdictionally Ring-Fenced Standalone Indian Will",
    checklist: [
      "Add a territorial clause to isolate Kenyan business assets",
      "Remove universal revocation words that could cancel Indian wills",
      "Name an India-resident executor for quick local administration",
    ],
  },
  {
    id: "kenyan-dual-will-revocation",
    label: "Dual-Will Harmonization",
    icon: "coins",
    heading: "Dual-Will Strategy: Preventing Accidental Will Revocation",
    challengeSummary:
      "Standard Kenyan Wills drafted by Nairobi or Mombasa advocates contain a blanket clause cancelling all past wills. Under Section 18 of Cap 160, this boilerplate clause cancels your earlier Indian Will by mistake.",
    legalMechanism:
      "Our High Court advocates draft synchronized twin Wills. Your Kenyan Will covers local business shares and Nairobi real estate under Cap 160. Your Indian Will covers Indian land and bank accounts under ISA 1925, protecting both estates.",
    statutoryPrecedent:
      "Kenya Cap 160 s. 18 & ISA 1925 s. 62",
    recommendedInstrument:
      "Harmonized Dual-Will Framework with Non-Revocation Covenants",
    checklist: [
      "Share details with your Kenyan advocate in Nairobi or Mombasa",
      "Include explicit non-revocation clauses in both legal documents",
      "Ensure two independent adult witnesses sign both pages under statutory rules",
    ],
  },
  {
    id: "nairobi-consular-attestation",
    label: "Nairobi Attestation & MFA",
    icon: "building",
    heading: "Nairobi High Commission Attestation & MFA Legalization",
    challengeSummary:
      "Kenya is not a member of the Hague Apostille treaty. Kenyan Indians in Nairobi, Mombasa, Kisumu, or Nakuru often wonder how to make a valid Indian Will without traveling to India or facing document rejection.",
    legalMechanism:
      "Under Section 63 of the Indian Succession Act, an Indian Will is legally valid when signed on plain A4 paper before two adult witnesses with zero stamp duty. For extra court proof, testators can attest the Will before the High Commission of India in Nairobi or Mombasa.",
    statutoryPrecedent:
      "ISA 1925 s. 63 & Diplomatic Consular Officers Act 1948",
    recommendedInstrument:
      "Consular Attested or Plain-Paper Executed Indian Will",
    checklist: [
      "Print on standard A4 paper with zero Indian stamp paper needed",
      "Sign before two adult witnesses who are not named as heirs",
      "Optionally schedule consular attestation in Nairobi or Mombasa",
    ],
  },
];

export default function NriKenyaWillInteractive() {
  const [selectedId, setSelectedId] = useState<string>("nairobi-mombasa-ancestral-land");

  const currentScenario =
    NRI_KENYA_SCENARIOS.find((s) => s.id === selectedId) ||
    NRI_KENYA_SCENARIOS[0];

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
          Select Your Kenyan NRI Estate Scenario
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Explore tailored legal paths for ancestral property in Gujarat or Punjab, Kenya Cap 160 probate resealing, dual-will harmonization, and Nairobi consular attestation:
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
        {NRI_KENYA_SCENARIOS.map((s) => {
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
                The Practical Challenge in Kenya &amp; India
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
            Need help with Kenya succession law and Indian property transfer?
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
