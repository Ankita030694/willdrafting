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
  FileText,
  Layers,
  Globe2,
  Coins,
  ShieldAlert,
  Calendar,
  Briefcase,
  Compass,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Cross-Border Matrix: DIFC vs ADJD vs Indian Will" },
  { id: "interactive-decision-tool", label: "2. Interactive Cross-Border Decision Tool" },
  { id: "cost-benefit-comparator", label: "3. Registration Cost Comparison: DIFC vs ADJD vs India" },
  { id: "sharia-freeze-risk-analysis", label: "4. Sharia Bank Account Freeze & Guardianship Risks" },
  { id: "indian-asset-resealing-trap", label: "5. Section 228 ISA Trap: Why DIFC Wills Fail in India" },
  { id: "dual-concurrent-wills-strategy", label: "6. The Dual Concurrent Wills Strategy (Gold Standard)" },
  { id: "adgm-abu-dhabi-option", label: "7. ADGM Courts vs DIFC vs ADJD: Jurisdiction Guide" },
  { id: "jurisdiction-comparison-table", label: "8. Master Comparison Table: UAE & Indian Estate Options" },
  { id: "step-by-step-sop", label: "9. Step-by-Step SOP: Dual Cross-Border Will Execution" },
  { id: "practical-case-studies", label: "10. Real Case Studies: Dubai, Abu Dhabi & Sharjah Expats" },
  { id: "statutory-recital-templates", label: "11. Cross-Border Recital Clauses & Document Checklist" },
  { id: "institutional-profile", label: "12. Institutional Profile: Cross-Border Practice" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions: UAE & Indian Wills" },
  { id: "statutory-citations", label: "14. Statutory Authorities & Court Registry Portals" },
];

const FAQS = [
  {
    q: "Can a single DIFC Will cover my property in India?",
    a: "While DIFC wills can nominally state worldwide assets, Indian authorities do not execute foreign probate orders directly. Under Section 228 of the Indian Succession Act 1925, your heirs must file an ancillary probate (resealing) petition in an Indian High Court. This process takes 12 to 24 months and requires full court fees. A separate Indian Will avoids this friction completely.",
  },
  {
    q: "What is the difference in cost between a DIFC Will and an ADJD Will?",
    a: "A standard DIFC Full Will registration fee is approximately AED 10,000 to AED 15,000 (often reaching AED 20,000+ with drafting). In contrast, an Abu Dhabi Judicial Department (ADJD) Non-Muslim Will registration fee is only approximately AED 950 to AED 1,000 (totaling AED 1,500 to AED 2,500 with drafting and bilingual translation). ADJD offers over 80% cost savings for UAE asset coverage.",
  },
  {
    q: "What happens to my Dubai bank accounts if I die without a UAE Will?",
    a: "Under UAE Central Bank regulations, upon notification of death, personal bank accounts (and even joint accounts) are immediately frozen. Without a registered DIFC or ADJD Will, the estate falls under default onshore court procedures governed by Sharia principles. This causes prolonged delays and leaves surviving family members without immediate funds.",
  },
  {
    q: "Why is the Dual Concurrent Wills strategy considered the gold standard?",
    a: "The Dual Concurrent Wills strategy uses two distinct wills: one registered in the UAE (via ADJD or DIFC) strictly covering UAE assets, and a second Will registered in India under the Indian Succession Act 1925 strictly covering Indian assets. Both wills contain reciprocal non-revocation clauses. This ensures immediate probate in both jurisdictions without costly international resealing.",
  },
  {
    q: "Does an ADJD Will registered in Abu Dhabi protect properties in Dubai?",
    a: "Yes. Under Abu Dhabi Law No. 14 of 2021 and UAE Federal Decree-Law No. 41 of 2022 on Civil Personal Status for Non-Muslims, a Will registered with the ADJD Non-Muslim Wills Office is legally valid and enforceable across all seven emirates, including Dubai, Sharjah, and Ras Al Khaimah.",
  },
  {
    q: "Can an Indian Will alone transfer UAE assets after death?",
    a: "No. UAE banks and land departments will not automatically accept an Indian probate order. The Indian probate must be consularized, translated into Arabic, legalized by the UAE Ministry of Foreign Affairs (MOFA), and approved by UAE civil courts. This takes months while UAE bank accounts remain frozen.",
  },
  {
    q: "How does minor child guardianship work under DIFC and ADJD wills?",
    a: "Both DIFC and ADJD non-Muslim wills allow parents to nominate interim and permanent guardians for minor children. This prevents local authorities from placing minors in temporary custody or applying default Sharia guardianship rules in the event of both parents passing away.",
  },
  {
    q: "What happens if an Indian Will accidentally revokes a UAE Will?",
    a: "Many standard Indian Will templates include a blanket clause revoking 'all prior wills and codicils made worldwide'. If an Indian expat signs this template after registering a UAE Will, it legally revokes the UAE Will. Cross-border wills must contain an express non-revocation clause preserving existing foreign wills.",
  },
];

