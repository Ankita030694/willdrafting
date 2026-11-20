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
  IndianRupee,
  XCircle,
} from "lucide-react";

type StateCode = "haryana" | "punjab";
type ZoneType = "urban" | "rural";
type GenderCategory = "male" | "female" | "joint";
type DeedMode = "transfer_deed" | "registered_will";
type RelationId =
  | "parent_to_child"
  | "child_to_parent"
  | "spouse"
  | "sibling"
  | "paternal_grandchild"
  | "maternal_grandchild"
  | "in_law"
  | "uncle_nephew"
  | "non_relative";

interface RelationOption {
  id: RelationId;
  label: string;
  desc: string;
  eligibleHaryana: boolean;
  eligiblePunjab: boolean;
  itExempt: boolean;
  clubbingRisk: boolean;
}

const RELATION_OPTIONS: RelationOption[] = [
  {
    id: "parent_to_child",
    label: "Parent to Child",
    desc: "Father or mother gifting land or flat to son or daughter",
    eligibleHaryana: true,
    eligiblePunjab: true,
    itExempt: true,
    clubbingRisk: false,
  },
  {
    id: "child_to_parent",
    label: "Child to Parent",
    desc: "Son or daughter transferring property to father or mother",
    eligibleHaryana: true,
    eligiblePunjab: true,
    itExempt: true,
    clubbingRisk: false,
  },
  {
    id: "spouse",
    label: "Between Spouses",
    desc: "Husband to wife or wife to husband (Section 64 tax rule applies)",
    eligibleHaryana: true,
    eligiblePunjab: true,
    itExempt: true,
    clubbingRisk: true,
  },
  {
    id: "sibling",
    label: "Brother or Sister",
    desc: "Full sibling lifetime transfer without cash payment",
    eligibleHaryana: true,
    eligiblePunjab: true,
    itExempt: true,
    clubbingRisk: false,
  },
  {
    id: "paternal_grandchild",
    label: "Son's Child (Pautra / Pautri)",
    desc: "Grandparent to grandson or granddaughter via son",
    eligibleHaryana: true,
    eligiblePunjab: true,
    itExempt: true,
    clubbingRisk: false,
  },
  {
    id: "maternal_grandchild",
    label: "Daughter's Child (Dohata / Nati)",
    desc: "Grandparent to daughter's child (Haryana Aug 2026 order)",
    eligibleHaryana: true,
    eligiblePunjab: true,
    itExempt: true,
    clubbingRisk: false,
  },
  {
    id: "in_law",
    label: "Daughter-in-Law / Son-in-Law",
    desc: "Excluded from 0% blood relation order in both states",
    eligibleHaryana: false,
    eligiblePunjab: false,
    itExempt: true,
    clubbingRisk: true,
  },
  {
    id: "uncle_nephew",
    label: "Uncle, Aunt, Nephew or Niece",
    desc: "Extended kin excluded from state blood relation waiver",
    eligibleHaryana: false,
    eligiblePunjab: false,
    itExempt: true,
    clubbingRisk: false,
  },
  {
    id: "non_relative",
    label: "Cousin, Friend or Company",
    desc: "Non-blood transfer attracts full stamp duty and tax risk",
    eligibleHaryana: false,
    eligiblePunjab: false,
    itExempt: false,
    clubbingRisk: false,
  },
];

const HARYANA_REG_SLABS = [
  { max: 50000, fee: 100, label: "Up to ₹50,000" },
  { max: 500000, fee: 1000, label: "₹50,001 to ₹5,00,000" },
  { max: 1000000, fee: 5000, label: "₹5,00,001 to ₹10,00,000" },
  { max: 2000000, fee: 10000, label: "₹10,00,001 to ₹20,00,000" },
  { max: 2500000, fee: 12500, label: "₹20,00,001 to ₹25,00,000" },
  { max: 3000000, fee: 15000, label: "₹25,00,001 to ₹30,00,000" },
  { max: 4000000, fee: 20000, label: "₹30,00,001 to ₹40,00,000" },
  { max: 5000000, fee: 25000, label: "₹40,00,001 to ₹50,00,000" },
  { max: 6000000, fee: 30000, label: "₹50,00,001 to ₹60,00,000" },
  { max: 7000000, fee: 35000, label: "₹60,00,001 to ₹70,00,000" },
  { max: 8000000, fee: 40000, label: "₹70,00,001 to ₹80,00,000" },
  { max: 9000000, fee: 45000, label: "₹80,00,001 to ₹90,00,000" },
  { max: Infinity, fee: 50000, label: "Above ₹90,00,000 (Maximum Cap)" },
];

function getHaryanaRegistrationFee(value: number): { fee: number; slabLabel: string } {
  const safeVal = Math.max(0, value);
  for (const slab of HARYANA_REG_SLABS) {
    if (safeVal <= slab.max) {
      return { fee: slab.fee, slabLabel: slab.label };
    }
  }
  return { fee: 50000, slabLabel: "Above ₹90,00,000 (Maximum Cap)" };
}

function formatINR(amount: number): string {
  return "₹" + Math.round(amount).toLocaleString("en-IN");
}

