"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
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
  ArrowDownRight,
  Layers,
  Globe,
  Coins,
  FileSpreadsheet,
  Compass,
} from "lucide-react";

// Table of Contents Items (matching H2 IDs, <= 70 chars, 0 em-dashes)
const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Statutory Rules: Partition Deeds" },
  { id: "interactive-calculator", label: "2. Interactive Owelty & UDS Tool" },
  { id: "comparison-table", label: "3. Partition Deed vs Family Settlement" },
  { id: "uds-floor-demarcation", label: "4. Floor-Wise Demarcation & UDS" },
  { id: "owelty-clauses", label: "5. Owelty Equalization & Tax Rules" },
  { id: "stamp-duty-guide", label: "6. State-Wise Stamp Duty Guide" },
  { id: "partition-deed-template", label: "7. Registered Partition Deed Format" },
  { id: "sro-registration-sop", label: "8. SRO Registration SOP & Checklist" },
  { id: "coparcenary-rights", label: "9. Coparcenary Rights: Daughters & HUF" },
  { id: "case-studies", label: "10. Real Case Studies: Delhi & Bengaluru" },
  { id: "statutory-citations", label: "11. Statutory Citations & Advocate Profile" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
];

const STATE_STAMP_RATES: Record<string, { label: string; ratePercent: number; fixedFee?: string; notes: string }> = {
  delhi: {
    label: "Delhi (NCT)",
    ratePercent: 2.0,
    notes: "1% to 2% stamp duty on the market value of separated shares plus 1% registration fee.",
  },
  maharashtra: {
    label: "Maharashtra",
    ratePercent: 0.0,
    fixedFee: "₹200 - ₹500",
    notes: "Nominal duty under Article 46 of Maharashtra Stamp Act for partition between blood relatives.",
  },
  karnataka: {
    label: "Karnataka",
    ratePercent: 0.0,
    fixedFee: "₹1,000 - ₹5,000",
    notes: "Article 39 provides flat slab per share (₹1,000 for non-urban, ₹5,000 for municipal areas).",
  },
  uttar_pradesh: {
    label: "Uttar Pradesh",
    ratePercent: 1.0,
    notes: "Concessional 1% stamp duty on the market value of separated shares among family members.",
  },
  haryana: {
    label: "Haryana",
    ratePercent: 1.0,
    notes: "Nominal or concessional stamp duty on ancestral family property partitions between legal heirs.",
  },
  tamil_nadu: {
    label: "Tamil Nadu",
    ratePercent: 1.0,
    fixedFee: "Max ₹25,000",
    notes: "1% stamp duty capped at ₹25,000 per share plus 1% registration fee (capped at ₹4,000).",
  },
  telangana: {
    label: "Telangana & AP",
    ratePercent: 1.0,
    notes: "Concessional 1% to 2% on separated shares among coparceners with ₹1,000 to ₹2,000 registration fee.",
  },
};

const FAQS = [
  {
    q: "What is a Partition Deed under Indian property law?",
    a: "A Partition Deed is an official legal instrument governed by Section 2(15) of the Indian Stamp Act, 1899 and Section 17 of the Registration Act, 1908. It legally divides jointly owned or ancestral property among co-owners or legal heirs, severing joint title and converting joint tenancy into separate, distinct, and individual ownership.",
  },
  {
    q: "Is registration of a Partition Deed mandatory in India?",
    a: "Yes. Under Section 17(1)(b) of the Registration Act, 1908, any non-testamentary instrument that creates, declares, assigns, limits, or extinguishes any right, title, or interest in immovable property valued over ₹100 must be registered with the Sub-Registrar. Under Section 49, an unregistered partition deed cannot affect title or be admitted as evidence of partition.",
  },
  {
    q: "How does a Partition Deed differ from a Family Settlement Agreement?",
    a: "A Partition Deed operates in praesenti, creating new separate legal titles on the spot and requiring full registration and statutory stamp duty. In contrast, a Memorandum of Family Settlement (as upheld in Kale v. Dy. Director of Consolidation) merely records a past oral arrangement, settling antecedent claims without creating new title, often requiring lower stamp duty.",
  },
  {
    q: "How are multi-story residential houses divided among brothers?",
    a: "When dividing a multi-floor residential building, the deed must incorporate four specific schedules: Schedule A for the entire land and building, Schedule B allocating a specific floor and proportionate Undivided Share of Land (UDS) to the first brother, Schedule C allocating another floor and UDS to the second brother, and Schedule D governing shared easements like staircases, terrace access, and water tanks.",
  },
  {
    q: "What is an Owelty clause in a partition deed?",
    a: "An Owelty (or Owlat) clause provides for monetary equalization when immovable properties cannot be divided into mathematically equal portions. The co-sharer receiving a more valuable physical portion (e.g. Ground Floor or commercial frontage) pays an agreed sum of cash compensation to equalize the shares, which is completely tax-exempt under Section 47(i) of the Income Tax Act.",
  },
  {
    q: "Do daughters have equal coparcenary rights in a family partition deed?",
    a: "Yes. Under the landmark Supreme Court ruling in Vineeta Sharma v. Rakesh Sharma (2020), daughters have equal coparcenary rights by birth in ancestral property under Section 6 of the Hindu Succession Act. A family partition deed that excludes daughters without their registered Relinquishment Deed (Haq Tyag) is voidable and can be set aside by civil courts.",
  },
  {
    q: "How much stamp duty is payable on a partition deed between family members?",
    a: "Stamp duty varies by state. Most states offer concessional rates for partition deeds among blood relatives. For example, Maharashtra levies a nominal duty of ₹200 to ₹500, Delhi charges 1% to 2%, Karnataka applies slab-based flat duties (₹1,000 to ₹5,000 for urban family partitions), and Uttar Pradesh charges 1% of the value of the separated shares.",
  },
  {
    q: "Does executing a partition deed attract capital gains tax?",
    a: "No. Under Section 47(i) of the Income Tax Act, 1961, any distribution of capital assets on the total or partial partition of a Hindu Undivided Family (HUF) or among co-owners is expressly excluded from the definition of transfer under Section 45. No capital gains tax or income tax is payable on a genuine partition.",
  },
  {
    q: "What happens if one brother refuses to sign the partition deed?",
    a: "If a co-owner refuses to execute a mutual partition deed, the remaining co-sharers must file a Civil Partition Suit under Order XX Rule 18 of the Code of Civil Procedure (CPC) in the jurisdictional civil court. The court will determine individual shares in a Preliminary Decree and physically divide the assets through a Court Commissioner in a Final Decree.",
  },
  {
    q: "What documents are required to register a partition deed at the Sub-Registrar Office?",
    a: "You require: (1) Original parent title deeds or registered sale deeds of the property, (2) Non-judicial e-stamp paper with paid duty, (3) Architectural site plan showing floor-wise demarcation, (4) Municipal tax paid receipts and Khata/mutation extract, (5) Non-Encumbrance Certificate (EC), and (6) Original Aadhaar and PAN cards of all co-sharers and two independent adult witnesses.",
  },
];

