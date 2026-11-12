"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  ShieldAlert,
  Building,
  Users2,
  Gavel,
} from "lucide-react";

interface ThreatScenario {
  id: string;
  label: string;
  icon: "alert" | "building" | "users" | "gavel";
  heading: string; // Strictly <= 70 chars for Screaming Frog
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedInstrument: string;
  urgencyLevel: string;
  checklist: string[];
}

const THREAT_SCENARIOS: ThreatScenario[] = [
  {
    id: "sibling-secret-sale",
    label: "Secret Sibling Sale",
    icon: "alert",
    heading: "Restraining Sibling from Selling Undivided Family Land",
    challengeSummary:
      "A brother or sister enters into secret talks with local builders or property buyers without taking consent from other co-heirs.",
    legalMechanism:
      "Order 39 Rules 1 and 2 of the Code of Civil Procedure (CPC) grants civil courts the power to issue an ad-interim temporary injunction restraining any alienation. Section 44 of the Transfer of Property Act prevents an outside buyer from claiming joint possession of a family dwelling house.",
    statutoryPrecedent:
      "Order 39 Rules 1-2 CPC & Dorab Cawasji Warden v. Coomi Sorab (1990 SC)",
    recommendedInstrument:
      "Civil Partition Suit with Urgent Application for Ad-Interim Injunction",
    urgencyLevel:
      "Critical (Action needed within 24 to 48 hours to prevent third-party rights)",
    checklist: [
      "Collect land revenue records, Jamabandi, or Khata extracts",
      "File partition suit along with an Order 39 stay application",
      "Serve certified court copy to local Sub-Registrar under Section 52 TPA",
      "Publish legal caution notice in local circulating newspapers",
    ],
  },
  {
    id: "coheir-illegal-construction",
    label: "Illegal Construction / Demolition",
    icon: "building",
    heading: "Halting Illegal Demolition or Construction on Joint Plot",
    challengeSummary:
      "A co-owner starts digging foundations, breaking walls, or constructing unauthorized floors to change the physical nature of joint land.",
    legalMechanism:
      "Order 39 Rule 1(a) of the CPC protects joint property against waste, damage, or alteration. A motion for an ex-parte status quo order freezes site status immediately, supported by the appointment of a court-appointed Local Commissioner under Order 26 Rule 9.",
    statutoryPrecedent:
      "Dalpat Kumar v. Prahlad Singh (1992 SC) & Gangubai Chaudhary (1983 SC)",
    recommendedInstrument:
      "Emergency Status Quo Motion with Local Commissioner Commission Request",
    urgencyLevel:
      "Immediate (Once concrete is poured or walls broken, recovery takes years)",
    checklist: [
      "Take geo-tagged and dated photographs of ongoing illegal work",
      "File police complaint for trespass and threat to public peace",
      "Seek ad-interim ex-parte status quo order before the Civil Judge",
      "Request court appointment of Local Commissioner for site inspection",
    ],
  },
  {
    id: "unauthorized-tenancy",
    label: "Unauthorized Tenancy / Lease",
    icon: "users",
    heading: "Preventing Co-Heir from Creating Third-Party Tenancies",
    challengeSummary:
      "One co-heir rents out joint family shops or flats to commercial tenants, collecting heavy cash advances while excluding other heirs.",
    legalMechanism:
      "One co-owner cannot lease out joint property without consent of co-sharers. Courts can issue an injunction restraining lease execution and order the appointment of a Receiver under Order 40 Rule 1 to deposit rents into the court registry.",
    statutoryPrecedent:
      "T. Lakshmipathi v. P. Nithyananda Reddy (2003 SC) & Order 40 CPC",
    recommendedInstrument:
      "Injunction Application & Appointment of Court Receiver for Rent Deposit",
    urgencyLevel:
      "High (Protects rental yields and blocks unauthorized third-party possession)",
    checklist: [
      "Gather evidence of tenant occupation and lease negotiations",
      "Issue formal legal notice to existing tenants regarding title dispute",
      "Move court under Order 39 to restrain execution of fresh lease deeds",
      "Apply for court receiver to attach and deposit monthly rent",
    ],
  },
  {
    id: "forged-settlement",
    label: "Forged Settlement / GPA",
    icon: "gavel",
    heading: "Challenging Fabricated Family Settlement Deeds or GPAs",
    challengeSummary:
      "A relative creates a forged unrecorded family settlement deed or outdated Power of Attorney to claim sole title at the registry.",
    legalMechanism:
      "Under Sections 34 and 38 of the Specific Relief Act, 1963, courts grant declaratory relief nullifying forged papers along with perpetual injunctions. Order 39 stay ensures the fraudulent paper cannot be used to execute sale deeds at the SRO.",
    statutoryPrecedent:
      "Suraj Lamp & Industries v. State of Haryana (2012 SC) & Sec 38 SRA",
    recommendedInstrument:
      "Suit for Cancellation of Void Instrument, Declaration & Injunction",
    urgencyLevel:
      "Critical (Must lodge caveat and objection before the Sub-Registrar)",
    checklist: [
      "Submit written objection letter to the local Sub-Registrar office",
      "File civil suit for declaration of forged document as null and void",
      "Apply for interim stay restraining alienation or mutation based on GPA",
      "Lodge caveat under Section 148A of CPC to preempt ex-parte orders",
    ],
  },
];

