"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  FileText,
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
  Calendar,
  Lock,
  PhoneCall,
  Clock,
  Sparkles,
  HelpCircle,
  AlertCircle,
  FileCheck,
  Landmark,
  Gavel,
  Check,
  Layers,
  ArrowUpRight,
  Download,
  Info,
  Users,
  Home,
  Scroll,
  Copy,
  Split,
  Globe2,
  FileCode,
  Video,
  Stethoscope,
  FileWarning,
  Eye,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-grounds", label: "1. Legal Grounds to Challenge a Will" },
  { id: "undue-influence", label: "2. Undue Influence & Coercion Rules" },
  { id: "mental-capacity", label: "3. Mental Soundness Under Section 59" },
  { id: "forgery-suspicion", label: "4. Forgery & Section 67 BSA 2023" },
  { id: "limitation-period", label: "5. Limitation Period to Contest" },
  { id: "court-procedure", label: "6. Court Procedure & Caveat Filing" },
  { id: "contest-comparison", label: "7. Challenge Grounds vs Defenses" },
  { id: "visual-blueprint", label: "8. Visual Framework & Law Books" },
  { id: "step-by-step-sop", label: "9. 6-Stage Contest Protocol" },
  { id: "defensive-drafting", label: "10. Making a Will Challenge-Proof" },
  { id: "avoid-with-a-will", label: "11. How Proper Drafting Prevents Disputes" },
  { id: "specialized-scenarios", label: "12. Disinherited Heirs & NRI Estates" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Statutory Laws & Case Citations" },
];

const CONTEST_GROUNDS = [
  {
    ground: "Lack of Testamentary Capacity",
    statute: "Section 59, Indian Succession Act, 1925",
    burden: "Initial burden on challenger; shifts to propounder",
    evidence: "Hospital discharge summaries, psychiatric evaluations, witness testimony",
    defense: "Doctor fitness certificate issued on the exact day of execution",
  },
  {
    ground: "Undue Influence or Coercion",
    statute: "Section 61, Indian Succession Act, 1925",
    burden: "On challenger to establish fiduciary dominance & coercion",
    evidence: "Isolation of testator, complete dependence, sudden unnatural changes",
    defense: "Proof of independent legal advice, neutral non-family witnesses",
  },
  {
    ground: "Forgery and Fraudulent Signatures",
    statute: "Section 67, BSA 2023 & Section 61, ISA 1925",
    burden: "On challenger alleging forgery; standard of proof is high",
    evidence: "Forensic document examiner report, comparative signature analysis",
    defense: "Sub-Registrar biometric thumbprints, continuous video recording",
  },
  {
    ground: "Improper Execution and Attestation",
    statute: "Section 63, Indian Succession Act, 1925",
    burden: "Strictly on propounder under Section 67 BSA 2023",
    evidence: "Cross-examination showing witnesses did not see testator sign",
    defense: "Clear attestation clause and signed affidavits by both witnesses",
  },
  {
    ground: "Subsequent Valid Revocation",
    statute: "Section 62 & 70, Indian Succession Act, 1925",
    burden: "On party claiming a later Will or Codicil exists",
    evidence: "Original copy of later registered Will or signed Codicil",
    defense: "Clear revocation clause revoking all prior testamentary papers",
  },
];

const STEP_STAGES = [
  {
    number: "01",
    phase: "Phase 1: Urgent Protection",
    title: "Obtain Copy & Lodge an Immediate Caveat",
    authority: "Probate Court / Civil District Court",
    description:
      "Obtain a certified copy of the disputed Will from the Sub-Registrar Office or probate registry. Immediately file a Caveat under Section 284 of the Indian Succession Act. This prevents the court from granting probate or letters of administration behind your back.",
  },
  {
    number: "02",
    phase: "Phase 2: Evidence Gathering",
    title: "Collect Medical Records & Forensic Evidence",
    authority: "Hospitals, Banks & Certified Forensic Labs",
    description:
      "Secure hospital case sheets, doctor notes, and prescription logs for the date of execution. Gather admitted contemporary signatures from bank cards, property deeds, or passport files. Engage an accredited handwriting expert to examine signatures.",
  },
  {
    number: "03",
    phase: "Phase 3: Formal Challenge",
    title: "File Written Objections or a Civil Lawsuit",
    authority: "Competent Civil Court or High Court",
    description:
      "If the other party applied for probate, your caveat converts the matter into a contested testamentary suit. If no probate was filed, institute a civil declaration suit to declare the Will null, void, and inoperative under the Specific Relief Act.",
  },
  {
    number: "04",
    phase: "Phase 4: Asset Freezing",
    title: "Seek an Injunction to Stop Property Sale",
    authority: "Civil Court (Order 39, Rules 1 & 2 CPC)",
    description:
      "Apply immediately for a temporary injunction restraining the beneficiaries from selling, mortgaging, or creating third-party rights in estate properties. Send formal legal notice to the Sub-Registrar and municipal revenue officers to freeze property mutation.",
  },
  {
    number: "05",
    phase: "Phase 5: Witness Examination",
    title: "Cross-Examine Witnesses Under Section 67 BSA",
    authority: "Trial Court Hearing",
    description:
      "Under Section 67 of the Bharatiya Sakshya Adhiniyam, 2023, the person relying on the Will must produce at least one attesting witness in court. Your counsel will cross-examine them on where, when, and how the Will was signed to uncover fatal contradictions.",
  },
  {
    number: "06",
    phase: "Phase 6: Decree & Division",
    title: "Court Judgment & Division Among Legal Heirs",
    authority: "Civil Court Final Decree",
    description:
      "If the court holds the Will to be forged, invalid, or executed under undue influence, the Will is struck down. The deceased's properties then divide equally among all legal heirs under regular intestate succession rules.",
  },
];

