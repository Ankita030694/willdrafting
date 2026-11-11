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
  Stethoscope,
  HeartPulse,
  Clock,
  ClipboardList,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "legal-foundation", label: "1. Legal Foundation: Supreme Court Living Will Rules" },
  { id: "interactive-checker", label: "2. Living Will Eligibility Checker Tool" },
  { id: "visual-guide", label: "3. Visual Guide: Advance Directive Safeguards" },
  { id: "sc-order-comparison", label: "4. SC 2018 vs SC 2023 Modified Order Comparison" },
  { id: "two-tier-board-flowchart", label: "5. Two-Tier Hospital Medical Board Protocol" },
  { id: "executor-proxy-rules", label: "6. Healthcare Proxy & Executor Safeguards" },
  { id: "end-of-life-care-decisions", label: "7. Permissible End-of-Life Medical Decisions" },
  { id: "custody-jmfc-registry", label: "8. JMFC & Sub-Registrar Custody Protocol" },
  { id: "step-by-step-sop", label: "9. Step-by-Step SOP: Execution to Enforcement" },
  { id: "practical-case-studies", label: "10. Real-World Case Studies: ICU Scenarios" },
  { id: "statutory-recital-checklist", label: "11. Statutory Recital Clauses & Checklist" },
  { id: "institutional-profile", label: "12. Healthcare Law Excellence: Institutional Desk" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions: Living Wills" },
  { id: "judicial-citations-portals", label: "14. Official Judicial Portals & Citations" },
];

const FAQS = [
  {
    q: "Who can make a Living Will in India?",
    a: "Any adult of sound mind aged 18 or older can make one. You must give free consent without force or fraud under Supreme Court rules.",
  },
  {
    q: "What changed in the Supreme Court 2023 Living Will order?",
    a: "The court made it simpler. You do not need a magistrate to sign it first. A notary public and two witnesses can attest your paper. Hospital boards now review cases within 48 hours.",
  },
  {
    q: "Can doctors follow my Living Will in an Indian hospital?",
    a: "Yes. The Supreme Court ruled under Article 21 that you have a right to die with dignity. Doctors must respect your written wishes when you face death with no hope of recovery.",
  },
  {
    q: "What medical treatments can I refuse in a Living Will?",
    a: "You can say no to breathing machines, chest pumps (CPR), feeding tubes, and kidney dialysis when death is near. You cannot ask for a poison shot. Active killing remains illegal.",
  },
  {
    q: "Who should I name as my healthcare agent or proxy?",
    a: "Pick a trusted family member or friend. You can name a main agent and a backup agent. They speak for you if you fall into a deep coma.",
  },
  {
    q: "Does a court judge need to sign my Living Will first?",
    a: "No. The 2023 order removed this rule. You only need a notary public or gazetted officer to attest it with two adult witnesses.",
  },
  {
    q: "Can I cancel or change my Living Will later?",
    a: "Yes. You can cancel or change your Living Will at any time while your mind is clear. Give written notice to your agent and your family doctor.",
  },
  {
    q: "How is a Living Will different from a property Will?",
    a: "A property Will shares your land, cash, and flats after you die. A Living Will works while you are alive in the hospital. It guides doctors on your medical care.",
  },
];

