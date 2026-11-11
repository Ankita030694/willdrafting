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
  Globe,
  Briefcase,
  Coins,
  Stamp,
  Mail,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Legal Foundation: Labor Law & ISA 1925" },
  { id: "interactive-finder", label: "2. Free KSA Death Benefit Claim Calculator" },
  { id: "articles-84-88-eosb", label: "3. Articles 84-88: Mandatory EOSB Rules" },
  { id: "diya-blood-money", label: "4. Diya Compensation: Sharia Blood Money" },
  { id: "frozen-bank-accounts", label: "5. Saudi Bank Accounts: No Nominee Reality" },
  { id: "attestation-pipeline", label: "6. Sovereign 5-Stage Attestation Pipeline" },
  { id: "comparison-table", label: "7. Legal Comparison: EOSB vs Diya vs GOSI" },
  { id: "step-by-step-sop", label: "8. Step-by-Step SOP: Claiming from India" },
  { id: "practical-case-studies", label: "9. Practical Case Studies: Riyadh & Jeddah" },
  { id: "legal-recital-templates", label: "10. Legal Recital Templates: Arabic PoA" },
  { id: "institutional-profile", label: "11. Institutional Profile: Cross-Border Desk" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions: KSA Claims" },
  { id: "statutory-citations", label: "13. Consular Portals & Sovereign Authorities" },
];

const FAQS = [
  {
    q: "How can Indian legal heirs claim Saudi End of Service Benefits (EOSB)?",
    a: "Under Articles 84-88 of Saudi Labor Law (Royal Decree M/51), full End of Service Gratuity is 100% payable upon worker demise. Indian legal heirs must secure a Legal Heir Certificate in India, authenticate it through the State Home Department, MEA New Delhi, and the Saudi Embassy, and grant a Power of Attorney (Wakkala) to a trusted representative or the Indian Embassy in Riyadh/Jeddah to submit the formal claim to the Ministry of Human Resources.",
  },
  {
    q: "Can our family in India claim Diya (blood money) for accidental death in Saudi Arabia?",
    a: "Yes. In cases of fatal road traffic accidents or employer negligence, Sharia courts in Saudi Arabia award Diya (blood money). The standard benchmark for unintentional accidental death is SAR 300,000. Indian heirs must file a Power of Attorney authorizing the Indian Embassy or a Saudi lawyer to represent them before the Traffic Court (Muroor) and General Court.",
  },
  {
    q: "Does a nominee on a Saudi bank account receive the funds directly?",
    a: "No. Saudi banking regulations governed by SAMA (Saudi Central Bank) do not recognize Indian bank nominee nominations or foreign Will executors directly. The deceased expat's account is frozen immediately. Funds are only released through a Sharia Court inheritance distribution order or via a consular-attested Power of Attorney.",
  },
  {
    q: "How is Saudi End of Service Gratuity calculated upon death?",
    a: "Under Article 84, EOSB is calculated as 15 days of last basic wage plus allowances per year for the first 5 years of service, and 30 days of wage per year for every year thereafter. Under Article 87, death entitles heirs to 100% full gratuity without any resignation penalty deductions.",
  },
  {
    q: "What is the 5-stage attestation pipeline for Indian succession documents in KSA?",
    a: "The five mandatory stages are: (1) Local Revenue Authority / Civil Court in India for Legal Heir Certificate, (2) State Home Department / GAD / NORKA attestation, (3) Ministry of External Affairs (MEA) CPV Division in New Delhi, (4) Royal Embassy of Saudi Arabia in New Delhi or Consulate in Mumbai, and (5) Ministry of Foreign Affairs (MOFA) Tasdeeq in Saudi Arabia accompanied by certified Arabic translation.",
  },
  {
    q: "Who can represent an Indian family in Saudi Arabia if they cannot travel?",
    a: "Indian families can appoint either: (1) A trusted blood relative or colleague residing in Saudi Arabia holding a valid Iqama, (2) The Community Welfare / Labour Wing of the Indian Embassy in Riyadh or Consulate General in Jeddah, or (3) A licensed Saudi advocate through an attested Power of Attorney.",
  },
  {
    q: "What happens if the Saudi employer refuses to pay End of Service gratuity?",
    a: "If an employer fails to settle dues within one week of death under Article 88, the appointed representative or Indian Embassy can file a formal labor dispute via the Qiwa portal and escalate it to the Saudi Labor Court. The Labor Court can issue enforcement orders, freeze employer bank accounts, and attach company assets.",
  },
  {
    q: "Are funds claimed from Saudi Arabia taxable upon repatriation to India?",
    a: "No. Under Section 56(2)(x) of the Indian Income Tax Act 1961, money received by legal heirs through inheritance, death gratuity, or court compensation is completely exempt from income tax in India. Families must maintain the MOFA-attested paperwork and foreign inward remittance certificate (FIRC).",
  },
];

