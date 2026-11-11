"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
  Scale,
  Building,
  UserCheck,
  Lock,
  Sparkles,
  HelpCircle,
  FileCheck,
  RefreshCw,
  Landmark,
  Check,
  Building2,
  Info,
  Gavel,
  Calculator,
  Copy,
  CheckCheck,
  Users,
  FileText,
  Layers,
  History,
  GitBranch,
  Search,
  FileSpreadsheet,
  AlertOctagon,
  Eye,
  FileSignature,
  Stethoscope,
  HeartPulse,
  Brain,
  ShieldAlert,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Legal Framework: Undue Influence & Free Will" },
  { id: "interactive-scorer", label: "2. Free Undue Influence & Mental Capacity Scorer" },
  { id: "section-61-vs-59", label: "3. Section 61 vs Section 59: Free Agency & Sound Mind" },
  { id: "fiduciary-dominance", label: "4. Fiduciary Dominance: Caregivers & Legal Agents" },
  { id: "medical-evidence-matrix", label: "5. Medical Evidence Matrix & Standardized MMSE Scores" },
  { id: "persuasion-vs-coercion", label: "6. Lawful Persuasion vs Unlawful Coercion Comparison" },
  { id: "kavita-kanwar-doctrine", label: "7. Active Participation: The Kavita Kanwar Doctrine" },
  { id: "step-by-step-sop", label: "8. Step-by-Step SOP: Proving or Defending Will Contests" },
  { id: "case-studies", label: "9. Practical Court Case Studies: Mumbai, Delhi & Bengaluru" },
  { id: "caveat-pleadings-checklist", label: "10. Caveat Pleading Grounds & Evidence Preservation" },
  { id: "institutional-profile", label: "11. Institutional Profile: High Court Testamentary Suits" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions: Undue Influence & Capacity" },
  { id: "statutory-citations", label: "13. Statutory Citations & Judicial Evidence Checkpoints" },
];

const PRECEDENTS = [
  {
    id: "venkatachala",
    title: "H. Venkatachala Iyengar v. B.N. Thimmajamma (1959) AIR 443 SC",
    bench: "Supreme Court of India (Constitution Bench)",
    scenario: "Propounder claimed under disputed Will while natural legal heirs were excluded without justification",
    ratio: "The propounder of a Will must establish due execution, attestation, and sound disposing mind. If suspicious circumstances exist (such as active participation by the propounder or unnatural disposition), the court conscience must be satisfied before probate can be granted.",
    keyTakeaway: "Propounder bears the legal burden of removing all legitimate suspicious circumstances.",
  },
  {
    id: "afsar-shaikh",
    title: "Afsar Shaikh & Anr. v. Soleman Bibi & Ors. (1976) 2 SCC 142",
    bench: "Supreme Court of India",
    scenario: "Challenger alleged transaction was vitiated by undue influence without stating specific particulars",
    ratio: "Under Order 6 Rule 4 CPC, general allegations of fraud or undue influence cannot be entertained. The caveator must specifically plead the fiduciary position, the exact coercion, and how free agency was destroyed.",
    keyTakeaway: "Vague allegations fail in court. Exact facts of dominance and coercion must be pleaded.",
  },
  {
    id: "kavita-kanwar",
    title: "Kavita Kanwar v. Pamela Mehta & Ors. (2021) 11 SCC 209",
    bench: "Supreme Court of India",
    scenario: "Daughter who was sole major beneficiary engaged the draftsman, brought witnesses, and oversaw execution",
    ratio: "Active and dominating participation by a major beneficiary in the preparation, drafting, and execution of a Will to the total exclusion of other natural heirs raises a grave suspicious circumstance requiring strict proof.",
    keyTakeaway: "Beneficiaries must maintain strict distance from the drafting and execution process.",
  },
  {
    id: "subhas-chandra",
    title: "Subhas Chandra Das Mushib v. Ganga Prasad Das Mushib (1967) AIR 878 SC",
    bench: "Supreme Court of India",
    scenario: "Grandfather gifted property to favourite grandson; other relatives alleged undue influence",
    ratio: "Mere persuasion, affection, or family preference does not constitute undue influence. To invalidate a disposition under Section 16 Contract Act and Section 61 ISA, the challenger must establish that the influencer's will overpowered the testator's mind.",
    keyTakeaway: "Affectionate persuasion is lawful. Only overpowering coercion invalidates a Will.",
  },
];

const FAQS = [
  {
    q: "What constitutes undue influence under Section 61 of the Indian Succession Act?",
    a: "Under Section 61 of the Indian Succession Act, 1925, a Will or any part of a Will obtained through fraud, coercion, or importunity that deprives the testator of their free agency is completely void. Undue influence requires proving that the testator's mind was overcome by moral or physical coercion, transforming the Will into the desire of the influencer rather than the free volition of the testator.",
  },
  {
    q: "What is the legal difference between lawful persuasion and unlawful coercion?",
    a: "As held by the Supreme Court in Subhas Chandra Das Mushib v. Ganga Prasad Das Mushib (1967), mere appeal to affection, tears, family devotion, or fair persuasion does not constitute undue influence. Persuasion is lawful as long as the testator remains a free agent capable of refusing. Coercion or undue influence becomes unlawful only when pressure overbears the independent will of the testator so they execute the document because they cannot resist.",
  },
  {
    q: "Can a Will leaving property to a full-time nurse or caregiver be challenged?",
    a: "Yes. A deathbed or late-life Will leaving substantial estate to a full-time caregiver while disinheriting natural children creates heavy suspicious circumstances under H. Venkatachala Iyengar v. B.N. Thimmajamma (1959). The propounder must prove the testator understood the nature and effect of the dispositions, was not isolated from family, and had independent legal and medical advice.",
  },
  {
    q: "What are the essential elements of testamentary capacity under Section 59 ISA?",
    a: "Under Section 59 of the Indian Succession Act and the landmark Banks v. Goodfellow test adopted by Indian courts, the testator must possess a sound disposing mind: (1) understanding the nature of the act and its effects, (2) understanding the extent of their property, and (3) comprehending and appreciating the claims of natural heirs to which they ought to give effect.",
  },
  {
    q: "What is the Kavita Kanwar doctrine regarding active participation by beneficiaries?",
    a: "In Kavita Kanwar v. Pamela Mehta (2021) 11 SCC 209, the Supreme Court affirmed that where a primary beneficiary takes an active, dominating role in the preparation, drafting, engaging of lawyers, and execution of a Will that yields them disproportionate benefits to the exclusion of other natural heirs, this constitutes a grave suspicious circumstance that the propounder must dispel with cogent evidence.",
  },
  {
    q: "Why does Order 6 Rule 4 CPC require specific particulars in undue influence pleadings?",
    a: "In Afsar Shaikh v. Soleman Bibi (1976) 2 SCC 142, the Supreme Court ruled that a general allegation of undue influence is insufficient in law. Under Order 6 Rule 4 of the Code of Civil Procedure (CPC), the caveator must plead specific facts: the nature of the relationship, how the beneficiary held dominance over the testator's mind, the exact coercion or importunity practiced, and how free agency was destroyed.",
  },
  {
    q: "What medical evidence is most persuasive in proving lack of testamentary capacity?",
    a: "Contemporaneous medical records created on or near the execution date hold decisive weight. Key evidence includes standardized cognitive assessments like the Mini-Mental State Examination (MMSE < 24) or MoCA, neurological consultation notes documenting advanced dementia or delirium, ICU administration of sedative medications, and testimony of the treating physician versus a generic fitness certificate.",
  },
  {
    q: "Who bears the burden of proof when a Will is challenged for undue influence?",
    a: "The initial burden of establishing due execution, attestation under Section 63 ISA, and sound disposing mind under Section 59 lies squarely upon the propounder (H. Venkatachala Iyengar). If suspicious circumstances are present, the propounder must dispel them. However, if due execution and capacity are established, the specific allegation of undue influence under Section 61 must be proven by the party alleging it.",
  },
];

