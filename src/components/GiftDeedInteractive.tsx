"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Scale,
  ShieldCheck,
  HeartHandshake,
  Users2,
  FileText,
  BadgeAlert,
} from "lucide-react";

interface GiftScenario {
  id: string;
  label: string;
  icon: "heart" | "users" | "file" | "alert";
  heading: string; // Strictly <= 70 chars for Screaming Frog
  challengeSummary: string;
  legalMechanism: string;
  statutoryPrecedent: string;
  recommendedInstrument: string;
  checklist: string[];
}

const GIFT_SCENARIOS: GiftScenario[] = [
  {
    id: "senior-parent",
    label: "Parent to Child (Senior-Safe)",
    icon: "heart",
    heading: "Senior Citizen Gift Deed with Lifetime Protection",
    challengeSummary:
      "Elderly parents gifting a self-acquired house to a child risk eviction or abandonment if the deed is unconditional.",
    legalMechanism:
      "Under Section 23 of the Maintenance and Welfare of Parents and Senior Citizens Act (MWPSC Act, 2007), a gift deed can mandate that the child provide basic amenities and physical needs. The Supreme Court in Sudesh Chhikara (2022) ruled this condition must be explicitly written into the deed.",
    statutoryPrecedent:
      "Section 23 MWPSC Act, 2007 & Sudesh Chhikara v. Ramti Devi (2022 SC)",
    recommendedInstrument:
      "Senior-Safe Conditional Gift Deed with Section 23 Revocation Covenant",
    checklist: [
      "Include explicit condition of filial care and medical maintenance",
      "Reserve exclusive lifetime right of residence for senior parents",
      "Specify Maintenance Tribunal jurisdiction for summary deed cancellation",
    ],
  },
  {
    id: "blood-relative",
    label: "Blood Relative Concession",
    icon: "users",
    heading: "State Concessional Stamp Duty for Blood Relatives",
    challengeSummary:
      "Standard property transfers trigger high stamp duty of 5% to 8% plus 1% registration fees across Indian states.",
    legalMechanism:
      "Most Indian states (such as Maharashtra, Uttar Pradesh, Delhi, and Karnataka) offer substantial stamp duty concessions for gift deeds executed between defined blood relatives (parent, child, spouse, sibling). Under Section 56(2)(x) of the Income Tax Act, genuine gifts between relatives are 100% tax-free.",
    statutoryPrecedent:
      "State Stamp Acts & Section 56(2)(x) of the Income Tax Act, 1961",
    recommendedInstrument:
      "Concessional Blood-Relative Gift Deed with SRO Registration Support",
    checklist: [
      "Attach verified government relationship proof (Aadhaar, Passport, Birth Certificate)",
      "Calculate applicable state-specific concessional stamp duty",
      "Obtain Sub-Registrar biometric registration slot with two witnesses",
    ],
  },
  {
    id: "conditional-gift",
    label: "Conditional Gift Deed",
    icon: "alert",
    heading: "Conditional Gift Deed under Section 126 TPA",
    challengeSummary:
      "Donors want the property transfer to be tied to a specific future milestone without violating Section 10 rules on absolute restraint.",
    legalMechanism:
      "Under Section 126 of the Transfer of Property Act, 1882, a gift may be suspended or revoked upon the happening of a specified event not depending on the donor's will. Our advocates ensure the condition does not violate Section 10 or Section 12.",
    statutoryPrecedent:
      "Section 126 Transfer of Property Act, 1882 & Supreme Court Precedents",
    recommendedInstrument:
      "Bespoke Conditional Gift Deed with Defeasance Clause",
    checklist: [
      "Ensure condition is independent of donor's arbitrary will",
      "Structure clear reversion of title if conditional milestone fails",
      "Draft compliant covenants that pass Sub-Registrar scrutiny",
    ],
  },
  {
    id: "gift-vs-will",
    label: "Gift Deed vs Will Strategy",
    icon: "file",
    heading: "Strategic Choice: Immediate Gift vs Testamentary Will",
    challengeSummary:
      "Families remain undecided whether to transfer property immediately during life or bequeath it through a Will.",
    legalMechanism:
      "A gift deed creates immediate, irrevocable ownership with higher upfront stamp duty. A Will takes effect only after death, costs nominal registration fees, and remains fully revocable throughout the testator's lifetime. Many families combine both: gifting one home while protecting remaining assets in a Will.",
    statutoryPrecedent:
      "TPA 1882 s. 122 vs Indian Succession Act, 1925 s. 63",
    recommendedInstrument:
      "Dual Asset Strategy: Select Gift Deed + Comprehensive Registered Will",
    checklist: [
      "Evaluate donor's financial independence before giving away key assets",
      "Compare stamp duty costs versus probate delays in your city",
      "Draft a complementary Will on WillDrafting for remaining assets",
    ],
  },
];

