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
  Gavel,
} from "lucide-react";

interface SettlementScenario {
  id: string;
  label: string;
  icon: "building" | "users" | "coins" | "gavel";
  heading: string; // Strictly <= 70 chars for Screaming Frog
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedInstrument: string;
  checklist: string[];
}

const SETTLEMENT_SCENARIOS: SettlementScenario[] = [
  {
    id: "ancestral-huf",
    label: "Ancestral & HUF Shares",
    icon: "users",
    heading: "Ancestral Property Division Among Legal Heirs",
    challengeSummary:
      "Dividing ancestral family land among brothers and sisters can stall if rights are disputed. Clear consent is vital.",
    legalMechanism:
      "Under Section 6 of the Hindu Succession Act, 1956, daughters hold equal birth rights in ancestral land. The Supreme Court confirmed this in Vineeta Sharma (2020). An ironclad deed lists all heirs so no one can file a partition suit later.",
    statutoryPrecedent:
      "Section 6 Hindu Succession Act, 1956 & Vineeta Sharma (2020 SC)",
    recommendedInstrument:
      "Comprehensive Family Settlement Deed or Registered Partition Deed",
    checklist: [
      "Collect family tree records and legal heir certificates",
      "Include all daughters and coparceners to keep the deed valid",
      "Bar future claims from distant relatives or descendants",
    ],
  },
  {
    id: "multi-floor-house",
    label: "Multi-Floor House Demarcation",
    icon: "building",
    heading: "Floor-Wise Division of Joint Residential Homes",
    challengeSummary:
      "When siblings inherit a multi-story home, fights break out over roof access, parking slots, and land shares.",
    legalMechanism:
      "Each floor is listed in a clear schedule with separate utility meters. Staircases and terrace rights are protected under the Indian Easements Act, 1882. This gives each sibling full private ownership of their floor.",
    statutoryPrecedent:
      "Registration Act, 1908 s. 17 & Indian Easements Act, 1882",
    recommendedInstrument:
      "Registered Partition Deed with Boundary Demarcations",
    checklist: [
      "Specify exact carpet area and floor boundary limits",
      "State the undivided share of land (UDS) for each floor owner",
      "Set down clear rules for water tanks and rooftop solar access",
    ],
  },
  {
    id: "owelty-cash",
    label: "Owelty Cash Compensation",
    icon: "coins",
    heading: "Equalizing Unequal Property Values with Owelty",
    challengeSummary:
      "Some properties have higher market value than others. Physical division cannot always make values equal.",
    legalMechanism:
      "The legal rule of Owelty lets the heir getting the costlier parcel pay cash to the others. Under Section 47 of the Income Tax Act, this cash owelty is tax-free. It does not count as a property sale.",
    statutoryPrecedent:
      "T.S. Swaminatha Odayar v. Official Receiver (Supreme Court)",
    recommendedInstrument:
      "Family Settlement Deed with Explicit Owelty Equalization Clauses",
    checklist: [
      "Get approved valuation reports for all properties",
      "Record bank transfer details and due dates for cash payments",
      "Add terms that cancel the deal if owelty cash is not paid",
    ],
  },
  {
    id: "compromise-decree",
    label: "Pending Court Suit Exit",
    icon: "gavel",
    heading: "Resolving Active Civil Partition Suits Outside Court",
    challengeSummary:
      "Civil partition suits often run for 15 years in court. Families face huge legal fees and frozen assets.",
    legalMechanism:
      "Parties can sign mutual settlement terms. They file these under Order 23 Rule 3 of the Code of Civil Procedure (CPC). The judge passes a final compromise decree. This ends the case right away and court fees can be refunded.",
    statutoryPrecedent:
      "Order 23 Rule 3 CPC & Supreme Court Compromise Decree Precedents",
    recommendedInstrument:
      "Joint Compromise Application with Court-Approved Settlement Terms",
    checklist: [
      "Draft mutual terms signed by all plaintiffs and defendants",
      "File a joint plea under Order 23 Rule 3 CPC with advocates present",
      "Apply for refund of unused court fees under state rules",
    ],
  },
];

