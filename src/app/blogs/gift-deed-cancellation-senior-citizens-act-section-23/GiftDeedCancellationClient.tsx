"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  Scale,
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
  Info,
  ArrowUpRight,
  Heart,
  FileCheck,
  Gift,
  Home,
  AlertCircle,
  RefreshCw,
  X,
  FileSignature,
  DollarSign,
  TrendingDown,
  Zap,
  Clock,
  Eye,
  Layers,
  HeartHandshake,
  CheckSquare,
  UserCheck,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "executive-summary", label: "Executive Decision Brief" },
  { id: "section-23-framework", label: "1. Section 23 Protection" },
  { id: "urmila-dixit-ruling", label: "2. Supreme Court Urmila Dixit" },
  { id: "revocable-vs-irrevocable", label: "3. When Can Deeds Be Cancelled?" },
  { id: "maintenance-clause-sample", label: "4. Maintenance Clause Sample" },
  { id: "visual-blueprint", label: "5. Visual Process Infographic" },
  { id: "step-by-step-tribunal", label: "6. Filing Before Tribunal" },
  { id: "evidentiary-checklist", label: "7. Key Evidence Required" },
  { id: "appellate-hierarchy", label: "8. Three-Tier Court Hierarchy" },
  { id: "procedural-timeline", label: "9. Procedural Timeline" },
  { id: "complex-scenarios", label: "10. Four Complex Scenarios" },
  { id: "why-will-safer", label: "11. Why a Will is Safer" },
  { id: "interactive-risk-check", label: "12. Interactive Risk Check" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Official Legal Citations" },
];

const PRINTABLE_CHECKLIST_TEXT = `================================================================================
SENIOR CITIZEN GIFT DEED CANCELLATION & PROTECTION CHECKLIST (INDIA)
Statutory Authority: Section 23, Maintenance and Welfare of Parents and Senior Citizens Act, 2007
Precedents: Urmila Dixit v. Sunil Sharan Dixit (SC, 2025 INSC 20) | Sudesh Chhikara (SC, 2022)
Prepared by WillDrafting.in - Powered by AMA Legal Solutions
================================================================================

PHASE 1: STATUTORY ELIGIBILITY VERIFICATION
[ ] Item 1.1: Confirm the transferor was aged 60 or above at the time of property transfer.
[ ] Item 1.2: Verify that the gift deed was executed AFTER the 2007 Act came into force in your state.
[ ] Item 1.3: Confirm the gifted property is self-acquired or belongs exclusively to the senior citizen.
[ ] Item 1.4: Obtain a certified copy of the registered gift deed from the local Sub-Registrar Office (SRO).

PHASE 2: MAINTENANCE CONDITION DOCUMENTATION
[ ] Item 2.1: Check if the registered gift deed contains an explicit maintenance and shelter clause.
[ ] Item 2.2: If absent in the deed, locate contemporaneous agreements, promissory notes (Vachan Patra), or written undertakings.
[ ] Item 2.3: Per Urmila Dixit (2025 INSC 20), contemporaneous written promises qualify under Section 23.
[ ] Item 2.4: Note: Pure oral promises face heavy scrutiny under Sudesh Chhikara (2022 INSC 1277).

PHASE 3: DOCUMENTING CHILD NEGLECT & MISTREATMENT
[ ] Item 3.1: Maintain medical bills, prescription receipts, and doctor recommendations paid solely by parents.
[ ] Item 3.2: Preserve utility bills, maintenance charges, and municipal tax receipts paid without child support.
[ ] Item 3.3: Document dates and descriptions of verbal abuse, denial of food, medicine, or emotional harassment.
[ ] Item 3.4: File formal complaints with the local police station or senior citizen helpline if facing threats.

PHASE 4: FILING BEFORE THE MAINTENANCE TRIBUNAL
[ ] Item 4.1: Draft application under Section 5 read with Section 23 of the MWPSC Act, 2007.
[ ] Item 4.2: Address the petition to the Sub-Divisional Magistrate (SDO / SDM) presiding over your jurisdiction.
[ ] Item 4.3: Pay zero court fees (Tribunal proceedings carry nominal or zero statutory application fees).
[ ] Item 4.4: Request urgent summary relief for voiding the deed and eviction of the errant transferee.
[ ] Item 4.5: Note that Section 17 bars advocate representation, but advocates can draft your paperwork.

PHASE 5: POST-ORDER ENFORCEMENT & REVENUE MUTATION
[ ] Item 5.1: Obtain certified copy of the Tribunal order declaring the gift deed null and void.
[ ] Item 5.2: Submit certified order to the local Tehsildar / Talathi to cancel mutation in the child's name.
[ ] Item 5.3: Restore the parent's exclusive name on 7/12 extract, Jamabandi, or Municipal property register.
[ ] Item 5.4: Request District Magistrate or police assistance under Section 22 for physical repossession.

================================================================================
CRITICAL ESTATE PLANNING ADVICE:
Litigating against your child in old age causes immense mental distress and takes months.
Keep 100% lifetime ownership and avoid court battles by creating a WILL instead of a gift deed.
A Will takes effect only after death, can be revoked anytime, and costs ₹0 stamp duty.
Draft your legally verified Will today at https://www.willdrafting.in/start`;

const SAMPLE_MAINTENANCE_CLAUSE = `SPECIAL MAINTENANCE AND WELFARE COVENANT UNDER SECTION 23 OF THE MAINTENANCE AND WELFARE OF PARENTS AND SENIOR CITIZENS ACT, 2007:

1. STATUTORY CONDITION PRECEDENT:
This Gift Deed is executed by the Donor, [Father's / Mother's Full Name], aged [Age] years (Senior Citizen), in favor of the Donee, [Son's / Daughter's Full Name], subject to the express and mandatory condition precedent that the Donee shall provide basic amenities and basic physical needs to the Donor throughout the Donor's natural lifetime.

2. SPECIFIC SCOPE OF BASIC AMENITIES AND CARE:
The Donee unconditionally covenants and agrees to provide the Donor with:
(a) Healthy and timely meals according to dietary medical recommendations;
(b) Complete medical treatment, hospitalization expenses, medications, nursing care, and doctor consultations;
(c) Clean, peaceful, and uninterrupted shelter within the scheduled gifted property;
(d) Appropriate clothing, personal care, and financial allowance for day-to-day personal expenses;
(e) An environment of dignity, affection, and emotional respect free from physical, verbal, mental, or emotional abuse.

3. UNCONDITIONAL LIFETIME RIGHT OF RESIDENCE:
The Donor expressly reserves the absolute, exclusive, and irrevocable right to reside peacefully in [specify portion or entire property] of the Schedule Property for the remainder of their natural life without any let, hindrance, interruption, or disturbance by the Donee, the Donee's spouse, or anyone claiming through them.

4. AUTOMATIC REVOCATION & DEEMED FRAUD ON DEFAULT:
In the event that the Donee refuses, fails, neglects, or discontinues the provision of basic amenities, medical care, or physical needs, or attempts to dispossess the Donor:
(a) The transfer of the Schedule Property effected by this Gift Deed shall, under Section 23(1) of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007, be legally deemed to have been made by fraud, coercion, and undue influence;
(b) This Gift Deed shall be deemed null and void ab initio at the sole option and petition of the Donor;
(c) The Maintenance Tribunal established under Section 7 of the Act shall have full jurisdiction to declare this transfer void, cancel registration at the Sub-Registrar Office, and order the summary eviction of the Donee from the Schedule Property.`;

