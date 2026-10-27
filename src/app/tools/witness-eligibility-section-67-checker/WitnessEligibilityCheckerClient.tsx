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
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  RefreshCw,
  Landmark,
  Check,
  X,
  Building2,
  Info,
  Gavel,
  Calculator,
  Copy,
  CheckCheck,
  TrendingUp,
  Users,
  FileText,
  Layers,
  Globe,
  Stethoscope,
  Briefcase,
  AlertOctagon,
  Eye,
  EyeOff,
  UserX,
  FileSignature,
} from "lucide-react";

interface WitnessProfile {
  role:
    | "doctor"
    | "lawyer"
    | "ca"
    | "colleague_friend"
    | "executor"
    | "spouse"
    | "child"
    | "in_law"
    | "sibling"
    | "minor"
    | "blind_person";
  isAdult: boolean;
  isSoundMind: boolean;
  hasSight: boolean;
  isBeneficiary: boolean;
  spouseIsBeneficiary: boolean;
  presentDuringSigning: boolean;
  isYoungerThanTestator: boolean;
}

const TOC_ITEMS = [
  { id: "section-67-explained", label: "1. Section 67 Explained: Who Can Witness" },
  { id: "interactive-checker", label: "2. Interactive Witness Eligibility Checker" },
  { id: "hindu-vs-christian-schedule-iii", label: "3. Hindu vs Christian: Schedule III" },
  { id: "beneficiaries-and-spouses-as-witnesses", label: "4. Can Beneficiaries & Heirs Witness?" },
  { id: "doctors-and-lawyers-evidentiary-value", label: "5. Doctors & Lawyers as Witnesses" },
  { id: "executor-competency-section-68", label: "6. Executor as Witness: Section 68" },
  { id: "bsa-2023-section-67-probate-proof", label: "7. Section 67 BSA 2023: Probate Proof" },
  { id: "disqualified-witness-categories", label: "8. Disqualified Witnesses: Minors & Blind" },
  { id: "witness-comparison-matrix", label: "9. Witness Category Comparison Table" },
  { id: "step-by-step-execution-sop", label: "10. Step-by-Step Will Execution SOP" },
  { id: "landmark-supreme-court-precedents", label: "11. Landmark Supreme Court Rulings" },
  { id: "standard-attestation-clauses", label: "12. Attestation Clause & Certificate" },
  { id: "advocate-verification-profile", label: "13. Advocate Verification & Scrutiny" },
  { id: "frequently-asked-questions", label: "14. Frequently Asked Questions" },
  { id: "statutory-citations-portals", label: "15. Statutory References & Portals" },
];

const FAQS = [
  {
    q: "Who can legally be an attesting witness to a Will in India?",
    a: "Under Section 63(c) of the Indian Succession Act, 1925, any person who is 18 years of age or older, of sound mind, and physically capable of seeing the testator sign can be an attesting witness. The witness must sign with animus attestandi, which means the clear legal intent to verify that the testator executed the Will voluntarily.",
  },
  {
    q: "Can my wife, son, or daughter sign as an attesting witness to my Will?",
    a: "Legally, a family member can witness a Will only if they receive no property or benefit under that Will. If a beneficiary or their spouse attests a Christian or Parsi Will, Section 67 makes their bequest completely void. For Hindu, Sikh, and Jain Wills, Section 67 is excluded by Schedule III, but having a beneficiary child or spouse attest creates a heavy suspicious circumstance in court that often leads to the Will being set aside in probate.",
  },
  {
    q: "What does Section 67 of the Indian Succession Act state?",
    a: "Section 67 provides that if any person attests a Will, any bequest or legacy given to that person, or to their wife or husband, shall be entirely void. The execution of the Will remains valid, but the witness and their spouse lose all inheritance under that Will. However, under Section 57 read with Schedule III, this statutory forfeiture does not apply to Hindus, Sikhs, Buddhists, and Jains.",
  },
  {
    q: "Why is a doctor considered the best witness for an Indian Will?",
    a: "A Registered Medical Practitioner (MBBS or MD) can examine the testator immediately prior to signing and endorse a contemporaneous Medical Fitness Certificate directly on the Will. This provides undeniable proof that the testator possessed sound disposing mind and memory, effectively neutralizing future claims of dementia, Alzheimer's, or lack of capacity.",
  },
  {
    q: "Can the Executor of a Will also be an attesting witness?",
    a: "Yes. Under Section 68 of the Indian Succession Act, 1925, no person is disqualified from being a witness merely because they are appointed as an Executor of the Will. As long as the Executor receives no personal beneficial legacy or property under the Will, their attestation is completely valid and court-defensible.",
  },
  {
    q: "Can a lawyer or Chartered Accountant sign as a witness to a Will?",
    a: "Yes. An independent practicing advocate or Chartered Accountant is an ideal attesting witness. They understand legal formalities, maintain professional contemporaneous files, and provide credible, objective testimony when called to depose in probate court under Section 67 of the Bharatiya Sakshya Adhiniyam, 2023.",
  },
  {
    q: "How many witnesses are mandatory for a valid Will in India?",
    a: "Section 63(c) mandates at least two attesting witnesses. While each witness must see the testator sign or receive personal acknowledgment, it is not legally mandatory that both witnesses sign at the exact same moment. However, having both witnesses physically present together during signing is the recommended gold standard.",
  },
  {
    q: "How is a Will proved in court if the witnesses pass away?",
    a: "Under Section 67 of the Bharatiya Sakshya Adhiniyam, 2023 (formerly Section 68 of the Evidence Act), at least one living attesting witness must be examined in court. If both witnesses have died or cannot be found, Section 68 BSA allows the Will to be proved by establishing the handwriting and signature of at least one witness and the testator.",
  },
  {
    q: "Can a visually impaired or blind person be an attesting witness to a Will?",
    a: "No. Under Section 63(c) and established case law, attestation requires physical visual perception of the testator signing the document. A blind person cannot visually verify the act of execution, rendering their attestation legally incompetent.",
  },
  {
    q: "Is digital signature or Aadhaar eSign valid for a Will witness?",
    a: "No. Under the First Schedule of the Information Technology Act, 2000, Wills and testamentary dispositions are expressly excluded from electronic signatures. Both the testator and both attesting witnesses must sign physically using ink on paper.",
  },
];

