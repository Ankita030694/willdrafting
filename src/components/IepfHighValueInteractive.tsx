"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Scale,
  ShieldCheck,
  Building2,
  Coins,
  FileSearch,
  Gavel,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

interface IepfScenario {
  id: string;
  label: string;
  icon: "coins" | "scale" | "gavel" | "filesearch";
  heading: string; // Strictly <= 70 chars for Screaming Frog
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedPathway: string;
  checklist: string[];
}

const IEPF_SCENARIOS: IepfScenario[] = [
  {
    id: "deceased-physical-shares",
    label: "Deceased Parent Shares",
    icon: "coins",
    heading: "Deceased Parent Physical Shares Transferred to IEPF",
    challengeSummary:
      "Old paper share certificates found in family lockers. Dividends remained uncashed for seven consecutive years, causing the company to transfer shares to the IEPF Authority under Section 124(6).",
    legalMechanism:
      "Legal heirs must first submit transmission documents (Forms ISR-1, ISR-2, ISR-4) to the company RTA to obtain an Entitlement Letter. Then file MCA Form IEPF-5 online and deliver the physical verification dossier to the company Nodal Officer.",
    statutoryPrecedent:
      "Companies Act 2013 s. 124(6) & IEPF Rules 2016 Rule 7",
    recommendedPathway:
      "RTA Transmission + MCA Form IEPF-5 Verification Protocol",
    checklist: [
      "Original physical share certificates or Form ISR-4 Letter of Confirmation",
      "Court Succession Certificate or Probate if share value exceeds ₹5 Lakh",
      "Client Master List (CML) of claimant active demat account",
      "Self-attested Aadhaar, PAN card, and advance stamped receipt",
    ],
  },
  {
    id: "high-value-succession",
    label: "High-Value (> ₹5 Lakh)",
    icon: "scale",
    heading: "High-Value Securities Transmission Exceeding ₹5 Lakh",
    challengeSummary:
      "Shares in blue-chip companies (Reliance, TCS, HDFC, L&T) have appreciated to ₹20 Lakh to ₹5 Crore. SEBI and RTAs strictly refuse transmission without court succession orders.",
    legalMechanism:
      "SEBI Master Circular (2022) mandates a court Succession Certificate under Section 372 of the Indian Succession Act, 1925, or Letters of Administration for physical holdings exceeding ₹5 Lakh per listed company.",
    statutoryPrecedent:
      "Indian Succession Act 1925 s. 372 & SEBI LODR Regulation 40",
    recommendedPathway:
      "Civil Court Succession Petition + RTA High-Value Alignment",
    checklist: [
      "File petition under Section 372 of the Indian Succession Act, 1925",
      "Schedule of securities listing exact folio numbers and valuation",
      "No Objection Certificates (NOC) and Affidavits from Class-I legal co-heirs",
      "Newspaper citation and certified copy of final Succession Certificate",
    ],
  },
  {
    id: "iepf-rejection-nclt",
    label: "NCLT Appeal / Rejection",
    icon: "gavel",
    heading: "NCLT Petition Against IEPF Rejection & Inaction",
    challengeSummary:
      "Company Nodal Officer fails to submit e-verification report within 30 days, or IEPF Authority issues arbitrary rejection marks claiming discrepancy in transmission.",
    legalMechanism:
      "Aggrieved claimants can invoke Sections 58 and 59 of the Companies Act, 2013 before the National Company Law Tribunal (NCLT) for rectification of the register of members and an order compelling the company and IEPF Authority to process the refund.",
    statutoryPrecedent:
      "Companies Act 2013 ss. 58-59 & Rule 7(3) IEPF Rules 2016",
    recommendedPathway:
      "NCLT Section 58/59 Company Petition + High Court Writ Remedy",
    checklist: [
      "Form IEPF-5 MCA acknowledgment receipt and SRN filing date",
      "Proof of delivery of verification documents to the company Nodal Officer",
      "Statutory demand notice issued under Section 125 to the compliance officer",
      "Company Petition under Sections 58/59 before the jurisdictional NCLT Bench",
    ],
  },
  {
    id: "mismatch-duplicate-loss",
    label: "Lost Share Certificates",
    icon: "filesearch",
    heading: "Lost Physical Certificates & Severe Name Mismatch",
    challengeSummary:
      "Original share certificates are lost, mutilated, or destroyed, or the deceased shareholder name on certificates does not match PAN or Aadhaar records.",
    legalMechanism:
      "SEBI Form ISR-4 protocol for duplicate shares. Requires executing an Indemnity Bond (Form B) on non-judicial stamp paper, Affidavit (Form A), Gazette publication for name change, and signature attestation via Form ISR-2 by the bank manager.",
    statutoryPrecedent:
      "SEBI Master Circular 2022 & SEBI LODR Regulation 39(2)",
    recommendedPathway:
      "SEBI Form ISR-4 Duplicate SOP + Gazette Name Rectification",
    checklist: [
      "Form ISR-4 request for issuance of Letter of Confirmation",
      "Indemnity Bond on state non-judicial stamp paper with surety",
      "Form ISR-2 signature attestation signed and sealed by the banker",
      "FIR or Police Non-Cognizable Report (NCR) for lost share certificates",
    ],
  },
];

