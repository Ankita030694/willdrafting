"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Scale,
  ShieldCheck,
  Building2,
  Lock,
  FileText,
  Globe2,
  AlertTriangle,
} from "lucide-react";

interface AdminScenario {
  id: string;
  label: string;
  icon: "building" | "lock" | "file" | "globe";
  heading: string; // Strictly <= 70 chars for Screaming Frog
  challengeSummary: string;
  legalMechanism: string;
  statutoryAuthority: string;
  recommendedPetition: string;
  checklist: string[];
}

const ADMIN_SCENARIOS: AdminScenario[] = [
  {
    id: "intestate-property",
    label: "Intestate Real Estate",
    icon: "building",
    heading: "Letters of Administration for Intestate Land & Flats",
    challengeSummary:
      "When an individual passes away without a Will leaving residential flats or plots, revenue authorities reject simple legal heir certificates for mutation.",
    legalMechanism:
      "Section 370 of the Indian Succession Act expressly bars Succession Certificates for immovable properties. Heirs must petition the District Court or High Court under Section 218 for Letters of Administration to vest lawful title in the administrator.",
    statutoryAuthority:
      "Indian Succession Act, 1925 ss. 218, 278 & Hindu Succession Act, 1956",
    recommendedPetition:
      "Petition for Letters of Administration under Section 218 ISA",
    checklist: [
      "Original Death Certificate issued by the local Municipal Corporation",
      "Registered sale deeds, conveyance deeds, or share certificates",
      "Affidavits of consent (NoC) from all surviving Class-I legal heirs",
      "Schedule of all estate assets with verified circle rates",
    ],
  },
  {
    id: "bank-locker",
    label: "Bank Locker Access",
    icon: "lock",
    heading: "Bank Locker Release & Jewelry Inventory Inspection",
    challengeSummary:
      "Banks freeze safe deposit lockers when an account holder dies intestate without a registered joint holder or active nomination.",
    legalMechanism:
      "A Succession Certificate only covers debts and securities, not physical locker contents or family heirloom jewelry. Banks demand Letters of Administration granted by a court of competent jurisdiction before allowing locker drilling or release.",
    statutoryAuthority:
      "Indian Succession Act, 1925 s. 218 & RBI Master Circular on Deceased Lockers",
    recommendedPetition:
      "Letters of Administration with Court Commissioner Locker Inventory Prayer",
    checklist: [
      "Bank branch locker allocation number and passbook records",
      "Interim application for appointment of a Court Commissioner",
      "Presence of bank branch manager and government valuer during opening",
      "Videographed and signed panchnama inventory of all contents",
    ],
  },
  {
    id: "will-without-executor",
    label: "Will Without Executor",
    icon: "file",
    heading: "Letters of Administration with Will Annexed (s. 232)",
    challengeSummary:
      "A person wrote a valid Will, but forgot to designate an executor, or the nominated executor died or formally renounced probate.",
    legalMechanism:
      "Under Section 222 of the Indian Succession Act, Probate can only be granted to an executor named in the Will. When no executor exists, beneficiaries must apply under Section 232 for Letters of Administration with the Will Annexed.",
    statutoryAuthority:
      "Indian Succession Act, 1925 ss. 232, 234 & 276",
    recommendedPetition:
      "Petition for Letters of Administration cum testamento annexo (s. 232)",
    checklist: [
      "Original signed Will and verification of two attesting witnesses",
      "Affidavit of Renunciation or Death Certificate of named executor",
      "Citation notice to all intestate legal heirs who would inherit without Will",
      "Administration bond execution under Section 291 of the Act",
    ],
  },
  {
    id: "multi-state-nri",
    label: "Multi-State & NRI Assets",
    icon: "globe",
    heading: "Pan-India Estate Administration & High Court Decree",
    challengeSummary:
      "The deceased left properties scattered across multiple Indian states, or the surviving legal heirs reside abroad as NRIs or OCIs.",
    legalMechanism:
      "Under Section 273 of the Indian Succession Act, Letters of Administration granted by a High Court with appropriate certification have conclusive legal effect across every state and union territory throughout India, avoiding multiple district petitions.",
    statutoryAuthority:
      "Indian Succession Act, 1925 ss. 273, 274 & High Court Original Civil Rules",
    recommendedPetition:
      "High Court Testamentary Petition with Pan-India Administration Certificate",
    checklist: [
      "Special Power of Attorney executed abroad with Hague Apostille or Embassy attestation",
      "Consolidated multi-state asset inventory verified by state collectors",
      "Publication in national English and state vernacular newspapers",
      "RBI Form 15CA and 15CB documentation for foreign repatriation",
    ],
  },
];