export default function WitnessEligibilityCheckerClient() {
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

  const [activeId, setActiveId] = useState<string>("section-67-explained");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedClause, setCopiedClause] = useState<boolean>(false);
  const [copiedDoctorCert, setCopiedDoctorCert] = useState<boolean>(false);

  // Checker Form State
  const [religion, setReligion] = useState<"hindu" | "christian_parsi" | "muslim">("hindu");
  const [activeWitnessTab, setActiveWitnessTab] = useState<1 | 2>(1);

  // Witness 1 State
  const [w1, setW1] = useState<WitnessProfile>({
    role: "doctor",
    isAdult: true,
    isSoundMind: true,
    hasSight: true,
    isBeneficiary: false,
    spouseIsBeneficiary: false,
    presentDuringSigning: true,
    isYoungerThanTestator: true,
  });

  // Witness 2 State
  const [w2, setW2] = useState<WitnessProfile>({
    role: "lawyer",
    isAdult: true,
    isSoundMind: true,
    hasSight: true,
    isBeneficiary: false,
    spouseIsBeneficiary: false,
    presentDuringSigning: true,
    isYoungerThanTestator: true,
  });

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
      rootMargin: "-100px 0px -60% 0px",
      threshold: 0,
    });

    const elements = document.querySelectorAll(".scroll-target");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const handleResetChecker = () => {
    setReligion("hindu");
    setActiveWitnessTab(1);
    setW1({
      role: "doctor",
      isAdult: true,
      isSoundMind: true,
      hasSight: true,
      isBeneficiary: false,
      spouseIsBeneficiary: false,
      presentDuringSigning: true,
      isYoungerThanTestator: true,
    });
    setW2({
      role: "lawyer",
      isAdult: true,
      isSoundMind: true,
      hasSight: true,
      isBeneficiary: false,
      spouseIsBeneficiary: false,
      presentDuringSigning: true,
      isYoungerThanTestator: true,
    });
  };

  // ==========================================
  // STATUTORY EVALUATION ENGINE
  // ==========================================

  const evaluateWitness = (w: WitnessProfile) => {
    const issues: string[] = [];
    const warnings: string[] = [];
    let status: "safe" | "warning" | "void_risk" | "fatal" = "safe";

    // 1. Fundamental Competency Checks
    if (!w.isAdult) {
      issues.push("Disqualified: Minors under 18 cannot be competent attesting witnesses under Indian law.");
      status = "fatal";
    }
    if (!w.isSoundMind) {
      issues.push("Disqualified: A person of unsound mind lacks capacity to understand attestation.");
      status = "fatal";
    }
    if (!w.hasSight) {
      issues.push("Disqualified: Section 63(c) requires visual sight of the testator signing. Blind witnesses are legally incompetent.");
      status = "fatal";
    }
    if (!w.presentDuringSigning) {
      issues.push("Defective Attestation: Witness must personally see the testator sign or receive direct personal acknowledgment.");
      status = "fatal";
    }

    // 2. Section 67 & Beneficiary Checks
    const hasFinancialInterest = w.isBeneficiary || w.spouseIsBeneficiary;

    if (hasFinancialInterest) {
      if (religion === "christian_parsi") {
        issues.push("CRITICAL STATUTORY VOID: Under Section 67, any bequest to this witness or their spouse is completely VOID.");
        status = "void_risk";
      } else if (religion === "hindu") {
        warnings.push("PROBATE CONFLICT RISK: Section 67 is excluded by Schedule III, but having a beneficiary witness creates a heavy suspicious circumstance in court (H. Venkatachala Iyengar). Disinherited heirs can contest the Will.");
        if (status !== "fatal") status = "warning";
      } else if (religion === "muslim") {
        warnings.push("SHARIAT ATTESTATION RISK: Under Muslim Personal Law, witnesses must be upright and completely independent of any testamentary bequest.");
        if (status !== "fatal") status = "warning";
      }
    }

    // 3. Role-Specific Nuances
    if (w.role === "doctor") {
      // Doctor is the gold standard
    } else if (w.role === "lawyer" || w.role === "ca") {
      // Independent professional
    } else if (w.role === "executor") {
      if (!hasFinancialInterest) {
        // Section 68 expressly permits executors
      } else {
        warnings.push("Executor-cum-beneficiary: Permitted under Section 68, but requires strong proof of testamentary capacity.");
        if (status === "safe") status = "warning";
      }
    } else if (w.role === "spouse" || w.role === "child" || w.role === "in_law" || w.role === "sibling") {
      if (!hasFinancialInterest) {
        warnings.push("Non-beneficiary family member: Legally valid, but family witnesses may face credibility challenges or hostility during probate.");
        if (status === "safe") status = "warning";
      }
    }

    // 4. Section 67 BSA 2023 Survivorship Factor
    if (!w.isYoungerThanTestator) {
      warnings.push("Survivorship Warning: If the witness predeceases the testator, proving the Will under Section 67 BSA 2023 requires complex handwriting evidence.");
    }

    return { issues, warnings, status };
  };

  const evalW1 = evaluateWitness(w1);
  const evalW2 = evaluateWitness(w2);

  // Overall Score Calculation (0 to 100)
  let score = 100;
  if (evalW1.status === "fatal" || evalW2.status === "fatal") {
    score = 20;
  } else if (evalW1.status === "void_risk" || evalW2.status === "void_risk") {
    score = 40;
  } else {
    if (evalW1.status === "warning") score -= 25;
    if (evalW2.status === "warning") score -= 25;
    if (!w1.isYoungerThanTestator) score -= 5;
    if (!w2.isYoungerThanTestator) score -= 5;
    if (w1.role === "doctor" || w2.role === "doctor") score = Math.min(100, score + 10);
  }
  score = Math.max(10, Math.min(100, score));

  // Overall Verdict Headline
  let overallVerdict = "Optimal & 100% Court-Defensible";
  let overallBadgeClass = "bg-emerald-50 text-emerald-800 border-emerald-300";
  let overallDescription = "Your proposed witnesses satisfy all statutory requirements under Section 63(c) and Section 67 of the Indian Succession Act, 1925, and Section 67 of the Bharatiya Sakshya Adhiniyam, 2023.";

  if (evalW1.status === "fatal" || evalW2.status === "fatal") {
    overallVerdict = "Fatal Defect: Incompetent Witness";
    overallBadgeClass = "bg-rose-50 text-rose-800 border-rose-300";
    overallDescription = "One or both witnesses are legally disqualified by age, incapacity, lack of sight, or failure to witness signing. The Will risks being declared null and void.";
  } else if (evalW1.status === "void_risk" || evalW2.status === "void_risk") {
    overallVerdict = "Statutory Void: Bequest Cancelled Under Section 67";
    overallBadgeClass = "bg-red-50 text-red-800 border-red-300";
    overallDescription = "Under Section 67, any bequest made to an attesting witness or their spouse is completely VOID for Christian and Parsi Wills. The witness will receive zero inheritance.";
  } else if (evalW1.status === "warning" || evalW2.status === "warning") {
    overallVerdict = "Probate Litigation Risk: Suspicious Circumstance";
    overallBadgeClass = "bg-amber-50 text-amber-800 border-amber-300";
    overallDescription = "Having a beneficiary, spouse, or interested family member sign as a witness invites aggressive court challenges from excluded relatives during probate proceedings.";
  }

  const copyClauseToClipboard = () => {
    const clauseText = `STATUTORY ATTESTATION CLAUSE (SECTION 63(C) INDIAN SUCCESSION ACT, 1925):
"Signed and acknowledged by the Testator, [Full Name of Testator], as and for his/her Last Will and Testament, in the joint physical presence of us, who at his/her request, in his/her presence, and in the presence of each other, have hereunto subscribed our names as attesting witnesses, after satisfying ourselves that the Testator is in sound disposing state of mind, memory, and understanding, and that he/she has executed this instrument freely, voluntarily, and without any coercion, fraud, or undue influence whatsoever.

1. FIRST ATTESTING WITNESS:
Signature: __________________________
Full Name: [Witness 1 Name]
Father's / Husband's Name: [Parent/Spouse Name]
Occupation / Qualification: [Doctor / Advocate / Professional]
Age: [Age] Years | Mobile: [Optional]
Residential Address: [Full Residential Address]
Aadhaar / Voter ID No: [Govt ID Proof Number]

2. SECOND ATTESTING WITNESS:
Signature: __________________________
Full Name: [Witness 2 Name]
Father's / Husband's Name: [Parent/Spouse Name]
Occupation / Qualification: [Advocate / Colleague / Neighbor]
Age: [Age] Years | Mobile: [Optional]
Residential Address: [Full Residential Address]
Aadhaar / Voter ID No: [Govt ID Proof Number]"`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyDoctorCertToClipboard = () => {
    const certText = `CONTEMPORANEOUS MEDICAL FITNESS CERTIFICATE BY REGISTERED MEDICAL PRACTITIONER (RMP):
"I, Dr. [Doctor's Full Name], holding qualification [MBBS / MD / MS], registered with the State Medical Council / National Medical Commission under Registration No. [Reg Number], practicing at [Clinic / Hospital Name & Full Address], do hereby certify that:

1. I have this day, the [Date] of [Month, Year], examined [Mr. / Mrs. / Ms. Testator Name], aged about [Age] years, residing at [Testator's Full Address], immediately prior to the execution of his/her Last Will and Testament.
2. Based on clinical examination and cognitive assessment, I certify that the Testator is in full possession of sound disposing mental faculties, lucid memory, coherent speech, and rational understanding.
3. The Testator is fully conscious, oriented to time, place, and person, and capable of understanding the nature, effect, and testamentary consequences of the bequests made in the attached Will.
4. I have signed this certificate and the said Will in the physical presence of the Testator and the second attesting witness.

Date: [Date of Execution]
Place: [City, State]
Doctor's Signature: __________________________
Doctor's Name & Seal: [Official Stamp with Reg No.]"`;
    navigator.clipboard.writeText(certText);
    setCopiedDoctorCert(true);
    setTimeout(() => setCopiedDoctorCert(false), 3000);
  };

  const activeWitness = activeWitnessTab === 1 ? w1 : w2;
  const setActiveWitness = (updated: WitnessProfile) => {
    if (activeWitnessTab === 1) setW1(updated);
    else setW2(updated);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy - Matching Tool Theme)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 • SECTIONS 57, 63(C), 67 &amp; 68</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Will Witness Eligibility &amp; Section 67 Checker India
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Instantly check who can legally witness your Will in India. Test doctor, lawyer, family
            member, and executor eligibility. Verify <strong>Section 67 void bequest rules</strong>,
            Hindu Schedule III exceptions, and Section 67 BSA 2023 probate court standards.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-checker"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <UserCheck className="w-4 h-4" />
              <span>Check Witness Eligibility</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Challenge-Proof Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 63(c)</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MINIMUM 2 ATTESTING WITNESSES
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 67</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                VOID BEQUEST TO WITNESS
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Schedule III</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                HINDU WILL EXCEPTION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 67 BSA</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MANDATORY PROBATE TESTIMONY
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
                <span>Statutory Authority</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Sections 57, 63(c), 67, 68 &amp; Schedule III of the Indian Succession
                Act, 1925, Section 67 of the Bharatiya Sakshya Adhiniyam, 2023, and landmark Supreme
                Court rulings in H. Venkatachala Iyengar and Kavita Kanwar.
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
                <span>EXECUTIVE BRIEF: WILL ATTESTATION RULES IN INDIA</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Mandatory Two Witnesses:</strong> Section 63(c) requires at least two adult,
                    sane witnesses who physically see the testator sign or receive personal acknowledgment.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 67 Void Bequest Rule:</strong> For Christian and Parsi Wills, if a
                    beneficiary or their spouse signs as a witness, their entire inheritance is void.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Hindu Schedule III Nuance:</strong> For Hindu, Sikh, Jain, and Buddhist Wills,
                    Section 67 does not apply statutorily. However, having a beneficiary witness creates a
                    grave suspicious circumstance in probate court.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Doctor &amp; Lawyer Gold Standard:</strong> Having an independent MBBS doctor
                    and an advocate sign provides rock-solid defense against claims of dementia or undue
                    influence.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: SECTION 67 EXPLAINED */}
            <section id="section-67-explained" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY OVERVIEW</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Section 67 Explained: Who Can Witness a Will in India
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Executing a Will requires strict adherence to statutory formalities. Under Section 63(c)
                  of the Indian Succession Act, 1925, a Will must be attested by two or more witnesses.
                  Each witness must see the testator sign, or receive personal acknowledgment of the signature.
                </p>
                <p>
                  The most perilous pitfall in Indian testamentary drafting is choosing the wrong witnesses.
                  Section 67 of the Act addresses gifts made to attesting witnesses. It provides that if a
                  person attests a Will, any bequest given to that person, or to their spouse, is completely void.
                </p>
                <p>
                  Importantly, the Will itself does not fail. The attestation remains valid to prove the Will.
                  However, the witness and their spouse lose every rupee and parcel of land bequeathed to them.
                  Understanding who can safely witness your Will protects both your estate and your loved ones.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CHECKER */}
            <section id="interactive-checker" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE DIAGNOSTIC TOOL</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Witness Eligibility &amp; Section 67 Checker
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your religion and configure the profile of both proposed witnesses below. Get an
                instant statutory evaluation, void bequest risk analysis, and Court-Defensibility Score.
              </p>

              {/* Calculator Panel Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Step 1: Personal Law / Religion Selector */}
                <div className="space-y-3 pb-6 border-b border-slate-100">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-[#C65378]" />
                      <span>Testator Personal Law / Religion</span>
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">Determines Sec 67 Applicability</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setReligion("hindu")}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        religion === "hindu"
                          ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <div className="font-extrabold text-sm">Hindu / Sikh / Jain / Buddhist</div>
                      <div className={`text-[11px] mt-1 ${religion === "hindu" ? "text-rose-200" : "text-slate-500"}`}>
                        Schedule III Exemption • Suspicious Circumstance Test
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setReligion("christian_parsi")}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        religion === "christian_parsi"
                          ? "bg-[#C65378] text-white border-[#C65378] shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <div className="font-extrabold text-sm">Christian / Parsi / Special Marriage</div>
                      <div className={`text-[11px] mt-1 ${religion === "christian_parsi" ? "text-rose-100" : "text-slate-500"}`}>
                        Section 67 Applies Strictly • Automatic Bequest Forfeiture
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setReligion("muslim")}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        religion === "muslim"
                          ? "bg-emerald-900 text-white border-emerald-900 shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <div className="font-extrabold text-sm">Muslim (Shariat Law)</div>
                      <div className={`text-[11px] mt-1 ${religion === "muslim" ? "text-emerald-200" : "text-slate-500"}`}>
                        Wasiyat Rules • 2 Sane Adult Males Required
                      </div>
                    </button>
                  </div>
                </div>

                {/* Step 2: Witness Switcher Tabs */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveWitnessTab(1)}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                          activeWitnessTab === 1
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        <UserCheck className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Proposed Witness 1</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${evalW1.status === "safe" ? "bg-emerald-100 text-emerald-800" : evalW1.status === "warning" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800"}`}>
                          {evalW1.status.toUpperCase()}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveWitnessTab(2)}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                          activeWitnessTab === 2
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        <UserCheck className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Proposed Witness 2</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${evalW2.status === "safe" ? "bg-emerald-100 text-emerald-800" : evalW2.status === "warning" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800"}`}>
                          {evalW2.status.toUpperCase()}
                        </span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleResetChecker}
                      className="text-xs text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  </div>

                  {/* Active Witness Input Form */}
                  <div className="bg-[#FAF7F0] rounded-2xl border border-slate-200/80 p-5 space-y-6">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
                      <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                        <span>Configuring Proposed Witness {activeWitnessTab}</span>
                      </div>
                      <span className="text-[11px] text-[#C65378] font-bold">
                        Indian Succession Act Section 63(c)
                      </span>
                    </div>

                    {/* Role / Relationship Grid */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Role &amp; Relationship to Testator</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: "doctor", label: "Doctor (MBBS/MD)", icon: Stethoscope },
                          { id: "lawyer", label: "Advocate / Lawyer", icon: Briefcase },
                          { id: "ca", label: "Chartered Accountant", icon: Calculator },
                          { id: "colleague_friend", label: "Colleague / Friend", icon: UserCheck },
                          { id: "executor", label: "Executor Named in Will", icon: Gavel },
                          { id: "child", label: "Son / Daughter", icon: Users },
                          { id: "spouse", label: "Spouse (Wife/Husband)", icon: Users },
                          { id: "in_law", label: "Son/Daughter-in-law", icon: Users },
                        ].map((item) => {
                          const IconComponent = item.icon;
                          const isSelected = activeWitness.role === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setActiveWitness({ ...activeWitness, role: item.id as any })}
                              className={`p-2.5 rounded-xl text-left border transition-all flex items-center gap-2 ${
                                isSelected
                                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                              }`}
                            >
                              <IconComponent className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-rose-300" : "text-[#C65378]"}`} />
                              <span className="text-xs font-bold truncate">{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Key Attributes Toggles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Age Status */}
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 space-y-2">
                        <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                          <span>Age of Witness</span>
                          <span className={`text-[11px] font-black ${activeWitness.isAdult ? "text-emerald-700" : "text-rose-700"}`}>
                            {activeWitness.isAdult ? "18+ Years (Adult)" : "Under 18 (Minor)"}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveWitness({ ...activeWitness, isAdult: true })}
                            className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                              activeWitness.isAdult ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            Adult (18+)
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveWitness({ ...activeWitness, isAdult: false })}
                            className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                              !activeWitness.isAdult ? "bg-rose-700 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            Minor (&lt;18)
                          </button>
                        </div>
                      </div>

                      {/* Mental Soundness */}
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 space-y-2">
                        <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                          <span>Mental Soundness</span>
                          <span className={`text-[11px] font-black ${activeWitness.isSoundMind ? "text-emerald-700" : "text-rose-700"}`}>
                            {activeWitness.isSoundMind ? "Sound Mind" : "Unsound / Impaired"}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveWitness({ ...activeWitness, isSoundMind: true })}
                            className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                              activeWitness.isSoundMind ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            Sound Mind
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveWitness({ ...activeWitness, isSoundMind: false })}
                            className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                              !activeWitness.isSoundMind ? "bg-rose-700 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            Impaired
                          </button>
                        </div>
                      </div>

                      {/* Visual Sight Status */}
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 space-y-2">
                        <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                          <span>Visual Ability (Sight)</span>
                          <span className={`text-[11px] font-black ${activeWitness.hasSight ? "text-emerald-700" : "text-rose-700"}`}>
                            {activeWitness.hasSight ? "Can See Testator Sign" : "Blind / Visually Impaired"}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveWitness({ ...activeWitness, hasSight: true })}
                            className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                              activeWitness.hasSight ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            Has Sight
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveWitness({ ...activeWitness, hasSight: false })}
                            className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                              !activeWitness.hasSight ? "bg-rose-700 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            Blind
                          </button>
                        </div>
                      </div>

                      {/* Physical Presence During Execution */}
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 space-y-2">
                        <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                          <span>Physical Presence</span>
                          <span className={`text-[11px] font-black ${activeWitness.presentDuringSigning ? "text-emerald-700" : "text-rose-700"}`}>
                            {activeWitness.presentDuringSigning ? "Sees Testator Sign" : "Absent / Signing Later"}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveWitness({ ...activeWitness, presentDuringSigning: true })}
                            className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                              activeWitness.presentDuringSigning ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            Sees Signing
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveWitness({ ...activeWitness, presentDuringSigning: false })}
                            className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                              !activeWitness.presentDuringSigning ? "bg-rose-700 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            Signs Later
                          </button>
                        </div>
                      </div>

                      {/* Financial / Beneficiary Interest Check */}
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 space-y-2">
                        <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                          <span>Receives Legacy or Property?</span>
                          <span className={`text-[11px] font-black ${activeWitness.isBeneficiary ? "text-rose-700" : "text-emerald-700"}`}>
                            {activeWitness.isBeneficiary ? "Named Beneficiary" : "Zero Benefit"}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveWitness({ ...activeWitness, isBeneficiary: false })}
                            className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                              !activeWitness.isBeneficiary ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            No Bequest
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveWitness({ ...activeWitness, isBeneficiary: true })}
                            className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                              activeWitness.isBeneficiary ? "bg-rose-700 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            Gets Bequest
                          </button>
                        </div>
                      </div>

                      {/* Spouse Beneficiary Check */}
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 space-y-2">
                        <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                          <span>Witness's Spouse Gets Bequest?</span>
                          <span className={`text-[11px] font-black ${activeWitness.spouseIsBeneficiary ? "text-rose-700" : "text-emerald-700"}`}>
                            {activeWitness.spouseIsBeneficiary ? "Spouse Gets Legacy" : "Zero Benefit to Spouse"}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveWitness({ ...activeWitness, spouseIsBeneficiary: false })}
                            className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                              !activeWitness.spouseIsBeneficiary ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            No (Spouse Gets Zero)
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveWitness({ ...activeWitness, spouseIsBeneficiary: true })}
                            className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                              activeWitness.spouseIsBeneficiary ? "bg-rose-700 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            Yes (Spouse Gets Share)
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Section 67 BSA 2023 Survivorship Factor */}
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold text-slate-800">
                          Is this witness younger &amp; healthy enough to survive testator?
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Section 67 BSA 2023 requires at least one living witness to testify in court.
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => setActiveWitness({ ...activeWitness, isYoungerThanTestator: true })}
                          className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                            activeWitness.isYoungerThanTestator ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          Younger / Healthy
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveWitness({ ...activeWitness, isYoungerThanTestator: false })}
                          className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                            !activeWitness.isYoungerThanTestator ? "bg-amber-600 text-white" : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          Elderly / Frail
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3: Diagnostic Results Box */}
                <div className="rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-900 to-[#172228] text-white p-6 space-y-6 shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-rose-300">
                        STATUTORY DEFICIT &amp; RISK AUDIT VERDICT
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                        {overallVerdict}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-[10px] uppercase font-bold text-slate-400">Court Defensibility</div>
                        <div className="text-2xl font-black text-white">{score} / 100</div>
                      </div>
                      <div className="w-12 h-12 rounded-full border-4 border-[#C65378] flex items-center justify-center font-black text-sm text-white">
                        {score}%
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                    {overallDescription}
                  </p>

                  {/* Dual Witness Breakdown Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Witness 1 Verdict Card */}
                    <div className="bg-white/10 rounded-xl p-4 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase text-rose-200">Witness 1 ({w1.role.toUpperCase()})</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${evalW1.status === "safe" ? "bg-emerald-500/20 text-emerald-300" : evalW1.status === "warning" ? "bg-amber-500/20 text-amber-300" : "bg-rose-500/20 text-rose-300"}`}>
                          {evalW1.status.toUpperCase()}
                        </span>
                      </div>
                      {evalW1.issues.length > 0 && (
                        <div className="space-y-1 text-xs text-rose-300">
                          {evalW1.issues.map((iss, i) => (
                            <div key={i} className="flex items-start gap-1.5">
                              <AlertOctagon className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                              <span>{iss}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {evalW1.warnings.length > 0 && (
                        <div className="space-y-1 text-xs text-amber-200">
                          {evalW1.warnings.map((warn, i) => (
                            <div key={i} className="flex items-start gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                              <span>{warn}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {evalW1.issues.length === 0 && evalW1.warnings.length === 0 && (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Fully competent under Section 63(c) and Section 67.</span>
                        </div>
                      )}
                    </div>

                    {/* Witness 2 Verdict Card */}
                    <div className="bg-white/10 rounded-xl p-4 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase text-rose-200">Witness 2 ({w2.role.toUpperCase()})</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${evalW2.status === "safe" ? "bg-emerald-500/20 text-emerald-300" : evalW2.status === "warning" ? "bg-amber-500/20 text-amber-300" : "bg-rose-500/20 text-rose-300"}`}>
                          {evalW2.status.toUpperCase()}
                        </span>
                      </div>
                      {evalW2.issues.length > 0 && (
                        <div className="space-y-1 text-xs text-rose-300">
                          {evalW2.issues.map((iss, i) => (
                            <div key={i} className="flex items-start gap-1.5">
                              <AlertOctagon className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                              <span>{iss}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {evalW2.warnings.length > 0 && (
                        <div className="space-y-1 text-xs text-amber-200">
                          {evalW2.warnings.map((warn, i) => (
                            <div key={i} className="flex items-start gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                              <span>{warn}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {evalW2.issues.length === 0 && evalW2.warnings.length === 0 && (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Fully competent under Section 63(c) and Section 67.</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Immediate Actionable Advice */}
                  <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-xs text-white/80">
                      Want an advocate to cross-verify your Will execution and witness affidavits?
                    </div>
                    <Link
                      href="/contact"
                      className="px-5 py-2.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-xs shadow-sm transition-transform hover:-translate-y-0.5 shrink-0"
                    >
                      Consult Succession Advocate
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* VISUAL FEATURE BLUEPRINT */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY VISUAL BLUEPRINT: WILL WITNESS ELIGIBILITY</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Indian Succession Act 1925</span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/witness-eligibility-section-67-checker-og.jpg"
                  alt="Who Can Be Witness to a Will in India - Section 67 Checker & Legal Attestation Blueprint"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
            </div>

            {/* SECTION 3: HINDU VS CHRISTIAN SCHEDULE III */}
            <section id="hindu-vs-christian-schedule-iii" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LEGAL DISTINCTION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Hindu vs Christian Wills: The Schedule III Distinction
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Most online guides make a dangerous legal error by applying Section 67 indiscriminately to
                  all Indian citizens. The Indian Succession Act, 1925 creates a profound structural distinction
                  between different communities under <strong>Section 57 read with Schedule III</strong>.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-200/80 space-y-2">
                    <div className="font-extrabold text-rose-900 text-sm flex items-center gap-2">
                      <AlertOctagon className="w-4 h-4 text-[#C65378]" />
                      <span>Christians, Parsis, Jews &amp; Special Marriage Act</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Section 67 applies in full force. If an attesting witness, or the husband or wife of an
                      attesting witness, is named as a beneficiary, <strong>the bequest is void</strong>. The
                      witness cannot take the property, though the Will remains validly executed.
                    </p>
                  </div>
                  <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80 space-y-2">
                    <div className="font-extrabold text-amber-900 text-sm flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-700" />
                      <span>Hindus, Sikhs, Jains &amp; Buddhists</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Schedule III of the Act enumerates the sections of Part VI that apply to Hindus.
                      <strong> Section 67 is omitted from Schedule III</strong>. Statutorily, a bequest to a
                      witness is not void automatically. However, it creates a massive suspicious circumstance
                      in court under the Supreme Court's ruling in <em>H. Venkatachala Iyengar</em>.
                    </p>
                  </div>
                </div>
                <p>
                  Therefore, even though Hindu law does not automatically forfeit the bequest by statute,
                  probate courts view a beneficiary witness with acute suspicion. If disinherited children
                  challenge the Will, the propounder must prove beyond doubt that the testator was not coerced.
                </p>
              </div>
            </section>

            {/* SECTION 4: BENEFICIARIES AND SPOUSES */}
            <section id="beneficiaries-and-spouses-as-witnesses" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>FAMILY WITNESSES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Can Beneficiaries, Spouses, or Heirs Be Witnesses?
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A frequent question asked during Will drafting is: <em>"Can my wife, son, or daughter sign as a witness?"</em>
                  The practical answer is an emphatic <strong>NO</strong>, unless they receive zero assets under the Will.
                </p>
                <p>
                  Here is how the law treats different family scenarios:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                  <li>
                    <strong>Wife or Husband as Witness:</strong> If the spouse inherits the matrimonial home
                    or bank accounts, having them sign as a witness triggers Section 67 for Christians and Parsis,
                    voiding their life estate. For Hindus, it invites immediate challenges from excluded children.
                  </li>
                  <li>
                    <strong>Favored Child as Witness:</strong> If one child receives a larger share of ancestral
                    or self-acquired property and attests the Will, courts presume undue influence. The Supreme
                    Court in <em>Kavita Kanwar v. Pamela Mehta (2021)</em> held that active participation by a major
                    beneficiary in the execution process vitiates the probate petition if unexplained.
                  </li>
                  <li>
                    <strong>Son-in-law or Daughter-in-law as Witness:</strong> While Section 67 explicitly
                    names only the witness's husband or wife, bequests to a son-in-law or daughter-in-law
                    whose spouse attests the Will are routinely challenged as indirect spousal fraud.
                  </li>
                  <li>
                    <strong>Disinherited Child as Witness:</strong> If a child who receives nothing signs as
                    a witness, the attestation is legally valid. However, in probate litigation, that disinherited
                    child can easily turn hostile and refuse to depose under Section 67 BSA 2023.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 5: DOCTORS AND LAWYERS */}
            <section id="doctors-and-lawyers-evidentiary-value" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Stethoscope className="w-4 h-4" />
                <span>EXPERT WITNESSES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Doctors &amp; Lawyers as Witnesses: Evidentiary Value
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The most effective strategy to create a challenge-proof Will in India is selecting
                  independent professional witnesses. Indian courts give immense evidentiary weight to
                  medical practitioners and legal professionals.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
                    <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                      <Stethoscope className="w-4 h-4 text-[#C65378]" />
                      <span>The Family Doctor (MBBS / MD)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A doctor acts as both an attesting witness and an expert witness under Section 39 of BSA 2023.
                      By certifying the testator's testamentary capacity at the exact moment of signing, the doctor
                      extinguishes future allegations of senile dementia, Alzheimer's, or medication-induced delirium.
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
                    <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                      <Briefcase className="w-4 h-4 text-[#5F7E75]" />
                      <span>The Independent Advocate / CA</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      An advocate understands procedural law and maintains contemporaneous office records.
                      When subpoenaed in a probate suit, their testimony carries high credibility because they have
                      no financial interest in the estate and can confirm the testator gave voluntary instructions.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: EXECUTOR AS WITNESS */}
            <section id="executor-competency-section-68" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>FIDUCIARY APPOINTMENTS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Executor as Witness: Section 68 Competency Rules
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Can the person appointed to distribute your estate also attest your Will?
                  Under <strong>Section 68 of the Indian Succession Act, 1925</strong>, the statute explicitly
                  protects the competence of executors:
                </p>
                <div className="bg-[#FAF7F0] p-4 rounded-2xl border-l-4 border-l-[#5F7E75] border border-slate-200 text-xs sm:text-sm text-slate-800 italic">
                  "No person, by reason of interest in, or of his being an executor of, a will, shall be
                  disqualified to be admitted as a witness to prove the execution of the will, or to prove
                  the validity or invalidity thereof."
                </div>
                <p>
                  This means being named as an Executor does not disqualify a witness. An executor is a fiduciary
                  who manages probate and asset transmission. However, if the Executor is <em>also</em> a primary
                  beneficiary (for example, the eldest son who inherits 80% of the estate and is named executor),
                  the suspicious circumstance doctrine applies fully.
                </p>
              </div>
            </section>

            {/* SECTION 7: SECTION 67 BSA 2023 */}
            <section id="bsa-2023-section-67-probate-proof" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>COURT EVIDENCE STANDARDS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Section 67 BSA 2023: Proving a Will in Probate Court
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Effective July 1, 2024, the Indian Evidence Act, 1872 was replaced by the
                  <strong> Bharatiya Sakshya Adhiniyam, 2023 (BSA)</strong>. Section 67 of the BSA
                  (corresponding to former Section 68 of the Evidence Act) governs how a Will is proven in court.
                </p>
                <p>
                  Under Section 67 BSA, if a document is required by law to be attested, it
                  <strong> cannot be used as evidence until at least one attesting witness is examined in court</strong>,
                  provided that witness is alive, capable of giving evidence, and subject to the process of the court.
                </p>
                <div className="rounded-2xl bg-slate-900 text-white p-5 space-y-3 text-xs sm:text-sm">
                  <div className="font-extrabold text-rose-300 uppercase tracking-wider text-xs">
                    PRACTICAL RULES FOR WITNESS AVAILABILITY:
                  </div>
                  <ul className="space-y-2 text-white/90">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Choose Younger Witnesses:</strong> If you are 70, do not choose 75-year-old
                        friends. If both witnesses die before you, Section 68 BSA requires proving their handwriting,
                        which demands forensic examination and delays probate by years.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Keep Verified Contact Details:</strong> Record Aadhaar numbers, residential
                        addresses, and professional registration numbers of your witnesses in your Will dossier.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 8: DISQUALIFIED WITNESSES */}
            <section id="disqualified-witness-categories" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <UserX className="w-4 h-4" />
                <span>STATUTORY DISQUALIFICATIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Disqualified Witnesses: Minors, Blind Persons &amp; More
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The following individuals are legally disqualified from being attesting witnesses in India:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-4 bg-white rounded-2xl border border-slate-200/90 space-y-1.5">
                    <div className="font-bold text-rose-800 flex items-center gap-1.5">
                      <X className="w-4 h-4 text-rose-600" />
                      <span>Minors Under 18 Years</span>
                    </div>
                    <p className="text-slate-600 text-xs">
                      Under Section 3 of the Indian Majority Act, 1875, minors lack contractual and legal capacity.
                      A minor cannot depose competently in court as an attesting witness.
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-slate-200/90 space-y-1.5">
                    <div className="font-bold text-rose-800 flex items-center gap-1.5">
                      <EyeOff className="w-4 h-4 text-rose-600" />
                      <span>Blind or Visually Impaired Persons</span>
                    </div>
                    <p className="text-slate-600 text-xs">
                      Section 63(c) requires the witness to "see" the testator sign. Established precedents
                      (including <em>In the Estate of Gibson</em>) confirm blind witnesses are legally incompetent.
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-slate-200/90 space-y-1.5">
                    <div className="font-bold text-rose-800 flex items-center gap-1.5">
                      <FileSignature className="w-4 h-4 text-rose-600" />
                      <span>Digital / Electronic Signatures</span>
                    </div>
                    <p className="text-slate-600 text-xs">
                      Under the First Schedule of the Information Technology Act, 2000, Wills cannot be signed
                      electronically. E-Sign or DocuSign attestation is completely invalid in India.
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-slate-200/90 space-y-1.5">
                    <div className="font-bold text-rose-800 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-rose-600" />
                      <span>Remote / Video Call Witnesses</span>
                    </div>
                    <p className="text-slate-600 text-xs">
                      The witness must be physically present in the same room. Signing over Zoom or WhatsApp
                      video call does not satisfy Section 63(c) physical presence mandates.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: WITNESS COMPARISON TABLE */}
            <section id="witness-comparison-matrix" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>COMPARATIVE MATRIX</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Witness Category Comparison: Risk &amp; Legal Standing
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700 divide-y divide-slate-200">
                  <thead className="bg-slate-900 text-white text-[11px] uppercase tracking-wider font-extrabold">
                    <tr>
                      <th className="p-3.5 sm:p-4">Witness Category</th>
                      <th className="p-3.5 sm:p-4">Statutory Eligibility</th>
                      <th className="p-3.5 sm:p-4">Section 67 Void Risk</th>
                      <th className="p-3.5 sm:p-4">Suspicious Circumstance</th>
                      <th className="p-3.5 sm:p-4">Recommended Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">MBBS / MD Doctor</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">100% Eligible</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700">None (if non-beneficiary)</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700">Zero Risk</td>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Highly Recommended (Gold Standard)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Practicing Advocate</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">100% Eligible</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700">None (if non-beneficiary)</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700">Zero Risk</td>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Ideal for Legal Scrutiny</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Independent Colleague</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">100% Eligible</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700">None</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700">Low Risk</td>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Safe Choice</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Executor (Non-Beneficiary)</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">Eligible (Sec 68)</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700">None</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700">Low Risk</td>
                      <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Permitted under Section 68</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors bg-rose-50/40">
                      <td className="p-3.5 sm:p-4 font-bold text-rose-900">Beneficiary Child / Spouse</td>
                      <td className="p-3.5 sm:p-4 text-amber-700 font-bold">Technically Eligible</td>
                      <td className="p-3.5 sm:p-4 text-rose-700 font-bold">100% Void (Non-Hindus)</td>
                      <td className="p-3.5 sm:p-4 text-rose-700 font-bold">Severe Suspicion (Hindus)</td>
                      <td className="p-3.5 sm:p-4 font-bold text-rose-800">STRICTLY AVOID</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors bg-red-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-red-900">Minor Under 18</td>
                      <td className="p-3.5 sm:p-4 text-rose-700 font-bold">Incompetent</td>
                      <td className="p-3.5 sm:p-4 text-slate-500">N/A</td>
                      <td className="p-3.5 sm:p-4 text-rose-700 font-bold">Fatal Defect</td>
                      <td className="p-3.5 sm:p-4 font-bold text-rose-800">Disqualified by Law</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 10: STEP-BY-STEP SOP */}
            <section id="step-by-step-execution-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <CheckCircle2 className="w-4 h-4" />
                <span>EXECUTION PROTOCOL</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Step-by-Step SOP: Executing a Challenge-Proof Will
              </h2>
              <div className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Select Two Independent, Non-Beneficiary Witnesses",
                    desc: "Ensure neither witness nor their spouse receives any asset, cash, or life interest under the Will. Ideal combination: 1 Doctor + 1 Advocate or Long-standing Colleague.",
                  },
                  {
                    step: "2",
                    title: "Conduct Contemporaneous Medical Examination",
                    desc: "Have the Registered Medical Practitioner examine the testator on the day of execution. Obtain a signed fitness certificate endorsed directly on the Will.",
                  },
                  {
                    step: "3",
                    title: "Assemble All Parties in One Room Simultaneously",
                    desc: "Seat the testator, Witness 1, and Witness 2 at the same conference table. Do not allow signing in separate rooms or at different times.",
                  },
                  {
                    step: "4",
                    title: "Read Out and Acknowledge the Will",
                    desc: "The testator must confirm: 'This is my Last Will and Testament, drafted according to my instructions, and I understand all bequests.'",
                  },
                  {
                    step: "5",
                    title: "Testator Signs Every Page in Sight of Witnesses",
                    desc: "The testator signs or places their thumb impression on each page and at the foot of the Will in full view of both witnesses.",
                  },
                  {
                    step: "6",
                    title: "Witnesses Sign the Attestation Clause Immediately",
                    desc: "Each witness writes their full name, father's/spouse's name, age, address, and government ID number directly beneath the attestation clause.",
                  },
                  {
                    step: "7",
                    title: "Archive Video Recording & Medical Fitness Dossier",
                    desc: "Record a 2-minute video of the signing ceremony and store it with the original Will in a fireproof safe or Sub-Registrar deposit.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                    <div className="w-8 h-8 rounded-full bg-[#172228] text-white font-black text-sm flex items-center justify-center shrink-0">
                      {item.step}
                    </div>
                    <div className="space-y-1">
                      <div className="font-extrabold text-slate-900 text-sm">{item.title}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 11: LANDMARK SUPREME COURT RULINGS */}
            <section id="landmark-supreme-court-precedents" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>CASE LAW PRECEDENTS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Landmark Supreme Court Rulings on Attesting Witnesses
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-sm">H. Venkatachala Iyengar v. B.N. Thimmajamma (1959 AIR 443 SC)</span>
                    <span className="text-[11px] font-bold text-[#C65378] bg-rose-50 px-2 py-0.5 rounded-full">Constitutional Bench</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The 3-judge bench established the universal test of suspicious circumstances. When a person
                    who benefits substantially participates in the execution or attests the Will, a heavy burden
                    lies on the propounder to dispel all suspicion. If unresolved, the court must refuse probate.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-sm">Kavita Kanwar v. Pamela Mehta (2021 11 SCC 209 SC)</span>
                    <span className="text-[11px] font-bold text-[#5F7E75] bg-emerald-50 px-2 py-0.5 rounded-full">Supreme Court</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Supreme Court reaffirmed that where the major beneficiary took a leading role in arranging
                    the witnesses and execution, without convincing explanation for disinheriting other natural
                    heirs, the Will cannot be accepted as genuine.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-sm">Murthy v. C. Saradambal (2022 3 SCC 209 SC)</span>
                    <span className="text-[11px] font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-full">Section 63(c) Test</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Court held that attestation requires <em>animus attestandi</em>. Merely putting signatures
                    on paper is not enough; the witness must sign with the explicit intention of verifying the
                    testator's execution.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: STANDARD ATTESTATION CLAUSES */}
            <section id="standard-attestation-clauses" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSignature className="w-4 h-4" />
                <span>LEGAL CLAUSE TEMPLATES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Standard Attestation Clauses &amp; Certificate Templates
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Copy and incorporate these statutory clauses into your Will draft to ensure full compliance
                with Section 63(c) of the Indian Succession Act, 1925.
              </p>

              {/* Template Box 1: Dual Attestation Clause */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Statutory Dual Attestation Clause (Section 63(c))</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors"
                  >
                    {copiedClause ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Copy Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="bg-[#FAF7F0] p-4 rounded-2xl text-xs text-slate-800 font-mono leading-relaxed whitespace-pre-wrap border border-slate-200/70 overflow-x-auto">
{`"Signed and acknowledged by the Testator, [Full Name of Testator], as and for his/her Last Will and Testament, in the joint physical presence of us, who at his/her request, in his/her presence, and in the presence of each other, have hereunto subscribed our names as attesting witnesses, after satisfying ourselves that the Testator is in sound disposing state of mind, memory, and understanding, and that he/she has executed this instrument freely, voluntarily, and without any coercion, fraud, or undue influence whatsoever.

1. FIRST ATTESTING WITNESS:
Signature: __________________________
Full Name: [Witness 1 Name]
Father's / Husband's Name: [Parent/Spouse Name]
Occupation / Qualification: [Doctor / Advocate / Professional]
Age: [Age] Years | Address: [Full Residential Address]
Aadhaar / Voter ID No: [Govt ID Proof Number]

2. SECOND ATTESTING WITNESS:
Signature: __________________________
Full Name: [Witness 2 Name]
Father's / Husband's Name: [Parent/Spouse Name]
Occupation / Qualification: [Advocate / Colleague / Neighbor]
Age: [Age] Years | Address: [Full Residential Address]
Aadhaar / Voter ID No: [Govt ID Proof Number]"`}
                </pre>
              </div>

              {/* Template Box 2: Doctor Fitness Certificate */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                    <Stethoscope className="w-4 h-4 text-[#5F7E75]" />
                    <span>Doctor's Contemporaneous Medical Fitness Certificate</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyDoctorCertToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors"
                  >
                    {copiedDoctorCert ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#5F7E75]" />
                        <span>Copy Certificate</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="bg-[#FAF7F0] p-4 rounded-2xl text-xs text-slate-800 font-mono leading-relaxed whitespace-pre-wrap border border-slate-200/70 overflow-x-auto">
{`"I, Dr. [Doctor's Full Name], holding qualification [MBBS / MD / MS], registered with the State Medical Council / National Medical Commission under Registration No. [Reg Number], practicing at [Clinic / Hospital Name & Full Address], do hereby certify that:

1. I have this day, the [Date] of [Month, Year], examined [Mr. / Mrs. / Ms. Testator Name], aged about [Age] years, residing at [Testator's Full Address], immediately prior to the execution of his/her Last Will and Testament.
2. Based on clinical examination and cognitive assessment, I certify that the Testator is in full possession of sound disposing mental faculties, lucid memory, coherent speech, and rational understanding.
3. The Testator is fully conscious, oriented to time, place, and person, and capable of understanding the nature, effect, and testamentary consequences of the bequests made in the attached Will.
4. I have signed this certificate and the said Will in the physical presence of the Testator and the second attesting witness.

Date: [Date of Execution] | Place: [City, State]
Doctor's Signature: __________________________
Doctor's Name & Seal: [Official Stamp with Reg No.]"`}
                </pre>
              </div>
            </section>

            {/* SECTION 13: ADVOCATE VERIFICATION PROFILE */}
            <section id="advocate-verification-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>LEGAL SCRUTINY &amp; COUNSEL</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Advocate Verification &amp; Legal Scrutiny Process
              </h2>
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-rose-100 text-[#C65378] font-black text-base flex items-center justify-center shrink-0">
                    AMA
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 text-base">AMA Legal Solutions Testamentary Division</div>
                    <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Bar Council of Delhi • High Court &amp; Supreme Court Advocates
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Every Will template and diagnostic checker on WillDrafting.in is authored and reviewed by
                  seasoned estate planning advocates. Our team verifies witness affidavits, ensures full compliance
                  with Section 63(c) and Section 67, and prepares clients for probate defense under the Bharatiya
                  Sakshya Adhiniyam, 2023.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Witness Affidavit Drafting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Contemporaneous Doctor Video SOP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>High Court Probate Representation</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 14: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>CLARIFICATIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Frequently Asked Questions: Will Witnesses in India
              </h2>
              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-slate-900"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C65378] shrink-0 transition-transform ${
                            isOpen ? "rotate-180" : ""
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

            {/* SECTION 15: CITATIONS & PORTALS */}
            <section id="statutory-citations-portals" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>OFFICIAL PORTALS &amp; CITATIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                15. Statutory References &amp; Official Legislative Portals
              </h2>
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="font-extrabold text-slate-900">
                  Governing Acts &amp; Statutory Codes:
                </div>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>
                    <strong>Indian Succession Act, 1925:</strong> Section 57 (Application of Part VI),
                    Section 63(c) (Execution of unprivileged Wills), Section 67 (Effect of gift to attesting
                    witness), Section 68 (Witness not disqualified by being executor), and Schedule III.
                  </li>
                  <li>
                    <strong>Bharatiya Sakshya Adhiniyam, 2023:</strong> Section 67 (Proof of execution of
                    document required by law to be attested) &amp; Section 68 (Proof where no witness found).
                  </li>
                  <li>
                    <strong>Indian Majority Act, 1875:</strong> Section 3 (Age of majority).
                  </li>
                  <li>
                    <strong>Information Technology Act, 2000:</strong> First Schedule, Entry 1 (Exclusion
                    of Wills from electronic signatures).
                  </li>
                </ul>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-3">
                  <a
                    href="https://www.indiacode.nic.in/handle/123456789/2385?sam_handle=123456789/1362"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>India Code: Indian Succession Act 1925</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>Bharatiya Sakshya Adhiniyam 2023</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://districts.ecourts.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>eCourts Services Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Diagnostic Tools &amp; Succession Guides
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/will-validity-section-63-audit-checker"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Will Validity Section 63 Checker
                    </Link>
                    <Link
                      href="/tools/probate-checker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Probate Mandatory Checker
                    </Link>
                    <Link
                      href="/tools/succession-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Hindu Legal Heir Share Calculator
                    </Link>
                    <Link
                      href="/templates/will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Indian Legal Will Template
                    </Link>
                    <Link
                      href="/tools/bank-deceased-claim-document-checklist-generator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Bank Deceased Claim Checklist
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR
              ===================================================================== */}
          <aside className="space-y-6 sticky top-24">
            {/* CARD 1: AUTHOR BIO CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                  AAM
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">Advocate Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Succession Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialist in Indian testamentary jurisprudence, Section 63(c) attestation audits, High
                Court probate disputes, and Section 67 BSA court witness examinations.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Counsel</span>
                </span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-6">
              {/* CARD 2: DUAL CTA 1 - WILL DRAFTING (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>PREVENT FUTURE PROBATE LITIGATION</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Draft a Challenge-Proof Will in 15 Minutes
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Our guided online tool automatically inserts rock-solid Section 63(c) attestation clauses,
                  doctor certification recitals, and independent executor appointments.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Online Will Drafting</span>
                </button>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION */}
              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-800">
                  <Briefcase className="w-3 h-3 text-[#5F7E75]" />
                  <span>LAWYER REVIEW</span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                  Have an Advocate Audit Your Witnesses
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Worried that a relative might contest your Will? Get your draft and witness affidavits
                  reviewed by senior succession advocates at AMA Legal Solutions.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Scale className="w-4 h-4 text-rose-300" />
                  <span>Book Advocate Consultation</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Families Rely on WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Section 67 Audit:</strong> Identifies automatic bequest forfeiture for non-Hindus.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Doctor Certification:</strong> Pre-built contemporaneous medical fitness clauses.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>BSA 2023 Ready:</strong> Structured for seamless deposition in probate court.
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
          <UserCheck className="w-3.5 h-3.5" />
          <span>Witness Checker</span>
        </a>
        <button
          onClick={handleStartDraft}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Draft a Will</span>
        </button>
      </div>
    </div>
  );
}