export default function LivingWillCheckerClient() {
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

  const [activeId, setActiveId] = useState<string>("legal-foundation");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedClause, setCopiedClause] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Diagnostic State for Questionnaire
  const [ageStatus, setAgeStatus] = useState<"adult_18_plus" | "minor_under_18">("adult_18_plus");
  const [mentalCapacity, setMentalCapacity] = useState<
    "sound_mind_lucid" | "temporary_illness_lucid_intervals" | "advanced_cognitive_impairment"
  >("sound_mind_lucid");
  const [voluntariness, setVoluntariness] = useState<"free_informed_consent" | "family_pressure_coercion">(
    "free_informed_consent"
  );
  const [treatmentScope, setTreatmentScope] = useState<
    "specific_treatments_defined" | "general_dignity_wish" | "includes_active_euthanasia"
  >("specific_treatments_defined");
  const [executorDesignation, setExecutorDesignation] = useState<
    "primary_and_alternate_named" | "only_primary_named" | "no_executor_named"
  >("primary_and_alternate_named");
  const [witnessAttestationPlan, setWitnessAttestationPlan] = useState<
    "two_witnesses_plus_notary_jmfc" | "two_witnesses_only_private" | "unwitnessed_private_note"
  >("two_witnesses_plus_notary_jmfc");
  const [custodyPlan, setCustodyPlan] = useState<
    "registered_with_custodian_and_hospital" | "private_home_lockbox_only"
  >("registered_with_custodian_and_hospital");

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
    setAgeStatus("adult_18_plus");
    setMentalCapacity("sound_mind_lucid");
    setVoluntariness("free_informed_consent");
    setTreatmentScope("specific_treatments_defined");
    setExecutorDesignation("primary_and_alternate_named");
    setWitnessAttestationPlan("two_witnesses_plus_notary_jmfc");
    setCustodyPlan("registered_with_custodian_and_hospital");
  };

  // Diagnostic Calculation Engine
  let complianceScore = 100;
  let statusBadge = "100% Supreme Court 2023 Compliant";
  let statusTitle = "Fully Eligible: Execution Ready Directive";
  let landmarkPrecedent = "Common Cause v. UOI (2023 Modified Order, MA No. 1699/2019)";
  let legalRationale =
    "You meet all legal tests under Article 21 and the 2023 Supreme Court order. You have full power to sign a Living Will before a notary public with two adult witnesses.";
  let actionRecommendation =
    "Draft your Living Will now. Name your main and backup agents, list the care you refuse, and sign before a notary public.";

  if (ageStatus === "minor_under_18") {
    complianceScore = 0;
    statusBadge = "Legally Ineligible: Below Majority Age";
    statusTitle = "Minors Cannot Make Living Wills";
    landmarkPrecedent = "Indian Majority Act, 1875 & Common Cause (2018) 5 SCC 1";
    legalRationale =
      "Under Indian law, a person must be at least 18 years old to make health choices for the future. Parents make choices for minors.";
    actionRecommendation =
      "You must wait until age 18 to sign a Living Will in India.";
  } else if (mentalCapacity === "advanced_cognitive_impairment") {
    complianceScore = 20;
    statusBadge = "Incapacitated: Lacks Clear Mind";
    statusTitle = "Cannot Sign a Valid Living Will";
    landmarkPrecedent = "Mental Healthcare Act, 2017 & Common Cause (2023)";
    legalRationale =
      "A person must have a clear, sound mind when signing. If deep memory loss or coma has set in, they cannot sign new legal papers.";
    actionRecommendation =
      "Doctors and next-of-kin must follow hospital rules when the patient cannot speak for themselves.";
  } else if (voluntariness === "family_pressure_coercion") {
    complianceScore = 25;
    statusBadge = "Invalid: Coercion or Family Pressure";
    statusTitle = "Consent Must Be Free and Unforced";
    landmarkPrecedent = "Article 21, Constitution of India";
    legalRationale =
      "Any paper signed under family force or money worry is void under Indian law. The choice must be 100% your own.";
    actionRecommendation =
      "Talk to a lawyer alone. Ensure the paper reflects your true wishes without family pressure.";
  } else if (treatmentScope === "includes_active_euthanasia") {
    complianceScore = 30;
    statusBadge = "Unlawful Clause: Mercy Killing Barred";
    statusTitle = "Lethal Injections are Not Allowed";
    landmarkPrecedent = "Aruna Ramchandra Shanbaug v. UOI (2011) 4 SCC 454";
    legalRationale =
      "Indian law allows you to stop useless machines. It does not allow lethal drugs or mercy killing under any rule.";
    actionRecommendation =
      "Remove any request for poison or lethal shots. Only refuse machines and tubes during terminal illness.";
  } else if (treatmentScope === "general_dignity_wish") {
    complianceScore = 70;
    statusBadge = "Procedural Risk: Vague Medical Scope";
    statusTitle = "Add Clear Medical Care Refusals";
    landmarkPrecedent = "Supreme Court Directive Parameters (2023 Order)";
    legalRationale =
      "Vague lines like 'let me die in peace' make ICU doctors unsure. You must name ventilators, CPR, and feeding tubes clearly.";
    actionRecommendation =
      "Name the exact machines you want to refuse when death cannot be stopped.";
  } else if (executorDesignation === "no_executor_named") {
    complianceScore = 65;
    statusBadge = "Deficient: Missing Healthcare Agent";
    statusTitle = "You Must Name an Agent";
    landmarkPrecedent = "Common Cause v. UOI (2023 Guidelines Part II)";
    legalRationale =
      "The Supreme Court rules say an agent must give consent to hospital boards when you are in a coma.";
    actionRecommendation =
      "Name at least one trusted person to carry out your wishes at the hospital.";
  } else if (executorDesignation === "only_primary_named") {
    complianceScore = 85;
    statusBadge = "Valid: Backup Agent Recommended";
    statusTitle = "Valid with Minor Backup Suggestion";
    landmarkPrecedent = "Modified Order 2023 (Paragraph 5)";
    legalRationale =
      "One agent is legal. But if that person falls ill or travels abroad, your paper could face delays.";
    actionRecommendation =
      "Name a backup agent who can step in if your main agent cannot act.";
  } else if (witnessAttestationPlan === "two_witnesses_only_private") {
    complianceScore = 75;
    statusBadge = "Needs Notary Public Seal";
    statusTitle = "Notary Attestation is Required";
    landmarkPrecedent = "Execution Protocol under 2023 Modified Order";
    legalRationale =
      "Signing before friends alone does not satisfy the Supreme Court. A notary public or gazetted officer must attest it.";
    actionRecommendation =
      "Take your signed paper and two witnesses to a local notary public for an official stamp.";
  } else if (witnessAttestationPlan === "unwitnessed_private_note") {
    complianceScore = 35;
    statusBadge = "Invalid Form: No Witnesses";
    statusTitle = "Fails Basic Legal Rules";
    landmarkPrecedent = "Common Cause v. UOI Execution Guidelines";
    legalRationale =
      "A private note with no witnesses has zero power in an Indian hospital. Doctors cannot rely on it.";
    actionRecommendation =
      "Use our standard Living Will draft with two witnesses and notary attestation.";
  } else if (custodyPlan === "private_home_lockbox_only") {
    complianceScore = 88;
    statusBadge = "Valid: Give Copies to Agent and Doctor";
    statusTitle = "Safe Custody Notice Recommended";
    landmarkPrecedent = "Supreme Court Protocol for Custody & Records";
    legalRationale =
      "Your paper is legal. But if doctors cannot find it in an emergency, they must put you on a breathing machine.";
    actionRecommendation =
      "Give copies to your agent and family doctor. Save a copy on your phone or health locker.";
  }

  const copyClauseToClipboard = () => {
    const clauseText = `STATUTORY RECITAL CLAUSE: ADVANCE MEDICAL DIRECTIVE (LIVING WILL) INDIA
Under Supreme Court Guidelines in Common Cause v. Union of India (2023 Modified Order)

"I, [Full Legal Name], aged [Age] years, residing at [Full Address], declare this as my ADVANCE MEDICAL DIRECTIVE.

1. REFUSAL OF FUTILE MEDICAL CARE: If I have an incurable illness, severe brain loss, or a deep coma with no hope of recovery, I direct that machines that only prolong dying shall be stopped. This includes breathing machines (ventilators), chest compressions (CPR), kidney dialysis, and tube feeding.

2. PALLIATIVE COMFORT CARE: Doctors must give me pain relief, comfort medicine, and gentle care at all times so I feel no pain.

3. APPOINTMENT OF HEALTHCARE EXECUTOR: I name [Primary Agent Name, Relationship, Contact] as my Primary Healthcare Agent. If my primary agent cannot act, I name [Backup Agent Name, Relationship, Contact] as my Backup Agent to convey my wishes to hospital doctors.

Signed on this [Date] day of [Month, Year] in the presence of two independent adult witnesses."`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `8-POINT SUPREME COURT 2023 LIVING WILL COMPLIANCE CHECKLIST
1. Age Check: You are 18 years or older with legal capacity.
2. Clear Mind: You have a sound, lucid mind when signing.
3. Free Consent: You make this choice without family pressure or force.
4. Specific Care: You name breathing machines, CPR, and dialysis clearly.
5. Pain Care: You ask for full pain relief and gentle comfort care.
6. Healthcare Proxy: You name a primary agent and a backup agent.
7. Two Witnesses: Two adult witnesses watch you sign.
8. Notary Seal: A notary public or gazetted officer attests the document.`;
    navigator.clipboard.writeText(checklistText);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
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
            <span>SUPREME COURT OF INDIA • CONSTITUTION BENCH 2023 GUIDELINES • ARTICLE 21</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Advance Medical Directive Eligibility Checker India
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Check your legal right to make a Living Will in India. Verify your age, sound mind, healthcare
            agent, and compliance with the 2023 Supreme Court rules.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-checker"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <GitBranch className="w-4 h-4" />
              <span>Run Eligibility Checker</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Advance Directive</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">SC Jan 2023 Order</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SIMPLE NOTARY ATTESTATION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Article 21</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                RIGHT TO DIE WITH DIGNITY
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Two-Tier Board</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                PRIMARY &amp; REVIEW DOCTOR PANELS
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">48-Hour Window</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                FAST HOSPITAL REVIEW
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
                <span>Supreme Court Guidelines</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed by Common Cause v. Union of India (2018) and the 2023 Order. Rooted in Article 21
                of the Constitution.
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
                <span>EXECUTIVE BRIEF: LIVING WILL &amp; ADVANCE DIRECTIVES IN INDIA</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Your Right to Dignity:</strong> The Supreme Court affirmed that dying with dignity
                    is a fundamental right under Article 21 of the Indian Constitution.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>No Court Approval Needed First:</strong> The 2023 order removed court hurdles. A
                    notary public and two witnesses can now attest your paper.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Fast 48-Hour Medical Review:</strong> Two hospital doctor boards must review your
                    case within 48 hours each. This prevents painful delays in the ICU.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Passive Choice Only:</strong> You can refuse useless machines and feeding tubes.
                    Active killing or poison shots remain strictly illegal in India.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (SINGLE H2 ON PAGE) */}
            <section id="legal-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>CONSTITUTIONAL MANDATE</span>
              </div>
              {/* Strict Screaming Frog Rule: Exactly 1 H2 tag per page, <= 70 chars, 0 em-dashes */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Foundation: Supreme Court Living Will Rules
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Modern hospital machines can keep a heart beating for weeks after the brain stops working.
                  This can cause severe pain to patients and emotional grief to their loved ones.
                </p>
                <p>
                  To protect personal liberty, the Supreme Court ruled in <em>Common Cause v. Union of India</em>{" "}
                  (2018). The court held that every Indian citizen has a constitutional right under Article 21
                  to refuse painful, useless medical care when death is certain.
                </p>
                <p>
                  In January 2023, the Supreme Court made these rules simpler and faster. You no longer need to
                  visit a magistrate to sign your paper. A registered notary public can attest it with two
                  adult witnesses. Hospital boards must now decide within 48 hours.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE ELIGIBILITY CHECKER */}
            <section id="interactive-checker" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>DYNAMIC DIAGNOSTIC ENGINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Living Will Eligibility Checker Tool
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Answer the 7 quick questions below. Check your legal status under the 2023 Supreme Court
                guidelines and see your compliance score instantly.
              </p>

              {/* Checker Box */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Q1: Age Majority */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#C65378]" />
                    <span>Question 1: What is the age of the person making the Living Will?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        id: "adult_18_plus",
                        label: "Adult (18 Years or Older)",
                        desc: "Full legal majority under the Indian Majority Act 1875",
                      },
                      {
                        id: "minor_under_18",
                        label: "Minor (Below 18 Years)",
                        desc: "Parents make health choices for children under 18",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setAgeStatus(opt.id as any)}
                        className={`text-left p-4 rounded-2xl border transition-all ${
                          ageStatus === opt.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                        }`}
                      >
                        <div className="font-bold text-slate-900 text-sm">{opt.label}</div>
                        <div className="text-xs text-slate-600 mt-1 leading-snug">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q2: Mental Capacity */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <HeartPulse className="w-4 h-4 text-[#C65378]" />
                    <span>Question 2: What is the current mental state of the person?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "sound_mind_lucid",
                        label: "Sound Mind & Lucid",
                        desc: "Fully understands medical care and future choices",
                      },
                      {
                        id: "temporary_illness_lucid_intervals",
                        label: "Lucid Intervals",
                        desc: "Clear mind during brief breaks from illness",
                      },
                      {
                        id: "advanced_cognitive_impairment",
                        label: "Severe Memory Loss / Coma",
                        desc: "Cannot understand or sign legal papers",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setMentalCapacity(opt.id as any)}
                        className={`text-left p-4 rounded-2xl border transition-all ${
                          mentalCapacity === opt.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                        }`}
                      >
                        <div className="font-bold text-slate-900 text-sm">{opt.label}</div>
                        <div className="text-xs text-slate-600 mt-1 leading-snug">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q3: Free Will */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#C65378]" />
                    <span>Question 3: Is this choice voluntary and free from pressure?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        id: "free_informed_consent",
                        label: "Voluntary Choice",
                        desc: "Made freely without family pressure or fear",
                      },
                      {
                        id: "family_pressure_coercion",
                        label: "Family Pressure",
                        desc: "Influenced by relatives or money worries",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setVoluntariness(opt.id as any)}
                        className={`text-left p-4 rounded-2xl border transition-all ${
                          voluntariness === opt.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                        }`}
                      >
                        <div className="font-bold text-slate-900 text-sm">{opt.label}</div>
                        <div className="text-xs text-slate-600 mt-1 leading-snug">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q4: Treatment Scope */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-[#C65378]" />
                    <span>Question 4: What medical care does the paper refuse?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "specific_treatments_defined",
                        label: "Specific Machines Named",
                        desc: "Names breathing machines, CPR, and feeding tubes",
                      },
                      {
                        id: "general_dignity_wish",
                        label: "General Wish Only",
                        desc: "General wish to avoid pain without naming machines",
                      },
                      {
                        id: "includes_active_euthanasia",
                        label: "Asks for Poison Shot",
                        desc: "Requests mercy killing (strictly illegal in India)",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setTreatmentScope(opt.id as any)}
                        className={`text-left p-4 rounded-2xl border transition-all ${
                          treatmentScope === opt.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                        }`}
                      >
                        <div className="font-bold text-slate-900 text-sm">{opt.label}</div>
                        <div className="text-xs text-slate-600 mt-1 leading-snug">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q5: Healthcare Proxy */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C65378]" />
                    <span>Question 5: Who is named as your healthcare agent?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "primary_and_alternate_named",
                        label: "Main & Backup Agents",
                        desc: "Two trusted family members or friends named in order",
                      },
                      {
                        id: "only_primary_named",
                        label: "Main Agent Only",
                        desc: "One trusted person named with no backup",
                      },
                      {
                        id: "no_executor_named",
                        label: "No Agent Named",
                        desc: "No surrogate appointed to speak with doctors",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setExecutorDesignation(opt.id as any)}
                        className={`text-left p-4 rounded-2xl border transition-all ${
                          executorDesignation === opt.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                        }`}
                      >
                        <div className="font-bold text-slate-900 text-sm">{opt.label}</div>
                        <div className="text-xs text-slate-600 mt-1 leading-snug">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q6: Attestation */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Question 6: How will the document be witnessed and attested?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "two_witnesses_plus_notary_jmfc",
                        label: "2 Witnesses + Notary Public",
                        desc: "Signed before two adult witnesses and stamped by a notary",
                      },
                      {
                        id: "two_witnesses_only_private",
                        label: "2 Witnesses Only",
                        desc: "Signed before friends without a notary stamp",
                      },
                      {
                        id: "unwitnessed_private_note",
                        label: "Private Note with No Witnesses",
                        desc: "A personal letter with no witnesses or stamps",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setWitnessAttestationPlan(opt.id as any)}
                        className={`text-left p-4 rounded-2xl border transition-all ${
                          witnessAttestationPlan === opt.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                        }`}
                      >
                        <div className="font-bold text-slate-900 text-sm">{opt.label}</div>
                        <div className="text-xs text-slate-600 mt-1 leading-snug">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q7: Custody */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>Question 7: Where will you keep copies of the Living Will?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        id: "registered_with_custodian_and_hospital",
                        label: "Agent, Doctor & Digital Locker",
                        desc: "Given to your agent, your family doctor, and saved online",
                      },
                      {
                        id: "private_home_lockbox_only",
                        label: "Locked in Home Cupboard Only",
                        desc: "Kept secret at home without telling doctors or agents",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setCustodyPlan(opt.id as any)}
                        className={`text-left p-4 rounded-2xl border transition-all ${
                          custodyPlan === opt.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                        }`}
                      >
                        <div className="font-bold text-slate-900 text-sm">{opt.label}</div>
                        <div className="text-xs text-slate-600 mt-1 leading-snug">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* DIAGNOSTIC OUTCOME CARD */}
                <div
                  className={`rounded-3xl p-6 sm:p-7 border transition-all ${
                    complianceScore >= 80
                      ? "bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 border-emerald-300"
                      : complianceScore >= 50
                      ? "bg-gradient-to-br from-amber-50 via-white to-amber-50/30 border-amber-300"
                      : "bg-gradient-to-br from-rose-50 via-white to-rose-50/30 border-rose-300"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white border shadow-xs mb-2 text-slate-800">
                        <Scale className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>{statusBadge}</span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                        {statusTitle}
                      </h4>
                    </div>

                    <div className="text-right sm:border-l sm:pl-6 border-slate-200">
                      <div className="text-3xl font-black text-slate-900">{complianceScore}%</div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        COMPLIANCE RATING
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <div>
                      <strong className="text-slate-900">Governing Precedent:</strong>{" "}
                      <span className="italic">{landmarkPrecedent}</span>
                    </div>
                    <div>
                      <strong className="text-slate-900">Legal Analysis:</strong> {legalRationale}
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/80 border border-slate-200 text-slate-800">
                      <strong className="text-slate-900">Recommended Action:</strong>{" "}
                      {actionRecommendation}
                    </div>
                  </div>

                  <div className="pt-5 flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleStartDraft}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Draft Your Directive Online</span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Checker</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* VISUAL FEATURE BLUEPRINT: GENERATED OG FEATURE IMAGE */}
            <div id="visual-guide" className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY VISUAL GUIDE: LIVING WILL &amp; ADVANCE DIRECTIVE ELIGIBILITY</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Supreme Court 2023 Guidelines</span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/living-will-advance-directive-eligibility-checker-og.jpg"
                  alt="Living Will and Advance Directive Eligibility Checker India under Supreme Court 2023 Order"
                  width={1200}
                  height={675}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                Indian healthcare consultation: adult executor, treating specialist, and principal reviewing advance medical directive safeguards.
              </p>
            </div>

            {/* SECTION 3: 2018 VS 2023 SUPREME COURT ORDER COMPARISON */}
            <section id="sc-order-comparison" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>PROCEDURAL REFORMS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. SC 2018 vs SC 2023 Modified Order Comparison
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Between 2018 and 2022, very few people could use Living Wills in India. The rules were too
                complex. In January 2023, the Supreme Court fixed these issues.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700 divide-y divide-slate-200">
                  <thead className="bg-slate-900 text-white font-bold text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5 sm:p-4">Key Point</th>
                      <th className="p-3.5 sm:p-4 text-rose-200">2018 Supreme Court Order</th>
                      <th className="p-3.5 sm:p-4 text-emerald-300">2023 Modified Order (Current Law)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Who Signs It</td>
                      <td className="p-3.5 sm:p-4 text-rose-700">
                        Needed a visit to a court magistrate (JMFC) to sign
                      </td>
                      <td className="p-3.5 sm:p-4 text-emerald-800 font-bold">
                        A local notary public and two adult witnesses can attest it
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Court Step in ICU</td>
                      <td className="p-3.5 sm:p-4 text-rose-700">
                        Magistrate had to visit the hospital bed to approve care
                      </td>
                      <td className="p-3.5 sm:p-4 text-emerald-800 font-bold">
                        Abolished. The court only gets a copy for safe record
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Doctor Panels</td>
                      <td className="p-3.5 sm:p-4 text-rose-700">
                        Second panel formed by the district collector (took weeks)
                      </td>
                      <td className="p-3.5 sm:p-4 text-emerald-800 font-bold">
                        The hospital sets up both doctor panels quickly
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Review Time</td>
                      <td className="p-3.5 sm:p-4 text-rose-700">
                        No clear time limits. Families waited for weeks
                      </td>
                      <td className="p-3.5 sm:p-4 text-emerald-800 font-bold">
                        Strict 48-hour limit for each doctor panel
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Healthcare Agent</td>
                      <td className="p-3.5 sm:p-4 text-rose-700">
                        Allowed only one person to speak for you
                      </td>
                      <td className="p-3.5 sm:p-4 text-emerald-800 font-bold">
                        Allows a main agent and a backup agent
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: TWO-TIER MEDICAL BOARD FLOWCHART */}
            <section id="two-tier-board-flowchart" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>CLINICAL STEPPER ARCHITECTURE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Two-Tier Hospital Medical Board Approval Protocol
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                When a person with a Living Will becomes terminally ill in the ICU, the hospital follows four
                clear steps set by the Supreme Court:
              </p>

              {/* Visual Flowchart Stepper (Structured HTML Cards, Zero Flowchart Images) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Step 1 */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs">
                      1
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      DAY 1 IN ICU
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Step 1: Treating Doctor Review
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The treating doctor checks the patient. The doctor checks if the illness has no cure or if
                    deep brain damage has set in. The doctor reads the patient&rsquo;s Living Will.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-xs">
                      2
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378]">
                      48-HOUR TIME LIMIT
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Step 2: Primary Doctor Panel
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The hospital forms a panel of three senior doctors with 20 years of work experience. They
                    examine the patient and record their views within 48 hours.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                      3
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800">
                      48-HOUR SECOND OPINION
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Step 3: Review Doctor Panel
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A second panel of three independent doctors reviews the case. One doctor is chosen by the
                    Chief Medical Officer. They check the findings within 48 hours.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-sky-700 text-white flex items-center justify-center font-bold text-xs">
                      4
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-50 text-sky-800">
                      PEACEFUL COMFORT CARE
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Step 4: Notice and Gentle Care
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The hospital sends a notice to the local court for record. With the family agent&rsquo;s
                    consent, useless machines are stopped. Full pain relief is given so the patient stays
                    comfortable.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: HEALTHCARE PROXY RULES */}
            <section id="executor-proxy-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>SURROGATE APPOINTMENT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Healthcare Proxy and Executor Legal Safeguards
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A Living Will cannot speak when you are in a coma. That is why the Supreme Court asks you to
                  name a trusted person as your <strong>Healthcare Agent</strong>.
                </p>
                <p>
                  <strong>Role of the Main Agent:</strong> Your agent shows your paper to the hospital. They
                  ask for the doctor panels and give consent to stop useless machines.
                </p>
                <p>
                  <strong>Naming a Backup Agent:</strong> You can also name a backup agent. If your main agent
                  is ill or away, your backup agent steps in right away.
                </p>
                <p>
                  <strong>Protection for Doctors:</strong> Doctors and agents who follow your paper in good
                  faith are protected from police complaints or lawsuits under Indian law.
                </p>
              </div>
            </section>

            {/* SECTION 6: END-OF-LIFE MEDICAL CARE DECISIONS */}
            <section id="end-of-life-care-decisions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HeartPulse className="w-4 h-4" />
                <span>MEDICAL INTERVENTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Permissible End-of-Life Medical Care Decisions
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Your paper must make a clear distinction between useless machines and pain relief. Here is
                  what you can direct under Indian law:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#C65378]" />
                      <span>Care You Can Refuse When Dying:</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside">
                      <li>Breathing machines (ventilators)</li>
                      <li>Electric chest shocks and chest pumps (CPR)</li>
                      <li>Kidney dialysis when recovery is impossible</li>
                      <li>Feeding tubes in permanent coma</li>
                      <li>Medicines used only to delay death by hours</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>Care That Doctors Must Give:</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside">
                      <li>Pain relief medicines to keep you pain-free</li>
                      <li>Sedation to stop gasping or fear</li>
                      <li>Gentle cleaning, mouth care, and warm blankets</li>
                      <li>Water drops to keep lips moist</li>
                      <li>A peaceful room for family members to be with you</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: JMFC AND SUB-REGISTRAR PROTOCOL */}
            <section id="custody-jmfc-registry" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>REGISTRY &amp; CUSTODY</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. JMFC and Sub-Registrar Registry Filing Protocol
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  To make sure doctors can find your paper in an emergency, follow these four simple steps:
                </p>
                <ol className="space-y-2.5 text-xs sm:text-sm text-slate-700 list-decimal list-inside">
                  <li>
                    <strong>Notary Public Seal:</strong> Sign your paper before a notary public and two adult
                    witnesses. The notary adds their stamp and seal.
                  </li>
                  <li>
                    <strong>Local Office Copy:</strong> Give a copy to the local municipal or panchayat
                    officer for safekeeping.
                  </li>
                  <li>
                    <strong>Notice to Court:</strong> The local officer sends a digital copy to the local
                    magistrate court for records.
                  </li>
                  <li>
                    <strong>Digital Health Locker:</strong> Save a scan on your phone or link it to your ABHA
                    health ID so doctors can view it fast.
                  </li>
                </ol>
              </div>
            </section>

            {/* SECTION 8: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ClipboardList className="w-4 h-4" />
                <span>STANDARD OPERATING PROCEDURE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Step-by-Step SOP: Execution to Hospital Enforcement
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Follow this simple step-by-step guide to make and use your Living Will in India:
              </p>

              <div className="space-y-3">
                {[
                  {
                    step: "Step 1: Write Your Wishes",
                    text: "Draft your Living Will. State clearly that you refuse breathing machines and chest pumps. Name a main agent and a backup agent.",
                  },
                  {
                    step: "Step 2: Find Two Witnesses",
                    text: "Ask two adult friends or family members to watch you sign. They must be of sound mind.",
                  },
                  {
                    step: "Step 3: Notary Public Attestation",
                    text: "Go to a local notary public or gazetted officer. Sign in person and get their official seal.",
                  },
                  {
                    step: "Step 4: Share Copies",
                    text: "Give signed copies to your agents and your family doctor. Save a copy on your phone.",
                  },
                  {
                    step: "Step 5: Show at Hospital",
                    text: "If you fall into a deep coma with a terminal illness, your agent shows the paper to the hospital chief doctor.",
                  },
                  {
                    step: "Step 6: Fast Doctor Review",
                    text: "Two doctor panels review your case within 48 hours each. Useless machines are stopped with full pain relief.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3.5"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{item.step}</div>
                      <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 9: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <History className="w-4 h-4" />
                <span>REAL-WORLD APPLICATIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Practical Case Studies: ICU Scenarios and Disputes
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                These three real-world stories show how the 2023 Supreme Court rules help families in the ICU:
              </p>

              <div className="space-y-4">
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    CASE STUDY 1: BENGALURU ICU
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Terminal Cancer Patient Refuses Breathing Machine
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A 72-year-old retired teacher in Bengaluru had stage-4 cancer. His Living Will refused
                    breathing machines and named his daughter as agent. When lung failure occurred, two doctor
                    panels confirmed his state within 48 hours. He was spared painful tubes and died
                    peacefully with pain relief.
                  </p>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    CASE STUDY 2: NEW DELHI DISPUTE
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Sibling Disagreement Over Comatose Mother
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    An 80-year-old woman in New Delhi had a massive stroke with deep brain damage. One son
                    wanted machines kept on, while her daughter had the mother&rsquo;s registered Living Will.
                    Under Supreme Court rules, the mother&rsquo;s own written wish won over the son&rsquo;s
                    objection.
                  </p>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    CASE STUDY 3: MUMBAI CROSS-BORDER
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    NRI Daughter Named as Healthcare Agent
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    An elderly couple in Mumbai named their daughter in London as main agent and their local
                    doctor as backup agent. When an emergency happened, the local backup agent started the
                    doctor panel review at once, while the daughter gave digital consent from London.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: STATUTORY RECITAL CLAUSES & CHECKLIST */}
            <section id="statutory-recital-checklist" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>LEGAL DRAFTING ASSETS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Statutory Recital Clauses and Living Will Checklist
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Use these verified legal clauses and checklists to draft your Living Will under the 2023
                Supreme Court order:
              </p>

              {/* Copyable Statutory Clause Box */}
              <div className="rounded-3xl bg-slate-900 text-slate-200 p-5 sm:p-7 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-2">
                    <Scale className="w-4 h-4" />
                    <span>SUPREME COURT COMPLIANT LIVING WILL RECITAL CLAUSE</span>
                  </div>
                  <button
                    onClick={copyClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
                  >
                    {copiedClause ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedClause ? "Copied Clause!" : "Copy Clause"}</span>
                  </button>
                </div>

                <pre className="text-xs sm:text-sm font-mono bg-black/40 rounded-2xl p-4 overflow-x-auto whitespace-pre-wrap leading-relaxed border border-white/10 text-slate-300">
                  {`"I, [Full Legal Name], residing at [Address], declare this as my ADVANCE MEDICAL DIRECTIVE.

If I suffer from a terminal illness, irreversible brain condition, or persistent vegetative state where death is imminent, I direct that life-sustaining treatments, including breathing machines (ventilators), chest compressions (CPR), dialysis, and feeding tubes, shall be withheld or withdrawn.

I direct that palliative pain relief and comfort care shall be administered at all times.

I appoint [Primary Agent Name, Contact] as my Primary Healthcare Agent and [Backup Agent Name, Contact] as my Backup Agent to convey informed consent to hospital medical boards under Common Cause (2023) guidelines."`}
                </pre>
              </div>

              {/* Copyable Checklist Box */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>8-POINT SUPREME COURT 2023 COMPLIANCE CHECKLIST</span>
                  </div>
                  <button
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  >
                    {copiedChecklist ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedChecklist ? "Copied Checklist!" : "Copy Checklist"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  {[
                    "Adult aged 18+ with legal capacity under Indian Majority Act",
                    "Clear, sound mind when signing the legal document",
                    "Voluntary choice made without force or family pressure",
                    "Names breathing machines, CPR, and feeding tubes clearly",
                    "Protects the right to pain relief and gentle care",
                    "Names a main agent and a backup healthcare agent",
                    "Two adult witnesses watch you sign the paper",
                    "Notary public or gazetted officer adds seal and stamp",
                  ].map((chk, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{chk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 11: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>LEGAL EXPERTISE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Healthcare Law Excellence: Institutional Desk
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  WillDrafting, powered by AMA Legal Solutions, helps Indian families draft clear Living Wills
                  and property Wills.
                </p>
                <p>
                  Our legal team studies constitutional law, Article 21 rights, and Supreme Court rulings. We
                  make sure your Living Will is clear, legally binding, and respected by hospital doctors
                  across India.
                </p>
              </div>
            </section>

            {/* SECTION 12: FREQUENTLY ASKED QUESTIONS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENT QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: Living Wills in India
              </h3>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                      >
                        <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 13: STATUTORY CITATIONS & PORTALS */}
            <section id="judicial-citations-portals" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>STATUTORY CITATIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Official Judicial Portals and Statutory Citations
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                For more details on healthcare rights and court orders in India, check these official portals:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href="https://www.sci.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs flex items-center justify-between group transition-colors"
                >
                  <span className="text-xs font-bold text-slate-900 group-hover:text-[#C65378]">
                    Supreme Court of India (sci.gov.in)
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#C65378]" />
                </a>

                <a
                  href="https://www.indiacode.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs flex items-center justify-between group transition-colors"
                >
                  <span className="text-xs font-bold text-slate-900 group-hover:text-[#C65378]">
                    India Code: Article 21 &amp; Statutes
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#C65378]" />
                </a>

                <a
                  href="https://main.mohfw.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs flex items-center justify-between group transition-colors"
                >
                  <span className="text-xs font-bold text-slate-900 group-hover:text-[#C65378]">
                    Ministry of Health &amp; Family Welfare
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#C65378]" />
                </a>

                <a
                  href="https://abdm.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs flex items-center justify-between group transition-colors"
                >
                  <span className="text-xs font-bold text-slate-900 group-hover:text-[#C65378]">
                    Ayushman Bharat Digital Mission (ABDM)
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#C65378]" />
                </a>
              </div>

              {/* Related Internal Legal Tools */}
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Related Free Legal Tools on WillDrafting
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Link
                    href="/tools/will-validity-section-63-audit-checker"
                    className="px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-[#C65378] font-medium"
                  >
                    Section 63 Will Validity Audit
                  </Link>
                  <Link
                    href="/tools/witness-eligibility-section-67-checker"
                    className="px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-[#C65378] font-medium"
                  >
                    Section 67 Witness Eligibility Checker
                  </Link>
                  <Link
                    href="/tools/senior-citizen-section-23-gift-revocation-checker"
                    className="px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-[#C65378] font-medium"
                  >
                    Senior Citizens Act Section 23 Checker
                  </Link>
                  <Link
                    href="/tools/executor-duties-90-day-timeline-generator"
                    className="px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-[#C65378] font-medium"
                  >
                    Executor 90-Day Timeline Generator
                  </Link>
                  <Link
                    href="/tools/will-checklist"
                    className="px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-[#C65378] font-medium"
                  >
                    Statutory Will Checklist
                  </Link>
                </div>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY ASSESSMENT & CONVERSION SIDEBAR
              ===================================================================== */}
          <aside className="sticky top-24 hidden lg:block space-y-4">
            {/* CARD 1: MINI SUMMARY ASSESSMENT */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#C65378] flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" />
                <span>Eligibility Status</span>
              </div>
              <div className="flex items-baseline justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-800">Compliance Score</span>
                <span className="text-2xl font-black text-slate-900">{complianceScore}%</span>
              </div>
              <div className="text-xs text-slate-600 leading-snug">
                <strong className="text-slate-900">Diagnosis:</strong> {statusTitle}
              </div>
              <div className="text-[11px] text-slate-500 pt-1">
                Based on Supreme Court 2023 modified guidelines and Article 21.
              </div>
            </div>

            {/* CARD 2: DUAL CTA 1 - DRAFT WILL & DIRECTIVE ONLINE */}
            <div className="rounded-3xl bg-[#172228] text-white shadow-md p-5 space-y-3.5 text-center">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-rose-200 text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#C65378]" />
                <span>SELF-SERVE STATUTORY DRAFTING</span>
              </div>
              <h3 className="text-lg font-extrabold text-white leading-snug">
                Protect Your Medical Autonomy with a Living Will
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Draft an Advance Medical Directive and statutory Will fully compliant with Supreme Court
                2023 orders.
              </p>
              <button
                onClick={handleStartDraft}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Draft Your Directive Online</span>
              </button>
              <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Supreme Court 2023 Compliant</span>
              </div>
            </div>

            {/* CARD 3: TRUST CHECKLIST */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                Why Families Rely on WillDrafting
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Supreme Court Backed:</strong> Governed strictly by the <em>Common Cause</em> 2023
                    modified guidelines.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Ambiguity:</strong> Clear clauses specifically naming ventilators, CPR, and
                    feeding tubes.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Custody Ready:</strong> Formatted for Notary attestation and municipal authority
                    deposit.
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* FLOATING MOBILE ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 px-4 shadow-lg flex items-center justify-between gap-3">
        <a
          href="#interactive-checker"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <GitBranch className="w-3.5 h-3.5" />
          <span>Eligibility Tool</span>
        </a>
        <button
          onClick={handleStartDraft}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Draft Directive</span>
        </button>
      </div>
    </div>
  );
}