const DEFENSIVE_CARDS = [
  {
    title: "Doctor Fitness Certificate",
    icon: Stethoscope,
    badge: "Medical Proof",
    desc: "Have an MBBS or MD physician examine the testator on the signing day. The doctor confirms sound mental state, memory, and cognitive understanding right on the Will.",
  },
  {
    title: "Video Recording of Signing",
    icon: Video,
    badge: "Digital Evidence",
    desc: "Record uninterrupted high-definition video of the testator reading key clauses aloud and signing before witnesses. Section 61 of BSA 2023 accepts verified electronic evidence.",
  },
  {
    title: "Independent Young Witnesses",
    icon: Users,
    badge: "Section 63 & 67 ISA",
    desc: "Select two healthy adult witnesses who receive nothing under the Will. Ensure they understand their duty to testify in court if disgruntled relatives file false challenges.",
  },
  {
    title: "SRO Biometric Registration",
    icon: Landmark,
    badge: "Government Record",
    desc: "Register the Will at the Sub-Registrar Office under Section 18 of the Registration Act. The government official captures fingerprints, photographs, and identity cards in official records.",
  },
];

const SCENARIOS = [
  {
    title: "Complete Disinheritance of Children",
    icon: AlertCircle,
    desc: "A parent has the absolute legal right to leave self-acquired property to anyone. However, excluding a child without writing a clear reason invites suspicious circumstance claims. Stating explicit reasons in the Will protects the gift.",
  },
  {
    title: "Second Marriage & Stepchildren",
    icon: Split,
    desc: "Disputes frequently erupt between children from a first marriage and a surviving second spouse. Without airtight drafting and registration, stepchildren routinely allege coercion or fabricated deathbed papers.",
  },
  {
    title: "NRI Properties & Cross-Border Assets",
    icon: Globe2,
    desc: "NRIs living in the UK, USA, Canada, or Gulf often face fabricated Wills produced by relatives managing property in India. Section 228 of the Indian Succession Act governs proving foreign probate copies in Indian courts.",
  },
  {
    title: "Ancestral Property Willed Away",
    icon: Home,
    desc: "A testator can only give away self-acquired property by Will. An attempt to distribute undivided ancestral coparcenary property beyond the testator's personal notional share is void under Section 6 of the Hindu Succession Act.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Who has the legal right to challenge a Will in India?",
    a: "Only persons who have a direct legal interest in the deceased person's estate have legal standing (locus standi) to challenge a Will. This includes natural legal heirs under personal laws (such as children, surviving spouse, or parents under Section 8 of the Hindu Succession Act) or beneficiaries named in an earlier valid Will who stand to lose their inheritance.",
  },
  {
    q: "Can you challenge a Will while the testator is still alive?",
    a: "No. Under Indian succession law, a Will has zero legal effect during the lifetime of the testator. The person who made the Will can revoke, alter, or cancel it at any time. A Will only becomes operative upon death, so no court will entertain a challenge before the testator passes away.",
  },
  {
    q: "What is the limitation period to challenge a Will in Indian courts?",
    a: "Under the Limitation Act, 1963, a civil suit to declare a Will void or cancel an instrument (under Article 59 or Article 137) must generally be filed within 3 years from the date the right to sue accrues, or within 3 years from when the challenger first discovers the existence of the disputed Will or alleged fraud.",
  },
  {
    q: "Can a registered Will be challenged in an Indian court?",
    a: "Yes. Registration under the Registration Act, 1908 proves that the document was presented to a Sub-Registrar, but it does not grant absolute immunity. The Supreme Court of India in Rani Purnima Debi v. Kumar Khagendra Narayan Deb ruled that if suspicious circumstances or undue influence exist, registration alone does not validate an otherwise invalid Will.",
  },
  {
    q: "How does Section 67 of Bharatiya Sakshya Adhiniyam 2023 apply to Wills?",
    a: "Section 67 of the Bharatiya Sakshya Adhiniyam, 2023 (which replaces Section 68 of the Indian Evidence Act, 1872) mandates that if a Will is contested, at least one attesting witness who signed the document must be examined in court to prove proper execution, provided that witness is alive and capable of giving evidence.",
  },
  {
    q: "What constitutes suspicious circumstances in a Will contest?",
    a: "Suspicious circumstances include situations where the main beneficiary took an active part in preparing or executing the Will, where natural legal heirs were excluded without explanation, where the testator signed with a shaky hand shortly before death, or where the Will was kept secret for many years.",
  },
  {
    q: "What happens if a court declares a Will invalid or forged?",
    a: "If a court declares a Will invalid and no earlier valid Will exists, the estate of the deceased is distributed according to intestate succession rules (such as the Hindu Succession Act, 1956 or Indian Succession Act, 1925). Under these rules, all Class 1 legal heirs receive equal statutory shares.",
  },
  {
    q: "How can someone make their own Will completely challenge-proof?",
    a: "To make your Will dispute-proof: attach a mental fitness certificate from a qualified doctor, record high-definition video of the execution and reading, choose two younger independent witnesses who receive nothing under the Will, register the document at the Sub-Registrar Office, and explicitly explain any exclusion of natural heirs.",
  },
  {
    q: "What is a Caveat petition in probate court and when should you file one?",
    a: "Under Section 284 of the Indian Succession Act, 1925, a Caveat is a formal legal notice filed in probate court warning the judge not to grant probate or letters of administration to another party without first serving notice and hearing your objections.",
  },
  {
    q: "Can an attesting witness be a beneficiary under the Will?",
    a: "No. Under Section 67 of the Indian Succession Act, 1925, any bequest or legacy given to an attesting witness or their spouse becomes completely void. The Will remains valid, but the witness forfeits their entire inheritance. Attesting witnesses must always be independent third parties.",
  },
];

