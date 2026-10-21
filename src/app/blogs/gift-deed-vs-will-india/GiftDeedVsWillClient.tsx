"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
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
  X,
  FileSignature,
  DollarSign,
  TrendingDown,
  Zap,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "executive-summary", label: "Executive Decision Summary" },
  { id: "comparison-matrix", label: "1. Quick Decision Matrix" },
  { id: "core-differences", label: "2. Ownership, Control & Timing" },
  { id: "stamp-duty-analysis", label: "3. State Stamp Duty Rates" },
  { id: "maharashtra-case-study", label: "4. Worked ₹50L Cost Example" },
  { id: "income-tax-section-56", label: "5. Section 56(2)(x) Tax Rules" },
  { id: "when-gift-deed-better", label: "6. When Gift Deed is Better" },
  { id: "when-will-better", label: "7. When Will is Better" },
  { id: "senior-citizens-act-23", label: "8. Senior Citizens Act Sec 23" },
  { id: "decision-flowchart", label: "9. Decision Protocol & Steps" },
  { id: "cost-calculator", label: "10. Interactive Cost Calculator" },
  { id: "printable-checklist", label: "11. Estate Planning Checklist" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
  { id: "statutory-citations", label: "13. Official Legal Citations" },
];

const PRINTABLE_CHECKLIST_TEXT = `================================================================================
PROPERTY TRANSFER DECISION CHECKLIST: GIFT DEED VS WILL (INDIA)
Statutory Authorities: Transfer of Property Act 1882 (ss. 122-123)
Indian Succession Act 1925 (ss. 59, 63) | Income Tax Act 1961 (s. 56(2)(x))
Maintenance and Welfare of Parents and Senior Citizens Act 2007 (s. 23)
Prepared by WillDrafting.in
================================================================================

PHASE 1: OWNER CONTROL & RESIDENTIAL SECURITY EVALUATION
[ ] Item 1.1: Confirm whether you require ongoing rental income or physical residence for life.
[ ] Item 1.2: If you must retain uninterrupted lifetime control, choose a WILL over a Gift Deed.
[ ] Item 1.3: Confirm that once a Gift Deed is accepted, you cannot unilaterally cancel or take it back.
[ ] Item 1.4: If aged 60+, ensure any Gift Deed draft contains explicit Section 23 maintenance covenants.

PHASE 2: STAMP DUTY & CASH FLOW BUDGETING
[ ] Item 2.1: Check exact circle rate and market value of the property in your municipal jurisdiction.
[ ] Item 2.2: Compute state stamp duty: 3% to 7% for Gift Deeds vs ₹0 nationwide for Wills.
[ ] Item 2.3: Check registration fees: up to ₹30,000 or 1% for Gift Deeds vs ₹0 (or nominal) for Wills.
[ ] Item 2.4: Confirm family concession eligibility: check if your state grants blood-relative rebates.

PHASE 3: INCOME TAX & SECTION 56(2)(x) COMPLIANCE
[ ] Item 3.1: Check if beneficiary is a "relative" under Section 56 (spouse, child, sibling, lineal).
[ ] Item 3.2: Note: Nephews, nieces, and friends are NOT relatives; gifts to them trigger heavy tax.
[ ] Item 3.3: Note: Inheritance under a Will is 100% tax-exempt under Section 56(2)(x)(I) for anyone.
[ ] Item 3.4: Verify previous owner acquisition costs under Section 49(1) for future capital gains planning.

PHASE 4: DOCUMENT EXECUTION & ATTESTATION DUE DILIGENCE
[ ] Item 4.1: If choosing Gift Deed: Draft registered deed, pay stamp duty, and register at local SRO.
[ ] Item 4.2: Ensure Donee formally signs acceptance on the Gift Deed during the Donor's lifetime.
[ ] Item 4.3: If choosing Will: Draft clear bequests on plain paper or register at Sub-Registrar Office.
[ ] Item 4.4: Execute Will before two independent adult witnesses who are NOT beneficiaries (ISA s. 67).
[ ] Item 4.5: Store original Will with named trusted Executor or in secure bank custody.

================================================================================
CRITICAL LEGAL REMINDER: An unregistered Gift Deed of immovable property carries zero legal validity.
A Will executed on plain paper with two witnesses is 100% valid under Section 63 of the Indian Succession Act.
For expert property advocate assistance, visit WillDrafting.in or call WillDrafting.in.`;

interface ComparisonRow {
  parameter: string;
  giftDeed: string;
  will: string;
  winner: "will" | "gift" | "tie";
  highlight: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    parameter: "Governing Statute",
    giftDeed: "Transfer of Property Act, 1882 (Sections 122–126)",
    will: "Indian Succession Act, 1925 (Sections 59–63)",
    winner: "tie",
    highlight: "Both are rooted in established parliamentary statutes",
  },
  {
    parameter: "Timing of Title Transfer",
    giftDeed: "Immediate: Ownership transfers during donor's lifetime upon registration",
    will: "Deferred: Ownership transfers only upon the demise of the testator",
    winner: "gift",
    highlight: "Gift Deed provides immediate real-time title settlement",
  },
  {
    parameter: "Owner Control & Rental Rights",
    giftDeed: "Lost completely: Donor gives up all ownership, rental yields, and authority",
    will: "Retained 100%: Testator remains sole owner and keeps all rental income for life",
    winner: "will",
    highlight: "Will ensures total independence and dignified lifetime security",
  },
  {
    parameter: "Stamp Duty Payable",
    giftDeed: "High: 1% to 7% of market value depending on state and blood relationship",
    will: "Zero: ₹0 stamp duty nationwide (exempt under Indian Stamp Act, 1899)",
    winner: "will",
    highlight: "Wills save lakhs of rupees in upfront government charges",
  },
  {
    parameter: "Registration Requirement",
    giftDeed: "Compulsory: Mandatory under Section 17, Registration Act, 1908",
    will: "Optional: Valid on plain paper under Section 18(e), Registration Act",
    winner: "will",
    highlight: "Wills do not require mandatory registration to be legally binding",
  },
  {
    parameter: "Revocability & Changing Mind",
    giftDeed: "Irrevocable: Cannot be revoked once accepted, except under MWPSC Act Sec 23",
    will: "100% Revocable: Can be amended or cancelled anytime during lifetime",
    winner: "will",
    highlight: "Testator can easily update bequests if family relations change",
  },
  {
    parameter: "Income Tax s. 56(2)(x)",
    giftDeed: "Tax-free ONLY for defined relatives; fully taxable for nephews, friends, etc.",
    will: "100% Tax-Exempt for ANYONE (relatives, friends, charities) under Clause (I)",
    winner: "will",
    highlight: "Will allows tax-free transfer to non-relatives and trusted caretakers",
  },
  {
    parameter: "Elder Protection Against Neglect",
    giftDeed: "Low: Tragic risk of children abandoning or evicting parents after getting title",
    will: "Absolute: Children cannot claim or occupy property against parent's wishes",
    winner: "will",
    highlight: "Will prevents children from taking advantage of aging parents",
  },
  {
    parameter: "Creditor & Bankruptcy Risk",
    giftDeed: "High: If recipient faces bankruptcy or divorce, gifted property can be attached",
    will: "Zero: Beneficiary's creditors cannot touch the property while testator lives",
    winner: "will",
    highlight: "Will protects family wealth from children's business liabilities",
  },
  {
    parameter: "Probate & Court Formalities",
    giftDeed: "None: Title transfers immediately at SRO; no court involvement needed",
    will: "Probate needed only in Mumbai, Kolkata, Chennai or in contested estates",
    winner: "gift",
    highlight: "Gift Deed bypasses post-death court confirmation entirely",
  },
];