export default function UaeCrossBorderDecisionToolClient() {
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
  const [assetGeography, setAssetGeography] = useState<
    "uae_only" | "india_only" | "both_uae_india" | "uae_business_india_ancestral"
  >("both_uae_india");

  const [indianRealEstate, setIndianRealEstate] = useState<
    "no_real_estate" | "presidency_town" | "non_presidency" | "agricultural_ancestral"
  >("presidency_town");

  const [guardianshipNeeds, setGuardianshipNeeds] = useState<
    "minor_in_uae" | "adult_children" | "no_children"
  >("minor_in_uae");

  const [planningGoal, setPlanningGoal] = useState<
    "cost_optimized" | "difc_preference" | "freeze_prevention" | "generational_transfer"
  >("cost_optimized");

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
    setAssetGeography("both_uae_india");
    setIndianRealEstate("presidency_town");
    setGuardianshipNeeds("minor_in_uae");
    setPlanningGoal("cost_optimized");
  };

  // Cross-Border Decision Engine Logic
  let decisionTitle = "Dual Concurrent Wills: ADJD (UAE) + Separate Indian Will";
  let decisionBadge = "Gold Standard Strategy";
  let estTotalCost = "AED 2,200 – 3,500 (~₹50,000 – ₹78,000)";
  let costSavingsPercent = "Save 80% vs DIFC Worldwide Will";
  let resealingFriction = "Zero Friction: Direct SRO Registration & Indian Probate";
  let shariaFreezeRisk = "100% Protected (No Bank Account or Visas Frozen)";
  let protectionScore = 98;
  let primaryRecommendation =
    "Register a Non-Muslim Will with Abu Dhabi Judicial Department (ADJD) covering all UAE bank accounts, real estate, and minor guardianship. Simultaneously, draft and register an independent Indian Will under the Indian Succession Act 1925 covering Indian properties and financial assets.";
  let statutoryRationale =
    "Under Abu Dhabi Law No. 14 of 2021, an ADJD Will covers all UAE assets at a fraction of DIFC costs (AED 950 official fee). For Indian assets, an independent Indian Will avoids the cumbersome 12-24 month ancillary probate resealing under Section 228 ISA.";

  if (assetGeography === "uae_only") {
    if (planningGoal === "difc_preference") {
      decisionTitle = "Single DIFC Freehold / Full Will (UAE Assets Only)";
      decisionBadge = "DIFC Common Law Direct";
      estTotalCost = "AED 10,000 – 15,000 ($2,700 – $4,100)";
      costSavingsPercent = "Premium English Common Law Registry";
      resealingFriction = "Not Applicable (No Indian Assets)";
      shariaFreezeRisk = "100% Protected (Direct DIFC Court Execution)";
      protectionScore = 95;
      primaryRecommendation =
        "Register a DIFC Full Will (or Property Will) directly with the DIFC Wills Service Centre. It offers direct English common law administration in Dubai without onshore civil translation.";
      statutoryRationale =
        "Governed by DIFC Wills and Probate Registry Rules 2015. Ideal if your entire estate is within Dubai and you prefer English-speaking common law judiciary.";
    } else {
      decisionTitle = "ADJD Non-Muslim Will (All 7 Emirates Asset Coverage)";
      decisionBadge = "Maximum Cost Efficiency";
      estTotalCost = "AED 950 – 1,800 (~₹21,000 – ₹40,000)";
      costSavingsPercent = "Save 85% vs DIFC Registry";
      resealingFriction = "Not Applicable (No Indian Assets)";
      shariaFreezeRisk = "100% Protected (Federal Decree-Law 41/2022)";
      protectionScore = 96;
      primaryRecommendation =
        "Register an ADJD Non-Muslim Will online via the Abu Dhabi Judicial Department portal. Valid across Dubai, Abu Dhabi, Sharjah, and northern emirates for bank accounts, real estate, and guardianship.";
      statutoryRationale =
        "Abu Dhabi Law No. 14 of 2021 and UAE Federal Decree-Law No. 41 of 2022 grant non-Muslim expats full testamentary freedom over UAE assets at minimal statutory cost.";
    }
  } else if (assetGeography === "india_only") {
    decisionTitle = "Standalone Registered Indian Will (ISA 1925)";
    decisionBadge = "Direct Indian Succession";
    estTotalCost = "₹10,000 – ₹25,000 (AED 450 – 1,100)";
    costSavingsPercent = "Zero UAE Registry Cost Needed";
    resealingFriction = "Zero Friction: Direct Sub-Registrar / Probate Execution";
    shariaFreezeRisk = "Zero Risk (No UAE Bank Accounts)";
    protectionScore = 100;
    primaryRecommendation =
      "Draft a legally airtight Indian Will under Section 63 of the Indian Succession Act 1925 and register it at your local Sub-Registrar Office in India. Appoint a trustworthy executor based in India.";
    statutoryRationale =
      "Indian immovable property is strictly governed by Lex Situs. A registered Indian Will eliminates delays, simplifies revenue mutation, and satisfies Section 213 ISA requirements.";
  } else if (assetGeography === "uae_business_india_ancestral") {
    decisionTitle = "Tri-Partite Structure: ADGM / DIFC Commercial + ADJD + Indian Will";
    decisionBadge = "Corporate & Ancestral Complex";
    estTotalCost = "AED 6,500 – 12,000 (~₹1,45,000 – ₹2,70,000)";
    costSavingsPercent = "Tailored High-Net-Worth Multi-Jurisdiction Plan";
    resealingFriction = "Separated: Indian Ancestral Share Bequeathed under HSA s. 30";
    shariaFreezeRisk = "100% Protected (Corporate Share Transmission Unlocked)";
    protectionScore = 99;
    primaryRecommendation =
      "Structure corporate share succession via DIFC/ADGM or ADJD Commercial Will, combined with a separate Indian Will bequeathing your undivided share in ancestral or self-acquired Indian assets under Section 30 of the Hindu Succession Act.";
    statutoryRationale =
      "Commercial entity shares require specific corporate board resolutions and registry compliance, while Indian ancestral holdings are restricted by Hindu coparcenary law.";
  } else {
    // both_uae_india
    if (planningGoal === "difc_preference") {
      decisionTitle = "Dual Wills: DIFC (UAE Limited) + Separate Registered Indian Will";
      decisionBadge = "DIFC + Indian Dual Structure";
      estTotalCost = "AED 12,000 – 18,000 (~₹2,70,000 – ₹4,00,000)";
      costSavingsPercent = "Avoids Indian Section 228 Resealing Costs";
      resealingFriction = "Zero Friction in India (Separate Indian Will)";
      shariaFreezeRisk = "100% Protected in UAE (DIFC English Common Law)";
      protectionScore = 97;
      primaryRecommendation =
        "Execute a DIFC Will restricted exclusively to UAE assets, and a separate Indian Will for Indian immovable and movable assets. Ensure both documents have non-revocation clauses.";
      statutoryRationale =
        "Restricting the DIFC Will to UAE assets prevents its executors from having to navigate Section 228 ISA resealing in Indian High Courts.";
    } else {
      decisionTitle = "Dual Concurrent Wills: ADJD (UAE) + Separate Indian Will";
      decisionBadge = "Gold Standard Strategy";
      estTotalCost = "AED 2,200 – 3,500 (~₹50,000 – ₹78,000)";
      costSavingsPercent = "Save 80% vs DIFC Worldwide Will";
      resealingFriction = "Zero Friction: Direct SRO Registration & Indian Probate";
      shariaFreezeRisk = "100% Protected (No Bank Account or Visas Frozen)";
      protectionScore = 98;
      primaryRecommendation =
        "Register an ADJD Non-Muslim Will for UAE bank accounts, cars, and Dubai apartments. Pair it with an online Indian Will drafted and registered in India for Indian flats, plots, and mutual funds.";
      statutoryRationale =
        "ADJD gives full protection against Sharia estate distribution across the UAE for ~AED 950, while a separate Indian Will ensures your heirs avoid 2 years of High Court resealing in India.";
    }
  }

  const copyClauseToClipboard = () => {
    const clauseText = `STATUTORY RECITAL CLAUSE: CROSS-BORDER TERRITORIAL JURISDICTION & NON-REVOCATION
"1. TERRITORIAL LIMITATION & SCOPE:
This Last Will and Testament applies exclusively to all my movable and immovable properties, assets, bank accounts, investments, and interests situated within the Republic of India.

2. RECIPROCAL NON-REVOCATION OF FOREIGN / UAE WILLS:
I hereby confirm that I have registered (or intend to register) a separate Last Will and Testament with the Abu Dhabi Judicial Department (ADJD) / Dubai International Financial Centre (DIFC) Wills Service Centre to govern my assets situated in the United Arab Emirates. 

I expressly declare that this Indian Will does NOT revoke, cancel, amend, or superscribe my said UAE Will (or any other foreign testamentary instrument expressly limited to assets outside India). Both Wills shall operate concurrently as independent, complementary testamentary instruments within their respective territorial jurisdictions.

3. EXECUTORSHIP & SEPARATE TRANSMISSION:
I appoint [Name of Indian Executor], resident of [Address in India], as the sole Executor of this Indian Will. My Indian Executor shall have no administrative duties over my UAE estate, which shall be administered independently under the terms of my UAE Will."`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `DOCUMENT CHECKLIST: UAE EXPAT CROSS-BORDER WILL PREPARATION
1. Valid Passport & Emirates ID copies (Testator & Nominated Executors).
2. UAE Residence Visa copies & proof of address in Dubai / Abu Dhabi.
3. Schedule of UAE Assets: Bank accounts (IBANs), Ejari/Title Deeds, vehicle registration cards.
4. Schedule of Indian Assets: Registered Sale Deeds, Mutation/Khata extract, Demat Client Master List (CML), NRE/NRO account numbers.
5. Minor Children Passports & Birth Certificates (for ADJD / DIFC Guardianship declaration).
6. Non-Muslim Declaration (under UAE Federal Decree-Law No. 41 of 2022).
7. Draft Indian Will with reciprocal territorial exclusion & non-revocation clauses.
8. Two independent adult attesting witnesses (not beneficiaries or spouses of beneficiaries).`;
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
            <Globe2 className="w-3.5 h-3.5 text-[#C65378]" />
            <span>DIFC RULES • ABU DHABI LAW NO. 14 OF 2021 • INDIAN SUCCESSION ACT S. 228</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            UAE DIFC, ADJD or Indian Will Cross-Border Decision Tool
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Compare costs, jurisdiction, and validity of DIFC wills, ADJD registration, and separate
            Indian wills for UAE expats. Protect your family from frozen accounts and delays.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-decision-tool"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Compass className="w-4 h-4" />
              <span>Run Cross-Border Decision Tool</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Indian Will Online</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: TWO-COLUMN LAYOUT WITH STICKY SIDEBAR
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* =====================================================================
              LEFT TWO COLUMNS: MAIN ARTICLE BODY
              ===================================================================== */}
          <main className="lg:col-span-2 space-y-10">
            {/* INLINE TABLE OF CONTENTS */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>CROSS-BORDER JURISDICTION GUIDE</span>
              </div>
              <div className="text-base sm:text-lg font-black text-slate-900">
                Table of Contents: UAE &amp; Indian Estate Planning
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs">
                {TOC_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                      activeId === item.id
                        ? "border-[#C65378] bg-rose-50/60 font-bold text-[#C65378]"
                        : "border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="truncate pr-2">{item.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                  </a>
                ))}
              </div>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>CROSS-BORDER JURISDICTION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Cross-Border Matrix: DIFC vs ADJD vs Indian Will
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Over 35 lakh Indians live in the UAE. Many families buy a flat in Dubai or Abu Dhabi.
                  They hold local bank accounts, job gratuity, and company shares. At the same time, they
                  own flats, land, fixed deposits, and mutual funds in India.
                </p>
                <p>
                  Planning your estate as a UAE expat involves two legal systems. You must deal with UAE
                  civil laws and the Indian Succession Act 1925. Making the wrong choice can freeze your
                  Dubai bank accounts. It can also cause years of High Court delay in India.
                </p>
                <p>
                  Should you pay for a costly DIFC Will, use the simple ADJD registry, or write an Indian
                  Will? This guide explains the true fees, legal rules, and the two-will plan.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE DECISION TOOL */}
            <section id="interactive-decision-tool" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>DECISION MATRIX WIZARD</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Cross-Border Decision Tool
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your asset distribution, real estate location, and family requirements below.
                Get an instant diagnostic recommendation with clear fee comparisons and risk ratings.
              </p>

              {/* Tool Wizard Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Question 1: Asset Geography */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-[#C65378]" />
                    <span>Question 1: Where are your primary assets and investments located?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        id: "both_uae_india",
                        label: "Both UAE & India Assets",
                        desc: "Dubai/Abu Dhabi flat or bank + Indian real estate/funds",
                      },
                      {
                        id: "uae_only",
                        label: "UAE Assets Only",
                        desc: "All real estate, bank cash, and gratuity situated in the UAE",
                      },
                      {
                        id: "india_only",
                        label: "India Assets Only",
                        desc: "Expat living in UAE with all investments situated in India",
                      },
                      {
                        id: "uae_business_india_ancestral",
                        label: "UAE Corporate + Indian Ancestral",
                        desc: "UAE LLC/Free Zone shares + ancestral family property in India",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setAssetGeography(opt.id as any)}
                        className={`text-left p-3.5 rounded-2xl border transition-all ${
                          assetGeography === opt.id
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

                {/* Question 2: Real Estate Holdings in India */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>Question 2: What type of real estate do you own in India?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        id: "presidency_town",
                        label: "Flat in Mumbai, Kolkata or Chennai",
                        desc: "Presidency towns where court probate is mandatory under Section 213 ISA",
                      },
                      {
                        id: "non_presidency",
                        label: "Property in Delhi, Bengaluru, Pune, etc.",
                        desc: "Non-presidency cities where probate is optional but mutation requires Will",
                      },
                      {
                        id: "agricultural_ancestral",
                        label: "Agricultural Land / Ancestral Share",
                        desc: "Strictly subject to state revenue codes and Hindu Succession Section 30",
                      },
                      {
                        id: "no_real_estate",
                        label: "No Indian Real Estate",
                        desc: "Only NRE/NRO fixed deposits, mutual funds, and demat shares in India",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setIndianRealEstate(opt.id as any)}
                        className={`text-left p-3.5 rounded-2xl border transition-all ${
                          indianRealEstate === opt.id
                            ? "border-[#C65378] bg-rose-50/50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="font-bold text-xs text-slate-900">{opt.label}</div>
                        <div className="text-[11px] text-slate-600 mt-0.5">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 3: Minor Guardianship */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#C65378]" />
                    <span>Question 3: Do you have minor children residing with you in the UAE?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "minor_in_uae",
                        label: "Yes, Minor Children in UAE",
                        desc: "Urgent interim & permanent non-Muslim guardianship required",
                      },
                      {
                        id: "adult_children",
                        label: "Adult Children Only",
                        desc: "Asset transmission only; no minor custody declaration required",
                      },
                      {
                        id: "no_children",
                        label: "No Children / Spouse Only",
                        desc: "Single or couple directing full estate to spouse or siblings",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setGuardianshipNeeds(opt.id as any)}
                        className={`text-left p-3 rounded-xl border transition-all ${
                          guardianshipNeeds === opt.id
                            ? "border-[#C65378] bg-rose-50/50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="font-bold text-xs text-slate-900">{opt.label}</div>
                        <div className="text-[11px] text-slate-600 mt-0.5">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 4: Goal & Budget */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Coins className="w-4 h-4 text-[#C65378]" />
                    <span>Question 4: What is your primary estate planning goal &amp; budget?</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      {
                        id: "cost_optimized",
                        label: "Cost-Optimized Protection",
                        desc: "Maximum legal safety while avoiding high registration fees",
                      },
                      {
                        id: "freeze_prevention",
                        label: "Stop Bank Account Freeze",
                        desc: "Immediate fund release for spouse without Sharia delay",
                      },
                      {
                        id: "difc_preference",
                        label: "DIFC Common Law Courts",
                        desc: "Prefer English-speaking DIFC Court registry in Dubai",
                      },
                      {
                        id: "generational_transfer",
                        label: "Multi-Generation Wealth",
                        desc: "Smooth transfer of business shares and ancestral assets",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPlanningGoal(opt.id as any)}
                        className={`text-left p-3 rounded-xl border transition-all ${
                          planningGoal === opt.id
                            ? "border-[#C65378] bg-rose-50/50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="font-bold text-xs text-slate-900">{opt.label}</div>
                        <div className="text-[11px] text-slate-600 mt-0.5">{opt.desc}</div>
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
                    <span>Reset Tool to Default</span>
                  </button>
                </div>

                {/* =========================================================================
                    DYNAMIC RESULTS CARD
                    ========================================================================= */}
                <div className="rounded-3xl border-2 border-[#172228] bg-gradient-to-br from-slate-900 via-[#172228] to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/15">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                        CROSS-BORDER DIAGNOSTIC RECOMMENDATION
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-1">
                        {decisionTitle}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white shrink-0 self-start sm:self-auto">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>{decisionBadge}</span>
                    </div>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        ESTIMATED TOTAL REGISTRATION COST
                      </div>
                      <div className="text-base sm:text-lg font-black text-emerald-400">
                        {estTotalCost}
                      </div>
                      <div className="text-[11px] text-slate-300">{costSavingsPercent}</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        INDIAN COURT RESEALING FRICTION
                      </div>
                      <div className="text-xs sm:text-sm font-black text-white leading-snug">
                        {resealingFriction}
                      </div>
                      <div className="text-[11px] text-slate-300">Section 228 ISA Avoided</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        SHARIA BANK FREEZE RATING
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-rose-200 leading-snug">
                        {shariaFreezeRisk}
                      </div>
                      <div className="text-[11px] text-slate-400">Score: {protectionScore}/100</div>
                    </div>
                  </div>

                  {/* Detailed Legal Analysis */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#C65378]" />
                      <span>Legal Rationale &amp; Resealing Analysis:</span>
                    </div>
                    <p>{statutoryRationale}</p>
                    <div className="pt-2 text-emerald-300 font-semibold border-t border-white/10">
                      <strong>Recommended Strategy:</strong> {primaryRecommendation}
                    </div>
                  </div>

                  {/* Dual Conversion CTA in Tool */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-300 text-center sm:text-left">
                      Need to draft your separate Indian Will or secure cross-border probate?
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                      <button
                        onClick={handleStartDraft}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Draft Indian Will Online</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <Link
                        href="/services/foreign-will-resealing-ancillary-probate-high-court"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors"
                      >
                        <Scale className="w-3.5 h-3.5 text-rose-300" />
                        <span>Resealing Retainer</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* VISUAL FEATURE BLUEPRINT */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>CROSS-BORDER DECISION GUIDE: DIFC VS ADJD VS INDIAN WILL</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Cross-Border Succession</span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/uae-adgm-difc-vs-indian-will-cross-border-decision-tool-og.jpg"
                  alt="UAE DIFC vs ADJD vs Indian Will Cross-Border Decision Matrix and Cost Guide"
                  width={1200}
                  height={675}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                Visualizing jurisdiction options for Dubai and Abu Dhabi Indian expats: DIFC Courts,
                ADJD Non-Muslim Registry, and Indian Succession Act registration.
              </p>
            </div>

            {/* SECTION 3: COST COMPARISON */}
            <section id="cost-benefit-comparator" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>FINANCIAL BREAKDOWN</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Registration Cost Comparison: DIFC vs ADJD vs India
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many Dubai law firms push DIFC wills without sharing all the facts. They charge high
                  fees for a worldwide Will. But Abu Dhabi offers valid civil registration for far less
                  money.
                </p>

                {/* 3 Price Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                  {/* DIFC Option */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="font-extrabold text-xs text-slate-900">DIFC Courts Will</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px]">
                        Common Law
                      </span>
                    </div>
                    <div className="text-2xl font-black text-slate-900">
                      AED 10,000 – 15,000+
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Official registry fee for a Full Will covering guardianship and all assets. Legal
                      drafting fees by Dubai firms usually add another AED 5,000 to AED 10,000.
                    </p>
                    <div className="text-[11px] text-rose-700 font-semibold pt-1">
                      High upfront cost. Requires separate Section 228 resealing for Indian real estate.
                    </div>
                  </div>

                  {/* ADJD Option */}
                  <div className="p-5 rounded-2xl bg-white border-2 border-[#C65378]/30 shadow-xs space-y-3 relative">
                    <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-[#C65378] text-white text-[9px] font-black uppercase tracking-wider">
                      Best Value
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="font-extrabold text-xs text-[#C65378]">ADJD Non-Muslim Will</span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                        Federal Law
                      </span>
                    </div>
                    <div className="text-2xl font-black text-slate-900">
                      AED 950 – 1,800
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Official registration fee with Abu Dhabi Judicial Department is only AED 950.
                      Includes bilingual Arabic translation and covers all 7 UAE emirates.
                    </p>
                    <div className="text-[11px] text-emerald-700 font-semibold pt-1">
                      Saves over 80% compared to DIFC while offering 100% Sharia exemption across UAE.
                    </div>
                  </div>

                  {/* Indian Will Option */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="font-extrabold text-xs text-slate-900">Registered Indian Will</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px]">
                        ISA 1925
                      </span>
                    </div>
                    <div className="text-2xl font-black text-slate-900">
                      ₹10,000 – ₹25,000
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Drafted online or via senior estate advocate and registered before Sub-Registrar
                      Office (SRO) in India. Covers all Indian properties, demat, and NRE accounts.
                    </p>
                    <div className="text-[11px] text-emerald-700 font-semibold pt-1">
                      Direct enforcement by Indian banks and housing societies without High Court resealing.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: SHARIA FREEZE RISK ANALYSIS */}
            <section id="sharia-freeze-risk-analysis" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldAlert className="w-4 h-4" />
                <span>ESTATE RISK ASSESSMENT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Sharia Bank Account Freeze &amp; Guardianship Risks
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Under UAE Central Bank rules, banks freeze accounts once they learn of a death. This rule
                  applies to single and joint bank accounts. Cards and loans stop working until a court
                  issues an inheritance order.
                </p>
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2 text-amber-950 text-xs sm:text-sm">
                  <div className="font-bold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>The Unprotected Joint Account Trap in the UAE</span>
                  </div>
                  <p className="leading-relaxed">
                    In India, a joint account passes to the surviving spouse with ease. But in the UAE,
                    banks lock joint accounts right away. Without an ADJD or DIFC Will, your spouse may have
                    no money for rent, school fees, or food for months.
                  </p>
                </div>
                <p>
                  If both parents pass away without naming guardians, UAE courts step in. You must name
                  interim and permanent guardians in an ADJD or DIFC Will. This step ensures your family
                  takes custody of your kids right away.
                </p>
              </div>
            </section>

            {/* SECTION 5: SECTION 228 ISA RESEALING TRAP */}
            <section id="indian-asset-resealing-trap" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>INDIAN SUCCESSION ACT S. 228</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Section 228 ISA Trap: Why DIFC Wills Fail in India
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Dubai law firms call DIFC wills worldwide wills. But this claim creates a trap for Indian
                  property.
                </p>
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#C65378]" />
                    <span>The Judicial Reality of Section 228 ISA</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Indian land offices, housing societies, and sub-registrars do not accept foreign court
                    orders directly. Under Section 228 of the Indian Succession Act 1925, your heirs must go
                    to an Indian High Court. They must file a petition to reseal the foreign Will.
                  </p>
                </div>
                <p>
                  This court process takes 12 to 24 months. Heirs must pay high court fees and lawyer
                  bills. The foreign paper must also get embassy stamps and legal translations.
                </p>
                <p>
                  A separate Indian Will avoids Section 228 completely. It lets your heirs claim Indian
                  property without any delay.
                </p>
              </div>
            </section>

            {/* SECTION 6: DUAL CONCURRENT WILLS STRATEGY */}
            <section id="dual-concurrent-wills-strategy" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>THE ARCHITECTURE OF PROTECTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. The Dual Concurrent Wills Strategy (Gold Standard)
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Top cross-border lawyers advise using two separate wills. This is the two-will plan.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="font-extrabold text-xs text-slate-900 uppercase tracking-wider text-[#C65378]">
                      WILL 1: UAE JURISDICTIONAL WILL (ADJD / DIFC)
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      <li>• Covers only assets in the UAE.</li>
                      <li>• Covers your Dubai or Abu Dhabi flat, bank accounts, and car.</li>
                      <li>• Names guardians for your young children.</li>
                      <li>• Goes straight to UAE civil courts upon death.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="font-extrabold text-xs text-slate-900 uppercase tracking-wider text-[#C65378]">
                      WILL 2: INDIAN JURISDICTIONAL WILL (ISA 1925)
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      <li>• Covers only assets in India.</li>
                      <li>• Covers your flats, family land, NRE accounts, and mutual funds.</li>
                      <li>• Signed in front of two adult witnesses.</li>
                      <li>• Used directly in India without High Court resealing.</li>
                    </ul>
                  </div>
                </div>
                <div className="rounded-2xl bg-rose-50/60 border border-rose-200 p-4 text-xs text-rose-950 space-y-1.5">
                  <div className="font-extrabold flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#C65378]" />
                    <span>The Critical Non-Revocation Clause</span>
                  </div>
                  <p className="leading-relaxed">
                    Most Indian Will drafts have a standard clause revoking all old wills worldwide. If you
                    sign this draft, it cancels your UAE Will. Both wills must state that they do not cancel
                    each other. They must work together in their own countries.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 7: ADGM VS DIFC VS ADJD */}
            <section id="adgm-abu-dhabi-option" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>UAE FORUM COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. ADGM Courts vs DIFC vs ADJD: Jurisdiction Guide
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Expats in the UAE have three places to register a Will.
                </p>
                <div className="space-y-3 pt-1">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
                      <span>1. Abu Dhabi Judicial Department (ADJD) Non-Muslim Wills Office</span>
                      <span className="text-emerald-700 font-bold text-xs">Official Fee: ~AED 950</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Abu Dhabi Judicial Department non-Muslim registry was set up under Abu Dhabi Law 14
                      of 2021. The process is online through video calls. It costs only AED 950 and works across
                      all seven emirates. It is the top choice for most expats.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
                      <span>2. DIFC Wills Service Centre (Dubai International Financial Centre)</span>
                      <span className="text-[#C65378] font-bold text-xs">Official Fee: ~AED 10,000 – 15,000</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The DIFC Wills Service Centre runs on English common law in Dubai. All court steps are in
                      English. It costs AED 10,000 to 15,000. It is often chosen by large business owners who
                      want English-speaking courts.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
                      <span>3. Abu Dhabi Global Market (ADGM) Courts</span>
                      <span className="text-slate-700 font-bold text-xs">Financial Free Zone</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      ADGM Courts in Abu Dhabi also follow common law. They focus on trusts and corporate
                      succession for wealthy families.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: MASTER COMPARISON TABLE */}
            <section id="jurisdiction-comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>MASTER COMPARISON MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Master Comparison Table: UAE &amp; Indian Estate Options
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white font-extrabold">
                      <th className="p-3.5 sm:p-4">Feature / Factor</th>
                      <th className="p-3.5 sm:p-4">DIFC Courts Will</th>
                      <th className="p-3.5 sm:p-4">ADJD Non-Muslim Will</th>
                      <th className="p-3.5 sm:p-4">Dual Concurrent Wills (Best)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Official Government Fee</td>
                      <td className="p-3.5 sm:p-4 text-rose-700 font-semibold">AED 10,000 – 15,000+</td>
                      <td className="p-3.5 sm:p-4 text-emerald-800 font-bold">AED 950 (~₹21,000)</td>
                      <td className="p-3.5 sm:p-4 text-emerald-800 font-bold">AED 950 + ₹15,000</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">UAE Asset Protection</td>
                      <td className="p-3.5 sm:p-4">100% Protected (DIFC)</td>
                      <td className="p-3.5 sm:p-4">100% Protected (All 7 Emirates)</td>
                      <td className="p-3.5 sm:p-4 text-emerald-800 font-bold">100% Protected Across UAE</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Indian Asset Execution</td>
                      <td className="p-3.5 sm:p-4 text-rose-700">
                        High Friction (Requires s. 228 High Court Resealing)
                      </td>
                      <td className="p-3.5 sm:p-4 text-rose-700">
                        High Friction (Requires Indian Resealing)
                      </td>
                      <td className="p-3.5 sm:p-4 text-emerald-800 font-bold">
                        Zero Friction (Direct SRO &amp; Indian Probate)
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Sharia Freeze Prevention</td>
                      <td className="p-3.5 sm:p-4 font-semibold text-emerald-800">Yes, Immediate</td>
                      <td className="p-3.5 sm:p-4 font-semibold text-emerald-800">Yes, Immediate</td>
                      <td className="p-3.5 sm:p-4 font-semibold text-emerald-800">Yes, Immediate in UAE</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Minor Guardianship Nomination</td>
                      <td className="p-3.5 sm:p-4">Yes (Interim &amp; Permanent)</td>
                      <td className="p-3.5 sm:p-4">Yes (Interim &amp; Permanent)</td>
                      <td className="p-3.5 sm:p-4 text-emerald-800 font-bold">Yes (In UAE &amp; India)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Probate Timeline in India</td>
                      <td className="p-3.5 sm:p-4 text-rose-700">12 – 24 Months Delay</td>
                      <td className="p-3.5 sm:p-4 text-rose-700">12 – 24 Months Delay</td>
                      <td className="p-3.5 sm:p-4 text-emerald-800 font-bold">Direct (Zero Resealing Delay)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* MID-ARTICLE CONTEXTUAL LINK */}
            <div className="rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50/60 via-white to-amber-50/50 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-3.5 h-3.5" />
                  <span>ALREADY HOLD A FOREIGN OR DIFC WILL?</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                  File Ancillary Probate &amp; Resealing in Indian High Courts
                </div>
                <p className="text-xs text-slate-600">
                  Our High Court litigators handle Section 228 petitions, embassy consularization, and SRO
                  mutation pan-India.
                </p>
              </div>
              <Link
                href="/services/foreign-will-resealing-ancillary-probate-high-court"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shrink-0 transition-transform hover:-translate-y-0.5 shadow-sm"
              >
                <span>Resealing Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTION PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Dual Cross-Border Will Execution
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Follow these five simple steps to protect your family in the UAE and India:
                </p>
                <div className="space-y-3 pt-1">
                  {[
                    {
                      step: "Step 1",
                      title: "Audit & Separate Assets by Country",
                      desc: "List your assets. Keep your UAE flats and accounts separate from your Indian property, land, and demat funds.",
                    },
                    {
                      step: "Step 2",
                      title: "Draft UAE Will for UAE Assets Only",
                      desc: "Write an ADJD or DIFC Will for UAE assets. Name interim and permanent guardians for your young children.",
                    },
                    {
                      step: "Step 3",
                      title: "Register UAE Will via Online Video Call",
                      desc: "Upload your draft to the ADJD portal. Complete video check via UAE Pass and receive your digital attested Will.",
                    },
                    {
                      step: "Step 4",
                      title: "Draft Indian Will with Non-Revocation Clause",
                      desc: "Draft your Indian Will under Section 63 ISA. Add a clear clause saying it does not cancel your UAE Will.",
                    },
                    {
                      step: "Step 5",
                      title: "Sign & Register Indian Will with Two Witnesses",
                      desc: "Sign your Indian Will before two adult witnesses. Register it at the Sub-Registrar Office in India.",
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

            {/* SECTION 10: CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>EXPAT CASE STUDIES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Real Case Studies: Dubai, Abu Dhabi &amp; Sharjah Expats
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
                {/* Case 1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Dubai Marina + Mumbai</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 1
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Avoided ₹3 Lakh Court Resealing on Bandra Apartment
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Situation:</strong> A senior executive in Dubai owned a marina flat and a 3-BHK
                    apartment in Bandra, Mumbai. A local Dubai firm advised a single DIFC worldwide Will for
                    AED 18,000.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Solution:</strong> Switched to an ADJD Will (AED 950) for Dubai + separate
                    registered Indian Will. Saved AED 14,000 in UAE fees and avoided 18 months of High Court
                    ancillary probate in Mumbai.
                  </p>
                </div>

                {/* Case 2 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Abu Dhabi Business</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 2
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Unfrozen Bank Accounts After Sudden Demise
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Situation:</strong> An Abu Dhabi business founder passed away unexpectedly. He had
                    registered an ADJD Non-Muslim Will 6 months prior covering company shares and bank accounts.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Result:</strong> ADJD Civil Court issued probate in 14 working days. The commercial
                    bank unfroze business operating accounts, allowing the family to continue salary payments
                    without Sharia delay.
                  </p>
                </div>

                {/* Case 3 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Sharjah IT Couple</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 3
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Minor Child Guardianship Secured in UAE
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Situation:</strong> An Indian couple in Sharjah with two children (ages 4 and 7)
                    frequently travelled internationally. They worried about custody if an accident occurred.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Result:</strong> Registered an ADJD guardianship declaration nominating the Dubai-based
                    uncle as interim guardian and grandparents in Kerala as permanent guardians, eliminating
                    custody uncertainty.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: STATUTORY RECITAL TEMPLATES */}
            <section id="statutory-recital-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>CROSS-BORDER DRAFTING CLAUSES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Cross-Border Recital Clauses &amp; Document Checklist
              </h3>

              {/* Template Box 1: Non-Revocation & Territorial Clause */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Territorial Limitation &amp; Foreign Will Non-Revocation Clause
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
{`"1. TERRITORIAL LIMITATION & SCOPE:
This Last Will and Testament applies exclusively to all my movable and immovable properties, assets, bank accounts, investments, and interests situated within the Republic of India.

2. RECIPROCAL NON-REVOCATION OF FOREIGN / UAE WILLS:
I hereby confirm that I have registered (or intend to register) a separate Last Will and Testament with the Abu Dhabi Judicial Department (ADJD) / Dubai International Financial Centre (DIFC) Wills Service Centre to govern my assets situated in the United Arab Emirates. 

I expressly declare that this Indian Will does NOT revoke, cancel, amend, or superscribe my said UAE Will (or any other foreign testamentary instrument expressly limited to assets outside India). Both Wills shall operate concurrently as independent, complementary testamentary instruments within their respective territorial jurisdictions.

3. EXECUTORSHIP & SEPARATE TRANSMISSION:
I appoint [Name of Indian Executor], resident of [Address in India], as the sole Executor of this Indian Will. My Indian Executor shall have no administrative duties over my UAE estate, which shall be administered independently under the terms of my UAE Will."`}
                </pre>
              </div>

              {/* Template Box 2: Verification Checklist */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Document Checklist: Preparing UAE &amp; Indian Cross-Border Wills
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
                    <span>Emirates ID &amp; Indian Passport copies</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>UAE Title Deeds / Oqood / Ejari contracts</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Indian Property Sale Deeds &amp; SRO records</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>UAE Bank Account IBANs &amp; Gratuity records</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Indian Demat Client Master List (CML) &amp; NRO/NRE</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Minor Children Passports (for Guardianship Will)</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>CROSS-BORDER PRACTICE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Institutional Profile: Cross-Border Practice
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      Cross-Border NRI &amp; Expat Estate Planning Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>High Court &amp; Cross-Border Counsel</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is powered by AMA Legal Solutions. We help Indian families in Dubai,
                  Abu Dhabi, and around the world protect their assets. Our advocates guide you on UAE
                  wills, Section 228 High Court resealing, and Indian family property defense.
                </p>

                {/* Service Grid Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/tools/nri-will-checker"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>NRI Will Checker</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/nri-property-sale-tds-repatriation-calculator"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>TDS Repatriation Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/services/foreign-will-resealing-ancillary-probate-high-court"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Section 228 Resealing</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/probate-court-fee-timeline-calculator"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Probate Fee Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 13: FAQ ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>DIRECT ANSWERS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: UAE &amp; Indian Wills
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

            {/* SECTION 14: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>OFFICIAL STATUTORY PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Statutory Authorities &amp; Court Registry Portals
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs text-slate-600">
                <p>
                  Official registries and statutory portals governing cross-border succession between the
                  UAE and India:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://www.adjd.gov.ae"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Abu Dhabi Judicial Department (ADJD)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.difccourts.ae"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>DIFC Wills Service Centre Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
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
                    href="https://www.sci.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Supreme Court of India Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Cross-Border Tools &amp; Guides
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/nri-will-checker"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      NRI Will Checker
                    </Link>
                    <Link
                      href="/tools/nri-property-sale-tds-repatriation-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      TDS Repatriation Calculator
                    </Link>
                    <Link
                      href="/services/foreign-will-resealing-ancillary-probate-high-court"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Foreign Will Resealing Retainer
                    </Link>
                    <Link
                      href="/tools/probate-court-fee-timeline-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Probate Court Fee Calculator
                    </Link>
                    <Link
                      href="/tools"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      All Legal Tools &amp; Calculators
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Readability Summary Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Expats Need Two Wills</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  One Will for the UAE and one for India stops all frozen accounts and court delays. Each
                  paper works fast in its own country.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Save Over 80% on Fees</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  ADJD registration costs just AED 950 and works across all seven emirates. You do not need
                  to spend AED 15,000 on DIFC worldwide wills.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Keep Your Kids Safe</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Naming guardians in your UAE Will ensures your relatives get custody fast. It prevents local
                  care homes from stepping in.
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
                    Senior Cross-Border Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Advising UAE and global Indian expats on cross-border estate structuring, Section 228
                foreign Will resealing, and High Court probate representation.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Advocate</span>
                </span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-6">
              {/* CARD 2: DUAL CTA 1 - DRAFT INDIAN WILL ONLINE (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>PROTECT YOUR INDIAN ASSETS</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Draft Your Indian Will Online from UAE in 15 Mins
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Safeguard your flats, ancestral property, bank accounts, and demat holdings in India.
                  Includes reciprocal non-revocation clauses for UAE wills.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Indian Will Online</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Reviewed &amp; SRO Registration Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - FOREIGN WILL RESEALING DESK */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>SECTION 228 RESEALING DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Hold a UAE DIFC or Foreign Probate Order?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our High Court litigators file Section 228 ancillary probate petitions in Mumbai, Delhi,
                  and High Courts pan-India for smooth asset transmission.
                </p>
                <Link
                  href="/services/foreign-will-resealing-ancillary-probate-high-court"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Briefcase className="w-3.5 h-3.5 text-rose-300" />
                  <span>Explore Resealing Retainer</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why UAE Expats Rely on WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Cross-Border Precision:</strong> Prevents inadvertent revocation between UAE
                      and Indian wills.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>80% Cost Savings:</strong> Recommends ADJD over expensive single DIFC worldwide
                      filings.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Section 228 Delays:</strong> Independent Indian wills bypass 2-year High
                      Court resealing.
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
          href="#interactive-decision-tool"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Decision Tool</span>
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