export default function InjunctionDiagnosticExplorer() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>("sibling-secret-sale");

  // Interactive Diagnostic Evaluator
  const [threatState, setThreatState] = useState<"imminent" | "executed" | "verbal">("imminent");
  const [propertyType, setPropertyType] = useState<"ancestral" | "dwelling" | "commercial">("ancestral");
  const [coHeirRelation, setCoHeirRelation] = useState<"brother" | "extended" | "stranger">("brother");

  const currentScenario =
    THREAT_SCENARIOS.find((s) => s.id === activeScenarioId) || THREAT_SCENARIOS[0];

  const getUrgencyAssessment = () => {
    if (threatState === "executed") {
      return {
        badge: "CRITICAL: SALE DEED EXECUTED / TOKEN TAKEN",
        action: "File urgent suit for cancellation and Section 52 Lis Pendens stay.",
        timeline: "Same-Day Filing Required",
        detail:
          "If a sale deed or agreement to sell has been registered, you must immediately seek a cancellation suit under Section 31 of Specific Relief Act and restrain the buyer from taking physical possession under Section 44 TPA.",
      };
    }
    if (threatState === "imminent") {
      return {
        badge: "HIGH RISK: ACTIVE TALKS / MEASUREMENTS ONGOING",
        action: "File Order 39 Rules 1-2 stay motion and notify Sub-Registrar.",
        timeline: "24 to 48 Hours Window",
        detail:
          "The co-heir is arranging buyers. An immediate ex-parte status quo application preserves the title. Simultaneously serve an official caveat and intimation letter to the local Sub-Registrar.",
      };
    }
    return {
      badge: "MODERATE RISK: VERBAL THREATS & INTENT DECLARED",
      action: "Issue formal legal cease notice and register Section 148A Caveat.",
      timeline: "3 to 5 Business Days",
      detail:
        "Preempt covert litigation. File a caveat in the District Court and High Court so no stay or order can be obtained behind your back.",
    };
  };

  const assessment = getUrgencyAssessment();

  return (
    <div className="w-full bg-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 border border-[#172228]/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
      {/* Header */}
      <div className="max-w-3xl mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <ShieldAlert className="w-4 h-4" />
          <span>Interactive Legal Diagnostic</span>
        </div>
        <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-3">
          Assess Your Co-Heir Alienation Dispute &amp; Remedy
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Select your dispute scenario to examine statutory stay procedures, landmark High Court rulings, and emergency filing checklists:
        </p>
      </div>

      {/* Scenario Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
        {THREAT_SCENARIOS.map((tab) => {
          const isActive = tab.id === activeScenarioId;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveScenarioId(tab.id)}
              className={`flex flex-col items-start text-left p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
                isActive
                  ? "bg-[#172228] text-white border-[#172228] shadow-md"
                  : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#C65378]/40"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                {tab.icon === "alert" && (
                  <ShieldAlert className="w-4 h-4 text-[#C65378]" />
                )}
                {tab.icon === "building" && (
                  <Building
                    className={`w-4 h-4 ${isActive ? "text-[#C65378]" : "text-[#172228]"}`}
                  />
                )}
                {tab.icon === "users" && (
                  <Users2
                    className={`w-4 h-4 ${isActive ? "text-[#C65378]" : "text-[#172228]"}`}
                  />
                )}
                {tab.icon === "gavel" && (
                  <Gavel
                    className={`w-4 h-4 ${isActive ? "text-[#C65378]" : "text-[#172228]"}`}
                  />
                )}
                <span className="text-xs font-bold tracking-tight">
                  {tab.label}
                </span>
              </div>
              <span
                className={`text-[11px] font-medium leading-tight line-clamp-1 ${
                  isActive ? "text-gray-300" : "text-[#55636D]"
                }`}
              >
                {tab.urgencyLevel.split(" ")[0]} Urgency
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      <div className="bg-[#FAF7F0] rounded-2xl p-6 sm:p-8 border border-[#172228]/10 mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.14em] text-[#C65378]">
              Statutory Mechanism &amp; Judicial Remedy
            </span>
            <h4 className="text-xl sm:text-2xl font-semibold text-[#111827] leading-snug">
              {currentScenario.heading}
            </h4>
            <p className="text-[14.5px] leading-[1.7] text-[#374151]">
              {currentScenario.challengeSummary}
            </p>
            <div className="p-4 rounded-xl bg-white border border-[#172228]/10 text-xs sm:text-[13px] leading-relaxed text-[#172228]">
              <strong className="text-[#C65378] font-bold">Legal Authority: </strong>
              {currentScenario.legalMechanism}
            </div>
            <div className="text-xs font-medium text-[#55636D]">
              <strong>Landmark Citation: </strong> {currentScenario.statutoryPrecedent}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-xl p-5 sm:p-6 border border-[#172228]/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#172228]/10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                Action Checklist
              </span>
              <span className="text-[11px] font-semibold text-[#047857] bg-[#047857]/10 px-2 py-0.5 rounded-full">
                SOP Protocol
              </span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#374151]">
              {currentScenario.checklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#047857] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3 transition-colors"
              >
                <span>Retain Injunction Advocate</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Threat Urgency Evaluator Tool */}
      <div className="border-t border-[#172228]/10 pt-8">
        <div className="max-w-2xl mb-6">
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-1">
            Emergency Triage Tool
          </div>
          <h4 className="text-lg sm:text-xl font-semibold text-[#111827]">
            Calculate Injunction Filing Urgency &amp; Motion Type
          </h4>
          <p className="text-xs sm:text-sm text-[#55636D] mt-1">
            Choose your current stage to find the fastest civil court procedure:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#55636D] mb-2">
              1. Current Threat Status
            </label>
            <select
              value={threatState}
              onChange={(e) =>
                setThreatState(e.target.value as "imminent" | "executed" | "verbal")
              }
              className="w-full text-xs sm:text-sm p-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/15 text-[#172228] focus:outline-none focus:border-[#C65378]"
            >
              <option value="imminent">Active Negotiations / Buyer Visiting</option>
              <option value="executed">Agreement to Sell / Registry Done</option>
              <option value="verbal">Verbal Threats / Family Discord</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#55636D] mb-2">
              2. Property Nature
            </label>
            <select
              value={propertyType}
              onChange={(e) =>
                setPropertyType(
                  e.target.value as "ancestral" | "dwelling" | "commercial"
                )
              }
              className="w-full text-xs sm:text-sm p-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/15 text-[#172228] focus:outline-none focus:border-[#C65378]"
            >
              <option value="ancestral">Undivided Agricultural / Plot</option>
              <option value="dwelling">Joint Family Residential House</option>
              <option value="commercial">Commercial Building / Shops</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#55636D] mb-2">
              3. Relational Position
            </label>
            <select
              value={coHeirRelation}
              onChange={(e) =>
                setCoHeirRelation(
                  e.target.value as "brother" | "extended" | "stranger"
                )
              }
              className="w-full text-xs sm:text-sm p-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/15 text-[#172228] focus:outline-none focus:border-[#C65378]"
            >
              <option value="brother">Brother / Sister (Equal Class I Heir)</option>
              <option value="extended">Cousin / Uncle (Joint Coparcener)</option>
              <option value="stranger">Third-Party Buyer Claiming Share</option>
            </select>
          </div>
        </div>

        {/* Dynamic Evaluation Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#172228] text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-block text-[11px] font-bold tracking-wider uppercase text-[#C65378] bg-[#C65378]/20 px-2.5 py-0.5 rounded-full">
              {assessment.badge}
            </div>
            <div className="text-base sm:text-lg font-semibold text-white">
              {assessment.action}
            </div>
            <p className="text-xs sm:text-[13px] text-gray-300 leading-relaxed">
              {assessment.detail}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <span className="text-xs font-semibold text-center text-[#34D399] bg-[#34D399]/15 px-3 py-1.5 rounded-lg border border-[#34D399]/20">
              {assessment.timeline}
            </span>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-wider transition-colors text-center"
            >
              <span>Urgent Legal Help</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}