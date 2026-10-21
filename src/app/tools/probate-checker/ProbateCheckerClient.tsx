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
  Printer,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
  Scale,
  Building,
  UserCheck,
  Lock,
  PhoneCall,
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  RefreshCw,
  Landmark,
  Check,
  X,
  MapPin,
  Building2,
  Info,
  DollarSign,
  Gavel,
} from "lucide-react";

interface QuestionConfig {
  id: string;
  number: number;
  question: string;
  subtitle: string;
  rationale: string;
  statute: string;
}

const QUESTIONS: QuestionConfig[] = [
  {
    id: "q1_contested",
    number: 1,
    question: "Is the Will contested or likely to be challenged by any legal heir?",
    subtitle:
      "Disputes regarding mental capacity, forged signatures, or unequal asset shares among children or siblings.",
    rationale:
      "Sections 276 & 289, Indian Succession Act: If any family member disputes the Will, getting a court probate provides conclusive proof that the Will is genuine. Once the court grants probate, it binds the entire world and stops civil property lawsuits.",
    statute: "Section 276 & 289, Indian Succession Act, 1925",
  },
  {
    id: "q2_foreign",
    number: 2,
    question: "Was the Will executed abroad, or does it cover overseas NRI assets?",
    subtitle:
      "Wills made in the USA, UK, Canada, UAE, Australia, or Singapore concerning assets located in India.",
    rationale:
      "Section 228, Indian Succession Act: Indian banks and property registration offices do not accept foreign court probate orders directly. You must get an Indian court order (Letters of Administration with foreign Will copy attached) to transfer Indian properties.",
    statute: "Section 228, Indian Succession Act, 1925",
  },
  {
    id: "q3_location",
    number: 3,
    question: "Does the estate include immovable property in Mumbai, Chennai, or Kolkata?",
    subtitle:
      "Flats, plots, houses, or commercial shops located within the municipal limits of these three cities.",
    rationale:
      "Sections 57 & 213, Indian Succession Act: Probate is 100% compulsory by law for Hindu, Buddhist, Sikh, and Jain Wills that deal with real estate situated in Mumbai, Chennai, or Kolkata.",
    statute: "Section 57 & Section 213, Indian Succession Act, 1925",
  },
  {
    id: "q4_bank",
    number: 4,
    question: "Is any bank, housing society, or registrar demanding a court probate?",
    subtitle:
      "Situations where banks, mutual funds, or housing societies freeze asset transfer until you produce a court order.",
    rationale:
      "Sections 211 & 216, Indian Succession Act: Banks and societies ask for court probate to protect themselves from lawsuits by other relatives. Paying the named executor with a court probate gives the institution complete legal protection.",
    statute: "Section 211 & Section 216, Indian Succession Act, 1925",
  },
  {
    id: "q5_executor",
    number: 5,
    question: "Is an executor named in the Will who is alive, competent, and willing to act?",
    subtitle:
      "Check whether a specific person was named in the Will to distribute your property.",
    rationale:
      "Section 222, Indian Succession Act: Court probate can ONLY be granted to an executor named in the Will. If no executor is named, or if that person has passed away, your family must apply for 'Letters of Administration with Will Annexed' instead.",
    statute: "Section 222 & Section 232, Indian Succession Act, 1925",
  },
];

