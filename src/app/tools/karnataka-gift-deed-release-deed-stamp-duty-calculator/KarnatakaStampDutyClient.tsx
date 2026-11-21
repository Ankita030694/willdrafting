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
  MapPin,
  XCircle,
  IndianRupee,
  ClipboardCheck,
} from "lucide-react";

type DeedType = "gift" | "release";
type JurisdictionType = "bbmp_corp" | "municipal" | "rural";
type KhataType = "bbmp_a_khata" | "bbmp_b_khata" | "non_bbmp";
type RelationshipId =
  | "daughter"
  | "son"
  | "spouse"
  | "parents"
  | "sibling"
  | "grandchild"
  | "daughter_in_law"
  | "widow_predeceased_son"
  | "son_in_law"
  | "parents_in_law"
  | "uncle_aunt_nephew"
  | "cousin_friend";

interface RelationshipOption {
  id: RelationshipId;
  label: string;
  shortDesc: string;
  giftFamily: boolean;
  releaseFamily: boolean;
  incomeTaxExempt: boolean;
  note: string;
}

const RELATIONSHIPS: RelationshipOption[] = [
  {
    id: "daughter",
    label: "Daughter",
    shortDesc: "Lineal child of owner",
    giftFamily: true,
    releaseFamily: true,
    incomeTaxExempt: true,
    note: "Eligible for fixed family slab under both Article 28(b) and Article 45(b). Fully tax-free under Section 56(2)(x).",
  },
  {
    id: "son",
    label: "Son",
    shortDesc: "Lineal child of owner",
    giftFamily: true,
    releaseFamily: true,
    incomeTaxExempt: true,
    note: "Eligible for fixed family slab under both Article 28(b) and Article 45(b). Fully tax-free under Section 56(2)(x).",
  },
  {
    id: "spouse",
    label: "Spouse (Wife / Husband)",
    shortDesc: "Legally wedded spouse",
    giftFamily: true,
    releaseFamily: true,
    incomeTaxExempt: true,
    note: "Eligible for fixed family slab. Tax-free at transfer, but rent earned later is clubbed in donor's income under Section 64(1)(iv).",
  },
  {
    id: "parents",
    label: "Father or Mother",
    shortDesc: "Biological or adoptive parent",
    giftFamily: true,
    releaseFamily: true,
    incomeTaxExempt: true,
    note: "Included in Article 28(b) via Karnataka Act 9 of 2009 and under Article 45(b). Fully tax-free under Income Tax law.",
  },
  {
    id: "sibling",
    label: "Brother or Sister",
    shortDesc: "Full or half sibling",
    giftFamily: true,
    releaseFamily: true,
    incomeTaxExempt: true,
    note: "Eligible under Article 28(b) Gift Deed and Article 45(b) co-heir Release Deed. Tax-free under Section 56(2)(x).",
  },
  {
    id: "grandchild",
    label: "Grandson / Granddaughter",
    shortDesc: "Direct lineal grandchild",
    giftFamily: true,
    releaseFamily: true,
    incomeTaxExempt: true,
    note: "Explicitly included under Article 28(b). For Article 45(b) Release Deed, applies where grandchild is a joint co-heir.",
  },
  {
    id: "daughter_in_law",
    label: "Daughter-in-Law (Son's Wife)",
    shortDesc: "Wife of living son",
    giftFamily: true,
    releaseFamily: false,
    incomeTaxExempt: true,
    note: "Included in Article 28(b) Gift Deed fixed slab! However, Article 45(b) lists only wife of a predeceased son, so check recitals before a Release Deed.",
  },
  {
    id: "widow_predeceased_son",
    label: "Wife of Predeceased Son",
    shortDesc: "Widowed daughter-in-law",
    giftFamily: true,
    releaseFamily: true,
    incomeTaxExempt: true,
    note: "Eligible under both Article 28(b) Gift Deed and Article 45(b) Release Deed. Tax-free under Section 56(2)(x).",
  },
  {
    id: "son_in_law",
    label: "Son-in-Law (Daughter's Husband)",
    shortDesc: "Excluded from KSA family slab",
    giftFamily: false,
    releaseFamily: false,
    incomeTaxExempt: true,
    note: "Major Karnataka trap! Tax-free under Income Tax Section 56(2)(x), yet excluded from Article 28(b) and 45(b). Triggers 5.6% stamp duty + 2% reg fee.",
  },
  {
    id: "parents_in_law",
    label: "Father-in-Law / Mother-in-Law",
    shortDesc: "Spouse's parents",
    giftFamily: false,
    releaseFamily: false,
    incomeTaxExempt: true,
    note: "Excluded from Karnataka Stamp Act family definition. Attracts full non-family conveyance duty on Kaveri 2.0 guidance value.",
  },
  {
    id: "uncle_aunt_nephew",
    label: "Uncle, Aunt, Nephew or Niece",
    shortDesc: "Extended blood relatives",
    giftFamily: false,
    releaseFamily: false,
    incomeTaxExempt: false,
    note: "Not covered under Article 28(b) or Article 45(b). Attracts 5% base stamp duty + cess + surcharge + 2% registration fee.",
  },
  {
    id: "cousin_friend",
    label: "Cousin, Friend or Partner",
    shortDesc: "Non-family third party",
    giftFamily: false,
    releaseFamily: false,
    incomeTaxExempt: false,
    note: "Outside both Karnataka family slabs and Section 56(2)(x) tax exemption. Triggers full stamp duty, 2% reg fee, and income tax for recipient.",
  },
];

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Karnataka Stamp Act: Gift vs Release" },
  { id: "interactive-calculator", label: "2. Kaveri 2.0 Fee Calculator" },
  { id: "family-member-checker", label: "3. Family Member Definition Checker" },
  { id: "family-slab-comparison", label: "4. BBMP vs Town vs Rural Slabs" },
  { id: "non-family-rates", label: "5. Non-Family 5.6% & 2% Reg Rules" },
  { id: "deed-comparison", label: "6. Gift vs Release vs Will Table" },
  { id: "bbmp-khata-checklist", label: "7. BBMP e-Khata & B-Khata Checklist" },
  { id: "kaveri-registration-steps", label: "8. Kaveri 2.0 Step-by-Step Guide" },
  { id: "court-rulings-tax", label: "9. Court Rulings & Tax Rules" },
  { id: "practical-examples", label: "10. Bengaluru Cost Examples" },
  { id: "deed-recitals-checklist", label: "11. Copyable Recitals & Checklist" },
  { id: "institutional-profile", label: "12. AMA Legal Solutions Desk" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Official Karnataka Portals" },
];

const BBMP_CHECKLIST_ITEMS = [
  {
    id: "ekhata",
    stage: "Pre-Registration",
    title: "Final BBMP e-Khata (A-Khata or B-Khata)",
    desc: "Download the verified digital e-Khata from bbmpeaasthi.karnataka.gov.in. Kaveri 2.0 blocks slot booking without an active e-Khata ID.",
  },
  {
    id: "mother_deed",
    stage: "Pre-Registration",
    title: "Prior Title Deed & Family Chain",
    desc: "Keep the original Sale Deed, Partition Deed, or Inheritance records proving how the donor or co-owners hold title.",
  },
  {
    id: "tax_receipt",
    stage: "Pre-Registration",
    title: "Current Year BBMP Property Tax Receipt",
    desc: "Clear all pending property tax dues for the running financial year. Zero arrears are needed for Kaveri 2.0 approval.",
  },
  {
    id: "ec_form15",
    stage: "Pre-Registration",
    title: "Latest Encumbrance Certificate (EC)",
    desc: "Pull a fresh online EC on Kaveri 2.0 showing no active bank mortgage, court stay, or prior sale.",
  },
  {
    id: "kyc_witness",
    stage: "Pre-Registration",
    title: "Aadhaar, PAN & 2 Adult Witnesses",
    desc: "Donor, donee (or releasor and releasee), and two adult witnesses need Aadhaar and PAN for SRO biometric e-KYC.",
  },
  {
    id: "relationship_proof",
    stage: "Pre-Registration",
    title: "Family Relationship Proof / Family Tree",
    desc: "Carry passport, birth certificate, marriage record, or Nadakacheri Family Tree (Vamshavruksha) to prove Article 28(b) or 45(b) status.",
  },
  {
    id: "auto_mutation",
    stage: "Post-Registration",
    title: "Verify Auto-Mutation on BBMP e-Aasthi",
    desc: "When Aadhaar e-KYC matches on Kaveri 2.0, BBMP runs auto-mutation and updates the new owner's e-Khata in about 7 working days.",
  },
  {
    id: "manual_khata_fee",
    stage: "Post-Registration",
    title: "Manual Khata Transfer Fee (If Auto-Mutation Stalls)",
    desc: "Apply on e-Aasthi or Sakala with the registered deed and tax receipt. BBMP charges 2% of stamp duty paid, with a Rs 500 minimum fee.",
  },
];

