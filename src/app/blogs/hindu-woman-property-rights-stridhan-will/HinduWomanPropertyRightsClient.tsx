"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  Scale,
  Layers,
  Calculator,
  Eye,
  Clock,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Users,
  Building,
  HelpCircle,
  BookOpen,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Printer,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  Lock,
  PhoneCall,
  Download,
  Landmark,
  Gavel,
  FileSpreadsheet,
  Info,
  Split,
  ArrowUpRight,
  Heart,
  FileCheck,
  Gift,
  Coins,
  Home,
  CheckSquare,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "executive-summary", label: "Executive Summary: Stridhan & Rights" },
  { id: "property-classification", label: "1. Property Classification Matrix" },
  { id: "section-14-absolute-ownership", label: "2. HSA Section 14: Absolute Ownership" },
  { id: "stridhan-legal-definition", label: "3. What is Stridhan vs Dowry?" },
  { id: "section-15-intestate-succession", label: "4. Section 15: Dying Without a Will" },
  { id: "section-15-2-reversion-trap", label: "5. The Section 15(2) Reversion Trap" },
  { id: "visual-blueprint", label: "6. Visual Blueprint: Succession System" },
  { id: "interactive-share-calculator", label: "7. Interactive Share Calculator" },
  { id: "landmark-supreme-court-rulings", label: "8. Landmark Supreme Court Rulings" },
  { id: "stridhan-recovery-sop", label: "9. Stridhan Recovery Protocol" },
  { id: "how-to-draft-will-sop", label: "10. Step-by-Step Will Drafting SOP" },
  { id: "specialized-scenarios", label: "11. 4 Specialized Women Scenarios" },
  { id: "why-hindu-woman-needs-will", label: "12. Why Every Woman Needs a Will" },
  { id: "stridhan-audit-checklist", label: "13. Stridhan & Estate Audit Checklist" },
  { id: "frequently-asked-questions", label: "14. Frequently Asked Questions" },
  { id: "statutory-citations", label: "15. Official Legal Citations" },
];

const PRINTABLE_CHECKLIST_TEXT = `================================================================================
HINDU WOMAN STRIDHAN & ESTATE PROTECTION AUDIT CHECKLIST (INDIA)
Statutory Authorities: Hindu Succession Act, 1956 (Sections 14, 15, 16, 30)
Supreme Court Authorities: Pratibha Rani (1985) & Arunachala Gounder (2022)
Prepared by WillDrafting.in - Powered by AMA Legal Solutions
================================================================================

PHASE 1: STRIDHAN & JEWELRY AUDIT (KEEP SOLE CONTROL)
[ ] Item 1.1: Catalog all gold, silver, and diamond jewelry with itemized weights and photographs.
[ ] Item 1.2: Compile original purchase receipts, jeweler invoices, and wedding gift registries.
[ ] Item 1.3: Ensure physical custody is in a single-operator bank locker held solely in your name.
[ ] Item 1.4: Confirm that neither your husband nor in-laws hold unilateral access or keys to the locker.
[ ] Item 1.5: Keep digital copies of wedding video footage and photographs showing you wearing the jewelry.

PHASE 2: REAL ESTATE & FINANCIAL INVESTMENTS INVENTORY
[ ] Item 2.1: Classify all real estate: Self-Acquired vs Inherited from Parents vs Inherited from Husband.
[ ] Item 2.2: Retrieve certified copies of Registered Sale Deeds and latest property tax receipts.
[ ] Item 2.3: Verify bank accounts, Fixed Deposits, PPF, and Mutual Funds have matched nominations.
[ ] Item 2.4: Check whether your name is entered as sole owner or joint owner in registry records.

PHASE 3: THE SECTION 15(2) INTESTACY DEFENSE (PREVENTING TRAPS)
[ ] Item 3.1: Be aware: If childless and dying without a Will, self-acquired wealth passes to husband's heirs.
[ ] Item 3.2: Be aware: Property inherited from parents reverts to father's heirs, not your husband or mother.
[ ] Item 3.3: Be aware: Property inherited from husband reverts to his family, leaving your parents with 0%.
[ ] Item 3.4: Resolve: A registered Will under Section 30 overrides all default intestate reversion rules.

PHASE 4: DRAFTING & EXECUTING A PROTECTIVE WILL
[ ] Item 4.1: Draft a comprehensive Last Will specifying exact bequests of Stridhan, gold, and real estate.
[ ] Item 4.2: Explicitly name trusted primary beneficiaries (children, aging parents, siblings, or spouse).
[ ] Item 4.3: Appoint an independent, trusted Executor to manage transmission and probate smoothly.
[ ] Item 4.4: Execute the Will on plain A4 paper before two independent adult witnesses under Section 63 ISA.
[ ] Item 4.5: Optional: Register the Will at the local Sub-Registrar Office for total evidentiary protection.

================================================================================
CRITICAL REMINDER: Under Section 14 of the Hindu Succession Act, you are the absolute
owner of your property. Under Section 30, you have 100% freedom to Will it to anyone.
For confidential advocate assistance, visit WillDrafting.in or call AMA Legal Solutions.`;

