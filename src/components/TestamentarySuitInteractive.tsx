"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Scale,
  ShieldAlert,
  FileSearch,
  Users2,
  FileCheck,
  Building2,
  AlertTriangle,
  Gavel,
} from "lucide-react";

interface DefenseScenario {
  id: string;
  label: string;
  icon: "search" | "alert" | "users" | "gavel";
  heading: string;
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedStrategy: string;
  evidentiaryStandard: string;
  checklist: string[];
}

const DEFENSE_SCENARIOS: DefenseScenario[] = [
  {
    id: "forgery-cfsl-audit",
    label: "Forgery & CFSL Audit",
    icon: "search",
    heading: "CFSL Forensic Handwriting & Signature Audit",
    challengeSummary:
      "A surprise Will suddenly surfaces with shaky signatures, unnatural font formatting, or altered pages disinheriting natural legal heirs in high-value estates.",
    legalMechanism:
      "Under Sections 61 and 73 of the Bharatiya Sakshya Adhiniyam 2023 (BSA), the court compares disputed signatures with admitted contemporaneous standards. We move an application under Order 26 Rule 10A CPC and Section 73 BSA for scientific inspection by Central Forensic Science Laboratory (CFSL) or accredited handwriting examiners.",
    statutoryPrecedent:
      "BSA 2023 ss. 61 & 73 read with CPC Order 26 Rule 10A (Forensic Investigation)",
    recommendedStrategy:
      "Independent CFSL Laboratory Reference + High-Resolution Ink Spectrometry",
    evidentiaryStandard:
      "Microscopic tremor analysis, pen-lift identification, terminal stroke bluntness, and paper chemical aging tests.",
    checklist: [
      "Procure 5 to 10 admitted contemporaneous signatures from bank KYC or registered deeds",
      "File interim application for original Will custody in High Court vault",
      "Engage senior forensic document expert for preliminary microscopic report",
      "Formulate precise cross-examination on line quality and hesitation marks",
    ],
  },
  {
    id: "suspicious-circumstances",
    label: "Suspicious Circumstances",
    icon: "alert",
    heading: "Removing or Proving Suspicious Circumstances",
    challengeSummary:
      "A single child or distant relative produces a Will executed while the testator was in the ICU, suffering from dementia, or entirely isolated from other siblings.",
    legalMechanism:
      "Under landmark Supreme Court jurisprudence starting from H. Venkatachala Iyengar v. B.N. Thimmajamma and Kavita Kanwar v. Pamela Mehta, the propounder carries the legal burden of removing all suspicious circumstances. If the propounder took active part in drafting or executing the Will, the court refuses probate.",
    statutoryPrecedent:
      "H. Venkatachala Iyengar (AIR 1959 SC 443) & Kavita Kanwar (2021 11 SCC 209)",
    recommendedStrategy:
      "Medical Record Subpoena + Disinheritance Motivation Reconstruction",
    evidentiaryStandard:
      "Subpoena hospital ICU nursing sheets, treating doctor depositions, and cognitive mental fitness evaluation records.",
    checklist: [
      "Reconstruct testator medical timeline around date of execution",
      "Summon hospital attending physicians to prove testamentary incapacity",
      "Demonstrate active involvement and beneficiary dominance during drafting",
      "Establish lack of reasonable cause for unnatural disinheritance of natural heirs",
    ],
  },
  {
    id: "witness-cross-examination",
    label: "Witness Cross-Exam",
    icon: "users",
    heading: "Cross-Examination of Attesting Witnesses",
    challengeSummary:
      "Attesting witnesses are often employees, drivers, or close business associates of the propounder who sign without actually witnessing the testator signing freely.",
    legalMechanism:
      "Section 63 of the Indian Succession Act, 1925 requires that two attesting witnesses each saw the testator sign or received personal acknowledgment. Under Sections 67 and 68 of BSA 2023, counsel cross-examines the attesting witness to expose fatal gaps in simultaneous presence, location, and voluntariness.",
    statutoryPrecedent:
      "Indian Succession Act, 1925 s. 63 & BSA 2023 ss. 67-68 Witness Scrutiny",
    recommendedStrategy:
      "Point-by-Point Simultaneous Presence & Timeline Interrogation",
    evidentiaryStandard:
      "Establish witness unfamiliarity with testator habits, contradiction in execution time, or interested beneficiary ties.",
    checklist: [
      "Scrutinize exact physical room layout and witness seating positions",
      "Identify inconsistencies in pen color, ink flow, and signing sequence",
      "Expose financial dependency or personal bias toward the propounder",
      "Leverage prior contradictory statements under BSA Section 145 cross-examination",
    ],
  },
  {
    id: "caveat-estate-injunction",
    label: "Caveats & Injunctions",
    icon: "gavel",
    heading: "Caveat Lodging & Temporary Estate Injunction",
    challengeSummary:
      "Before probate is granted, an aggressive propounder might attempt to sell real estate, evict tenants, or transfer company shares to third parties.",
    legalMechanism:
      "Lodging a caveat under Section 284 of the Indian Succession Act, 1925 stops ex-parte probate grants. Under Section 269 ISA and Order 39 Rules 1 & 2 CPC, we secure urgent interim injunctions restraining property sale or seek an Administrator Pendente Lite under Section 247 ISA.",
    statutoryPrecedent:
      "Indian Succession Act ss. 247, 269 & 284 read with CPC Order 39 Rules 1-2",
    recommendedStrategy:
      "Immediate High Court Caveat + Status Quo Injunction Motion",
    evidentiaryStandard:
      "Demonstrate prima facie caveatable interest, irreparable injury risk, and balance of convenience.",
    checklist: [
      "File caveat in competent High Court testamentary department within 8 days of notice",
      "Submit affidavit in support of caveat setting out specific grounds of contest",
      "Move ex-parte interim stay against alienation of immovable estate assets",
      "Apply for Administrator Pendente Lite to safeguard rental and corporate yields",
    ],
  },
];

