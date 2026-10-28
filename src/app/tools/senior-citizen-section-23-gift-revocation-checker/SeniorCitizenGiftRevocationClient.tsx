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
  Info,
  Gavel,
  Calculator,
  Copy,
  CheckCheck,
  Users,
  FileText,
  HeartHandshake,
  Home,
  AlertCircle,
  AlertOctagon,
  Layers,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Section 23 Statutory Ground" },
  { id: "interactive-checker", label: "2. Interactive Section 23 Checker" },
  { id: "precedents-urmila-vs-sudesh", label: "3. Landmark Precedents: SC Rulings" },
  { id: "four-statutory-conditions", label: "4. The 4 Statutory Conditions" },
  { id: "why-will-beats-gift-deed", label: "5. Why a Will Beats a Gift Deed" },
  { id: "tribunal-filing-sop", label: "6. Tribunal Filing SOP & Timeline" },
  { id: "third-party-purchasers", label: "7. Third Party Sales & Section 23(2)" },
  { id: "section-24-criminal-penalties", label: "8. Section 24 Penalties & Eviction" },
  { id: "practical-case-scenarios", label: "9. Practical Case Studies in India" },
  { id: "protective-clauses-templates", label: "10. Protective Clauses & Checklist" },
  { id: "institutional-profile", label: "11. AMA Legal Solutions Counsel" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
  { id: "statutory-citations", label: "13. Statutory Citations & Resources" },
];

const FAQS = [
  {
    q: "Can parents cancel a registered gift deed given to their child in India?",
    a: "Yes. Under Section 23(1) of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007, an elderly parent who transferred property by gift deed can petition the Maintenance Tribunal to declare the transfer void. If the child fails or refuses to provide basic amenities and physical needs, the law treats the transfer as tainted by fraud, coercion, or undue influence.",
  },
  {
    q: "What are the 4 mandatory conditions required under Section 23(1)?",
    a: "The 4 conditions are: (1) The parent was at least 60 years old when signing the transfer, (2) The deed was executed after the Act commenced (post-December 2007), (3) The transfer was subject to the condition that the child provide basic amenities and physical needs, and (4) The child neglected, refused, or failed to provide such maintenance.",
  },
  {
    q: "What did the Supreme Court hold in Urmila Dixit v. Sunil Sharan Dixit (2025)?",
    a: "In Urmila Dixit (2025 INSC 20), the Supreme Court held that the Senior Citizens Act is beneficial social legislation that requires purposive interpretation. Even if the registered gift deed does not contain a specific maintenance clause, contemporaneous documents like a promissory note (vachan patra), affidavit, or mutual undertaking prove that the transfer was conditional upon care.",
  },
  {
    q: "How does the Sudesh Chhikara ruling affect gift deed cancellation?",
    a: "In Sudesh Chhikara v. Ramti Devi (2022), the Supreme Court ruled that a Maintenance Tribunal cannot void a gift deed arbitrarily if it was executed out of pure affection with no condition of maintenance whatsoever. In such unconditional transfers, parents must establish neglect and seek monthly maintenance under Section 5 or file a regular civil court cancellation suit.",
  },
  {
    q: "Can the Maintenance Tribunal evict an abusive child from the parent's home?",
    a: "Yes. The Supreme Court in S. Vanitha v. DC Bengaluru (2020) and the Bombay High Court in Dattatrey Shivaji Mane confirmed that the Maintenance Tribunal possesses inherent powers to order the eviction of children or relatives to ensure the senior citizen enjoys peaceful possession and dignity in their home.",
  },
  {
    q: "How long does a Section 23 proceeding take before the SDM Tribunal?",
    a: "Under Section 5(6) and Section 6 of the Act, the Maintenance Tribunal is mandated to conclude proceedings within 90 days from the date of service of notice. In urgent cases of physical abandonment or medical emergency, senior citizens can seek ex-parte interim maintenance orders under Section 5(2).",
  },
  {
    q: "What happens if the child has already mortgaged or sold the house to an outsider?",
    a: "Under Section 23(2), if a senior citizen has a right to maintenance out of an estate, that right is enforceable against a third-party purchaser if the purchaser had notice of the right, or if the transfer was gratuitous. However, against a bona fide purchaser for value without notice, recovery through the summary Tribunal is difficult and requires civil court litigation.",
  },
  {
    q: "Why is drafting a Will safer for elderly parents than gifting property during life?",
    a: "A Will takes effect only after death and remains 100% revocable during your entire lifetime. You retain absolute ownership, rental income, and sale rights while alive. You can alter or revoke your Will at any time without asking for your children's permission. A gift deed immediately surrenders title, leaving parents vulnerable.",
  },
];

