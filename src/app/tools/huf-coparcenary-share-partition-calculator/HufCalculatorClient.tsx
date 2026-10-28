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
  Printer,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
  Scale,
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
  Gavel,
  Calculator,
  Copy,
  CheckCheck,
  Sliders,
  Users,
  FileText,
  Layers,
  Heart,
  HeartHandshake,
  Home,
  PieChart,
} from "lucide-react";

interface CoparcenaryShare {
  label: string;
  relation: string;
  isBirthRight: boolean;
  stage1Fraction: string;
  stage1Percent: number;
  stage1Amount: number;
  stage2InheritedFraction: string;
  stage2InheritedPercent: number;
  stage2InheritedAmount: number;
  finalPercent: number;
  finalAmount: number;
  notes: string;
  color: string;
}

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. What is an HUF & Who is a Coparcener?" },
  { id: "interactive-calculator", label: "2. Interactive HUF Partition Calculator" },
  { id: "notional-partition-formula", label: "3. Section 6 Notional Partition Formula" },
  { id: "daughter-rights-ruling", label: "4. Daughter Rights: Vineeta Sharma Precedent" },
  { id: "section-30-wills", label: "5. Section 30 Wills: Bequeathing HUF Shares" },
  { id: "comparison-table-regimes", label: "6. HUF Ancestral vs Self-Acquired Property" },
  { id: "visual-flowchart-section", label: "7. Step-by-Step HUF Partition Blueprint" },
  { id: "family-partition-deeds", label: "8. Registered Partition Deeds & Agreements" },
  { id: "practical-case-studies", label: "9. Practical Case Studies: Delhi & Jaipur" },
  { id: "legal-clause-templates", label: "10. Copy-Paste Section 30 Will Clause" },
  { id: "institutional-profile", label: "11. Institutional Profile: Legal Excellence" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
  { id: "statutory-citations", label: "13. Statutory Citations & Official Portals" },
];

const FAQS = [
  {
    q: "What is an HUF and who qualifies as a coparcener in India?",
    a: "A Hindu Undivided Family (HUF) consists of all persons lineally descended from a common male ancestor, together with their wives and unmarried or married daughters. A coparcener is a narrower subgroup within the HUF who acquires an immediate, undivided joint ownership interest in the ancestral estate by birth. Under classical Mitakshara Hindu law, only coparceners have the legal standing to demand partition.",
  },
  {
    q: "How does Notional Partition under Section 6 of the Hindu Succession Act work?",
    a: "Under Section 6(3) of the Hindu Succession Act, 1956, when a Hindu coparcener dies, the law creates a legal fiction called a notional partition. The property is treated as if a partition had taken place immediately before their death. Each living coparcener is allotted an equal 1/N fraction. The deceased Karta's 1/N share is separated from the joint family pool and distributed via Will or intestate succession.",
  },
  {
    q: "What are a daughter's coparcenary rights after Vineeta Sharma (2020)?",
    a: "In Vineeta Sharma v. Rakesh Sharma (2020) 9 SCC 1, a 3-judge bench of the Supreme Court held that daughters have coparcenary rights by birth in the same manner as sons. The court clarified that the father does not need to have been alive on September 9, 2005. The right is retroactive from birth, provided no registered partition or court decree was finalized before December 20, 2004.",
  },
  {
    q: "Can a Karta or coparcener dispose of HUF property in a Will?",
    a: "Yes, but only for their undivided coparcenary share! Under Section 30 of the Hindu Succession Act, 1956, any Hindu coparcener has the statutory right to bequeath their separated notional coparcenary share by executing a valid Will. However, a Karta cannot make a Will disposing of the entire HUF property or other coparceners' birth shares.",
  },
  {
    q: "What share does a Hindu widow get upon the Karta's death?",
    a: "A Hindu widow is an HUF member entitled to maintenance and residence, but she is not a coparcener by birth under Section 6. In Stage 1 notional partition, she gets 0%. In Stage 2, if the Karta dies without a Will (intestate), she inherits an equal share of his 1/N portion alongside other Class I heirs. If the Karta executes a Section 30 Will, he can bequeath up to 100% of his 1/N share directly to his wife.",
  },
  {
    q: "What happens if a Karta dies without leaving a Will (Intestate)?",
    a: "If the Karta dies intestate, their notional coparcenary share does not remain joint HUF property. Under Section 6(3) and Section 8, that 1/N portion is divided equally among all surviving Class I legal heirs: widow, surviving mother, sons, and daughters. This fragments ownership and often leaves the widow with a tiny fraction (e.g. 1/12 or 1/16).",
  },
  {
    q: "Can a married daughter demand a partition of HUF ancestral property?",
    a: "Yes. Post the 2005 Amendment and the Supreme Court decision in Vineeta Sharma, a daughter remains a permanent coparcener of her father's HUF throughout her life, even after marriage. She possesses full legal authority to file a civil partition suit and claim her independent share in ancestral property, exactly like a son.",
  },
  {
    q: "Who becomes the new Karta after the death of the father?",
    a: "By Hindu legal custom and high court precedent (Sujata Sharma v. Manu Gupta, 2016 Delhi High Court), the eldest surviving coparcener becomes the new Karta. This includes the eldest daughter if she is senior in age. If all surviving coparceners are minors, the surviving mother can act as the manager or guardian of the HUF.",
  },
  {
    q: "How does HUF ancestral property differ from self-acquired property in a Will?",
    a: "Self-acquired property is owned individually, and the owner can bequeath 100% of it to anyone in a Will without family consent. In contrast, HUF ancestral property is jointly owned by all coparceners from birth. In HUF property, a person can only bequeath their own undivided fractional share under Section 30.",
  },
  {
    q: "How can a family legally partition an HUF without court litigation?",
    a: "Family members can execute a Registered Partition Deed with the Sub-Registrar of Assurances, paying the applicable state stamp duty. Alternatively, they can execute a written Family Settlement Agreement recording a prior oral partition. An amicable registered agreement avoids decades of expensive civil court partition suits.",
  },
];

