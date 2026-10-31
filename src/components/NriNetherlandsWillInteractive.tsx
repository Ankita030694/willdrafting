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

interface NriNetherlandsScenario {
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

const NRI_NETHERLANDS_SCENARIOS: NriNetherlandsScenario[] = [
  {
    id: "dutch-legitieme-portie",
    label: "Dutch Code: Forced Share",
    icon: "landmark",
    heading: "Dutch Civil Code: Ring-Fencing Against Legitieme Portie",
    challengeSummary:
      "Dutch Civil Code Book 4 (BW 4:63) grants children a statutory monetary claim (legitieme portie) equal to half of their intestate share. Indian expats in Amsterdam, Eindhoven, and Rotterdam who distribute Indian property unequally face potential monetary claims from disinherited heirs under Dutch law.",
    legalMechanism:
      "Under Section 5 of the Indian Succession Act 1925, succession to immovable property in India follows Indian law (Lex Situs). Section 30 of the Hindu Succession Act 1956 gives complete freedom to dispose of self-acquired property by Will. An Indian Will with Brussels IV choice-of-law recitals ring-fences Indian land against Dutch forced share calculations.",
    statutoryPrecedent: "Dutch Civil Code BW 4:63 vs ISA 1925 s. 5 & HSA 1956 s. 30",
    recommendedInstrument: "Lex Situs Ring-Fenced Indian Testamentary Will",
    checklist: [
      "Expressly declare that Indian land and flats follow Indian law under Section 5",
      "Confirm full testamentary freedom under Section 30 of the Hindu Succession Act",
      "Insert non-revocation terms so a Dutch notarial will never cancels your Indian Will",
    ],
  },
  {
    id: "eu-brussels-iv-choice-of-law",
    label: "EU Brussels IV Election",
    icon: "globe",
    heading: "EU Regulation 650/2012: Electing Indian Succession Law",
    challengeSummary:
      "Under EU Regulation 650/2012 (Brussels IV), succession to the estate of an NRI habitually resident in the Netherlands is governed by Dutch law as a whole by default, exposing worldwide holdings to Dutch probate delays and forced heirship.",
    legalMechanism:
      "Article 22 of Brussels IV allows an individual with Indian citizenship to choose the law of India (professio juris) to govern succession. Our High Court advocates draft clean choice-of-law clauses ensuring Dutch notarial wills and Indian wills operate smoothly in parallel without cross-border conflict.",
    statutoryPrecedent: "EU Regulation 650/2012 Article 22 & Indian Succession Act 1925",
    recommendedInstrument: "Brussels IV Professio Juris Cross-Border Will Package",
    checklist: [
      "Formally designate Indian national law in your Will under Article 22",
      "Define territorial boundaries so Indian assets are ring-fenced from Dutch probate",
      "Provide certified English and Dutch copies for seamless multi-jurisdiction administration",
    ],
  },
  {
    id: "dutch-rechtbank-apostille",
    label: "Rechtbank & Embassy Protocol",
    icon: "building",
    heading: "Dutch Rechtbank Apostille & Embassy The Hague Protocol",
    challengeSummary:
      "NRIs and OCIs in Amsterdam, Eindhoven, Rotterdam, and The Hague need a legally recognized way to execute an Indian Will without travelling to India or paying expensive Indian stamp duties.",
    legalMechanism:
      "Under the 1961 Hague Apostille Convention, documents apostilled by a Dutch District Court (Rechtbank) in Amsterdam, Rotterdam, or The Hague are valid in India without further consular legalization. Alternatively, NRIs can book an attestation appointment at the Embassy of India in The Hague. Section 63 of the Indian Succession Act allows signing on plain A4 paper before two witnesses.",
    statutoryPrecedent: "Hague Apostille Convention 1961 & Indian Succession Act Section 63",
    recommendedInstrument: "Rechtbank-Apostilled or Consular-Attested Indian Will",
    checklist: [
      "Print and sign on plain A4 paper in the Netherlands (zero Indian stamp duty needed)",
      "Sign before two adult witnesses who are not named as heirs in the Will",
      "Obtain a Hague Apostille sticker from your local Dutch Rechtbank or Embassy attestation",
    ],
  },
  {
    id: "fema-erfbelasting-repatriation",
    label: "Erfbelasting & Repatriation",
    icon: "coins",
    heading: "Managing Dutch Erfbelasting & USD 1M FEMA Remittance",
    challengeSummary:
      "Dutch residents are subject to Dutch inheritance tax (erfbelasting) up to 20% on children and 40% on others under the Successiewet 1956. In India, property sales by NRIs face 20% TDS under Section 195 of the Income Tax Act.",
    legalMechanism:
      "Under the India-Netherlands DTAA and RBI FEMA Remittance of Assets Regulations 2016, NRI and OCI heirs can send up to USD 1,000,000 (in Euros) per financial year from their NRO account to the Netherlands. Our advocates secure Section 197 Lower TDS certificates (Form 13) and CA certificates (Form 15CA/CB) for fast bank wire transfers.",
    statutoryPrecedent: "Dutch Successiewet 1956 & RBI FEMA Master Direction 13/2015-16",
    recommendedInstrument: "FEMA-Compliant Asset Transmission & Euro Remittance Plan",
    checklist: [
      "Align NRE, NRO, and demat bank nominations with your Indian Will beneficiaries",
      "Apply for Form 13 Lower TDS certificate prior to liquidating Indian real estate",
      "Secure Form 15CA and 15CB CA clearance for wire transfer to Dutch bank accounts",
    ],
  },
];

export default function NriNetherlandsWillInteractive() {
  const [selectedId, setSelectedId] = useState<string>("dutch-legitieme-portie");

  const currentScenario =
    NRI_NETHERLANDS_SCENARIOS.find((s) => s.id === selectedId) ||
    NRI_NETHERLANDS_SCENARIOS[0];

  const renderIcon = (type: NriNetherlandsScenario["icon"]) => {
    switch (type) {
      case "landmark":
        return <Landmark className="w-4 h-4 text-[#C65378]" />;
      case "globe":
        return <Globe2 className="w-4 h-4 text-[#C65378]" />;
      case "building":
        return <Building2 className="w-4 h-4 text-[#C65378]" />;
      case "coins":
        return <Coins className="w-4 h-4 text-[#C65378]" />;
      default:
        return <FileText className="w-4 h-4 text-[#C65378]" />;
    }
  };

  return (
    <div className="w-full bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-14">
      {/* Component Title Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2.5">
          <Calculator className="w-4 h-4" />
          <span>Interactive Cross-Border Diagnostic Tool</span>
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-[1.75rem] font-medium text-[#111827] leading-snug mb-3">
          Netherlands NRI Estate Architecture &amp; Legal Strategy Selector
        </h3>
        <p className="text-sm sm:text-base text-[#49585F] leading-relaxed">
          Select your family estate profile in the Netherlands to inspect the
          exact statutory conflict, Lex Situs protection mechanism, and
          recommended cross-border legal instrument:
        </p>
      </div>

      {/* Scenario Selection Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
        {NRI_NETHERLANDS_SCENARIOS.map((scenario) => {
          const isSelected = scenario.id === selectedId;
          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() => setSelectedId(scenario.id)}
              className={`flex items-center gap-2.5 p-3.5 sm:p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#172228] text-white border-[#172228] shadow-md"
                  : "bg-[#FAF7F0] hover:bg-white text-[#172228] border-[#172228]/10"
              }`}
            >
              <div
                className={`p-2 rounded-xl shrink-0 ${
                  isSelected ? "bg-white/10 text-white" : "bg-white text-[#C65378]"
                }`}
              >
                {renderIcon(scenario.icon)}
              </div>
              <span className="text-xs sm:text-sm font-semibold leading-tight">
                {scenario.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Scenario Display Card */}
      <div className="rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#172228]/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#C65378] block mb-1">
              Statutory Benchmark: {currentScenario.statutoryPrecedent}
            </span>
            <h4 className="text-lg sm:text-xl font-medium text-[#111827]">
              {currentScenario.heading}
            </h4>
          </div>
          <div className="shrink-0">
            <span className="inline-block text-xs font-semibold px-4 py-2 rounded-full bg-white border border-[#172228]/10 text-[#172228] shadow-2xs">
              {currentScenario.recommendedInstrument}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#172228] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
              <span>Cross-Border Legal Trap</span>
            </div>
            <p className="text-sm leading-relaxed text-[#49585F] bg-white p-4 rounded-xl border border-[#172228]/5">
              {currentScenario.challengeSummary}
            </p>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#172228] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#047857]" />
              <span>Lex Situs Statutory Solution</span>
            </div>
            <p className="text-sm leading-relaxed text-[#49585F] bg-white p-4 rounded-xl border border-[#172228]/5">
              {currentScenario.legalMechanism}
            </p>
          </div>
        </div>

        {/* Actionable Legal Checklist */}
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#172228] mb-3">
            Mandatory Will Drafting Steps for Dutch NRIs:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentScenario.checklist.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-[#172228]/5 text-xs text-[#374151] leading-relaxed"
              >
                <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA within interactive tool */}
        <div className="mt-8 pt-6 border-t border-[#172228]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-[#55636D]">
            Need a custom cross-border estate audit across Amsterdam, Eindhoven, or The Hague?
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-semibold px-5 py-2.5 shadow-sm transition-all"
            >
              <span>Consult Estate Lawyer</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/tools/nri-property-sale-tds-repatriation-calculator"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#172228]/20 hover:border-[#C65378] text-[#172228] hover:text-[#C65378] text-xs font-semibold px-4 py-2.5 transition-all bg-white"
            >
              <span>FEMA TDS Calculator</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
