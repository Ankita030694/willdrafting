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
  Coins,
  FileSearch,
} from "lucide-react";

interface IepfScenario {
  id: string;
  label: string;
  icon: "landmark" | "coins" | "filesearch" | "scale";
  heading: string; // Strictly <= 70 chars for Screaming Frog
  challengeSummary: string;
  legalMechanism: string;
  statutoryAuthority: string;
  recommendedPathway: string;
  checklist: string[];
}

const IEPF_SCENARIOS: IepfScenario[] = [
  {
    id: "deceased-parent-iepf",
    label: "Deceased Parent IEPF Shares",
    icon: "landmark",
    heading: "Deceased Parent Physical Shares Transferred to IEPF",
    challengeSummary:
      "Physical share certificates of blue-chip companies sat in lockers. Seven years of unpaid dividends caused compulsory transfer to IEPF under Section 124(6).",
    legalMechanism:
      "Heirs cannot claim directly through standard broker portals. You must complete legal transmission with the company RTA first. The RTA issues an Entitlement Letter. Next, file Form IEPF-5 on the MCA portal with verified succession documents.",
    statutoryAuthority:
      "Companies Act 2013 s. 124(6) & IEPF Rules 2016 Rule 7",
    recommendedPathway:
      "Integrated RTA Transmission + MCA Form IEPF-5 Verification Protocol",
    checklist: [
      "Original physical share certificates or Letter of Confirmation (ISR-4)",
      "Succession Certificate or Court Probate for portfolios above ₹5 Lakh",
      "Client Master List (CML) of claimant active demat account",
      "Self-attested Aadhaar and PAN with CKYC registration",
    ],
  },
  {
    id: "rbi-dea-deposits",
    label: "RBI DEA Bank Deposits",
    icon: "coins",
    heading: "Dormant Accounts and Inoperative Fixed Deposits in RBI DEA",
    challengeSummary:
      "Savings accounts, recurring deposits, or mature fixed deposits unclaimed for over 10 years are transferred to RBI Depositor Education Fund.",
    legalMechanism:
      "Funds stay credited to RBI DEA Fund under Section 26A of Banking Regulation Act. Legal heirs can reclaim the full principal plus compounded interest through the home branch using UDGAM portal reference numbers and legal heir certifications.",
    statutoryAuthority:
      "Banking Regulation Act 1949 s. 26A & RBI DEA Fund Scheme 2014",
    recommendedPathway:
      "UDGAM Search Audit + Branch Deceased Claim Legal Representation",
    checklist: [
      "Deceased Death Certificate issued by Municipal Registrar",
      "UDGAM Unclaimed Deposit Reference Number (UDRN)",
      "Bank Form A/B indemnity bond executed on state stamp paper",
      "Court Succession Certificate if deposit exceeds branch limit",
    ],
  },
  {
    id: "lost-certificates-mismatch",
    label: "Lost Certificates & Mismatch",
    icon: "filesearch",
    heading: "Lost Original Certificates and Name or Signature Mismatch",
    challengeSummary:
      "Physical certificates are missing, damaged, or the deceased shareholder name spelling differs from government identity documents and PAN card.",
    legalMechanism:
      "SEBI regulations require duplicate share generation via Form ISR-4. This requires executing an Indemnity Bond (Form B), an Affidavit (Form A), and publishing public loss notices in national and vernacular newspapers before filing Form IEPF-5.",
    statutoryAuthority:
      "SEBI Master Circular 2022 & SEBI LODR Regulation 39",
    recommendedPathway:
      "Duplicate Folio Issuance + Judicial Gazette Name Rectification",
    checklist: [
      "Police Non-Cognizable Report (NCR) or FIR for lost certificates",
      "Newspaper advertisement copies in English and regional daily",
      "Form ISR-2 signature verification certified by bank manager",
      "Affidavit for name variation signed before Notary or Magistrate",
    ],
  },
  {
    id: "high-value-succession",
    label: "Portfolio Over ₹15 Lakh",
    icon: "scale",
    heading: "High-Value Portfolio Above ₹15 Lakh Without a Will",
    challengeSummary:
      "When market value of physical shares exceeds ₹5 Lakh or demat shares exceed ₹15 Lakh without a registered Will, RTAs reject indemnity-only claims.",
    legalMechanism:
      "Under SEBI Transmission Master Circulars, RTAs and the IEPF Authority require a court-granted Succession Certificate or Letters of Administration. Non-advocate brokers cannot represent clients in civil courts to obtain these decrees.",
    statutoryAuthority:
      "Indian Succession Act 1925 s. 370-372 & SEBI Circular 2022",
    recommendedPathway:
      "High Court or District Court Succession Petition + RTA Filing",
    checklist: [
      "Family tree affidavit detailing all Class-I surviving heirs",
      "Valuation certificate of shares as of the date of court petition",
      "Court citation notices in daily newspapers for 30-day objection period",
      "Payment of state court fees for final grant of certificate",
    ],
  },
];

