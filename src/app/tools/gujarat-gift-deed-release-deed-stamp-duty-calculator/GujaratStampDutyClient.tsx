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
  ScrollText,
  ShieldAlert,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Gujarat Stamp Act Rules: Gift vs Release" },
  { id: "interactive-calculator", label: "2. Free Gujarat Stamp Duty Calculator" },
  { id: "article-28-gift-deed", label: "3. Article 28 Gift Deed: 4.9% & Women Waiver" },
  { id: "article-49-release-deed", label: "4. Article 49(a) Release: ₹200 & 2025 Heirs" },
  { id: "section-9-and-case-law", label: "5. March 2026 ₹300 Relief & Shalin Patel" },
  { id: "agricultural-land-section-63", label: "6. Farm Land Trap: Section 63 Khedut Rule" },
  { id: "eligibility-and-tax-rules", label: "7. Eligible Heirs & Income Tax (Sec. 56)" },
  { id: "comparison-table", label: "8. Gift Deed vs Release Deed vs Will" },
  { id: "step-by-step-sop", label: "9. GARVI 2.0 & AnyRoR Step-by-Step Guide" },
  { id: "practical-case-studies", label: "10. Worked Examples: Ahmedabad & Surat" },
  { id: "document-checklist-clauses", label: "11. Required Papers & Copyable Clauses" },
  { id: "institutional-profile", label: "12. Gujarat Estate & Property Legal Desk" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Official Gujarat Portals & Citations" },
];

const FAQS = [
  {
    q: "What is the stamp duty on a Gift Deed in Gujarat under Article 28?",
    a: "Under Article 28 of Schedule I read with Section 3A of the Gujarat Stamp Act, 1958, a Gift Deed pays the same stamp duty as a sale deed under Article 20(a). This equals 3.5% basic duty plus 40% extra duty (1.4%), making 4.9% in total. Unlike Maharashtra or UP, Schedule I Article 28 in Gujarat has no flat Rs 200 or 1% blood-relative concession.",
  },
  {
    q: "Do women get a stamp duty or registration fee waiver in Gujarat?",
    a: "Women get a 100% waiver (0%) on the 1% registration fee when the deed is solely in a woman's name or all-female names. Women still pay the full 4.9% stamp duty on a Gift Deed. If a male co-owner is added, the 0% fee waiver ends and the full 1% uncapped fee applies.",
  },
  {
    q: "What is the stamp duty on an ancestral Release Deed (Hakk Kami) in Gujarat?",
    a: "Under Article 49(a) of the Gujarat Stamp Act, a Release Deed of ancestral property signed without money in favour of close family pays a flat Rs 200 stamp duty. For inherited joint land relinquished or split among recorded heirs, Gujarat's March 2026 Section 9(a) relief sets a flat Rs 300 token duty per deed.",
  },
  {
    q: "What changed for Release Deeds under the Gujarat Stamp (Amendment) Act, 2025?",
    a: "From April 2025, the Gujarat Stamp (Amendment) Act, 2025 widened Article 49(a) to add the son and daughter of a pre-deceased daughter. Earlier, only children of a pre-deceased son were named. Now both maternal and paternal grandchildren of pre-deceased children qualify for the flat Rs 200 ancestral release rate.",
  },
  {
    q: "Can I use a Rs 200 Release Deed for a self-acquired flat in Ahmedabad or Surat?",
    a: "No. In State of Gujarat v. Shalin Mukeshbhai Patel (LPA 689 & 864 of 2023, decided October 30, 2024), the Gujarat High Court Division Bench ruled against this. If the home is not truly undivided ancestral property, or if a co-owner shifts exclusive title to one person, Article 49(b) applies and full 4.9% conveyance duty is charged on the released share.",
  },
  {
    q: "Can I gift farm land in Gujarat to a non-agriculturist child or relative?",
    a: "No. Under Section 63 of the Gujarat Tenancy and Agricultural Lands Act, 1948, farm land cannot pass to a non-farmer without prior Collector approval. The Supreme Court confirmed in Vinodchandra Sakarlal Kapadia v. State of Gujarat (2020) that even a Gift or Will cannot bypass this Khedut status rule.",
  },
  {
    q: "Is a Will cheaper than a Gift Deed in Gujarat?",
    a: "Yes, by lakhs of rupees. On a Rs 1 Crore flat in Gujarat, a Gift Deed costs Rs 4.90 Lakh for a sole woman or Rs 5.90 Lakh for a man. A Will (Vasiyatnama) carries Rs 0 stamp duty and an optional Rs 100 SRO registration fee on GARVI 2.0. Court probate is also not needed in Gujarat.",
  },
  {
    q: "Is a Gift Deed between family members taxed under the Income Tax Act?",
    a: "Under Section 56(2)(x) of the Income Tax Act, 1961, land or flats gifted by defined relatives (spouse, parents, kids, siblings, or lineal family) are 100% tax-free for the receiver. If a non-relative gifts property with a Jantri value over Rs 50,000, the full Jantri value is taxed as income.",
  },
];

type DeedMode = "gift" | "release" | "compare";
type PropertyType = "residential" | "commercial" | "agricultural";
type PropertyOrigin = "ancestral_undivided" | "self_acquired_joint" | "selective_single_coowner";
type RelationType =
  | "spouse"
  | "child"
  | "parent"
  | "sibling"
  | "grandchild_2025"
  | "collateral_heir"
  | "non_relative";
type RecipientGender = "female_sole" | "male" | "joint_mixed";

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