function formatCompactINR(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(amount % 10000000 === 0 ? 0 : 2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)} Lakh`;
  }
  return formatINR(amount);
}

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Haryana & Punjab Blood Relation Law" },
  { id: "interactive-calculator", label: "2. Blood Relation Stamp Duty Calculator" },
  { id: "haryana-rules", label: "3. Haryana S.O. 62/2014 & Aug 2026 Order" },
  { id: "punjab-rules", label: "4. Punjab S.O. 28/2014 & S.O. 47-48/2015" },
  { id: "eligibility-matrix", label: "5. Eligible vs Excluded Relatives Matrix" },
  { id: "state-comparison", label: "6. Haryana vs Punjab Fee Comparison" },
  { id: "transfer-vs-will", label: "7. Blood Transfer Deed vs Registered Will" },
  { id: "court-rulings", label: "8. High Court Rulings & Section 23 Rules" },
  { id: "step-by-step-guide", label: "9. Step-by-Step: Web-HALRIS & IGR Punjab" },
  { id: "worked-examples", label: "10. Worked Cost Examples: 3 Real Cases" },
  { id: "documents-clauses", label: "11. Document Checklist & Legal Clauses" },
  { id: "institutional-profile", label: "12. Legal Editorial & Practice Profile" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Official Portals & Related Guides" },
];

const FAQS = [
  {
    q: "Is stamp duty 0% on blood relation property transfers in Haryana and Punjab?",
    a: "Yes. Both states charge 0% stamp duty on lifetime home or land transfers made without cash payment among listed blood relatives and spouses. Haryana grants this under Order S.O. 62 dated June 16, 2014. Punjab grants it under Order S.O. 28 dated May 7, 2014.",
  },
  {
    q: "Do I still pay SRO fees for a blood relation transfer in Haryana vs Punjab?",
    a: "Yes in Haryana, and no slab fee in Punjab. In Haryana, you pay a slab SRO fee capped at ₹50,000 under Order S.O. 65 dated October 3, 2018. In Punjab, Orders S.O. 47 and S.O. 48 dated November 2, 2015 waive both SRO fees and Social Cess, leaving only small office charges of about ₹900.",
  },
  {
    q: "Are maternal grandchildren (daughter's children) eligible in Haryana?",
    a: "Yes. In July 2026 (printed in the Haryana Gazette on August 13, 2026), the Haryana Revenue Dept fixed its 2014 Hindi text. It added dohata-dohati and nati-natin (daughter's children) next to son's children. A daughter's kids now get the exact same 0% stamp duty waiver across Haryana.",
  },
  {
    q: "Does a daughter-in-law qualify for the 0% blood relation transfer in Haryana or Punjab?",
    a: "No. Neither Haryana nor Punjab lists a daughter-in-law or son-in-law as a direct blood relative in their 2014 waiver orders. A direct transfer from a parent-in-law to a daughter-in-law pays full stamp duty and SRO fees. Families often gift first to their son, who can later pass title to his wife.",
  },
  {
    q: "Did Punjab bring back 2.5% stamp duty on blood relation transfers?",
    a: "No. In February 2025, Punjab planned a 1% to 2.5% stamp duty on family land and home transfers. After strong public and farmer protests, the state put that plan on hold. The 0% stamp duty waiver stays live, though you should always check live fees on igrpunjab.gov.in before paying.",
  },
  {
    q: "Is income tax payable on land or a flat received via a blood relation deed?",
    a: "No. Under Section 56(2)(x) of the Income Tax Act, 1961, land or a flat gifted by parents, children, spouses, siblings, or grandparents is 100% tax free. Note that under Section 64, if a husband gifts a rented home to his wife for free, the rent stays taxed in the husband's return.",
  },
  {
    q: "Can an old parent cancel a blood relation deed if children stop caring for them?",
    a: "Yes, if the deed includes a clear care term. Under Section 23 of the Senior Citizens Act, 2007, a Tribunal can void a gift or transfer deed if the child neglects the parent. Based on Sudesh Chhikara (2022) and Urmila Dixit (2025), parents should write a clear care clause right inside the deed.",
  },
  {
    q: "Should parents in Haryana or Punjab use a Blood Relation Deed or a Registered Will?",
    a: "A Blood Relation Transfer Deed shifts title right away and is hard to undo once signed. A Registered Will costs zero stamp duty, keeps 100% control in your name for life, and can be changed anytime. Pick a Transfer Deed only if you must hand over title today. For most senior parents, a Registered Will is far safer.",
  },
];

export default function HaryanaPunjabBloodRelationClient() {
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

  // Interactive Calculator State
  const [selectedState, setSelectedState] = useState<StateCode>("haryana");
  const [zone, setZone] = useState<ZoneType>("urban");
  const [relationId, setRelationId] = useState<RelationId>("parent_to_child");
  const [gender, setGender] = useState<GenderCategory>("male");
  const [deedMode, setDeedMode] = useState<DeedMode>("transfer_deed");
  const [propertyValue, setPropertyValue] = useState<number>(10000000); // Default ₹1 Crore

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
    setSelectedState("haryana");
    setZone("urban");
    setRelationId("parent_to_child");
    setGender("male");
    setDeedMode("transfer_deed");
    setPropertyValue(10000000);
  };

  // =========================================================================
  // ACCURATE STATUTORY CALCULATION ENGINE (HARYANA & PUNJAB)
  // =========================================================================
  const safeValue = Math.max(0, Number.isFinite(propertyValue) ? propertyValue : 0);
  const currentRelation =
    RELATION_OPTIONS.find((r) => r.id === relationId) || RELATION_OPTIONS[0];

  const isEligibleBloodRelation =
    selectedState === "haryana"
      ? currentRelation.eligibleHaryana
      : currentRelation.eligiblePunjab;

  // Baseline Standard Non-Relative Stamp Duty Rate (%)
  // Haryana: Urban (incl. 2% MC duty) = 7% Male / 5% Female / 6% Joint; Rural = 5% Male / 3% Female / 4% Joint
  // Punjab: Urban (incl. 1% SIC/urban component) = 7% Male / 5% Female / 6% Joint; Rural = 6% Male / 4% Female / 5% Joint
  let standardStampRate = 7;
  if (selectedState === "haryana") {
    if (zone === "urban") {
      standardStampRate = gender === "male" ? 7 : gender === "female" ? 5 : 6;
    } else {
      standardStampRate = gender === "male" ? 5 : gender === "female" ? 3 : 4;
    }
  } else {
    if (zone === "urban") {
      standardStampRate = gender === "male" ? 7 : gender === "female" ? 5 : 6;
    } else {
      standardStampRate = gender === "male" ? 6 : gender === "female" ? 4 : 5;
    }
  }

  const standardStampDuty = Math.round((safeValue * standardStampRate) / 100);

  // Baseline Standard Registration Fee
  // Haryana: Slab table under S.O. 65/2018 capped at ₹50,000
  // Punjab: 1% capped at ₹2,00,000
  const haryanaSlab = getHaryanaRegistrationFee(safeValue);
  const standardRegFee =
    selectedState === "haryana"
      ? haryanaSlab.fee
      : Math.min(200000, Math.round(safeValue * 0.01));

  const standardTotalCost = standardStampDuty + standardRegFee;

  // Actual Payable Amounts Based on User Selection
  let payableStampDuty = 0;
  let payableStampRateLabel = "0%";
  let payableRegFee = 0;
  let payableRegFeeNote = "";
  let nominalAdminNote = "";

  if (deedMode === "registered_will") {
    payableStampDuty = 0;
    payableStampRateLabel = "0% (Exempt)";
    payableRegFee = 0;
    payableRegFeeNote = "Nominal fixed SRO Will fee only (no slab fee on estate value)";
    nominalAdminNote =
      "Wills attract ₹0 stamp duty across India. Nominal SRO pasting and registration charges apply.";
  } else if (isEligibleBloodRelation) {
    payableStampDuty = 0;
    payableStampRateLabel = "0% (100% Remitted)";
    if (selectedState === "haryana") {
      payableRegFee = haryanaSlab.fee;
      payableRegFeeNote = `Haryana S.O. 65/2018 slab (${haryanaSlab.slabLabel})`;
      nominalAdminNote =
        "Minor Web-HALRIS and e-GRAS service charges (approx. ₹100 to ₹500) apply at the Tehsil.";
    } else {
      payableRegFee = 0;
      payableRegFeeNote = "Waived under Punjab S.O. 47 & S.O. 48 (Nov 2, 2015)";
      nominalAdminNote =
        "Only nominal pasting and facilitation charges (approx. ₹900) apply at the Punjab SRO.";
    }
  } else {
    payableStampDuty = standardStampDuty;
    payableStampRateLabel = `${standardStampRate}% (Standard Rate)`;
    payableRegFee = standardRegFee;
    payableRegFeeNote =
      selectedState === "haryana"
        ? `Haryana S.O. 65/2018 slab (${haryanaSlab.slabLabel})`
        : "1% standard Punjab registration fee (capped at ₹2,00,000)";
    nominalAdminNote =
      selectedState === "haryana"
        ? "Verify live municipal duty and circle rate on jamabandi.nic.in before paying."
        : "Additional local PIDB or urban development levies may appear on igrpunjab.gov.in.";
  }

  const totalPayable = payableStampDuty + payableRegFee;
  const totalSavings = Math.max(0, standardTotalCost - totalPayable);
  const savingsPercent =
    standardTotalCost > 0 ? Math.round((totalSavings / standardTotalCost) * 100) : 0;

  // Dynamic Result Headlines & Legal Analysis
  let resultHeadline = "Eligible: 0% Stamp Duty Blood Relation Transfer";
  let resultBadge =
    selectedState === "haryana"
      ? "Haryana S.O. 62/2014 Eligible"
      : "Punjab S.O. 28 & 47-48 Eligible";
  let resultStatusTone: "emerald" | "rose" | "amber" = "emerald";
  let legalExplanation = "";
  let recommendedAction = "";

  if (deedMode === "registered_will") {
    resultHeadline = "Registered Will: ₹0 Stamp Duty & 100% Lifetime Control";
    resultBadge = "Indian Succession Act, 1925";
    resultStatusTone = "emerald";
    legalExplanation =
      "A Will carries ₹0 stamp duty in both Haryana and Punjab regardless of relationship or market value. Unlike a Transfer Deed, you stay the sole owner for life, collect all rent, and can update or cancel the Will anytime.";
    recommendedAction =
      "Draft a clear Will with two witnesses and register it at your local Tehsil SRO so heirs get smooth Intkal Virasat mutation later.";
  } else if (isEligibleBloodRelation) {
    resultStatusTone = "emerald";
    if (selectedState === "haryana") {
      if (relationId === "maternal_grandchild") {
        resultHeadline = "Eligible in Haryana: 0% Stamp Duty (Aug 2026 Order)";
        resultBadge = "Haryana Aug 2026 Corrigendum";
        legalExplanation =
          "Under Haryana Notification S.O. 62 (June 16, 2014) and the July 24 / August 13, 2026 Gazette Corrigendum, daughter's children (dohata-dohati / nati-natin) enjoy the full 0% stamp duty waiver. Only the Haryana slab registration fee (capped at ₹50,000) applies.";
      } else {
        resultHeadline = "Eligible in Haryana: 0% Stamp Duty + Slab SRO Fee";
        resultBadge = "Haryana S.O. 62/2014 Eligible";
        legalExplanation =
          "Haryana Notification No. S.O. 62/C.A.2/1899/S.9/2014 waives 100% stamp duty on lifetime transfers made without cash payment to listed blood relatives and spouses. You still pay the Section 78 slab registration fee via e-GRAS, capped at ₹50,000.";
      }
      recommendedAction =
        "Check your district circle rate on jamabandi.nic.in, pay the slab registration fee via e-GRAS, and book a Web-HALRIS appointment.";
    } else {
      resultHeadline = "Eligible in Punjab: 0% Stamp Duty & ₹0 Reg. Fee";
      resultBadge = "Punjab S.O. 28 & 47-48 Waiver";
      legalExplanation =
        "Punjab Notification S.O. 28 (May 7, 2014) waives 100% stamp duty. Notifications S.O. 47 and S.O. 48 (November 2, 2015) waive both registration fees and Social Infrastructure Cess. Punjab deferred its February 2025 hike plan, keeping the zero-duty rule active.";
      recommendedAction =
        "Confirm live circle rate and nominal pasting fees (~₹900) on igrpunjab.gov.in, execute the Transfer Deed with two witnesses, and file Intkal.";
    }
  } else {
    resultStatusTone = "rose";
    if (relationId === "in_law") {
      resultHeadline = "Not Eligible: Daughter-in-Law / Son-in-Law Excluded";
      resultBadge = "Full Standard Duty Applies";
      legalExplanation =
        "Both Haryana S.O. 62/2014 and Punjab S.O. 28/2014 exclude daughters-in-law and sons-in-law from the 0% blood relation transfer list. A direct deed attracts full standard stamp duty and registration fees.";
      recommendedAction =
        "Lawful option: Transfer first to your son or daughter at 0% stamp duty, or leave the home to your daughter-in-law via a Registered Will at ₹0 stamp duty.";
    } else if (relationId === "uncle_nephew") {
      resultHeadline = "Not Eligible: Extended Relatives Pay Full Duty";
      resultBadge = "Excluded Under State Orders";
      legalExplanation =
        "Uncles, aunts, nephews, and nieces are outside the strict family list in Haryana and Punjab notifications. Standard conveyance or gift stamp duty and registration fees apply at the SRO.";
      recommendedAction =
        "Verify whether a Registered Will (₹0 stamp duty) suits your goal better than paying lakhs in lifetime gift duty.";
    } else {
      resultHeadline = "Not Eligible: Non-Relative Transfer Pays Full Duty & Tax";
      resultBadge = "Full Duty + Section 56(2)(x) Tax";
      legalExplanation =
        "Transfers to cousins, friends, trusts, or companies do not get blood relation relief in Haryana or Punjab. Worse, receiving property worth over ₹50,000 from a non-relative triggers income tax at slab rates under Section 56(2)(x).";
      recommendedAction =
        "Speak with a property lawyer and CA before signing. A Will bequest is exempt from both stamp duty and Section 56(2)(x) income tax.";
    }
  }

  // Tax & Elder Care Alerts
  let taxAlertText =
    "100% Income Tax Exempt under Section 56(2)(x) of the Income Tax Act, 1961 (no gift tax in recipient's hands).";
  if (deedMode === "registered_will") {
    taxAlertText =
      "100% Income Tax Exempt under Section 56(2)(x) proviso for inheritance under a Will, even for non-relatives or in-laws.";
  } else if (!currentRelation.itExempt) {
    taxAlertText =
      "Income Tax Alert: Recipient is NOT a Section 56(2)(x) relative. Full circle rate value above ₹50,000 is taxable as recipient's income.";
  } else if (currentRelation.clubbingRisk) {
    taxAlertText =
      "Section 64 Clubbing Alert: Gift is exempt at transfer under Section 56(2)(x), but future rent or gains from a spouse or daughter-in-law transfer are taxed in the donor's return.";
  }

  const copyClauseToClipboard = () => {
    const clauseText = `SECTION 23 SENIOR CITIZENS ACT SAFEGUARD CLAUSE FOR BLOOD RELATION TRANSFER DEED
