"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Scale,
  ShieldCheck,
  Building2,
  Users2,
  Coins,
  HeartHandshake,
  HelpCircle,
} from "lucide-react";

interface TrustScenario {
  id: string;
  label: string;
  icon: "shield" | "heart" | "building" | "coins";
  heading: string; // Strictly <= 70 chars for Screaming Frog
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedInstrument: string;
  taxStatus: string;
  checklist: string[];
}

const TRUST_SCENARIOS: TrustScenario[] = [
  {
    id: "founder-asset-protection",
    label: "HNI Asset Protection",
    icon: "shield",
    heading: "HNI Asset Protection & Insolvency Ring-Fencing",
    challengeSummary:
      "Business owners, founders, and directors risk personal wealth when signing corporate guarantees or navigating volatile commercial markets.",
    legalMechanism:
      "Under Sections 5 and 6 of the Indian Trusts Act, 1882, assets settled into an irrevocable trust cease to be the personal property of the settlor. Creditors cannot attach trust property for personal liabilities incurred after settlement, providing ironclad protection under the Insolvency and Bankruptcy Code (IBC), 2016.",
    statutoryPrecedent:
      "Indian Trusts Act, 1882 ss. 5-6 & IBC 2016 Asset Ring-Fencing",
    recommendedInstrument:
      "Irrevocable Discretionary Private Family Trust Deed",
    taxStatus:
      "Taxed at Maximum Marginal Rate (MMR) under Section 164, with ring-fenced principal corpus.",
    checklist: [
      "Settle assets well before taking commercial risk or debt",
      "Appoint independent or corporate co-trustees for arm-length control",
      "Include clear non-attachment and spendthrift protective clauses",
      "Register the trust deed under Section 17 of the Registration Act",
    ],
  },
  {
    id: "special-needs-child",
    label: "Special Needs Child Care",
    icon: "heart",
    heading: "Special Needs Dependent Lifetime Care & Support",
    challengeSummary:
      "Parents of individuals with autism, cerebral palsy, or other conditions worry about who will provide financial care when they are gone.",
    legalMechanism:
      "The Indian Trusts Act, 1882 read with the National Trust Act, 1999 enables a dedicated protective trust. Crucially, the Proviso to Section 164(1) of the Income Tax Act provides that trusts formed for disabled dependent relatives are taxed at individual slab rates rather than the high Maximum Marginal Rate.",
    statutoryPrecedent:
      "Proviso to Section 164(1) Income Tax Act & National Trust Act, 1999",
    recommendedInstrument:
      "Irrevocable Determinate Special Needs Trust Deed",
    taxStatus:
      "Exempt from MMR; taxed at individual beneficiary slab rates with Section 80DD benefits.",
    checklist: [
      "Detail continuous healthcare and daily therapy protocols",
      "Appoint institutional or trusted family co-trustees",
      "Define backup succession trustees for lifelong continuity",
      "Add remainder beneficiary instructions after child lifetime",
    ],
  },
  {
    id: "probate-avoidance-realty",
    label: "Probate Avoidance",
    icon: "building",
    heading: "Smooth Wealth Transfer Without High Court Probate",
    challengeSummary:
      "Probating a Will in Mumbai, Chennai, or Kolkata takes 12 to 24 months, causing asset freezes and bitter disputes among surviving heirs.",
    legalMechanism:
      "A Private Family Trust owns legal title during the settlor lifetime. Upon demise, ownership does not require court confirmation. Trustees immediately manage rental yields, business interests, and Demat shares according to the trust deed without public High Court probate under Section 213 of the Indian Succession Act.",
    statutoryPrecedent:
      "Indian Trusts Act, 1882 s. 3 & Indian Succession Act, 1925 s. 213 Exemption",
    recommendedInstrument:
      "Irrevocable Determinate Family Trust with Multi-Tier Governance",
    taxStatus:
      "Taxed at individual beneficiary slab rates under Section 161 of the Income Tax Act.",
    checklist: [
      "Execute registered conveyance deeds for immovable properties",
      "Transfer Demat shares and mutual fund folios to Trust PAN",
      "Set clear distribution timelines across three generations",
      "Appoint a Trust Protector to arbitrate internal family disagreements",
    ],
  },
  {
    id: "nri-cross-border",
    label: "NRI Family Wealth",
    icon: "coins",
    heading: "Cross-Border Wealth Structuring for NRI Families",
    challengeSummary:
      "Families with NRI children face complex overseas probate rules, FEMA restrictions, and bank verification hurdles for Indian inheritances.",
    legalMechanism:
      "A resident family trust consolidates Indian residential homes, commercial plots, and bank investments under Indian law. Distributions to non-resident beneficiaries flow into NRO accounts, permitting annual repatriation up to USD 1 Million per beneficiary under RBI regulations and Form 15CA/15CB certificates.",
    statutoryPrecedent:
      "FEMA (Remittance of Assets) Regulations & Income Tax Act s. 195",
    recommendedInstrument:
      "FEMA-Compliant Private Family Trust Deed with Foreign Remittance Rules",
    taxStatus:
      "Subject to Section 195 TDS with double tax treaty (DTAA) relief options.",
    checklist: [
      "Ensure at least one resident trustee manages local statutory filings",
      "Align trust remittance schedules with FEMA USD 1M annual caps",
      "Obtain Chartered Accountant Form 15CB certifications for transfers",
      "Prevent accidental US IRS or UK tax exposure with dual counsel review",
    ],
  },
];

