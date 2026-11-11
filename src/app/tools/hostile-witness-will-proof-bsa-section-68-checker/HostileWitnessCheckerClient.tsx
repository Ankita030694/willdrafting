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
    ratio: "Section 71 IEA (now Section 70 BSA) is an exception, not a casual shortcut. If the first attesting witness turns hostile, the propounder must first examine the other surviving attesting witness if alive and capable of giving evidence before resorting to alternate proof.",
    keyTakeaway: "Always summon all surviving attesting witnesses. Never skip Witness 2 even if Witness 1 turns hostile.",
  },
  {
    id: "babu-singh",
    title: "Babu Singh & Ors. v. Ram Sahai @ Ram Singh (2008) 14 SCC 754",
    bench: "Supreme Court of India",
    scenario: "One attesting witness dead, surviving witness colluded with contesting heirs and denied signature",
    ratio: "When one witness is dead and the other denies execution due to collusion, Section 71 (now Section 70 BSA) permits proving execution through the document writer (scribe) and other credible circumstantial evidence.",
    keyTakeaway: "Hostility of the sole surviving witness does not invalidate the Will if the scribe and execution circumstances are credible.",
  },
  {
    id: "jagdish-chand",
    title: "Jagdish Chand Sharma v. Narain Singh Saini (2015) 8 SCC 615",
    bench: "Supreme Court of India",
    scenario: "Attesting witnesses claimed lack of recollection and vague memories regarding testator's mental state",
    ratio: "The court must balance the mandatory requirements of Section 68 with Section 71. If witnesses turn hostile under external inducements, court can rely on sub-registrar endorsements and contemporaneous medical evidence.",
    keyTakeaway: "A doctor's fitness certificate and official registration defeat hostile claims of unsound mind.",
  },
  {
    id: "raj-kumari",
    title: "Raj Kumari & Ors. v. Surinder Pal Sharma (2021) 14 SCC 500",
    bench: "Supreme Court of India",
    scenario: "Sole surviving attesting witness turned hostile; drafting advocate and sub-registrar records deposed",
    ratio: "Where an attesting witness turns hostile and denies their signature, the testimony of the drafting advocate who prepared the Will and was present at execution is valid alternate evidence under Section 71 of the Evidence Act.",
    keyTakeaway: "The drafting advocate who personally oversaw execution acts as a decisive anchor witness in contested probate.",
  },
];

