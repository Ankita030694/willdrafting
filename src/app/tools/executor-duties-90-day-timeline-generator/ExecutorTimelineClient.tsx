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
  Printer,
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
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  RefreshCw,
  Landmark,
  Check,
  X,
  MapPin,
  Building2,
  Info,
  DollarSign,
  Gavel,
  Calculator,
  Percent,
  Copy,
  CheckCheck,
  TrendingUp,
  Sliders,
  Users,
  FileText,
  Layers,
  Globe,
  Coins,
  Calendar,
  AlertCircle,
  Briefcase,
  FolderCheck,
  FileSignature,
} from "lucide-react";

interface MilestoneTask {
  id: string;
  phaseId: "immediate" | "freezing" | "debts" | "tax" | "court" | "transmission" | "closing";
  phaseTitle: string;
  dayRange: string;
  deadlineDays: number;
  title: string;
  statute: string;
  description: string;
  mandatory: boolean;
  presidencyOnly?: boolean;
  nonPresidencyOnly?: boolean;
}

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. What is an Executor in India?" },
  { id: "interactive-timeline", label: "2. Interactive 90-Day Executor Timeline" },
  { id: "first-14-days-custody", label: "3. First 14 Days: Immediate Custody" },
  { id: "asset-freezing-debt-hierarchy", label: "4. Days 15 to 45: Freezing & Debts" },
  { id: "probate-tax-compliance", label: "5. Days 46 to 90: Probate & Section 159" },
  { id: "section-317-statutory-deadlines", label: "6. Section 317: 6 & 12 Month SOP" },
  { id: "presidency-vs-non-presidency", label: "7. Presidency Towns vs Non-Presidency" },
  { id: "section-369-devastavit-risks", label: "8. Section 369: Personal Liability" },
  { id: "step-by-step-bank-demat-sop", label: "9. Step-by-Step Bank & Demat Claims" },
  { id: "practical-case-studies", label: "10. Real Case Studies: Delhi & Mumbai" },
  { id: "legal-notice-templates", label: "11. Section 360 Notice & Assent Deed" },
  { id: "institutional-profile", label: "12. Legal Backing & Advocate Profile" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Statutory Citations & Official Portals" },
];

const FAQS = [
  {
    q: "What should an executor do first after the death of the testator?",
    a: "Under Section 316 of the Indian Succession Act, 1925, the executor's immediate statutory duty is to provide a suitable funeral for the deceased according to their religious rites and station in life. Under Section 319, necessary funeral and medical expenses hold first legal charge on the deceased estate and must be paid before any other debts or legacies.",
  },
  {
    q: "Is probate mandatory for an executor to act in India?",
    a: "Under Sections 57 and 213 of the Indian Succession Act, 1925, probate is mandatory for Wills made by Hindus, Buddhists, Sikhs, and Jains only if executed within the ordinary original civil jurisdiction of the High Courts of Mumbai, Chennai, or Kolkata, or if immovable property bequeathed is located within these cities. Outside these presidency towns, probate is optional unless demanded by institutions or contested by heirs.",
  },
  {
    q: "What is the statutory deadline to exhibit an asset inventory in court?",
    a: "Under Section 317(1) of the Indian Succession Act, 1925, an executor who has been granted probate must exhibit a full and true inventory of all property in possession and credits within 6 months from the grant. The executor must also exhibit a full account of the administration of the estate within 1 year.",
  },
  {
    q: "What is the legal order of paying debts from a deceased estate in India?",
    a: "The statutory hierarchy under Sections 319 to 323 is: (1) Funeral and deathbed medical expenses (Section 319), (2) Expenses of obtaining probate and legal administration (Section 320), (3) Wages of domestic servants and laborers for 3 months preceding death (Section 321), (4) All other unsecured debts rateably and equally (Section 322). All debts must be fully cleared before any specific or general legacies are distributed (Section 323).",
  },
  {
    q: "What are the executor's tax duties under Section 159 of the Income Tax Act?",
    a: "Under Section 159 of the Income Tax Act, 1961, the executor or legal representative is deemed to be an assessee liable to file the income tax return of the deceased for income earned up to the date of death and pay any outstanding taxes. The executor's personal liability is strictly capped at the value of the estate assets that come into their possession.",
  },
  {
    q: "What is executor assent under Section 332 of the Indian Succession Act?",
    a: "Under Section 332, the assent of the executor is legally necessary to complete a legatee's title to any specific bequest. Until the executor assents, legal title remains vested in the executor. Once the executor verifies that estate debts are satisfied and issues formal written assent, title relates back to the date of death under Section 333.",
  },
  {
    q: "Can an executor be held personally liable for wasting estate property?",
    a: "Yes. Under Section 369 of the Indian Succession Act, 1925 (devastavit), an executor who misapplies the estate or suffers it to be wasted or lost is personally liable to make good the loss to the beneficiaries and creditors. Publishing a statutory notice to creditors under Section 360 protects the executor from unknown liabilities.",
  },
  {
    q: "Can an appointed executor refuse to act or renounce their appointment?",
    a: "Yes. An individual named as executor has the legal right to renounce probate under Section 229 of the Indian Succession Act, provided they have not intermeddled with estate assets or acted as executor. Renunciation can be made orally before the district judge or by writing signed by the person renouncing.",
  },
];

