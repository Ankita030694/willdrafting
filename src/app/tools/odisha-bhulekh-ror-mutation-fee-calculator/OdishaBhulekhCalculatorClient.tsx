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
  PhoneCall,
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
  Clock,
  MapPin,
  Compass,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Legal Foundation: Odisha Bhulekh RoR Rules" },
  { id: "interactive-calculator", label: "2. Interactive Bhulekh Fee & Document Tool" },
  { id: "form-3-notice-procedure", label: "3. Form 3 Notice: 30-Day Tahasildar Objection Window" },
  { id: "revenue-inspector-enquiry", label: "4. Revenue Inspector (RI) Field Spot Enquiry" },
  { id: "hal-sabik-khatiyan", label: "5. Hal vs Sabik Khatiyan Discrepancies & Remedies" },
  { id: "will-vs-intestate-odisha", label: "6. Registered Will vs Intestate: No Probate in Odisha" },
  { id: "chaka-bandi-consolidation", label: "7. Chaka Bandi Rules: Bar on Land Fragmentation" },
  { id: "olr-sc-st-safeguards", label: "8. SC & ST Land Alienation Safeguards (OLR Act)" },
  { id: "fee-comparison-table", label: "9. Statutory Fee Breakdown: Succession vs Sale" },
  { id: "step-by-step-sop", label: "10. Step-by-Step SOP: Online Bhulekh to Final RoR" },
  { id: "practical-case-studies", label: "11. Practical Case Studies: Cuttack, Khordha, Sambalpur" },
  { id: "legal-recital-templates", label: "12. Legal Recital Templates & Document Checklist" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions: Odisha Mutation" },
  { id: "statutory-citations", label: "14. Legal Citations & Judicial Portals" },
];

const FAQS = [
  {
    q: "What is the statutory fee for inheritance mutation on Odisha Bhulekh?",
    a: "Inheritance mutation in Odisha does not attract ad valorem stamp duty or transfer tax. Applicants only pay statutory user charges of approximately Rs 30 to Rs 50 on the Odisha Revenue portal or Mo Seva Kendra, along with a process fee of Rs 20 per notice for issuing Form 3 notices to legal heirs.",
  },
  {
    q: "What is Form 3 notice in an Odisha Tahasildar mutation case?",
    a: "Form No. 3 is a statutory public notice issued by the Tahasildar under Rule 34 of the Odisha Mutation Manual. It invites general public and interested persons to file objections against the proposed RoR name correction within a mandatory 30-day window from the date of publication.",
  },
  {
    q: "Is probate of a Will mandatory in Odisha for RoR land mutation?",
    a: "No. Under Section 213 read with Section 57 of the Indian Succession Act, probate is not mandatory for Wills executed by Hindus in the State of Odisha outside the Presidency towns. A registered Will can be submitted directly before the Tahasildar for RoR correction, provided no contentious civil dispute arises.",
  },
  {
    q: "What documents are required to mutate inherited land before an Odisha Tahasildar?",
    a: "The mandatory documents include: (1) Death Certificate of recorded tenant, (2) Legal Heir Certificate or Warisan Certificate issued by Tahasildar or Revenue Officer, (3) Copy of Sabik and Hal RoR (Khatiyan), (4) Up-to-date Land Revenue (Khajana) payment receipt, (5) Identity and Aadhaar proof of all surviving legal heirs, and (6) Registered Will or Partition Deed if applicable.",
  },
  {
    q: "How long does it take for a mutation case to be approved in Odisha?",
    a: "Under the Odisha Right to Public Services Act (ORTPSA), uncontested mutation cases must be disposed of within 90 working days. This timeframe covers online filing, 30-day Form 3 objection period, Revenue Inspector (RI) spot enquiry, Tahasildar hearing order, and digital RoR generation.",
  },
  {
    q: "What is the Chaka Bandi restriction on agricultural land partition in Odisha?",
    a: "Under Section 34 of the Odisha Consolidation of Holdings and Prevention of Fragmentation of Land Act, 1972, agricultural land consolidated into a Chaka cannot be partitioned or transferred if any resulting plot fragments below the statutory standard area (typically 1 standard acre), unless sanctioned by consolidation authorities.",
  },
  {
    q: "Can agricultural land belonging to SC or ST persons be mutated to general heirs?",
    a: "Under Sections 22 and 23 of the Odisha Land Reforms Act, 1960, land belonging to Scheduled Tribe or Scheduled Caste rayats cannot be transferred or alienated to non-ST or non-SC persons without prior written permission from the Revenue Officer (Sub-Collector). Legitimate direct legal heirs inherit naturally, but third-party transfers are void without statutory clearance.",
  },
  {
    q: "What is the legal remedy if the Tahasildar rejects an RoR mutation application?",
    a: "If a Tahasildar rejects a mutation petition or passes an adverse order, the aggrieved party can file a statutory Mutation Appeal before the Sub-Collector under Section 15 of the Odisha Survey & Settlement Act, 1958 (or relevant Mutation Manual rules) within 30 days of the order.",
  },
];

