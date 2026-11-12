"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Scale,
  ShieldCheck,
  Building2,
  Landmark,
  FileCheck,
  MapPin,
  HelpCircle,
} from "lucide-react";

interface SuccessionScenario {
  id: string;
  label: string;
  icon: "shield" | "scale" | "landmark" | "file";
  heading: string; // Strictly <= 70 chars
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedInstrument: string;
  operationalPowers: string;
  checklist: string[];
}

const TRIBAL_SCENARIOS: SuccessionScenario[] = [
  {
    id: "patrilineal-daughter-exclusion",
    label: "Daughter Inheritance & Custom",
    icon: "shield",
    heading: "Tribal Daughter Inheritance & Customary Rights Advisory",
    challengeSummary:
      "Under uncodified tribal custom, ancestral raiyati land devolves solely to male agnates. Daughters and widows face total disinheritance upon the father's death.",
    legalMechanism:
      "Section 2(2) of the Hindu Succession Act excludes Scheduled Tribes. However, the Supreme Court in Madhu Kishwar (1996) granted life estate rights to tribal women under Article 21. A tribal parent can also execute a registered Will under the Indian Succession Act, 1925 to bequeath self-acquired land directly to daughters.",
    statutoryPrecedent:
      "Madhu Kishwar v. State of Bihar (1996 SC) & Indian Succession Act s. 59",
    recommendedInstrument:
      "Registered Testamentary Will & Life Interest Deed for Female Heirs",
    operationalPowers:
      "Guarantees lifelong cultivation, mutation in revenue records, and full protection from male agnate eviction.",
    checklist: [
      "Genealogical pedigree tree certified by Gram Pradhan or Manki Munda",
      "Khatian and Panji-II revenue receipts proving clear raiyati tenancy",
      "Registered Will executed before Sub-Registrar with two independent witnesses",
      "Life estate declaration protecting daughter's cultivation and revenue possession",
    ],
  },
  {
    id: "cnt-spt-land-protection",
    label: "CNT & SPT Act Protection",
    icon: "scale",
    heading: "CNT Act Section 46 & SPT Act Raiyati Land Transfer Defense",
    challengeSummary:
      "Tribal landowners face illegal encroachments, fraudulent deeds, or unauthorized non-tribal purchasers attempting mutation of Fifth Schedule ancestral holdings.",
    legalMechanism:
      "Section 46 of the Chota Nagpur Tenancy Act, 1908 and Section 20 of the Santhal Parganas Tenancy Act, 1949 strictly bar transfer of tribal raiyati land to non-tribals. Under Section 71A of the CNT Act, the Deputy Commissioner holds summary jurisdiction to evict unauthorized occupants and restore possession to rightful tribal heirs.",
    statutoryPrecedent:
      "Chota Nagpur Tenancy Act s. 46 & s. 71A (SAR Court Jurisdiction)",
    recommendedInstrument:
      "Section 71A Restoration Petition & SDO Revenue Injunction",
    operationalPowers:
      "Evicts unauthorized occupants, cancels benami registry entries, and restores physical possession through police aid.",
    checklist: [
      "Original CS / RS Khatian extract proving ancestral tribal title",
      "Proof of continuous possession and rent receipts (Lagaan Rashid)",
      "SAR petition before Special Regulation Officer or Sub-Divisional Officer",
      "Local inquiry panchnama and demarcation report from Circle Inspector",
    ],
  },
  {
    id: "fifth-schedule-states",
    label: "Fifth Schedule State Laws",
    icon: "landmark",
    heading: "Fifth Schedule Tribal Land Transfer Restrictions in India",
    challengeSummary:
      "Non-tribal relatives or corporate purchasers attempt transfers of agricultural land in Scheduled Areas of MP, Chhattisgarh, Odisha, or Maharashtra.",
    legalMechanism:
      "Paragraph 5(2) of the Fifth Schedule to the Constitution empowers Governors to prohibit land alienation. State statutes such as Section 165(6) of the MP Land Revenue Code and Section 36A of the Maharashtra Land Revenue Code make transfers to non-tribals void ab initio without prior Collector sanction.",
    statutoryPrecedent:
      "Constitution Fifth Schedule & Samatha v. State of AP (1997 SC)",
    recommendedInstrument:
      "Statutory Title Due Diligence & Collector Transfer Audit Petition",
    operationalPowers:
      "Invalidates illegal sale agreements, voids benami transactions, and secures revenue record immunity for heirs.",
    checklist: [
      "District gazette verification confirming village Fifth Schedule status",
      "Bhumiswami / occupancy tenant certificate from Tehsil office",
      "Audit of prior sale or mortgage deeds for Section 165(6) violations",
      "Formal objection filed before District Collector against illegal mutation",
    ],
  },
  {
    id: "revenue-court-mutation",
    label: "Revenue Court Mutation",
    icon: "file",
    heading: "Scheduled Tribe Dakhil Kharij & Name Mutation in Raiyati Records",
    challengeSummary:
      "Following the demise of a tribal pattadar, Circle Officers or Tehsildars delay succession mutation due to conflicting customary claims by distant clan members.",
    legalMechanism:
      "Revenue courts must follow settled customary succession verified by local Gram Sabha customs and registered testamentary bequests. Our senior revenue counsel files formal succession mutation applications before the Circle Officer / Tehsildar, addressing agnatic caveats and obtaining updated Jamabandi entries.",
    statutoryPrecedent:
      "State Tenancy Rules & Bihar/Jharkhand Tenant Manual Rule 12",
    recommendedInstrument:
      "Contested Raiyati Mutation Petition & Circle Officer Representation",
    operationalPowers:
      "Updates government revenue records, issues computerized Khatiyan slips, and enables government crop compensation.",
    checklist: [
      "Death certificate of deceased tribal landholder",
      "Raiyati succession affidavit with genealogical pedigree tree",
      "Public notice compliance under state tenancy rules (15-day notice)",
      "Appearance before Circle Officer with village head testimony",
    ],
  },
];