export default function ExecutorTimelineClient() {
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
  const [copiedNotice, setCopiedNotice] = useState<boolean>(false);
  const [copiedAssent, setCopiedAssent] = useState<boolean>(false);
  const [copiedInventory, setCopiedInventory] = useState<boolean>(false);
  const [activeTabFilter, setActiveTabFilter] = useState<string>("all");

  // Form inputs
  const [deathDate, setDeathDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 14);
    return d.toISOString().split("T")[0];
  });
  const [jurisdiction, setJurisdiction] = useState<"presidency" | "non_presidency">("presidency");
  const [cityName, setCityName] = useState<string>("Mumbai");
  const [hasImmovable, setHasImmovable] = useState<boolean>(true);
  const [hasBankAccounts, setHasBankAccounts] = useState<boolean>(true);
  const [hasDematShares, setHasDematShares] = useState<boolean>(true);
  const [hasBusinessAssets, setHasBusinessAssets] = useState<boolean>(false);
  const [willRegistration, setWillRegistration] = useState<"registered" | "unregistered">("registered");
  const [heirHarmony, setHeirHarmony] = useState<"amicable" | "contested">("amicable");

  // Checklist completion state
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({
    "task-1": true,
    "task-2": true,
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

  const handlePrint = () => {
    window.print();
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const toggleTask = (id: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCityChange = (val: string) => {
    setCityName(val);
    if (val === "Mumbai" || val === "Chennai" || val === "Kolkata") {
      setJurisdiction("presidency");
    } else {
      setJurisdiction("non_presidency");
    }
  };

  // Helper date adder
  const addDays = (baseDateStr: string, days: number): string => {
    try {
      const b = new Date(baseDateStr);
      if (isNaN(b.getTime())) return "Invalid Date";
      b.setDate(b.getDate() + days);
      return b.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Pending";
    }
  };

  // Raw Date calculation for days elapsed
  const getDaysElapsed = (): number => {
    try {
      const b = new Date(deathDate);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - b.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } catch {
      return 0;
    }
  };

  const daysElapsed = getDaysElapsed();

  // Milestone Definitions
  const allMilestones: MilestoneTask[] = [
    {
      id: "task-1",
      phaseId: "immediate",
      phaseTitle: "Immediate Custody & Dignity",
      dayRange: "Days 1 to 7",
      deadlineDays: 7,
      title: "Perform Funeral Rites & Secure First Charge on Estate",
      statute: "Section 316 & 319, Indian Succession Act",
      description:
        "Provide a suitable funeral for the deceased according to religious customs. Preserve all burial/cremation bills; funeral costs are the highest statutory priority debt under Section 319.",
      mandatory: true,
    },
    {
      id: "task-2",
      phaseId: "immediate",
      phaseTitle: "Immediate Custody & Dignity",
      dayRange: "Days 1 to 7",
      deadlineDays: 7,
      title: "Take Physical Custody of Original Will & Safe Custody of Keys",
      statute: "Section 211 & 318, Indian Succession Act",
      description:
        "Locate the signed original Will, codicils, and title deeds. Secure physical premises, change locks if necessary, and prevent relatives from removing movable valuables.",
      mandatory: true,
    },
    {
      id: "task-3",
      phaseId: "immediate",
      phaseTitle: "Immediate Custody & Dignity",
      dayRange: "Days 8 to 14",
      deadlineDays: 14,
      title: "Obtain 15-20 Certified Copies of Death Certificate",
      statute: "Registration of Births and Deaths Act, 1969",
      description:
        "Apply at the local municipal corporation / registrar office. Certified copies are required for every bank, mutual fund house, demat DP, SRO, and court registry.",
      mandatory: true,
    },
    {
      id: "task-4",
      phaseId: "freezing",
      phaseTitle: "Asset Freezing & Institution Notices",
      dayRange: "Days 15 to 21",
      deadlineDays: 21,
      title: "Notify Banks to Freeze Accounts & Stop Auto-Debits",
      statute: "RBI Circular DBOD.No.Leg.BC.95/09.07.005/2004-05",
      description:
        "Send written intimation with death certificate to all bank branches. Instruct the bank to freeze individual accounts, stop recurring SIPs and ECS auto-debits to protect estate cash.",
      mandatory: true,
    },
    {
      id: "task-5",
      phaseId: "freezing",
      phaseTitle: "Asset Freezing & Institution Notices",
      dayRange: "Days 15 to 21",
      deadlineDays: 21,
      title: "Intimate NSDL / CDSL Depository Participants",
      statute: "SEBI Master Circular SEBI/HO/MIRSD/POD-1/P/CIR/2024/37",
      description:
        "Notify demat brokers and RTAs (CAMS / KFintech). Ensure shares cannot be unlawfully transacted or transferred until formal transmission documents are submitted.",
      mandatory: hasDematShares,
    },
    {
      id: "task-6",
      phaseId: "freezing",
      phaseTitle: "Asset Freezing & Institution Notices",
      dayRange: "Days 22 to 30",
      deadlineDays: 30,
      title: "Seal Safe Deposit Lockers & Schedule Joint Inventory",
      statute: "RBI Revised Instructions on Safe Deposit Lockers 2021",
      description:
        "Request the bank to seal lockers in the deceased person's sole name. Schedule a formal opening in the presence of bank officials and an independent valuer.",
      mandatory: hasBankAccounts,
    },
    {
      id: "task-7",
      phaseId: "debts",
      phaseTitle: "Creditor Notices & Debt Settlement",
      dayRange: "Days 22 to 45",
      deadlineDays: 45,
      title: "Publish Statutory Notice to Creditors in Newspapers",
      statute: "Section 360, Indian Succession Act",
      description:
        "Publish a formal notice in one English and one vernacular newspaper giving creditors 30 days to file claims. This legally shields the executor from personal devastavit liability under Section 369.",
      mandatory: true,
    },
    {
      id: "task-8",
      phaseId: "debts",
      phaseTitle: "Creditor Notices & Debt Settlement",
      dayRange: "Days 30 to 45",
      deadlineDays: 45,
      title: "Execute Statutory Debt Priority Settlement Hierarchy",
      statute: "Sections 319-323, Indian Succession Act",
      description:
        "Pay debts strictly in legal order: (1) Funeral & deathbed medical bills, (2) Testamentary/probate costs, (3) Domestic servant wages (3 months), (4) General unsecured creditors rateably. No legacies may be paid before debts.",
      mandatory: true,
    },
    {
      id: "task-9",
      phaseId: "tax",
      phaseTitle: "Income Tax Compliance & Estate PAN",
      dayRange: "Days 46 to 60",
      deadlineDays: 60,
      title: "Register as Legal Representative on Income Tax Portal",
      statute: "Section 159, Income Tax Act, 1961",
      description:
        "Upload the registered Will, death certificate, and PAN on the e-filing portal under 'Register as Legal Representative' to obtain access to the deceased assessee's tax account.",
      mandatory: true,
    },
    {
      id: "task-10",
      phaseId: "tax",
      phaseTitle: "Income Tax Compliance & Estate PAN",
      dayRange: "Days 46 to 60",
      deadlineDays: 60,
      title: "File Section 159 Deceased Income Tax Return (ITR)",
      statute: "Section 159 & Section 168, Income Tax Act, 1961",
      description:
        "Compute income from April 1 to the date of demise. File the final ITR and clear outstanding tax dues from estate funds before parting with any assets.",
      mandatory: true,
    },
    {
      id: "task-11",
      phaseId: "court",
      phaseTitle: "Court Probate or Revenue Mutation",
      dayRange: "Days 61 to 90",
      deadlineDays: 90,
      title: "File Mandatory Probate Petition in High Court",
      statute: "Sections 57 & 213, Indian Succession Act",
      description:
        "Mandatory for Wills executed in Mumbai, Chennai, or Kolkata, or involving immovable property within these limits. File Testamentary Petition with court fees (capped at ₹75,000 in Maharashtra).",
      mandatory: jurisdiction === "presidency",
      presidencyOnly: true,
    },
    {
      id: "task-12",
      phaseId: "court",
      phaseTitle: "Court Probate or Revenue Mutation",
      dayRange: "Days 61 to 90",
      deadlineDays: 90,
      title: "Apply for Municipal & Land Revenue Mutation",
      statute: "State Land Revenue Code & Municipal Corporation Act",
      description:
        "Outside presidency towns, probate is not mandatory. Apply to the Tehsildar / Municipal Corporation for mutation into the legatee's name using the registered Will and indemnity bond.",
      mandatory: jurisdiction === "non_presidency" && hasImmovable,
      nonPresidencyOnly: true,
    },
    {
      id: "task-13",
      phaseId: "court",
      phaseTitle: "Court Probate or Revenue Mutation",
      dayRange: "Days 61 to 90",
      deadlineDays: 90,
      title: "Serve Citations & Monitor for Section 284 Caveats",
      statute: "Section 283 & 284, Indian Succession Act",
      description:
        "Serve formal citations to all Class I legal heirs. If heirs are hostile or contested, prepare for a caveat and testamentary suit conversion.",
      mandatory: heirHarmony === "contested",
    },
    {
      id: "task-14",
      phaseId: "transmission",
      phaseTitle: "Inventory Exhibition & Assent",
      dayRange: "Days 91 to 180",
      deadlineDays: 180,
      title: "Exhibit Statutory Asset Inventory within 6 Months",
      statute: "Section 317(1), Indian Succession Act",
      description:
        "File a verified inventory of all immovable and movable properties, debts, and credits in the court registry. Failure to exhibit within 6 months is an offense under Section 176 of IPC.",
      mandatory: jurisdiction === "presidency",
    },
    {
      id: "task-15",
      phaseId: "transmission",
      phaseTitle: "Inventory Exhibition & Assent",
      dayRange: "Days 91 to 180",
      deadlineDays: 180,
      title: "Execute Formal Deed of Assent to Vest Legatee Title",
      statute: "Sections 332 & 333, Indian Succession Act",
      description:
        "Execute a formal registered Deed of Assent or written declaration. Under Section 332, legatee title is incomplete without executor assent; once granted, it relates back to death.",
      mandatory: hasImmovable,
    },
    {
      id: "task-16",
      phaseId: "transmission",
      phaseTitle: "Inventory Exhibition & Assent",
      dayRange: "Days 91 to 180",
      deadlineDays: 180,
      title: "Submit Transmission Claims to Banks & Depository",
      statute: "RBI 15-Day Claim Settlement Circular",
      description:
        "Submit Form Annexure A with KYC, death certificate, probate or registered Will and Indemnity. Banks must settle claims within 15 calendar days of receipt.",
      mandatory: hasBankAccounts || hasDematShares,
    },
    {
      id: "task-17",
      phaseId: "closing",
      phaseTitle: "Final Accounts & Estate Closing",
      dayRange: "Month 12 (Day 365)",
      deadlineDays: 365,
      title: "Distribute General Legacies upon 1-Year Statutory Protection",
      statute: "Section 337, Indian Succession Act",
      description:
        "Executors are not bound to pay legacies until 1 year has elapsed from death. This allows full discovery of latent debts and shields from premature distribution claims.",
      mandatory: true,
    },
    {
      id: "task-18",
      phaseId: "closing",
      phaseTitle: "Final Accounts & Estate Closing",
      dayRange: "Month 12 (Day 365)",
      deadlineDays: 365,
      title: "Exhibit Final True Account of Estate Administration",
      statute: "Section 317(1), Indian Succession Act",
      description:
        "Submit complete audited accounts showing all monies collected, debts settled, taxes paid, and assets handed over, securing discharge of executor liability.",
      mandatory: jurisdiction === "presidency",
    },
  ];

  // Filter tasks based on settings
  const filteredMilestones = allMilestones.filter((m) => {
    if (m.presidencyOnly && jurisdiction !== "presidency") return false;
    if (m.nonPresidencyOnly && jurisdiction !== "non_presidency") return false;
    if (!m.mandatory) return false;

    if (activeTabFilter === "immediate") {
      return m.phaseId === "immediate";
    }
    if (activeTabFilter === "freezing_debts") {
      return m.phaseId === "freezing" || m.phaseId === "debts";
    }
    if (activeTabFilter === "tax_court") {
      return m.phaseId === "tax" || m.phaseId === "court";
    }
    if (activeTabFilter === "transmission_closing") {
      return m.phaseId === "transmission" || m.phaseId === "closing";
    }
    return true;
  });

  const totalVisibleCount = filteredMilestones.length;
  const completedVisibleCount = filteredMilestones.filter((m) => completedTasks[m.id]).length;
  const progressPercent = totalVisibleCount > 0 ? Math.round((completedVisibleCount / totalVisibleCount) * 100) : 0;

  const copyNoticeToClipboard = () => {
    const text = `STATUTORY NOTICE TO CREDITORS UNDER SECTION 360 OF THE INDIAN SUCCESSION ACT, 1925

ESTATE OF LATE [FULL NAME OF DECEASED]
NOTICE IS HEREBY GIVEN pursuant to Section 360 of the Indian Succession Act, 1925, that all creditors and other persons having any claim or demand against the Estate of Late [Full Name of Deceased], who ordinarily resided at [Full Residential Address], and departed this life on [Date of Death], are hereby required to send particulars in writing of their claims and demands to the undersigned, the Executor named in the Last Will and Testament dated [Date of Will], at [Executor Postal Address / Email], on or before [Date: Exactly 30 Days from Publication].

AND NOTICE IS HEREBY FURTHER GIVEN that after the expiration of the said 30 days, the said Executor will proceed to distribute the assets of the deceased among the parties entitled thereto, having regard only to the claims and demands of which notice shall have been so received, and the Executor will not be liable for the assets of the deceased or any part thereof so distributed to any person of whose claim or demand notice shall not have been received at the time of such distribution.

Dated this [Current Day] day of [Current Month], 2026.

[Executor Name]
Sole Executor of the Estate of Late [Deceased Name]
Address: [Executor Address]`;
    navigator.clipboard.writeText(text);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 3000);
  };

  const copyAssentToClipboard = () => {
    const text = `FORMAL DEED OF EXECUTOR ASSENT UNDER SECTION 332 OF THE INDIAN SUCCESSION ACT, 1925

THIS DEED OF ASSENT is executed on this [Day] of [Month], 2026 by:
[Full Name of Executor], aged about [Age] years, residing at [Executor Address] (hereinafter referred to as "THE EXECUTOR", which expression shall include his legal representatives and assigns).

IN FAVOUR OF:
[Full Name of Legatee / Beneficiary], aged about [Age] years, residing at [Legatee Address] (hereinafter referred to as "THE LEGATEE").

WHEREAS:
1. Late [Full Name of Testator] executed his Last Will and Testament dated [Date of Will], appointing the Executor herein as sole executor.
2. The Testator passed away on [Date of Death]. (Probate was granted by the Hon'ble [High Court/District Court Name] in Testamentary Petition No. [Pet No.] on [Date]).
3. By Clause [Number] of the said Will, the Testator specifically bequeathed the property described in the Schedule hereunder to the Legatee.
4. The Executor has fully discharged all funeral expenses, testamentary costs, taxes under Section 159 of the Income Tax Act, and statutory debts of the deceased.

NOW THIS DEED WITNESSETH:
In pursuance of Section 332 and Section 333 of the Indian Succession Act, 1925, the Executor hereby ASSENTS to the bequest of the Schedule Property in favour of the Legatee, to the intent that absolute title, ownership, and right of enjoyment in the Schedule Property shall vest entirely in the Legatee with retrospective effect from the date of death of the Testator.

SCHEDULE OF PROPERTY:
[Detailed description, Municipal No., Survey No., Boundaries of the Property]

IN WITNESS WHEREOF, the Executor has set his hand on the day and year first above written.

_______________________
[EXECUTOR SIGNATURE]`;
    navigator.clipboard.writeText(text);
    setCopiedAssent(true);
    setTimeout(() => setCopiedAssent(false), 3000);
  };

  const copyInventoryToClipboard = () => {
    const text = `SECTION 317(1) STATUTORY INVENTORY & ACCOUNTS AFFIDAVIT FORMAT

IN THE HIGH COURT OF JUDICATURE AT [MUMBAI / CHENNAI / KOLKATA / DISTRICT COURT]
TESTAMENTARY AND INTESTATE JURISDICTION
PETITION NO. [NUMBER] OF 2026

IN THE MATTER OF THE ESTATE OF LATE [DECEASED NAME]
AND
IN THE MATTER OF EXHIBITION OF INVENTORY UNDER SECTION 317(1)

AFFIDAVIT OF INVENTORY OF EXECUTOR
I, [Executor Name], son/daughter of [Father Name], aged [Age] years, residing at [Address], do hereby solemnly affirm and state as follows:

1. I am the Executor to whom Probate of the Last Will and Testament of Late [Deceased Name] was granted by this Hon'ble Court on [Date of Grant].
2. In compliance with Section 317(1) of the Indian Succession Act, 1925, I hereby exhibit in the Schedule annexed hereto a full, true, and complete inventory of all the property in my possession, credits, and debts due to the deceased as on this date.
3. I state that the particulars set forth in Annexure A (Immovable Property), Annexure B (Bank & Demat Assets), and Annexure C (Creditors & Debts Paid) are true and accurate to the best of my knowledge and belief.

DEPONENT (EXECUTOR)`;
    navigator.clipboard.writeText(text);
    setCopiedInventory(true);
    setTimeout(() => setCopiedInventory(false), 3000);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy - Matching Tool Theme)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 • PART IX (SECTIONS 316 TO 369)</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Indian Executor Duties: 90-Day Timeline &amp; Checklist
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Named as executor of a Will in India? Generate your personalized{" "}
            <strong>90-day and 180-day statutory roadmap</strong>. Track funeral expenses priority under
            Section 316, bank asset freezing, High Court probate filings, Section 159 ITR, and Deed of
            Assent execution under Indian succession law.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-timeline"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Generate My 90-Day Executor Timeline</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft a Challenge-Proof Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 316</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                FUNERAL EXPENSES FIRST CHARGE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">6 &amp; 12 Months</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SEC 317 INVENTORY DEADLINES
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 159</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                DECEASED TAX RETURN LIABILITY
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 332</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                EXECUTOR ASSENT TITLE VESTING
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
                <span>Statutory Authority</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Indian Succession Act, 1925 (Sections 57, 211, 213, 217, 316-369) read
                with Section 159 of Income Tax Act, 1961, and landmark Supreme Court rulings in Clarence
                Pais and Crystal Developers.
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
                <span>EXECUTIVE BRIEF: STATUTORY EXECUTOR DUTIES IN INDIA</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>First Statutory Charge (Section 316 &amp; 319):</strong> Funeral and deathbed
                    medical expenses must be settled before all debts and legacies. The executor holds legal
                    authority to reimburse these directly from estate liquid assets.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Mandatory Probate Jurisdictions (Sections 57 &amp; 213):</strong> If the Will
                    was made in Mumbai, Chennai, or Kolkata, or bequeaths immovable property within these
                    cities, High Court probate is mandatory before the executor can establish legal title.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 159 Tax Representation:</strong> The executor is a deemed assessee
                    under the Income Tax Act. You must register as legal representative on the e-filing
                    portal, file the final ITR up to death, and settle tax dues from estate assets.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 332 Executor Assent:</strong> Beneficiaries do not automatically obtain
                    registered title upon death. Legal title vests in the executor under Section 211 until
                    the executor executes a formal Deed of Assent.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Indian Succession Act: Executor Statutory Framework
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Being named an executor in an Indian Will is a solemn fiduciary duty governed by Part IX
                  of the Indian Succession Act, 1925 (Sections 316 to 369). An executor is not merely an
                  informal family coordinator; they are the <strong>legal representative of the deceased</strong>.
                  Under Section 211 of the Act, all property of the deceased person vests in the executor
                  immediately upon death.
                </p>
                <p>
                  Many executors in India face immense confusion after a loved one passes away. Western
                  checklists do not apply in India because Indian estate administration involves unique
                  statutory mechanisms: municipal mutation under state revenue codes, mandatory High Court
                  probate in presidency towns, RBI deceased depositor circulars, and Section 159 tax liability.
                </p>
                <p>
                  If an executor distributes property to legatees without settling debts or publishing a
                  notice to creditors under Section 360, they become personally liable for any unpaid debts
                  under <strong>Section 369 (devastavit)</strong>. Following a disciplined 90-day protocol
                  protects the executor and preserves family peace.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR / ROADMAP GENERATOR */}
            <section id="interactive-timeline" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE 90-DAY &amp; 180-DAY ROADMAP ENGINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive 90-Day Executor Timeline Generator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select the date of death, city jurisdiction, asset classes, and family harmony status.
                Our engine automatically calculates your precise calendar milestones, statutory court
                deadlines, and step-by-step checklist.
              </p>

              {/* Tool Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Configuration Row 1: Date of Death & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-6 border-b border-slate-100">
                  {/* Date of Death Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Date of Demise (Testator)</span>
                    </label>
                    <input
                      type="date"
                      value={deathDate}
                      onChange={(e) => setDeathDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/30 focus:border-[#C65378]"
                    />
                    <div className="text-[11px] text-slate-500 font-medium">
                      Days Elapsed: <span className="font-bold text-[#C65378]">{daysElapsed} days</span> since demise
                    </div>
                  </div>

                  {/* City & Jurisdiction */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>City / Asset Location</span>
                    </label>
                    <select
                      value={cityName}
                      onChange={(e) => handleCityChange(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#C65378]/30 focus:border-[#C65378]"
                    >
                      <option value="Mumbai">Mumbai (Mandatory Probate)</option>
                      <option value="Chennai">Chennai (Mandatory Probate)</option>
                      <option value="Kolkata">Kolkata (Mandatory Probate)</option>
                      <option value="Delhi NCR">Delhi NCR (Non-Presidency)</option>
                      <option value="Bengaluru">Bengaluru (Non-Presidency)</option>
                      <option value="Hyderabad">Hyderabad (Non-Presidency)</option>
                      <option value="Pune">Pune (Non-Presidency)</option>
                      <option value="Other">Other Indian District</option>
                    </select>
                    <div className="text-[11px] font-medium text-slate-500">
                      Status:{" "}
                      <span
                        className={`font-bold ${
                          jurisdiction === "presidency" ? "text-rose-700" : "text-emerald-700"
                        }`}
                      >
                        {jurisdiction === "presidency" ? "Mandatory Probate Area" : "Non-Mandatory Probate Area"}
                      </span>
                    </div>
                  </div>

                  {/* Will Registration Status */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <FileSignature className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Will Registration Type</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setWillRegistration("registered")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          willRegistration === "registered"
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Registered Will
                      </button>
                      <button
                        type="button"
                        onClick={() => setWillRegistration("unregistered")}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          willRegistration === "unregistered"
                            ? "bg-[#C65378] text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Unregistered
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {willRegistration === "registered" ? "High evidentiary presumption" : "Requires witness proof"}
                    </div>
                  </div>
                </div>

                {/* Configuration Row 2: Asset Portfolio & Heir Harmony */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Select Asset Classes In Testator&rsquo;s Estate</span>
                    </label>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Select all assets left by the deceased
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <button
                      type="button"
                      onClick={() => setHasImmovable(!hasImmovable)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                        hasImmovable
                          ? "bg-rose-50/80 border-[#C65378] text-[#C65378] ring-1 ring-[#C65378]/20"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <Building2 className="w-4 h-4 shrink-0" />
                      <span>Real Estate (Land/Flat)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setHasBankAccounts(!hasBankAccounts)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                        hasBankAccounts
                          ? "bg-rose-50/80 border-[#C65378] text-[#C65378] ring-1 ring-[#C65378]/20"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <Landmark className="w-4 h-4 shrink-0" />
                      <span>Bank Accounts &amp; FDs</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setHasDematShares(!hasDematShares)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                        hasDematShares
                          ? "bg-rose-50/80 border-[#C65378] text-[#C65378] ring-1 ring-[#C65378]/20"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <Coins className="w-4 h-4 shrink-0" />
                      <span>Demat &amp; Mutual Funds</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setHasBusinessAssets(!hasBusinessAssets)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                        hasBusinessAssets
                          ? "bg-rose-50/80 border-[#C65378] text-[#C65378] ring-1 ring-[#C65378]/20"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <Briefcase className="w-4 h-4 shrink-0" />
                      <span>Business / Pvt Ltd Shares</span>
                    </button>
                  </div>

                  {/* Heir Harmony Selector */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs">
                    <span className="font-bold text-slate-800 flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#C65378]" />
                      <span>Beneficiary Harmony &amp; Dispute Risk:</span>
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setHeirHarmony("amicable")}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                          heirHarmony === "amicable"
                            ? "bg-emerald-700 text-white shadow-xs"
                            : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        Amicable &amp; Consensual
                      </button>
                      <button
                        type="button"
                        onClick={() => setHeirHarmony("contested")}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                          heirHarmony === "contested"
                            ? "bg-rose-700 text-white shadow-xs"
                            : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        Hostile / Caveat Risk (Sec 284)
                      </button>
                    </div>
                  </div>
                </div>

                {/* DYNAMIC JURISDICTIONAL ADVISORY BANNER */}
                {jurisdiction === "presidency" ? (
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-2">
                    <div className="flex items-center gap-2 font-extrabold text-sm text-amber-900">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>High Court Probate Notice: {cityName} Jurisdiction</span>
                    </div>
                    <p className="text-xs text-amber-900/90 leading-relaxed">
                      Under Sections 57 and 213 of the Indian Succession Act, 1925, probate is{" "}
                      <strong>strictly mandatory</strong> for Hindu, Buddhist, Sikh, and Jain Wills
                      executed in {cityName}, or where immovable property is situated in {cityName}. Banks
                      and cooperative housing societies in {cityName} will not transfer flat shares without
                      an official grant of probate from the High Court.
                    </p>
                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-amber-800">
                        Need High Court testamentary counsel?
                      </span>
                      <Link
                        href="/services/probate-lawyer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#C65378] hover:underline"
                      >
                        <span>Consult Mumbai / Chennai / Kolkata Probate Lawyers</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-200 text-blue-950 space-y-2">
                    <div className="flex items-center gap-2 font-extrabold text-sm text-blue-900">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Non-Presidency Jurisdiction: {cityName} Fast-Track Available</span>
                    </div>
                    <p className="text-xs text-blue-900/90 leading-relaxed">
                      Under settled Supreme Court law (Clarence Pais v. Union of India), probate is{" "}
                      <strong>not mandatory</strong> in {cityName}. As executor, you can directly approach
                      the local municipal corporation and land revenue authorities (Tehsildar) for property
                      mutation using the registered Will, certified death certificate, and Section 332 Deed
                      of Assent.
                    </p>
                  </div>
                )}

                {/* PROGRESS BAR & FILTER CONTROLS */}
                <div className="space-y-4 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        YOUR EXECUTOR STATUTORY PROGRESS
                      </div>
                      <div className="text-base sm:text-lg font-black text-slate-900">
                        {completedVisibleCount} of {totalVisibleCount} Statutory Milestones Completed ({progressPercent}%)
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrint}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Roadmap</span>
                      </button>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-[#C65378] h-full transition-all duration-500 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {[
                      { id: "all", label: `All Milestones (${totalVisibleCount})` },
                      { id: "immediate", label: "Immediate (Days 1-14)" },
                      { id: "freezing_debts", label: "Freezing & Debts (Days 15-45)" },
                      { id: "tax_court", label: "Tax & Probate (Days 46-90)" },
                      { id: "transmission_closing", label: "Transmission (Days 91-365)" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTabFilter(tab.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          activeTabFilter === tab.id
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* DYNAMIC TIMELINE CHECKLIST CARDS */}
                <div className="space-y-4">
                  {filteredMilestones.map((task) => {
                    const isDone = !!completedTasks[task.id];
                    const targetDateStr = addDays(deathDate, task.deadlineDays);

                    return (
                      <div
                        key={task.id}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                          isDone
                            ? "bg-emerald-50/40 border-emerald-200"
                            : "bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs"
                        }`}
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <button
                            type="button"
                            onClick={() => toggleTask(task.id)}
                            className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                              isDone
                                ? "bg-emerald-600 border-emerald-600 text-white"
                                : "border-slate-300 bg-white hover:border-[#C65378]"
                            }`}
                          >
                            {isDone && <Check className="w-4 h-4 stroke-[3]" />}
                          </button>

                          <div className="flex-1 space-y-1.5 min-w-0">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span
                                className={`text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                  isDone
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-rose-50 text-[#C65378] border border-rose-200"
                                }`}
                              >
                                {task.dayRange} • Target: {targetDateStr}
                              </span>
                              <span className="text-[11px] font-semibold text-slate-500">
                                {task.statute}
                              </span>
                            </div>

                            <h3
                              className={`text-sm sm:text-base font-extrabold leading-snug ${
                                isDone ? "text-slate-500 line-through" : "text-slate-900"
                              }`}
                            >
                              {task.title}
                            </h3>

                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                              {task.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* BOTTOM SUMMARY ACTIONS */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-600">
                    Calculated for Date of Demise: <strong>{deathDate}</strong> in <strong>{cityName}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCompletedTasks({})}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Checklist</span>
                    </button>
                    <a
                      href="#legal-notice-templates"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] text-white text-xs font-bold shadow-xs hover:bg-[#a33b5c]"
                    >
                      <span>View Copy-Paste Notice Templates</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* VISUAL FEATURE BLUEPRINT */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Layers className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY VISUAL GUIDE: INDIAN EXECUTOR DUTIES</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Indian Succession Act 1925</span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/executor-duties-90-day-timeline-generator-og.jpg"
                  alt="Executor of Will Checklist India - 90-Day Statutory Roadmap & Duties"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
              </div>
            </div>

            {/* SECTION 3: FIRST 14 DAYS IMMEDIATE DUTIES */}
            <section id="first-14-days-custody" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>PHASE 1: DAYS 1 TO 14</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. First 14 Days: Immediate Duties &amp; Funeral Priority
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The first 14 days after the testator&rsquo;s demise are critical for preventing asset loss
                  and family discord. Under Section 316 of the Indian Succession Act, the executor&rsquo;s
                  paramount legal obligation is to provide a funeral suitable to the deceased person&rsquo;s
                  religious rites and social condition.
                </p>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Section 319: First Charge of Funeral and Medical Expenses</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Indian succession law, funeral expenses and deathbed medical expenses hold priority
                    over ALL other debts, mortgages, promissory notes, and legacies. If the executor or a family
                    member advances funds out-of-pocket for hospital and cremation costs, they have an absolute
                    legal right to reimburse themselves from estate bank accounts before distributing any money.
                  </p>
                </div>
                <p>
                  Concurrently, under Section 318, the executor must collect and secure all property of the
                  deceased. This includes taking possession of original registered title deeds, locker keys,
                  vehicle registration certificates, and stock certificates. Changing physical door locks
                  on residential flats is standard practice if estranged relatives or tenants threaten illegal
                  possession.
                </p>
              </div>
            </section>

            {/* SECTION 4: DAYS 15 TO 45 ASSET FREEZING & DEBTS */}
            <section id="asset-freezing-debt-hierarchy" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>PHASE 2: DAYS 15 TO 45</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Days 15 to 45: Asset Freezing &amp; Debt Hierarchy
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Once death certificates are issued by the Municipal Corporation, the executor must formally
                  notify institutional custodians. Sending written notices with certified death certificates
                  freezes individual bank accounts and stops recurring ECS mandates, SIPs, and standing orders.
                </p>
                <p>
                  When settling debts, Indian law forbids paying general debts haphazardly. Sections 319 to 323
                  mandate a strict legal hierarchy:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-white rounded-xl border border-slate-200/90 text-xs space-y-1">
                    <div className="font-extrabold text-slate-900">Priority 1: Funeral &amp; Medical</div>
                    <p className="text-slate-600">Funeral and deathbed doctor fees (Section 319).</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/90 text-xs space-y-1">
                    <div className="font-extrabold text-slate-900">Priority 2: Probate Expenses</div>
                    <p className="text-slate-600">Court fees, lawyer fees for probate (Section 320).</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/90 text-xs space-y-1">
                    <div className="font-extrabold text-slate-900">Priority 3: Servant Wages</div>
                    <p className="text-slate-600">3 months wages of domestic staff (Section 321).</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200/90 text-xs space-y-1">
                    <div className="font-extrabold text-slate-900">Priority 4: General Creditors</div>
                    <p className="text-slate-600">All other unsecured debts equally (Section 322).</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Crucially, under Section 323, <strong>debts must be paid before legacies</strong>. An
                  executor who distributes family jewellery or cash bequests while credit card bills or personal
                  loans remain unpaid is personally liable to the creditors!
                </p>
              </div>
            </section>

            {/* SECTION 5: DAYS 46 TO 90 PROBATE & TAX COMPLIANCE */}
            <section id="probate-tax-compliance" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>PHASE 3: DAYS 46 TO 90</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Days 46 to 90: Probate Filings &amp; Tax Compliance
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Between day 46 and day 90, the executor must resolve legal court filings and income tax
                  liabilities. Under Section 159 of the Income Tax Act, 1961, the executor is recognized as a
                  deemed assessee for income earned by the deceased up to the date of demise.
                </p>
                <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 text-xs text-slate-700 space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#C65378]" />
                    <span>Section 159 Tax Protocol for Executors</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>Log into the Income Tax e-filing portal using your personal PAN credentials.</li>
                    <li>
                      Navigate to &lsquo;Authorized Partners&rsquo; &gt; &lsquo;Register as Legal
                      Representative&rsquo;.
                    </li>
                    <li>Upload copy of death certificate, PAN card of deceased, and the registered Will.</li>
                    <li>
                      File the final Income Tax Return (ITR) for the broken period (April 1 to death date).
                    </li>
                    <li>
                      Pay tax liability exclusively from estate accounts. Under Section 159(6), personal
                      liability is capped at the value of assets inherited.
                    </li>
                  </ul>
                </div>
                <p>
                  In cities like Mumbai, Chennai, and Kolkata, testamentary petitions for probate must be
                  lodged with the High Court registry within this window, accompanied by affidavits of the
                  attesting witnesses.
                </p>
              </div>
            </section>

            {/* SECTION 6: SECTION 317 STATUTORY DEADLINES */}
            <section id="section-317-statutory-deadlines" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>STATUTORY TIME LIMITS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Section 317 Statutory Deadlines: 6 &amp; 12 Month SOP
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Section 317(1) of the Indian Succession Act imposes two strict statutory deadlines on an
                  executor who has been granted probate:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2 shadow-xs">
                    <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#C65378]" />
                      <span>6-Month Deadline: Asset Inventory</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Within 6 months from the date of grant of probate, the executor must exhibit a verified
                      inventory in the court registry. This inventory must list all immovable properties,
                      credits, bank balances, and jewellery in their possession. Failure to file can be
                      penalized under Section 176 of the Indian Penal Code.
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2 shadow-xs">
                    <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      <FolderCheck className="w-4 h-4 text-emerald-600" />
                      <span>1-Year Deadline: Final Accounts</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Within 1 year from the grant, the executor must exhibit a true and audited account of the
                      estate administration. This account demonstrates all debts paid, funeral costs
                      discharged, and bequests delivered. Once exhibited, the executor is shielded from future
                      misconduct allegations.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: PRESIDENCY TOWNS VS NON-PRESIDENCY */}
            <section id="presidency-vs-non-presidency" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>JURISDICTIONAL COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Presidency Towns vs Non-Presidency Executor Rules
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Whether you need to file a formal High Court probate petition depends strictly on geographic
                jurisdiction under Sections 57 and 213 of the Indian Succession Act:
              </p>

              {/* Table Container */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-extrabold">
                      <th className="py-3.5 px-4">Parameter</th>
                      <th className="py-3.5 px-4">Presidency Towns (Mumbai, Chennai, Kolkata)</th>
                      <th className="py-3.5 px-4">Non-Presidency (Delhi, Bengaluru, Hyderabad, etc.)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Probate Requirement</td>
                      <td className="py-3 px-4 font-bold text-rose-700">Mandatory under Section 213(1)</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Not Mandatory (Optional)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Governing Statute</td>
                      <td className="py-3 px-4">Indian Succession Act Section 57(a) &amp; (b)</td>
                      <td className="py-3 px-4">Clarence Pais v. Union of India (2001) SC</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Typical Timeline</td>
                      <td className="py-3 px-4">9 to 18 Months (High Court process)</td>
                      <td className="py-3 px-4">30 to 90 Days (Direct revenue mutation)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Court Fee Cap</td>
                      <td className="py-3 px-4">Capped at ₹75,000 in Maharashtra</td>
                      <td className="py-3 px-4">Nominal mutation fee / Ad valorem if probate sought</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Co-op Housing Society Transfer</td>
                      <td className="py-3 px-4">Demands certified copy of Probate</td>
                      <td className="py-3 px-4">Accepts registered Will + Indemnity Bond</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Title Vesting</td>
                      <td className="py-3 px-4">Vested in executor till High Court Grant</td>
                      <td className="py-3 px-4">Vested in executor, transferred via Assent Deed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 8: SECTION 369 DEVASTAVIT RISKS */}
            <section id="section-369-devastavit-risks" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4" />
                <span>FIDUCIARY RISK MANAGEMENT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Section 369 Devastavit: Personal Liability Risks
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Section 369 of the Indian Succession Act codifies the doctrine of <em>devastavit</em> (waste
                  of estate assets). When an executor misapplies estate funds or allows property to be damaged,
                  stolen, or depreciated through gross negligence, they are personally liable to make good the
                  loss out of their personal bank account.
                </p>
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-amber-950 space-y-2">
                  <div className="font-extrabold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>How to Immunize Yourself: Section 360 Statutory Notice</span>
                  </div>
                  <p className="leading-relaxed">
                    Under Section 360, if the executor publishes a formal notice in newspapers giving creditors
                    not less than 30 days to lodge claims, the executor can distribute assets after 30 days. The
                    executor will NOT be personally liable to any unknown creditor who surfaces later!
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP BANK & DEMAT TRANSMISSION SOP */}
            <section id="step-by-step-bank-demat-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>PROCEDURAL PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Settling Bank &amp; Demat Accounts
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Classify Accounts: Nominee vs Non-Nominee",
                    desc: "Under the Supreme Court ruling in Shakti Yezdani v. Jayanand Jayant Salgaonkar (2023), a nominee is only a temporary trustee. The executor holds legal power to direct the nominee to transfer proceeds to the legatees designated in the Will.",
                  },
                  {
                    step: 2,
                    title: "Submit RBI 15-Day Bank Transmission Form",
                    desc: "Submit Annexure claim form with certified death certificate, KYC of executor/legatees, and registered Will copy. RBI circulars strictly mandate that banks must settle claims within 15 calendar days.",
                  },
                  {
                    step: 3,
                    title: "SEBI Simplified Demat Transmission up to ₹50 Lakhs",
                    desc: "Under SEBI circular 2024, shares valued up to ₹50 Lakhs per listed company can be transmitted without court probate by submitting a registered Will, legal heir indemnity bond, and no-objection certificate.",
                  },
                  {
                    step: 4,
                    title: "Execute Executor Assent under Section 332",
                    desc: "Draft and execute a formal Deed of Assent specifying that estate liabilities are discharged and consenting to the transfer of shares and bank deposits to the specified beneficiaries.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-rose-50 text-[#C65378] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 10: REAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <TrendingUp className="w-4 h-4" />
                <span>REAL-WORLD CASE STUDIES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Practical Case Studies: Delhi, Mumbai &amp; Bengaluru
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Case 1: Mumbai High Court Probate */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900">
                      Case A: South Mumbai CHS Flat (Mandatory Probate)
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                      Mumbai
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Testator passed away in Colaba, Mumbai leaving a flat to his daughter. Society refused to
                    transfer shares without probate. The executor filed a Testamentary Petition in Bombay High
                    Court, paid capped court fee of ₹75,000, and exhibited the Section 317 inventory in 5 months.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Court Fee Paid:</span>
                      <span className="font-bold text-slate-900">₹75,000 (Statutory Max Cap)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Probate Grant:</span>
                      <span className="font-bold text-emerald-700">11 Months (Uncontested)</span>
                    </div>
                    <div className="pt-1 text-emerald-700 font-bold flex justify-between border-t border-slate-200">
                      <span>Outcome:</span>
                      <span>100% Valid Title &amp; Society Share Transfer</span>
                    </div>
                  </div>
                </div>

                {/* Case 2: Delhi NCR Non-Probate Mutation */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900">
                      Case B: South Delhi Villa (Fast-Track Mutation)
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Delhi NCR
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Testator died in Vasant Vihar, Delhi leaving a registered Will. Because Delhi is outside
                    presidency towns, the executor published a Section 360 notice, cleared Section 159 ITR, and
                    applied directly to MCD and DDA for mutation without probate.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Probate Cost Saved:</span>
                      <span className="font-bold text-emerald-700">Saved ₹3.50 Lakhs Legal Fees</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Mutation Timeline:</span>
                      <span className="font-bold text-slate-900">45 Days Complete</span>
                    </div>
                    <div className="pt-1 text-emerald-700 font-bold flex justify-between border-t border-slate-200">
                      <span>Outcome:</span>
                      <span>MCD Property Tax Mutation Completed</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: COPY-PASTE LEGAL TEMPLATES */}
            <section id="legal-notice-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>COPY-PASTEABLE STATUTORY TEMPLATES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Copy-Paste Legal Notices &amp; Executor Assent Deed
              </h3>

              {/* Template Box 1: Section 360 Notice */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Section 360 Notice to Creditors (Public Newspaper Notice)
                  </div>
                  <button
                    type="button"
                    onClick={copyNoticeToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedNotice ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Notice</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"NOTICE IS HEREBY GIVEN pursuant to Section 360 of the Indian Succession Act, 1925, that all creditors and other persons having any claim against the Estate of Late [Deceased Name], residing at [Address], who died on [Date], are required to send particulars of their claims to the undersigned Executor within 30 days of this publication. After said 30 days, the Executor will distribute estate assets having regard only to claims so received."`}
                </pre>
              </div>

              {/* Template Box 2: Section 332 Executor Assent */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Formal Deed of Executor Assent (Section 332 Title Vesting)
                  </div>
                  <button
                    type="button"
                    onClick={copyAssentToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedAssent ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Deed</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"IN PURSUANCE of Section 332 and Section 333 of the Indian Succession Act, 1925, the Executor hereby ASSENTS to the bequest of the Schedule Property in favour of the Legatee [Name], to the intent that absolute title, ownership, and right of enjoyment shall vest entirely in the Legatee with retrospective effect from the date of death of the Testator."`}
                </pre>
              </div>

              {/* Template Box 3: Section 317 Inventory Affidavit */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Section 317(1) Court Inventory Affidavit Format
                  </div>
                  <button
                    type="button"
                    onClick={copyInventoryToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedInventory ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Format</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"I, [Executor Name], do hereby solemnly affirm that in compliance with Section 317(1) of the Indian Succession Act, 1925, I hereby exhibit in the Schedule annexed hereto a full, true, and complete inventory of all the property, credits, and debts in my possession belonging to the estate of Late [Deceased Name]."`}
                </pre>
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
                      WillDrafting.in Testamentary &amp; Probate Practice Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Testamentary Bench</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is India&rsquo;s foremost estate planning and testamentary litigation
                  platform, powered by AMA Legal Solutions. Our senior High Court advocates, probate litigators,
                  and estate tax counsels have structured over 15,000 challenge-proof Wills and successfully
                  guided executors across Mumbai, Delhi NCR, Bengaluru, Chennai, and Kolkata through complex
                  estate administration, High Court probate grants, Section 159 ITR filings, and transmission
                  disputes.
                </p>

                {/* Service Grid Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/probate-lawyer"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Probate Lawyer Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/probate-checker"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Probate Requirement Checker</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/bank-deceased-claim-document-checklist-generator"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Bank Deceased Claim Tool</span>
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
                13. Frequently Asked Questions: Executor Duties India
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Plain-English answers to crucial questions about executor rights, probate rules, debt priority,
                and legal protections under Indian law:
              </p>

              {/* Accordion Stack */}
              <div className="space-y-3 pt-2">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-colors hover:border-slate-300"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                        className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-extrabold text-slate-900 text-sm sm:text-base"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C65378] shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
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
                <Landmark className="w-4 h-4" />
                <span>PRIMARY LEGAL SOURCES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Statutory Citations &amp; Official Testamentary Links
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 text-xs text-slate-700 shadow-xs">
                <div>
                  <div className="font-extrabold text-slate-900 mb-1">
                    Governing Provisions of the Indian Succession Act, 1925:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      <strong>Section 211:</strong> Immediate vesting of testator&rsquo;s estate in the
                      executor upon death.
                    </li>
                    <li>
                      <strong>Section 213:</strong> Right as executor or legatee when established only on
                      grant of probate.
                    </li>
                    <li>
                      <strong>Section 316:</strong> Funeral expenses obligation according to religious rites
                      and station in life.
                    </li>
                    <li>
                      <strong>Section 317:</strong> Statutory timeline to exhibit inventory (6 months) and
                      accounts (12 months).
                    </li>
                    <li>
                      <strong>Sections 319-323:</strong> Strict legal hierarchy of debts and prohibition of
                      premature legacy distribution.
                    </li>
                    <li>
                      <strong>Section 332:</strong> Necessity of executor&rsquo;s assent to complete
                      legatee&rsquo;s title.
                    </li>
                    <li>
                      <strong>Section 360:</strong> Protection of executor from unknown debts via newspaper
                      creditor notice.
                    </li>
                    <li>
                      <strong>Section 369:</strong> Personal liability of executor for devastavit and waste of
                      assets.
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-3">
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>India Code: Indian Succession Act 1925</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>Income Tax Portal: Legal Representative Filing</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://rbi.org.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>RBI Deceased Depositor Circulars</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Calculators &amp; Legal Tools
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/probate-checker"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Probate Requirement Checker
                    </Link>
                    <Link
                      href="/tools/bank-deceased-claim-document-checklist-generator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Bank Deceased Claim Checklist
                    </Link>
                    <Link
                      href="/tools/demat-mutual-fund-transmission-document-finder"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Demat &amp; MF Transmission Finder
                    </Link>
                    <Link
                      href="/tools/capital-gains-tax-calculator-inherited-property"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Inherited Property Tax Calculator
                    </Link>
                    <Link
                      href="/tools/will-validity-section-63-audit-checker"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Will Validity Section 63 Checker
                    </Link>
                  </div>
                </div>
              </div>
            </section>
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
                  <div className="font-extrabold text-slate-900 text-sm">Advocate Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Succession Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialist in Indian testamentary jurisprudence, High Court probate petitions, Section
                316-369 executor liability defense, and estate mutation pan-India.
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
                  <span>APPOINT QUALIFIED EXECUTORS</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Family from Executor Paralysis
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Appointing clear primary and substitute executors in your Will prevents probate disputes
                  and ensures smooth transmission across banks, demat accounts, and real estate.
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

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>PROBATE &amp; EXECUTOR ADVOCACY</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Facing Probate or Contested Heirs in Court?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our testamentary litigators handle High Court probate petitions, Section 284 caveats,
                  Section 317 inventory filings, and bank transmission pan-India.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Schedule Advocate Consultation</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Executors Trust WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Statutory Precision:</strong> Built strictly upon Indian Succession Act ss.
                      316-369 and IT Act s. 159.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Jurisdiction Sensitive:</strong> Flags mandatory High Court probate in
                      presidency towns.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Section 369 Protection:</strong> Ready-to-use Section 360 newspaper notice to
                      shield against devastavit liability.
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
          href="#interactive-timeline"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Timeline Tool</span>
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