interface StateDutyInfo {
  state: string;
  familyRate: string;
  nonFamilyRate: string;
  registrationFee: string;
  willCost: string;
  specialNote: string;
}

const STATE_DUTY_RATES: StateDutyInfo[] = [
  {
    state: "Maharashtra",
    familyRate: "3% + 1% Metro Cess / LBT",
    nonFamilyRate: "5% to 7% + 1% Cess",
    registrationFee: "Capped at ₹30,000 for family gifts",
    willCost: "₹0 Stamp Duty (Optional SRO fee ₹100)",
    specialNote: "Article 34 covers gifts to spouse, child, grandchild, daughter-in-law",
  },
  {
    state: "Delhi",
    familyRate: "4% (Female) / 6% (Male)",
    nonFamilyRate: "4% (Female) / 6% (Male)",
    registrationFee: "1% of market value",
    willCost: "₹0 Stamp Duty (Optional SRO fee ₹200)",
    specialNote: "No concessional rate for blood relatives; standard conveyance duty applies",
  },
  {
    state: "Karnataka",
    familyRate: "Flat ₹1,000 to ₹5,000 + 10% cess",
    nonFamilyRate: "5% + 10% cess + 2% surcharge",
    registrationFee: "Capped at ₹1,000 for blood relatives",
    willCost: "₹0 Stamp Duty (Optional SRO fee ₹200)",
    specialNote: "Article 28(a) grants flat concessional duty for immediate family members",
  },
  {
    state: "Uttar Pradesh",
    familyRate: "Flat ₹5,000 concessional stamp duty",
    nonFamilyRate: "7% standard conveyance duty",
    registrationFee: "1% of value (capped at ₹10,000 for family)",
    willCost: "₹0 Stamp Duty (Optional SRO fee ₹100–₹500)",
    specialNote: "June 2022 notification provides massive relief for blood-relative gifts",
  },
  {
    state: "Haryana",
    familyRate: "0% Stamp Duty (100% Exempt!)",
    nonFamilyRate: "5% (Rural) to 7% (Urban)",
    registrationFee: "Nominal service charge (₹100 to ₹1,000)",
    willCost: "₹0 Stamp Duty (Optional SRO fee ₹100)",
    specialNote: "Haryana completely abolished stamp duty on gifts between blood relatives",
  },
  {
    state: "Tamil Nadu",
    familyRate: "1% (Capped at ₹25,000 to ₹40,000)",
    nonFamilyRate: "7% standard stamp duty",
    registrationFee: "1% (Capped at ₹4,000 for family)",
    willCost: "₹0 Stamp Duty (Optional SRO fee ₹100)",
    specialNote: "Strict statutory caps apply to blood-relation transfers across the state",
  },
  {
    state: "West Bengal",
    familyRate: "0.5% concessional family rate",
    nonFamilyRate: "5% to 6% standard stamp duty",
    registrationFee: "1% of market value",
    willCost: "₹0 Stamp Duty (Optional SRO fee ₹100)",
    specialNote: "0.5% rate applies to transfers within linear lineage and spouses",
  },
];

