"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
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
  Calculator,
  Percent,
  Copy,
  CheckCheck,
  TrendingUp,
  Sliders,
  Users,
  FileText,
  ArrowDownRight,
  Layers,
  Globe,
  Coins,
  ShieldAlert,
  Heart,
  Baby,
  Compass,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Legal Foundation: Minor Child Estate" },
  { id: "court-guardianship-dilemma", label: "2. The Guardian Trap: Section 8 HMGA Lockups" },
  { id: "interactive-estimator", label: "3. Free Trust vs Child Care Tool" },
  { id: "trust-vs-guardianship-comparison", label: "4. Comparative Matrix: Guardian vs Trust" },
  { id: "mwp-act-insurance-trust", label: "5. Section 6 MWP Act: Insurance Protection" },
  { id: "staggered-milestone-architecture", label: "6. Milestone Architecture: Staggered Payouts" },
  { id: "selecting-guardians-trustees", label: "7. Trustee & Guardian Selection: Governance" },
  { id: "real-life-case-studies", label: "8. Real Scenarios: Young Parents & Heirs" },
  { id: "step-by-step-protection-sop", label: "9. Step-by-Step Child Protection SOP" },
  { id: "auto-generated-will-clauses", label: "10. Copy-Paste Will Trust Clauses" },
  { id: "young-parents-checklist", label: "11. 10-Point Estate Planning Checklist" },
  { id: "institutional-advocacy-bench", label: "12. Institutional Profile & Legal Trust" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Governing Acts & Official Portals" },
];

const FAQS = [
  {
    q: "Can a minor child directly inherit asset and money in India?",
    a: "Yes. A minor can legally inherit asset through a Will or estate. However, under Section 11 of the Indian Contract Act, 1872, a minor cannot sign legal contracts. A child cannot operate bank accounts or sell real estate. A legal guardian or private trust must manage the assets until the child turns 18.",
  },
  {
    q: "What happens if both parents pass away without naming a guardian in a Will?",
    a: "If parents die without naming a guardian in a Will, relatives must go to court. They must file a petition under the Guardians and Wards Act, 1890. This court process takes 12 to 24 months. It often causes painful custody fights between maternal and paternal families.",
  },
  {
    q: "What is the key difference between a Will Guardian and a Will Trust?",
    a: "A Will guardian handles the daily personal care of the child until age 18. Yet a guardian cannot sell inherited asset without District Court approval. A Will trust holds the asset under chosen trustees. Trustees can release money right away for school or medical needs without court delays.",
  },
  {
    q: "Can a legal guardian sell an inherited house to pay for the child's overseas education?",
    a: "No. Under Section 8(2) of the Hindu Minority and Child Care Act, 1956, a guardian cannot sell or mortgage a minor's asset without prior court sanction. Getting this court permission often takes two to four years in Indian courts.",
  },
  {
    q: "Why is leaving a lump sum estate at age 18 risky for a child?",
    a: "Under Indian law, a child attains majority at age 18. With simple child care, the entire estate is handed over all at once at 18. Most 18-year-olds lack financial experience. They risk losing large sums to risky investments, peer pressure, or bad advice.",
  },
  {
    q: "What is Section 6 of the Married Women's Asset Act (MWP Act)?",
    a: "Section 6 of the MWP Act, 1874 allows a parent to buy a life insurance policy for the sole benefit of their spouse or children. The policy creates an instant legal trust. Creditors, lenders, and tax recovery officers cannot touch this money.",
  },
  {
    q: "How does a staggered payout schedule work in a Will Will Trust?",
    a: "A staggered schedule releases money in stages rather than all at once. For instance, 15% is released at age 18 for college admissions. Next, 25% is paid at age 21 for graduation. Then, 30% is released at age 25 for career setup. The remaining 30% is handed over at age 30.",
  },
  {
    q: "Can the Guardian and the Financial Trustee be two different people?",
    a: "Yes, and legal experts strongly recommend this separation. You can name one loving relative as personal guardian to raise your child. You can name an independent relative or professional as financial trustee to manage the money.",
  },
  {
    q: "Does a Will trust created inside a Will need immediate filing?",
    a: "No. A Will trust is written as a clause inside your Will. It does not exist during your lifetime. You do not need to register a trust deed or file trust tax returns while alive. The trust activates only after your demise.",
  },
  {
    q: "How are the assets and income of a minor's Will trust taxed in India?",
    a: "Under Section 161 of the Income Tax Act, 1961, trustees pay tax as agent assessees. When a trust is created by Will for minor children, income is taxed at the child's single progressive slab rates, not the maximum marginal rate.",
  },
];

