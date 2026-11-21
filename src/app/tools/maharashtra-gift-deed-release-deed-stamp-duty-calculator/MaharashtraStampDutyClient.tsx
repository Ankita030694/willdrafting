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
  IndianRupee,
  MapPin,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-overview", label: "1. Maharashtra Stamp Act: Art. 34 & Art. 52(a)" },
  { id: "interactive-calculator", label: "2. Gift & Release Deed Duty Calculator" },
  { id: "article-34-gift-deed", label: "3. Article 34 Gift Deed: Rs 200 vs 3% Rule" },
  { id: "article-52a-release-deed", label: "4. Article 52(a) Release Deed Rs 500 Rules" },
  { id: "blood-relative-matrix", label: "5. Blood Relative Eligibility Matrix" },
  { id: "metro-cess-registration", label: "6. Metro Cess & IGRS Rs 30,000 Fee Cap" },
  { id: "deed-comparison-table", label: "7. Gift Deed vs Release Deed vs Will" },
  { id: "igrs-filing-sop", label: "8. Step-by-Step IGRS Maharashtra Filing SOP" },
  { id: "practical-case-studies", label: "9. Case Studies: Mumbai, Pune & Nagpur" },
  { id: "igrs-checklist-templates", label: "10. IGRS Checklist & Recital Clauses" },
  { id: "institutional-profile", label: "11. Institutional Profile: Legal Excellence" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
  { id: "statutory-citations", label: "13. Legal Citations & IGRS Portals" },
];