export default function TestamentarySuitInteractive() {
  const [activeTab, setActiveTab] = useState(DEFENSE_SCENARIOS[0].id);

  const currentScenario =
    DEFENSE_SCENARIOS.find((s) => s.id === activeTab) || DEFENSE_SCENARIOS[0];

  const renderIcon = (type: DefenseScenario["icon"]) => {
    switch (type) {
      case "search":
        return <FileSearch className="w-4 h-4 text-[#C65378]" />;
      case "alert":
        return <ShieldAlert className="w-4 h-4 text-[#C65378]" />;
      case "users":
        return <Users2 className="w-4 h-4 text-[#C65378]" />;
      case "gavel":
        return <Gavel className="w-4 h-4 text-[#C65378]" />;
      default:
        return <Scale className="w-4 h-4 text-[#C65378]" />;
    }
  };

  return (
    <div className="w-full rounded-[28px] sm:rounded-[36px] bg-white border border-[#172228]/10 p-6 sm:p-9 lg:p-11 shadow-[0_4px_28px_rgba(0,0,0,0.03)]">
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <Scale className="w-4 h-4" />
          <span>Interactive Trial Strategy Explorer</span>
        </div>
        <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
          Select Your Contested Will Litigation Defense Strategy
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          High Court testamentary suits turn on scientific evidence, witness credibility, and strict procedural caveats. Click through our four trial defense pillars to inspect our courtroom strategy:
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap gap-2.5 sm:gap-3 pb-6 mb-8 border-b border-[#172228]/10">
        {DEFENSE_SCENARIOS.map((scenario) => {
          const isSelected = scenario.id === activeTab;
          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() => setActiveTab(scenario.id)}
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#172228] text-white shadow-sm"
                  : "bg-[#FAF7F0] text-[#49585F] hover:bg-[#172228]/5 hover:text-[#111827] border border-[#172228]/10"
              }`}
            >
              {renderIcon(scenario.icon)}
              <span>{scenario.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Tab Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-2">
              Defense Pillar Overview
            </span>
            <h4 className="text-xl sm:text-2xl font-semibold text-[#111827] mb-3 leading-snug">
              {currentScenario.heading}
            </h4>
            <p className="text-[14.5px] sm:text-[15px] leading-[1.7] text-[#49585F] mb-4">
              {currentScenario.challengeSummary}
            </p>
            <div className="bg-[#FAF7F0] p-4 sm:p-5 rounded-2xl border border-[#172228]/10">
              <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#111827] mb-1.5">
                Statutory Trial Mechanism
              </span>
              <p className="text-xs sm:text-[13.5px] leading-[1.65] text-[#374151]">
                {currentScenario.legalMechanism}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs">
              <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#C65378] mb-1">
                Statutory Authority
              </span>
              <span className="text-xs sm:text-[13px] font-semibold text-[#111827] leading-relaxed">
                {currentScenario.statutoryPrecedent}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-2xs">
              <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#047857] mb-1">
                Recommended Defense
              </span>
              <span className="text-xs sm:text-[13px] font-semibold text-[#111827] leading-relaxed">
                {currentScenario.recommendedStrategy}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Action Checklist */}
        <div className="lg:col-span-5 bg-[#F4EFE6] rounded-2xl p-6 sm:p-7 border border-[#172228]/10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#111827] mb-4">
            <FileCheck className="w-4 h-4 text-[#C65378]" />
            <span>Litigation Defense Checklist</span>
          </div>

          <ul className="space-y-3 text-xs sm:text-[13.5px] leading-[1.6] text-[#374151] mb-6">
            {currentScenario.checklist.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-[#172228]/10 flex flex-col gap-3">
            <Link
              href="/contact"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs sm:text-[13px] font-semibold py-3 px-5 transition-all shadow-xs"
            >
              <span>Consult Litigation Advocates</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/templates/caveat-petition-high-court-probate-format"
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-white hover:bg-[#FAF7F0] text-[#172228] border border-[#172228]/15 text-xs font-semibold py-2.5 px-4 transition-all"
            >
              <span>Inspect Caveat Petition Format</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