export default function SaudiGratuityClaimClient() {
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
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Diagnostic Wizard State
  const [serviceYears, setServiceYears] = useState<number>(6);
  const [monthlyWageSar, setMonthlyWageSar] = useState<number>(6000);
  const [demiseCause, setDemiseCause] = useState<
    "natural" | "traffic_accident" | "workplace_hazard" | "homicide"
  >("traffic_accident");
  const [unclaimedAssets, setUnclaimedAssets] = useState<
    "eosb_only" | "bank_funds" | "full_estate"
  >("full_estate");
  const [docReadiness, setDocReadiness] = useState<
    "stage1_death_cert" | "stage2_legal_heir" | "stage3_mea_attested"
  >("stage2_legal_heir");
  const [representationType, setRepresentationType] = useState<
    "relative_iqama" | "embassy_madad" | "saudi_advocate" | "none"
  >("relative_iqama");

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
    setServiceYears(6);
    setMonthlyWageSar(6000);
    setDemiseCause("traffic_accident");
    setUnclaimedAssets("full_estate");
    setDocReadiness("stage2_legal_heir");
    setRepresentationType("relative_iqama");
  };

  // Saudi Labor Law Article 84 & 87 EOSB Calculation
  // First 5 years: 15 days (half month) per year
  // Subsequent years: 30 days (full month) per year
  const first5Years = Math.min(5, Math.max(0, serviceYears));
  const remainingYears = Math.max(0, serviceYears - 5);
  const eosbSar = Math.round(
    first5Years * (monthlyWageSar / 2) + remainingYears * monthlyWageSar
  );

  // Approximate SAR to INR conversion (~22.6 INR per SAR)
  const sarToInrRate = 22.6;
  const eosbInr = Math.round(eosbSar * sarToInrRate);

  // Diya Compensation Benchmark Calculation
  let diyaBenchmarkSar = 0;
  let compensationType = "End of Service Gratuity & Final Settlement";
  let statutoryForum = "Ministry of Human Resources (MHRSD) & Labor Court";

  if (demiseCause === "traffic_accident") {
    diyaBenchmarkSar = 300000; // Supreme Judicial Council statutory benchmark for accidental death
    compensationType = "Article 84-88 EOSB + SAR 300,000 Sharia Diya Blood Money";
    statutoryForum = "Traffic Court (Muroor), Sharia General Court & MHRSD";
  } else if (demiseCause === "workplace_hazard") {
    // GOSI Occupational Hazard death compensation + EOSB
    diyaBenchmarkSar = Math.min(330000, Math.max(100000, monthlyWageSar * 36));
    compensationType = "Article 84-88 EOSB + GOSI Occupational Hazard Death Compensation";
    statutoryForum = "General Organization for Social Insurance (GOSI) & Labor Court";
  } else if (demiseCause === "homicide") {
    diyaBenchmarkSar = 400000;
    compensationType = "Article 84-88 EOSB + Criminal Court Diya Settlement";
    statutoryForum = "Criminal Court of Saudi Arabia & Embassy Consular Escrow";
  }

  const diyaBenchmarkInr = Math.round(diyaBenchmarkSar * sarToInrRate);
  const totalEstimatedClaimSar = eosbSar + diyaBenchmarkSar;
  const totalEstimatedClaimInr = eosbInr + diyaBenchmarkInr;

  const copyClauseToClipboard = () => {
    const clauseText = `BILINGUAL SPECIAL POWER OF ATTORNEY (WAKKALA) FOR SAUDI ARABIA CLAIMS
We, the undersigned legal heirs of the deceased Late [Full Name of Expat], holder of Indian Passport No. [Passport Number] and Saudi Iqama No. [Iqama Number], who passed away in [Riyadh / Jeddah / Dammam], Saudi Arabia on [Date of Death]:

1. We hereby jointly nominate, constitute, and appoint [Representative Full Name], holder of [Indian Passport No. / Saudi Iqama No.], currently residing in the Kingdom of Saudi Arabia, as our true and lawful Attorney (Wakkil).

2. Our said Attorney is authorized to represent us before the Ministry of Human Resources and Social Development (MHRSD), the Saudi Labor Court, the General / Personal Status Court, General Organization for Social Insurance (GOSI), Traffic Police Department (Muroor), and Saudi Central Bank (SAMA).

3. To claim, receive, and execute all End of Service Benefits (EOSB) under Articles 84-88 of Saudi Labor Law (M/51), unpaid wages, unused leave compensation, insurance claims, Diya (blood money) compensation, and frozen bank account funds.

4. To deposit all realized funds into the Consular Escrow Account of the Embassy of India in Riyadh / Consulate General of India in Jeddah for onward transmission to our bank accounts in India under RBI / FEMA repatriation guidelines.`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `MANDATORY 8-STAGE DOCUMENT CHECKLIST: SAUDI EXPAT DEATH CLAIM IN INDIA
1. Original Saudi Death Certificate (Shehada Al-Wafah) with certified Arabic-to-English translation.
2. Police Report / Muroor Traffic Accident Report (if accident occurred in KSA).
3. Legal Heir Certificate / Surviving Member Certificate issued by Revenue Authority (Tehsildar/SDM).
4. Family Pedigree Affidavit notarized before a First Class Judicial Magistrate.
5. Special Power of Attorney (Wakkala) in English & Arabic executed by all adult legal heirs.
6. State Home Department / GAD / NORKA Roots Authentication in India.
7. Ministry of External Affairs (MEA) Apostille / Attestation (CPV Division, New Delhi).
8. Royal Embassy of Saudi Arabia (New Delhi) or Royal Consulate General (Mumbai) Attestation.`;
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
            <span>SAUDI LABOR LAW (M/51) • ARTICLES 84-88 • MOFA RULES • ISA 1925</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Saudi Expat Death Benefits &amp; Gratuity Claim Finder
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Check mandatory documents and procedures to claim Saudi End of Service Gratuity, frozen
            bank funds, and Diya blood money for Indian expat legal heirs.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-finder"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Launch Claim Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/services/nri-inherited-real-estate-repatriation-15ca-15cb"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Globe className="w-4 h-4 text-[#C65378]" />
              <span>Cross-Border Legal Help</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Article 84-88</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                100% EOSB MANDATORY ON DEATH
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">SAR 300,000</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                BENCHMARK SHARIA DIYA COMPENSATION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">5-Stage Pipeline</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MEA &amp; SAUDI EMBASSY ATTESTATION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Zero Nominee</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SAUDI BANKS REQUIRE COURT ORDER
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
                <span>Consular Legal Desk</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Saudi Labor Law (Royal Decree M/51), MOFA Tasdeeq Rules, and the Indian
                Succession Act 1925. Cross-border estate assistance by AMA Legal Solutions.
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
                <span>EXECUTIVE BRIEF: SAUDI EXPAT DEATH BENEFITS &amp; GRATUITY CLAIMS</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Full Gratuity is Legally Mandatory on Death:</strong> Under Article 87 of
                    Saudi Labor Law, an employee&rsquo;s demise entitles their legal heirs to 100% full
                    End of Service Benefits (EOSB). Employers cannot apply resignation deductions or
                    forfeit benefits.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Saudi Banks Freeze Accounts Immediately:</strong> Saudi Central Bank (SAMA)
                    regulations freeze deceased expat bank accounts upon death notification. Saudi banks
                    do not accept Indian bank nominees. Heirs must secure a court succession order or
                    consular Power of Attorney.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>SAR 300,000 Sharia Diya in Fatal Accidents:</strong> If the worker died in a
                    vehicular crash or industrial negligence, legal heirs are entitled to Diya (blood
                    money) compensation up to SAR 300,000 or GOSI occupational hazard survivors&rsquo;
                    benefits.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Mandatory 5-Stage Attestation Pipeline:</strong> Indian succession certificates
                    and Powers of Attorney are only recognized in Saudi Arabia after State Home Department,
                    MEA New Delhi, Saudi Embassy, and MOFA Tasdeeq attestation with certified Arabic
                    translation.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (Strict Single H2 on page) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LEGAL FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Saudi Labor Law &amp; Expat Death Benefits Legal Foundation
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Over 2.5 million Indian citizens live and work in the Kingdom of Saudi Arabia. When an
                  Indian expat passes away in Riyadh, Jeddah, Dammam, Mecca, or Medina, their grieving
                  parents, spouse, or children in India face a complex cross-border legal puzzle.
                </p>
                <p>
                  The legal foundation governing these claims rests on two sovereign legal systems.
                  In Saudi Arabia, <strong>Saudi Labor Law (Royal Decree M/51)</strong>, the Ministry of
                  Human Resources and Social Development (MHRSD), and Sharia Personal Status Courts govern
                  the release of employment dues, bank funds, and compensation.
                </p>
                <p>
                  In India, the <strong>Indian Succession Act 1925</strong>, state revenue inheritance
                  rules, and Ministry of External Affairs (MEA) diplomatic protocols determine who holds
                  lawful heirship and legal capacity to grant Power of Attorney (Wakkala).
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CLAIM FINDER & CALCULATOR */}
            <section id="interactive-finder" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE CLAIM ENGINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free KSA Death Benefit Claim Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select the deceased employee&rsquo;s employment and death circumstances below to calculate
                exact Article 84 End of Service Gratuity, estimate Diya blood money, and generate a
                tailored consular claim roadmap.
              </p>

              {/* Calculator Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Step 1: Years of Service & Monthly Wage */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#C65378]" />
                    <span>Step 1: Service Duration &amp; Monthly Gross Wage</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                        <span>Total Completed Years of Service:</span>
                        <span className="text-[#C65378] font-black text-sm">{serviceYears} Years</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="30"
                        step="1"
                        value={serviceYears}
                        onChange={(e) => setServiceYears(Number(e.target.value))}
                        className="w-full accent-[#C65378] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                        <span>1 Year</span>
                        <span>5 Years (Milestone)</span>
                        <span>15 Years</span>
                        <span>30 Years</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                        <span>Last Monthly Wage in SAR (Basic + Regular Allowances):</span>
                        <span className="text-emerald-700 font-black text-sm">SAR {monthlyWageSar.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="1500"
                        max="30000"
                        step="500"
                        value={monthlyWageSar}
                        onChange={(e) => setMonthlyWageSar(Number(e.target.value))}
                        className="w-full accent-[#C65378] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                        <span>SAR 1,500</span>
                        <span>SAR 10,000</span>
                        <span>SAR 20,000</span>
                        <span>SAR 30,000</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2: Cause of Demise in Saudi Arabia */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <History className="w-4 h-4 text-[#C65378]" />
                    <span>Step 2: Cause &amp; Circumstances of Demise in KSA</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      {
                        id: "traffic_accident",
                        label: "Road Traffic Accident",
                        desc: "Eligible for Full EOSB + SAR 300,000 Sharia Diya compensation",
                      },
                      {
                        id: "workplace_hazard",
                        label: "Workplace / Industrial Hazard",
                        desc: "Eligible for Full EOSB + GOSI occupational hazards lump-sum or pension",
                      },
                      {
                        id: "natural",
                        label: "Natural Demise / Medical Illness",
                        desc: "Eligible for Full EOSB + Bank accounts; no civil Diya compensation",
                      },
                      {
                        id: "homicide",
                        label: "Homicide / Fatal Assault",
                        desc: "Subject to Criminal Court Sharia Diya verdict (SAR 300K to 400K+)",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setDemiseCause(opt.id as any)}
                        className={`text-left p-3.5 rounded-2xl border transition-all ${
                          demiseCause === opt.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="font-extrabold text-xs text-slate-900">{opt.label}</div>
                        <div className="text-[11px] text-slate-600 mt-1 leading-snug">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Unclaimed Asset Categories */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Coins className="w-4 h-4 text-[#C65378]" />
                    <span>Step 3: Pending Assets to Claim in Saudi Arabia</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "full_estate",
                        label: "Full Estate (Gratuity + Bank Accounts)",
                        desc: "Claiming EOSB gratuity, frozen Saudi bank balance, and unpaid salary",
                      },
                      {
                        id: "eosb_only",
                        label: "End of Service Gratuity Only",
                        desc: "Employer settlement dues, leave encashment, and pending wage arrears",
                      },
                      {
                        id: "bank_funds",
                        label: "Frozen Bank Account Balances",
                        desc: "Recovering cash in Al Rajhi, SNB, Riyad Bank, or other KSA accounts",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setUnclaimedAssets(opt.id as any)}
                        className={`text-left p-3.5 rounded-2xl border transition-all ${
                          unclaimedAssets === opt.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="font-bold text-xs text-slate-900">{opt.label}</div>
                        <div className="text-[11px] text-slate-600 mt-1 leading-snug">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 4: Documentation Status in India */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Step 4: Current Documentation Status in India</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "stage1_death_cert",
                        label: "Stage 1: Only Death Certificate",
                        desc: "Holding Saudi death paper; yet to apply for Legal Heir Certificate",
                      },
                      {
                        id: "stage2_legal_heir",
                        label: "Stage 2: Legal Heir Certificate Issued",
                        desc: "Revenue authority or Tehsildar certificate obtained; preparing PoA",
                      },
                      {
                        id: "stage3_mea_attested",
                        label: "Stage 3: MEA & Saudi Embassy Ready",
                        desc: "Documents authenticated; ready for MOFA Tasdeeq & filing in KSA",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setDocReadiness(opt.id as any)}
                        className={`text-left p-3.5 rounded-2xl border transition-all ${
                          docReadiness === opt.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="font-bold text-xs text-slate-900">{opt.label}</div>
                        <div className="text-[11px] text-slate-600 mt-1 leading-snug">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 5: Representation in Saudi Arabia */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#C65378]" />
                    <span>Step 5: Representation Channel in the Kingdom</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      {
                        id: "relative_iqama",
                        label: "Relative / Friend with Iqama",
                        desc: "Appointing a trusted person in KSA via consular Power of Attorney",
                      },
                      {
                        id: "embassy_madad",
                        label: "Indian Embassy / MADAD Portal",
                        desc: "Appointing the Community Welfare Wing in Riyadh or Jeddah",
                      },
                      {
                        id: "saudi_advocate",
                        label: "Licensed Saudi Legal Counsel",
                        desc: "Retaining a local Saudi advocate for contested Diya or court suits",
                      },
                      {
                        id: "none",
                        label: "No Representative Yet",
                        desc: "Need end-to-step guidance to set up representation",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setRepresentationType(opt.id as any)}
                        className={`text-left p-3.5 rounded-2xl border transition-all ${
                          representationType === opt.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="font-bold text-xs text-slate-900">{opt.label}</div>
                        <div className="text-[11px] text-slate-600 mt-1 leading-snug">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reset Button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset Calculator to Default</span>
                  </button>
                </div>

                {/* =========================================================================
                    DYNAMIC RESULTS CARD
                    ========================================================================= */}
                <div className="rounded-3xl border-2 border-[#172228] bg-gradient-to-br from-slate-900 via-[#172228] to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/15">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                        DIAGNOSTIC BENEFIT ESTIMATION RESULT
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-1">
                        SAR {totalEstimatedClaimSar.toLocaleString()} (~INR {(totalEstimatedClaimInr / 100000).toFixed(2)} Lakhs)
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white shrink-0 self-start sm:self-auto">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Article 84-88 Entitled Claim</span>
                    </div>
                  </div>

                  {/* 3 Metric Breakdown Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        ARTICLE 84 EOSB GRATUITY
                      </div>
                      <div className="text-base sm:text-lg font-black text-emerald-400">
                        SAR {eosbSar.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        ~INR {(eosbInr / 100000).toFixed(2)} Lakhs (100% Mandatory)
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        DIYA / STATUTORY COMPENSATION
                      </div>
                      <div className="text-base sm:text-lg font-black text-white">
                        {diyaBenchmarkSar > 0 ? `SAR ${diyaBenchmarkSar.toLocaleString()}` : "Not Applicable (Natural)"}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        {diyaBenchmarkSar > 0 ? `~INR ${(diyaBenchmarkInr / 100000).toFixed(2)} Lakhs Sharia Benchmark` : "Natural Demise Estate"}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        PRIMARY LEGAL FORUM IN KSA
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-rose-200 leading-snug">
                        {statutoryForum}
                      </div>
                      <div className="text-[11px] text-slate-400">Sovereign Labor &amp; Judicial Track</div>
                    </div>
                  </div>

                  {/* Detailed Legal Analysis */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#C65378]" />
                      <span>Procedural Assessment &amp; Statutory Entitlements:</span>
                    </div>
                    <p>
                      <strong>Gratuity Calculation:</strong> Based on {serviceYears} years of continuous
                      service at a monthly wage of SAR {monthlyWageSar.toLocaleString()}, the legal heirs are
                      entitled to SAR {eosbSar.toLocaleString()} under Article 84. Because the contract ended
                      due to death, Article 87 mandates 100% settlement with zero deductions. Under Article 88,
                      the employer must settle all entitlements within one week of death.
                    </p>
                    {diyaBenchmarkSar > 0 && (
                      <p>
                        <strong>Diya &amp; Negligence Compensation:</strong> Because the demise occurred due to a{" "}
                        {demiseCause === "traffic_accident" ? "road traffic accident" : demiseCause === "workplace_hazard" ? "workplace industrial accident" : "criminal assault"}
                        , the legal heirs are entitled to pursue Sharia Diya compensation benchmarked at SAR {diyaBenchmarkSar.toLocaleString()} (~INR {(diyaBenchmarkInr / 100000).toFixed(2)} Lakhs) before the Saudi General Court or GOSI.
                      </p>
                    )}
                    {unclaimedAssets !== "eosb_only" && (
                      <p className="text-amber-200">
                        <strong>Bank Account Notice:</strong> Deceased expat bank accounts are frozen under SAMA
                        regulations. Saudi banks do not release cash to Indian nominees. You must authenticate
                        your Indian Legal Heir Certificate through MEA and the Saudi Embassy to obtain a judicial
                        fund release order.
                      </p>
                    )}
                    <div className="pt-2 text-emerald-300 font-semibold border-t border-white/10">
                      <strong>Recommended Immediate Action:</strong> Execute a bilingual Special Power of
                      Attorney (Wakkala) in India, complete State Home Department and MEA apostille attestation,
                      and submit the dossier to the Indian Embassy in Riyadh or Consulate in Jeddah.
                    </div>
                  </div>

                  {/* Tool Action Conversion */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-300 text-center sm:text-left">
                      Need help drafting a MOFA-compliant Power of Attorney or managing repatriation to India?
                    </div>
                    <Link
                      href="/services/nri-inherited-real-estate-repatriation-15ca-15cb"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Get Cross-Border Legal Help</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
                  <span>STATUTORY VISUAL GUIDE: SAUDI EXPAT DEATH BENEFITS CLAIM PIPELINE</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Saudi Labor Law M/51</span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/saudi-arabia-expat-end-of-service-gratuity-claim-finder-og.jpg"
                  alt="Saudi Expat Death Benefits & End of Service Gratuity Claim Finder Guide"
                  width={1200}
                  height={675}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                Visualizing cross-border succession from India to Saudi Arabia: Article 84-88 End of
                Service Benefits, MOFA Apostille, and Diya compensation claims.
              </p>
            </div>

            {/* SECTION 3: ARTICLES 84-88: MANDATORY EOSB RULES ON DEATH */}
            <section id="articles-84-88-eosb" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>STATUTORY LABOR CODE RULES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Articles 84-88: Mandatory EOSB Rules on Worker Demise
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In Saudi Arabia, End of Service Benefits (EOSB), commonly known as gratuity or{" "}
                  <em>Mukaafat Nihayat Al-Khidma</em>, are a mandatory statutory right under Royal Decree
                  M/51. Employers cannot waive or reduce these benefits by contract.
                </p>
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Key Provisions of Saudi Labor Law Articles 84, 87 &amp; 88</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Article 84 (Calculation Formula):</strong> The worker is entitled to half a
                        month&rsquo;s wage for each of the first five years of continuous service, and a
                        full month&rsquo;s wage for each subsequent year. It is calculated on the basis of
                        the <em>last wage</em> (basic salary plus regular housing and transportation
                        allowances).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Article 87 (Total Protection on Demise):</strong> When an employment
                        relationship terminates due to the death of the worker, full gratuity is 100%
                        payable to the legal heirs. Any standard resignation deductions (which otherwise
                        reduce gratuity for early exits) are completely waived by law.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Article 88 (One-Week Payment Deadline):</strong> Upon termination by death,
                        the employer is legally required to pay all wages and settle all entitlements within
                        strictly <strong>one week</strong>. If the employer delays, legal heirs can lodge an
                        enforcement complaint with the Ministry of Human Resources.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 4: DIYA COMPENSATION: SHARIA BLOOD MONEY */}
            <section id="diya-blood-money" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>SHARIA COMPENSATION LAW</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Diya Compensation: Sharia Blood Money Rules in Saudi Law
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When an Indian expatriate dies as a result of an accident in Saudi Arabia, their family is
                  frequently entitled to <strong>Diya (دية - Blood Money)</strong> in addition to their
                  employment gratuity.
                </p>
                <p>
                  Diya is financial compensation prescribed by Sharia law and adjudicated by the Saudi
                  Judicial Council and General Courts. Under modern Saudi legal benchmarks:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <Coins className="w-4 h-4 text-[#C65378]" />
                      <span>SAR 300,000 for Accidental Demise</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      For unintentional death caused by vehicular accidents or industrial negligence, the
                      Supreme Judicial Council fixed standard Diya at SAR 300,000 (~INR 67.8 Lakhs). Motor
                      vehicle insurance (Najm) pays this according to the fault percentage fixed by the
                      traffic department (Muroor).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <Coins className="w-4 h-4 text-[#C65378]" />
                      <span>SAR 400,000+ for Intentional Homicide</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      In criminal homicide cases where capital punishment is commuted upon pardon (Afw) by
                      legal heirs, Diya starts at SAR 400,000 and can be mutually settled at higher sums. All
                      adult legal heirs in India must grant unanimous notarized consent.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: SAUDI BANK ACCOUNTS & NOMINEE REALITY */}
            <section id="frozen-bank-accounts" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>SAUDI BANKING REGULATIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Saudi Bank Accounts: Why Nominee Designation Fails
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  One of the most distressing surprises for Indian families is discovering that their
                  deceased relative&rsquo;s Saudi bank account is completely frozen, and the bank refuses to
                  talk to the family nominee.
                </p>
                <div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-4 text-xs text-amber-950 space-y-2">
                  <div className="font-extrabold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>The SAMA Banking Rule: Zero Direct Nominee Rights</span>
                  </div>
                  <p className="leading-relaxed">
                    Under Saudi Central Bank (SAMA) circulars, every commercial bank in KSA (Al Rajhi, Saudi
                    National Bank - SNB, Riyad Bank, Banque Saudi Fransi, etc.) must freeze all accounts,
                    debit cards, and mobile banking immediately upon receiving a death notification from Ahwal
                    Madani (Civil Affairs).
                  </p>
                  <p className="leading-relaxed">
                    Saudi banking law follows Sharia estate principles. It does not recognize informal bank
                    nominees or foreign Wills. Funds can only be released upon presentation of an attested
                    Wakkala (Power of Attorney) and an inheritance decree issued by a Saudi Personal Status
                    Court.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 6: SOVEREIGN 5-STAGE ATTESTATION PIPELINE */}
            <section id="attestation-pipeline" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Stamp className="w-4 h-4" />
                <span>CROSS-BORDER DIPLOMATIC AUTHENTICATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Sovereign 5-Stage Attestation &amp; Apostille Pipeline
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  To make an Indian Legal Heir Certificate, Death Certificate, or Power of Attorney legally
                  enforceable before Saudi courts, employers, and banks, it must pass through the mandatory
                  5-stage sovereign authentication pipeline:
                </p>
                <div className="space-y-3 pt-1">
                  {[
                    {
                      step: "Stage 1",
                      title: "Local Indian Revenue / Judicial Certificate",
                      desc: "Obtain a Surviving Member Certificate or Legal Heir Certificate from the local Tehsildar / Sub-Divisional Magistrate (SDM), or a Succession Certificate from a Civil Court in India.",
                    },
                    {
                      step: "Stage 2",
                      title: "State Home Department / GAD / NORKA Authentication",
                      desc: "The document is authenticated by the Home Department or General Administration Department (GAD) of the issuing state (or NORKA Roots in Kerala).",
                    },
                    {
                      step: "Stage 3",
                      title: "Ministry of External Affairs (MEA) Attestation",
                      desc: "Submitted to the Consular, Passport & Visa (CPV) Division of the MEA at Patiala House, New Delhi or authorized MEA branch secretariats for federal authentication.",
                    },
                    {
                      step: "Stage 4",
                      title: "Royal Embassy of Saudi Arabia Attestation",
                      desc: "Attested by the Consular Section of the Royal Embassy of Saudi Arabia in New Delhi or the Royal Consulate General in Mumbai.",
                    },
                    {
                      step: "Stage 5",
                      title: "MOFA Tasdeeq & Certified Arabic Translation in KSA",
                      desc: "Uploaded to the Ministry of Foreign Affairs (MOFA) Tasdeeq portal in Saudi Arabia, followed by certified legal translation into Arabic by a licensed Saudi translation bureau.",
                    },
                  ].map((s, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-rose-100 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div className="space-y-1">
                        <div className="font-extrabold text-sm text-slate-900">{s.title}</div>
                        <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 7: STRUCTURED COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>BENEFITS MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Legal Comparison: EOSB vs Diya vs GOSI Benefits
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Understanding which statutory authority pays what benefit is crucial for legal heirs
                managing claims from India:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 sm:p-4 font-extrabold">Benefit Category</th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-rose-200">Paying Authority</th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-emerald-300">Eligibility Criteria</th>
                      <th className="p-3.5 sm:p-4 font-extrabold">Estimated Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">End of Service Gratuity (EOSB)</td>
                      <td className="p-3.5 sm:p-4 text-slate-800">Employer / Company Sponsor</td>
                      <td className="p-3.5 sm:p-4">100% of workers upon demise under Article 87</td>
                      <td className="p-3.5 sm:p-4 font-bold text-emerald-800">15-30 days per year of service</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Diya (Accidental Blood Money)</td>
                      <td className="p-3.5 sm:p-4 text-slate-800">Motor Insurance (Najm) / Liable Party</td>
                      <td className="p-3.5 sm:p-4">Fatal traffic crash or negligence with police report</td>
                      <td className="p-3.5 sm:p-4 font-bold text-[#C65378]">SAR 300,000 Sharia benchmark</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">GOSI Occupational Hazard Benefit</td>
                      <td className="p-3.5 sm:p-4 text-slate-800">GOSI Social Insurance KSA</td>
                      <td className="p-3.5 sm:p-4">Fatal workplace accident during duty or official travel</td>
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Monthly survivor pension or lump-sum</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Frozen Saudi Bank Funds</td>
                      <td className="p-3.5 sm:p-4 text-slate-800">Saudi Commercial Banks (SAMA)</td>
                      <td className="p-3.5 sm:p-4">All account balances upon court inheritance decree</td>
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Actual balance in deceased account</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* MID-ARTICLE CONTEXTUAL LINK */}
            <div className="rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50/60 via-white to-amber-50/50 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                  <Globe className="w-3.5 h-3.5" />
                  <span>NEED TO REPATRIATE INHERITED OVERSEAS WEALTH TO INDIA?</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                  FEMA Compliance &amp; Form 15CA/15CB Cross-Border Repatriation
                </div>
                <p className="text-xs text-slate-600">
                  Ensure 100% tax exemption under Section 56(2)(x) and hassle-free inward remittance
                  through authorized dealer banks in India.
                </p>
              </div>
              <Link
                href="/services/nri-inherited-real-estate-repatriation-15ca-15cb"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shrink-0 transition-transform hover:-translate-y-0.5 shadow-sm"
              >
                <span>Explore Repatriation Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* SECTION 8: STEP-BY-STEP SOP FOR INDIAN FAMILIES */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXACT PROCEDURAL PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Step-by-Step SOP: Claiming Saudi Benefits from India
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Follow this verified Standard Operating Procedure (SOP) to ensure zero procedural delays:
                </p>
                <div className="space-y-3 pt-1">
                  {[
                    {
                      step: "Step 1",
                      title: "Mortal Remains Repatriation or Local Burial Registration",
                      desc: "Coordinate with the Indian Embassy/Consulate and employer for death registration. Obtain the official Saudi Death Certificate and police inquest report.",
                    },
                    {
                      step: "Step 2",
                      title: "Apply for Indian Legal Heirship / Succession Certificate",
                      desc: "Submit a joint application before the local Tehsildar or District Court with family pedigree details to declare all lawful heirs.",
                    },
                    {
                      step: "Step 3",
                      title: "Execute Bilingual Special Power of Attorney (Wakkala)",
                      desc: "Draft a bilingual Arabic-English PoA appointing a trusted relative in KSA or the Indian Embassy. Notarize it before a First Class Judicial Magistrate.",
                    },
                    {
                      step: "Step 4",
                      title: "Complete State Home Dept & MEA Apostille Authentication",
                      desc: "Authenticate the certificate and PoA through the State Home Department and federal MEA CPV Division in New Delhi.",
                    },
                    {
                      step: "Step 5",
                      title: "Obtain Saudi Embassy Stamp & MOFA Tasdeeq",
                      desc: "Submit to the Royal Embassy of Saudi Arabia in India, followed by MOFA electronic verification (Tasdeeq) in Riyadh.",
                    },
                    {
                      step: "Step 6",
                      title: "Lodge Qiwa Dispute & Personal Status Court Petition",
                      desc: "Your representative files for EOSB settlement on Qiwa and submits the succession file to the Sharia Court for bank fund and Diya release.",
                    },
                    {
                      step: "Step 7",
                      title: "Consular Escrow Transfer & RBI FEMA Compliance",
                      desc: "Funds are transmitted via the Embassy Consular Escrow or bank wire to India. Retain FIRC certificates for complete income tax exemption.",
                    },
                  ].map((s, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div className="space-y-1">
                        <div className="font-extrabold text-sm text-slate-900">{s.title}</div>
                        <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 9: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>PRACTICAL CASE WORKFLOWS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Practical Case Studies: Riyadh, Jeddah &amp; Dammam
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
                {/* Case 1: Riyadh */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Riyadh Construction Demise</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Kerala Family
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Recovering 8 Years Gratuity &amp; GOSI Compensation
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> An engineer from Malappuram, Kerala died in an industrial accident
                    in Riyadh after 8 years of service. The employer offered only one month&rsquo;s salary.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Result:</strong> With an MEA-attested PoA, the Indian Embassy filed on Qiwa. The
                    Labor Court ordered the employer to pay full Article 84 EOSB of SAR 66,000, while GOSI
                    disbursed SAR 216,000 occupational death compensation to the widow.
                  </p>
                </div>

                {/* Case 2: Jeddah */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Jeddah Highway Crash</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Telangana Family
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Full SAR 300,000 Diya Recovery from Motor Insurer
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> A driver from Nizamabad died in a road collision near Jeddah. Muroor
                    assessed 100% third-party fault, but the insurer delayed payment to the family in India.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Result:</strong> The family granted Wakkala to a licensed Saudi counsel. The
                    Traffic Court awarded full statutory Diya of SAR 300,000 (~INR 67.8 Lakhs), transferred
                    directly to the consular escrow account.
                  </p>
                </div>

                {/* Case 3: Dammam */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Dammam Bank Unfreeze</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      UP Heirs
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Releasing SAR 84,000 Frozen in Al Rajhi Account
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> A technician from Lucknow suffered a heart attack. His brother in
                    India was named as nominee on an informal slip, but Al Rajhi Bank refused access.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Result:</strong> After completing the 5-stage attestation pipeline, the brother
                    obtained an inheritance deed from the Dammam Court of Personal Status. The entire bank
                    balance was successfully wired to India.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: LEGAL RECITAL TEMPLATES & CHECKLIST */}
            <section id="legal-recital-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>LEGAL DRAFTING CLAUSES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Legal Recital Templates: Arabic PoA &amp; Checklist
              </h3>

              {/* Template Box 1: Special Power of Attorney */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Special Power of Attorney (Wakkala) Recital for KSA Estate Claims
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
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"We, the legal heirs of Late [Expat Name], Passport No. [X], Iqama No. [Y], appoint [Attorney Name], Iqama No. [Z], as our lawful Attorney before the Ministry of Human Resources, Saudi Labor Court, General / Personal Status Court, GOSI, and SAMA.

Our Attorney is empowered to claim, settle, and receive all Article 84-88 End of Service Gratuity, unpaid salary, frozen bank accounts, and Diya blood money, and deposit the proceeds into the Embassy of India Consular Escrow Account for transmission to India."`}
                </pre>
              </div>

              {/* Template Box 2: Verification Checklist */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Document Checklist: Saudi Expat Succession Claim
                  </div>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Saudi Death Certificate with certified Arabic translation</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Police Inquest &amp; Muroor Traffic Report (for accidents)</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Legal Heir Certificate issued by Indian Revenue Authority</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>State Home Dept, MEA &amp; Saudi Embassy Attestation</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>CROSS-BORDER COUNSEL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Institutional Profile: Cross-Border Heirs Desk
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      Cross-Border Estate &amp; Gulf Repatriation Legal Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Advocates</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is powered by AMA Legal Solutions, a premier legal firm specializing in
                  cross-border succession, diplomatic attestations, and estate repatriation for non-resident
                  Indians and their families. Our advocates assist families across India in securing Legal
                  Heir Certificates, completing MEA apostille processing, and coordinating with consular
                  missions in Riyadh and Jeddah.
                </p>

                {/* Service Grid Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/nri-inherited-real-estate-repatriation-15ca-15cb"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>15CA/15CB Repatriation</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/nri-will-checker"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>NRI Will Checker</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/bank-deceased-claim-document-checklist-generator"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Bank Deceased Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/legal-heir-vs-succession-certificate-decision-tool"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Succession Cert Tool</span>
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
                12. Frequently Asked Questions: KSA Expat Claims
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:text-[#C65378]"
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

            {/* SECTION 13: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>OFFICIAL STATUTORY PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Consular Portals &amp; Official Sovereign Authorities
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs text-slate-600">
                <p>
                  All claim procedures detailed on this page follow official directives of the Saudi
                  Ministry of Human Resources, Ministry of Foreign Affairs (MOFA), and the Indian Ministry
                  of External Affairs:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Indian Succession Act, 1925</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.incometax.gov.in/iec/foportal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Income Tax Portal: Section 56(2)(x) Exemption</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Supreme Court of India Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related Cross-Border Tools &amp; Estate Checkers
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/nri-will-checker"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      NRI Will Checker
                    </Link>
                    <Link
                      href="/tools/bank-deceased-claim-document-checklist-generator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Bank Deceased Claim Tool
                    </Link>
                    <Link
                      href="/tools/legal-heir-vs-succession-certificate-decision-tool"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Succession Certificate Tool
                    </Link>
                    <Link
                      href="/tools/probate-checker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Probate Rule Checker
                    </Link>
                    <Link
                      href="/services/nri-inherited-real-estate-repatriation-15ca-15cb"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Cross-Border Estate Repatriation
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Bottom 3 Plain-English Summary Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Act Quickly on Death?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Saudi employers must settle dues within one week under Article 88. Acting fast stops
                  funds from getting held in long legal disputes.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Consular Escrow Protection</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Funds routed through the Indian Embassy escrow in Riyadh or Jeddah are fully safe. Money is
                  wired straight to legal heirs in India.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Zero Income Tax in India</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Money received via inheritance, gratuity, or Diya is 100% tax-free under Section 56(2)(x) of
                  the Indian Income Tax Act.
                </p>
              </div>
            </div>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR
              ===================================================================== */}
          <aside className="space-y-6 sticky top-24">
            {/* CARD 1: AUTHOR BIO CARD (Strictly NO phone numbers!) */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                  AAM
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">Lawyer Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Estate &amp; Cross-Border Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Expert in cross-border NRI estate succession, Indian Succession Act probate, diplomatic
                attestations, and Gulf labor death compensation.
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
              {/* CARD 2: DUAL CTA 1 - CROSS-BORDER REPATRIATION (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>SECURE CROSS-BORDER ESTATE RECOVERY</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Claim Saudi Death Benefits &amp; Gratuity from India
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Our cross-border legal bench manages MEA apostille, Saudi Embassy attestations, and
                  consular filings for families across India.
                </p>
                <Link
                  href="/services/nri-inherited-real-estate-repatriation-15ca-15cb"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Get Cross-Border Legal Help</span>
                </Link>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>FEMA &amp; RBI Compliance Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (White / Rose Border) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>CONSULAR &amp; ESTATE ADVISORY DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need Help with Power of Attorney or Bank Claims?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Schedule a private consultation with our cross-border succession advocates to review your
                  dossier and embassy paperwork.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact Our Legal Team</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Families Trust WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Saudi Labor Law Compliant:</strong> Calculations follow Article 84-88 formulas
                      under Royal Decree M/51.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Sovereign Attestation Guidance:</strong> Complete MEA and Saudi Embassy
                      authentication support.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>100% Tax Free Repatriation:</strong> Full alignment with Section 56(2)(x) and
                      RBI FEMA norms.
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
          href="#interactive-finder"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Claim Tool</span>
        </a>
        <Link
          href="/services/nri-inherited-real-estate-repatriation-15ca-15cb"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Cross-Border Help</span>
        </Link>
      </div>
    </div>
  );
}