export default function FamilySettlementInteractive() {
  const [activeTab, setActiveTab] = useState<string>("ancestral-huf");

  // 3-Question Decision Matrix State
  const [timing, setTiming] = useState<"past" | "present">("past");
  const [needMutation, setNeedMutation] = useState<"immediate" | "internal">(
    "immediate"
  );
  const [allConsent, setAllConsent] = useState<"yes" | "no">("yes");

  const currentScenario =
    SETTLEMENT_SCENARIOS.find((s) => s.id === activeTab) ||
    SETTLEMENT_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationDetails = "";
  let recommendationStampDuty = "";
  const recommendationNextStep = "/contact";

  if (allConsent === "no") {
    recommendationTitle = "Advocate Mediation & Partition Counsel";
    recommendationDetails =
      "All heirs must agree before signing a settlement. If one heir disputes the terms, our advocates run mediation sessions to build consensus before going to court.";
    recommendationStampDuty = "Nominal legal notice or mediation fee";
  } else if (timing === "past" && needMutation === "internal") {
    recommendationTitle =
      "Memorandum of Past Oral Family Settlement (Kale Precedent)";
    recommendationDetails =
      "If the split was already agreed in the past, a written memo simply records that past event. Under the landmark Kale v. DDC (1976 SC) ruling, this memo does not need registration under Section 17.";
    recommendationStampDuty =
      "Nominal stamp paper (usually ₹100 to ₹500 depending on state)";
  } else {
    recommendationTitle = "Registered Family Settlement cum Partition Deed";
    recommendationDetails =
      "If you are dividing land today or need municipal tax transfer, you must register the deed with the Sub-Registrar. Our advocates draft clear property schedules and assist at the registry office.";
    recommendationStampDuty =
      "Concessional family partition stamp duty (usually 1% to 3%)";
  }

  return (
    <section className="w-full mb-16 sm:mb-24">
      <div className="max-w-3xl mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <Scale className="w-4 h-4" />
          <span>Interactive Settlement Navigator</span>
        </div>
        <h3 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
          Explore Family Settlement Strategies by Property Type
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Different family property disputes need distinct legal drafting.
          Select your scenario below to see the governing Indian laws, process
          steps, and execution tips:
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-8 pb-2 border-b border-[#172228]/10">
        {SETTLEMENT_SCENARIOS.map((scenario) => {
          const isActive = activeTab === scenario.id;
          return (
            <button
              key={scenario.id}
              onClick={() => setActiveTab(scenario.id)}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#172228] text-white shadow-sm"
                  : "bg-white text-[#49585F] hover:text-[#172228] border border-[#172228]/10 hover:border-[#172228]/30"
              }`}
            >
              {scenario.icon === "users" && <Users2 className="w-4 h-4" />}
              {scenario.icon === "building" && <Building2 className="w-4 h-4" />}
              {scenario.icon === "coins" && <Coins className="w-4 h-4" />}
              {scenario.icon === "gavel" && <Gavel className="w-4 h-4" />}
              <span>{scenario.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Panel */}
      <div className="bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#172228]/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] block mb-1">
              Governing Legal Framework
            </span>
            <h3 className="text-xl sm:text-2xl font-medium text-[#111827]">
              {currentScenario.heading}
            </h3>
          </div>
          <div className="inline-flex items-center gap-2 self-start lg:self-auto bg-[#FAF7F0] border border-[#172228]/10 px-4 py-2 rounded-full text-xs font-semibold text-[#172228]">
            <ShieldCheck className="w-4 h-4 text-[#047857]" />
            <span>{currentScenario.statutoryPrecedent}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-7 space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] mb-1.5">
                The Core Conflict
              </h4>
              <p className="text-[14.5px] sm:text-[15px] leading-[1.65] text-[#374151]">
                {currentScenario.challengeSummary}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] mb-1.5">
                Statutory Legal Mechanism
              </h4>
              <p className="text-[14.5px] sm:text-[15px] leading-[1.65] text-[#374151]">
                {currentScenario.legalMechanism}
              </p>
            </div>
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] block mb-1">
                Recommended Legal Instrument
              </span>
              <span className="inline-block text-sm font-semibold text-[#172228] bg-[#FAF7F0] px-3.5 py-1.5 rounded-lg border border-[#172228]/10">
                {currentScenario.recommendedInstrument}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#FAF7F0]/60 rounded-2xl p-5 sm:p-6 border border-[#172228]/10 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-[#172228] mb-3.5">
                Drafting &amp; Execution Checklist
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
                <span>Consult Senior Property Advocate</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 30-Second Diagnostic Decision Matrix */}
      <div className="bg-[#FAF7F0] border border-[#172228]/15 rounded-[28px] sm:rounded-[36px] p-7 sm:p-10 lg:p-12">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>30-Second Deed Decision Tool</span>
          </div>
          <h3 className="text-xl sm:text-2xl lg:text-[1.85rem] font-medium text-[#111827] mb-2 leading-tight">
            Should You Execute an Oral Memorandum or Registered Partition Deed?
          </h3>
          <p className="text-sm sm:text-[15px] leading-relaxed text-[#55636D]">
            Answer three quick questions to see which option fits your family assets
            under Indian registration and stamp duty laws:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Question 1 */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C65378] mb-2">
              Question 1 · Timing
            </span>
            <label className="text-sm font-semibold text-[#111827] mb-3 block">
              When did the family agree on the asset division?
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setTiming("past")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                  timing === "past"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/30"
                }`}
              >
                Already agreed orally in the past
              </button>
              <button
                type="button"
                onClick={() => setTiming("present")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                  timing === "present"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/30"
                }`}
              >
                Dividing rights today on this document
              </button>
            </div>
          </div>

          {/* Question 2 */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C65378] mb-2">
              Question 2 · Mutation Plan
            </span>
            <label className="text-sm font-semibold text-[#111827] mb-3 block">
              Do you need immediate municipal or bank mutation?
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setNeedMutation("immediate")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                  needMutation === "immediate"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/30"
                }`}
              >
                Yes, need municipal title &amp; tax split
              </button>
              <button
                type="button"
                onClick={() => setNeedMutation("internal")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                  needMutation === "internal"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/30"
                }`}
              >
                Internal family peace &amp; boundary clarity
              </button>
            </div>
          </div>

          {/* Question 3 */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C65378] mb-2">
              Question 3 · Consent
            </span>
            <label className="text-sm font-semibold text-[#111827] mb-3 block">
              Are all legal heirs &amp; sisters consenting?
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setAllConsent("yes")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                  allConsent === "yes"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/30"
                }`}
              >
                Yes, 100% of legal heirs agree to sign
              </button>
              <button
                type="button"
                onClick={() => setAllConsent("no")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                  allConsent === "no"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/30"
                }`}
              >
                One or more heirs are disputing or silent
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Recommendation Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#172228]/10 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#047857] mb-2">
              <CheckCircle2 className="w-4 h-4 text-[#047857]" />
              <span>Recommended Statutory Route</span>
            </div>
            <h4 className="text-lg sm:text-xl font-semibold text-[#111827] mb-2">
              {recommendationTitle}
            </h4>
            <p className="text-sm leading-[1.65] text-[#49585F] mb-3">
              {recommendationDetails}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#55636D]">
              <span>
                <strong>Stamp Duty Impact:</strong> {recommendationStampDuty}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <Link
              href={recommendationNextStep}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] px-6 py-3.5 transition-colors shadow-2xs"
            >
              <span>Draft With High Court Advocate</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tools/huf-coparcenary-share-partition-calculator"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FAF7F0] border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3 transition-colors"
            >
              <span>Calculate HUF Shares First</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
