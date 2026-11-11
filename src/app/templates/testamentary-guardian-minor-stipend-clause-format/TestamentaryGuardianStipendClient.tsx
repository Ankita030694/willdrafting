"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
  Scale,
  Lock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Landmark,
  Check,
  X,
  Gavel,
  Calculator,
  Copy,
  CheckCheck,
  FileText,
  AlertCircle,
  Clock,
  Building2,
  CheckSquare,
  HeartHandshake,
  Coins,
} from "lucide-react";

// Table of Contents Items (strictly <= 70 chars, 0 em-dashes, unique matching anchor IDs)
const TOC_ITEMS = [
  { id: "statutory-purpose-scope", label: "1. Section 9 HMGA & GWA: Guardian Appointment Scope" },
  { id: "guardian-stipend-calculator", label: "2. Minor Child Monthly Stipend & Inflation Calculator" },
  { id: "standard-vs-indexed-comparison", label: "3. Standard Clause vs Inflation-Indexed Stipend Model" },
  { id: "guardian-stipend-clause-format", label: "4. Legal Testamentary Guardian & Stipend Clause Format" },
  { id: "guardian-powers-duties-schedule", label: "5. Guardian Powers & Duties Schedule Legal Format" },
  { id: "father-rights-override-guidance", label: "6. Father Rights Override & Estranged Parent Defense" },
  { id: "monthly-stipend-schooling-rules", label: "7. Monthly Stipend Schedule & Direct Schooling Rules" },
  { id: "personal-law-guardian-rules", label: "8. Personal Laws: Hindu, Christian, Muslim & Single Moms" },
  { id: "step-by-step-guardian-sop", label: "9. Step-by-Step SOP: Executing Guardian Will Clause" },
  { id: "common-guardian-mistakes", label: "10. Four Fatal Mistakes in Guardian Will Clauses" },
  { id: "institutional-profile", label: "11. Institutional Profile: Family Custody & Will Desk" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions: Guardian & Stipend" },
  { id: "statutory-citations", label: "13. Statutory Rules & Official Legal Portals" },
];

const FAQS = [
  {
    q: "Can a mother name her sister as testamentary guardian in an Indian Will?",
    a: "Yes. Under Section 9(3) and Section 9(4) of the Hindu Minority and Guardianship Act, 1956, a widowed mother can name a guardian by Will. A single or separated mother can also name her sister when the father stays away. In Githa Hariharan v. RBI, the Supreme Court held that a mother acts as natural guardian if the father is absent or uninvolved.",
  },
  {
    q: "Why must a guardian clause include an inflation-linked monthly stipend?",
    a: "Raising a child for 10 to 15 years brings rising food, rent, clothes, and bus bills. A fixed rupee sum loses half its worth over time due to inflation. Adding a yearly 7% or 8% CPI rise keeps your child safe. It also stops cash stress for your sister.",
  },
  {
    q: "How can a single mother block an estranged biological father from custody or money?",
    a: "Put two clear rules in your Will. First, add a short Welfare and Estrangement Note listing unpaid support, zero visits, and your child's bond with your sister. Courts weigh these facts under Sections 7 and 17 of the Guardians and Wards Act, 1890 and Nil Ratan Kundu v. Abhijit Kundu. Second, put all savings and flats in a private Will trust run by separate trustees so the father cannot touch the funds.",
  },
  {
    q: "Should the child's guardian also manage the child's bank accounts and property?",
    a: "No. Keep daily child care separate from money control. Name your sister as Guardian of the Person for daily care. Name a separate Executor or Co-Trustee to hold savings and pay the monthly stipend. This avoids family doubts and bypasses slow District Court sale rules under Section 29 of the Guardians and Wards Act.",
  },
  {
    q: "Why pay school fees and medical bills separately from the monthly living stipend?",
    a: "Private school and coaching fees in India often rise 9% to 12% each year. If school fees come out of one fixed monthly stipend, fee hikes cut into food and home care. Ask your Executor to pay school bills and health plans straight to the school or insurer.",
  },
  {
    q: "Which court hears custody disputes over a testamentary guardian in India?",
    a: "Under Section 9 of the Guardians and Wards Act, 1890, a custody case goes to the District Court or Family Court where the child normally lives. Under Section 13 of the HMGA and Section 17 of the GWA, child welfare comes first. Courts give strong weight to a late mother's written wishes.",
  },
  {
    q: "Can an unmarried or adoptive single mother appoint a guardian in her Will?",
    a: "Yes. Under the Supreme Court ruling in ABC v. State (NCT of Delhi) and CARA adoption rules, an unmarried or adoptive single mother is the sole natural guardian. She holds full power to name a primary and backup guardian in her Will without asking the birth father.",
  },
  {
    q: "What happens if the chosen guardian passes away or cannot take custody?",
    a: "Always name at least one backup or Alternate Guardian in your Will, like a brother or close aunt, on the same stipend terms. If you name only one person and they cannot serve, a court must pick a new guardian under Section 7 of the Guardians and Wards Act, 1890.",
  },
];

function formatINR(amount: number): string {
  return "Rs. " + Math.round(amount).toLocaleString("en-IN");
}

export default function TestamentaryGuardianStipendClient() {
  const [activeId, setActiveId] = useState<string>("statutory-purpose-scope");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedGuardianClause, setCopiedGuardianClause] = useState<boolean>(false);
  const [copiedSchedule, setCopiedSchedule] = useState<boolean>(false);
  const [copiedOverrideClause, setCopiedOverrideClause] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // ==========================================
  // INTERACTIVE STIPEND & INFLATION CALCULATOR
  // ==========================================
  const [familyScenario, setFamilyScenario] = useState<string>("single_mother_estranged");
  const [childAge, setChildAge] = useState<number>(6);
  const [baseMonthlyStipend, setBaseMonthlyStipend] = useState<number>(45000);
  const [inflationRate, setInflationRate] = useState<number>(7);
  const [annualSchoolMedicalFund, setAnnualSchoolMedicalFund] = useState<number>(250000);

  const yearsUntilMajority = Math.max(1, 18 - childAge);
  const projectedMonthlyAt18 = Math.round(
    baseMonthlyStipend * Math.pow(1 + inflationRate / 100, yearsUntilMajority)
  );

  // Calculate cumulative inflation-indexed stipend + schooling/medical outflow until age 18
  let cumulativeStipendOutflow = 0;
  let cumulativeSchoolOutflow = 0;
  for (let yr = 0; yr < yearsUntilMajority; yr++) {
    cumulativeStipendOutflow += baseMonthlyStipend * 12 * Math.pow(1 + inflationRate / 100, yr);
    cumulativeSchoolOutflow += annualSchoolMedicalFund * Math.pow(1 + (inflationRate + 2) / 100, yr);
  }
  const totalRecommendedCorpus = Math.round(cumulativeStipendOutflow + cumulativeSchoolOutflow);

  let custodyStatusLabel = "Welfare Recital + Trust Shield Required";
  let custodyRuleCitation = "HMGA 1956 s. 9(3) & GWA 1890 ss. 7, 17";
  let custodyGuidance =
    "Include a clear factual Estrangement Recital plus a separate Testamentary Trust. Under Githa Hariharan v. RBI and Nil Ratan Kundu, Family Courts prioritize child welfare over an absent father's bare biological claim.";

  if (familyScenario === "both_parents_joint") {
    custodyStatusLabel = "Dual-Parent Trigger (Section 9(2) & 9(4) HMGA)";
    custodyRuleCitation = "HMGA 1956 ss. 9(1), 9(2), 9(4) & GWA s. 6";
    custodyGuidance =
      "Both parents should execute Mirror Wills naming the same primary and alternate guardians. Under Section 9(2), a father's appointment takes effect only after the surviving mother dies without naming another guardian.";
  } else if (familyScenario === "divorced_sole_custody") {
    custodyStatusLabel = "Attach Custody Decree & Section 17 Wish";
    custodyRuleCitation = "GWA 1890 ss. 7, 17(2) & Nil Ratan Kundu";
    custodyGuidance =
      "Reference your Family Court divorce and sole custody order directly inside the Will recital. Pair your sister's guardian appointment with a private Will trust so the ex-spouse cannot manage any inheritance.";
  } else if (familyScenario === "adoptive_single_parent") {
    custodyStatusLabel = "Unrestricted Sole Natural Guardian Power";
    custodyRuleCitation = "HMGA s. 9(3), JJ Act & ABC v. State (SC)";
    custodyGuidance =
      "As a sole adoptive or single mother, you hold exclusive guardianship rights. Cite your CARA adoption order or sole birth record so your sister assumes immediate custody without third-party interference.";
  }

  const copyGuardianClauseToClipboard = () => {
    const text = `TESTAMENTARY GUARDIAN & INFLATION-INDEXED STIPEND CLAUSE
(Under Section 9 of the Hindu Minority and Guardianship Act, 1956 & Sections 6, 7 and 17 of the Guardians and Wards Act, 1890)

1. APPOINTMENT OF PRIMARY & ALTERNATE TESTAMENTARY GUARDIAN:
In the event of my death (or if my spouse [Name of Spouse] predeceases me / is legally uninvolved as recorded herein), and my child [Full Legal Name of Minor Child], born on [Date of Birth], has not attained the age of eighteen (18) years, I hereby appoint my [sister / brother / mother], [Full Name of Primary Guardian], presently residing at [Complete Residential Address of Guardian], Aadhaar No. [XXXX-XXXX-XXXX], to be the sole Testamentary Guardian of the PERSON of my said minor child during minority.

If [Name of Primary Guardian] is unable, unwilling, or predeceases me or passes away before my child attains majority, I appoint [Full Name of Alternate Guardian], residing at [Complete Address of Alternate Guardian], as the Alternate Testamentary Guardian on the exact same terms and protections stated below.

2. SEPARATION OF CARE GUARDIANSHIP AND FINANCIAL TRUSTEESHIP:
The Testamentary Guardian shall exercise full parental authority over the daily residence, upbringing, emotional nurture, schooling choices, and medical care of my minor child. All financial assets, bank deposits, mutual funds, insurance proceeds, and immovable properties bequeathed for my child shall vest in my Executor / Testamentary Trustees named in Clause [X] of this Will ("Trustees") for administration until my child attains [21 / 25] years of age.

3. INFLATION-INDEXED MONTHLY LIVING STIPEND:
To ensure my child enjoys the same comfortable standard of living without placing any personal financial burden on the Testamentary Guardian, I direct my Trustees to pay to [Name of Primary Guardian] a base Monthly Living Stipend of INR [e.g., 45,000/-] (Rupees Forty-Five Thousand Only) per month on or before the 5th day of every English calendar month.
   (a) AUTOMATIC ANNUAL CPI INFLATION ADJUSTMENT: Commencing on the 1st day of April following one full year from my demise, and on every 1st day of April thereafter until my child turns eighteen (18) years (or completes full-time undergraduate study up to age 21), the Monthly Living Stipend shall automatically increase by [7% / 8%] per annum compounded annually, or by the annual RBI Consumer Price Index (CPI) inflation rate, whichever is higher.
   (b) GUARDIAN CARE HONORARIUM (OPTIONAL): In addition to the child's Monthly Living Stipend, the Trustees shall pay the Guardian a personal Care Honorarium of INR [e.g., 15,000/-] per month (also escalated at [7%] annually) in gratitude for caregiving time, relocation, or career adjustments.

4. DIRECT-PAY SCHOOLING, EXTRACURRICULAR & MEDICAL HEALTHCARE FUND:
The Monthly Living Stipend covers daily food, household utilities, local transport, clothing, and pocket allowance ONLY. My Trustees shall pay the following costs DIRECTLY from the Estate / Child Trust Fund to the relevant institution or via reimbursement against original GST/receipt bills within 7 days:
   (a) All school tuition, books, uniforms, transport fees, board exam coaching, and summer academic camps;
   (b) Comprehensive family-floater or individual child health insurance premiums (minimum cover INR [e.g., 15,00,000/-]) plus all uncovered dental, hospital, emergency, or therapy expenses;
   (c) One annual domestic or educational trip and extra-curricular music, sports, or STEM training costs up to INR [e.g., 1,00,000/-] per year (escalated annually for inflation).`;
    navigator.clipboard.writeText(text);
    setCopiedGuardianClause(true);
    setTimeout(() => setCopiedGuardianClause(false), 3000);
  };

  const copyScheduleToClipboard = () => {
    const text = `SCHEDULE OF GUARDIAN POWERS, DUTIES & FIDUCIARY SAFEGUARDS
(Annexed to Last Will and Testament of [Full Name of Testator])

PART A: POWERS OF THE TESTAMENTARY GUARDIAN (PERSON & DAILY CARE)
1. RESIDENCE & RELOCATION: The Guardian is empowered to have my minor child reside in the Guardian's primary household in India (or abroad if pursuing employment/education, subject to prior written intimation to the Trustees and ensuring continuous schooling).
2. MEDICAL & SURGICAL CONSENT: The Guardian holds full authority to consent to routine pediatric care, vaccinations, diagnostic tests, emergency surgeries, hospital admissions, and mental health counseling in the best interest of the child.
3. EDUCATION & PASSPORT DOCUMENTS: The Guardian may sign school admission forms, parent-teacher undertakings, CBSE/ICSE/IB registrations, passport renewal applications, and school excursion approvals as legal guardian.

PART B: DUTIES, ACCOUNTABILITY & SEPARATION OF FUNDS
1. ZERO OUT-OF-POCKET HARDSHIP: The Guardian shall not be expected to spend personal savings on the child's upbringing; any emergency medical or school outlay above INR 10,000/- paid by the Guardian shall be reimbursed by the Trustees within 7 working days.
2. SEMI-ANNUAL WELFARE & ACADEMIC UPDATE: Twice every year (June and December), the Guardian shall share school report cards, annual health check-up summaries, and basic confirmation of child welfare with the Trustees. Detailed receipts are NOT required for the Monthly Living Stipend, which is a flat household allowance.
3. PROPERTY & CAPITAL PROTECTION (GWA SECTION 29 ALIGNMENT): The Guardian shall not mortgage, sell, lease, or encumber any immovable property or fixed capital belonging to my child. Any capital decisions rest exclusively with my Executor / Testamentary Trustees under the Powers of Trustees clause.`;
    navigator.clipboard.writeText(text);
    setCopiedSchedule(true);
    setTimeout(() => setCopiedSchedule(false), 3000);
  };

  const copyOverrideClauseToClipboard = () => {
    const text = `WELFARE & ESTRANGEMENT RECITAL FOR SINGLE / SEPARATED MOTHERS
(Protecting Minor Child Custody Against Uninvolved or Estranged Biological Father under Section 6(a) & 13 HMGA 1956 and Sections 7 & 17 Guardians and Wards Act, 1890)

1. FACTUAL RECORD OF SOLE PARENTAL CARE & ABSENCE OF FATHER:
I expressly record that I, [Full Name of Mother], have been the sole emotional, physical, and financial caregiver of my minor daughter/son [Name of Child] since [Month, Year / Birth]. The biological father, [Full Name of Biological Father], has been living separately since [Date] / has remained completely absent and uninvolved in the upbringing, schooling, medical care, and daily life of my child for over [Number] years, and has [failed to pay maintenance / surrendered custody under Decree dated ____ / never exercised visitation].

2. SUPREME WELFARE DECLARATION (GITHA HARIHARAN & NIL RATAN KUNDU):
In law, under Section 6(a) of the Hindu Minority and Guardianship Act, 1956 as interpreted by the Hon'ble Supreme Court in Githa Hariharan v. Reserve Bank of India (1999) 2 SCC 228, the biological father has disentitled himself by sustained indifference and absence, vesting full natural and testamentary guardianship power in me under Section 9(3) HMGA. Removing my child from the loving household of my sister [Name of Sister/Guardian], with whom my child shares an established emotional bond, and placing my child with a stranger or estranged biological parent would cause severe psychological trauma and violate the paramount welfare test under Section 13 HMGA and Section 17 of the Guardians and Wards Act, 1890.

3. FINANCIAL RING-FENCING EVEN IF CUSTODY IS CONTESTED:
Without prejudice to my sister's appointment as Guardian of the Person, I strictly direct my Executor and Trustees that UNDER NO CIRCUMSTANCES shall [Name of Biological Father] or any relative claiming through him be appointed guardian of the property, trustee, or signatory over any bank account, insurance payout, or flat inherited by my child. Should any court grant temporary custody or access to [Name of Biological Father], all estate assets shall remain strictly locked inside the "[Child Name] Testamentary Trust", and Trustees shall pay school fees and child expenses directly to service providers, ensuring zero cash passes into the hands of [Name of Biological Father].`;
    navigator.clipboard.writeText(text);
    setCopiedOverrideClause(true);
    setTimeout(() => setCopiedOverrideClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const text = `TESTAMENTARY GUARDIAN & STIPEND WILL CHECKLIST (INDIA):
1. Obtain written consent from Primary Guardian (e.g., sister) and Alternate Guardian
2. Record full legal names, Aadhaar/PAN, and current addresses of Guardians and minor child
3. Set Base Monthly Living Stipend and automatic annual CPI escalation rate (e.g. 7% or 8% every April 1)
4. Carve out separate Direct-Pay Schooling, Tuition & Health Insurance Fund
5. Separate Guardian of Person (caregiver) from Executor / Trustee of Property (fiduciary)
6. Add Factual Welfare & Estrangement Recital if biological father is absent or uninvolved
7. Attach certified Divorce / Sole Custody Decree or Maintenance Default records (if applicable)
8. Execute Will with 2 independent adult witnesses under Section 63 Indian Succession Act, 1925
9. Register Will in Book 3 at local Sub-Registrar Office for added court authenticity
10. Share sealed copy and emergency Executor details with Primary Guardian`;
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

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
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          LAYER 1: HERO SECTION
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-12 pb-16 md:pt-16 md:pb-20 border-b border-[#FAF7F0]/10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Statutory Category Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C65378]/20 border border-[#C65378]/40 text-rose-200 text-xs font-bold uppercase tracking-wider mb-6">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>GUARDIANS &amp; WARDS ACT, 1890 SS. 6, 7 &amp; 9 • HMGA 1956 S. 9</span>
          </div>

          {/* Strict H1 Tag (51 chars <= 65, 0 em-dashes, distinct from Page Title) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Testamentary Guardian &amp; Minor Stipend Clause Format
          </h1>

          {/* Subtitle Paragraph (Plain language, readable, active voice) */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Name a trusted legal guardian for your child inside your Indian Will. Add an inflation-linked monthly
            living stipend, ring-fence school fees, and shield custody from estranged fathers.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#guardian-stipend-clause-format"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get Guardian &amp; Stipend Clause</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/start"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Online Will with Guardian</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 9</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                HMGA GUARDIAN APPOINTMENT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">CPI-Linked</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                INFLATION MONTHLY STIPEND
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">School Fund</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                DIRECT TUITION &amp; HEALTH PAY
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 17 GWA</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CHILD WELFARE CUSTODY SHIELD
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
                <span>Legal Office</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                This guide covers Sections 6, 7, 9, and 17 of the Guardians and Wards Act, 1890 and Section 9 of the
                Hindu Minority and Guardianship Act, 1956.
              </p>
            </div>

            {/* Quick Limitation Alert */}
            <div className="bg-rose-50/80 rounded-2xl border border-rose-200/90 p-4 text-xs text-rose-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#C65378]">
                <Clock className="w-4 h-4 text-[#C65378]" />
                <span>Single Mother Alert</span>
              </div>
              <p className="leading-relaxed text-[11px] text-rose-900">
                Naming your sister without a monthly stipend, inflation clause, and estrangement recital invites court
                fights and puts unfair costs on her household.
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
                <span>EXECUTIVE BRIEF: TESTAMENTARY GUARDIAN &amp; STIPEND RULES</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Clear Guardian Naming:</strong> Name a main and backup guardian in your Will under Section
                    9 of the HMGA, 1956 and Section 6 of the GWA, 1890.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Inflation-Linked Stipend:</strong> Set a monthly stipend that grows 7% to 8% each year so
                    your child&apos;s daily care never drops.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Direct School &amp; Health Fund:</strong> Pay school fees and doctor bills straight from
                    estate funds instead of cutting the food budget.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Estranged Father Shield:</strong> Record the father&apos;s absence under Githa Hariharan
                    and lock cash in a Will trust so he cannot touch it.
                  </span>
                </li>
              </ul>
            </div>

            {/* EDITORIAL BANNER IMAGE CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="relative aspect-[16/9] w-full bg-slate-900">
                <Image
                  src="/images/testamentary-guardian-minor-stipend-clause-format-og.jpg"
                  alt="Testamentary Guardian and Minor Stipend Clause Format for Indian Wills"
                  width={1200}
                  height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                />
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
                <span className="font-semibold text-slate-700">
                  Minor Child Protection Series: Guardian Appointment &amp; Stipend Formats
                </span>
                <span className="text-[11px] font-mono text-[#C65378] font-bold">
                  GWA 1890 &amp; HMGA 1956 COMPLIANT
                </span>
              </div>
            </div>

            {/* SECTION 1: STATUTORY PURPOSE & SCOPE (STRICTLY SINGLE H2) */}
            <section id="statutory-purpose-scope" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Section 9 HMGA &amp; GWA: Guardian Appointment Scope
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  Every parent of a young child asks one vital question. Who will raise my child if I pass away early?
                  Most free Will forms just name one person in a single line. They skip living funds, school bills, and
                  court defenses.
                </p>
                <p>
                  Two Indian laws govern child care after a parent dies. One is the Guardians and Wards Act, 1890
                  (Sections 6, 7, 9, and 17). The next is the Hindu Minority and Guardianship Act, 1956 (Section 9) for
                  Hindus, Sikhs, Jains, and Buddhists.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                    Why a Bare Guardian Name Is Not Enough
                  </div>
                  <p className="text-xs text-slate-700">
                    If you name your sister without monthly cash support, she must spend her own pay to raise your
                    child. Also, if an estranged birth father shows up after your death, a short clause gives the court
                    few facts to turn him down.
                  </p>
                </div>
                <p>
                  A strong guardian clause fixes all three gaps at once. It names a main and backup guardian, sets a
                  monthly stipend linked to price rises, and splits school fees from daily home costs.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE STIPEND & INFLATION CALCULATOR */}
            <section id="guardian-stipend-calculator" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>STIPEND &amp; CUSTODY PLANNER</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Minor Child Monthly Stipend &amp; Inflation Calculator
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Estimate how your guardian&apos;s monthly living allowance will grow with inflation until your child turns
                18, and see which statutory custody safeguard applies to your family.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Select 1: Family Scenario */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Your Family &amp; Custody Situation:
                    </label>
                    <select
                      value={familyScenario}
                      onChange={(e) => setFamilyScenario(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="single_mother_estranged">
                        Single / Separated Mother (Estranged Father)
                      </option>
                      <option value="divorced_sole_custody">
                        Divorced Parent with Court Sole Custody
                      </option>
                      <option value="both_parents_joint">
                        Married Parents Writing Mirror Wills
                      </option>
                      <option value="adoptive_single_parent">
                        Adoptive or Unmarried Single Mother
                      </option>
                    </select>
                  </div>

                  {/* Select 2: Inflation Escalation */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Annual Stipend Inflation Rate (CPI Link):
                    </label>
                    <select
                      value={inflationRate}
                      onChange={(e) => setInflationRate(parseInt(e.target.value, 10))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value={6}>6% Annual Escalation (Conservative CPI)</option>
                      <option value={7}>7% Annual Escalation (Standard India CPI)</option>
                      <option value={8}>8% Annual Escalation (Metro City Lifestyle)</option>
                      <option value={10}>10% Annual Escalation (High Care Buffer)</option>
                    </select>
                  </div>

                  {/* Slider 1: Child Age */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                      Child&apos;s Current Age: {childAge} Year(s) ({yearsUntilMajority} Years to 18)
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={17}
                      value={childAge}
                      onChange={(e) => setChildAge(parseInt(e.target.value, 10) || 0)}
                      className="w-full accent-[#C65378]"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                      <span>Infant (0 yrs)</span>
                      <span>Age 8</span>
                      <span>Age 17</span>
                    </div>
                  </div>

                  {/* Slider 2: Base Monthly Stipend */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                      Base Monthly Living Stipend: {formatINR(baseMonthlyStipend)}
                    </label>
                    <input
                      type="range"
                      min={15000}
                      max={150000}
                      step={5000}
                      value={baseMonthlyStipend}
                      onChange={(e) => setBaseMonthlyStipend(parseInt(e.target.value, 10) || 15000)}
                      className="w-full accent-[#C65378]"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                      <span>Rs. 15,000/mo</span>
                      <span>Rs. 75,000/mo</span>
                      <span>Rs. 1.5 Lakh/mo</span>
                    </div>
                  </div>
                </div>

                {/* Slider 3: Annual School & Medical Direct Fund */}
                <div className="pt-1 space-y-2">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    Annual Direct-Pay Schooling &amp; Health Fund: {formatINR(annualSchoolMedicalFund)} / year
                  </label>
                  <input
                    type="range"
                    min={100000}
                    max={800000}
                    step={25000}
                    value={annualSchoolMedicalFund}
                    onChange={(e) => setAnnualSchoolMedicalFund(parseInt(e.target.value, 10) || 100000)}
                    className="w-full accent-[#C65378]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                    <span>Rs. 1 Lakh/yr</span>
                    <span>Rs. 4.5 Lakh/yr</span>
                    <span>Rs. 8 Lakh/yr</span>
                  </div>
                </div>

                {/* COMPUTED RESULT DISPLAY */}
                <div className="rounded-2xl border border-slate-200 p-5 bg-gradient-to-br from-slate-50 via-white to-rose-50/40 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span className="font-extrabold text-sm text-slate-900">{custodyStatusLabel}</span>
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-200 text-slate-800">
                      {custodyRuleCitation}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">{custodyGuidance}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">
                        Stipend at Age 18 ({inflationRate}% CPI)
                      </div>
                      <div className="text-lg font-black text-[#C65378]">
                        {formatINR(projectedMonthlyAt18)}/mo
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">
                        Total Living Stipend ({yearsUntilMajority} Yrs)
                      </div>
                      <div className="text-lg font-black text-slate-900">
                        {formatINR(cumulativeStipendOutflow)}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">
                        Total Stipend + School Corpus
                      </div>
                      <div className="text-lg font-black text-emerald-700">
                        {formatINR(totalRecommendedCorpus)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: COMPARISON TABLE */}
            <section id="standard-vs-indexed-comparison" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>DRAFTING COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Standard Clause vs Inflation-Indexed Stipend Model
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Standard Will formats simply name a relative as guardian. That creates huge money gaps and custody
                risks. See how our inflation-indexed clause fixes each blind spot:
              </p>

              {/* Responsive Comparison Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-1/4">
                        Clause Feature
                      </th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-3/8 text-slate-300">
                        Generic Will Guardian Clause
                      </th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-3/8 text-rose-200">
                        WillDrafting Stipend &amp; Shield Format
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Monthly Care Stipend</td>
                      <td className="p-3.5 text-rose-700 font-semibold">
                        Omitted or fixed rupee figure with no adjustment
                      </td>
                      <td className="p-3.5 text-emerald-800 font-bold">
                        Defined monthly stipend paid by the 5th of each month
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Inflation Protection</td>
                      <td className="p-3.5">Buying power drops 50% within 10 years</td>
                      <td className="p-3.5 font-semibold text-[#172228]">
                        Automatic 7% to 8% annual CPI hike every April 1st
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">School &amp; Medical Bills</td>
                      <td className="p-3.5">Guardian begs executor or pays out of pocket</td>
                      <td className="p-3.5 font-semibold text-[#172228]">
                        Separate Direct-Pay Schooling and Health Insurance Fund
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Estranged Father Defense</td>
                      <td className="p-3.5 text-rose-700 font-semibold">
                        Zero facts recorded; father claims default custody
                      </td>
                      <td className="p-3.5 text-emerald-800 font-bold">
                        Factual Welfare Recital under Githa Hariharan &amp; GWA s. 17
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Property &amp; Cash Control</td>
                      <td className="p-3.5">Mixed together; invites Section 29 GWA court delays</td>
                      <td className="p-3.5 font-semibold text-[#172228]">
                        Care Guardian separated from Testamentary Trustees
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Backup Guardian</td>
                      <td className="p-3.5">Often missing; forces District Court picking</td>
                      <td className="p-3.5 font-semibold text-[#172228]">
                        Named Alternate Guardian inherits identical stipend rights
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: COPY-PASTE TEMPLATE 1 - GUARDIAN & STIPEND CLAUSE */}
            <section id="guardian-stipend-clause-format" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>COPY-PASTE TEMPLATE 1</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Legal Testamentary Guardian &amp; Stipend Clause Format
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Copy this clause into your Indian Will. Replace the text inside square brackets with your sister&apos;s
                or chosen guardian&apos;s full legal details and your monthly stipend figures.
              </p>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900">
                    Testamentary Guardian Appointment, CPI Stipend &amp; Schooling Fund Clause
                  </div>
                  <button
                    type="button"
                    onClick={copyGuardianClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedGuardianClause ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Format</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`TESTAMENTARY GUARDIAN & INFLATION-INDEXED STIPEND CLAUSE
(Under Section 9 of the Hindu Minority and Guardianship Act, 1956 & Sections 6, 7 and 17 of the Guardians and Wards Act, 1890)

1. APPOINTMENT OF PRIMARY & ALTERNATE TESTAMENTARY GUARDIAN:
In the event of my death (or if my spouse [Name of Spouse] predeceases me / is legally uninvolved as recorded herein), and my child [Full Legal Name of Minor Child], born on [Date of Birth], has not attained the age of eighteen (18) years, I hereby appoint my [sister / brother / mother], [Full Name of Primary Guardian], presently residing at [Complete Residential Address of Guardian], Aadhaar No. [XXXX-XXXX-XXXX], to be the sole Testamentary Guardian of the PERSON of my said minor child during minority.

If [Name of Primary Guardian] is unable, unwilling, or predeceases me or passes away before my child attains majority, I appoint [Full Name of Alternate Guardian], residing at [Complete Address of Alternate Guardian], as the Alternate Testamentary Guardian on the exact same terms and protections stated below.

2. SEPARATION OF CARE GUARDIANSHIP AND FINANCIAL TRUSTEESHIP:
The Testamentary Guardian shall exercise full parental authority over the daily residence, upbringing, emotional nurture, schooling choices, and medical care of my minor child. All financial assets, bank deposits, mutual funds, insurance proceeds, and immovable properties bequeathed for my child shall vest in my Executor / Testamentary Trustees named in Clause [X] of this Will ("Trustees") for administration until my child attains [21 / 25] years of age.

3. INFLATION-INDEXED MONTHLY LIVING STIPEND:
To ensure my child enjoys the same comfortable standard of living without placing any personal financial burden on the Testamentary Guardian, I direct my Trustees to pay to [Name of Primary Guardian] a base Monthly Living Stipend of INR [e.g., 45,000/-] (Rupees Forty-Five Thousand Only) per month on or before the 5th day of every English calendar month.
   (a) AUTOMATIC ANNUAL CPI INFLATION ADJUSTMENT: Commencing on the 1st day of April following one full year from my demise, and on every 1st day of April thereafter until my child turns eighteen (18) years (or completes full-time undergraduate study up to age 21), the Monthly Living Stipend shall automatically increase by [7% / 8%] per annum compounded annually, or by the annual RBI Consumer Price Index (CPI) inflation rate, whichever is higher.
   (b) GUARDIAN CARE HONORARIUM (OPTIONAL): In addition to the child's Monthly Living Stipend, the Trustees shall pay the Guardian a personal Care Honorarium of INR [e.g., 15,000/-] per month (also escalated at [7%] annually) in gratitude for caregiving time, relocation, or career adjustments.

4. DIRECT-PAY SCHOOLING, EXTRACURRICULAR & MEDICAL HEALTHCARE FUND:
The Monthly Living Stipend covers daily food, household utilities, local transport, clothing, and pocket allowance ONLY. My Trustees shall pay the following costs DIRECTLY from the Estate / Child Trust Fund to the relevant institution or via reimbursement against original GST/receipt bills within 7 days:
   (a) All school tuition, books, uniforms, transport fees, board exam coaching, and summer academic camps;
   (b) Comprehensive family-floater or individual child health insurance premiums (minimum cover INR [e.g., 15,00,000/-]) plus all uncovered dental, hospital, emergency, or therapy expenses;
   (c) One annual domestic or educational trip and extra-curricular music, sports, or STEM training costs up to INR [e.g., 1,00,000/-] per year (escalated annually for inflation).`}
                </pre>
              </div>
            </section>

            {/* SECTION 5: COPY-PASTE TEMPLATE 2 - GUARDIAN POWERS & DUTIES SCHEDULE */}
            <section id="guardian-powers-duties-schedule" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>COPY-PASTE TEMPLATE 2</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Guardian Powers &amp; Duties Schedule Legal Format
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Attach this schedule to your Will so schools, hospitals, and passport offices accept your
                guardian&apos;s authority without demanding fresh court orders.
              </p>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900">
                    Guardian Powers, Duties &amp; Fiduciary Safeguards Schedule
                  </div>
                  <button
                    type="button"
                    onClick={copyScheduleToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedSchedule ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Format</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`SCHEDULE OF GUARDIAN POWERS, DUTIES & FIDUCIARY SAFEGUARDS
(Annexed to Last Will and Testament of [Full Name of Testator])

PART A: POWERS OF THE TESTAMENTARY GUARDIAN (PERSON & DAILY CARE)
1. RESIDENCE & RELOCATION: The Guardian is empowered to have my minor child reside in the Guardian's primary household in India (or abroad if pursuing employment/education, subject to prior written intimation to the Trustees and ensuring continuous schooling).
2. MEDICAL & SURGICAL CONSENT: The Guardian holds full authority to consent to routine pediatric care, vaccinations, diagnostic tests, emergency surgeries, hospital admissions, and mental health counseling in the best interest of the child.
3. EDUCATION & PASSPORT DOCUMENTS: The Guardian may sign school admission forms, parent-teacher undertakings, CBSE/ICSE/IB registrations, passport renewal applications, and school excursion approvals as legal guardian.

PART B: DUTIES, ACCOUNTABILITY & SEPARATION OF FUNDS
1. ZERO OUT-OF-POCKET HARDSHIP: The Guardian shall not be expected to spend personal savings on the child's upbringing; any emergency medical or school outlay above INR 10,000/- paid by the Guardian shall be reimbursed by the Trustees within 7 working days.
2. SEMI-ANNUAL WELFARE & ACADEMIC UPDATE: Twice every year (June and December), the Guardian shall share school report cards, annual health check-up summaries, and basic confirmation of child welfare with the Trustees. Detailed receipts are NOT required for the Monthly Living Stipend, which is a flat household allowance.
3. PROPERTY & CAPITAL PROTECTION (GWA SECTION 29 ALIGNMENT): The Guardian shall not mortgage, sell, lease, or encumber any immovable property or fixed capital belonging to my child. Any capital decisions rest exclusively with my Executor / Testamentary Trustees under the Powers of Trustees clause.`}
                </pre>
              </div>
            </section>

            {/* SECTION 6: FATHER RIGHTS OVERRIDE GUIDANCE (COMPETITOR MOAT) */}
            <section id="father-rights-override-guidance" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>SINGLE MOTHER &amp; CUSTODY DEFENSE MOAT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Father Rights Override &amp; Estranged Parent Defense
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  Single and separated moms often ask one urgent question. Section 6(a) of the HMGA lists the father
                  before the mother. If I pass away, can an estranged father take my child from my sister and grab my
                  money?
                </p>
                <p>
                  Indian Supreme Court orders give moms strong legal shields against this risk. Courts do not give a
                  birth father automatic custody if he abandoned or ignored the child.
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-xs">
                      1. Githa Hariharan v. Reserve Bank of India (1999) 2 SCC 228
                    </div>
                    <p className="text-xs text-slate-600">
                      The Supreme Court held that &quot;after him&quot; in Section 6(a) HMGA also means &quot;when the
                      father is absent.&quot; If a father stays away or shows no care, the mother acts as natural
                      guardian and can name a guardian in her Will.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-xs">
                      2. Nil Ratan Kundu v. Abhijit Kundu (2008) 9 SCC 413
                    </div>
                    <p className="text-xs text-slate-600">
                      In a custody fight between maternal kin and a birth father after a mother died, the Supreme Court
                      put child welfare first under Section 17 GWA and Section 13 HMGA.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-xs">
                      3. ABC v. State (NCT of Delhi) (2015) 10 SCC 1
                    </div>
                    <p className="text-xs text-slate-600">
                      The Supreme Court backed an unwed single mother&apos;s sole right to guard her child. She does not
                      need consent from an uninvolved birth father.
                    </p>
                  </div>
                </div>

                {/* Copy-Paste Template 3: Welfare & Estrangement Recital */}
                <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-4 sm:p-5 space-y-3 mt-4">
                  <div className="flex items-center justify-between pb-2 border-b border-rose-200/70">
                    <div className="font-extrabold text-xs sm:text-sm text-slate-900">
                      Copy-Paste Template 3: Welfare &amp; Estrangement Recital Clause
                    </div>
                    <button
                      type="button"
                      onClick={copyOverrideClauseToClipboard}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-rose-100 border border-rose-200 text-xs font-bold text-[#C65378] transition-colors"
                    >
                      {copiedOverrideClause ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Override Clause</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`WELFARE & ESTRANGEMENT RECITAL FOR SINGLE / SEPARATED MOTHERS
(Protecting Minor Child Custody Against Uninvolved or Estranged Biological Father under Section 6(a) & 13 HMGA 1956 and Sections 7 & 17 Guardians and Wards Act, 1890)

1. FACTUAL RECORD OF SOLE PARENTAL CARE & ABSENCE OF FATHER:
I expressly record that I, [Full Name of Mother], have been the sole emotional, physical, and financial caregiver of my minor daughter/son [Name of Child] since [Month, Year / Birth]. The biological father, [Full Name of Biological Father], has been living separately since [Date] / has remained completely absent and uninvolved in the upbringing, schooling, medical care, and daily life of my child for over [Number] years, and has [failed to pay maintenance / surrendered custody under Decree dated ____ / never exercised visitation].

2. SUPREME WELFARE DECLARATION (GITHA HARIHARAN & NIL RATAN KUNDU):
In law, under Section 6(a) of the Hindu Minority and Guardianship Act, 1956 as interpreted by the Hon'ble Supreme Court in Githa Hariharan v. Reserve Bank of India (1999) 2 SCC 228, the biological father has disentitled himself by sustained indifference and absence, vesting full natural and testamentary guardianship power in me under Section 9(3) HMGA. Removing my child from the loving household of my sister [Name of Sister/Guardian], with whom my child shares an established emotional bond, and placing my child with a stranger or estranged biological parent would cause severe psychological trauma and violate the paramount welfare test under Section 13 HMGA and Section 17 of the Guardians and Wards Act, 1890.

3. FINANCIAL RING-FENCING EVEN IF CUSTODY IS CONTESTED:
Without prejudice to my sister's appointment as Guardian of the Person, I strictly direct my Executor and Trustees that UNDER NO CIRCUMSTANCES shall [Name of Biological Father] or any relative claiming through him be appointed guardian of the property, trustee, or signatory over any bank account, insurance payout, or flat inherited by my child. Should any court grant temporary custody or access to [Name of Biological Father], all estate assets shall remain strictly locked inside the "[Child Name] Testamentary Trust", and Trustees shall pay school fees and child expenses directly to service providers, ensuring zero cash passes into the hands of [Name of Biological Father].`}
                  </pre>
                </div>
              </div>
            </section>

            {/* SECTION 7: MONTHLY STIPEND & DIRECT SCHOOLING RULES */}
            <section id="monthly-stipend-schooling-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Coins className="w-4 h-4" />
                <span>STIPEND ARCHITECTURE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Monthly Stipend Schedule &amp; Direct Schooling Rules
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm pb-1 border-b border-slate-100 flex items-center justify-between">
                    <span>1. Monthly Living Stipend</span>
                    <span className="text-[10px] text-rose-600 font-bold">CPI +7%/yr</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Pays for food, home power, clothes, and daily travel. Sent by the 5th of each month. Grows 7% to
                    8% each April so price hikes never hurt child care.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm pb-1 border-b border-slate-100 flex items-center justify-between">
                    <span>2. Direct School &amp; Health Fund</span>
                    <span className="text-[10px] text-rose-600 font-bold">Direct Pay</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Your Executor pays school fees, tutors, and health plans straight to the school or clinic. This
                    keeps steep fee hikes apart from home cash.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm pb-1 border-b border-slate-100 flex items-center justify-between">
                    <span>3. Care Pay &amp; Home Help</span>
                    <span className="text-[10px] text-rose-600 font-bold">Optional</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    A fair monthly care pay or room setup fund thanks your sister for her time, job leave, and home
                    space without draining her own family savings.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: PERSONAL LAWS BREAKDOWN */}
            <section id="personal-law-guardian-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>INDIAN PERSONAL LAW RULES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Personal Laws: Hindu, Christian, Muslim &amp; Single Moms
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  Guardian rules in India vary by faith and family law. Knowing your law keeps your Will safe in court.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="font-bold text-slate-900">Hindus, Sikhs, Jains &amp; Buddhists (HMGA 1956)</div>
                    <p className="text-slate-600">
                      Section 9 lets parents name a guardian in a Will. A mother&apos;s Will overrides the father&apos;s
                      earlier choice under Section 9(4). Single moms rely on Githa Hariharan.
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="font-bold text-slate-900">Christians, Parsis &amp; Special Marriage Act</div>
                    <p className="text-slate-600">
                      The Guardians and Wards Act, 1890 (Sections 6, 7, and 17) applies. District Judges give strong
                      weight to a late parent&apos;s written Will choice.
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="font-bold text-slate-900">Muslims (Shariat &amp; GWA 1890)</div>
                    <p className="text-slate-600">
                      Muslim law splits physical care (Hizanat) from asset control (Wilayat). Mothers should pair a GWA
                      Section 7 custody note with a living or 1/3rd Wasiyat trust.
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="font-bold text-slate-900">Single &amp; Adoptive Mothers (CARA / JJ Act)</div>
                    <p className="text-slate-600">
                      A sole adoptive or unwed mother is the only legal guardian. Naming her sister plus a private trust
                      keeps child care smooth and safe.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-guardian-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>PRACTICAL EXECUTION SOP</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Executing Guardian Will Clause
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Talk to Your Main &amp; Backup Guardians</div>
                      <p className="text-slate-600 mt-0.5">
                        Ask your sister and one backup relative if they agree. Put their full names and home addresses
                        in your Will.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Fix the Monthly Stipend &amp; CPI Rate</div>
                      <p className="text-slate-600 mt-0.5">
                        Use our tool above to pick a fair monthly stipend, a 7% or 8% yearly price rise, and a direct
                        school and clinic fund.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Split Daily Care from Money Trust</div>
                      <p className="text-slate-600 mt-0.5">
                        Pick a separate Executor or Co-Trustee to invest funds and pay stipends. This protects your
                        child&apos;s wealth and keeps peace at home.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Add Estranged Father Facts &amp; Proof</div>
                      <p className="text-slate-600 mt-0.5">
                        If the birth father is away or divorced, add Template 3 above. Keep copies of court orders or
                        unpaid support letters with your Will.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                      5
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Sign Before Two Neutral Witnesses</div>
                      <p className="text-slate-600 mt-0.5">
                        Sign your Will under Section 63 of the Indian Succession Act, 1925 in front of two adult
                        witnesses who do not get a gift in the Will.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                      6
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Register in Book 3 &amp; Brief Your Sister</div>
                      <p className="text-slate-600 mt-0.5">
                        Register your Will at the Sub-Registrar Office in Book 3 for strong court proof. Give a sealed
                        copy with Executor contacts to your sister.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: COMMON FATAL MISTAKES */}
            <section id="common-guardian-mistakes" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertCircle className="w-4 h-4" />
                <span>AVOID CUSTODY &amp; FUNDING TRAPS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Four Fatal Mistakes in Guardian Will Clauses
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Naming a Guardian Without Stipend Terms</span>
                  </div>
                  <p className="text-slate-600">
                    Asking your sister to raise your child for years without monthly cash causes strain. Always write
                    a monthly stipend and direct school pay rules.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Using a Flat Fixed Rupee Stipend</span>
                  </div>
                  <p className="text-slate-600">
                    A flat Rs. 25,000 monthly sum loses half its buying power in 9 years. Always build in a yearly 7%
                    to 8% CPI price hike rule.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Giving Direct Cash Control Without a Trust</span>
                  </div>
                  <p className="text-slate-600">
                    Direct gifts to a minor freeze flats under Section 29 GWA and expose cash to an absent parent. Pair
                    every guardian clause with a Will trust.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Staying Silent About an Estranged Father</span>
                  </div>
                  <p className="text-slate-600">
                    If you skip facts on the father&apos;s absence and unpaid support, courts lack proof to back your
                    sister under Section 17 of the GWA, 1890.
                  </p>
                </div>
              </div>
            </section>

            {/* MID-ARTICLE CONTEXTUAL TOOLS INTEGRATION */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-[#172228] text-white space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-300 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#C65378]" />
                <span>INTEGRATED MINOR CHILD ESTATE SUITE</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold">
                Model Your Child&apos;s Trust Corpus, Guardianship &amp; Will Validity
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Pair your guardian clause with the right trust corpus and signing checks using our free diagnostic
                tools:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold">
                <Link
                  href="/tools/minor-child-testamentary-trust-corpus-calculator"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-between transition-colors"
                >
                  <span>Child Trust Corpus Calculator</span>
                  <ArrowRight className="w-4 h-4 text-rose-300" />
                </Link>
                <Link
                  href="/tools/minor-child-trust-vs-guardianship-estimator"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-between transition-colors"
                >
                  <span>Trust vs Guardianship Tool</span>
                  <ArrowRight className="w-4 h-4 text-rose-300" />
                </Link>
                <Link
                  href="/tools/will-validity-section-63-audit-checker"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-between transition-colors"
                >
                  <span>Section 63 Will Audit Tool</span>
                  <ArrowRight className="w-4 h-4 text-rose-300" />
                </Link>
              </div>
            </div>

            {/* SECTION 11: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Institutional Profile: Family Custody &amp; Will Desk
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Child Guardianship &amp; Trust Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Checked Counsel</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is powered by AMA Legal Solutions. Our family succession lawyers draft custom
                  Wills for single mothers, divorced parents, and young couples across India. We align your guardian
                  stipend schedule, schooling fund, and private Will trust for smooth SRO registration and Family Court
                  protection.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/start"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Online Will with Guardian</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/contact"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Book Custody Will Review</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/templates"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>All Legal Templates Hub</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQ ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>DIRECT ANSWERS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: Guardian &amp; Stipend
              </h3>
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
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
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

            {/* SECTION 13: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY CITATIONS &amp; OFFICIAL PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Statutory Rules &amp; Official Legal Portals
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs">
                <div className="space-y-2">
                  <div className="font-extrabold text-slate-900">
                    Governing Statutes &amp; Supreme Court Rulings:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      <strong>Guardians and Wards Act, 1890 (Sections 6, 7 &amp; 9):</strong> Saving testamentary
                      guardian powers, court welfare appointment, and minor residence jurisdiction.
                    </li>
                    <li>
                      <strong>Guardians and Wards Act, 1890 (Sections 17 &amp; 29):</strong> Weighing deceased
                      parent&apos;s wishes and restricting property sale without court consent.
                    </li>
                    <li>
                      <strong>Hindu Minority and Guardianship Act, 1956 (Sections 6, 9 &amp; 13):</strong> Natural and
                      testamentary guardian powers for mothers and paramount minor welfare rule.
                    </li>
                    <li>
                      <strong>Supreme Court Precedents:</strong> Githa Hariharan v. RBI (1999) 2 SCC 228, Nil Ratan
                      Kundu v. Abhijit Kundu (2008) 9 SCC 413, and ABC v. State (NCT of Delhi) (2015) 10 SCC 1.
                    </li>
                    <li>
                      <strong>Indian Succession Act, 1925 (Section 63):</strong> Two-witness execution rules for valid
                      Indian Wills.
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-3">
                  <a
                    href="https://www.indiacode.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Central Acts</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>Supreme Court of India</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://ecourts.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>eCourts Services Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Child &amp; Family Templates
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/templates/testamentary-trust-clause-minor-child-will-format"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Minor Child Will Trust Clause
                    </Link>
                    <Link
                      href="/templates/special-needs-child-private-trust-clause-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Special Needs Child Trust Clause
                    </Link>
                    <Link
                      href="/templates/joint-mutual-mirror-will-format-husband-wife"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Husband &amp; Wife Mirror Will Format
                    </Link>
                    <Link
                      href="/templates/disinheritance-exclusion-clause-format-will"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Exclusion Clause Format
                    </Link>
                    <Link
                      href="/templates"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Browse All Templates
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* PLAIN-ENGLISH TRUST CARDS FOR READABILITY */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Name a Guardian Now?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A written guardian clause protects your child from sudden foster care or family fights. You pick who
                  raises your child and how monthly bills get paid.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Simple Plain Paper Rules</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You can write your Will on plain white paper. No stamp paper is needed in India. Sign it in front of
                  two adult witnesses so it stays valid in court.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers review your custody papers, stipend plan, and trust rules. We draft clear clauses so your
                  chosen guardian cares for your child without money stress.
                </p>
              </div>
            </div>
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
                  <div className="font-extrabold text-slate-900 text-sm">Lawyer Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Expert in Indian succession law, minor child testamentary trusts, custody recitals, and registered
                Wills across India.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Checked Counsel</span>
                </span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-6">
              {/* CARD 2: DUAL CTA 1 - ONLINE WILL WITH GUARDIAN SELECTION (/start) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>SAFEGUARD YOUR MINOR CHILD</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Create Your Online Will with Guardian Selection
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Name a primary and alternate guardian, set monthly stipends, and lock assets in a child trust in 15
                  minutes.
                </p>
                <Link
                  href="/start"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Your Will Online</span>
                </Link>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>HMGA Sec 9 &amp; Trust Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (/contact) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <HeartHandshake className="w-3 h-3" />
                  <span>SINGLE MOTHER &amp; CUSTODY DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need Estranged Father Override Drafting?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Consult AMA Legal Solutions to draft custom custody recitals, private Will trusts, and SRO-ready
                  protection for your child.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Book Legal Consultation</span>
                </Link>
              </div>

              {/* CARD 4: GUARDIAN WILL CHECKLIST CARD */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-[#C65378]" />
                    <span>Guardian Clause Checklist</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="text-[11px] font-bold text-[#C65378] hover:underline"
                  >
                    {copiedChecklist ? "Copied!" : "Copy"}
                  </button>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-600">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Primary &amp; Alternate Guardian Consent</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>CPI-Indexed Monthly Living Stipend</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Direct-Pay School &amp; Health Fund</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Separate Caregiver vs Money Trustee</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Estranged Father Welfare Recital</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