export default function TribalLandSuccessionInteractive() {
  const [activeTab, setActiveTab] = useState(TRIBAL_SCENARIOS[0].id);

  const current =
    TRIBAL_SCENARIOS.find((s) => s.id === activeTab) || TRIBAL_SCENARIOS[0];

  return (
    <div className="w-full bg-white rounded-[28px] sm:rounded-[36px] border border-[#172228]/10 p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <Scale className="w-4 h-4" />
          <span>Interactive Tribal Land Diagnostic</span>
        </div>
        <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-3">
          Scheduled Tribe Land Succession &amp; Protection Navigator
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Select your family scenario below to examine statutory protections under the Fifth Schedule, CNT Act, SPT Act, and landmark Supreme Court rulings.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 p-1.5 bg-[#FAF7F0] rounded-2xl mb-8 border border-[#172228]/5">
        {TRIBAL_SCENARIOS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-2 py-3 px-3.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center ${
                isActive
                  ? "bg-[#172228] text-white shadow-sm"
                  : "text-[#55636D] hover:text-[#111827] hover:bg-white/60"
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Scenario Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-[#C65378] mb-2">
              Statutory Protection Mechanism
            </span>
            <h4 className="text-xl sm:text-2xl font-medium text-[#111827] leading-snug mb-3">
              {current.heading}
            </h4>
            <p className="text-[15px] leading-[1.7] text-[#374151] mb-4">
              {current.challengeSummary}
            </p>
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 text-[14px] leading-[1.68] text-[#172228]">
              <strong className="text-[#C65378]">Legal Solution: </strong>
              {current.legalMechanism}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white border border-[#172228]/10">
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D] mb-1">
                Governing Authority
              </div>
              <div className="text-xs font-semibold text-[#111827]">
                {current.statutoryPrecedent}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#172228]/10">
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D] mb-1">
                Recommended Action
              </div>
              <div className="text-xs font-semibold text-[#047857]">
                {current.recommendedInstrument}
              </div>
            </div>
          </div>
        </div>

        {/* Right Checklist Box */}
        <div className="lg:col-span-5 bg-[#FAF7F0] rounded-2xl p-6 sm:p-7 border border-[#172228]/10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#111827] mb-4">
            <FileCheck className="w-4 h-4 text-[#C65378]" />
            <span>Advocate Verification Checklist</span>
          </div>

          <ul className="space-y-3 mb-6 text-xs sm:text-[13px] leading-[1.6] text-[#374151]">
            {current.checklist.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-[#172228]/10 flex flex-col gap-2.5">
            <Link
              href="/contact"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.14em] px-5 py-3.5 transition-all text-center"
            >
              <span>Consult Tribal Law Advocate</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/templates/jharkhand-raiyati-land-succession-affidavit-format"
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-white hover:bg-gray-50 border border-[#172228]/15 text-[#172228] text-xs font-semibold px-4 py-2.5 transition-all text-center"
            >
              <span>Download Raiyati Succession Affidavit</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