interface ComparisonRow {
  parameter: string;
  giftDeed: string;
  will: string;
  winner: "will" | "gift" | "tie";
  highlight: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    parameter: "Ownership & Lifetime Control",
    giftDeed: "Lost immediately: Ownership transfers during life; child becomes absolute legal owner",
    will: "Retained 100%: Testator remains sole owner and retains all rental income for life",
    winner: "will",
    highlight: "Will ensures total independence and lifetime dignity for parents",
  },
  {
    parameter: "Revocability Without Court",
    giftDeed: "Zero unilateral control: Requires filing a lawsuit or tribunal petition proving neglect",
    will: "100% Unilateral: Can be updated, modified, or cancelled anytime at home",
    winner: "will",
    highlight: "Change your mind anytime without legal battles or child consent",
  },
  {
    parameter: "Statutory Stamp Duty & Fees",
    giftDeed: "Heavy cost: 1% to 7% state stamp duty plus up to ₹30,000 registration fees",
    will: "₹0 Stamp Duty: Exempt nationwide under Indian Stamp Act; registration optional",
    winner: "will",
    highlight: "Will saves hundreds of thousands in upfront government levies",
  },
  {
    parameter: "Risk of Dispossession or Eviction",
    giftDeed: "High: Child can lock rooms, bring spouses, or sell without parent knowledge",
    will: "Zero: Beneficiaries have zero legal right or claim during the parent's lifetime",
    winner: "will",
    highlight: "Children cannot evict a parent from property held under a Will",
  },
  {
    parameter: "Court Burden if Child Misbehaves",
    giftDeed: "Must prove neglect before Tribunal under Section 23 or file civil suits",
    will: "Zero burden: Simply execute a new Will or Codicil disinheriting the ungrateful child",
    winner: "will",
    highlight: "Disinherit neglectful children in 15 minutes with no court visit",
  },
  {
    parameter: "Income Tax Section 56(2)(x)",
    giftDeed: "Exempt only if transferred to defined 'relatives'; others face heavy tax",
    will: "100% Tax-Free for anyone under Section 56(2)(x)(I) testamentary inheritance",
    winner: "tie",
    highlight: "Both provide tax relief for immediate family, but Will covers all heirs",
  },
  {
    parameter: "Certainty Against Post-Death Suits",
    giftDeed: "Transfers property during lifetime, leaving no estate behind to contest",
    will: "Can be challenged on grounds of sound mind or undue influence if poorly drafted",
    winner: "gift",
    highlight: "Gift settles title immediately if child is trustworthy and caring",
  },
];

