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

interface NriCanadaScenario {
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

const NRI_CANADA_SCENARIOS: NriCanadaScenario[] = [
  {
    id: "brampton-surrey-farmland",
    label: "Brampton/Surrey: Farmland",
    icon: "globe",
    heading: "Punjab & Haryana Farmland: Intkal Mutation & Jamabandi",
    challengeSummary:
      "Families in Brampton, Mississauga, or Surrey hold ancestral farmland in Jalandhar, Ludhiana, Moga, or Karnal. Relatives in India often attempt hostile possession or contest oral arrangements once elders pass away in Canada.",
    legalMechanism:
      "Mutation of inheritance (Intkal Virasat) under Sections 34 to 37 of the Punjab Land Revenue Act, 1887 on Web-HALRIS or PLRS requires clear testamentary proof. Under FEMA Regulation 3(1)(b), Canadian OCIs can inherit farmland. A separate Indian Will prevents land partition battles.",
    statutoryPrecedent:
      "Punjab Land Revenue Act 1887 ss. 34-37 & FEMA Reg 3(1)(b)",
    recommendedInstrument:
      "Standalone Indian Will with Jamabandi/Fard Record Protocol",
    checklist: [
      "Verify Jamabandi, Khewat, and Khasra survey numbers with Halqa Patwari",
      "Execute plain-paper Will before two adult non-beneficiary witnesses in Canada",
      "Appoint an Indian Power of Attorney agent for Revenue Tehsil mutation",
    ],
  },
  {
    id: "ontario-dual-will",
    label: "Ontario: Dual-Will Plan",
    icon: "landmark",
    heading: "Ontario Estates Act: Dual Wills to Avoid 1.5% Probate Tax",
    challengeSummary:
      "Estate Administration Tax (EAT) in Ontario levies approximately 1.5% on estates exceeding $50,000. If an Ontario resident includes Indian assets in their general Ontario Will, the estate pays 1.5% probate tax to Ontario on multi-crore Indian property.",
    legalMechanism:
      "Canadian common law under Granovsky Estate v. Ontario (1998) approves multiple Wills. By executing a Primary Will for Ontario assets and a Secondary Indian Will for Indian assets, Indian property is excluded from Ontario probate calculation, saving tens of thousands of CAD in provincial tax while eliminating Indian court resealing delays.",
    statutoryPrecedent:
      "Ontario Estates Act & Granovsky Estate v. Ontario (1998)",
    recommendedInstrument:
      "Dual-Will Architecture with Cross-Border Ring-Fencing",
    checklist: [
      "Explicitly carve out Indian assets from Ontario Primary Will",
      "Insert strict Non-Revocation clause in Indian Will",
      "Coordinate with Canadian estate lawyer to prevent cross-revocation",
    ],
  },
  {
    id: "cra-deemed-disposition",
    label: "CRA: Form T1135 & Death Tax",
    icon: "coins",
    heading: "CRA Section 70(5) Deemed Disposition & Form T1135 Filing",
    challengeSummary:
      "Under Section 70(5) of the Canadian Income Tax Act, Canadian tax residents face deemed capital gains on death on their worldwide holdings, including Indian urban apartments and commercial plots in Delhi NCR or Ahmedabad.",
    legalMechanism:
      "A carefully structured Indian Will enables spousal rollover under Canadian Income Tax Act Section 70(6) where property passes to a Canadian resident spouse, deferring deemed capital gains. It also supports foreign tax credits (FTC) under Section 126 and the India-Canada DTAA, avoiding double taxation.",
    statutoryPrecedent:
      "Canadian Income Tax Act ss. 70(5), 70(6) & India-Canada DTAA",
    recommendedInstrument:
      "Tax-Synchronized Indian Will with Spousal Succession Clause",
    checklist: [
      "Maintain historical cost-base records for CRA Form T1135 foreign reporting",
      "Structure spousal rollover clauses to defer Canadian capital gains",
      "Obtain Form 15CA and 15CB certifications for post-sale asset repatriation",
    ],
  },
  {
    id: "hague-apostille-bc",
    label: "BC/Alberta: Apostille 2024",
    icon: "building",
    heading: "Canada Hague Apostille Convention & Plain-Paper Execution",
    challengeSummary:
      "Indo-Canadians in Vancouver, Calgary, or Edmonton often assume they must travel to India or book appointments with the Indian Consulate in Vancouver or Ottawa to execute a legally valid Indian Will.",
    legalMechanism:
      "Since Canada joined the Hague Apostille Convention in January 2024, documents notarized in Canada only need a provincial or Global Affairs Canada apostille. No consular visit needed. Furthermore, under the Indian Stamp Act, 1899, Wills require zero stamp paper in India.",
    statutoryPrecedent:
      "Hague Apostille Convention 1961 (Canada 2024) & ISA 1925 s. 63",
    recommendedInstrument:
      "Canadian Notarized & Apostilled Indian Will",
    checklist: [
      "Print Will on plain A4 paper in British Columbia, Alberta, or Ontario",
      "Sign before two adult independent witnesses who are not beneficiaries",
      "Obtain provincial Hague Apostille certificate from competent provincial authority",
      "Deposit sealed registered copy with legal counsel in India",
    ],
  },
];

export default function NriCanadaWillInteractive() {
  const [selectedId, setSelectedId] = useState<string>("brampton-surrey-farmland");

  const currentScenario =
    NRI_CANADA_SCENARIOS.find((s) => s.id === selectedId) ||
    NRI_CANADA_SCENARIOS[0];

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
          <span>Interactive Cross-Border Diagnostic</span>
        </div>
        <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-3">
          Select Your Canadian NRI Estate Scenario
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Explore tailored legal blueprints for Punjab farmlands, Ontario dual-will tax optimization, CRA deemed disposition, and Hague apostille execution:
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
        {NRI_CANADA_SCENARIOS.map((s) => {
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
                The Practical Challenge in Canada &amp; India
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
            Need tailored drafting for Canadian provincial and Indian revenue rules?
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