const TOC_ITEMS = [
  { id: "statutory-framework", label: "1. What is Probate & When is It Needed?" },
  { id: "interactive-diagnostic-tool", label: "2. Interactive Probate Checker Tool" },
  { id: "presidential-towns-rule", label: "3. The 3 Mandatory Cities (Mumbai, Chennai, Kolkata)" },
  { id: "diagnostic-matrix", label: "4. The 5 Common Reasons Courts Require Probate" },
  { id: "state-by-state-guide", label: "5. State-by-State Rules Across India" },
  { id: "visual-blueprint", label: "6. Visual Guide to the Probate Process" },
  { id: "step-by-step-sop", label: "7. Step-by-Step Court Process" },
  { id: "legal-instruments-compared", label: "8. Probate vs Letters of Administration vs Succession Certificate" },
  { id: "court-fees-and-timelines", label: "9. State Court Fees & Expected Timelines" },
  { id: "defensive-estate-planning", label: "10. How to Avoid Probate Hassles in Advance" },
  { id: "specialized-scenarios", label: "11. Special Scenarios (NRIs, Lost Wills & Foreign Grants)" },
  { id: "institutional-profile", label: "12. Legal Backing & Support" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Relevant Laws & Official Portals" },
];

const FAQS = [
  {
    q: "What is Probate of a Will in simple words?",
    a: "Probate is an official certificate issued by a court confirming that a Will is genuine and that the executor named in it has the legal right to distribute the deceased person's property (Section 2(f), Indian Succession Act, 1925). It is the court's stamp of authenticity, proving to banks, registrars, and society offices that no one can dispute the executor's authority.",
  },
  {
    q: "Where in India is Probate compulsory by law?",
    a: "Under Sections 57 and 213 of the Indian Succession Act, probate is compulsory by law ONLY if: (1) The Will was signed in Mumbai, Chennai, or Kolkata, or (2) The Will deals with property (flats, land, houses) located in Mumbai, Chennai, or Kolkata (for Hindu, Buddhist, Sikh, and Jain testators). Outside these three cities, probate is generally optional.",
  },
  {
    q: "Do I need probate for properties in Delhi, Bengaluru, Pune, or Hyderabad?",
    a: "No, probate is not required by law in cities like Delhi NCR, Bengaluru, Hyderabad, Pune, Ahmedabad, Lucknow, or Chandigarh. The Supreme Court of India (Kanta Yadav v. Om Prakash Yadav, 2020) confirmed that property rights under a valid Will can be established outside Mumbai, Chennai, and Kolkata without getting a court probate.",
  },
  {
    q: "Why do banks or housing societies still ask for probate if it is not mandatory?",
    a: "Banks and cooperative housing societies often ask for probate for safety, especially when large bank balances (over ₹25 Lakhs) or valuable flats are involved, or if other relatives object. Under Section 216 of the Act, if a bank pays out based on a court probate, the bank cannot be sued later by angry relatives. However, if all legal heirs agree and sign an Indemnity Bond and No Objection Certificates (NOCs), institutions can release funds without court probate.",
  },
  {
    q: "What happens if the Will does not name an executor?",
    a: "Under Section 222 of the Act, a court can only grant probate to a person explicitly named as 'Executor' in the Will. If no executor was named, or if the named executor has passed away or refuses to act, the court cannot grant probate. Instead, the family heirs must apply for Letters of Administration with Will Annexed (under Section 232).",
  },
  {
    q: "Can a plain paper, unregistered Will get court probate?",
    a: "Yes! In India, registering a Will is completely optional under Section 18(e) of the Registration Act, 1908. A Will written on ordinary white paper is 100% legally valid as long as the person signed it in front of two witnesses who also signed (Section 63). Courts across India grant probate for unregistered plain-paper Wills every day.",
  },
  {
    q: "What is the difference between Probate and a Succession Certificate?",
    a: "A Probate is issued only when there is a valid Will, and covers both land/flats (immovable assets) and money/shares (movable assets). A Succession Certificate is used when someone passes away without a Will, and can ONLY be used to claim bank balances, shares, mutual funds, or debts (movable assets)—it cannot be used for land or flats.",
  },
  {
    q: "How long does it take to get probate from court?",
    a: "If no family member objects (uncontested), it typically takes 6 to 12 months. This time is needed to file the petition, publish public notices in newspapers inviting any objections, notify legal heirs, and record the witness statements. If an heir files an objection (a caveat), the case turns into a regular civil suit and can take 2 to 4 years.",
  },
  {
    q: "What is a 'Caveat' in a probate case?",
    a: "A caveat is a formal notice filed in court by a relative or heir saying: 'Do not grant probate to this Will without informing me first and hearing my objections.' (Section 284, Indian Succession Act). If someone files a caveat, the court must give them a chance to present their objections before approving the Will.",
  },
  {
    q: "Do NRIs need Indian court approval for a Will made abroad?",
    a: "Yes. If an NRI leaves an overseas Will (made in the US, UK, Canada, UAE, etc.) that was probated in a foreign court, Indian sub-registrars and banks will not accept that foreign order directly. Under Section 228 of the Indian Succession Act, the family must file an application in an Indian court to get Letters of Administration based on the certified foreign Will.",
  },
];

export default function ProbateCheckerClient() {
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

  const [activeId, setActiveId] = useState<string>("statutory-framework");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [expandedRationale, setExpandedRationale] = useState<Record<string, boolean>>({});

  // Answers state for the 5 diagnostic questions: true = yes, false = no, null = unanswered
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({
    q1_contested: null,
    q2_foreign: null,
    q3_location: null,
    q4_bank: null,
    q5_executor: null,
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
      rootMargin: "-100px 0px -40% 0px",
      threshold: 0.05,
    });

    const elements = document.querySelectorAll("section[id], div[id].scroll-target");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const toggleRationale = (id: string) => {
    setExpandedRationale((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAnswer = (id: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    setAnswers({
      q1_contested: null,
      q2_foreign: null,
      q3_location: null,
      q4_bank: null,
      q5_executor: null,
    });
  };

  const answeredCount = Object.values(answers).filter((val) => val !== null).length;
  const isComplete = answeredCount === QUESTIONS.length;

  // Diagnostic Evaluation Logic based on Indian Succession Act 1925
  const evaluateDiagnostic = () => {
    if (answeredCount === 0) {
      return {
        status: "idle",
        level: "Pending",
        color: "slate",
        badge: "Answer Questions to Check",
        title: "Complete the 5 Diagnostic Questions Above",
        description:
          "Select Yes or No for each statutory question to instantly determine your court probate necessity, applicable High Court rules, and cost-effective alternatives.",
        mandatory: false,
        requiresLoa: false,
        actionType: "neutral",
      };
    }

    const { q1_contested, q2_foreign, q3_location, q4_bank, q5_executor } = answers;

    // Trigger 1: Immovable property in Mumbai, Chennai, or Kolkata
    if (q3_location === true) {
      if (q5_executor === false) {
        return {
          status: "mandatory_loa",
          level: "Mandatory (Letters of Administration)",
          color: "rose",
          badge: "Court Grant Mandatory",
          title: "Letters of Administration with Will Annexed Required",
          description:
            "Because real estate is located in Mumbai, Chennai, or Kolkata, court certification is mandatory under Section 57 and Section 213. Since no executor is named or available, the court must grant Letters of Administration with Will Annexed under Section 232.",
          mandatory: true,
          requiresLoa: true,
          actionType: "lawyer",
        };
      }
      return {
        status: "mandatory_probate",
        level: "Mandatory by Statute",
        color: "rose",
        badge: "Court Probate Mandatory",
        title: "High Court Probate Petition Required Under Section 213",
        description:
          "Under Section 57 and Section 213 of the Indian Succession Act, 1925, probate is legally compulsory for Hindu, Buddhist, Sikh, and Jain Wills concerning immovable property in Mumbai, Chennai, or Kolkata. Sub-Registrars and housing societies cannot mutate ownership without court probate.",
        mandatory: true,
        requiresLoa: false,
        actionType: "lawyer",
      };
    }

    // Trigger 2: Contested Will
    if (q1_contested === true) {
      return {
        status: "high_risk_contested",
        level: "Practically Essential (High Risk)",
        color: "rose",
        badge: "Court Probate Essential",
        title: "Probate Petition Strongly Advised to Settle Legal Title",
        description:
          "Your Will is facing dispute or caveat from legal heirs. Outside presidency towns, an unprobated Will has weak evidentiary defense against civil suits. A court probate order is a judgment in rem that conclusively establishes validity against all disputing relatives.",
        mandatory: false,
        requiresLoa: q5_executor === false,
        actionType: "lawyer",
      };
    }

    // Trigger 3: Foreign Will or NRI Assets
    if (q2_foreign === true) {
      return {
        status: "ancillary_probate",
        level: "Ancillary Grant Required",
        color: "rose",
        badge: "Section 228 Filing Needed",
        title: "Indian Ancillary Letters of Administration Required",
        description:
          "Indian authorities do not execute foreign court probate decrees directly. Under Section 228 of the Act, you must file an ancillary petition for Letters of Administration with an authenticated copy of the foreign Will in the competent Indian District or High Court.",
        mandatory: true,
        requiresLoa: true,
        actionType: "lawyer",
      };
    }

    // Trigger 4: Bank or Financial Institution Demanding Probate
    if (q4_bank === true) {
      return {
        status: "institutional_demand",
        level: "Institutional Requirement",
        color: "amber",
        badge: "Institution Demands Clearance",
        title: "Probate or Legal Heir Indemnity Clearance Required",
        description:
          "While probate is not mandated by statute outside Mumbai, Chennai, and Kolkata, financial institutions demand it for statutory immunity under Section 216. Our advocates can petition the court or negotiate release via comprehensive Indemnity Bonds and legal heir NOCs.",
        mandatory: false,
        requiresLoa: q5_executor === false,
        actionType: "lawyer",
      };
    }

    // Trigger 5: No Executor Named (in non-presidency jurisdictions)
    if (q5_executor === false) {
      return {
        status: "loa_unnamed_executor",
        level: "Letters of Administration Needed If Court Approached",
        color: "amber",
        badge: "Section 232 Applicable",
        title: "Letters of Administration Required Instead of Probate",
        description:
          "Under Section 222, probate is granted only to a named executor. If you need court certification outside presidency towns, your petition must be for Letters of Administration with Will Annexed under Section 232, filed by the primary beneficiary.",
        mandatory: false,
        requiresLoa: true,
        actionType: "lawyer",
      };
    }

    // Default: Low Risk / Probate Not Required
    return {
      status: "low_risk",
      level: "Probate Not Legally Required",
      color: "emerald",
      badge: "Zero Court Mandate",
      title: "Probate is Not Compulsory Under Indian Succession Law",
      description:
        "Your estate is located outside Mumbai, Chennai, and Kolkata, the Will is uncontested, domestic, and has a named executor. Under Supreme Court precedent (Kanta Yadav, 2020), Section 213 does not apply. You can transfer property and bank assets directly using legal heirship documents and an Indemnity Bond.",
      mandatory: false,
      requiresLoa: false,
      actionType: "start",
    };
  };

  const result = evaluateDiagnostic();

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
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INTERACTIVE LEGAL DIAGNOSTIC TOOL</span>
          </div>

          {/* H1 Title: Single H1 on page, 30-65 chars, distinct from title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Online Probate Checker: Is Probate Required in India?
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Answer 5 quick statutory questions to determine if your Will requires High Court
            probate under Section 57 and Section 213 of the Indian Succession Act, 1925. Discover
            jurisdiction rules for Mumbai, Chennai, and Kolkata, manage bank deadlocks, and download
            your legal diagnostic summary.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-diagnostic-tool"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <span>Run Probate Diagnostic</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft a Valid Will</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Full-Width)
          ========================================================================= */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">10+ Years</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                HIGH COURT LITIGATION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">15,000+</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ESTATES ASSESSED
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹500Cr+</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ASSETS PROTECTED
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">4.9 / 5.0</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CLIENT SATISFACTION
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content Area)
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
                Governed under Sections 57, 211, 213, 222, 228, 232 & 276 of the Indian Succession
                Act, 1925, and Supreme Court judgments in Clarence Pais (2001) and Kanta Yadav
                (2020).
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
                <span>EXECUTIVE BRIEF: INDIAN PROBATE ESSENTIALS</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Presidency Towns Mandate:</strong> Probate is legally compulsory ONLY
                    for Hindu, Sikh, Jain, and Buddhist Wills made in Mumbai, Chennai, and Kolkata,
                    or concerning immovable property situated within those 3 cities (Section 57 &
                    213).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Non-Presidency Exemption:</strong> Outside Mumbai, Chennai, and Kolkata
                    (e.g., Delhi NCR, Bengaluru, Pune, Hyderabad, UP), probate is NOT legally
                    mandatory. An unprobated Will is fully valid under Supreme Court precedent.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>The Named Executor Rule:</strong> Under Section 222, probate can be
                    granted ONLY to an executor explicitly named in the Will. If no executor is
                    named, the court issues Letters of Administration with Will Annexed under
                    Section 232.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Foreign Wills & NRIs:</strong> Overseas Wills probated abroad cannot be
                    used directly in India. Beneficiaries must obtain ancillary Letters of
                    Administration under Section 228 from an Indian court.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FRAMEWORK */}
            <section id="statutory-framework" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Statutory Framework: Definition & Evidentiary Value
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In Indian estate law, probate is the formal certificate issued by a court of
                  competent jurisdiction confirming that a Will was genuinely executed by a
                  testator of sound mind. Under Section 2(f) of the Indian Succession Act, 1925,
                  probate is defined as &ldquo;the copy of a Will certified under the seal of a
                  court of competent jurisdiction with a grant of administration to the estate of the
                  testator.&rdquo;
                </p>
                <p>
                  A probate order has extraordinary legal weight because it operates as a{" "}
                  <strong>judgment in rem</strong> under Section 41 of the Indian Evidence Act,
                  1872. Unlike normal civil court decrees that bind only the parties to a suit
                  (judgment in personam), a probate decree establishes the validity of the Will
                  against the whole world. Once probate is granted, no disgruntled legal heir can
                  file a separate civil suit alleging forgery or coercion.
                </p>
                <p>
                  Under Section 211 of the Indian Succession Act, the executor named in the Will
                  becomes the legal representative of the deceased for all purposes. Furthermore,
                  Section 216 provides statutory indemnity to any bank, tenant, or debtor who pays
                  money to an executor holding a court probate.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE DIAGNOSTIC TOOL */}
            <section
              id="interactive-diagnostic-tool"
              className="scroll-target scroll-mt-28 space-y-6"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>5-STEP PROBATE CHECKER</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Diagnostic Tool: Check Probate Requirement
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select Yes or No for the 5 statutory criteria below. The diagnostic engine applies
                Sections 57, 213, 222, and 228 of the Indian Succession Act to determine if your
                estate requires court probate.
              </p>

              {/* Progress Bar & Counter */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center font-extrabold text-[#C65378] text-sm shrink-0">
                    {answeredCount}/5
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Diagnostic Progress: {answeredCount} of 5 Questions Answered
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {isComplete ? "All questions answered. View result below." : "Please answer remaining questions."}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Report</span>
                  </button>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {QUESTIONS.map((q) => {
                  const currentAnswer = answers[q.id];
                  const isExpanded = expandedRationale[q.id];

                  return (
                    <div
                      key={q.id}
                      className={`bg-white rounded-2xl border transition-all shadow-xs p-5 sm:p-6 ${
                        currentAnswer !== null
                          ? "border-[#172228]/20 bg-white"
                          : "border-slate-200/90 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-1.5 min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-800 font-extrabold text-xs">
                              {q.number}
                            </span>
                            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug">
                              {q.question}
                            </h3>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600 pl-8 leading-relaxed">
                            {q.subtitle}
                          </p>
                        </div>

                        {/* Yes / No Toggle Buttons */}
                        <div className="flex items-center gap-2 pl-8 sm:pl-0 shrink-0">
                          <button
                            onClick={() => handleAnswer(q.id, true)}
                            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                              currentAnswer === true
                                ? "bg-rose-600 text-white shadow-sm ring-2 ring-rose-600/20"
                                : "bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-700"
                            }`}
                          >
                            <Check className="w-4 h-4" />
                            <span>YES</span>
                          </button>
                          <button
                            onClick={() => handleAnswer(q.id, false)}
                            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                              currentAnswer === false
                                ? "bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-600/20"
                                : "bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                            }`}
                          >
                            <X className="w-4 h-4" />
                            <span>NO</span>
                          </button>
                        </div>
                      </div>

                      {/* Expandable Statutory Rationale */}
                      <div className="mt-4 pt-3 border-t border-slate-100 pl-8">
                        <button
                          onClick={() => toggleRationale(q.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#49585F] hover:text-[#172228] transition-colors"
                        >
                          <Info className="w-3.5 h-3.5 text-[#C65378]" />
                          <span>Why this question matters legally</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isExpanded && (
                          <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-1">
                            <p className="leading-relaxed">{q.rationale}</p>
                            <div className="font-semibold text-slate-900 text-[11px]">
                              Statutory Section: {q.statute}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* REAL-TIME DIAGNOSTIC ASSESSMENT CARD */}
              <div
                className={`rounded-2xl border p-6 sm:p-8 transition-all shadow-md ${
                  result.color === "rose"
                    ? "bg-rose-50/60 border-rose-200 text-rose-950"
                    : result.color === "amber"
                    ? "bg-amber-50/60 border-amber-200 text-amber-950"
                    : result.color === "emerald"
                    ? "bg-emerald-50/60 border-emerald-200 text-emerald-950"
                    : "bg-white border-slate-200 text-slate-900"
                }`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-current/10">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/80 border border-current/20 shadow-2xs">
                      <Scale className="w-3.5 h-3.5" />
                      <span>{result.badge}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                      {result.title}
                    </h3>
                  </div>

                  <div className="text-left md:text-right">
                    <div className="text-xs uppercase font-bold opacity-75">Probate Status</div>
                    <div className="text-base sm:text-lg font-black">{result.level}</div>
                  </div>
                </div>

                <div className="py-5 text-sm sm:text-base leading-relaxed space-y-3">
                  <p>{result.description}</p>

                  {/* Specific Action Guidance */}
                  {result.actionType === "lawyer" && (
                    <div className="p-4 rounded-xl bg-white/90 border border-current/15 text-xs sm:text-sm space-y-2">
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <Gavel className="w-4 h-4 text-[#C65378]" />
                        <span>Recommended Legal Course of Action:</span>
                      </div>
                      <p className="text-slate-700">
                        {result.requiresLoa
                          ? "You must file a formal petition for Letters of Administration with Will Annexed in the competent High Court or District Court under Section 232 / 228."
                          : "You must file a Probate Petition under Section 276 in the High Court of Bombay, Madras, Calcutta, or the relevant District Court, accompanied by attesting witness affidavits."}
                      </p>
                    </div>
                  )}

                  {result.actionType === "start" && (
                    <div className="p-4 rounded-xl bg-white/90 border border-emerald-200 text-xs sm:text-sm space-y-2">
                      <div className="font-bold text-emerald-950 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Recommended Legal Course of Action:</span>
                      </div>
                      <p className="text-slate-700">
                        Probate is completely optional for your estate. You do not need expensive court
                        litigation. Ensure your Will has Section 63 compliant attestation, medical fitness
                        certification, and registered nominations to enable direct property transfer.
                      </p>
                    </div>
                  )}
                </div>

                {/* Outcome CTA Buttons */}
                <div className="pt-4 border-t border-current/10 flex flex-col sm:flex-row items-center gap-3">
                  {result.actionType === "lawyer" ? (
                    <>
                      <Link
                        href="/service/probate-lawyer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm transition-transform hover:-translate-y-0.5"
                      >
                        <UserCheck className="w-4 h-4 text-rose-300" />
                        <span>Consult Senior Probate Advocates</span>
                      </Link>
                      <button
                        onClick={handleStartDraft}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-sm"
                      >
                        <span>Draft Challenge-Proof Will</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleStartDraft}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm shadow-md transition-transform hover:-translate-y-0.5"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Draft Your Valid Will in 15 Mins</span>
                      </button>
                      <Link
                        href="/blogs/probate-of-will-in-india-2025-amendment-mumbai-chennai-kolkata"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-sm"
                      >
                        <span>Read 2025 Probate Reform Guide</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* SECTION 3: PRESIDENTIAL TOWNS RULE */}
            <section id="presidential-towns-rule" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>GEOGRAPHIC JURISDICTION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Presidential Towns Rule: Section 57 & 213 Jurisdictions
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A common point of confusion among Indian families is why probate is required in
                  Mumbai or Kolkata but completely optional in Delhi or Bengaluru. The answer lies
                  in the colonial statutory architecture preserved in Section 57 and Section 213 of
                  the Indian Succession Act, 1925.
                </p>
                <p>
                  Section 213(1) establishes the general principle that no executor or legatee can
                  establish any right in court under a Will without obtaining probate. However,
                  Section 213(2) creates a massive statutory carve-out for Hindus, Buddhists, Sikhs,
                  and Jains. Under Section 213(2), this requirement applies ONLY to Wills specified
                  in Section 57, clauses (a) and (b):
                </p>
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-rose-50 text-[#C65378] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      A
                    </span>
                    <div className="text-xs sm:text-sm text-slate-700">
                      <strong>Section 57(a) — Territorial Execution:</strong> Wills made within the
                      local limits of the ordinary original civil jurisdiction of the High Courts of
                      Judicature at Fort William (Kolkata), Madras (Chennai), and Bombay (Mumbai).
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-rose-50 text-[#C65378] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      B
                    </span>
                    <div className="text-xs sm:text-sm text-slate-700">
                      <strong>Section 57(b) — Property Situate Rule:</strong> Wills made outside
                      those territories, but relating to immovable property situated within the
                      ordinary original civil jurisdiction of Mumbai, Chennai, or Kolkata.
                    </div>
                  </div>
                </div>
                <p>
                  In the landmark judgment <strong>Clarence Pais v. Union of India (2001) 4 SCC 325</strong>,
                  the Supreme Court affirmed that Section 213 does not apply to Wills executed outside
                  these three historic presidential cities unless the Will affects immovable property
                  located inside them.
                </p>
                <p>
                  This position was reaffirmed in <strong>Kanta Yadav v. Om Prakash Yadav (2020) 14 SCC 102</strong>,
                  where the Supreme Court held that in Delhi, Haryana, and Punjab, probate of a Hindu
                  Will is not mandatory, and beneficiaries can establish rights directly in court
                  without prior probate certification.
                </p>
              </div>
            </section>

            {/* SECTION 4: DIAGNOSTIC 5-POINT TRIGGER MATRIX */}
            <section id="diagnostic-matrix" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>STATUTORY EVALUATION MATRIX</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Diagnostic Matrix: Legal Triggers & Practical Impact
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Review the 5 primary factors that govern whether a Will must go to court in India.
              </p>

              {/* Data Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[620px]">
                    <thead>
                      <tr className="bg-slate-900 text-white border-b border-slate-800">
                        <th className="py-3 px-4 font-bold">Diagnostic Trigger</th>
                        <th className="py-3 px-4 font-bold">Condition Tested</th>
                        <th className="py-3 px-4 font-bold">Statutory Section</th>
                        <th className="py-3 px-4 font-bold">Legal Consequence</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          1. Contested Will
                        </td>
                        <td className="py-3 px-4">Caveat filed or heirs dispute validity</td>
                        <td className="py-3 px-4 font-mono text-[11px]">Sec 276 & 284 ISA</td>
                        <td className="py-3 px-4 text-rose-600 font-semibold">
                          Probate judgment in rem required
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          2. Foreign Will / NRI
                        </td>
                        <td className="py-3 px-4">Executed abroad with Indian property</td>
                        <td className="py-3 px-4 font-mono text-[11px]">Sec 228 ISA</td>
                        <td className="py-3 px-4 text-rose-600 font-semibold">
                          Ancillary Letters of Admin required
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          3. Property in Mumbai / Chennai / Kolkata
                        </td>
                        <td className="py-3 px-4">Immovable property in presidency towns</td>
                        <td className="py-3 px-4 font-mono text-[11px]">Sec 57 & 213 ISA</td>
                        <td className="py-3 px-4 text-rose-600 font-semibold">
                          Statutorily mandatory for Hindus
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          4. Institutional Demands
                        </td>
                        <td className="py-3 px-4">Bank or housing society freezes asset</td>
                        <td className="py-3 px-4 font-mono text-[11px]">Sec 216 ISA</td>
                        <td className="py-3 px-4 text-amber-600 font-semibold">
                          Probate or Legal Heir Indemnity Bond
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          5. Unnamed Executor
                        </td>
                        <td className="py-3 px-4">No executor appointed or executor died</td>
                        <td className="py-3 px-4 font-mono text-[11px]">Sec 222 & 232 ISA</td>
                        <td className="py-3 px-4 text-amber-600 font-semibold">
                          Letters of Admin with Will Annexed
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 5: STATE-BY-STATE PROBATE GUIDE */}
            <section id="state-by-state-guide" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <MapPin className="w-4 h-4" />
                <span>STATEWISE LEGAL GUIDE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. State-by-State Guide: Where Probate is Mandatory in India
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Court probate rules vary dramatically across Indian states. The table below details
                  the practical and statutory requirements enforced by High Courts and revenue
                  authorities across India:
                </p>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[620px]">
                      <thead>
                        <tr className="bg-slate-900 text-white border-b border-slate-800">
                          <th className="py-3 px-4 font-bold">State / Union Territory</th>
                          <th className="py-3 px-4 font-bold">Probate Status</th>
                          <th className="py-3 px-4 font-bold">Governing Precedent / Rule</th>
                          <th className="py-3 px-4 font-bold">Practical Advice</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 font-bold text-slate-900">
                            Mumbai (Maharashtra)
                          </td>
                          <td className="py-3 px-4 text-rose-600 font-bold">Mandatory</td>
                          <td className="py-3 px-4">Sec 57(a)/(b) & Bombay HC Rules</td>
                          <td className="py-3 px-4">
                            Co-op housing societies and SRO insist on Bombay HC probate. Capped at
                            ₹75k court fee.
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 font-bold text-slate-900">
                            Rest of Maharashtra (Pune, Nagpur)
                          </td>
                          <td className="py-3 px-4 text-emerald-600 font-bold">Not Mandatory</td>
                          <td className="py-3 px-4">Outside Bombay HC original jurisdiction</td>
                          <td className="py-3 px-4">
                            Direct mutation permitted with death cert, Will copy, and heir
                            affidavits.
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 font-bold text-slate-900">
                            Kolkata (West Bengal)
                          </td>
                          <td className="py-3 px-4 text-rose-600 font-bold">Mandatory</td>
                          <td className="py-3 px-4">Fort William original jurisdiction</td>
                          <td className="py-3 px-4">
                            Calcutta High Court or City Civil Court probate required for Kolkata
                            properties.
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 font-bold text-slate-900">
                            Chennai (Tamil Nadu)
                          </td>
                          <td className="py-3 px-4 text-rose-600 font-bold">Mandatory</td>
                          <td className="py-3 px-4">Madras High Court original jurisdiction</td>
                          <td className="py-3 px-4">
                            Madras High Court probate required for property within Chennai city
                            limits.
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 font-bold text-slate-900">
                            Delhi NCR
                          </td>
                          <td className="py-3 px-4 text-emerald-600 font-bold">Not Mandatory</td>
                          <td className="py-3 px-4">Kanta Yadav v. Om Prakash Yadav (SC 2020)</td>
                          <td className="py-3 px-4">
                            DDA, MCD, and banks process transfer via registered Will, NOC, and
                            indemnity bond.
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 font-bold text-slate-900">
                            Karnataka (Bengaluru)
                          </td>
                          <td className="py-3 px-4 text-emerald-600 font-bold">Not Mandatory</td>
                          <td className="py-3 px-4">Karnataka HC rulings on Sec 213</td>
                          <td className="py-3 px-4">
                            BBMP khata transfer requires registered Will, family tree affidavit,
                            and death cert.
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 font-bold text-slate-900">
                            Telangana & Andhra Pradesh
                          </td>
                          <td className="py-3 px-4 text-emerald-600 font-bold">Not Mandatory</td>
                          <td className="py-3 px-4">Hyderabad HC precedents</td>
                          <td className="py-3 px-4">
                            GHMC and registration departments accept unprobated Wills with legal
                            heir consent.
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 font-bold text-slate-900">
                            Punjab & Haryana
                          </td>
                          <td className="py-3 px-4 text-emerald-600 font-bold">Not Mandatory</td>
                          <td className="py-3 px-4">Behari Lal Ram Charan (AIR 1968 P&H 108)</td>
                          <td className="py-3 px-4">
                            Section 213 has no application in Punjab or Haryana. Unprobated Will is
                            binding.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: VISUAL BLUEPRINT */}
            <section id="visual-blueprint" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>VISUAL BLUEPRINT</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Visual Blueprint: Indian Probate Assessment Architecture
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                An authoritative roadmap illustrating how the 5 statutory criteria direct an estate
                toward mandatory probate, Letters of Administration, or seamless direct transfer.
              </p>

              {/* Infographic Image Card */}
              <div className="-mx-4 sm:-mx-6 md:mx-0 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] md:w-full bg-white rounded-none md:rounded-2xl border-y md:border border-slate-200 overflow-hidden shadow-xs">
                <div className="w-full">
                  <Image
                    src="/images/probate-checker-og.jpg"
                    alt="Is Probate Required in India Diagnostic Framework and Checker Tool"
                    width={1920}
                    height={1080}
                    className="w-full h-auto block"
                    priority
                  />
                </div>
                <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600 border-t border-slate-200">
                  <span className="font-medium text-slate-700">
                    Figure 1.1: 5-Step Statutory Decision Matrix for Indian Probate under ISA 1925
                  </span>
                  <Link
                    href="/images/probate-checker-og.jpg"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-[#C65378] font-bold hover:underline shrink-0"
                  >
                    <span>View High-Resolution</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 7: STEP-BY-STEP HIGH COURT SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>COURT PROCEDURE PROTOCOL</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Step-by-Step SOP: High Court Probate Petition Protocol
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                When probate is required, the named executor must follow a strict statutory
                procedure under the Indian Succession Act, 1925, and relevant High Court Original
                Side Rules.
              </p>

              {/* 6 Stage Cards Stack */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base">
                      Stage 1: Petition Drafting & Jurisdiction Check (Section 270)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Verify that the deceased had a fixed place of abode or left immovable property
                      within the court jurisdiction. The named executor prepares the formal probate
                      petition along with Schedule of Assets (movable and immovable) and list of all
                      Class I legal heirs.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base">
                      Stage 2: Verification of Original Will & Filing (Section 276 & 280)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      The original Will is deposited in the court registry. The petition is verified
                      by the executor, declaring that the Will is the testator&rsquo;s last testament
                      and that it was executed with full mental competence.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base">
                      Stage 3: Attesting Witness Affidavit (Section 281 ISA & Section 68 Evidence Act)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      At least one attesting witness must submit a sworn affidavit under Section 281,
                      confirming that they personally saw the testator sign the Will and signed in
                      the testator&rsquo;s physical presence. This step is statutorily mandatory.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base">
                      Stage 4: Citations & Newspaper Publication (Section 283)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      The court issues formal citations to all surviving legal heirs. Additionally, a
                      public notice is published in two prominent daily newspapers (one English, one
                      regional language) inviting any objections within 30 to 45 days.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                    5
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base">
                      Stage 5: Asset Valuation & Ad Valorem Court Fee Payment
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      The court refers property details to the Collector / Superintendent of Stamps
                      to verify property valuation. The executor deposits the applicable ad valorem
                      court fee (capped at ₹75,000 in Maharashtra).
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                    6
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base">
                      Stage 6: Court Examination & Final Grant of Probate (Section 289)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      If no caveat is lodged within the notice window, the Judge grants the formal
                      decree under Section 289. The certified copy of the Will with the official
                      High Court seal is handed to the executor.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: PROBATE VS LOA VS SUCCESSION */}
            <section
              id="legal-instruments-compared"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>COMPARATIVE JURISPRUDENCE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Legal Instruments Compared: Probate vs LOA vs Succession
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Indian law provides three distinct court instruments to administer or clear title
                  to an estate. Choosing the wrong document leads to dismissals and wasted court fees:
                </p>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[620px]">
                      <thead>
                        <tr className="bg-slate-900 text-white border-b border-slate-800">
                          <th className="py-3 px-4 font-bold">Instrument</th>
                          <th className="py-3 px-4 font-bold">Governing Sections</th>
                          <th className="py-3 px-4 font-bold">Will Exists?</th>
                          <th className="py-3 px-4 font-bold">Eligible Petitioner</th>
                          <th className="py-3 px-4 font-bold">Scope of Assets</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 font-bold text-slate-900">Probate</td>
                          <td className="py-3 px-4 font-mono text-[11px]">Sec 222 & 276 ISA</td>
                          <td className="py-3 px-4 text-emerald-600 font-bold">Yes (Mandatory)</td>
                          <td className="py-3 px-4">Named Executor ONLY</td>
                          <td className="py-3 px-4">All Movable & Immovable assets</td>
                        </tr>
                        <tr className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 font-bold text-slate-900">
                            Letters of Administration (With Will)
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px]">Sec 232 & 234 ISA</td>
                          <td className="py-3 px-4 text-emerald-600 font-bold">Yes</td>
                          <td className="py-3 px-4">Beneficiary / Universal Legatee</td>
                          <td className="py-3 px-4">All Movable & Immovable assets</td>
                        </tr>
                        <tr className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 font-bold text-slate-900">
                            Letters of Administration (Without Will)
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px]">Sec 218 ISA</td>
                          <td className="py-3 px-4 text-rose-600 font-bold">No (Intestate)</td>
                          <td className="py-3 px-4">Class I Legal Heirs</td>
                          <td className="py-3 px-4">All Movable & Immovable assets</td>
                        </tr>
                        <tr className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 font-bold text-slate-900">
                            Succession Certificate
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px]">Sec 370–390 ISA</td>
                          <td className="py-3 px-4 text-amber-600 font-bold">Either</td>
                          <td className="py-3 px-4">Legal Heirs or Beneficiaries</td>
                          <td className="py-3 px-4 text-rose-600 font-semibold">
                            Debts & Securities ONLY (No Real Estate)
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: COURT FEES & TIMELINES */}
            <section
              id="court-fees-and-timelines"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <DollarSign className="w-4 h-4" />
                <span>EXPENSES & TIMEFRAMES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Court Fees & Realistic Timelines: State-Wise Breakdown
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Court fees for probate petitions are calculated on an ad valorem percentage based
                  on state Court Fees Acts. Here is the realistic cost and timeline breakdown across
                  major High Courts:
                </p>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[620px]">
                      <thead>
                        <tr className="bg-slate-900 text-white border-b border-slate-800">
                          <th className="py-3 px-4 font-bold">Jurisdiction / Forum</th>
                          <th className="py-3 px-4 font-bold">Ad Valorem Court Fee</th>
                          <th className="py-3 px-4 font-bold">Statutory Maximum Cap</th>
                          <th className="py-3 px-4 font-bold">Average Uncontested Duration</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 font-bold text-slate-900">
                            Bombay High Court (Original Side)
                          </td>
                          <td className="py-3 px-4">2% to 7.5% in progressive slabs</td>
                          <td className="py-3 px-4 text-emerald-600 font-bold">
                            Capped at ₹75,000 maximum
                          </td>
                          <td className="py-3 px-4">6 to 10 Months</td>
                        </tr>
                        <tr className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 font-bold text-slate-900">
                            Calcutta High Court (Original Side)
                          </td>
                          <td className="py-3 px-4">Approx 5.5% on higher asset brackets</td>
                          <td className="py-3 px-4 text-rose-600 font-semibold">
                            No ceiling cap (Variable)
                          </td>
                          <td className="py-3 px-4">9 to 15 Months</td>
                        </tr>
                        <tr className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 font-bold text-slate-900">
                            Madras High Court / City Civil Court
                          </td>
                          <td className="py-3 px-4">Approx 3% under TN Court Fees Act</td>
                          <td className="py-3 px-4 text-rose-600 font-semibold">
                            Subject to valuation schedule
                          </td>
                          <td className="py-3 px-4">6 to 12 Months</td>
                        </tr>
                        <tr className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 font-bold text-slate-900">
                            Delhi High Court / District Courts
                          </td>
                          <td className="py-3 px-4">Approx 4% ad valorem</td>
                          <td className="py-3 px-4 text-slate-700">Graduated schedule</td>
                          <td className="py-3 px-4">8 to 14 Months</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: AVOIDING PROBATE FRICTION */}
            <section
              id="defensive-estate-planning"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>DEFENSIVE DRAFTING</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Defensive Estate Planning: Avoiding Court Friction
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                If your property is outside Mumbai, Chennai, and Kolkata, you can completely avoid
                expensive court probate by following 4 defensive estate drafting rules:
              </p>

              {/* 2x2 Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                    <UserCheck className="w-5 h-5 text-blue-600" />
                    <span>Independent Younger Witnesses</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under Section 63, use two witnesses who are younger than you and receive zero
                    bequests under the Will. This avoids the Section 67 beneficiary witness
                    forfeiture trap and ensures they can depose in court if ever questioned.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                    <FileCheck className="w-5 h-5 text-indigo-600" />
                    <span>Doctor Mental Fitness Certificate</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under Section 59, having a registered medical practitioner certify sound mental
                    disposing capacity on the date of execution destroys allegations of cognitive
                    decline, dementia, or undue influence by disgruntled relatives.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                    <Landmark className="w-5 h-5 text-purple-600" />
                    <span>Synchronize Account Nominations</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    As held by the Supreme Court in Sarbati Devi and Shakti Yezdani, nominees are
                    merely trustees. Align your bank FD and demat nominations to match your Will
                    beneficiaries so institutions release funds without court friction.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                    <Award className="w-5 h-5 text-emerald-600" />
                    <span>Optional SRO Registration</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    While optional under Section 18 of the Registration Act, registering your Will
                    at the Sub-Registrar Office creates a public record under Section 114 of the
                    Indian Evidence Act, making allegations of post-death forgery nearly impossible.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: FOUR SPECIALIZED SCENARIOS */}
            <section
              id="specialized-scenarios"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>COMPLEX TESTAMENTARY CASES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Specialized Scenarios: Foreign Wills, NRI Assets & CHS
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Certain estate scenarios involve unique legal hurdles that demand specialized
                statutory compliance:
              </p>

              {/* 2x2 Scenario Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                    <ExternalLink className="w-5 h-5 text-rose-600" />
                    <span>NRI Foreign Wills (Section 228)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    If an NRI executes a Will in the US, UK, or UAE covering Indian property,
                    foreign probate decrees cannot directly transfer Indian real estate. Under
                    Section 228 of the Indian Succession Act, an ancillary petition for Letters of
                    Administration with an authenticated copy of the Will must be filed in India.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>Caveats & Contested Petitions (Sec 284)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    When an excluded child or relative files a caveat in court, the probate
                    petition is automatically converted into a regular civil testamentary suit. The
                    propounder of the Will must examine attesting witnesses and prove testamentary
                    capacity under stringent scrutiny.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                    <UserCheck className="w-5 h-5 text-blue-600" />
                    <span>Predeceased or Refusing Executor (Sec 232)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    If the named executor dies before the testator, or formally renounces
                    executorship under Section 230, the beneficiaries cannot obtain probate. They
                    must petition the court for Letters of Administration with Will Annexed under
                    Section 232 to distribute the estate.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                    <Building className="w-5 h-5 text-emerald-600" />
                    <span>Mumbai Cooperative Housing Societies (CHS)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under Bye-Law 35 of the Maharashtra Cooperative Societies Bye-Laws, housing
                    societies in Mumbai require Bombay High Court probate or a court succession
                    order before transferring share certificates and membership to a legatee,
                    despite nominee provisions.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section
              id="institutional-profile"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE & PRACTICE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Institutional Profile: Legal Excellence & Trust Signals
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Legal Editorial & Advocacy Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Advocates</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is India&rsquo;s premier estate planning and succession technology
                  platform, powered by AMA Legal Solutions. Our senior testamentary bench possesses
                  over a decade of trial and appellate experience across the Supreme Court of India,
                  Delhi High Court, Bombay High Court, Calcutta High Court, and District Courts
                  nationwide. We have structured over 15,000 challenge-proof Wills and successfully
                  navigated hundreds of complex probate petitions and Letters of Administration.
                </p>

                {/* Service Grid Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/service/probate-lawyer"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Probate Petitions</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/service/nri-will-india"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>NRI Two-Will Strategy</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/succession-calculator"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Succession Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQ ACCORDION */}
            <section
              id="frequently-asked-questions"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>DIRECT ANSWERS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Frequently Asked Questions: Probate of Will in India
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Plain-English answers to the most common legal questions about court probate,
                jurisdiction rules, timelines, and costs in India:
              </p>

              {/* Accordion Stack */}
              <div className="space-y-3 pt-2">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-colors hover:border-slate-300"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                        className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-extrabold text-slate-900 text-sm sm:text-base"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C65378] shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 14: CITATIONS & OUTBOUND / INTERNAL BADGES */}
            <section
              id="statutory-citations"
              className="scroll-target scroll-mt-28 space-y-4 pt-6 border-t border-slate-200"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>AUTHORITY & CITATIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Statutory Citations: Acts, Rules & Authoritative Portals
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>This diagnostic tool is calibrated under the following statutory provisions:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                  <li>Indian Succession Act, 1925 (Sections 2(f), 57, 211, 213, 216, 222, 228, 232, 276, 281 & 289)</li>
                  <li>Indian Evidence Act, 1872 (Section 41 & Section 68)</li>
                  <li>Registration Act, 1908 (Section 18(e) optional registration of Wills)</li>
                  <li>Supreme Court of India: Clarence Pais & Ors v. Union of India (2001) 4 SCC 325</li>
                  <li>Supreme Court of India: Kanta Yadav v. Om Prakash Yadav (2020) 14 SCC 102</li>
                  <li>Bombay High Court Original Side Rules & Maharashtra Court Fees Act, 1959</li>
                </ul>

                <div className="pt-4 space-y-2">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Verified Government Portals
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://bombayhighcourt.nic.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors font-semibold"
                    >
                      <span>Bombay High Court</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href="https://calcuttahighcourt.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors font-semibold"
                    >
                      <span>Calcutta High Court</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href="https://hcmadras.tn.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors font-semibold"
                    >
                      <span>Madras High Court</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href="https://delhihighcourt.nic.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors font-semibold"
                    >
                      <span>Delhi High Court</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href="https://www.indiacode.nic.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors font-semibold"
                    >
                      <span>India Code (ISA 1925)</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="pt-3 space-y-2">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Related Internal Succession Guides & Tools
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/service/probate-lawyer"
                      className="text-[11px] px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 transition-colors font-bold"
                    >
                      Probate Legal Services & Petition Filing
                    </Link>
                    <Link
                      href="/blogs/probate-of-will-in-india-2025-amendment-mumbai-chennai-kolkata"
                      className="text-[11px] px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 transition-colors font-bold"
                    >
                      2025 Probate Legal Reform Guide
                    </Link>
                    <Link
                      href="/tools/succession-calculator"
                      className="text-[11px] px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 transition-colors font-bold"
                    >
                      Indian Legal Heir Succession Calculator
                    </Link>
                    <Link
                      href="/service/nri-will-india"
                      className="text-[11px] px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 transition-colors font-bold"
                    >
                      NRI Two-Will Strategy Guide
                    </Link>
                    <Link
                      href="/templates/codicil-format-india"
                      className="text-[11px] px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 transition-colors font-bold"
                    >
                      Codicil Format to Amend a Will
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
                <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] font-black text-base flex items-center justify-center shrink-0">
                  AM
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">Adv. A. M. Jaiswal</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Succession Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialist in Indian testamentary jurisprudence, high-value High Court probate
                litigation, Section 228 foreign Will ancillary grants, and cross-border NRI estate
                planning.
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
            <div className="hidden lg:block space-y-6 desktop-sidebar-only">
{/* CARD 2: EMERGENCY CTA CARD (Brand Navy) */}
            <div className="hidden lg:block rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                <Lock className="w-3 h-3 text-[#C65378]" />
                <span>CONFIDENTIAL LEGAL CONSULTATION</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                Facing Bank Deadlock or Probate Demand?
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Our senior High Court probate advocates handle petition filings, heir citations,
                witness depositions, and asset release negotiation nationwide.
              </p>
              <Link
                href="/service/probate-lawyer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
              >
                <span>Speak With Probate Advocate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <div className="pt-2 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-rose-300" />
                <span>Urgent Inquiries: Contact Legal Desk</span>
              </div>
            </div>

            {/* CARD 3: TRUST / BENEFITS CHECKLIST */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                Why Estates Trust WillDrafting
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Statutory Precision:</strong> Calibrated strictly to Sections 57 & 213.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Pan-India Bar Licensed:</strong> High Court enrolled testamentary bench.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Hidden Court Costs:</strong> Transparent petition filing fee structures.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>100% Client Privilege:</strong> Secure attorney-client confidentiality.
                  </span>
                </li>
              </ul>
            </div>

            {/* CARD 4: RELATED TOOLS & GUIDES */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                Related Succession Tools
              </div>
              <div className="space-y-2">
                <Link
                  href="/tools/succession-calculator"
                  className="block p-3 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/50 transition-colors"
                >
                  <div className="font-bold text-slate-900 text-xs">Succession Calculator</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 flex items-center justify-between">
                    <span>Calculate exact legal heir shares</span>
                    <ArrowRight className="w-3 h-3 text-[#C65378]" />
                  </div>
                </Link>

                <Link
                  href="/service/nri-will-india"
                  className="block p-3 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/50 transition-colors"
                >
                  <div className="font-bold text-slate-900 text-xs">NRI Two-Will Strategy</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 flex items-center justify-between">
                    <span>Avoid foreign probate re-sealing</span>
                    <ArrowRight className="w-3 h-3 text-[#C65378]" />
                  </div>
                </Link>

                <Link
                  href="/templates/codicil-format-india"
                  className="block p-3 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/50 transition-colors"
                >
                  <div className="font-bold text-slate-900 text-xs">Codicil Format India</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 flex items-center justify-between">
                    <span>Amend your Will without a fresh draft</span>
                    <ArrowRight className="w-3 h-3 text-[#C65378]" />
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
                  href="/tools/succession-certificate-court-fee-calculator"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Court Fee Calculator India
                </Link>
                <Link
                  href="/blogs/how-to-challenge-a-will-in-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  How to Challenge a Will
                </Link>
                <Link
                  href="/service/succession-certificate"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Succession Certificate Lawyers
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