export default function GiftDeedCancellationClient() {
  const router = useRouter();
  const { status } = useSession();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleStartDraft = (e: React.MouseEvent) => {
    e.preventDefault();
    if (status === "authenticated") {
      router.push("/start/dashboard");
    } else {
      window.dispatchEvent(new Event(OPEN_SIGNUP_EVENT));
    }
  };

  const [activeId, setActiveId] = useState<string>("executive-summary");
  const [copiedClause, setCopiedClause] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);

  // Interactive Risk Checker State
  const [riskTransferStatus, setRiskTransferStatus] = useState<string>("planning");
  const [riskConditionType, setRiskConditionType] = useState<string>("will");
  const [riskLivingStatus, setRiskLivingStatus] = useState<string>("alone");
  const [riskPrimaryGoal, setRiskPrimaryGoal] = useState<string>("control");

  // IntersectionObserver for Table of Contents
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

  const handleCopyClause = () => {
    navigator.clipboard.writeText(SAMPLE_MAINTENANCE_CLAUSE);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 2500);
  };

  const handleCopyChecklist = () => {
    navigator.clipboard.writeText(PRINTABLE_CHECKLIST_TEXT);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  // Interactive Risk Evaluation
  const riskEvaluation = useMemo(() => {
    let score = 0;
    let category = "Low Risk";
    let badgeColor = "bg-emerald-100 text-emerald-800 border-emerald-300";
    let summary = "";
    let recommendation = "";

    if (riskTransferStatus === "planning") {
      if (riskConditionType === "will") {
        score = 5;
        category = "Completely Safe (Maximum Protection)";
        badgeColor = "bg-emerald-100 text-emerald-800 border-emerald-300";
        summary =
          "Creating a Will is the gold standard for parents in India. You retain 100% title, full rental income, and zero risk of elder neglect. If relationships sour, you can revoke the Will anytime without setting foot in court.";
        recommendation =
          "Do not execute a Gift Deed. Draft a legally verified Will online today to save ₹0 stamp duty and preserve lifelong independence.";
      } else if (riskConditionType === "express") {
        score = 35;
        category = "Moderate Risk (Manageable via Section 23)";
        badgeColor = "bg-amber-100 text-amber-800 border-amber-300";
        summary =
          "Drafting an explicit Section 23 maintenance condition provides statutory cancellation recourse before the Maintenance Tribunal if your child neglects you. However, you still surrender immediate ownership and may face litigation if disputes arise.";
        recommendation =
          "Consider executing a Will instead. A Will avoids paying hefty 3% to 7% state stamp duty and eliminates all risk of having to fight your children in court.";
      } else {
        score = 80;
        category = "Severe Risk (High Vulnerability)";
        badgeColor = "bg-rose-100 text-rose-800 border-rose-300";
        summary =
          "Planning an unconditional gift deed with only verbal promises is extremely hazardous. Under the Supreme Court ruling in Sudesh Chhikara (2022), verbal promises cannot be enforced to cancel a deed under Section 23.";
        recommendation =
          "Stop immediately. Do not sign an unconditional gift deed. Protect your home and life savings by drafting a secure Will at /start.";
      }
    } else if (riskTransferStatus === "executed") {
      if (riskConditionType === "express" || riskConditionType === "vachan") {
        score = 50;
        category = "Actionable Protection (Tribunal Recourse Ready)";
        badgeColor = "bg-blue-100 text-blue-800 border-blue-300";
        summary =
          "Your transfer is protected under Section 23 of the MWPSC Act, reinforced by the Supreme Court ruling in Urmila Dixit v. Sunil Sharan Dixit (2025 INSC 20). If your child fails to provide basic care, you can petition the Sub-Divisional Magistrate for summary cancellation.";
        recommendation =
          "Preserve all written evidence, medical prescriptions, and contemporaneous agreements. Consult our senior advocates for a formal maintenance notice if neglect begins.";
      } else {
        score = 90;
        category = "Critical Risk (Unconditional Deed Barrier)";
        badgeColor = "bg-rose-100 text-rose-800 border-rose-300";
        summary =
          "Because your gift deed lacks written maintenance covenants, the Maintenance Tribunal cannot easily cancel the deed under Section 23. You must establish fraud or coercion in civil court, or petition for monthly cash maintenance under Section 9.";
        recommendation =
          "Consult an experienced succession advocate immediately to evaluate civil suit remedies under Sections 19/19A of the Indian Contract Act or Section 126 of the Transfer of Property Act.";
      }
    } else {
      // Child currently neglecting
      if (riskConditionType === "express" || riskConditionType === "vachan") {
        score = 65;
        category = "Immediate Relief Available (File Section 23 Petition)";
        badgeColor = "bg-indigo-100 text-indigo-800 border-indigo-300";
        summary =
          "You have strong legal grounds to void the transfer under Section 23(1). Under Urmila Dixit (2025), contemporaneous written promises hold equal weight. The Tribunal can order cancellation and eviction within 90 days.";
        recommendation =
          "File an immediate application before the Maintenance Tribunal (Sub-Divisional Magistrate). Prepare your evidentiary dossier showing denial of basic amenities.";
      } else {
        score = 95;
        category = "Emergency Situation (Civil Suit & Police Protection)";
        badgeColor = "bg-rose-100 text-rose-800 border-rose-300";
        summary =
          "Facing child neglect without written conditions requires multi-tier legal action. You can invoke Section 20 of the Senior Citizens Act for monthly maintenance, file police complaints for harassment, and initiate civil proceedings.";
        recommendation =
          "Contact senior citizen legal helpline immediately and engage specialized counsel to file for residence protection under the MWPSC Act.";
      }
    }

    if (riskLivingStatus === "evicted" && score < 85) {
      score += 15;
    }

    return { score, category, badgeColor, summary, recommendation };
  }, [riskTransferStatus, riskConditionType, riskLivingStatus, riskPrimaryGoal]);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6">
            <Scale className="w-4 h-4 text-[#C65378]" />
            <span>SENIOR CITIZEN PROTECTION &bull; ESTATE PLANNING</span>
          </div>

          {/* Single H1 Title (Strictly 30-65 chars, no em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6 drop-shadow-xs">
            Can Parents Cancel a Gift Deed Under Senior Citizens Act?
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            Understand your rights under Section 23 of the MWPSC Act 2007. Learn how the landmark 2025 Supreme Court Urmila Dixit ruling empowers parents to void gift deeds if children fail maintenance obligations, and discover why a Will offers far safer protection.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/start"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/20 cursor-pointer"
            >
              <span>Draft a Safe Will Online (₹0 Stamp Duty)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/blogs/gift-deed-vs-will-india"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold transition-all"
            >
              <FileText className="w-4 h-4 text-rose-300" />
              <span>Read Gift Deed vs Will Guide</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Full-Width Social Proof)
          ========================================================================= */}
      <section className="w-full border-y border-slate-200/80 bg-gradient-to-r from-rose-50/70 via-slate-50 to-emerald-50/70 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="border-r last:border-r-0 border-slate-200/80 pr-4">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#172228]">MWPSC s.23</p>
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-600 mt-1">
                Deemed Fraud &amp; Voidability
              </p>
            </div>
            <div className="border-r last:border-r-0 border-slate-200/80 pr-4">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#C65378]">2025 INSC 20</p>
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-600 mt-1">
                SC Urmila Dixit Precedent
              </p>
            </div>
            <div className="border-r last:border-r-0 border-slate-200/80 pr-4">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#5F7E75]">90-Day Limit</p>
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-600 mt-1">
                Fast-Track Tribunal Disposal
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#172228]">100% Control</p>
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-600 mt-1">
                Retained for Life with Will
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content Area)
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_280px] xl:grid-cols-[260px_minmax(0,1fr)_300px] 2xl:grid-cols-[280px_minmax(0,1fr)_320px] gap-6 xl:gap-8 items-start">
          
          {/* ──────────────────────────────────────────────────
              LEFT COLUMN: STICKY TABLE OF CONTENTS
              ────────────────────────────────────────────────── */}
          <aside className="sticky top-28 hidden lg:block">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-xs font-black uppercase tracking-wider text-slate-700">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span>Table of Contents</span>
              </div>
              <nav className="max-h-[calc(100vh-190px)] overflow-y-auto space-y-1 text-xs pr-1">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block px-3 py-2 rounded-lg transition-colors leading-snug ${
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

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75] shrink-0" />
                <span>Verified under MWPSC Act 2007 &amp; ISA 1925</span>
              </div>
            </div>
          </aside>

          {/* ──────────────────────────────────────────────────
              MIDDLE COLUMN: MAIN EDITORIAL CONTENT
              ────────────────────────────────────────────────── */}
          <main className="space-y-8 md:space-y-10 min-w-0">
            
            {/* █ SECTION 0: EXECUTIVE SUMMARY BOX */}
            <section
              id="executive-summary"
              className="scroll-target rounded-2xl bg-white border border-slate-200/80 p-6 md:p-8 shadow-xs border-l-4 border-l-[#C65378]"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378] mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Executive Summary &bull; Key Legal Realities</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight mb-4">
                Executive Summary: Cancelling a Gift Deed in India
              </h2>
              <div className="space-y-3.5 text-sm md:text-base text-slate-700 leading-relaxed">
                <p>
                  Transferring family real estate to a child in the hope of affectionate lifetime care is an emotional tradition in India. However, when children neglect or abandon their elderly parents after securing property title, senior citizens often face acute hardship. Indian law provides specific statutory remedies to reverse these transfers.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 space-y-1.5">
                    <span className="font-bold text-[#172228] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Section 23 Cancellation Power:
                    </span>
                    <p>
                      Under Section 23 of the Senior Citizens Act 2007, Maintenance Tribunals can declare a gift deed void if the child neglects maintenance conditions.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 space-y-1.5">
                    <span className="font-bold text-[#172228] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      SC Landmark Precedent (2025):
                    </span>
                    <p>
                      The Supreme Court in <em>Urmila Dixit (2025 INSC 20)</em> held that maintenance conditions need not be inside the deed; contemporaneous written notes count.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 space-y-1.5">
                    <span className="font-bold text-[#172228] flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      The Unconditional Trap:
                    </span>
                    <p>
                      Pure unconditional gift deeds with only oral promises cannot be cancelled under Section 23 as affirmed in <em>Sudesh Chhikara (2022)</em>.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 space-y-1.5">
                    <span className="font-bold text-[#172228] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#5F7E75]" />
                      Why a Will is Better:
                    </span>
                    <p>
                      A Will avoids court battles altogether. Parents retain 100% control for life, pay ₹0 stamp duty, and can change beneficiaries anytime.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* █ SECTION 1: SECTION 23 LEGAL FRAMEWORK */}
            <section
              id="section-23-framework"
              className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>Statutory Authority &bull; MWPSC Act 2007</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                1. Section 23 Explained: Senior Citizens Act Protection
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                The Parliament of India enacted the <em>Maintenance and Welfare of Parents and Senior Citizens Act, 2007</em> (MWPSC Act) to ensure dignified living and economic security for elders. The cornerstone protection for family properties is codified under <strong>Section 23(1)</strong>.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Section 23 creates a unique legal mechanism known as a <strong>statutory deeming fiction</strong>. Under normal property jurisprudence, once a gift deed is registered, it cannot be unilaterally cancelled. However, Section 23 overrides ordinary property laws to safeguard vulnerable senior citizens.
              </p>

              {/* 4 Conditions Card Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                  <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider">Condition 1</span>
                  <h3 className="text-sm font-bold text-slate-900">Senior Citizen Status</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The transferor must be a senior citizen (aged 60 years or older) or a parent at the time of property transfer.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                  <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider">Condition 2</span>
                  <h3 className="text-sm font-bold text-slate-900">Post-2007 Transfer</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The gift deed or settlement must have been executed after the commencement of the Act in that respective state.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                  <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider">Condition 3</span>
                  <h3 className="text-sm font-bold text-slate-900">Maintenance Obligation</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The transfer must be subject to the condition that the transferee child provides basic amenities and basic physical needs.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                  <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider">Condition 4</span>
                  <h3 className="text-sm font-bold text-slate-900">Breach or Refusal</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The child fails or refuses to provide such care, shelter, medical treatment, or basic physical needs.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 leading-relaxed flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>The Statutory Consequence:</strong> When all four preconditions are met, the transfer of property is legally deemed to have been made by fraud, coercion, or undue influence. The Maintenance Tribunal can declare the gift deed completely null and void under Section 23(1).
                </div>
              </div>
            </section>

            {/* █ SECTION 2: URMILA DIXIT SUPREME COURT RULING */}
            <section
              id="urmila-dixit-ruling"
              className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>Supreme Court Landmark &bull; January 2025</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                2. Supreme Court Ruling: Urmila Dixit v Sunil Sharan Dixit
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                On <strong>January 2, 2025</strong>, the Supreme Court of India delivered a monumental judgment in <em>Urmila Dixit v. Sunil Sharan Dixit &amp; Ors.</em> (<strong>2025 INSC 20</strong>, Civil Appeal No. 10927 of 2024). The Division Bench, comprising Hon&apos;ble Justice C.T. Ravikumar and Hon&apos;ble Justice Sanjay Karol (judgment authored by Justice Karol), resolved a long-standing controversy regarding conditional gift deeds.
              </p>

              {/* Case Breakdown Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-sm font-bold text-[#172228] uppercase tracking-wide">
                  The Case Facts &amp; Procedural History
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  The appellant mother, Urmila Dixit, executed a registered gift deed transferring her residential house to her son. Simultaneously, a contemporaneous written promissory note (<em>Vachan Patra</em>) was signed by the son, expressly promising to maintain and look after his parents for life.
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Following the registration, the son began mistreating the mother and completely stopped providing for her basic medical and daily needs. The mother petitioned the Maintenance Tribunal under Section 23. Both the Tribunal and the District Collector declared the gift deed void. The Single Judge of the High Court affirmed this order. However, the Division Bench of the High Court reversed it, adopting a hyper-technical view that the maintenance condition was not written inside the gift deed itself.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="text-base font-bold text-[#172228]">
                  Three Groundbreaking Principles Established by the Supreme Court:
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>1. Purposive Interpretation of Welfare Legislation:</strong> The Supreme Court held that the Senior Citizens Act is a beneficial statute meant to ensure that elders do not spend their twilight years in penury or neglect. Courts must interpret it liberally, rejecting pedantic or rigid technicalities.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>2. Contemporaneous Documents Are Legally Binding:</strong> The Court clarified that the maintenance condition does not need to be written strictly within the four corners of the gift deed. A contemporaneous <em>Vachan Patra</em>, promissory note, or family agreement executed alongside the deed proves that the transfer was conditional upon lifelong care.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>3. Reversal of the Division Bench:</strong> The Supreme Court set aside the High Court Division Bench order, fully restoring the Maintenance Tribunal&apos;s cancellation of the gift deed and protecting the mother&apos;s property rights.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Comparison Box with Sudesh Chhikara */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-blue-950 space-y-1.5">
                <span className="font-bold flex items-center gap-1.5 text-blue-900">
                  <Info className="w-4 h-4 text-blue-600" />
                  Key Distinction: Urmila Dixit (2025) vs Sudesh Chhikara (2022)
                </span>
                <p className="leading-relaxed">
                  In <em>Sudesh Chhikara v. Ramti Devi (2022 INSC 1277)</em>, the Supreme Court had ruled that Section 23 cannot be invoked if the gift deed was completely unconditional and there was zero written agreement. The <em>Urmila Dixit</em> ruling harmonizes this by confirming that contemporaneous side agreements or <em>Vachan Patras</em> fulfill the condition requirement, protecting parents who did not insert the clause into the deed itself.
                </p>
              </div>
            </section>

            {/* █ SECTION 3: WHEN CAN A GIFT DEED BE CANCELLED */}
            <section
              id="revocable-vs-irrevocable"
              className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>Transfer of Property Act vs Senior Citizens Act</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                3. When Can a Gift Deed Be Cancelled vs Irrevocable?
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Under Section 126 of the <em>Transfer of Property Act, 1882</em> (TPA), the general principle of Indian property law is that a completed gift cannot be revoked at the mere will of the donor. Once accepted by the donee and registered, it transfers legal ownership permanently.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                However, Indian law recognizes four distinct legal avenues where a gift deed can be revoked or declared void:
              </p>

              {/* Comparison Matrix Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#172228] text-white">
                      <tr>
                        <th className="py-3.5 px-4 font-bold">Revocation Ground</th>
                        <th className="py-3.5 px-4 font-bold">Governing Statute</th>
                        <th className="py-3.5 px-4 font-bold">Legal Forum</th>
                        <th className="py-3.5 px-4 font-bold">Burden of Proof</th>
                        <th className="py-3.5 px-4 font-bold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          Neglect of Senior Citizen
                        </td>
                        <td className="py-3 px-4">MWPSC Act 2007 s.23</td>
                        <td className="py-3 px-4 font-medium text-blue-700">Maintenance Tribunal (SDM)</td>
                        <td className="py-3 px-4">Proof of condition + child neglect</td>
                        <td className="py-3 px-4 text-emerald-700 font-bold">Voidable by Parent</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          Express Revocation Clause
                        </td>
                        <td className="py-3 px-4">Transfer of Property Act s.126</td>
                        <td className="py-3 px-4 font-medium text-slate-700">Civil Court</td>
                        <td className="py-3 px-4">Occurrence of specified event</td>
                        <td className="py-3 px-4 text-emerald-700 font-bold">Revocable</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          Fraud, Coercion, Undue Influence
                        </td>
                        <td className="py-3 px-4">Contract Act ss. 19 &amp; 19A</td>
                        <td className="py-3 px-4 font-medium text-slate-700">Civil Court</td>
                        <td className="py-3 px-4">High burden: vitiated consent</td>
                        <td className="py-3 px-4 text-amber-700 font-bold">Voidable (Years of Trial)</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          Mutual Cancellation Deed
                        </td>
                        <td className="py-3 px-4">Registration Act 1908</td>
                        <td className="py-3 px-4 font-medium text-slate-700">Sub-Registrar Office</td>
                        <td className="py-3 px-4">Mutual consent of both parties</td>
                        <td className="py-3 px-4 text-emerald-700 font-bold">Cancelled by Consent</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors bg-rose-50/40">
                        <td className="py-3 px-4 font-semibold text-rose-950">
                          Unconditional Deed (Oral Promise)
                        </td>
                        <td className="py-3 px-4 text-rose-900">TPA s.122 / Sudesh Chhikara</td>
                        <td className="py-3 px-4 font-medium text-rose-900">Barred from Tribunal</td>
                        <td className="py-3 px-4 text-rose-900">Oral promises inadmissible</td>
                        <td className="py-3 px-4 text-rose-700 font-bold">Irrevocable</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* █ SECTION 4: HOW TO WORD THE MAINTENANCE CONDITION */}
            <section
              id="maintenance-clause-sample"
              className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSignature className="w-4 h-4" />
                <span>Unique Drafting Asset &bull; Free Lawyer-Verified Clause</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                4. Maintenance Condition Clause: Free Sample Drafting
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                If you are a parent considering a gift deed or settlement deed, you must never sign a standard template drafted by property brokers. To ensure protection under Section 23 of the MWPSC Act, 2007, ensure this exact lawyer-approved covenant is incorporated into the deed.
              </p>

              {/* Sample Clause Box */}
              <div className="rounded-2xl border border-slate-300 bg-slate-900 text-slate-100 p-5 space-y-3 shadow-inner">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-300 uppercase tracking-wider">
                    <FileText className="w-4 h-4" />
                    <span>Model Section 23 Covenant</span>
                  </div>
                  <button
                    onClick={handleCopyClause}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {copiedClause ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Clause Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="font-mono text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap text-slate-200 max-h-96 overflow-y-auto pr-2">
                  {SAMPLE_MAINTENANCE_CLAUSE}
                </pre>
              </div>

              {/* Breakdown of 4 Mandatory Elements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-[#172228] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Explicit Statutory Citation:
                  </span>
                  <p>
                    Directly cites Section 23 of the MWPSC Act 2007, eliminating any ambiguity regarding the governing law.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-[#172228] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Specific Scope of Care:
                  </span>
                  <p>
                    Itemizes medical treatment, food, clothing, and dignified treatment so courts can readily measure breach.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-[#172228] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Absolute Residence Reservation:
                  </span>
                  <p>
                    Guarantees the parent cannot be locked out or evicted by the child or incoming daughter/son-in-law.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-[#172228] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Tribunal Jurisdiction Clause:
                  </span>
                  <p>
                    Authorizes the Maintenance Tribunal to summarily void registration and evict the child upon default.
                  </p>
                </div>
              </div>
            </section>

            {/* █ SECTION 5: VISUAL BLUEPRINT & INFOGRAPHIC */}
            <section
              id="visual-blueprint"
              className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Eye className="w-4 h-4" />
                <span>Visual Blueprint &bull; Statutory Judicial Flow</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                5. Visual Blueprint: Gift Cancellation Roadmap
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                The diagram below illustrates the comprehensive statutory architecture of gift deed cancellation in India, capturing the legal stages from gift deed execution to Maintenance Tribunal voiding under Section 23.
              </p>

              {/* Infographic Image Container */}
              <div className="relative rounded-2xl border border-slate-200 overflow-hidden bg-slate-100 group">
                <div className="relative w-full aspect-video">
                  <Image
                    src="/images/gift-deed-cancellation-senior-citizens-act-section-23.jpg"
                    alt="Can Gift Deed Be Cancelled by Parents Under Senior Citizens Act Section 23 - Urmila Dixit Precedent"
                    fill
                    className="object-cover group-hover:scale-[1.01] transition-transform duration-300"
                    priority
                  />
                </div>
                <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
                  <div>
                    <span className="font-bold text-slate-900">
                      Figure 1.0: Statutory Cancellation Framework Under MWPSC Act s.23
                    </span>
                    <p className="text-[11px] text-slate-500">
                      Featuring Supreme Court precedent <em>Urmila Dixit v. Sunil Sharan Dixit (2025 INSC 20)</em>.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowImageModal(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors shrink-0 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View High-Resolution</span>
                  </button>
                </div>
              </div>
            </section>

            {/* █ SECTION 6: STEP-BY-STEP TRIBUNAL PROCEDURE */}
            <section
              id="step-by-step-tribunal"
              className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-5"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>Procedural Protocol &bull; 6-Stage SOP</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                6. How Parents File Before the Maintenance Tribunal
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Cancelling a gift deed under the Senior Citizens Act does not require an expensive civil suit in District Court. The proceeding is conducted before the specialized <strong>Maintenance Tribunal</strong> presided over by the Sub-Divisional Magistrate (SDM/SDO).
              </p>

              {/* 6 Step Cards */}
              <div className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Evidentiary Dossier Gathering",
                    desc: "Assemble certified copies of the registered gift deed, contemporaneous Vachan Patra or agreements, medical prescriptions, bills paid without child support, and proof that the parent was 60+ at transfer.",
                  },
                  {
                    step: "2",
                    title: "Statutory Legal Demand Notice",
                    desc: "Serve a formal legal notice through an advocate calling upon the child to fulfill their maintenance obligations within 15 days or face Section 23 cancellation proceedings.",
                  },
                  {
                    step: "3",
                    title: "Filing Petition Before Sub-Divisional Magistrate",
                    desc: "File a detailed application under Section 5 read with Section 23 before the Maintenance Tribunal of the sub-division where the parent resides or where the property is situated.",
                  },
                  {
                    step: "4",
                    title: "Summary Inquiry & Conciliation",
                    desc: "The Tribunal issues notice to the child. Under Section 6, the Tribunal may refer the matter to a Conciliation Officer. If conciliation fails, the Tribunal commences a summary judicial inquiry.",
                  },
                  {
                    step: "5",
                    title: "Passing of Cancellation & Eviction Order",
                    desc: "Upon establishing non-maintenance, the Tribunal declares the transfer void under Section 23(1) and orders the child and their spouse to vacate the property immediately.",
                  },
                  {
                    step: "6",
                    title: "Revenue Mutation Reversal & Police Assistance",
                    desc: "The certified order is submitted to the local Tehsildar / Talathi to cancel mutation entries in the child's name, restoring the parent as sole titleholder with local police enforcement.",
                  },
                ].map((s) => (
                  <div
                    key={s.step}
                    className="flex items-start gap-4 p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {s.step}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-[#172228]">{s.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* █ SECTION 7: KEY EVIDENCE REQUIRED */}
            <section
              id="evidentiary-checklist"
              className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>Evidentiary Dossier &bull; 4 Legal Pillars</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                7. Key Evidence Required to Cancel a Gift Deed
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Maintenance Tribunals conduct summary proceedings, making documentary evidence decisive. Parents must present concrete records across four specific evidentiary pillars to withstand appellate scrutiny.
              </p>

              {/* 2x2 Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/30 space-y-2">
                  <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                    <UserCheck className="w-4 h-4" />
                    <span>1. Age Proof (Senior Citizen Status)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Aadhaar card, voter ID, passport, or birth certificate demonstrating the parent was at least 60 years old when executing the gift deed.
                  </p>
                </div>
                <div className="p-4 rounded-2xl border border-purple-200 bg-purple-50/30 space-y-2">
                  <div className="flex items-center gap-2 text-purple-700 font-bold text-sm">
                    <FileCheck className="w-4 h-4" />
                    <span>2. Maintenance Covenant Documentation</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Certified registered gift deed with express maintenance covenants, or contemporaneous written promissory notes (<em>Vachan Patra</em> per <em>Urmila Dixit</em>).
                  </p>
                </div>
                <div className="p-4 rounded-2xl border border-rose-200 bg-rose-50/30 space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                    <HeartHandshake className="w-4 h-4" />
                    <span>3. Proof of Neglect &amp; Non-Provision</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Bank statements showing child contributes zero funds, medical bills paid by parents, utility receipts, or police complaints regarding physical harassment.
                  </p>
                </div>
                <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/30 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                    <Landmark className="w-4 h-4" />
                    <span>4. Title &amp; Property Registry Extracts</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Certified copy of the Gift Deed, Index II extract, property tax challans, and mutation records verifying the property was self-acquired.
                  </p>
                </div>
              </div>
            </section>

            {/* █ SECTION 8: THREE-TIER APPEALS */}
            <section
              id="appellate-hierarchy"
              className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>Judicial Hierarchy &bull; Appeals Process</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                8. Three-Tier Appeals: Tribunal, Collector, High Court
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                When a Maintenance Tribunal passes an order voiding a gift deed, aggrieved children frequently attempt to stall eviction by filing appeals. Understanding the jurisdictional hierarchy ensures parents are prepared for every stage of litigation.
              </p>

              {/* Hierarchy Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#172228] text-white">
                      <tr>
                        <th className="py-3.5 px-4 font-bold">Judicial Tier</th>
                        <th className="py-3.5 px-4 font-bold">Presiding Authority</th>
                        <th className="py-3.5 px-4 font-bold">Statutory Limitation</th>
                        <th className="py-3.5 px-4 font-bold">Jurisdictional Scope</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">Tier 1: Maintenance Tribunal</td>
                        <td className="py-3 px-4 font-semibold text-blue-700">Sub-Divisional Magistrate (SDM)</td>
                        <td className="py-3 px-4">90 days target</td>
                        <td className="py-3 px-4">Original jurisdiction to void deed &amp; order eviction</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">Tier 2: Appellate Tribunal</td>
                        <td className="py-3 px-4 font-semibold text-slate-900">District Magistrate / Collector</td>
                        <td className="py-3 px-4">60 days from order</td>
                        <td className="py-3 px-4">Appellate review under Section 16 of MWPSC Act</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">Tier 3: High Court</td>
                        <td className="py-3 px-4 font-semibold text-slate-900">High Court Division / Single Bench</td>
                        <td className="py-3 px-4">Article 226/227 Writ</td>
                        <td className="py-3 px-4">Judicial review of jurisdictional errors or illegality</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors bg-rose-50/30">
                        <td className="py-3 px-4 font-bold text-rose-950">Tier 4: Supreme Court</td>
                        <td className="py-3 px-4 font-semibold text-rose-900">Supreme Court of India</td>
                        <td className="py-3 px-4 text-rose-900">Special Leave Petition</td>
                        <td className="py-3 px-4 text-rose-900">Apex constitutional review (as in <em>Urmila Dixit</em>)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* █ SECTION 9: PROCEDURAL TIMELINE */}
            <section
              id="procedural-timeline"
              className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>Statutory Timeframe &bull; Procedural Milestones</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                9. Procedural Timeline: From Notice to Possession Recovery
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Section 5(6) of the Act establishes an expedited timeline to prevent elderly parents from enduring prolonged civil trials. The table below charts the realistic procedural lifecycle from initial notice to full physical repossession.
              </p>

              {/* Timeline Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#172228] text-white">
                      <tr>
                        <th className="py-3 px-4 font-bold">Phase</th>
                        <th className="py-3 px-4 font-bold">Action Item</th>
                        <th className="py-3 px-4 font-bold">Expected Timeframe</th>
                        <th className="py-3 px-4 font-bold">Key Deliverable</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">PHASE 1</td>
                        <td className="py-3 px-4 font-medium text-slate-900">Legal Notice &amp; Demand</td>
                        <td className="py-3 px-4 text-blue-700 font-semibold">Days 1 – 15</td>
                        <td className="py-3 px-4">Proof of service &amp; default establishment</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">PHASE 2</td>
                        <td className="py-3 px-4 font-medium text-slate-900">Filing Section 23 Application</td>
                        <td className="py-3 px-4 text-blue-700 font-semibold">Days 16 – 30</td>
                        <td className="py-3 px-4">Tribunal case registration &amp; notice issuance</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">PHASE 3</td>
                        <td className="py-3 px-4 font-medium text-slate-900">Summons &amp; Child Appearance</td>
                        <td className="py-3 px-4 text-blue-700 font-semibold">Days 30 – 45</td>
                        <td className="py-3 px-4">Service of process via local police station</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">PHASE 4</td>
                        <td className="py-3 px-4 font-medium text-slate-900">Conciliation &amp; Summary Hearing</td>
                        <td className="py-3 px-4 text-blue-700 font-semibold">Days 45 – 60</td>
                        <td className="py-3 px-4">Conciliation report &amp; inquiry record</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors bg-emerald-50/50">
                        <td className="py-3 px-4 font-mono font-bold text-emerald-950">PHASE 5</td>
                        <td className="py-3 px-4 font-medium text-emerald-950">Final Order Declaring Deed Void</td>
                        <td className="py-3 px-4 text-emerald-700 font-bold">Days 60 – 90</td>
                        <td className="py-3 px-4 font-bold text-emerald-800">Judicial cancellation decree</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors bg-blue-50/40">
                        <td className="py-3 px-4 font-mono font-bold text-blue-950">PHASE 6</td>
                        <td className="py-3 px-4 font-medium text-blue-950">Mutation Reversal &amp; Eviction</td>
                        <td className="py-3 px-4 text-blue-700 font-bold">Days 90 – 120</td>
                        <td className="py-3 px-4 font-semibold text-blue-900">Tehsildar mutation + police eviction</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* █ SECTION 10: COMPLEX SCENARIOS */}
            <section
              id="complex-scenarios"
              className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4" />
                <span>Specialized Situations &bull; Practical Defense</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                10. Four Complex Scenarios: Daughters-in-Law &amp; Third Parties
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Property disputes involving senior citizens often intersect with other matrimonial and property laws. Here is how Indian courts handle four frequent conflict scenarios.
              </p>

              {/* 2x2 Specialized Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex items-center gap-2 text-[#172228] font-bold text-sm">
                    <Home className="w-4 h-4 text-[#C65378]" />
                    <span>Daughter-in-Law DV Act Claims</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Daughters-in-law often claim a &quot;shared household&quot; right under Section 17 of the Protection of Women from Domestic Violence Act, 2005. In <em>S. Vanitha v. Deputy Commissioner (2020)</em>, the Supreme Court held both Acts must be harmonized. However, an estranged spouse cannot defeat an elderly parent&apos;s right to shelter and dignity in self-acquired property.
                  </p>
                </div>
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex items-center gap-2 text-[#172228] font-bold text-sm">
                    <Users className="w-4 h-4 text-[#5F7E75]" />
                    <span>Subsequent Sale to Third-Party Buyer</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If the child sells the property before the parent files a petition, Section 23(2) allows enforcement of maintenance rights against transferees who had notice. However, bona fide purchasers for value create heavy litigation hurdles, illustrating why gifting away title during life is risky.
                  </p>
                </div>
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex items-center gap-2 text-[#172228] font-bold text-sm">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Unconditional Deed with Oral Promises</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Where parents executed a standard registered gift deed without any maintenance clause or contemporaneous agreement, Section 23 cannot be invoked per <em>Sudesh Chhikara (2022)</em>. The parent&apos;s remedy shifts to seeking monthly maintenance under Section 9 or filing a civil suit for undue influence.
                  </p>
                </div>
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex items-center gap-2 text-[#172228] font-bold text-sm">
                    <Scale className="w-4 h-4 text-blue-600" />
                    <span>Joint Ownership by Both Elderly Parents</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    When property is jointly held by husband and wife, but only one parent executed a gift deed of their undivided share, the surviving spouse retains their independent 50% undivided ownership. The child cannot dispossess the surviving mother from the joint marital home.
                  </p>
                </div>
              </div>
            </section>

            {/* █ SECTION 11: WHY A WILL IS SAFER THAN A GIFT DEED */}
            <section
              id="why-will-safer"
              className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-5"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>Competitor Gap &bull; Estate Planning Truth</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                11. Why a Will is Safer Than a Conditional Gift Deed
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                While the Supreme Court&apos;s <em>Urmila Dixit</em> ruling provides historic protection, consider the emotional reality: <strong>an elderly mother had to fight her own son through four layers of courts all the way to the Supreme Court of India</strong> to reclaim her home.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Executing a Gift Deed surrenders your ownership title today. Even with Section 23, you must endure tribunal hearings, hire advocates, produce medical receipts, and prove you are being neglected.
              </p>

              {/* Side-by-Side Comparison Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#172228] text-white">
                      <tr>
                        <th className="py-3.5 px-4 font-bold">Decision Factor</th>
                        <th className="py-3.5 px-4 font-bold">Conditional Gift Deed</th>
                        <th className="py-3.5 px-4 font-bold">Last Will &amp; Testament</th>
                        <th className="py-3.5 px-4 font-bold">Parent Verdict</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
                      {COMPARISON_DATA.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4 font-semibold text-slate-900">{row.parameter}</td>
                          <td className="py-3 px-4 text-slate-600">{row.giftDeed}</td>
                          <td className="py-3 px-4 text-slate-900 font-medium">{row.will}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${
                                row.winner === "will"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : row.winner === "gift"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {row.winner === "will" ? "Will is Superior" : row.winner === "gift" ? "Gift Deed" : "Equal"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* High Conversion CTA Box */}
              <div className="rounded-2xl bg-gradient-to-br from-[#172228] to-slate-900 text-white p-6 sm:p-8 space-y-4 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-rose-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Protect Your Home &bull; 100% Lifetime Independence</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold leading-snug">
                  Never Beg for Shelter in Your Own Home
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                  A legally structured Will keeps you the absolute master of your property until your last breath. Pay ₹0 stamp duty, collect all rental income, and change beneficiaries anytime without asking permission from anyone.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href="/start"
                    onClick={handleStartDraft}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-md shadow-rose-950/30 text-xs sm:text-sm cursor-pointer"
                  >
                    <span>Create Your Secure Will Today</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <Link
                    href="/pricing"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-semibold transition-all"
                  >
                    <ShieldCheck className="w-4 h-4 text-rose-300" />
                    <span>View Pricing Plans (₹1,499)</span>
                  </Link>
                </div>
              </div>
            </section>

            {/* █ SECTION 12: INTERACTIVE RISK ASSESSMENT */}
            <section
              id="interactive-risk-check"
              className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-5"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Zap className="w-4 h-4" />
                <span>Interactive Assessment Tool &bull; Instant Analysis</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                12. Interactive Check: Are You at Risk Under a Gift Deed?
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Use this free diagnostic tool to evaluate your property transfer risk under the Senior Citizens Act, 2007 and discover the safest legal strategy for your family.
              </p>

              {/* Assessment Form */}
              <div className="bg-slate-50/80 rounded-2xl border border-slate-200/80 p-5 sm:p-6 space-y-5">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#172228] uppercase tracking-wide mb-2">
                      1. Current Property Transfer Status
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      {[
                        { id: "planning", label: "Planning Future Transfer" },
                        { id: "executed", label: "Already Gifted to Child" },
                        { id: "neglect", label: "Facing Child Neglect Now" },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setRiskTransferStatus(opt.id)}
                          className={`p-3 rounded-xl border text-left font-medium transition-all ${
                            riskTransferStatus === opt.id
                              ? "bg-white border-[#C65378] text-[#C65378] shadow-xs font-bold ring-1 ring-[#C65378]"
                              : "bg-white/60 border-slate-200 text-slate-700 hover:bg-white"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#172228] uppercase tracking-wide mb-2">
                      2. Maintenance Condition in the Transfer
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
                      {[
                        { id: "will", label: "Will / Testament (No Gift)" },
                        { id: "express", label: "Written in Registered Deed" },
                        { id: "vachan", label: "Signed Vachan Patra / Note" },
                        { id: "oral", label: "Only Oral Promises" },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setRiskConditionType(opt.id)}
                          className={`p-3 rounded-xl border text-left font-medium transition-all ${
                            riskConditionType === opt.id
                              ? "bg-white border-[#C65378] text-[#C65378] shadow-xs font-bold ring-1 ring-[#C65378]"
                              : "bg-white/60 border-slate-200 text-slate-700 hover:bg-white"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#172228] uppercase tracking-wide mb-2">
                      3. Physical Residence &amp; Shelter Status
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      {[
                        { id: "alone", label: "I Live Alone in Peace" },
                        { id: "together", label: "Living Together with Child" },
                        { id: "evicted", label: "Locked Out / Harassed" },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setRiskLivingStatus(opt.id)}
                          className={`p-3 rounded-xl border text-left font-medium transition-all ${
                            riskLivingStatus === opt.id
                              ? "bg-white border-[#C65378] text-[#C65378] shadow-xs font-bold ring-1 ring-[#C65378]"
                              : "bg-white/60 border-slate-200 text-slate-700 hover:bg-white"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Real-Time Diagnostic Result */}
                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Diagnostic Evaluation Result:
                    </span>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold border ${riskEvaluation.badgeColor}`}
                    >
                      {riskEvaluation.category}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {riskEvaluation.summary}
                  </p>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-800 space-y-1">
                    <strong className="text-[#172228] block">Advocate Recommendation:</strong>
                    <p className="leading-relaxed">{riskEvaluation.recommendation}</p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href="/start"
                      onClick={handleStartDraft}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#172228] text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span>Draft Will Online (Zero Risk)</span>
                      <ArrowRight className="w-3.5 h-3.5 text-rose-300" />
                    </a>
                    <button
                      onClick={handleCopyChecklist}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-xs transition-colors cursor-pointer"
                    >
                      {copiedChecklist ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Checklist Copied!</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copy Protection Checklist</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handlePrint}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-xs transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5 text-slate-500" />
                      <span>Print Checklist</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* █ SECTION 13: FAQ ACCORDION (10 Questions) */}
            <section
              id="frequently-asked-questions"
              className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>Frequently Asked Questions &bull; Direct Answers</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                13. Frequently Asked Questions: Cancelling a Gift Deed
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Click any question below to expand detailed legal explanations from our senior succession advocates.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  {
                    q: "Can a gift deed be cancelled by parents if the child neglects them?",
                    a: "Yes. Under Section 23 of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007, if a senior citizen (aged 60+) gifts property subject to the condition of lifelong maintenance and care, and the child fails to provide basic amenities, the Maintenance Tribunal can declare the gift deed null and void.",
                  },
                  {
                    q: "What did the Supreme Court decide in Urmila Dixit v. Sunil Sharan Dixit (2025)?",
                    a: "In Urmila Dixit v. Sunil Sharan Dixit (2025 INSC 20, decided January 2, 2025), the Supreme Court ruled that the maintenance condition does not need to be written strictly inside the gift deed itself. Contemporaneous documents such as a signed promissory note (Vachan Patra) or written undertaking executed during the property transfer can be relied upon to void the deed under Section 23.",
                  },
                  {
                    q: "Can an unconditional gift deed be cancelled under Section 23?",
                    a: "Generally no. As held by the Supreme Court in Sudesh Chhikara v. Ramti Devi (2022), Section 23 requires that the transfer was subject to the condition that the transferee provides basic amenities. If a deed contains no maintenance clause and no contemporaneous written undertaking exists, the Maintenance Tribunal cannot void the transfer. The parent must approach civil court for fraud or seek monthly maintenance.",
                  },
                  {
                    q: "What is the statutory timeline for the Maintenance Tribunal to decide a cancellation petition?",
                    a: "Under Section 5(6) of the Senior Citizens Act, the Maintenance Tribunal is mandated to dispose of the proceedings within 90 days from the date of service of notice to the respondent. In exceptional circumstances, the Tribunal may extend this period by up to 30 days with written reasons.",
                  },
                  {
                    q: "Can parents evict an abusive child and daughter-in-law from the gifted house?",
                    a: "Yes. Once the Maintenance Tribunal voids the gift deed under Section 23(1), the transferee child loses all legal title and becomes an unauthorized occupant. The Tribunal has summary powers to order their eviction and direct the local police administration to restore peaceful physical possession to the elderly parents.",
                  },
                  {
                    q: "What happens if the child sells the gifted property to a third party?",
                    a: "Under Section 23(2) of the Act, if a senior citizen has a right to receive maintenance out of an estate and the property is transferred with notice of such right or gratuitously, the right can be enforced against the transferee. However, if sold to a bona fide purchaser for valuable consideration without notice, litigation becomes complex, underscoring why parents should never transfer title during their lifetime.",
                  },
                  {
                    q: "Can a gift deed executed before 2007 be cancelled under Section 23?",
                    a: "No. Section 23 explicitly applies only to transfers of property executed after the commencement of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007 in that respective state. Transfers executed before the Act came into force can only be challenged in civil court under the Indian Contract Act or Transfer of Property Act.",
                  },
                  {
                    q: "Why is creating a Will safer for parents than executing a conditional gift deed?",
                    a: "A Will ensures the parent retains 100% legal ownership, possession, and rental income for life. Unlike a gift deed, a Will transfers title only after death and can be revoked or updated unilaterally at any time without going to court, paying stamp duty, or proving child neglect before a tribunal.",
                  },
                  {
                    q: "Do parents need a lawyer to file a case before the Maintenance Tribunal?",
                    a: "Section 17 of the Senior Citizens Act explicitly bars legal representation by legal practitioners before the Maintenance Tribunal to keep proceedings informal and accessible. However, senior citizens can seek advocate guidance to draft the petition and organize evidence, or be represented by an authorized Maintenance Officer.",
                  },
                  {
                    q: "Can parents cancel a gift deed if the child pays money but inflicts emotional cruelty?",
                    a: "Yes. Section 23 covers both basic amenities and basic physical needs, interpreted liberally by the Supreme Court to include dignified living and emotional security. Depriving an elderly parent of peaceful shelter, verbal harassment, or confining them to an unlivable room constitutes breach of basic amenities under the Act.",
                  },
                ].map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-xl overflow-hidden transition-all bg-white"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                        className="w-full p-4 text-left font-bold text-slate-900 text-xs sm:text-sm flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* █ SECTION 14: CITATIONS & OFFICIAL PORTALS */}
            <section
              id="statutory-citations"
              className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>Statutory Authority &bull; Verified References</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                14. Official Legal Citations &amp; Statutory References
              </h2>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  This guide is authored under the authoritative supervision of senior advocates at AMA Legal Solutions, strictly complying with the following statutory provisions and constitutional precedents:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                  <li>
                    <strong>Maintenance and Welfare of Parents and Senior Citizens Act, 2007:</strong> Section 23 (Transfer of property to be void in certain circumstances); Section 5 (Application for maintenance); Section 7 (Constitution of Maintenance Tribunal); Section 16 (Appeals); Section 17 (Right to legal representation); Section 22 (Protection of property).
                  </li>
                  <li>
                    <strong>Transfer of Property Act, 1882:</strong> Section 122 (Gift defined); Section 123 (Transfer how effected); Section 126 (When gift may be suspended or revoked).
                  </li>
                  <li>
                    <strong>Indian Succession Act, 1925:</strong> Section 59 (Person capable of making Wills); Section 62 (Will may be revoked or altered); Section 63 (Execution of unprivileged Wills).
                  </li>
                  <li>
                    <strong>Landmark Supreme Court Judgments:</strong> <em>Urmila Dixit v. Sunil Sharan Dixit &amp; Ors.</em> (2025 INSC 20, decided Jan 2, 2025); <em>Sudesh Chhikara v. Ramti Devi &amp; Anr.</em> (2022 INSC 1277); <em>S. Vanitha v. Deputy Commissioner, Bengaluru Urban</em> (2020 INSC 696).
                  </li>
                </ul>
              </div>

              {/* Verified Government Portals */}
              <div className="pt-3 border-t border-slate-200">
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Verified Government Legal Portals:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    {
                      name: "Supreme Court of India Judgments",
                      url: "https://main.sci.gov.in/judgments",
                    },
                    {
                      name: "India Code Legislative Repository",
                      url: "https://www.indiacode.nic.in",
                    },
                    {
                      name: "Ministry of Social Justice & Empowerment",
                      url: "https://socialjustice.gov.in",
                    },
                    {
                      name: "eCourts Services India",
                      url: "https://ecourts.gov.in",
                    },
                  ].map((p, idx) => (
                    <a
                      key={idx}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                    >
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                      <span>{p.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Related Internal Succession Guides */}
              <div className="pt-3 border-t border-slate-200">
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Related Estate Planning &amp; Succession Guides:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    {
                      label: "Gift Deed vs Will Decision Guide",
                      href: "/blogs/gift-deed-vs-will-india",
                    },
                    {
                      label: "Will Format India Guide",
                      href: "/templates/will-format-india",
                    },
                    {
                      label: "How to Challenge a Will in India",
                      href: "/blogs/how-to-challenge-a-will-in-india",
                    },
                    {
                      label: "WillDrafting Pricing Plans",
                      href: "/pricing",
                    },
                    {
                      label: "Start Your Will Online",
                      href: "/start",
                    },
                  ].map((g, idx) => (
                    <Link
                      key={idx}
                      href={g.href}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-xs font-medium transition-colors"
                    >
                      <span>{g.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </main>

          {/* ──────────────────────────────────────────────────
              RIGHT COLUMN: STICKY SIDEBAR (Author & CTA Cards)
              ────────────────────────────────────────────────── */}
          <aside className="space-y-6 sticky top-28">
            
            {/* CARD 1: AUTHOR BIO CARD */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-base shrink-0">
                  RR
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
                    Advocate Rajeshwar Rao
                  </h3>
                  <p className="text-[11px] font-bold text-[#C65378]">Senior Succession Counsel</p>
                  <p className="text-[10px] text-slate-500">AMA Legal Solutions</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Advocate Rao has over 18 years of specialized practice in elder property disputes, testamentary successions, and High Court writ litigation under the Senior Citizens Act.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Bar Council Verified
                </span>
                <span>Oct 2026</span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-6 desktop-sidebar-only">
{/* CARD 2: EMERGENCY CTA CARD */}
            <div className="hidden lg:block rounded-2xl bg-[#172228] p-6 text-white text-center space-y-4 shadow-lg shadow-[#172228]/15">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold tracking-wider uppercase text-rose-200">
                <Lock className="w-3 h-3 text-[#C65378]" />
                <span>Parent Protection Shield</span>
              </div>
              <h3 className="text-lg font-extrabold leading-tight">
                Facing Child Neglect After Property Gift?
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Do not suffer in silence. Consult specialized senior citizen advocates to draft maintenance demand notices or create an airtight Will securing remaining assets.
              </p>
              <button
                onClick={handleStartDraft}
                className="w-full py-3 px-4 rounded-full bg-[#C65378] text-white font-extrabold text-xs hover:bg-[#b04568] transition-all transform hover:-translate-y-0.5 shadow-md shadow-[#C65378]/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Draft a Secure Will Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <div className="pt-2 border-t border-white/10 text-[11px] text-white/70 flex items-center justify-center gap-2">
                <PhoneCall className="w-3 h-3 text-rose-300" />
                <span>Advocate consultation included</span>
              </div>
            </div>

            {/* CARD 3: TRUST & BENEFITS CHECKLIST */}
            <div className="hidden lg:block bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>Senior Citizen Safeguards</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>100% Lifetime Title:</strong> You remain absolute owner for life under a Will.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Court Burden:</strong> Revoke or change beneficiaries anytime without litigation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Stamp Duty:</strong> Wills attract ₹0 stamp duty nationwide.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Urmila Dixit Aligned:</strong> Maintenance clauses drafted by senior advocates.
                  </span>
                </li>
              </ul>
            </div>

            {/* CARD 4: RELATED GUIDES */}
            <div className="hidden lg:block bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span>Recommended Guides</span>
              </h3>
              <div className="space-y-2.5">
                <Link
                  href="/blogs/gift-deed-vs-will-india"
                  className="block p-3 rounded-xl border border-slate-200/80 hover:border-rose-200 hover:bg-rose-50/30 transition-all text-xs group"
                >
                  <span className="font-bold text-slate-900 group-hover:text-[#C65378] transition-colors block">
                    Gift Deed vs Will Which is Better?
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                    Complete Cost &amp; Tax Comparison <ArrowRight className="w-3 h-3 text-[#C65378]" />
                  </span>
                </Link>
                <Link
                  href="/templates/will-format-india"
                  className="block p-3 rounded-xl border border-slate-200/80 hover:border-rose-200 hover:bg-rose-50/30 transition-all text-xs group"
                >
                  <span className="font-bold text-slate-900 group-hover:text-[#C65378] transition-colors block">
                    Will Format India Guide
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                    Free Legally Verified Template <ArrowRight className="w-3 h-3 text-[#C65378]" />
                  </span>
                </Link>
                <Link
                  href="/blogs/how-to-challenge-a-will-in-india"
                  className="block p-3 rounded-xl border border-slate-200/80 hover:border-rose-200 hover:bg-rose-50/30 transition-all text-xs group"
                >
                  <span className="font-bold text-slate-900 group-hover:text-[#C65378] transition-colors block">
                    How to Challenge a Will in India
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                    Grounds &amp; Limitation Period <ArrowRight className="w-3 h-3 text-[#C65378]" />
                  </span>
                </Link>
              </div>
            </div>
            </div>

            {/* MOBILE ONLY: Related WillDrafting Guides */}
            <div className="pt-4 border-t border-slate-100 block lg:hidden">
              <span className="text-xs font-bold text-[#172228] block mb-2">Related WillDrafting Guides:</span>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/blogs/gift-deed-vs-will-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Gift Deed vs Will
                </Link>
                <Link
                  href="/blogs/how-to-challenge-a-will-in-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  How to Challenge a Will
                </Link>
                <Link
                  href="/templates/will-format-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Free Indian Will Format
                </Link>
                <Link
                  href="/templates/release-deed-format"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Relinquishment Deed Format
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* =========================================================================
          IMAGE ZOOM MODAL (High-Resolution Preview)
          ========================================================================= */}
      {showImageModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-6"
          onClick={() => setShowImageModal(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold">
                <Scale className="w-4 h-4 text-[#C65378]" />
                <span>Gift Deed Cancellation under MWPSC Act Section 23 — Supreme Court Architecture</span>
              </div>
              <button
                onClick={() => setShowImageModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative w-full aspect-video bg-slate-100">
              <Image
                src="/images/gift-deed-cancellation-senior-citizens-act-section-23.jpg"
                alt="Can Gift Deed Be Cancelled by Parents Under Senior Citizens Act Section 23"
                fill
                className="object-contain"
              />
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span>Verified precedent: Urmila Dixit v. Sunil Sharan Dixit (2025 INSC 20)</span>
              <button
                onClick={() => setShowImageModal(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