export default function PartitionDeedClient() {
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
  const [copiedTemplate, setCopiedTemplate] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);
  const [copiedOweltyClause, setCopiedOweltyClause] = useState<boolean>(false);

  // ==========================================
  // INTERACTIVE PARTITION & OWELTY SIMULATOR
  // ==========================================
  const [numSharers, setNumSharers] = useState<number>(3);
  const [totalValuation, setTotalValuation] = useState<number>(30000000); // ₹3.00 Cr
  const [selectedState, setSelectedState] = useState<string>("delhi");
  const [propertyStructure, setPropertyStructure] = useState<"multi_floor" | "plots" | "commercial">("multi_floor");

  // Initial share allocations
  const [allotmentValues, setAllotmentValues] = useState<number[]>([12000000, 10000000, 8000000]);

  // Adjust array size when numSharers changes
  useEffect(() => {
    setAllotmentValues((prev) => {
      const targetPerShare = Math.round(totalValuation / numSharers);
      const newArr = Array(numSharers).fill(targetPerShare);
      // Give slight realistic floor variance if multi-floor
      if (numSharers === 2) {
        return [Math.round(totalValuation * 0.55), Math.round(totalValuation * 0.45)];
      } else if (numSharers === 3) {
        return [
          Math.round(totalValuation * 0.4),
          Math.round(totalValuation * 0.33),
          Math.round(totalValuation * 0.27),
        ];
      } else if (numSharers === 4) {
        return [
          Math.round(totalValuation * 0.3),
          Math.round(totalValuation * 0.26),
          Math.round(totalValuation * 0.24),
          Math.round(totalValuation * 0.2),
        ];
      }
      return newArr;
    });
  }, [numSharers, totalValuation]);

  const updateIndividualAllotment = (index: number, val: number) => {
    setAllotmentValues((prev) => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const statutoryEntitlement = Math.round(totalValuation / numSharers);
  const currentTotalAllocated = allotmentValues.reduce((a, b) => a + b, 0);

  // Equalization differences (Owelty)
  const oweltyBalances = allotmentValues.map((val) => val - statutoryEntitlement);

  // Undivided Share of Land (UDS) percentage: equally or proportionately
  const udsPercentages = allotmentValues.map((val) =>
    currentTotalAllocated > 0 ? ((val / currentTotalAllocated) * 100).toFixed(1) : (100 / numSharers).toFixed(1)
  );

  // Stamp duty calculation
  const stateData = STATE_STAMP_RATES[selectedState] || STATE_STAMP_RATES.delhi;
  // In most Indian states, stamp duty is payable on the value of the separated shares (excluding the largest share)
  const sortedValues = [...allotmentValues].sort((a, b) => b - a);
  const separatedSharesValue = sortedValues.slice(1).reduce((acc, curr) => acc + curr, 0);
  const calculatedStampDuty =
    stateData.ratePercent > 0
      ? Math.round((separatedSharesValue * stateData.ratePercent) / 100)
      : 0;

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

  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const copyTemplateToClipboard = () => {
    const templateText = `DEED OF PARTITION BETWEEN FAMILY MEMBERS / BROTHERS
(Under Section 17 of the Registration Act, 1908 & Indian Stamp Act, 1899)

THIS DEED OF PARTITION is made and executed on this [Day] day of [Month], [Year], at [City/Sub-District], by and between:

1. [FIRST CO-SHARER NAME], son of Late [Father's Name], aged about [Age] years, residing at [Address], Aadhaar No: [XXXX-XXXX-XXXX], PAN: [ABCDE1234F], hereinafter referred to as the "PARTY OF THE FIRST PART" (which expression shall unless excluded by or repugnant to the context include his heirs, legal representatives, and assigns).

2. [SECOND CO-SHARER NAME], son of Late [Father's Name], aged about [Age] years, residing at [Address], Aadhaar No: [XXXX-XXXX-XXXX], PAN: [ABCDE1234F], hereinafter referred to as the "PARTY OF THE SECOND PART" (which expression shall unless excluded by or repugnant to the context include his heirs, legal representatives, and assigns).

3. [THIRD CO-SHARER / SISTER NAME], daughter of Late [Father's Name], aged about [Age] years, residing at [Address], Aadhaar No: [XXXX-XXXX-XXXX], PAN: [ABCDE1234F], hereinafter referred to as the "PARTY OF THE THIRD PART".

(The Party of the First Part, Second Part, and Third Part are hereinafter collectively referred to as the "PARTIES" and individually as a "PARTY").

WHEREAS:
A. The Parties hereto are the absolute joint owners and coparceners of the immovable property consisting of land and multi-story building situated at [Full Property Address], fully detailed and bounded in SCHEDULE 'A' hereunder written (hereinafter referred to as the "SCHEDULE PROPERTY").
B. The said Schedule Property originally belonged to the late [Parent's Name], who acquired absolute ownership vide Registered Sale Deed dated [Date], bearing Document No. [Doc No.], registered in Book I, Volume [Vol], Pages [Pages], in the Office of the Sub-Registrar at [SRO Location].
C. The said [Parent's Name] departed this life intestate on [Date of Death], leaving behind the Parties herein as his sole legal heirs under Class I of the Schedule to the Hindu Succession Act, 1956.
D. Mutual disputes and inconvenience having arisen in the joint enjoyment of the said Schedule Property, the Parties have mutually resolved to partition the same by metes and bounds, and to allocate specific independent floors and undivided shares of land (UDS) to each Party to hold and enjoy in absolute severalty.

NOW THIS DEED OF PARTITION WITNESSETH AND IT IS HEREBY MUTUALLY AGREED BY AND BETWEEN THE PARTIES AS FOLLOWS:

1. SEVERANCE OF JOINT STATUS:
The Parties hereby explicitly declare that the joint family status and joint tenancy in respect of the Schedule Property stands completely severed, extinguished, and dissolved from the date of execution of this Deed.

2. ALLOTMENT OF SEPARATE SHARES:
(a) The Party of the First Part is hereby allotted the entire GROUND FLOOR along with [XX]% Undivided Share of Land (UDS), more particularly described in SCHEDULE 'B' hereunder written, to hold, possess, and enjoy as sole and absolute owner forever.
(b) The Party of the Second Part is hereby allotted the entire FIRST FLOOR along with [XX]% Undivided Share of Land (UDS), more particularly described in SCHEDULE 'C' hereunder written, to hold, possess, and enjoy as sole and absolute owner forever.
(c) The Party of the Third Part is hereby allotted the entire SECOND FLOOR along with [XX]% Undivided Share of Land (UDS), more particularly described in SCHEDULE 'D' hereunder written, to hold, possess, and enjoy as sole and absolute owner forever.

3. OWELTY (EQUALIZATION PAYMENT) CLAUSE:
Whereas the physical floor allotted to the Party of the First Part (Ground Floor) carries a higher commercial and market value than the floors allotted to the other Parties, the Party of the First Part has, in order to equalize the statutory shares, agreed to pay an Owelty sum of Rs. [Amount in Figures]/- (Rupees [Amount in Words] only) to the Party of the Third Part vide Demand Draft No. [DD No.] dated [Date] drawn on [Bank Name], receipt of which the Party of the Third Part hereby admits and acknowledges. Pursuant to Section 47(i) of the Income Tax Act, 1961, this Owelty payment constitutes a non-taxable equalization sum.

4. COMMON AMENITIES & EASEMENTS (SCHEDULE 'E'):
The main entrance gate, driveway, common staircases, lift, overhead water tanks, borewell, underground sump, and terrace/roof access shall remain joint and common amenities for all Parties as set out in SCHEDULE 'E'. No Party shall obstruct or construct any unauthorized structure upon common areas.

5. MUTATION & INDIVIDUAL KHATA:
Each Party shall be entitled to apply before the local Municipal Corporation / Revenue Authorities for independent Khata bifurcation, mutation of property card, and separate property tax assessments without requiring further consent from other Parties.

SCHEDULE 'A' (ENTIRE JOINT PROPERTY)
All that piece and parcel of residential land and building situated at [Full Address], measuring [Plot Area] sq. yds. Bounded by: North: [Road/Plot], South: [Plot], East: [Road], West: [Plot].

SCHEDULE 'B' (ALLOTTED TO FIRST PARTY)
Entire Ground Floor flat measuring [Covered Area] sq. ft., together with [XX]% Undivided Share of Land (UDS) in Schedule 'A', and designated open car parking slot No. 1.

SCHEDULE 'C' (ALLOTTED TO SECOND PARTY)
Entire First Floor flat measuring [Covered Area] sq. ft., together with [XX]% Undivided Share of Land (UDS) in Schedule 'A', and designated open car parking slot No. 2.

SCHEDULE 'D' (ALLOTTED TO THIRD PARTY)
Entire Second Floor flat measuring [Covered Area] sq. ft., together with [XX]% Undivided Share of Land (UDS) in Schedule 'A', and designated open car parking slot No. 3.

SCHEDULE 'E' (COMMON AREAS & AMENITIES)
Common staircase, lift lobby, water pump, terrace roof with water tank access, and external sewer pipelines.

IN WITNESS WHEREOF the Parties hereto have set and subscribed their respective hands on the day, month, and year first above written.

PARTY OF THE FIRST PART: ___________________
PARTY OF THE SECOND PART: ___________________
PARTY OF THE THIRD PART: ___________________

WITNESSES:
1. Name & Address: ___________________________ Signature: ________________
2. Name & Address: ___________________________ Signature: ________________`;

    navigator.clipboard.writeText(templateText);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 3000);
  };

  const copyOweltyClauseToClipboard = () => {
    const oweltyText = `STATUTORY OWELTY EQUALIZATION CLAUSE FOR PARTITION DEED:
"AND WHEREAS, by reason of the immovable properties and floor structures being incapable of partition into mathematically equal physical portions, the Parties have agreed that the Party receiving property of greater valuation shall pay to the Party receiving property of lesser valuation an equalization amount in cash (known in law as 'Owelty of Partition').

ACCORDINGLY, the Party of the First Part hereby pays to the Party of the Second Part a sum of Rs. [Insert Amount]/- (Rupees [Amount in Words] only) by Banker's Cheque / NEFT / RTGS bearing UTR No. [Insert UTR Number] dated [Insert Date] drawn on [Insert Bank Name], receipt whereof the Party of the Second Part hereby confirms and acknowledges in full satisfaction of equalized partition rights.

IT IS EXPRESSLY CLARIFIED that this Owelty equalization sum is paid solely for adjusting unequal property values upon partition of joint family property under Section 2(15) of the Indian Stamp Act, 1899, and is exempt from capital gains taxation under Section 47(i) of the Income Tax Act, 1961 as confirmed in landmark judicial precedents."`;

    navigator.clipboard.writeText(oweltyText);
    setCopiedOweltyClause(true);
    setTimeout(() => setCopiedOweltyClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `SUB-REGISTRAR OFFICE (SRO) PARTITION DEED REGISTRATION CHECKLIST:
1. Two original copies of the Partition Deed printed on non-judicial e-stamp paper of required state stamp value.
2. Architectural site plan / floor plan with colored boundary demarcations for Schedule A, B, C, D signed by all co-sharers.
3. Original chain of parent title deeds (Sale Deed, Gift Deed, or Conveyance in ancestor's name).
4. Death Certificate and Surviving Member Certificate / Legal Heir Certificate of the deceased ancestor.
5. Up-to-date Municipal Property Tax paid receipts and electricity bills for all floors.
6. Mutation extract / Khata certificate / Property Card showing co-ownership.
7. Nil Encumbrance Certificate (Form 15 or 16) issued by the Sub-Registrar for the past 13 to 30 years.
8. Original Aadhaar Cards and PAN Cards of all co-sharers executing the deed.
9. Two independent adult attesting witnesses with original Aadhaar cards and photographs.
10. SRO online appointment slip, challan payment receipt for registration fees and user charges.`;

    navigator.clipboard.writeText(checklistText);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Navy - Matching Reference Theme)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>REGISTRATION ACT, 1908 • SECTION 17 &amp; INDIAN STAMP ACT, 1899 SEC 2(15)</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Partition Deed Format for Family Property Division
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Download lawyer-vetted partition deed formats between brothers and legal heirs in India.
            Master floor-wise Schedule A to D demarcation, Undivided Share of Land (UDS) allocation,
            and tax-neutral Owelty cash equalization under Section 17 of the Registration Act.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#partition-deed-template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get Partition Deed Format</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Challenge-Proof Will</span>
            </button>
            <Link
              href="/services/family-settlement-deed-lawyer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Consult Partition Advocate</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Trust Signals)
          ========================================================================= */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 17</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MANDATORY SRO REGISTRATION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 2(15)</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                INDIAN STAMP ACT INSTRUMENT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Owelty Clause</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                TAX-FREE CASH EQUALIZATION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Vineeta Sharma</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                COPARCENARY DAUGHTER PARITY
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
                Governed under Registration Act 1908 s. 17, Indian Stamp Act 1899 s. 2(15),
                Transfer of Property Act 1882, Hindu Succession Act 1956 s. 6, and Income Tax Act
                1961 s. 47(i).
              </p>
            </div>

            {/* Document Download Quick Box */}
            <div className="bg-[#FAF7F0] rounded-2xl border border-[#C65378]/20 p-4 text-xs space-y-2.5">
              <div className="font-extrabold text-[#172228] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span>Deed Formatting Guide</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Need to print this deed format for Sub-Registrar execution? Copy the vetted template or
                schedule an advocate review for local municipal compliance.
              </p>
              <a
                href="#partition-deed-template"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-[11px] transition-colors"
              >
                <span>Jump to Complete Deed</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE TOOL
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* FEATURED EDITORIAL IMAGE */}
            <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-2 sm:p-3 shadow-xs">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/partition-deed-format-between-family-members-og.jpg"
                  alt="Partition Deed Format Between Brothers India Legal Template and Schedule Guidelines"
                  width={1200} height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 850px"
                />
              </div>
              <div className="p-3 text-center">
                <p className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center justify-center gap-2">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>
                    Official Registered Partition Deed Anatomy: Section 17 Registration Act, Floor-Wise UDS Demarcation &amp; Owelty Equalization
                  </span>
                </p>
              </div>
            </div>

            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: FAMILY PARTITION DEED ESSENTIALS</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Operative in Praesenti:</strong> Unlike a mere memorandum, a registered Partition
                    Deed extinguishes joint ownership immediately and vests distinct, independent title to
                    each co-sharer.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Mandatory SRO Registration:</strong> Under Section 17 of the Registration Act, 1908,
                    an unregistered partition deed cannot convey title, support municipal mutation, or satisfy
                    bank loan scrutiny.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Floor-Wise UDS Allocation:</strong> Multi-floor family homes require specific
                    Schedules (A, B, C, D) specifying floor boundaries, percentage of Undivided Share of Land (UDS),
                    and roof rights.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Tax-Neutral Owelty Equalization:</strong> Monetary equalization payments made to balance
                    unequal floor values are strictly non-taxable under Section 47(i) of the Income Tax Act.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Coparcenary Parity for Daughters:</strong> Under the Supreme Court ruling in <em>Vineeta Sharma (2020)</em>,
                    daughters are equal coparceners by birth. Any partition excluding daughters without a registered
                    Relinquishment Deed is voidable.
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
                1. Statutory Rules: Partition Deeds Under Indian Law
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When brothers, sisters, or family members inherit real estate jointly from parents or ancestors,
                  they hold the property as co-owners or coparceners. While joint enjoyment is common initially,
                  practical challenges quickly arise when family members wish to construct additional floors,
                  obtain independent home loans, mortgage their share, or sell their portion.
                </p>
                <p>
                  In Indian jurisprudence, an <strong>Instrument of Partition</strong> is governed under{" "}
                  <strong>Section 2(15) of the Indian Stamp Act, 1899</strong>. It is defined as any non-testamentary
                  instrument whereby co-owners divide or agree to divide property in severalty. Once executed, the
                  joint title dissolves into individual, exclusive titles.
                </p>
                <p>
                  Under <strong>Section 17(1)(b) of the Registration Act, 1908</strong>, registration of any
                  instrument that creates, declares, assigns, limits, or extinguishes rights in immovable property
                  exceeding ₹100 in value is strictly compulsory. If a partition deed is left unregistered,{" "}
                  <strong>Section 49 of the Registration Act</strong> bars it from affecting the property or being
                  received as evidence of any transaction affecting the title.
                </p>
                <p>
                  Consequently, an unregistered partition agreement cannot be used to obtain a separate municipal
                  Khata, separate electricity or water meters, building plan approvals, or bank loans. To establish
                  ironclad legal ownership, all co-sharers must execute a formal partition deed before the local
                  Sub-Registrar.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE PARTITION &amp; OWELTY CALCULATOR</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Partition &amp; Owelty Equalization Tool
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Use this statutory partition calculator to allocate multi-floor or land shares among brothers,
                calculate the required Undivided Share of Land (UDS) percentage, determine Owelty equalization
                cash settlements, and estimate state stamp duty.
              </p>

              {/* Calculator Panel Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Configuration Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
                  {/* Number of Co-Sharers */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Number of Heirs / Brothers</span>
                    </label>
                    <select
                      value={numSharers}
                      onChange={(e) => setNumSharers(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      <option value={2}>2 Brothers / Co-Sharers</option>
                      <option value={3}>3 Brothers / Co-Sharers</option>
                      <option value={4}>4 Brothers / Co-Sharers</option>
                    </select>
                  </div>

                  {/* State Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Registration State</span>
                    </label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      {Object.entries(STATE_STAMP_RATES).map(([key, data]) => (
                        <option key={key} value={key}>
                          {data.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Property Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Property Structure</span>
                    </label>
                    <select
                      value={propertyStructure}
                      onChange={(e) => setPropertyStructure(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      <option value="multi_floor">Multi-Story House (Floor-Wise)</option>
                      <option value="plots">Land / Plot Parcels</option>
                      <option value="commercial">Commercial / Mixed-Use</option>
                    </select>
                  </div>
                </div>

                {/* Total Valuation Input */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Total Joint Property Market Valuation: {formatINR(totalValuation)}
                    </label>
                    <span className="text-xs font-semibold text-slate-500">Circle Rate or Fair Market Value</span>
                  </div>
                  <input
                    type="range"
                    min={2000000}
                    max={100000000}
                    step={1000000}
                    value={totalValuation}
                    onChange={(e) => setTotalValuation(Number(e.target.value))}
                    className="w-full accent-[#C65378] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                    <span>₹20 Lakhs</span>
                    <span>₹2.50 Cr</span>
                    <span>₹5.00 Cr</span>
                    <span>₹10.00 Cr</span>
                  </div>
                </div>

                {/* Physical Allotment Sliders for each brother */}
                <div className="space-y-4 pt-2">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                    <span>Individual Floor / Share Valuations</span>
                    <span className="text-emerald-700 font-semibold text-xs">
                      Statutory Parity per Share: {formatINR(statutoryEntitlement)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allotmentValues.map((val, idx) => {
                      const shareName =
                        propertyStructure === "multi_floor"
                          ? idx === 0
                            ? "Ground Floor (Schedule B)"
                            : idx === 1
                            ? "First Floor (Schedule C)"
                            : idx === 2
                            ? "Second Floor (Schedule D)"
                            : `Floor ${idx + 1}`
                          : `Parcel ${idx + 1}`;
                      const diff = oweltyBalances[idx] || 0;
                      const isSurplus = diff > 0;
                      const isDeficit = diff < 0;

                      return (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-extrabold text-slate-900">
                              Brother {idx + 1}: {shareName}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] font-bold text-slate-700">
                              UDS: {udsPercentages[idx]}%
                            </span>
                          </div>

                          <div className="text-base font-extrabold text-[#172228]">
                            {formatINR(val)}
                          </div>

                          <input
                            type="range"
                            min={1000000}
                            max={totalValuation}
                            step={500000}
                            value={val}
                            onChange={(e) => updateIndividualAllotment(idx, Number(e.target.value))}
                            className="w-full accent-[#172228] cursor-pointer"
                          />

                          <div className="text-[11px] leading-tight">
                            {isSurplus && (
                              <span className="text-rose-700 font-bold">
                                Surplus: +{formatINR(diff)} (Pays Owelty)
                              </span>
                            )}
                            {isDeficit && (
                              <span className="text-emerald-700 font-bold">
                                Deficit: {formatINR(diff)} (Receives Owelty)
                              </span>
                            )}
                            {diff === 0 && (
                              <span className="text-slate-600 font-medium">
                                Perfectly balanced (Zero Owelty)
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* COMPUTATION RESULTS BOX */}
                <div className="p-6 rounded-3xl bg-[#172228] text-white space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-rose-300" />
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-200">
                        OFFICIAL PARTITION DEED SETTLEMENT SUMMARY
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-white/10 px-2.5 py-1 rounded-full">
                      Section 47(i) Tax Exempt
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Equal Entitlement per Share
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-1">
                        {formatINR(statutoryEntitlement)}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Total {formatINR(totalValuation)} ÷ {numSharers} Heirs
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Estimated SRO Stamp Duty ({stateData.label})
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-rose-300 mt-1">
                        {stateData.fixedFee ? stateData.fixedFee : formatINR(calculatedStampDuty)}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {stateData.notes}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Capital Gains Tax Liability
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
                        ₹0 (Completely Nil)
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Under Section 47(i) of Income Tax Act
                      </div>
                    </div>
                  </div>

                  {/* Equalization Owelty Guidance */}
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs text-slate-200 space-y-1.5">
                    <div className="font-extrabold text-white flex items-center gap-1.5">
                      <Coins className="w-3.5 h-3.5 text-rose-300" />
                      <span>Recommended Owelty Clause Formulation:</span>
                    </div>
                    <p className="leading-relaxed text-[11px]">
                      The heir taking the higher-valued Ground Floor should transfer{" "}
                      <strong>
                        {formatINR(
                          Math.max(...oweltyBalances.filter((b) => b > 0)) || 0
                        )}
                      </strong>{" "}
                      via registered Demand Draft or RTGS to the deficit co-sharers as Owelty compensation. This
                      clause must be cited in the Partition Deed recitals to ensure complete tax exemption under
                      Section 47(i).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSpreadsheet className="w-4 h-4" />
                <span>LEGAL INSTRUMENT COMPARISON</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Partition Deed vs Family Settlement Agreement
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Choosing the wrong legal instrument can lead to severe stamp duty penalties, registration
                rejections, or title disputes. Review how a registered Partition Deed compares to a Family
                Settlement Agreement and a Relinquishment Deed:
              </p>

              {/* Table Container */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-extrabold">
                      <th className="py-3.5 px-4">Key Legal Feature</th>
                      <th className="py-3.5 px-4 text-[#C65378]">Registered Partition Deed</th>
                      <th className="py-3.5 px-4">Family Settlement Agreement</th>
                      <th className="py-3.5 px-4">Relinquishment Deed (Haq Tyag)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Operative Timing</td>
                      <td className="py-3 px-4 font-bold text-slate-900">In Praesenti (Immediate division)</td>
                      <td className="py-3 px-4">Records past antecedent oral division</td>
                      <td className="py-3 px-4">Immediate release of undivided share</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Registration Mandatory?</td>
                      <td className="py-3 px-4 font-bold text-rose-700">YES (Section 17 Registration Act)</td>
                      <td className="py-3 px-4">NO (If drafted as past memorandum)</td>
                      <td className="py-3 px-4 font-bold text-rose-700">YES (Section 17 Registration Act)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Applicable Stamp Duty</td>
                      <td className="py-3 px-4">State concessional rates (0.5% - 2% or flat fee)</td>
                      <td className="py-3 px-4">Standard agreement duty (₹100 to ₹500)</td>
                      <td className="py-3 px-4">Concessional blood relative duty</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Independent Title Created</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Yes, independent titles created</td>
                      <td className="py-3 px-4">Acknowledges existing pre-existing rights</td>
                      <td className="py-3 px-4">Extinguishes share of releasing co-heir</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Sub-Registrar Mutation</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Seamless floor-wise Khata bifurcation</td>
                      <td className="py-3 px-4">Requires civil court decree or consent affidavit</td>
                      <td className="py-3 px-4">Straightforward mutation to remaining heirs</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Bank Home Loan Approval</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">100% accepted by all scheduled banks</td>
                      <td className="py-3 px-4 text-rose-700">Banks frequently reject unregistered memos</td>
                      <td className="py-3 px-4">Accepted once registered</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Capital Gains Tax</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Zero (Exempt under Section 47(i))</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">Zero (Family settlement is not a transfer)</td>
                      <td className="py-3 px-4">Zero if without monetary consideration</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: FLOOR-WISE DEMARCATION & UDS */}
            <section id="uds-floor-demarcation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>COMPETITOR BLIND SPOT: SCHEDULE DEMARCATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Floor-Wise Demarcation &amp; Undivided Share of Land
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The single biggest error found in online partition deed templates is the total absence of
                  statutory schedules demarcating <strong>Undivided Share of Land (UDS)</strong> and floor boundaries.
                  Sub-Registrars across Indian states routinely issue defect notices or refuse registration when a
                  deed merely states &ldquo;Brother A gets the ground floor and Brother B gets the first floor.&rdquo;
                </p>
                <p>
                  To secure an unobstructed, mortgageable title, a registered partition deed for a multi-story
                  building must contain <strong>four distinct schedules</strong>:
                </p>
              </div>

              {/* 4 Schedules Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">Schedule A</span>
                    <span className="text-[11px] font-bold text-slate-500">Entire Joint Property</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    Total Plot Dimensions &amp; Four Boundaries
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Details the entire land parcel, total plot area in square yards or square meters, survey number,
                    sanctioned layout plan number, and exact four physical boundaries (North, South, East, West).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">Schedule B</span>
                    <span className="text-[11px] font-bold text-slate-500">Allotment: Co-Sharer 1</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    Ground Floor Flat + Proportional UDS %
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Specifies covered built-up area of the Ground Floor, carpet area, designated parking bays,
                    and exact percentage of Undivided Share of Land (e.g. 50% or 33.33% of Schedule A).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">Schedule C</span>
                    <span className="text-[11px] font-bold text-slate-500">Allotment: Co-Sharer 2</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    First Floor Flat + Proportional UDS %
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Details the complete First Floor built-up unit, balconies, exclusive access routes, designated
                    car parking slot, and corresponding UDS ownership percentage in the underlying land.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">Schedule D</span>
                    <span className="text-[11px] font-bold text-slate-500">Common Amenities</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    Terrace, Staircase, Lift &amp; Easements
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Governs shared rights: access to overhead water tanks, terrace roof usage, underground borewell
                    and pump operations, lift maintenance, external drainage lines, and driveway easements.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: OWELTY EQUALIZATION */}
            <section id="owelty-clauses" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Coins className="w-4 h-4" />
                <span>EQUALIZATION COMPENSATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Owelty Equalization Clauses &amp; Tax Neutrality
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In practice, real estate rarely divides into mathematically identical shares. For instance, in a
                  two-story house, the Ground Floor typically carries a significantly higher market value than the
                  First or Second Floor due to independent garden space, accessibility, or commercial frontage.
                </p>
                <p>
                  Under Indian law, this imbalance is resolved through an <strong>Owelty of Partition</strong> (or Owlat).
                  As affirmed by the Supreme Court of India in <em>T.S. Swaminatha Odayar v. Official Receiver of West Tanjore</em>,
                  an Owelty payment represents the financial difference required to balance unequal physical portions.
                  The court held that Owelty creates a legal charge on the higher-valued property until paid.
                </p>
                <p>
                  Crucially, an Owelty payment does <strong>NOT</strong> convert the partition into a sale or transfer.
                  Under <strong>Section 47(i) of the Income Tax Act, 1961</strong>, any distribution of capital assets
                  on partition is expressly excluded from capital gains taxation. Both the Income Tax Appellate Tribunal (ITAT)
                  and High Courts have confirmed that Owelty cash received by a co-sharer is purely a capital adjustment
                  and attracts zero capital gains tax or income tax.
                </p>
              </div>

              {/* Owelty Copy Box */}
              <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                    <CheckCheck className="w-4 h-4" />
                    <span>Statutory Owelty Clause Formulation</span>
                  </div>
                  <button
                    onClick={copyOweltyClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-xs font-bold transition-colors"
                  >
                    {copiedOweltyClause ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Owelty Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] leading-relaxed text-slate-800 overflow-x-auto">
                  &ldquo;AND WHEREAS, by reason of the immovable properties being incapable of partition into mathematically
                  equal portions, the Party of the First Part agrees to pay an equalization amount of Rs. [Amount]/- (Owelty
                  of Partition) to the Party of the Second Part vide Cheque / RTGS No. [UTR], receipt whereof is hereby
                  acknowledged. It is agreed that this payment is an adjustment of co-ownership rights under Section 2(15) of
                  the Indian Stamp Act and non-taxable under Section 47(i) of the Income Tax Act, 1961.&rdquo;
                </div>
              </div>
            </section>

            {/* SECTION 6: STATE STAMP DUTY GUIDE */}
            <section id="stamp-duty-guide" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <MapPin className="w-4 h-4" />
                <span>STATE REVENUE LAWS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. State-Wise Stamp Duty &amp; SRO Registration Charges
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Under the Indian Constitution, Stamp Duty on property instruments falls under the concurrent and state
                lists. Most states provide significant concessions for partition deeds executed among blood relatives:
              </p>

              {/* State Rate Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(STATE_STAMP_RATES).map(([key, item]) => (
                  <div key={key} className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-900">{item.label}</span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#C65378] font-bold text-[10px]">
                        {item.fixedFee ? item.fixedFee : `${item.ratePercent}% Duty`}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.notes}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Important Rule on Separated Shares:</strong> In most states (including UP, Maharashtra, and Delhi),
                  stamp duty is calculated not on the total property value, but on the <em>separated shares</em> (i.e. the total
                  market value minus the largest allotted share). This provides substantial cost savings.
                </span>
              </div>
            </section>

            {/* SECTION 7: COMPLETE REGISTERED DEED TEMPLATE */}
            <section id="partition-deed-template" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>LAWYER-VETTED LEGAL DRAFT</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Complete Registered Partition Deed Format Template
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Below is the complete, Sub-Registrar compliant Partition Deed format designed specifically for brothers
                and family members dividing multi-floor residential property or plots:
              </p>

              {/* Template Container Box */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-rose-300" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      REGISTERED PARTITION DEED FORMAT (ENGLISH)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyTemplateToClipboard}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors shadow-sm"
                    >
                      {copiedTemplate ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied Complete Deed!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Entire Template</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-5 sm:p-6 max-h-[600px] overflow-y-auto bg-slate-50/60 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 whitespace-pre-wrap select-all border-b border-slate-200">
                  {`DEED OF PARTITION BETWEEN FAMILY MEMBERS / BROTHERS
(Under Section 17 of the Registration Act, 1908 & Indian Stamp Act, 1899)

THIS DEED OF PARTITION is made and executed on this [Day] day of [Month], [Year], at [City/Sub-District], by and between:

1. [FIRST CO-SHARER NAME], son of Late [Father's Name], aged about [Age] years, residing at [Address], Aadhaar No: [XXXX-XXXX-XXXX], PAN: [ABCDE1234F], hereinafter referred to as the "PARTY OF THE FIRST PART".

2. [SECOND CO-SHARER NAME], son of Late [Father's Name], aged about [Age] years, residing at [Address], Aadhaar No: [XXXX-XXXX-XXXX], PAN: [ABCDE1234F], hereinafter referred to as the "PARTY OF THE SECOND PART".

3. [THIRD CO-SHARER / SISTER NAME], daughter of Late [Father's Name], aged about [Age] years, residing at [Address], Aadhaar No: [XXXX-XXXX-XXXX], PAN: [ABCDE1234F], hereinafter referred to as the "PARTY OF THE THIRD PART".

WHEREAS:
A. The Parties hereto are the absolute joint owners and coparceners of the immovable property consisting of land and multi-story building situated at [Full Property Address], fully detailed in SCHEDULE 'A' hereunder written.
B. The said Schedule Property originally belonged to the late [Parent's Name], who acquired ownership vide Registered Sale Deed dated [Date], bearing Document No. [Doc No.], registered in the Office of the Sub-Registrar at [SRO Location].
C. The said [Parent's Name] died intestate on [Date of Death], leaving behind the Parties herein as his sole legal heirs under Class I of the Hindu Succession Act, 1956.
D. Mutual disputes having arisen in the joint enjoyment of the Schedule Property, the Parties have agreed to partition the same by metes and bounds into separate independent floors and undivided shares of land (UDS).

NOW THIS DEED OF PARTITION WITNESSETH AS FOLLOWS:

1. SEVERANCE OF JOINT STATUS:
The Parties hereby declare that the joint family status and joint tenancy in respect of the Schedule Property stands completely severed and dissolved from the date hereof.

2. ALLOTMENT OF INDEPENDENT FLOORS:
(a) The Party of the First Part is allotted the entire GROUND FLOOR along with [XX]% Undivided Share of Land (UDS), detailed in SCHEDULE 'B'.
(b) The Party of the Second Part is allotted the entire FIRST FLOOR along with [XX]% Undivided Share of Land (UDS), detailed in SCHEDULE 'C'.
(c) The Party of the Third Part is allotted the entire SECOND FLOOR along with [XX]% Undivided Share of Land (UDS), detailed in SCHEDULE 'D'.

3. OWELTY (EQUALIZATION PAYMENT) CLAUSE:
Whereas the Ground Floor carries higher market valuation, the Party of the First Part pays an Owelty sum of Rs. [Amount]/- (Rupees [In Words] only) to the Party of the Third Part via Demand Draft No. [DD No.], receipt of which is acknowledged. Under Section 47(i) of the Income Tax Act, 1961, this payment constitutes a tax-free capital adjustment.

4. COMMON AMENITIES & EASEMENTS (SCHEDULE 'E'):
The entrance gate, driveway, common staircases, lift, overhead water tanks, borewell, and terrace access shall remain joint for all Parties.

SCHEDULE 'A' (ENTIRE PROPERTY): [Plot area, Survey No., North/South/East/West boundaries]
SCHEDULE 'B' (GROUND FLOOR ALLOTMENT): [Built-up area, Parking, XX% UDS]
SCHEDULE 'C' (FIRST FLOOR ALLOTMENT): [Built-up area, Balcony, XX% UDS]
SCHEDULE 'D' (SECOND FLOOR ALLOTMENT): [Built-up area, Terrace access, XX% UDS]
SCHEDULE 'E' (COMMON AREAS): [Staircase, lift, water pump, structural walls]

IN WITNESS WHEREOF the Parties have executed this Deed on the date first mentioned above.

PARTY OF THE FIRST PART: ___________________
PARTY OF THE SECOND PART: ___________________
PARTY OF THE THIRD PART: ___________________

WITNESSES:
1. ___________________________
2. ___________________________`}
                </div>
                <div className="p-4 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
                  <span>Draft compliant with Indian Registration Act, 1908 &amp; State Stamp Acts</span>
                  <button
                    onClick={copyTemplateToClipboard}
                    className="text-[#C65378] font-bold hover:underline"
                  >
                    Copy Clean Text
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 8: SRO REGISTRATION SOP */}
            <section id="sro-registration-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>PROCEDURAL STEP-BY-STEP PROTOCOL</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Sub-Registrar Office Execution &amp; Registration SOP
              </h2>
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Drafting & Architectural Demarcation",
                    desc: "Commission an architectural site plan detailing the physical dimensions and color-coded demarcations for each floor (Schedule A, B, C, D) signed by all co-sharers.",
                  },
                  {
                    step: 2,
                    title: "Purchase of Non-Judicial E-Stamp Paper",
                    desc: "Calculate the exact stamp duty on the separated shares under your state's Stamp Act and procure non-judicial e-stamp certificates from authorized SHCIL centers or state treasury portals.",
                  },
                  {
                    step: 3,
                    title: "Title & Municipal Verification",
                    desc: "Procure the parent sale deed, death certificate of the deceased ancestor, Surviving Member Certificate, up-to-date property tax receipts, and a 13-year Non-Encumbrance Certificate (EC).",
                  },
                  {
                    step: 4,
                    title: "SRO Online Appointment Booking",
                    desc: "Upload the draft deed and party KYC on the state registration portal (such as e-Sub Registrar Delhi, IGR Maharashtra, Kaveri Karnataka, or IGRS UP) and schedule an execution slot.",
                  },
                  {
                    step: 5,
                    title: "In-Person Appearance & Biometric Capture",
                    desc: "All co-sharers and two independent adult witnesses must appear physically before the Sub-Registrar with original Aadhaar cards, PAN cards, and passport photographs for biometric fingerprint scanning.",
                  },
                  {
                    step: 6,
                    title: "Collection of Registered Deed & Municipal Mutation",
                    desc: "Collect the registered deed with SRO endorsement seal. Proceed to file for independent Khata bifurcation and separate municipal property tax assessments before the Municipal Corporation / Tehsildar.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <div className="space-y-1">
                      <div className="font-extrabold text-slate-900 text-sm">{item.title}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checklist Copy Box */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-slate-900 text-xs">
                    Need the Complete SRO Registration Checklist?
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Includes all 10 statutory documents required for hassle-free Sub-Registrar endorsement.
                  </div>
                </div>
                <button
                  onClick={copyChecklistToClipboard}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-colors shrink-0"
                >
                  {copiedChecklist ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Checklist Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Checklist</span>
                    </>
                  )}
                </button>
              </div>
            </section>

            {/* SECTION 9: COPARCENARY RIGHTS */}
            <section id="coparcenary-rights" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LANDMARK PRECEDENTS &amp; DAUGHTER RIGHTS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Coparcenary Rights: Daughters, HUF &amp; Minors
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A critical legal risk that invalidates dozens of family partition deeds in civil court is the
                  unlawful exclusion of daughters or sisters.
                </p>
                <p>
                  In the landmark ruling <strong>Vineeta Sharma v. Rakesh Sharma (2020) 9 SCC 1</strong>, a three-judge
                  bench of the Supreme Court settled the law definitively: under Section 6 of the Hindu Succession
                  Act, daughters are coparceners by birth with the same rights and liabilities as sons. The court
                  ruled that this right is retroactive, meaning a daughter holds coparcenary rights regardless of
                  whether her father was alive on September 9, 2005 (the date the amendment came into force).
                </p>
                <p>
                  The Supreme Court further held that any oral family partition or unregistered memorandum executed
                  post-December 20, 2004 that excludes a daughter has no legal standing. Therefore:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700">
                  <li>
                    <strong>Daughters Must Be Parties:</strong> All surviving daughters (married or unmarried) must
                    be named parties and sign the registered Partition Deed.
                  </li>
                  <li>
                    <strong>Alternative Relinquishment Deed:</strong> If a sister does not desire a physical share in the
                    property, she must execute and register a separate <strong>Relinquishment Deed (Haq Tyag)</strong> or
                    Release Deed before the Partition Deed is registered. An informal NOC or affidavit is legally insufficient.
                  </li>
                  <li>
                    <strong>Minor Coparceners:</strong> If any co-sharer is a minor, the partition must be fair and
                    equitable. Under Section 8 of the Hindu Minority and Guardianship Act, 1956, any partition prejudicial
                    to a minor can be challenged within 3 years of attaining majority.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 10: REAL CASE STUDIES */}
            <section id="case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>PRACTICAL REAL-WORLD PRECEDENTS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Practical Case Studies: Delhi, Bengaluru &amp; Mumbai
              </h2>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE STUDY 1: GREATER KAILASH, NEW DELHI</span>
                    <span className="text-slate-500 font-semibold">Multi-Floor Residential House</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    Two Brothers Dividing a 3-Floor House with Terrace Rights
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Two brothers inherited a 300 sq. yd. plot with Ground, First, and Second floors in South Delhi.
                    Brother A took the Ground Floor (valuation ₹3.50 Cr) and Brother B took the First and Second
                    Floors (combined valuation ₹4.00 Cr). By executing a registered Partition Deed with Schedule A to E,
                    Brother B paid an Owelty of ₹25 Lakhs to Brother A. Both obtained separate SDMC water meters,
                    independent electricity meters, and bifurcated property tax IDs without litigation.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE STUDY 2: WHITEFIELD, BENGALURU</span>
                    <span className="text-slate-500 font-semibold">Ancestral Land Division</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    Overcoming Sister Exclusion Dispute via Relinquishment
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Three brothers in Bengaluru attempted to partition 2 acres of ancestral land among themselves,
                    excluding their two married sisters. A scheduled bank rejected their construction loan application
                    citing <em>Vineeta Sharma (2020)</em>. With AMA Legal Solutions, the family executed registered
                    Relinquishment Deeds for the sisters with fair monetary consideration, followed by a registered
                    Partition Deed under Article 39 of Karnataka Stamp Act, clearing the title for bank disbursement.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: STATUTORY CITATIONS & PROFILE */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LEGAL CITATIONS &amp; DESK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Statutory Citations &amp; Advocate Profile
              </h2>
              <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs">
                <div className="font-extrabold text-slate-900 text-sm">
                  Primary Governing Provisions of Indian Law:
                </div>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li>
                    <strong>Registration Act, 1908 s. 17(1)(b) &amp; s. 49:</strong> Mandatory registration of
                    instruments creating or extinguishing title to immovable property.
                  </li>
                  <li>
                    <strong>Indian Stamp Act, 1899 s. 2(15):</strong> Statutory definition of &ldquo;Instrument of
                    Partition&rdquo; and chargeable stamp duty principles.
                  </li>
                  <li>
                    <strong>Hindu Succession Act, 1956 s. 6 &amp; s. 8:</strong> Coparcenary rights of daughters by
                    birth and Class I legal heir intestate succession.
                  </li>
                  <li>
                    <strong>Income Tax Act, 1961 s. 47(i):</strong> Total exemption of property partition and Owelty
                    equalization payments from capital gains tax.
                  </li>
                  <li>
                    <strong>Supreme Court Precedent:</strong> <em>Vineeta Sharma v. Rakesh Sharma (2020)</em>,{" "}
                    <em>Kale v. Deputy Director of Consolidation (1976)</em>, and <em>T.S. Swaminatha Odayar (1957)</em>.
                  </li>
                </ul>

                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                  <Link
                    href="/tools/capital-gains-tax-calculator-inherited-property"
                    className="px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold"
                  >
                    Inherited Property Tax Calculator
                  </Link>
                  <Link
                    href="/services/family-settlement-deed-lawyer"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Family Settlement Deed Counsel
                  </Link>
                  <Link
                    href="/templates/family-settlement-agreement-format-india"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Family Settlement Agreement Template
                  </Link>
                  <Link
                    href="/templates/gift-deed-format-blood-relatives-india"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Gift Deed for Blood Relatives
                  </Link>
                  <Link
                    href="/templates/release-deed-format"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Haq Tyag Release Deed
                  </Link>
                  <Link
                    href="/services/will-registration"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Sub-Registrar Registration Desk
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: Partition Deeds
              </h2>
              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-slate-900 hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
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
                Specialist in Indian partition jurisprudence, coparcenary title scrutiny, Sub-Registrar
                conveyancing, and family property dispute settlements at AMA Legal Solutions.
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
                  <span>PREVENT FUTURE PARTITION DISPUTES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Children from Co-Heir Partition Lawsuits
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A clearly drafted, legally registered Will establishes precise ownership shares,
                  preventing protracted civil partition suits among your children.
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
                  <span>PARTITION LITIGATION &amp; SRO DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Dividing High-Value Ancestral Property or Multi-Floor House?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our senior succession counsels draft custom Schedule A to D deeds, calculate state stamp duties,
                  and ensure seamless SRO registration without family friction.
                </p>
                <Link
                  href="/services/family-settlement-deed-lawyer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Schedule Advocate Consultation</span>
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
                      <strong>Section 17 Precision:</strong> Fully compliant with Registration Act mandates.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Floor-Wise UDS:</strong> Prevents municipal mutation rejections.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Tax-Free Owelty:</strong> Compliant with Section 47(i) of the Income Tax Act.
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
          href="#partition-deed-template"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Deed Template</span>
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