export default function IepfRecoveryInteractive() {
  const [activeTab, setActiveTab] = useState<string>("deceased-parent-iepf");

  // 3-Question Decision Matrix State
  const [assetType, setAssetType] = useState<"iepf-shares" | "rbi-bank" | "rta-physical">(
    "iepf-shares"
  );
  const [portfolioValue, setPortfolioValue] = useState<"under-5l" | "above-5l">(
    "above-5l"
  );
  const [heirConsensus, setHeirConsensus] = useState<"unanimous" | "disputed">(
    "unanimous"
  );

  const currentScenario =
    IEPF_SCENARIOS.find((s) => s.id === activeTab) || IEPF_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationDetails = "";
  let recommendationMandatoryDocs = "";
  const recommendationNextStep = "/contact";

  if (heirConsensus === "disputed") {
    recommendationTitle = "High Court Succession Suit & Advocate Mediation";
    recommendationDetails =
      "When siblings or co-heirs dispute ownership of shares or bank accounts, RTAs and banks freeze processing. Our High Court advocates initiate formal succession litigation under the Indian Succession Act or family mediation to secure clear judicial title.";
    recommendationMandatoryDocs =
      "Court Succession Certificate or Civil Court Compromise Decree";
  } else if (assetType === "rbi-bank") {
    if (portfolioValue === "under-5l") {
      recommendationTitle = "Direct Branch Settlement via UDGAM Portal Protocol";
      recommendationDetails =
        "For bank deposits under branch discretionary limits (usually ₹5 Lakh), heirs can recover funds through bank deceased claim packets, Form A indemnity bonds, and survivor member certificates without civil court litigation.";
      recommendationMandatoryDocs =
        "Bank Indemnity Bond, Legal Heir Certificate, KYC of all claimants";
    } else {
      recommendationTitle = "District Court Succession Certificate + Branch Recovery";
      recommendationDetails =
        "For deposits exceeding branch caps or inoperative accounts without registered nomination, banks strictly mandate a Succession Certificate under Section 372 of the Indian Succession Act to discharge liabilities.";
      recommendationMandatoryDocs =
        "Succession Certificate from District Judge + UDGAM Reference ID";
    }
  } else {
    // IEPF or RTA physical shares
    if (portfolioValue === "under-5l") {
      recommendationTitle = "Fast-Track SEBI Indemnity Transmission + IEPF-5 Filing";
      recommendationDetails =
        "For physical share portfolios under ₹5 Lakh, SEBI circulars permit transmission using Form ISR-1, ISR-2, Form B Indemnity Bond, and Form C NoC from other legal heirs. Once the RTA issues an Entitlement Letter, we submit MCA Form IEPF-5.";
      recommendationMandatoryDocs =
        "SEBI Form A, Form B, Form C, Client Master List, MCA Form IEPF-5";
    } else {
      recommendationTitle = "Integrated Court Succession Petition + Form IEPF-5 Legal Relief";
      recommendationDetails =
        "For portfolios exceeding ₹5 Lakh (physical) or ₹15 Lakh (demat), RTAs and the IEPF Authority require a court-issued Succession Certificate or Probate. Our High Court team obtains the court order and manages RTA liaison and IEPF approvals end-to-end.";
      recommendationMandatoryDocs =
        "Court Succession Certificate, RTA Entitlement Letter, MCA Form IEPF-5, Original Share Certificates";
    }
  }

  return (
    <section className="w-full mb-16 sm:mb-24">
      <div className="max-w-3xl mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <Scale className="w-4 h-4" />
          <span>Interactive Asset Recovery Pathways</span>
        </div>
        <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
          IEPF Share Recovery Scenarios and Legal Pathways
        </h2>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Recovering unclaimed shares from IEPF or dormant bank funds from RBI
          depends on your portfolio value, deceased investor documentation, and
          court succession requirements. Select your case below:
        </p>
      </div>

      {/* Scenario Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-8 pb-2 border-b border-[#172228]/10">
        {IEPF_SCENARIOS.map((scenario) => {
          const isActive = scenario.id === activeTab;
          return (
            <button
              key={scenario.id}
              onClick={() => setActiveTab(scenario.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#172228] text-white shadow-sm"
                  : "bg-white text-[#49585F] hover:bg-[#FAF7F0] border border-[#172228]/10"
              }`}
            >
              {scenario.icon === "landmark" && <Landmark className="w-3.5 h-3.5" />}
              {scenario.icon === "coins" && <Coins className="w-3.5 h-3.5" />}
              {scenario.icon === "filesearch" && <FileSearch className="w-3.5 h-3.5" />}
              {scenario.icon === "scale" && <Scale className="w-3.5 h-3.5" />}
              <span>{scenario.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Content Card */}
      <div className="bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <span className="inline-block text-xs font-bold tracking-[0.16em] uppercase text-[#C65378] mb-2">
              Statutory Authority: {currentScenario.statutoryAuthority}
            </span>
            <h3 className="text-xl sm:text-2xl font-medium text-[#111827] mb-4 leading-snug">
              {currentScenario.heading}
            </h3>
            <p className="text-[14.5px] sm:text-[15px] leading-[1.68] text-[#49585F] mb-4">
              <strong className="text-[#111827]">The Bottleneck: </strong>
              {currentScenario.challengeSummary}
            </p>
            <p className="text-[14.5px] sm:text-[15px] leading-[1.68] text-[#49585F] mb-6">
              <strong className="text-[#111827]">Legal Remedy: </strong>
              {currentScenario.legalMechanism}
            </p>

            <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 mb-2">
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#C65378] block mb-1">
                Recommended Legal Procedure
              </span>
              <span className="text-sm font-semibold text-[#111827]">
                {currentScenario.recommendedPathway}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#FAF7F0] rounded-[24px] p-6 border border-[#172228]/10">
            <h4 className="text-sm font-bold uppercase tracking-[0.12em] text-[#111827] mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#047857]" />
              <span>Mandatory Documentation Checklist</span>
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px] text-[#374151]">
              {currentScenario.checklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-[#172228]/10">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.12em] py-3 px-4 transition-colors"
              >
                <span>Initiate Asset Recovery</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Question Decision Tool */}
      <div className="rounded-[28px] bg-[#172228] text-[#FAF7F0] p-6 sm:p-8 lg:p-10 shadow-[0_8px_32px_rgba(23,34,40,0.12)]">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2">
            <span>Instant Recovery Assessment</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-medium text-white mb-2 leading-snug">
            Evaluate Your Case Requirements in 30 Seconds
          </h3>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
            Answer three quick questions to see whether your unclaimed shares or
            bank deposits require a Court Succession Certificate or fast-track
            SEBI indemnity documentation:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Question 1 */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <span className="text-[11px] font-mono text-[#C65378] tracking-widest uppercase block mb-2">
              Question 01
            </span>
            <label className="text-xs sm:text-sm font-semibold text-white block mb-3">
              Where are the unclaimed funds held?
            </label>
            <div className="space-y-2">
              {[
                { val: "iepf-shares", label: "Shares in IEPF (Form IEPF-5)" },
                { val: "rbi-bank", label: "Bank Deposit / RBI DEA Fund" },
                { val: "rta-physical", label: "Physical Shares with RTA" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setAssetType(opt.val as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    assetType === opt.val
                      ? "bg-[#C65378] text-white"
                      : "bg-white/5 text-white/80 hover:bg-white/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <span className="text-[11px] font-mono text-[#C65378] tracking-widest uppercase block mb-2">
              Question 02
            </span>
            <label className="text-xs sm:text-sm font-semibold text-white block mb-3">
              Total market value of unclaimed asset?
            </label>
            <div className="space-y-2">
              {[
                { val: "under-5l", label: "Under ₹5 Lakhs (SEBI Threshold)" },
                { val: "above-5l", label: "Above ₹5 Lakhs (High-Value)" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setPortfolioValue(opt.val as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    portfolioValue === opt.val
                      ? "bg-[#C65378] text-white"
                      : "bg-white/5 text-white/80 hover:bg-white/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3 */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <span className="text-[11px] font-mono text-[#C65378] tracking-widest uppercase block mb-2">
              Question 03
            </span>
            <label className="text-xs sm:text-sm font-semibold text-white block mb-3">
              Consensus among surviving legal heirs?
            </label>
            <div className="space-y-2">
              {[
                { val: "unanimous", label: "All heirs agree to claim" },
                { val: "disputed", label: "Dispute or co-heir missing" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setHeirConsensus(opt.val as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    heirConsensus === opt.val
                      ? "bg-[#C65378] text-white"
                      : "bg-white/5 text-white/80 hover:bg-white/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Output Box */}
        <div className="bg-white/10 rounded-2xl p-6 border border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#34D399] block mb-1">
              Recommended Statutory Pathway
            </span>
            <h4 className="text-lg font-semibold text-white mb-2">
              {recommendationTitle}
            </h4>
            <p className="text-xs sm:text-[13px] text-white/80 leading-relaxed mb-3">
              {recommendationDetails}
            </p>
            <div className="text-xs text-white/60">
              <strong className="text-white/90">Mandatory Instrument: </strong>
              <span>{recommendationMandatoryDocs}</span>
            </div>
          </div>
          <Link
            href={recommendationNextStep}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold uppercase tracking-[0.14em] px-6 py-4 transition-colors shrink-0"
          >
            <span>Consult Recovery Advocate</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