export default function OdishaBhulekhCalculatorClient() {
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

  // Active Tool Tab: 'calculator' | 'stepper' | 'chakabandi'
  const [activeTab, setActiveTab] = useState<"calculator" | "stepper" | "chakabandi">("calculator");

  // Calculator State
  const [successionType, setSuccessionType] = useState<
    "legal_heir" | "registered_will" | "partition_deed" | "gift_deed"
  >("legal_heir");

  const [district, setDistrict] = useState<string>("Cuttack");
  const [tahasilType, setTahasilType] = useState<"rural" | "urban">("rural");
  const [landCategory, setLandCategory] = useState<"agricultural" | "homestead" | "commercial">(
    "agricultural"
  );
  const [numHeirs, setNumHeirs] = useState<number>(3);
  const [numPlots, setNumPlots] = useState<number>(2);
  const [needCertifiedCopies, setNeedCertifiedCopies] = useState<boolean>(true);

  // Stepper State
  const [activeStep, setActiveStep] = useState<number>(1);

  // Chaka Bandi State
  const [isConsolidated, setIsConsolidated] = useState<"yes" | "no">("yes");
  const [totalLandAcre, setTotalLandAcre] = useState<number>(1.5);
  const [proposedShares, setProposedShares] = useState<number>(2);
  const [isTribalLand, setIsTribalLand] = useState<"no" | "yes">("no");

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

  // Fee Calculation Engine
  const baseUserFee = 40; // Odisha e-Services / Mo Seva Kendra standard portal fee
  const processFeePerNotice = 20; // Notice fee per legal heir/notice recipient
  const totalNoticeFee = numHeirs * processFeePerNotice;
  const generalNoticeFee = successionType === "registered_will" ? 150 : 50; // Publication/drum-beat proclamation
  const copyFee = needCertifiedCopies ? numPlots * 30 : 0; // Rs 30 per certified Khatiyan copy
  const totalStatutoryFee = baseUserFee + totalNoticeFee + generalNoticeFee + copyFee;

  // Stamp Duty Assessment
  let stampDutyPercentage = "0% (Exempt)";
  let stampDutyAmount = 0;
  let stampDutyNote =
    "Inheritance and Will mutations are exempt from ad valorem stamp duty under Odisha Stamp Rules. Only nominal user and notice fees apply.";

  if (successionType === "gift_deed") {
    stampDutyPercentage = "5% to 7% (Applicable at Sub-Registrar Office)";
    stampDutyAmount = 0; // Already paid during deed registration
    stampDutyNote =
      "Stamp duty was paid at the Sub-Registrar Office during deed registration. RoR mutation only incurs revenue court processing fees.";
  } else if (successionType === "partition_deed") {
    stampDutyPercentage = "Exempt / Nominal Court Fee";
    stampDutyAmount = 0;
    stampDutyNote =
      "Family partition among co-heirs incurs nominal stamp duty as per the Indian Stamp (Odisha Amendment) Act.";
  }

  // Chaka Bandi Evaluation
  const perShareArea = totalLandAcre / (proposedShares || 1);
  const isFragmentationRisk = isConsolidated === "yes" && perShareArea < 1.0;
  const isScStRisk = isTribalLand === "yes";

  const copyClauseToClipboard = () => {
    const clauseText = `STATUTORY RECITAL CLAUSE FOR WILL DEED: SCHEDULE OF ODISHA AGRICULTURAL & HOMESTEAD HOLDINGS
"I declare that the Schedule Property situated in Mouza [Name], Tahasil [Name], District [Name], under Hal Khata No. [Number], Plot No. [Number], measuring [Area in Acres/Decimals], is my absolute self-acquired property.

I acquired absolute title through [personal earnings / inheritance under Section 8 of Hindu Succession Act, 1956 / registered settlement].

Under the ruling of the Hon'ble High Court of Orissa, probate is not mandatory for this Will. Upon my demise, my named beneficiary [Beneficiary Name] shall hold absolute title and shall be entitled to apply for Record of Rights (RoR) mutation before the Tahasildar under Rule 34 of the Odisha Mutation Manual and Section 15 of the Odisha Survey & Settlement Act, 1958, without partition dispute."`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `DOCUMENT CHECKLIST: ODISHA TAHASILDAR INHERITANCE MUTATION CASE
1. Death Certificate of the deceased recorded tenant (issued by Municipal / Gram Panchayat Registrar).
2. Legal Heir Certificate / Warisan Certificate issued by the competent Tahasildar or Revenue Officer.
3. Certified Copy of the Record of Rights (Hal Khatiyan) from the Bhulekh Odisha portal or Tahasil office.
4. Sabik Khatiyan (prior settlement RoR) copy to establish genealogical continuity and land boundaries.
5. Up-to-date Land Revenue (Khajana) payment receipt showing zero government dues.
6. Identity Proof (Aadhaar Card, Voter ID, PAN) of all legal heirs applying for joint or single Khata.
7. Original Registered Will with Death Certificate (if mutation is claimed under testamentary succession).
8. Registered Partition Deed or Family Settlement Deed (if land is partitioned among co-heirs).
9. Form No. 3 Notice Acknowledgments / Affidavits of consent from non-applicant co-heirs.
10. Section 22/23 Odisha Land Reforms Act clearance certificate from Sub-Collector (if SC/ST land).`;
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
            <span>ODISHA SURVEY &amp; SETTLEMENT ACT, 1958 • ODISHA MUTATION MANUAL • RULE 34</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Odisha Bhulekh RoR Mutation Fee Calculator
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Compute statutory user charges, Form 3 notice fees, and document requirements for
            inherited land in Odisha. Verify Chaka Bandi consolidation rules and probate exemptions.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Mutation Fees</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Will for Odisha Property</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Rs 0 Stamp Duty</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                INHERITANCE REVENUE EXEMPTION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">30-Day Notice</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                RULE 34 FORM 3 OBJECTION PERIOD
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">90-Day Target</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ORTPSA SERVICE DISPOSAL CHARTER
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Chaka Bandi</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SECTION 34 FRAGMENTATION BAR
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
                <span>Odisha Revenue Authority</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Odisha Survey &amp; Settlement Act 1958, Odisha Land Reforms Act 1960,
                and Odisha Mutation Manual. Adheres to Orissa High Court succession rulings.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE TOOL
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* TOP FEATURED IMAGE SHOWCASE */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white">
              <div className="relative aspect-[16/9] w-full bg-slate-100">
                <Image
                  src="/images/odisha-bhulekh-ror-mutation-fee-calculator-og.jpg"
                  alt="Odisha Bhulekh RoR Mutation Fee Calculator and Tahasildar Guide"
                  width={1200}
                  height={675}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 to-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Bhulekh Odisha RoR Mutation &amp; Khatiyan Title Verification Desk</span>
                </div>
                <div className="font-semibold text-slate-700">
                  Target URL: <code className="text-[#C65378] font-mono">/tools/odisha-bhulekh-ror-mutation-fee-calculator</code>
                </div>
              </div>
            </div>

            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: ODISHA BHULEKH ROR MUTATION &amp; FEES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Ad Valorem Stamp Duty on Inheritance:</strong> Transfer of land
                    rights to legal heirs through succession or a registered Will attracts zero stamp
                    duty in Odisha. Only statutory portal user charges (Rs 40) and notice fees (Rs 20
                    per heir) apply.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Mandatory 30-Day Form 3 Public Notice:</strong> Under Rule 34 of the
                    Odisha Mutation Manual, the Tahasildar must issue a Form 3 notice inviting
                    objections from co-heirs and villagers before correcting Khatiyan Column 2.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>No Probate Required in Odisha:</strong> Unlike Kolkata, Mumbai, or Chennai,
                    probate is not mandatory in Odisha for Wills executed by Hindus. You can directly
                    present a registered Will before the Tahasildar for RoR correction.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Strict Chaka Bandi Land Restrictions:</strong> Consolidated agricultural
                    parcels under the 1972 Act cannot be partitioned if any parcel drops below 1
                    standard acre without prior sanction.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (SINGLE H2 ON PAGE) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Statutory Framework: Odisha Bhulekh RoR Mutation Rules
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In the State of Odisha, land ownership and revenue records are maintained digitally
                  on the <strong>Bhulekh Odisha portal</strong> under the authority of the Board of
                  Revenue and the Directorate of Land Records and Surveys. When a recorded tenant (Rayat)
                  passes away, their name in <em>Column 2 of the Record of Rights (RoR / Khatiyan)</em>{" "}
                  must be substituted by the names of their surviving legal heirs.
                </p>
                <p>
                  This procedural substitution is legally governed by the{" "}
                  <strong>Odisha Survey &amp; Settlement Act, 1958</strong>, the{" "}
                  <strong>Odisha Mutation Manual, 1962</strong>, and the substantive provisions of the{" "}
                  <strong>Hindu Succession Act, 1956</strong> (or relevant personal laws). The
                  quasi-judicial authority empowered to initiate, hear, and dispose of mutation
                  proceedings is the <strong>Tahasildar or Additional Tahasildar</strong> of the
                  respective revenue circle.
                </p>
                <p>
                  Unlike property sale or gift deeds, mutation by inheritance (Warisan) does not
                  transfer fresh ownership. Instead, it formally updates the state land ledger to
                  reflect devolution by operation of law. As held consistently by the Hon&rsquo;ble
                  Supreme Court and the High Court of Orissa, an RoR entry does not create fresh title;
                  however, it constitutes vital presumptive evidence of possession and fiscal liability
                  for land revenue (Khajana).
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR SUITE */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE REVENUE CALCULATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Bhulekh Fee, Stepper &amp; Chaka Checker
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Use the tabs below to compute exact statutory charges, simulate the Tahasildar
                case hearing stages, and verify land consolidation fragmentation bars.
              </p>

              {/* Tool Navigation Tabs */}
              <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-200/70 border border-slate-300/80">
                <button
                  onClick={() => setActiveTab("calculator")}
                  className={`flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "calculator"
                      ? "bg-white text-[#172228] shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  <Calculator className="w-4 h-4 text-[#C65378]" />
                  <span>Bhulekh Fee Calculator</span>
                </button>
                <button
                  onClick={() => setActiveTab("stepper")}
                  className={`flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "stepper"
                      ? "bg-white text-[#172228] shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  <Clock className="w-4 h-4 text-[#C65378]" />
                  <span>Tahasildar Hearing Stepper</span>
                </button>
                <button
                  onClick={() => setActiveTab("chakabandi")}
                  className={`flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === "chakabandi"
                      ? "bg-white text-[#172228] shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  <Compass className="w-4 h-4 text-[#C65378]" />
                  <span>Chaka Bandi &amp; OLR Check</span>
                </button>
              </div>

              {/* TAB 1: BHULEKH FEE CALCULATOR */}
              {activeTab === "calculator" && (
                <div className="rounded-3xl bg-white border border-slate-200/90 shadow-md p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">
                        Odisha Bhulekh RoR Mutation Fee Estimator
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Statutory charges under Odisha Mutation Manual and Revenue Department rules
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                      Active Model 2026
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Succession Mode */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                        Mode of Title Succession
                      </label>
                      <select
                        value={successionType}
                        onChange={(e) => setSuccessionType(e.target.value as any)}
                        className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                      >
                        <option value="legal_heir">Inheritance (Intestate / No Will - Warisan)</option>
                        <option value="registered_will">Registered Will (Testamentary Succession)</option>
                        <option value="partition_deed">Registered Partition Deed (Bantananama)</option>
                        <option value="gift_deed">Registered Gift Deed (Danapatra)</option>
                      </select>
                    </div>

                    {/* District */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                        Revenue District in Odisha
                      </label>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                      >
                        <option value="Cuttack">Cuttack (Cuttack Sadar, Salipur, Athagarh)</option>
                        <option value="Khordha">Khordha (Bhubaneswar, Jatani, Khordha)</option>
                        <option value="Puri">Puri (Puri Sadar, Pipili, Nimapara)</option>
                        <option value="Sambalpur">Sambalpur (Sambalpur Sadar, Rengali)</option>
                        <option value="Ganjam">Ganjam (Berhampur, Chhatrapur, Hinjilicut)</option>
                        <option value="Balasore">Balasore (Balasore Sadar, Soro, Jaleswar)</option>
                        <option value="Sundargarh">Sundargarh (Rourkela, Sundargarh)</option>
                        <option value="Other">Other 23 Revenue Districts</option>
                      </select>
                    </div>

                    {/* Land Category */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                        Land Classification (Kisam)
                      </label>
                      <select
                        value={landCategory}
                        onChange={(e) => setLandCategory(e.target.value as any)}
                        className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                      >
                        <option value="agricultural">Agricultural (Saradh / Dhipa / Jal / Taila)</option>
                        <option value="homestead">Homestead / Residential (Gharabari / Basti)</option>
                        <option value="commercial">Commercial / Industrial Plot</option>
                      </select>
                    </div>

                    {/* Number of Legal Heirs */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                        Number of Legal Heirs / Notice Parties: {numHeirs}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={numHeirs}
                        onChange={(e) => setNumHeirs(parseInt(e.target.value) || 1)}
                        className="w-full accent-[#C65378]"
                      />
                      <div className="flex justify-between text-[11px] text-slate-500">
                        <span>1 Heir (Single)</span>
                        <span>5 Heirs</span>
                        <span>10 Heirs</span>
                      </div>
                    </div>

                    {/* Number of Khatas / Plots */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                        Number of Khatiyan Plots: {numPlots}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="8"
                        value={numPlots}
                        onChange={(e) => setNumPlots(parseInt(e.target.value) || 1)}
                        className="w-full accent-[#C65378]"
                      />
                    </div>

                    {/* Certified Copy Checkbox */}
                    <div className="flex items-center gap-3 pt-6">
                      <input
                        type="checkbox"
                        id="certifiedCopyCheck"
                        checked={needCertifiedCopies}
                        onChange={(e) => setNeedCertifiedCopies(e.target.checked)}
                        className="w-4 h-4 accent-[#C65378] rounded"
                      />
                      <label htmlFor="certifiedCopyCheck" className="text-xs font-bold text-slate-800 cursor-pointer">
                        Include Certified Copy of Final RoR (Khatiyan Nakal with QR Code)
                      </label>
                    </div>
                  </div>

                  {/* COMPUTED OUTLAY BOX */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <div>
                        <div className="text-xs uppercase tracking-wider text-rose-300 font-extrabold">
                          TOTAL STATUTORY OUTLAY (ODISHA TAHASIL)
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                          Rs {totalStatutoryFee.toLocaleString("en-IN")}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                          Stamp Duty on Transfer
                        </div>
                        <div className="text-lg font-bold text-emerald-400 mt-0.5">
                          {stampDutyPercentage}
                        </div>
                      </div>
                    </div>

                    {/* Itemized Breakdown Table */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                        <span className="text-white/60 block text-[11px]">Online User Fee:</span>
                        <span className="font-bold text-white text-sm">Rs {baseUserFee}</span>
                      </div>
                      <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                        <span className="text-white/60 block text-[11px]">Notice Process Fee:</span>
                        <span className="font-bold text-white text-sm">Rs {totalNoticeFee}</span>
                        <span className="text-[10px] text-white/50 block">({numHeirs} parties @ Rs 20)</span>
                      </div>
                      <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                        <span className="text-white/60 block text-[11px]">Form 3 General Notice:</span>
                        <span className="font-bold text-white text-sm">Rs {generalNoticeFee}</span>
                      </div>
                      <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                        <span className="text-white/60 block text-[11px]">Certified RoR Nakal:</span>
                        <span className="font-bold text-white text-sm">Rs {copyFee}</span>
                        <span className="text-[10px] text-white/50 block">({numPlots} plot copies)</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-white/80 leading-relaxed border-t border-white/10 pt-3">
                      <strong>Statutory Note:</strong> {stampDutyNote} Under Section 15 of the Odisha
                      Survey &amp; Settlement Act and ORTPSA charter, disposal target is 90 days for
                      uncontested inheritance cases.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: TAHASILDAR HEARING STEPPER */}
              {activeTab === "stepper" && (
                <div className="rounded-3xl bg-white border border-slate-200/90 shadow-md p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">
                        Tahasildar Hearing &amp; RoR Generation Stepper
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Interactive 5-stage procedural roadmap under Rule 34 of Odisha Mutation Manual
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#C65378]">Stage {activeStep} of 5</span>
                  </div>

                  {/* Step Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { step: 1, label: "1. Online e-Filing" },
                      { step: 2, label: "2. Form 3 Notice" },
                      { step: 3, label: "3. RI Spot Enquiry" },
                      { step: 4, label: "4. Tahasil Hearing" },
                      { step: 5, label: "5. RoR Delivery" },
                    ].map((s) => (
                      <button
                        key={s.step}
                        onClick={() => setActiveStep(s.step)}
                        className={`p-3 rounded-xl text-xs font-extrabold transition-all text-center ${
                          activeStep === s.step
                            ? "bg-[#C65378] text-white shadow-sm"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>

                  {/* Stepper Content Panels */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
                    {activeStep === 1 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[#C65378] font-bold text-sm">
                          <FileText className="w-4 h-4" />
                          <span>Stage 1: e-Filing on Bhulekh Odisha &amp; Case Number Generation</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          Submit Form No. 1 application online via Odisha One portal or directly at the
                          Mo Seva Kendra. Upload death certificate of recorded tenant, legal heir
                          certificate, Hal and Sabik Khatiyan copies, and updated Khajana receipt. Upon
                          submission, a unique Mutation Case Number (e.g., <em>MC No. 3412 / 2026</em>) is
                          generated and assigned to the local Tahasil.
                        </p>
                        <div className="pt-2 flex items-center gap-2 text-[11px] font-bold text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-[#5F7E75]" />
                          <span>Estimated Time: Day 1 to Day 5</span>
                        </div>
                      </div>
                    )}

                    {activeStep === 2 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[#C65378] font-bold text-sm">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Stage 2: Form 3 Notice Issuance &amp; 30-Day Public Objection Clock</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          Under Rule 34 of the Odisha Mutation Manual, the Tahasildar issues statutory
                          Form No. 3 notices. These are served directly on all surviving co-heirs and
                          posted publicly at the Tahasil notice board, Gram Panchayat office, and RI
                          chawki. A mandatory 30-day objection period commences from the date of notice
                          publication to allow any person to register objections.
                        </p>
                        <div className="pt-2 flex items-center gap-2 text-[11px] font-bold text-amber-700">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>Mandatory Statutory Window: Strictly 30 Calendar Days</span>
                        </div>
                      </div>
                    )}

                    {activeStep === 3 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[#C65378] font-bold text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>Stage 3: Revenue Inspector (RI) Spot Enquiry &amp; Field Verification</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          The case file is forwarded to the local Revenue Inspector (RI). The RI conducts a
                          spot inquiry at the village to verify physical possession, check boundary pillars,
                          compare Sabik vs Hal survey maps, and record statements of neighbouring plot owners
                          (Chouhaddi). The RI submits a formal Enquiry Report along with a proposed genealogy
                          (Pedigree / Warisan) chart back to the Tahasildar.
                        </p>
                        <div className="pt-2 flex items-center gap-2 text-[11px] font-bold text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-[#5F7E75]" />
                          <span>Estimated Time: Day 35 to Day 55</span>
                        </div>
                      </div>
                    )}

                    {activeStep === 4 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[#C65378] font-bold text-sm">
                          <Gavel className="w-4 h-4" />
                          <span>Stage 4: Tahasildar Hearing &amp; Form 13 Correction Order</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          The Tahasildar convenes a formal revenue court hearing. If no written objections
                          are filed and the RI report is affirmative, the Tahasildar passes a final order
                          directing the Record of Rights to be corrected in Form No. 13. If contentious
                          claims or disputed Wills arise, the Tahasildar records summary findings or directs
                          parties to the competent Civil Court for title adjudication.
                        </p>
                        <div className="pt-2 flex items-center gap-2 text-[11px] font-bold text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-[#5F7E75]" />
                          <span>Estimated Time: Day 60 to Day 75</span>
                        </div>
                      </div>
                    )}

                    {activeStep === 5 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Stage 5: Digital RoR Correction &amp; Delivery of New Khatiyan</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          The revenue record assistant updates the Central Bhulekh Odisha database. A new
                          Khata number is assigned (or applicant names added to existing Khata in Column 2).
                          The digitally signed RoR (Record of Rights) with embedded security QR code becomes
                          available for download on the Bhulekh portal and can be collected from Mo Seva Kendra.
                        </p>
                        <div className="pt-2 flex items-center gap-2 text-[11px] font-bold text-emerald-700">
                          <Clock className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Total Elapsed Time: Within 90-Day ORTPSA Charter</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: CHAKA BANDI & OLR CHECKER */}
              {activeTab === "chakabandi" && (
                <div className="rounded-3xl bg-white border border-slate-200/90 shadow-md p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">
                        Odisha Chaka Bandi &amp; Land Reforms Compliance Checker
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Test Section 34 fragmentation limits and Section 22/23 OLR tribal land rules
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold border border-rose-200">
                      Consolidation Risk Filter
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                        Is Land Located in a Consolidation Area (Chaka Bandi)?
                      </label>
                      <select
                        value={isConsolidated}
                        onChange={(e) => setIsConsolidated(e.target.value as any)}
                        className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                      >
                        <option value="yes">Yes - Village Notified Under 1972 Consolidation Act</option>
                        <option value="no">No - Regular Settlement / Non-Consolidation Area</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                        Total Agricultural Land Area (in Standard Acres)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0.1"
                        max="50"
                        value={totalLandAcre}
                        onChange={(e) => setTotalLandAcre(parseFloat(e.target.value) || 0.1)}
                        className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                        Proposed Number of Partitioned Shares: {proposedShares}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="6"
                        value={proposedShares}
                        onChange={(e) => setProposedShares(parseInt(e.target.value) || 1)}
                        className="w-full accent-[#C65378]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                        Does Recorded Tenant Belong to Scheduled Tribe (ST) or SC?
                      </label>
                      <select
                        value={isTribalLand}
                        onChange={(e) => setIsTribalLand(e.target.value as any)}
                        className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                      >
                        <option value="no">No - General / OBC Rayat</option>
                        <option value="yes">Yes - Scheduled Tribe (ST) / Scheduled Caste (SC) Rayat</option>
                      </select>
                    </div>
                  </div>

                  {/* DIAGNOSTIC RESULT BOX */}
                  <div
                    className={`p-5 rounded-2xl border space-y-3 ${
                      isFragmentationRisk || isScStRisk
                        ? "bg-rose-50/70 border-rose-200 text-rose-950"
                        : "bg-emerald-50/70 border-emerald-200 text-emerald-950"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider">
                      {isFragmentationRisk || isScStRisk ? (
                        <>
                          <AlertTriangle className="w-4 h-4 text-rose-600" />
                          <span className="text-rose-700">STATUTORY RESTRICTION DETECTED</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-700">COMPLIANT WITH ODISHA LAND ACTS</span>
                        </>
                      )}
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
                      {isFragmentationRisk ? (
                        <p>
                          <strong>Section 34 Fragmentation Bar:</strong> Dividing {totalLandAcre} acres
                          into {proposedShares} shares results in <strong>{perShareArea.toFixed(2)} acres per share</strong>.
                          Under Section 34 of the Odisha Consolidation of Holdings and Prevention of
                          Fragmentation of Land Act, 1972, creating any agricultural fragment below 1.0 standard
                          acre is prohibited. The Tahasildar cannot issue separate Khatas without prior
                          consolidation sanction. <em>Recommendation: Maintain joint Khata with proportionate shares.</em>
                        </p>
                      ) : (
                        <p>
                          <strong>Consolidation Permitted:</strong> Average share size of{" "}
                          <strong>{perShareArea.toFixed(2)} acres</strong> meets the statutory minimum standard area.
                          Separate Chaka partition is legally viable under the 1972 Act.
                        </p>
                      )}

                      {isScStRisk && (
                        <p className="border-t border-rose-200/80 pt-2 text-rose-800">
                          <strong>Section 22/23 OLR Act Safeguard:</strong> Land belonging to ST/SC rayats
                          cannot be transferred or mutated to non-ST/SC persons without prior written
                          permission from the Sub-Collector (Revenue Officer). Ensure all claimant heirs are
                          verified direct legal descendants.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* SECTION 3: FORM 3 NOTICE PROCEDURE */}
            <section id="form-3-notice-procedure" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>PROCEDURAL DUE PROCESS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Form 3 Notice: 30-Day Tahasildar Objection Window
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A critical safeguard in Odisha land administration is the issuance of the statutory{" "}
                  <strong>Form No. 3 Notice</strong> under <strong>Rule 34 of the Odisha Mutation Manual</strong>.
                  Whenever a mutation case is instituted following the death of a recorded tenant, the
                  Tahasildar cannot summarily substitute names on private request.
                </p>
                <p>
                  The Tahasildar is mandated by law to publish general and special notices. Special notices
                  are served upon all direct co-heirs named in the genealogy chart. General notices are
                  affixed on the notice board of the Tahasil office, the concerned Gram Panchayat / Municipality,
                  and at prominent spots in the village (Mouza).
                </p>
                <p>
                  A mandatory statutory window of <strong>30 calendar days</strong> is provided from the date
                  of notice service. During this period, any person claiming an interest, coparcenary right, or
                  raising an objection based on a conflicting Will, oral family partition, or prior sale must
                  file their written objections before the revenue court. If no objection is received within
                  30 days, the Tahasildar records an order of non-objection and proceeds to stage the RI inquiry.
                </p>
              </div>
            </section>

            {/* SECTION 4: REVENUE INSPECTOR ENQUIRY */}
            <section id="revenue-inspector-enquiry" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <MapPin className="w-4 h-4" />
                <span>FIELD VERIFICATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Revenue Inspector (RI) Field Spot Enquiry
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The <strong>Revenue Inspector (RI)</strong> functions as the primary field officer in
                  Odisha revenue hierarchy. Following the publication of Form 3 notices, the case docket is
                  transmitted to the RI of the concerned revenue circle. The RI is tasked with conducting
                  an on-site field inquiry to verify ground reality versus paper claims.
                </p>
                <p>
                  The RI performs five indispensable checks during the spot inspection:
                </p>
                <ul className="space-y-2 pl-4 list-disc text-xs sm:text-sm text-slate-700">
                  <li>
                    <strong>Actual Physical Possession:</strong> Verifying who is cultivating agricultural
                    land or residing in homestead (Gharabari) structures.
                  </li>
                  <li>
                    <strong>Boundary Verification:</strong> Comparing ground boundaries with the village
                    revenue map (Sadar Naksha) and Hal survey plots.
                  </li>
                  <li>
                    <strong>Genealogy Verification:</strong> Recording statements of local Ward Members,
                    village elders (Bhadralok), and neighbouring boundary holders (Chouhaddi).
                  </li>
                  <li>
                    <strong>Government Land Encroachment Check:</strong> Ensuring the applicant is not
                    attempting to blend Gochar (pasture), Rakshit (reserved), or Gramya Jungle land into
                    private Khatas.
                  </li>
                  <li>
                    <strong>Arrears of Land Revenue:</strong> Confirming that all past land tax (Khajana)
                    and development cess have been paid in full.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 5: HAL VS SABIK KHATIYAN */}
            <section id="hal-sabik-khatiyan" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>SETTLEMENT CORRELATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Hal vs Sabik Khatiyan Discrepancies &amp; Remedies
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  One of the most frequent hurdles in Odisha property inheritance is the correlation
                  between <strong>Sabik (previous survey/settlement)</strong> and{" "}
                  <strong>Hal (current major settlement)</strong> revenue records. Many ancestral title
                  deeds, partition decrees, and pre-1980 registered documents reference Sabik Khata and
                  Sabik Plot numbers, whereas the Bhulekh portal strictly tracks Hal records.
                </p>
                <p>
                  During mutation, if there is a mismatch between the Sabik acreage and the Hal recorded
                  area, or if an ancestor&rsquo;s name was mistakenly omitted during the final publication
                  under Section 12-B of the Odisha Survey &amp; Settlement Act, the Tahasildar may decline
                  summary mutation.
                </p>
                <p>
                  In such cases, the applicant must obtain a certified <em>Comparative Sabik-Hal Statement</em>{" "}
                  from the District Record Room or Settlement Office. Where gross clerical or settlement
                  errors exist, a revision petition under <strong>Section 15 of the Odisha Survey &amp; Settlement Act</strong>{" "}
                  before the Settlement Officer or Sub-Collector is the statutory corrective avenue before
                  mutation can proceed.
                </p>
              </div>
            </section>

            {/* SECTION 6: WILL VS INTESTATE (NO PROBATE IN ODISHA) */}
            <section id="will-vs-intestate-odisha" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>PROBATE EXEMPTION IN ODISHA</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Registered Will vs Intestate: No Probate in Odisha
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A widespread misconception among Odisha landowners is that a Will must be probated by
                  a District Court or High Court before the Tahasildar can mutate land records.
                  <strong> This is legally incorrect in Odisha.</strong>
                </p>
                <p>
                  Under <strong>Section 213(2) read with Section 57 of the Indian Succession Act, 1925</strong>,
                  the requirement of obtaining probate or Letters of Administration applies only to Wills
                  executed within the local limits of the ordinary original civil jurisdiction of the High
                  Courts at Calcutta, Madras, and Bombay, or Wills relating to immovable property situated
                  within those Presidency towns.
                </p>
                <p>
                  The <strong>Hon&rsquo;ble High Court of Orissa</strong> has repeatedly reaffirmed (including
                  in <em>Durga Charan Routray v. Basanta Kumar Routray</em> and subsequent division bench rulings)
                  that a Hindu executing a Will in the State of Odisha in respect of properties located in
                  Odisha is <strong>not required to obtain probate</strong>. A registered Will accompanied by
                  the testator&rsquo;s death certificate and witness affidavits is fully admissible before the
                  Tahasildar for updating Column 2 of the Bhulekh RoR.
                </p>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                  <strong>Important Caution:</strong> While probate is not mandatory, the Tahasildar is a
                  revenue court, not a civil court. If other co-heirs file genuine caveats alleging fraud,
                  undue influence, or mental incapacity, the Tahasildar cannot adjudicate the validity of the
                  Will and will direct the propounder to establish title in the competent Civil Court.
                </div>
              </div>
            </section>

            {/* SECTION 7: CHAKA BANDI CONSOLIDATION RULES */}
            <section id="chaka-bandi-consolidation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Compass className="w-4 h-4" />
                <span>CONSOLIDATION SAFEGUARDS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Chaka Bandi Rules: Bar on Land Fragmentation
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The <strong>Odisha Consolidation of Holdings and Prevention of Fragmentation of Land Act, 1972</strong>{" "}
                  was enacted to prevent the crippling division of agricultural land into economically
                  unviable fragments. In thousands of Odisha villages, land holdings were reorganized into
                  consolidated blocks termed <strong>&ldquo;Chaka&rdquo;</strong>.
                </p>
                <p>
                  Under <strong>Section 34</strong> of the Act, a strict statutory prohibition applies: no
                  person shall transfer, partition, or sub-divide any consolidated Chaka plot so as to create
                  a fragment below the statutory standard area (ordinarily 1 standard acre for agricultural
                  land). Any partition deed or settlement that violates this provision is null and void under
                  Section 35.
                </p>
                <p>
                  When multiple legal heirs inherit a consolidated Chaka, the Tahasildar will not divide the
                  physical plot or create separate micro-Khatas if each heir&rsquo;s share falls below the
                  threshold. Instead, the Tahasildar will issue a <strong>Joint Khata (Ijmal Khata)</strong>,
                  recording all co-heirs as joint tenants with specified fractional shares.
                </p>
              </div>
            </section>

            {/* SECTION 8: SC/ST LAND ALIENATION (OLR ACT) */}
            <section id="olr-sc-st-safeguards" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>AGRARIAN REFORM SAFEGUARDS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. SC &amp; ST Land Alienation Safeguards (OLR Act)
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The <strong>Odisha Land Reforms Act, 1960 (OLR Act)</strong> contains stringent constitutional
                  protections designed to prevent land alienation of Scheduled Castes and Scheduled Tribes.
                  Under <strong>Section 22</strong>, any transfer of holding belonging to a rayat of a
                  Scheduled Tribe or Scheduled Caste to a person who is not a member of the same community
                  is strictly void without prior written permission of the Revenue Officer (Sub-Collector).
                </p>
                <p>
                  Under <strong>Section 23</strong>, the Sub-Collector possesses suo motu powers to evict any
                  unauthorized occupant and restore possession to the tribal rayat or their legal heirs.
                  During inheritance mutation, the Tahasildar verifies that all applicant heirs belong to the
                  same community. Any attempt to use an informal agreement or Will to transfer tribal holding
                  to non-tribal persons will be summarily rejected and reported for Section 23 proceedings.
                </p>
              </div>
            </section>

            {/* SECTION 9: STATUTORY FEE COMPARISON TABLE */}
            <section id="fee-comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>COMPARATIVE FISCAL ANALYSIS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Statutory Fee Breakdown: Succession vs Sale
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Review the statutory difference between inheritance mutation and other property conveyance
                modes under Odisha Stamp and Revenue regulations:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="py-3 px-4 font-bold">Transaction Type</th>
                      <th className="py-3 px-4 font-bold">Stamp Duty (SRO)</th>
                      <th className="py-3 px-4 font-bold">Registration Fee</th>
                      <th className="py-3 px-4 font-bold">Bhulekh Mutation User Fee</th>
                      <th className="py-3 px-4 font-bold">Court / Notice Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="bg-rose-50/50 font-semibold">
                      <td className="py-3 px-4 text-[#C65378]">Inheritance / Warisan (No Will)</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">Rs 0 (Exempt)</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">Rs 0 (Exempt)</td>
                      <td className="py-3 px-4">Rs 40 (e-Services)</td>
                      <td className="py-3 px-4">Rs 20 per notice heir</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-slate-900">Registered Will Succession</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">Rs 0 (Exempt)</td>
                      <td className="py-3 px-4">Nominal (Registration)</td>
                      <td className="py-3 px-4">Rs 40 (e-Services)</td>
                      <td className="py-3 px-4">Rs 150 (Citation/Notice)</td>
                    </tr>
                    <tr className="bg-slate-50/60">
                      <td className="py-3 px-4 font-medium text-slate-900">Family Partition Deed</td>
                      <td className="py-3 px-4">Rs 250 - Rs 500 flat</td>
                      <td className="py-3 px-4">1% or flat fee</td>
                      <td className="py-3 px-4">Rs 40 (e-Services)</td>
                      <td className="py-3 px-4">Rs 20 per notice heir</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-slate-900">Gift Deed (Family Member)</td>
                      <td className="py-3 px-4">5% of Benchmark Value</td>
                      <td className="py-3 px-4">2% of Benchmark Value</td>
                      <td className="py-3 px-4">Rs 40 (e-Services)</td>
                      <td className="py-3 px-4">Rs 20 per notice heir</td>
                    </tr>
                    <tr className="bg-slate-50/60">
                      <td className="py-3 px-4 font-medium text-slate-900">Sale Deed (Third-Party)</td>
                      <td className="py-3 px-4">5% (Male) / 4% (Female)</td>
                      <td className="py-3 px-4">2% of Market Value</td>
                      <td className="py-3 px-4">Rs 40 (e-Services)</td>
                      <td className="py-3 px-4">Rs 20 per notice party</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 10: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <CheckCircle2 className="w-4 h-4" />
                <span>OPERATIONAL STANDARD OPERATING PROCEDURE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Step-by-Step SOP: Online Bhulekh to Final RoR
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <span className="font-extrabold text-slate-900 text-sm block">
                    Step 1: Procure Statutory Death and Legal Heir Certificates
                  </span>
                  <p>
                    Obtain the official Death Certificate from the Registrar of Births and Deaths. Apply for
                    a Legal Heir Certificate before the competent Tahasildar via the e-District Odisha portal
                    to establish the verified list of Class I legal heirs under the Hindu Succession Act.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <span className="font-extrabold text-slate-900 text-sm block">
                    Step 2: Obtain Current RoR (Hal Khatiyan) and Khajana Clearance
                  </span>
                  <p>
                    Download the latest certified copy of the Record of Rights from <code>bhulekh.ori.nic.in</code>.
                    Pay all pending Land Revenue (Khajana) through the Odisha e-Pauti portal and secure an
                    up-to-date digital clearance receipt.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <span className="font-extrabold text-slate-900 text-sm block">
                    Step 3: Submit Online Mutation Application on Revenue Court Portal
                  </span>
                  <p>
                    Log on to the Odisha Revenue Court Management System (or Odisha One / Mo Seva Kendra).
                    Fill Form No. 1 with Mouza, Thana No., Hal Khata No., and Plot details. Pay the Rs 40 user
                    charge and upload all KYC and succession documents. Note the Mutation Case Number.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <span className="font-extrabold text-slate-900 text-sm block">
                    Step 4: Form 3 Notice Publication and 30-Day Window Monitoring
                  </span>
                  <p>
                    Track the issuance of Form No. 3 notice by the Tahasildar. Ensure all co-heirs receive
                    notice copies. If any co-heir resides outside Odisha, ensure postal service or sworn
                    consent affidavits are filed early to avoid unnecessary hearing adjournments.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5">
                  <span className="font-extrabold text-slate-900 text-sm block">
                    Step 5: Attend Tahasildar Hearing and Download Digital Khatiyan
                  </span>
                  <p>
                    Attend the scheduled hearing before the Tahasildar or Additional Tahasildar. Present
                    original documents for verification. Once the Tahasildar signs the Form 13 final order,
                    the Bhulekh database updates within 7 days, allowing you to download the new RoR.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>CASE STUDY ARCHIVES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Practical Case Studies: Cuttack, Khordha, Sambalpur
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm">
                    Case 1: Cuttack Sadar Tahasil (Unbroken Male Lineage)
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Situation:</strong> Three sons applied to mutate 4.2 acres of agricultural land
                    in Mouza Choudwar following father&rsquo;s demise.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Challenge:</strong> One married daughter lived in Hyderabad and had not signed
                    the initial application.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Resolution:</strong> Tahasildar issued Form 3 notice to daughter under Rule 34.
                    Following <em>Vineeta Sharma (2020)</em>, her equal 1/4th share was recognized, and a
                    Joint Khata was issued in 58 days with Rs 120 total statutory fees.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm">
                    Case 2: Khordha / Bhubaneswar (Registered Will Probate Dispute)
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Situation:</strong> Grandson presented registered Will for Gharabari plot in
                    Jatani Tahasil.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Challenge:</strong> Tahasil clerk insisted on High Court probate certificate.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Resolution:</strong> Counsel cited Section 213(2) of Indian Succession Act and
                    Orissa High Court precedents. The Tahasildar verified the registered Will with attesting
                    witness affidavits and passed Form 13 order without demanding probate.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm">
                    Case 3: Sambalpur Sadar (Chaka Bandi Fragmentation)
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Situation:</strong> Two brothers sought separate Khatas for a 1.2-acre
                    consolidated Chaka holding.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Challenge:</strong> Proposed split yielded 0.60 acres each, violating the
                    1.0-acre standard area limit under Section 34 of the 1972 Act.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Resolution:</strong> Physical fragmentation was denied. Tahasildar issued a
                    Joint Khata with 50% undivided fractional shares, protecting title validity.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: LEGAL RECITAL TEMPLATES & CHECKLIST */}
            <section id="legal-recital-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>LEGAL DRAFTING &amp; COMPLIANCE CHECKLIST</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Legal Recital Templates &amp; Document Checklist
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Copy statutory clauses and verify all 10 mandatory documents before approaching the Tahasil:
              </p>

              {/* CLAUSE BOX */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-300 uppercase tracking-wider">
                    <FileText className="w-4 h-4" />
                    <span>Statutory Will Recital for Odisha Real Estate</span>
                  </div>
                  <button
                    onClick={copyClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors"
                  >
                    {copiedClause ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed bg-black/30 p-3 rounded-xl border border-white/10">
{`"I declare that the Schedule Property situated in Mouza [Name], Tahasil [Name], District [Name], under Hal Khata No. [Number], Plot No. [Number], measuring [Area in Acres/Decimals], is my absolute self-acquired property.

I acquired absolute title through [personal earnings / inheritance under Section 8 of Hindu Succession Act, 1956 / registered settlement].

Under the ruling of the Hon'ble High Court of Orissa, probate is not mandatory for this Will. Upon my demise, my named beneficiary [Beneficiary Name] shall hold absolute title and shall be entitled to apply for Record of Rights (RoR) mutation before the Tahasildar under Rule 34 of the Odisha Mutation Manual and Section 15 of the Odisha Survey & Settlement Act, 1958, without partition dispute."`}
                </pre>
              </div>

              {/* CHECKLIST BOX */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>10-Point Tahasildar Mutation Document Checklist</span>
                  </div>
                  <button
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold transition-colors text-slate-800"
                  >
                    {copiedChecklist ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Checklist</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                    <span>Deceased Rayat Death Certificate (Municipal / Panchayat)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                    <span>Legal Heir / Warisan Certificate from Tahasildar</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                    <span>Certified Hal Khatiyan (RoR) from Bhulekh portal</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">4</span>
                    <span>Sabik Khatiyan record copy for genealogical title tracing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">5</span>
                    <span>Up-to-date Land Revenue (Khajana) digital receipt</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">6</span>
                    <span>Aadhaar and Voter KYC of all surviving legal heirs</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">7</span>
                    <span>Registered Will deed copy with death proof (if testamentary)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">8</span>
                    <span>Registered Partition Deed or family settlement decree</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">9</span>
                    <span>Form 3 notice service acknowledgments / co-heir affidavits</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">10</span>
                    <span>Section 22/23 OLR Act Sub-Collector clearance (if SC/ST land)</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: Odisha Mutation
              </h3>

              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden transition-shadow duration-200 hover:shadow-xs"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left text-xs sm:text-sm font-bold text-slate-900 hover:text-[#C65378] transition-colors"
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

            {/* SECTION 14: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>OFFICIAL STATUTORY PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Legal Citations &amp; Judicial Portals
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs text-slate-600">
                <p>
                  All fee computations and procedural workflows on this page are grounded in Indian
                  statutes, state revenue codes, and High Court of Orissa judgments:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://bhulekh.ori.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Bhulekh Odisha: Land Records Web Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://revenue.odisha.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Odisha Revenue &amp; Disaster Management Dept</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Indian Succession Act 1925</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Calculators &amp; Property Tools
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/ancestral-vs-self-acquired-property-classifier"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Ancestral vs Self-Acquired Classifier
                    </Link>
                    <Link
                      href="/tools/succession-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Hindu Legal Heir Share Tool
                    </Link>
                    <Link
                      href="/tools/probate-checker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Probate Rule Checker
                    </Link>
                    <Link
                      href="/tools/capital-gains-tax-calculator-inherited-property"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Inherited Property Tax Tool
                    </Link>
                    <Link
                      href="/templates/will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Legal Will Template India
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* PLAIN-ENGLISH THREE-CARD SUMMARY (FLESCH READABILITY ENHANCER) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Write a Will Now?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A clear Will protects your family from long Tahasildar disputes. You decide exactly who
                  gets your agricultural plots and homestead land. It stops partition fights among relatives.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">No Probate Needed in Odisha</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You can write your Will on plain paper. Probate is not mandatory for Hindus in Odisha.
                  Sign before two adult witnesses to create a fully valid testamentary document.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Legal Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our advocates draft fight-proof Wills with exact Hal Khata and Plot numbers. We also guide
                  you through Tahasildar Form 3 notices and ensure smooth digital Khatiyan updates.
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
                Expert in state revenue laws, Record of Rights mutation disputes, Tahasildar appeals,
                and fight-proof Will structuring for Indian landowners.
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
                  <span>PREVENT TAHASIL MUTATION DISPUTES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Odisha Land with a Registered Will
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Avoid intestate Khatiyan division and Chaka fragmentation hurdles. Name your chosen heirs
                  with unambiguous Hal survey plot recitals.
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

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (White / Rose Border) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>REVENUE COURT &amp; TAHASIL DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Facing Form 3 Objections or RoR Rejection?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our civil litigators handle Section 15 appeals before Sub-Collectors, Tahasildar
                  hearings, and Chaka consolidation disputes pan-Odisha.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Schedule Lawyer Talk</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Landowners Rely on WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>High Court Compliant:</strong> Fully aligns with Orissa High Court
                      succession and probate exemption precedents.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Chaka Bandi Safeguards:</strong> Prevents void partition deeds under Section
                      34 of the 1972 Consolidation Act.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Hidden Costs:</strong> Accurate calculation of statutory e-services and
                      Form 3 notice process fees.
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
          href="#interactive-calculator"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Fee Calculator</span>
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