export default function MinorChildTrustEstimatorClient() {
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
  const [copiedGuardianClause, setCopiedGuardianClause] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Tool Form State
  const [childCount, setChildCount] = useState<number>(1);
  const [eldestChildAge, setEldestChildAge] = useState<number>(5);
  const [childName, setChildName] = useState<string>("Aarav");

  // Financial Values (in INR)
  const [termInsuranceCover, setTermInsuranceCover] = useState<number>(25000000); // ₹2.50 Cr
  const [liquidInvestments, setLiquidInvestments] = useState<number>(6000000); // ₹60 Lakhs
  const [immovablePropertyVal, setImmovablePropertyVal] = useState<number>(14000000); // ₹1.40 Cr
  const [outstandingLiabilities, setOutstandingLiabilities] = useState<number>(3000000); // ₹30 Lakhs

  // Governance Preferences
  const [guardianName, setGuardianName] = useState<string>("Rohit Sharma (Maternal Uncle)");
  const [trusteeName, setTrusteeName] = useState<string>("Vikram Verma (Family Friend & CA)");

  // Staggered Payout Milestones (Percentages)
  const [payoutPreset, setPayoutPreset] = useState<"standard" | "education" | "delayed">("standard");
  const [age18Percent, setAge18Percent] = useState<number>(15);
  const [age21Percent, setAge21Percent] = useState<number>(25);
  const [age25Percent, setAge25Percent] = useState<number>(30);
  const [age30Percent, setAge30Percent] = useState<number>(30);

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

  const handlePresetChange = (preset: "standard" | "education" | "delayed") => {
    setPayoutPreset(preset);
    if (preset === "standard") {
      setAge18Percent(15);
      setAge21Percent(25);
      setAge25Percent(30);
      setAge30Percent(30);
    } else if (preset === "education") {
      setAge18Percent(25);
      setAge21Percent(35);
      setAge25Percent(25);
      setAge30Percent(15);
    } else if (preset === "delayed") {
      setAge18Percent(10);
      setAge21Percent(15);
      setAge25Percent(35);
      setAge30Percent(40);
    }
  };

  // Mathematical computations
  const grossEstate = termInsuranceCover + liquidInvestments + immovablePropertyVal;
  const netCorpus = Math.max(0, grossEstate - outstandingLiabilities);
  const yearsToMajority = Math.max(1, 18 - eldestChildAge);

  const netLiquidPool = Math.max(0, termInsuranceCover + liquidInvestments - outstandingLiabilities);
  const annualLiquidYield = Math.round(netLiquidPool * 0.065);
  const monthlyLivingBudget = Math.round(annualLiquidYield / 12);

  const tranche18Amount = Math.round((netCorpus * age18Percent) / 100);
  const tranche21Amount = Math.round((netCorpus * age21Percent) / 100);
  const tranche25Amount = Math.round((netCorpus * age25Percent) / 100);
  const tranche30Amount = Math.round((netCorpus * age30Percent) / 100);

  const formatINR = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return `₹${val.toLocaleString("en-IN")}`;
  };

  const generatedClauseText = useMemo(() => {
    const childLabel = childName || "my minor child";
    return `"TESTAMENTARY PRIVATE TRUST CLAUSE FOR MINOR BENEFICIARY

1. CREATION OF TESTAMENTARY TRUST:
I direct that all my estate, including death benefit proceeds from my Term Life Insurance Policies, liquid bank accounts, fixed deposits, mutual funds, demat equities, and my share in immovable properties (collectively referred to as the 'Trust Estate'), shall upon my demise immediately vest in my appointed Trustees, namely ${trusteeName}, to hold upon trust for the sole and absolute benefit of ${childLabel} (born [Date of Birth], currently aged approximately ${eldestChildAge} years) until they attain the age of 30 years, subject to the terms and stipulations hereinafter provided.

2. SEPARATION OF CUSTODY AND FINANCIAL MANAGEMENT:
I appoint ${guardianName} as the Testamentary Guardian of the person of my minor child under Section 9 of the Hindu Minority and Guardianship Act, 1956. The Trustees shall hold the legal title and financial control of the Trust Estate and shall disburse to the Testamentary Guardian such monthly maintenance allowance (currently estimated at approximately ${formatINR(monthlyLivingBudget)} per month) as may be reasonable and necessary for the child's boarding, lodging, health, medical treatment, and primary education.

3. DISBURSEMENT FOR EDUCATIONAL EMERGENCIES:
The Trustees are expressly empowered under the Indian Trusts Act, 1882 to pay tuition fees, coaching charges, overseas university admissions, and medical expenses directly to educational institutions or hospitals without requiring any prior sanction or approval from the District Court under Section 8 of the Hindu Minority and Guardianship Act, 1956 or Section 29 of the Guardians and Wards Act, 1890.

4. STAGGERED CAPITAL DISTRIBUTION MILESTONES:
The Trustees shall retain the principal corpus and disburse the corpus to ${childLabel} in the following staggered tranches upon attaining the specified ages:
  (a) At Age 18 Years: An amount equivalent to ${age18Percent}% of the net trust corpus (for undergraduate college entry and foundation expenses).
  (b) At Age 21 Years: An amount equivalent to ${age21Percent}% of the net trust corpus (for graduation, professional degree, or overseas study).
  (c) At Age 25 Years: An amount equivalent to ${age25Percent}% of the net trust corpus (for career establishment, business venture, or marriage).
  (d) At Age 30 Years: The remaining ${age30Percent}% of the net trust corpus along with all accrued accumulations, whereupon this Trust shall stand fully dissolved.

5. SPENDTHRIFT & CREDITOR PROTECTION CLAUSE:
No portion of the Trust Estate or income thereof shall be liable to anticipation, alienation, assignment, pledge, or attachment by any creditor of the beneficiary or the guardian, nor shall it be subject to any decree or order of execution of any civil court prior to actual disbursement by the Trustees."`;
  }, [
    childName,
    eldestChildAge,
    trusteeName,
    guardianName,
    monthlyLivingBudget,
    age18Percent,
    age21Percent,
    age25Percent,
    age30Percent,
  ]);

  const guardianClauseText = useMemo(() => {
    return `"APPOINTMENT OF TESTAMENTARY GUARDIAN & SUCCESSOR CLAUSE
(Pursuant to Section 9 of the Hindu Minority and Guardianship Act, 1956)

I nominate, constitute, and appoint [Full Name of Primary Guardian], residing at [Guardian Residential Address], [Relationship, e.g. Maternal Aunt / Brother], to be the Testamentary Guardian of the person and upbringing of my minor child/children, namely [Child Name], born on [Child DOB], in the unfortunate event of the demise of both myself and my spouse during the minority of our child.

In the event that the said [Primary Guardian] predeceases me, is unable, unwilling, or incapacitated to act as testamentary guardian, I nominate and appoint [Full Name of Alternate Guardian], residing at [Alternate Address], [Relationship, e.g. Paternal Grandfather / Sister], as the Alternate Successor Testamentary Guardian.

The Testamentary Guardian shall have full custody and care of my minor child's education, moral upbringing, and personal welfare, working in close cooperation with the Trustees named in this Will."`;
  }, []);

  const checklistText = useMemo(() => {
    return `10-POINT ESTATE PLANNING CHECKLIST FOR YOUNG INDIAN PARENTS:

1. Endorse All Term Insurance Policies under Section 6 of the MWP Act, 1874 (Irrevocable Trust for Spouse & Child).
2. Appoint a Primary and Alternate Testamentary Guardian under Section 9 of HMGA 1956 in a Registered Will.
3. Segregate Roles: Designate a Personal Custodian Guardian and an Independent Financial Trustee.
4. Insert a Comprehensive Testamentary Trust Clause into your Will with Staggered Payout Milestones (18, 21, 25, 30).
5. Specify Emergency Powers for Trustees to Pay School, College, and Hospital Bills Directly.
6. Verify and Update Bank & Demat Nominations to Align with Will Testamentary Clauses.
7. Document a Master Asset Inventory Dossier (Red File) with Account Numbers, Folios, and Policy Details.
8. Store Physical Registered Will Copies with Trusted Advisors and Digital Scans in Secure Vaults.
9. Avoid Informal Verbal Custody Arrangements that Require 2-Year Court Battles Under Guardians and Wards Act.
10. Review Estate Plan Every 3 Years or Upon Major Milestones (New Child, Real Estate Purchase, Relocation).`;
  }, []);

  const copyClauseToClipboard = () => {
    navigator.clipboard.writeText(generatedClauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyGuardianClauseToClipboard = () => {
    navigator.clipboard.writeText(guardianClauseText);
    setCopiedGuardianClause(true);
    setTimeout(() => setCopiedGuardianClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    navigator.clipboard.writeText(checklistText);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378]/15 selection:text-[#C65378]">
      {/* LAYER 1: HERO SECTION */}
      <section className="relative bg-[#172228] text-white pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#C65378]/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-48 -left-20 w-80 h-80 rounded-full bg-[#5F7E75]/20 blur-3xl"
        />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold uppercase tracking-widest text-rose-200 mb-6 backdrop-blur-md">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>HMGA 1956 (S. 6 &amp; 9) • INDIAN TRUSTS ACT, 1882 • MWP ACT, 1874</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Minor Child Estate: Trust vs Child Care Tool
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Compare legal child care against private Will trusts in India. Protect your
            children from Section 8 court asset lockups. Model staggered payouts at ages 18, 21, 25,
            and 30, and generate protective Will clauses today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-estimator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Launch Estate Estimator</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Child Protective Will</span>
            </button>
          </div>
        </div>
      </section>

      {/* LAYER 2: STATS STRIP */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 9 HMGA</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                TESTAMENTARY GUARDIAN RIGHTS
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Indian Trusts Act</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                STAGGERED PAYOUT TRUSTS
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sec 6 MWP Act</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CREDITOR-PROOF INSURANCE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Age 18 vs 25</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CORPUS DISSIPATION SHIELD
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LAYER 3: THREE-COLUMN GRID */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)_300px] xl:grid-cols-[270px_minmax(0,1fr)_320px] 2xl:grid-cols-[290px_minmax(0,1fr)_340px] gap-6 xl:gap-8 items-start">
          {/* LEFT COLUMN: TOC */}
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

            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#172228]">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>Legal Office</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Sections 6 and 9 of HMGA 1956, Guardians and Wards Act 1890,
                Indian Trusts Act 1882, and Section 6 of MWP Act 1874.
              </p>
            </div>
          </aside>

          {/* MIDDLE COLUMN */}
          <main className="space-y-10 min-w-0">
            {/* IMAGE SHOWCASE */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-4 sm:p-6 space-y-4">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-100 shadow-inner">
                <Image
                  src="/images/minor-child-trust-vs-guardianship-estimator-og.jpg"
                  alt="Minor Child Trust vs Guardianship Estimator and Inheritance Rules Guide India"
                  width={1200} height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-slate-600 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                  <span className="font-semibold text-slate-800">
                    WillDrafting Advisory: Protecting Minor Children in Indian Succession
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 font-medium text-[#C65378]">
                  <span>HMGA 1956 • Indian Trusts Act 1882</span>
                </div>
              </div>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LEGAL FRAMEWORK IN INDIA</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Foundation: Minor Child Estate in India
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 space-y-4 shadow-xs text-sm text-slate-700 leading-relaxed">
                <p>
                  In India, anyone under 18 is a minor. A minor can legally inherit asset through a Will.
                  However, a minor cannot sign legal contracts. This rule is set by Section 11 of the Indian
                  Contract Act, 1872.
                </p>
                <p>
                  This rule creates a big fight if both parents pass away. A minor child cannot manage
                  stock portfolios. A minor cannot run bank accounts. A child cannot sell a home either.
                  As a result, Indian law requires legal representation. Parents can choose court child care
                  or a private Will trust.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-[#C65378]" />
                      <span>Natural Guardians (Section 6, HMGA)</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Both parents are natural guardians of a Hindu minor. If both parents demise, natural
                      child care ends at once.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-[#5F7E75]" />
                      <span>Will Guardians (Section 9, HMGA)</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Either parent may name a guardian in a Will. The appointee acts as guardian after both
                      parents pass away.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: THE GUARDIAN TRAP */}
            <section id="court-guardianship-dilemma" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-700">
                <AlertTriangle className="w-4 h-4" />
                <span>CRITICAL LEGAL PITFALL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. The Guardian Trap: Section 8 HMGA &amp; Court Lockups
              </h3>
              <div className="bg-white rounded-2xl border border-rose-200/80 p-5 sm:p-6 space-y-4 shadow-xs text-sm text-slate-700 leading-relaxed">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-50/70 border border-rose-200 text-rose-900 text-xs sm:text-sm">
                  <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Why Simply Appointing a Guardian in a Will is Not Enough:</strong> Under Section
                    8(2) of the Hindu Minority and Child Care Act, 1956, a guardian cannot sell, mortgage,
                    or gift any land or flat without previous court permission.
                  </div>
                </div>

                <p>
                  Many young parents think naming a guardian in a Will is enough. In reality, the guardian
                  faces serious legal delays in court:
                </p>

                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
                  <li>
                    <strong>Long Court Delays:</strong> Under Section 29 of the Guardians and Wards Act,
                    1890, selling a flat requires a court order. These court hearings often take two to four
                    years.
                  </li>
                  <li>
                    <strong>Needed Surety Bonds:</strong> Courts often ask the guardian to give personal
                    asset sureties. The guardian must also file audited spending accounts each year.
                  </li>
                  <li>
                    <strong>Lump Sum at Age 18:</strong> Child Care ends automatically at age 18. The whole
                    corpus is handed over in one single lump sum. Most 18-year-olds cannot manage crores of
                    rupees safely.
                  </li>
                </ul>

                <p>
                  A <strong>Will Private Trust</strong> avoids Section 8 court permission completely.
                  Your chosen trustees hold legal title. They can pay school and medical fees right away.
                </p>
              </div>
            </section>

            {/* SECTION 3: INTERACTIVE ESTIMATOR */}
            <section id="interactive-estimator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                    <Calculator className="w-4 h-4" />
                    <span>INTERACTIVE DIAGNOSTIC ENGINE</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                    3. Minor Child Trust vs Child Care Free Tool
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Report</span>
                </button>
              </div>

              {/* Calculator Main Box */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden">
                <div className="bg-slate-900 text-white p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold text-white">
                        Estate Liquidity &amp; Staggered Payout Simulator
                      </h3>
                      <p className="text-xs text-slate-300">
                        Model your family term cover, liquid portfolios, and milestone protection tranches
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-rose-200">
                      <span>Net Distributable: {formatINR(netCorpus)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-8 space-y-8">
                  {/* STEP 1: CHILD PROFILE */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                      <Baby className="w-4 h-4 text-[#C65378]" />
                      <span>1. Child Profile &amp; Majority Horizon</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Child&rsquo;s Name / Identifier</label>
                        <input
                          type="text"
                          value={childName}
                          onChange={(e) => setChildName(e.target.value)}
                          placeholder="e.g. Aarav"
                          className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#C65378] focus:ring-2 focus:ring-[#C65378]/15"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Number of Minor Children</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[1, 2, 3].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => setChildCount(num)}
                              className={`py-2 text-xs font-extrabold rounded-xl border transition-colors ${
                                childCount === num
                                  ? "bg-[#C65378] text-white border-[#C65378]"
                                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              {num} {num === 1 ? "Child" : "Children"}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span>Eldest Child Age</span>
                          <span className="text-[#C65378]">{eldestChildAge} Years ({yearsToMajority} yrs to 18)</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="17"
                          value={eldestChildAge}
                          onChange={(e) => setEldestChildAge(Number(e.target.value))}
                          className="w-full accent-[#C65378] cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                          <span>Infant (0)</span>
                          <span>Age 8</span>
                          <span>Age 17</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* STEP 2: ESTATE VALUES */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                      <Coins className="w-4 h-4 text-[#C65378]" />
                      <span>2. Family Net Worth &amp; Term Insurance Pool</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                          <span>Term Life Insurance</span>
                          <span className="text-[#C65378] font-black">{formatINR(termInsuranceCover)}</span>
                        </div>
                        <input
                          type="range"
                          min="5000000"
                          max="100000000"
                          step="2500000"
                          value={termInsuranceCover}
                          onChange={(e) => setTermInsuranceCover(Number(e.target.value))}
                          className="w-full accent-[#C65378] cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                          <span>₹50 Lakh</span>
                          <span>₹5 Cr</span>
                          <span>₹10 Cr</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                          <span>Liquid Investments</span>
                          <span className="text-slate-900 font-black">{formatINR(liquidInvestments)}</span>
                        </div>
                        <input
                          type="range"
                          min="500000"
                          max="50000000"
                          step="1000000"
                          value={liquidInvestments}
                          onChange={(e) => setLiquidInvestments(Number(e.target.value))}
                          className="w-full accent-[#C65378] cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                          <span>₹5 Lakh</span>
                          <span>₹2.5 Cr</span>
                          <span>₹5 Cr</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                          <span>Real Estate (House/Flat)</span>
                          <span className="text-slate-900 font-black">{formatINR(immovablePropertyVal)}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="50000000"
                          step="2500000"
                          value={immovablePropertyVal}
                          onChange={(e) => setImmovablePropertyVal(Number(e.target.value))}
                          className="w-full accent-[#C65378] cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                          <span>₹0</span>
                          <span>₹2.5 Cr</span>
                          <span>₹5 Cr</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                          <span>Debts &amp; Home Loans</span>
                          <span className="text-rose-600 font-black">-{formatINR(outstandingLiabilities)}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="20000000"
                          step="1000000"
                          value={outstandingLiabilities}
                          onChange={(e) => setOutstandingLiabilities(Number(e.target.value))}
                          className="w-full accent-rose-600 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                          <span>₹0</span>
                          <span>₹1 Cr</span>
                          <span>₹2 Cr</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* STEP 3: MILESTONE SCHEDULE */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                        <Clock className="w-4 h-4 text-[#C65378]" />
                        <span>3. Staggered Capital Split Schedule</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handlePresetChange("standard")}
                          className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-colors ${
                            payoutPreset === "standard"
                              ? "bg-[#C65378] text-white border-[#C65378]"
                              : "bg-slate-50 text-slate-600 border-slate-200"
                          }`}
                        >
                          Standard (15-25-30-30)
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePresetChange("education")}
                          className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-colors ${
                            payoutPreset === "education"
                              ? "bg-[#C65378] text-white border-[#C65378]"
                              : "bg-slate-50 text-slate-600 border-slate-200"
                          }`}
                        >
                          Education Heavy
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePresetChange("delayed")}
                          className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-colors ${
                            payoutPreset === "delayed"
                              ? "bg-[#C65378] text-white border-[#C65378]"
                              : "bg-slate-50 text-slate-600 border-slate-200"
                          }`}
                        >
                          Delayed Maturity
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center space-y-1 shadow-2xs">
                        <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Age 18 Milestone</div>
                        <div className="text-xl sm:text-2xl font-black text-slate-900">{age18Percent}%</div>
                        <div className="text-xs font-bold text-[#C65378]">{formatINR(tranche18Amount)}</div>
                        <div className="text-[10px] text-slate-500">College Admission Tranche</div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center space-y-1 shadow-2xs">
                        <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Age 21 Milestone</div>
                        <div className="text-xl sm:text-2xl font-black text-slate-900">{age21Percent}%</div>
                        <div className="text-xs font-bold text-[#C65378]">{formatINR(tranche21Amount)}</div>
                        <div className="text-[10px] text-slate-500">Graduation &amp; Masters Tranche</div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center space-y-1 shadow-2xs">
                        <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Age 25 Milestone</div>
                        <div className="text-xl sm:text-2xl font-black text-slate-900">{age25Percent}%</div>
                        <div className="text-xs font-bold text-[#C65378]">{formatINR(tranche25Amount)}</div>
                        <div className="text-[10px] text-slate-500">Career / Housing Tranche</div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center space-y-1 shadow-2xs">
                        <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Age 30 Milestone</div>
                        <div className="text-xl sm:text-2xl font-black text-slate-900">{age30Percent}%</div>
                        <div className="text-xs font-bold text-[#C65378]">{formatINR(tranche30Amount)}</div>
                        <div className="text-[10px] text-slate-500">Final Corpus Dissolution</div>
                      </div>
                    </div>
                  </div>

                  {/* DIAGNOSTIC RESULTS */}
                  <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-900 via-[#172228] to-slate-900 text-white space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>DIAGNOSTIC ARCHITECTURE RESULT</span>
                        </div>
                        <div className="text-lg sm:text-xl font-black text-white">
                          Recommended: Two-Tier Will Trust with Segregated Governance
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-[10px] uppercase font-bold text-slate-400">Total Net Estate</div>
                        <div className="text-2xl font-black text-rose-300">{formatINR(netCorpus)}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                        <div className="text-[11px] font-bold text-slate-300">Court Sanction Risk</div>
                        <div className="text-xl font-black text-emerald-400">0% With Trust</div>
                        <div className="text-[11px] text-slate-400 leading-snug">
                          Avoids 2-year Section 8 HMGA District Court delays to sell asset.
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                        <div className="text-[11px] font-bold text-slate-300">Estimated Monthly Maintenance</div>
                        <div className="text-xl font-black text-rose-300">~{formatINR(monthlyLivingBudget)}/mo</div>
                        <div className="text-[11px] text-slate-400 leading-snug">
                          Safe 6.5% interest yield to pay school fees without touching principal.
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                        <div className="text-[11px] font-bold text-slate-300">Corpus Protection Factor</div>
                        <div className="text-xl font-black text-emerald-400">4 Staggered Steps</div>
                        <div className="text-[11px] text-slate-400 leading-snug">
                          Prevents reckless lump-sum dissipation at age 18.
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
                      <div className="text-xs text-slate-300">
                        Ready to safeguard your child with legally checked clauses?
                      </div>
                      <button
                        onClick={handleStartDraft}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Draft Protective Will Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: COMPARATIVE MATRIX */}
            <section id="trust-vs-guardianship-comparison" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>STRUCTURED COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Comparative Matrix: Guardian vs Will Trust
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white font-black border-b border-slate-800">
                        <th className="p-3.5 sm:p-4">Key Legal Feature</th>
                        <th className="p-3.5 sm:p-4">Court-Appointed Guardian (GWA 1890)</th>
                        <th className="p-3.5 sm:p-4">Will Guardian (HMGA s. 9)</th>
                        <th className="p-3.5 sm:p-4 bg-[#C65378] text-white">Will Trust (Indian Trusts Act)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="hover:bg-slate-50/70">
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Creation Method</td>
                        <td className="p-3.5 sm:p-4">District Court petition upon death</td>
                        <td className="p-3.5 sm:p-4">Appointed directly inside a Will</td>
                        <td className="p-3.5 sm:p-4 font-semibold text-[#C65378]">Specific Trust clause inside a Will</td>
                      </tr>
                      <tr className="hover:bg-slate-50/70">
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Sale of Land Asset</td>
                        <td className="p-3.5 sm:p-4 text-rose-700 font-semibold">Strict court permission required</td>
                        <td className="p-3.5 sm:p-4 text-rose-700 font-semibold">Strict court permission (Section 8)</td>
                        <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">Trustees can sell without court sanction</td>
                      </tr>
                      <tr className="hover:bg-slate-50/70">
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Access to Funds for Education</td>
                        <td className="p-3.5 sm:p-4">Requires court motions &amp; bills</td>
                        <td className="p-3.5 sm:p-4">Limited to liquid bank funds</td>
                        <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">Instant direct disbursement by Trustees</td>
                      </tr>
                      <tr className="hover:bg-slate-50/70">
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Age When Child Gets Full Corpus</td>
                        <td className="p-3.5 sm:p-4">Age 18 (lump sum handover)</td>
                        <td className="p-3.5 sm:p-4">Age 18 (lump sum handover)</td>
                        <td className="p-3.5 sm:p-4 font-semibold text-[#C65378]">Staggered (e.g. 18, 21, 25, 30 years)</td>
                      </tr>
                      <tr className="hover:bg-slate-50/70">
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Creditor &amp; Business Protection</td>
                        <td className="p-3.5 sm:p-4">None; vulnerable to claims</td>
                        <td className="p-3.5 sm:p-4">None; part of gross estate</td>
                        <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">Spendthrift shield against creditors</td>
                      </tr>
                      <tr className="hover:bg-slate-50/70">
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900">Time to Activate Upon Death</td>
                        <td className="p-3.5 sm:p-4 text-rose-700">12 to 24 months in court</td>
                        <td className="p-3.5 sm:p-4">Immediate custody</td>
                        <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">Immediate upon Will signing</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 5: MWP ACT INSURANCE TRUST */}
            <section id="mwp-act-insurance-trust" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>IRREVOCABLE STATUTORY PROTECTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Section 6 MWP Act: Protecting Term Insurance Payouts
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 space-y-4 shadow-xs text-sm text-slate-700 leading-relaxed">
                <p>
                  Many young parents hold 1 Crore to 5 Crore in term life insurance. Yet standard nominations
                  do not give beneficial ownership. Business debts or personal loans can also eat up insurance
                  money before it reaches your child.
                </p>

                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-xs sm:text-sm space-y-2">
                  <div className="font-bold flex items-center gap-2 text-emerald-800">
                    <Lock className="w-4 h-4 text-emerald-600" />
                    <span>The Married Women&rsquo;s Asset Act (MWP Act), 1874 – Section 6 Endorsement</span>
                  </div>
                  <p className="leading-relaxed">
                    Section 6 of the MWP Act solves this issue. When you buy a life policy under the MWP Act
                    for your spouse or children, it forms an immediate trust.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="font-bold text-xs text-slate-900">Complete Immunity from Creditors</div>
                    <p className="text-xs text-slate-600">
                      Creditors cannot touch MWP Act insurance proceeds. Court orders and tax dues cannot
                      touch this money either.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="font-bold text-xs text-slate-900">Direct Pay to Named Trustees</div>
                    <p className="text-xs text-slate-600">
                      The insurer pays claim funds directly to your named trustees. Trustees receive the money
                      without waiting for court probate.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: MILESTONE ARCHITECTURE */}
            <section id="staggered-milestone-architecture" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>FINANCIAL MATURITY TIMELINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Milestone Architecture: Staggered Payout Schedules
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 space-y-4 shadow-xs text-sm text-slate-700 leading-relaxed">
                <p>
                  Handing a multi-crore estate to an 18-year-old child brings big risks. Many young heirs
                  spend inheritances too fast on luxury items or bad ventures.
                </p>

                <p>
                  A 4-tier milestone structure protects family wealth while teaching financial responsibility:
                </p>

                <div className="space-y-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-slate-50 border-l-4 border-l-[#C65378] border border-slate-200 space-y-1">
                    <div className="font-bold text-xs text-slate-900">Milestone 1 (Age 18): Higher Education Foundation (15%)</div>
                    <p className="text-xs text-slate-600">
                      This tranche covers undergraduate college tuition, books, and student housing.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border-l-4 border-l-[#5F7E75] border border-slate-200 space-y-1">
                    <div className="font-bold text-xs text-slate-900">Milestone 2 (Age 21): Graduation &amp; Overseas Study (25%)</div>
                    <p className="text-xs text-slate-600">
                      This tranche funds graduation degrees, overseas master programs, or professional setups.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border-l-4 border-l-amber-600 border border-slate-200 space-y-1">
                    <div className="font-bold text-xs text-slate-900">Milestone 3 (Age 25): Career Capital &amp; Independence (30%)</div>
                    <p className="text-xs text-slate-600">
                      This capital helps your child start a business venture, make a home down-payment, or marry.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border-l-4 border-l-emerald-600 border border-slate-200 space-y-1">
                    <div className="font-bold text-xs text-slate-900">Milestone 4 (Age 30): Complete Principal Handover (30%)</div>
                    <p className="text-xs text-slate-600">
                      Final handover of real estate titles and remaining corpus once your child is mature.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: TRUSTEE & GUARDIAN SELECTION */}
            <section id="selecting-guardians-trustees" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>GOVERNANCE &amp; CHECKS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Trustee &amp; Guardian Selection: Segregated Governance
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 space-y-4 shadow-xs text-sm text-slate-700 leading-relaxed">
                <p>
                  Do not name the same person as both guardian and sole trustee. Splitting these two roles
                  adds vital safety checks.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-[#C65378]" />
                      <span>Role A: Custodial Guardian</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                      <li>Handles daily personal care, affection, and home life.</li>
                      <li>Makes schooling, medical, and moral upbringing choices.</li>
                      <li>Receives a monthly maintenance stipend from trustees.</li>
                      <li>Best for: Loving maternal or paternal aunts, uncles, or grandparents.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      <Scale className="w-4 h-4 text-[#5F7E75]" />
                      <span>Role B: Financial Trustee</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                      <li>Controls bank accounts, mutual funds, and asset deeds.</li>
                      <li>Reviews fee slips and medical bills before releasing capital.</li>
                      <li>Maintains clean accounts and enforces milestone payout steps.</li>
                      <li>Best for: Financially skilled sibling, chartered accountant, or trust firm.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: REAL SCENARIOS */}
            <section id="real-life-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>CASE STUDIES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Real Scenarios: Young Parents, NRIs &amp; Single Heirs
              </h3>
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-sm text-slate-900">
                      Scenario 1: Bengaluru IT Couple with ₹3 Cr Term Cover &amp; Daughter Aged 4
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378]">
                      Common Accident Protection
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Fight:</strong> Both parents travel frequently on flights. They worried that
                    if both passed away, paternal and maternal relatives would fight over the ₹3 Crore insurance
                    payout in court.
                  </p>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong>Solution:</strong> They drafted mirror Wills with a Section 9 Will Guardian
                    clause naming the mother&rsquo;s sister for custody. They established a Will Trust
                    with the father&rsquo;s brother and a CA as joint financial trustees. Funds are staggered at
                    ages 18, 21, 25, and 30.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-sm text-slate-900">
                      Scenario 2: Single Mother in Mumbai with Inherited Flat &amp; Son Aged 11
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800">
                      Section 8 Court Shield
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Fight:</strong> She owned a 2BHK flat worth ₹1.8 Crore and ₹40 Lakh in mutual funds.
                    Under no-Will rules, her ex-husband could claim natural child care upon her death and seek
                    to control the flat.
                  </p>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong>Solution:</strong> She signed a filed Will appointing her own brother as
                    Will guardian and creating a private trust clause. The clause explicitly gave the
                    trustee power to lease the flat or sell it to fund her son&rsquo;s higher education without
                    court interference.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-sm text-slate-900">
                      Scenario 3: NRI Parents in Dubai with Assets in Delhi &amp; Minor Children
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800">
                      Cross-Border Structuring
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Fight:</strong> The family held Indian bank accounts and an apartment in Delhi.
                    UAE local courts might freeze UAE accounts under local rules, while Indian assets required
                    Indian probate.
                  </p>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong>Solution:</strong> They created dual, non-conflicting Wills: a DIFC Will for UAE
                    assets and an Indian Testamentary Trust Will for Indian properties, appointing Indian resident
                    trustees to prevent Section 195 NRI withholding tax delays.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-protection-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>PRACTICAL IMPLEMENTATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Setting Up Child Protection Trusts
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <strong>Audit Total Family Assets &amp; Term Covers:</strong> Calculate aggregate net worth,
                      including employer group covers, personal term policies, demat shares, EPF, and real estate.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong>Endorse Term Policies under Section 6 of MWP Act:</strong> When taking or reviewing
                      term policies, submit MWP Form Addendum to make proceeds creditor-proof.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong>Select Segregated Guardians &amp; Trustees:</strong> Obtain verbal consent from your
                      chosen personal guardian and your financial trustees. Name alternate successors for both.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      4
                    </span>
                    <div>
                      <strong>Draft a Will with an Express Will Trust Clause:</strong> Include milestone
                      ages (18, 21, 25, 30), monthly maintenance guidelines, and spendthrift creditor protections.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      5
                    </span>
                    <div>
                      <strong>Execute and Register the Will at the SRO office:</strong> While filing
                      is a choice under Section 18 of the Filing Act, registering a minor child protection Will
                      strongly deters frivolous family fights.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      6
                    </span>
                    <div>
                      <strong>Create a Family Emergency Dossier (Red File):</strong> Maintain a list of policy
                      numbers, bank accounts, and trustee contacts in a secure physical and digital vault.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: AUTO-GENERATED WILL CLAUSES */}
            <section id="auto-generated-will-clauses" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>LEGAL DRAFTING ASSETS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Copy-Paste Will Trust Clauses &amp; Recitals
              </h3>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Customized Will Trust Clause for Minor Child (Indian Trusts Act, 1882)
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
                        <span>Copy Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-500">
                  Dynamically customized with your child&rsquo;s details ({childName || "Child"}, {eldestChildAge} yrs),
                  chosen trustee ({trusteeName}), guardian ({guardianName}), and milestone tranches ({age18Percent}%, {age21Percent}%, {age25Percent}%, {age30Percent}%).
                </p>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
                  {generatedClauseText}
                </pre>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Section 9 HMGA Will Guardian &amp; Alternate Successor Clause
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
                        <span>Copy Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
                  {guardianClauseText}
                </pre>
              </div>
            </section>

            {/* SECTION 11: YOUNG PARENTS CHECKLIST */}
            <section id="young-parents-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ACTION CHECKLIST</span>
                </div>
                <button
                  type="button"
                  onClick={copyChecklistToClipboard}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors shadow-2xs"
                >
                  {copiedChecklist ? (
                    <>
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied Checklist!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy 10-Point Checklist</span>
                    </>
                  )}
                </button>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. 10-Point Estate Planning Checklist for Young Parents
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Endorse term insurance policies under Section 6 of MWP Act.</span>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Appoint primary &amp; alternate Will guardians in a filed Will.</span>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Segregate physical guardian from independent financial trustees.</span>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Establish staggered milestone payout tranches (ages 18, 21, 25, 30).</span>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Grant express emergency powers for school fees and hospital bills.</span>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Align bank and mutual fund nominations with Will trust clauses.</span>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Build an emergency asset inventory dossier (Red File) with folios.</span>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Store physical filed Will copies safely with trusted lawyers.</span>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Avoid informal verbal arrangements that force 2-year court battles.</span>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Review estate papers every 3 years or upon new child birth.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-advocacy-bench" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Institutional Profile: Legal Excellence &amp; Trust
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Family Trust &amp; Estate Practice
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Checked Bench</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is India&rsquo;s premier estate planning and estate technology platform,
                  powered by AMA Legal Solutions. Our multidisciplinary Will bench structures
                  customized family protection trusts, Will child care clauses, and Section 6 MWP Act
                  insurance policies. We have advised over 15,000 Indian families and NRIs on fight-free asset
                  transfer and minor protection.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/private-family-trust-formation"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Private Family Trust Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/estate-net-worth-asset-inventory-builder"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Family Asset Red File Vault</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/succession-calculator"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Legal Heir Share Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>DIRECT ANSWERS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: Minor Child Estate
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Plain-English answers to critical legal questions regarding minor child estate,
                child care lockups, and Will trusts in India:
              </p>

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

            {/* SECTION 14: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>PRIMARY LEGAL SOURCES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Governing Acts, Sections &amp; Official Judicial Portals
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 text-xs text-slate-700 shadow-xs">
                <div>
                  <div className="font-extrabold text-slate-900 mb-1">
                    Primary Legal Offices &amp; Landmark Precedents:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      <strong>Hindu Minority and Child Care Act, 1956:</strong> Section 6 (Natural Guardians)
                      and Section 9 (Will Guardians and their powers).
                    </li>
                    <li>
                      <strong>Hindu Minority and Child Care Act, 1956:</strong> Section 8 (Restrictions on
                      disposal of minor&rsquo;s land asset without court permission).
                    </li>
                    <li>
                      <strong>Guardians and Wards Act, 1890:</strong> Section 29 (Limitation of powers of
                      guardian appointed or declared by the Court).
                    </li>
                    <li>
                      <strong>Indian Trusts Act, 1882:</strong> Creation of private trusts by Will, duties of
                      trustees, and signing of protective trusts.
                    </li>
                    <li>
                      <strong>Married Women&rsquo;s Asset Act, 1874:</strong> Section 6 (Insurance policy
                      effected for benefit of wife and children).
                    </li>
                    <li>
                      <strong>Supreme Court Landmark:</strong> <em>Smt. Sarbati Devi v. Smt. Usha Devi (1984)</em>{" "}
                      confirming nominees hold assets only as receivers for legal heirs.
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-3">
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Central Acts</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://services.ecourts.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>eCourts Services Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Supreme Court of India</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Tools &amp; Legal Guides
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/services/private-family-trust-formation"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Private Family Trust Formation
                    </Link>
                    <Link
                      href="/tools/estate-net-worth-asset-inventory-builder"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Family Asset Inventory Vault
                    </Link>
                    <Link
                      href="/tools/probate-checker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Probate Rule Checker
                    </Link>
                    <Link
                      href="/tools/will-checklist"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Will Paper Checklist
                    </Link>
                    <Link
                      href="/templates/will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Indian Legal Will Template
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">Why Write a Will Now?</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                A clear Will keeps your spouse and kids safe. It stops long court fights. You pick who gets your house, land, shop, gold, and bank cash. Do not wait to put your plan in writing.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">Simple Plain Paper Rules</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                You can write a Will on plain white paper. No stamp paper is needed in India. Sign it in front of two adult witnesses. Each witness signs in your view to make it valid.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our team checks your asset list and tax bills. We write your Will in clear words with no mix-ups. Then we guide you step by step so your heirs get their share fast.
              </p>
            </div>
          </div>

      </main>

          {/* RIGHT COLUMN: STICKY SIDEBAR */}
          <aside className="space-y-6 sticky top-24">
            {/* CARD 1: AUTHOR BIO CARD (No phone number!) */}
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
                Expert in Indian testamentary jurisprudence, High Court child care petitions,
                Section 9 HMGA Will appointments, and private family trust structures for minors.
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
              {/* CARD 2: DUAL CTA 1 - WILL DRAFTING (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>PREVENT COURT GUARDIANSHIP LOCKUPS</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Child from Lengthy Court Battles
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A legally drafted Will appoints trusted guardians and establishes a private
                  Will trust, ensuring immediate access to funds without 2-year court delays.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Protective Will in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Reviewed &amp; Stamp Duty Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card - No phone number!) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>PRIVATE TRUST PRACTICE</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Structuring Large Estates or Special Needs Trusts?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our estate lawyers assist families with bespoke private family trusts, corporate
                  trustee appointments, and cross-border NRI asset protection.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <span>Schedule Lawyer Talk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
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
                      <strong>Section 9 Protection:</strong> Pre-empts messy contested family child care petitions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Staggered Payouts:</strong> Prevents premature dissipation of large inheritances at 18.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>MWP Act Integration:</strong> Shields term life insurance from business debts and court attachment.
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
          href="#interactive-estimator"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Trust Estimator</span>
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