"This Transfer Deed is executed by the Transferor(s) out of natural love and affection without any monetary consideration, expressly subject to the binding condition under Section 23(1) of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007 that the Transferee shall provide basic amenities, residence, medical care, and physical needs to the Transferor(s) throughout their lifetime.

In the event the Transferee neglects, refuses, or fails to maintain the Transferor(s), this Transfer Deed shall be deemed to have been obtained by fraud, coercion, or undue influence and shall be voidable at the option of the Transferor(s) before the competent Maintenance Tribunal, with full restoration of title and peaceful possession."`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `HARYANA & PUNJAB BLOOD RELATION TRANSFER DEED DOCUMENT CHECKLIST
1. Original Title Deed (Registered Sale Deed / Allotment Letter / Conveyance Deed).
2. Latest Jamabandi / Fard copy (from jamabandi.nic.in or jamabandi.punjab.gov.in).
3. Proof of Blood Relation: Birth Certificate, Class 10 Marksheet, Passport, or Haryana Parivar Pehchan Patra (PPP) matching lineage.
4. PAN Card and Aadhaar Card of Transferor (Donor) and Transferee (Donee).
5. Two independent adult witnesses with valid Aadhaar and PAN cards.
6. Latest Municipal Property Tax receipt / No Dues Certificate (NDC) for urban MC properties.
7. Haryana: e-GRAS Registration Fee Challan & Web-HALRIS appointment token (plus Urban NDC / Property ID).
8. Punjab: IGR Punjab NGDRS appointment slip, e-Stamp / pasting fee receipt, and site plan / Aks Shajra if required.
9. Passport-size photographs of Transferor, Transferee, and both witnesses.`;
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
            <span>INDIAN STAMP ACT, 1899 • HARYANA S.O. 62/2014 &amp; PUNJAB S.O. 28/2014</span>
          </div>

          {/* Strict Single H1 Tag (53 chars decoded, 0 em-dashes, distinct from title) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Haryana &amp; Punjab Blood Relation Stamp Duty Calculator
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Calculate your exact 0% stamp duty savings and SRO registration fees in Haryana and
            Punjab. Check eligible blood relatives, Haryana&rsquo;s ₹50,000 fee cap, and Punjab&rsquo;s
            zero-fee waivers in seconds.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Duty &amp; Savings</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Fight-Proof Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">0% Stamp Duty</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ELIGIBLE BLOOD RELATIVES
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹50,000 Cap</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                HARYANA SRO SLAB FEE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹0 Reg. Fee</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                PUNJAB S.O. 47 &amp; 48 WAIVER
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Aug 2026 Order</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                DAUGHTER&rsquo;S KIDS INCLUDED
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
                <span>Verified Legal Basis</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Based on Haryana S.O. 62/2014, Aug 2026 Corrigendum, S.O. 65/2018, and Punjab S.O.
                28/2014 with S.O. 47 &amp; 48/2015 orders.
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
                <span>EXECUTIVE BRIEF: HARYANA &amp; PUNJAB BLOOD RELATION DUTY</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Haryana Cost Rule:</strong> Stamp duty is <strong>0%</strong> for listed
                    blood relatives under Notification S.O. 62 (June 16, 2014). However, you still
                    pay a slab registration fee up to <strong>₹50,000</strong> under S.O. 65/2018.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Punjab Cost Rule:</strong> Stamp duty is <strong>0%</strong> (S.O.
                    28/2014), and both registration fees and Social Infrastructure Cess are{" "}
                    <strong>₹0</strong> (S.O. 47 &amp; 48/2015). Only minor pasting and office fees
                    of about ₹900 apply.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Haryana August 2026 Update:</strong> A Gazette corrigendum published on
                    August 13, 2026 clarified that a daughter&rsquo;s children (
                    <em>dohata-dohati / nati-natin</em>) get the exact same 0% stamp duty relief as
                    a son&rsquo;s children.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Key Exclusion Trap:</strong> Neither state grants the 0% waiver to a{" "}
                    <strong>daughter-in-law, son-in-law, uncle, aunt, nephew, or cousin</strong>.
                    Direct transfers to them attract full 3% to 7% stamp duty.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (STRICTLY THE SINGLE H2 ON THIS PAGE) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LEGAL FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Haryana &amp; Punjab Blood Relation Transfer Duty Law
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Haryana and Punjab offer two of the best family land transfer rules in India. Both
                  states cut stamp duty to <strong>0%</strong> when an owner gives a home, plot, or
                  farm land to close kin during their life with no cash price.
                </p>
                <p>
                  This rule comes from <strong>Section 9(1)(a) of the Indian Stamp Act, 1899</strong>.
                  That law lets a State waive stamp duty by public order. Haryana passed its order
                  on June 16, 2014. Punjab passed its order on May 7, 2014.
                </p>
                <p>
                  Even at 0% stamp duty, you must sign and file a written{" "}
                  <strong>Transfer Deed or Gift Deed</strong> at the Sub-Registrar Office (SRO).
                  Under <strong>Section 123 of the Transfer of Property Act, 1882</strong> and{" "}
                  <strong>Section 17 of the Registration Act, 1908</strong>, an oral or unfiled gift
                  of a house or land is not valid in law.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR TOOL */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE STAMP DUTY &amp; SRO FEE ENGINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Blood Relation Stamp Duty &amp; SRO Fee Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Pick your state, zone, family link, and circle rate value below. See your exact
                stamp duty, SRO registration fee, tax alerts, and savings against a standard sale.
              </p>

              {/* Calculator Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Input 1 & 2: State + Urban/Rural Zone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#C65378]" />
                      <span>Step 1: Select State Jurisdiction</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        {
                          id: "haryana" as StateCode,
                          label: "Haryana",
                          desc: "Jamabandi / Web-HALRIS",
                        },
                        {
                          id: "punjab" as StateCode,
                          label: "Punjab",
                          desc: "IGR Punjab / NGDRS",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedState(opt.id)}
                          className={`text-left p-3.5 rounded-2xl border transition-all ${
                            selectedState === opt.id
                              ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                          }`}
                        >
                          <div className="font-extrabold text-sm text-slate-900">{opt.label}</div>
                          <div className="text-[11px] text-slate-600 mt-0.5">{opt.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#C65378]" />
                      <span>Step 2: Property Location Zone</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        {
                          id: "urban" as ZoneType,
                          label: "Urban (MC Limits)",
                          desc: "City flat, plot, HUDA / GMADA",
                        },
                        {
                          id: "rural" as ZoneType,
                          label: "Rural / Farm Land",
                          desc: "Village land outside MC limits",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setZone(opt.id)}
                          className={`text-left p-3.5 rounded-2xl border transition-all ${
                            zone === opt.id
                              ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                          }`}
                        >
                          <div className="font-extrabold text-sm text-slate-900">{opt.label}</div>
                          <div className="text-[11px] text-slate-600 mt-0.5">{opt.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Input 3: Relationship Selection */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C65378]" />
                    <span>Step 3: Select Relationship Between Donor and Recipient</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {RELATION_OPTIONS.map((option) => {
                      const isRelEligible =
                        selectedState === "haryana"
                          ? option.eligibleHaryana
                          : option.eligiblePunjab;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setRelationId(option.id)}
                          className={`text-left p-3.5 rounded-2xl border transition-all ${
                            relationId === option.id
                              ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-extrabold text-xs text-slate-900">
                              {option.label}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                                isRelEligible
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : "bg-rose-50 text-rose-700 border border-rose-200"
                              }`}
                            >
                              {isRelEligible ? "0% Duty" : "Full Duty"}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-600 mt-1 leading-snug">
                            {option.desc}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Input 4 & 5: Recipient Gender + Deed Mode */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-[#C65378]" />
                      <span>Step 4: Recipient Gender (For Savings Check)</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { id: "male" as GenderCategory, label: "Male" },
                        { id: "female" as GenderCategory, label: "Female" },
                        { id: "joint" as GenderCategory, label: "Joint (M+F)" },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setGender(opt.id)}
                          className={`text-center py-3 px-2 rounded-xl border text-xs font-bold transition-all ${
                            gender === opt.id
                              ? "border-[#C65378] bg-rose-50/50 text-[#172228]"
                              : "border-slate-200 text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#C65378]" />
                      <span>Step 5: Transfer Instrument Type</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        {
                          id: "transfer_deed" as DeedMode,
                          label: "Transfer / Gift Deed",
                          desc: "Lifetime handover",
                        },
                        {
                          id: "registered_will" as DeedMode,
                          label: "Registered Will",
                          desc: "Post-death, revocable",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setDeedMode(opt.id)}
                          className={`text-left p-2.5 rounded-xl border transition-all ${
                            deedMode === opt.id
                              ? "border-[#C65378] bg-rose-50/50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="font-bold text-xs text-slate-900">{opt.label}</div>
                          <div className="text-[10px] text-slate-600">{opt.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Input 6: Property Value (Circle / Collector Rate) */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label
                      htmlFor="property-value-input"
                      className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2"
                    >
                      <IndianRupee className="w-4 h-4 text-[#C65378]" />
                      <span>Step 6: Property Value (Higher of Circle Rate or Market Value)</span>
                    </label>
                    <div className="text-sm font-black text-[#C65378]">
                      {formatINR(safeValue)} ({formatCompactINR(safeValue)})
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_200px] gap-4 items-center">
                    <input
                      type="range"
                      aria-label="Property valuation slider"
                      min={500000}
                      max={50000000}
                      step={100000}
                      value={Math.min(50000000, Math.max(500000, safeValue))}
                      onChange={(e) => setPropertyValue(Number(e.target.value))}
                      className="w-full accent-[#C65378] h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold">
                        ₹
                      </span>
                      <input
                        id="property-value-input"
                        type="number"
                        min={50000}
                        max={1000000000}
                        step={50000}
                        value={safeValue}
                        onChange={(e) => setPropertyValue(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#C65378]"
                      />
                    </div>
                  </div>

                  {/* Quick Value Preset Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-500">Quick presets:</span>
                    {[
                      { label: "₹25 Lakh", val: 2500000 },
                      { label: "₹50 Lakh", val: 5000000 },
                      { label: "₹1 Crore", val: 10000000 },
                      { label: "₹2 Crore", val: 20000000 },
                      { label: "₹5 Crore", val: 50000000 },
                    ].map((preset) => (
                      <button
                        key={preset.val}
                        type="button"
                        onClick={() => setPropertyValue(preset.val)}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                          safeValue === preset.val
                            ? "bg-[#172228] text-white border-[#172228]"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
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
                    <span>Reset Calculator to Default</span>
                  </button>
                </div>

                {/* =========================================================================
                    DYNAMIC RESULTS CARD (Brand Navy Gradient - Exact Reference Match)
                    ========================================================================= */}
                <div className="rounded-3xl border-2 border-[#172228] bg-gradient-to-br from-slate-900 via-[#172228] to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/15">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                        {selectedState === "haryana"
                          ? "HARYANA REVENUE & REGISTRATION RESULT"
                          : "PUNJAB REVENUE & IGR REGISTRATION RESULT"}
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-1">
                        {resultHeadline}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white shrink-0 self-start sm:self-auto">
                      {resultStatusTone === "emerald" ? (
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400" />
                      )}
                      <span>{resultBadge}</span>
                    </div>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        PAYABLE STAMP DUTY
                      </div>
                      <div
                        className={`text-xl sm:text-2xl font-black ${
                          payableStampDuty === 0 ? "text-emerald-400" : "text-rose-300"
                        }`}
                      >
                        {formatINR(payableStampDuty)}
                      </div>
                      <div className="text-[11px] text-slate-300">{payableStampRateLabel}</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        SRO REGISTRATION FEE
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white">
                        {formatINR(payableRegFee)}
                      </div>
                      <div className="text-[11px] text-slate-300 leading-snug">
                        {payableRegFeeNote}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        TOTAL SAVINGS VS SALE DEED
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-emerald-400">
                        {formatINR(totalSavings)}
                      </div>
                      <div className="text-[11px] text-slate-300">
                        {savingsPercent}% saved vs {formatINR(standardTotalCost)} standard cost
                      </div>
                    </div>
                  </div>

                  {/* Itemized Breakdown Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                      <div className="font-bold text-rose-200 uppercase tracking-wider text-[10px]">
                        YOUR SELECTED TRANSFER BREAKDOWN
                      </div>
                      <div className="flex justify-between text-slate-200">
                        <span>Property Value (Circle / Market)</span>
                        <span className="font-bold text-white">{formatINR(safeValue)}</span>
                      </div>
                      <div className="flex justify-between text-slate-200">
                        <span>Stamp Duty Payable</span>
                        <span className="font-bold text-white">{formatINR(payableStampDuty)}</span>
                      </div>
                      <div className="flex justify-between text-slate-200">
                        <span>SRO Registration Fee</span>
                        <span className="font-bold text-white">{formatINR(payableRegFee)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-black text-emerald-300">
                        <span>Estimated Statutory Outflow</span>
                        <span>{formatINR(totalPayable)}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                      <div className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
                        STANDARD NON-RELATIVE BENCHMARK ({zone.toUpperCase()} / {gender.toUpperCase()})
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Standard Stamp Duty ({standardStampRate}%)</span>
                        <span className="font-bold text-white">{formatINR(standardStampDuty)}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Standard Registration Fee</span>
                        <span className="font-bold text-white">{formatINR(standardRegFee)}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Standard Total Outflow</span>
                        <span className="font-bold text-white">{formatINR(standardTotalCost)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-white/10 text-xs text-amber-200">
                        <span>Note:</span>
                        <span className="text-right max-w-[75%]">{nominalAdminNote}</span>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Legal & Tax Rationale */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#C65378]" />
                      <span>Statutory &amp; Income Tax Analysis:</span>
                    </div>
                    <p>{legalExplanation}</p>
                    <p className="text-xs text-amber-200/95">
                      <strong>Income Tax Rule:</strong> {taxAlertText}
                    </p>
                    <div className="pt-2 text-emerald-300 font-semibold border-t border-white/10">
                      <strong>Next Step:</strong> {recommendedAction}
                    </div>
                  </div>

                  {/* Tool Action Conversion */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-300 text-center sm:text-left">
                      Want ₹0 stamp duty while keeping 100% lifetime control over your home?
                    </div>
                    <button
                      onClick={handleStartDraft}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Draft Your Will Online in 15 Mins</span>
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
                  <span>HARYANA &amp; PUNJAB FAMILY PROPERTY TRANSFER GUIDE</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  S.O. 62/2014 &amp; S.O. 28/2014
                </span>
              </div>
              <div className="relative w-full aspect-[1200/630] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/haryana-punjab-blood-relation-transfer-stamp-duty-calculator-og.jpg"
                  alt="Haryana and Punjab Blood Relation Transfer Stamp Duty Calculator Guide"
                  width={1200}
                  height={630}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center pt-1">
                Compare 0% stamp duty transfers across Gurugram, Faridabad, Panchkula, Mohali,
                Ludhiana, Amritsar, and rural revenue estates.
              </p>
            </div>

            {/* SECTION 3: HARYANA RULES & REGISTRATION FEE SLAB TABLE */}
            <section id="haryana-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>HARYANA REVENUE NOTIFICATIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Haryana Rules: S.O. 62/2014 &amp; Aug 2026 Order
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  On <strong>June 16, 2014</strong>, the Haryana Revenue and Disaster Management
                  Department issued <strong>Notification No. S.O. 62/C.A.2/1899/S.9/2014</strong>.
                  This order waives 100% of stamp duty on lifetime property transfers within the
                  family without cash payment.
                </p>
                <p>
                  The waiver covers parents, children, grandchildren, brothers, sisters, and
                  spouses. It applies to urban flats in Gurugram, Faridabad, Panchkula, and Sonipat
                  as well as rural agricultural land across Haryana.
                </p>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Haryana August 2026 Gazette Corrigendum (Daughter&rsquo;s Children)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    For years, the Hindi text of the 2014 order used only{" "}
                    <em>pautra-pautri</em> (son&rsquo;s children). Several Tehsils denied the 0%
                    waiver to maternal grandchildren. On <strong>July 24, 2026</strong> (gazetted{" "}
                    <strong>August 13, 2026</strong>), Haryana added{" "}
                    <em>dohata-dohati / nati-natin</em>. Grandchildren through daughters now get
                    equal 0% stamp duty rights across the state.
                  </p>
                </div>

                <p>
                  Zero stamp duty in Haryana does not mean zero SRO cost. Under{" "}
                  <strong>Notification No. S.O. 65/C.A.16/1908/SS.78 and 79/2018</strong> dated{" "}
                  <strong>October 3, 2018</strong>, Haryana levies a slab-based registration fee
                  capped at <strong>₹50,000</strong> based on the higher of market or collector rate:
                </p>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                  <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                    <thead className="bg-[#172228] text-white">
                      <tr>
                        <th className="p-3 sm:p-3.5 font-extrabold">Property Value Slab (Collector Rate)</th>
                        <th className="p-3 sm:p-3.5 font-extrabold text-rose-200">
                          Haryana Registration Fee
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {HARYANA_REG_SLABS.map((slab) => (
                        <tr key={slab.label} className="hover:bg-slate-50/60">
                          <td className="p-3 sm:p-3.5 font-semibold text-slate-900">
                            {slab.label}
                          </td>
                          <td className="p-3 sm:p-3.5 font-bold text-[#172228]">
                            {formatINR(slab.fee)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 4: PUNJAB RULES */}
            <section id="punjab-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>PUNJAB REVENUE NOTIFICATIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Punjab Rules: S.O. 28/2014 &amp; S.O. 47-48/2015
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Punjab pioneered the blood relation transfer waiver on{" "}
                  <strong>May 7, 2014</strong> through{" "}
                  <strong>Notification No. S.O. 28/C.A.2/1899/S.9/2014</strong>. That order reduced
                  stamp duty to <strong>0%</strong> on lifetime family property transfers.
                </p>
                <p>
                  At first, Punjab still charged registration fees and local cesses. To fix that,
                  Punjab issued two companion orders on <strong>November 2, 2015</strong>:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>
                    <strong>Notification S.O. 47/C.A.XVI/1908/Ss.78 and 79/2015:</strong> Waived the{" "}
                    <strong>1% Registration Fee</strong> for property transfers between spouses and
                    listed blood relatives.
                  </li>
                  <li>
                    <strong>Notification S.O. 48/C.A.2/1899/S.9/2015:</strong> Remitted the{" "}
                    <strong>Social Infrastructure Cess</strong> and linked additional stamp levies
                    on those family deeds.
                  </li>
                </ul>
                <div className="rounded-2xl bg-amber-50/60 border border-amber-200 p-4 text-xs text-amber-950 space-y-2">
                  <div className="font-extrabold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>February 2025 Punjab Hike Proposal Status</span>
                  </div>
                  <p className="leading-relaxed">
                    In February 2025, Punjab proposed a 1% to 2.5% stamp duty on blood relation
                    transfers. After strong pushback from farmer groups and citizens, the state put
                    that plan on hold. The 0% waiver stays active, with only minor pasting and
                    facilitation charges (about ₹900) at the SRO. Always check live challan totals
                    on <strong>igrpunjab.gov.in</strong> before booking your slot.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: ELIGIBLE VS EXCLUDED RELATIVES MATRIX */}
            <section id="eligibility-matrix" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>BLOOD RELATION ELIGIBILITY MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Eligible vs Excluded Relatives Matrix
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Sub-Registrars apply the state notification list strictly. Check who qualifies for
                0% stamp duty and how Income Tax Section 56(2)(x) treats each relationship:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3 sm:p-4 font-extrabold">Relationship</th>
                      <th className="p-3 sm:p-4 font-extrabold text-emerald-300">Haryana Duty</th>
                      <th className="p-3 sm:p-4 font-extrabold text-emerald-300">Punjab Duty</th>
                      <th className="p-3 sm:p-4 font-extrabold text-rose-200">Income Tax Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Parents &amp; Children</td>
                      <td className="p-3 sm:p-4 text-emerald-700 font-bold">0% (+ Slab Fee)</td>
                      <td className="p-3 sm:p-4 text-emerald-700 font-bold">0% (+ ₹0 Reg Fee)</td>
                      <td className="p-3 sm:p-4">Exempt u/s 56(2)(x)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Husband &amp; Wife</td>
                      <td className="p-3 sm:p-4 text-emerald-700 font-bold">0% (+ Slab Fee)</td>
                      <td className="p-3 sm:p-4 text-emerald-700 font-bold">0% (+ ₹0 Reg Fee)</td>
                      <td className="p-3 sm:p-4 text-amber-800 font-semibold">
                        Exempt; Sec 64 clubbing applies
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3 sm:p-4 font-bold text-slate-900">Brothers &amp; Sisters</td>
                      <td className="p-3 sm:p-4 text-emerald-700 font-bold">0% (+ Slab Fee)</td>
                      <td className="p-3 sm:p-4 text-emerald-700 font-bold">0% (+ ₹0 Reg Fee)</td>
                      <td className="p-3 sm:p-4">Exempt u/s 56(2)(x)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3 sm:p-4 font-bold text-slate-900">
                        Grandchildren (Son&rsquo;s &amp; Daughter&rsquo;s)
                      </td>
                      <td className="p-3 sm:p-4 text-emerald-700 font-bold">
                        0% (Aug 2026 Order)
                      </td>
                      <td className="p-3 sm:p-4 text-emerald-700 font-bold">0% (+ ₹0 Reg Fee)</td>
                      <td className="p-3 sm:p-4">Exempt u/s 56(2)(x)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3 sm:p-4 font-bold text-slate-900">
                        Daughter-in-Law / Son-in-Law
                      </td>
                      <td className="p-3 sm:p-4 text-rose-700 font-bold">Full 3% to 7%</td>
                      <td className="p-3 sm:p-4 text-rose-700 font-bold">Full 4% to 7% + 1%</td>
                      <td className="p-3 sm:p-4 text-amber-800 font-semibold">
                        Exempt; Sec 64 clubbing for DIL
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3 sm:p-4 font-bold text-slate-900">
                        Uncle, Aunt, Nephew, Niece
                      </td>
                      <td className="p-3 sm:p-4 text-rose-700 font-bold">Full 3% to 7%</td>
                      <td className="p-3 sm:p-4 text-rose-700 font-bold">Full 4% to 7% + 1%</td>
                      <td className="p-3 sm:p-4">
                        Exempt only for parent&rsquo;s siblings (not nephew)
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3 sm:p-4 font-bold text-slate-900">
                        Cousins, Friends, Companies
                      </td>
                      <td className="p-3 sm:p-4 text-rose-700 font-bold">Full 3% to 7%</td>
                      <td className="p-3 sm:p-4 text-rose-700 font-bold">Full 4% to 7% + 1%</td>
                      <td className="p-3 sm:p-4 text-rose-700 font-bold">
                        Taxable at slab rate (&gt;₹50K)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 6: HARYANA VS PUNJAB COMPARISON TABLE */}
            <section id="state-comparison" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>SIDE-BY-SIDE STATE MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Haryana vs Punjab Stamp Duty Comparison Table
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Compare exact rates, registration fee ceilings, and online portals side by side
                across Haryana and Punjab:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 sm:p-4 font-extrabold">Parameter</th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-rose-200">Haryana</th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-emerald-300">Punjab</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        Blood Relation Stamp Duty
                      </td>
                      <td className="p-3.5 sm:p-4 font-bold text-emerald-700">
                        0% (S.O. 62 dated June 16, 2014)
                      </td>
                      <td className="p-3.5 sm:p-4 font-bold text-emerald-700">
                        0% (S.O. 28 dated May 7, 2014)
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        Blood Relation Reg. Fee
                      </td>
                      <td className="p-3.5 sm:p-4 text-amber-800 font-bold">
                        Slab-based: ₹100 to ₹50,000 cap (S.O. 65/2018)
                      </td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">
                        ₹0 Reg Fee &amp; ₹0 SIC (S.O. 47 &amp; 48/2015)
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        Standard Urban Duty (Non-Relative)
                      </td>
                      <td className="p-3.5 sm:p-4">7% Male, 5% Female, 6% Joint (incl. 2% MC)</td>
                      <td className="p-3.5 sm:p-4">7% Male, 5% Female, 6% Joint (incl. SIC)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        Standard Rural Duty (Non-Relative)
                      </td>
                      <td className="p-3.5 sm:p-4">5% Male, 3% Female, 4% Joint</td>
                      <td className="p-3.5 sm:p-4">6% Male, 4% Female, 5% Joint</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        Standard Reg. Fee Cap
                      </td>
                      <td className="p-3.5 sm:p-4">Slab-based up to ₹50,000 maximum</td>
                      <td className="p-3.5 sm:p-4">1% capped at ₹2,00,000</td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        Official Registration Portals
                      </td>
                      <td className="p-3.5 sm:p-4">jamabandi.nic.in (Web-HALRIS) &amp; e-GRAS</td>
                      <td className="p-3.5 sm:p-4">igrpunjab.gov.in (NGDRS) &amp; PLRS Jamabandi</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 7: TRANSFER DEED VS REGISTERED WILL */}
            <section id="transfer-vs-will" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>ESTATE PLANNING DECISION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Blood Relation Transfer Deed vs Registered Will
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Many parents rush into a 0% blood relation transfer to save future hassle. Before
                signing away your home today, weigh lifetime handover against a Registered Will:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
                  <thead className="bg-[#172228] text-white">
                    <tr>
                      <th className="p-3.5 sm:p-4 font-extrabold">Decision Factor</th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-rose-200">
                        Blood Transfer Deed
                      </th>
                      <th className="p-3.5 sm:p-4 font-extrabold text-emerald-300">
                        Registered Will
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">When Title Shifts</td>
                      <td className="p-3.5 sm:p-4 text-rose-700 font-semibold">
                        Immediately upon registration at SRO
                      </td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">
                        Only after the owner&rsquo;s lifetime
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Can You Cancel It?</td>
                      <td className="p-3.5 sm:p-4">
                        Normally irrevocable (Section 126 TPA), unless Section 23 applies
                      </td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">
                        Yes, modify or revoke anytime for life
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Stamp Duty Cost</td>
                      <td className="p-3.5 sm:p-4">0% for listed blood relatives only</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">
                        0% for ANY heir (including in-laws &amp; friends)
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">Haryana SRO Fee</td>
                      <td className="p-3.5 sm:p-4">Up to ₹50,000 slab fee</td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">
                        Nominal fixed Will registration fee
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/60">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                        Risk of Elder Neglect
                      </td>
                      <td className="p-3.5 sm:p-4 text-rose-700">
                        High if child turns hostile after getting title
                      </td>
                      <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">
                        Zero: you retain full rent, residence, and sale rights
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
                  <span>STILL DECIDING BETWEEN GIFT DEED AND WILL?</span>
                </div>
                <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Compare Gift Deed vs Will Stamp Duty &amp; Legal Safety Across India
                </div>
                <p className="text-xs text-slate-600">
                  Run a side-by-side cost, revocability, and Section 23 senior citizen risk check
                  before signing away your house.
                </p>
              </div>
              <Link
                href="/tools/gift-deed-vs-will-stamp-duty-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shrink-0 transition-transform hover:-translate-y-0.5 shadow-sm"
              >
                <span>Open Gift vs Will Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* SECTION 8: HIGH COURT & SUPREME COURT RULINGS */}
            <section id="court-rulings" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>LANDMARK JUDICIAL PRECEDENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. High Court Rulings &amp; Section 23 Safeguards
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Three key court rulings directly govern blood relation transfer deeds in Haryana
                  and Punjab. Every family should read them before going to the Tehsil:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      P&amp;H High Court (2023)
                    </div>
                    <div className="font-bold text-slate-900">
                      Sanjeev Gupta v. State of Punjab
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      In CWP No. 15361 of 2020 (decided Jan 11, 2023; SLP dismissed by SC), the
                      court quashed a Section 47-A stamp duty demand on a father-to-son transfer of
                      sole proprietorship land. Once registered, the SRO cannot arbitrarily reopen
                      duty.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Supreme Court (2022)
                    </div>
                    <div className="font-bold text-slate-900">
                      Sudesh Chhikara v. Ramti Devi
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Arising from a Gurugram, Haryana release deed, the Supreme Court held that to
                      cancel a deed under Section 23(1) of the Senior Citizens Act, a clear care
                      condition must be pleaded and proved. Do not leave this clause out.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="font-black uppercase tracking-wider text-[11px] text-[#C65378]">
                      Supreme Court (2025)
                    </div>
                    <div className="font-bold text-slate-900">
                      Urmila Dixit v. Sunil Sharan Dixit
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      In 2025 INSC 20 (Jan 2, 2025), the Supreme Court stressed liberal protection
                      for neglected parents. Tribunals under Section 23 can both void the gift deed
                      and order eviction to hand back physical possession.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP REGISTRATION & MUTATION GUIDE */}
            <section id="step-by-step-guide" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>TEHSIL &amp; ONLINE REGISTRATION SOP</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step Guide: Web-HALRIS &amp; IGR Punjab
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Follow these six steps to register your blood relation Transfer Deed cleanly and
                  complete Jamabandi mutation without objections:
                </p>
                <div className="space-y-3 pt-1">
                  {[
                    {
                      title: "Verify Circle Rate & Title Records",
                      desc: "Pull the latest Jamabandi / Fard and district Collector Rate from jamabandi.nic.in (Haryana) or igrpunjab.gov.in (Punjab). Confirm the transferor holds clear, loan-free title.",
                    },
                    {
                      title: "Clear Municipal Property Tax & NDC",
                      desc: "For urban properties in Haryana (HSVP / MC) or Punjab (GMADA / GLADA / MC), clear pending property tax and obtain the Property ID or No Dues Certificate (NDC).",
                    },
                    {
                      title: "Draft the Blood Relation Transfer Deed",
                      desc: "State clearly that the transfer is voluntary, out of natural love and affection, and without cash payment. Cite S.O. 62/2014 (Haryana) or S.O. 28/2014 (Punjab) and add a Section 23 care clause if parents are aged 60+.",
                    },
                    {
                      title: "Pay Applicable SRO Fees Online",
                      desc: "In Haryana, pay the Section 78 slab registration fee (up to ₹50,000) via e-GRAS. In Punjab, generate the zero-duty blood relation challan and nominal pasting fee (~₹900) on NGDRS / IGR Punjab.",
                    },
                    {
                      title: "Book Online Slot & Appear with 2 Witnesses",
                      desc: "Book your e-appointment on Web-HALRIS (Haryana) or IGR Punjab. Both donor and recipient must appear with original IDs, proof of blood relationship, and two adult witnesses for biometric capture.",
                    },
                    {
                      title: "Complete Mutation (Intkal) in Jamabandi",
                      desc: "Registration alone does not update revenue records. Submit the registered Transfer Deed to the Halqa Patwari or online portal so your Intkal (mutation) is sanctioned in the Jamabandi.",
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

            {/* SECTION 10: WORKED COST EXAMPLES */}
            <section id="worked-examples" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>PRACTICAL COST SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Worked Cost Examples: Gurugram, Mohali &amp; Rural
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
                {/* Example 1: Gurugram */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Gurugram Urban Flat</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                      Haryana
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Father Transfers ₹1.2 Crore Flat to Son
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Standard Cost:</strong> 7% Urban Male Stamp Duty (₹8,40,000) + ₹50,000
                    Registration Fee = ₹8,90,000.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Blood Relation Cost:</strong> ₹0 Stamp Duty (S.O. 62/2014) + ₹50,000
                    capped Registration Fee = <strong>₹50,000</strong>. Saves{" "}
                    <strong>₹8,40,000</strong>!
                  </p>
                </div>

                {/* Example 2: Mohali */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Mohali Urban Plot</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                      Punjab
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Mother Transfers ₹85 Lakh Plot to Daughter
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Standard Cost:</strong> 5% Urban Female Stamp Duty (₹4,25,000) + 1%
                    Registration Fee (₹85,000) = ₹5,10,000.
                  </p>
                  <p className="text-emerald-800 font-semibold leading-relaxed">
                    <strong>Blood Relation Cost:</strong> ₹0 Stamp Duty + ₹0 Registration Fee + ₹0
                    SIC (only ~₹900 admin fee). Saves <strong>₹5,10,000</strong>!
                  </p>
                </div>

                {/* Example 3: Daughter-in-Law Trap */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-black text-slate-900 text-xs">Ludhiana / Panipat</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold text-[10px]">
                      Exclusion Trap
                    </span>
                  </div>
                  <div className="font-bold text-slate-800">
                    Father-in-Law Gifts ₹60 Lakh Home to Daughter-in-Law
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Why It Fails:</strong> Daughter-in-law is excluded in both states. Full
                    5% Female Urban Duty (₹3,00,000) + Reg Fee (₹30,000 to ₹60,000) applies.
                  </p>
                  <p className="text-rose-700 font-semibold leading-relaxed">
                    <strong>Smarter Route:</strong> Use a Registered Will (₹0 stamp duty) or check
                    the lawful two-step spouse transfer route with counsel.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: DOCUMENT CHECKLIST & LEGAL CLAUSES */}
            <section id="documents-clauses" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>DRAFTING &amp; TEHSIL CHECKLIST</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Required Document Checklist &amp; Legal Clauses
              </h3>

              {/* Template Box 1: Section 23 Senior Citizens Act Safeguard Recital */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Section 23 Senior Citizens Act Care Clause for Transfer Deeds
                  </div>
                  <button
                    type="button"
                    onClick={copyClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors shrink-0"
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
{`"This Transfer Deed is executed by the Transferor(s) out of natural love and affection without any monetary consideration, expressly subject to the binding condition under Section 23(1) of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007 that the Transferee shall provide basic amenities, residence, medical care, and physical needs to the Transferor(s) throughout their lifetime.

In the event the Transferee neglects, refuses, or fails to maintain the Transferor(s), this Transfer Deed shall be deemed to have been obtained by fraud, coercion, or undue influence and shall be voidable at the option of the Transferor(s) before the competent Maintenance Tribunal, with full restoration of title and peaceful possession."`}
                </pre>
              </div>

              {/* Template Box 2: Required Documents Checklist */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900">
                    Mandatory SRO Documents: Haryana &amp; Punjab Blood Relation Transfer
                  </div>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors shrink-0"
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
                    "Original Sale Deed, Allotment Letter, or Conveyance Deed",
                    "Latest Jamabandi / Fard extract from revenue portal",
                    "Relationship Proof (Birth Certificate, Passport, or Haryana PPP)",
                    "PAN Card & Aadhaar Card of both Donor and Recipient",
                    "Two adult witnesses with valid Aadhaar & PAN Cards",
                    "Municipal Property Tax receipt / No Dues Certificate (NDC)",
                    "Haryana e-GRAS Fee Receipt or Punjab NGDRS Appointment Slip",
                    "Recent passport photos of both parties and witnesses",
                  ].map((doc, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg">
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
                12. Institutional Profile: Legal Excellence &amp; Trust
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Property Transfer &amp; Succession Desk
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Counsel</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is powered by AMA Legal Solutions. Our property and succession
                  lawyers assist resident and NRI families across Gurugram, Faridabad, Panchkula,
                  Chandigarh, Mohali, Ludhiana, and Amritsar with Transfer Deeds, Registered Wills,
                  and Jamabandi mutations.
                </p>

                {/* Service Grid Chips (All Verified Routes) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/gift-deed-drafting-registration"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between gap-2"
                  >
                    <span>Gift Deed Service</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                  </Link>
                  <Link
                    href="/services/property-mutation-dakhil-kharij-service"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between gap-2"
                  >
                    <span>Intkal Mutation Help</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                  </Link>
                  <Link
                    href="/templates/gift-deed-format-blood-relatives-india"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between gap-2"
                  >
                    <span>Gift Deed Format</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
                  </Link>
                  <Link
                    href="/tools/senior-citizen-section-23-gift-revocation-checker"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between gap-2"
                  >
                    <span>Section 23 Checker</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378] shrink-0" />
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
                13. Frequently Asked Questions: Transfer Duty
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

            {/* SECTION 14: STATUTORY CITATIONS & INTERNAL LINKS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>OFFICIAL PORTALS &amp; RELATED GUIDES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Legal Citations, Portals &amp; Related Guides
              </h3>
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-xs text-slate-600">
                <p>
                  Verify live collector rates, e-stamp challans, and statutory texts through these
                  official Indian government portals. General information on this page is not a
                  substitute for individual legal advice on your title papers.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://jamabandi.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Jamabandi Haryana (Web-HALRIS)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://igrpunjab.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>IGR Punjab (NGDRS Portal)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Indian Stamp Act, 1899</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.incometax.gov.in/iec/foportal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Income Tax Portal (Section 56)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Supreme Court of India Judgments</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Tools, Services &amp; State Guides
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/blogs/punjab-haryana-fard-badar-intkal-virasat-mutation-jamabandi-after-death"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Punjab &amp; Haryana Intkal Mutation Guide
                    </Link>
                    <Link
                      href="/tools/gift-deed-vs-will-stamp-duty-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Gift Deed vs Will Calculator
                    </Link>
                    <Link
                      href="/tools/uttar-pradesh-family-gift-deed-stamp-duty-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      UP ₹5,000 Gift Duty Calculator
                    </Link>
                    <Link
                      href="/tools/delhi-gift-deed-relinquishment-deed-stamp-duty-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Delhi Gift &amp; Relinquishment Tool
                    </Link>
                    <Link
                      href="/tools/ancestral-vs-self-acquired-property-classifier"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Ancestral vs Self-Acquired Classifier
                    </Link>
                    <Link
                      href="/services/family-settlement-deed-lawyer"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Family Settlement Deed Lawyer
                    </Link>
                    <Link
                      href="/services/will-registration"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Will Registration Service
                    </Link>
                    <Link
                      href="/templates/will-format-punjabi-vasiyatnama"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Punjabi Vasiyatnama Format
                    </Link>
                    <Link
                      href="/templates/revocation-of-gift-deed-senior-citizens-act-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Section 23 Gift Cancellation Format
                    </Link>
                    <Link
                      href="/locations/haryana"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Will Drafting in Haryana
                    </Link>
                    <Link
                      href="/locations/punjab"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Will Drafting in Punjab
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* BOTTOM PLAIN-ENGLISH SUMMARY STRIP (Matching Reference Page) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Check Rules First?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  One wrong choice can cost lakhs in stamp duty. Check if your kin is on the state
                  list before you draft a deed. Keep your land and home safe from tax traps.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Simple Will Alternative</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A Will needs zero stamp duty in both states. You keep full rights over your flat
                  and farm land for life. Sign it with two adult witnesses and change it anytime.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers review your Jamabandi, title chain, and tax risk. We draft clear
                  Transfer Deeds and Wills with care clauses so your family avoids court fights.
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
                Advises families across Haryana, Punjab, and Chandigarh on blood relation transfer
                deeds, Jamabandi mutations, Section 23 senior safeguards, and registered Wills.
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
                  <span>KEEP 100% LIFETIME OWNERSHIP</span>
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Transfer After Life at ₹0 Stamp Duty with a Will
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  Unsure about giving away your home right now? Draft a registered Will that keeps
                  full control in your hands for life.
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
                  <span>Lawyer Reviewed &amp; SRO Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (White / Rose Border) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>HARYANA &amp; PUNJAB PROPERTY DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need a Transfer Deed or Intkal Mutation Drafted?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our property advocates verify circle rates, draft Section 23 care clauses, and
                  guide Web-HALRIS and IGR Punjab registrations.
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
                  Why Families Rely on WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>2026 Gazette Updated:</strong> Covers Haryana&rsquo;s August 2026
                      maternal grandchild order and Punjab waivers.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Senior Safeguards Built In:</strong> Includes Section 23 maintenance
                      recitals backed by Supreme Court rulings.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Clear Tax Checks:</strong> Flags Section 56(2)(x) tax and Section 64
                      clubbing before you sign.
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