const FAQS = [
  {
    q: "Is stamp duty on a gift deed from father to son in Mumbai really Rs 200?",
    a: "Yes, if the flat or land is residential or agricultural. Under Article 34 of the Maharashtra Stamp Act, a gift of a home or farm land to a spouse, son, daughter, grandchild, or deceased son's wife costs Rs 200 in stamp duty and Rs 200 in registration fee. Commercial shops or offices do not get the Rs 200 rate and attract 3% stamp duty.",
  },
  {
    q: "Which family members qualify for the Rs 200 gift deed rate?",
    a: "Only seven close relations qualify for Rs 200 on residential or farm property: husband, wife, son, daughter, grandson, granddaughter, and the wife of a deceased son. Parents, brothers, and sisters do not get the Rs 200 rate. Gifts to them attract 3% stamp duty.",
  },
  {
    q: "What is the stamp duty on a Release Deed in Maharashtra?",
    a: "Under Article 52(a) of the Maharashtra Stamp Act, a Release Deed (Hakka Sod Patra) for ancestral property without money payment costs Rs 500 in stamp duty. It must be signed in favour of close family co-owners. If the home is self-acquired or money is paid, standard 5% to 6% duty applies.",
  },
  {
    q: "How much is stamp duty for gifting a flat to a brother or parent?",
    a: "If you gift a flat to your brother, sister, father, or mother, the Rs 200 concession does not apply. Under the first proviso to Article 34, you must pay 3% stamp duty on the Ready Reckoner value, plus applicable urban cess and a 1% registration fee capped at Rs 30,000.",
  },
  {
    q: "Is registration compulsory for a Rs 200 Gift Deed or Rs 500 Release Deed?",
    a: "Yes. Under Section 17 of the Registration Act, 1908, every gift or release of immovable property must be registered at the local IGRS Maharashtra Sub-Registrar Office. Simply notarizing the paper or printing it on Rs 200 or Rs 500 stamp paper has zero legal value.",
  },
  {
    q: "How does the IGRS Maharashtra Rs 30,000 registration fee cap work?",
    a: "In Maharashtra, the standard registration fee is 1% of the Ready Reckoner market value, capped at Rs 30,000 for properties above Rs 30 lakh. However, if your Gift Deed qualifies for the Rs 200 residential family concession, the registration fee is also a flat Rs 200.",
  },
];

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export default function MaharashtraStampDutyClient() {
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

  const [activeId, setActiveId] = useState<string>("statutory-overview");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedClause, setCopiedClause] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Calculator State
  const [deedType, setDeedType] = useState<"gift" | "release">("gift");
  const [propertyType, setPropertyType] = useState<"residential" | "agricultural" | "commercial">(
    "residential"
  );
  const [cityArea, setCityArea] = useState<"mumbai" | "pune_thane_nagpur" | "rest_maharashtra">(
    "mumbai"
  );
  const [relationType, setRelationType] = useState<
    "immediate_200" | "extended_family" | "non_relative"
  >("immediate_200");
  const [releaseNature, setReleaseNature] = useState<"ancestral_coowner" | "self_acquired_or_paid">(
    "ancestral_coowner"
  );
  const [marketValueLakhs, setMarketValueLakhs] = useState<number>(100); // Rs 1 Crore default
  const [releasedSharePct, setReleasedSharePct] = useState<number>(50);

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
    setDeedType("gift");
    setPropertyType("residential");
    setCityArea("mumbai");
    setRelationType("immediate_200");
    setReleaseNature("ancestral_coowner");
    setMarketValueLakhs(100);
    setReleasedSharePct(50);
  };

  // Calculation Engine
  const fullMarketValue = Math.max(1, marketValueLakhs) * 100000;
  const effectiveValue =
    deedType === "release"
      ? (fullMarketValue * Math.min(100, Math.max(1, releasedSharePct))) / 100
      : fullMarketValue;

  const standardSaleRate = cityArea === "rest_maharashtra" ? 0.05 : 0.06; // 5% base + 1% metro/LBT in Mumbai/Pune/Thane/Nagpur
  const standardSaleDuty = effectiveValue * standardSaleRate;
  const standardRegFee = Math.min(30000, effectiveValue * 0.01);
  const standardTotalCost = standardSaleDuty + standardRegFee;

  let baseStampDuty = 0;
  let urbanCessDuty = 0;
  let registrationFee = 0;
  let appliedArticle = "";
  let rateBadge = "";
  let rationaleText = "";
  let actionTip = "";

  if (deedType === "gift") {
    if (
      relationType === "immediate_200" &&
      (propertyType === "residential" || propertyType === "agricultural")
    ) {
      baseStampDuty = 200;
      urbanCessDuty = 0;
      registrationFee = 200;
      appliedArticle = "Article 34 (Second Proviso) - Flat Rs 200 Concession";
      rateBadge = "Rs 200 Flat Concession Eligible";
      rationaleText =
        "Your transfer is a residential or agricultural gift to a spouse, child, grandchild, or deceased son's wife. Under the second proviso to Article 34, stamp duty is capped at Rs 200 and registration fee is Rs 200.";
      actionTip =
        "Attach clear relationship proof (Aadhaar, PAN, Birth or Marriage Certificate) and register at your local IGRS Sub-Registrar Office.";
    } else if (relationType === "immediate_200" && propertyType === "commercial") {
      baseStampDuty = effectiveValue * 0.03;
      urbanCessDuty = cityArea === "rest_maharashtra" ? 0 : effectiveValue * 0.01;
      registrationFee = Math.min(30000, effectiveValue * 0.01);
      appliedArticle = "Article 34 (First Proviso) - 3% Commercial Family Rate";
      rateBadge = "3% Duty (Commercial Excluded from Rs 200)";
      rationaleText =
        "The Rs 200 concession applies only to residential and agricultural property. Commercial shops, offices, or industrial units gifted to a spouse or child attract 3% base stamp duty plus 1% local urban cess (where applicable) and 1% registration fee capped at Rs 30,000.";
      actionTip =
        "Check if a Will is a better option if you do not need immediate ownership transfer, since a Will has zero stamp duty.";
    } else if (relationType === "extended_family") {
      baseStampDuty = effectiveValue * 0.03;
      urbanCessDuty = cityArea === "rest_maharashtra" ? 0 : effectiveValue * 0.01;
      registrationFee = Math.min(30000, effectiveValue * 0.01);
      appliedArticle = "Article 34 (First Proviso) - 3% Blood Relative Rate";
      rateBadge = "3% Family Slab (Parents / Siblings)";
      rationaleText =
        "Gifts to parents, brothers, sisters, or other lineal ascendants/descendants do not qualify for the Rs 200 slab. They attract 3% base stamp duty under the first proviso to Article 34, plus 1% urban cess in metro cities and 1% registration fee capped at Rs 30,000.";
      actionTip =
        "Ensure you pay stamp duty via e-SBTR or GRAS Maharashtra and verify Ready Reckoner valuation before booking your SRO slot.";
    } else {
      baseStampDuty = effectiveValue * 0.05;
      urbanCessDuty = cityArea === "rest_maharashtra" ? 0 : effectiveValue * 0.01;
      registrationFee = Math.min(30000, effectiveValue * 0.01);
      appliedArticle = "Article 34(a) read with Article 25 - Full Conveyance Rate";
      rateBadge = "Full Rate (Non-Relative Donee)";
      rationaleText =
        "Gifts to friends, cousins, uncles, or unrelated persons receive zero family concession. Standard conveyance stamp duty (5% base + 1% metro/LBT cess in major cities) applies, along with 1% registration fee capped at Rs 30,000.";
      actionTip =
        "Note that non-relative gifts above Rs 50,000 are also taxable as Income from Other Sources under Section 56(2)(x) of the Income Tax Act.";
    }
  } else {
    // Release Deed
    if (relationType !== "non_relative" && releaseNature === "ancestral_coowner") {
      baseStampDuty = 500;
      urbanCessDuty = 0;
      registrationFee = 1000;
      appliedArticle = "Article 52(a) - Ancestral Family Release Deed (Rs 500)";
      rateBadge = "Rs 500 Flat Release Deed Eligible";
      rationaleText =
        "Under Article 52(a), a Release Deed (Hakka Sod Patra) executed without money payment in favour of close family co-owners of ancestral property attracts a flat Rs 500 stamp duty and nominal SRO registration fee (approx. Rs 1,000).";
      actionTip =
        "Both the releasor and recipient must already appear as legal heirs or co-owners on the 7/12 extract, Property Card, or Society Share Certificate.";
    } else {
      baseStampDuty = effectiveValue * 0.05;
      urbanCessDuty = cityArea === "rest_maharashtra" ? 0 : effectiveValue * 0.01;
      registrationFee = Math.min(30000, effectiveValue * 0.01);
      appliedArticle = "Article 52(b) - Conveyance Rate on Released Share";
      rateBadge = "Full Conveyance Rate (Art. 52(b))";
      rationaleText =
        "If the property is self-acquired, if money is paid for the release, or if the release is in favour of a non-family co-owner, Article 52(b) applies. Stamp duty is charged at full conveyance rates (5% to 6%) on the Ready Reckoner value of the released share.";
      actionTip =
        "If transferring a self-acquired home to a spouse or child without payment, use an Article 34 Gift Deed (Rs 200) instead of a Release Deed.";
    }
  }

  const totalStampDuty = baseStampDuty + urbanCessDuty;
  const totalGovtCost = totalStampDuty + registrationFee;
  const totalSavings = Math.max(0, standardTotalCost - totalGovtCost);

  const copyClauseToClipboard = () => {
    const clauseText = `STATUTORY RECITAL CLAUSE: MAHARASHTRA GIFT DEED (ARTICLE 34 - RS 200 CONCESSION)
"Out of natural love and affection for the Donee, who is the Donor's [Son / Daughter / Spouse], and without any monetary consideration whatsoever, the Donor hereby gifts, conveys, and transfers the Schedule Residential Property unto the Donee, to hold the same absolutely and forever.

The Donor and Donee declare that this instrument is a Gift of residential property between specified blood relatives under the second proviso to Article 34 of Schedule I to the Maharashtra Stamp Act, 1958, eligible for the flat Rs 200 stamp duty concession."`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `IGRS MAHARASHTRA REGISTRATION CHECKLIST: GIFT DEED & RELEASE DEED
1. Original Title Deed / Registered Sale Deed / Index II of the property.
2. Latest 7/12 Extract (Satbara), Property Card (PR Card), or Society Share Certificate.
3. Society No Objection Certificate (NOC) for Co-operative Housing Society flats.
4. Aadhaar Card and PAN Card of Donor/Releasor, Donee/Releasee, and Two Witnesses.
5. Blood Relationship Proof (Birth Certificate, Marriage Certificate, or Passport).
6. Ready Reckoner Valuation Sheet from IGRS Maharashtra e-ASR portal.
7. e-SBTR or GRAS Challan receipt for Stamp Duty and Registration Fee payment.
8. Death Certificate & Legal Heirship Proof (for ancestral Release Deeds under Art. 52(a)).`;
    navigator.clipboard.writeText(checklistText);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Brand Navy Background)
          ========================================================================= */}
      <section className="relative bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Statutory Authority Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold tracking-wider uppercase text-rose-200 mb-6">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>MAHARASHTRA STAMP ACT, 1958 • ARTICLES 34 &amp; 52(a)</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes, distinct from <title>) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Maharashtra Gift &amp; Release Deed Stamp Duty Calculator
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Calculate exact Maharashtra stamp duty, Metro Cess, and IGRS registration fees. Check if
            your family flat transfer qualifies for the Rs 200 Gift Deed or Rs 500 Release Deed rate.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Stamp Duty Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/services/gift-deed-drafting-registration"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <FileCheck className="w-4 h-4 text-[#C65378]" />
              <span>Draft Gift or Release Deed</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Rs 200 Flat</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ART. 34(a) RESIDENTIAL GIFT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Rs 500 Flat</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ART. 52(a) RELEASE DEED
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Rs 30,000 Cap</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                IGRS 1% REGISTRATION FEE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 17</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MANDATORY SRO REGISTRATION
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
                <span>Maharashtra Stamp Act</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Computed under Articles 34 &amp; 52(a) of Schedule I to the Maharashtra Stamp Act,
                1958 and Section 17 of the Registration Act, 1908.
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
                <span>EXECUTIVE BRIEF: MAHARASHTRA FAMILY PROPERTY TRANSFERS</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Rs 200 Residential Gift Deed Concession:</strong> Gifting a flat, house,
                    or farm land to your spouse, son, daughter, grandchild, or deceased son&rsquo;s
                    wife costs just Rs 200 in stamp duty and Rs 200 in registration fees.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>3% Slab for Parents, Siblings &amp; Shops:</strong> Commercial properties
                    and gifts to parents, brothers, or sisters do not qualify for Rs 200. They
                    attract 3% stamp duty plus applicable urban cess.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Rs 500 Ancestral Release Deed (Hakka Sod Patra):</strong> Releasing your
                    undivided share in ancestral property to a family co-owner without payment costs
                    a flat Rs 500 under Article 52(a).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Mandatory IGRS Registration:</strong> Plain stamp paper or notarization is
                    legally invalid under Section 17 of the Registration Act, 1908.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY OVERVIEW (ONLY H2 ON THE PAGE) */}
            <section id="statutory-overview" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Maharashtra Stamp Act: Art. 34 &amp; Art. 52(a) Overview
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Generic property calculators often apply standard 5% or 6% sale rates to family
                  transfers in Maharashtra. That leads to wrong cost estimates worth lakhs of rupees.
                </p>
                <p>
                  Under <strong>Article 34 of the Maharashtra Stamp Act, 1958</strong>, a family
                  Gift Deed enjoys steep concessions. Residential and farm gifts to close blood
                  relatives cost a flat Rs 200. Gifts to siblings, parents, or commercial units fall
                  under the 3% slab.
                </p>
                <p>
                  Similarly, <strong>Article 52(a)</strong> governs Release Deeds (Hakka Sod Patra).
                  When a legal heir releases their ancestral share to another family co-owner without
                  money changing hands, the stamp duty is a flat Rs 500.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR TOOL */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>READY RECKONER DUTY ESTIMATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Gift &amp; Release Deed Duty Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your deed type, property category, city limits, and family relationship below
                to calculate exact Maharashtra stamp duty and IGRS registration fees.
              </p>

              {/* Calculator Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-7">
                {/* Step 1: Deed Type */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Step 1: Select Deed Type</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        id: "gift",
                        label: "Gift Deed (Article 34)",
                        desc: "Transfer of self-acquired or owned property without money payment",
                      },
                      {
                        id: "release",
                        label: "Release Deed / Hakka Sod Patra (Article 52)",
                        desc: "Co-owner or legal heir giving up undivided share to another co-owner",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setDeedType(opt.id as "gift" | "release")}
                        className={`text-left p-4 rounded-2xl border transition-all ${
                          deedType === opt.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="font-extrabold text-xs sm:text-sm text-slate-900">
                          {opt.label}
                        </div>
                        <div className="text-[11px] text-slate-600 mt-1 leading-snug">
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Relationship */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C65378]" />
                    <span>Step 2: Relationship Between Donor/Releasor and Recipient</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "immediate_200",
                        label: "Spouse / Child / Grandchild",
                        desc: "Husband, Wife, Son, Daughter, Grandchild, or Deceased Son's Wife",
                      },
                      {
                        id: "extended_family",
                        label: "Parents / Brother / Sister",
                        desc: "Father, Mother, Sibling, or other direct lineal relative",
                      },
                      {
                        id: "non_relative",
                        label: "Friend / Cousin / Non-Relative",
                        desc: "Uncle, Aunt, Cousin, In-laws, or unrelated third party",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setRelationType(
                            opt.id as "immediate_200" | "extended_family" | "non_relative"
                          )
                        }
                        className={`text-left p-3.5 rounded-xl border transition-all ${
                          relationType === opt.id
                            ? "border-[#C65378] bg-rose-50/50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="font-bold text-xs text-slate-900">{opt.label}</div>
                        <div className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Property Type or Release Nature */}
                {deedType === "gift" ? (
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#C65378]" />
                      <span>Step 3: Property Category</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        {
                          id: "residential",
                          label: "Residential Flat / House",
                          desc: "Apartment, bungalow, or residential plot",
                        },
                        {
                          id: "agricultural",
                          label: "Agricultural Land",
                          desc: "Farm land or rural agricultural holding",
                        },
                        {
                          id: "commercial",
                          label: "Commercial / Shop / Office",
                          desc: "Shop, office unit, godown, or industrial plot",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() =>
                            setPropertyType(
                              opt.id as "residential" | "agricultural" | "commercial"
                            )
                          }
                          className={`text-left p-3.5 rounded-xl border transition-all ${
                            propertyType === opt.id
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
                ) : (
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Building className="w-4 h-4 text-[#C65378]" />
                      <span>Step 3: Property Origin &amp; Consideration</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        {
                          id: "ancestral_coowner",
                          label: "Ancestral / Inherited Co-Owned (No Money Paid)",
                          desc: "Qualifies for Article 52(a) flat Rs 500 duty among family co-owners",
                        },
                        {
                          id: "self_acquired_or_paid",
                          label: "Self-Acquired Property or Consideration Paid",
                          desc: "Attracts Article 52(b) full conveyance duty on released share",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() =>
                            setReleaseNature(
                              opt.id as "ancestral_coowner" | "self_acquired_or_paid"
                            )
                          }
                          className={`text-left p-3.5 rounded-xl border transition-all ${
                            releaseNature === opt.id
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
                )}

                {/* Step 4: Location & Ready Reckoner Value */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                  <div className="space-y-2.5">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#C65378]" />
                      <span>Step 4: City / Municipal Jurisdiction</span>
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: "mumbai", label: "Mumbai (BMC Limits - 1% Metro Cess)" },
                        {
                          id: "pune_thane_nagpur",
                          label: "Pune, Thane, Nagpur, Navi Mumbai (1% Cess/LBT)",
                        },
                        {
                          id: "rest_maharashtra",
                          label: "Rest of Maharashtra / Rural Areas (5% Base)",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() =>
                            setCityArea(
                              opt.id as "mumbai" | "pune_thane_nagpur" | "rest_maharashtra"
                            )
                          }
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                            cityArea === opt.id
                              ? "border-[#C65378] bg-rose-50/60 text-slate-900"
                              : "border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="rr-value"
                          className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5"
                        >
                          <IndianRupee className="w-4 h-4 text-[#C65378]" />
                          <span>Ready Reckoner Market Value</span>
                        </label>
                        <span className="text-sm font-black text-[#C65378]">
                          {formatINR(fullMarketValue)}
                        </span>
                      </div>
                      <input
                        id="rr-value"
                        type="range"
                        min={5}
                        max={500}
                        step={5}
                        value={marketValueLakhs}
                        onChange={(e) => setMarketValueLakhs(Number(e.target.value))}
                        className="w-full accent-[#C65378] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                        <span>Rs 5 Lakh</span>
                        <span>Rs 1 Cr</span>
                        <span>Rs 2.5 Cr</span>
                        <span>Rs 5 Cr</span>
                      </div>
                    </div>

                    {deedType === "release" && (
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="share-pct"
                            className="text-xs font-bold text-slate-900 uppercase tracking-wider"
                          >
                            Share Being Released (%)
                          </label>
                          <span className="text-xs font-black text-slate-900">
                            {releasedSharePct}% ({formatINR(effectiveValue)})
                          </span>
                        </div>
                        <input
                          id="share-pct"
                          type="range"
                          min={10}
                          max={100}
                          step={5}
                          value={releasedSharePct}
                          onChange={(e) => setReleasedSharePct(Number(e.target.value))}
                          className="w-full accent-[#C65378] cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Reset Button */}
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset Calculator</span>
                  </button>
                </div>

                {/* =========================================================================
                    DYNAMIC RESULTS CARD
                    ========================================================================= */}
                <div className="rounded-3xl border-2 border-[#172228] bg-gradient-to-br from-slate-900 via-[#172228] to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/15">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                        {appliedArticle}
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-1">
                        Estimated Government Fee: {formatINR(totalGovtCost)}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white shrink-0 self-start sm:self-auto">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>{rateBadge}</span>
                    </div>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        STAMP DUTY + URBAN CESS
                      </div>
                      <div className="text-lg sm:text-xl font-black text-emerald-400">
                        {formatINR(totalStampDuty)}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Base: {formatINR(baseStampDuty)} | Cess: {formatINR(urbanCessDuty)}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        IGRS REGISTRATION FEE
                      </div>
                      <div className="text-lg sm:text-xl font-black text-white">
                        {formatINR(registrationFee)}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        {registrationFee <= 1000
                          ? "Nominal Concessional Fee"
                          : "1% Value (Capped at Rs 30,000)"}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        SAVINGS VS SALE DEED
                      </div>
                      <div className="text-lg sm:text-xl font-black text-rose-300">
                        {formatINR(totalSavings)}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Compared to standard {Math.round(standardSaleRate * 100)}% duty
                      </div>
                    </div>
                  </div>

                  {/* Detailed Legal Analysis */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#C65378]" />
                      <span>Statutory Breakdown:</span>
                    </div>
                    <p>{rationaleText}</p>
                    <div className="pt-2 text-emerald-300 font-semibold border-t border-white/10">
                      <strong>Next Step:</strong> {actionTip}
                    </div>
                  </div>

                  {/* Tool Action Conversion */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-300 text-center sm:text-left">
                      Need a lawyer-drafted deed ready for IGRS Maharashtra registration?
                    </div>
                    <Link
                      href="/services/gift-deed-drafting-registration"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Get Lawyer-Drafted Deed</span>
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
                  <span>VISUAL GUIDE: MAHARASHTRA GIFT &amp; RELEASE DEED CONCESSIONS</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  Maharashtra Stamp Act
                </span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/maharashtra-gift-deed-release-deed-stamp-duty-calculator-og.jpg"
                  alt="Maharashtra Gift and Release Deed Stamp Duty Calculator Guide"
                  width={1200}
                  height={675}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                Visualizing family property transfers in Maharashtra under Article 34 (Rs 200 Gift
                Deed) and Article 52(a) (Rs 500 Release Deed).
              </p>
            </div>

            {/* SECTION 3: ARTICLE 34 GIFT DEED RULES */}
            <section id="article-34-gift-deed" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>GIFT DEED CONCESSIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Article 34 Gift Deed: Rs 200 vs 3% Rule
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Article 34 of Schedule I to the Maharashtra Stamp Act splits family gifts into two
                  strict tiers. Many families lose lakhs because they confuse who falls into the Rs
                  200 tier versus the 3% tier.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-emerald-200 shadow-2xs space-y-2">
                    <div className="font-extrabold text-emerald-800 text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Tier 1: Flat Rs 200 Duty (Second Proviso)</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Applies ONLY to <strong>residential</strong> or <strong>agricultural</strong>{" "}
                      property gifted to a spouse, son, daughter, grandson, granddaughter, or wife of
                      a deceased son. Registration fee is also flat Rs 200.
                    </p>
                  </div>
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-rose-200 shadow-2xs space-y-2">
                    <div className="font-extrabold text-[#C65378] text-sm flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#C65378]" />
                      <span>Tier 2: 3% Stamp Duty (First Proviso)</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Applies when gifting a <strong>commercial shop or office</strong> to your
                      spouse or child, or when gifting <strong>any property</strong> to your parents,
                      brother, or sister. Urban Metro Cess and 1% registration fee (max Rs 30,000)
                      also apply.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: ARTICLE 52(a) RELEASE DEED RULES */}
            <section id="article-52a-release-deed" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>ANCESTRAL RELINQUISHMENT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Article 52(a) Release Deed Rs 500 Rules
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A Release Deed (locally called <em>Hakka Sod Patra</em>) is used when one legal
                  heir gives up their undivided share in favour of another family co-owner. Under
                  Article 52(a), stamp duty is a flat Rs 500 only when three tests are met:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>
                    <strong>Ancestral Property Only:</strong> The property must be ancestral or
                    jointly inherited. Self-acquired property bought by a living owner cannot be
                    transferred for Rs 500 via a Release Deed.
                  </li>
                  <li>
                    <strong>Pre-Existing Co-Owner Status:</strong> Both the person releasing and the
                    person receiving must already have a legal share on the 7/12 extract, Property
                    Card, or Society Share Certificate.
                  </li>
                  <li>
                    <strong>Zero Monetary Payment:</strong> No cash, cheque, or settlement amount may
                    be paid in exchange for the release.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 5: BLOOD RELATIVE ELIGIBILITY MATRIX */}
            <section id="blood-relative-matrix" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>ELIGIBILITY MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Blood Relative Eligibility Matrix
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Check exact Maharashtra stamp duty and registration charges based on who receives the
                property.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 sm:p-4 font-extrabold">Recipient Relationship</th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-emerald-300">
                        Residential / Farm Gift
                      </th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-rose-200">
                        Commercial Gift
                      </th>
                      <th className="p-3.5 sm:p-4 font-extrabold">Ancestral Release Deed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        Spouse, Son, Daughter, Grandchild, Deceased Son&rsquo;s Wife
                      </td>
                      <td className="p-3.5 sm:p-4 text-emerald-800 font-bold">
                        Rs 200 Stamp Duty + Rs 200 Reg. Fee
                      </td>
                      <td className="p-3.5 sm:p-4">3% + Cess + 1% Reg. (Max Rs 30k)</td>
                      <td className="p-3.5 sm:p-4 text-emerald-800 font-bold">
                        Rs 500 Flat (Art. 52(a))
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        Father, Mother, Brother, Sister
                      </td>
                      <td className="p-3.5 sm:p-4 text-[#C65378] font-bold">
                        3% + Cess + 1% Reg. (Max Rs 30k)
                      </td>
                      <td className="p-3.5 sm:p-4">3% + Cess + 1% Reg. (Max Rs 30k)</td>
                      <td className="p-3.5 sm:p-4 text-emerald-800 font-bold">
                        Rs 500 Flat (Art. 52(a))
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        Cousins, Uncle, Aunt, Friends, In-Laws
                      </td>
                      <td className="p-3.5 sm:p-4 text-rose-700 font-bold">
                        5% to 6% Full Sale Rate + 1% Reg.
                      </td>
                      <td className="p-3.5 sm:p-4 text-rose-700 font-bold">
                        5% to 6% Full Sale Rate + 1% Reg.
                      </td>
                      <td className="p-3.5 sm:p-4 text-rose-700">
                        5% to 6% Full Rate (Art. 52(b))
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 6: METRO CESS & REGISTRATION FEE CAP */}
            <section id="metro-cess-registration" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <MapPin className="w-4 h-4" />
                <span>URBAN SURCHARGES &amp; CAPS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Metro Cess &amp; IGRS Rs 30,000 Fee Cap
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In Mumbai (BMC), Pune (PMC/PCMC), Thane, and Nagpur, a 1% Metro Cess or Local Body
                  Tax applies on top of percentage-based stamp duty. For example, a 3% gift to a
                  brother in Mumbai becomes 4% effective duty, while a non-relative gift becomes 6%.
                </p>
                <p>
                  For ad valorem deeds (3%, 5%, or 6%), the IGRS registration fee is 1% of the Ready
                  Reckoner value, strictly capped at <strong>Rs 30,000</strong> for properties worth
                  Rs 30 lakh or more.
                </p>
              </div>
            </section>

            {/* SECTION 7: COMPARISON TABLE */}
            <section id="deed-comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>TRANSFER OPTIONS COMPARED</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Gift Deed vs Release Deed vs Will
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 sm:p-4 font-extrabold">Feature</th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-rose-200">Gift Deed</th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-emerald-300">
                        Release Deed
                      </th>
                      <th className="p-3.5 sm:p-4 font-extrabold">Registered Will</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">When It Takes Effect</td>
                      <td className="p-3.5 sm:p-4">Immediately upon registration</td>
                      <td className="p-3.5 sm:p-4">Immediately upon registration</td>
                      <td className="p-3.5 sm:p-4 font-bold text-emerald-800">
                        Only after the owner&rsquo;s lifetime
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Stamp Duty</td>
                      <td className="p-3.5 sm:p-4">Rs 200 (close family) or 3% to 6%</td>
                      <td className="p-3.5 sm:p-4">Rs 500 (ancestral family) or 5% to 6%</td>
                      <td className="p-3.5 sm:p-4 font-bold text-emerald-800">Rs 0 (Nil Duty)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Can Owner Cancel?</td>
                      <td className="p-3.5 sm:p-4">
                        Irrevocable (unless Sec. 23 Senior Citizens Act applies)
                      </td>
                      <td className="p-3.5 sm:p-4">Irrevocable once registered</td>
                      <td className="p-3.5 sm:p-4 font-bold text-emerald-800">
                        Yes, freely revocable anytime
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* MID-ARTICLE CONTEXTUAL LINK */}
            <div className="rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50/60 via-white to-amber-50/50 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>NOT SURE BETWEEN A GIFT DEED OR A WILL?</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Compare Gift Deed vs Will Costs Across All Indian States
                </div>
                <p className="text-xs text-slate-600">
                  Check stamp duty, senior citizen control, and probate impact before transferring
                  your home.
                </p>
              </div>
              <Link
                href="/tools/gift-deed-vs-will-stamp-duty-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shrink-0 transition-transform hover:-translate-y-0.5 shadow-sm"
              >
                <span>Compare Gift vs Will</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* SECTION 8: IGRS FILING SOP */}
            <section id="igrs-filing-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>REGISTRATION WORKFLOW</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Step-by-Step IGRS Maharashtra Filing SOP
              </h3>
              <div className="space-y-3 pt-1">
                {[
                  {
                    title: "Verify Ready Reckoner Value on e-ASR",
                    desc: "Check your property's official Annual Statement of Rates (Ready Reckoner) on the IGRS Maharashtra e-ASR portal.",
                  },
                  {
                    title: "Draft Deed with Correct Statutory Recitals",
                    desc: "Mention zero consideration, exact blood relationship, and Article 34 or Article 52(a) clearly in the deed text.",
                  },
                  {
                    title: "Pay Stamp Duty via GRAS / e-SBTR",
                    desc: "Generate the GRAS challan online on gras.mahakosh.gov.in and pay the Rs 200, Rs 500, or 3% stamp duty plus registration fee.",
                  },
                  {
                    title: "Upload Draft on iSarita & Book SRO Token",
                    desc: "Submit PDE (Public Data Entry) on the IGRS portal and book a biometric appointment at your Sub-Registrar Office.",
                  },
                  {
                    title: "Appear with Two Witnesses & Complete Mutation",
                    desc: "Donor, Donee, and two adult witnesses sign before the Sub-Registrar. Apply for Index II and society or 7/12 name update.",
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
            </section>

            {/* SECTION 9: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>REAL-WORLD EXAMPLES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Case Studies: Mumbai, Pune &amp; Nagpur
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Mumbai Residential Flat</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 1
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Father Gifts Rs 2 Cr Bandra Flat to Daughter
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Under Article 34 second proviso, because the flat is residential and the donee is
                    a daughter, stamp duty is Rs 200 and registration fee is Rs 200. Total
                    government cost: <strong>Rs 400</strong> (saving over Rs 12.3 lakh).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Pune Commercial Shop</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 2
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Mother Gifts Rs 80L Kothrud Shop to Son
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Because it is a commercial shop, the Rs 200 concession does not apply. Stamp
                    duty is 3% (Rs 2,40,000) plus 1% Pune local cess (Rs 80,000) and Rs 30,000
                    capped registration fee. Total: <strong>Rs 3,50,000</strong>.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Nagpur Ancestral Home</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 3
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Sister Releases Ancestral Share to Brother
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Both siblings are recorded legal heirs on the Property Card. Under Article
                    52(a), the Release Deed without payment costs <strong>Rs 500</strong> stamp duty
                    plus nominal SRO fee.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: IGRS CHECKLIST & RECITAL CLAUSES */}
            <section id="igrs-checklist-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>IGRS DOCUMENTS &amp; CLAUSES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. IGRS Checklist &amp; Recital Clauses
              </h3>

              {/* Template Box 1 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Sample Article 34 Gift Deed Recital (Rs 200 Concession)
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
{`"Out of natural love and affection for the Donee, who is the Donor's [Son / Daughter / Spouse], and without any monetary consideration whatsoever, the Donor hereby gifts, conveys, and transfers the Schedule Residential Property unto the Donee, to hold the same absolutely and forever.

The Donor and Donee declare that this instrument is a Gift of residential property between specified blood relatives under the second proviso to Article 34 of Schedule I to the Maharashtra Stamp Act, 1958, eligible for the flat Rs 200 stamp duty concession."`}
                </pre>
              </div>

              {/* Template Box 2: IGRS Checklist */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    IGRS Maharashtra SRO Filing Checklist
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
                    <span>Original Title Deed &amp; Index II Copy</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>7/12 Extract, Property Card, or Society Share Certificate</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Aadhaar, PAN &amp; Relationship Proof (Birth/Marriage Cert)</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>GRAS / e-SBTR Payment Receipt &amp; Two Witnesses</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Institutional Profile: Legal Excellence
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Property &amp; Succession Desk
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Checked Estate Counsel</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is India&rsquo;s trusted estate planning platform, powered by AMA
                  Legal Solutions. Our property lawyers draft compliant Maharashtra Gift Deeds,
                  Release Deeds, and registered Wills across Mumbai, Pune, Thane, and Nagpur.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/gift-deed-drafting-registration"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Gift Deed Service</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/templates/gift-deed-format-blood-relatives-india"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Gift Deed Format</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/templates/release-deed-format"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Release Deed Format</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/senior-citizen-gift-deed-revocation-assessment-tool"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Revocation Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQ ACCORDION */}
            <section
              id="frequently-asked-questions"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>DIRECT ANSWERS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions
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
                13. Legal Citations &amp; IGRS Portals
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs text-slate-600">
                <p>
                  Verify live Ready Reckoner rates, GRAS e-payment challans, and statutory text on
                  official government portals:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://igrmaharashtra.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>IGRS Maharashtra Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Registration Act, 1908</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Tools &amp; Guides
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/gift-deed-vs-will-stamp-duty-calculator"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Gift Deed vs Will Calculator
                    </Link>
                    <Link
                      href="/tools/ancestral-vs-self-acquired-property-classifier"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Ancestral Property Classifier
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
                      Legal Will Format India
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* 3 Plain-English Summary Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Check Stamp Duty First?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Checking Article 34 and Article 52(a) before visiting the Sub-Registrar saves
                  lakhs. Make sure your deed wording matches the Rs 200 or Rs 500 family rule.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Gift Deed vs Writing a Will</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A Gift Deed transfers your flat right away and cannot be undone easily. A Will
                  keeps full control in your hands while you live and costs zero stamp duty.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our Maharashtra property lawyers check your 7/12 or society papers, draft your
                  Gift or Release Deed cleanly, and guide your IGRS registration step by step.
                </p>
              </div>
            </div>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (ZERO MOBILE NUMBERS)
              ===================================================================== */}
          <aside className="space-y-6 sticky top-24">
            {/* CARD 1: AUTHOR BIO CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                  AAM
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">
                    Advocate Anuj Anand Malik
                  </div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Expert in Maharashtra Stamp Act concessions, IGRS property transfers, High Court
                probate, and family Will structuring.
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
              {/* CARD 2: DUAL CTA 1 - GIFT DEED / WILL DRAFTING (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>IGRS REGISTRATION READY</span>
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Draft a Compliant Gift Deed or Registered Will
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  Avoid Sub-Registrar objections. Get your Maharashtra Gift Deed drafted by lawyers
                  or create your Will online in 15 minutes.
                </p>
                <div className="space-y-2.5">
                  <Link
                    href="/services/gift-deed-drafting-registration"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Gift Deed Drafting Service</span>
                  </Link>
                  <button
                    onClick={handleStartDraft}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-rose-300" />
                    <span>Draft Your Will in 15 Mins</span>
                  </button>
                </div>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Reviewed &amp; Stamp Duty Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (White / Rose Border) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>MAHARASHTRA PROPERTY DESK</span>
                </div>
                <div className="font-black text-slate-900 text-sm leading-snug">
                  Need Help with IGRS Valuation or Ancestral Release?
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Book an online consultation with our AMA Legal Solutions advocates for title
                  checks, Hakka Sod Patra, and SRO registration.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Consult AMA Advocate</span>
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
                      <strong>Article 34 &amp; 52(a) Accuracy:</strong> Built on Maharashtra Stamp
                      Act rules, not generic sale rates.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Hidden Surprises:</strong> Accounts for Metro Cess, LBT, and the
                      Rs 30,000 registration cap.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>SRO-Ready Recitals:</strong> Includes verified blood relative
                      declarations for smooth filing.
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
          <span>Calculator</span>
        </a>
        <Link
          href="/services/gift-deed-drafting-registration"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>Draft Deed</span>
        </Link>
      </div>
    </div>
  );
}
