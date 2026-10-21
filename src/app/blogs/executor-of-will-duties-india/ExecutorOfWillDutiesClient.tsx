"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  FileText,
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
  Calendar,
  Lock,
  PhoneCall,
  Clock,
  Sparkles,
  HelpCircle,
  AlertCircle,
  FileCheck,
  Landmark,
  Gavel,
  Check,
  Layers,
  Download,
  Users,
  Home,
  Copy,
  Split,
  Globe2,
  Printer,
  ArrowUpRight,
  DollarSign,
  Briefcase,
  Bookmark,
  FileSpreadsheet,
  Eye,
  Info,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "executive-summary", label: "Executive Brief: Executor Roles in India" },
  { id: "statutory-framework", label: "1. Legal Definition & Duties Under the ISA" },
  { id: "executor-vs-administrator", label: "2. Executor vs Administrator vs Nominee" },
  { id: "priority-of-debts", label: "3. Priority of Debts & ISA Section 325" },
  { id: "first-90-days-checklist", label: "4. Printable 90-Day Executor Action Plan" },
  { id: "interactive-checklist", label: "5. Interactive Legal Compliance Checklist" },
  { id: "visual-blueprint", label: "6. Visual Blueprint: First 90 Days Roadmap" },
  { id: "step-by-step-sop", label: "7. Step-by-Step SOP: Settling an Estate" },
  { id: "powers-and-limitations", label: "8. Legal Powers & Restrictions of Executors" },
  { id: "renunciation-rules", label: "9. Can an Executor Refuse or Resign?" },
  { id: "common-mistakes", label: "10. Common Mistakes by First-Time Executors" },
  { id: "avoid-with-a-will", label: "11. Why Naming an Executor Saves Your Family" },
  { id: "specialized-scenarios", label: "12. NRI Executors & Multiple Co-Executors" },
  { id: "legal-services", label: "13. Estate Settlement Lawyers at AMA Legal" },
  { id: "frequently-asked-questions", label: "14. Frequently Asked Questions: Executor Duties" },
  { id: "statutory-citations", label: "15. Official Acts, Sections & Court Rulings" },
];

const PRINTABLE_CHECKLIST_TEXT = `================================================================================
EXECUTOR'S FIRST 90 DAYS LEGAL ACTION PLAN (INDIA)
Statutory Authority: Indian Succession Act, 1925 (Sections 2(c), 211, 222, 317)
Prepared by WillDrafting.in · Powered by AMA Legal Solutions
================================================================================

PHASE 1: DAYS 1 TO 7 | IMMEDIATE SAFEGUARDING & ESSENTIAL NOTIFICATIONS
[ ] Step 1.1: Locate the original signed Last Will and any Codicils. Deposit them in a safe fireproof box.
[ ] Step 1.2: Obtain 15 to 20 original stamped death certificates from the local Municipal Corporation.
[ ] Step 1.3: Supervise funeral and memorial arrangements according to the testator's wishes and keep all bills.
[ ] Step 1.4: Inform all immediate family members, named beneficiaries, and co-executors about the Will.

PHASE 2: DAYS 8 TO 30 | ASSET DISCOVERY, CUSTODY & INSTITUTIONAL INTIMATION
[ ] Step 2.1: Take physical possession of property keys, title deeds, vehicle papers, and safe locker access.
[ ] Step 2.2: Compile a complete Master Asset Ledger (bank accounts, FDs, demat holdings, mutual funds, gold).
[ ] Step 2.3: Submit formal death intimation letters to banks, depository participants (CDSL/NSDL), and insurers.
[ ] Step 2.4: Stop automated debits, cancel subscriptions, close credit cards, and secure digital accounts.

PHASE 3: DAYS 31 TO 60 | PROBATE AUDIT & STATUTORY COURT FORMALITIES
[ ] Step 3.1: Consult an estate lawyer to check if probate is mandatory under ISA Section 213 (Mumbai, Kolkata, Chennai).
[ ] Step 3.2: If probate is required, file a probate petition under Section 222 and 276 in District or High Court.
[ ] Step 3.3: If probate is not needed, prepare transmission documents (No Objection Certificates and Indemnity Bonds).
[ ] Step 3.4: Obtain professional valuation of immovable properties and assets for court fees and tax records.

PHASE 4: DAYS 61 TO 90 | DEBT SETTLEMENT, TAX FILINGS & FINAL DISTRIBUTION
[ ] Step 4.1: Pay funeral, medical, and legal estate expenses in priority rank under ISA Sections 320 to 322.
[ ] Step 4.2: Clear all verified debts, loans, and legitimate creditor dues under ISA Section 325.
[ ] Step 4.3: File the final income tax return of the deceased as legal representative under Income Tax Act Section 159.
[ ] Step 4.4: Issue formal Executor Assent under Section 332 and transfer specific gifts and assets to beneficiaries.
[ ] Step 4.5: Prepare the final accounting ledger under Section 317 and obtain signed receipt releases from all heirs.

================================================================================
LEGAL CAUTION: An executor acts strictly as a fiduciary. Never distribute estate
assets to beneficiaries before clearing known debts, as this creates personal
liability under ISA Section 368 (Devastavit). For assistance, visit WillDrafting.in.
================================================================================`;

const CHECKLIST_ITEMS = [
  {
    id: "check-1",
    label: "Original Will Secured in Safe Custody",
    subtext: "Original document retrieved and inspected for signatures, dates, and codicils.",
  },
  {
    id: "check-2",
    label: "Death Certificates Issued by Municipal Body",
    subtext: "At least 15 verified copies secured for banks, registrar, and asset transmission.",
  },
  {
    id: "check-3",
    label: "Banks, Demat & Insurers Formally Intimated",
    subtext: "Written notices served to prevent unauthorized account access or withdrawals.",
  },
  {
    id: "check-4",
    label: "Probate Jurisdiction Evaluated Under ISA Section 213",
    subtext: "Assessed whether court probate is legally mandatory in Mumbai, Kolkata, or Chennai.",
  },
  {
    id: "check-5",
    label: "Priority Debts & Deceased ITR Discharged",
    subtext: "Funeral, medical, and tax liabilities settled before any beneficiary payouts.",
  },
  {
    id: "check-6",
    label: "Written Executor Assent & Accounting Completed",
    subtext: "Final accounts rendered and signed releases collected from all beneficiaries.",
  },
];

