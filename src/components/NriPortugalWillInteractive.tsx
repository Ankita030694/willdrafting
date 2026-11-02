"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Building2,
  Coins,
  Globe2,
  Scale,
  ShieldCheck,
  FileCheck,
} from "lucide-react";

interface NriPortugalScenario {
  id: string;
  label: string;
  icon: "scale" | "globe" | "building" | "coins";
  heading: string; // Strictly <= 70 chars for Screaming Frog
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedInstrument: string;
  checklist: string[];
}

const NRI_PORTUGAL_SCENARIOS: NriPortugalScenario[] = [
  {
    id: "goa-civil-code-communion",
    label: "Goa Civil Code & Communion",
    icon: "scale",
    heading: "Goa Civil Code Communion of Assets & Meação",
    challengeSummary:
      "Goan NRIs and OCIs in Portugal often assume standard wills cover their Goa family lands. Under the Goa Civil Code of 1867, marriage creates joint ownership. This rule is called Communion of Assets. Neither spouse can give away the other spouse's 50% share without consent. This 50% share is called Meação.",
    legalMechanism:
      "In the Coutinho case (2019), the Supreme Court held that the 1867 Code governs succession in Goa. An Indian Will must separate your disposable quota from your spouse's 50% Meação. This stops family court lawsuits.",
    statutoryPrecedent:
      "Goa Civil Code 1867 & Coutinho Supreme Court Precedent (2019)",
    recommendedInstrument:
      "Goa-Compliant Indian Will with Spousal Consent & Meação Clause",
    checklist: [
      "Confirm if marriage was under Communion of Assets (Comunhão de Bens)",
      "Ring-fence surviving spouse's 50% undivided Meação rights",
      "Confine testamentary bequests strictly to the disposable quota",
    ],
  },
  {
    id: "brussels-iv-election",
    label: "Brussels IV Art. 22 Opt-In",
    icon: "globe",
    heading: "EU Brussels IV Election of Indian Succession Law",
    challengeSummary:
      "Portuguese succession law enforces mandatory forced heirship. This rule is called Legítima under Articles 2156 to 2178. Portuguese law reserves up to two-thirds of your estate for your children and spouse. This limits your power to give away Indian assets as you wish.",
    legalMechanism:
      "Under Article 22 of EU Regulation 650/2012 (Brussels IV), Indian passport holders and nationals living in Portugal can elect Indian succession law. This choice shields Indian assets from mandatory Portuguese splits.",
    statutoryPrecedent:
      "EU Regulation 650/2012 Art. 22 & Portuguese Civil Code Arts. 2156-2178",
    recommendedInstrument:
      "Indian Will with Brussels IV Professio Juris Clause",
    checklist: [
      "Include explicit Brussels IV Article 22 Indian law choice recital",
      "Ring-fence Indian assets from Portuguese Civil Code forced quotas",
      "Coordinate with your Portuguese Notary to prevent conflicting drafts",
    ],
  },
  {
    id: "escritura-probate-sync",
    label: "Escritura & Probate Sync",
    icon: "building",
    heading: "Portuguese Escritura & Indian Probate Coordination",
    challengeSummary:
      "Portuguese Notaries execute inheritance deeds called Escritura Pública de Partilha. Indian land offices and municipal bodies reject foreign Portuguese deeds. They do not have power over Indian land.",
    legalMechanism:
      "Under Section 5 of the Indian Succession Act 1925, Indian real estate follows Indian law. An Indian Will drafted under Section 63 avoids long foreign court disputes in India.",
    statutoryPrecedent:
      "Indian Succession Act 1925 ss. 5, 63, 228 & Code of Civil Procedure",
    recommendedInstrument:
      "Standalone Indian Will with Mutual Non-Revocation Terms",
    checklist: [
      "Draft standalone Indian Will on plain paper with two adult witnesses",
      "Ensure Portuguese notarial deed does not contain a worldwide revocation clause",
      "Appoint reliable India-resident executors to handle mutation without travel",
    ],
  },
  {
    id: "nre-nro-repatriation",
    label: "NRE/NRO & Repatriation",
    icon: "coins",
    heading: "Indian Bank Accounts & $1M FEMA Repatriation",
    challengeSummary:
      "NRIs in Lisbon, Porto, and Faro hold funds in NRE or NRO deposits, mutual funds, and shares in India. Many believe a bank nominee owns the funds after death. This is not true under Indian law.",
    legalMechanism:
      "In the Sarbati Devi case, the Supreme Court ruled that nominees are only caretakers. A clear Indian Will lets your heirs claim funds smoothly. They can then send up to $1M USD abroad each year through Form 15CA and 15CB.",
    statutoryPrecedent:
      "Sarbati Devi Precedent & RBI Master Directions on Remittance",
    recommendedInstrument:
      "Indian Testamentary Schedule of Financial Assets",
    checklist: [
      "Document all NRE/NRO accounts with branch IFSC and account details",
      "Record Demat folio numbers and mutual fund folio folios",
      "Plan capital repatriation through the $1,000,000 USD RBI window with Form 15CA/15CB",
    ],
  },
];