export default function HowToChallengeAWillClient() {
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

  const handleConsultLawyer = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.dispatchEvent(new Event(OPEN_SIGNUP_EVENT));
  };

  const [activeId, setActiveId] = useState<string>("statutory-grounds");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

    const elements = document.querySelectorAll(
      "section[id], div[id].scroll-target"
    );
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6">
            <Gavel className="w-4 h-4 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT &bull; WILL CONTEST &amp; DEFENSE GUIDE</span>
          </div>

          {/* Single H1 Title (Strictly 30-65 chars, no em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6 drop-shadow-xs">
            How to Challenge a Will in India: Complete Legal Guide
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            Understand the valid legal grounds, 3-year limitation periods, and BSA 2023 evidence rules to contest a forged or coerced Will. Learn how to draft a dispute-proof Will that stands strong in court.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/start"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/20 cursor-pointer"
            >
              <span>Draft a Contest-Proof Will Online</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#statutory-grounds"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all"
            >
              <span>Explore Grounds to Contest</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (WillDrafting Social Proof & Trust Metrics)
          ========================================================================= */}
      <section className="w-full bg-gradient-to-r from-[#FAF7F0] via-white to-[#FAF7F0] border-y border-[#172228]/10 py-5 sm:py-6 shadow-[0_2px_10px_rgba(23,34,40,0.02)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-x-3 gap-y-6 md:gap-0">
            {/* Stat 1: Testamentary Experience */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                15+ Years
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Testamentary Experience
              </span>
            </div>

            {/* Stat 2: Wills Handled */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                10,000+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Wills &amp; Estates Handled
              </span>
            </div>

            {/* Stat 3: Value Protected */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                ₹2,500Cr+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Estate Assets Secured
              </span>
            </div>

            {/* Stat 4: Google Rating & Reviews */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 px-1 sm:px-4 md:border-l md:border-[#172228]/12">
              <svg
                className="w-6 h-6 min-[400px]:w-7 min-[400px]:h-7 sm:w-8 sm:h-8 shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>

              <div className="flex items-baseline">
                <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                  4.9/5
                </span>
              </div>

              <div className="flex flex-col text-left leading-tight">
                <span className="text-[11px] sm:text-xs font-bold text-[#172228]">
                  1,300+
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#55636D] font-semibold">
                  Reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content Area)
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_300px] xl:grid-cols-[280px_minmax(0,1fr)_320px] gap-6 xl:gap-8 items-start">
          {/* =====================================================================
              LEFT COLUMN: STICKY TABLE OF CONTENTS
              ===================================================================== */}
          <aside className="sticky top-6 hidden lg:block space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-[#172228]">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                  TABLE OF CONTENTS
                </span>
              </div>
              <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                {TOC_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-xs py-2 px-3 rounded-lg transition-all leading-snug ${
                      activeId === item.id
                        ? "bg-rose-50 text-[#C65378] font-bold border-l-2 border-[#C65378]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Statutory Compliance Badge in Sidebar */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-1">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>Statutory Authorities</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed by Section 59, 61 &amp; 63 of ISA 1925, Limitation Act 1963, and Section 67 of BSA 2023.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN EDITORIAL CONTENT
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE SUMMARY BOX */}
            <div className="rounded-2xl bg-white border border-slate-200/90 border-l-[6px] border-l-[#C65378] p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  EXECUTIVE BRIEF: 4 CARDINAL RULES OF WILL CONTESTS
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Challenging vs. Defending a Will in Indian Courts
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Only Direct Heirs Can Challenge:</strong> You must have a direct legal interest (locus standi). Only natural heirs who would inherit under intestate laws or beneficiaries under an earlier Will have standing.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Strict 3-Year Limitation Deadline:</strong> Under the Limitation Act 1963, you cannot sleep on your rights. Civil suits must be filed within 3 years from the date you discover the disputed document.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Registration Does Not Equal Immunity:</strong> A registered Will can still be canceled if there was mental incapacity, fraud, or undue influence (Supreme Court ruling in Rani Purnima Debi).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <span>
                    <strong>Defensive Drafting Prevents Contests:</strong> If you are writing a Will, attaching a doctor mental fitness certificate and recording a video eliminates 99% of future legal challenges.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: GROUNDS TO CHALLENGE */}
            <section id="statutory-grounds" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>Statutory Grounds</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                1. Grounds to Challenge a Will: Core Legal Basis in India
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Under Indian succession law, a Will is not set in stone merely because it exists on paper. While courts respect the final wishes of a deceased person, judges examine disputed documents with extreme vigilance. If a Will fails to satisfy statutory standards, any person with a direct legal interest can challenge it in a competent civil court.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                To challenge a Will, you must first possess legal standing (known in law as <em>locus standi</em>). This means you must be someone whose inheritance rights are directly damaged by the Will. Eligible persons include natural Class 1 legal heirs (such as sons, daughters, surviving spouses, and mothers) or beneficiaries named in an earlier genuine Will. Strangers, distant relatives, or neighbors cannot challenge a Will simply because they dislike how property was given away.
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
                <span className="font-bold text-slate-900 uppercase tracking-wide">
                  The Five Recognized Grounds of Challenge:
                </span>
                <p>
                  1. <strong>Lack of Testamentary Capacity:</strong> The testator was not of sound mind, memory, and understanding (Section 59, Indian Succession Act, 1925).
                </p>
                <p>
                  2. <strong>Undue Influence and Coercion:</strong> The testator was pressured, manipulated, or intimidated, destroying their free choice (Section 61, Indian Succession Act, 1925).
                </p>
                <p>
                  3. <strong>Forgery and Fraud:</strong> The signature is forged, or pages were substituted after signing (Section 67, Bharatiya Sakshya Adhiniyam, 2023).
                </p>
                <p>
                  4. <strong>Defective Execution:</strong> The Will was not signed in the physical visual presence of at least two independent adult witnesses (Section 63, Indian Succession Act, 1925).
                </p>
                <p>
                  5. <strong>Subsequent Revocation:</strong> The testator executed a newer valid Will or tore up the old document to cancel it (Section 62 &amp; Section 70, Indian Succession Act, 1925).
                </p>
              </div>
            </section>

            {/* SECTION 2: UNDUE INFLUENCE */}
            <section id="undue-influence" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileWarning className="w-4 h-4" />
                <span>Section 61 ISA 1925</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                2. Undue Influence &amp; Coercion: Proving Involuntary Execution
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Under Section 61 of the Indian Succession Act, a Will obtained by fraud, coercion, or importunity is completely void. Coercion involves physical threats or duress. Undue influence is more subtle. It occurs when a person in a position of dominance overpowers the testator&apos;s mental freedom so that the Will reflects the influencer&apos;s desires rather than the testator&apos;s genuine wishes.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Indian courts make a sharp distinction between legitimate filial affection and illegal undue influence. Simply caring for an elderly parent or asking for property does not amount to undue influence. To establish undue influence, the challenger must prove that the testator was completely dependent, isolated from other family members, and could not exercise independent judgment.
              </p>
              <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-[#C65378] font-bold text-sm mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>The Active Participation Trap (Supreme Court Warning)</span>
                </div>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  In landmark judgments including <em>H. Venkatachala Iyengar v. B.N. Thimmajamma</em> and <em>Kavita Kanwar v. Pamela Mehta (2020)</em>, the Supreme Court held that where the primary beneficiary takes a leading part in drafting or executing the Will, a grave suspicious circumstance arises. The beneficiary must satisfy the conscience of the court that the testator acted out of free will.
                </p>
              </div>
            </section>

            {/* SECTION 3: MENTAL CAPACITY */}
            <section id="mental-capacity" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Stethoscope className="w-4 h-4" />
                <span>Testamentary Capacity</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                3. Mental Capacity: Testamentary Soundness Under Section 59
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Section 59 of the Indian Succession Act mandates that every person of sound mind who is not a minor may dispose of their property by Will. To possess testamentary capacity, the testator must understand three essential things: the nature of making a Will, the extent of the property they own, and the persons who naturally expect to inherit from them.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Physical illness is not the same as mental unsoundness. An elderly person may suffer from diabetes, high blood pressure, physical weakness, or trembling hands. That physical frailty alone does not destroy testamentary capacity. Similarly, under Explanation 4 of Section 59, a person who is ordinarily insane may execute a completely valid Will during a clear, lucid interval.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <div className="font-bold text-sm text-slate-900 mb-1">
                    Challenger&apos;s Evidentiary Burden
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The challenger must present hospital admission sheets, psychiatric evaluations, or proof of severe dementia demonstrating that the testator could not comprehend their actions when signing.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <div className="font-bold text-sm text-slate-900 mb-1">
                    Propounder&apos;s Ultimate Shield
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A formal medical fitness certificate endorsed by a licensed physician on the signing date. It confirms orientation to time, place, and mental clarity, conclusively neutralizing capacity disputes.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: FORGERY & SUSPICIOUS CIRCUMSTANCES */}
            <section id="forgery-suspicion" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>BSA 2023 &amp; Suspicion Rules</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                4. Forgery &amp; Suspicious Circumstances: Section 67 BSA 2023
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                When a family member manufactures a fake Will after a parent&apos;s death, the challenger must plead forgery and fraud. Under Section 67 of the Bharatiya Sakshya Adhiniyam, 2023 (which replaces Section 68 of the repealed Indian Evidence Act, 1872), a document required by law to be attested cannot be used in evidence until at least one attesting witness has been called to prove its execution in court.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                In addition to proving direct forgery through forensic handwriting examiners, courts rely on the doctrine of <em>suspicious circumstances</em>. If the execution of a Will is surrounded by unusual facts, the legal burden rests entirely on the person defending the Will (the propounder) to dispel every reasonable doubt.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="py-3 px-4 font-bold">Suspicious Circumstance</th>
                      <th className="py-3 px-4 font-bold">Why the Court Doubts the Will</th>
                      <th className="py-3 px-4 font-bold">How to Remove Suspicion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        Total exclusion of natural heirs
                      </td>
                      <td className="py-3 px-4">
                        Courts question why a loving child or spouse was left zero property.
                      </td>
                      <td className="py-3 px-4 text-[#5F7E75] font-medium">
                        Explicit clause in Will explaining reasons for exclusion.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        Beneficiary prepared the draft
                      </td>
                      <td className="py-3 px-4">
                        Creates an immediate presumption of self-serving manipulation.
                      </td>
                      <td className="py-3 px-4 text-[#5F7E75] font-medium">
                        Engagement of independent advocate without beneficiary present.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        Shaky or uncharacteristic signature
                      </td>
                      <td className="py-3 px-4">
                        Suggests either forgery or that the testator was near death.
                      </td>
                      <td className="py-3 px-4 text-[#5F7E75] font-medium">
                        Doctor note explaining physical tremor alongside video recording.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        Will produced years after death
                      </td>
                      <td className="py-3 px-4">
                        Late emergence suggests the document was fabricated when land prices rose.
                      </td>
                      <td className="py-3 px-4 text-[#5F7E75] font-medium">
                        Immediate SRO registration and safe deposit with named executor.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 5: LIMITATION PERIOD */}
            <section id="limitation-period" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>Limitation Act 1963</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                5. Limitation Period: Legal Deadlines to Contest a Will
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Many heirs make the tragic error of waiting years before disputing a suspicious Will. The Limitation Act, 1963 sets strict time bars for initiating legal proceedings. If you sleep on your legal rights, the court will dismiss your challenge on the threshold without even evaluating the merits of the fraud.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-white rounded-2xl border border-slate-200">
                  <span className="text-xs font-black uppercase tracking-wider text-[#C65378] block mb-1">
                    Article 137 Limitation Act
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 mb-2">
                    3 Years for General Civil Applications
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Article 137, where no specific limitation period is given, the deadline is 3 years from the date when the right to apply accrues. For probate revocation petitions under Section 263 ISA, this begins when the applicant discovers the fraudulent grant.
                  </p>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-slate-200">
                  <span className="text-xs font-black uppercase tracking-wider text-[#5F7E75] block mb-1">
                    Article 59 Limitation Act
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 mb-2">
                    3 Years to Cancel an Instrument
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A regular civil suit to set aside or declare a Will void must be filed within 3 years from the date facts entitling the plaintiff to cancel the instrument first become known to them.
                  </p>
                </div>
              </div>
              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-slate-700">
                <strong>CRITICAL LEGAL RULE:</strong> You cannot challenge a Will while the person who wrote it is still alive. A Will confers zero rights during the testator&apos;s lifetime. The limitation clock only starts running after the testator passes away and the disputed Will is asserted against your rights.
              </div>
            </section>

            {/* SECTION 6: COURT PROCEDURE */}
            <section id="court-procedure" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>Litigation Procedure</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                6. Court Procedure: How to File a Will Challenge in India
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                The exact court procedure depends on whether the opposing side has filed for probate or is attempting to mutate properties directly at the local revenue office. Here are the procedural pathways governed by the Indian Succession Act, 1925 and the Code of Civil Procedure, 1908 (CPC).
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-rose-50 text-[#C65378] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    A
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      Filing a Caveat Petition (Section 284 ISA)
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      If you anticipate that another heir will apply for probate, immediately lodge a Caveat in the District Court or High Court. Under Section 284, no probate can be granted without serving you notice and hearing your objections. Once you file objections, the petition converts into a contested Civil Testamentary Suit.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-rose-50 text-[#C65378] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    B
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      Civil Declaration Suit &amp; Temporary Injunction
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      If the opposing party is not seeking probate (outside mandatory presidency towns like Mumbai, Kolkata, Chennai), you must file a Civil Suit for Declaration under Section 34 of the Specific Relief Act. Concurrently file an application under Order 39 Rules 1 &amp; 2 CPC to obtain an ad-interim injunction restraining the sale or transfer of estate properties.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-rose-50 text-[#C65378] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    C
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      Revocation of Probate for Just Cause (Section 263 ISA)
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      If probate was already granted without your knowledge because citations were fraudulently concealed, you can apply under Section 263 to revoke or annul the grant. Valid grounds include false suggestions of fact, fraudulent suppression of heirs, or discovery of a later valid Will.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: COMPARISON MATRIX */}
            <section id="contest-comparison" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>Grounds vs Defenses Matrix</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                7. Will Contest Comparison: Challenge Grounds vs Defenses
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Whether you are disputing a suspicious Will or protecting your genuine inheritance against hostile relatives, understanding the statutory burden of proof and the required evidentiary standard is vital. This matrix contrasts key challenge grounds with their corresponding legal defenses.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Ground of Contest</th>
                      <th className="py-3.5 px-4 font-bold">Statutory Authority</th>
                      <th className="py-3.5 px-4 font-bold">Burden of Proof</th>
                      <th className="py-3.5 px-4 font-bold">Required Evidence</th>
                      <th className="py-3.5 px-4 font-bold">Strongest Defense</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {CONTEST_GROUNDS.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/80">
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {row.ground}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                          {row.statute}
                        </td>
                        <td className="py-3.5 px-4 text-rose-700 font-medium">
                          {row.burden}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">
                          {row.evidence}
                        </td>
                        <td className="py-3.5 px-4 text-[#5F7E75] font-semibold">
                          {row.defense}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 8: VISUAL BLUEPRINT */}
            <section id="visual-blueprint" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Eye className="w-4 h-4" />
                <span>Visual Blueprint</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                8. Visual Blueprint: The Will Contest &amp; Defense Framework
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Will litigation in India sits at the exact intersection of three primary statutory codes: the Indian Succession Act 1925, the Limitation Act 1963, and the new Bharatiya Sakshya Adhiniyam 2023. The diagram below illustrates the balance between testamentary disposition, family rights, and judicial scrutiny.
              </p>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="relative aspect-video w-full bg-slate-100">
                  <Image
                    src="/images/how-to-challenge-a-will-in-india.jpg"
                    alt="How to Challenge a Will in India Legal Statutes Indian Succession Act Limitation Act and Court Gavel"
                    fill
                    className="object-cover hover:scale-[1.01] transition-transform duration-300"
                    sizes="(max-width: 1200px) 100vw, 900px"
                    priority
                  />
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600">
                  <span>
                    <strong>Visual Framework:</strong> Indian Succession Act, Limitation Act, Bharatiya Sakshya Adhiniyam 2023 &amp; Estate Division.
                  </span>
                  <span className="text-[11px] text-[#C65378] font-bold">
                    WillDrafting.in &bull; Succession Planning
                  </span>
                </div>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCode className="w-4 h-4" />
                <span>6-Stage Legal SOP</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                9. Step-by-Step SOP: Procedural Protocol to Contest a Will
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                If you suspect that a family member has fabricated a Will or forced an ailing parent into signing, follow this structured procedural protocol. Taking these disciplined steps preserves critical physical evidence and safeguards family assets.
              </p>
              <div className="space-y-4">
                {STEP_STAGES.map((st) => (
                  <div
                    key={st.number}
                    className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-[#C65378]/40 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-full bg-rose-50 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0">
                          {st.number}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                          {st.phase}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        {st.authority}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 mb-1">
                      {st.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {st.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 10: DEFENSIVE DRAFTING */}
            <section id="defensive-drafting" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>Challenge-Proof Drafting</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                10. Defensive Drafting: Make Your Will 100% Challenge-Proof
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                If you are planning your own estate, your goal is the exact opposite: ensuring that no disgruntled relative, estranged child, or in-law can tie up your life savings in litigation. By embedding these four defensive safeguards during drafting, you make your Will virtually unassailable in court.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DEFENSIVE_CARDS.map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={idx}
                      className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2 hover:border-[#C65378]/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-[#C65378]">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#5F7E75] bg-emerald-50 px-2 py-0.5 rounded-full">
                          {card.badge}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                        {card.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                <strong>Crucial Drafting Technique:</strong> Never ignore an excluded heir in silence. Always include a clear sentence explaining the reason: for instance, <em>&quot;I have made adequate financial provisions for my eldest son during my lifetime through university education and a wedding gift, and therefore make no further bequests to him under this Will.&quot;</em> This removes any suspicion of oversight or confusion.
              </div>
            </section>

            {/* SECTION 11: HOW A VALID WILL AVOIDED THIS (CONVERSION BRIDGE) */}
            <section id="avoid-with-a-will" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>The Conversion Bridge</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                11. How a Valid Will Would Have Avoided Costly Court Disputes
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Over 90% of all inheritance lawsuits in India originate from homemade, ambiguous, or poorly witnessed Wills. When family members are left guessing, or when vague handwritten notes surface years after death, bitter civil suits inevitably drag through the courts for 10 to 20 years.
              </p>
              <div className="bg-gradient-to-br from-[#172228] to-[#24353f] text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
                <span className="text-xs font-black uppercase tracking-wider text-rose-300">
                  Protect Your Family Today
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  Draft an Airtight, Advocate-Verified Will in 15 Minutes
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                  Do not leave your children to fight in civil court. WillDrafting provides lawyer-vetted formats, doctor certification clauses, and Section 63 witness compliance to protect your life&apos;s hard work.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all cursor-pointer text-sm shadow-md"
                  >
                    <span>Create Your Will Online Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <Link
                    href="/templates/will-format-india"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
                  >
                    <span>View Standard Will Template</span>
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 12: SPECIALIZED SCENARIOS */}
            <section id="specialized-scenarios" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Split className="w-4 h-4" />
                <span>Specialized Situations</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                12. Specialized Scenarios: Disinherited Heirs &amp; NRI Estates
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Inheritance disputes frequently involve complex family dynamics or assets spread across jurisdictions. Here is how Indian courts handle four common specialized dispute scenarios.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SCENARIOS.map((sc, i) => {
                  const Icon = sc.icon;
                  return (
                    <div
                      key={i}
                      className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2 hover:border-[#C65378]/30 transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-[#C65378]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900">
                        {sc.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {sc.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 13: FAQ ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>Direct Answers</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Frequently Asked Questions: Challenging a Will in India
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Straightforward legal answers to the most common questions regarding Will disputes, court time limits, witness rules, and defensive drafting.
              </p>
              <div className="space-y-3 pt-2">
                {FAQ_ITEMS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-2xs hover:border-slate-300"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:bg-slate-50/80 transition-colors cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#C65378] shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 15: CITATIONS & AUTHORITY LINKS */}
            <section id="statutory-citations" className="scroll-target space-y-4 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
                <BookOpen className="w-4 h-4 text-[#5F7E75]" />
                <span>Legal Authority &amp; Statutory Sources</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Official Legal Authorities, Statutory Sections &amp; Precedents
              </h2>
              <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside leading-relaxed">
                <li>
                  <strong>Indian Succession Act, 1925:</strong> Section 59 (soundness of mind), Section 61 (undue influence &amp; coercion), Section 63 (execution &amp; attestation), Section 67 (void bequests to witnesses), Section 263 (revocation of probate), Section 284 (caveats).
                </li>
                <li>
                  <strong>Bharatiya Sakshya Adhiniyam, 2023 (BSA 2023):</strong> Section 67 (mandatory examination of attesting witness; replaces Section 68 of the repealed Indian Evidence Act, 1872), Section 61 &amp; 63 (electronic records &amp; video evidence).
                </li>
                <li>
                  <strong>Limitation Act, 1963:</strong> Article 59 (cancellation of instrument within 3 years) &amp; Article 137 (general 3-year limitation for civil applications).
                </li>
                <li>
                  <strong>Supreme Court of India Precedents:</strong> <em>H. Venkatachala Iyengar v. B.N. Thimmajamma</em> (1959 AIR 443), <em>Rani Purnima Debi v. Kumar Khagendra Narayan Deb</em> (1962 AIR 567), <em>Kavita Kanwar v. Pamela Mehta</em> (2020 SCC Online SC 714).
                </li>
              </ul>

              <div className="pt-4 space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                  Related Internal Guides &amp; Tools
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Link
                    href="/service/probate-lawyer"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] text-slate-700 hover:text-[#C65378] transition-colors"
                  >
                    Probate Legal Services
                  </Link>
                  <Link
                    href="/tools/probate-checker"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] text-slate-700 hover:text-[#C65378] transition-colors"
                  >
                    Probate Risk Checker
                  </Link>
                  <Link
                    href="/templates/will-format-india"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] text-slate-700 hover:text-[#C65378] transition-colors"
                  >
                    Standard Will Format India
                  </Link>
                  <Link
                    href="/blogs/property-transfer-after-death-without-will-india"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] text-slate-700 hover:text-[#C65378] transition-colors"
                  >
                    Property Transfer After Death
                  </Link>
                  <Link
                    href="/blogs/legal-heir-certificate-vs-succession-certificate"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] text-slate-700 hover:text-[#C65378] transition-colors"
                  >
                    Legal Heir vs Succession Certificate
                  </Link>
                </div>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (Author Bio & Emergency CTAs)
              ===================================================================== */}
          <aside className="space-y-5 sticky top-6">
            {/* CARD 1: AUTHOR BIO CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-[#C65378] font-bold text-sm font-bold shrink-0">
                  AAM
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">
                    Advocate Anuj Anand Malik
                  </div>
                  <div className="text-[11px] font-semibold text-[#C65378]">
                    Senior Succession Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bar Council enrolled advocate with 18+ years of expertise in testamentary litigation, probate matters, and estate structuring in India.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#5F7E75]" />
                  <span>High Court Bar</span>
                </span>
                <span className="text-[#5F7E75] font-semibold">Verified Counsel</span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-5 desktop-sidebar-only">
{/* CARD 2: EMERGENCY CTA CARD */}
            <div className="hidden lg:block rounded-3xl bg-[#172228] p-6 text-white text-center space-y-4 shadow-lg shadow-slate-950/15">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold tracking-wider uppercase text-rose-200">
                <ShieldCheck className="w-3 h-3 text-[#C65378]" />
                <span>CONFIDENTIAL LITIGATION ADVICE</span>
              </div>
              <h3 className="text-lg font-bold leading-tight">
                Will Contested or Suspect a Fake Document?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect with our specialized testamentary lawyers for immediate caveat lodging, forensic signature analysis, and court representation.
              </p>
              <button
                type="button"
                onClick={handleConsultLawyer}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <span>Consult a Dispute Lawyer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <div className="pt-1 flex items-center justify-center gap-1 text-[11px] text-slate-400">
                <Lock className="w-3 h-3 text-[#5F7E75]" />
                <span>100% Client-Attorney Confidential</span>
              </div>
            </div>

            {/* CARD 3: TRUST & BENEFITS CHECKLIST */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 block">
                Litigation Support Services
              </span>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Caveat Petition:</strong> Notice protection in District &amp; High Courts.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Forensic Labs:</strong> Certified signature comparison reports.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Stay Orders:</strong> Immediate restraint on property sale or mutation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Pan-India Representation:</strong> Litigating across major metro jurisdictions.
                  </span>
                </li>
              </ul>
            </div>

            {/* CARD 4: RELATED GUIDES */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 block">
                Recommended Succession Guides
              </span>
              <div className="space-y-2">
                <Link
                  href="/service/probate-lawyer"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all"
                >
                  <div className="font-bold text-xs text-slate-900">
                    Probate of Will Lawyers
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                    <span>Contested &amp; voluntary probate</span>
                    <ArrowRight className="w-2.5 h-2.5 text-[#C65378]" />
                  </div>
                </Link>

                <Link
                  href="/tools/probate-checker"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all"
                >
                  <div className="font-bold text-xs text-slate-900">
                    Is Probate Required in India?
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                    <span>Free 5-question diagnostic checker</span>
                    <ArrowRight className="w-2.5 h-2.5 text-[#C65378]" />
                  </div>
                </Link>

                <Link
                  href="/blogs/property-transfer-after-death-without-will-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all"
                >
                  <div className="font-bold text-xs text-slate-900">
                    Property Transfer After Death
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                    <span>Intestate succession roadmap</span>
                    <ArrowRight className="w-2.5 h-2.5 text-[#C65378]" />
                  </div>
                </Link>
              </div>
            </div>
            </div>

            {/* MOBILE ONLY: Related WillDrafting Guides */}
            <div className="pt-4 border-t border-slate-100 block lg:hidden">
              <span className="text-xs font-bold text-[#172228] block mb-2">Related WillDrafting Guides:</span>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/service/probate-lawyer"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Probate of Will Lawyers
                </Link>
                <Link
                  href="/tools/probate-checker"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Is Probate Required in India?
                </Link>
                <Link
                  href="/blogs/property-transfer-after-death-without-will-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Property Transfer After Death
                </Link>
                <Link
                  href="/blogs/legal-heir-certificate-vs-succession-certificate"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Legal Heir vs Succession Certificate
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