export default function UndueInfluenceRiskScorerClient() {
  const { status } = useSession();
  const router = useRouter();

  const handleStartDraft = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (status === "authenticated") {
      router.push("/start/dashboard");
    } else {
      window.dispatchEvent(new Event(OPEN_SIGNUP_EVENT));
    }
  };

  const [activeId, setActiveId] = useState<string>("statutory-foundation");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedCaveat, setCopiedCaveat] = useState<boolean>(false);
  const [copiedMedicalChecklist, setCopiedMedicalChecklist] = useState<boolean>(false);

  // Diagnostic Wizard State (7 Core Evidentiary Parameters)
  const [fiduciaryRole, setFiduciaryRole] = useState<
    "caregiver_nurse" | "poa_financial_agent" | "isolated_relative" | "spiritual_advisor" | "natural_child" | "equal_independent"
  >("caregiver_nurse");

  const [cognitiveState, setCognitiveState] = useState<
    "bedridden_icu" | "documented_dementia" | "elderly_frail_lucid" | "fully_sound_active"
  >("bedridden_icu");

  const [socialIsolation, setSocialIsolation] = useState<
    "complete_isolation" | "monitored_access" | "assisted_open_family" | "independent_living"
  >("complete_isolation");

  const [activeParticipation, setActiveParticipation] = useState<
    "drafted_and_in_room" | "arranged_scribe_witnesses" | "present_in_house" | "completely_excluded"
  >("drafted_and_in_room");

  const [dispositionNature, setDispositionNature] = useState<
    "total_disinheritance" | "disproportionate_favored" | "unequal_explained" | "natural_equal"
  >("total_disinheritance");

  const [medicalCertification, setMedicalCertification] = useState<
    "no_certificate" | "generic_gp_note" | "specialist_neuro_mmse"
  >("no_certificate");

  const [executionTimeline, setExecutionTimeline] = useState<
    "under_30_days" | "one_to_six_months" | "over_six_months"
  >("under_30_days");

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-100px 0px -40% 0px",
      threshold: 0.05,
    });

    const elements = document.querySelectorAll("section[id], div[id].scroll-target");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const handleReset = () => {
    setFiduciaryRole("caregiver_nurse");
    setCognitiveState("bedridden_icu");
    setSocialIsolation("complete_isolation");
    setActiveParticipation("drafted_and_in_room");
    setDispositionNature("total_disinheritance");
    setMedicalCertification("no_certificate");
    setExecutionTimeline("under_30_days");
  };

  // Comprehensive Risk Computation Engine
  // Pillar 1: Fiduciary Dominance & Isolation (Max 30)
  let fiduciaryScore = 0;
  if (fiduciaryRole === "caregiver_nurse") fiduciaryScore += 16;
  else if (fiduciaryRole === "poa_financial_agent") fiduciaryScore += 15;
  else if (fiduciaryRole === "isolated_relative") fiduciaryScore += 12;
  else if (fiduciaryRole === "spiritual_advisor") fiduciaryScore += 14;
  else if (fiduciaryRole === "natural_child") fiduciaryScore += 6;
  else fiduciaryScore += 2;

  if (socialIsolation === "complete_isolation") fiduciaryScore += 14;
  else if (socialIsolation === "monitored_access") fiduciaryScore += 10;
  else if (socialIsolation === "assisted_open_family") fiduciaryScore += 4;
  else fiduciaryScore += 0;
  fiduciaryScore = Math.min(30, fiduciaryScore);

  // Pillar 2: Cognitive Vulnerability & Health (Max 30)
  let healthScore = 0;
  if (cognitiveState === "bedridden_icu") healthScore += 18;
  else if (cognitiveState === "documented_dementia") healthScore += 17;
  else if (cognitiveState === "elderly_frail_lucid") healthScore += 8;
  else healthScore += 2;

  if (medicalCertification === "no_certificate") healthScore += 12;
  else if (medicalCertification === "generic_gp_note") healthScore += 7;
  else healthScore += 0;
  healthScore = Math.min(30, healthScore);

  // Pillar 3: Active Beneficiary Participation (Max 20)
  let participationScore = 0;
  if (activeParticipation === "drafted_and_in_room") participationScore += 20;
  else if (activeParticipation === "arranged_scribe_witnesses") participationScore += 14;
  else if (activeParticipation === "present_in_house") participationScore += 7;
  else participationScore += 1;

  // Pillar 4: Disposition Naturalness & Timing (Max 20)
  let dispositionScore = 0;
  if (dispositionNature === "total_disinheritance") dispositionScore += 12;
  else if (dispositionNature === "disproportionate_favored") dispositionScore += 8;
  else if (dispositionNature === "unequal_explained") dispositionScore += 3;
  else dispositionScore += 0;

  if (executionTimeline === "under_30_days") dispositionScore += 8;
  else if (executionTimeline === "one_to_six_months") dispositionScore += 4;
  else dispositionScore += 1;
  dispositionScore = Math.min(20, dispositionScore);

  const totalRiskScore = Math.min(100, fiduciaryScore + healthScore + participationScore + dispositionScore);

  let riskCategory = "CRITICAL WILL CONTEST RISK";
  let riskBadgeColor = "bg-rose-100 text-rose-800 border-rose-300";
  let riskVerdict = "Extreme Vulnerability Under Section 61 ISA & Afsar Shaikh SC";
  let riskDescription =
    "The combination of fiduciary dominance, profound physical vulnerability, total exclusion of natural heirs, and active beneficiary participation creates an overwhelming presumption of suspicious circumstances in High Court probate proceedings.";
  let burdenAnalysis =
    "Under H. Venkatachala Iyengar (1959 SC), the propounder faces an insurmountable legal burden to dispel these suspicious circumstances before any court conscience can be satisfied.";
  let actionAdvice =
    "Caveators have strong grounds to file an urgent Caveat under Section 284 ISA in the High Court and request impounding of medical records and hospital registers.";

  if (totalRiskScore < 36) {
    riskCategory = "LOW CONTEST RISK";
    riskBadgeColor = "bg-emerald-100 text-emerald-800 border-emerald-300";
    riskVerdict = "Legally Robust & Enforceable Disposition";
    riskDescription =
      "The testator maintained independent cognitive volition, was surrounded by open family communication, experienced zero beneficiary interference, and executed the Will with valid medical substantiation.";
    burdenAnalysis =
      "Any challenger alleging undue influence bears the heavy legal burden under Order 6 Rule 4 CPC to prove specific coercion, which is highly unlikely to succeed on these facts.";
    actionAdvice =
      "Ensure the original registered Will is stored safely in a fireproof bank locker. Secure certified doctor fitness records to foreclose frivolous objections.";
  } else if (totalRiskScore < 70) {
    riskCategory = "MODERATE SUSPICION RISK";
    riskBadgeColor = "bg-amber-100 text-amber-800 border-amber-300";
    riskVerdict = "Contested Probate Probable (Suspicious Factors Present)";
    riskDescription =
      "While outright coercion may not be immediately obvious, age-related frailty, unequal distribution, or partial beneficiary involvement create actionable grounds for disgruntled heirs to enter caveats.";
    burdenAnalysis =
      "The testamentary court will demand strict cross-examination of attesting witnesses and treating physicians to verify that the testator possessed a sound disposing mind.";
    actionAdvice =
      "If defending the Will, assemble video recordings of execution, bank transaction histories, and contemporaneous treating physician notes immediately.";
  }

  const copyCaveatToClipboard = () => {
    const text = `SAMPLE CAVEAT OBJECTION GROUNDS UNDER ORDER 6 RULE 4 CPC & SECTION 61 ISA
1. The alleged Will dated [Date] was executed when the deceased was in a state of severe physical infirmity, suffering from [Dementia / Bedridden Coma / ICU hospitalization], devoid of a sound disposing mind under Section 59 of the Indian Succession Act, 1925.
2. The propounder [Name of Beneficiary] stood in an active fiduciary relationship as [Caregiver / POA Holder / Exclusive Attendant], dominating the will of the deceased to the total exclusion of natural legal heirs under Section 16 of the Indian Contract Act, 1872.
3. The deceased was kept in complete physical and social isolation, denying family members access, and the propounder actively participated in procuring the drafting advocate and attesting witnesses, directly attracting the Supreme Court doctrine in Kavita Kanwar v. Pamela Mehta (2021) 11 SCC 209.
4. The disposition is completely inofficious and unnatural, leaving 100% of the estate to an unrelated attendant without any cogent explanation, violating the principles of H. Venkatachala Iyengar v. B.N. Thimmajamma (1959 AIR 443 SC).`;
    navigator.clipboard.writeText(text);
    setCopiedCaveat(true);
    setTimeout(() => setCopiedCaveat(false), 3000);
  };

  const copyMedicalChecklistToClipboard = () => {
    const text = `EVIDENTIARY MEDICAL CHECKLIST: PROVING OR DEFENDING TESTAMENTARY CAPACITY
1. Hospital Discharge Summaries within 60 days before and after Will execution date.
2. Treating Neurologist or Psychiatrist clinical consultation notes and diagnosis.
3. Standardized Cognitive Test Score: Mini-Mental State Examination (MMSE) or MoCA.
4. Daily ICU / Nursing Medication Chart (check for sedatives, morphine, antipsychotics).
5. Contemporaneous Doctor Fitness Certificate recorded on the exact day of Will signing.
6. Doctor's clinical notes confirming lucid interval if degenerative dementia was diagnosed.
7. Sub-Registrar Home Visit Book 3 attendance records and biometric capture log.
8. Unedited, high-definition video recording of Will reading and testator confirmation.`;
    navigator.clipboard.writeText(text);
    setCopiedMedicalChecklist(true);
    setTimeout(() => setCopiedMedicalChecklist(false), 3000);
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Brand Navy Background)
          ========================================================================= */}
      <section className="relative bg-[#172228] text-white pt-10 pb-16 sm:pt-14 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Statutory Authority Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold tracking-wider uppercase text-rose-200 mb-6">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 • SECTIONS 59 &amp; 61</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Undue Influence &amp; Testamentary Capacity Scorer
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Assess contested Will risks under Section 61 of the Indian Succession Act. Evaluate
            fiduciary dominance, caregiver suspicion, cognitive illness, and court proof weight.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-scorer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Run Contest Risk Scorer</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Fight-Proof Will</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Full-Width Trust Signals)
          ========================================================================= */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 61 ISA</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                FREE AGENCY DEPRIVATION VOID
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Afsar Shaikh</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ORDER 6 RULE 4 CPC PLEADINGS
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Kavita Kanwar</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ACTIVE PARTICIPATION BAR
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">MMSE &lt; 24</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                COGNITIVE CAPACITY THRESHOLD
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content & Interactive Tool)
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)_300px] xl:grid-cols-[270px_minmax(0,1fr)_320px] 2xl:grid-cols-[290px_minmax(0,1fr)_340px] gap-6 xl:gap-8 items-start">
          {/* =====================================================================
              LEFT COLUMN: STICKY TABLE OF CONTENTS
              ===================================================================== */}
          <aside className="sticky top-24 hidden lg:block space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-xs font-black tracking-wider uppercase text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>TABLE OF CONTENTS</span>
              </div>
              <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 text-xs">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block py-1.5 px-2.5 rounded-lg transition-colors leading-snug ${
                        isActive
                          ? "bg-rose-50 text-[#C65378] font-bold border-l-2 border-[#C65378]"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Statutory Compliance Badge */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#172228]">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>Legal Defense Office</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Sections 59 and 61 of the Indian Succession Act, 1925, Section 16 of the
                Contract Act, and Order 6 Rule 4 CPC. Backed by Supreme Court rulings in Afsar Shaikh and
                Kavita Kanwar.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE TOOL
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: UNDUE INFLUENCE &amp; TESTAMENTARY CAPACITY</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Lawful Persuasion vs Unlawful Coercion:</strong> Indian law allows family
                    members to appeal to love, affection, or past care. Under Section 61 ISA, undue
                    influence occurs only when pressure overbears the testator&rsquo;s mind, destroying free
                    agency.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Caregivers &amp; Deathbed Wills:</strong> When a bedridden senior bequeaths
                    valuable property to a full-time nurse, driver, or exclusive attendant weeks before death
                    while cutting off children, the Supreme Court presumes suspicious circumstances under H.
                    Venkatachala Iyengar.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Strict Pleading Rule:</strong> Under Order 6 Rule 4 CPC and Afsar Shaikh (1976
                    SC), general claims of fraud are rejected. Caveators must state exact dates, dominance
                    methods, and medical incapacities.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: THE SINGLE H2 TAG FOR THE PAGE */}
            <section id="statutory-foundation" className="space-y-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Framework: Undue Influence &amp; Free Will in India
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                In Indian estate jurisprudence, a Will is not a routine contract. It is the solemn
                declaration of a person who is no longer alive to confirm their intentions. Consequently,
                the Indian Succession Act, 1925 establishes two statutory pillars to preserve the sanctity
                of testamentary succession: Section 59, which mandates that the testator must possess a
                sound disposing mind, and Section 61, which enacts that any Will procured through fraud,
                coercion, or importunity taking away free agency is void.
              </p>

              {/* Image Asset Placement */}
              <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src="/images/undue-influence-testamentary-capacity-risk-scorer-og.jpg"
                    alt="Undue Influence and Testamentary Capacity Risk Scorer Section 61 ISA India"
                    width={1200}
                    height={675}
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-[#C65378]" />
                    <span className="font-semibold text-slate-800">
                      Litigation Risk Blueprint: Section 61 ISA &amp; Afsar Shaikh Pleading Test
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-500">
                    /tools/undue-influence-testamentary-capacity-risk-scorer
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Brain className="w-4 h-4 text-[#5F7E75]" />
                    <span>Section 59 ISA: Sound Disposing Mind</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Testamentary capacity requires understanding the nature of the act, the exact extent of
                    property, and the claims of natural heirs under Banks v. Goodfellow. A person who cannot
                    comprehend their assets due to illness, dementia, or intoxication cannot execute a valid
                    Will.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                    <Lock className="w-4 h-4 text-[#C65378]" />
                    <span>Section 61 ISA: Importunity &amp; Coercion</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Importunity means persistent entreaty or nagging pressure until the sick or exhausted
                    testator submits merely for peace. If moral or physical coercion deprives the maker of
                    the power to say no, the entire instrument is nullified.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE SCORER & CALCULATOR (H3) */}
            <section
              id="interactive-scorer"
              className="scroll-target rounded-3xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                    <Calculator className="w-4 h-4" />
                    <span>INTERACTIVE DIAGNOSTIC ENGINE</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    2. Free Undue Influence &amp; Mental Capacity Scorer
                  </h3>
                </div>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-600 self-start sm:self-center transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Reset Scorer</span>
                </button>
              </div>

              <div className="space-y-6">
                {/* Parameter 1: Fiduciary Position */}
                <div className="space-y-2.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C65378]" />
                    <span>1. Beneficiary Relationship &amp; Fiduciary Dominance</span>
                  </label>
                  <p className="text-xs text-slate-500">
                    Does the primary beneficiary stand in an active position of trust, dependence, or
                    authority over the testator?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {[
                      {
                        val: "caregiver_nurse",
                        label: "Full-Time Nurse / Paid Caregiver",
                        sub: "Highest fiduciary suspicion",
                      },
                      {
                        val: "poa_financial_agent",
                        label: "General Power of Attorney (GPA) Holder",
                        sub: "Complete financial dominance",
                      },
                      {
                        val: "isolated_relative",
                        label: "Single Sibling / Relative (Exclusive Care)",
                        sub: "Controlled physical access",
                      },
                      {
                        val: "spiritual_advisor",
                        label: "Spiritual Guru / Charitable Trust Head",
                        sub: "Moral influence & faith trust",
                      },
                      {
                        val: "natural_child",
                        label: "One of Several Natural Children",
                        sub: "Routine familial proximity",
                      },
                      {
                        val: "equal_independent",
                        label: "All Natural Legal Heirs Equally",
                        sub: "Zero fiduciary dominance",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setFiduciaryRole(opt.val as any)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          fiduciaryRole === opt.val
                            ? "bg-rose-50/70 border-[#C65378] text-[#172228] font-bold ring-1 ring-[#C65378]/20"
                            : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{opt.label}</span>
                          {fiduciaryRole === opt.val && (
                            <Check className="w-3.5 h-3.5 text-[#C65378]" />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 block mt-0.5 font-normal">
                          {opt.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Parameter 2: Physical & Mental State */}
                <div className="space-y-2.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-[#5F7E75]" />
                    <span>2. Physical Health &amp; Cognitive Infirmity at Execution</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {[
                      {
                        val: "bedridden_icu",
                        label: "Bedridden / ICU / Critical Terminal Illness",
                        sub: "Heavy analgesics or sedatives administered",
                      },
                      {
                        val: "documented_dementia",
                        label: "Documented Dementia / Severe Memory Loss",
                        sub: "Medical history of cognitive disorientation",
                      },
                      {
                        val: "elderly_frail_lucid",
                        label: "Aged 80+ & Physically Frail but Alert",
                        sub: "Conversant, aware of surrounding realities",
                      },
                      {
                        val: "fully_sound_active",
                        label: "Fully Mobile & Independent Mind",
                        sub: "Managing own banking and household affairs",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setCognitiveState(opt.val as any)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          cognitiveState === opt.val
                            ? "bg-emerald-50/70 border-[#5F7E75] text-[#172228] font-bold ring-1 ring-[#5F7E75]/20"
                            : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{opt.label}</span>
                          {cognitiveState === opt.val && (
                            <Check className="w-3.5 h-3.5 text-[#5F7E75]" />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 block mt-0.5 font-normal">
                          {opt.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Parameter 3: Living Arrangement & Social Isolation */}
                <div className="space-y-2.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#C65378]" />
                    <span>3. Social Isolation &amp; Family Access</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {[
                      {
                        val: "complete_isolation",
                        label: "Total Isolation (Family Blocked / Kept Away)",
                        sub: "Heirs not informed of illness or Will execution",
                      },
                      {
                        val: "monitored_access",
                        label: "Monitored Visits (Caregiver Always Present)",
                        sub: "No private conversation permitted with testator",
                      },
                      {
                        val: "assisted_open_family",
                        label: "Open Family Visits & Assisted Living",
                        sub: "Regular unhindered visits by relatives",
                      },
                      {
                        val: "independent_living",
                        label: "Independent Living with Unrestricted Freedom",
                        sub: "Testator lived on own terms with open social circle",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setSocialIsolation(opt.val as any)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          socialIsolation === opt.val
                            ? "bg-rose-50/70 border-[#C65378] text-[#172228] font-bold ring-1 ring-[#C65378]/20"
                            : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{opt.label}</span>
                          {socialIsolation === opt.val && (
                            <Check className="w-3.5 h-3.5 text-[#C65378]" />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 block mt-0.5 font-normal">
                          {opt.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Parameter 4: Kavita Kanwar Active Participation */}
                <div className="space-y-2.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                    <AlertOctagon className="w-4 h-4 text-amber-600" />
                    <span>4. Beneficiary Role in Will Preparation (Kavita Kanwar Factor)</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {[
                      {
                        val: "drafted_and_in_room",
                        label: "Engaged Draftsman, Dictated Terms &amp; In Room",
                        sub: "Active and dominant participation (grave suspicion)",
                      },
                      {
                        val: "arranged_scribe_witnesses",
                        label: "Arranged Witnesses &amp; Transportation to SRO",
                        sub: "Facilitated execution process personally",
                      },
                      {
                        val: "present_in_house",
                        label: "Present in House but Excluded from Room",
                        sub: "Passive presence during signing",
                      },
                      {
                        val: "completely_excluded",
                        label: "Completely Excluded; Independent Legal Advice",
                        sub: "Testator instructed lawyer privately",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setActiveParticipation(opt.val as any)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          activeParticipation === opt.val
                            ? "bg-amber-50/70 border-amber-500 text-[#172228] font-bold ring-1 ring-amber-500/20"
                            : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{opt.label}</span>
                          {activeParticipation === opt.val && (
                            <Check className="w-3.5 h-3.5 text-amber-600" />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 block mt-0.5 font-normal">
                          {opt.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Parameter 5: Disinheritance */}
                <div className="space-y-2.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                    <FileSignature className="w-4 h-4 text-[#C65378]" />
                    <span>5. Extent of Disinheritance (Inofficious Test)</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {[
                      {
                        val: "total_disinheritance",
                        label: "100% to Beneficiary; Children Completely Cut Off",
                        sub: "Zero share to natural legal heirs without justification",
                      },
                      {
                        val: "disproportionate_favored",
                        label: "Disproportionate Lion's Share to Beneficiary",
                        sub: "Nominal token bequests to legal heirs",
                      },
                      {
                        val: "unequal_explained",
                        label: "Unequal Division with Clear Valid Reasons",
                        sub: "Will recites specific prior settlements or estrangement",
                      },
                      {
                        val: "natural_equal",
                        label: "Natural Devolution or Equal Split",
                        sub: "Standard distribution reflecting statutory succession",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setDispositionNature(opt.val as any)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          dispositionNature === opt.val
                            ? "bg-rose-50/70 border-[#C65378] text-[#172228] font-bold ring-1 ring-[#C65378]/20"
                            : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{opt.label}</span>
                          {dispositionNature === opt.val && (
                            <Check className="w-3.5 h-3.5 text-[#C65378]" />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 block mt-0.5 font-normal">
                          {opt.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Parameter 6: Medical Certification */}
                <div className="space-y-2.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-[#5F7E75]" />
                    <span>6. Contemporaneous Medical Certification</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    {[
                      {
                        val: "no_certificate",
                        label: "Zero Medical Certificate",
                        sub: "Hospital records show delirium or confusion",
                      },
                      {
                        val: "generic_gp_note",
                        label: "Generic GP Fit to Sign Note",
                        sub: "No standardized cognitive MMSE test",
                      },
                      {
                        val: "specialist_neuro_mmse",
                        label: "Neurologist / Psychiatrist MMSE 26+",
                        sub: "Formal cognitive assessment recorded",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setMedicalCertification(opt.val as any)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          medicalCertification === opt.val
                            ? "bg-emerald-50/70 border-[#5F7E75] text-[#172228] font-bold ring-1 ring-[#5F7E75]/20"
                            : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{opt.label}</span>
                          {medicalCertification === opt.val && (
                            <Check className="w-3.5 h-3.5 text-[#5F7E75]" />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 block mt-0.5 font-normal">
                          {opt.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Parameter 7: Execution Timing */}
                <div className="space-y-2.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                    <History className="w-4 h-4 text-slate-700" />
                    <span>7. Execution Timing Prior to Testator&rsquo;s Demise</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    {[
                      {
                        val: "under_30_days",
                        label: "Under 30 Days (Deathbed Will)",
                        sub: "Executed on terminal bed / hospice",
                      },
                      {
                        val: "one_to_six_months",
                        label: "1 to 6 Months Before Demise",
                        sub: "During diagnosed progressive decline",
                      },
                      {
                        val: "over_six_months",
                        label: "Over 6 Months to Years Prior",
                        sub: "During stable health & routine life",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setExecutionTimeline(opt.val as any)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          executionTimeline === opt.val
                            ? "bg-slate-100 border-slate-700 text-[#172228] font-bold ring-1 ring-slate-700/20"
                            : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{opt.label}</span>
                          {executionTimeline === opt.val && (
                            <Check className="w-3.5 h-3.5 text-slate-800" />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 block mt-0.5 font-normal">
                          {opt.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* DYNAMIC SCORER RESULT CARD */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-[#172228] to-slate-800 text-white shadow-lg space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-rose-300">
                      JUDICIAL RISK ASSESSMENT
                    </span>
                    <h4 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                      {riskVerdict}
                    </h4>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl sm:text-4xl font-black text-rose-400">
                      {totalRiskScore}%
                    </div>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border mt-1 ${riskBadgeColor}`}
                    >
                      {riskCategory}
                    </span>
                  </div>
                </div>

                {/* Sub-Score Progress Bars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Fiduciary Dominance &amp; Isolation:</span>
                      <span className="font-bold text-white">
                        {Math.round((fiduciaryScore / 30) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700/70 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#C65378] h-full transition-all duration-500"
                        style={{ width: `${(fiduciaryScore / 30) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Cognitive Infirmity &amp; Medical:</span>
                      <span className="font-bold text-white">
                        {Math.round((healthScore / 30) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700/70 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#5F7E75] h-full transition-all duration-500"
                        style={{ width: `${(healthScore / 30) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Active Beneficiary Participation:</span>
                      <span className="font-bold text-white">
                        {Math.round((participationScore / 20) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700/70 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-500 h-full transition-all duration-500"
                        style={{ width: `${(participationScore / 20) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Disinheritance &amp; Deathbed Timing:</span>
                      <span className="font-bold text-white">
                        {Math.round((dispositionScore / 20) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700/70 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-rose-500 h-full transition-all duration-500"
                        style={{ width: `${(dispositionScore / 20) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs text-slate-200">
                  <p className="leading-relaxed">
                    <strong>Court Impact:</strong> {riskDescription}
                  </p>
                  <p className="leading-relaxed text-slate-300">
                    <strong>Burden Allocation:</strong> {burdenAnalysis}
                  </p>
                  <p className="leading-relaxed text-rose-200">
                    <strong>Recommended Next Step:</strong> {actionAdvice}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <Link
                    href="/services/high-court-testamentary-suit-contested-will-defense"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs sm:text-sm transition-all"
                  >
                    <Gavel className="w-4 h-4" />
                    <span>Retain High Court Testamentary Counsel</span>
                  </Link>
                  <button
                    onClick={handleStartDraft}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-[#C65378]" />
                    <span>Draft Fight-Proof Will</span>
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 3: SECTION 61 VS SECTION 59 (H3) */}
            <section id="section-61-vs-59" className="scroll-target space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                3. Section 61 vs Section 59: Free Agency &amp; Sound Mind
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Will contest litigation frequently blurs the distinction between lack of testamentary
                capacity (Section 59) and undue influence (Section 61). Although both lead to the
                nullification of the Will, they operate under distinct evidentiary legal standards in
                Indian probate courts.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Brain className="w-4 h-4 text-[#5F7E75]" />
                    <span>Section 59: Testamentary Incapacity</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#5F7E75] font-bold">•</span>
                      <span>The testator is mentally incapable of understanding their assets or legal heirs.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#5F7E75] font-bold">•</span>
                      <span>Caused by dementia, Alzheimer&rsquo;s, delirium, intoxication, or severe coma.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#5F7E75] font-bold">•</span>
                      <span>The initial burden is on the propounder to establish sound disposing mind.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#5F7E75] font-bold">•</span>
                      <span>Defeated by proving lucid intervals or contemporaneous doctor certifications.</span>
                    </li>
                  </ul>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Lock className="w-4 h-4 text-[#C65378]" />
                    <span>Section 61: Coercion &amp; Undue Influence</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C65378] font-bold">•</span>
                      <span>The testator may be mentally lucid, but their independent will is overpowered.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C65378] font-bold">•</span>
                      <span>Caused by fear, psychological isolation, continuous nagging, or dependence.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C65378] font-bold">•</span>
                      <span>Must be specifically pleaded under Order 6 Rule 4 CPC with date and mode.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C65378] font-bold">•</span>
                      <span>Defeated by showing independent legal counsel and open family communication.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 4: FIDUCIARY DOMINANCE & CAREGIVER SUSPICION (H3) */}
            <section id="fiduciary-dominance" className="scroll-target space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                4. Fiduciary Dominance: Caregivers &amp; Legal Agents
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Section 16 of the Indian Contract Act, 1872 defines undue influence when one party is in a
                position to dominate the will of another and uses that position to obtain an unfair
                advantage. In the context of Wills, Indian courts scrutinize situations where a person holds
                real or apparent authority, or stands in an active fiduciary relationship with an elderly
                testator.
              </p>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <Users className="w-4 h-4 text-[#C65378]" />
                  <span>The Caregiver Suspicion Checklist in Contested Wills</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="font-bold text-slate-900">1. Complete Physical Seclusion</div>
                    <p className="text-slate-600 leading-relaxed">
                      The senior citizen is relocated or kept in a secluded room; phone calls and visits by
                      children are systematically discouraged or monitored.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="font-bold text-slate-900">2. Financial Surrender &amp; GPA</div>
                    <p className="text-slate-600 leading-relaxed">
                      Chequebooks, net banking credentials, and Power of Attorney instruments are transferred
                      to the caregiver shortly before the Will is executed.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="font-bold text-slate-900">3. Sudden Dismissal of Old Staff</div>
                    <p className="text-slate-600 leading-relaxed">
                      Trusted long-term domestic helpers, drivers, and accountants are abruptly fired to
                      prevent external alarms from reaching family members.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="font-bold text-slate-900">4. Unknown Scribe &amp; Witnesses</div>
                    <p className="text-slate-600 leading-relaxed">
                      The drafting advocate and attesting witnesses are personal associates of the caregiver,
                      having zero prior acquaintance with the testator.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: MEDICAL EVIDENCE WEIGHT MATRIX (H3) */}
            <section id="medical-evidence-matrix" className="scroll-target space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                5. Medical Evidence Matrix &amp; Standardized MMSE Scores
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                When testamentary capacity is contested, Indian courts do not rely on speculation.
                Judicial weight depends strictly on the hierarchy of medical documentation, the timing of
                clinical examinations, and standardized cognitive scoring.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 sm:p-4 font-bold">Medical Record Category</th>
                      <th className="p-3.5 sm:p-4 font-bold">Cognitive Indicators</th>
                      <th className="p-3.5 sm:p-4 font-bold">Evidentiary Weight in Court</th>
                      <th className="p-3.5 sm:p-4 font-bold">Judicial Impact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        Formal MMSE Score &lt; 18 / MoCA &lt; 15
                      </td>
                      <td className="p-3.5 sm:p-4">Severe cognitive impairment; inability to register facts</td>
                      <td className="p-3.5 sm:p-4 font-bold text-rose-600">★★★★★ Conclusive (Decisive)</td>
                      <td className="p-3.5 sm:p-4">Strong presumption of incapacity under Section 59 ISA</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        ICU Charts: High Sedative / Morphine Dosing
                      </td>
                      <td className="p-3.5 sm:p-4">Severe somnolence, altered mental status, stupor</td>
                      <td className="p-3.5 sm:p-4 font-bold text-rose-600">★★★★★ Conclusive (Decisive)</td>
                      <td className="p-3.5 sm:p-4">Overturns Will signed while under intensive critical care</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        Treating Neurologist Clinical Consultation Note
                      </td>
                      <td className="p-3.5 sm:p-4">Documented vascular dementia or Alzheimer&rsquo;s progression</td>
                      <td className="p-3.5 sm:p-4 font-bold text-amber-600">★★★★☆ High Weight</td>
                      <td className="p-3.5 sm:p-4">Shifts burden to propounder to prove lucid interval</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        Sub-Registrar Endorsement with Video Capture
                      </td>
                      <td className="p-3.5 sm:p-4">Visual recording of testator answering questions coherently</td>
                      <td className="p-3.5 sm:p-4 font-bold text-emerald-600">★★★★☆ High Weight</td>
                      <td className="p-3.5 sm:p-4">Strong prima facie defense against hostile witnesses</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        Generic GP &ldquo;Fit to Sign&rdquo; Slip (No MMSE)
                      </td>
                      <td className="p-3.5 sm:p-4">Single-line slip without cognitive or physical tests</td>
                      <td className="p-3.5 sm:p-4 font-bold text-slate-500">★★☆☆☆ Low Weight</td>
                      <td className="p-3.5 sm:p-4">Easily discredited during cross-examination of doctor</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 6: LAWFUL PERSUASION VS UNLAWFUL COERCION (H3) */}
            <section id="persuasion-vs-coercion" className="scroll-target space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                6. Lawful Persuasion vs Unlawful Coercion Comparison
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Generic legal websites mistakenly advise that any influence invalidates a Will. The Supreme
                Court of India in Subhas Chandra Das Mushib (1967) categorically affirmed that persuasion,
                affection, and family preference are lawful. The crucial boundary lies between fair persuasion
                and overpowering coercion.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#FAF7F0] text-slate-900 border-b border-slate-200">
                    <tr>
                      <th className="p-3.5 sm:p-4 font-bold">Litigation Factor</th>
                      <th className="p-3.5 sm:p-4 font-bold text-emerald-700">Lawful Persuasion (Valid Will)</th>
                      <th className="p-3.5 sm:p-4 font-bold text-rose-700">Unlawful Coercion (Void Will)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Mental Agency</td>
                      <td className="p-3.5 sm:p-4">Testator retains full power to say no and chooses to give</td>
                      <td className="p-3.5 sm:p-4 text-rose-700 font-semibold">Testator submits because resistance is exhausted</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Motivation</td>
                      <td className="p-3.5 sm:p-4">Gratitude for care, devotion, affection, family loyalty</td>
                      <td className="p-3.5 sm:p-4 text-rose-700 font-semibold">Fear of abandonment, starvation, denial of medical care</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Legal Counsel</td>
                      <td className="p-3.5 sm:p-4">Testator consulted independent lawyer in private session</td>
                      <td className="p-3.5 sm:p-4 text-rose-700 font-semibold">Beneficiary brought their own advocate to hospital bed</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Family Knowledge</td>
                      <td className="p-3.5 sm:p-4">Family aware of testator&rsquo;s intentions during lifetime</td>
                      <td className="p-3.5 sm:p-4 text-rose-700 font-semibold">Will concealed until after funeral and sudden mutation</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Statutory Standing</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">Upheld under Section 59 ISA</td>
                      <td className="p-3.5 sm:p-4 text-rose-700 font-bold">Voided under Section 61 ISA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 7: ACTIVE PARTICIPATION & KAVITA KANWAR (H3) */}
            <section id="kavita-kanwar-doctrine" className="scroll-target space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                7. Active Participation: The Kavita Kanwar Doctrine
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                In Kavita Kanwar v. Pamela Mehta (2021) 11 SCC 209, the Supreme Court delivered an
                authoritative ruling on the doctrine of suspicious circumstances. When a beneficiary who
                takes a substantial share under a Will actively participates in its execution, the court
                presumes suspicion unless the propounder offers a completely clear explanation.
              </p>
              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3 text-xs sm:text-sm text-slate-800">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Key Principles Laid Down in Kavita Kanwar (2021 SC)</span>
                </div>
                <ul className="space-y-2 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-700 font-bold">1.</span>
                    <span>
                      <strong>Drafting Intermediation:</strong> If the sole or major beneficiary engages the
                      advocate, provides the text or instructions, and pays the fees, the Will is viewed with
                      intense suspicion.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-700 font-bold">2.</span>
                    <span>
                      <strong>Physical Presence in Execution Chamber:</strong> The presence of the favored
                      beneficiary in the room while the testator signs creates a presumption that the
                      testator was not acting freely.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-700 font-bold">3.</span>
                    <span>
                      <strong>Exclusion of Other Heirs:</strong> Total silence regarding why natural children
                      or a surviving spouse are cut off without provision will not be lightly accepted by
                      probate courts.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 8: STEP-BY-STEP SOP (H3) */}
            <section id="step-by-step-sop" className="scroll-target space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                8. Step-by-Step SOP: Proving or Defending Will Contests
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Whether you are challenging a deathbed caregiver Will or defending a genuine disposition
                against disgruntled relatives, follow this structured procedural litigation roadmap:
              </p>
              <div className="space-y-3">
                {[
                  {
                    step: "Step 1",
                    title: "Lodge Immediate Caveat Under Section 284 ISA",
                    desc: "File a formal Caveat in the High Court or District Court where probate is sought. This ensures no ex-parte probate or Letters of Administration can be granted without notice to you.",
                  },
                  {
                    step: "Step 2",
                    title: "Issue Legal Notice for Medical & Hospital Record Preservation",
                    desc: "Serve notices under Section 65B and BSA 2023 on treating hospitals and nursing homes to preserve ICU charts, nurse notes, and CCTV footage before records are purged.",
                  },
                  {
                    step: "Step 3",
                    title: "Draft Particularized Objections Under Order 6 Rule 4 CPC",
                    desc: "State specific dates of cognitive decline, the nature of caregiver dependence, and the exact instances of importunity to satisfy the Afsar Shaikh pleading threshold.",
                  },
                  {
                    step: "Step 4",
                    title: "Subpoena Scribe, Attesting Witnesses & Sub-Registrar",
                    desc: "Cross-examine attesting witnesses on whether they saw the testator sign, whether the beneficiary was in the room, and summon SRO Book 3 records under Order XVI CPC.",
                  },
                  {
                    step: "Step 5",
                    title: "Seek Forensic & Expert Medical Neurological Opinion",
                    desc: "Subject disputed signatures or shaky thumb impressions to forensic analysis under Section 72 BSA and present expert neurologist testimony on MMSE thresholds.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3.5"
                  >
                    <div className="px-2.5 py-1 rounded-lg bg-[#C65378]/10 text-[#C65378] font-bold text-xs shrink-0">
                      {item.step}
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 text-sm">{item.title}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 9: PRACTICAL COURT CASE STUDIES (H3) */}
            <section id="case-studies" className="scroll-target space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                9. Practical Court Case Studies: Mumbai, Delhi &amp; Bengaluru
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Review how Indian High Courts adjudicate real-world disputes involving undue influence,
                fiduciary caregivers, and deathbed dispositions:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#C65378]" />
                    <span>Mumbai High Court: Nurse Will</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> An 84-year-old widower bequeathed his South Mumbai flat to his
                    nurse 10 days before demise, excluding his daughter in the UK.
                  </p>
                  <p className="text-slate-700 font-semibold">
                    <strong>Verdict:</strong> Will voided under Section 61 ISA. Propounder failed to prove
                    testator was free from sedation; no independent legal advice was provided.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#5F7E75]" />
                    <span>Delhi High Court: GPA Dominance</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> Eldest son holding GPA executed Will for father suffering from
                    vascular dementia, taking 85% of commercial assets.
                  </p>
                  <p className="text-slate-700 font-semibold">
                    <strong>Verdict:</strong> Caveat allowed. Active participation by GPA holder attracted
                    Kavita Kanwar doctrine; hospital MMSE score of 14 proved incapacity.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-slate-700" />
                    <span>Bengaluru Civil Court: Upheld Will</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> Mother bequeathed house to younger son who cared for her.
                    Estranged son alleged undue influence and dementia.
                  </p>
                  <p className="text-slate-700 font-semibold">
                    <strong>Verdict:</strong> Will upheld. Mother had independent advocate, video
                    examination by neurologist, and recitals explaining prior family gifts.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: CAVEAT PLEADINGS & EVIDENCE PRESERVATION (H3) */}
            <section id="caveat-pleadings-checklist" className="scroll-target space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                10. Caveat Pleading Grounds &amp; Evidence Preservation Guide
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Use these verified model legal grounds when lodging a caveat objection or cross-examining
                a suspicious caregiver Will in Indian courts:
              </p>

              {/* Box 1: Copyable Caveat Grounds */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#C65378]">
                    <FileText className="w-4 h-4" />
                    <span>Model Caveat Grounds (Order 6 Rule 4 CPC &amp; Section 61 ISA)</span>
                  </div>
                  <button
                    onClick={copyCaveatToClipboard}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    {copiedCaveat ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Grounds</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-mono whitespace-pre-wrap leading-relaxed">
{`1. The alleged Will dated [Date] was executed when the deceased was in a state of severe physical infirmity, suffering from [Dementia / Bedridden Coma / ICU hospitalization], devoid of a sound disposing mind under Section 59 of the Indian Succession Act, 1925.
2. The propounder [Name of Beneficiary] stood in an active fiduciary relationship as [Caregiver / POA Holder / Exclusive Attendant], dominating the will of the deceased to the total exclusion of natural legal heirs under Section 16 of the Indian Contract Act, 1872.
3. The deceased was kept in complete physical and social isolation, denying family members access, and the propounder actively participated in procuring the drafting advocate and attesting witnesses, directly attracting the Supreme Court doctrine in Kavita Kanwar v. Pamela Mehta (2021) 11 SCC 209.
4. The disposition is completely inofficious and unnatural, leaving 100% of the estate to an unrelated attendant without any cogent explanation, violating the principles of H. Venkatachala Iyengar v. B.N. Thimmajamma (1959 AIR 443 SC).`}
                </div>
              </div>

              {/* Box 2: Copyable Medical Checklist */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#5F7E75]">
                    <Stethoscope className="w-4 h-4" />
                    <span>Evidence Preservation Checklist: Medical Records &amp; Capacity</span>
                  </div>
                  <button
                    onClick={copyMedicalChecklistToClipboard}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    {copiedMedicalChecklist ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Checklist</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-mono whitespace-pre-wrap leading-relaxed">
{`1. Hospital Discharge Summaries within 60 days before and after Will execution date.
2. Treating Neurologist or Psychiatrist clinical consultation notes and diagnosis.
3. Standardized Cognitive Test Score: Mini-Mental State Examination (MMSE) or MoCA.
4. Daily ICU / Nursing Medication Chart (check for sedatives, morphine, antipsychotics).
5. Contemporaneous Doctor Fitness Certificate recorded on the exact day of Will signing.
6. Doctor's clinical notes confirming lucid interval if degenerative dementia was diagnosed.
7. Sub-Registrar Home Visit Book 3 attendance records and biometric capture log.
8. Unedited, high-definition video recording of Will reading and testator confirmation.`}
                </div>
              </div>
            </section>

            {/* SECTION 11: INSTITUTIONAL PROFILE (H3) */}
            <section id="institutional-profile" className="scroll-target space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                11. Institutional Profile: High Court Testamentary Suits
              </h3>
              <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#172228] to-slate-900 text-white space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-300">
                  <Building className="w-4 h-4 text-[#C65378]" />
                  <span>AMA LEGAL SOLUTIONS • CONTESTED TESTAMENTARY SUITS</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white">
                  High Court Representation in Complex Probate &amp; Will Disputes
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Will contests involving undue influence, dementia, caregiver dominance, and fraudulent
                  attestation demand elite litigation strategy. AMA Legal Solutions represents clients in
                  the Supreme Court of India and High Courts across New Delhi, Mumbai, Bengaluru, Chennai,
                  Kolkata, and Chandigarh in testamentary suits, caveat challenges, and probate trials.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/services/high-court-testamentary-suit-contested-will-defense"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs transition-all"
                  >
                    <Gavel className="w-3.5 h-3.5" />
                    <span>Explore High Court Testamentary Defense</span>
                  </Link>
                  <Link
                    href="/about-us"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
                  >
                    <Award className="w-3.5 h-3.5 text-[#5F7E75]" />
                    <span>Meet Our Senior Testamentary Advocates</span>
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS (H3) */}
            <section id="frequently-asked-questions" className="scroll-target space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                12. Frequently Asked Questions: Undue Influence &amp; Capacity
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 font-bold text-slate-900 text-xs sm:text-sm hover:bg-slate-50 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 13: STATUTORY CITATIONS & PORTALS (H3) */}
            <section id="statutory-citations" className="scroll-target space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                13. Statutory Citations &amp; Judicial Evidence Checkpoints
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Consult verified central statutes and judicial authorities governing testamentary capacity,
                coercion, and burden of proof:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <a
                  href="https://www.indiacode.nic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Indian Succession Act, 1925 (India Code)
                    </div>
                    <span className="text-[11px] text-slate-500">
                      Sections 59, 61, 63 &amp; 284 Official Text
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#C65378]" />
                </a>
                <a
                  href="https://www.sci.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Supreme Court of India (Official Portal)
                    </div>
                    <span className="text-[11px] text-slate-500">
                      Judgments on Suspicious Circumstances &amp; Capacity
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#C65378]" />
                </a>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY CONVERSION SIDEBAR
              ===================================================================== */}
          <aside className="sticky top-24 hidden lg:block space-y-5">
            {/* Primary Action Card: High Court Suit */}
            <div className="rounded-2xl bg-gradient-to-br from-[#172228] to-slate-900 text-white p-5 shadow-md space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold tracking-wider uppercase border border-rose-500/30">
                <Gavel className="w-3 h-3 text-[#C65378]" />
                <span>HIGH COURT REPRESENTATION</span>
              </div>
              <h4 className="text-base font-extrabold text-white leading-snug">
                Facing a Contested Will or Caveat Challenge?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect with our senior testamentary advocates for immediate High Court caveat lodging,
                Order 6 Rule 4 CPC pleadings, and medical record preservation.
              </p>
              <Link
                href="/services/high-court-testamentary-suit-contested-will-defense"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shadow-md transition-all"
              >
                <span>Consult High Court Counsel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Secondary Action Card: Draft Safe Will */}
            <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#5F7E75]">
                <ShieldCheck className="w-4 h-4" />
                <span>PREVENT FUTURE CONTESTS</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                Draft a Fight-Proof, Legally Water-Tight Will
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our guided online Will drafting platform includes medical attestation protocols, Section 30
                clarity recitals, and videography guidelines.
              </p>
              <button
                onClick={handleStartDraft}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                <span>Draft Safe Will Online</span>
              </button>
            </div>

            {/* Quick Precedent Reference Card */}
            <div className="rounded-2xl bg-white border border-slate-200/90 p-4 shadow-xs space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-700">
                <BookOpen className="w-3.5 h-3.5 text-[#C65378]" />
                <span>KEY SUPREME COURT BENCHMARKS</span>
              </div>
              <div className="space-y-2.5 text-[11px] text-slate-600 divide-y divide-slate-100">
                {PRECEDENTS.map((p) => (
                  <div key={p.id} className="pt-2 first:pt-0 space-y-1">
                    <div className="font-bold text-slate-900">{p.title}</div>
                    <p className="leading-snug">{p.keyTakeaway}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