const FAQS = [
  {
    q: "What is the exact stamp duty for gifting a Bangalore site to my daughter on Kaveri 2.0?",
    a: "Under Article 28(b) of the Karnataka Stamp Act, 1957, gifting a BBMP or BMRDA site to your daughter attracts a fixed base stamp duty of Rs 5,000, not 5% of market value. Add 10% Section 3B cess (Rs 500) and 2% municipal surcharge (Rs 100) for Rs 5,600 total stamp duty. With a fixed Rs 1,000 family registration fee plus Rs 50 per page scanning fee, your Kaveri 2.0 challan comes to about Rs 7,100 for a 10-page deed.",
  },
  {
    q: "Who counts as a family member under Article 28(b) of the Karnataka Stamp Act?",
    a: "The statutory Explanation to Article 28(b) defines family strictly as father, mother, husband, wife, son, daughter, daughter-in-law, brother, sister, and grandchildren. Anyone outside this exact list pays full non-family conveyance duty on the Kaveri 2.0 guidance value.",
  },
  {
    q: "Does a gift deed to a son-in-law qualify for the Rs 5,000 family slab in Karnataka?",
    a: "No. Even though a son-in-law is tax-free under Section 56(2)(x) of the Income Tax Act, he is excluded from the Explanation to Article 28(b) of the Karnataka Stamp Act. Gifting directly to a son-in-law triggers 5% base stamp duty, 10% cess, 2% urban surcharge (5.6% total), plus 2% registration fee on guidance value. Parents instead gift to their daughter under Article 28(b).",
  },
  {
    q: "What is the stamp duty and registration fee for a family Release Deed in Bangalore?",
    a: "Under Article 45(b) of the Karnataka Stamp Act, a Release Deed among family co-owners in BBMP, BMRDA, or City Corporation limits carries a fixed Rs 5,000 base stamp duty, plus Rs 500 cess (10%) and Rs 100 surcharge (2%), totaling Rs 5,600. Town Municipal and Town Panchayat areas pay Rs 3,000 base (Rs 3,360 with cess and surcharge), and rural areas pay Rs 1,000 base (Rs 1,130 total), plus nominal family registration and page scanning fees.",
  },
  {
    q: "When should I use a Release Deed instead of a Gift Deed in Karnataka?",
    a: "Use a Gift Deed when one sole owner transfers full or part title to a family member who holds no prior share in the property. Use a Release Deed (Relinquishment Deed) only when two or more people already co-own or jointly inherit the property and one co-owner gives up their undivided share to another existing co-owner.",
  },
  {
    q: "What is the non-family gift or release deed stamp duty and registration fee in Karnataka?",
    a: "For non-family recipients under Article 28(a) or Article 45(a), Karnataka charges conveyance duty at 5% base stamp duty on the Kaveri 2.0 guidance value (of the property or released share), plus 10% cess and 2% urban surcharge (5.60% total) or 3% rural surcharge (5.65% total). Under Revenue Department Notification No. RD/46/MNMU/2025 effective August 31, 2025, standard ad valorem registration fee is 2% of market value.",
  },
  {
    q: "Is BBMP e-Khata required for a family Gift Deed or Release Deed on Kaveri 2.0?",
    a: "Yes. For properties inside BBMP limits, a verified digital e-Khata (A-Khata or B-Khata) from the BBMP e-Aasthi portal is needed before Kaveri 2.0 allows registration. After SRO registration with Aadhaar e-KYC, BBMP triggers automatic e-Khata name change in about 7 working days. If filed manually, the BBMP Khata transfer fee is 2% of the stamp duty paid, with a minimum fee of Rs 500.",
  },
  {
    q: "Can a senior citizen cancel a registered Gift Deed in Karnataka if the child stops caring?",
    a: "A registered Gift Deed is normally final under Section 126 of the Transfer of Property Act. However, under Section 23 of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007, a senior citizen can apply to the Assistant Commissioner Tribunal to cancel the gift if the deed had an express care and maintenance clause that the child breached.",
  },
];

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export default function KarnatakaStampDutyClient() {
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
  const [deedType, setDeedType] = useState<DeedType>("gift");
  const [jurisdiction, setJurisdiction] = useState<JurisdictionType>("bbmp_corp");
  const [relationshipId, setRelationshipId] = useState<RelationshipId>("daughter");
  const [guidanceValue, setGuidanceValue] = useState<number>(15000000); // Rs 1.5 Crore default
  const [sharePercent, setSharePercent] = useState<number>(50); // For Release Deed
  const [pageCount, setPageCount] = useState<number>(10);
  const [khataType, setKhataType] = useState<KhataType>("bbmp_a_khata");

  // Family Table Filter
  const [familyFilter, setFamilyFilter] = useState<"all" | "eligible" | "excluded">("all");

  // Interactive BBMP Checklist State
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    ekhata: true,
    mother_deed: true,
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

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const toggleChecklistItem = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReset = () => {
    setDeedType("gift");
    setJurisdiction("bbmp_corp");
    setRelationshipId("daughter");
    setGuidanceValue(15000000);
    setSharePercent(50);
    setPageCount(10);
    setKhataType("bbmp_a_khata");
  };

  // =========================================================================
  // KARNATAKA KAVERI 2.0 CALCULATION ENGINE
  // =========================================================================
  const selectedRelation =
    RELATIONSHIPS.find((r) => r.id === relationshipId) || RELATIONSHIPS[0];

  const isFamilyEligible =
    deedType === "gift" ? selectedRelation.giftFamily : selectedRelation.releaseFamily;

  const safeGuidanceValue = Math.max(0, Number.isFinite(guidanceValue) ? guidanceValue : 0);
  const safeSharePercent = Math.min(100, Math.max(1, sharePercent));
  const safePages = Math.min(60, Math.max(2, pageCount));

  // Taxable Base for Non-Family Calculation
  const taxableValue =
    deedType === "release"
      ? Math.round((safeGuidanceValue * safeSharePercent) / 100)
      : safeGuidanceValue;

  // Surcharge rate: 2% of base duty in urban/municipal limits, 3% in rural Gram Panchayat limits
  const surchargeRate = jurisdiction === "rural" ? 0.03 : 0.02;
  const cessRate = 0.1; // Section 3B Infrastructure Cess = 10% of base stamp duty

  // Fixed Family Base Duty under Article 28(b) & Article 45(b)
  const familyBaseDuty =
    jurisdiction === "bbmp_corp" ? 5000 : jurisdiction === "municipal" ? 3000 : 1000;
  const familyCess = Math.round(familyBaseDuty * cessRate);
  const familySurcharge = Math.round(familyBaseDuty * surchargeRate);
  const familyTotalStampDuty = familyBaseDuty + familyCess + familySurcharge;
  const familyRegFee = 1000; // Fixed nominal family registration fee
  const scanningFee = safePages * 50; // Rs 50 per page on Kaveri 2.0
  const familyGrandTotal = familyTotalStampDuty + familyRegFee + scanningFee;

  // Non-Family Conveyance Duty under Article 28(a) / Article 45(a) + Article 20(1)
  // Standard conveyance base rate = 5% + 10% Sec 3B cess (0.5%) + 2%/3% surcharge (0.10%/0.15%)
  // Registration Fee post-Aug 31, 2025 Notification RD/46/MNMU/2025 = 2%
  const nonFamilyBaseDuty = Math.round(taxableValue * 0.05);
  const nonFamilyCess = Math.round(nonFamilyBaseDuty * cessRate);
  const nonFamilySurcharge = Math.round(nonFamilyBaseDuty * surchargeRate);
  const nonFamilyTotalStampDuty = nonFamilyBaseDuty + nonFamilyCess + nonFamilySurcharge;
  const nonFamilyRegFee = Math.round(taxableValue * 0.02);
  const nonFamilyGrandTotal = nonFamilyTotalStampDuty + nonFamilyRegFee + scanningFee;

  // Active Calculated Output
  const baseStampDuty = isFamilyEligible ? familyBaseDuty : nonFamilyBaseDuty;
  const cessAmount = isFamilyEligible ? familyCess : nonFamilyCess;
  const surchargeAmount = isFamilyEligible ? familySurcharge : nonFamilySurcharge;
  const totalStampDuty = isFamilyEligible ? familyTotalStampDuty : nonFamilyTotalStampDuty;
  const registrationFee = isFamilyEligible ? familyRegFee : nonFamilyRegFee;
  const grandTotal = isFamilyEligible ? familyGrandTotal : nonFamilyGrandTotal;
  const savingsVsNonFamily = Math.max(0, nonFamilyGrandTotal - familyGrandTotal);

  // Post-Registration BBMP Khata Transfer Fee (2% of Stamp Duty paid, min Rs 500)
  const bbmpKhataTransferFee =
    khataType === "non_bbmp" ? 0 : Math.max(500, Math.round(totalStampDuty * 0.02));

  const appliedArticleLabel =
    deedType === "gift"
      ? isFamilyEligible
        ? "Article 28(b) - Family Gift Slab"
        : "Article 28(a) - Non-Family Gift (5%)"
      : isFamilyEligible
        ? "Article 45(b) - Family Release Slab"
        : "Article 45(a) - Non-Family Release (5%)";

  const jurisdictionLabel =
    jurisdiction === "bbmp_corp"
      ? "BBMP / BMRDA / City Corporation"
      : jurisdiction === "municipal"
        ? "Municipal Council / Town Panchayat"
        : "Rural / Gram Panchayat";

  const filteredRelationships = RELATIONSHIPS.filter((rel) => {
    if (familyFilter === "eligible") return rel.giftFamily || rel.releaseFamily;
    if (familyFilter === "excluded") return !rel.giftFamily && !rel.releaseFamily;
    return true;
  });

  const completedChecklistCount = Object.values(checkedItems).filter(Boolean).length;

  const copyClauseToClipboard = () => {
    const clauseText =
      deedType === "gift"
        ? `KARNATAKA FAMILY GIFT DEED RECITAL (ARTICLE 28(b) KARNATAKA STAMP ACT, 1957)
"WHEREAS the Donor is the absolute sole owner of the Schedule Property bearing BBMP e-Khata / PID No. [Insert e-Khata ID], acquired through Registered Sale Deed dated [Date].

AND WHEREAS the Donee is the [Daughter / Son / Spouse / Parent / Sibling / Daughter-in-Law / Grandchild] of the Donor, falling strictly within the definition of 'Family' under the Explanation to Article 28(b) of the Schedule to the Karnataka Stamp Act, 1957.

NOW THIS DEED WITNESSES that out of natural love and affection, and without any monetary consideration whatsoever, the Donor voluntarily gifts, conveys, and transfers all right, title, and interest in the Schedule Property to the Donee, who hereby accepts the gift during the Donor's lifetime under Section 122 and Section 123 of the Transfer of Property Act, 1882."`
        : `KARNATAKA FAMILY RELEASE DEED RECITAL (ARTICLE 45(b) KARNATAKA STAMP ACT, 1957)
"WHEREAS the Releasor and the Releasee are joint co-owners / legal co-heirs holding undivided shares in the Schedule Property bearing BBMP e-Khata / Survey No. [Insert ID].

AND WHEREAS the Releasor and the Releasee are members of the same 'Family' as defined in the Explanation to Article 45(b) of the Karnataka Stamp Act, 1957.

NOW THIS DEED WITNESSES that out of natural love and affection and to settle family title cleanly, the Releasor hereby releases, relinquishes, and gives up all undivided share, claim, and demand in the Schedule Property in favour of the Releasee, making the Releasee the absolute owner thereof."`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `KARNATAKA KAVERI 2.0 & BBMP E-KHATA DOCUMENT CHECKLIST
1. Final digital BBMP e-Khata (A-Khata or B-Khata) downloaded from bbmpeaasthi.karnataka.gov.in.
2. Original prior Sale Deed / Partition Deed / Inheritance title chain.
3. Current financial year BBMP / Municipal property tax paid receipt (zero dues).
4. Latest Encumbrance Certificate (EC) from Kaveri 2.0 portal.
5. Aadhaar cards and PAN cards of Donor/Releasor, Donee/Releasee, and 2 adult witnesses.
6. Relationship proof (Birth Certificate, Passport, Marriage Certificate, or Nadakacheri Family Tree).
7. Kaveri 2.0 K2 Stamp Duty & Registration Fee Challan receipt.
8. Post-registration: Check auto-mutation on BBMP e-Aasthi (7 working days) or apply via Sakala (2% of stamp duty, min Rs 500).`;
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
            <span>KARNATAKA STAMP ACT, 1957 • ARTICLES 28 &amp; 45 • KAVERI 2.0</span>
          </div>

          {/* Strict H1 Tag (51 chars, distinct from Title, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Karnataka Gift &amp; Release Deed Stamp Duty Calculator
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Estimate exact Kaveri 2.0 stamp duty, cess, surcharge, and registration fees in
            Bengaluru and across Karnataka. Check Article 28(b) and 45(b) family slabs versus
            5.6% non-family rates in seconds.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Kaveri 2.0 Fees</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/services/gift-deed-drafting-registration"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <FileText className="w-4 h-4 text-[#C65378]" />
              <span>Get Lawyer-Drafted Deed</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹5,600</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                BBMP FAMILY STAMP DUTY (INCL. CESS)
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">5.6% + 2%</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                NON-FAMILY URBAN DUTY + REG FEE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Art. 28 &amp; 45</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                KARNATAKA STAMP ACT, 1957
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">e-Khata</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                REQUIRED ON BBMP KAVERI 2.0
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
                <span>Karnataka Law Desk</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Built on Articles 28 and 45 of the Karnataka Stamp Act, 1957, Section 3B cess
                rules, and Karnataka Revenue Notification RD/46/MNMU/2025.
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
                <span>QUICK ANSWER: KARNATAKA GIFT &amp; RELEASE DEED FEES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Bengaluru Family Gift Cost:</strong> Gifting a BBMP site to your
                    daughter costs a flat ₹5,000 stamp duty under Article 28(b). Add ₹500 cess
                    and ₹100 surcharge to get ₹5,600. With ₹1,000 fixed registration fee and
                    scanning charges, you pay about ₹7,100 total on Kaveri 2.0.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Family Release Deed Slabs:</strong> Giving up a joint share to a
                    family co-owner under Article 45(b) also uses flat slabs. You pay ₹5,000 in
                    BBMP or City Corporations, ₹3,000 in towns, and ₹1,000 in rural villages,
                    plus 10% cess and 2% or 3% surcharge.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Watch the Son-in-Law Trap:</strong> Daughter-in-law is inside the
                    Article 28(b) family list. Son-in-law is not. A gift to a son-in-law costs
                    5.6% stamp duty plus 2% registration fee on guidance value.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>2025 Registration Fee Hike:</strong> From August 31, 2025, Karnataka
                    doubled general property registration fees from 1% to 2%. Non-family gifts and
                    releases now cost 7.60% in cities and 7.65% in villages.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (ONLY H2 ON THE ENTIRE PAGE) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>KARNATAKA LEGAL FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Karnataka Stamp Act: Gift vs Release Deed Rules
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many Karnataka families pay lakhs too much because they pick the wrong deed or
                  list the wrong relative. The Karnataka Stamp Act, 1957 sets two distinct rules
                  for transfers inside a family.
                </p>
                <p>
                  <strong>Article 28 covers Gift Deeds.</strong> A Gift Deed lets a sole owner
                  pass a flat, house, or site out of love and care with zero cash paid. Under
                  Section 123 of the Transfer of Property Act, 1882, you must sign it before two
                  witnesses and register it at the Sub-Registrar Office.
                </p>
                <p>
                  <strong>Article 45 covers Release Deeds.</strong> People also call this a
                  Relinquishment Deed. You can use it only when two or more people already own
                  the property together. One co-owner gives up their share so the other family
                  co-owner gets clean sole title.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE KAVERI 2.0 FEE CALCULATOR */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>KAVERI 2.0 STAMP DUTY &amp; REGISTRATION ENGINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Kaveri 2.0 Gift &amp; Release Deed Fee Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Pick your deed type, local body area, family relation, and guidance value below.
                See your exact stamp duty, cess, surcharge, registration fee, and BBMP Khata
                transfer cost at once.
              </p>

              {/* Calculator Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Step 1: Deed Type */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C65378]" />
                    <span>Step 1: Select Karnataka Deed Type</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeedType("gift")}
                      className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                        deedType === "gift"
                          ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-extrabold text-sm text-slate-900">
                          Gift Deed (Article 28)
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-[#C65378] text-[10px] font-bold">
                          Sole Owner Transfer
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-snug">
                        Transfer a self-owned site, flat, or plot out of love and care with zero
                        money paid.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeedType("release")}
                      className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                        deedType === "release"
                          ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-extrabold text-sm text-slate-900">
                          Release Deed (Article 45)
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                          Co-Owner Share Exit
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-snug">
                        Give up your undivided share in a jointly owned or inherited home to a
                        co-owner.
                      </p>
                    </button>
                  </div>
                </div>

                {/* Step 2: Property Jurisdiction */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C65378]" />
                    <span>Step 2: Select Property Location &amp; Local Body Tier</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "bbmp_corp" as JurisdictionType,
                        label: "BBMP / BMRDA / City Corp",
                        sub: "Bengaluru, Mysuru, Mangaluru, Hubballi",
                        pill: "₹5,000 Base • 2% Surcharge",
                      },
                      {
                        id: "municipal" as JurisdictionType,
                        label: "Municipal / Town Panchayat",
                        sub: "City & Town Municipal Council limits",
                        pill: "₹3,000 Base • 2% Surcharge",
                      },
                      {
                        id: "rural" as JurisdictionType,
                        label: "Rural / Gram Panchayat",
                        sub: "Village sites & rural panchayat limits",
                        pill: "₹1,000 Base • 3% Surcharge",
                      },
                    ].map((loc) => (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => setJurisdiction(loc.id)}
                        className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          jurisdiction === loc.id
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="font-extrabold text-xs text-slate-900">{loc.label}</div>
                        <div className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                          {loc.sub}
                        </div>
                        <div className="mt-2 inline-block px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-bold text-[#C65378]">
                          {loc.pill}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Relationship Checker */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#C65378]" />
                      <span>
                        Step 3: Who Is Receiving the{" "}
                        {deedType === "gift" ? "Gift (Donee)" : "Released Share (Releasee)"}?
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">
                      Built-in Article {deedType === "gift" ? "28(b)" : "45(b)"} Family Check
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {RELATIONSHIPS.map((rel) => {
                      const eligible =
                        deedType === "gift" ? rel.giftFamily : rel.releaseFamily;
                      const isSelected = relationshipId === rel.id;
                      return (
                        <button
                          key={rel.id}
                          type="button"
                          onClick={() => setRelationshipId(rel.id)}
                          className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? eligible
                                ? "border-emerald-600 bg-emerald-50/70 shadow-xs"
                                : "border-[#C65378] bg-rose-50/70 shadow-xs"
                              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-xs text-slate-900">{rel.label}</span>
                            <span
                              className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                                eligible
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-rose-100 text-rose-800"
                              }`}
                            >
                              {eligible ? "Family Slab" : "Non-Family"}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{rel.shortDesc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 4: Guidance Value, Share %, Pages & Khata */}
                <div className="space-y-5 pt-4 border-t border-slate-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Guidance Value Input */}
                    <div className="space-y-2.5">
                      <label
                        htmlFor="ka-guidance-value"
                        className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between gap-2"
                      >
                        <span className="flex items-center gap-2">
                          <IndianRupee className="w-4 h-4 text-[#C65378]" />
                          <span>Step 4: Kaveri 2.0 Guidance Value (₹)</span>
                        </span>
                        <span className="text-[#C65378] font-extrabold">
                          {formatINR(safeGuidanceValue)}
                        </span>
                      </label>
                      <input
                        id="ka-guidance-value"
                        type="number"
                        min={100000}
                        max={500000000}
                        step={100000}
                        value={guidanceValue}
                        onChange={(e) => setGuidanceValue(Number(e.target.value) || 0)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 focus:border-[#C65378] focus:outline-none focus:ring-2 focus:ring-[#C65378]/20"
                      />
                      <input
                        aria-label="Guidance value slider"
                        type="range"
                        min={500000}
                        max={100000000}
                        step={500000}
                        value={Math.min(100000000, Math.max(500000, safeGuidanceValue))}
                        onChange={(e) => setGuidanceValue(Number(e.target.value))}
                        className="w-full accent-[#C65378] cursor-pointer"
                      />
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { label: "₹30 Lakh", val: 3000000 },
                          { label: "₹75 Lakh", val: 7500000 },
                          { label: "₹1.5 Cr", val: 15000000 },
                          { label: "₹3 Cr", val: 30000000 },
                        ].map((preset) => (
                          <button
                            key={preset.val}
                            type="button"
                            onClick={() => setGuidanceValue(preset.val)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                              guidanceValue === preset.val
                                ? "bg-[#172228] text-white border-[#172228]"
                                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Right sub-column: Share % (if Release) + Page Count + Khata */}
                    <div className="space-y-4">
                      {deedType === "release" && (
                        <div className="space-y-2">
                          <label
                            htmlFor="ka-share-percent"
                            className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between"
                          >
                            <span>Undivided Share Being Released (%)</span>
                            <span className="text-[#C65378] font-extrabold">
                              {safeSharePercent}% ({formatINR(taxableValue)})
                            </span>
                          </label>
                          <input
                            id="ka-share-percent"
                            type="range"
                            min={5}
                            max={95}
                            step={5}
                            value={safeSharePercent}
                            onChange={(e) => setSharePercent(Number(e.target.value))}
                            className="w-full accent-[#C65378] cursor-pointer"
                          />
                          <div className="flex flex-wrap gap-1.5">
                            {[25, 33, 50, 67].map((pct) => (
                              <button
                                key={pct}
                                type="button"
                                onClick={() => setSharePercent(pct)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border cursor-pointer ${
                                  sharePercent === pct
                                    ? "bg-[#172228] text-white border-[#172228]"
                                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                                }`}
                              >
                                {pct}% Share
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label
                            htmlFor="ka-page-count"
                            className="text-xs font-bold text-slate-900 uppercase tracking-wider block"
                          >
                            Deed Pages (₹50/page)
                          </label>
                          <input
                            id="ka-page-count"
                            type="number"
                            min={2}
                            max={60}
                            value={pageCount}
                            onChange={(e) => setPageCount(Number(e.target.value) || 2)}
                            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900 focus:border-[#C65378] focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label
                            htmlFor="ka-khata-status"
                            className="text-xs font-bold text-slate-900 uppercase tracking-wider block"
                          >
                            Khata Record Type
                          </label>
                          <select
                            id="ka-khata-status"
                            value={khataType}
                            onChange={(e) => setKhataType(e.target.value as KhataType)}
                            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900 focus:border-[#C65378] focus:outline-none"
                          >
                            <option value="bbmp_a_khata">BBMP A-Khata (e-Khata)</option>
                            <option value="bbmp_b_khata">BBMP B-Khata (e-Khata)</option>
                            <option value="non_bbmp">Non-BBMP / E-Swathu</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reset Button */}
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset Calculator to Bengaluru Daughter Gift</span>
                  </button>
                </div>

                {/* =========================================================================
                    DYNAMIC RESULTS CARD (Brand Navy Dashboard)
                    ========================================================================= */}
                <div className="rounded-3xl border-2 border-[#172228] bg-gradient-to-br from-slate-900 via-[#172228] to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/15">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                        ESTIMATED KAVERI 2.0 GOVERNMENT CHALLAN
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                        {formatINR(grandTotal)}
                      </div>
                      <div className="text-xs text-slate-300 mt-0.5">
                        {jurisdictionLabel} • Recipient: {selectedRelation.label}
                      </div>
                    </div>
                    <div
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold shrink-0 self-start sm:self-auto ${
                        isFamilyEligible
                          ? "bg-emerald-500/15 border-emerald-400/40 text-emerald-300"
                          : "bg-rose-500/20 border-rose-400/40 text-rose-200"
                      }`}
                    >
                      {isFamilyEligible ? (
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-rose-300" />
                      )}
                      <span>{appliedArticleLabel}</span>
                    </div>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        TOTAL STAMP DUTY (INCL. CESS)
                      </div>
                      <div className="text-lg sm:text-xl font-black text-emerald-400">
                        {formatINR(totalStampDuty)}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Base {formatINR(baseStampDuty)} + Cess {formatINR(cessAmount)} + Surcharge{" "}
                        {formatINR(surchargeAmount)}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        REGISTRATION &amp; SCANNING FEE
                      </div>
                      <div className="text-lg sm:text-xl font-black text-white">
                        {formatINR(registrationFee + scanningFee)}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Reg {formatINR(registrationFee)} ({isFamilyEligible ? "Family Fixed" : "2% Post-Aug 2025"}) + Scan{" "}
                        {formatINR(scanningFee)}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {isFamilyEligible
                          ? "FAMILY SLAB SAVINGS"
                          : "EXTRA COST VS FAMILY SLAB"}
                      </div>
                      <div
                        className={`text-lg sm:text-xl font-black ${
                          isFamilyEligible ? "text-emerald-300" : "text-rose-300"
                        }`}
                      >
                        {isFamilyEligible
                          ? `Save ${formatINR(savingsVsNonFamily)}`
                          : `+${formatINR(savingsVsNonFamily)}`}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        {isFamilyEligible
                          ? `Non-family cost: ${formatINR(nonFamilyGrandTotal)}`
                          : `Family slab costs only ${formatINR(familyGrandTotal)}`}
                      </div>
                    </div>
                  </div>

                  {/* Side-by-Side Family vs Non-Family Comparison Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/25 space-y-1">
                      <div className="font-extrabold text-emerald-300 uppercase tracking-wider text-[10px]">
                        CONCESSIONAL FAMILY SLAB (ART. {deedType === "gift" ? "28(b)" : "45(b)"})
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-slate-200">Stamp Duty + Reg + Scan:</span>
                        <span className="font-black text-base text-white">
                          {formatINR(familyGrandTotal)}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Flat base {formatINR(familyBaseDuty)} + 10% cess +{" "}
                        {jurisdiction === "rural" ? "3%" : "2%"} surcharge + ₹1,000 reg fee.
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-400/25 space-y-1">
                      <div className="font-extrabold text-rose-200 uppercase tracking-wider text-[10px]">
                        NON-FAMILY MARKET RATE (ART. {deedType === "gift" ? "28(a)" : "45(a)"})
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-slate-200">
                          {jurisdiction === "rural" ? "5.65%" : "5.60%"} Duty + 2% Reg + Scan:
                        </span>
                        <span className="font-black text-base text-white">
                          {formatINR(nonFamilyGrandTotal)}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Charged on {deedType === "release" ? `${safeSharePercent}% share ` : ""}
                        guidance value of {formatINR(taxableValue)}.
                      </div>
                    </div>
                  </div>

                  {/* Detailed Legal, Khata & Tax Advisory */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#C65378]" />
                      <span>Legal, Tax &amp; BBMP Khata Note:</span>
                    </div>
                    <p>{selectedRelation.note}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
                      <div>
                        <span className="text-slate-400 font-bold uppercase text-[10px] block">
                          INCOME TAX SECTION 56(2)(x)
                        </span>
                        <span className="font-semibold text-emerald-300">
                          {selectedRelation.incomeTaxExempt
                            ? "Tax-Free Transfer (Specified Relative)"
                            : "Taxable Income for Recipient if Value > ₹50,000"}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold uppercase text-[10px] block">
                          POST-REGISTRATION BBMP KHATA FEE
                        </span>
                        <span className="font-semibold text-amber-200">
                          {khataType === "non_bbmp"
                            ? "Local Municipality / E-Swathu Mutation Rules Apply"
                            : `${formatINR(bbmpKhataTransferFee)} (2% of Stamp Duty, Min ₹500)`}
                        </span>
                      </div>
                    </div>
                    {khataType === "bbmp_b_khata" && (
                      <div className="pt-2 text-amber-200 text-xs border-t border-white/10">
                        <strong>B-Khata Alert:</strong> You can register a Gift or Release Deed
                        using a digital BBMP B-Khata e-Khata. However, the site stays B-Khata
                        after transfer until converted to A-Khata under BBMP rules.
                      </div>
                    )}
                    <p className="text-[11px] text-slate-400 pt-1">
                      Note: Always check your exact live challan on kaveri.karnataka.gov.in
                      before paying. Sub-Registrar offices verify local body limits and family
                      proof before approving Article 28(b) or 45(b) concessions.
                    </p>
                  </div>

                  {/* Dual Conversion CTAs inside Results */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-xs text-slate-300 text-center sm:text-left">
                      Want zero SRO objections on Kaveri 2.0 or want to compare with a Will?
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                      <Link
                        href={
                          deedType === "gift"
                            ? "/services/gift-deed-drafting-registration"
                            : "/services/relinquishment-deed"
                        }
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                      >
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>
                          Draft {deedType === "gift" ? "Gift Deed" : "Release Deed"}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={handleStartDraft}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Draft Will Instead (₹0 Duty)</span>
                      </button>
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
                  <span>KARNATAKA KAVERI 2.0 FAMILY TRANSFER GUIDE</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  Karnataka Stamp Act, 1957
                </span>
              </div>
              <div className="relative w-full aspect-[1200/630] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/karnataka-gift-deed-release-deed-stamp-duty-calculator-og.jpg"
                  alt="Karnataka Gift and Release Deed Stamp Duty Calculator on Kaveri 2.0"
                  width={1200}
                  height={630}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                Comparing Article 28(b) and 45(b) flat family slabs against 5.6% non-family
                guidance value rates on Karnataka&rsquo;s Kaveri 2.0 portal.
              </p>
            </div>

            {/* SECTION 3: STATUTORY FAMILY MEMBER DEFINITION CHECKER */}
            <section id="family-member-checker" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <UserCheck className="w-4 h-4" />
                <span>STATUTORY FAMILY CHECKER</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Family Member Definition Checker: Art. 28 vs 45
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                The biggest mistake on Kaveri 2.0 is assuming all blood relatives or in-laws get
                the ₹5,000 flat rate. Karnataka law uses a strict closed list. Use the filter
                below to check your exact relation before buying e-stamps.
              </p>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "all" as const, label: "All Relations (12)" },
                  { id: "eligible" as const, label: "Concessional Family Only (8)" },
                  { id: "excluded" as const, label: "Non-Family 5.6% Rate (4)" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setFamilyFilter(tab.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      familyFilter === tab.id
                        ? "bg-[#172228] text-white border-[#172228]"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 font-extrabold">Recipient Relation</th>
                      <th className="p-3.5 font-extrabold text-emerald-300">
                        Gift Deed Art. 28(b)
                      </th>
                      <th className="p-3.5 font-extrabold text-rose-200">
                        Release Deed Art. 45(b)
                      </th>
                      <th className="p-3.5 font-extrabold">Income Tax Sec. 56(2)(x)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredRelationships.map((rel) => (
                      <tr key={rel.id} className="hover:bg-slate-50/70">
                        <td className="p-3.5 font-bold text-slate-900">{rel.label}</td>
                        <td className="p-3.5">
                          {rel.giftFamily ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Flat Family Slab
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-rose-700 font-bold">
                              <XCircle className="w-3.5 h-3.5" /> 5.6% + 2% Reg
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">
                          {rel.releaseFamily ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Flat Family Slab
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-rose-700 font-bold">
                              <XCircle className="w-3.5 h-3.5" /> Not in Art. 45(b)
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">
                          {rel.incomeTaxExempt ? (
                            <span className="text-emerald-700 font-semibold">Tax-Free</span>
                          ) : (
                            <span className="text-rose-700 font-semibold">Taxable (&gt;₹50K)</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-4 text-xs text-amber-950 space-y-1.5">
                <div className="font-extrabold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Why Daughter-in-Law Qualifies While Son-in-Law Does Not</span>
                </div>
                <p className="leading-relaxed">
                  The Explanation to Article 28(b) names &ldquo;daughter-in-law&rdquo; right in
                  the statute. It leaves out &ldquo;son-in-law&rdquo;. So a Bengaluru father can
                  gift a flat to his daughter-in-law for ₹5,600 stamp duty. If he gifts the same
                  flat to his son-in-law, Kaveri 2.0 charges full 5.6% stamp duty plus 2%
                  registration fee.
                </p>
              </div>
            </section>

            {/* SECTION 4: FAMILY SLAB COMPARISON ACROSS JURISDICTIONS */}
            <section id="family-slab-comparison" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <MapPin className="w-4 h-4" />
                <span>GEOGRAPHIC FEE MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Family Slab Comparison: BBMP vs Town vs Rural
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                For eligible family members, your property value does not change the stamp duty.
                Whether your Bengaluru house is worth ₹60 Lakh or ₹6 Crore, your base stamp duty
                depends only on the local civic body limits.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 font-extrabold">Karnataka Property Area</th>
                      <th className="p-3.5 font-extrabold">Base Duty</th>
                      <th className="p-3.5 font-extrabold">10% Sec. 3B Cess</th>
                      <th className="p-3.5 font-extrabold">Local Surcharge</th>
                      <th className="p-3.5 font-extrabold text-emerald-300">
                        Total Stamp Duty
                      </th>
                      <th className="p-3.5 font-extrabold text-rose-200">Family Reg Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">
                        BBMP, BMRDA, BDA &amp; City Corporations
                      </td>
                      <td className="p-3.5 font-bold">₹5,000</td>
                      <td className="p-3.5">₹500</td>
                      <td className="p-3.5">₹100 (2%)</td>
                      <td className="p-3.5 font-extrabold text-emerald-800">₹5,600</td>
                      <td className="p-3.5 font-bold">₹1,000</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">
                        City / Town Municipal Council &amp; Town Panchayat
                      </td>
                      <td className="p-3.5 font-bold">₹3,000</td>
                      <td className="p-3.5">₹300</td>
                      <td className="p-3.5">₹60 (2%)</td>
                      <td className="p-3.5 font-extrabold text-emerald-800">₹3,360</td>
                      <td className="p-3.5 font-bold">₹1,000</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">
                        Rural / Gram Panchayat &amp; Other Areas
                      </td>
                      <td className="p-3.5 font-bold">₹1,000</td>
                      <td className="p-3.5">₹100</td>
                      <td className="p-3.5">₹30 (3%)</td>
                      <td className="p-3.5 font-extrabold text-emerald-800">₹1,130</td>
                      <td className="p-3.5 font-bold">₹1,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Multi-Location Deed Rule:</strong> If one Release Deed or Gift Deed lists
                properties in both BBMP and a village panchayat, Karnataka law applies the highest
                applicable slab (₹5,000 base) to the instrument. Scanning fee adds about ₹50 per
                page on Kaveri 2.0.
              </p>
            </section>

            {/* SECTION 5: NON-FAMILY 5.6% STAMP DUTY & 2% REG FEE RULES */}
            <section id="non-family-rates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>ARTICLE 28(a), 45(a) &amp; 2025 FEE HIKE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Non-Family 5.6% Stamp Duty &amp; 2% Reg Fee Rules
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When a gift or release goes to anyone outside the family list, Kaveri 2.0 taxes
                  it like a regular sale under Article 20(1). You pay duty on the higher of the
                  declared value or the state guidance value.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      1. Base Duty + Cess
                    </div>
                    <div className="font-bold text-slate-900">5% Base + 10% Sec. 3B Cess</div>
                    <p className="text-slate-600 leading-relaxed">
                      Base conveyance duty is 5% on standard plots and homes above ₹45 Lakh. Add
                      10% infrastructure cess on the duty (0.50% of property value).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      2. Local Body Surcharge
                    </div>
                    <div className="font-bold text-slate-900">2% Urban or 3% Rural</div>
                    <p className="text-slate-600 leading-relaxed">
                      BBMP and city areas add 2% surcharge on stamp duty (5.60% total). Rural
                      panchayats add 3% surcharge on stamp duty (5.65% total).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      3. Aug 2025 Reg Fee Hike
                    </div>
                    <div className="font-bold text-slate-900">2% Ad Valorem Reg Fee</div>
                    <p className="text-slate-600 leading-relaxed">
                      Notification No. RD/46/MNMU/2025 (effective Aug 31, 2025) raised general
                      registration fees from 1% to 2%. Non-family urban deeds now total 7.60%.
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-600">
                  <strong>Note on First-Time Residential Slabs:</strong> Under Article 20(1),
                  first-time registrations of residential flats up to ₹20 Lakh carry 2% base duty
                  and ₹20 Lakh to ₹45 Lakh carry 3% base duty. Resale homes, vacant sites, and
                  properties above ₹45 Lakh pay the full 5% base rate.
                </p>
              </div>
            </section>

            {/* SECTION 6: GIFT DEED VS RELEASE DEED VS WILL */}
            <section id="deed-comparison" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>ESTATE TRANSFER OPTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Gift Deed vs Release Deed vs Will in Karnataka
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Not sure whether to sign a Gift Deed, a Release Deed, or a Will? Compare cost,
                timing, control, and cancellation rights side by side before you visit the
                Sub-Registrar.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 font-extrabold">Feature</th>
                      <th className="p-3.5 font-extrabold text-rose-200">Family Gift Deed</th>
                      <th className="p-3.5 font-extrabold text-amber-200">Family Release Deed</th>
                      <th className="p-3.5 font-extrabold text-emerald-300">Registered Will</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">When Ownership Moves</td>
                      <td className="p-3.5">Immediate, during owner&rsquo;s lifetime.</td>
                      <td className="p-3.5">Immediate exit of releasing co-owner.</td>
                      <td className="p-3.5 font-semibold text-emerald-800">
                        Only after the Will maker passes away.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Prior Co-Ownership Needed?</td>
                      <td className="p-3.5">No. Sole owner can gift to family.</td>
                      <td className="p-3.5 font-bold text-[#C65378]">
                        Yes. Both parties must already co-own.
                      </td>
                      <td className="p-3.5">No. You can leave self-owned assets to anyone.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">BBMP Stamp Duty</td>
                      <td className="p-3.5">₹5,600 (incl. cess &amp; surcharge).</td>
                      <td className="p-3.5">₹5,600 (incl. cess &amp; surcharge).</td>
                      <td className="p-3.5 font-extrabold text-emerald-800">₹0 Stamp Duty.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Can Owner Cancel Later?</td>
                      <td className="p-3.5 text-rose-700 font-semibold">
                        Generally final (except Sec. 23 care clause).
                      </td>
                      <td className="p-3.5 text-rose-700 font-semibold">
                        Final once registered at SRO.
                      </td>
                      <td className="p-3.5 font-bold text-emerald-800">
                        Yes. Change or cancel anytime while alive.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">Son-in-Law or Friend Cost</td>
                      <td className="p-3.5">5.6% duty + 2% reg fee (Very high).</td>
                      <td className="p-3.5">5.6% duty + 2% reg fee on share.</td>
                      <td className="p-3.5 font-bold text-emerald-800">
                        ₹0 stamp duty for any heir or friend.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 7: INTERACTIVE BBMP E-KHATA & B-KHATA CHECKLIST */}
            <section id="bbmp-khata-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ClipboardCheck className="w-4 h-4" />
                <span>BENGALURU E-AASTHI COMPLIANCE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Interactive BBMP e-Khata &amp; B-Khata Checklist
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Bengaluru Sub-Registrars now link Kaveri 2.0 directly to the BBMP e-Aasthi
                system. Tick off each item below before your SRO slot to avoid last-minute
                rejection or stalled Khata mutation.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="font-extrabold text-sm text-slate-900">
                    BBMP Gift / Release Deed Readiness Tracker
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#C65378] text-xs font-bold">
                    <span>
                      {completedChecklistCount} of {BBMP_CHECKLIST_ITEMS.length} Ready
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-[#C65378] transition-all duration-300"
                    style={{
                      width: `${Math.round(
                        (completedChecklistCount / BBMP_CHECKLIST_ITEMS.length) * 100
                      )}%`,
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {BBMP_CHECKLIST_ITEMS.map((item) => {
                    const checked = Boolean(checkedItems[item.id]);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleChecklistItem(item.id)}
                        className={`text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                          checked
                            ? "border-emerald-300 bg-emerald-50/50"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                            checked
                              ? "bg-emerald-600 border-emerald-600 text-white"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {checked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-xs text-slate-900">
                              {item.title}
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[9px] font-bold uppercase text-slate-600">
                              {item.stage}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-700 space-y-1.5">
                  <div className="font-extrabold text-slate-900">
                    BBMP A-Khata vs B-Khata Transfer Rule
                  </div>
                  <p className="leading-relaxed">
                    Both A-Khata and B-Khata properties can be gifted or released on Kaveri 2.0
                    once you generate a digital e-Khata on e-Aasthi. A family Gift Deed does not
                    turn a B-Khata site into an A-Khata site. For manual Khata transfer via
                    Sakala, BBMP charges 2% of the stamp duty paid, with a ₹500 minimum fee.
                  </p>
                </div>
              </div>
            </section>

            {/* MID-ARTICLE CONTEXTUAL INTERNAL LINK BANNER */}
            <div className="rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50/60 via-white to-amber-50/50 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#C65378]">
                  <Scale className="w-3.5 h-3.5" />
                  <span>DECIDING BETWEEN GIFTING NOW VS LEAVING A WILL?</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Compare Lifetime Gift Deed Costs Against a Zero-Stamp-Duty Will
                </div>
                <p className="text-xs text-slate-600">
                  Check capital gains rules, senior citizen safety, and probate costs before
                  locking in an irreversible gift.
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

            {/* SECTION 8: STEP-BY-STEP KAVERI 2.0 PROCESS */}
            <section id="kaveri-registration-steps" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>KAVERI 2.0 ONLINE WORKFLOW</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Step-by-Step Kaveri 2.0 Registration Process
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Follow these five steps to register your Karnataka Gift Deed or Release Deed
                without middleman markups:
              </p>

              <div className="space-y-3 pt-1">
                {[
                  {
                    title: "Generate Digital e-Khata & Check Guidance Value",
                    desc: "Download your final e-Khata from BBMP e-Aasthi (or E-Swathu for rural sites). Check the Kaveri 2.0 guidance value for your street or survey number.",
                  },
                  {
                    title: "Draft the Exact Article 28(b) or 45(b) Deed",
                    desc: "State clearly that the transfer is out of love and care with zero cash paid. Name the exact family relation and attach full property boundaries.",
                  },
                  {
                    title: "Upload Application on Kaveri 2.0 Portal",
                    desc: "Log in at kaveri.karnataka.gov.in, select Gift or Release Deed, enter party Aadhaar details, link the e-Khata ID, and upload the PDF draft for SRO review.",
                  },
                  {
                    title: "Pay K2 Challan & Book SRO Slot",
                    desc: "Once the Sub-Registrar approves the draft online, pay the K2 challan for stamp duty, cess, surcharge, registration fee, and page scanning fee. Book your date.",
                  },
                  {
                    title: "Complete SRO Biometrics & Track Auto-Mutation",
                    desc: "Visit the SRO with donor, donee (or co-owners), and two witnesses with original Aadhaar and PAN. Collect the registered deed and check e-Khata update in 7 working days.",
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

            {/* SECTION 9: LANDMARK KARNATAKA COURT RULINGS & TAX RULES */}
            <section id="court-rulings-tax" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>JUDICIAL PRECEDENTS &amp; INCOME TAX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Landmark Karnataka Court Rulings &amp; Tax Rules
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Karnataka High Court and Supreme Court benches have settled several common
                  stamp duty and gift disputes. Knowing these rules protects you at the SRO desk.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#C65378] shrink-0" />
                      <span>Sri B.R. Jagadhish v. District Registrar (Kar HC)</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Sub-Registrars must verify donor-donee family ties from clear deed recitals.
                      Officials cannot arbitrarily deny Article 28(b) family rates when the
                      parties meet the statutory family test.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#C65378] shrink-0" />
                      <span>Mrs. Razia Begum v. State of Karnataka (Kar HC)</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      When several family co-heirs join one Release Deed in favor of another
                      family co-owner, the concessional duty under Article 45(b) governs the deed
                      instead of charging full market duty per person.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#C65378] shrink-0" />
                      <span>Renikuntla Rajamma v. K. Sarwanamma (SC, 2014)</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      A registered Gift Deed under Section 123 TPA transfers ownership even if
                      the parent keeps life stay or rent rights, once the child accepts the gift.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#C65378] shrink-0" />
                      <span>Sudesh Chhikara (2022) &amp; Urmila Dixit (2025 SC)</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Senior citizens can cancel a gift under Section 23 of the Senior Citizens
                      Act if the deed ties the gift to basic care and the child fails to look
                      after them.
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700">
                  <strong>Income Tax &amp; Capital Gains Check:</strong> Gifts between close
                  relatives are exempt under Section 56(2)(x) of the Income Tax Act. When the
                  child sells the home later, Section 49(1) uses the parent&rsquo;s original
                  buying price and purchase date to compute capital gains. If you gift a rented
                  flat to your spouse, Section 64(1)(iv) clubs the rent in your own tax return.
                </p>
              </div>
            </section>

            {/* SECTION 10: PRACTICAL BENGALURU & KARNATAKA COST EXAMPLES */}
            <section id="practical-examples" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>REAL KARNATAKA COST SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Practical Bengaluru &amp; Karnataka Cost Examples
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
                {/* Example 1: Bengaluru Father to Daughter */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">
                      Indiranagar BBMP Site
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px]">
                      Art. 28(b)
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Father Gifting ₹1.5 Cr Bengaluru Site to Daughter
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Duty Math:</strong> Base ₹5,000 + 10% cess (₹500) + 2% BBMP surcharge
                    (₹100) = ₹5,600 stamp duty. Add ₹1,000 family registration fee and ₹500 for
                    10 scanned pages.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Total Kaveri 2.0 Outlay:</strong> ₹7,100 (saves ₹11.33 Lakh compared
                    to non-family rates). Zero income tax under Section 56(2)(x).
                  </p>
                </div>

                {/* Example 2: Mysuru Sibling Release Deed */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">
                      Mysuru Joint Family Home
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px]">
                      Art. 45(b)
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Two Sisters Releasing Inherited Shares to Brother
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Duty Math:</strong> Property sits in Mysuru City Corporation limits.
                    All siblings already co-own via father&rsquo;s death. One joint Release Deed
                    attracts ₹5,000 base + ₹500 cess + ₹100 surcharge.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Total Outlay:</strong> ₹5,600 stamp duty + ₹1,000 reg fee + ₹500
                    scan = ₹7,100 total for a clean single-owner title.
                  </p>
                </div>

                {/* Example 3: Whitefield Son-in-Law Trap */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">
                      Whitefield Flat Trap
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Art. 28(a)
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Father-in-Law Gifting ₹1 Cr Flat to Son-in-Law
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Duty Math:</strong> Son-in-law is excluded from Article 28(b). Kaveri
                    2.0 charges 5% base (₹5,00,000) + 10% cess (₹50,000) + 2% surcharge (₹10,000)
                    + 2% reg fee (₹2,00,000).
                  </p>
                  <p className="text-rose-800 font-semibold leading-relaxed">
                    <strong>Total Cost:</strong> ₹7,60,500! Gifting to the daughter instead cuts
                    the government bill from ₹7.60 Lakh down to ₹7,100.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: COPYABLE DEED RECITALS & CHECKLIST */}
            <section id="deed-recitals-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>SRO-READY DRAFTING CLAUSES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Copyable Deed Recitals &amp; Kaveri 2.0 Checklist
              </h3>

              {/* Template Box 1 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Sample {deedType === "gift" ? "Article 28(b) Gift Deed" : "Article 45(b) Release Deed"}{" "}
                    Family Recital
                  </div>
                  <button
                    type="button"
                    onClick={copyClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
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
                  {deedType === "gift"
                    ? `"WHEREAS the Donor is the absolute sole owner of the Schedule Property bearing BBMP e-Khata / PID No. [Insert e-Khata ID], acquired through Registered Sale Deed dated [Date].

AND WHEREAS the Donee is the [Daughter / Son / Spouse / Parent / Sibling / Daughter-in-Law / Grandchild] of the Donor, falling strictly within the definition of 'Family' under the Explanation to Article 28(b) of the Schedule to the Karnataka Stamp Act, 1957.

NOW THIS DEED WITNESSES that out of natural love and affection, and without any monetary consideration whatsoever, the Donor voluntarily gifts, conveys, and transfers all right, title, and interest in the Schedule Property to the Donee, who hereby accepts the gift during the Donor's lifetime under Section 122 and Section 123 of the Transfer of Property Act, 1882."`
                    : `"WHEREAS the Releasor and the Releasee are joint co-owners / legal co-heirs holding undivided shares in the Schedule Property bearing BBMP e-Khata / Survey No. [Insert ID].

AND WHEREAS the Releasor and the Releasee are members of the same 'Family' as defined in the Explanation to Article 45(b) of the Karnataka Stamp Act, 1957.

NOW THIS DEED WITNESSES that out of natural love and affection and to settle family title cleanly, the Releasor hereby releases, relinquishes, and gives up all undivided share, claim, and demand in the Schedule Property in favour of the Releasee, making the Releasee the absolute owner thereof."`}
                </pre>
                <div className="flex flex-wrap gap-2 pt-1 text-xs">
                  <Link
                    href="/templates/gift-deed-format-blood-relatives-india"
                    className="font-bold text-[#C65378] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Open Full Blood-Relative Gift Deed Format</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <span className="text-slate-300">|</span>
                  <Link
                    href="/templates/release-deed-format"
                    className="font-bold text-[#C65378] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Open Full Release Deed Format</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Template Box 2 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Quick SRO Counter Folder: Karnataka Gift &amp; Release Deeds
                  </div>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
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
                  <div className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Verified BBMP e-Khata / E-Swathu Extract &amp; Current Tax Receipt</span>
                  </div>
                  <div className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Original Prior Title Deed + Kaveri 2.0 Encumbrance Certificate</span>
                  </div>
                  <div className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Aadhaar, PAN &amp; 2 Adult Witnesses + Family Tree Proof</span>
                  </div>
                  <div className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Paid K2 Stamp Duty &amp; Registration Challan Slip</span>
                  </div>
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
                12. Institutional Profile: AMA Legal Solutions
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Property Transfer &amp; Estate Desk
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Counsel</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is powered by AMA Legal Solutions. Our property and estate
                  advocates draft clean Gift Deeds, Release Deeds, and Wills tailored to state
                  stamp laws and Sub-Registrar rules. We help families verify title chains,
                  protect senior citizens, and finish Khata mutation smoothly.
                </p>

                {/* Verified Internal Service & Tool Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/gift-deed-drafting-registration"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Gift Deed Drafting</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/services/relinquishment-deed"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Release Deed Service</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/services/property-mutation-dakhil-kharij-service"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Khata Mutation Help</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/senior-citizen-section-23-gift-revocation-checker"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Sec. 23 Gift Safety</span>
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
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: Karnataka Deeds
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

            {/* SECTION 14: STATUTORY CITATIONS & PORTALS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>OFFICIAL GOVERNMENT PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Statutory Citations &amp; Karnataka Portals
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs text-slate-600">
                <p>
                  All rates and checklists on this page follow the Karnataka Stamp Act, 1957
                  (Articles 28 and 45), the Registration Act, 1908, and official Karnataka state
                  portals. Always confirm your final live challan before payment:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://kaveri.karnataka.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Kaveri 2.0 Portal (Karnataka)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://bbmpeaasthi.karnataka.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>BBMP e-Aasthi (e-Khata)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: TPA &amp; Registration Acts</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Supreme Court of India Rulings</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Tools, Templates &amp; Hubs
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      All Legal Calculators Hub
                    </Link>
                    <Link
                      href="/start"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Self-Serve Online Will Drafting
                    </Link>
                    <Link
                      href="/templates/will-format-kannada-uyilu"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Kannada Will Format (Uyilu)
                    </Link>
                    <Link
                      href="/tools/maharashtra-gift-deed-release-deed-stamp-duty-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Maharashtra Stamp Duty Tool
                    </Link>
                    <Link
                      href="/tools/delhi-gift-deed-relinquishment-deed-stamp-duty-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Delhi Stamp Duty Tool
                    </Link>
                    <Link
                      href="/tools/uttar-pradesh-family-gift-deed-stamp-duty-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      UP ₹5,000 Gift Deed Tool
                    </Link>
                    <Link
                      href="/tools/ancestral-vs-self-acquired-property-classifier"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Ancestral vs Self-Acquired Test
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* PLAIN-ENGLISH SUMMARY TRIO (Matching Reference Architecture) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">
                  Why Check Your Slab First?
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  One wrong name on a deed can turn a ₹5,600 family gift into a ₹7 Lakh bill.
                  Check your relation and local body limits before you pay any K2 challan on
                  Kaveri 2.0.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">
                  Gift Now or Write a Will?
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A Gift Deed gives your house away right now. A Will lets you keep full control
                  of your flat, site, and bank cash while you live. A Will needs zero stamp duty
                  in Karnataka.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Lawyers Help</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our team checks your title deeds, e-Khata, and family tree. We draft clear
                  Gift Deeds, Release Deeds, and Wills so your family faces zero SRO delays or
                  court fights.
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
                    Lawyer Anuj Anand Malik
                  </div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialist in Indian property transfers, state stamp duty laws, family deeds,
                and dispute-free Will planning across Karnataka and India.
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
              {/* CARD 2: DUAL CTA 1 - DEED DRAFTING & WILL (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>ZERO-ERROR KAVERI 2.0 DRAFTING</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Need a Gift Deed, Release Deed, or Will Drafted?
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Avoid Sub-Registrar objections and save lakhs with accurate Article 28(b) and
                  45(b) recitals, or draft a flexible Will online in 15 minutes.
                </p>
                <div className="space-y-2.5">
                  <Link
                    href="/services/gift-deed-drafting-registration"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Book Gift / Release Deed Service</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleStartDraft}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-rose-300" />
                    <span>Start Self-Serve Will (₹0 Duty)</span>
                  </button>
                </div>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Checked &amp; SRO Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (White / Rose Border) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>KARNATAKA PROPERTY &amp; KHATA DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Stuck with Kaveri 2.0 or BBMP e-Khata Issues?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Speak with an AMA Legal Solutions advocate on joint co-heir releases, B-Khata
                  transfers, NRI power of attorney, or Section 23 parent safety clauses.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Book Advocate Consultation</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Karnataka Families Use WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Exact Statute Math:</strong> Separates Article 28(b) and 45(b)
                      slabs from 5.6% non-family rates.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Updated for 2025 Rules:</strong> Factors in the 2% non-family
                      registration fee hike and BBMP e-Khata rules.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Private &amp; Instant:</strong> 100% browser-side calculator with
                      no login needed to check fees.
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
        <Link
          href="/contact"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Talk to Advocate</span>
        </Link>
      </div>
    </div>
  );
}