const COMPARISON_ROWS = [
  {
    feature: "Statutory Basis",
    executor: "Section 2(c), Indian Succession Act, 1925",
    administrator: "Section 2(a), Indian Succession Act, 1925",
    nominee: "RBI / SEBI / Insurance Act Regulations",
  },
  {
    feature: "How Appointed",
    executor: "Directly named by testator inside the written Will",
    administrator: "Appointed by Court through Letters of Administration",
    nominee: "Chosen by account holder on institution forms",
  },
  {
    feature: "Vesting of Estate",
    executor: "Entire property vests in executor under Section 211",
    administrator: "Vests only after formal grant by the court",
    nominee: "Property NEVER vests; acts only as temporary custodian",
  },
  {
    feature: "Need for Court Grant",
    executor: "Can act without court order (unless probate mandatory)",
    administrator: "Cannot take any legal step without court grant",
    nominee: "Collects funds without court order, but holds in trust",
  },
  {
    feature: "Beneficiary Rights",
    executor: "Bound to follow testator instructions exactly",
    administrator: "Distributes strictly by intestate legal succession",
    nominee: "Must surrender 100% of proceeds to legal heirs",
  },
  {
    feature: "Landmark Ruling",
    executor: "Fiduciaries under Section 211 (Supreme Court)",
    administrator: "Court officers under Section 218 & 220",
    nominee: "Sarbati Devi (1984) & Shakti Yezdani (2024 SC)",
  },
];

const DEBT_PRIORITY_ROWS = [
  {
    rank: "Rank 1",
    category: "Funeral & Death-Bed Medical Expenses",
    statute: "ISA Sections 320 & 321",
    description: "Funeral expenses suitable to condition, and medical charges during last illness.",
    status: "Top Priority",
    color: "text-emerald-700 font-bold",
  },
  {
    rank: "Rank 2",
    category: "Probate & Estate Administration Costs",
    statute: "ISA Section 321",
    description: "Court fees, advocate retainers, asset security, and preservation expenses.",
    status: "Essential",
    color: "text-blue-700 font-bold",
  },
  {
    rank: "Rank 3",
    category: "Wages of Servants & Labourers",
    statute: "ISA Section 322",
    description: "Unpaid salaries of domestic staff or workers for 3 months prior to death.",
    status: "Mandatory",
    color: "text-indigo-700 font-bold",
  },
  {
    rank: "Rank 4",
    category: "Secured Loans & Statutory Tax Arrears",
    statute: "ISA Section 323 & Income Tax Act",
    description: "Mortgages, vehicle liens, and deceased income tax liabilities under Section 159.",
    status: "Prior to Legacies",
    color: "text-amber-700 font-bold",
  },
  {
    rank: "Rank 5",
    category: "Unsecured Personal Debts & Cards",
    statute: "ISA Section 325",
    description: "Personal loans, credit card balances, promissory notes, and business dues.",
    status: "Full Discharge",
    color: "text-orange-700 font-bold",
  },
  {
    rank: "Rank 6",
    category: "Specific & Residuary Legacies",
    statute: "ISA Sections 327 & 332",
    description: "Only remaining net assets can be paid to beneficiaries named in the Will.",
    status: "Final Stage",
    color: "text-rose-700 font-bold",
  },
];

const MILESTONE_TIMELINE = [
  {
    days: "Days 1 to 7",
    milestone: "Immediate Safeguarding",
    action: "Secure original Will, obtain municipal death certificates, notify close heirs.",
    authority: "Local Municipal Body",
    badge: "Day 7",
  },
  {
    days: "Days 8 to 20",
    milestone: "Asset Mapping & Discovery",
    action: "Locate bank books, demat statements, locker keys, property deeds, and vehicle titles.",
    authority: "Banks & Registrar",
    badge: "Day 20",
  },
  {
    days: "Days 21 to 30",
    milestone: "Institutional Intimation",
    action: "Serve formal intimation to banks, depository participants, and insurers to freeze debits.",
    authority: "Institutions & DPs",
    badge: "Day 30",
  },
  {
    days: "Days 31 to 45",
    milestone: "Probate Jurisdiction Audit",
    action: "Evaluate whether Section 213 mandates probate; draft court petition if required.",
    authority: "Civil Court Counsel",
    badge: "Day 45",
  },
  {
    days: "Days 46 to 60",
    milestone: "Asset Valuation & Tax Assessment",
    action: "Obtain government-approved valuation reports; calculate deceased tax under Section 159.",
    authority: "Certified Valuer / CA",
    badge: "Day 60",
  },
  {
    days: "Days 61 to 75",
    milestone: "Creditor Settlements",
    action: "Clear verified debts and liabilities strictly following ISA Sections 320 to 325 priority.",
    authority: "Creditor Releases",
    badge: "Day 75",
  },
  {
    days: "Days 76 to 90",
    milestone: "Executor Assent & Distribution",
    action: "Execute formal executor assent, transfer property mutation, and complete final accounts.",
    authority: "Beneficiaries & Heirs",
    badge: "Day 90",
  },
];