function formatLakhsCrores(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakh`;
  }
  return formatINR(amount);
}

export default function GujaratStampDutyClient() {
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

  // Calculator State
  const [deedMode, setDeedMode] = useState<DeedMode>("compare");
  const [jantriValue, setJantriValue] = useState<number>(10000000); // ₹1 Crore default
  const [sharePercent, setSharePercent] = useState<number>(50); // 50% share default for Release Deed
  const [propertyType, setPropertyType] = useState<PropertyType>("residential");
  const [propertyOrigin, setPropertyOrigin] = useState<PropertyOrigin>("ancestral_undivided");
  const [relation, setRelation] = useState<RelationType>("child");
  const [recipientGender, setRecipientGender] = useState<RecipientGender>("female_sole");
  const [hasConsideration, setHasConsideration] = useState<boolean>(false);
  const [considerationAmount, setConsiderationAmount] = useState<number>(0);
  const [isKhedut, setIsKhedut] = useState<boolean>(true);

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
    setDeedMode("compare");
    setJantriValue(10000000);
    setSharePercent(50);
    setPropertyType("residential");
    setPropertyOrigin("ancestral_undivided");
    setRelation("child");
    setRecipientGender("female_sole");
    setHasConsideration(false);
    setConsiderationAmount(0);
    setIsKhedut(true);
  };

  // =========================================================================
  // VERIFIED GUJARAT STAMP ACT CALCULATION ENGINE
  // =========================================================================
  const safeJantri = Math.max(100000, isNaN(jantriValue) ? 100000 : jantriValue);
  const releasedShareValue = Math.round((safeJantri * sharePercent) / 100);
  const releaseAssessmentBase = hasConsideration
    ? Math.max(releasedShareValue, Math.max(0, considerationAmount || 0))
    : releasedShareValue;

  // 1. Gift Deed (Article 28 + Section 3A(1))
  // Statutory text: Same duty as Article 20(a) Conveyance (3.5% basic + 40% Section 3A surcharge = 1.4% => 4.9% total)
  const giftBasicDuty = Math.round(safeJantri * 0.035);
  const giftSurcharge = Math.round(safeJantri * 0.014);
  const giftStampDuty = giftBasicDuty + giftSurcharge; // 4.9%
  const giftRegFee = recipientGender === "female_sole" ? 0 : Math.round(safeJantri * 0.01); // 0% women waiver, 1% uncapped male/joint
  const giftTotal = giftStampDuty + giftRegFee;

  // 2. Release Deed (Article 49(a) / Section 9(a) Mar 2026 / Article 49(b))
  const isArt49aFamily = [
    "spouse",
    "child",
    "parent",
    "sibling",
    "grandchild_2025",
  ].includes(relation);

  const isSec9CollateralOrLinealInherited =
    propertyOrigin === "ancestral_undivided" &&
    !hasConsideration &&
    (relation === "collateral_heir" || (propertyType === "agricultural" && isArt49aFamily));

  const qualifiesArt49aFlat200 =
    propertyOrigin === "ancestral_undivided" && !hasConsideration && isArt49aFamily;

  let releaseStampDuty = 0;
  let releaseBasicDuty = 0;
  let releaseSurcharge = 0;
  let releaseArticleLabel = "Article 49(b) Conveyance Rate (4.9%)";
  let releaseRuleTag = "Non-Concessional (4.9% Art. 49(b))";
  let isConcessionalRelease = false;

  if (qualifiesArt49aFlat200 && propertyType !== "agricultural") {
    releaseStampDuty = 200;
    releaseBasicDuty = 200;
    releaseSurcharge = 0;
    releaseArticleLabel = "Article 49(a) Ancestral Family Release (₹200 Flat)";
    releaseRuleTag = "Concessional Flat ₹200 (Art. 49(a))";
    isConcessionalRelease = true;
  } else if (isSec9CollateralOrLinealInherited) {
    // March 2026 Gujarat Section 9(a) Notification: ₹300 flat token duty for inherited agricultural land Hakk Kami / collateral heirs
    releaseStampDuty = 300;
    releaseBasicDuty = 300;
    releaseSurcharge = 0;
    releaseArticleLabel =
      relation === "collateral_heir"
        ? "Section 9(a) Inherited Collateral Release (₹300 Flat)"
        : "Section 9(a) / Art. 49(a) Farm Land Hakk Kami (₹300 Flat)";
    releaseRuleTag = "Concessional Flat ₹300 (Sec. 9(a))";
    isConcessionalRelease = true;
  } else {
    // Article 49(b): Non-ancestral, with monetary consideration, selective exclusive transfer (Shalin Patel), or non-relative
    releaseBasicDuty = Math.round(releaseAssessmentBase * 0.035);
    releaseSurcharge = Math.round(releaseAssessmentBase * 0.014);
    releaseStampDuty = releaseBasicDuty + releaseSurcharge;
    releaseArticleLabel = "Article 49(b) Release Deed (4.9% Conveyance Duty)";
    releaseRuleTag = "Full 4.9% Duty (Art. 49(b))";
    isConcessionalRelease = false;
  }

  // Registration fee on Release Deed:
  // Sole female transferee: ₹0 (Women exemption).
  // Male/Joint on Article 49(b): 1% uncapped of released share value.
  // Male/Joint on Concessional Article 49(a) / Sec 9(a): standard 1% Table of Fees (or nominal GARVI fixed fee per SRO entry — clearly noted!).
  const releaseRegFee =
    recipientGender === "female_sole" ? 0 : Math.round(releaseAssessmentBase * 0.01);
  const releaseTotal = releaseStampDuty + releaseRegFee;

  // 3. Registered Will (Vasiyatnama) Comparison
  const willStampDuty = 0;
  const willRegFee = 100; // Optional Gujarat SRO Book III filing fee
  const willTotal = willStampDuty + willRegFee;

  // Active Primary Display Values based on selected mode
  const activeStampDuty = deedMode === "release" ? releaseStampDuty : giftStampDuty;
  const activeBasicDuty = deedMode === "release" ? releaseBasicDuty : giftBasicDuty;
  const activeSurcharge = deedMode === "release" ? releaseSurcharge : giftSurcharge;
  const activeRegFee = deedMode === "release" ? releaseRegFee : giftRegFee;
  const activeTotal = deedMode === "release" ? releaseTotal : giftTotal;
  const activeValuationBase = deedMode === "release" ? releaseAssessmentBase : safeJantri;
  const effectiveRatePercent = ((activeTotal / Math.max(1, activeValuationBase)) * 100).toFixed(2);

  // Income Tax Section 56(2)(x) check
  const isIncomeTaxRelative = [
    "spouse",
    "child",
    "parent",
    "sibling",
    "grandchild_2025",
  ].includes(relation);
  const incomeTaxStatus = isIncomeTaxRelative
    ? "₹0 Tax (Exempt Relative)"
    : activeValuationBase > 50000
    ? "Taxable on Full Jantri Value"
    : "₹0 Tax (Under ₹50,000 Limit)";

  // Savings Metrics
  const savingsWillVsGift = Math.max(0, giftTotal - willTotal);
  const savingsReleaseVsGift = Math.max(0, giftTotal - releaseTotal);
  const womenRegSavings = Math.round(activeValuationBase * 0.01);

  // Statutory Alert Flags
  const showKhedutBlockWarning = propertyType === "agricultural" && !isKhedut;
  const showShalinPatelWarning =
    deedMode !== "gift" &&
    (propertyOrigin === "self_acquired_joint" || propertyOrigin === "selective_single_coowner");

  // Dynamic Verdict Headline & Rationale
  let resultHeadline = "Gift Deed vs Release Deed vs Will Cost Breakdown";
  let resultBadge = "Gujarat Stamp Act, 1958";
  let legalRationale =
    "Under Article 28 read with Section 3A of the Gujarat Stamp Act, a Gift Deed attracts 4.9% stamp duty (3.5% basic + 1.4% surcharge). A qualifying ancestral Release Deed under Article 49(a) drops stamp duty to ₹200 flat (₹300 for farm land Hakk Kami under Section 9(a)), while a Registered Will costs ₹0 stamp duty and ₹100 SRO fee.";
  let recommendedAction =
    "If you want to pass self-acquired property after your lifetime without paying 4.9% to 5.9% upfront, register a Will on GARVI 2.0. If co-heirs are giving up shares in undivided ancestral property without money, use an Article 49(a) Release Deed.";

  if (deedMode === "gift") {
    resultHeadline =
      recipientGender === "female_sole"
        ? "Article 28 Gift Deed: 4.9% Duty + 0% Women Fee"
        : "Article 28 Gift Deed: 4.9% Duty + 1% Reg Fee";
    resultBadge = "Art. 28 + Sec. 3A (4.9%)";
    legalRationale =
      recipientGender === "female_sole"
        ? `Article 28 of Schedule I charges the same duty as an Article 20(a) sale deed: 3.5% basic (${formatINR(giftBasicDuty)}) plus 40% Section 3A surcharge (${formatINR(giftSurcharge)}) = ${formatINR(giftStampDuty)}. Because the donee is a sole woman, Gujarat waives the 1% registration fee, saving ${formatINR(womenRegSavings)}.`
        : `Article 28 of Schedule I charges 3.5% basic duty (${formatINR(giftBasicDuty)}) plus 40% Section 3A surcharge (${formatINR(giftSurcharge)}) = ${formatINR(giftStampDuty)}. Because a male donee or co-owner is named, the uncapped 1% registration fee (${formatINR(giftRegFee)}) applies in full.`;
    recommendedAction = `Executing this Gift Deed costs ${formatINR(giftTotal)} upfront. A Registered Will in Gujarat costs only ₹100 (₹0 stamp duty) and saves ${formatINR(savingsWillVsGift)} with zero probate needed.`;
  } else if (deedMode === "release") {
    resultHeadline = releaseArticleLabel;
    resultBadge = releaseRuleTag;
    if (isConcessionalRelease) {
      legalRationale =
        relation === "grandchild_2025"
          ? "Under the Gujarat Stamp (Amendment) Act, 2025 (effective April 2025), Article 49(a) explicitly includes the son and daughter of a pre-deceased daughter alongside children of a pre-deceased son. Because the property is undivided ancestral property released without money, stamp duty is capped at a flat ₹200 (₹300 for inherited farm land under Section 9(a))."
          : `Because this release covers undivided ancestral property without monetary payout to an eligible family member, Gujarat charges a flat ${formatINR(releaseStampDuty)} stamp duty instead of 4.9% conveyance duty. ${recipientGender === "female_sole" ? "Registration fee is ₹0 for a sole female beneficiary." : "Verify whether your local GARVI SRO applies a nominal fixed entry fee or the 1% Table of Fees on the released share."}`;
      recommendedAction =
        "Attach clear 7/12 extracts, Pedhinama (family pedigree), and prior Varsai inheritance mutation entries to prove ancestral character and avoid Section 33 impounding.";
    } else {
      legalRationale = hasConsideration
        ? `Any monetary payout (${formatINR(considerationAmount || 0)}) disqualifies the flat ₹200 concession under Article 49(a). Stamp duty is charged at 4.9% under Article 49(b) on ${formatINR(releaseAssessmentBase)} (higher of released share Jantri value or cash paid).`
        : propertyOrigin !== "ancestral_undivided"
        ? "Per the Gujarat High Court Division Bench ruling in State of Gujarat v. Shalin Mukeshbhai Patel (LPA 689 & 864 of 2023, Oct 30, 2024), a release deed for self-acquired jointly bought property or a selective release to one co-owner acts as a conveyance. Full 4.9% duty under Article 49(b) applies on the released share."
        : "Transfers to non-relatives outside Article 49(a) and Section 9(a) attract 4.9% conveyance stamp duty under Article 49(b) plus applicable registration fees.";
      recommendedAction =
        "Before paying 4.9% on a non-ancestral release, check if a Partition Deed or Registered Will serves your family plan at a much lower tax and duty cost.";
    }
  }

  const copyClauseToClipboard = () => {
    const clauseText = `GUJARAT RELEASE DEED (ARTICLE 49(a) ANCESTRAL PEDIGREE RECITAL) & SENIOR CITIZEN GIFT SAFEGUARD
1. Ancestral Release Recital (Article 49(a), Gujarat Stamp Act, 1958):
"WHEREAS the Schedule Property devolved upon the Releasor and Releasee jointly by inheritance as undivided ancestral property from Late [Name of Ancestor] as recorded in Village Form 6 / Mutation Entry No. [Number] and Pedhinama dated [Date].
AND WHEREAS the Releasor out of natural love and affection, and strictly WITHOUT ANY MONETARY CONSIDERATION, hereby relinquishes and releases their entire undivided [Share %] share in favour of the Releasee, being the [Brother/Sister/Son/Daughter/Mother/Father/Spouse/Child of Pre-deceased Daughter] of the Releasor under Article 49(a) of Schedule I of the Gujarat Stamp Act, 1958."

2. Senior Citizen Revocation Clause for Gift Deed (Section 23, Senior Citizens Act, 2007):
"This Gift Deed is executed subject to the express condition under Section 23 of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007 that the Donee shall provide basic amenities, residence, medical care, and physical needs to the Donor during the Donor's lifetime. Upon refusal or failure to maintain the Donor, the Donor may apply to the Maintenance Tribunal to declare this Gift Deed void."`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `GUJARAT GIFT DEED & RELEASE DEED REGISTRATION CHECKLIST (GARVI 2.0 / SRO)
1. Original Title Deed / Registered Sale Deed or Index-II Copy from Gujarat SRO.
2. Latest 7/12 (Satbara), 8A Khata, and Village Form 6 (Hak Patrak) from AnyRoR (for land) OR City Survey Property Card / Society Share Certificate (for flats).
3. Official Government Jantri Valuation Sheet downloaded from GARVI 2.0 (garvi.gujarat.gov.in).
4. e-Stamp Certificate / Cyber Treasury Payment Receipt (4.9% Art. 28 Gift or ₹200 Art. 49(a) / ₹300 Sec. 9 Release).
5. Pedhinama (Talati Family Tree) & Death Certificate of Deceased Ancestor (mandatory for Article 49(a) Release Deeds).
6. Verified Agriculturist (Khedut) Proof & Form 7/12 (mandatory under Sec. 63 Gujarat Tenancy Act if transferring farm land).
7. Aadhaar Card, PAN Card, and 2 Passport Photos each of Donor/Releasor, Donee/Releasee, and 2 Adult Witnesses.
8. GARVI 2.0 Pre-Registration Token & SRO Biometric Appointment Slip (present within 4 months of execution under Sec. 23 Registration Act).`;
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
            <span>GUJARAT STAMP ACT, 1958 • ART. 28, ART. 49 &amp; 2025 AMENDMENT</span>
          </div>

          {/* Strict H1 Tag (49 chars, distinct from title, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Gujarat Gift &amp; Release Deed Stamp Duty Calculator
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Calculate exact Gujarat stamp duty and GARVI 2.0 fees on Gift Deeds (4.9% Art. 28) and
            ancestral Release Deeds (₹200 Art. 49(a) or ₹300 Sec. 9). Check the sole women 0% fee
            waiver and compare savings against a Registered Will.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Gujarat Stamp Duty</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Save 4.9% Duty with a Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">4.9% Art. 28</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                GIFT DEED (3.5% + 1.4% SEC 3A)
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹200 / ₹300</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ANCESTRAL RELEASE &amp; HAKK KAMI
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">0% Reg Fee</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SOLE FEMALE DONEE WAIVER
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹0 Duty Will</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                NO PROBATE NEEDED IN GUJARAT
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
              <nav aria-label="Table of contents" className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 text-xs">
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
                Built on the Gujarat Stamp Act, 1958 (Art. 28, Art. 49, Sec. 3A, Sec. 9 &amp; 2025
                Amendment), Registration Act, 1908, and Gujarat High Court rulings.
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
                <span>QUICK ANSWER: GUJARAT GIFT DEED &amp; RELEASE DEED RATES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Gift Deed (Article 28 + Section 3A):</strong> Gujarat charges{" "}
                    <strong>4.9% stamp duty</strong> (3.5% basic + 1.4% surcharge) on the higher
                    of declared value or Jantri value. Unlike Maharashtra or UP, Schedule I Article
                    28 has no flat ₹200 family Gift Deed slab.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Sole Women 0% Registration Fee:</strong> Women pay{" "}
                    <strong>₹0 registration fee</strong> when the home is in a sole female name (or
                    all-female names). Male or joint male-female deeds pay{" "}
                    <strong>1% uncapped</strong>. Women still pay the 4.9% stamp duty.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Ancestral Release Deed (Article 49(a) &amp; Section 9(a)):</strong>{" "}
                    Releasing an undivided ancestral share without money to close family costs{" "}
                    <strong>₹200 flat stamp duty</strong> (widened in April 2025 to add children of
                    a pre-deceased daughter). Inherited farm land <em>Hakk Kami</em> costs{" "}
                    <strong>₹300 flat</strong> under March 2026 Section 9(a) relief.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Registered Will Savings:</strong> A Will (<em>Vasiyatnama</em>) in
                    Gujarat carries <strong>₹0 stamp duty</strong>, optional ₹100 SRO fee, and zero
                    mandatory probate. On a ₹1 Crore flat, a Will saves ₹4.90 Lakh to ₹5.90 Lakh.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (STRICTLY THE SINGLE H2 ON THIS PAGE, <= 70 chars) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>GUJARAT STAMP LAW OVERVIEW</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Gujarat Stamp Act Rules: Gift vs Release Deed
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Families in Ahmedabad, Surat, Vadodara, and Rajkot often mix up Gift Deeds and
                  Release Deeds. In Gujarat, picking the wrong deed can cost you lakhs of extra
                  rupees at the Sub-Registrar Office (SRO).
                </p>
                <p>
                  A <strong>Gift Deed (Bakshish Patra)</strong> transfers your sole or self-acquired
                  home, shop, or plot during your life for zero money. It is governed by Section 122
                  of the Transfer of Property Act, 1882, and{" "}
                  <strong>Article 28 of the Gujarat Stamp Act, 1958</strong>.
                </p>
                <p>
                  A <strong>Release Deed (Hakk Kami or Hakk Chhor Patrak)</strong> lets a co-heir
                  give up their existing undivided share in joint ancestral property to another
                  co-owner. Under <strong>Article 49(a)</strong>, an ancestral family release
                  without cash pays a flat ₹200 stamp duty.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR TOOL */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE GARVI DUTY ESTIMATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Gujarat Stamp Duty &amp; Fee Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Enter your property&rsquo;s Jantri value, deed type, family relation, and donee
                gender below. Get an instant duty split under Article 28, Article 49, Section 3A,
                and a side-by-side Will cost check.
              </p>

              {/* Calculator Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Input 1: Deed Mode */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <ScrollText className="w-4 h-4 text-[#C65378]" />
                    <span>Step 1: Choose Deed Type or Compare All Options</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "compare" as DeedMode,
                        label: "Compare Gift vs Release vs Will",
                        desc: "See all 3 Gujarat options side by side on the same property",
                      },
                      {
                        id: "gift" as DeedMode,
                        label: "Gift Deed (Art. 28)",
                        desc: "Lifetime transfer of sole or separate home, flat, or plot",
                      },
                      {
                        id: "release" as DeedMode,
                        label: "Release Deed / Hakk Kami (Art. 49)",
                        desc: "Co-heir giving up an undivided share in joint family property",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setDeedMode(opt.id)}
                        className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          deedMode === opt.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="font-extrabold text-xs text-slate-900">{opt.label}</div>
                        <div className="text-[11px] text-slate-600 mt-1 leading-snug">
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input 2: Property Jantri / Market Value */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label
                      htmlFor="gujarat-jantri-input"
                      className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2"
                    >
                      <IndianRupee className="w-4 h-4 text-[#C65378]" />
                      <span>Step 2: Total Property Market or Jantri Value (₹)</span>
                    </label>
                    <span className="text-sm font-black text-[#C65378]">
                      {formatINR(safeJantri)} ({formatLakhsCrores(safeJantri)})
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <input
                      id="gujarat-jantri-input"
                      type="number"
                      min={100000}
                      max={500000000}
                      step={100000}
                      value={jantriValue}
                      onChange={(e) => setJantriValue(Number(e.target.value))}
                      className="w-full sm:w-56 px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#C65378] focus:ring-2 focus:ring-[#C65378]/15"
                    />
                    <input
                      aria-label="Property Jantri value slider"
                      type="range"
                      min={500000}
                      max={100000000}
                      step={500000}
                      value={Math.min(100000000, Math.max(500000, safeJantri))}
                      onChange={(e) => setJantriValue(Number(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "₹25 Lakh", val: 2500000 },
                      { label: "₹50 Lakh", val: 5000000 },
                      { label: "₹1 Crore", val: 10000000 },
                      { label: "₹2.5 Crore", val: 25000000 },
                      { label: "₹5 Crore", val: 50000000 },
                    ].map((preset) => (
                      <button
                        key={preset.val}
                        type="button"
                        onClick={() => setJantriValue(preset.val)}
                        className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                          safeJantri === preset.val
                            ? "bg-[#172228] text-white border-[#172228]"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:border-[#C65378]"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input 3: Property Type & Khedut Check */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#C65378]" />
                    <span>Step 3: Property Type in Gujarat</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "residential" as PropertyType,
                        label: "Residential Flat / House",
                        desc: "Urban flat, bungalow, or NA plot in AMC, SMC, VMC, or RMC",
                      },
                      {
                        id: "commercial" as PropertyType,
                        label: "Shop / Office / GIDC Plot",
                        desc: "Commercial unit, warehouse, or non-agricultural shop",
                      },
                      {
                        id: "agricultural" as PropertyType,
                        label: "Agricultural Land (7/12)",
                        desc: "Farm land governed by Section 63 Gujarat Tenancy Act",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPropertyType(opt.id)}
                        className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
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

                  {/* Conditional Khedut Check for Agricultural Land */}
                  {propertyType === "agricultural" && (
                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2.5">
                      <div className="text-xs font-extrabold text-amber-950 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>
                          Section 63 Gujarat Tenancy Check: Is the Recipient a Verified Gujarat
                          Agriculturist (Khedut)?
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setIsKhedut(true)}
                          className={`text-left p-2.5 rounded-xl border text-xs font-bold cursor-pointer ${
                            isKhedut
                              ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                              : "border-slate-200 bg-white text-slate-700"
                          }`}
                        >
                          Yes, Verified Gujarat Khedut (Holds 7/12 Farm Record)
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsKhedut(false)}
                          className={`text-left p-2.5 rounded-xl border text-xs font-bold cursor-pointer ${
                            !isKhedut
                              ? "border-rose-600 bg-rose-50 text-rose-900"
                              : "border-slate-200 bg-white text-slate-700"
                          }`}
                        >
                          No, Non-Agriculturist (Bin-Khedut / NRI without Khedut Proof)
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input 4: Release Deed Origin, Share % & Consideration (shown in Release or Compare mode) */}
                {deedMode !== "gift" && (
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#C65378]" />
                        <span>Step 4: Property Origin &amp; Release Structure (Article 49 Test)</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          {
                            id: "ancestral_undivided" as PropertyOrigin,
                            label: "Undivided Ancestral Property",
                            desc: "Inherited from common ancestor via Varsai / Pedhinama (Art. 49(a))",
                          },
                          {
                            id: "self_acquired_joint" as PropertyOrigin,
                            label: "Self-Acquired Joint Purchase",
                            desc: "Jointly bought via Sale Deed (attracts 4.9% Art. 49(b))",
                          },
                          {
                            id: "selective_single_coowner" as PropertyOrigin,
                            label: "Selective Release to 1 Co-Owner",
                            desc: "Exclusive shift in non-ancestral title (Shalin Patel 2024 rule)",
                          },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setPropertyOrigin(opt.id)}
                            className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                              propertyOrigin === opt.id
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Released Share % */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                          Share Being Released ({sharePercent}% = {formatINR(releasedShareValue)})
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {[25, 33.33, 50, 100].map((pct) => (
                            <button
                              key={pct}
                              type="button"
                              onClick={() => setSharePercent(pct)}
                              className={`py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                                sharePercent === pct
                                  ? "border-[#C65378] bg-rose-50 text-[#C65378]"
                                  : "border-slate-200 text-slate-700 hover:border-slate-300"
                              }`}
                            >
                              {pct === 33.33 ? "1/3rd" : `${pct}%`}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Consideration Toggle */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                          Is Any Money Paid for This Release?
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setHasConsideration(false);
                              setConsiderationAmount(0);
                            }}
                            className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                              !hasConsideration
                                ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                                : "border-slate-200 text-slate-700"
                            }`}
                          >
                            No Money (₹0 Free)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setHasConsideration(true);
                              if (!considerationAmount) setConsiderationAmount(releasedShareValue);
                            }}
                            className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                              hasConsideration
                                ? "border-[#C65378] bg-rose-50 text-[#C65378]"
                                : "border-slate-200 text-slate-700"
                            }`}
                          >
                            Yes, Cash Payout
                          </button>
                        </div>
                        {hasConsideration && (
                          <input
                            aria-label="Monetary payout amount in rupees"
                            type="number"
                            min={0}
                            step={50000}
                            value={considerationAmount}
                            onChange={(e) => setConsiderationAmount(Number(e.target.value))}
                            placeholder="Enter cash payout amount (₹)"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Input 5: Relationship */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C65378]" />
                    <span>
                      Step {deedMode === "gift" ? "4" : "5"}: Recipient (Donee / Releasee)
                      Relationship
                    </span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                    {[
                      { id: "spouse" as RelationType, label: "Spouse (Wife / Husband)" },
                      { id: "child" as RelationType, label: "Son or Daughter" },
                      { id: "parent" as RelationType, label: "Father or Mother" },
                      { id: "sibling" as RelationType, label: "Brother or Sister" },
                      {
                        id: "grandchild_2025" as RelationType,
                        label: "Child of Pre-Deceased Son/Daughter (2025)",
                      },
                      {
                        id: "collateral_heir" as RelationType,
                        label: "Collateral Heir (Sec. 9 Relief)",
                      },
                      { id: "non_relative" as RelationType, label: "Non-Relative / Friend" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setRelation(opt.id)}
                        className={`text-left p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          relation === opt.id
                            ? "border-[#C65378] bg-rose-50/50 text-slate-900"
                            : "border-slate-200 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input 6: Recipient Gender / Ownership */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#C65378]" />
                    <span>
                      Step {deedMode === "gift" ? "5" : "6"}: Recipient Gender (Controls 0% vs 1%
                      GARVI Registration Fee)
                    </span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "female_sole" as RecipientGender,
                        label: "Sole Female / All-Female",
                        desc: "0% Registration Fee (100% Gujarat women waiver)",
                      },
                      {
                        id: "male" as RecipientGender,
                        label: "Male Donee / Releasee",
                        desc: "1% Registration Fee (Uncapped in Gujarat)",
                      },
                      {
                        id: "joint_mixed" as RecipientGender,
                        label: "Joint (Male + Female)",
                        desc: "1% Registration Fee (Women waiver lost if male joins)",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setRecipientGender(opt.id)}
                        className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                          recipientGender === opt.id
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
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset Calculator to Default</span>
                  </button>
                </div>

                {/* HIGH-PRIORITY AGRICULTURAL KHEDUT WARNING */}
                {showKhedutBlockWarning && (
                  <div className="rounded-2xl bg-rose-50 border-2 border-rose-500 p-4 sm:p-5 text-xs sm:text-sm text-rose-950 space-y-2">
                    <div className="font-black flex items-center gap-2 text-rose-800">
                      <ShieldAlert className="w-5 h-5 shrink-0" />
                      <span>
                        STATUTORY BLOCK: Section 63 Gujarat Tenancy Act Bars Non-Agriculturist Farm
                        Transfer
                      </span>
                    </div>
                    <p className="leading-relaxed">
                      In <strong>Vinodchandra Sakarlal Kapadia v. State of Gujarat</strong> (2020)
                      18 SCC 144, the Supreme Court held that farm land in Gujarat cannot pass to a
                      non-agriculturist by Gift Deed or Will without prior Collector consent.
                      Executing this deed without Khedut status risks state forfeiture under Section
                      84C.
                    </p>
                  </div>
                )}

                {/* SHALIN PATEL 2024 HIGH COURT WARNING */}
                {showShalinPatelWarning && (
                  <div className="rounded-2xl bg-amber-50 border border-amber-300 p-4 text-xs text-amber-950 space-y-1.5">
                    <div className="font-extrabold flex items-center gap-2 text-amber-900">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>
                        Gujarat High Court Alert: State of Gujarat v. Shalin Mukeshbhai Patel (Oct
                        30, 2024)
                      </span>
                    </div>
                    <p className="leading-relaxed">
                      A Division Bench of the Gujarat High Court ruled that a Release Deed for
                      self-acquired property or a selective release to only one co-owner cannot use
                      the flat ₹200 Article 49(a) rate. Stamp authorities can impound the deed under
                      Section 33 and levy full 4.9% conveyance duty on the released share.
                    </p>
                  </div>
                )}

                {/* =========================================================================
                    DYNAMIC RESULTS CARD (Brand Navy Gradient matching reference page)
                    ========================================================================= */}
                <div className="rounded-3xl border-2 border-[#172228] bg-gradient-to-br from-slate-900 via-[#172228] to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/15">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                        GUJARAT STAMP ACT STATUTORY COMPUTATION
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-1">
                        {resultHeadline}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white shrink-0 self-start sm:self-auto">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>{resultBadge}</span>
                    </div>
                  </div>

                  {/* SIDE-BY-SIDE 3-CARD COMPARISON MODE OR DETAILED SINGLE-DEED BREAKDOWN */}
                  {deedMode === "compare" ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Card A: Gift Deed */}
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/15 space-y-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-rose-300">
                          OPTION 1: GIFT DEED (ART. 28)
                        </div>
                        <div className="text-2xl font-black text-white">{formatINR(giftTotal)}</div>
                        <div className="text-[11px] text-slate-300 space-y-1 pt-1 border-t border-white/10">
                          <div className="flex justify-between">
                            <span>Basic Duty (3.5%):</span>
                            <span className="font-bold">{formatINR(giftBasicDuty)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sec. 3A Surcharge (1.4%):</span>
                            <span className="font-bold">{formatINR(giftSurcharge)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>
                              GARVI Reg Fee ({recipientGender === "female_sole" ? "0%" : "1%"}):
                            </span>
                            <span className="font-bold text-emerald-300">
                              {formatINR(giftRegFee)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card B: Release Deed */}
                      <div className="p-4 rounded-2xl bg-white/10 border border-emerald-400/40 space-y-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                          OPTION 2: RELEASE ({sharePercent}% SHARE)
                        </div>
                        <div className="text-2xl font-black text-emerald-400">
                          {formatINR(releaseTotal)}
                        </div>
                        <div className="text-[11px] text-slate-200 space-y-1 pt-1 border-t border-white/10">
                          <div className="flex justify-between">
                            <span>Stamp Duty:</span>
                            <span className="font-bold">{formatINR(releaseStampDuty)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>
                              Reg Fee ({recipientGender === "female_sole" ? "0% Waiver" : "Up to 1%"}):
                            </span>
                            <span className="font-bold">{formatINR(releaseRegFee)}</span>
                          </div>
                          <div className="text-[10px] text-emerald-200 pt-1">
                            {isConcessionalRelease
                              ? `Saves ${formatINR(savingsReleaseVsGift)} vs Gift Deed`
                              : "Full 4.9% applies (Art. 49(b))"}
                          </div>
                        </div>
                      </div>

                      {/* Card C: Registered Will */}
                      <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/60 space-y-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                          OPTION 3: REGISTERED WILL
                        </div>
                        <div className="text-2xl font-black text-emerald-300">
                          {formatINR(willTotal)}
                        </div>
                        <div className="text-[11px] text-slate-200 space-y-1 pt-1 border-t border-white/10">
                          <div className="flex justify-between">
                            <span>Stamp Duty:</span>
                            <span className="font-bold text-emerald-300">₹0 (Exempt)</span>
                          </div>
                          <div className="flex justify-between">
                            <span>GARVI Book III Fee:</span>
                            <span className="font-bold">₹100 (Optional)</span>
                          </div>
                          <div className="text-[10px] text-emerald-200 font-bold pt-1">
                            Saves {formatINR(savingsWillVsGift)} vs Gift Deed!
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          STAMP DUTY PAYABLE
                        </div>
                        <div className="text-xl sm:text-2xl font-black text-emerald-400">
                          {formatINR(activeStampDuty)}
                        </div>
                        <div className="text-[11px] text-slate-300">
                          {activeSurcharge > 0
                            ? `3.5% (${formatINR(activeBasicDuty)}) + 1.4% Sec. 3A (${formatINR(activeSurcharge)})`
                            : "Flat Concessional Gujarat Duty"}
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          GARVI REGISTRATION FEE
                        </div>
                        <div className="text-xl sm:text-2xl font-black text-white">
                          {formatINR(activeRegFee)}
                        </div>
                        <div className="text-[11px] text-slate-300">
                          {recipientGender === "female_sole"
                            ? `0% Women Waiver (Saved ${formatINR(womenRegSavings)})`
                            : deedMode === "release" && isConcessionalRelease
                            ? "1% Table of Fees (confirm SRO fixed slab)"
                            : "1% Uncapped Registration Fee"}
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          TOTAL GOVT OUTLAY
                        </div>
                        <div className="text-xl sm:text-2xl font-black text-rose-300">
                          {formatINR(activeTotal)}
                        </div>
                        <div className="text-[11px] text-slate-300">
                          Effective Rate: {effectiveRatePercent}% • Tax: {incomeTaxStatus}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Income Tax + Will Savings Highlight Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-2">
                      <span className="text-slate-300 font-semibold">
                        Income Tax (Sec. 56(2)(x)):
                      </span>
                      <span
                        className={`font-extrabold ${
                          isIncomeTaxRelative ? "text-emerald-300" : "text-rose-300"
                        }`}
                      >
                        {incomeTaxStatus}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-2">
                      <span className="text-slate-300 font-semibold">
                        Registered Will Savings vs Gift:
                      </span>
                      <span className="font-extrabold text-emerald-300">
                        Save {formatINR(savingsWillVsGift)}
                      </span>
                    </div>
                  </div>

                  {/* Detailed Legal Analysis */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#C65378]" />
                      <span>Statutory Rationale:</span>
                    </div>
                    <p>{legalRationale}</p>
                    <div className="pt-2 text-emerald-300 font-semibold border-t border-white/10">
                      <strong>Recommended Action:</strong> {recommendedAction}
                    </div>
                  </div>

                  {/* Tool Action Conversion */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-300 text-center sm:text-left">
                      Want to transfer Gujarat property without paying 4.9% duty today? Start a
                      clear, lawyer-reviewed Will.
                    </div>
                    <button
                      type="button"
                      onClick={handleStartDraft}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Draft Your Gujarat Will Online</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* VISUAL FEATURE BLUEPRINT */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>GUJARAT PROPERTY TRANSFER &amp; STAMP DUTY GUIDE</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  Gujarat Stamp Act, 1958
                </span>
              </div>
              <div className="relative w-full aspect-[1200/630] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/gujarat-gift-deed-release-deed-stamp-duty-calculator-og.jpg"
                  alt="Gujarati family reviewing Gift Deed and Release Deed stamp duty papers in Ahmedabad"
                  width={1200}
                  height={630}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                Planning an intra-family transfer in Gujarat: comparing Article 28 Gift Deeds
                (4.9%), Article 49(a) Release Deeds (₹200), and Registered Wills (₹0 stamp duty).
              </p>
            </div>

            {/* SECTION 3: ARTICLE 28 GIFT DEED */}
            <section id="article-28-gift-deed" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>SCHEDULE I ARTICLE 28 &amp; SECTION 3A</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Article 28 Gift Deed: 4.9% Rate &amp; Women Waiver
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Under <strong>Article 28 of Schedule I</strong> of the Gujarat Stamp Act, 1958, a
                  Gift Deed pays the exact same duty as a conveyance under{" "}
                  <strong>Article 20(a)</strong> on the property&rsquo;s market value. That base
                  rate is <strong>3.5%</strong>.
                </p>
                <p>
                  <strong>Section 3A(1)</strong> of the Act explicitly adds a{" "}
                  <strong>40% surcharge</strong> on Article 28 gifts (40% of 3.5% = 1.4%). So the
                  combined statutory stamp duty is <strong>4.9%</strong>. Even if a gift deed adds
                  a revocation clause, Article 28 taxes it on full Jantri value.
                </p>
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                  <div className="font-extrabold text-amber-950 text-sm flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Warning: Beware of Websites Claiming &ldquo;1% Family Gift Duty&rdquo;</span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                    Many generic blogs claim Gujarat charges 1% stamp duty on blood-relative Gift
                    Deeds. They confuse Gujarat with other states or mix up the 1% registration fee.
                    Schedule I Article 28 has no 1% family gift slab. Always check the live GARVI
                    2.0 calculation with your Sub-Registrar before buying e-stamp paper.
                  </p>
                </div>
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>How the Women Registration Fee Waiver Works in Gujarat</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under the Gujarat Registration Act notification (in force since June 2004), the
                    standard <strong>1% uncapped registration fee</strong> drops to{" "}
                    <strong>0%</strong> when the property is registered strictly in a sole woman&rsquo;s
                    name or all-female names. Adding a husband or son as co-owner cancels the 0%
                    waiver at once.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: ARTICLE 49(a) RELEASE DEED & 2025 AMENDMENT */}
            <section id="article-49-release-deed" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>GUJARAT STAMP (AMENDMENT) ACT, 2025</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Article 49(a) Release Deed: ₹200 &amp; 2025 Heirs
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A Release Deed (<em>Hakk Kami</em>) lets an heir renounce their undivided share in
                  ancestral property in favour of close family co-owners. Under{" "}
                  <strong>Article 49(a) of Schedule I</strong>, the stamp duty is a flat{" "}
                  <strong>₹200</strong> (raised from ₹100 by Gujarat Act 12 of 2019).
                </p>
                <p>
                  In April 2025, the <strong>Gujarat Stamp (Amendment) Act, 2025</strong> fixed a
                  major gap in Article 49(a). Earlier, grandchildren through a pre-deceased daughter
                  were left out and often got hit with 4.9% conveyance duty notices. The 2025 Act
                  added them directly into Article 49(a).
                </p>
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C65378]" />
                    <span>Complete List of Eligible Relations Under Article 49(a) (Post-2025)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {[
                      "Brother or Sister (children of renouncer's parents)",
                      "Son or Daughter",
                      "Father or Mother",
                      "Spouse of the renouncer (Husband or Wife)",
                      "Son or Daughter of a pre-deceased son",
                      "Son or Daughter of a pre-deceased daughter (Added April 2025)",
                      "Legal heirs of the above specified relations",
                      "Strictly WITHOUT monetary consideration on ancestral property",
                    ].map((rel, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{rel}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: MARCH 2026 ₹300 RELIEF & SHALIN PATEL RULING */}
            <section id="section-9-and-case-law" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>SECTION 9 RELIEF &amp; HIGH COURT PRECEDENT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. March 2026 ₹300 Relief &amp; Shalin Patel Ruling
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Two major Gujarat developments now control every family Release Deed. One expands
                  relief for inherited farm land. The other blocks misuse on self-acquired urban
                  property.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                    <div className="text-[11px] font-black uppercase tracking-wider text-emerald-800">
                      MARCH 2026 SECTION 9(a) RELIEF
                    </div>
                    <div className="font-extrabold text-slate-900 text-sm">
                      Flat ₹300 Token Duty for Inherited Land Hakk Kami &amp; Partition
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Using Section 9(a) of the Gujarat Stamp Act, the Gujarat Government set a flat{" "}
                      <strong>₹300 stamp duty</strong> for relinquishment (<em>Hakk Kami</em>) and
                      partition deeds of jointly held inherited land. It covers both lineal heirs
                      and collateral heirs (when no direct heirs survive) across single or multi-step
                      family splits.
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-2">
                    <div className="text-[11px] font-black uppercase tracking-wider text-[#C65378]">
                      GUJARAT HIGH COURT (OCT 30, 2024)
                    </div>
                    <div className="font-extrabold text-slate-900 text-sm">
                      State of Gujarat v. Shalin Mukeshbhai Patel (LPA 689 &amp; 864/2023)
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      A sister released her share in Gandhinagar land bought by her father solely to
                      her brother on low stamp paper. The Division Bench led by the Chief Justice
                      reversed earlier relief and upheld full conveyance duty. A release giving
                      exclusive title to one co-owner in non-ancestral land is taxed at{" "}
                      <strong>4.9% under Article 49(b)</strong>.
                    </p>
                  </div>
                </div>
                <p>
                  Also note a key 2025 compliance rule: under amended{" "}
                  <strong>Sections 49 and 51</strong> of the Gujarat Stamp Act, any stamp duty
                  refund claim for unused or spoiled stamps must be filed strictly within{" "}
                  <strong>6 months</strong> from purchase.
                </p>
              </div>
            </section>

            {/* SECTION 6: AGRICULTURAL LAND SECTION 63 TRAP */}
            <section
              id="agricultural-land-section-63"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>GUJARAT TENANCY ACT GUARDRAIL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Agricultural Land Trap: Section 63 Khedut Rule
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Before you gift or release farm land (<em>Kheti Jamin</em>) in Gujarat, check the
                  recipient&rsquo;s farmer status first. Low stamp duty will not save an illegal
                  farm transfer.
                </p>
                <p>
                  Under <strong>Section 63 of the Gujarat Tenancy and Agricultural Lands Act, 1948</strong>,
                  agricultural land cannot be sold, gifted, or transferred to a non-agriculturist
                  (<em>Bin-Khedut</em>) without prior Collector permission. In{" "}
                  <strong>Vinodchandra Sakarlal Kapadia v. State of Gujarat</strong> (2020) 18 SCC
                  144, the Supreme Court held that even a Will cannot pass Gujarat farm land to a
                  non-farmer outside intestate succession.
                </p>
                <div className="rounded-2xl bg-white border border-slate-200 p-4 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span>
                    Read our full Supreme Court analysis on passing agricultural land to children
                    and NRIs in Gujarat.
                  </span>
                  <Link
                    href="/blogs/agricultural-land-inheritance-will-non-agriculturist-india"
                    className="inline-flex items-center gap-1.5 font-bold text-[#C65378] hover:underline shrink-0"
                  >
                    <span>Farm Land Inheritance Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 7: ELIGIBILITY & INCOME TAX RULES */}
            <section
              id="eligibility-and-tax-rules"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <UserCheck className="w-4 h-4" />
                <span>TAXATION &amp; SENIOR CITIZEN SAFEGUARDS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Eligible Relatives &amp; Tax Rules (Section 56)
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Stamp duty is a state charge under the Gujarat Stamp Act, while Income Tax is a
                  central tax under <strong>Section 56(2)(x) of the Income Tax Act, 1961</strong>.
                  Both laws treat family transfers differently.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Income Tax: Relatives
                    </div>
                    <div className="font-bold text-slate-800">100% Tax-Free (₹0 Tax)</div>
                    <p className="text-slate-600 leading-relaxed">
                      Gifts from a spouse, sibling, parent, child, or lineal ancestor or descendant
                      carry zero Income Tax, even on a ₹10 Crore bungalow.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Income Tax: Non-Relatives
                    </div>
                    <div className="font-bold text-slate-800">Taxable Above ₹50,000</div>
                    <p className="text-slate-600 leading-relaxed">
                      If a friend or cousin gifts a home with a Jantri value over ₹50,000, the whole
                      Jantri value is added to the receiver&rsquo;s taxable income.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Senior Citizens Act s. 23
                    </div>
                    <div className="font-bold text-slate-800">Add a Care Clause in Gift Deeds</div>
                    <p className="text-slate-600 leading-relaxed">
                      Senior parents gifting a flat to a child should insert an express maintenance
                      clause so the Tribunal can cancel the gift if the child neglects them.
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-600">
                  Note on Jantri Floor: Gujarat doubled its 2011 Jantri rates on{" "}
                  <strong>April 15, 2023</strong>. Under <strong>Section 32A</strong>, declaring a
                  value below active Jantri rates causes SRO impounding and deficit duty penalties.
                </p>
              </div>
            </section>

            {/* SECTION 8: STRUCTURED COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>COMPLETE GUJARAT FEE MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Comparison: Gift Deed vs Release Deed vs Will
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Compare exact Gujarat stamp duty, GARVI registration fees, ownership timing, and
                legal rules across all five transfer options.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 font-extrabold">Instrument / Statute</th>
                      <th className="p-3.5 font-extrabold text-rose-200">Stamp Duty</th>
                      <th className="p-3.5 font-extrabold text-emerald-300">
                        GARVI Reg Fee (Female / Male)
                      </th>
                      <th className="p-3.5 font-extrabold">When It Applies</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">
                        Gift Deed (Art. 28 + Sec. 3A)
                      </td>
                      <td className="p-3.5 font-bold text-[#C65378]">
                        4.9% (3.5% + 1.4%) on Jantri
                      </td>
                      <td className="p-3.5">0% Sole Female / 1% Uncapped Male</td>
                      <td className="p-3.5">
                        Immediate lifetime transfer of self-acquired home, flat, or plot without
                        cash.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">
                        Ancestral Release Deed (Art. 49(a))
                      </td>
                      <td className="p-3.5 font-bold text-emerald-800">₹200 Flat</td>
                      <td className="p-3.5">
                        0% Sole Female / Standard 1% or nominal SRO slab (verify on GARVI)
                      </td>
                      <td className="p-3.5">
                        Undivided ancestral property released free to close family (2025 expanded
                        heirs).
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">
                        Inherited Land Hakk Kami (Sec. 9(a) Mar 2026)
                      </td>
                      <td className="p-3.5 font-bold text-emerald-800">₹300 Flat</td>
                      <td className="p-3.5">
                        0% Sole Female / Nominal or 1% per GARVI category
                      </td>
                      <td className="p-3.5">
                        Joint inherited land relinquished or split among recorded lineal or
                        collateral heirs.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">
                        Self-Acquired / Paid Release (Art. 49(b))
                      </td>
                      <td className="p-3.5 font-bold text-[#C65378]">
                        4.9% on Released Share Value
                      </td>
                      <td className="p-3.5">0% Sole Female / 1% Uncapped Male</td>
                      <td className="p-3.5">
                        Jointly purchased homes, cash payouts, or selective release (Shalin Patel
                        rule).
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60 bg-emerald-50/30">
                      <td className="p-3.5 font-bold text-slate-900">
                        Registered Will (Vasiyatnama)
                      </td>
                      <td className="p-3.5 font-bold text-emerald-800">₹0 (Exempt)</td>
                      <td className="p-3.5 font-bold text-emerald-800">
                        ₹100 Flat (Optional, Book III)
                      </td>
                      <td className="p-3.5">
                        Owner keeps full lifetime control; heirs take after death with zero probate
                        in Gujarat.
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
                  <Scale className="w-3.5 h-3.5" />
                  <span>NOT SURE IF YOUR PROPERTY IS LEGALLY ANCESTRAL?</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Test Ancestral vs Self-Acquired Status Before Filing an Article 49(a) Release Deed
                </div>
                <p className="text-xs text-slate-600">
                  Check the 4-generation lineage rule and avoid a 4.9% Section 33 impounding notice
                  under the Shalin Patel ruling.
                </p>
              </div>
              <Link
                href="/tools/ancestral-vs-self-acquired-property-classifier"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shrink-0 transition-transform hover:-translate-y-0.5 shadow-sm"
              >
                <span>Open Property Classifier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>REGISTRATION &amp; MUTATION WORKFLOW</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step Guide: GARVI 2.0 &amp; AnyRoR Process
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Both Gift Deeds and Release Deeds for land or flats worth ₹100 or more must be
                  registered under <strong>Section 17 of the Registration Act, 1908</strong>.
                  Unregistered deeds pass zero title under Section 49. Follow these 6 steps in
                  Gujarat:
                </p>
                <div className="space-y-3 pt-1">
                  {[
                    {
                      title: "Verify Active Jantri Rate on GARVI 2.0",
                      desc: "Visit garvi.gujarat.gov.in and look up your district, taluka, village, ward, and survey or city survey number. Download the active Jantri sheet based on the April 15, 2023 baseline.",
                    },
                    {
                      title: "Draft the Deed with Exact Statutory Recitals",
                      desc: "Draft a clear Gift Deed (citing natural love, voluntary acceptance, and Section 23 Senior Citizens care clause) or an Article 49(a) Release Deed (attaching Pedhinama and Varsai mutation numbers proving ancestral title without cash).",
                    },
                    {
                      title: "Pay Stamp Duty & Fees via Cyber Treasury / e-Stamping",
                      desc: "Enter property and party data on GARVI 2.0 to get your pre-registration token. Pay 4.9% stamp duty (Gift) or ₹200 / ₹300 (ancestral Release) plus applicable registration fee (₹0 for sole female transferee) online.",
                    },
                    {
                      title: "Book an SRO Slot Within 4 Months of Signing",
                      desc: "Book a biometric slot at the local Sub-Registrar Office via GARVI 2.0. Under Section 23 of the Registration Act, the signed deed must be presented for registration within 4 months of execution.",
                    },
                    {
                      title: "Complete Biometric Verification & Collect Index-II",
                      desc: "The donor or releasor, donee or releasee, and two adult witnesses appear before the Sub-Registrar with original Aadhaar, PAN, and prior deeds. Collect your registered deed and official Index-II copy.",
                    },
                    {
                      title: "Update 7/12 (AnyRoR / iORA) or Municipal Records",
                      desc: "For land, file an online Pherfar mutation entry via iORA (iora.gujarat.gov.in) to update 7/12, 8A, and Village Form 6 on AnyRoR (Section 135C & 135D, Gujarat Land Revenue Code). For city flats, submit Index-II to the housing society and AMC, SMC, VMC, or RMC tax desk.",
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

            {/* SECTION 10: WORKED EXAMPLES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>REAL GUJARAT COST SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Worked Examples: Ahmedabad, Surat &amp; Vadodara
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
                {/* Case 1: Ahmedabad */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Ahmedabad SG Highway</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 1
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Father Gifts ₹1.20 Cr Flat to Daughter vs Son vs Will
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> A retired father owns a self-acquired flat in Ahmedabad
                    with a ₹1.20 Cr Jantri value. Under Article 28, stamp duty is 4.9% = ₹5,88,000.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Cost Result:</strong> Gift to sole daughter = ₹5,88,000 (0% reg fee).
                    Gift to son = ₹7,08,000 (adds 1% fee of ₹1,20,000). A Registered Will costs just
                    ₹100 and saves over ₹5.87 Lakh.
                  </p>
                </div>

                {/* Case 2: Surat */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Surat Ancestral House</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 2
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Pre-Deceased Daughter&rsquo;s Son Releases Share (2025 Rule)
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> After a grandfather&rsquo;s death in Surat, his late
                    daughter&rsquo;s son releases his 1/3rd undivided ancestral share (₹40 Lakh) to
                    his maternal uncle without taking money.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Cost Result:</strong> Thanks to the April 2025 Amendment to Article
                    49(a), he qualifies for <strong>₹200 flat stamp duty</strong> instead of paying
                    ₹1,96,000 at 4.9% conveyance duty.
                  </p>
                </div>

                {/* Case 3: Vadodara / Anand */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Vadodara Farm Land</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Case 3
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Inherited 7/12 Hakk Kami Under March 2026 ₹300 Relief
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Facts:</strong> Three siblings hold inherited 7/12 farm land near
                    Vadodara via Varsai entry. Two sisters (verified Kheduts) release their shares
                    to their brother without cash.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Cost Result:</strong> Under March 2026 Section 9(a) relief, stamp duty
                    is a flat <strong>₹300</strong> per relinquishment deed, avoiding Jantri-based
                    4.9% tax.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: DOCUMENT CHECKLIST & COPYABLE CLAUSES */}
            <section
              id="document-checklist-clauses"
              className="scroll-target scroll-mt-28 space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>SRO DOCUMENTS &amp; LEGAL DRAFTING</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Required Documents &amp; Copyable Deed Clauses
              </h3>

              {/* Template Box 1: Copyable Recital Clause */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Article 49(a) Ancestral Release Recital &amp; Section 23 Senior Citizen Clause
                  </div>
                  <button
                    type="button"
                    onClick={copyClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer shrink-0"
                  >
                    {copiedClause ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Clauses</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`1. ARTICLE 49(a) ANCESTRAL RELEASE RECITAL (GUJARAT STAMP ACT, 1958):
"WHEREAS the Schedule Property devolved jointly by inheritance as undivided ancestral property from Late [Ancestor Name] per Mutation Entry No. [Number] and Pedhinama dated [Date].
AND WHEREAS the Releasor, out of natural love and affection and strictly WITHOUT ANY MONETARY CONSIDERATION, relinquishes their entire undivided [Share %] share in favour of the Releasee ([Eligible Relation under Art. 49(a)])."

2. SENIOR CITIZEN CARE CLAUSE FOR GIFT DEED (SECTION 23, SENIOR CITIZENS ACT, 2007):
"This Gift Deed is subject to the express condition under Section 23 of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007 that the Donee shall provide basic amenities, shelter, and care to the Donor. Upon refusal or neglect, the Maintenance Tribunal may declare this Gift Deed void."`}
                </pre>
              </div>

              {/* Template Box 2: Document Checklist */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Gujarat SRO Document Checklist (GARVI 2.0 Filing)
                  </div>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer shrink-0"
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
                  {[
                    "Original Title Deed / Prior Registered Sale Deed & Index-II",
                    "Latest 7/12, 8A & Village Form 6 (AnyRoR) or City Property Card",
                    "GARVI 2.0 Jantri Valuation Sheet & e-Stamp / Cyber Treasury Receipt",
                    "Talati Pedhinama & Death Certificate (for Art. 49(a) Release Deeds)",
                    "Verified Khedut (Agriculturist) Proof (if transferring 7/12 farm land)",
                    "Housing Society NOC & Share Certificate (for city flats)",
                    "Aadhaar, PAN & 2 Photos each of Donor/Releasor & Donee/Releasee",
                    "2 Adult Witnesses with Original Aadhaar, PAN & GARVI Token Slip",
                  ].map((doc, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Legal Desk: Gujarat Property &amp; Estate Counsel
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Gujarat Succession &amp; Conveyancing Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Checked Estate Counsel</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is powered by AMA Legal Solutions. Our property advocates draft
                  dispute-free Wills, Gift Deeds, and Article 49(a) Release Deeds across Ahmedabad,
                  Surat, Vadodara, and Rajkot, while guiding families through GARVI 2.0 and AnyRoR
                  mutation rules. General calculator figures are for planning and do not replace
                  case-specific legal advice.
                </p>

                {/* Service & Template Grid Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/gift-deed-drafting-registration"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between gap-1"
                  >
                    <span>Gift Deed Drafting</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                  </Link>
                  <Link
                    href="/services/relinquishment-deed"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between gap-1"
                  >
                    <span>Release Deed Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                  </Link>
                  <Link
                    href="/templates/will-format-gujarati-vasiyatnama"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between gap-1"
                  >
                    <span>Gujarati Will Format</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                  </Link>
                  <Link
                    href="/locations/gujarat"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between gap-1"
                  >
                    <span>Gujarat Will Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
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
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: Gujarat Stamp Duty
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
                        aria-expanded={isOpen}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:text-[#C65378] cursor-pointer"
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

            {/* SECTION 14: STATUTORY CITATIONS & INTERNAL LINKS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>OFFICIAL STATUTORY PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Official Gujarat Portals &amp; Legal Citations
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs text-slate-600">
                <p>
                  Verify live Jantri rates, land records, and central statutes directly on these
                  official government portals:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://garvi.gujarat.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>IGR Gujarat: GARVI 2.0 Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://anyror.gujarat.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>AnyRoR Gujarat: 7/12 &amp; 8A Records</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://iora.gujarat.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>iORA Gujarat: Online Revenue Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Registration &amp; TP Act</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Supreme Court of India</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.incometax.gov.in/iec/foportal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Income Tax Portal (Sec. 56(2)(x))</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related Gujarat Tools, Formats &amp; City Guides
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/gift-deed-vs-will-stamp-duty-calculator"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      All-India Gift vs Will Tool
                    </Link>
                    <Link
                      href="/tools/senior-citizen-gift-deed-revocation-assessment-tool"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Sec. 23 Gift Cancellation Checker
                    </Link>
                    <Link
                      href="/tools/maharashtra-gift-deed-release-deed-stamp-duty-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Maharashtra Stamp Duty Tool
                    </Link>
                    <Link
                      href="/templates/gift-deed-format-blood-relatives-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Blood-Relative Gift Deed Format
                    </Link>
                    <Link
                      href="/templates/release-deed-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Release Deed Sample Format
                    </Link>
                    <Link
                      href="/blogs/gujarat-pedhinama-varsai-entry-7-12-record-of-rights-after-death"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Gujarat Pedhinama &amp; Varsai Guide
                    </Link>
                    <Link
                      href="/locations/ahmedabad"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Ahmedabad Will Lawyers
                    </Link>
                    <Link
                      href="/locations/surat"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Surat Will Lawyers
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Plain-English Bottom Summary Cards matching reference page */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Check Before You Sign?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A Gift Deed in Gujarat costs 4.9% to 5.9% right away. Once you sign and register
                  it, you lose title and cannot take the home back easily. Check your exact cost
                  first so your family saves cash.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">When a Will Beats a Gift</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A Will on plain paper needs zero stamp duty in Gujarat. You keep full use of your
                  flat, shop, and land for life. You can also change your Will any time you wish.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Legal Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers check your title papers, 7/12 extracts, and Jantri value. We help you
                  pick the right deed and write clear words so your heirs face zero SRO delays.
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
                  <div className="font-extrabold text-slate-900 text-sm">
                    Advocate Anuj Anand Malik
                  </div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Advises families across India on Gift Deeds, ancestral Release Deeds, Gujarat HUF
                succession, and clear lawyer-vetted Wills.
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
                  <span>SKIP 4.9% GUJARAT STAMP DUTY</span>
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Pass Your Gujarat Home for ₹0 Stamp Duty via Will
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  Keep 100% control of your Ahmedabad, Surat, or Vadodara home for life and save
                  lakhs in upfront Gift Deed fees.
                </p>
                <button
                  type="button"
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Zero Probate Needed in Gujarat</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (White / Rose Border) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>GUJARAT DEED &amp; SRO DESK</span>
                </div>
                <div className="font-black text-slate-900 text-sm leading-snug">
                  Need a Lawyer-Drafted Gift or Release Deed in Gujarat?
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our advocates check ancestral title, verify Section 63 Khedut status, and draft
                  GARVI-ready deeds without Section 33 impounding risk.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Request Legal Review</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Gujarat Families Use This Tool
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>2025 &amp; 2026 Updated:</strong> Covers April 2025 Article 49(a) heir
                      rules and March 2026 ₹300 farm relief.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>High Court Tested:</strong> Flags the October 2024{" "}
                      <em>Shalin Patel</em> non-ancestral release trap.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Hidden Myths:</strong> Separates Gujarat&rsquo;s 4.9% Article 28
                      duty from the 0% sole female fee waiver.
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
          <span>Duty Calculator</span>
        </a>
        <button
          type="button"
          onClick={handleStartDraft}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Draft a Will</span>
        </button>
      </div>
    </div>
  );
}