export default function FamilyTrustInteractive() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(
    "founder-asset-protection"
  );

  // Diagnostic tool state
  const [goal, setGoal] = useState<"protection" | "special_needs" | "probate" | "nri">("protection");
  const [control, setControl] = useState<"revocable" | "irrevocable">("irrevocable");
  const [payout, setPayout] = useState<"discretionary" | "determinate">("discretionary");

  const currentScenario =
    TRUST_SCENARIOS.find((s) => s.id === activeScenarioId) || TRUST_SCENARIOS[0];

  const getRecommendation = () => {
    if (goal === "special_needs") {
      return {
        trustType: "Special Needs Child Trust (Irrevocable Determinate)",
        taxNote: "Taxed at individual beneficiary slab rates (exempt from MMR under Section 164(1) proviso).",
        protection: "Complete ring-fencing from distant relatives and personal creditors.",
        action: "Book a consultation with our special needs estate planning advocates.",
      };
    }
    if (control === "revocable") {
      return {
        trustType: "Revocable Family Living Trust",
        taxNote: "Income is clubbed with the Settlor under Sections 61-63 of the Income Tax Act.",
        protection: "No creditor protection; settlor retains absolute power to revoke or amend.",
        action: "Ideal for flexible inter vivos wealth management during your active lifetime.",
      };
    }
    if (payout === "determinate") {
      return {
        trustType: "Irrevocable Determinate Family Trust",
        taxNote: "Taxed at individual beneficiary slab rates under Section 161 (Representative Assessee).",
        protection: "Strong creditor protection; shares are fixed by percentage in the deed.",
        action: "Recommended for family wealth distribution with predictable annual income flows.",
      };
    }
    return {
      trustType: "Irrevocable Discretionary Family Trust",
      taxNote: "Taxed at Maximum Marginal Rate (MMR ~ 39% to 42.74%) under Section 164.",
      protection: "Maximum protection against creditors, bankruptcy, and divorce claims.",
      action: "Gold standard for founders, promoters, and HNIs seeking full asset protection.",
    };
  };

  const rec = getRecommendation();

  return (
    <div className="w-full space-y-12">
      {/* Scenario Selector Card */}
      <div className="bg-white rounded-[28px] sm:rounded-[36px] border border-[#172228]/10 p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2">
            <Scale className="w-4 h-4" />
            <span>Interactive Trust Blueprint Explorer</span>
          </div>
          {/* H2 <= 70 chars */}
          <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
            Interactive Trust Structuring &amp; Diagnostic Tool
          </h3>
          <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
            Select your family wealth scenario to inspect statutory protections, tax treatment, and drafting requirements under the Indian Trusts Act, 1882:
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-1.5 bg-[#FAF7F0] rounded-2xl border border-[#172228]/10 mb-8">
          {TRUST_SCENARIOS.map((scenario) => {
            const isActive = activeScenarioId === scenario.id;
            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => setActiveScenarioId(scenario.id)}
                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#172228] text-white shadow-sm"
                    : "text-[#49585F] hover:text-[#172228] hover:bg-white/60"
                }`}
              >
                {scenario.icon === "shield" && <ShieldCheck className="w-4 h-4" />}
                {scenario.icon === "heart" && <HeartHandshake className="w-4 h-4" />}
                {scenario.icon === "building" && <Building2 className="w-4 h-4" />}
                {scenario.icon === "coins" && <Coins className="w-4 h-4" />}
                <span className="truncate">{scenario.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Scenario Display */}
        <div className="border border-[#172228]/10 rounded-2xl p-6 sm:p-8 bg-[#FAF7F0]/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-[#172228]/10">
            <h3 className="text-xl sm:text-2xl font-semibold text-[#111827]">
              {currentScenario.heading}
            </h3>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65378] bg-[#C65378]/10 px-3 py-1.5 rounded-full border border-[#C65378]/20 self-start sm:self-auto">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{currentScenario.statutoryPrecedent}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-6">
            <div className="lg:col-span-7 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] mb-1.5">
                  The Family Challenge
                </h4>
                <p className="text-[14.5px] sm:text-[15px] leading-[1.65] text-[#374151]">
                  {currentScenario.challengeSummary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] mb-1.5">
                  Statutory Trust Mechanism
                </h4>
                <p className="text-[14.5px] sm:text-[15px] leading-[1.65] text-[#374151]">
                  {currentScenario.legalMechanism}
                </p>
              </div>

              <div className="pt-1">
                <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] mb-1.5">
                  Income Tax Position (Sections 160-164)
                </h4>
                <p className="text-[14px] leading-[1.6] text-[#047857] font-medium bg-[#047857]/10 p-3 rounded-xl border border-[#047857]/20">
                  {currentScenario.taxStatus}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] block mb-1">
                  Recommended Legal Trust Deed
                </span>
                <span className="inline-block text-sm font-semibold text-[#172228] bg-white px-3.5 py-2 rounded-lg border border-[#172228]/10 shadow-2xs">
                  {currentScenario.recommendedInstrument}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-[#172228]/10 flex flex-col justify-between shadow-2xs">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-[#172228] mb-3.5">
                  Advocate Drafting Checklist
                </h4>
                <ul className="space-y-3 text-[13.5px] sm:text-[14px] text-[#49585F] leading-snug">
                  {currentScenario.checklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors"
                >
                  <span>Structure This Trust with AMA Legal</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 30-Second Trust Diagnostic Decision Tool */}
      <div className="bg-[#FAF7F0] border border-[#172228]/15 rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>30-Second Trust Diagnostic Tool</span>
          </div>
          <h3 className="text-xl sm:text-2xl lg:text-[1.85rem] font-medium text-[#111827] mb-2 leading-tight">
            Find the Optimal Trust Structure for Your Family Wealth
          </h3>
          <p className="text-sm sm:text-[15px] leading-relaxed text-[#55636D]">
            Answer three quick questions to calculate the recommended trust vehicle, tax classification, and creditor protection level:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Question 1: Goal */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C65378] mb-2 block">
                Question 1 · Primary Purpose
              </span>
              <label className="text-sm font-semibold text-[#111827] mb-3 block">
                What is your main wealth protection goal?
              </label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setGoal("protection")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                    goal === "protection"
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/30"
                  }`}
                >
                  Founder creditor &amp; insolvency protection
                </button>
                <button
                  type="button"
                  onClick={() => setGoal("special_needs")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                    goal === "special_needs"
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/30"
                  }`}
                >
                  Lifetime care for a special needs dependent
                </button>
                <button
                  type="button"
                  onClick={() => setGoal("probate")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                    goal === "probate"
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/30"
                  }`}
                >
                  Avoid probate &amp; ensure private succession
                </button>
                <button
                  type="button"
                  onClick={() => setGoal("nri")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                    goal === "nri"
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/30"
                  }`}
                >
                  Consolidate Indian assets for NRI heirs
                </button>
              </div>
            </div>
          </div>

          {/* Question 2: Control */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C65378] mb-2 block">
                Question 2 · Settlor Control
              </span>
              <label className="text-sm font-semibold text-[#111827] mb-3 block">
                Do you need power to cancel or revoke the trust?
              </label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setControl("irrevocable")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                    control === "irrevocable"
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/30"
                  }`}
                >
                  No, make it irrevocable for creditor shield
                </button>
                <button
                  type="button"
                  onClick={() => setControl("revocable")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                    control === "revocable"
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/30"
                  }`}
                >
                  Yes, retain complete power to revoke or amend
                </button>
              </div>
            </div>
          </div>

          {/* Question 3: Distribution Model */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C65378] mb-2 block">
                Question 3 · Payout Flexibility
              </span>
              <label className="text-sm font-semibold text-[#111827] mb-3 block">
                How should trustees distribute trust profits?
              </label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setPayout("discretionary")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                    payout === "discretionary"
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/30"
                  }`}
                >
                  Discretionary based on beneficiary needs
                </button>
                <button
                  type="button"
                  onClick={() => setPayout("determinate")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                    payout === "determinate"
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/30"
                  }`}
                >
                  Determinate fixed percentage to each heir
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnostic Output Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#172228]/10 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#047857] bg-[#047857]/10 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Diagnostic Result</span>
            </div>
            <h4 className="text-xl font-bold text-[#111827]">
              {rec.trustType}
            </h4>
            <p className="text-xs sm:text-[13.5px] text-[#49585F] leading-relaxed">
              <strong>Tax Rule:</strong> {rec.taxNote}
            </p>
            <p className="text-xs sm:text-[13.5px] text-[#49585F] leading-relaxed">
              <strong>Protection Degree:</strong> {rec.protection}
            </p>
            <p className="text-xs sm:text-[13px] text-[#55636D] italic">
              {rec.action}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.14em] px-6 py-3.5 transition-colors shadow-sm text-center"
            >
              <span>Consult Trust Advocate</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/tools/succession-calculator"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#FAF7F0] hover:bg-[#172228] hover:text-white text-[#172228] text-xs font-semibold px-5 py-3 border border-[#172228]/10 transition-colors text-center"
            >
              <span>Test Succession Calculator</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