const PROPERTY_CLASSES = [
  {
    id: "stridhan",
    title: "Stridhan (Gifts & Personal Wealth)",
    source: "Wedding gifts, parental jewelry, cash, self-earnings, clothes",
    authority: "HSA Section 14(1) & Pratibha Rani (SC)",
    ownership: "100% Absolute & Exclusive",
    lifetimeRight: "Full power to sell, gift, or pledge without husband's consent",
    willRight: "Can bequeath 100% to anyone via Will under Section 30",
    intestateDevolution: "Sons, daughters, and husband equally under Sec 15(1)(a)",
    badgeColor: "bg-rose-50 text-rose-800 border-rose-200",
  },
  {
    id: "self-acquired",
    title: "Self-Acquired Real Estate & Investments",
    source: "Purchased from salary, business profits, personal loans, savings",
    authority: "HSA Section 14(1) & Section 30",
    ownership: "100% Absolute Individual Estate",
    lifetimeRight: "Unrestricted right to sell, mortgage, or transfer freely",
    willRight: "Full testamentary freedom to Will to any chosen person",
    intestateDevolution: "Husband and children equally; husband's heirs if childless",
    badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
  },
  {
    id: "inherited-parents",
    title: "Property Inherited from Father or Mother",
    source: "Inherited by statutory succession or parental gift/Will",
    authority: "HSA Section 14(1) & Section 15(2)(a)",
    ownership: "Absolute owner during lifetime",
    lifetimeRight: "Can sell, gift, or consume during her lifetime",
    willRight: "Can be freely bequeathed to anyone via a valid Will",
    intestateDevolution: "Reverts to Father's heirs if she dies childless (Sec 15(2)(a))",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
  },
  {
    id: "inherited-husband",
    title: "Property Inherited from Husband / In-Laws",
    source: "Inherited from deceased husband or late father-in-law",
    authority: "HSA Section 14(1) & Section 15(2)(b)",
    ownership: "Absolute owner during lifetime",
    lifetimeRight: "Full power of lifetime sale and transfer",
    willRight: "Can be bequeathed to any beneficiary via a valid Will",
    intestateDevolution: "Reverts to Husband's heirs if she dies childless (Sec 15(2)(b))",
    badgeColor: "bg-purple-50 text-purple-800 border-purple-200",
  },
  {
    id: "coparcenary",
    title: "Undivided Ancestral Coparcenary Share",
    source: "Birthright in Hindu Undivided Family (HUF) property",
    authority: "HSA Section 6 (2005) & Vineeta Sharma (SC)",
    ownership: "Equal coparcener by birth with sons",
    lifetimeRight: "Can demand partition by metes and bounds anytime",
    willRight: "Can Will her undivided coparcenary share under Section 30",
    intestateDevolution: "Devolves upon Class I heirs under notional partition",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
];

const FAQS = [
  {
    q: "What is Stridhan under Indian succession law?",
    a: "Stridhan refers to all voluntary gifts, jewelry, cash, movable assets, and real estate given to a Hindu woman before, during, or after her marriage by her parents, in-laws, husband, relatives, or friends, as well as her own self-acquired earnings. Under Section 14(1) of the Hindu Succession Act, she is the sole, absolute owner of her Stridhan.",
  },
  {
    q: "Can my husband or in-laws legally sell my jewelry?",
    a: "No. The Supreme Court in Pratibha Rani v. Suraj Kumar (1985) ruled that Stridhan is the exclusive, unchallengeable property of the woman. Even if the jewelry is kept in a joint locker or family safe, the husband and in-laws hold it purely as trustees. Refusing to return it upon demand constitutes Criminal Breach of Trust under Section 316 of BNS (formerly Section 406 IPC).",
  },
  {
    q: "What happens if a Hindu woman dies without leaving a Will?",
    a: "If a Hindu woman dies without a Will (intestate), her property devolves strictly according to Section 15 of the Hindu Succession Act, 1956. Under Section 15(1)(a), it passes equally to her husband and children. However, if she dies childless, special reversion rules under Section 15(2) redirect inherited property depending on whether it came from her parents or her husband.",
  },
  {
    q: "What is the Section 15(2) trap in the Hindu Succession Act?",
    a: "Under Section 15(2)(a), if a childless woman dies without a Will, any property she inherited from her parents does not go to her husband; it reverts to her father's heirs. Conversely, under Section 15(2)(b), property inherited from her husband reverts to his heirs. However, her self-acquired wealth and Stridhan do not revert to her parents; they go to her husband or his family, leaving her parents with nothing unless she writes a Will.",
  },
  {
    q: "Can a married woman Will away all her property to her parents instead of her husband?",
    a: "Yes. Under Section 30 of the Hindu Succession Act, every Hindu woman has absolute testamentary power over all her self-acquired property, Stridhan, inherited assets, and her coparcenary share. She does not require the consent or signature of her husband or children to bequeath her estate to her parents, siblings, or any person of her choice.",
  },
  {
    q: "Is Stridhan the same as Dowry under Indian law?",
    a: "No, Stridhan and Dowry are legally opposite. Dowry is an illegal demand made as a condition of marriage, which is strictly prohibited and punishable under the Dowry Prohibition Act, 1961. Stridhan consists of voluntary gifts presented to the bride out of love and affection, which remain her absolute personal property for life.",
  },
  {
    q: "Can a Hindu woman bequeath her ancestral coparcenary share in a Will?",
    a: "Yes. Following the Hindu Succession (Amendment) Act, 2005 and the Supreme Court's ruling in Vineeta Sharma (2020), a daughter is an equal coparcener by birth. Under Section 30 of the Act, she can validly bequeath her undivided coparcenary interest in ancestral property through a properly executed Will.",
  },
  {
    q: "What documents prove that jewelry or assets belong to Stridhan?",
    a: "Strong evidence includes jeweler purchase invoices in the bride or her parents' names, a signed gift list witnessed during wedding ceremonies under the Dowry Prohibition Rules, wedding photographs and video footage showing the bride wearing specific ornaments, and bank locker access registers.",
  },
  {
    q: "Does a Hindu woman need her husband's permission to make a Will?",
    a: "Absolutely not. Indian law treats a woman as an independent legal individual. Under Section 59 of the Indian Succession Act, 1925, any adult of sound mind can make a Will. Her husband has no legal authority to inspect, consent to, or veto her testamentary disposition.",
  },
  {
    q: "How can a woman recover Stridhan if her husband refuses to return it?",
    a: "First, issue a formal Legal Demand Notice through an advocate detailing the itemized inventory. Second, file an application under Section 12 and Section 18 of the Protection of Women from Domestic Violence Act (PWDVA) for recovery and interim protection. Third, file a criminal complaint under Section 316 BNS (Section 406 IPC) for Criminal Breach of Trust.",
  },
];

export default function HinduWomanPropertyRightsClient() {
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

  const [activeId, setActiveId] = useState<string>("executive-summary");
  const [copied, setCopied] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedClassId, setSelectedClassId] = useState<string>("stridhan");
  const [showImageModal, setShowImageModal] = useState<boolean>(false);

  // Interactive Share Calculator State
  const [calcMaritalStatus, setCalcMaritalStatus] = useState<"married" | "childless_married" | "unmarried" | "widow_childless">("childless_married");
  const [calcPropertySource, setCalcPropertySource] = useState<"stridhan_self" | "inherited_father" | "inherited_husband">("stridhan_self");
  const [calcEstateValueLakhs, setCalcEstateValueLakhs] = useState<number>(100);

  // Checklist interactive state
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    "check-1": true,
    "check-2": true,
    "check-3": false,
    "check-4": true,
    "check-5": true,
    "check-6": true,
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

  const handleCopyChecklist = () => {
    navigator.clipboard.writeText(PRINTABLE_CHECKLIST_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  // Dynamic Share Calculator Logic for Section 15
  const computeIntestateShares = () => {
    const totalRupees = calcEstateValueLakhs * 100000;

    if (calcMaritalStatus === "married") {
      // Has Husband & Children
      return {
        ruleTitle: "Section 15(1)(a) General Devolution",
        primaryHeir: "Husband, Sons & Daughters",
        husbandSharePercent: 33.3,
        childrenSharePercent: 66.7,
        parentsSharePercent: 0,
        husbandValueRupees: Math.round(totalRupees * 0.333),
        parentsValueRupees: 0,
        description:
          "Under Section 15(1)(a), all property divides equally per capita among the surviving husband and children. Her own parents receive 0%. A Will allows her to allocate shares to aging parents.",
      };
    }

    if (calcMaritalStatus === "childless_married") {
      if (calcPropertySource === "inherited_father") {
        return {
          ruleTitle: "Section 15(2)(a) Parental Reversion Trap",
          primaryHeir: "Father's Heirs (Brothers, Sisters, Father's Family)",
          husbandSharePercent: 0,
          childrenSharePercent: 0,
          parentsSharePercent: 100,
          husbandValueRupees: 0,
          parentsValueRupees: totalRupees,
          description:
            "Under Section 15(2)(a), property inherited from her parents does NOT go to her husband. It reverts entirely to her father's heirs. The husband receives 0% of this parental asset.",
        };
      }
      if (calcPropertySource === "inherited_husband") {
        return {
          ruleTitle: "Section 15(2)(b) Marital Reversion Rule",
          primaryHeir: "Husband's Heirs (In-Laws, Husband's Siblings)",
          husbandSharePercent: 100,
          childrenSharePercent: 0,
          parentsSharePercent: 0,
          husbandValueRupees: totalRupees,
          parentsValueRupees: 0,
          description:
            "Under Section 15(2)(b), property inherited from her husband reverts to the husband's heirs. Her own parents and siblings receive 0%.",
        };
      }
      // Stridhan or Self-Acquired
      return {
        ruleTitle: "Section 15(1)(a) Self-Acquired Without Issue",
        primaryHeir: "Husband Exclusively (or Husband's Heirs if Husband Pre-Deceased)",
        husbandSharePercent: 100,
        childrenSharePercent: 0,
        parentsSharePercent: 0,
        husbandValueRupees: totalRupees,
        parentsValueRupees: 0,
        description:
          "CRITICAL SHOCK: Her self-acquired savings, business wealth, and Stridhan pass 100% to her husband. If the husband passes away, it devolves to his heirs. Her aging parents get 0% unless willed!",
      };
    }

    if (calcMaritalStatus === "widow_childless") {
      if (calcPropertySource === "inherited_father") {
        return {
          ruleTitle: "Section 15(2)(a) Reversion to Father Heirs",
          primaryHeir: "Father's Heirs (Brothers/Sisters of Deceased)",
          husbandSharePercent: 0,
          childrenSharePercent: 0,
          parentsSharePercent: 100,
          husbandValueRupees: 0,
          parentsValueRupees: totalRupees,
          description:
            "Because she passed away as a childless widow, property inherited from her parents bypasses her in-laws and reverts 100% to her father's family.",
        };
      }
      // Inherited from husband or self-acquired
      return {
        ruleTitle: "Section 15(1)(b) Devolution to Husband Heirs",
        primaryHeir: "Late Husband's Heirs (Brothers-in-Law, In-Laws)",
        husbandSharePercent: 100,
        childrenSharePercent: 0,
        parentsSharePercent: 0,
        husbandValueRupees: totalRupees,
        parentsValueRupees: 0,
        description:
          "Under Section 15(1)(b), all self-acquired wealth and Stridhan devolve upon her late husband's relatives. Her own mother and father receive ₹0 unless she has drafted a Will!",
      };
    }

    // Unmarried Woman
    return {
      ruleTitle: "Section 15(1)(c) & (d) Succession to Maiden",
      primaryHeir: "Mother and Father Equally; then Father's Heirs",
      husbandSharePercent: 0,
      childrenSharePercent: 0,
      parentsSharePercent: 100,
      husbandValueRupees: 0,
      parentsValueRupees: totalRupees,
      description:
        "For an unmarried woman, her estate devolves upon her father and mother equally. If parents are deceased, it passes to her father's heirs. Live-in partners get zero without a Will.",
    };
  };

  const calcResults = computeIntestateShares();
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const isAllValid = checkedCount === 6;

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy #172228)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6">
            <Heart className="w-3.5 h-3.5 text-[#C65378]" />
            <span>Family Rights &amp; Women Estate Law</span>
          </div>

          {/* H1 Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Hindu Woman Property Rights: Stridhan, Succession &amp; Wills
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-white/95 max-w-3xl mx-auto leading-relaxed mb-8">
            Learn your absolute legal ownership under Section 14, how Section 15 governs inheritance without a Will, and
            why drafting a Will protects your jewelry and hard-earned savings.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm hover:bg-[#b04568] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25"
            >
              <span>Draft a Protective Will in 15 Mins</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/tools/succession-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm transition-all"
            >
              <Calculator className="w-4 h-4 text-rose-300" />
              <span>Open Section 15 Calculator</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Full-Width Social Proof)
          ========================================================================= */}
      <section className="w-full border-y border-slate-200/80 bg-gradient-to-r from-rose-50/70 via-white to-amber-50/70 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center divide-x-0 lg:divide-x divide-slate-200">
            <div className="p-2">
              <p className="text-xl sm:text-2xl font-black text-[#172228]">100%</p>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                Absolute Ownership (Sec 14)
              </p>
            </div>
            <div className="p-2">
              <p className="text-xl sm:text-2xl font-black text-[#C65378]">Zero</p>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                Husband Claim Over Stridhan
              </p>
            </div>
            <div className="p-2">
              <p className="text-xl sm:text-2xl font-black text-[#5F7E75]">Sec 15(2)</p>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                Reversion If Dying Childless
              </p>
            </div>
            <div className="p-2">
              <p className="text-xl sm:text-2xl font-black text-amber-700">Sec 30</p>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                Full Freedom to Will to Anyone
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Widescreen Editorial Layout)
          ========================================================================= */}
      <main className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_280px] xl:grid-cols-[260px_minmax(0,1fr)_300px] 2xl:grid-cols-[280px_minmax(0,1fr)_320px] gap-6 xl:gap-8 items-start">
          {/* =====================================================================
              LEFT COLUMN: Sticky Table of Contents
              ===================================================================== */}
          <aside className="sticky top-6 hidden lg:block space-y-4">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-slate-900 font-extrabold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span>Table of Contents</span>
              </div>
              <nav className="max-h-[calc(100vh-210px)] overflow-y-auto space-y-1 text-xs pr-1">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block py-1.5 px-2.5 rounded-lg transition-all font-medium leading-snug ${
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

            {/* Quick Authority Badge */}
            <div className="p-3.5 rounded-2xl bg-[#FAF2EB] border border-[#C65378]/20 text-[11px] text-slate-700 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#C65378]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Statutory Authority</span>
              </div>
              <p className="leading-relaxed">
                Sections 14, 15, 16 &amp; 30, Hindu Succession Act, 1956 &amp; ISA 1925. Verified by AMA Legal Solutions.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: Rich Editorial Content & Interactive Features
              ===================================================================== */}
          <article className="min-w-0 space-y-10">
            {/* EXECUTIVE SUMMARY */}
            <section
              id="executive-summary"
              className="scroll-target rounded-2xl bg-[#FAF2EB] border-l-[5px] border-l-[#C65378] p-6 sm:p-7 shadow-xs space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>Executive Summary</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                Executive Summary: Hindu Woman Property &amp; Stridhan Rights
              </h2>
              <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Before 1956, Hindu women held property as mere &ldquo;limited owners&rdquo; with no right to sell or will
                  away assets. The <strong>Hindu Succession Act, 1956 (HSA)</strong> revolutionized this framework.
                  Under <strong>Section 14(1)</strong>, any property held by a Hindu woman becomes her{" "}
                  <strong>full, absolute ownership</strong>. She can sell, mortgage, gift, or will it away at her sole
                  discretion.
                </p>
                <p>
                  Her <strong>Stridhan</strong> (wedding jewelry, gifts from relatives, cash, and self-acquired savings)
                  is her exclusive property. The Supreme Court in <strong>Pratibha Rani v. Suraj Kumar (1985)</strong>{" "}
                  ruled that husbands and in-laws who refuse to return Stridhan commit criminal breach of trust.
                </p>
                <p>
                  However, if a Hindu woman dies <strong>without a Will (intestate)</strong>, her estate triggers the
                  complex rules of <strong>Section 15</strong>. Crucially, under the <strong>Section 15(2) trap</strong>,
                  if she is childless, parental property reverts to her father&apos;s heirs, while self-acquired wealth
                  passes entirely to her husband or his family, leaving her own parents with 0%. Every Hindu woman must
                  write a Will under <strong>Section 30</strong> to protect her legacy.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white rounded-xl p-3 border border-slate-200/80">
                  <p className="text-[11px] font-bold text-slate-500 uppercase">HSA Section 14(1)</p>
                  <p className="text-sm font-extrabold text-emerald-700">Absolute Ownership</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Limited estate abolished completely</p>
                </div>
                <div className="bg-white rounded-xl p-3 border border-slate-200/80">
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Stridhan Legal Status</p>
                  <p className="text-sm font-extrabold text-[#C65378]">Exclusive Woman Estate</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Protected against in-laws&apos; claims</p>
                </div>
                <div className="bg-white rounded-xl p-3 border border-slate-200/80">
                  <p className="text-[11px] font-bold text-slate-500 uppercase">HSA Section 30</p>
                  <p className="text-sm font-extrabold text-blue-700">100% Freedom via Will</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Overrides all Section 15 intestacy traps</p>
                </div>
              </div>
            </section>

            {/* SECTION 1: MASTER CLASSIFICATION */}
            <section id="property-classification" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>Estate Categorization</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                1. Property Classification: Stridhan, Inherited &amp; Self-Acquired
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Indian succession law treats assets held by a Hindu woman under distinct categories. While she enjoys
                absolute control during her life, how each asset passes upon death depends heavily on whether she leaves
                a valid Will.
              </p>

              {/* Interactive Classification Card Selector */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {PROPERTY_CLASSES.map((pc) => {
                    const isSelected = selectedClassId === pc.id;
                    return (
                      <button
                        key={pc.id}
                        onClick={() => setSelectedClassId(pc.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "bg-white border-[#C65378] shadow-sm ring-2 ring-[#C65378]/20 font-bold"
                            : "bg-white/60 border-slate-200 hover:bg-white text-slate-600 font-medium"
                        }`}
                      >
                        <p className="text-xs truncate">{pc.title.split("(")[0]}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Category Details View */}
                {(() => {
                  const item = PROPERTY_CLASSES.find((p) => p.id === selectedClassId)!;
                  return (
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <h3 className="text-base font-extrabold text-[#172228] flex items-center gap-2">
                          <Gift className="w-4 h-4 text-[#C65378]" />
                          <span>{item.title}</span>
                        </h3>
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${item.badgeColor}`}>
                          {item.authority}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                        <div>
                          <p className="text-slate-500 font-bold uppercase text-[11px]">Source of Acquisition</p>
                          <p className="mt-0.5 font-medium">{item.source}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 font-bold uppercase text-[11px]">Ownership Character</p>
                          <p className="mt-0.5 font-semibold text-emerald-700">{item.ownership}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 font-bold uppercase text-[11px]">Lifetime Power (Sale / Gift)</p>
                          <p className="mt-0.5">{item.lifetimeRight}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 font-bold uppercase text-[11px]">Testamentary Power (Will)</p>
                          <p className="mt-0.5 font-semibold text-blue-700">{item.willRight}</p>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100 text-xs text-rose-950">
                        <p className="font-bold">What happens if you die without a Will (Intestate)?</p>
                        <p className="mt-0.5">{item.intestateDevolution}</p>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Master Comparison Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700 min-w-[620px]">
                  <thead className="bg-[#172228] text-white text-[11px] uppercase tracking-wider font-extrabold">
                    <tr>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Key Components</th>
                      <th className="p-3.5">Husband Rights</th>
                      <th className="p-3.5">Can You Will It?</th>
                      <th className="p-3.5">Intestate Fate (No Will)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Stridhan</td>
                      <td className="p-3.5">Jewelry, bridal gifts, personal savings</td>
                      <td className="p-3.5 text-rose-600 font-bold">Zero legal claim</td>
                      <td className="p-3.5 text-emerald-700 font-bold">100% Yes (Sec 30)</td>
                      <td className="p-3.5 text-slate-600">Husband &amp; kids (Sec 15(1))</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Self-Acquired</td>
                      <td className="p-3.5">Salary, real estate, demat, FDs</td>
                      <td className="p-3.5 text-rose-600 font-bold">No lifetime claim</td>
                      <td className="p-3.5 text-emerald-700 font-bold">100% Yes (Sec 30)</td>
                      <td className="p-3.5 text-slate-600">Husband &amp; kids; husband family if childless</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Inherited (Parents)</td>
                      <td className="p-3.5">Land or home from father/mother</td>
                      <td className="p-3.5 text-rose-600 font-bold">No lifetime claim</td>
                      <td className="p-3.5 text-emerald-700 font-bold">100% Yes (Sec 30)</td>
                      <td className="p-3.5 text-amber-700 font-bold">Reverts to Father heirs if childless</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Inherited (Husband)</td>
                      <td className="p-3.5">Property from late husband or in-laws</td>
                      <td className="p-3.5 text-slate-600">N/A (already inherited)</td>
                      <td className="p-3.5 text-emerald-700 font-bold">100% Yes (Sec 30)</td>
                      <td className="p-3.5 text-purple-700 font-bold">Reverts to Husband heirs if childless</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Coparcenary Share</td>
                      <td className="p-3.5">Birthright ancestral HUF partition</td>
                      <td className="p-3.5 text-rose-600 font-bold">Zero claim</td>
                      <td className="p-3.5 text-emerald-700 font-bold">100% Yes (Sec 30)</td>
                      <td className="p-3.5 text-slate-600">Deemed partition (HSA Sec 6)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 2: HSA SECTION 14 */}
            <section id="section-14-absolute-ownership" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>Statutory Authority</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                2. HSA Section 14: Woman Absolute Ownership vs Limited Estate
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  Section 14 of the Hindu Succession Act, 1956 is the single most important statutory provision for
                  women&apos;s financial independence in modern Indian jurisprudence. It abolished the archaic Shastric
                  concept of &ldquo;limited estate&rdquo; (where widows could only collect rental income and had no power
                  to sell or will the corpus).
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <p className="font-extrabold text-slate-900 text-sm">
                    Section 14(1) Hindu Succession Act Text &amp; Scope:
                  </p>
                  <p className="italic text-xs sm:text-sm text-slate-600 leading-relaxed">
                    &ldquo;Any property possessed by a female Hindu, whether acquired before or after the commencement of
                    this Act, shall be held by her as full owner thereof and not as a limited owner.&rdquo;
                  </p>
                  <p className="text-xs text-slate-700 font-medium">
                    The statutory explanation clarifies that this includes movable and immovable property acquired by
                    inheritance, partition, maintenance, gift from any relative or stranger, self-acquired exertion, or
                    purchase.
                  </p>
                </div>

                <h3 className="text-base font-bold text-slate-900 pt-1">The Critical Distinction: Section 14(1) vs 14(2)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
                    <p className="text-xs font-bold text-emerald-800 uppercase flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Section 14(1) General Rule (Absolute)
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Whenever property is given to a woman in recognition of a pre-existing right (such as maintenance,
                      inheritance, or wedding gift), it immediately blossoms into <strong>100% absolute ownership</strong>.
                      She can sell or will it at will.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2">
                    <p className="text-xs font-bold text-amber-800 uppercase flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      Section 14(2) Restricted Exception
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      If property is gifted or willed for the first time with an <strong>express written restriction</strong>{" "}
                      (e.g., life-interest only, with no power of sale or bequest), Section 14(1) does not apply. She holds
                      only a life-interest.
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600">
                  In <strong>V. Tulasamma v. Sesha Reddy (1977) 3 SCC 99</strong>, the Supreme Court ruled that Section
                  14(1) must be given the widest possible meaning. Property given for a woman&apos;s maintenance always
                  becomes absolute property.
                </p>
              </div>
            </section>

            {/* SECTION 3: STRIDHAN EXPLAINED */}
            <section id="stridhan-legal-definition" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Coins className="w-4 h-4" />
                <span>Women&apos;s Personal Wealth</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                3. Stridhan Explained: Gifts, Jewellery, Dowry Differences &amp; Law
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  The word <strong>Stridhan</strong> translates directly to &ldquo;woman&apos;s personal wealth&rdquo;
                  (Stri = woman, Dhan = wealth). Under classical Mitakshara law and modern statutory enactments, it
                  encompasses all voluntary offerings made to a woman at all stages of her life.
                </p>

                <h3 className="text-base font-bold text-slate-900">What Legally Constitutes Stridhan?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Wedding Jewelry &amp; Gold:</strong> Ornaments given by parents, in-laws, or husband during
                      the wedding rituals.
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Cash &amp; Fixed Deposits:</strong> Monetary gifts presented to the bride during rituals like
                      Kanyadan or Dwiragaman.
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Self-Acquired Salary &amp; Profits:</strong> Earnings accumulated through her employment,
                      profession, or investments.
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Apparel, Silverware &amp; Vehicles:</strong> Bridal clothing, silver puja items, and vehicles
                      gifted in her name.
                    </div>
                  </div>
                </div>

                {/* Stridhan vs Dowry Matrix */}
                <h3 className="text-base font-bold text-slate-900 pt-2">Stridhan vs Dowry: Critical Legal Differences</h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs sm:text-sm min-w-[550px]">
                    <thead className="bg-slate-100 text-slate-800 font-bold">
                      <tr>
                        <th className="p-3">Legal Dimension</th>
                        <th className="p-3">Stridhan (Legal &amp; Protected)</th>
                        <th className="p-3">Dowry (Illegal &amp; Prohibited)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">Legal Character</td>
                        <td className="p-3 text-emerald-700 font-medium">Voluntary gifts given out of love</td>
                        <td className="p-3 text-rose-700 font-medium">Coercive demand made for marriage</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">Governing Statute</td>
                        <td className="p-3">HSA Section 14 &amp; PWDVA Section 12</td>
                        <td className="p-3">Dowry Prohibition Act, 1961 (Section 3 &amp; 4)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">Who Owns It?</td>
                        <td className="p-3 font-bold text-emerald-800">Wife holds 100% absolute ownership</td>
                        <td className="p-3">Unlawful; punishable with minimum 5 years jail</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">In-Laws Custody</td>
                        <td className="p-3">Mere trustees; must return on demand</td>
                        <td className="p-3">Extortion under law</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-950 flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <p>
                    <strong>The Locker Myth:</strong> Even if gold ornaments are stored in a bank locker operated jointly
                    with your husband or owned by your mother-in-law, legal title remains 100% yours. Joint locker
                    operation does not confer co-ownership.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: HSA SECTION 15 & 16 */}
            <section id="section-15-intestate-succession" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Split className="w-4 h-4" />
                <span>Intestacy Rules</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                4. HSA Section 15 &amp; 16: Dying Without a Will Inheritance Rules
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  When a Hindu woman passes away without a Will, her estate does NOT devolve according to male rules
                  (Section 8). Instead, it follows the specialized statutory hierarchy prescribed under{" "}
                  <strong>Section 15 of the Hindu Succession Act</strong>.
                </p>

                <h3 className="text-base font-bold text-slate-900">Section 15(1) Priority Hierarchy (Entries A to E)</h3>
                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#C65378] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      1
                    </span>
                    <div>
                      <p className="font-extrabold text-slate-900 text-xs sm:text-sm">
                        Entry (a): Sons, Daughters &amp; Husband
                      </p>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Devolves simultaneously and equally per capita among all surviving children (including children
                        of any pre-deceased son/daughter) and the husband.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      2
                    </span>
                    <div>
                      <p className="font-extrabold text-slate-900 text-xs sm:text-sm">Entry (b): Heirs of the Husband</p>
                      <p className="text-xs text-slate-600 mt-0.5">
                        If she has no surviving children or husband, her self-acquired estate passes to her husband&apos;s
                        heirs (father-in-law, mother-in-law, brothers-in-law). Her own parents get nothing yet!
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      3
                    </span>
                    <div>
                      <p className="font-extrabold text-slate-900 text-xs sm:text-sm">Entry (c): Mother and Father</p>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Only if there are zero surviving heirs of the husband does the estate devolve upon her biological
                        mother and father equally.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      4
                    </span>
                    <div>
                      <p className="font-extrabold text-slate-900 text-xs sm:text-sm">Entry (d): Heirs of the Father</p>
                      <p className="text-xs text-slate-600 mt-0.5">
                        If parents are deceased, passes to her father&apos;s heirs (her own brothers and sisters).
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      5
                    </span>
                    <div>
                      <p className="font-extrabold text-slate-900 text-xs sm:text-sm">Entry (e): Heirs of the Mother</p>
                      <p className="text-xs text-slate-600 mt-0.5">Lastly, devolves upon her maternal relatives.</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-xs sm:text-sm text-slate-700 flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Section 16 Distribution Rules:</strong> Heirs in Entry (a) take simultaneously. An heir in an
                    earlier entry completely excludes all heirs in later entries. For example, if a woman leaves a husband
                    and no children, the husband takes 100%, and her parents receive ₹0.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: SECTION 15(2) TRAP */}
            <section id="section-15-2-reversion-trap" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertCircle className="w-4 h-4" />
                <span>The Intestacy Reversion Trap</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                5. The Section 15(2) Trap: Parental vs Marital Reversion Law
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  Section 15(2) contains a non-obstante clause that overrides the general rules of Section 15(1). It was
                  designed to prevent inherited ancestral property from passing out of the family lineage if a woman
                  dies without issue. However, for modern working women, it often creates severe, unintended consequences.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 space-y-2">
                    <p className="text-xs font-bold text-amber-900 uppercase flex items-center gap-1.5">
                      <Home className="w-4 h-4 text-amber-700" />
                      Section 15(2)(a): Property from Parents
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      If a Hindu woman inherits a flat or land from her father or mother and dies leaving{" "}
                      <strong>no son or daughter</strong>, that property does <strong>NOT</strong> go to her husband! It
                      reverts directly to the <strong>heirs of her father</strong> (her brothers or sisters).
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/60 space-y-2">
                    <p className="text-xs font-bold text-purple-900 uppercase flex items-center gap-1.5">
                      <Building className="w-4 h-4 text-purple-700" />
                      Section 15(2)(b): Property from Husband
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      If she inherited property from her late husband or father-in-law and dies childless, it does{" "}
                      <strong>NOT</strong> pass to her own mother or siblings. It reverts entirely to the{" "}
                      <strong>heirs of her husband</strong> (brothers-in-law, in-laws).
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-rose-50 border-l-4 border-rose-600 text-xs sm:text-sm text-rose-950 space-y-2">
                  <p className="font-extrabold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    The Unfair Asymmetry for Childless Career Women:
                  </p>
                  <p className="leading-relaxed">
                    Notice that Section 15(2) only covers <em>inherited</em> property. It does <strong>NOT</strong> protect
                    her self-acquired savings or Stridhan! If a childless working woman passes away without a Will, her
                    salary, investments, and jewelry pass to her husband. If he dies shortly after, everything goes to her
                    in-laws, leaving her elderly parents with nothing.
                  </p>
                  <p className="font-bold pt-1">
                    The only legal defense: Under Section 30 of the Hindu Succession Act, executing a valid Will completely
                    bypasses Section 15(2) and guarantees that your assets go to whoever you designate!
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 6: VISUAL BLUEPRINT */}
            <section id="visual-blueprint" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Eye className="w-4 h-4" />
                <span>Visual Legal Blueprint</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                6. Visual Blueprint: Hindu Woman Estate &amp; Succession System
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                The comprehensive infographic below details the complete framework of Hindu female property rights,
                connecting statutory authorities under Sections 14, 15, and 16 with Stridhan, inherited estates, and Will
                drafting under Section 30.
              </p>

              {/* Image Frame Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-xs space-y-4">
                <div
                  onClick={() => setShowImageModal(true)}
                  className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer group"
                >
                  <Image
                    src="/images/hindu-woman-property-rights-stridhan-will.jpg"
                    alt="Hindu Woman Property Rights Stridhan and Will Legal Framework Blueprint"
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    sizes="(max-width: 1024px) 100vw, 850px"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-sm backdrop-blur-[2px]">
                    <Eye className="w-5 h-5" />
                    <span>Click to Zoom &amp; Inspect Blueprint</span>
                  </div>
                </div>

                {/* 4 Pillars Breakdown from the Image */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <p className="font-extrabold text-[#C65378] flex items-center gap-1.5 mb-1">
                      <Gift className="w-3.5 h-3.5" />
                      Stridhan (Jewelry &amp; Gifts)
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      Absolute property under Section 14. Fully protected against in-laws&apos; custody claims under Pratibha
                      Rani verdict.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <p className="font-extrabold text-[#5F7E75] flex items-center gap-1.5 mb-1">
                      <Home className="w-3.5 h-3.5" />
                      Inherited Property (Sec 15(2))
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      Reverts to father&apos;s heirs if childless without a Will. A Will permanently overrides this reversion.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <p className="font-extrabold text-[#172228] flex items-center gap-1.5 mb-1">
                      <FileCheck className="w-3.5 h-3.5" />
                      The Will Document (Sec 30)
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      The single legal instrument that guarantees your assets go to your chosen beneficiaries without court
                      battles.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: INTERACTIVE SHARE CALCULATOR */}
            <section id="interactive-share-calculator" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>Diagnostic Simulation Tool</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                7. Calculate Intestate Shares: Interactive Succession Tool
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Simulate who inherits your estate if you pass away without a Will under Section 15, and see how drafting
                a Will completely protects your aging parents and siblings.
              </p>

              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Marital & Family Status */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Your Marital &amp; Family Status
                    </label>
                    <select
                      value={calcMaritalStatus}
                      onChange={(e) => setCalcMaritalStatus(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="married">Married with Children (Sons/Daughters)</option>
                      <option value="childless_married">Married without Children (Childless)</option>
                      <option value="widow_childless">Widow without Children</option>
                      <option value="unmarried">Unmarried / Single Maiden Woman</option>
                    </select>
                  </div>

                  {/* Asset Source */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Primary Asset Source Being Evaluated
                    </label>
                    <select
                      value={calcPropertySource}
                      onChange={(e) => setCalcPropertySource(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="stridhan_self">Self-Acquired Savings, Salary &amp; Stridhan</option>
                      <option value="inherited_father">Real Estate Inherited from Parents</option>
                      <option value="inherited_husband">Property Inherited from Husband / In-Laws</option>
                    </select>
                  </div>
                </div>

                {/* Estate Value Slider */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Estimated Total Estate Value: ₹{calcEstateValueLakhs} Lakhs
                    </label>
                    <span className="text-xs font-bold text-slate-500">
                      ₹{(calcEstateValueLakhs * 100000).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={1000}
                    step={10}
                    value={calcEstateValueLakhs}
                    onChange={(e) => setCalcEstateValueLakhs(parseInt(e.target.value))}
                    className="w-full accent-[#C65378] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>₹10 Lakhs</span>
                    <span>₹5 Crores</span>
                    <span>₹10 Crores</span>
                  </div>
                </div>

                {/* Calculation Output Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-50/70 via-white to-rose-50/70 border border-[#C65378]/30 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                    <div>
                      <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#C65378]">
                        Governing Intestate Law: {calcResults.ruleTitle}
                      </p>
                      <p className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                        Statutory Heir: {calcResults.primaryHeir}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-[11px] font-bold text-slate-500 uppercase">Your Parents&apos; Share</p>
                      <p className={`text-xl sm:text-2xl font-black ${calcResults.parentsSharePercent > 0 ? "text-emerald-700" : "text-rose-600"}`}>
                        {calcResults.parentsSharePercent}% (₹{calcResults.parentsValueRupees.toLocaleString("en-IN")})
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{calcResults.description}</p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-slate-600">
                      Want to customize shares and bypass default statutory splits?
                    </span>
                    <Link
                      href="/tools/succession-calculator"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#172228] text-white text-xs font-bold hover:bg-slate-800 transition-all shrink-0"
                    >
                      <span>Open Section 15 Calculator</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: CASE LAWS */}
            <section id="landmark-supreme-court-rulings" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>Judicial Precedents</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                8. Supreme Court Rulings: Pratibha Rani to Arunachala Gounder
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  Over decades, the Supreme Court of India has firmly fortified women&apos;s property rights, ensuring
                  that patriarchal interpretations do not extinguish their financial security.
                </p>

                <div className="space-y-4">
                  {/* Case 1 */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#C65378] uppercase">Criminal Law &amp; Stridhan</span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                        (1985) 2 SCC 370
                      </span>
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-900">
                      Pratibha Rani v. Suraj Kumar: Stridhan Criminal Breach of Trust
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A three-judge bench of the Supreme Court held that Stridhan is the exclusive property of the wife.
                      Entrusting jewelry to the husband or in-laws does not create co-ownership. Refusing to return
                      Stridhan upon demand constitutes Criminal Breach of Trust under Section 406 IPC (now Section 316
                      of Bharatiya Nyaya Sanhita, 2023).
                    </p>
                  </div>

                  {/* Case 2 */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#5F7E75] uppercase">Female Inheritance &amp; Section 15</span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                        (2022) 11 SCC 520
                      </span>
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-900">
                      Arunachala Gounder v. Ponnusamy: Reversion to Father Heirs
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Supreme Court held that self-acquired property of a Hindu male dying intestate devolves upon
                      his daughter by inheritance. Furthermore, if a female Hindu dies without issue, property inherited
                      from her father goes back to the source (the heirs of her father) under Section 15(2)(a), not her
                      husband&apos;s family.
                    </p>
                  </div>

                  {/* Case 3 */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-800 uppercase">Absolute Ownership Conversion</span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                        (1977) 3 SCC 99
                      </span>
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-900">
                      V. Tulasamma v. Sesha Reddy: Wide Amplitude of Section 14(1)
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Supreme Court settled that Section 14(1) must be given the widest possible scope. Any property
                      allotted to a widow in lieu of maintenance becomes her absolute property with unrestricted powers
                      of alienation and testamentary disposition.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: STRIDHAN RECOVERY SOP */}
            <section id="stridhan-recovery-sop" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>Recovery Protocol</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                9. Stridhan Recovery SOP: Protecting Jewelry from In-Laws
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                If your husband or in-laws have locked away your wedding gold, jewelry, or documents and refuse to return
                them, execute this 5-stage legal protocol immediately.
              </p>

              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C65378] uppercase">Stage 1 • Days 1 to 10</span>
                    <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                      Evidence Assembly
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">Compile Jewel Receipts &amp; Gift Lists</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Retrieve jeweler invoices, hallmarked weight certificates, and the signed gift list prepared under
                    the Dowry Prohibition Rules, 1985. Gather wedding photographs and videos showing you wearing each
                    specific piece.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C65378] uppercase">Stage 2 • Days 11 to 20</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                      Advocate Notice
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">Issue Formal Legal Demand Notice</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Have an advocate dispatch a registered Legal Notice demanding unconditional return of all Stridhan
                    articles within 15 days, citing <em>Pratibha Rani v. Suraj Kumar</em>. This creates vital evidence of
                    demand and refusal.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C65378] uppercase">Stage 3 • Days 21 to 35</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                      DV Act Petition
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    File Application Under PWDVA Section 12 &amp; 18
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    File an application before the Metropolitan Magistrate under the Protection of Women from Domestic
                    Violence Act (PWDVA). The court can pass urgent interim orders restraining in-laws from alienating
                    the jewelry and directing police assistance for recovery.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C65378] uppercase">Stage 4 • Concurrent</span>
                    <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">
                      Criminal Complaint
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Lodge FIR Under Section 316 BNS (Section 406 IPC)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    If in-laws intentionally retain, sell, or mortgage the jewelry, file a formal complaint with the
                    local Women&apos;s Cell or police station for Criminal Breach of Trust under Section 316 BNS (formerly
                    Section 406 IPC).
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C65378] uppercase">Stage 5 • Final Stage</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      Safe Custody
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Transfer to Sole Bank Locker &amp; Execute a Will
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Once recovered, immediately place all gold and ornaments in a sole-operated bank locker in your name.
                    Draft a Will specifying who inherits the jewelry to avoid future family disputes.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: WILL DRAFTING SOP */}
            <section id="how-to-draft-will-sop" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>Testamentary Planning SOP</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                10. Step-by-Step Protocol: How a Hindu Woman Can Make a Will
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Making a Will under Section 30 of the Hindu Succession Act is simple, private, and legally decisive.
                Follow this 6-stage roadmap:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                  <p className="text-xs font-black text-[#C65378] uppercase">Step 1: Complete Asset Audit</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    List all your assets: bank accounts, fixed deposits, demat shares, Stridhan gold jewelry, flat or
                    land parcels, and your undivided coparcenary share in ancestral family property.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                  <p className="text-xs font-black text-[#C65378] uppercase">Step 2: Appoint Beneficiaries</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Clearly name primary and alternate beneficiaries. You have full freedom to distribute assets to your
                    children, aging parents, siblings, or spouse in whatever proportions you choose.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                  <p className="text-xs font-black text-[#C65378] uppercase">Step 3: Name a Trusted Executor</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Appoint an independent, reliable person (a sibling, adult child, or trusted friend) as your Executor
                    to administer your estate and carry out your instructions after your lifetime.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                  <p className="text-xs font-black text-[#C65378] uppercase">Step 4: Draft Clear Exclusion Clauses</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If you are intentionally excluding estranged relatives or leaving a smaller share to a particular
                    party, explain the reason calmly to defeat claims of undue influence in probate court.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                  <p className="text-xs font-black text-[#C65378] uppercase">Step 5: Sign with Two Witnesses</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 63 of the Indian Succession Act, sign the Will in the physical presence of two adult
                    witnesses who are NOT beneficiaries under the Will.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                  <p className="text-xs font-black text-[#C65378] uppercase">Step 6: Optional SRO Registration</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A plain paper Will is 100% legal. However, registering it at the Sub-Registrar&apos;s Office (SRO) creates
                    an official government record that makes forgery challenges virtually impossible.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: SPECIAL SCENARIOS */}
            <section id="specialized-scenarios" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>Real-World Situations</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                11. Special Scenarios: Childless, Divorced &amp; Remarried Women
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Different life milestones require distinct estate planning strategies under Indian personal law:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-2">
                  <h3 className="text-sm font-extrabold text-[#172228] flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#C65378]" />
                    <span>Scenario A: Childless Married Woman</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If you die without a Will, your self-acquired wealth and Stridhan devolve upon your husband. If he
                    passes away, his relatives inherit everything, leaving your parents with 0%. A Will ensures your
                    parents receive financial support.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-2">
                  <h3 className="text-sm font-extrabold text-[#172228] flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#5F7E75]" />
                    <span>Scenario B: Divorced Woman &amp; Alimony</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Alimony lump sums and properties transferred during divorce constitute your absolute Stridhan under
                    Section 14. Your ex-husband has zero inheritance claim. However, you must execute a Will to designate
                    guardians and trustees for minor children.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-2">
                  <h3 className="text-sm font-extrabold text-[#172228] flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-700" />
                    <span>Scenario C: Remarried Woman with Blended Family</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If you have children from a prior marriage and remarry, dying intestate splits your estate among your
                    new husband and all children. A Will is essential to ring-fence specific properties for your first-marriage
                    children.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-2">
                  <h3 className="text-sm font-extrabold text-[#172228] flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-blue-700" />
                    <span>Scenario D: Single / Unmarried Professional</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 15(1), your estate devolves to parents, then father&apos;s heirs. If you have a live-in
                    partner, pets, or charitable causes, Indian law gives them zero rights without an explicit Will.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: WHY EVERY WOMAN NEEDS A WILL */}
            <section id="why-hindu-woman-needs-will" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>Conversion Bridge</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                12. Why Every Hindu Woman Must Make a Will Under Section 30
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  Writing a Will is not just for the elderly or wealthy; it is the ultimate tool of personal sovereignty
                  for every Indian woman. It transforms your legal rights from uncertain statutory formulas into an
                  ironclad, enforceable plan.
                </p>

                {/* With Will vs Without Will Comparison */}
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs sm:text-sm min-w-[550px]">
                    <thead className="bg-[#172228] text-white text-[11px] uppercase">
                      <tr>
                        <th className="p-3">Estate Factor</th>
                        <th className="p-3">With a Valid Will (Section 30)</th>
                        <th className="p-3">Without a Will (Section 15 Intestacy)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Who Inherits?</td>
                        <td className="p-3 text-emerald-700 font-bold">100% your choice (parents, kids, friends)</td>
                        <td className="p-3 text-rose-600">Fixed statutory formula (husband&apos;s family prioritized)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Aging Parents Protection</td>
                        <td className="p-3 text-emerald-700 font-bold">Guaranteed monthly maintenance or assets</td>
                        <td className="p-3 text-rose-600">Receive 0% if married with kids or childless</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Jewelry &amp; Stridhan</td>
                        <td className="p-3 text-emerald-700 font-bold">Assigned to specific daughters/sisters</td>
                        <td className="p-3 text-slate-600">Often grabbed by in-laws during mourning</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Bank &amp; Locker Access</td>
                        <td className="p-3 text-emerald-700 font-bold">Executor releases funds in weeks</td>
                        <td className="p-3 text-slate-600">Frozen until court Succession Certificate (6-12 mos)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-r from-[#172228] to-[#263842] text-white space-y-3">
                  <p className="text-base sm:text-lg font-bold">Draft Your Legally Valid Will Online in 15 Minutes</p>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    WillDrafting provides clause-by-clause legal guidance tailored to Indian succession acts. Your draft
                    is checked by senior advocates at AMA Legal Solutions.
                  </p>
                  <button
                    onClick={handleStartDraft}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C65378] text-white text-xs sm:text-sm font-extrabold hover:bg-[#b04568] transition-all"
                  >
                    <span>Start Your Will Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 13: INTERACTIVE CHECKLIST */}
            <section id="stridhan-audit-checklist" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <CheckSquare className="w-4 h-4" />
                <span>Actionable Audit</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                13. Interactive Checklist: Stridhan &amp; Property Record Audit
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Use this interactive 6-point checklist to audit your property ownership records and ensure your assets
                remain 100% protected.
              </p>

              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Checklist Progress:</span>
                    <span className="text-sm font-black text-[#C65378]">{checkedCount} of 6 Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyChecklist}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied!" : "Copy Text"}</span>
                    </button>
                    <button
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      id: "check-1",
                      title: "1. Jewel Audit & Locker Custody",
                      desc: "Cataloged all jewelry weights with invoices and stored them in a sole-name bank locker.",
                    },
                    {
                      id: "check-2",
                      title: "2. Certified Title Deeds Retained",
                      desc: "Retained certified copies of registered sale deeds for self-acquired and parental real estate.",
                    },
                    {
                      id: "check-3",
                      title: "3. Matched Bank & Demat Nominations",
                      desc: "Updated primary and alternate nominees across bank savings, Fixed Deposits, and mutual funds.",
                    },
                    {
                      id: "check-4",
                      title: "4. Section 15(2) Reversion Understood",
                      desc: "Understood that parental property reverts to father's heirs if dying childless without a Will.",
                    },
                    {
                      id: "check-5",
                      title: "5. Comprehensive Will Executed",
                      desc: "Drafted a Will under Section 30 with two independent witnesses, allocating specific shares.",
                    },
                    {
                      id: "check-6",
                      title: "6. Trusted Independent Executor Named",
                      desc: "Designated a trusted family member or professional to manage probate and execution smoothly.",
                    },
                  ].map((chk) => (
                    <div
                      key={chk.id}
                      onClick={() => toggleCheck(chk.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        checkedItems[chk.id]
                          ? "bg-rose-50/50 border-[#C65378]/30"
                          : "bg-slate-50/60 border-slate-200 hover:bg-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checkedItems[chk.id] || false}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 accent-[#C65378] cursor-pointer"
                      />
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-slate-900">{chk.title}</p>
                        <p className="text-xs text-slate-600 mt-0.5">{chk.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {isAllValid && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>All 6 Items Completed: Your estate records and Stridhan audit are in optimal order!</span>
                  </div>
                )}
              </div>
            </section>

            {/* SECTION 14: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>Direct Answers</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                14. Frequently Asked Questions: Stridhan &amp; Women Property
              </h2>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs transition-all"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 text-slate-900 font-extrabold text-xs sm:text-sm hover:bg-slate-50/60 transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 15: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target border-t border-slate-200 pt-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>Statutory Authority</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                15. Statutory Citations: Acts, Precedents &amp; Legal Sources
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-3 text-xs text-slate-700">
                <p className="font-bold text-slate-900">Primary Acts &amp; Sections Cited:</p>
                <ul className="space-y-1.5 list-disc list-inside text-slate-600 leading-relaxed">
                  <li>
                    <strong>Hindu Succession Act, 1956:</strong> Section 14 (Absolute ownership), Section 15 (Female intestate succession), Section 16 (Order of distribution), Section 30 (Testamentary disposition).
                  </li>
                  <li>
                    <strong>Indian Succession Act, 1925:</strong> Section 59 (Sound mind testamentary capacity), Section 63 (Execution and attestation of Wills).
                  </li>
                  <li>
                    <strong>Protection of Women from Domestic Violence Act, 2005 (PWDVA):</strong> Sections 12 &amp; 18 (Stridhan recovery &amp; protection orders).
                  </li>
                  <li>
                    <strong>Bharatiya Nyaya Sanhita, 2023 (BNS):</strong> Section 316 (formerly IPC Section 406 for Criminal Breach of Trust).
                  </li>
                  <li>
                    <strong>Dowry Prohibition Act, 1961:</strong> Sections 3 &amp; 4 read with Dowry Prohibition (Maintenance of Lists of Presents) Rules, 1985.
                  </li>
                </ul>

                <div className="pt-2">
                  <p className="font-bold text-slate-900 mb-2">Verified Government Portals:</p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://www.indiacode.nic.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold"
                    >
                      <span>India Code Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href="https://main.sci.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold"
                    >
                      <span>Supreme Court Judgments</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href="https://ncw.nic.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold"
                    >
                      <span>National Commission for Women</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="font-bold text-slate-900 mb-2">Related WillDrafting Guides:</p>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/blogs/married-daughter-rights-in-fathers-property"
                      className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-[11px] font-bold"
                    >
                      Married Daughter Property Rights
                    </Link>
                    <Link
                      href="/blogs/second-wife-children-property-rights-india"
                      className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-[11px] font-bold"
                    >
                      Second Wife &amp; Children Rights
                    </Link>
                    <Link
                      href="/tools/succession-calculator"
                      className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-[11px] font-bold"
                    >
                      Section 15 Succession Calculator
                    </Link>
                    <Link
                      href="/templates/will-format-india"
                      className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-[11px] font-bold"
                    >
                      Free Indian Will Format
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </article>

          {/* =====================================================================
              RIGHT COLUMN: Sticky Sidebar (Author / CTA / Trust Cards)
              ===================================================================== */}
          <aside className="space-y-5 sticky top-6">
            {/* CARD 1: AUTHOR BIO CARD */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] font-black flex items-center justify-center text-sm shrink-0">
                  RR
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Advocate Rajeshwar Rao</h4>
                  <p className="text-[11px] font-bold text-[#C65378]">Senior Succession Counsel</p>
                  <p className="text-[10px] text-slate-500">AMA Legal Solutions</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialist in Hindu Succession Act litigations, Stridhan recovery petitions, and testamentary estate
                structuring with over 15 years of bar experience.
              </p>
              <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Counsel
                </span>
                <Link href="/about-us" className="text-[#C65378] font-bold hover:underline">
                  About AMA
                </Link>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-5 desktop-sidebar-only">
{/* CARD 2: EMERGENCY CTA CARD */}
            <div className="hidden lg:block rounded-3xl bg-[#172228] p-6 text-white text-center shadow-lg space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-rose-200 text-[11px] font-bold tracking-wide">
                <Lock className="w-3 h-3 text-[#C65378]" />
                <span>CONFIDENTIAL LEGAL SHIELD</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold leading-tight">
                Protect Your Stridhan &amp; Legacy Today
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Don&apos;t let Section 15 default rules transfer your hard-earned assets to in-laws. Create a legally
                binding Will in 15 minutes.
              </p>
              <button
                onClick={handleStartDraft}
                className="w-full py-3 rounded-full bg-[#C65378] hover:bg-[#b04568] text-white font-extrabold text-xs uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-md shadow-[#C65378]/30"
              >
                Draft Your Will Now
              </button>
              <div className="pt-1 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-slate-300">
                <PhoneCall className="w-3 h-3 text-rose-300" />
                <span>Helpline: +91 84484 49084</span>
              </div>
            </div>

            {/* CARD 3: TRUST & COMPLIANCE CHECKLIST */}
            <div className="hidden lg:block rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-slate-900 font-extrabold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>WillDrafting Protection</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Statutory Accuracy:</strong> Compliant with Section 14 &amp; Section 30 HSA.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Lawyer Verified:</strong> Reviewed by senior advocates at AMA Legal Solutions.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>100% Confidential:</strong> Bank-grade encryption; zero data sharing.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Print-Ready A4:</strong> Formatted for immediate two-witness execution.
                  </span>
                </li>
              </ul>
            </div>

            {/* CARD 4: RELATED GUIDES */}
            <div className="hidden lg:block rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-slate-900 font-extrabold text-xs uppercase tracking-wider">
                <FileText className="w-4 h-4 text-[#C65378]" />
                <span>Related Succession Guides</span>
              </div>
              <div className="space-y-2 text-xs">
                <Link
                  href="/blogs/married-daughter-rights-in-fathers-property"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/40 transition-all"
                >
                  <p className="font-bold text-slate-900">Married Daughter Property Rights</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Ancestral coparcenary &amp; 2005 Amendment →</p>
                </Link>
                <Link
                  href="/blogs/second-wife-children-property-rights-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/40 transition-all"
                >
                  <p className="font-bold text-slate-900">Second Wife &amp; Children Rights</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">HMA Section 16 &amp; Supreme Court 2023 ruling →</p>
                </Link>
                <Link
                  href="/tools/succession-calculator"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/40 transition-all"
                >
                  <p className="font-bold text-slate-900">Section 15 Succession Calculator</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Interactive heir share calculation tool →</p>
                </Link>
              </div>
            </div>
            </div>

            {/* MOBILE ONLY: Related WillDrafting Guides */}
            <div className="pt-4 border-t border-slate-100 block lg:hidden">
              <span className="text-xs font-bold text-[#172228] block mb-2">Related WillDrafting Guides:</span>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/blogs/married-daughter-rights-in-fathers-property"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Married Daughter Property Rights
                </Link>
                <Link
                  href="/blogs/second-wife-children-property-rights-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Second Wife & Children Rights
                </Link>
                <Link
                  href="/blogs/huf-property-after-death-of-karta"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  HUF Property After Karta Death
                </Link>
                <Link
                  href="/templates/will-format-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Free Indian Will Format
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* =========================================================================
          FULL-SCREEN IMAGE MODAL / LIGHTBOX
          ========================================================================= */}
      {showImageModal && (
        <div
          onClick={() => setShowImageModal(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center animate-fadeIn cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Hindu Woman Property Rights &amp; Stridhan Framework
                </h3>
                <p className="text-xs text-slate-500">
                  Statutory blueprint under Hindu Succession Act, 1956 (Sections 14, 15, 16 &amp; 30)
                </p>
              </div>
              <button
                onClick={() => setShowImageModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100">
              <Image
                src="/images/hindu-woman-property-rights-stridhan-will.jpg"
                alt="Hindu Woman Property Rights Stridhan Blueprint Full View"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>WillDrafting.in • Powered by AMA Legal Solutions</span>
              <button
                onClick={() => setShowImageModal(false)}
                className="px-4 py-1.5 rounded-full bg-[#172228] text-white font-bold text-xs"
              >
                Close Blueprint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