export default function SeniorCitizenGiftRevocationClient() {
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
  const [copiedRecital, setCopiedRecital] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // ==========================================
  // EVALUATOR INPUT STATE (5 STATUTORY STEPS)
  // ==========================================
  const [transferDateEra, setTransferDateEra] = useState<"after_2007" | "before_2007">("after_2007");
  const [ageAtTransfer, setAgeAtTransfer] = useState<"60_or_above" | "below_60">("60_or_above");
  const [instrumentType, setInstrumentType] = useState<
    "gift_deed" | "settlement_release" | "sale_nominal"
  >("gift_deed");
  const [transfereeRelation, setTransfereeRelation] = useState<
    "child" | "grandchild" | "relative" | "third_party"
  >("child");
  const [maintenanceCondition, setMaintenanceCondition] = useState<
    "express_clause" | "vachan_patra" | "recital_love_affection" | "unconditional"
  >("express_clause");
  const [selectedDefaults, setSelectedDefaults] = useState<string[]>([
    "food_shelter",
    "medical_care",
  ]);
  const [possessionState, setPossessionState] = useState<
    "senior_in_possession" | "ousted_by_child" | "mortgaged_or_sold"
  >("senior_in_possession");

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

  const toggleDefaultItem = (key: string) => {
    setSelectedDefaults((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const handleResetEvaluator = () => {
    setTransferDateEra("after_2007");
    setAgeAtTransfer("60_or_above");
    setInstrumentType("gift_deed");
    setTransfereeRelation("child");
    setMaintenanceCondition("express_clause");
    setSelectedDefaults(["food_shelter", "medical_care"]);
    setPossessionState("senior_in_possession");
  };

  // ==========================================
  // STATUTORY DIAGNOSTIC LOGIC ENGINE
  // ==========================================
  const condition1_SeniorCitizen = ageAtTransfer === "60_or_above";
  const condition2_PostAct = transferDateEra === "after_2007";
  const condition3_MaintenanceObligation =
    maintenanceCondition === "express_clause" ||
    maintenanceCondition === "vachan_patra" ||
    maintenanceCondition === "recital_love_affection";
  const condition4_BreachOccurred = selectedDefaults.length > 0;

  type OutcomeTier = "high" | "moderate" | "challenging" | "ineligible";

  let outcomeTier: OutcomeTier = "high";
  let probabilityPercentage = 92;
  let statusBadgeTitle = "HIGH PROBABILITY: STRONG TRIBUNAL RECOVERY CASE";
  let statusBadgeColor = "bg-emerald-50 text-emerald-800 border-emerald-300";
  let analysisHeadline =
    "Your matter satisfies the core requirements for immediate Section 23 Tribunal relief.";

  if (!condition1_SeniorCitizen || !condition2_PostAct) {
    outcomeTier = "ineligible";
    probabilityPercentage = 10;
    statusBadgeTitle = "INELIGIBLE FOR SECTION 23 MAINTENANCE TRIBUNAL";
    statusBadgeColor = "bg-red-50 text-red-800 border-red-300";
    analysisHeadline =
      "Section 23 does not apply if transfer occurred before 2007 or if parent was under 60.";
  } else if (possessionState === "mortgaged_or_sold") {
    outcomeTier = "challenging";
    probabilityPercentage = 38;
    statusBadgeTitle = "COMPLEX: THIRD-PARTY PURCHASER RIGHTS INVOLVED";
    statusBadgeColor = "bg-amber-50 text-amber-800 border-amber-300";
    analysisHeadline =
      "Under Section 23(2), bona fide third-party purchasers require a civil suit alongside Tribunal notice.";
  } else if (maintenanceCondition === "unconditional") {
    outcomeTier = "challenging";
    probabilityPercentage = 35;
    statusBadgeTitle = "CHALLENGING: SUDESH CHHIKARA THRESHOLD APPLIES";
    statusBadgeColor = "bg-amber-50 text-amber-800 border-amber-300";
    analysisHeadline =
      "Unconditional deeds face strict barriers under Sudesh Chhikara. Dual maintenance and civil suit needed.";
  } else if (maintenanceCondition === "recital_love_affection") {
    outcomeTier = "moderate";
    probabilityPercentage = 72;
    statusBadgeTitle = "MODERATE TO HIGH: MERITORIOUS UNDER URMILA DIXIT";
    statusBadgeColor = "bg-blue-50 text-blue-800 border-blue-300";
    analysisHeadline =
      "Purposive interpretation under Urmila Dixit (2025) supports cancellation with supporting affidavits.";
  } else if (maintenanceCondition === "vachan_patra") {
    outcomeTier = "high";
    probabilityPercentage = 88;
    statusBadgeTitle = "HIGH PROBABILITY: PROTECTED BY URMILA DIXIT (2025)";
    statusBadgeColor = "bg-emerald-50 text-emerald-800 border-emerald-300";
    analysisHeadline =
      "Contemporaneous promissory note or vachan patra creates binding conditional transfer under 2025 Supreme Court law.";
  } else {
    outcomeTier = "high";
    probabilityPercentage = 95;
    statusBadgeTitle = "VERY HIGH PROBABILITY: COMPLETE STATUTORY COMPLIANCE";
    statusBadgeColor = "bg-emerald-50 text-emerald-800 border-emerald-300";
    analysisHeadline =
      "Express clause in registered deed with documented neglect provides textbook grounds for cancellation and eviction.";
  }

  const copyRecitalToClipboard = () => {
    const recitalText = `MANDATORY SECTION 23 PROTECTIVE CLAUSE FOR GIFT DEEDS TO CHILDREN:
"AND WHEREAS this Gift of the Schedule Property is executed by the Donor and accepted by the Donee SUBJECT TO THE EXPRESS STATUTORY CONDITION under Section 23(1) of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007, that the Donee shall provide all basic amenities, physical needs, medical care, nourishment, and peaceful shelter to the Donor throughout the Donor's natural life.

AND WHEREAS it is mutually agreed and understood that in the event the Donee neglects, fails, or refuses to provide such basic amenities, medical expenses, and respectful maintenance to the Donor at any point of time, this Gift Deed shall be deemed to have been made by fraud, coercion, and undue influence, and shall at the sole option and petition of the Donor be declared null, void, and cancelled by the Maintenance Tribunal, with absolute title and vacant possession reverting forthwith to the Donor."`;
    navigator.clipboard.writeText(recitalText);
    setCopiedRecital(true);
    setTimeout(() => setCopiedRecital(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `SECTION 23 MAINTENANCE TRIBUNAL PETITION DOCKET CHECKLIST:
1. Formal Application under Section 23(1) & Section 5 before the Sub-Divisional Magistrate (SDM) / Maintenance Tribunal.
2. Certified Copy of the Registered Gift Deed / Settlement Deed from the Sub-Registrar Office (SRO).
3. Proof of Senior Citizen Age (Aadhaar Card, Passport, Voter ID, or Senior Citizen Card showing age 60+ on execution date).
4. Evidence of Maintenance Obligation: Copy of Deed recital, separate Vachan Patra, mutual agreement, or contemporaneous affidavit.
5. Evidence of Neglect or Harassment: Police complaints, medical prescriptions paid by parent, doctor certificates, bank statements.
6. Details of Immovable Property: Current municipal property tax receipt, mutation extract, and electricity/water bills.
7. Verification Affidavit duly attested by an Oath Commissioner or Notary Public.`;
    navigator.clipboard.writeText(checklistText);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
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
            <span>MWPSC ACT, 2007 • SECTION 23 PROPERTY REVOCATION</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Can Parents Cancel Gift Deed? Section 23 Checker
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Assess whether your Gift Deed can be revoked under Section 23 of the Senior Citizens Act.
            Evaluate the 4 mandatory statutory conditions, Supreme Court precedents in{" "}
            <strong>Urmila Dixit (2025)</strong> and <strong>Sudesh Chhikara</strong>, and your Tribunal
            success probability.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-checker"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Check Revocation Eligibility</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft a Will Instead</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 23</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                VOID PROPERTY TRANSFER
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">90 Days</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SDM TRIBUNAL TIMELINE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">2025 INSC 20</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                URMILA DIXIT BENCHMARK
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">100% Retained</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                WILL VS GIFT ADVANTAGE
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
                Governed under Sections 5, 7, 23 & 24 of the Maintenance and Welfare of Parents and
                Senior Citizens Act, 2007, read with landmark rulings <em>Urmila Dixit v. Sunil Sharan
                Dixit (2025)</em> and <em>Sudesh Chhikara v. Ramti Devi (2022)</em>.
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
                <span>EXECUTIVE BRIEF: SENIOR CITIZEN PROPERTY RECOVERY</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Statutory Deeming Fiction:</strong> Under Section 23(1), if a child neglects
                    their maintenance obligations after receiving property, the law deems the gift deed
                    to have been executed through fraud, coercion, or undue influence.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Urmila Dixit (2025) Benchmark:</strong> The Supreme Court clarified that
                    separate undertakings, affidavits, or promissory notes (<em>vachan patra</em>) signed
                    around the time of the transfer are legally valid to prove that the gift was
                    conditional upon care.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Summary SDM Tribunal:</strong> Parents do not need to fight decades-long
                    civil court trials. Petitions are heard by the Sub-Divisional Magistrate acting as
                    the Maintenance Tribunal with a statutory 90-day disposal mandate.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Eviction of Defaulting Children:</strong> Tribunals and High Courts have the
                    inherent authority to order the eviction of abusive children and restore peaceful
                    possession to the elderly parent.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Section 23 Statutory Ground: Voiding Property Transfers
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In Indian society, elderly parents frequently transfer residential properties or
                  agricultural land to their adult children during their lifetime. This is often done
                  through registered gift deeds or release deeds under the emotional promise of care
                  and medical support. However, once title deeds are registered, parents sometimes face
                  neglect, physical mistreatment, or outright abandonment.
                </p>
                <p>
                  To counter this social crisis, Parliament enacted the{" "}
                  <strong>Maintenance and Welfare of Parents and Senior Citizens Act, 2007 (MWPSC Act)</strong>.
                  The most potent legal provision within this legislation is <strong>Section 23(1)</strong>.
                  This section creates an extraordinary legal remedy. It empowers senior citizens to
                  approach a dedicated administrative tribunal rather than a lengthy civil court to have
                  their gift deeds declared null and void.
                </p>
                <p>
                  Section 23(1) establishes a statutory deeming fiction. Where a senior citizen transfers
                  property subject to the condition of receiving basic amenities and physical needs, and
                  the transferee child subsequently refuses or fails to provide them, the law presumes the
                  transfer was procured through <em>fraud, coercion, or undue influence</em>. The Maintenance
                  Tribunal can void the transfer and order the local Sub-Registrar to cancel the deed.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE MICRO-TOOL */}
            <section id="interactive-checker" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE EVALUATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Section 23 Gift Revocation Checker
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Answer the 5 statutory questions below to evaluate whether your property transfer qualifies
                for cancellation under Section 23 and calculate your Tribunal recovery probability.
              </p>

              {/* TOOL CONTAINER */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* STEP 1: AGE & TIMING OF EXECUTION */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] border-b border-slate-100 pb-2">
                    <Clock className="w-4 h-4" />
                    <span>STEP 1: AGE OF PARENT &amp; TIMING OF TRANSFER</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Age at Execution */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                        <span>Age of Parent on Date of Signing</span>
                        <span className="text-[11px] font-semibold text-slate-500">Sec 2(h)</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setAgeAtTransfer("60_or_above")}
                          className={`p-3 rounded-2xl text-left border transition-all text-xs font-bold ${
                            ageAtTransfer === "60_or_above"
                              ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <div>60 Years or Older</div>
                          <div className="text-[10px] font-normal opacity-80 mt-0.5">
                            Senior Citizen Qualified
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setAgeAtTransfer("below_60")}
                          className={`p-3 rounded-2xl text-left border transition-all text-xs font-bold ${
                            ageAtTransfer === "below_60"
                              ? "bg-rose-900 text-white border-rose-900 shadow-xs"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <div>Under 60 Years</div>
                          <div className="text-[10px] font-normal opacity-80 mt-0.5">
                            Civil Court Route Only
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Date Era */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                        <span>Execution Date of Transfer Deed</span>
                        <span className="text-[11px] font-semibold text-slate-500">Act Timing</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setTransferDateEra("after_2007")}
                          className={`p-3 rounded-2xl text-left border transition-all text-xs font-bold ${
                            transferDateEra === "after_2007"
                              ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <div>After Dec 2007</div>
                          <div className="text-[10px] font-normal opacity-80 mt-0.5">
                            Post-Act Commencement
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setTransferDateEra("before_2007")}
                          className={`p-3 rounded-2xl text-left border transition-all text-xs font-bold ${
                            transferDateEra === "before_2007"
                              ? "bg-rose-900 text-white border-rose-900 shadow-xs"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <div>Before Dec 2007</div>
                          <div className="text-[10px] font-normal opacity-80 mt-0.5">
                            Act Not Retrospective
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 2: TRANSFER INSTRUMENT & RECIPIENT */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] border-b border-slate-100 pb-2">
                    <FileText className="w-4 h-4" />
                    <span>STEP 2: NATURE OF DOCUMENT &amp; RECIPIENT</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Instrument Type */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Transfer Document Executed
                      </label>
                      <select
                        value={instrumentType}
                        onChange={(e) =>
                          setInstrumentType(
                            e.target.value as "gift_deed" | "settlement_release" | "sale_nominal"
                          )
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-[#C65378] focus:ring-2 focus:ring-rose-100"
                      >
                        <option value="gift_deed">Registered Gift Deed (Daanpatra / Hiba)</option>
                        <option value="settlement_release">
                          Settlement Deed or Release / Relinquishment Deed
                        </option>
                        <option value="sale_nominal">
                          Registered Sale Deed with Unpaid / Nominal Consideration
                        </option>
                      </select>
                    </div>

                    {/* Transferee Relation */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Relationship of Transferee
                      </label>
                      <select
                        value={transfereeRelation}
                        onChange={(e) =>
                          setTransfereeRelation(
                            e.target.value as "child" | "grandchild" | "relative" | "third_party"
                          )
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-[#C65378] focus:ring-2 focus:ring-rose-100"
                      >
                        <option value="child">Son or Daughter (Biological or Adopted)</option>
                        <option value="grandchild">Grandson or Granddaughter</option>
                        <option value="relative">Son-in-law, Daughter-in-law, or Relative</option>
                        <option value="third_party">Unrelated Third Party / Stranger</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* STEP 3: MAINTENANCE CONDITION (URMILA DIXIT VS SUDESH CHHIKARA) */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] border-b border-slate-100 pb-2">
                    <Scale className="w-4 h-4" />
                    <span>STEP 3: MAINTENANCE OBLIGATION &amp; UNDERTAKING (SC TEST)</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Did the property transfer include an obligation to feed, house, or care for the parent?
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setMaintenanceCondition("express_clause")}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        maintenanceCondition === "express_clause"
                          ? "border-[#C65378] bg-rose-50/60 ring-2 ring-rose-200"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="text-xs font-extrabold text-slate-900 flex items-center justify-between">
                        <span>Express Clause in Deed</span>
                        <Check className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1 leading-snug">
                        Deed clearly states the gift is conditional upon lifelong care and medical support.
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMaintenanceCondition("vachan_patra")}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        maintenanceCondition === "vachan_patra"
                          ? "border-[#C65378] bg-rose-50/60 ring-2 ring-rose-200"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="text-xs font-extrabold text-slate-900 flex items-center justify-between">
                        <span>Vachan Patra / Undertaking</span>
                        <Award className="w-4 h-4 text-[#C65378]" />
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1 leading-snug">
                        Separate contemporaneous promissory note, affidavit, or letter executed alongside
                        the deed (Urmila Dixit 2025 rule).
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMaintenanceCondition("recital_love_affection")}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        maintenanceCondition === "recital_love_affection"
                          ? "border-[#C65378] bg-rose-50/60 ring-2 ring-rose-200"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="text-xs font-extrabold text-slate-900 flex items-center justify-between">
                        <span>Recital: Natural Love &amp; Affection</span>
                        <HeartHandshake className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1 leading-snug">
                        Recital mentions love and affection with oral promise of care, witnessed by family.
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMaintenanceCondition("unconditional")}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        maintenanceCondition === "unconditional"
                          ? "border-[#C65378] bg-rose-50/60 ring-2 ring-rose-200"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="text-xs font-extrabold text-slate-900 flex items-center justify-between">
                        <span>Strictly Unconditional</span>
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1 leading-snug">
                        Pure absolute gift with zero written conditions or undertakings (Sudesh Chhikara
                        barrier).
                      </div>
                    </button>
                  </div>
                </div>

                {/* STEP 4: NATURE OF DEFAULT / BREACH */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] border-b border-slate-100 pb-2">
                    <AlertOctagon className="w-4 h-4" />
                    <span>STEP 4: EVIDENCE OF NEGLECT OR BREACH</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Select all forms of mistreatment or neglect that have occurred:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
                    {[
                      {
                        id: "food_shelter",
                        label: "Denial of Food & Basic Shelter",
                        desc: "Refusal to provide daily meals, clothing, or utilities.",
                      },
                      {
                        id: "medical_care",
                        label: "Denial of Medical Care & Medicines",
                        desc: "Refusal to pay doctor bills, prescriptions, or treatments.",
                      },
                      {
                        id: "physical_mental_harassment",
                        label: "Physical Abuse or Verbal Harassment",
                        desc: "Threats, psychological cruelty, or intimidation.",
                      },
                      {
                        id: "ouster_lockout",
                        label: "Forcible Lockout or Eviction",
                        desc: "Throwing parent out of home or locking them in a room.",
                      },
                      {
                        id: "unauthorized_sale_attempt",
                        label: "Attempting to Sell or Mortgage",
                        desc: "Negotiating with buyers or mortgaging property without consent.",
                      },
                    ].map((item) => {
                      const isSelected = selectedDefaults.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleDefaultItem(item.id)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? "bg-rose-50/80 border-[#C65378] text-slate-900"
                              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-2 font-bold">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}}
                              className="rounded-sm text-[#C65378] focus:ring-[#C65378]"
                            />
                            <span>{item.label}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 pl-5">{item.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 5: POSSESSION STATUS & THIRD PARTY ALIENATION */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] border-b border-slate-100 pb-2">
                    <Home className="w-4 h-4" />
                    <span>STEP 5: CURRENT PROPERTY OCCUPANCY &amp; SALE STATUS</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPossessionState("senior_in_possession")}
                      className={`p-3 rounded-2xl text-left border transition-all text-xs ${
                        possessionState === "senior_in_possession"
                          ? "border-[#C65378] bg-rose-50/70 ring-2 ring-rose-200"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="font-extrabold text-slate-900">Parent in Possession</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        Senior citizen still resides in or holds physical keys to property.
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPossessionState("ousted_by_child")}
                      className={`p-3 rounded-2xl text-left border transition-all text-xs ${
                        possessionState === "ousted_by_child"
                          ? "border-[#C65378] bg-rose-50/70 ring-2 ring-rose-200"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="font-extrabold text-slate-900">Ousted by Child</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        Child forcibly took possession; parent seeks re-entry &amp; eviction.
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPossessionState("mortgaged_or_sold")}
                      className={`p-3 rounded-2xl text-left border transition-all text-xs ${
                        possessionState === "mortgaged_or_sold"
                          ? "border-[#C65378] bg-rose-50/70 ring-2 ring-rose-200"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="font-extrabold text-slate-900">Sold to Third Party</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        Child executed registered deed to an outsider or bank mortgage.
                      </div>
                    </button>
                  </div>
                </div>

                {/* =========================================================================
                    DYNAMIC DIAGNOSTIC RESULTS CARD
                    ========================================================================= */}
                <div className="rounded-3xl bg-[#172228] text-white p-6 sm:p-8 space-y-6 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <div>
                      <div className="text-[11px] font-bold text-rose-300 uppercase tracking-widest">
                        SECTION 23 DIAGNOSTIC OUTCOME
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                        Tribunal Revocation Viability Assessment
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-3xl font-black text-white">{probabilityPercentage}%</div>
                        <div className="text-[10px] text-white/70 uppercase tracking-wider font-bold">
                          Success Probability
                        </div>
                      </div>
                      <button
                        onClick={handleResetEvaluator}
                        className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                        title="Reset Inputs"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Outcome Status Pill */}
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider border ${statusBadgeColor}`}
                  >
                    <Gavel className="w-4 h-4 shrink-0" />
                    <span>{statusBadgeTitle}</span>
                  </div>

                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                    {analysisHeadline}
                  </p>

                  {/* 4 Statutory Conditions Scorecard */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between text-xs font-bold text-white/80">
                        <span>Condition 1: Age 60+</span>
                        {condition1_SeniorCitizen ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <X className="w-4 h-4 text-rose-400" />
                        )}
                      </div>
                      <div className="text-[11px] text-white/60 mt-1">
                        {condition1_SeniorCitizen ? "Senior Citizen Qualified" : "Under 60 at execution"}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between text-xs font-bold text-white/80">
                        <span>Condition 2: Post-2007</span>
                        {condition2_PostAct ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <X className="w-4 h-4 text-rose-400" />
                        )}
                      </div>
                      <div className="text-[11px] text-white/60 mt-1">
                        {condition2_PostAct ? "Within Act Jurisdiction" : "Pre-Act execution"}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between text-xs font-bold text-white/80">
                        <span>Condition 3: Care Link</span>
                        {condition3_MaintenanceObligation ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <X className="w-4 h-4 text-rose-400" />
                        )}
                      </div>
                      <div className="text-[11px] text-white/60 mt-1">
                        {maintenanceCondition === "express_clause"
                          ? "Express Clause in Deed"
                          : maintenanceCondition === "vachan_patra"
                          ? "Vachan Patra Undertaking"
                          : maintenanceCondition === "recital_love_affection"
                          ? "Implied Recital of Care"
                          : "Unconditional Gift"}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between text-xs font-bold text-white/80">
                        <span>Condition 4: Neglect</span>
                        {condition4_BreachOccurred ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <X className="w-4 h-4 text-rose-400" />
                        )}
                      </div>
                      <div className="text-[11px] text-white/60 mt-1">
                        {selectedDefaults.length} Form(s) of Neglect Logged
                      </div>
                    </div>
                  </div>

                  {/* Strategic Action Plan Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/10 border border-white/15 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-200">
                      <Award className="w-4 h-4 text-[#C65378]" />
                      <span>RECOMMENDED LEGAL ACTION PROTOCOL</span>
                    </div>
                    <div className="text-xs sm:text-sm text-white/90 space-y-2 leading-relaxed">
                      {outcomeTier === "high" && (
                        <p>
                          <strong>Action Plan:</strong> File an immediate statutory application under{" "}
                          <strong>Section 23(1) and Section 5</strong> of the MWPSC Act before the
                          Sub-Divisional Magistrate (SDM) / Maintenance Tribunal. Seek dual reliefs: (1) An
                          order declaring the gift deed null and void with directions to the Sub-Registrar
                          to record cancellation, and (2) Police assistance for eviction and restoration of
                          peaceful possession.
                        </p>
                      )}
                      {outcomeTier === "moderate" && (
                        <p>
                          <strong>Action Plan:</strong> File a Section 23 petition relying directly on the
                          Supreme Court precedent in <em>Urmila Dixit v. Sunil Sharan Dixit (2025)</em>.
                          Submit supporting affidavits from family relatives, WhatsApp communications,
                          and medical bills to establish that the gift was made on the condition of lifelong
                          support. Also pray for monthly maintenance under Section 5.
                        </p>
                      )}
                      {outcomeTier === "challenging" && (
                        <p>
                          <strong>Action Plan:</strong> Because of the <em>Sudesh Chhikara</em> unconditional
                          deed barrier or third-party sale, adopt a dual strategy: File for immediate monthly
                          maintenance and residence protection before the Maintenance Tribunal under Section
                          5 & 9, and simultaneously institute a Civil Suit under Section 31 of the Specific
                          Relief Act, 1963 on grounds of fraud and undue influence.
                        </p>
                      )}
                      {outcomeTier === "ineligible" && (
                        <p>
                          <strong>Action Plan:</strong> The summary Maintenance Tribunal cannot entertain
                          pre-2007 transfers or claims where the transferor was below 60. Your remedy lies
                          in the competent Civil Court by filing a declaration and cancellation suit under
                          Section 31 of the Specific Relief Act, 1963, read with Section 16 of the Indian
                          Contract Act.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Diagnostic Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      onClick={handlePrint}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm transition-colors"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Diagnostic Report</span>
                    </button>
                    <Link
                      href="/contact"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Consult Tribunal Advocate</span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* VISUAL FEATURE BLUEPRINT & STATUTORY INFOGRAPHIC */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY VISUAL GUIDE: SENIOR CITIZEN GIFT DEED REVOCATION</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">MWPSC Act 2007 • Section 23</span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/senior-citizen-section-23-gift-revocation-checker-og.jpg"
                  alt="Senior Citizen Section 23 Gift Deed Revocation Checker - Supreme Court Precedents &"
                  width={1200} height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed italic">
                Statutory diagnostic roadmap illustrating parental gift deed revocation grounds under Section 23(1),
                the 4 mandatory prerequisite conditions, and landmark Supreme Court benchmarks in Urmila Dixit (2025)
                and Sudesh Chhikara.
              </p>
            </div>

            {/* SECTION 3: LANDMARK PRECEDENTS */}
            <section id="precedents-urmila-vs-sudesh" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>JUDICIAL PRECEDENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Landmark Precedents: Urmila Dixit vs Sudesh Chhikara
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Judicial interpretation of Section 23 has witnessed historic developments in the Supreme
                  Court of India. Litigants must understand the interplay between two cornerstone
                  rulings: <em>Sudesh Chhikara (2022)</em> and the latest benchmark in{" "}
                  <em>Urmila Dixit (2025)</em>.
                </p>

                {/* Comparison Card: Two SC Judgments */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* Sudesh Chhikara Card */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-black uppercase tracking-wider">
                      <span>SUPREME COURT 2022</span>
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Sudesh Chhikara v. Ramti Devi &amp; Anr. (2022)
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Supreme Court held that Section 23(1) requires two conditions to be fulfilled
                      concurrently: (1) The transfer must be subject to the condition of providing basic
                      amenities, and (2) The transferee must have refused or failed to provide them. If a
                      gift deed is strictly unconditional with no written requirement of care, the
                      Tribunal cannot presume fraud merely because children subsequently fell out with
                      parents.
                    </p>
                    <div className="text-[11px] font-bold text-slate-800 pt-1">
                      Key Takeaway: Avoid absolute unconditional gift deeds; express conditions are crucial.
                    </div>
                  </div>

                  {/* Urmila Dixit Card */}
                  <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2.5">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-black uppercase tracking-wider">
                      <span>SUPREME COURT 2025 (2025 INSC 20)</span>
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Urmila Dixit v. Sunil Sharan Dixit &amp; Ors. (Jan 2025)
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A division bench of Justices C.T. Ravikumar and Sanjay Karol affirmed that the MWPSC
                      Act is beneficial social welfare legislation designed to protect elderly citizens.
                      The Court ruled that even if the registered gift deed did not contain an express
                      condition on its face, contemporaneous instruments such as a <em>Vachan Patra</em>{" "}
                      (promissory undertaking) execute a binding conditional transfer that triggers
                      Section 23 revocation upon neglect.
                    </p>
                    <div className="text-[11px] font-bold text-[#C65378] pt-1">
                      Key Takeaway: Purposive interpretation protects parents who possess side undertakings.
                    </div>
                  </div>
                </div>

                <p>
                  The 2025 ruling in <em>Urmila Dixit</em> provides massive relief to Indian parents. It
                  prevents errant children from using hyper-technical drafting loopholes to defeat the
                  humane purpose of the Senior Citizens Act.
                </p>
              </div>
            </section>

            {/* SECTION 4: THE 4 STATUTORY PREREQUISITE CONDITIONS */}
            <section id="four-statutory-conditions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>STATUTORY CRITERIA</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. The 4 Statutory Prerequisite Conditions Explained
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  To secure an order of gift cancellation from the Maintenance Tribunal under Section
                  23(1), an applicant must plead and establish four distinct legal components:
                </p>

                <div className="space-y-3 pt-1">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </div>
                    <div className="space-y-1">
                      <div className="font-extrabold text-slate-900 text-sm">
                        Senior Citizen Status on Date of Execution (Age 60+)
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Under Section 2(h) of the Act, a senior citizen means any individual who is a
                        citizen of India and has attained the age of 60 years or above. The transferor
                        must have been at least 60 years old on the date the transfer deed was executed.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </div>
                    <div className="space-y-1">
                      <div className="font-extrabold text-slate-900 text-sm">
                        Transfer After Commencement of the Act (Post-December 2007)
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Section 23 explicitly applies to transfers made <em>"after the commencement of
                        this Act"</em>. Because the Central Act received Presidential assent on December
                        29, 2007 and was notified across Indian states in 2008, property transfers executed
                        prior to late 2007 cannot be voided under Section 23.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </div>
                    <div className="space-y-1">
                      <div className="font-extrabold text-slate-900 text-sm">
                        Condition of Providing Basic Amenities &amp; Physical Needs
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        The transfer must be subject to an obligation that the transferee child provide
                        basic food, shelter, clothing, medical care, or maintenance. Following{" "}
                        <em>Urmila Dixit (2025)</em>, this can be proven through express recitals in the
                        deed, contemporaneous undertakings, or written agreements.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                      4
                    </div>
                    <div className="space-y-1">
                      <div className="font-extrabold text-slate-900 text-sm">
                        Refusal or Failure to Maintain by the Transferee
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        The applicant must prove that the child failed, neglected, or refused to provide
                        basic maintenance or engaged in cruelty, eviction, or abandonment. Medical records,
                        unpaid utility bills, or police station general diary entries serve as strong
                        corroboration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: WHY A WILL BEATS A LIFETIME GIFT DEED */}
            <section id="why-will-beats-gift-deed" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SUCCESSION STRATEGY</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Property Comparison: Why a Will Beats a Gift Deed
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Most parents execute gift deeds because they wish to avoid future probate procedures or
                  family disputes after death. However, executing a lifetime gift deed is legally dangerous.
                  It immediately alienates title, making the parent dependent upon the child&rsquo;s goodwill.
                </p>
                <p>
                  A legally structured Will provides 100% security because it transfers ownership only upon
                  demise while remaining completely revocable during your life.
                </p>

                {/* STRUCTURED HTML COMPARISON TABLE */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200/90 shadow-xs bg-white pt-1">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-900 text-white font-extrabold border-b border-slate-800">
                        <th className="py-3.5 px-4">Legal Parameter</th>
                        <th className="py-3.5 px-4 bg-[#C65378] text-white">Registered Will (Recommended)</th>
                        <th className="py-3.5 px-4 bg-slate-800 text-slate-200">Lifetime Gift Deed (Risky)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">Transfer of Ownership</td>
                        <td className="py-3 px-4 text-emerald-800 font-semibold bg-rose-50/20">
                          Takes effect ONLY after demise. Parent remains 100% absolute owner for life.
                        </td>
                        <td className="py-3 px-4 text-rose-800 font-semibold">
                          Takes effect immediately on registration. Parent ceases to own the house.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">Right of Revocation</td>
                        <td className="py-3 px-4 text-emerald-800 font-semibold bg-rose-50/20">
                          100% revocable anytime. Can alter, cancel, or draft a new Will without child&rsquo;s consent.
                        </td>
                        <td className="py-3 px-4 text-rose-800 font-semibold">
                          Irrevocable under Transfer of Property Act unless contested under Section 23 Tribunal.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">Stamp Duty &amp; Registration</td>
                        <td className="py-3 px-4 text-emerald-800 font-semibold bg-rose-50/20">
                          Nominal registration fee (₹100 to ₹1,000 depending on state). ₹0 Stamp Duty.
                        </td>
                        <td className="py-3 px-4 text-rose-800 font-semibold">
                          Heavy stamp duty (2% to 7% of market circle rate, costing lakhs in many states).
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">Rental Income &amp; Sale Rights</td>
                        <td className="py-3 px-4 text-emerald-800 font-semibold bg-rose-50/20">
                          Parent keeps 100% rental income, right to mortgage, or right to sell property anytime.
                        </td>
                        <td className="py-3 px-4 text-rose-800 font-semibold">
                          Child receives rents. Child can attempt to mortgage or sell house to third parties.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">Risk of Abandonment</td>
                        <td className="py-3 px-4 text-emerald-800 font-semibold bg-rose-50/20">
                          Virtually zero. Children remain attentive knowing the Will can be altered at any time.
                        </td>
                        <td className="py-3 px-4 text-rose-800 font-semibold">
                          Extremely high. Common trigger for parental neglect, harassment, and eviction.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="pt-2">
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                    <div>
                      <strong>Need to Secure Your Assets Without Risking Neglect?</strong> Draft a customized,
                      challenge-proof Indian Will online in 15 minutes.
                    </div>
                    <button
                      onClick={handleStartDraft}
                      className="shrink-0 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold ml-4"
                    >
                      Draft a Will
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: TRIBUNAL FILING SOP */}
            <section id="tribunal-filing-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>PROCEDURAL ROADMAP</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Tribunal Filing SOP: Procedure Before the SDM Court
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A petition under Section 23 is not filed in a regular Civil Court. It is presented before
                  the <strong>Maintenance Tribunal</strong> headed by the Sub-Divisional Magistrate (SDM)
                  or Revenue Divisional Officer (RDO) possessing territorial jurisdiction where the senior
                  citizen resides or where the property is situated.
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      S1
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">
                        Drafting &amp; Filing Petition under Section 23(1) &amp; Section 5
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Prepare a formal petition detailing the date of the gift deed, the conditional
                        promise of maintenance, specific dates of neglect/cruelty, and prayers for deed
                        revocation, monthly maintenance, and peaceful eviction.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      S2
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">
                        Issuance of Notice &amp; Conciliation Referral (Section 6)
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        The Tribunal issues summons to the child. Under Section 6(6), the Tribunal may
                        refer the matter to a Conciliation Officer. If conciliation fails or the child
                        remains recalcitrant, the Tribunal proceeds with summary inquiry.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      S3
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">
                        Interim Maintenance &amp; Restraining Orders (Section 5(2))
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        During pendency, the Tribunal can order monthly interim allowance (up to ₹10,000
                        or higher as per recent High Court directions) and restrain the child from creating
                        third-party rights or mortgaging the property.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      S4
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">
                        Final Order Declaring Transfer Void &amp; SRO Cancellation
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        The Tribunal passes an order declaring the gift deed void. A copy of the order is
                        served on the local Sub-Registrar to record cancellation in Book I registers,
                        reverting legal title exclusively back to the senior citizen.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      S5
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">
                        Eviction Enforcement through Station House Officer (SHO)
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        If the child refuses to vacate the premises, the SDM directs the local police
                        authorities to physically evict the child and hand over vacant keys to the parent
                        pursuant to <em>S. Vanitha (SC 2020)</em>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: THIRD PARTY SALES & SECTION 23(2) */}
            <section id="third-party-purchasers" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>THIRD PARTY ALIENATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Section 23(2) Rule: When Property Is Sold to Third Party
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A frequent challenge arises when a child who received a gift deed rapidly sells or
                  mortgages the property to a third-party purchaser or commercial bank before the parent can
                  approach the Maintenance Tribunal. Section 23(2) of the Act addresses this contingency:
                </p>
                <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 text-xs sm:text-sm text-slate-800 leading-relaxed">
                  <strong>Section 23(2) Text:</strong> <em>"Where any senior citizen has a right to receive
                  maintenance out of an estate and such estate or part thereof is transferred, the right
                  to receive maintenance may be enforced against the transferee if the transferee has notice
                  of the right, or if the transfer is gratuitous; but not against a transferee for
                  consideration and without notice of right."</em>
                </div>
                <p>
                  This means that if the child gifted the property to their spouse (gratuitous transfer) or
                  if the outside buyer purchased the property knowing the elderly parent was being ousted
                  (transfer with notice), the senior citizen can enforce their rights against that buyer.
                </p>
                <p>
                  However, if an outsider bought the property for fair market value in good faith without
                  knowing of the family dispute, the Maintenance Tribunal cannot unilaterally cancel the
                  third-party sale deed. In such cases, the senior citizen must file a declaration suit in
                  the Civil Court while pursuing monthly maintenance and compensation against the child
                  before the Tribunal.
                </p>
              </div>
            </section>

            {/* SECTION 8: SECTION 24 PENALTIES & EVICTION */}
            <section id="section-24-criminal-penalties" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4" />
                <span>CRIMINAL LIABILITY</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Section 24 Penalties: Abandonment &amp; Criminal Liability
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In addition to civil property revocation under Section 23, the MWPSC Act imposes direct
                  criminal liability on children who abandon their elderly parents.
                </p>
                <p>
                  Under <strong>Section 24 of the Act</strong>, whoever having the care or protection of a
                  senior citizen leaves such senior citizen in any place with the intention of wholly
                  abandoning them commits a cognizable and bailable criminal offense. The offense carries
                  imprisonment for a term which may extend to <strong>three months, or with a fine up to
                  ₹5,000, or with both</strong>.
                </p>
                <p>
                  Senior citizens facing physical assault or intimidation can also register an FIR under
                  the relevant provisions of the Bharatiya Nyaya Sanhita, 2023 (BNS) for criminal
                  intimidation, wrongful confinement, and voluntarily causing hurt.
                </p>
              </div>
            </section>

            {/* SECTION 9: PRACTICAL CASE STUDIES */}
            <section id="practical-case-scenarios" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>CASE SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Practical Case Studies: Delhi, Bengaluru, Mumbai
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                    <span className="text-[#C65378]">Case 1: South Delhi SDM Tribunal Revocation</span>
                    <span className="text-slate-500">Deed Cancelled in 75 Days</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A 72-year-old retired central government officer gifted his ancestral floor in Vasant
                    Kunj to his elder son. The gift deed contained a recital that the son would care for the
                    father&rsquo;s medical needs. Within 8 months, the son cut electricity, locked the kitchen,
                    and stopped buying heart medication. Counsel filed a Section 23 petition before the SDM
                    (South). The SDM declared the deed void, directed the Sub-Registrar to expunge the
                    transfer, and deployed Delhi Police to evict the son within 15 days.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                    <span className="text-[#C65378]">Case 2: Bengaluru High Court Eviction Order</span>
                    <span className="text-slate-500">S. Vanitha Precedent Applied</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    In Bengaluru, a widowed mother was harassed by her son and daughter-in-law after gifting
                    them a residential villa. The daughter-in-law filed domestic violence claims to resist
                    eviction. Applying the Supreme Court ruling in <em>S. Vanitha</em>, the Karnataka High
                    Court ruled that a senior citizen&rsquo;s right to live with peace and dignity overrides
                    conflicting claims under the DV Act, upholding the SDM&rsquo;s eviction order.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                    <span className="text-[#C65378]">Case 3: Mumbai Flat Release Deed Cancellation</span>
                    <span className="text-slate-500">Urmila Dixit Vachan Patra Doctrine</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A 68-year-old mother in Borivali released her 50% share in an inherited apartment in
                    favor of her son alongside a signed letter (<em>Vachan Patra</em>) promising monthly
                    maintenance of ₹25,000. When the son stopped payments, the Maintenance Tribunal initially
                    hesitated under <em>Sudesh Chhikara</em>. On appeal, relying on the 2025 Supreme Court
                    ruling in <em>Urmila Dixit</em>, the Tribunal held that contemporaneous undertakings
                    satisfy Section 23, voiding the release deed.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: PROTECTIVE RECITAL CLAUSES & CHECKLIST */}
            <section id="protective-clauses-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Copy className="w-4 h-4" />
                <span>DRAFTING TEMPLATES &amp; CHECKLIST</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Protective Recital Clauses &amp; Tribunal Checklist
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  If you are currently contemplating gifting property to a child, you must include a
                  watertight protective recital in the gift deed. If you are already facing neglect, use our
                  filing checklist to assemble your Tribunal petition docket.
                </p>

                {/* TEMPLATE BOX 1: PROTECTIVE CLAUSE */}
                <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                      <FileCheck className="w-4 h-4 text-[#C65378]" />
                      <span>Protective Section 23 Recital Clause for Gift Deeds</span>
                    </div>
                    <button
                      onClick={copyRecitalToClipboard}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-xs font-bold transition-colors"
                    >
                      {copiedRecital ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Clause</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] sm:text-xs overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
{`"AND WHEREAS this Gift of the Schedule Property is executed by the Donor and accepted by the Donee SUBJECT TO THE EXPRESS STATUTORY CONDITION under Section 23(1) of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007, that the Donee shall provide all basic amenities, physical needs, medical care, nourishment, and peaceful shelter to the Donor throughout the Donor's natural life.

AND WHEREAS it is mutually agreed and understood that in the event the Donee neglects, fails, or refuses to provide such basic amenities, medical expenses, and respectful maintenance to the Donor at any point of time, this Gift Deed shall be deemed to have been made by fraud, coercion, and undue influence, and shall at the sole option and petition of the Donor be declared null, void, and cancelled by the Maintenance Tribunal, with absolute title and vacant possession reverting forthwith to the Donor."`}
                  </pre>
                </div>

                {/* TEMPLATE BOX 2: TRIBUNAL APPLICATION CHECKLIST */}
                <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                      <FileText className="w-4 h-4 text-[#5F7E75]" />
                      <span>Section 23 Maintenance Tribunal Filing Checklist</span>
                    </div>
                    <button
                      onClick={copyChecklistToClipboard}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors"
                    >
                      {copiedChecklist ? (
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
                  <pre className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-[11px] sm:text-xs overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
{`1. Formal Application under Section 23(1) & Section 5 before the Sub-Divisional Magistrate (SDM) / Maintenance Tribunal.
2. Certified Copy of the Registered Gift Deed / Settlement Deed from the Sub-Registrar Office (SRO).
3. Proof of Senior Citizen Age (Aadhaar Card, Passport, Voter ID, or Senior Citizen Card showing age 60+ on execution date).
4. Evidence of Maintenance Obligation: Copy of Deed recital, separate Vachan Patra, mutual agreement, or contemporaneous affidavit.
5. Evidence of Neglect or Harassment: Police complaints, medical prescriptions paid by parent, doctor certificates, bank statements.
6. Details of Immovable Property: Current municipal property tax receipt, mutation extract, and electricity/water bills.
7. Verification Affidavit duly attested by an Oath Commissioner or Notary Public.`}
                  </pre>
                </div>
              </div>
            </section>

            {/* SECTION 11: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>INSTITUTIONAL PROFILE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Institutional Profile: AMA Legal Solutions Counsel
              </h3>
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-rose-100 text-[#C65378] font-black text-xl flex items-center justify-center shrink-0">
                    AAM
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      Advocate Anuj Anand Malik
                    </h3>
                    <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Senior Succession &amp; Elder Law Litigator • AMA Legal Solutions
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Advocate Anuj Anand Malik has represented hundreds of senior citizens before Maintenance
                  Tribunals, Appellate Tribunals (District Magistrates), and High Courts across India. His
                  practice focuses on Section 23 gift cancellations, senior citizen eviction petitions,
                  testamentary probate, and challenge-proof estate succession structuring.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-center text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-extrabold text-slate-900 text-base">500+</div>
                    <div className="text-slate-600 text-[11px] mt-0.5">Succession Disputes Handled</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-extrabold text-slate-900 text-base">Pan-India</div>
                    <div className="text-slate-600 text-[11px] mt-0.5">High Court &amp; SDM Tribunal Reach</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-extrabold text-slate-900 text-base">90-Day</div>
                    <div className="text-slate-600 text-[11px] mt-0.5">Target Summary Disposal</div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: Gift Deed Revocation
              </h3>
              <div className="space-y-3 pt-2">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl bg-white border border-slate-200/90 shadow-xs overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isOpen ? "rotate-180 text-[#C65378]" : "text-slate-400"
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

            {/* SECTION 13: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>STATUTORY CITATIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Statutory Citations &amp; Legal Redressal Resources
              </h3>
              <div className="rounded-2xl bg-white border border-slate-200/90 p-5 space-y-3 text-xs text-slate-700 leading-relaxed">
                <p>
                  <strong>Primary Legislation:</strong> Maintenance and Welfare of Parents and Senior
                  Citizens Act, 2007 (Act No. 56 of 2007), Sections 2(h), 5, 7, 8, 9, 19, 20, 23 & 24.
                </p>
                <p>
                  <strong>Landmark Supreme Court Precedents:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <em>Urmila Dixit v. Sunil Sharan Dixit &amp; Ors.</em>, 2025 INSC 20 (Bench of Justices
                    C.T. Ravikumar &amp; Sanjay Karol).
                  </li>
                  <li>
                    <em>Sudesh Chhikara v. Ramti Devi &amp; Anr.</em>, (2022) 15 SCC 493.
                  </li>
                  <li>
                    <em>S. Vanitha v. Deputy Commissioner, Bengaluru Urban District &amp; Ors.</em>, (2021) 15
                    SCC 730 (Overriding effect of Senior Citizens Act over DV Act).
                  </li>
                </ul>
                <p>
                  <strong>Related Tools on WillDrafting:</strong> Compare{" "}
                  <Link
                    href="/tools/gift-deed-vs-will-stamp-duty-calculator"
                    className="text-[#C65378] font-bold underline"
                  >
                    Gift Deed vs Will Stamp Duty Calculator
                  </Link>{" "}
                  or check your estate plan using the{" "}
                  <Link
                    href="/tools/will-validity-section-63-audit-checker"
                    className="text-[#C65378] font-bold underline"
                  >
                    Will Validity Section 63 Audit Checker
                  </Link>
                  .
                </p>
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
                Specialist in Section 23 Tribunal petitions, elder property restitution, High Court
                probate litigation, and challenge-proof Indian Will drafting.
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
                  <span>PREVENT LIFETIME PROPERTY DISPUTES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Retain 100% Ownership For Life With a Will
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Never surrender your title deeds to children during your lifetime. A registered Will keeps
                  you in complete control of your home and rents until your demise.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Reviewed &amp; Stamp Duty Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>SECTION 23 LITIGATION DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Facing Neglect or Property Ouster by Children?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our elder law litigators handle Section 23 Tribunal petitions, police protection orders,
                  and eviction proceedings before SDM courts pan-India.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Schedule Advocate Consultation</span>
                </Link>
                <div className="pt-1">
                  <Link
                    href="/services/will-dispute-contest-litigation-lawyer"
                    className="text-[11px] font-semibold text-[#C65378] hover:underline"
                  >
                    View Will Dispute &amp; Litigation Services →
                  </Link>
                </div>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Senior Citizens Trust Us
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Urmila Dixit Precision:</strong> Incorporates 2025 Supreme Court standards.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Summary Recovery:</strong> Focuses on fast 90-day SDM Tribunal relief.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>End-to-End Legal Aid:</strong> From notice drafting to police eviction enforcement.
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
          <Calculator className="w-3.5 h-3.5" />
          <span>Section 23 Checker</span>
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