export default function GiftDeedVsWillClient() {
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
  const [showImageModal, setShowImageModal] = useState<boolean>(false);

  // Interactive Calculator State
  const [calcState, setCalcState] = useState<string>("Maharashtra");
  const [calcValue, setCalcValue] = useState<number>(5000000);
  const [calcRelation, setCalcRelation] = useState<"family" | "non-family">("family");
  const [calcGender, setCalcGender] = useState<"male" | "female">("male");

  // Checklist Checkbox States
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

  // Calculator Computations
  const calculationResults = useMemo(() => {
    let stampDutyRate = 0;
    let cessRate = 0;
    let regFee = 0;
    let isFlatDuty = false;
    let flatDutyAmount = 0;

    const val = calcValue;

    if (calcState === "Maharashtra") {
      if (calcRelation === "family") {
        stampDutyRate = 0.03;
        cessRate = 0.01;
        regFee = Math.min(val * 0.01, 30000);
      } else {
        stampDutyRate = 0.05;
        cessRate = 0.01;
        regFee = Math.min(val * 0.01, 30000);
      }
    } else if (calcState === "Delhi") {
      stampDutyRate = calcGender === "female" ? 0.04 : 0.06;
      cessRate = 0.0;
      regFee = val * 0.01;
    } else if (calcState === "Karnataka") {
      if (calcRelation === "family") {
        isFlatDuty = true;
        flatDutyAmount = 5500; // Flat 5000 + 10% cess
        regFee = 1000;
      } else {
        stampDutyRate = 0.055;
        regFee = val * 0.01;
      }
    } else if (calcState === "Uttar Pradesh") {
      if (calcRelation === "family") {
        isFlatDuty = true;
        flatDutyAmount = 5000;
        regFee = Math.min(val * 0.01, 10000);
      } else {
        stampDutyRate = 0.07;
        regFee = val * 0.01;
      }
    } else if (calcState === "Haryana") {
      if (calcRelation === "family") {
        stampDutyRate = 0;
        regFee = 1000;
      } else {
        stampDutyRate = 0.06;
        regFee = val * 0.01;
      }
    } else if (calcState === "Tamil Nadu") {
      if (calcRelation === "family") {
        isFlatDuty = true;
        flatDutyAmount = Math.min(val * 0.01, 40000);
        regFee = Math.min(val * 0.01, 4000);
      } else {
        stampDutyRate = 0.07;
        regFee = val * 0.04;
      }
    } else {
      // West Bengal or other
      if (calcRelation === "family") {
        stampDutyRate = 0.005;
        regFee = val * 0.01;
      } else {
        stampDutyRate = 0.06;
        regFee = val * 0.01;
      }
    }

    const stampDutyCost = isFlatDuty ? flatDutyAmount : val * (stampDutyRate + cessRate);
    const totalGiftCost = Math.round(stampDutyCost + regFee + 10000); // 10k drafting/SRO misc
    const willCost = 1499; // WillDrafting.in nominal online fee
    const savings = Math.max(0, totalGiftCost - willCost);

    return {
      stampDutyCost: Math.round(stampDutyCost),
      regFee: Math.round(regFee),
      miscCost: 10000,
      totalGiftCost,
      willCost,
      savings,
    };
  }, [calcState, calcValue, calcRelation, calcGender]);

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
            <RefreshCw className="w-4 h-4 text-[#C65378]" />
            <span>ESTATE PLANNING &bull; LIFECYCLE DECISION GUIDE</span>
          </div>

          {/* Single H1 Title (Strictly 30-65 chars, no em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6 drop-shadow-xs">
            Gift Deed vs Will: Which Is Better for Property in India?
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            Compare legal control, upfront stamp duty, Section 56(2)(x) income tax exemptions, and elder protection. Learn when to gift property immediately versus when a Will safeguards family harmony.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/start"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/20 cursor-pointer"
            >
              <span>Draft Your Will Online (₹0 Stamp Duty)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-rose-300" />
              <span>View Will Drafting Plans</span>
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
              <p className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹0 Stamp Duty</p>
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-600 mt-1">
                Wills Exempt Nationwide
              </p>
            </div>
            <div className="border-r last:border-r-0 border-slate-200/80 pr-4">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#C65378]">100% Revocable</p>
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-600 mt-1">
                Update Your Will Anytime
              </p>
            </div>
            <div className="border-r last:border-r-0 border-slate-200/80 pr-4">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#5F7E75]">Sec 56(2)(x)</p>
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-600 mt-1">
                Tax-Free for Relatives &amp; Wills
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#172228]">4.9 / 5 Rating</p>
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-600 mt-1">
                15,000+ Succession Plans
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
                      className={`block py-2 px-2.5 rounded-lg transition-colors leading-snug ${
                        isActive
                          ? "bg-rose-50 text-[#C65378] font-bold border-l-3 border-[#C65378]"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ──────────────────────────────────────────────────
              MIDDLE COLUMN: MAIN EDITORIAL CONTENT
              ────────────────────────────────────────────────── */}
          <main className="space-y-10 md:space-y-12 min-w-0">
            
            {/* Visual Blueprint Hero Feature (Uploaded User Image) */}
            <section id="executive-summary" className="scroll-target space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>Executive Decision Summary</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                1. Quick Decision Matrix: Gift Deed vs Will at a Glance
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                When transferring real estate or family wealth in India, property owners face a fundamental dilemma: should they execute an immediate <strong className="text-[#172228]">Gift Deed</strong> or draft a testamentary <strong className="text-[#172228]">Last Will and Testament</strong>? The decision boils down to three decisive legal pillars: <strong className="text-[#C65378]">Control</strong>, <strong className="text-[#C65378]">Certainty</strong>, and <strong className="text-[#C65378]">Upfront Cost</strong>.
              </p>

              {/* Uploaded Comparison Graphic Display */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-xs space-y-4">
                <div
                  onClick={() => setShowImageModal(true)}
                  className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer group"
                >
                  <Image
                    src="/images/gift-deed-vs-will-india.jpg"
                    alt="Gift Deed vs Will in India Legal Comparison Blueprint"
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    sizes="(max-width: 1024px) 100vw, 850px"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-sm backdrop-blur-[2px]">
                    <Eye className="w-5 h-5" />
                    <span>Click to Zoom &amp; Inspect Comparison Image</span>
                  </div>
                </div>

                {/* 3 Pillars Explanatory Summary below Image */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 text-xs">
                    <p className="font-extrabold text-[#C65378] flex items-center gap-1.5 mb-1">
                      <Gift className="w-3.5 h-3.5" />
                      Gift Deed: Immediate Transfer
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      Ownership transfers immediately. Donee gets keys and title today. Irrevocable, but incurs 3%–7% state stamp duty.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs">
                    <p className="font-extrabold text-amber-800 flex items-center gap-1.5 mb-1">
                      <Split className="w-3.5 h-3.5" />
                      The Core Dilemma
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      Do you surrender control while alive for immediate certainty, or retain 100% control and pay ₹0 stamp duty via a Will?
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs">
                    <p className="font-extrabold text-emerald-800 flex items-center gap-1.5 mb-1">
                      <FileSignature className="w-3.5 h-3.5" />
                      Will: Post-Death Protection
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      Operates only after death. Testator keeps full ownership, rent, and rights. 100% revocable with ₹0 stamp duty.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: COMPREHENSIVE SIDE-BY-SIDE COMPARISON TABLE */}
            <section id="comparison-matrix" className="scroll-target space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>Side-by-Side Evaluation</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                1. Quick Decision Matrix: Gift Deed vs Will at a Glance
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                The comprehensive comparison below highlights the statutory, financial, and practical distinctions between transferring property under a Gift Deed versus bequeathing it through a Will.
              </p>

              <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100/90 text-slate-800 border-b border-slate-200 font-extrabold">
                      <th className="py-3.5 px-4">Evaluation Dimension</th>
                      <th className="py-3.5 px-4 bg-rose-50/60 text-[#C65378]">Gift Deed (Immediate Transfer)</th>
                      <th className="py-3.5 px-4 bg-emerald-50/60 text-emerald-800">Last Will (Testamentary)</th>
                      <th className="py-3.5 px-4 hidden md:table-cell">Strategic Takeaway</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {COMPARISON_DATA.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">{row.parameter}</td>
                        <td className="py-3.5 px-4 text-slate-700 leading-relaxed bg-rose-50/20">{row.giftDeed}</td>
                        <td className="py-3.5 px-4 text-slate-700 leading-relaxed bg-emerald-50/20">{row.will}</td>
                        <td className="py-3.5 px-4 text-xs text-slate-500 hidden md:table-cell">{row.highlight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 2: CORE LEGAL DIFFERENCES */}
            <section id="core-differences" className="scroll-target space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>Statutory Framework</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                2. Core Legal Differences: Ownership, Control &amp; Timing
              </h2>
              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  To make an informed decision, one must look beyond informal family conversations and examine the precise mechanisms established by the Indian legal system.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                    <div className="flex items-center gap-2 text-rose-800 font-extrabold text-base">
                      <Gift className="w-5 h-5 text-[#C65378]" />
                      <span>How a Gift Deed Operates</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Under <strong className="text-slate-800">Section 122 of the Transfer of Property Act, 1882</strong>, a gift is a voluntary transfer of existing movable or immovable property made without consideration by a donor to a donee.
                    </p>
                    <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
                      <li><strong>Acceptance is Vital:</strong> The donee must accept the gift during the donor&apos;s lifetime while the donor is capable of giving.</li>
                      <li><strong>Mandatory Registration:</strong> Under Section 123 of TPA and Section 17 of the Registration Act, 1908, immovable property gift deeds must be registered with the Sub-Registrar.</li>
                      <li><strong>Total Surrender of Title:</strong> Once registered, the donor completely divests all legal ownership, rental income, and rights.</li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                    <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-base">
                      <FileSignature className="w-5 h-5 text-emerald-600" />
                      <span>How a Will Operates</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Under <strong className="text-slate-800">Section 2(h) and Section 59 of the Indian Succession Act, 1925</strong>, a Will is a legal declaration of the intention of the testator regarding their property to be carried into effect after their death.
                    </p>
                    <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
                      <li><strong>Ambulatory Nature:</strong> A Will has zero legal effect during the testator&apos;s lifetime. It only speaks from death.</li>
                      <li><strong>Absolute Revocability:</strong> Under Section 62 of ISA, a Will can be revoked, superseded, or rewritten at any time.</li>
                      <li><strong>Uninterrupted Enjoyment:</strong> The testator can live in the property, collect rent, or even sell it at any time without anyone&apos;s permission.</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Plain Layman Rule:</strong> A Gift Deed gives away your property <span className="underline font-bold">today</span>. A Will gives away your property <span className="underline font-bold">tomorrow</span> (only after your demise). If you give it away today, you cannot change your mind tomorrow if family dynamics turn hostile.
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: STAMP DUTY & REGISTRATION CHARGES */}
            <section id="stamp-duty-analysis" className="scroll-target space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                <Coins className="w-4 h-4" />
                <span>Financial Outflow Analysis</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                3. Stamp Duty &amp; Registration Charges: State-Wise Analysis
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                The most significant barrier to executing a Gift Deed is the immediate government fee. While Wills are completely exempt from stamp duty across every state in India, Gift Deeds attract varying stamp duties, often reaching several lakhs of rupees.
              </p>

              <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 border-b border-slate-200 font-extrabold">
                      <th className="py-3 px-4">State</th>
                      <th className="py-3 px-4">Gift Duty (Family / Blood Relative)</th>
                      <th className="py-3 px-4">Gift Duty (Non-Family)</th>
                      <th className="py-3 px-4">Registration Fee</th>
                      <th className="py-3 px-4 text-emerald-800">Will Stamp Duty</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {STATE_DUTY_RATES.map((st, i) => (
                      <tr key={i} className="hover:bg-slate-50/50">
                        <td className="py-3.5 px-4 font-bold text-slate-900">{st.state}</td>
                        <td className="py-3.5 px-4 text-slate-700 font-medium">{st.familyRate}</td>
                        <td className="py-3.5 px-4 text-slate-600">{st.nonFamilyRate}</td>
                        <td className="py-3.5 px-4 text-slate-600">{st.registrationFee}</td>
                        <td className="py-3.5 px-4 font-bold text-emerald-700 bg-emerald-50/30">{st.willCost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-1.5">
                <p>
                  <strong>⚠️ Statutory Verification Note:</strong> Stamp duty rates are subject to annual state budget amendments and local municipal cesses (such as the 1% Metro Cess in Mumbai, Pune, Nagpur, and Thane). Always verify the prevailing circle rate and municipal notifications before executing a Gift Deed.
                </p>
              </div>
            </section>

            {/* SECTION 4: WORKED COST CASE STUDY (MAHARASHTRA) */}
            <section id="maharashtra-case-study" className="scroll-target space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>Financial Case Study</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                4. Worked Cost Case Study: ₹50 Lakh Property in Maharashtra
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Consider an elderly father in Pune or Mumbai gifting a residential apartment with a ready reckoner market value of <strong className="text-slate-900">₹50,00,000</strong> to his adult son. Here is the exact mathematical cost difference between executing a Gift Deed versus drafting a Will:
              </p>

              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Option A: Gift Deed */}
                  <div className="p-5 rounded-xl bg-rose-50/50 border border-rose-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-[#C65378] uppercase tracking-wider">Option A: Gift Deed Route</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold">Immediate Handover</span>
                    </div>
                    <div className="space-y-2 text-xs sm:text-sm text-slate-700 pt-1 divide-y divide-rose-100">
                      <div className="flex justify-between py-1.5">
                        <span>Basic Stamp Duty (3% under Art. 34):</span>
                        <span className="font-bold text-slate-900">₹1,50,000</span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span>Local Body Tax / Metro Cess (1%):</span>
                        <span className="font-bold text-slate-900">₹50,000</span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span>SRO Registration Fee (Capped):</span>
                        <span className="font-bold text-slate-900">₹30,000</span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span>Advocate Drafting &amp; SRO Verification:</span>
                        <span className="font-bold text-slate-900">₹15,000</span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span>Document Handling &amp; Challan Charges:</span>
                        <span className="font-bold text-slate-900">₹1,500</span>
                      </div>
                      <div className="flex justify-between py-2 text-base font-extrabold text-rose-900 border-t-2 border-rose-300">
                        <span>Total Cash Outflow:</span>
                        <span>₹2,46,500</span>
                      </div>
                    </div>
                  </div>

                  {/* Option B: Last Will */}
                  <div className="p-5 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-emerald-800 uppercase tracking-wider">Option B: Last Will Route</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">Testamentary Handover</span>
                    </div>
                    <div className="space-y-2 text-xs sm:text-sm text-slate-700 pt-1 divide-y divide-emerald-100">
                      <div className="flex justify-between py-1.5">
                        <span>Stamp Duty (Exempt under Indian Stamp Act):</span>
                        <span className="font-bold text-emerald-700">₹0</span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span>Mandatory Registration Fee:</span>
                        <span className="font-bold text-emerald-700">₹0</span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span>Optional SRO Registration (if desired):</span>
                        <span className="font-bold text-slate-900">₹100</span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span>Online Will Drafting via WillDrafting.in:</span>
                        <span className="font-bold text-slate-900">₹1,499</span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span>Witness Attestation (Two Witnesses):</span>
                        <span className="font-bold text-emerald-700">₹0</span>
                      </div>
                      <div className="flex justify-between py-2 text-base font-extrabold text-emerald-950 border-t-2 border-emerald-300">
                        <span>Total Cash Outflow:</span>
                        <span>₹1,599</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Savings Callout Banner */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <p className="text-xs uppercase font-extrabold tracking-wider text-emerald-200">Immediate Financial Advantage</p>
                    <p className="text-xl sm:text-2xl font-black">Net Cash Savings: ₹2,44,901 (99.3% Cheaper)</p>
                    <p className="text-xs text-emerald-100">
                      Plus, the father retains 100% legal ownership, collected rent, and the freedom to change his mind anytime.
                    </p>
                  </div>
                  <button
                    onClick={handleStartDraft}
                    className="px-6 py-2.5 rounded-full bg-white text-emerald-900 font-extrabold text-xs sm:text-sm hover:bg-emerald-50 transition-all shrink-0 cursor-pointer shadow-md"
                  >
                    Start Your Will at ₹1,499
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 5: INCOME TAX SECTION 56(2)(x) & CAPITAL GAINS */}
            <section id="income-tax-section-56" className="scroll-target space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>Tax Law Deep-Dive</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                5. Income Tax Section 56(2)(x): Gift Tax &amp; Capital Gains
              </h2>
              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  India abolished the Gift Tax Act in 1998, but gifts are now regulated under <strong className="text-slate-900">Section 56(2)(x) of the Income Tax Act, 1961</strong> as &apos;Income from Other Sources&apos;. Understanding these tax rules is critical before drafting any document.
                </p>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    The General Rule &amp; The ₹50,000 Threshold
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    If an individual receives any immovable property without consideration (a gift) and the stamp duty value exceeds <strong className="text-slate-900">₹50,000</strong>, the entire stamp duty value is added to the recipient&apos;s taxable income and taxed at their applicable slab rate (which can reach over 30%).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-3">
                  <h3 className="font-extrabold text-emerald-900 text-sm sm:text-base flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Who Qualifies as a &quot;Relative&quot; for 100% Tax Exemption?</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                    Under the fifth proviso to Section 56(2)(x), gifts received from specified &quot;relatives&quot; are completely exempt from income tax, regardless of the property value. For individuals, relatives include:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-emerald-900 pt-1">
                    <div className="p-2 rounded-lg bg-white/80 border border-emerald-200">✓ Spouse of the individual</div>
                    <div className="p-2 rounded-lg bg-white/80 border border-emerald-200">✓ Brother or sister of the individual</div>
                    <div className="p-2 rounded-lg bg-white/80 border border-emerald-200">✓ Brother or sister of spouse</div>
                    <div className="p-2 rounded-lg bg-white/80 border border-emerald-200">✓ Brother or sister of either parent (Uncle/Aunt)</div>
                    <div className="p-2 rounded-lg bg-white/80 border border-emerald-200">✓ Lineal ascendant or descendant (Parents, Grandparents, Children, Grandchildren)</div>
                    <div className="p-2 rounded-lg bg-white/80 border border-emerald-200">✓ Spouses of any person listed above (e.g. Son-in-law, Daughter-in-law)</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 text-xs sm:text-sm text-rose-950 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-rose-900">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                    <span>The Nephew &amp; Friend Tax Trap: Why a Will Wins</span>
                  </div>
                  <p className="text-rose-900 leading-relaxed text-xs">
                    <strong>Crucial Warning:</strong> Nephews, nieces, first cousins, and friends are <span className="underline font-bold">NOT</span> classified as relatives under Section 56. If you execute a Gift Deed of a ₹60 Lakh flat to your nephew, he must pay income tax on ₹60 Lakh! In contrast, <strong className="text-slate-900">Clause (I) of the Section 56(2)(x) proviso</strong> explicitly exempts ANY property received <em>&quot;under a will or by way of inheritance&quot;</em>. Bequeathing property to a nephew via a Will attracts <strong className="font-bold">₹0 Income Tax</strong>.
                  </p>
                </div>

                {/* Capital Gains on Subsequent Sale */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                  <p className="font-bold text-slate-900 text-sm">Capital Gains Tax on Subsequent Sale by Donee or Legal Heir</p>
                  <p className="leading-relaxed">
                    Neither a Gift Deed nor an inheritance triggers capital gains tax at the moment of transfer. However, when the beneficiary eventually sells the property:
                  </p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Cost of Acquisition (Section 49(1)):</strong> The cost for which the previous owner bought the property becomes the beneficiary&apos;s cost basis.</li>
                    <li><strong>Holding Period Tacking (Section 2(42A)):</strong> The period during which the donor or testator held the property is added to the beneficiary&apos;s holding period to determine long-term status.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 6: WHEN A GIFT DEED IS BETTER */}
            <section id="when-gift-deed-better" className="scroll-target space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Strategic Scenarios</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                6. When a Gift Deed Is Better: 4 Realistic Family Scenarios
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Despite higher upfront stamp duty and loss of control, a registered Gift Deed is the superior legal vehicle in specific circumstances:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                    <Users className="w-4 h-4 text-[#C65378]" />
                    <span>1. Eliminating Post-Death Sibling Disputes</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If you anticipate that other siblings or disgruntled relatives will challenge a Will by alleging lack of testamentary capacity, undue influence, or forged signatures, an irrevocable Gift Deed registered while you are fully healthy settles the question permanently.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                    <Building className="w-4 h-4 text-[#C65378]" />
                    <span>2. Child Needs Title for Loans or Redevelopment</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    When a son or daughter requires clear, undisputed title in their own name to apply for a substantial home renovation loan, business mortgage, or sign a tripartite redevelopment agreement with a real estate builder.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                    <Clock className="w-4 h-4 text-[#C65378]" />
                    <span>3. Bypassing Mandatory Probate in Metro Cities</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    In the presidency towns of Mumbai, Kolkata, and Chennai, probate of a Will is mandatory under Section 57 and Section 213 of the Indian Succession Act. Probate can take 12 to 24 months and involve court fees. A Gift Deed executes instant municipal mutation.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                    <Home className="w-4 h-4 text-[#C65378]" />
                    <span>4. State-Sponsored Concessions (e.g., Haryana / UP)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    In states like Haryana where stamp duty on blood-relative gifts is 0%, or Uttar Pradesh where duty is capped at a nominal ₹5,000, the cost penalty is minimal, making early lifetime handover very attractive.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 7: WHEN A WILL IS BETTER */}
            <section id="when-will-better" className="scroll-target space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>Protection &amp; Independence</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                7. When a Will Is Better: Retaining Control &amp; Flexibility
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                For over 80% of Indian families, drafting a comprehensive Last Will is the far superior legal strategy. Here is why estate planning advocates consistently recommend Wills:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
                  <p className="font-extrabold text-sm text-emerald-950 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-700" />
                    <span>1. You Retain 100% Lifetime Ownership and Rental Dignity</span>
                  </p>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    You never risk becoming a guest or tenant in your own house. You collect all rental yields, make property decisions independently, and maintain financial autonomy until your very last breath.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
                  <p className="font-extrabold text-sm text-emerald-950 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-emerald-700" />
                    <span>2. Protection Against Elder Abandonment &amp; Family Fallout</span>
                  </p>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    Indian courts are unfortunately flooded with cases where elderly parents gifted their home to a child, only to be neglected, pressured into nursing homes, or mistreated by daughters-in-law or sons. Holding title through a Will guarantees respect.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
                  <p className="font-extrabold text-sm text-emerald-950 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-emerald-700" />
                    <span>3. Freedom to Update or Change Your Mind</span>
                  </p>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    Life changes. Grandchildren are born, marital situations evolve, or a particular child may provide extraordinary care in your old age. With a Will, you can execute a simple <Link href="/templates/codicil-format-india" className="underline font-bold text-emerald-950 hover:text-emerald-700">Codicil</Link> or fresh Will at any moment without asking anyone for permission.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
                  <p className="font-extrabold text-sm text-emerald-950 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-emerald-700" />
                    <span>4. Zero Upfront Cash Drainage</span>
                  </p>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    Why pay ₹2,00,000 to ₹5,00,000 in government stamp duty right now when your money could remain safely invested in Fixed Deposits or mutual funds earning compounding returns? A Will costs ₹0 stamp duty.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: SENIOR CITIZENS ACT SECTION 23 */}
            <section id="senior-citizens-act-23" className="scroll-target space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>Statutory Elder Remedy</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                8. Senior Citizens Act Section 23: Cancelling a Gift Deed
              </h2>
              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  Can parents cancel a registered Gift Deed if their children abandon them? Under standard property law (Section 126 of TPA), a gift cannot be revoked unilaterally. However, Parliament introduced a potent statutory exception for aging parents.
                </p>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-[#C65378]" />
                    <span>Section 23 of the Senior Citizens Act, 2007 (MWPSC Act)</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under <strong className="text-slate-800">Section 23(1) of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007</strong>, where a senior citizen (aged 60+) has transferred property by gift or otherwise, subject to the condition that the transferee shall provide the basic amenities and physical needs to the transferor, and the transferee fails or refuses to provide such amenities, the transfer of property is deemed to have been made by fraud or coercion or undue influence and shall at the option of the transferor be declared <strong className="text-rose-700 font-bold">void</strong> by the Maintenance Tribunal.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 text-xs sm:text-sm text-rose-950 space-y-2">
                  <p className="font-bold text-rose-900 flex items-center gap-2">
                    <Gavel className="w-4 h-4 text-rose-700" />
                    <span>Landmark Supreme Court Ruling: Urmila Dixit v. Sunil Sharan Dixit (2025 INSC 20)</span>
                  </p>
                  <p className="text-xs text-rose-900 leading-relaxed">
                    In January 2025, the Supreme Court of India in <strong className="text-rose-950">Urmila Dixit v. Sunil Sharan Dixit (2025 INSC 20)</strong> reaffirmed that the Maintenance Tribunal possesses statutory authority to set aside conditional gift deeds when children breach their filial support obligations. Read our comprehensive statutory analysis on <Link href="/blogs/gift-deed-cancellation-senior-citizens-act-section-23" className="underline font-bold text-rose-950 hover:text-rose-700">cancelling gift deeds under Section 23 of the Senior Citizens Act</Link>.
                  </p>
                </div>

                {/* Practical Drafting Caution */}
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-2">
                  <p className="font-bold text-amber-900">⚠️ Essential Drafting Tip for Senior Citizens:</p>
                  <p className="leading-relaxed">
                    If you must execute a Gift Deed, <span className="underline font-bold">never use a generic typist template</span>. You MUST insert an explicit recital clause stating: <em>&quot;This gift is executed subject to the express condition that the Donee shall provide all basic amenities, medical expenses, physical care, and financial maintenance to the Donor throughout the Donor&apos;s natural life under Section 23 of the MWPSC Act, 2007.&quot;</em> Without this clause, cancellation in court becomes prolonged and contested.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP DECISION PROTOCOL */}
            <section id="decision-flowchart" className="scroll-target space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                <Split className="w-4 h-4" />
                <span>Diagnostic Logic</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                9. Step-by-Step Decision Protocol: Choosing the Right Path
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Follow this simple 4-step diagnostic decision framework to determine which instrument matches your personal family and financial profile:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <span className="text-xs font-black uppercase text-[#C65378]">Step 1: Residential &amp; Rental Need</span>
                  <p className="font-bold text-slate-900 text-sm">Do you rely on the property for shelter or rent?</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If YES: Choose a <strong className="text-emerald-700 font-bold">WILL</strong>. Never gift away your primary residence or primary rental income while alive.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <span className="text-xs font-black uppercase text-[#C65378]">Step 2: Upfront Cash Liquidity</span>
                  <p className="font-bold text-slate-900 text-sm">Can you easily afford 3% to 7% stamp duty?</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If NO: Choose a <strong className="text-emerald-700 font-bold">WILL</strong>. Do not liquidate emergency savings or take loans just to pay government registry fees.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <span className="text-xs font-black uppercase text-[#C65378]">Step 3: Relationship Classification</span>
                  <p className="font-bold text-slate-900 text-sm">Is the recipient an Income Tax &quot;Relative&quot;?</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If NO (e.g. nephew, friend, caretaker): Choose a <strong className="text-emerald-700 font-bold">WILL</strong> to ensure complete 100% tax exemption under Section 56(2)(x)(I).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <span className="text-xs font-black uppercase text-[#C65378]">Step 4: Immediate Construction / Loan Need</span>
                  <p className="font-bold text-slate-900 text-sm">Does the child need immediate loan collateral?</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If YES: Execute a <strong className="text-rose-700 font-bold">GIFT DEED</strong> with an explicit Section 23 maintenance covenant, or consider a <Link href="/templates/release-deed-format" className="underline font-bold text-slate-900 hover:text-[#C65378]">Release Deed</Link> if sharing ancestral property.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: INTERACTIVE COST CALCULATOR */}
            <section id="cost-calculator" className="scroll-target space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>Dynamic Assessment Tool</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                10. Interactive Cost &amp; Decision Calculator: Plan Your Asset
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Test your property value and state to see immediate estimated stamp duty, registration charges, and how much cash you save by choosing a Will:
              </p>

              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* State Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Select State</label>
                    <select
                      value={calcState}
                      onChange={(e) => setCalcState(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      {STATE_DUTY_RATES.map((st) => (
                        <option key={st.state} value={st.state}>{st.state}</option>
                      ))}
                    </select>
                  </div>

                  {/* Relationship */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Recipient Relationship</label>
                    <select
                      value={calcRelation}
                      onChange={(e) => setCalcRelation(e.target.value as "family" | "non-family")}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="family">Immediate Blood Relative / Spouse</option>
                      <option value="non-family">Non-Relative / Nephew / Friend</option>
                    </select>
                  </div>

                  {/* Gender */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Recipient Gender (Delhi)</label>
                    <select
                      value={calcGender}
                      onChange={(e) => setCalcGender(e.target.value as "male" | "female")}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="male">Male (Standard Rate)</option>
                      <option value="female">Female (Concessional in Delhi)</option>
                    </select>
                  </div>

                  {/* Property Value Presets */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Property Market Value</label>
                    <div className="flex gap-1.5">
                      {[3000000, 5000000, 10000000].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setCalcValue(preset)}
                          className={`flex-1 py-2 px-1 text-[11px] rounded-lg font-bold border transition-all ${
                            calcValue === preset
                              ? "bg-[#C65378] text-white border-[#C65378]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          ₹{preset / 100000}L
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Custom Slider */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-semibold">Fine-Tune Value:</span>
                    <span className="font-extrabold text-[#172228] text-sm">
                      ₹{calcValue.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000000"
                    max="30000000"
                    step="500000"
                    value={calcValue}
                    onChange={(e) => setCalcValue(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#C65378]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-600">
                    <span>₹10 Lakh</span>
                    <span>₹1.5 Crore</span>
                    <span>₹3.0 Crore</span>
                  </div>
                </div>

                {/* Live Computation Result Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
                  <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 space-y-1 text-center">
                    <p className="text-xs font-bold text-rose-800 uppercase tracking-wider">Gift Deed Total Cost</p>
                    <p className="text-2xl font-black text-rose-950">
                      ₹{calculationResults.totalGiftCost.toLocaleString("en-IN")}
                    </p>
                    <p className="text-[11px] text-rose-700">
                      Duty: ₹{calculationResults.stampDutyCost.toLocaleString("en-IN")} + Reg: ₹{calculationResults.regFee.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1 text-center">
                    <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Will Drafting Cost</p>
                    <p className="text-2xl font-black text-emerald-950">
                      ₹{calculationResults.willCost.toLocaleString("en-IN")}
                    </p>
                    <p className="text-[11px] text-emerald-700">
                      Stamp Duty: ₹0 | 100% Legally Binding
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#172228] text-white space-y-1 text-center">
                    <p className="text-xs font-bold text-rose-300 uppercase tracking-wider">Upfront Cash Savings</p>
                    <p className="text-2xl font-black text-[#C65378]">
                      ₹{calculationResults.savings.toLocaleString("en-IN")}
                    </p>
                    <p className="text-[11px] text-slate-300">
                      Keep funds in your own bank account
                    </p>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={handleStartDraft}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#C65378] text-white font-extrabold hover:bg-[#a13c5d] transition-all text-xs sm:text-sm cursor-pointer shadow-md"
                  >
                    <span>Secure This ₹{calculationResults.savings.toLocaleString("en-IN")} Saving &bull; Start Will</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 11: PRINTABLE CHECKLIST */}
            <section id="printable-checklist" className="scroll-target space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                <CheckSquare className="w-4 h-4" />
                <span>Verified Legal Checklist</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                11. Printable Estate Planning Checklist: Gift Deed vs Will
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Use this actionable, practitioner-verified checklist to conduct due diligence before signing any title document or transferring assets to children:
              </p>

              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <span className="text-xs font-extrabold uppercase text-slate-600">
                    Mandatory Due Diligence Verification
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyChecklist}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied Full Text!" : "Copy Checklist"}</span>
                    </button>
                    <button
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Checklist</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { id: "check-1", label: "Check if you require lifetime residence & rental income from this property." },
                    { id: "check-2", label: "Verify whether recipient is a recognized 'Relative' under IT Act Section 56." },
                    { id: "check-3", label: "Calculate exact state stamp duty (3%–7%) vs ₹0 for a Will." },
                    { id: "check-4", label: "If executing a Gift Deed as a senior citizen, insert a Section 23 MWPSC maintenance clause." },
                    { id: "check-5", label: "Verify that the donee signs formal written acceptance during the donor's lifetime." },
                    { id: "check-6", label: "If executing a Will, arrange two independent adult witnesses who are not beneficiaries." },
                  ].map((chk) => (
                    <div
                      key={chk.id}
                      onClick={() => toggleCheck(chk.id)}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        checkedItems[chk.id]
                          ? "bg-emerald-50/50 border-emerald-200 text-slate-800"
                          : "bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                        checkedItems[chk.id] ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-300 bg-white"
                      }`}>
                        {checkedItems[chk.id] && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs sm:text-sm font-medium leading-relaxed">{chk.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>Common Questions</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                Frequently Asked Questions: Gift Deed vs Will in India
              </h2>

              <div className="space-y-3">
                {[
                  {
                    q: "What is the primary difference between a Gift Deed and a Will in India?",
                    a: "A Gift Deed transfers property immediately during the donor's lifetime under Section 122 of the Transfer of Property Act, 1882, and is generally irrevocable once accepted. In contrast, a Will takes effect only after the testator's demise under the Indian Succession Act, 1925, and can be revoked, updated, or rewritten at any time while the testator is alive and of sound mind.",
                  },
                  {
                    q: "Which is cheaper: transferring property via a Gift Deed or a Will?",
                    a: "A Will is substantially cheaper. Wills attract ₹0 stamp duty across all Indian states and can be executed on plain paper. A Gift Deed of immovable property requires compulsory registration and payment of state stamp duty (ranging from 1% to 7% of market value plus local cess) along with registration fees (up to ₹30,000 or 1%).",
                  },
                  {
                    q: "Can a parent cancel a registered Gift Deed if their child mistreats them?",
                    a: "Yes. Under Section 23 of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007, if a senior citizen (aged 60+) gifts property with a condition that the child must provide basic amenities and care, and the child fails to do so, the Maintenance Tribunal can declare the gift deed void. The Supreme Court affirmed this in Urmila Dixit v. Sunil Sharan Dixit (2025 INSC 20). However, establishing this requires court litigation, whereas a Will can be revoked unilaterally without court intervention.",
                  },
                  {
                    q: "Is stamp duty payable on a Will in India?",
                    a: "No. Under Schedule I of the Indian Stamp Act, 1899, Wills are completely exempt from stamp duty throughout India. Registration of a Will is also optional under Section 18(e) of the Registration Act, 1908. Even if registered, only a nominal administrative fee (typically ₹50 to ₹500) applies.",
                  },
                  {
                    q: "Are gifts of property taxable under Income Tax Section 56(2)(x)?",
                    a: "Under Section 56(2)(x) of the Income Tax Act, 1961, gifts of immovable property received from specified 'relatives' (such as spouse, children, siblings, parents, and lineal ascendants/descendants) are 100% tax-exempt. Gifts to non-relatives exceeding ₹50,000 in stamp duty value are taxed as Income from Other Sources. In contrast, property received under a Will or by inheritance is completely tax-free regardless of whether the recipient is a relative or not.",
                  },
                  {
                    q: "When is a Gift Deed better than a Will for property transfer?",
                    a: "A Gift Deed is preferable when the donor wishes to eliminate any risk of post-death litigation among legal heirs, when the donee urgently requires legal title to secure a home renovation mortgage or redevelop the property, or when the transferor wants to settle assets cleanly during their own lifetime with immediate municipal mutation.",
                  },
                  {
                    q: "When is a Will better than a Gift Deed?",
                    a: "A Will is superior when the property owner wishes to retain 100% control, ownership, and rental income during their life, avoid hefty stamp duty and registration expenses upfront, retain the freedom to change beneficiaries if relationships evolve, and ensure protection against elder abandonment or neglect by children.",
                  },
                  {
                    q: "Does a donee pay capital gains tax upon receiving a gifted property?",
                    a: "No, receiving a gift or inheritance does not trigger capital gains tax at the time of transfer. However, if the donee or heir subsequently sells the property, capital gains tax applies. Under Section 49(1) of the Income Tax Act, the cost of acquisition is deemed to be the original cost paid by the donor/previous owner, and the holding period of the previous owner is included under Section 2(42A).",
                  },
                  {
                    q: "Is registration mandatory for both Gift Deeds and Wills in India?",
                    a: "No. Under Section 17 of the Registration Act, 1908 and Section 123 of the Transfer of Property Act, registration of a Gift Deed of immovable property is strictly mandatory; an unregistered gift deed confers zero title. For a Will, registration is strictly optional under Section 18(e); a Will executed on plain A4 paper attested by two witnesses is 100% valid.",
                  },
                  {
                    q: "Can I gift self-acquired property as well as ancestral property?",
                    a: "An individual has an absolute right to gift their self-acquired property to anyone. However, ancestral coparcenary property under Hindu law cannot be unilaterally gifted without the consent of other coparceners, except for small gifts of affection or pious purposes. A Will can only dispose of the individual's undivided deemed coparcenary share under Section 30 of the Hindu Succession Act.",
                  },
                ].map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-5 text-left font-extrabold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-600 shrink-0 transition-transform duration-200 ${
                          openFaq === idx ? "rotate-180 text-[#C65378]" : ""
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 13: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>Statutory References</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                Official Statutory Authorities &amp; Landmark Judicial Rulings
              </h2>

              <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 border-b border-slate-200 font-extrabold">
                      <th className="py-3 px-4">Statutory Provision / Case Law</th>
                      <th className="py-3 px-4">Core Legal Principle</th>
                      <th className="py-3 px-4">Practical Relevance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Transfer of Property Act, 1882 s. 122–123</td>
                      <td className="py-3 px-4 text-slate-600">Gift requires acceptance during lifetime and compulsory registration for immovable properties.</td>
                      <td className="py-3 px-4 text-slate-500">Unregistered gift deeds convey zero legal ownership.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Indian Succession Act, 1925 ss. 59, 62, 63</td>
                      <td className="py-3 px-4 text-slate-600">Testator retains 100% power to revoke or alter Will; takes effect only on death.</td>
                      <td className="py-3 px-4 text-slate-500">Plain paper execution with 2 witnesses is fully valid.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Income Tax Act, 1961 s. 56(2)(x) &amp; Proviso (I)</td>
                      <td className="py-3 px-4 text-slate-600">Gifts from relatives are exempt; gifts under Wills are 100% exempt for anyone.</td>
                      <td className="py-3 px-4 text-slate-500">Bequeathing to nephews or non-relatives incurs ₹0 tax.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">MWPSC Act, 2007 Section 23</td>
                      <td className="py-3 px-4 text-slate-600">Maintenance Tribunal can void conditional gifts if children fail to maintain parents.</td>
                      <td className="py-3 px-4 text-slate-500">Protects elderly parents against filial neglect.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Urmila Dixit v. Sunil Sharan Dixit (2025 INSC 20)</td>
                      <td className="py-3 px-4 text-slate-600">Supreme Court affirmed Tribunal&apos;s power to void gift deed and restore parental possession.</td>
                      <td className="py-3 px-4 text-slate-500">Landmark precedent reinforcing elder property rights.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (Author, CTA, Trust Cards)
              ===================================================================== */}
          <aside className="space-y-5 sticky top-28">
            {/* CARD 1: AUTHOR BIO CARD */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] flex items-center justify-center font-extrabold text-sm shrink-0">
                  RR
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Advocate Rajeshwar Rao</h3>
                  <p className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Succession Counsel
                  </p>
                  <p className="text-[11px] text-slate-500">WillDrafting.in</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialist in Hindu succession, coparcenary partition suits, and high-value testamentary estate planning with over 18 years of court experience.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Bar Council Verified
                </span>
                <span>Oct 2026</span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-5 desktop-sidebar-only">
{/* CARD 2: EMERGENCY CTA CARD */}
            <div className="hidden lg:block rounded-2xl bg-[#172228] p-6 text-white text-center space-y-4 shadow-lg shadow-[#172228]/15">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold tracking-wider uppercase text-rose-200">
                <Lock className="w-3 h-3 text-[#C65378]" />
                <span>Challenge-Proof Drafting</span>
              </div>
              <h3 className="text-lg font-extrabold leading-tight">
                Transferring Property to Family?
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Avoid bitter disputes. Create a customized, lawyer-verified Will clearly securing your property with ₹0 stamp duty in 15 minutes.
              </p>
              <button
                onClick={handleStartDraft}
                className="w-full py-3 px-4 rounded-full bg-[#C65378] text-white font-extrabold text-xs hover:bg-[#b04568] transition-all transform hover:-translate-y-0.5 shadow-md shadow-[#C65378]/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Draft Your Will Online</span>
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
                Why Trust WillDrafting.in
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Statutory Precision:</strong> Clauses verified under TPA s.122 &amp; ISA s.63.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Stamp Duty:</strong> Complete exemption nationwide under Indian Stamp Act.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 56(2)(x) Safe:</strong> 100% tax exemption for family inheritances.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Elder Protection:</strong> Structured per Section 23 MWPSC &amp; <em>Urmila Dixit</em> ruling.
                  </span>
                </li>
              </ul>
            </div>

            {/* CARD 4: RELATED GUIDES */}
            <div className="hidden lg:block bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                Related Guides
              </h3>
              <div className="space-y-2">
                <Link
                  href="/templates/release-deed-format"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/40 transition-colors"
                >
                  <p className="text-xs font-bold text-slate-900 leading-snug">
                    Release / Relinquishment Deed Format
                  </p>
                  <span className="text-[10px] text-[#C65378] font-semibold mt-1 inline-flex items-center gap-1">
                    Read Format <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </Link>
                <Link
                  href="/blogs/huf-property-after-death-of-karta"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/40 transition-colors"
                >
                  <p className="text-xs font-bold text-slate-900 leading-snug">
                    HUF Property After Death of Karta
                  </p>
                  <span className="text-[10px] text-[#C65378] font-semibold mt-1 inline-flex items-center gap-1">
                    Read Guide <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </Link>
                <Link
                  href="/blogs/property-transfer-after-death-without-will-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/40 transition-colors"
                >
                  <p className="text-xs font-bold text-slate-900 leading-snug">
                    Property Transfer After Death Without Will
                  </p>
                  <span className="text-[10px] text-[#C65378] font-semibold mt-1 inline-flex items-center gap-1">
                    Read Guide <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </Link>
                <Link
                  href="/tools/succession-calculator"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/40 transition-colors"
                >
                  <p className="text-xs font-bold text-slate-900 leading-snug">
                    Interactive Hindu Succession Calculator
                  </p>
                  <span className="text-[10px] text-[#C65378] font-semibold mt-1 inline-flex items-center gap-1">
                    Open Calculator <ArrowRight className="w-2.5 h-2.5" />
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
                  href="/blogs/gift-deed-cancellation-senior-citizens-act-section-23"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Gift Deed Cancellation Section 23
                </Link>
                <Link
                  href="/templates/release-deed-format"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Relinquishment Deed Format
                </Link>
                <Link
                  href="/blogs/notarized-will-vs-registered-will-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Notarized vs Registered Will
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

      {/* =========================================================================
          IMAGE ZOOM MODAL
          ========================================================================= */}
      {showImageModal && (
        <div
          onClick={() => setShowImageModal(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden p-4 space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <p className="font-extrabold text-sm text-slate-900">
                Gift Deed vs Will in India &bull; Visual Decision Infographic
              </p>
              <button
                onClick={() => setShowImageModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-100">
              <Image
                src="/images/gift-deed-vs-will-india.jpg"
                alt="Gift Deed vs Will Comparison Full View"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xs text-slate-500 text-center">
              Gift Deed (Immediate property and keys transfer, high stamp duty) vs Last Will (Operates on death, ₹0 stamp duty, complete control).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