export default function HufCalculatorClient() {
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

  // Calculator Form State
  const [estateValue, setEstateValue] = useState<number>(10000000); // Default ₹1 Crore
  const [numSons, setNumSons] = useState<number>(1);
  const [numDaughters, setNumDaughters] = useState<number>(1);
  const [hasSurvivingWidow, setHasSurvivingWidow] = useState<boolean>(true);
  const [hasSurvivingMother, setHasSurvivingMother] = useState<boolean>(false);
  const [predeceasedBranches, setPredeceasedBranches] = useState<number>(0);

  // Stage 2 Choice: "will" vs "intestacy"
  const [stage2Mode, setStage2Mode] = useState<"will" | "intestacy">("will");
  const [willWidowPercent, setWillWidowPercent] = useState<number>(100); // 100% of Karta share to widow

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

  const handleResetCalculator = () => {
    setEstateValue(10000000);
    setNumSons(1);
    setNumDaughters(1);
    setHasSurvivingWidow(true);
    setHasSurvivingMother(false);
    setPredeceasedBranches(0);
    setStage2Mode("will");
    setWillWidowPercent(100);
  };

  // Indian Rupee Formatter
  const formatINR = (val: number): string => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return `₹${Math.round(val).toLocaleString("en-IN")}`;
  };

  const formatExactINR = (val: number): string => {
    return `₹${Math.round(val).toLocaleString("en-IN")}`;
  };

  // =============================================================
  // MATHEMATICAL TAX & PARTITION COMPUTATION ENGINE
  // =============================================================

  // Stage 1: Total Coparceners = 1 (Karta) + Sons + Daughters + Predeceased Branches
  const totalCoparceners = 1 + numSons + numDaughters + predeceasedBranches;
  const stage1PerCoparcenerPercent = 100 / totalCoparceners;
  const stage1PerCoparcenerAmount = estateValue / totalCoparceners;

  // Karta's carved-out share to be devolved in Stage 2
  const kartaShareAmount = stage1PerCoparcenerAmount;
  const kartaSharePercent = stage1PerCoparcenerPercent;

  // Total Class I Heirs for Intestate succession under Section 8:
  // Widow + Mother + Sons + Daughters + Predeceased branches
  const classIHeirCount =
    (hasSurvivingWidow ? 1 : 0) +
    (hasSurvivingMother ? 1 : 0) +
    numSons +
    numDaughters +
    predeceasedBranches;

  const intestatePerHeirFromKartaAmount =
    classIHeirCount > 0 ? kartaShareAmount / classIHeirCount : 0;
  const intestatePerHeirFromKartaPercent =
    classIHeirCount > 0 ? kartaSharePercent / classIHeirCount : 0;

  // Will Calculations:
  // Widow receives willWidowPercent% of Karta's share
  const willWidowAmount = kartaShareAmount * (willWidowPercent / 100);
  const willWidowSharePercent = kartaSharePercent * (willWidowPercent / 100);

  // Remaining Karta share divided among children
  const remainingWillPercent = 100 - willWidowPercent;
  const totalChildrenCount = numSons + numDaughters + predeceasedBranches;
  const willPerChildFromKartaPercent =
    totalChildrenCount > 0
      ? (kartaSharePercent * (remainingWillPercent / 100)) / totalChildrenCount
      : 0;
  const willPerChildFromKartaAmount =
    totalChildrenCount > 0
      ? (kartaShareAmount * (remainingWillPercent / 100)) / totalChildrenCount
      : 0;

  // Final Entitlements by Member
  const sharesBreakdown: CoparcenaryShare[] = [];

  // 1. Surviving Widow
  if (hasSurvivingWidow) {
    const inheritedPercent =
      stage2Mode === "will" ? willWidowSharePercent : intestatePerHeirFromKartaPercent;
    const inheritedAmount =
      stage2Mode === "will" ? willWidowAmount : intestatePerHeirFromKartaAmount;

    sharesBreakdown.push({
      label: "Surviving Widow (Wife)",
      relation: "Spouse of Deceased Karta",
      isBirthRight: false,
      stage1Fraction: "0 (HUF Member)",
      stage1Percent: 0,
      stage1Amount: 0,
      stage2InheritedFraction:
        stage2Mode === "will"
          ? `${willWidowPercent}% of Karta's 1/${totalCoparceners}`
          : `1/${classIHeirCount} of Karta's 1/${totalCoparceners}`,
      stage2InheritedPercent: inheritedPercent,
      stage2InheritedAmount: inheritedAmount,
      finalPercent: inheritedPercent,
      finalAmount: inheritedAmount,
      notes:
        stage2Mode === "will"
          ? "Protected under Section 30 Will bequest. Receives full financial autonomy."
          : "Receives only 1 Class I heir share. Severe risk of family dilution without a Will.",
      color: stage2Mode === "will" ? "rose" : "amber",
    });
  }

  // 2. Surviving Mother of Karta (Class I Heir if alive)
  if (hasSurvivingMother) {
    const inheritedPercent = stage2Mode === "will" ? 0 : intestatePerHeirFromKartaPercent;
    const inheritedAmount = stage2Mode === "will" ? 0 : intestatePerHeirFromKartaAmount;

    sharesBreakdown.push({
      label: "Mother of Karta",
      relation: "Class I Legal Heir",
      isBirthRight: false,
      stage1Fraction: "0 (HUF Member)",
      stage1Percent: 0,
      stage1Amount: 0,
      stage2InheritedFraction:
        stage2Mode === "will" ? "0% (Unless in Will)" : `1/${classIHeirCount} of Karta's share`,
      stage2InheritedPercent: inheritedPercent,
      stage2InheritedAmount: inheritedAmount,
      finalPercent: inheritedPercent,
      finalAmount: inheritedAmount,
      notes: "Mother is a Class I legal heir of the deceased Karta under Hindu Succession Act.",
      color: "slate",
    });
  }

  // 3. Each Son
  for (let i = 1; i <= numSons; i++) {
    const inheritedPercent =
      stage2Mode === "will" ? willPerChildFromKartaPercent : intestatePerHeirFromKartaPercent;
    const inheritedAmount =
      stage2Mode === "will" ? willPerChildFromKartaAmount : intestatePerHeirFromKartaAmount;
    const finalPct = stage1PerCoparcenerPercent + inheritedPercent;
    const finalAmt = stage1PerCoparcenerAmount + inheritedAmount;

    sharesBreakdown.push({
      label: `Son ${numSons > 1 ? `#${i}` : ""}`,
      relation: "Birth Coparcener",
      isBirthRight: true,
      stage1Fraction: `1/${totalCoparceners}`,
      stage1Percent: stage1PerCoparcenerPercent,
      stage1Amount: stage1PerCoparcenerAmount,
      stage2InheritedFraction:
        stage2Mode === "will"
          ? remainingWillPercent > 0
            ? "Split remainder"
            : "0 (Willed to Mother)"
          : `1/${classIHeirCount} from Karta`,
      stage2InheritedPercent: inheritedPercent,
      stage2InheritedAmount: inheritedAmount,
      finalPercent: finalPct,
      finalAmount: finalAmt,
      notes: "Holds birthright coparcenary share plus inherited interest from father.",
      color: "blue",
    });
  }

  // 4. Each Daughter
  for (let i = 1; i <= numDaughters; i++) {
    const inheritedPercent =
      stage2Mode === "will" ? willPerChildFromKartaPercent : intestatePerHeirFromKartaPercent;
    const inheritedAmount =
      stage2Mode === "will" ? willPerChildFromKartaAmount : intestatePerHeirFromKartaAmount;
    const finalPct = stage1PerCoparcenerPercent + inheritedPercent;
    const finalAmt = stage1PerCoparcenerAmount + inheritedAmount;

    sharesBreakdown.push({
      label: `Daughter ${numDaughters > 1 ? `#${i}` : ""}`,
      relation: "Birth Coparcener (Vineeta Sharma 2020)",
      isBirthRight: true,
      stage1Fraction: `1/${totalCoparceners}`,
      stage1Percent: stage1PerCoparcenerPercent,
      stage1Amount: stage1PerCoparcenerAmount,
      stage2InheritedFraction:
        stage2Mode === "will"
          ? remainingWillPercent > 0
            ? "Split remainder"
            : "0 (Willed to Mother)"
          : `1/${classIHeirCount} from Karta`,
      stage2InheritedPercent: inheritedPercent,
      stage2InheritedAmount: inheritedAmount,
      finalPercent: finalPct,
      finalAmount: finalAmt,
      notes: "Equal coparcener by birth under Section 6(1) and Vineeta Sharma ruling.",
      color: "rose",
    });
  }

  // 5. Predeceased Branches
  if (predeceasedBranches > 0) {
    for (let i = 1; i <= predeceasedBranches; i++) {
      const inheritedPercent =
        stage2Mode === "will" ? willPerChildFromKartaPercent : intestatePerHeirFromKartaPercent;
      const inheritedAmount =
        stage2Mode === "will" ? willPerChildFromKartaAmount : intestatePerHeirFromKartaAmount;
      const finalPct = stage1PerCoparcenerPercent + inheritedPercent;
      const finalAmt = stage1PerCoparcenerAmount + inheritedAmount;

      sharesBreakdown.push({
        label: `Predeceased Child Branch #${i}`,
        relation: "Representation under Sec 6(3) Proviso",
        isBirthRight: true,
        stage1Fraction: `1/${totalCoparceners}`,
        stage1Percent: stage1PerCoparcenerPercent,
        stage1Amount: stage1PerCoparcenerAmount,
        stage2InheritedFraction:
          stage2Mode === "will" ? "Per Will Terms" : `1/${classIHeirCount} from Karta`,
        stage2InheritedPercent: inheritedPercent,
        stage2InheritedAmount: inheritedAmount,
        finalPercent: finalPct,
        finalAmount: finalAmt,
        notes: "Surviving children take by representation the share their parent would have taken.",
        color: "purple",
      });
    }
  }

  // Key conversion metric: Widow Protection Gap
  const widowIntestateAmount = hasSurvivingWidow ? intestatePerHeirFromKartaAmount : 0;
  const widowWillAmount = hasSurvivingWidow ? willWidowAmount : 0;
  const widowProtectionDifference = widowWillAmount - widowIntestateAmount;

  const copyClauseToClipboard = () => {
    const clauseText = `TESTAMENTARY DISPOSITION OF UNDIVIDED COPARCENARY SHARE UNDER SECTION 30 OF THE HINDU SUCCESSION ACT, 1956:

"WHEREAS I, the Testator herein, am a coparcener and Karta in the Hindu Undivided Family (HUF) known and styled as [Insert HUF Name, e.g., 'Shri Rajesh Sharma HUF'], holding an undivided coparcenary interest and share in the ancestral movable and immovable properties of the said family;

AND WHEREAS under Section 30 of the Hindu Succession Act, 1956, I am fully competent and statutorily empowered to dispose of my undivided interest in the Mitakshara coparcenary property by testamentary disposition;

NOW THIS WILL WITNESSETH that upon my demise, my undivided notional coparcenary share in all the ancestral properties of the aforesaid HUF (as determined upon a notional partition under Section 6 of the Hindu Succession Act, 1956 immediately prior to my death) shall devolve upon, vest in, and belong absolutely and forever to my wife, Smt. [Insert Wife's Full Name], for her sole use, maintenance, enjoyment, and absolute ownership without any claim, objection, or obstruction by any other legal heir or coparcener."`;

    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `HUF COPARCENARY PARTITION & WILL DRAFTING CHECKLIST:
1. HUF PAN Card copy and HUF Bank/Demat Account Statements.
2. Complete Genealogical Family Tree (Pedigree Chart) with dates of birth of all coparceners.
3. Original Title Deeds / Conveyance Deeds / Mutation Extracts of ancestral immovable properties.
4. Birth Certificates and Marriage Certificates of Daughters (confirming coparcenary birthright under Vineeta Sharma 2020).
5. Section 30 Testamentary Will Draft specifying bequest of undivided coparcenary interest.
6. Details of prior oral family settlements or memorandum of family arrangements (if any).
7. Non-Encumbrance Certificates (NEC) for all ancestral properties to be partitioned.`;

    navigator.clipboard.writeText(checklistText);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy - Matching Tool Theme)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients (Rose & Midnight Navy) */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#C65378]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>HINDU SUCCESSION ACT, 1956 • SECTIONS 6, 8 &amp; 30</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            HUF Coparcenary Property Share &amp; Partition Calculator
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Calculate ancestral property shares among sons, daughters, widows, and Karta under
            Section 6 notional partition. See how the Karta&apos;s share devolves by a Section 30
            Will versus intestate succession.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate HUF Partition Shares</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft a Section 30 Will</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Full-Width Trust Signals - Brand Palette)
          ========================================================================= */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-rose-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 6(1)</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                EQUAL SHARE FOR DAUGHTERS (2020)
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 30</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                TESTAMENTARY WILL BEQUEST RIGHT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">15,000+</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ESTATES ASSESSED PAN-INDIA
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">4.9 / 5.0</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ADVOCATE BENCH RATING
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
                <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                <span>Statutory Authority</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Sections 6, 8, 14 &amp; 30 of the Hindu Succession Act, 1956, read
                with Hindu Succession (Amendment) Act, 2005 and landmark precedents Vineeta Sharma
                v. Rakesh Sharma (2020) and Gurupad Khandappa Magdum v. Hirabai (1978).
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
                <span>EXECUTIVE BRIEF: HUF PARTITION &amp; COPARCENARY RULES</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <span>
                    <strong>Daughters are Equal Coparceners by Birth:</strong> Following the landmark
                    Supreme Court judgment in <em>Vineeta Sharma (2020)</em>, daughters hold identical
                    coparcenary rights to sons by birth, regardless of when they were born.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 6(3) Notional Partition Fiction:</strong> Upon the death of a
                    coparcener, the law presumes a partition occurred immediately prior to death. Each
                    coparcener gets 1/N share. The surviving widow receives 0% in this stage.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 30 Testamentary Bequest Right:</strong> A coparcener can bequeath
                    their undivided 1/N share in a Will. Bequeathing this share to the surviving
                    widow protects her financial autonomy and prevents family eviction.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <span>
                    <strong>Intestate Dilution Hazard:</strong> If no Will exists, the Karta&apos;s
                    share is divided equally among all Class I heirs under Section 8, diluting the
                    widow to a tiny fraction (e.g. 1/12 or 1/16) and sparking partition disputes.
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
                1. Statutory Rules: HUF Ancestral Property in India
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In Hindu jurisprudence, a Hindu Undivided Family (HUF) is an organic family entity
                  descended from a common ancestor. While all family members belong to the HUF, not
                  all members are <strong>coparceners</strong>.
                </p>
                <p>
                  A coparcener is a specific member who acquires a vested joint ownership interest in
                  the ancestral estate immediately upon birth. Under the Mitakshara school of Hindu
                  law, only coparceners have the right to demand a partition of family assets.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                  <h4 className="text-sm font-extrabold text-slate-900 mb-2 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-blue-600" />
                    <span>Who is a Coparcener?</span>
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
                    <li>Sons and daughters born into the joint family.</li>
                    <li>Possess joint ownership and right to partition by birth.</li>
                    <li>Can become Karta of the family (Sujata Sharma ruling).</li>
                    <li>Can bequeath their undivided share by Will under Section 30.</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                  <h4 className="text-sm font-extrabold text-slate-900 mb-2 flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4 text-amber-600" />
                    <span>Who is an HUF Member (Non-Coparcener)?</span>
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
                    <li>Spouses who join the family through marriage (wives and widows).</li>
                    <li>Entitled to maintenance, residence, and support from HUF income.</li>
                    <li>Cannot demand a physical partition on their own initiative.</li>
                    <li>Inherit under Section 8 intestacy if no Will is executed.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE PARTITION CALCULATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive HUF Coparcenary &amp; Partition Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Enter your ancestral estate valuation and family coparcenary composition below to
                compute statutory Stage 1 notional partition shares and compare Section 30 Will
                bequest versus intestate succession.
              </p>

              {/* Calculator Panel Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Top Controls: Family Coparcenary Setup */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
                  {/* Living Sons */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-blue-600" />
                        <span>Living Sons (Coparceners)</span>
                      </span>
                      <span className="text-blue-700 font-black">{numSons} Sons</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {[0, 1, 2, 3, 4].map((count) => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setNumSons(count)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            numSons === count
                              ? "bg-slate-900 text-white shadow-xs"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-500">Birthright coparcener under Mitakshara law.</p>
                  </div>

                  {/* Living Daughters */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 text-[#C65378]" />
                        <span>Living Daughters (Coparceners)</span>
                      </span>
                      <span className="text-[#C65378] font-black">{numDaughters} Daughters</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {[0, 1, 2, 3, 4].map((count) => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setNumDaughters(count)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            numDaughters === count
                              ? "bg-rose-50 text-[#C65378] border border-rose-300 ring-2 ring-rose-200"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-[#C65378] font-semibold">
                      Equal coparcener by birth (Vineeta Sharma 2020).
                    </p>
                  </div>

                  {/* Predeceased Branches */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-purple-600" />
                        <span>Predeceased Child Branches</span>
                      </span>
                      <span className="text-purple-700 font-black">{predeceasedBranches}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {[0, 1, 2, 3].map((count) => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setPredeceasedBranches(count)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            predeceasedBranches === count
                              ? "bg-purple-900 text-white shadow-xs"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-500">Representation under Section 6(3) proviso.</p>
                  </div>
                </div>

                {/* Additional Heirs Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60">
                    <div>
                      <div className="text-xs font-extrabold text-slate-900">Surviving Widow (Wife of Karta)</div>
                      <div className="text-[11px] text-slate-500">HUF member entitled to maintenance and residence</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setHasSurvivingWidow(!hasSurvivingWidow)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        hasSurvivingWidow
                          ? "bg-[#172228] text-white shadow-xs"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {hasSurvivingWidow ? "Yes (Surviving)" : "No"}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60">
                    <div>
                      <div className="text-xs font-extrabold text-slate-900">Surviving Mother of Karta</div>
                      <div className="text-[11px] text-slate-500">Class I legal heir under Section 8 of HSA</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setHasSurvivingMother(!hasSurvivingMother)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        hasSurvivingMother
                          ? "bg-[#172228] text-white shadow-xs"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {hasSurvivingMother ? "Yes (Surviving)" : "No"}
                    </button>
                  </div>
                </div>

                {/* Estate Valuation Slider & Quick Presets */}
                <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Home className="w-4 h-4 text-[#C65378]" />
                      <span>Total Estimated HUF Ancestral Estate Valuation</span>
                    </label>
                    <div className="text-lg sm:text-xl font-black text-[#C65378]">
                      {formatINR(estateValue)}{" "}
                      <span className="text-xs font-normal text-slate-500">
                        ({formatExactINR(estateValue)})
                      </span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={500000}
                    max={200000000}
                    step={500000}
                    value={estateValue}
                    onChange={(e) => setEstateValue(Number(e.target.value))}
                    className="w-full accent-[#C65378] cursor-pointer"
                  />

                  {/* Preset Buttons */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      { label: "₹50 Lakh", val: 5000000 },
                      { label: "₹1 Crore", val: 10000000 },
                      { label: "₹2.5 Crore", val: 25000000 },
                      { label: "₹5 Crore", val: 50000000 },
                      { label: "₹10 Crore", val: 100000000 },
                    ].map((preset) => (
                      <button
                        key={preset.val}
                        type="button"
                        onClick={() => setEstateValue(preset.val)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          estateValue === preset.val
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-white text-slate-700 border border-slate-200 hover:border-[#C65378]"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* STAGE 1 SUMMARY STRIP */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-blue-950">
                  <div className="flex items-center gap-2 font-extrabold">
                    <Scale className="w-4 h-4 text-blue-700" />
                    <span>Stage 1 Notional Partition Total:</span>
                    <span className="bg-white px-2 py-0.5 rounded-md border border-blue-200">
                      {totalCoparceners} Coparceners (1/{totalCoparceners} each)
                    </span>
                  </div>
                  <div className="font-bold">
                    Each Coparcener Receives:{" "}
                    <span className="text-[#C65378] font-black">
                      {stage1PerCoparcenerPercent.toFixed(2)}% ({formatINR(stage1PerCoparcenerAmount)})
                    </span>
                  </div>
                </div>

                {/* STAGE 2 DEVOLUTION CONTROLS (WILL VS INTESTACY) */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-[#C65378]" />
                        <span>Stage 2: How Does the Karta&apos;s 1/{totalCoparceners} Share Devolve?</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Choose between testamentary disposition by Will under Section 30 or intestate succession under Section 8.
                      </p>
                    </div>
                  </div>

                  {/* Mode Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setStage2Mode("will")}
                      className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                        stage2Mode === "will"
                          ? "border-[#C65378] bg-rose-50/80 ring-2 ring-rose-200"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between pb-1">
                        <span className="font-black text-sm text-rose-950">
                          Option A: Valid Will (Section 30 HSA)
                        </span>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#C65378] text-white">
                          RECOMMENDED
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Karta exercises his statutory right to bequeath up to 100% of his undivided share to his spouse.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStage2Mode("intestacy")}
                      className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                        stage2Mode === "intestacy"
                          ? "border-slate-800 bg-slate-100 ring-2 ring-slate-300"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between pb-1">
                        <span className="font-black text-sm text-slate-900">
                          Option B: No Will (Section 8 HSA)
                        </span>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-800 text-white">
                          HIGH DISPUTE RISK
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Karta&apos;s share splits equally among all {classIHeirCount} Class I heirs, heavily diluting the widow.
                      </p>
                    </button>
                  </div>

                  {/* Widow Percentage Slider under Will */}
                  {stage2Mode === "will" && hasSurvivingWidow && (
                    <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                        <span>Percentage of Karta&apos;s Share Bequeathed to Widow:</span>
                        <span className="text-[#C65378] font-extrabold text-sm">
                          {willWidowPercent}% ({formatINR(willWidowAmount)})
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={10}
                        value={willWidowPercent}
                        onChange={(e) => setWillWidowPercent(Number(e.target.value))}
                        className="w-full accent-[#C65378] cursor-pointer"
                      />
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span>0% (Split to children)</span>
                        <span>50% (Joint bequest)</span>
                        <span>100% (Full widow security - Recommended)</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Reset & Quick Print Action Strip */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={handleResetCalculator}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Default Values</span>
                  </button>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Calculation Report</span>
                  </button>
                </div>

                {/* =========================================================================
                    REAL-TIME STATUTORY COMPARISON RESULTS MATRIX
                    ========================================================================= */}
                <div className="space-y-6 pt-4">
                  {/* WINNER RECOMMENDATION CALLOUT CARD */}
                  <div
                    className={`rounded-3xl border-2 p-6 transition-all shadow-md ${
                      stage2Mode === "will"
                        ? "bg-rose-50/70 border-rose-300 text-rose-950"
                        : "bg-slate-100 border-slate-300 text-slate-900"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-current/15">
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/90 border border-current/20 shadow-2xs">
                          <Award className="w-3.5 h-3.5 text-[#C65378]" />
                          <span>
                            {stage2Mode === "will"
                              ? "SECTION 30 TESTAMENTARY PROTECTION WINNER"
                              : "INTESTATE SUCCESSION WARNING"}
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                          {stage2Mode === "will"
                            ? "Optimal Choice: Valid Will under Section 30 HSA"
                            : "High Risk: Property Fragments under Section 8 HSA"}
                        </h3>
                      </div>
                      <div className="text-left md:text-right">
                        <div className="text-xs uppercase font-bold opacity-75">Widow Security Delta</div>
                        <div className="text-xl sm:text-2xl font-black text-[#C65378]">
                          {hasSurvivingWidow && widowProtectionDifference > 0
                            ? `+${formatINR(widowProtectionDifference)} More Security!`
                            : "No Will Created"}
                        </div>
                      </div>
                    </div>

                    <p className="pt-3 text-xs sm:text-sm leading-relaxed opacity-90">
                      {stage2Mode === "will" ? (
                        <>
                          Under <strong>Section 30 of the Hindu Succession Act</strong>, the Karta can bequeath his
                          full 1/{totalCoparceners} undivided share ({stage1PerCoparcenerPercent.toFixed(1)}% ={" "}
                          {formatINR(kartaShareAmount)}) directly to his surviving spouse. This guarantees she holds{" "}
                          <strong>{formatINR(willWidowAmount)}</strong> of ownership in the ancestral home, ensuring
                          dignity and absolute protection from partition suits.
                        </>
                      ) : (
                        <>
                          Because no Will was executed, the Karta&apos;s share splits equally among all{" "}
                          <strong>{classIHeirCount} Class I heirs</strong>. The widow receives only a minority fraction
                          of {intestatePerHeirFromKartaPercent.toFixed(2)}% ({formatINR(intestatePerHeirFromKartaAmount)}),
                          leaving her vulnerable to being outvoted or evicted by relatives.
                        </>
                      )}
                    </p>
                  </div>

                  {/* SIDE-BY-SIDE TWO REGIMES BREAKDOWN TABLE */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Option A: Will under Section 30 */}
                    <div
                      className={`rounded-2xl border p-5 space-y-4 ${
                        stage2Mode === "will"
                          ? "bg-white border-rose-400 ring-2 ring-rose-100 shadow-sm"
                          : "bg-white/80 border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                            OPTION A (TESTAMENTARY WILL)
                          </div>
                          <div className="font-extrabold text-base text-slate-900">
                            Section 30 Will Bequest
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-rose-100 text-[#C65378]">
                          RECOMMENDED
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span className="text-slate-600">Total Estate Value</span>
                          <span className="font-semibold text-slate-900">{formatINR(estateValue)}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span className="text-slate-600">Karta&apos;s Stage 1 Share (1/{totalCoparceners})</span>
                          <span className="font-semibold text-slate-900">{formatINR(kartaShareAmount)}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-50 text-[#C65378] font-bold">
                          <span>Widow Inherited Share ({willWidowPercent}%)</span>
                          <span>{formatINR(willWidowAmount)}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span className="text-slate-600">Each Child Inherited Extra</span>
                          <span className="font-semibold text-slate-900">{formatINR(willPerChildFromKartaAmount)}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100 font-extrabold text-[#C65378]">
                          <span>Widow Total Entitlement</span>
                          <span>{willWidowSharePercent.toFixed(2)}% ({formatINR(willWidowAmount)})</span>
                        </div>
                      </div>
                    </div>

                    {/* Option B: Intestacy under Section 8 */}
                    <div
                      className={`rounded-2xl border p-5 space-y-4 ${
                        stage2Mode === "intestacy"
                          ? "bg-white border-slate-400 ring-2 ring-slate-100 shadow-sm"
                          : "bg-white/80 border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                            OPTION B (NO WILL / INTESTATE)
                          </div>
                          <div className="font-extrabold text-base text-slate-900">
                            Section 8 Intestate Fragmentation
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-slate-200 text-slate-800">
                          HIGH RISK
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span className="text-slate-600">Total Class I Heirs</span>
                          <span className="font-semibold text-slate-900">{classIHeirCount} Heirs</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span className="text-slate-600">Karta&apos;s Share Split</span>
                          <span className="font-semibold text-slate-900">Equal 1/{classIHeirCount} Each</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-50 text-slate-900 font-bold">
                          <span>Widow Inherited Share Only</span>
                          <span>{formatINR(intestatePerHeirFromKartaAmount)}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span className="text-slate-600">Each Child Extra Added</span>
                          <span className="font-semibold text-slate-900">{formatINR(intestatePerHeirFromKartaAmount)}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-100 font-extrabold text-slate-900">
                          <span>Widow Total Entitlement</span>
                          <span>{intestatePerHeirFromKartaPercent.toFixed(2)}% ({formatINR(intestatePerHeirFromKartaAmount)})</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DETAILED PER HEIR FINAL BREAKDOWN TABLE */}
                  <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                    <div className="bg-[#172228] text-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <PieChart className="w-4 h-4 text-[#C65378]" />
                        <span className="text-xs sm:text-sm font-bold tracking-wide">
                          Comprehensive Member-Wise Share Allotment
                        </span>
                      </div>
                      <span className="text-[11px] text-white/80 font-medium">
                        Active Mode: {stage2Mode === "will" ? "Testamentary (Section 30 Will)" : "Intestate (Section 8 HSA)"}
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                          <tr>
                            <th className="py-3 px-3 sm:px-4">Family Member</th>
                            <th className="py-3 px-2 sm:px-3 text-center">Stage 1 Coparcenary</th>
                            <th className="py-3 px-2 sm:px-3 text-center">Stage 2 Inherited</th>
                            <th className="py-3 px-3 sm:px-4 text-right">Total Final Share</th>
                            <th className="py-3 px-3 sm:px-4 text-right">Value (INR)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {sharesBreakdown.map((share, idx) => (
                            <tr
                              key={idx}
                              className={`hover:bg-slate-50 transition-colors ${
                                share.label.includes("Widow")
                                  ? stage2Mode === "will"
                                    ? "bg-rose-50/50"
                                    : "bg-slate-100/50"
                                  : ""
                              }`}
                            >
                              <td className="py-3.5 px-3 sm:px-4">
                                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                  <span>{share.label}</span>
                                  {share.isBirthRight && (
                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                                      Birthright
                                    </span>
                                  )}
                                </div>
                                <div className="text-[10px] text-slate-500">{share.relation}</div>
                              </td>
                              <td className="py-3.5 px-2 sm:px-3 text-center text-slate-600">
                                {share.stage1Percent > 0 ? (
                                  <span className="font-bold text-slate-900">
                                    {share.stage1Fraction} ({share.stage1Percent.toFixed(1)}%)
                                  </span>
                                ) : (
                                  <span className="text-amber-800 font-bold">0%</span>
                                )}
                              </td>
                              <td className="py-3.5 px-2 sm:px-3 text-center text-slate-600">
                                {share.stage2InheritedPercent > 0 ? (
                                  <span className="font-bold text-[#C65378]">
                                    +{share.stage2InheritedPercent.toFixed(2)}%
                                  </span>
                                ) : (
                                  <span className="text-slate-400">0%</span>
                                )}
                              </td>
                              <td className="py-3.5 px-3 sm:px-4 text-right font-extrabold text-slate-900 text-sm">
                                {share.finalPercent.toFixed(2)}%
                              </td>
                              <td className="py-3.5 px-3 sm:px-4 text-right font-extrabold text-[#C65378] text-sm">
                                {formatINR(share.finalAmount)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: NOTIONAL PARTITION FORMULA */}
            <section id="notional-partition-formula" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>STATUTORY MECHANISM</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Section 6 Notional Partition: The 2-Stage Formula
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When an HUF coparcener passes away, the law does not immediately dissolve the family.
                  Instead, Section 6(3) of the Hindu Succession Act mandates a two-stage devolution process
                  established in <em>Gurupad Khandappa Magdum v. Hirabai</em> (1978 SC).
                </p>
                <p>
                  In Stage 1, a deemed notional partition is carved out among all living coparceners. In
                  Stage 2, the deceased&apos;s carved-out share devolves either through a valid Section 30
                  Will or via Section 8 intestate succession among all Class I heirs.
                </p>
              </div>

              {/* Contextual Link to interactive tool */}
              <div className="p-4 bg-rose-50/70 border border-rose-200/80 rounded-2xl text-xs text-slate-800 flex items-center justify-between">
                <span>
                  Want to verify your family&apos;s exact coparcenary fraction? Use our{" "}
                  <a
                    href="#interactive-calculator"
                    className="font-bold text-[#C65378] underline hover:text-[#a33b5c]"
                  >
                    interactive partition calculator above
                  </a>
                  .
                </span>
                <ArrowRight className="w-4 h-4 text-[#C65378] shrink-0" />
              </div>
            </section>

            {/* SECTION 4: DAUGHTER COPARCENARY RIGHTS */}
            <section id="daughter-rights-ruling" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LANDMARK PRECEDENT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Daughter Coparcenary Rights: Vineeta Sharma Precedent
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Prior to 2005, daughters were excluded from Mitakshara coparcenary property. The Hindu
                  Succession (Amendment) Act, 2005 substituted Section 6 to provide that a daughter becomes
                  a coparcener by birth with the exact same rights as a son.
                </p>
                <p>
                  Conflicting High Court rulings were permanently resolved by the Supreme Court of India in
                  the historic ruling{" "}
                  <strong>
                    <em>Vineeta Sharma v. Rakesh Sharma</em> (2020) 9 SCC 1
                  </strong>
                  .
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
                <div className="text-xs font-extrabold uppercase tracking-wide text-[#C65378]">
                  Core Takeaways from Vineeta Sharma (2020):
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800">
                  <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <span>
                      <strong>Coparcener from Birth:</strong> A daughter has an unobstructed birthright
                      regardless of whether she was born before or after 2005.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <span>
                      <strong>Father Need Not Be Alive:</strong> The coparcenary right does not depend on
                      the father living on September 9, 2005.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <span>
                      <strong>Status Unaffected by Marriage:</strong> A daughter remains a member and
                      coparcener of her father&apos;s HUF throughout her life.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <span>
                      <strong>Prior Partitions Protected:</strong> Partitions effected by registered deed or
                      court decree prior to December 20, 2004 are saved.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: SECTION 30 WILLS */}
            <section id="section-30-wills" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>TESTAMENTARY PLANNING</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Section 30 Wills: Bequeathing Undivided HUF Shares
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A widespread myth across India suggests that HUF ancestral property cannot be willed away.
                  This is inaccurate. While a coparcener cannot will away the <em>entire family estate</em>,
                  Section 30 of the Hindu Succession Act explicitly allows a coparcener to dispose of their{" "}
                  <strong>undivided coparcenary share</strong> in a Will.
                </p>
                <p>
                  By executing a Will under Section 30 on WillDrafting, the Karta can bequeath 100% of his
                  notional share to his wife. This guarantees her full dignity, independent ownership, and
                  protection from eviction.
                </p>
              </div>
            </section>

            {/* SECTION 6: COMPARISON TABLE */}
            <section id="comparison-table-regimes" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LEGAL DISTINCTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Comparison: HUF Ancestral vs Self-Acquired Property
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Before drafting your Will, it is essential to distinguish between HUF coparcenary assets,
                self-acquired assets, and a woman&apos;s Stridhan.
              </p>

              {/* Structured HTML Comparison Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#172228] text-white font-bold">
                    <tr>
                      <th className="py-3.5 px-4">Parameter</th>
                      <th className="py-3.5 px-4 bg-[#24343D]">HUF Ancestral Property</th>
                      <th className="py-3.5 px-4">Self-Acquired Property</th>
                      <th className="py-3.5 px-4">Stridhan Property</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium">
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Origin of Title</td>
                      <td className="py-3 px-4 text-slate-600 bg-slate-50/50">
                        Inherited across 4 generations (Father, Grandfather, Great-grandfather)
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        Purchased with personal earnings, salary, business profits
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        Gifts, jewelry, cash received by a woman before/at/after marriage
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Right by Birth?</td>
                      <td className="py-3 px-4 text-blue-800 font-bold bg-slate-50/50">
                        YES (Sons &amp; Daughters acquire right immediately at birth)
                      </td>
                      <td className="py-3 px-4 text-rose-700 font-bold">
                        NO (Children have zero legal right during owner&apos;s lifetime)
                      </td>
                      <td className="py-3 px-4 text-rose-700 font-bold">
                        NO (Absolute property of the woman under Section 14 HSA)
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Will Bequest Scope</td>
                      <td className="py-3 px-4 text-amber-800 font-bold bg-slate-50/50">
                        Restricted strictly to testator&apos;s undivided 1/N share (Sec 30)
                      </td>
                      <td className="py-3 px-4 text-blue-800 font-bold">
                        Unrestricted (100% can be willed to anyone without family consent)
                      </td>
                      <td className="py-3 px-4 text-blue-800 font-bold">
                        Unrestricted (Woman can will 100% of Stridhan as she pleases)
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">Partition Rights</td>
                      <td className="py-3 px-4 text-slate-600 bg-slate-50/50">
                        Any coparcener (son or daughter) can demand partition at any time
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        No family member can demand partition during owner&apos;s life
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        Husband or in-laws have zero right to partition or claim Stridhan
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 7: VISUAL STATUTORY GUIDE */}
            <section id="visual-flowchart-section" className="scroll-target scroll-mt-28 space-y-4">
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                    <PieChart className="w-4 h-4 text-[#C65378]" />
                    <span>STATUTORY VISUAL GUIDE: HUF COPARCENARY PARTITION</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">Hindu Succession Act 1956</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                  7. Visual Flowchart: Step-by-Step HUF Partition Blueprint
                </h3>
                <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                  The statutory visual blueprint below illustrates the two-stage partition mechanism,
                  highlighting the critical divide between executing a Section 30 Will versus dying
                  intestate under Section 8.
                </p>
                <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                  <Image
                    src="/images/huf-coparcenary-share-partition-calculator-og.jpg"
                    alt="HUF Property Share and Coparcenary Partition Calculator India - Statutory Blueprint"
                    width={1200} height={675}
                    className="absolute inset-0 w-full h-full object-cover"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    priority={false}
                  />
                </div>
              </div>
            </section>

            {/* SECTION 8: REGISTERED PARTITION DEEDS */}
            <section id="family-partition-deeds" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>DISPUTE RESOLUTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. How to Avoid Family Disputes: Registered Partition Deeds
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Civil partition lawsuits in India often take 15 to 30 years to reach final decree.
                Families can avoid bitter court litigation through two primary mechanisms:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
                  <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C65378]" />
                    <span>Registered Partition Deed</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 17 of the Registration Act, 1908, a formal partition dividing
                    immovable property by metes and bounds must be executed on appropriate stamp
                    paper and registered with the Sub-Registrar. Once registered, title mutates
                    directly into individual names.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
                  <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4 text-blue-600" />
                    <span>Family Settlement Agreement (FSA)</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    As recognized in <em>Kale v. Deputy Director of Consolidation</em> (1976 SC), a
                    memorandum of family settlement recording an anterior oral partition does not
                    require compulsory registration if it merely records existing arrangements to
                    maintain family peace.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 9: REAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>PRACTICAL CASE STUDIES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Practical Case Studies: Delhi, Jaipur &amp; Mumbai HUFs
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Case Study 1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900">
                      Scenario A: Delhi Karta Protects Elderly Spouse via Section 30 Will
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-[#C65378]">
                      Delhi NCR
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A father in Greater Kailash, Delhi held an ancestral bungalow valued at ₹12 Crore in his HUF with 1 son and 1 daughter. Without a Will, his widow would get only 1/9th share (11.11% = ₹1.33 Cr). By executing a Section 30 Will on WillDrafting, he bequeathed his entire 1/3rd share to his wife.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Stage 1 Coparcenary (Son &amp; Daughter Each):</span>
                      <span className="font-bold text-slate-900">33.33% (₹4.00 Crore Each)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Widow Share with Section 30 Will:</span>
                      <span className="font-bold text-[#C65378]">33.33% (₹4.00 Crore Full Ownership)</span>
                    </div>
                    <div className="pt-1 text-[#C65378] font-bold flex justify-between border-t border-slate-200">
                      <span>Result for Family:</span>
                      <span>Widow protected • Zero eviction hazard</span>
                    </div>
                  </div>
                </div>

                {/* Case Study 2 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900">
                      Scenario B: Married Daughter Claims Partition in Jaipur Business HUF
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Jaipur
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A married daughter in Jaipur was denied a share in ancestral commercial properties by her two brothers claiming she was married before 2005. Invoking Vineeta Sharma (2020), she claimed her full 1/3rd coparcenary share, securing a registered family settlement.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Daughter Pre-2005 Status Claim:</span>
                      <span className="font-bold text-slate-900">Denied by siblings as &apos;paraya dhan&apos;</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Post-Vineeta Sharma Entitlement:</span>
                      <span className="font-bold text-[#C65378]">Equal 33.33% Coparcenary Share</span>
                    </div>
                    <div className="pt-1 text-[#C65378] font-black flex justify-between border-t border-slate-200">
                      <span>Resolution:</span>
                      <span>Registered FSA executed • Full share paid</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: COPY-PASTE LEGAL RECITAL & SECTION 30 WILL CLAUSE */}
            <section id="legal-clause-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>COPY-PASTEABLE LEGAL ASSETS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Copy-Paste Legal Clause: Section 30 Will Bequest Format
              </h3>

              {/* Template Box 1: Section 30 Will Clause */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Section 30 Will Bequest Clause for Undivided HUF Coparcenary Share
                  </div>
                  <button
                    type="button"
                    onClick={copyClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                  >
                    {copiedClause ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-[#C65378]" />
                        <span className="text-[#C65378]">Copied!</span>
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
{`TESTAMENTARY DISPOSITION OF UNDIVIDED COPARCENARY SHARE UNDER SECTION 30 OF THE HINDU SUCCESSION ACT, 1956:

"WHEREAS I, the Testator herein, am a coparcener and Karta in the Hindu Undivided Family (HUF) known and styled as [Insert HUF Name, e.g., 'Shri Rajesh Sharma HUF'], holding an undivided coparcenary interest and share in the ancestral movable and immovable properties of the said family;

AND WHEREAS under Section 30 of the Hindu Succession Act, 1956, I am fully competent and statutorily empowered to dispose of my undivided interest in the Mitakshara coparcenary property by testamentary disposition;

NOW THIS WILL WITNESSETH that upon my demise, my undivided notional coparcenary share in all the ancestral properties of the aforesaid HUF (as determined upon a notional partition under Section 6 of the Hindu Succession Act, 1956 immediately prior to my death) shall devolve upon, vest in, and belong absolutely and forever to my wife, Smt. [Insert Wife's Full Name], for her sole use, maintenance, enjoyment, and absolute ownership without any claim, objection, or obstruction by any other legal heir or coparcener."`}
                </pre>
              </div>

              {/* Template Box 2: Partition Checklist */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    HUF Coparcenary Partition &amp; Will Drafting Checklist
                  </div>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                  >
                    {copiedChecklist ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-[#C65378]" />
                        <span className="text-[#C65378]">Copied!</span>
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
                    <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <span>HUF PAN card copy &amp; Demat/Bank account statements</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <span>Family tree pedigree chart with coparcener birth dates</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <span>Daughter birth &amp; marriage certificates (Vineeta Sharma)</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <span>Section 30 Will draft specifying undivided HUF bequest</span>
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
                11. Institutional Profile: Legal Excellence &amp; Trust Signals
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Hindu Succession &amp; HUF Partition Advocacy Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-[#C65378] text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                    <span>Bar Council Verified Testamentary Bench</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is India&rsquo;s premier succession technology and estate planning
                  platform, powered by AMA Legal Solutions. Our multidisciplinary bench includes senior
                  High Court testamentary litigators, chartered property valuation experts, and Hindu law
                  advocates. We have structured over 15,000 challenge-proof Wills and assisted hundreds
                  of family HUFs in partition deeds, coparcenary share computations, and dispute-free
                  ancestral property distributions.
                </p>

                {/* Service Grid Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/tools/succession-calculator"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Legal Heir Share Calculator</span>
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
                    href="/tools/will-checklist"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Will Preparation Checklist</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQ ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>DIRECT ANSWERS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: HUF Property Partition
              </h3>
              <div className="space-y-3 pt-2">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors"
                      aria-expanded={openFaq === idx}
                    >
                      <span className="text-xs sm:text-sm font-bold text-slate-900">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#C65378] shrink-0 transition-transform duration-200 ${
                          openFaq === idx ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 13: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>AUTHORITATIVE CITATIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Statutory Authorities &amp; Landmark Judicial Precedents
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs">
                <div className="space-y-2">
                  <div className="font-extrabold text-slate-900 mb-1">
                    Governing Provisions of the Hindu Succession Act, 1956:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      <strong>Section 6(1):</strong> Devolution of coparcenary interest granting daughters equal birthright.
                    </li>
                    <li>
                      <strong>Section 6(3):</strong> Statutory notional partition deeming fiction upon death of coparcener.
                    </li>
                    <li>
                      <strong>Section 8:</strong> General rules of succession in case of Hindu male dying intestate.
                    </li>
                    <li>
                      <strong>Section 14:</strong> Property of a female Hindu to be her absolute property (Stridhan).
                    </li>
                    <li>
                      <strong>Section 30:</strong> Statutory power to dispose of undivided coparcenary interest by Will.
                    </li>
                    <li>
                      <strong>Vineeta Sharma v. Rakesh Sharma (2020) 9 SCC 1:</strong> 3-judge bench ruling confirming daughter coparcenary right from birth.
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
                    <span>India Code: Hindu Succession Act</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Supreme Court Judgment Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Guides &amp; Succession Calculators
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/probate-checker"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Probate Requirement Checker
                    </Link>
                    <Link
                      href="/tools/succession-calculator"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Hindu Legal Heir Share Calculator
                    </Link>
                    <Link
                      href="/tools/will-checklist"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Will Drafting Document Checklist
                    </Link>
                    <Link
                      href="/templates/will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Indian Legal Will Template
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
                Specialist in Hindu succession jurisprudence, High Court partition suits, Section
                30 coparcenary testamentary bequests, and ancestral property title devolution.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-[#C65378] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C65378]" />
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
                  <span>PREVENT SURVIVING SPOUSE SIDELINING</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Spouse&apos;s Share in HUF Property
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  In Stage 1 partition, a widow receives 0%. Without a Section 30 Will, her share is
                  diluted across all heirs. A Will secures 100% of your coparcenary share for her.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-300" />
                  <span>Lawyer Reviewed &amp; Section 30 Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>COMPLEX HUF PARTITION SUIT DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Facing an Ancestral Partition Dispute or Karta Sale?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our civil litigators handle Registered Partition Deeds, Family Settlement Agreements,
                  and injunctions against unauthorized Karta property alienation.
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
                  Why Families Rely on WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <span>
                      <strong>Vineeta Sharma Precision:</strong> Incorporates the 2020 Supreme Court daughter equal birthright doctrine.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <span>
                      <strong>Section 30 Bequest Engine:</strong> Calculates testamentary spouse protection vs intestate fragmentation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <span>
                      <strong>Two-Stage Breakdown:</strong> Clear visual distinction between Section 6 and Section 8 devolution.
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
          <span>HUF Calculator</span>
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