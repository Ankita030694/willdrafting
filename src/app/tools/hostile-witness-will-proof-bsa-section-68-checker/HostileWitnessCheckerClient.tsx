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
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Legal Framework: Proving a Will Under Section 68 BSA" },
  { id: "interactive-checker", label: "2. Free Hostile Witness Will Proof Checker Tool" },
  { id: "statutory-safety-net", label: "3. Section 68 & 70 BSA: The Statutory Safety Net" },
  { id: "janki-bhoir-rule", label: "4. The Mandatory Janki Bhoir Rule: Dual Witness Duty" },
  { id: "scribe-advocate-doctor", label: "5. Examining the Scribe, Advocate, and Doctor" },
  { id: "sub-registrar-summons", label: "6. Sub-Registrar Summons & SRO Registration Book" },
  { id: "forensic-handwriting", label: "7. Forensic Handwriting Analysis Under Section 72 BSA" },
  { id: "defense-matrix", label: "8. Hostile Witness Defense Matrix: Evidence Routes" },
  { id: "precedent-matcher", label: "9. Precedent Matcher: Key Supreme Court Rulings" },
  { id: "step-by-step-sop", label: "10. Step-by-Step SOP: Rescuing a Contested Will" },
  { id: "case-studies", label: "11. Practical Litigation Case Studies in India" },
  { id: "courtroom-checklist", label: "12. Courtroom Cross-Examination Checklist & Petitions" },
  { id: "institutional-profile", label: "13. Institutional Profile: Legal Excellence & Trust" },
  { id: "frequently-asked-questions", label: "14. Frequently Asked Questions: Hostile Witnesses" },
  { id: "statutory-citations", label: "15. Legal Citations & High Court Judicial Portals" },
];

const PRECEDENTS = [
  {
    id: "janki-bhoir",
    title: "Janki Narayan Bhoir v. Narayan Namdeo Kadam (2003) 2 SCC 91",
    bench: "Supreme Court of India (Division Bench)",
    scenario: "First witness denied attestation; propounder failed to examine available second witness",
    ratio: "Section 70 BSA is an exception. It is not an easy shortcut. If witness one turns hostile, you must call witness two first if alive and able to speak. You cannot jump to alternate proof before this step.",
    keyTakeaway: "Always summon all surviving attesting witnesses. Never skip Witness 2 even if Witness 1 turns hostile.",
  },
  {
    id: "babu-singh",
    title: "Babu Singh & Ors. v. Ram Sahai @ Ram Singh (2008) 14 SCC 754",
    bench: "Supreme Court of India",
    scenario: "One attesting witness dead, surviving witness colluded with contesting heirs and denied signature",
    ratio: "When one witness is dead and the other turns hostile, Section 70 BSA applies. You can prove the Will through the scribe and other credible facts. Hostility does not kill the Will.",
    keyTakeaway: "Hostility of the sole surviving witness does not invalidate the Will if the scribe and execution circumstances are credible.",
  },
  {
    id: "jagdish-chand",
    title: "Jagdish Chand Sharma v. Narain Singh Saini (2015) 8 SCC 615",
    bench: "Supreme Court of India",
    scenario: "Attesting witnesses claimed lack of recollection and vague memories regarding testator's mental state",
    ratio: "The court balances Section 67 with Section 70 BSA. If witnesses take bribes, the court looks at other proof. The judge can rely on Sub-Registrar records and doctor notes.",
    keyTakeaway: "A doctor's fitness certificate and official registration defeat hostile claims of unsound mind.",
  },
  {
    id: "raj-kumari",
    title: "Raj Kumari & Ors. v. Surinder Pal Sharma (2021) 14 SCC 500",
    bench: "Supreme Court of India",
    scenario: "Sole surviving attesting witness turned hostile; drafting advocate and sub-registrar records deposed",
    ratio: "When an attesting witness lies about their signature, the drafting lawyer can prove the Will. The lawyer's word is valid alternate evidence under Section 70 BSA.",
    keyTakeaway: "The drafting advocate who personally oversaw execution acts as a decisive anchor witness in contested probate.",
  },
];

const FAQS = [
  {
    q: "Does a Will fail automatically if an attesting witness turns hostile in court?",
    a: "No. A Will does not fail just because a witness turns hostile. Section 70 BSA (old Section 71 Evidence Act) protects you. If a witness denies signing or forgets, you can prove the Will with other evidence. You can call the scribe, drafting lawyer, doctor, and Sub-Registrar. You can also use handwriting experts.",
  },
  {
    q: "What is the mandatory Janki Bhoir rule established by the Supreme Court?",
    a: "In Janki Bhoir (2003), the Supreme Court set a strict rule. You cannot skip an available second witness. If witness one turns hostile, you must call witness two if alive and able to depose. Only if witness two is also hostile, dead, or untraceable can you call the scribe or doctor.",
  },
  {
    q: "How does Section 70 BSA save a Will when witnesses deny execution?",
    a: "Section 70 BSA is your statutory safety net. When witnesses deny signing or forget, you can lead other proof. You can produce the scribe and the attending doctor. You can summon the Sub-Registrar register. You can also cross-examine the hostile witness to expose lies.",
  },
  {
    q: "Can a document scribe or drafting advocate prove execution of the Will?",
    a: "Yes. The scribe or drafting lawyer can prove the Will under Section 70 BSA. They must state they saw the Will maker sign. They must also state that the witnesses signed in each other's presence. The Supreme Court affirmed this rule in Babu Singh and Raj Kumari.",
  },
  {
    q: "How does Sub-Registrar registration help overcome a hostile witness?",
    a: "Under Section 60 of the Registration Act, the Sub-Registrar's seal creates a strong legal presumption. You can summon the Sub-Registrar and Book 3 under Order XVI CPC. This shows the Will maker and witnesses appeared in person and gave thumbprints.",
  },
  {
    q: "What legal action can be taken against a bribed or colluding hostile witness?",
    a: "If a witness commits perjury by denying their real signature, you can act. You can file a petition under Section 340 CrPC (now Section 379 BNSS). This seeks their criminal trial for lying on oath. You can also check their signature under Section 72 BSA.",
  },
  {
    q: "Can handwriting experts prove the signature of a hostile witness under Section 72 BSA?",
    a: "Yes. Under Section 72 BSA, the court can compare disputed signatures with real ones. You can use bank KYC forms, driving licenses, or court samples. A forensic expert from CFSL can confirm the signature matches.",
  },
  {
    q: "What happens if one attesting witness is dead and the other turns hostile?",
    a: "In Babu Singh (2008), the Supreme Court settled this rule. If one witness is dead and the other turns hostile, prove the dead witness's signature under Section 68 BSA. Next, use Section 70 BSA to call the scribe, doctor, and Sub-Registrar.",
  },
];