export default function NriPortugalWillInteractive() {
  const [activeTab, setActiveTab] = useState<string>("goa-civil-code-communion");

  // 3-Question Diagnostic State
  const [assetType, setAssetType] = useState<
    "goa_ancestral_property" | "urban_indian_flats" | "financial_nre_nro"
  >("goa_ancestral_property");
  const [residencyStatus, setResidencyStatus] = useState<
    "nri_indian_passport" | "oci_portuguese_passport"
  >("nri_indian_passport");
  const [hasPortugueseWill, setHasPortugueseWill] = useState<"yes" | "no">("yes");

  const currentScenario =
    NRI_PORTUGAL_SCENARIOS.find((s) => s.id === activeTab) ||
    NRI_PORTUGAL_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationSummary = "";
  let actionPoints: string[] = [];

  if (assetType === "goa_ancestral_property") {
    recommendationTitle = "Goa Ancestral Estate & Communion Protection";
    recommendationSummary =
      "For family houses and plots in Goa, your estate follows the 1867 Portuguese Civil Code under the Coutinho ruling. You must protect the 50% Meação share of your spouse.";
    actionPoints = [
      "Protect the 50% Meação share of your spouse in the Will",
      "Limit your gifts strictly to your legal disposable quota",
      "Execute coordinated mirror wills or get spousal consent",
    ];
  } else if (assetType === "urban_indian_flats") {
    recommendationTitle = "Urban Indian Real Estate & Lex Situs Strategy";
    recommendationSummary =
      "For flats in Mumbai, Delhi, Pune, or Bengaluru, Indian succession law applies. Portuguese notarial deeds are not accepted by Indian land registries.";
    actionPoints = [
      "Record sale deed dates, volume numbers, and land shares",
      "Choose Indian succession law under EU Brussels IV Article 22",
      "Appoint an India-based executor to update local records",
    ];
  } else {
    recommendationTitle = "Financial Asset Folio & Remittance Repatriation Plan";
    recommendationSummary =
      "For bank accounts, mutual funds, and shares in India, your Will must list bank details. This helps your family send money to Portugal under RBI rules.";
    actionPoints = [
      "List all Indian bank account numbers and Demat IDs",
      "Clarify that your Will overrides bank nominee status",
      "Send funds to Portugal under the $1M USD RBI quota",
    ];
  }

  const getScenarioIcon = (icon: string) => {
    switch (icon) {
      case "scale":
        return <Scale className="w-5 h-5 text-[#C65378]" />;
      case "globe":
        return <Globe2 className="w-5 h-5 text-[#C65378]" />;
      case "building":
        return <Building2 className="w-5 h-5 text-[#C65378]" />;
      case "coins":
        return <Coins className="w-5 h-5 text-[#C65378]" />;
      default:
        return <Globe2 className="w-5 h-5 text-[#C65378]" />;
    }
  };

  return (
    <section className="w-full mb-16 sm:mb-24">
      <div className="max-w-3xl mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <ShieldCheck className="w-4 h-4" />
          <span>Interactive Cross-Border Tool</span>
        </div>
        <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-4">
          Portugal NRI Estate Risk Analyzer &amp; Strategy Planner
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Pick your asset type and family situation below. Learn how the Goa Civil
          Code, EU Brussels IV, Portuguese law, and the Indian Succession Act work
          together for your estate:
        </p>
      </div>

      {/* Scenario Selection Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {NRI_PORTUGAL_SCENARIOS.map((scenario) => {
          const isSelected = scenario.id === activeTab;
          return (
            <button
              key={scenario.id}
              onClick={() => setActiveTab(scenario.id)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? "bg-white border-[#C65378] shadow-md ring-1 ring-[#C65378]"
                  : "bg-white/60 border-[#172228]/10 hover:border-[#172228]/25 hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <div className="p-2 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
                  {getScenarioIcon(scenario.icon)}
                </div>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-[#C65378]" />
                )}
              </div>
              <div>
                <span className="text-xs font-semibold text-[#55636D] block mb-1">
                  Scenario Focus
                </span>
                <span className="text-sm font-bold text-[#111827] leading-snug">
                  {scenario.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Scenario Detail Card */}
      <div className="bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 mb-6 border-b border-[#172228]/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-2">
              <span>Selected Legal Analysis</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-semibold text-[#111827] leading-snug">
              {currentScenario.heading}
            </h4>
          </div>
          <div className="shrink-0 bg-[#FAF7F0] px-4 py-2.5 rounded-xl border border-[#172228]/10 text-xs">
            <span className="text-[#55636D] block">Statutory Basis:</span>
            <span className="font-semibold text-[#111827]">
              {currentScenario.statutoryPrecedent}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#55636D] mb-2">
              Cross-Border Challenge
            </h5>
            <p className="text-[14.5px] leading-[1.65] text-[#374151]">
              {currentScenario.challengeSummary}
            </p>
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#55636D] mb-2">
              Legal Mechanism &amp; Protection
            </h5>
            <p className="text-[14.5px] leading-[1.65] text-[#374151]">
              {currentScenario.legalMechanism}
            </p>
          </div>
        </div>

        <div className="bg-[#FAF7F0] rounded-2xl p-5 sm:p-6 border border-[#172228]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C65378] block mb-1">
              Recommended Legal Action
            </span>
            <span className="text-base font-semibold text-[#111827]">
              {currentScenario.recommendedInstrument}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentScenario.checklist.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 text-xs bg-white px-3 py-1.5 rounded-full border border-[#172228]/10 text-[#374151]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#047857] shrink-0" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic 3-Question Diagnostic Assessment */}
      <div className="bg-[#172228] text-[#FAF7F0] rounded-[28px] p-6 sm:p-9 shadow-lg">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-2">
            <FileCheck className="w-4 h-4" />
            <span>Interactive Estate Diagnostic</span>
          </div>
          <h4 className="text-xl sm:text-2xl font-medium text-white mb-2">
            Personalize Your Portugal-India Estate Strategy
          </h4>
          <p className="text-xs sm:text-sm text-white/70">
            Answer 3 quick questions about your residency and holdings to generate your bespoke legal recommendation:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Question 1: Asset Type */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-white/60 block mb-2.5">
              1. Primary Indian Asset Base
            </label>
            <div className="space-y-2">
              {[
                { id: "goa_ancestral_property", label: "Goa Ancestral & Real Estate" },
                { id: "urban_indian_flats", label: "Urban Flats (Mumbai / Delhi / Bengaluru)" },
                { id: "financial_nre_nro", label: "NRE/NRO Bank Accounts & Demat" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAssetType(opt.id as any)}
                  className={`w-full text-left text-xs sm:text-[13px] px-3.5 py-2.5 rounded-xl border transition-all ${
                    assetType === opt.id
                      ? "bg-[#C65378] border-[#C65378] text-white font-semibold"
                      : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Residency Status */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-white/60 block mb-2.5">
              2. Nationality &amp; Residence
            </label>
            <div className="space-y-2">
              {[
                { id: "nri_indian_passport", label: "NRI (Indian Passport in Portugal)" },
                { id: "oci_portuguese_passport", label: "Portuguese Citizen / OCI (Goan Diaspora)" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setResidencyStatus(opt.id as any)}
                  className={`w-full text-left text-xs sm:text-[13px] px-3.5 py-2.5 rounded-xl border transition-all ${
                    residencyStatus === opt.id
                      ? "bg-[#C65378] border-[#C65378] text-white font-semibold"
                      : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Existing Portuguese Will */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-white/60 block mb-2.5">
              3. Portuguese Will / Notarial Deed
            </label>
            <div className="space-y-2">
              {[
                { id: "yes", label: "Yes (Executed Before Portuguese Notary)" },
                { id: "no", label: "No (No Portuguese Will Executed Yet)" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setHasPortugueseWill(opt.id as any)}
                  className={`w-full text-left text-xs sm:text-[13px] px-3.5 py-2.5 rounded-xl border transition-all ${
                    hasPortugueseWill === opt.id
                      ? "bg-[#C65378] border-[#C65378] text-white font-semibold"
                      : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Diagnostic Output Card */}
        <div className="bg-white/10 rounded-2xl p-5 sm:p-7 border border-white/15">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#C65378] block mb-1">
                Custom Diagnostic Assessment
              </span>
              <h5 className="text-base sm:text-lg font-semibold text-white">
                {recommendationTitle}
              </h5>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#C65378] hover:bg-[#a13c5d] px-4 py-2.5 rounded-full transition-colors shrink-0"
            >
              <span>Consult Cross-Border Advocate</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-4">
            {recommendationSummary}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-white/90">
            {actionPoints.map((point, idx) => (
              <div
                key={idx}
                className="bg-black/20 p-2.5 rounded-xl border border-white/10 flex items-start gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