export default function GiftDeedInteractive() {
  const [activeTab, setActiveTab] = useState<string>("senior-parent");

  // 3-Question Decision Matrix State
  const [recipient, setRecipient] = useState<"blood" | "other" | "minor">("blood");
  const [seniorProtection, setSeniorProtection] = useState<"yes" | "no">("yes");
  const [timing, setTiming] = useState<"lifetime" | "after-death">("lifetime");

  const currentScenario =
    GIFT_SCENARIOS.find((s) => s.id === activeTab) || GIFT_SCENARIOS[0];

  let recommendationTitle = "";
  let recommendationDetails = "";
  let recommendationStampDuty = "";
  let recommendationNextStep = "/contact";
  let recommendationActionText = "Draft With High Court Advocate";

  if (timing === "after-death") {
    recommendationTitle = "Execute a Registered Legal Will Instead of Gift Deed";
    recommendationDetails =
      "If you wish to retain complete ownership, rental income, and control during your lifetime, a Will is vastly superior. A Will is fully revocable, attracts nominal stamp duty, and avoids immediate property divestment.";
    recommendationStampDuty = "Nominal (₹0 to ₹500 across most Indian states)";
    recommendationNextStep = "/start";
    recommendationActionText = "Draft Online Court-Ready Will";
  } else if (seniorProtection === "yes") {
    recommendationTitle = "Senior-Safe Gift Deed with Section 23 Protection Clause";
    recommendationDetails =
      "Never execute an unconditional gift deed. Our advocates embed statutory Section 23 covenants guaranteeing lifetime residence and medical care, empowering you to revoke the deed before the Senior Citizens Tribunal if neglected.";
    recommendationStampDuty =
      recipient === "blood"
        ? "Concessional state rate for blood relatives (e.g. ₹200 to 2% depending on state)"
        : "Standard state stamp duty (5% to 7%)";
    recommendationNextStep = "/contact";
    recommendationActionText = "Consult Property Advocate";
  } else if (recipient === "other") {
    recommendationTitle = "Standard Gift Deed to Non-Relative (High Tax Alert)";
    recommendationDetails =
      "Gifting immovable property to a non-relative attracts full state stamp duty (5% to 8%) plus 1% SRO fees. Furthermore, the recipient faces up to 30% income tax under Section 56(2)(x) on the stamp valuation.";
    recommendationStampDuty = "Full ad-valorem stamp duty + 30% Section 56(2)(x) tax for recipient";
    recommendationNextStep = "/contact";
    recommendationActionText = "Consult Property Advocate";
  } else {
    recommendationTitle = "Concessional Blood-Relative Gift Deed with SRO Registration";
    recommendationDetails =
      "You qualify for concessional state stamp duty rates and complete income tax exemption under Section 56(2)(x). Our High Court advocates draft clean schedules, calculate exact duties, and coordinate Sub-Registrar biometrics.";
    recommendationStampDuty =
      "Concessional rate (₹200 flat in Maharashtra, ₹5,000 in UP for select relatives, or 1% to 3%)";
    recommendationNextStep = "/contact";
    recommendationActionText = "Book Gift Deed Drafting";
  }

  return (
    <section className="w-full mb-16 sm:mb-24">
      <div className="max-w-3xl mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-[#C65378] text-[0.75rem] font-bold tracking-[0.16em] uppercase mb-3">
          <Scale className="w-4 h-4" />
          <span>Interactive Gift Deed Navigator</span>
        </div>
        <h2 className="text-[1.85rem] sm:text-[2.4rem] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827] mb-3">
          Explore Gift Deed Scenarios by Family Need
        </h2>
        <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.65] text-[#49585F]">
          Different family property gifts require distinct statutory safeguards.
          Select your scenario below to understand governing Indian laws, legal
          mechanisms, and registration steps:
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-8 pb-2 border-b border-[#172228]/10">
        {GIFT_SCENARIOS.map((scenario) => {
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
              {scenario.icon === "heart" && <HeartHandshake className="w-4 h-4" />}
              {scenario.icon === "users" && <Users2 className="w-4 h-4" />}
              {scenario.icon === "alert" && <BadgeAlert className="w-4 h-4" />}
              {scenario.icon === "file" && <FileText className="w-4 h-4" />}
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
              Governing Statutory Framework
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
                The Practical Risk
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
            Should You Execute an Unconditional Gift, Section 23 Deed, or Will?
          </h3>
          <p className="text-sm sm:text-[15px] leading-relaxed text-[#55636D]">
            Answer three quick questions to identify the exact statutory route under
            the Transfer of Property Act, Stamp Act, and Senior Citizens Act:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Question 1 */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C65378] mb-2">
              Question 1 · Recipient
            </span>
            <label className="text-sm font-semibold text-[#111827] mb-3 block">
              Who is receiving the property gift?
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setRecipient("blood")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                  recipient === "blood"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/30"
                }`}
              >
                Blood relative (Child, Spouse, Sibling)
              </button>
              <button
                type="button"
                onClick={() => setRecipient("other")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                  recipient === "other"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/30"
                }`}
              >
                Distant relative or non-relative
              </button>
            </div>
          </div>

          {/* Question 2 */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C65378] mb-2">
              Question 2 · Senior Security
            </span>
            <label className="text-sm font-semibold text-[#111827] mb-3 block">
              Is the donor an elderly parent needing protection?
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setSeniorProtection("yes")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                  seniorProtection === "yes"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/30"
                }`}
              >
                Yes, need Section 23 residence &amp; care clause
              </button>
              <button
                type="button"
                onClick={() => setSeniorProtection("no")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                  seniorProtection === "no"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/30"
                }`}
              >
                No, donor is transferring unconditionally
              </button>
            </div>
          </div>

          {/* Question 3 */}
          <div className="bg-white rounded-2xl p-5 border border-[#172228]/10 flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C65378] mb-2">
              Question 3 · Transfer Timing
            </span>
            <label className="text-sm font-semibold text-[#111827] mb-3 block">
              When should ownership transfer legally take effect?
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setTiming("lifetime")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                  timing === "lifetime"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/30"
                }`}
              >
                Immediate lifetime transfer (Gift Deed)
              </button>
              <button
                type="button"
                onClick={() => setTiming("after-death")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                  timing === "after-death"
                    ? "bg-[#172228] text-white border-[#172228]"
                    : "bg-[#FAF7F0] text-[#172228] border-[#172228]/10 hover:border-[#172228]/30"
                }`}
              >
                After demise only (Registered Will)
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
              <span>{recommendationActionText}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tools/gift-deed-vs-will-stamp-duty-calculator"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FAF7F0] border border-[#172228]/15 hover:border-[#C65378] text-[#172228] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3 transition-colors"
            >
              <span>Compare Stamp Duty Tool</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
