"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Scale,
  ShieldCheck,
  Building2,
  HeartHandshake,
  Landmark,
  FileCheck,
} from "lucide-react";

interface GuardianshipScenario {
  id: string;
  label: string;
  icon: "shield" | "heart" | "building" | "landmark";
  heading: string; // Strictly <= 70 chars for Screaming Frog
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedInstrument: string;
  operationalPowers: string;
  checklist: string[];
}

const GUARDIANSHIP_SCENARIOS: GuardianshipScenario[] = [
  {
    id: "dementia-alzheimers",
    label: "Dementia & Coma Care",
    icon: "shield",
    heading: "Legal Guardianship for Dementia and Coma Patients",
    challengeSummary:
      "Elderly parents suffering from Alzheimer's disease, vascular dementia, severe stroke, or comatose states cannot sign documents or manage healthcare.",
    legalMechanism:
      "Under Article 226 of the Constitution of India, High Courts exercise inherent parens patriae jurisdiction to protect mentally incapacitated citizens. The High Court constitutes a government medical board, evaluates disability, and appoints a family member as legal guardian to operate bank accounts and fund medical care.",
    statutoryPrecedent:
      "Constitution of India Art. 226 & Shobha Gopalakrishnan v. State of Kerala (2019)",
    recommendedInstrument:
      "High Court Article 226 Parens Patriae Adult Guardianship Writ Petition",
    operationalPowers:
      "Full legal authority to operate bank accounts, direct medical protocols, and administer personal property.",
    checklist: [
      "Multi-specialist Neuro-Psychiatric evaluation with MMSE score",
      "Medical certificate signed by Civil Surgeon or Government Hospital Board",
      "Writ petition arraying state authorities, tehsildar, and banks as respondents",
      "Periodic financial statement filing before the High Court Registrar",
    ],
  },
  {
    id: "national-trust-act",
    label: "Autism & Special Needs",
    icon: "heart",
    heading: "National Trust Act Legal Guardianship for Adults",
    challengeSummary:
      "When a child with Autism, Cerebral Palsy, or Intellectual Disability turns 18, natural parental guardianship ceases under Indian law.",
    legalMechanism:
      "Section 14 of the National Trust Act, 1999 provides a statutory mechanism without expensive court litigation. Parents or registered NGOs apply to the Local Level Committee (LLC) headed by the District Collector to receive a Form B Legal Guardianship Certificate for lifetime care.",
    statutoryPrecedent:
      "National Trust Act, 1999 s. 14 & LLC Rules Forms A and B",
    recommendedInstrument:
      "National Trust Act Form A Application before District Collector LLC",
    operationalPowers:
      "Statutory authority for banking, government disability welfare schemes, medical treatment, and daily living.",
    checklist: [
      "Permanent disability certificate with 40% or more disability score",
      "LLC Form A application accompanied by family pedigree details",
      "Verification and home visit by registered disability welfare NGO",
      "Receipt of statutory Form B Certificate within 30 to 45 business days",
    ],
  },
  {
    id: "bank-freeze-liquidation",
    label: "Bank Account Access",
    icon: "landmark",
    heading: "Unfreezing Bank Accounts and Fixed Deposits",
    challengeSummary:
      "Banks freeze accounts or reject cheque mandates when an account holder is comatose, bedridden, or suffers from severe memory loss.",
    legalMechanism:
      "Power of Attorney becomes invalid once the principal loses mental capacity under Section 201 of the Indian Contract Act, 1872. High Courts issue interim directions ordering banks under RBI Master Directions to unfreeze funds and allow dedicated monthly withdrawals for medical bills and nursing care.",
    statutoryPrecedent:
      "Indian Contract Act, 1872 s. 201 & RBI Master Directions on Incapacitated Accounts",
    recommendedInstrument:
      "High Court Interim Application (IA) for Bank Operation Mandate",
    operationalPowers:
      "Enables opening a court-monitored guardian bank ledger to pay hospital, ICU, and caretaker expenses.",
    checklist: [
      "Service of certified High Court order on Bank Branch Manager",
      "Submission of guardian KYC documents and court verification decree",
      "Provision of hospital medical estimate letters and nursing vouchers",
      "Maintenance of strict quarterly expense records for court review",
    ],
  },
  {
    id: "real-estate-alienation",
    label: "Property Sale for Care",
    icon: "building",
    heading: "Selling Real Estate to Fund Medical Treatment",
    challengeSummary:
      "Families facing massive hospital, ICU, and long-term care bills often need to sell an apartment or land owned by the incapacitated parent.",
    legalMechanism:
      "Sub-Registrars reject sale deeds if the owner cannot personally appear or understand the sale under Section 34 of the Registration Act, 1908. A legal guardian must obtain prior sanction from the High Court under parens patriae jurisdiction, demonstrating clear medical necessity.",
    statutoryPrecedent:
      "Registration Act, 1908 s. 34 & High Court Parens Patriae Property Sanction",
    recommendedInstrument:
      "Miscellaneous Application for High Court Judicial Sanction to Sell Immovable Asset",
    operationalPowers:
      "Empowers the guardian to execute the registered sale deed and deposit sale proceeds into an escrow account.",
    checklist: [
      "Certified valuation report from a Government Approved Valuer",
      "Detailed medical expenditure audit demonstrating financial necessity",
      "No-objection affidavits from all surviving Class-I legal heirs",
      "Formal undertaking to park surplus proceeds in secure bank fixed deposits",
    ],
  },
];