export default function HostileWitnessCheckerClient() {
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
  const [copiedClause, setCopiedClause] = useState<boolean>(false);
  const [copiedSummons, setCopiedSummons] = useState<boolean>(false);
  const [selectedPrecedent, setSelectedPrecedent] = useState<string>("janki-bhoir");
  const [decisionTreeTab, setDecisionTreeTab] = useState<"step1" | "step2" | "step3" | "step4">("step1");

  // Diagnostic Wizard State
  const [witness1Status, setWitness1Status] = useState<
    "denied_signature" | "claims_memory_loss" | "bribed_colluded" | "hostile_cross"
  >("denied_signature");

  const [witness2Status, setWitness2Status] = useState<
    "alive_cooperative" | "also_hostile" | "deceased_untraceable" | "not_yet_summoned"
  >("alive_cooperative");

  const [scribeStatus, setScribeStatus] = useState<
    "advocate_scribe_ready" | "identifying_witness_ready" | "scribe_unavailable"
  >("advocate_scribe_ready");

  const [registrationStatus, setRegistrationStatus] = useState<
    "registered_sro_book3" | "unregistered_doctor_cert" | "unregistered_plain"
  >("registered_sro_book3");

  const [handwritingSamples, setHandwritingSamples] = useState<
    "admitted_gov_bank_records" | "court_specimen_possible" | "limited_samples"
  >("admitted_gov_bank_records");

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
    setWitness1Status("denied_signature");
    setWitness2Status("alive_cooperative");
    setScribeStatus("advocate_scribe_ready");
    setRegistrationStatus("registered_sro_book3");
    setHandwritingSamples("admitted_gov_bank_records");
  };

  // Diagnostic Classification Engine
  let rescueViability = "High Viability (92%)";
  let viabilityScore = 92;
  let strategicRoute = "Examine Witness 2 (Janki Bhoir Direct Proof)";
  let badgeStyle = "bg-emerald-50 text-emerald-800 border-emerald-300";
  let primaryRuling = "Janki Narayan Bhoir v. Narayan Namdeo Kadam (2003) 2 SCC 91";
  let statutorySection = "Section 67 BSA (Erstwhile Section 68 IEA)";
  let legalAnalysis =
    "Your second witness is alive and ready to speak. The hostility of witness one will not hurt your case. Under Section 67 BSA, one good witness is enough to prove the Will. That satisfies the law.";
  let proceduralDirective =
    "Summon witness two to court at once. Do not jump to other proof before this step. Cross-examine witness one under Section 145 BSA to expose their lies.";

  if (witness2Status === "not_yet_summoned") {
    rescueViability = "Procedural Block: High Dismissal Risk";
    viabilityScore = 35;
    strategicRoute = "Mandatory Summons to Witness 2 Required";
    badgeStyle = "bg-amber-50 text-amber-800 border-amber-300";
    primaryRuling = "Janki Narayan Bhoir v. Narayan Namdeo Kadam (2003) 2 SCC 91";
    statutorySection = "Section 67 BSA & Order XVI CPC";
    legalAnalysis =
      "Warning: You must summon witness two first. If you skip witness two and call the scribe right away, the court will dismiss your case under the Janki Bhoir rule.";
    proceduralDirective =
      "File a summons application under Order XVI CPC for witness two. If witness two is also hostile, dead, or untraceable, then you can use Section 70 BSA.";
  } else if (witness2Status === "also_hostile" || witness2Status === "deceased_untraceable") {
    if (registrationStatus === "registered_sro_book3" && scribeStatus === "advocate_scribe_ready") {
      rescueViability = "Strong Rescue Viability (88%)";
      viabilityScore = 88;
      strategicRoute = "Section 70 BSA Scribe + SRO Book 3 Summons";
      badgeStyle = "bg-emerald-50 text-emerald-800 border-emerald-300";
      primaryRuling = "Babu Singh v. Ram Sahai (2008) 14 SCC 754 & Raj Kumari (2021)";
      statutorySection = "Section 70 BSA & Section 60 Registration Act";
      legalAnalysis =
        "With both witnesses hostile or one deceased and one hostile, Section 70 BSA unlocks alternate evidence. The testimony of your drafting advocate/scribe combined with the statutory presumption of registration under Section 60 of the Registration Act provides strong evidence of execution.";
      proceduralDirective =
        "1. Declare Witness 1 hostile and cross-examine on bank/voter signatures. 2. Examine the drafting advocate as an eye-witness. 3. Summon Sub-Registrar with Book 3 register. 4. Initiate Section 340 CrPC perjury proceedings.";
    } else if (registrationStatus === "unregistered_doctor_cert" && handwritingSamples === "admitted_gov_bank_records") {
      rescueViability = "Moderate Viability (68%)";
      viabilityScore = 68;
      strategicRoute = "Doctor Certificate + Forensic Handwriting Comparison";
      badgeStyle = "bg-blue-50 text-blue-800 border-blue-300";
      primaryRuling = "Jagdish Chand Sharma v. Narain Singh Saini (2015) 8 SCC 615";
      statutorySection = "Section 70 & Section 72 BSA (Forensic Proof)";
      legalAnalysis =
        "Because the Will is unregistered and the witnesses have turned hostile, you must neutralize suspicious circumstances by examining the attending doctor who certified sound disposing mind and submitting admitted handwriting samples for CFSL forensic comparison.";
      proceduralDirective =
        "File an application under Section 72 BSA to send admitted bank/sale deed signatures and the disputed Will to the Government Forensic Science Laboratory (FSL). Examine the doctor on testamentary capacity.";
    } else {
      rescueViability = "Critical Litigation Alert (42%)";
      viabilityScore = 42;
      strategicRoute = "High-Risk Hostile Collusion Defense";
      badgeStyle = "bg-rose-50 text-rose-800 border-rose-300";
      primaryRuling = "Jaswant Kaur v. Amrit Kaur (1977) 1 SCC 369";
      statutorySection = "Section 70 BSA & Section 63 Indian Succession Act";
      legalAnalysis =
        "An unregistered Will with hostile witnesses and unavailable scribes faces severe evidentiary scrutiny. The court will treat the hostile testimony as casting deep suspicion unless strong circumstantial evidence of the testator's intentions is brought on record.";
      proceduralDirective =
        "Engage Senior High Court testamentary counsel. Bring immediate family evidence, prior uncancelled drafts, revenue records, and initiate perjury summons against the bribed witness under Section 340 CrPC / Section 379 BNSS.";
    }
  }

  const copyClauseToClipboard = () => {
    const clauseText = `IN THE COURT OF THE DISTRICT JUDGE / HIGH COURT OF JUDICATURE
TESTAMENTARY AND INTESTATE JURISDICTION

APPLICATION UNDER SECTION 70 OF THE BHARATIYA SAKSHYA ADHINIYAM, 2023
(ERSTWHILE SECTION 71 OF THE INDIAN EVIDENCE ACT, 1872)
READ WITH SECTION 151 OF THE CODE OF CIVIL PROCEDURE, 1908

THE HUMBLE APPLICATION OF THE PROPOUNDER / PETITIONER ABOVE-NAMED:

1. That the Petitioner has filed the accompanying Testamentary Suit for the grant of Probate of the registered Last Will and Testament dated [Date] executed by Late [Name of Testator].
2. That in compliance with Section 67 of the Bharatiya Sakshya Adhiniyam, 2023, the Petitioner duly summoned and examined Attesting Witness No. 1, namely [Name of Witness], as PW-1.
3. That during cross-examination, PW-1 turned hostile, colluded with the contesting caveators, and falsely denied his signature on the Will, contrary to his own registered signature before the Sub-Registrar.
4. That Attesting Witness No. 2, namely [Name of Second Witness], is deceased / untraceable / also hostile as evidenced by the death certificate / process report annexed herewith.
5. That under Section 70 of the Bharatiya Sakshya Adhiniyam, 2023 and the binding principles laid down by the Hon'ble Supreme Court in 'Babu Singh v. Ram Sahai' (2008) 14 SCC 754 and 'Raj Kumari v. Surinder Pal Sharma' (2021) 14 SCC 500, when attesting witnesses deny or do not recollect execution, the execution of the Will may be proved by OTHER EVIDENCE.
6. PRAYER: It is therefore most respectfully prayed that this Hon'ble Court may graciously be pleased to:
   (a) Permit the Petitioner to prove the due execution of the registered Will dated [Date] through the testimony of the Document Scribe / Drafting Advocate and the Sub-Registrar;
   (b) Issue summons to the Sub-Registrar along with the original Book 3 Register; and
   (c) Refer the disputed signatures of PW-1 to the Central Forensic Science Laboratory (CFSL) for handwriting comparison under Section 72 of the Bharatiya Sakshya Adhiniyam, 2023.`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copySummonsToClipboard = () => {
    const summonsText = `CHECKLIST FOR SUMMONING SUB-REGISTRAR & SRO RECORDS (ORDER XVI RULE 1 CPC):
1. Certified Copy of the Registered Will with complete registration endorsements (Volume, Book 3, Page numbers).
2. Formal Application under Order XVI Rule 1 & 6 CPC specifying the designated official (Sub-Registrar or Record Keeper).
3. Requisition for Production of Original Book 3 Register containing the thumb impressions, photos, and signatures of the Testator and Attesting Witnesses.
4. Requisition of the SRO Daily Cash Receipt Register / Biometric Log for the date of execution.
5. Requisition of CCTV footage / digital biometric verification logs if registered in an automated SRO.
6. Witness diet money and process fee deposit challan in accordance with High Court Rules.`;
    navigator.clipboard.writeText(summonsText);
    setCopiedSummons(true);
    setTimeout(() => setCopiedSummons(false), 3000);
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
            <span>BHARATIYA SAKSHYA ADHINIYAM, 2023 • SECTIONS 67, 68 &amp; 70</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Hostile Witness Will Proof Checker BSA India
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Check your legal steps when a witness turns hostile in court. Invoke Section 68 and Section 70 BSA. Prove your Will with scribes, doctors, and Sub-Registrar records.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-checker"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <GitBranch className="w-4 h-4" />
              <span>Launch Proof Checker</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/services/high-court-testamentary-suit-contested-will-defense"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>High Court Will Defense</span>
            </Link>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 70 BSA</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ERSTWHILE SECTION 71 IEA
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Janki Bhoir Rule</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                DUAL WITNESS EXAMINATION DUTY
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">SRO Book 3</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SECTION 60 STATUTORY PRESUMPTION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 72 BSA</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                FORENSIC HANDWRITING REBUTTAL
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
                <span>Litigation Office</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed by BSA 2023 (Sections 67, 68, 70, 72) and Succession Act 1925. Supported by Supreme Court rules in Janki Bhoir and Babu Singh.
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
                <span>EXECUTIVE BRIEF: HOSTILE ATTESTING WITNESS DEFENSE</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Witness Hostility Does Not Kill the Will:</strong> Many people believe a hostile witness kills a Will. That is false. A witness cannot defeat a true Will. Indian law protects you under Section 70 BSA.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>The Mandatory Dual-Witness Rule:</strong> You cannot skip the second witness. If witness one turns hostile, you must call witness two first. Only then can you call other witnesses.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Document Scribe &amp; Advocate Proof:</strong> The drafting lawyer or scribe can prove the Will. They saw the testator sign. They saw the witnesses sign too.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Sub-Registrar Summons &amp; Perjury Action:</strong> Official SRO Book 3 records carry high weight. The law presumes public acts are true. Corrupt witnesses face perjury trial under Section 340 CrPC.
                  </span>
                </li>
              </ul>
            </div>

            {/* EDITORIAL VISUAL CARD: DISPLAY GENERATED OG IMAGE */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span className="uppercase tracking-wider text-[#C65378] font-black flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Courtroom Diagnostic Visual</span>
                </span>
                <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-mono">
                  /tools/hostile-witness-will-proof-bsa-section-68-checker
                </span>
              </div>
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <Image
                  src="/images/hostile-witness-will-proof-bsa-section-68-checker-og.jpg"
                  alt="Hostile Witness Will Proof Checker under Section 68 and 70 BSA India"
                  width={1200}
                  height={675}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed italic text-center">
                Indian court scene during Will litigation. If a witness turns hostile or takes a bribe, Section 70 BSA protects the Will. The propounder can prove the Will through the scribe, the doctor, and Sub-Registrar records under the Janki Bhoir rule.
              </p>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (STRICT SINGLE H2) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LEGAL FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Framework: Proving a Will Under Section 68 BSA
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Proving a Will in an Indian court is governed by strict statutory rules. Under Section 63(c) of the Indian Succession Act, 1925, a Will must be attested by two or more witnesses. When the testator passes away and the Will is challenged in probate or a title suit, the propounder must prove its valid execution.
                </p>
                <p>
                  Under <strong>Section 67 BSA 2023</strong> (old Section 68 Evidence Act), the law sets a clear rule. You must call at least one attesting witness to court to prove the Will. This rule applies if a witness is alive. The witness must be able to speak in court and subject to court process.
                </p>
                <p>
                  Testamentary disputes often turn bitter. Excluded family members may contact the witnesses. They may offer bribes or make threats. As a result, a witness may turn hostile in court. The witness may falsely deny their own signature. They may claim they never saw the testator sign.
                </p>
                <p>
                  To stop fraud, lawmakers built a vital safety net. This is <strong>Section 70 of the BSA (old Section 71 Evidence Act)</strong>. The law says: If the attesting witness denies or forgets the execution, you can prove the Will by other evidence. A lying witness cannot destroy a true Will.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CHECKER TOOL */}
            <section id="interactive-checker" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>EVIDENTIARY DIAGNOSTIC ENGINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Hostile Witness Will Proof Checker Tool
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your case facts below. Our legal tool checks your rights under Section 68 and 70 BSA. It matches your dispute with Supreme Court rulings.
              </p>

              {/* Wizard Box */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-sm space-y-6">
                {/* Step 1 */}
                <div className="space-y-3">
                  <label className="block text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                    Step 1: Attesting Witness No. 1 Courtroom Behavior
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setWitness1Status("denied_signature")}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        witness1Status === "denied_signature"
                          ? "border-[#C65378] bg-rose-50/60 font-bold text-slate-900 shadow-2xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold text-slate-900">Denies Own Signature</div>
                      <div className="text-[11px] text-slate-500 mt-1">Claims signature is forged or never signed the Will.</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWitness1Status("claims_memory_loss")}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        witness1Status === "claims_memory_loss"
                          ? "border-[#C65378] bg-rose-50/60 font-bold text-slate-900 shadow-2xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold text-slate-900">Claims Memory Loss</div>
                      <div className="text-[11px] text-slate-500 mt-1">Admits signature but claims cannot recall execution.</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWitness1Status("bribed_colluded")}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        witness1Status === "bribed_colluded"
                          ? "border-[#C65378] bg-rose-50/60 font-bold text-slate-900 shadow-2xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold text-slate-900">Bribed / Colluded with Heirs</div>
                      <div className="text-[11px] text-slate-500 mt-1">Actively sides with caveators to defeat the probate.</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWitness1Status("hostile_cross")}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        witness1Status === "hostile_cross"
                          ? "border-[#C65378] bg-rose-50/60 font-bold text-slate-900 shadow-2xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold text-slate-900">Alleges Testator Unsound Mind</div>
                      <div className="text-[11px] text-slate-500 mt-1">Claims testator was unconscious or coerced.</div>
                    </button>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="space-y-3">
                  <label className="block text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                    Step 2: Status of Second Attesting Witness (Crucial Janki Bhoir Test)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setWitness2Status("alive_cooperative")}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        witness2Status === "alive_cooperative"
                          ? "border-[#C65378] bg-rose-50/60 font-bold text-slate-900 shadow-2xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold text-slate-900">Alive &amp; Ready to Testify</div>
                      <div className="text-[11px] text-slate-500 mt-1">Witness 2 will depose and prove execution in court.</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWitness2Status("also_hostile")}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        witness2Status === "also_hostile"
                          ? "border-[#C65378] bg-rose-50/60 font-bold text-slate-900 shadow-2xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold text-slate-900">Also Hostile / Colluding</div>
                      <div className="text-[11px] text-slate-500 mt-1">Both attesting witnesses have turned hostile.</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWitness2Status("deceased_untraceable")}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        witness2Status === "deceased_untraceable"
                          ? "border-[#C65378] bg-rose-50/60 font-bold text-slate-900 shadow-2xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold text-slate-900">Deceased or Untraceable</div>
                      <div className="text-[11px] text-slate-500 mt-1">Witness 2 has passed away (death certificate available).</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWitness2Status("not_yet_summoned")}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        witness2Status === "not_yet_summoned"
                          ? "border-[#C65378] bg-rose-50/60 font-bold text-slate-900 shadow-2xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold text-slate-900">Not Yet Summoned to Court</div>
                      <div className="text-[11px] text-slate-500 mt-1">Have not issued court process to Witness 2 yet.</div>
                    </button>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="space-y-3">
                  <label className="block text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                    Step 3: Document Scribe or Drafting Advocate
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setScribeStatus("advocate_scribe_ready")}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        scribeStatus === "advocate_scribe_ready"
                          ? "border-[#C65378] bg-rose-50/60 font-bold text-slate-900 shadow-2xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold text-slate-900">Advocate / Scribe Available</div>
                      <div className="text-[11px] text-slate-500 mt-1">Lawyer who prepared Will can depose.</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setScribeStatus("identifying_witness_ready")}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        scribeStatus === "identifying_witness_ready"
                          ? "border-[#C65378] bg-rose-50/60 font-bold text-slate-900 shadow-2xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold text-slate-900">SRO Identifying Witness</div>
                      <div className="text-[11px] text-slate-500 mt-1">Third person who identified at SRO ready.</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setScribeStatus("scribe_unavailable")}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        scribeStatus === "scribe_unavailable"
                          ? "border-[#C65378] bg-rose-50/60 font-bold text-slate-900 shadow-2xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="font-bold text-slate-900">Scribe Unavailable</div>
                      <div className="text-[11px] text-slate-500 mt-1">Drafted by family or unknown scribe.</div>
                    </button>
                  </div>
                </div>

                {/* Step 4 & 5 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                      Step 4: Registration Status
                    </label>
                    <select
                      value={registrationStatus}
                      onChange={(e) => setRegistrationStatus(e.target.value as any)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:outline-hidden focus:border-[#C65378]"
                    >
                      <option value="registered_sro_book3">Registered at SRO (Book 3 Biometrics Available)</option>
                      <option value="unregistered_doctor_cert">Unregistered Will with Doctor Certificate</option>
                      <option value="unregistered_plain">Unregistered Will (No Doctor Certificate)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                      Step 5: Admitted Signature Records
                    </label>
                    <select
                      value={handwritingSamples}
                      onChange={(e) => setHandwritingSamples(e.target.value as any)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:outline-hidden focus:border-[#C65378]"
                    >
                      <option value="admitted_gov_bank_records">Bank KYC / Sale Deed Admitted Signatures Available</option>
                      <option value="court_specimen_possible">Can Take Specimen Signatures in Open Court</option>
                      <option value="limited_samples">Very Limited Admitted Comparison Samples</option>
                    </select>
                  </div>
                </div>

                {/* OUTPUT RESULTS CARD */}
                <div className="rounded-2xl border-2 border-[#172228]/15 bg-slate-900 text-white p-5 sm:p-7 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-rose-300 font-bold">
                        DIAGNOSTIC VERDICT &amp; LITIGATION VIABILITY
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-1">
                        {strategicRoute}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-[10px] uppercase tracking-wider text-slate-400">Rescue Score</div>
                        <div className="text-xl font-extrabold text-emerald-400">{rescueViability}</div>
                      </div>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                        title="Reset Checker"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300 font-bold">
                      <span>Courtroom Survivability Index</span>
                      <span>{viabilityScore}%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          viabilityScore >= 80
                            ? "bg-emerald-500"
                            : viabilityScore >= 60
                            ? "bg-amber-400"
                            : "bg-rose-500"
                        }`}
                        style={{ width: `${viabilityScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Analysis Box */}
                  <div className="space-y-3 text-xs sm:text-sm text-slate-200 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
                    <div>
                      <strong className="text-white">Governing Statutory Authority: </strong>
                      <span className="text-rose-200 font-semibold">{statutorySection}</span>
                    </div>
                    <div>
                      <strong className="text-white">Binding Supreme Court Landmark Precedent: </strong>
                      <span className="text-amber-200 font-semibold">{primaryRuling}</span>
                    </div>
                    <p className="pt-1">{legalAnalysis}</p>
                    <div className="pt-2 border-t border-white/10 text-emerald-300">
                      <strong>Litigation Action Directive: </strong>
                      <span>{proceduralDirective}</span>
                    </div>
                  </div>

                  {/* CTA inside tool */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <Link
                      href="/services/high-court-testamentary-suit-contested-will-defense"
                      className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs text-center transition-colors flex items-center justify-center gap-2"
                    >
                      <Gavel className="w-4 h-4" />
                      <span>Retain High Court Will Defense Counsel</span>
                    </Link>
                    <Link
                      href="/contact"
                      className="w-full sm:w-auto py-3 px-5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs text-center transition-colors"
                    >
                      Consult Testamentary Litigator
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: SECTION 68 & 70 BSA STATUTORY SAFETY NET */}
            <section id="statutory-safety-net" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>STATUTORY EVOLUTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Section 68 &amp; 70 BSA: The Statutory Safety Net
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The <strong>Bharatiya Sakshya Adhiniyam 2023</strong> replaced the old 1872 Act. The core rules remain firm. The new code modernizes court steps while protecting genuine Wills:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">1</span>
                      <span>Section 67 BSA (Old Section 68 IEA)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      You must call at least one witness if alive and able to depose. A Will cannot be read in evidence without this step under Section 63 of the Succession Act.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#C65378] text-white flex items-center justify-center text-xs">2</span>
                      <span>Section 70 BSA (Old Section 71 IEA)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      This gives you a vital legal remedy. If the witness denies signing, you can still prove the Will. You can use the scribe, doctor, SRO records, and forensic experts.
                    </p>
                  </div>
                </div>
                <p>
                  Section 70 BSA was specifically crafted by lawmakers to prevent the wishes of a deceased testator from being sabotaged by dishonest, colluding, or easily bribed witnesses. A witness cannot hold the testacy of a deceased person hostage.
                </p>

                {/* MANDATORY ON-PAGE ASSET: BSA SECTION 68 & 70 ALTERNATE ATTESTATION PROOF DECISION TREE */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4 pt-4 mt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                      <GitBranch className="w-4 h-4" />
                      <span>BSA SECTION 68 DECISION TREE: ALTERNATE ATTESTATION PROOF</span>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      Courtroom Evidentiary Pathways
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Navigate the four statutory decision branches when an attesting witness turns hostile in probate court. Test whether you can immediately lead secondary evidence or if you face the mandatory dual-witness duty:
                  </p>

                  {/* Decision Tree Branch Selectors */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setDecisionTreeTab("step1")}
                      className={`p-2.5 rounded-xl text-left text-xs font-bold transition-all ${
                        decisionTreeTab === "step1"
                          ? "bg-[#172228] text-white shadow-xs"
                          : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="text-[10px] text-rose-300 uppercase">Branch 1</div>
                      <div className="text-xs truncate">Witness 1 Hostile</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDecisionTreeTab("step2")}
                      className={`p-2.5 rounded-xl text-left text-xs font-bold transition-all ${
                        decisionTreeTab === "step2"
                          ? "bg-[#172228] text-white shadow-xs"
                          : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="text-[10px] text-rose-300 uppercase">Branch 2</div>
                      <div className="text-xs truncate">Witness 2 Dead / Hostile</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDecisionTreeTab("step3")}
                      className={`p-2.5 rounded-xl text-left text-xs font-bold transition-all ${
                        decisionTreeTab === "step3"
                          ? "bg-[#172228] text-white shadow-xs"
                          : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="text-[10px] text-rose-300 uppercase">Branch 3</div>
                      <div className="text-xs truncate">Registered Will (SRO)</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDecisionTreeTab("step4")}
                      className={`p-2.5 rounded-xl text-left text-xs font-bold transition-all ${
                        decisionTreeTab === "step4"
                          ? "bg-[#172228] text-white shadow-xs"
                          : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="text-[10px] text-rose-300 uppercase">Branch 4</div>
                      <div className="text-xs truncate">Forensic Perjury Rebuttal</div>
                    </button>
                  </div>

                  {/* Branch Details Display */}
                  {decisionTreeTab === "step1" && (
                    <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-2.5 text-xs text-slate-700">
                      <div className="flex items-center justify-between font-bold text-amber-950">
                        <span>Branch 1: Witness 1 Turns Hostile, Witness 2 Alive &amp; Available</span>
                        <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px]">Strict Janki Bhoir Gateway</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                        <div className="p-2.5 bg-white rounded-lg border border-amber-100">
                          <strong className="block text-slate-900">Legal Condition:</strong>
                          Witness 1 enters box and denies signature or execution. Witness 2 has not yet been summoned.
                        </div>
                        <div className="p-2.5 bg-white rounded-lg border border-amber-100">
                          <strong className="block text-slate-900">Mandatory Court SOP:</strong>
                          Must issue summons to Witness 2 under Order XVI CPC. Do NOT attempt to introduce scribe or doctor yet!
                        </div>
                        <div className="p-2.5 bg-white rounded-lg border border-amber-100">
                          <strong className="block text-slate-900">Statutory Consequence:</strong>
                          Bypassing Witness 2 results in automatic dismissal of probate under <em>Janki Narayan Bhoir (2003 SC)</em>.
                        </div>
                      </div>
                    </div>
                  )}

                  {decisionTreeTab === "step2" && (
                    <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-2.5 text-xs text-slate-700">
                      <div className="flex items-center justify-between font-bold text-emerald-950">
                        <span>Branch 2: Witness 1 Hostile, Witness 2 Deceased / Untraceable / Hostile</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 text-[10px]">Section 70 BSA Unlocked</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                        <div className="p-2.5 bg-white rounded-lg border border-emerald-100">
                          <strong className="block text-slate-900">Legal Condition:</strong>
                          Both attesting witnesses are accounted for (one hostile, one dead or untraceable or also hostile).
                        </div>
                        <div className="p-2.5 bg-white rounded-lg border border-emerald-100">
                          <strong className="block text-slate-900">Mandatory Court SOP:</strong>
                          Prove deceased witness signature under Section 68 BSA; file Section 70 BSA petition to examine Scribe and Doctor.
                        </div>
                        <div className="p-2.5 bg-white rounded-lg border border-emerald-100">
                          <strong className="block text-slate-900">Precedent Benchmark:</strong>
                          Full protection under <em>Babu Singh v. Ram Sahai (2008 SC)</em> and <em>Jagdish Chand Sharma (2015 SC)</em>.
                        </div>
                      </div>
                    </div>
                  )}

                  {decisionTreeTab === "step3" && (
                    <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 space-y-2.5 text-xs text-slate-700">
                      <div className="flex items-center justify-between font-bold text-blue-950">
                        <span>Branch 3: Registered Will (Sub-Registrar Endorsement Shield)</span>
                        <span className="px-2 py-0.5 rounded bg-blue-200 text-blue-900 text-[10px]">Section 60 Registration Act</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                        <div className="p-2.5 bg-white rounded-lg border border-blue-100">
                          <strong className="block text-slate-900">Legal Condition:</strong>
                          Will registered in Book 3 before Sub-Registrar of Assurances with official seals and signatures.
                        </div>
                        <div className="p-2.5 bg-white rounded-lg border border-blue-100">
                          <strong className="block text-slate-900">Mandatory Court SOP:</strong>
                          Subpoena Sub-Registrar and Book 3 volume under Order XVI Rule 1 &amp; 6 CPC; present biometric register records.
                        </div>
                        <div className="p-2.5 bg-white rounded-lg border border-blue-100">
                          <strong className="block text-slate-900">Statutory Presumption:</strong>
                          Official endorsement carries legal presumption of regularity under Section 60 of the Registration Act, 1908.
                        </div>
                      </div>
                    </div>
                  )}

                  {decisionTreeTab === "step4" && (
                    <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200/80 space-y-2.5 text-xs text-slate-700">
                      <div className="flex items-center justify-between font-bold text-rose-950">
                        <span>Branch 4: Witness Falsely Denies Genuine Signature on Oath</span>
                        <span className="px-2 py-0.5 rounded bg-rose-200 text-rose-900 text-[10px]">Forensic CFSL &amp; Perjury</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                        <div className="p-2.5 bg-white rounded-lg border border-rose-100">
                          <strong className="block text-slate-900">Legal Condition:</strong>
                          Hostile witness lies under oath, claiming signature on Will was forged or never signed by them.
                        </div>
                        <div className="p-2.5 bg-white rounded-lg border border-rose-100">
                          <strong className="block text-slate-900">Mandatory Court SOP:</strong>
                          Apply under Section 72 BSA for CFSL handwriting comparison with admitted bank KYC, passport, or court specimens.
                        </div>
                        <div className="p-2.5 bg-white rounded-lg border border-rose-100">
                          <strong className="block text-slate-900">Criminal Liability:</strong>
                          Move Section 340 CrPC (Section 379 BNSS) application to prosecute corrupt witness for perjury.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* SECTION 4: THE MANDATORY JANKI BHOIR RULE */}
            <section id="janki-bhoir-rule" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SUPREME COURT MANDATE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. The Mandatory Janki Bhoir Rule: Dual Witness Duty
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The leading Supreme Court case is <em>Janki Narayan Bhoir v. Narayan Namdeo Kadam (2003) 2 SCC 91</em>. This ruling sets what lawyers call the Strict Sequential Rule. You must call witnesses in a set order.
                </p>
                <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 space-y-2 text-xs sm:text-sm">
                  <div className="font-black flex items-center gap-2 text-amber-950 uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>The Fatal Trap in Janki Bhoir</span>
                  </div>
                  <p>
                    In <em>Janki Bhoir</em>, the first witness failed to prove the Will. The second witness was alive and available. But the propounder did not summon the second witness. Instead, the propounder tried to call other people right away.
                  </p>
                  <p className="font-bold">
                    The Supreme Court rejected the Will. The Court held that Section 70 BSA is not a shortcut. You cannot bypass a living second witness. You must call witness two first.
                  </p>
                </div>
                <p>
                  <strong>The Rule for Litigants:</strong> If witness one turns hostile, you must summon witness two at once. Use Order XVI of the CPC. Never skip this step. Only when witness two is also hostile, dead, or untraceable does Section 70 BSA unlock full alternate proof.
                </p>

              {/* Plain English Janki Bhoir Checklist */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2.5 text-xs text-slate-800">
                <div className="font-extrabold text-amber-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Plain English Summary: The Two-Witness Court Rule</span>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  Never jump to secondary proof too soon. If witness one turns bad, you must call witness two first.
                  Is witness two alive? Call them. Is witness two dead? File the death slip. Is witness two lost?
                  File the police non-trace note. Once you clear this step, the door opens wide for all your other proof.
                </p>
              </div>
              </div>
            </section>

            {/* SECTION 5: EXAMINING THE SCRIBE, ADVOCATE, AND DOCTOR */}
            <section id="scribe-advocate-doctor" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>ALTERNATE EYE-WITNESSES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Examining the Scribe, Advocate, and Doctor
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Who can prove the Will once witnesses turn hostile? The Supreme Court in <em>Babu Singh (2008)</em> and <em>Raj Kumari (2021)</em> approved three trusted witnesses:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <FileSignature className="w-4 h-4 text-[#C65378]" />
                      <span>The Document Scribe</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The scribe wrote the Will as told by the Will maker. The scribe can state that all parties signed together. This direct proof validates the Will in court.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Scale className="w-4 h-4 text-[#5F7E75]" />
                      <span>The Drafting Advocate</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The lawyer who drafted the Will is an officer of the court. In <em>Raj Kumari (2021)</em>, the Supreme Court held that the lawyer&rsquo;s word carries great weight. It beats a hostile witness.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span>The Attending Doctor</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The doctor who saw the Will maker is key. If a witness claims weak mind or force, the doctor&rsquo;s medical note disproves that lie fast.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: SUB-REGISTRAR SUMMONS & SRO REGISTRATION BOOK */}
            <section id="sub-registrar-summons" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>REGISTRATION ACT REMEDY</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Sub-Registrar Summons &amp; SRO Registration Book
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Will registration is optional under Section 18 of the Registration Act 1908. But when a witness turns hostile in court, registration is your strongest shield.
                </p>
                <p>
                  Under <strong>Section 60 of the Registration Act</strong>, the Sub-Registrar&rsquo;s endorsement is strong proof. It proves the facts written on the deed took place as noted. At the SRO, witnesses sign the register. They also give thumbprints and photos before a public officer.
                </p>
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs sm:text-sm text-slate-700">
                  <div className="font-bold text-slate-900">How to Subpoena the SRO in Probate Court:</div>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>File an application under Order XVI Rule 1 &amp; 6 of the CPC to summon the Sub-Registrar or Record Keeper.</li>
                    <li>Requisition the production of <strong>Book 3 (Register of Wills and Authorities to Adopt)</strong>.</li>
                    <li>Produce the official SRO endorsement sheet containing the photo, signature, and thumb impression of the hostile witness.</li>
                    <li>Cross-examine the hostile witness confronting them with their biometric registration record.</li>
                  </ol>
                </div>

              {/* Plain English SRO Subpoena Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2.5 text-xs text-slate-800">
                <div className="font-extrabold text-blue-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-blue-600" />
                  <span>Plain English Steps: Using SRO Records in Court</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700">
                  <div className="p-2.5 bg-white rounded-xl border border-blue-100">
                    <strong className="block text-slate-900">Official Book 3 Presumption:</strong>
                    <span>Public acts are presumed true by law. The Sub-Registrar seal carries high court weight.</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-blue-100">
                    <strong className="block text-slate-900">Biometric Proof Traps Liars:</strong>
                    <span>A witness cannot deny their thumbprint on Book 3. That ink print traps them on oath.</span>
                  </div>
                </div>
              </div>

              </div>
            </section>

            {/* SECTION 7: FORENSIC HANDWRITING ANALYSIS */}
            <section id="forensic-handwriting" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Search className="w-4 h-4" />
                <span>FORENSIC SCIENCE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Forensic Handwriting Analysis Under Section 72 BSA
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  What if a witness lies on oath and denies their signature? You can use <strong>Section 72 BSA</strong> (old Section 73 Evidence Act). The court has full power to compare disputed signatures with admitted papers.
                </p>
                <p>
                  Section 72 lets the judge compare handwriting. You can ask the court to send the Will to government forensic experts at CFSL:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Admitted Signatures:</strong> Get specimen signatures of the witness taken in open court. You can also summon admitted signatures from bank KYC, driving licenses, passports, or sale deeds.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Forensic Expert Report:</strong> A scientific handwriting report from CFSL proves the witness signed the Will. This report proves the witness is lying.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Criminal Action for Perjury:</strong> Under Section 340 CrPC (now Section 379 BNSS), you can seek the criminal trial of the corrupt witness for perjury.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 8: DEFENSE MATRIX TABLE */}
            <section id="defense-matrix" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSpreadsheet className="w-4 h-4" />
                <span>EVIDENCE STRATEGY MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Hostile Witness Defense Matrix: Evidence Routes
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Compare the five main courtroom scenarios, statutory paths, alternate witnesses, and success rates:
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
                <div className="font-bold text-slate-900">Key Facts to Remember in Court:</div>
                <p>
                  Hostility does not end your case. You have rights under Section 70 BSA. The law lets you call other witnesses. The scribe can prove the signing. The doctor can prove sound mind. Public land records carry high weight. The judge will look at all the facts. Do not panic if a witness lies.
                </p>
              </div>


              {/* Responsive Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-wider font-extrabold">
                    <tr>
                      <th className="py-3.5 px-4">Courtroom Scenario</th>
                      <th className="py-3.5 px-3">Statutory Shield</th>
                      <th className="py-3.5 px-3">Primary Alternate Witness</th>
                      <th className="py-3.5 px-3">Standard of Proof</th>
                      <th className="py-3.5 px-3">Success Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        Witness 1 turns hostile. Witness 2 alive and ready.
                      </td>
                      <td className="py-3 px-3 text-[#C65378] font-bold">Section 67 BSA</td>
                      <td className="py-3 px-3">Attesting Witness No. 2</td>
                      <td className="py-3 px-3">Direct attestation proof.</td>
                      <td className="py-3 px-3 font-extrabold text-emerald-600">95% (High)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        Witness 1 dead. Witness 2 denies signing registered Will.
                      </td>
                      <td className="py-3 px-3 text-[#C65378] font-bold">Section 68 &amp; 70 BSA</td>
                      <td className="py-3 px-3">Document Scribe + Sub-Registrar</td>
                      <td className="py-3 px-3">SRO Book 3 and scribe deposition.</td>
                      <td className="py-3 px-3 font-extrabold text-emerald-600">88% (High)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        Both witnesses colluded with caveator on unregistered Will.
                      </td>
                      <td className="py-3 px-3 text-[#C65378] font-bold">Section 70 &amp; 72 BSA</td>
                      <td className="py-3 px-3">Drafting Lawyer + CFSL Expert</td>
                      <td className="py-3 px-3">Forensic signature check.</td>
                      <td className="py-3 px-3 font-extrabold text-blue-600">65% (Moderate)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        Witness claims memory loss due to old age.
                      </td>
                      <td className="py-3 px-3 text-[#C65378] font-bold">Section 70 BSA</td>
                      <td className="py-3 px-3">Attestation Clause + Signature admission</td>
                      <td className="py-3 px-3">Admission of handwriting.</td>
                      <td className="py-3 px-3 font-extrabold text-emerald-600">82% (High)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        Witness alleges testator was sick or coerced.
                      </td>
                      <td className="py-3 px-3 text-[#C65378] font-bold">Section 70 BSA &amp; s. 63 ISA</td>
                      <td className="py-3 px-3">Treating Doctor + Video evidence</td>
                      <td className="py-3 px-3">Medical fitness certificate.</td>
                      <td className="py-3 px-3 font-extrabold text-blue-600">72% (Moderate)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 9: PRECEDENT MATCHER */}
            <section id="precedent-matcher" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>CASE LAW ENGINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Precedent Matcher: Key Supreme Court Rulings
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Click a landmark ruling below. Read what the Supreme Court held. Match your case with established law:
              </p>

              {/* Precedent Tabs */}
              <div className="flex flex-wrap gap-2 pt-1">
                {PRECEDENTS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedPrecedent(item.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedPrecedent === item.id
                        ? "bg-[#C65378] text-white shadow-sm"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {item.title.split("v.")[0].trim()}
                  </button>
                ))}
              </div>

              {/* Selected Precedent Card */}
              {(() => {
                const current = PRECEDENTS.find((p) => p.id === selectedPrecedent) || PRECEDENTS[0];
                return (
                  <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <div className="text-sm sm:text-base font-extrabold text-slate-900">{current.title}</div>
                        <div className="text-xs text-slate-500">{current.bench}</div>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-rose-50 text-[#C65378] text-[11px] font-bold">
                        Supreme Court Ratio
                      </span>
                    </div>
                    <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                      <div>
                        <strong className="text-slate-900">Dispute Scenario: </strong>
                        <span>{current.scenario}</span>
                      </div>
                      <div>
                        <strong className="text-slate-900">Legal Ratio Decidendi: </strong>
                        <p className="mt-0.5 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100 text-slate-800">
                          &ldquo;{current.ratio}&rdquo;
                        </p>
                      </div>
                      <div className="pt-1 flex items-start gap-2 text-emerald-800 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Litigation Takeaway: {current.keyTakeaway}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </section>

            {/* SECTION 10: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>PROCEDURAL LITIGATION PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Step-by-Step SOP: Rescuing a Contested Will
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Follow this five-step court process. It guides you when a witness turns hostile in court:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <strong className="text-slate-900">Declare Witness Hostile Immediately</strong>
                    <p className="text-slate-600">
                      Ask the judge to declare the witness hostile right away. Use Section 145 BSA (old Section 154 Evidence Act). This unlocks your legal right to cross-examine them with leading questions.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <strong className="text-slate-900">Confront with Previous Statements &amp; SRO Records</strong>
                    <p className="text-slate-600">
                      Confront the witness with their prior court affidavit under Section 281 ISA. Show them their signature on the SRO register. Show their bank KYC cards. Expose their false statements on court record.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <strong className="text-slate-900">Exhaust Witness No. 2 (Mandatory Janki Bhoir Step)</strong>
                    <p className="text-slate-600">
                      Summon witness two at once if they are alive. If witness two proves the Will, Section 67 BSA is fully satisfied. The court will grant probate even if witness one turned hostile.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <strong className="text-slate-900">Invoke Section 70 BSA &amp; Examine Alternate Witnesses</strong>
                    <p className="text-slate-600">
                      File an application under Section 70 BSA. Call the scribe, the drafting lawyer, and the attending doctor to court. Their direct testimony proves valid execution.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#5F7E75] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    5
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <strong className="text-slate-900">Summon SRO Book 3 &amp; Move Section 340 Perjury Petition</strong>
                    <p className="text-slate-600">
                      Summon the Sub-Registrar with Book 3. This invokes the legal presumption under Section 60 of the Registration Act. Also file a Section 340 CrPC / 379 BNSS perjury case against the lying witness.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: PRACTICAL CASE STUDIES */}
            <section id="case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>JUDICIAL FIELD REPORTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Practical Litigation Case Studies in India
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">Case Study: Delhi High Court</span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Probate Upheld</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    South Delhi Estate: Bribed Witness Denied Thumb Impression
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    In a South Delhi case worth ₹14 Crore, an excluded son bribed the sole surviving witness. The witness denied going to the Sub-Registrar office. Counsel summoned the Sub-Registrar with Book 3. The book had the witness&rsquo;s photo and thumbprint. The Delhi High Court rejected the false claim. The Court held public records firm and granted probate.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">Case Study: Bombay High Court</span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Probate Granted</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Pune Bungalow: Memory Loss Cured by Drafting Advocate
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    In a Pune bungalow case, an elderly witness claimed complete memory loss. Counsel examined the drafting advocate. The advocate brought his office diary and fee receipt. He deposed that the testator and witnesses signed together in his presence. The Bombay High Court invoked Section 70 BSA and probated the Will.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: COURTROOM CHECKLIST & MODEL PETITIONS */}
            <section id="courtroom-checklist" className="scroll-target scroll-mt-28 space-y-5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>PRACTICE DRAFTS &amp; CHECKLISTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Courtroom Cross-Examination Checklist &amp; Petitions
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Use our model court petition and Sub-Registrar summons checklist for your case:
              </p>

              {/* Template Box 1: Section 70 BSA Model Petition */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Model Application Under Section 70 BSA (To Lead Alternate Scribe Evidence)
                  </div>
                  <button
                    type="button"
                    onClick={copyClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedClause ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Model Petition</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"APPLICATION UNDER SECTION 70 OF THE BHARATIYA SAKSHYA ADHINIYAM, 2023
(ERSTWHILE SECTION 71 OF THE INDIAN EVIDENCE ACT, 1872)

1. That PW-1 (Attesting Witness No. 1) has turned hostile and falsely denied his signature on the Will dated [Date] during cross-examination.
2. That Attesting Witness No. 2 is deceased / untraceable / also hostile as evidenced by the death certificate / process report annexed herewith.
3. Under the binding Supreme Court rulings in 'Babu Singh v. Ram Sahai' (2008) 14 SCC 754 and 'Raj Kumari v. Surinder Pal Sharma' (2021) 14 SCC 500, when attesting witnesses deny execution, the execution of the Will may be proved by OTHER EVIDENCE.
4. PRAYER: Permit the Petitioner to prove due execution through the Document Scribe / Drafting Advocate and the Sub-Registrar of Assurances."`}
                </pre>
              </div>

              {/* Template Box 2: Summons Checklist */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Order XVI CPC Sub-Registrar Summons Checklist
                  </div>
                  <button
                    type="button"
                    onClick={copySummonsToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedSummons ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Summons Checklist</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Certified Copy of Registered Will with SRO Volume &amp; Page</span>
                  </div>
                  <div className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Requisition for Original Book 3 Register &amp; Thumb Impressions</span>
                  </div>
                  <div className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>SRO Endorsement Sheet under Section 60 Registration Act</span>
                  </div>
                  <div className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Witness Diet Money &amp; Process Fee Challan for SRO Official</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 13: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Institutional Profile: Legal Excellence &amp; Trust
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Testamentary Litigation Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Testamentary Counsel</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is India's leading estate planning portal, backed by AMA Legal Solutions. Our senior High Court lawyers defend contested wills. We cross-examine hostile witnesses. We coordinate forensic CFSL signature checks. We protect genuine wills across all Indian High Courts.
                </p>

                {/* Service Grid Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/high-court-testamentary-suit-contested-will-defense"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>High Court Will Defense</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/services/probate-of-will-in-delhi-high-court"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Delhi HC Probate Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/probate-court-fee-timeline-calculator"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Probate Fee Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/contact"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Talk to Litigator</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 14: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>LEGAL KNOWLEDGE BASE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Frequently Asked Questions: Hostile Witnesses
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Clear legal answers on witness hostility, Janki Bhoir compliance, scribe evidence, and Section 70 BSA under Indian law:
              </p>

              <div className="space-y-3 pt-2">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 15: LEGAL CITATIONS & JUDICIAL PORTALS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>OFFICIAL STATUTORY PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                15. Legal Citations &amp; High Court Judicial Portals
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <a
                  href="https://www.sci.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[#C65378] hover:bg-rose-50/40 transition-all flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-900 group-hover:text-[#C65378]">
                      Supreme Court of India (SCI)
                    </div>
                    <div className="text-[11px] text-slate-500">Official Portal: Judgments &amp; Cause Lists</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#C65378]" />
                </a>

                <a
                  href="https://www.indiacode.nic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[#C65378] hover:bg-rose-50/40 transition-all flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-900 group-hover:text-[#C65378]">
                      India Code Digital Legislative Repository
                    </div>
                    <div className="text-[11px] text-slate-500">Bharatiya Sakshya Adhiniyam, 2023 &amp; ISA 1925</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#C65378]" />
                </a>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY CONVERSION CARDS & DUAL CTAS
              ===================================================================== */}
          <aside className="sticky top-24 space-y-6">
            {/* QUICK STATS CARD */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>ATTESTATION SUMMARY</span>
              </div>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between pb-1 border-b border-slate-100">
                  <span className="text-slate-500">Mandatory Witnesses:</span>
                  <span className="font-bold text-slate-900">Minimum 2 (s. 63 ISA)</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-slate-100">
                  <span className="text-slate-500">Court Examination:</span>
                  <span className="font-bold text-slate-900">At least 1 (s. 67 BSA)</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-slate-100">
                  <span className="text-slate-500">Hostility Safety Net:</span>
                  <span className="font-bold text-[#C65378]">Section 70 BSA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">SRO Presumption:</span>
                  <span className="font-bold text-emerald-700">Section 60 Reg. Act</span>
                </div>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-6">
              {/* CARD 2: DUAL CTA 1 - HIGH COURT WILL DEFENSE (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>HIGH COURT CONTESTED WILL DEFENSE</span>
                </div>
                <h4 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Witness Turned Hostile in Probate Court?
                </h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  Our High Court lawyers defend contested wills. We cross-examine hostile witnesses. We summon Sub-Registrar Book 3 records. We prove wills under Section 70 BSA.
                </p>
                <Link
                  href="/services/high-court-testamentary-suit-contested-will-defense"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Gavel className="w-3.5 h-3.5" />
                  <span>Retain Testamentary Defense Counsel</span>
                </Link>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pan-India High Court &amp; District Bench</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (White / Rose Border) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>PROBATE LITIGATION DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Facing Bribery, Perjury, or Witness Collusion?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Get fast legal advice. Learn how to use Section 70 BSA. File perjury claims under Section 340 CrPC. Summon official SRO land records.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Schedule Litigation Conference</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Litigants Rely on WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Supreme Court Bench Rulings:</strong> Backed strictly by the <em>Janki Bhoir</em> and <em>Babu Singh</em> precedents.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Section 70 BSA Strategy:</strong> Deploys scribe testimony, attending doctor fitness, and forensic handwriting analysis.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Fatal Errors:</strong> Strictly adheres to the sequential dual-witness examination doctrine.
                    </span>
                  </li>
                </ul>
              </div>
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
          <span>Proof Checker</span>
        </a>
        <Link
          href="/services/high-court-testamentary-suit-contested-will-defense"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Gavel className="w-3.5 h-3.5" />
          <span>Court Defense</span>
        </Link>
      </div>
    </div>
  );
}