const FAQS = [
  {
    q: "Does a Will fail automatically if an attesting witness turns hostile in court?",
    a: "No. A Will does not fail simply because an attesting witness turns hostile or denies signing. Under Section 70 of the Bharatiya Sakshya Adhiniyam, 2023 (erstwhile Section 71 of the Indian Evidence Act, 1872), if an attesting witness denies or does not recollect execution, the propounder is permitted to prove execution by other evidence, including the scribe, the drafting advocate, the Sub-Registrar, and forensic handwriting analysis.",
  },
  {
    q: "What is the mandatory Janki Bhoir rule established by the Supreme Court?",
    a: "In Janki Narayan Bhoir v. Narayan Namdeo Kadam (2003) 2 SCC 91, the Supreme Court ruled that a propounder cannot bypass available attesting witnesses. If the first witness turns hostile or fails to prove attestation, the propounder cannot immediately jump to alternate evidence under Section 70 BSA if the second attesting witness is alive, capable of testifying, and subject to court process. The surviving witness must first be summoned.",
  },
  {
    q: "How does Section 70 BSA save a Will when witnesses deny execution?",
    a: "Section 70 of the Bharatiya Sakshya Adhiniyam, 2023 acts as a statutory safety net. It provides that when attesting witnesses deny or do not recollect the execution, the propounder can lead other evidence. This includes producing the document scribe, the doctor who certified testamentary capacity, the registration records from the Sub-Registrar Office, and cross-examining the hostile witness.",
  },
  {
    q: "Can a document scribe or drafting advocate prove execution of the Will?",
    a: "Yes. When attesting witnesses turn hostile or have passed away, the testimony of the scribe who drafted the Will or the advocate who typed and oversaw execution is admissible and highly persuasive under Section 70 BSA, provided they depose that they saw the testator sign and the attesting witnesses append signatures in each other's presence.",
  },
  {
    q: "How does Sub-Registrar registration help overcome a hostile witness?",
    a: "Under Section 60 of the Registration Act, 1908, the Sub-Registrar's endorsement creates a strong legal presumption of due execution. The propounder can summon the Sub-Registrar and the official Book 3 register under Order XVI Rule 1 of the CPC to show that the testator and witnesses appeared in person, provided biometrics, and admitted execution before a public officer.",
  },
  {
    q: "What legal action can be taken against a bribed or colluding hostile witness?",
    a: "If an attesting witness commits perjury by falsely denying their genuine signature after being influenced by opposing heirs, the propounder can file an application under Section 340 of the CrPC (now Section 379 BNSS) for criminal prosecution for perjury, alongside summoning their admitted signatures from bank accounts or voter IDs for forensic comparison under Section 72 BSA.",
  },
  {
    q: "Can handwriting experts prove the signature of a hostile witness under Section 72 BSA?",
    a: "Yes. Under Section 72 of the Bharatiya Sakshya Adhiniyam, 2023 (erstwhile Section 73 of the Indian Evidence Act), the court or a forensic handwriting expert can compare the disputed signature on the Will with admitted genuine signatures of the witness taken from government registers, driving licenses, bank KYC documents, or specimen signatures taken in open court.",
  },
  {
    q: "What happens if one attesting witness is dead and the other turns hostile?",
    a: "Under the Supreme Court ruling in Babu Singh v. Ram Sahai (2008), when one attesting witness is dead and the surviving witness denies execution, the propounder can prove the deceased witness's signature under Section 68 BSA (erstwhile Section 69 IEA) and invoke Section 70 BSA to introduce the scribe, registration records, and treating physician to establish valid execution.",
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
    "Because your second attesting witness is alive, cooperative, and capable of testifying, the hostility of Witness 1 does not damage your probate suit. Under Section 67 BSA, examining even ONE competent attesting witness who proves execution and attestation fully satisfies the statutory requirement.";
  let proceduralDirective =
    "Summon Witness 2 into the witness box immediately. Do not jump to alternate evidence under Section 70 BSA before examining Witness 2. Cross-examine Witness 1 under Section 154 of the Evidence Act to expose their bribery or collusion.";

  if (witness2Status === "not_yet_summoned") {
    rescueViability = "Procedural Block: High Dismissal Risk";
    viabilityScore = 35;
    strategicRoute = "Mandatory Summons to Witness 2 Required";
    badgeStyle = "bg-amber-50 text-amber-800 border-amber-300";
    primaryRuling = "Janki Narayan Bhoir v. Narayan Namdeo Kadam (2003) 2 SCC 91";
    statutorySection = "Section 67 BSA & Order XVI CPC";
    legalAnalysis =
      "CRITICAL WARNING: If you fail to summon the second attesting witness and immediately try to prove the Will via the scribe, your testamentary suit will be dismissed by the court under the binding Supreme Court rule in Janki Bhoir.";
    proceduralDirective =
      "File a formal application under Order XVI Rule 1 of the CPC for court summons against Witness 2. Only if Witness 2 also denies execution or is reported untraceable/dead can you invoke Section 70 BSA.";
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
            Assess evidentiary strategies when an attesting witness turns hostile, colludes, or denies their signature in probate court. Invoke Section 70 BSA, scribe evidence, and SRO records.
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
                Governed by Bharatiya Sakshya Adhiniyam, 2023 (Sections 67, 68, 70, 72) and Indian Succession Act, 1925 (Section 63). Supported by Supreme Court rulings in Janki Narayan Bhoir and Babu Singh.
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
                    <strong>Witness Hostility Does Not Kill the Will:</strong> The most dangerous misconception among litigants is assuming that if an attesting witness denies their signature or takes a bribe, the Will is automatically void. Indian law provides a statutory shield under Section 70 BSA.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>The Mandatory Dual-Witness Rule (Janki Bhoir):</strong> You cannot bypass the second attesting witness. If Witness 1 turns hostile, you must examine Witness 2 if they are alive and available before invoking alternate evidence.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Document Scribe &amp; Advocate Proof:</strong> Under Section 70 BSA, the advocate who drafted the Will or the scribe who typed it can depose as an eyewitness to prove due execution and attestation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Sub-Registrar Summons &amp; Perjury Action:</strong> Official SRO Book 3 records carry a presumption of regularity under Section 60 of the Registration Act. Perjured witnesses can be prosecuted under Section 340 CrPC.
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
                Visualizing Indian courtroom testamentary litigation: When an attesting witness is bribed or turns hostile, Section 70 BSA and the Janki Bhoir Supreme Court precedent enable propounders to rescue the Will via scribe testimony and Sub-Registrar records.
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
                  Under <strong>Section 67 of the Bharatiya Sakshya Adhiniyam, 2023 (BSA)</strong> (which corresponds to Section 68 of the erstwhile Indian Evidence Act, 1872), the law creates a mandatory threshold: at least one attesting witness must be examined in court to prove execution, provided an attesting witness is alive, capable of giving evidence, and subject to court process.
                </p>
                <p>
                  However, litigation often takes an ugly turn. Disgruntled legal heirs who were excluded by the testator frequently contact the attesting witnesses, offer monetary inducements, or issue threats. As a result, the attesting witness enters the witness box, turns hostile, and denies having seen the testator sign or falsely disowns their own signature.
                </p>
                <p>
                  To prevent fraud and preserve the sanctity of a genuine Will, the legislature created <strong>Section 70 of the BSA (erstwhile Section 71 IEA)</strong>. This vital provision states: <em>&ldquo;If the attesting witness denies or does not recollect the execution of the document, its execution may be proved by other evidence.&rdquo;</em>
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
                Select the exact facts of your courtroom dispute below. Our algorithmic legal engine evaluates your statutory standing under BSA Sections 67, 68, 70, and binding Supreme Court precedents.
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
                  With the enactment of the <strong>Bharatiya Sakshya Adhiniyam, 2023</strong> (which replaced the colonial Indian Evidence Act, 1872), the core evidentiary framework for wills was modernized while preserving historical judicial doctrines:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">1</span>
                      <span>Section 67 BSA (Old Section 68 IEA)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Mandates that a document required by law to be attested (such as a Will under Section 63 of the Indian Succession Act) cannot be used in evidence until at least one attesting witness has been called to prove execution, if alive and capable of giving evidence.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#C65378] text-white flex items-center justify-center text-xs">2</span>
                      <span>Section 70 BSA (Old Section 71 IEA)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Provides the critical exception: If the attesting witness denies or does not recollect execution, the propounder is not helpless. The execution of the document may be established through other evidence, including scribes, handwriting experts, and registration records.
                    </p>
                  </div>
                </div>
                <p>
                  Section 70 BSA was specifically crafted by lawmakers to prevent the wishes of a deceased testator from being sabotaged by dishonest, colluding, or easily bribed witnesses. A witness cannot hold the testacy of a deceased person hostage.
                </p>
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
                  The cornerstone precedent governing hostile attesting witnesses in India is the Supreme Court&rsquo;s landmark judgment in <em>Janki Narayan Bhoir v. Narayan Namdeo Kadam (2003) 2 SCC 91</em>. This ruling established what litigators call the &ldquo;Strict Sequential Exhaustion Doctrine&rdquo;.
                </p>
                <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 space-y-2 text-xs sm:text-sm">
                  <div className="font-black flex items-center gap-2 text-amber-950 uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>The Fatal Trap in Janki Bhoir</span>
                  </div>
                  <p>
                    In <em>Janki Bhoir</em>, the propounder examined Attesting Witness No. 1 (Prabhakar), who failed to prove that the second witness (Wagle) signed in his presence or in the presence of the testator. Crucially, Witness No. 2 (Wagle) was alive and available, but the propounder chose not to examine him and directly attempted to prove the Will via alternate secondary evidence.
                  </p>
                  <p className="font-bold">
                    The Supreme Court dismissed the probate suit, holding that Section 71 (now Section 70 BSA) cannot be invoked as an easy shortcut if the other surviving attesting witness has not been summoned or examined.
                  </p>
                </div>
                <p>
                  <strong>The Rule for Litigants:</strong> If Witness 1 turns hostile, denies their signature, or is bribed by the caveator, you MUST issue a court summons to Witness 2 under Order XVI of the CPC. Only when Witness 2 also turns hostile, or is proved dead, untraceable, or incapable of deposing, does Section 70 BSA completely open the floodgates for alternate evidence.
                </p>
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
                  Once the statutory hurdles of Section 67 BSA are cleared and the witnesses have turned hostile, who can prove the Will under Section 70 BSA? The Supreme Court in <em>Babu Singh v. Ram Sahai (2008)</em> and <em>Raj Kumari v. Surinder Pal Sharma (2021)</em> recognized three primary categories of credible alternate witnesses:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <FileSignature className="w-4 h-4 text-[#C65378]" />
                      <span>The Document Scribe</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A professional scribe who drafted the Will on the testator&rsquo;s instructions. If the scribe deposes that the testator signed in their presence and the attesting witnesses signed at the same sitting, this testimony proves execution.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Scale className="w-4 h-4 text-[#5F7E75]" />
                      <span>The Drafting Advocate</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      In <em>Raj Kumari (2021)</em>, the Supreme Court held that the advocate who drafted the Will and accompanied the testator to the registration office acts as an impeccable witness whose testimony overrides a hostile attesting witness.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span>The Attending Doctor</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      If the hostile witness claims the testator was bedridden or unconscious, the treating physician who examined the testator and endorsed the medical fitness certificate directly refutes the allegation of incapacity.
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
                  Registration of a Will is optional under Section 18 of the Registration Act, 1908. However, when an attesting witness turns hostile in court, registration becomes the propounder&rsquo;s ultimate legal shield.
                </p>
                <p>
                  Under <strong>Section 60 of the Registration Act, 1908</strong>, the endorsement certificate by the Sub-Registrar is admissible for proving that the document has been duly registered and that the facts mentioned in the endorsements occurred as stated. When a witness appears before the Sub-Registrar, they sign the official register, provide biometric thumbprints, and are photographed.
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
                  When a hostile witness baldly lies on oath and denies that the signature on the Will is theirs, the propounder can invoke <strong>Section 72 of the Bharatiya Sakshya Adhiniyam, 2023</strong> (erstwhile Section 73 of the Indian Evidence Act).
                </p>
                <p>
                  Section 72 empowers the court to compare disputed signatures with admitted genuine signatures. In contested testamentary litigation, the propounder can file an application to refer the signatures to a Government Questioned Document Examiner (such as the Central Forensic Science Laboratory, CFSL):
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Admitted Signatures of the Witness:</strong> Obtain the hostile witness&rsquo;s specimen signatures taken in court, or admitted signatures from their bank account opening forms, driving license, passport, or registered sale deeds.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Forensic Report Admissibility:</strong> A scientific handwriting expert report establishing that the signature on the Will was penned by the hostile witness conclusively proves perjury.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Criminal Prosecution for Perjury:</strong> Under Section 340 CrPC (now Section 379 BNSS), the propounder can seek the witness&rsquo;s criminal trial for giving false evidence under Section 227/229 BNS.</span>
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
                Compare the five primary courtroom hostility scenarios, statutory pathways, alternate witnesses, and judicial success rates:
              </p>

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
                        Witness 1 turns hostile; Witness 2 alive &amp; available
                      </td>
                      <td className="py-3 px-3 text-[#C65378] font-bold">Section 67 BSA</td>
                      <td className="py-3 px-3">Attesting Witness No. 2</td>
                      <td className="py-3 px-3">Direct attestation proof</td>
                      <td className="py-3 px-3 font-extrabold text-emerald-600">95% (High)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        Witness 1 dead; Witness 2 denies signature (Registered Will)
                      </td>
                      <td className="py-3 px-3 text-[#C65378] font-bold">Section 68 &amp; 70 BSA</td>
                      <td className="py-3 px-3">Document Scribe + Sub-Registrar</td>
                      <td className="py-3 px-3">SRO Book 3 + Scribe deposition</td>
                      <td className="py-3 px-3 font-extrabold text-emerald-600">88% (High)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        Both witnesses colluded with caveator (Unregistered Will)
                      </td>
                      <td className="py-3 px-3 text-[#C65378] font-bold">Section 70 &amp; 72 BSA</td>
                      <td className="py-3 px-3">Drafting Lawyer + CFSL Expert</td>
                      <td className="py-3 px-3">Forensic signature comparison</td>
                      <td className="py-3 px-3 font-extrabold text-blue-600">65% (Moderate)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        Witness claims memory loss due to old age
                      </td>
                      <td className="py-3 px-3 text-[#C65378] font-bold">Section 70 BSA</td>
                      <td className="py-3 px-3">Attestation Clause + Signature admission</td>
                      <td className="py-3 px-3">Admission of handwriting</td>
                      <td className="py-3 px-3 font-extrabold text-emerald-600">82% (High)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        Witness alleges testator was incapacitated / coerced
                      </td>
                      <td className="py-3 px-3 text-[#C65378] font-bold">Section 70 BSA &amp; s. 63 ISA</td>
                      <td className="py-3 px-3">Treating Doctor + Video evidence</td>
                      <td className="py-3 px-3">Medical fitness certificate</td>
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
                Click a landmark judgment below to review the Supreme Court&rsquo;s ratio decidendi and match your dispute to established jurisprudence:
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
                Follow this standard operating procedure when an attesting witness turns hostile in district court or High Court testamentary proceedings:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <strong className="text-slate-900">Declare Witness Hostile Immediately</strong>
                    <p className="text-slate-600">
                      The moment the witness denies their signature or changes their story, counsel must request the court under Section 154 of the Evidence Act to declare them hostile and permit cross-examination with leading questions.
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
                      Confront the witness with their affidavit filed under Section 281 of the Indian Succession Act, their signature on the SRO register, and their bank KYC signatures to demonstrate false testimony.
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
                      If Witness No. 2 is alive, issue court summons immediately. If they depose in favor of the Will, Section 67 BSA is satisfied and probate is granted regardless of Witness 1&rsquo;s hostility.
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
                      File an application under Section 70 BSA to introduce the document scribe, drafting advocate, identifying witness, and attending doctor as secondary eye-witnesses of execution.
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
                      Summon the Sub-Registrar with Book 3 to establish the statutory presumption under Section 60 of the Registration Act. File a Section 340 CrPC / Section 379 BNSS petition against the bribed witness.
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
                    In a contested probate suit concerning a ₹14 Crore Greater Kailash property, the sole surviving attesting witness was bought out by the testator&rsquo;s excluded son. The witness denied attending the Sub-Registrar office. Counsel summoned the SRO Sub-Registrar along with the Book 3 register and thumb impression biometric sheet. The High Court rejected the hostile testimony, holding the public register conclusive, and granted probate.
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
                    In an estate dispute where the attesting witness claimed severe memory loss due to advanced age, the propounder examined the senior advocate who had drafted the Will in his chamber. The advocate produced his daily chamber appointment diary, professional billing receipt, and deposed that the testator and witnesses signed in his presence. The court invoked Section 71 IEA and probated the Will.
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
                Use our practitioner-vetted model petition excerpt and Sub-Registrar summons checklist for your testamentary suit:
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
                  WillDrafting.in is India&rsquo;s premier estate planning and testamentary litigation resource, powered by AMA Legal Solutions. Our senior High Court litigators defend contested probate petitions, cross-examine hostile attesting witnesses, coordinate CFSL forensic signature comparisons, and preserve genuine testamentary dispositions across all Indian High Courts.
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
                  Our High Court testamentary litigators cross-examine hostile witnesses, issue SRO Book 3 subpoenas, and establish alternate scribe proof under Section 70 BSA.
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
                  Get immediate strategy evaluation on invoking Section 70 BSA, moving Section 340 CrPC perjury petitions, and summoning SRO registers.
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
