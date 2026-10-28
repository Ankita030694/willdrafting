"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ShieldCheck,
  Scale,
  FileWarning,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Gavel,
  FileText,
  Clock,
  HelpCircle,
  Award,
} from "lucide-react";

export default function WillDisputeInteractive() {
  const [activeTrack, setActiveTrack] = useState<"challenge" | "defend">("challenge");

  // Interactive Case Assessor State
  const [userRole, setUserRole] = useState<"heir" | "executor">("heir");
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [hasDoctorCert, setHasDoctorCert] = useState<boolean | null>(null);
  const [witnessAvailable, setWitnessAvailable] = useState<boolean | null>(null);
  const [heirsExcluded, setHeirsExcluded] = useState<boolean | null>(null);
  const [activeParticipation, setActiveParticipation] = useState<boolean | null>(null);
  const [inHospital, setInHospital] = useState<boolean | null>(null);

  // Compute assessment
  const computeAssessment = () => {
    let score = 50; // baseline
    const factors: string[] = [];
    const warnings: string[] = [];

    if (userRole === "heir") {
      // Heir challenging
      if (isRegistered === false) {
        score += 15;
        factors.push("Unregistered status increases judicial scrutiny of execution");
      }
      if (hasDoctorCert === false) {
        score += 15;
        factors.push("Absence of medical fitness certificate supports lack of testamentary capacity");
      }
      if (witnessAvailable === false) {
        score += 15;
        factors.push("Failure to examine attesting witness violates Section 67 BSA (Section 68 IEA)");
      }
      if (heirsExcluded === true) {
        score += 10;
        factors.push("Unnatural exclusion of natural Class I heirs raises suspicious circumstances");
      }
      if (activeParticipation === true) {
        score += 20;
        factors.push("Beneficiary taking active part in execution triggers Kavita Kanwar doctrine");
      }
      if (inHospital === true) {
        score += 15;
        factors.push("Execution during critical hospitalization shifts burden of proof to propounder");
      }

      const strength = score >= 75 ? "High Chance of Challenge" : score >= 60 ? "Moderate Dispute Merits" : "Needs Document Discovery";
      return { score: Math.min(score, 98), label: strength, role: "heir", factors, warnings };
    } else {
      // Executor defending
      if (isRegistered === true) {
        score += 15;
        factors.push("SRO registration creates statutory presumption of genuine presentation");
      }
      if (hasDoctorCert === true) {
        score += 20;
        factors.push("Contemporary doctor fitness certificate disproves dementia and unsound mind allegations");
      }
      if (witnessAvailable === true) {
        score += 20;
        factors.push("Independent attesting witness deposition satisfies Section 67 BSA requirements");
      }
      if (heirsExcluded === false) {
        score += 15;
        factors.push("Equitable distribution or explicit reasons for disinheritance neutralize suspicion");
      }
      if (activeParticipation === false) {
        score += 15;
        factors.push("Independent drafting establishes genuine testamentary volition");
      }
      if (inHospital === false) {
        score += 10;
        factors.push("Execution during active health negates emergency coercion claims");
      }

      const strength = score >= 75 ? "Strong Defense Viability" : score >= 60 ? "Moderate Defense Strength" : "Requires Precautionary Proof";
      return { score: Math.min(score, 98), label: strength, role: "executor", factors, warnings };
    }
  };

  const assessment = computeAssessment();

  return (
    <section id="dual-track-hub" className="w-full mb-16 sm:mb-24">
      {/* Header */}
      <div className="max-w-3xl mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <Scale className="w-4 h-4" />
          <span>Interactive Litigation Architecture</span>
        </div>
        <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
          Dual-Track Legal Hub: Challenging vs Defending a Will
        </h2>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Whether you need to challenge a fraudulent testamentary instrument or defend a genuine Will against mischievous caveats, AMA Legal Solutions deploys dedicated High Court litigation advocates:
        </p>
      </div>

      {/* Track Selector Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <button
          type="button"
          onClick={() => {
            setActiveTrack("challenge");
            setUserRole("heir");
          }}
          className={`text-left p-6 rounded-2xl border-2 transition-all flex items-start gap-4 ${
            activeTrack === "challenge"
              ? "bg-white border-[#C65378] shadow-[0_8px_24px_rgba(198,83,120,0.12)]"
              : "bg-white/60 border-[#172228]/10 hover:border-[#172228]/25"
          }`}
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              activeTrack === "challenge" ? "bg-[#C65378] text-white" : "bg-[#172228]/5 text-[#172228]"
            }`}
          >
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#C65378] mb-1">
              Track A Litigation
            </div>
            <h3 className="text-lg font-bold text-[#111827] mb-1">
              Challenging a Forged or Coerced Will
            </h3>
            <p className="text-xs sm:text-sm text-[#49585F] leading-relaxed">
              For aggrieved legal heirs whose legitimate inheritance is blocked by a suspicious, fabricated, or coerced Will.
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTrack("defend");
            setUserRole("executor");
          }}
          className={`text-left p-6 rounded-2xl border-2 transition-all flex items-start gap-4 ${
            activeTrack === "defend"
              ? "bg-white border-[#047857] shadow-[0_8px_24px_rgba(4,120,87,0.12)]"
              : "bg-white/60 border-[#172228]/10 hover:border-[#172228]/25"
          }`}
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              activeTrack === "defend" ? "bg-[#047857] text-white" : "bg-[#172228]/5 text-[#172228]"
            }`}
          >
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#047857] mb-1">
              Track B Litigation
            </div>
            <h3 className="text-lg font-bold text-[#111827] mb-1">
              Defending a Genuine Will Against Caveats
            </h3>
            <p className="text-xs sm:text-sm text-[#49585F] leading-relaxed">
              For executors and named beneficiaries facing vexatious caveats, frivolous objections, or partition suits from disgruntled relatives.
            </p>
          </div>
        </button>
      </div>

      {/* Active Track Deep-Dive Content */}
      <div className="bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-12">
        {activeTrack === "challenge" ? (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#172228]/10">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-1">
                  Track A: Heir Defense Strategy
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#111827]">
                  Statutory Protocol to Invalidate a Suspicious Will
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-[#C65378]/10 text-[#C65378]">
                <Gavel className="w-3.5 h-3.5" />
                ISA ss. 61, 63, 263, 284 &amp; SRA ss. 31, 34
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10">
                <div className="text-xs font-bold text-[#C65378] uppercase mb-2">Stage 01</div>
                <h4 className="font-bold text-[#111827] mb-2 text-base">File Immediate Caveat</h4>
                <p className="text-xs sm:text-[13px] text-[#49585F] leading-relaxed">
                  Lodge a formal Caveat under Section 284 of the Indian Succession Act in the District or High Court to block ex-parte grant of probate.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10">
                <div className="text-xs font-bold text-[#C65378] uppercase mb-2">Stage 02</div>
                <h4 className="font-bold text-[#111827] mb-2 text-base">Injunction &amp; Suit</h4>
                <p className="text-xs sm:text-[13px] text-[#49585F] leading-relaxed">
                  File a civil suit under Specific Relief Act Section 31 for cancellation and secure an Order 39 CPC interim stay to freeze alienation.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10">
                <div className="text-xs font-bold text-[#C65378] uppercase mb-2">Stage 03</div>
                <h4 className="font-bold text-[#111827] mb-2 text-base">Forensic &amp; Witness Trial</h4>
                <p className="text-xs sm:text-[13px] text-[#49585F] leading-relaxed">
                  Demand examination of attesting witnesses under Section 67 BSA and requisition CFSL forensic analysis for forged signatures.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-[#172228]/10 bg-white">
                <h4 className="font-bold text-[#111827] mb-3 text-base flex items-center gap-2">
                  <FileWarning className="w-4 h-4 text-[#C65378]" />
                  Primary Grounds for Challenging in Court
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-1.5 shrink-0" />
                    <span><strong>Fraud and Forgery:</strong> Fake signatures, mismatched thumb impressions, or fabricated stamp papers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-1.5 shrink-0" />
                    <span><strong>Undue Influence (Section 61 ISA):</strong> Physical confinement, coercion, or abuse of confidential relationship.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-1.5 shrink-0" />
                    <span><strong>Lack of Testamentary Capacity:</strong> Advanced dementia, delirium, coma, or medical incapacity at time of signing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-1.5 shrink-0" />
                    <span><strong>Improper Attestation (Section 63 ISA):</strong> Witnesses did not sign simultaneously in presence of testator.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl border border-[#172228]/10 bg-white">
                <h4 className="font-bold text-[#111827] mb-3 text-base flex items-center gap-2">
                  <Gavel className="w-4 h-4 text-[#C65378]" />
                  Court Remedies Provided by AMA Legal Solutions
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] mt-0.5 shrink-0" />
                    <span>Drafting and filing Section 284 Caveats across District Courts and High Courts.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] mt-0.5 shrink-0" />
                    <span>Filing written statements converting probate petitions into contentious civil suits (Sec 295 ISA).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] mt-0.5 shrink-0" />
                    <span>Seeking appointment of Court Receiver under Order 40 CPC to prevent rent siphoning.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] mt-0.5 shrink-0" />
                    <span>Cross-examining interested propounders and discrediting planted attesting witnesses.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#172228]/10">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-[0.16em] text-[#047857] mb-1">
                  Track B: Executor &amp; Beneficiary Defense Strategy
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#111827]">
                  Statutory Defense to Dispel Suspicion &amp; Secure Probate
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-[#047857]/10 text-[#047857]">
                <ShieldCheck className="w-3.5 h-3.5" />
                ISA ss. 63, 276, 289 &amp; BSA s. 67
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10">
                <div className="text-xs font-bold text-[#047857] uppercase mb-2">Defense 01</div>
                <h4 className="font-bold text-[#111827] mb-2 text-base">Discharge Frivolous Caveat</h4>
                <p className="text-xs sm:text-[13px] text-[#49585F] leading-relaxed">
                  Serve warning on caveator under High Court rules to show caveatable interest; move court to dismiss caveats filed solely to extort settlements.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10">
                <div className="text-xs font-bold text-[#047857] uppercase mb-2">Defense 02</div>
                <h4 className="font-bold text-[#111827] mb-2 text-base">Prove Attesting Witness</h4>
                <p className="text-xs sm:text-[13px] text-[#49585F] leading-relaxed">
                  Examine at least one credible attesting witness in witness box under Section 67 BSA to establish free volition and simultaneous signing.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10">
                <div className="text-xs font-bold text-[#047857] uppercase mb-2">Defense 03</div>
                <h4 className="font-bold text-[#111827] mb-2 text-base">Dispelling Suspicious Facts</h4>
                <p className="text-xs sm:text-[13px] text-[#49585F] leading-relaxed">
                  Produce medical records, family correspondence, and SRO registration details to satisfy the Supreme Court standard in Venkatachala Iyengar.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-[#172228]/10 bg-white">
                <h4 className="font-bold text-[#111827] mb-3 text-base flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#047857]" />
                  Key Legal Pillars to Protect a Genuine Will
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#047857] mt-1.5 shrink-0" />
                    <span><strong>Mental Competence Documentation:</strong> Doctor fitness certificates, bank transaction history, and testimony of treating physicians.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#047857] mt-1.5 shrink-0" />
                    <span><strong>Proof of Due Execution:</strong> Strict compliance with Section 63 of Indian Succession Act verified through witness affidavits.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#047857] mt-1.5 shrink-0" />
                    <span><strong>Rebutting Unnatural Exclusion:</strong> Proving estrangement, previous inter-vivos gifts to objecting heirs, or testamentary reasons.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#047857] mt-1.5 shrink-0" />
                    <span><strong>Sub-Registrar Endorsement:</strong> Utilizing official Register Book endorsement as corroborative proof of identity and voluntary act.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl border border-[#172228]/10 bg-white">
                <h4 className="font-bold text-[#111827] mb-3 text-base flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#047857]" />
                  Litigation Defense Services by AMA Legal Solutions
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-[13.5px] text-[#374151]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] mt-0.5 shrink-0" />
                    <span>Filing Testamentary Petitions for Probate or Letters of Administration with Will annexed.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] mt-0.5 shrink-0" />
                    <span>Repelling mischievous partition suits filed to bypass pending testamentary probate jurisdiction.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] mt-0.5 shrink-0" />
                    <span>Securing discharge of bogus caveats and expediting final probate grant under Section 289 ISA.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#047857] mt-0.5 shrink-0" />
                    <span>Protecting executor rights and defending property mutation before municipal and revenue bodies.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Case Merit & Dispute Risk Assessment Tool */}
      <div className="bg-[#FAF7F0] rounded-[28px] border border-[#172228]/10 p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-2">
            <Clock className="w-4 h-4" />
            <span>Interactive Self-Diagnostic</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#111827] mb-2">
            Interactive Case Merit &amp; Dispute Risk Assessment Tool
          </h3>
          <p className="text-xs sm:text-sm text-[#49585F] leading-relaxed">
            Answer 6 statutory evidentiary questions to evaluate the judicial strength of your Will dispute case before the District Court or High Court:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Questions */}
          <div className="lg:col-span-7 space-y-4">
            {/* Question 1: Role */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#172228]/10">
              <label className="block text-xs sm:text-sm font-semibold text-[#111827] mb-2">
                1. What is your legal status in this succession dispute?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setUserRole("heir")}
                  className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-xl border transition-all text-center ${
                    userRole === "heir"
                      ? "bg-[#C65378] text-white border-[#C65378]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/25"
                  }`}
                >
                  Aggrieved Legal Heir
                </button>
                <button
                  type="button"
                  onClick={() => setUserRole("executor")}
                  className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-xl border transition-all text-center ${
                    userRole === "executor"
                      ? "bg-[#047857] text-white border-[#047857]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/25"
                  }`}
                >
                  Executor / Legatee
                </button>
              </div>
            </div>

            {/* Question 2: Registration */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#172228]/10">
              <label className="block text-xs sm:text-sm font-semibold text-[#111827] mb-2">
                2. Is the disputed Will registered at the Sub-Registrar Office (SRO)?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsRegistered(true)}
                  className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-xl border transition-all ${
                    isRegistered === true
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/25"
                  }`}
                >
                  Yes, Registered
                </button>
                <button
                  type="button"
                  onClick={() => setIsRegistered(false)}
                  className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-xl border transition-all ${
                    isRegistered === false
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/25"
                  }`}
                >
                  No, Unregistered
                </button>
              </div>
            </div>

            {/* Question 3: Medical Fitness Certificate */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#172228]/10">
              <label className="block text-xs sm:text-sm font-semibold text-[#111827] mb-2">
                3. Was a Doctor&apos;s Medical Fitness Certificate attached upon execution?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setHasDoctorCert(true)}
                  className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-xl border transition-all ${
                    hasDoctorCert === true
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/25"
                  }`}
                >
                  Yes, Certificate Attached
                </button>
                <button
                  type="button"
                  onClick={() => setHasDoctorCert(false)}
                  className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-xl border transition-all ${
                    hasDoctorCert === false
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/25"
                  }`}
                >
                  No Medical Certificate
                </button>
              </div>
            </div>

            {/* Question 4: Attesting Witness Availability */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#172228]/10">
              <label className="block text-xs sm:text-sm font-semibold text-[#111827] mb-2">
                4. Are independent attesting witnesses alive and available to testify in court?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setWitnessAvailable(true)}
                  className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-xl border transition-all ${
                    witnessAvailable === true
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/25"
                  }`}
                >
                  Yes, Available
                </button>
                <button
                  type="button"
                  onClick={() => setWitnessAvailable(false)}
                  className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-xl border transition-all ${
                    witnessAvailable === false
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/25"
                  }`}
                >
                  No / Unknown / Deceased
                </button>
              </div>
            </div>

            {/* Question 5: Natural Heirs Excluded */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#172228]/10">
              <label className="block text-xs sm:text-sm font-semibold text-[#111827] mb-2">
                5. Were natural legal heirs (children or spouse) completely disinherited without explanation?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setHeirsExcluded(true)}
                  className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-xl border transition-all ${
                    heirsExcluded === true
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/25"
                  }`}
                >
                  Yes, Totally Excluded
                </button>
                <button
                  type="button"
                  onClick={() => setHeirsExcluded(false)}
                  className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-xl border transition-all ${
                    heirsExcluded === false
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/25"
                  }`}
                >
                  No, Reason Given or Included
                </button>
              </div>
            </div>

            {/* Question 6: Active Beneficiary Participation */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#172228]/10">
              <label className="block text-xs sm:text-sm font-semibold text-[#111827] mb-2">
                6. Did the major beneficiary play an active role in drafting or getting the Will executed?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveParticipation(true)}
                  className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-xl border transition-all ${
                    activeParticipation === true
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/25"
                  }`}
                >
                  Yes, Active Beneficiary Part
                </button>
                <button
                  type="button"
                  onClick={() => setActiveParticipation(false)}
                  className={`py-2 px-3 text-xs sm:text-sm font-medium rounded-xl border transition-all ${
                    activeParticipation === false
                      ? "bg-[#172228] text-white border-[#172228]"
                      : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/25"
                  }`}
                >
                  No, Independent Action
                </button>
              </div>
            </div>
          </div>

          {/* Assessment Result Panel */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#172228]/10 p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sticky top-28">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-2">
              Judicial Viability Score
            </div>
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-4xl sm:text-5xl font-black text-[#111827]">
                {assessment.score}%
              </span>
              <span
                className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                  assessment.score >= 70
                    ? "bg-[#047857]/10 text-[#047857]"
                    : "bg-[#C65378]/10 text-[#C65378]"
                }`}
              >
                {assessment.label}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#49585F] leading-relaxed mb-6">
              {assessment.role === "heir"
                ? "Higher percentage reflects stronger suspicious circumstances under Indian Succession Act Section 61 and Supreme Court precedent to challenge the instrument."
                : "Higher percentage reflects fortified legal standing under Section 63 ISA to withstand caveats and secure probate from the District or High Court."}
            </p>

            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                Identified Case Factors:
              </div>
              {assessment.factors.length > 0 ? (
                <ul className="space-y-2">
                  {assessment.factors.map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#374151]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#047857] mt-0.5 shrink-0" />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-[#6B7280] italic">
                  Select the answers on the left to see key evidentiary strengths and statutory risks.
                </p>
              )}
            </div>

            <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 mb-6">
              <div className="text-xs font-bold text-[#111827] mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-[#C65378]" />
                Immediate Recommended Action:
              </div>
              <p className="text-xs text-[#49585F] leading-relaxed">
                {assessment.role === "heir"
                  ? "File a Section 284 Caveat in the local District Court and High Court immediately to block ex-parte probate, followed by a Specific Relief Act Section 31 cancellation suit."
                  : "Issue statutory citations to all legal heirs under Section 283 ISA and preserve original medical records and attesting witness affidavits for testamentary trial."}
              </p>
            </div>

            <Link
              href="/contact"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-sm font-semibold px-6 py-3.5 transition-colors shadow-sm"
            >
              <span>Consult an AMA Litigation Advocate</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