const STEP_STAGES = [
  {
    number: "01",
    phase: "Phase 1: Custody",
    title: "Locate Original Will & Order Death Certificates",
    authority: "Municipal Corporation / Panchayat",
    description:
      "Locate the signed original Will and any Codicils. Store them in a secure, fireproof location. Apply for at least 15 to 20 certified copies of the official death certificate from the local registrar. Banks, insurance firms, and revenue departments insist on original stamped certificates.",
  },
  {
    number: "02",
    phase: "Phase 2: Inventory",
    title: "Assemble Comprehensive Asset & Liability Ledger",
    authority: "Banks, Depository Participants & Tax Portals",
    description:
      "Compile a complete inventory of everything the deceased owned. Gather bank savings details, fixed deposits, demat holdings, mutual fund folios, gold locker records, real estate title deeds, and vehicle registrations. Document every outstanding loan, credit card, and utility liability.",
  },
  {
    number: "03",
    phase: "Phase 3: Intimation",
    title: "Serve Formal Notice to Financial Institutions",
    authority: "Branch Managers & Depository Participants",
    description:
      "Issue written death notices with death certificates to all banks and depository participants. This protects the estate by stopping unauthorized withdrawals and standing orders. Request official certificates of balance as of the exact date of death for estate accounting.",
  },
  {
    number: "04",
    phase: "Phase 4: Statutory Path",
    title: "Assess Probate Mandate & File Court Petition",
    authority: "District Court or High Court Jurisdiction",
    description:
      "Determine if the estate requires a court probate. Under Section 213 of the Indian Succession Act, probate is mandatory for Hindu, Sikh, Jain, and Buddhist Wills executed in Mumbai, Kolkata, or Chennai, or covering properties located there. In other states, an executor can act without court grant unless challenged.",
  },
  {
    number: "05",
    phase: "Phase 5: Tax & Debts",
    title: "Clear Debts & File Section 159 Income Tax Returns",
    authority: "Income Tax Department & Verified Creditors",
    description:
      "Pay outstanding liabilities in statutory priority order under ISA Sections 320 to 325. As the legal representative under Section 159 of the Income Tax Act, 1961, register on the e-filing portal and file the deceased person's final income tax return up to the date of demise.",
  },
  {
    number: "06",
    phase: "Phase 6: Assent",
    title: "Execute Executor Assent & Complete Final Accounts",
    authority: "Beneficiaries & Sub-Registrar Office",
    description:
      "Under Section 332 of the ISA, provide formal Executor Assent to complete the beneficiaries' legal title. Hand over specific bequests, assist with revenue mutation for real estate, distribute remaining funds, and obtain signed receipts and indemnity releases from every heir.",
  },
];

const POWERS_GRID = [
  {
    title: "Universal Legal Representation",
    statute: "Section 211, ISA 1925",
    badge: "Core Authority",
    desc: "The executor stands as the legal representative of the deceased for all purposes. All real and personal property of the deceased person vests legally in the executor upon death.",
  },
  {
    title: "Power to Sue & Defend Claims",
    statute: "Section 305 & 306, ISA 1925",
    badge: "Litigation Power",
    desc: "An executor possesses full power to file civil lawsuits, recover debts owed to the deceased, defend against unlawful claims, and demand accounts on behalf of the estate.",
  },
  {
    title: "Power to Sell Estate Property",
    statute: "Section 307, ISA 1925",
    badge: "Disposal Power",
    desc: "An executor can sell or mortgage estate assets to pay funeral expenses, probate fees, and valid debts, provided such sale does not contradict explicit directions in the Will.",
  },
  {
    title: "Fiduciary Duty & Immunity",
    statute: "Section 319 & 368, ISA 1925",
    badge: "Legal Protection",
    desc: "Executors who act in good faith and with reasonable diligence are fully protected. Personal liability only arises if an executor wastes property or favors one heir improperly.",
  },
];

const SCENARIOS = [
  {
    title: "NRI Appointed as Sole Executor",
    icon: Globe2,
    desc: "An NRI can legally serve as an executor in India. However, managing physical property, visiting bank branches, and attending court hearings from overseas is challenging. Appointing a resident co-executor or granting a Special Power of Attorney to a trusted Indian advocate simplifies the entire process.",
  },
  {
    title: "Executor Who is Also a Beneficiary",
    icon: Users,
    desc: "It is 100% legal for an executor to receive property under the Will. A spouse or adult child is very often appointed as executor. The critical legal safeguard is that this person must never sign the Will as an attesting witness, because Section 67 voids bequests made to witnesses.",
  },
  {
    title: "Multiple Co-Executors in Disagreement",
    icon: Split,
    desc: "Under Section 311 of the ISA, when several executors are appointed, probate may be granted to them all. Any one executor can perform ordinary acts of administration, but major property transfers generally require joint consent. If deadlocks occur, any co-executor can seek court directions.",
  },
  {
    title: "Executor Refuses, Resigns, or Dies",
    icon: AlertCircle,
    desc: "No person can be forced to act as an executor. Under Sections 229 and 230, an executor can formally renounce probate before intermeddling. If the executor renounces or passes away, beneficiaries can petition the court for Letters of Administration with the Will annexed under Section 232.",
  },
];

const FAQ_ITEMS = [
  {
    q: "What is an executor of a Will in India?",
    a: "Under Section 2(c) of the Indian Succession Act, 1925, an executor is a trusted individual appointed by the testator in their Will to manage and distribute their estate. The executor stands as the legal representative of the deceased for all purposes under Section 211.",
  },
  {
    q: "What are the primary legal duties of an executor in India?",
    a: "An executor has five core legal duties: (1) Secure the original Will and obtain death certificates; (2) Collect and preserve all estate assets with due diligence; (3) Pay statutory debts in priority order under Sections 320 to 325; (4) Obtain probate if required by jurisdiction; and (5) Distribute assets to beneficiaries and file an estate inventory under Section 317.",
  },
  {
    q: "Is an executor personally liable for the debts of the deceased person?",
    a: "No. An executor is never personally liable for the debts of the deceased out of their own private pocket. Debts are cleared strictly using the assets left behind by the deceased. However, if an executor distributes estate assets to beneficiaries without paying known creditors first, they may become personally liable for wasting estate property (devastavit) under Section 368.",
  },
  {
    q: "Can an executor also be a beneficiary in the same Will?",
    a: "Yes. Under Indian law, an executor can absolutely be a beneficiary. In fact, many individuals appoint a primary heir (such as an adult son, daughter, or spouse) as their executor. However, an executor who is also a beneficiary must never witness the Will, as Section 67 voids gifts to attesting witnesses.",
  },
  {
    q: "Does an executor have the power to sell estate property?",
    a: "Under Section 307 of the Indian Succession Act, an executor has general power to dispose of estate property to pay funeral costs, court expenses, and valid debts of the deceased, unless the Will explicitly restricts this power. When probate is granted, court restrictions on property sales must be strictly obeyed.",
  },
  {
    q: "Can a named executor refuse to take up the role?",
    a: "Yes. No person is legally forced to serve as an executor. Under Sections 229 and 230 of the Indian Succession Act, a named executor can formally renounce their appointment in writing or orally before the court before intermeddling with estate assets. In that case, beneficiaries can apply for Letters of Administration with the Will annexed.",
  },
  {
    q: "What is the difference between an executor and an administrator?",
    a: "An executor is appointed directly by the testator inside a written Will. An administrator is appointed by a court through Letters of Administration when there is no Will (intestate death), or when the Will does not name an executor, or when the named executor renounces or passes away.",
  },
  {
    q: "How long does an executor have to complete estate distribution in India?",
    a: "Under Section 317 of the Indian Succession Act, an executor must exhibit a full inventory of the property and credits within 6 months of probate, and submit a final accounting within 1 year. Section 343 provides an 'executor's year'—meaning an executor cannot generally be compelled to pay out legacies until one year after the testator's death.",
  },
  {
    q: "Is probate always mandatory for an executor in India?",
    a: "Under Section 213 of the Indian Succession Act, probate is mandatory for Wills made by Hindus, Buddhists, Jains, or Sikhs only if made within the historic presidential towns of Mumbai, Kolkata, or Chennai, or if immovable properties are situated within those limits. In other states, probate is optional unless a bank or housing society specifically demands a court grant.",
  },
  {
    q: "Can an executor be removed by court for mismanaging estate assets?",
    a: "Yes. Under Section 301 of the Indian Succession Act, the High Court has inherent power to suspend, remove, or discharge an executor on grounds of gross negligence, fraud, conflict of interest, or unreasonable delay, and appoint a court administrator to safeguard beneficiary interests.",
  },
];