export default function AdultGuardianshipInteractive() {
  const [activeTab, setActiveTab] = useState<string>("dementia-alzheimers");

  const current =
    GUARDIANSHIP_SCENARIOS.find((item) => item.id === activeTab) ||
    GUARDIANSHIP_SCENARIOS[0];

  const getIcon = (type: string) => {
    switch (type) {
      case "shield":
        return <ShieldCheck className="w-5 h-5 text-[#C65378]" />;
      case "heart":
        return <HeartHandshake className="w-5 h-5 text-[#C65378]" />;
      case "landmark":
        return <Landmark className="w-5 h-5 text-[#C65378]" />;
      case "building":
        return <Building2 className="w-5 h-5 text-[#C65378]" />;
      default:
        return <Scale className="w-5 h-5 text-[#C65378]" />;
    }
  };

  return (
    <div className="w-full rounded-[28px] sm:rounded-[36px] bg-white border border-[#172228]/10 p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
      {/* Top Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <Scale className="w-4 h-4" />
          <span>Interactive Adult Guardianship Diagnostic</span>
        </div>
        {/* Section Heading: strictly <= 70 chars */}
        <h3 className="text-[1.85rem] sm:text-[2.35rem] font-medium leading-[1.14] tracking-[-0.02em] text-[#111827] mb-3">
          Explore Adult Guardianship Pathways by Medical Situation
        </h3>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Different medical conditions require distinct legal remedies. Explore the exact statutory pathway, court jurisdiction, and required legal instrument for your family:
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap gap-2.5 sm:gap-3 p-1.5 bg-[#FAF7F0] rounded-2xl border border-[#172228]/10 mb-8">
        {GUARDIANSHIP_SCENARIOS.map((scenario) => {
          const isActive = scenario.id === activeTab;
          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() => setActiveTab(scenario.id)}
              className={`flex-1 min-w-[140px] sm:min-w-fit px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center ${
                isActive
                  ? "bg-[#172228] text-white shadow-xs"
                  : "bg-transparent text-[#49585F] hover:text-[#172228] hover:bg-white/60"
              }`}
            >
              {scenario.label}
            </button>
          );
        })}
      </div>

      {/* Content Card */}
      <div className="rounded-2xl bg-[#FAF7F0]/60 border border-[#172228]/10 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[#172228]/10 mb-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="p-2 rounded-lg bg-white border border-[#172228]/10">
                {getIcon(current.icon)}
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378]">
                Statutory Remedy Profile
              </span>
            </div>
            <h4 className="text-xl sm:text-2xl font-medium text-[#111827] mb-3">
              {current.heading}
            </h4>
            <p className="text-[14.5px] sm:text-[15px] leading-[1.68] text-[#49585F]">
              {current.challengeSummary}
            </p>
          </div>

          <div className="lg:w-72 shrink-0 bg-white rounded-xl p-4 sm:p-5 border border-[#172228]/10 shadow-2xs">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#55636D] mb-1.5">
              Recommended Legal Action
            </div>
            <div className="text-sm font-bold text-[#111827] mb-3 leading-snug">
              {current.recommendedInstrument}
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-semibold py-2.5 px-4 transition-colors"
            >
              <span>Consult High Court Counsel</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl p-5 border border-[#172228]/10">
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#C65378] mb-2">
              Legal Mechanism &amp; Court Power
            </div>
            <p className="text-[14px] leading-[1.65] text-[#374151] mb-3">
              {current.legalMechanism}
            </p>
            <div className="text-xs font-semibold text-[#047857] bg-[#047857]/10 p-2.5 rounded-lg border border-[#047857]/20">
              Statute: {current.statutoryPrecedent}
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-[#172228]/10">
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#172228] mb-2">
              Operational Scope Granted to Guardian
            </div>
            <p className="text-[14px] leading-[1.65] text-[#374151] mb-3">
              {current.operationalPowers}
            </p>
            <div className="text-xs font-semibold text-[#172228] bg-[#FAF7F0] p-2.5 rounded-lg border border-[#172228]/10">
              Protection: Complete ring-fencing against wrongful third-party transactions.
            </div>
          </div>
        </div>

        {/* Procedural Checklist */}
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-[#172228]/10">
          <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#55636D] mb-3">
            Statutory Compliance Checklist for Petitioners
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {current.checklist.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0 mt-0.5" />
                <span className="text-[13.5px] leading-[1.6] text-[#374151]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