export default function LettersOfAdminInteractive() {
  const [activeTab, setActiveTab] = useState<string>("intestate-property");

  // 3-Question Decision Matrix State
  const [willStatus, setWillStatus] = useState<"no-will" | "will-no-executor" | "will-has-executor">(
    "no-will"
  );
  const [assetType, setAssetType] = useState<"real-estate" | "movable-only">(
    "real-estate"
  );
  const [heirConsensus, setHeirConsensus] = useState<"all-agree" | "disputed">(
    "all-agree"
  );

  const currentScenario =
    ADMIN_SCENARIOS.find((s) => s.id === activeTab) || ADMIN_SCENARIOS[0];

  // Dynamic calculation of recommended court remedy
  let recommendationTitle = "Letters of Administration under Section 218 ISA";
  let recommendationBadge = "Standard Intestate Remedy";
  let courtForum = "District Court (or High Court Ordinary Original Jurisdiction)";
  let keyStatute = "Indian Succession Act, 1925 ss. 218, 278 & 291";
  let timeline = "6 to 12 Months (Uncontested with NoC from all heirs)";
  let analysisText =
    "Because the deceased passed away without a Will leaving immovable property or bank lockers, a Succession Certificate under Section 370 is legally invalid. An application for Letters of Administration under Section 218 must be filed in the competent civil court.";

  if (willStatus === "will-has-executor" && assetType === "real-estate") {
    recommendationTitle = "Probate of Will under Section 222 & 276 ISA";
    recommendationBadge = "Executor Testamentary Petition";
    courtForum = "District Judge or High Court (Bombay, Calcutta, Madras)";
    keyStatute = "Indian Succession Act, 1925 ss. 213, 222 & 276";
    timeline = "5 to 9 Months (Uncontested)";
    analysisText =
      "A valid Will exists with a living nominated executor. The named executor holds the exclusive legal standing to apply for Probate under Section 222, proving the authenticity of the Will under court seal.";
  } else if (willStatus === "will-no-executor") {
    recommendationTitle = "Letters of Administration with Will Annexed (s. 232)";
    recommendationBadge = "Cum Testamento Annexo";
    courtForum = "District Court or High Court Original Jurisdiction";
    keyStatute = "Indian Succession Act, 1925 ss. 232, 234 & 278";
    timeline = "7 to 14 Months";
    analysisText =
      "The deceased left a valid Will, but failed to appoint an executor (or the executor died or renounced). Under Section 232, universal or residuary legatees can petition for Letters of Administration with the Will Annexed.";
  } else if (willStatus === "no-will" && assetType === "movable-only") {
    recommendationTitle = "Succession Certificate (s. 370) or Letters of Admin";
    recommendationBadge = "Movable Financial Assets";
    courtForum = "District Court / Senior Civil Judge";
    keyStatute = "Indian Succession Act, 1925 Part X (ss. 370 - 390)";
    timeline = "4 to 8 Months";
    analysisText =
      "If the estate consists exclusively of debts, listed bank balances, provident funds, and demat shares with no immovable property or physical bank locker, a Succession Certificate under Section 370 is cost-effective.";
  }

  if (heirConsensus === "disputed") {
    timeline = "12 to 24+ Months (Testamentary Suit Procedure)";
  }

  return (
    <div className="w-full my-16 sm:my-20">
      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#F4EFE6] rounded-2xl border border-[#172228]/10 mb-8 max-w-4xl">
        {ADMIN_SCENARIOS.map((scenario) => {
          const isActive = activeTab === scenario.id;
          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() => setActiveTab(scenario.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-white text-[#111827] shadow-xs"
                  : "text-[#55636D] hover:text-[#111827] hover:bg-white/60"
              }`}
            >
              {scenario.icon === "building" && <Building2 className="w-4 h-4 text-[#C65378]" />}
              {scenario.icon === "lock" && <Lock className="w-4 h-4 text-[#C65378]" />}
              {scenario.icon === "file" && <FileText className="w-4 h-4 text-[#C65378]" />}
              {scenario.icon === "globe" && <Globe2 className="w-4 h-4 text-[#C65378]" />}
              <span>{scenario.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Detailed Card */}
      <div className="bg-white rounded-[28px] border border-[#172228]/10 p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-12">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-8 pb-8 border-b border-[#172228]/10">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.16em] text-[#C65378] mb-2">
              Case Study &amp; Statutory Roadmap
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold text-[#111827] mb-3 leading-snug">
              {currentScenario.heading}
            </h3>
            <p className="text-[15px] sm:text-[16px] text-[#49585F] leading-relaxed">
              {currentScenario.challengeSummary}
            </p>
          </div>
          <div className="lg:w-80 shrink-0 bg-[#FAF7F0] rounded-2xl p-5 border border-[#172228]/10">
            <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#55636D] mb-1">
              Governing Statute
            </div>
            <div className="text-xs font-semibold text-[#111827] mb-3">
              {currentScenario.statutoryAuthority}
            </div>
            <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#55636D] mb-1">
              Court Remedy
            </div>
            <div className="text-xs font-bold text-[#C65378]">
              {currentScenario.recommendedPetition}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7">
            <h4 className="text-sm font-bold uppercase tracking-[0.12em] text-[#111827] mb-3">
              Statutory Mechanism &amp; High Court Procedure
            </h4>
            <p className="text-[14.5px] leading-[1.7] text-[#374151] mb-5">
              {currentScenario.legalMechanism}
            </p>
            <div className="p-4 rounded-xl bg-[#FAF7F0] border-l-4 border-[#C65378] text-xs leading-[1.6] text-[#49585F]">
              <strong className="text-[#111827]">High Court Verification:</strong> Every petition drafted by AMA Legal Solutions undergoes strict jurisdictional assessment under Sections 218, 232, and 278 to eliminate procedural delays and ensure smooth administration bond execution under Section 291.
            </div>
          </div>
          <div className="md:col-span-5 bg-white p-5 rounded-2xl border border-[#172228]/10">
            <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#111827] mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#047857]" />
              <span>Mandatory Filing Documents</span>
            </h4>
            <ul className="space-y-2.5">
              {currentScenario.checklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs leading-[1.55] text-[#49585F]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive 3-Question Eligibility & Court Remedy Calculator */}
      <div className="bg-[#172228] text-white rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-[0_12px_40px_rgba(23,34,40,0.2)]">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-[#C65378] text-xs font-bold tracking-[0.16em] uppercase mb-2">
            <Scale className="w-4 h-4" />
            <span>Interactive Diagnostic Tool</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2 leading-tight">
            Check Your Court Petition: Probate, Letters of Admin or Succession Certificate?
          </h3>
          <p className="text-sm text-gray-300">
            Answer 3 quick statutory questions to determine the exact legal remedy required by Indian civil courts:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Questions Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Question 1 */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                1. Did the deceased leave a valid Will?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { value: "no-will", label: "No (Died Intestate)" },
                  { value: "will-no-executor", label: "Will Exists, No Executor" },
                  { value: "will-has-executor", label: "Will with Named Executor" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setWillStatus(opt.value as any)}
                    className={`px-3 py-3 rounded-xl text-xs font-semibold border transition-all text-left cursor-pointer ${
                      willStatus === opt.value
                        ? "bg-[#C65378] border-[#C65378] text-white"
                        : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2 */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                2. What estate assets require transfer?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { value: "real-estate", label: "Immovable Property or Bank Locker" },
                  { value: "movable-only", label: "Only Bank Accounts, Shares & FDs" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAssetType(opt.value as any)}
                    className={`px-3.5 py-3 rounded-xl text-xs font-semibold border transition-all text-left cursor-pointer ${
                      assetType === opt.value
                        ? "bg-[#C65378] border-[#C65378] text-white"
                        : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3 */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                3. Do all legal heirs consent to the administration?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { value: "all-agree", label: "Yes, Unanimous Consensus & NoC" },
                  { value: "disputed", label: "No, Dispute or Caveat Expected" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setHeirConsensus(opt.value as any)}
                    className={`px-3.5 py-3 rounded-xl text-xs font-semibold border transition-all text-left cursor-pointer ${
                      heirConsensus === opt.value
                        ? "bg-[#C65378] border-[#C65378] text-white"
                        : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Diagnostic Result Card */}
          <div className="lg:col-span-5 bg-black/40 rounded-2xl p-6 border border-white/10">
            <div className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#C65378]/20 text-[#f395b4] border border-[#C65378]/30 mb-3">
              {recommendationBadge}
            </div>
            <h4 className="text-xl font-bold text-white mb-2 leading-snug">
              {recommendationTitle}
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              {analysisText}
            </p>

            <div className="space-y-2.5 border-t border-white/10 pt-4 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Jurisdiction:</span>
                <span className="font-semibold text-gray-200 text-right">{courtForum}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Statutory Section:</span>
                <span className="font-semibold text-gray-200 text-right">{keyStatute}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Estimated Timeline:</span>
                <span className="font-semibold text-[#34D399] text-right">{timeline}</span>
              </div>
              {heirConsensus === "disputed" && (
                <div className="flex items-center gap-1.5 p-2 rounded bg-amber-950/40 border border-amber-500/30 text-amber-200 text-[11px]">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  <span>Notice: Contested petitions convert into testamentary suits under Section 295.</span>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-semibold py-3 transition-colors"
              >
                <span>Consult AMA Legal Solutions Advocates</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