export default function ExecutorOfWillDutiesClient() {
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

  const handleConsultLawyer = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (typeof window !== "undefined") {
      const win = window as unknown as { openSignupModal?: () => void };
      if (typeof win.openSignupModal === "function") {
        win.openSignupModal();
      }
      window.dispatchEvent(new CustomEvent(OPEN_SIGNUP_EVENT));
      window.dispatchEvent(new Event(OPEN_SIGNUP_EVENT));
      document.dispatchEvent(new CustomEvent(OPEN_SIGNUP_EVENT));
      document.dispatchEvent(new Event(OPEN_SIGNUP_EVENT));
    }
  };

  const [activeId, setActiveId] = useState<string>("executive-summary");
  const [copied, setCopied] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    "check-1": true,
    "check-2": true,
    "check-3": false,
    "check-4": false,
    "check-5": false,
    "check-6": false,
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

    const elements = document.querySelectorAll(
      "section[id], div[id].scroll-target"
    );
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const handleToggleChecklist = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopyChecklist = () => {
    navigator.clipboard.writeText(PRINTABLE_CHECKLIST_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrintChecklist = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Executor of Will 90-Day Action Plan - WillDrafting.in</title>
          <style>
            body { font-family: monospace; white-space: pre-wrap; padding: 24px; font-size: 13px; line-height: 1.5; color: #172228; }
            h1 { font-family: sans-serif; font-size: 18px; margin-bottom: 8px; }
          </style>
        </head>
        <body>
          <pre>${PRINTABLE_CHECKLIST_TEXT}</pre>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

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
            <span>INDIAN SUCCESSION ACT &bull; POST-DEATH ESTATE ADMINISTRATION</span>
          </div>

          {/* Single H1 Title (Strictly 30-65 chars, no em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6 drop-shadow-xs">
            Executor of Will Duties in India: 90-Day Legal Roadmap
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            Appointed as an executor? Discover your statutory duties under the Indian Succession Act, follow our printable 90-day execution checklist, and settle the estate smoothly without personal liability.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/start"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/20 cursor-pointer"
            >
              <span>Name a Clear Executor in Your Will</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#first-90-days-checklist"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all"
            >
              <span>View 90-Day Printable Checklist</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (WillDrafting Social Proof & Trust Metrics)
          ========================================================================= */}
      <section className="w-full bg-gradient-to-r from-[#FAF7F0] via-white to-[#FAF7F0] border-y border-[#172228]/10 py-5 sm:py-6 shadow-[0_2px_10px_rgba(23,34,40,0.02)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-x-3 gap-y-6 md:gap-0">
            {/* Stat 1: Testamentary Experience */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                15+ Years
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Estate Administration
              </span>
            </div>

            {/* Stat 2: Wills & Estates Handled */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                10,000+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Executors Guided Across India
              </span>
            </div>

            {/* Stat 3: Assets Settled */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/12">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                ₹3,200Cr+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Estate Assets Distributed
              </span>
            </div>

            {/* Stat 4: Google Rating & Reviews */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 px-1 sm:px-4 md:border-l md:border-[#172228]/12">
              <svg
                className="w-6 h-6 min-[400px]:w-7 min-[400px]:h-7 sm:w-8 sm:h-8 shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>

              <div className="flex items-baseline">
                <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                  4.9/5
                </span>
              </div>

              <div className="flex flex-col text-left leading-tight">
                <span className="text-[11px] sm:text-xs font-bold text-[#172228]">
                  1,450+
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#55636D] font-semibold">
                  Client Reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content Area)
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_300px] xl:grid-cols-[280px_minmax(0,1fr)_320px] gap-6 xl:gap-8 items-start">
          {/* =====================================================================
              LEFT COLUMN: STICKY TABLE OF CONTENTS
              ===================================================================== */}
          <aside className="sticky top-6 hidden lg:block space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-[#172228]">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                  TABLE OF CONTENTS
                </span>
              </div>
              <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                {TOC_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-xs py-2 px-3 rounded-lg transition-all leading-snug ${
                      activeId === item.id
                        ? "bg-rose-50 text-[#C65378] font-bold border-l-2 border-[#C65378]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Indian Succession Act, 1925</span>
                </div>
              </div>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN EDITORIAL CONTENT
              ===================================================================== */}
          <main className="space-y-8 md:space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF */}
            <section
              id="executive-summary"
              className="scroll-target rounded-2xl bg-[#FAF2EB] border-l-[5px] border-l-[#C65378] p-6 sm:p-7 shadow-xs space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Bookmark className="w-4 h-4" />
                <span>EXECUTIVE BRIEF</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Executive Brief: Executor Roles in India
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Serving as an executor in India is a fiduciary honor and a serious legal responsibility. Here are the core statutory realities every executor must understand:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <span>
                    <strong>Statutory Owner:</strong> Under Section 211, all estate property legally vests in the executor.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Personal Liability:</strong> Debts are paid only from estate assets, never from personal funds.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <span>
                    <strong>Strict Priority Rules:</strong> Funeral and taxes must be cleared before any beneficiary payout.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <span>
                    <strong>Probate Boundary:</strong> Mandatory only in Mumbai, Kolkata, Chennai or where land lies therein.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <span>
                    <strong>Devastavit Risk:</strong> Distributing gifts ahead of creditors triggers personal legal liability.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <span>
                    <strong>Freedom to Refuse:</strong> Any named executor may renounce probate before starting administration.
                  </span>
                </li>
              </ul>
            </section>

            {/* SECTION 1: STATUTORY FRAMEWORK */}
            <section id="statutory-framework" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>Statutory Authority</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                1. Legal Definition &amp; Duties Under the ISA
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                When a family member or friend passes away and leaves a Last Will, someone must take charge of carrying out their final wishes. In Indian law, this person is known as the <strong>Executor</strong>.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Under <strong>Section 2(c) of the Indian Succession Act, 1925</strong>, an executor is formally defined as: <em>&ldquo;a person to whom the execution of the last will of a deceased person is, by the testator&rsquo;s appointment, confided.&rdquo;</em> In plain words, the deceased trusted you above everyone else to settle their debts, handle their accounts, and give their hard-earned assets to their chosen beneficiaries.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                The most important legal provision is <strong>Section 211 of the Indian Succession Act</strong>. This section declares that the executor is the <em>legal representative of the deceased for all purposes</em>. All the real estate, bank deposits, shares, and personal belongings of the deceased person automatically vest in the executor upon death.
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
                <span className="font-bold text-[#172228] block flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-[#5F7E75]" />
                  What Does &ldquo;Vesting&rdquo; Mean in Plain English?
                </span>
                <p>
                  Vesting does <strong>not</strong> mean you become the personal owner of the wealth. Instead, you hold legal title strictly as a <strong>fiduciary trustee</strong>. You hold the keys so that no unauthorized person can sell the house, empty the bank accounts, or take the jewellery until debts are paid and the Will is properly executed.
                </p>
              </div>
            </section>

            {/* SECTION 2: COMPARISON TABLE */}
            <section id="executor-vs-administrator" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>Legal Comparison</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                2. Executor vs Administrator vs Nominee
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Many families confuse an executor with an administrator or a bank nominee. These three roles are completely distinct under Indian law. Understanding who has what legal power prevents bitter disputes:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[620px]">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3.5 sm:p-4 font-bold border-r border-slate-800">Feature</th>
                      <th className="p-3.5 sm:p-4 font-bold border-r border-slate-800">Executor</th>
                      <th className="p-3.5 sm:p-4 font-bold border-r border-slate-800">Administrator</th>
                      <th className="p-3.5 sm:p-4 font-bold">Nominee (Bank / Demat)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {COMPARISON_ROWS.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-[#FAF7F0]/60"}>
                        <td className="p-3.5 sm:p-4 font-bold text-slate-900 border-r border-slate-100">
                          {row.feature}
                        </td>
                        <td className="p-3.5 sm:p-4 text-slate-700 border-r border-slate-100">
                          {row.executor}
                        </td>
                        <td className="p-3.5 sm:p-4 text-slate-700 border-r border-slate-100">
                          {row.administrator}
                        </td>
                        <td className="p-3.5 sm:p-4 text-slate-600">
                          {row.nominee}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 italic">
                <strong>Crucial Takeaway:</strong> As confirmed by the Supreme Court of India in <em>Sarbati Devi (1984)</em> and reaffirmed in <em>Shakti Yezdani v. Jamshed Irani (2024)</em>, a nominee is merely a temporary recipient who receives funds on behalf of the true legal heirs or beneficiaries specified in the Will.
              </p>
            </section>

            {/* SECTION 3: PRIORITY OF DEBTS */}
            <section id="priority-of-debts" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <DollarSign className="w-4 h-4" />
                <span>Statutory Order of Settlement</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                3. Priority of Debts &amp; ISA Section 325
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                The most dangerous mistake an inexperienced executor can make is handing over cash, jewellery, or property to beneficiaries right away. Under <strong>Section 325 of the Indian Succession Act</strong>, all debts of the deceased person <strong>must be paid before any legacy or inheritance is distributed</strong>.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                The Indian Succession Act sets down a strict mathematical order of priority for settling expenses. You must clear higher-ranking debts first:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[620px]">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3.5 sm:p-4 font-bold border-r border-slate-800">Rank</th>
                      <th className="p-3.5 sm:p-4 font-bold border-r border-slate-800">Expense Category</th>
                      <th className="p-3.5 sm:p-4 font-bold border-r border-slate-800">Governing Statute</th>
                      <th className="p-3.5 sm:p-4 font-bold border-r border-slate-800">Legal Description</th>
                      <th className="p-3.5 sm:p-4 font-bold">Priority Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {DEBT_PRIORITY_ROWS.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-[#FAF7F0]/60"}>
                        <td className="p-3.5 sm:p-4 font-mono font-bold text-slate-900 border-r border-slate-100">
                          {row.rank}
                        </td>
                        <td className="p-3.5 sm:p-4 font-semibold text-slate-800 border-r border-slate-100">
                          {row.category}
                        </td>
                        <td className="p-3.5 sm:p-4 text-slate-600 font-mono text-xs border-r border-slate-100">
                          {row.statute}
                        </td>
                        <td className="p-3.5 sm:p-4 text-slate-700 border-r border-slate-100">
                          {row.description}
                        </td>
                        <td className={`p-3.5 sm:p-4 text-xs ${row.color}`}>
                          {row.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  Warning: The Legal Risk of &ldquo;Devastavit&rdquo; (Wasting Estate Property)
                </span>
                <p>
                  Under <strong>Section 368 of the Indian Succession Act</strong>, if an executor hands out assets to children or relatives and leaves a bank loan or tax bill unpaid, the executor becomes <strong>personally liable</strong> to repay that creditor out of their own private pocket. Always pay creditors before beneficiaries.
                </p>
              </div>
            </section>

            {/* SECTION 4: PRINTABLE CHECKLIST */}
            <section id="first-90-days-checklist" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSpreadsheet className="w-4 h-4" />
                <span>Action Plan &amp; Download</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                4. Printable 90-Day Executor Action Plan
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Estate administration can feel overwhelming during bereavement. This comprehensive, lawyer-approved 90-day checklist organizes every single statutory responsibility into clean weekly phases.
              </p>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Complete 90-Day Plain Text Action Plan
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyChecklist}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-600" />
                        <span>Copy Checklist</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handlePrintChecklist}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#172228] hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Action Plan</span>
                  </button>
                </div>
              </div>

              {/* Monospace Printable Block */}
              <div className="relative rounded-2xl bg-slate-900 text-slate-100 p-5 sm:p-6 font-mono text-xs leading-relaxed overflow-x-auto shadow-md">
                <pre className="whitespace-pre font-mono">{PRINTABLE_CHECKLIST_TEXT}</pre>
              </div>
            </section>

            {/* SECTION 5: INTERACTIVE CHECKLIST */}
            <section id="interactive-checklist" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>Live Audit Tool</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                5. Interactive Legal Compliance Checklist
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Track your real-time administration progress. Click each compliance checkpoint as you complete it to verify statutory readiness under the Indian Succession Act:
              </p>

              {/* Progress Bar */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700 uppercase tracking-wider">
                    Administration Progress: {completedCount} of {CHECKLIST_ITEMS.length} Completed
                  </span>
                  <span className="text-[#C65378] font-black">
                    {Math.round((completedCount / CHECKLIST_ITEMS.length) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C65378] transition-all duration-300 rounded-full"
                    style={{
                      width: `${(completedCount / CHECKLIST_ITEMS.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Checkbox Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CHECKLIST_ITEMS.map((item) => {
                  const isChecked = checkedItems[item.id] || false;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleToggleChecklist(item.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                        isChecked
                          ? "bg-rose-50/60 border-rose-200 shadow-xs"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isChecked
                            ? "bg-[#C65378] border-[#C65378] text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="space-y-0.5">
                        <div
                          className={`text-xs sm:text-sm font-bold leading-tight ${
                            isChecked ? "text-[#172228] line-through decoration-rose-400" : "text-slate-900"
                          }`}
                        >
                          {item.label}
                        </div>
                        <div className="text-[11px] sm:text-xs text-slate-500 leading-snug">
                          {item.subtext}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 6: VISUAL BLUEPRINT */}
            <section id="visual-blueprint" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Eye className="w-4 h-4" />
                <span>Statutory Blueprint</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                6. Visual Blueprint: First 90 Days Roadmap
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                The chart below visually diagrams the complete ecosystem of an executor&rsquo;s duties in India, from securing the physical Will to institutional bank freezes, real estate mutation, and final accounting:
              </p>

              <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs">
                <div className="relative aspect-[16/9] w-full bg-slate-100">
                  <Image
                    src="/images/executor-of-will-duties-india.jpg"
                    alt="Executor of Will Duties in India 90-Day Execution Roadmap"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                    className="object-cover object-center hover:scale-[1.01] transition-transform duration-300"
                  />
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
                  <div>
                    <span className="font-bold text-slate-800">Visual Guide: </span>
                    <span>Anatomy of Estate Administration under the Indian Succession Act, 1925.</span>
                  </div>
                  <a
                    href="/images/executor-of-will-duties-india.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#C65378] hover:underline"
                  >
                    <span>View High-Resolution</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 7: STEP-BY-STEP SOP (6 Stages) */}
            <section id="step-by-step-sop" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>Chronological Protocol</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                7. Step-by-Step SOP: Settling an Estate
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Follow this verified 6-stage Standard Operating Procedure (SOP) to ensure zero legal errors, rapid transmission, and clean asset transfers:
              </p>

              <div className="space-y-4">
                {STEP_STAGES.map((stage) => (
                  <div
                    key={stage.number}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-full bg-rose-50 text-[#C65378] font-black text-xs flex items-center justify-center border border-rose-100">
                          {stage.number}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#5F7E75]">
                          {stage.phase}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                        {stage.authority}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {stage.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 8: POWERS AND LIMITATIONS */}
            <section id="powers-and-limitations" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>Fiduciary Authority</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                8. Legal Powers &amp; Restrictions of Executors
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                An executor is vested with broad statutory powers to manage the estate, but these powers come with strict fiduciary boundaries. You cannot treat estate property as your own personal domain:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {POWERS_GRID.map((card, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#C65378] bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                        {card.badge}
                      </span>
                      <span className="font-mono text-xs text-slate-500">
                        {card.statute}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
                <span className="font-bold text-[#172228] block">
                  3 Strict Legal Restrictions on Executors:
                </span>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>
                    <strong>No Self-Dealing:</strong> An executor cannot purchase estate property for themselves without court sanction (Section 310).
                  </li>
                  <li>
                    <strong>No Unreasonable Delay:</strong> An executor must submit accounts within 1 year; courts can remove executors for stalling.
                  </li>
                  <li>
                    <strong>No Changing the Will:</strong> An executor has zero power to alter beneficiary shares or favor one child over another.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 9: CAN AN EXECUTOR REFUSE */}
            <section id="renunciation-rules" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <UserCheck className="w-4 h-4" />
                <span>Statutory Renunciation</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                9. Can an Executor Refuse or Resign?
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Yes. In India, nobody can force you to serve as an executor against your will. Being appointed in someone&rsquo;s Will is a proposal, not a mandatory legal summons.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Under <strong>Sections 229 and 230 of the Indian Succession Act</strong>, a named executor may formally renounce probate. Renunciation can be done either orally before the judge or through a signed written statement.
              </p>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-2">
                <span className="font-bold flex items-center gap-1.5 text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  Crucial Condition: You Must Renounce BEFORE &ldquo;Intermeddling&rdquo;
                </span>
                <p>
                  If you start operating the deceased&rsquo;s bank accounts, selling property, or taking physical possession of estate assets (&ldquo;intermeddling&rdquo;), the court considers you to have accepted the office. After intermeddling, you cannot simply walk away without formal permission from the High Court under Section 301.
                </p>
              </div>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                If the executor formally renounces, the Will does not die. Under <strong>Section 232</strong>, the court will issue <strong>Letters of Administration with the Will annexed</strong> to the primary beneficiaries or residuary heirs to administer the estate.
              </p>
            </section>

            {/* SECTION 10: COMMON MISTAKES */}
            <section id="common-mistakes" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4" />
                <span>Pitfalls &amp; Liabilities</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                10. Common Mistakes by First-Time Executors
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Most executors are grieving relatives who have never administered an estate before. Avoid these four common legal errors that lead to family disputes and court litigation:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-rose-100 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase">
                    <AlertCircle className="w-4 h-4" />
                    <span>Mistake 1: Commingling Funds</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Never deposit estate funds, rent collections, or share sales into your personal bank account. Open a dedicated estate account or maintain meticulous separate ledger records.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-rose-100 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase">
                    <AlertCircle className="w-4 h-4" />
                    <span>Mistake 2: Ignoring Deceased Taxes</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under Section 159 of the Income Tax Act, the legal representative must file the deceased&rsquo;s ITR. Ignoring this invites assessment notices and penalties against estate funds.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-rose-100 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase">
                    <AlertCircle className="w-4 h-4" />
                    <span>Mistake 3: Premature Payouts</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Distributing cash to children before paying credit card debts, hospital bills, or housing society dues triggers personal devastavit liability under Section 368.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-rose-100 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase">
                    <AlertCircle className="w-4 h-4" />
                    <span>Mistake 4: Missing Inventory Deadlines</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under Section 317, an executor must exhibit a full property inventory within 6 months of probate and final accounts within 12 months. Non-compliance invites court citations.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: HOW A WILL WOULD HAVE AVOIDED THIS */}
            <section
              id="avoid-with-a-will"
              className="scroll-target rounded-3xl bg-[#172228] p-6 sm:p-8 text-white space-y-5 shadow-lg shadow-slate-950/15"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-rose-200">
                <Sparkles className="w-4 h-4 text-[#C65378]" />
                <span>THE CONVERSION BRIDGE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
                11. Why Naming an Executor Saves Your Family
              </h2>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                When someone dies without a Will in India (intestate), there is no executor. The entire family is thrown into administrative chaos. Relatives must spend months arguing over who should manage the assets, obtaining legal heir certificates, and petitioning civil courts for Letters of Administration or Succession Certificates.
              </p>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                By taking 15 minutes to draft a legally binding Will online and naming a primary and alternate executor, you save your grieving family years of court visits, tens of thousands in legal fees, and unnecessary institutional freezes.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white font-bold transition-all shadow-md cursor-pointer"
                >
                  <span>Draft Your Legal Will Online &mdash; Just ₹1,499</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/templates/will-format-india"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all"
                >
                  <span>View Standard Will Format</span>
                </Link>
              </div>
            </section>

            {/* SECTION 12: SPECIALIZED SCENARIOS */}
            <section id="specialized-scenarios" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>Real-World Edge Cases</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                12. NRI Executors &amp; Multiple Co-Executors
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Estates often involve cross-border families, co-executors, or dual roles. Here is how Indian succession law governs these common real-world scenarios:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SCENARIOS.map((scenario, idx) => {
                  const Icon = scenario.icon;
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-[#C65378]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-sm sm:text-base text-slate-900">
                          {scenario.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {scenario.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 13: LEGAL SERVICES */}
            <section id="legal-services" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>Advocate Support</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                13. Estate Settlement Lawyers at AMA Legal
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Estate administration does not have to be handled alone. AMA Legal Solutions provides comprehensive legal counsel to executors, administrators, and beneficiaries across all major Indian states:
              </p>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-slate-900 block">Probate Petitions</span>
                    <span className="text-slate-600">Filing uncontested and contested probate in High Courts &amp; District Courts.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-slate-900 block">Bank &amp; Demat Claims</span>
                    <span className="text-slate-600">Drafting indemnity bonds, NOCs, and handling transmission with DPs.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-slate-900 block">Property Mutation</span>
                    <span className="text-slate-600">Title search, revenue mutation, and registration of Executor Assents.</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                  <div className="text-xs text-slate-600">
                    Need professional assistance administering an Indian estate?
                  </div>
                  <button
                    type="button"
                    data-open-signup="true"
                    onClick={handleConsultLawyer}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#172228] text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <span>Consult an Estate Lawyer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 14: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>Direct Answers</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                14. Frequently Asked Questions: Executor Duties
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Clear, straightforward answers to the most common legal questions about executor duties, probate requirements, personal liability, and asset transmission under Indian law:
              </p>

              <div className="space-y-3 pt-2">
                {FAQ_ITEMS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-2xs hover:border-slate-300"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:bg-slate-50/80 transition-colors cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#C65378] shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 15: CITATIONS & SOURCES */}
            <section id="statutory-citations" className="scroll-target space-y-4 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
                <BookOpen className="w-4 h-4 text-[#5F7E75]" />
                <span>Legal Authority &amp; Statutory Sources</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                15. Official Acts, Sections &amp; Court Rulings
              </h2>
              <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside leading-relaxed">
                <li>
                  <strong>Indian Succession Act, 1925:</strong> Section 2(c) (definition of executor), Section 211 (property vests in executor), Section 213 (probate requirements), Section 222 (probate only to appointed executor), Section 229 &amp; 230 (renunciation of probate), Section 307 (power to dispose property), Section 317 (inventory &amp; account within 6/12 months), Sections 320 to 325 (priority of debts), Section 332 (assent of executor), Section 368 (liability for devastavit).
                </li>
                <li>
                  <strong>Income Tax Act, 1961:</strong> Section 159 (legal representative liability to file deceased tax returns).
                </li>
                <li>
                  <strong>Supreme Court of India Precedents:</strong> <em>Sarbati Devi v. Usha Devi</em> (1984 AIR 346 - nominee holds funds as trustee for heirs), <em>Shakti Yezdani v. Jamshed Irani</em> (2024 INSC 77 - demat nominee has no ownership rights overriding a Will), <em>Falan v. Dalan</em> (fiduciary character of executors).
                </li>
              </ul>

              <div className="pt-4 space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                  Related Internal Guides &amp; Tools
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Link
                    href="/service/probate-lawyer"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] text-slate-700 hover:text-[#C65378] transition-colors"
                  >
                    Probate Legal Services
                  </Link>
                  <Link
                    href="/tools/probate-checker"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] text-slate-700 hover:text-[#C65378] transition-colors"
                  >
                    Probate Risk Checker
                  </Link>
                  <Link
                    href="/templates/will-format-india"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] text-slate-700 hover:text-[#C65378] transition-colors"
                  >
                    Standard Will Format India
                  </Link>
                  <Link
                    href="/blogs/property-transfer-after-death-without-will-india"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] text-slate-700 hover:text-[#C65378] transition-colors"
                  >
                    Property Transfer After Death
                  </Link>
                  <Link
                    href="/blogs/legal-heir-certificate-vs-succession-certificate"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] text-slate-700 hover:text-[#C65378] transition-colors"
                  >
                    Legal Heir vs Succession Certificate
                  </Link>
                  <Link
                    href="/blogs/how-to-challenge-a-will-in-india"
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#C65378] text-slate-700 hover:text-[#C65378] transition-colors"
                  >
                    How to Challenge a Will
                  </Link>
                </div>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (Author Bio & Emergency CTAs)
              ===================================================================== */}
          <aside className="space-y-5 sticky top-6">
            {/* CARD 1: AUTHOR BIO CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-[#C65378] font-bold text-base shrink-0">
                  RR
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">
                    Advocate Rajeshwar Rao
                  </div>
                  <div className="text-[11px] font-semibold text-[#C65378]">
                    Senior Succession Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bar Council enrolled advocate with 18+ years of expertise in testamentary administration, probate petitions, and estate structuring at AMA Legal Solutions.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#5F7E75]" />
                  <span>High Court Bar</span>
                </span>
                <span className="text-[#5F7E75] font-semibold">Verified Counsel</span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-5 desktop-sidebar-only">
{/* CARD 2: EMERGENCY CTA CARD */}
            <div className="hidden lg:block rounded-3xl bg-[#172228] p-6 text-white text-center space-y-4 shadow-lg shadow-slate-950/15">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold tracking-wider uppercase text-rose-200">
                <ShieldCheck className="w-3 h-3 text-[#C65378]" />
                <span>CONFIDENTIAL ESTATE ADVICE</span>
              </div>
              <h3 className="text-lg font-bold leading-tight">
                Need Help Administering an Estate in India?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect with our specialized succession advocates for probate petitions, bank transmission, asset mutation, and estate tax compliance.
              </p>
              <button
                type="button"
                data-open-signup="true"
                onClick={handleConsultLawyer}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <span>Consult an Estate Lawyer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <div className="pt-1 flex items-center justify-center gap-1 text-[11px] text-slate-400">
                <Lock className="w-3 h-3 text-[#5F7E75]" />
                <span>100% Client-Attorney Confidential</span>
              </div>
            </div>

            {/* CARD 3: TRUST & BENEFITS CHECKLIST */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 block">
                Executor Support Services
              </span>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Probate Filing:</strong> High Court &amp; District Court petitions.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Bank Transmission:</strong> Indemnity bonds &amp; NOC documentation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Property Mutation:</strong> SRO &amp; municipal revenue registration.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Estate Accounting:</strong> Section 317 inventory compliance.
                  </span>
                </li>
              </ul>
            </div>

            {/* CARD 4: RECOMMENDED SUCCESSION GUIDES */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 block">
                Recommended Succession Guides
              </span>
              <div className="space-y-2">
                <Link
                  href="/service/probate-lawyer"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all"
                >
                  <div className="font-bold text-xs text-slate-900">
                    Probate of Will Lawyers
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                    <span>Court probate grant &amp; petition</span>
                    <ArrowRight className="w-2.5 h-2.5 text-[#C65378]" />
                  </div>
                </Link>

                <Link
                  href="/tools/probate-checker"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all"
                >
                  <div className="font-bold text-xs text-slate-900">
                    Is Probate Required in India?
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                    <span>Free 5-question diagnostic checker</span>
                    <ArrowRight className="w-2.5 h-2.5 text-[#C65378]" />
                  </div>
                </Link>

                <Link
                  href="/blogs/property-transfer-after-death-without-will-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all"
                >
                  <div className="font-bold text-xs text-slate-900">
                    Property Transfer After Death
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                    <span>Inheritance roadmap &amp; mutation</span>
                    <ArrowRight className="w-2.5 h-2.5 text-[#C65378]" />
                  </div>
                </Link>

                <Link
                  href="/blogs/how-to-challenge-a-will-in-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all"
                >
                  <div className="font-bold text-xs text-slate-900">
                    How to Challenge a Will in India
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                    <span>Grounds, evidence &amp; limitation</span>
                    <ArrowRight className="w-2.5 h-2.5 text-[#C65378]" />
                  </div>
                </Link>
              </div>
            </div>
            </div>

            {/* MOBILE ONLY: Related WillDrafting Guides */}
            <div className="pt-4 border-t border-slate-100 block lg:hidden">
              <span className="text-xs font-bold text-[#172228] block mb-2">Related WillDrafting Guides:</span>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/service/probate-lawyer"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Probate of Will Lawyers
                </Link>
                <Link
                  href="/tools/probate-checker"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Is Probate Required in India?
                </Link>
                <Link
                  href="/blogs/property-transfer-after-death-without-will-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Property Transfer After Death
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
      </div>
    </div>
  );
}