export default function IepfHighValueInteractive() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(
    "deceased-physical-shares"
  );

  // Diagnostic tool state
  const [holdingValue, setHoldingValue] = useState<"under_5L" | "5L_to_25L" | "above_25L">("above_25L");
  const [certStatus, setCertStatus] = useState<"available" | "lost">("available");
  const [heirStatus, setHeirStatus] = useState<"single" | "multiple">("multiple");

  const currentScenario =
    IEPF_SCENARIOS.find((s) => s.id === activeScenarioId) || IEPF_SCENARIOS[0];

  const getDiagnosticResult = () => {
    if (holdingValue === "under_5L") {
      return {
        courtRequired: "No Court Certificate Required (Simplified RTA Limits)",
        statutoryPath: "SEBI Form ISR-1 to ISR-4 + MCA V3 Form IEPF-5 Direct Filing",
        timeline: "60 to 90 business days from physical document receipt by RTA",
        action: "Prepare simplified indemnity bond and Class-I legal heir NOC affidavits.",
      };
    }
    if (holdingValue === "5L_to_25L") {
      return {
        courtRequired: "Succession Certificate Mandatory (SEBI ₹5 Lakh Physical Cap)",
        statutoryPath: "Civil Court Succession Petition (Sec 372) + Company Entitlement Letter",
        timeline: "4 to 7 months (court decree + IEPF Nodal verification)",
        action: "File joint petition with certified market valuation before District Court.",
      };
    }
    return {
      courtRequired: "High Court Succession / Letters of Administration + NCLT Protection",
      statutoryPath: "High Court Testamentary Petition + Form IEPF-5 + NCLT Caveat",
      timeline: "6 to 9 months for full transmission, verification, and demat credit",
      action: "Retain High Court advocate to secure Succession Certificate and manage RTA.",
    };
  };

  const diag = getDiagnosticResult();

  return (
    <div className="w-full space-y-12">
      {/* Scenario Selector Card */}
      <div className="bg-white rounded-[28px] sm:rounded-[36px] border border-[#172228]/10 p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2">
            <Scale className="w-4 h-4" />
            <span>Interactive IEPF Recovery Explorer</span>
          </div>
          {/* H2 <= 70 chars */}
          <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
            Interactive IEPF-5 Claim &amp; Demat Diagnostic Tool
          </h3>
          <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
            Select your share recovery scenario to inspect statutory procedures, documentation requirements, and court precedents under the Companies Act, 2013:
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-1.5 bg-[#FAF7F0] rounded-2xl border border-[#172228]/10 mb-8">
          {IEPF_SCENARIOS.map((scenario) => {
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
                {scenario.icon === "coins" && <Coins className="w-4 h-4" />}
                {scenario.icon === "scale" && <Scale className="w-4 h-4" />}
                {scenario.icon === "gavel" && <Gavel className="w-4 h-4" />}
                {scenario.icon === "filesearch" && <FileSearch className="w-4 h-4" />}
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
                  The Legal Challenge
                </h4>
                <p className="text-[14.5px] sm:text-[15px] leading-[1.65] text-[#374151]">
                  {currentScenario.challengeSummary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] mb-1.5">
                  Statutory Recovery Mechanism
                </h4>
                <p className="text-[14.5px] sm:text-[15px] leading-[1.65] text-[#374151]">
                  {currentScenario.legalMechanism}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] mb-1.5">
                  Recommended Recovery Pathway
                </h4>
                <p className="text-[14.5px] font-semibold text-[#047857]">
                  {currentScenario.recommendedPathway}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#172228]/10 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#111827] mb-3">
                  Required Documentation Checklist
                </h4>
                <ul className="space-y-2.5 text-[13.5px] text-[#49585F]">
                  {currentScenario.checklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-5 mt-5 border-t border-[#172228]/10">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#172228] hover:bg-[#C65378] text-white text-xs font-bold uppercase tracking-[0.12em] py-3.5 transition-colors"
                >
                  <span>Book IEPF Legal Review</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostic Calculator Card */}
      <div className="bg-[#F4EFE6] rounded-[28px] sm:rounded-[36px] border border-[#172228]/10 p-6 sm:p-10">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2">
            <Coins className="w-4 h-4" />
            <span>Succession &amp; Court Mandate Diagnostic</span>
          </div>
          <h3 className="text-[1.75rem] sm:text-[2.2rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-2">
            Evaluate Your Claim: Court Mandate &amp; Estimated Timeline
          </h3>
          <p className="text-[0.96rem] leading-[1.65] text-[#49585F]">
            Select your holding value and certificate status to determine whether a court Succession Certificate is mandatory under SEBI regulations:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#172228] mb-2.5">
                Total Market Value of Physical Holdings
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "under_5L", label: "Under ₹5 Lakh" },
                  { id: "5L_to_25L", label: "₹5L – ₹25 Lakh" },
                  { id: "above_25L", label: "Above ₹25 Lakh" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setHoldingValue(item.id as any)}
                    className={`py-3 px-2 text-center rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      holdingValue === item.id
                        ? "bg-[#172228] text-white border-[#172228]"
                        : "bg-white text-[#49585F] border-[#172228]/15 hover:border-[#C65378]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#172228] mb-2.5">
                Physical Share Certificate Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "available", label: "Originals Available" },
                  { id: "lost", label: "Lost / Mutilated / Duplicate" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCertStatus(item.id as any)}
                    className={`py-3 px-2 text-center rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      certStatus === item.id
                        ? "bg-[#172228] text-white border-[#172228]"
                        : "bg-white text-[#49585F] border-[#172228]/15 hover:border-[#C65378]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[#172228] mb-2.5">
                Surviving Legal Heirs Structure
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "single", label: "Sole Registered Claimant" },
                  { id: "multiple", label: "Multiple Surviving Co-Heirs" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setHeirStatus(item.id as any)}
                    className={`py-3 px-2 text-center rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      heirStatus === item.id
                        ? "bg-[#172228] text-white border-[#172228]"
                        : "bg-white text-[#49585F] border-[#172228]/15 hover:border-[#C65378]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-[#172228]/10 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-2">
              Legal Diagnostic Assessment
            </div>
            <h4 className="text-lg font-semibold text-[#111827] mb-4">
              {diag.courtRequired}
            </h4>

            <div className="space-y-3.5 text-[14px] text-[#374151] mb-6">
              <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
                <span className="block text-xs font-bold uppercase tracking-[0.12em] text-[#55636D] mb-1">
                  Statutory Procedure
                </span>
                <span className="font-medium text-[#111827]">{diag.statutoryPath}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/10">
                <span className="block text-xs font-bold uppercase tracking-[0.12em] text-[#55636D] mb-1">
                  Expected Turnaround
                </span>
                <span className="font-medium text-[#111827]">{diag.timeline}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#047857]/5 border border-[#047857]/20 text-[#047857]">
                <span className="block text-xs font-bold uppercase tracking-[0.12em] mb-1">
                  Recommended Action
                </span>
                <span className="font-medium">{diag.action}</span>
              </div>
            </div>

            <Link
              href="/contact"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-[15px] font-semibold py-3.5 shadow-sm transition-all"
            >
              <span>Consult Share Recovery Advocate</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
