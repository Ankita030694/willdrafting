"use client";

import React, { useState, useEffect, useRef } from "react";
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
  AlertCircle,
  Award,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "executive-summary", label: "Executive Summary: Rights Overview" },
  { id: "marriage-validity-status", label: "1. Second Marriage Status: Void vs Valid" },
  { id: "hma-section-16-legitimacy", label: "2. HMA Section 16: Child Legitimacy" },
  { id: "revanasiddappa-supreme-court", label: "3. Revanasiddappa Ruling (SC 2023)" },
  { id: "who-gets-what-matrix", label: "4. Who Gets What: Comprehensive Matrix" },
  { id: "visual-blueprint", label: "5. Visual Blueprint: Inheritance Law" },
  { id: "interactive-share-estimator", label: "6. Interactive Share Estimator" },
  { id: "second-wife-own-rights", label: "7. Second Wife: Maintenance vs Succession" },
  { id: "step-by-step-sop", label: "8. Step-by-Step SOP: Claiming Your Share" },
  { id: "printable-checklist-section", label: "9. Printable Legal Action Protocol" },
  { id: "inheritance-myths", label: "10. 6 Common Inheritance Myths" },
  { id: "why-a-will-is-essential", label: "11. Why a Will is Essential in Blended Families" },
  { id: "other-personal-laws", label: "12. Muslim, Christian & Parsi Rules" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Official Acts & Legal Precedents" },
];

const PRINTABLE_CHECKLIST_TEXT = `================================================================================
SECOND WIFE & CHILDREN PROPERTY RIGHTS LEGAL PROTOCOL (INDIA)
Statutory Authority: Hindu Marriage Act, 1955 (Section 16)
Succession Authority: Hindu Succession Act, 1956 (Sections 6, 8, 10, 30)
Landmark Supreme Court Precedent: Revanasiddappa v. Mallikarjun (2023) 10 SCC 1
Prepared by WillDrafting.in
================================================================================

PHASE 1: DOCUMENTING PATERNITY & MARRIAGE STATUS (DAYS 1 TO 15)
[ ] Step 1.1: Secure certified Municipal Birth Certificates of all children proving paternity.
[ ] Step 1.2: Collect school admission records, Aadhaar cards, and passports reflecting father's name.
[ ] Step 1.3: Verify marriage validity: Was father legally divorced from first wife, or was first wife deceased?
[ ] Step 1.4: Obtain official death certificate of the deceased father from the local Municipal Registrar.
[ ] Step 1.5: If father executed a Will, locate the original or certified copy registered at the Sub-Registrar Office.

PHASE 2: ASSET DISCOVERY & PROPERTY CLASSIFICATION (DAYS 16 TO 30)
[ ] Step 2.1: Classify all properties: Self-acquired by father vs. Ancestral coparcenary joint family property.
[ ] Step 2.2: Obtain certified copies of registered sale deeds from the local Sub-Registrar Office (SRO).
[ ] Step 2.3: Retrieve latest land revenue records (7/12 extract, Jamabandi, or Khata) from Tehsil office.
[ ] Step 2.4: Discover bank accounts, fixed deposits, demat shares, mutual funds, and employer provident funds.
[ ] Step 2.5: Check whether father named nominees on bank accounts, demat holdings, or insurance policies.

PHASE 3: PREVENTING UNILATERAL MUTATION OR SALE (DAYS 31 TO 45)
[ ] Step 3.1: Check Tehsil revenue records to see if first family has applied for unilateral mutation (Dakhil Kharij).
[ ] Step 3.2: File a formal written objection and caveat before the Revenue Tehsildar or Municipal Commissioner.
[ ] Step 3.3: Attach copies of children's birth certificates citing HMA Section 16 statutory legitimacy.
[ ] Step 3.4: NEVER sign blank papers, informal family settlements, or unverified No Objection Certificates (NOCs).

PHASE 4: FORMAL DEMAND & LEGAL NOTICE (DAYS 46 TO 60)
[ ] Step 4.1: Engage a specialized succession advocate through WillDrafting.in.
[ ] Step 4.2: Serve a formal Legal Notice to all legal heirs demanding partition by metes and bounds.
[ ] Step 4.3: Specify the children's statutory Class I share in self-acquired property under HSA Section 8.
[ ] Step 4.4: Cite the Supreme Court Revanasiddappa (2023) judgment regarding deemed coparcenary shares.
[ ] Step 4.5: Grant 15 to 30 days statutory notice period for an amicable registered partition deed.

PHASE 5: CIVIL COURT SUIT FOR PARTITION & INJUNCTION (IF SHARE IS DENIED)
[ ] Step 5.1: File a Civil Suit for Partition & Separate Possession under CPC Order 20 Rule 18 in District Court.
[ ] Step 5.2: File an immediate application for Temporary Injunction under CPC Order 39 Rules 1 & 2.
[ ] Step 5.3: Obtain an ad-interim injunction restraining any sale, mortgage, or third-party transfer of properties.
[ ] Step 5.4: Apply for appointment of a Court Receiver or Court Commissioner to inspect and inventory estate assets.
[ ] Step 5.5: Secure Preliminary Decree declaring exact shares, followed by Final Decree for physical division.

================================================================================
CRITICAL REMINDER: Under Section 16 of the Hindu Marriage Act, children born of any
marriage are deemed legitimate by law. Under Revanasiddappa (2023), they inherit an
equal share in the father's self-acquired property and his share in ancestral property.
For confidential advocate assistance, visit WillDrafting.in or contact WillDrafting.in.
================================================================================`;

const MATRIX_DATA = [
  {
    category: "Children of First Wife",
    status: "100% Legitimate Heirs",
    selfAcquired: "Equal Class I share under Section 8 (Intestate) or per Will terms",
    ancestralCoparcenary: "Full coparceners by birth with right to demand partition anytime",
    lifetimePartition: "Yes, can demand partition during father's lifetime",
    badgeColor: "emerald",
  },
  {
    category: "Children of Valid Second Wife",
    status: "100% Legitimate Heirs",
    selfAcquired: "Equal Class I share under Section 8 (Intestate) or per Will terms",
    ancestralCoparcenary: "Full coparceners by birth with right to demand partition anytime",
    lifetimePartition: "Yes, can demand partition during father's lifetime",
    badgeColor: "emerald",
  },
  {
    category: "Children of Void / Bigamous Second Wife",
    status: "Statutory Legitimacy (HMA s.16)",
    selfAcquired: "Equal Class I share under Section 8 (Intestate) or per Will terms",
    ancestralCoparcenary: "Share in father's notional coparcenary share (Revanasiddappa 2023)",
    lifetimePartition: "No, rights crystallize only upon father's death",
    badgeColor: "blue",
  },
  {
    category: "First Wife (Legally Wedded)",
    status: "Class I Legal Heir",
    selfAcquired: "Equal Class I share (one full share along with each child and mother)",
    ancestralCoparcenary: "Gets share on partition of HUF during life or on father's death",
    lifetimePartition: "Entitled to equal share whenever partition occurs",
    badgeColor: "purple",
  },
  {
    category: "Second Wife (Valid Marriage - After Divorce/Death)",
    status: "Class I Legal Heir",
    selfAcquired: "Equal Class I share (sole surviving legal widow alongside children)",
    ancestralCoparcenary: "Gets share out of husband's coparcenary interest on his death",
    lifetimePartition: "Entitled to maintenance and partition share as legal widow",
    badgeColor: "purple",
  },
  {
    category: "Second Wife (Void Marriage - First Marriage Active)",
    status: "Not a Legal Heir Under HSA",
    selfAcquired: "Zero statutory share under intestacy. Can only receive via Will",
    ancestralCoparcenary: "Zero share in ancestral coparcenary property",
    lifetimePartition: "No inheritance rights. Maintenance possible under CrPC 125/DV Act",
    badgeColor: "rose",
  },
];

const MYTHS_DATA = [
  {
    myth: "Children born from a second marriage are illegitimate and cannot claim any family property.",
    reality:
      "Completely False. Section 16 of the Hindu Marriage Act, 1955 explicitly grants statutory legitimacy to all children born from void or voidable marriages. They are legal heirs of their father with equal inheritance rights in his property.",
  },
  {
    myth: "Children of a second marriage can only inherit self-acquired property, never ancestral property.",
    reality:
      "Completely False. The Supreme Court three-judge bench in Revanasiddappa v. Mallikarjun (2023) ruled that children of void or voidable marriages are entitled to inherit their parent's share in ancestral coparcenary property through a notional partition under Section 6(3) of the Hindu Succession Act.",
  },
  {
    myth: "If a second wife lived with a man for 20 years, she automatically gets an inheritance share without a Will.",
    reality:
      "False. While long cohabitation may give rise to a presumption of marriage for maintenance under Section 125 CrPC or the Domestic Violence Act, it does NOT override Section 5(i) of the Hindu Marriage Act. If the first marriage subsisted, the second wife has no statutory inheritance rights under Section 8 of the Hindu Succession Act without a valid Will.",
  },
  {
    myth: "The first wife's family can unilaterally mutate property in revenue records and disinherit second marriage children.",
    reality:
      "Completely False. Revenue mutation (Dakhil Kharij) is solely for land revenue and tax collection. It does not confer or extinguish legal title. The Supreme Court has repeatedly confirmed that unilateral mutation cannot strip lawful Class I heirs of their property rights.",
  },
  {
    myth: "A father cannot bequeath his self-acquired property to his second family if his first children object.",
    reality:
      "Completely False. Under Section 30 of the Hindu Succession Act, any Hindu has absolute testamentary discretion over self-acquired property. A father can bequeath 100% of his self-acquired property to his second wife or her children through a properly executed Will.",
  },
  {
    myth: "Being named as nominee on a bank account or flat gives the nominee full ownership over other heirs.",
    reality:
      "Completely False. Under established Supreme Court precedent (including Sarbati Devi v. Usha Devi), a nominee is merely a legal trustee or custodian responsible for receiving funds. The money remains part of the deceased's estate and must be distributed among all legal heirs according to succession law or a Will.",
  },
];

export default function SecondWifeChildrenRightsClient() {
  const router = useRouter();
  const { data: session } = useSession();

  // TOC active state tracking
  const [activeSection, setActiveSection] = useState<string>("executive-summary");
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);

  // Interactive Share Calculator State
  const [secondMarriageType, setSecondMarriageType] = useState<"valid" | "void">("void");
  const [firstWifeAlive, setFirstWifeAlive] = useState<boolean>(true);
  const [fatherMotherAlive, setFatherMotherAlive] = useState<boolean>(false);
  const [numFirstChildren, setNumFirstChildren] = useState<number>(2);
  const [numSecondChildren, setNumSecondChildren] = useState<number>(1);
  const [propertyType, setPropertyType] = useState<"self-acquired" | "ancestral-father-share">("self-acquired");
  const [estateValueLakhs, setEstateValueLakhs] = useState<number>(120);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleStartWill = () => {
    if (session) {
      router.push("/start");
    } else {
      window.dispatchEvent(new CustomEvent(OPEN_SIGNUP_EVENT));
    }
  };

  const handleCopyChecklist = () => {
    navigator.clipboard.writeText(PRINTABLE_CHECKLIST_TEXT);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Scrollspy observer for TOC
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = TOC_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(TOC_ITEMS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(TOC_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Interactive share computation logic
  const computeShareDistribution = () => {
    // Determine legal heirs sharing the estate
    // In self-acquired intestate or father's notional coparcenary share:
    // Heirs are:
    // 1. Father's Mother (if alive) -> 1 share
    // 2. First Wife (if legally wedded & alive) -> 1 share
    // 3. Second Wife (ONLY IF valid marriage, 0 if void) -> 1 share or 0
    // 4. Children from First Marriage -> 1 share each
    // 5. Children from Second Marriage (deemed legitimate under Section 16) -> 1 share each

    let totalHeirsCount = 0;
    let motherShares = fatherMotherAlive ? 1 : 0;
    let firstWifeShares = firstWifeAlive ? 1 : 0;
    let secondWifeShares = secondMarriageType === "valid" ? 1 : 0;
    let firstChildrenShares = Math.max(0, numFirstChildren);
    let secondChildrenShares = Math.max(1, numSecondChildren);

    totalHeirsCount =
      motherShares +
      firstWifeShares +
      secondWifeShares +
      firstChildrenShares +
      secondChildrenShares;

    if (totalHeirsCount === 0) totalHeirsCount = 1;

    const singleSharePercent = 100 / totalHeirsCount;
    const totalSecondChildrenPercent = singleSharePercent * secondChildrenShares;
    const eachSecondChildPercent = singleSharePercent;

    const totalEstateRupees = estateValueLakhs * 100000;
    const eachSecondChildRupees = Math.round(totalEstateRupees * (singleSharePercent / 100));

    return {
      totalHeirsCount,
      motherShares,
      firstWifeShares,
      secondWifeShares,
      firstChildrenShares,
      secondChildrenShares,
      eachSecondChildPercent: Number(eachSecondChildPercent.toFixed(2)),
      totalSecondChildrenPercent: Number(totalSecondChildrenPercent.toFixed(2)),
      eachSecondChildRupees,
      secondWifePercent: Number((singleSharePercent * secondWifeShares).toFixed(2)),
      firstWifePercent: Number((singleSharePercent * firstWifeShares).toFixed(2)),
    };
  };

  const results = computeShareDistribution();

  const FAQ_ITEMS = [
    {
      q: "Do children born of a second wife have property rights in India?",
      a: "Yes. Under Section 16 of the Hindu Marriage Act, 1955, children born of a second marriage are deemed legitimate by law, even if the marriage itself is void or bigamous. They inherit an equal share in their father's self-acquired property and his share in ancestral property alongside children of the first wife.",
    },
    {
      q: "What did the Supreme Court rule in Revanasiddappa v. Mallikarjun (2023)?",
      a: "A three-judge bench of the Supreme Court held on September 1, 2023, that children of void or voidable marriages are entitled to inherit their parent's share in Hindu Undivided Family (HUF) coparcenary property through notional partition under Section 6(3) of the Hindu Succession Act.",
    },
    {
      q: "Does a second wife have inheritance rights if the first wife is alive?",
      a: "No. If a Hindu man marries a second wife while his first marriage is still legally active, the second marriage is null and void under Sections 5(i) and 11 of the Hindu Marriage Act. The second wife is not a legal heir under Section 8 of the Hindu Succession Act and receives no inheritance.",
    },
    {
      q: "When does a second wife have full legal inheritance rights?",
      a: "A second wife possesses 100% legal inheritance rights if the second marriage occurred after the first marriage was legally dissolved through a court divorce decree, or after the death of the first wife. In this case, she is a legally wedded wife and a Class I legal heir.",
    },
    {
      q: "Can children of a second wife demand partition of ancestral property while the father is alive?",
      a: "No. Children born from a void or bigamous marriage are not independent coparceners by birth in the ancestral joint family. They cannot demand a partition during their father's lifetime. Their inheritance rights arise only upon the father's death out of his deemed coparcenary share.",
    },
    {
      q: "How is father's self-acquired property divided if he dies without a Will?",
      a: "Under Section 8 and Section 10 of the Hindu Succession Act, the father's self-acquired property is divided equally per capita among all Class I legal heirs. Children from the second marriage receive the exact same share as children from the first marriage and the surviving legal widow and mother.",
    },
    {
      q: "Can a father give all his self-acquired property to the second wife or her children through a Will?",
      a: "Yes. Under Section 30 of the Hindu Succession Act, an individual has absolute testamentary freedom over self-acquired property. A father can bequeath 100% of his self-acquired property to his second wife or second family through a valid Will, excluding the first family.",
    },
    {
      q: "Can a second wife claim maintenance if her marriage is legally void?",
      a: "While an invalid second marriage grants no succession rights, the Supreme Court in Badshah v. Urmila Badshah Godse (2014) held that if the husband concealed his existing marriage, the second wife is entitled to maintenance under Section 125 of the CrPC and the Domestic Violence Act, 2005.",
    },
    {
      q: "What happens to ancestral property if the father leaves a Will?",
      a: "Under Section 30 of the Hindu Succession Act, a father can only Will away his own undivided coparcenary share in ancestral property. He cannot Will away the independent coparcenary shares of his children from a valid marriage.",
    },
    {
      q: "Why is drafting a Will essential in blended families with second marriages?",
      a: "A Will prevents bitter disputes and multi-decade court battles between children of different marriages. It allows the father to clearly specify who receives what, grant life-interest residence rights to the second wife, and appoint an impartial executor.",
    },
  ];

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
            <span>HINDU SUCCESSION ACT &bull; FAMILY RIGHTS CLUSTER</span>
          </div>

          {/* Single H1 Title (Strictly 30-65 chars, no em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6 drop-shadow-xs">
            Second Wife and Children Property Rights in India
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            Understand property rights of second wives and children in India. Learn the landmark 2023 Supreme Court ruling in Revanasiddappa, HMA Section 16 legitimacy rules, ancestral shares, and how to protect your family with a Will.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleStartWill}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/20 cursor-pointer"
            >
              <span>Draft a Will to Protect Your Family</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#who-gets-what-matrix"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all"
            >
              <span>View Who Gets What Matrix</span>
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
            {/* Stat 1: Benchmark Precedent */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                SC 2023
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Revanasiddappa Benchmark
              </span>
            </div>

            {/* Stat 2: Legal Experience */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 border-l-0 md:border-l border-[#172228]/10">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                15+ Years
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Succession Advocacy
              </span>
            </div>

            {/* Stat 3: Child Legitimacy */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 border-l-0 md:border-l border-[#172228]/10">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#C65378] tracking-tight leading-none whitespace-nowrap">
                100% Equal
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Child Legitimacy Under HMA
              </span>
            </div>

            {/* Stat 4: Client Rating */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 border-l-0 md:border-l border-[#172228]/10">
              <div className="flex items-center gap-1.5">
                <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none">
                  4.9
                </span>
                <span className="text-amber-500 text-lg sm:text-xl">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              </div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                5,000+ Families Protected
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Editorial Layout)
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_320px] xl:grid-cols-[280px_minmax(0,1fr)_340px] gap-8 items-start">
          
          {/* =====================================================================
              LEFT COLUMN: STICKY TABLE OF CONTENTS
              ===================================================================== */}
          <aside className="sticky top-24 hidden lg:block space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span>Table of Contents</span>
              </div>
              <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 text-xs">
                {TOC_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between group ${
                      activeSection === item.id
                        ? "bg-rose-50 text-[#C65378] font-bold border-l-2 border-[#C65378]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <span className="truncate">{item.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#C65378] shrink-0" />
                  </button>
                ))}
              </nav>
            </div>

            {/* Quick Legal Assurance Badge */}
            <div className="bg-[#FAF7F0] rounded-2xl border border-[#172228]/10 p-4 text-xs text-slate-700 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#172228]">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>Statutory Authority</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-600">
                Verified under Section 16 of the Hindu Marriage Act, 1955 and Section 6 &amp; 8 of the Hindu Succession Act, 1956.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN EDITORIAL CONTENT
              ===================================================================== */}
          <main className="space-y-10 min-w-0">

            {/* SECTION 0: EXECUTIVE SUMMARY BOX */}
            <section
              id="executive-summary"
              className="scroll-target rounded-2xl bg-white border border-slate-200/90 border-l-[6px] border-l-[#C65378] p-6 sm:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2.5 text-[#C65378] font-extrabold text-xs uppercase tracking-wider mb-3">
                <Sparkles className="w-4 h-4" />
                <span>Executive Summary: Core Legal Takeaways</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] mb-4 tracking-tight">
                Executive Summary: Second Wife &amp; Children Rights
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
                In Indian succession law, rights of a second wife and rights of her children are governed by two entirely distinct legal principles. Here are the foundational legal rules every family must understand:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-rose-50/50 p-4 rounded-xl border border-rose-100">
                  <CheckCircle2 className="w-5 h-5 text-[#C65378] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    <strong className="block text-[#172228] font-bold mb-1">Children Have 100% Legitimacy:</strong>
                    Under Section 16 of the Hindu Marriage Act, 1955, all children born of a second marriage are deemed legitimate by law, even if the marriage is bigamous or declared void.
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    <strong className="block text-[#172228] font-bold mb-1">Ancestral Share Confirmed (SC 2023):</strong>
                    The landmark Supreme Court ruling in <em>Revanasiddappa (2023)</em> confirmed that children of void marriages inherit their parent’s share in ancestral coparcenary property.
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    <strong className="block text-[#172228] font-bold mb-1">Equal Class I Shares in Self-Acquired Assets:</strong>
                    In their father's self-acquired property, children of the second wife share equally per capita with children of the first wife under Section 8 of the Hindu Succession Act.
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    <strong className="block text-[#172228] font-bold mb-1">Second Wife's Own Inheritance:</strong>
                    A second wife inherits ONLY if her marriage is legally valid (after divorce or first wife’s death). If bigamous, she receives no statutory inheritance without a Will.
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: LEGAL STATUS OF SECOND MARRIAGE */}
            <section id="marriage-validity-status" className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>Statutory Foundations</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                1. Legal Status of Second Marriage: Void vs Valid
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Before analyzing property rights, one must examine the legal validity of the second marriage under the <strong>Hindu Marriage Act, 1955 (HMA)</strong>. Under Indian law, Hindu marriages are strictly monogamous. Whether a second wife has legal standing as a surviving spouse depends entirely on the status of the first marriage on the day the second wedding took place.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 mb-2">
                    Valid Second Marriage
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Section 5(i) Compliant</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Occurs when the first marriage has been lawfully dissolved by a court decree of divorce, or when the first spouse passed away prior to the second marriage. The second wife is a full legal wife with all inheritance rights.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 mb-2">
                    Void Marriage (Bigamy)
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Sections 5(i) &amp; 11 Violation</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Occurs while the first spouse is alive and the first marriage is still legally active. The marriage is <em>null and void ab initio</em> (invalid from the very beginning). The second wife gets no spousal inheritance under the Hindu Succession Act.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 mb-2">
                    Voidable Marriage
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Section 12 Annulment</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A marriage that remains legally valid until one of the parties obtains a formal court decree of nullity (e.g. on grounds of fraud, coercion, or non-consummation). Until annulled, the wife remains legally married.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-950 flex items-start gap-3 mt-4">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Crucial Distinction:</strong> While the legal status of the marriage dictates whether the <em>wife</em> inherits as a surviving widow, it does NOT diminish the inheritance rights of her <em>children</em>. Indian law draws a firm line between the status of the marriage and the rights of children born from it.
                </div>
              </div>
            </section>

            {/* SECTION 2: HMA SECTION 16 & CHILD LEGITIMACY */}
            <section id="hma-section-16-legitimacy" className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>Statutory Legitimacy</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                2. HMA Section 16: Legitimacy of All Children
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Prior to legal reforms, children born of invalid or bigamous unions were historically branded with social stigma and denied property rights. To put an end to this injustice, Parliament enacted and later expanded <strong>Section 16 of the Hindu Marriage Act, 1955</strong>.
              </p>

              <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 space-y-3">
                <div className="text-sm font-bold text-[#172228]">What Does Section 16 State?</div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                    <span><strong>Section 16(1):</strong> Notwithstanding that a marriage is null and void under Section 11, any child of such marriage who would have been legitimate if the marriage had been valid shall be deemed to be legitimate.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                    <span><strong>Section 16(2):</strong> An identical protection applies to children born of voidable marriages that are subsequently annulled by a court under Section 12.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                    <span><strong>Section 16(3):</strong> Clarifies that such statutory legitimacy confers property rights in the property of their parents, eliminating any discrimination between children of a first and second marriage.</span>
                  </li>
                </ul>
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                As a direct result of Section 16, children born of a second marriage (even an unauthorized bigamous marriage) are treated as full <strong>Class I legal heirs</strong> under Section 8 of the Hindu Succession Act, 1956. When the father dies without a Will, these children inherit an equal per-capita share in the father's self-acquired property alongside his children from the first marriage.
              </p>
            </section>

            {/* SECTION 3: REVANASIDDAPPA RULING (SC 2023) */}
            <section id="revanasiddappa-supreme-court" className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>Landmark Supreme Court Verdict</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                3. Revanasiddappa Ruling: Supreme Court 2023 Verdict
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                For decades, there was intense judicial debate across Indian courts regarding whether Section 16(3) allowed children of void marriages to claim a share in <em>ancestral coparcenary property</em>, or only in their father's <em>self-acquired property</em>. Earlier rulings like <em>Jinia Keotin (2003)</em> had taken a restrictive view.
              </p>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 to-slate-50 border border-blue-200/70 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-black text-blue-900 uppercase tracking-wider">
                    Civil Appeal No. 2844 of 2011 &bull; Decided September 1, 2023
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-600 text-white">
                    3-Judge Bench (2023 INSC 783)
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-950">
                  Revanasiddappa &amp; Ors. v. Mallikarjun &amp; Ors.
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  A three-judge bench of the Supreme Court of India, headed by <strong>Chief Justice D.Y. Chandrachud</strong>, alongside Justices J.B. Pardiwala and Manoj Misra, delivered a historic, unanimous judgment that fundamentally changed Indian property law.
                </p>
                <div className="border-t border-blue-200/60 pt-3 space-y-2 text-xs sm:text-sm text-slate-800">
                  <p><strong>1. Harmonisation of Laws:</strong> The Court harmonised Section 16 of the Hindu Marriage Act with Section 6 of the Hindu Succession Act, ruling that constitutional principles of equality and social justice require that innocent children cannot be deprived of ancestral security due to the invalidity of their parents' marriage.</p>
                  <p><strong>2. The Mechanism of Notional Partition:</strong> Under Section 6(3) of the Hindu Succession Act, when a Hindu male coparcener dies, the law presumes a deemed or notional partition immediately before his death. The father's undivided coparcenary share is separated from the joint family estate.</p>
                  <p><strong>3. Entitlement to Parent's Share:</strong> The Supreme Court held that children born of void or voidable marriages are entitled to an equal inheritance share out of this separated coparcenary share of their father, alongside his other Class I legal heirs.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong>Important Limitation Clarified by Supreme Court:</strong> Children of void marriages do <em>not</em> become independent coparceners by birth in the ancestral joint family. Consequently, they cannot file a partition suit demanding a split while the father is still alive. Their right crystallizes only upon the parent’s death out of the parent’s own share.
              </div>
            </section>

            {/* SECTION 4: WHO GETS WHAT COMPREHENSIVE MATRIX TABLE */}
            <section id="who-gets-what-matrix" className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSpreadsheet className="w-4 h-4" />
                <span>Comparative Entitlements</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                4. Who Gets What: Comprehensive Rights Matrix Table
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                This authoritative reference matrix breaks down the exact legal rights of each family member across different property categories, with and without a Will:
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[680px]">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3 sm:p-4 font-bold border-r border-slate-700">Family Claimant</th>
                      <th className="p-3 sm:p-4 font-bold border-r border-slate-700">Legal Status</th>
                      <th className="p-3 sm:p-4 font-bold border-r border-slate-700">Self-Acquired Property</th>
                      <th className="p-3 sm:p-4 font-bold">Ancestral / Coparcenary Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {MATRIX_DATA.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                        <td className="p-3 sm:p-4 font-bold text-slate-900 border-r border-slate-200">
                          {row.category}
                        </td>
                        <td className="p-3 sm:p-4 border-r border-slate-200">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                              row.badgeColor === "emerald"
                                ? "bg-emerald-100 text-emerald-800"
                                : row.badgeColor === "blue"
                                ? "bg-blue-100 text-blue-800"
                                : row.badgeColor === "purple"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="p-3 sm:p-4 text-slate-700 border-r border-slate-200">
                          {row.selfAcquired}
                        </td>
                        <td className="p-3 sm:p-4 text-slate-700">
                          {row.ancestralCoparcenary}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-[11px] text-slate-500 italic">
                * Note: In self-acquired property, if the father leaves a valid Will, the terms of the Will supersede intestate succession.
              </div>
            </section>

            {/* SECTION 5: VISUAL BLUEPRINT / INFOGRAPHIC */}
            <section id="visual-blueprint" className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Eye className="w-4 h-4" />
                <span>Visual Legal Architecture</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                5. Visual Blueprint: Inheritance Law in Blended Families
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                The visual framework below illustrates how the Supreme Court and Indian succession statutes balance property claims between first and second families, ensuring that the innocent children are never left without economic protection:
              </p>

              {/* Responsive Next.js Image Container */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 group bg-slate-900/5">
                <div className="relative aspect-video w-full cursor-pointer" onClick={() => setShowImageModal(true)}>
                  <Image
                    src="/images/second-wife-children-property-rights-india.jpg"
                    alt="Second Wife and Children Property Rights in India Legal Framework and Court Precedents"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 850px"
                    className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-300"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-end justify-between p-4">
                    <span className="text-xs bg-slate-900/80 backdrop-blur-xs text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium">
                      <Eye className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Click to view full image</span>
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span><strong>Figure 1:</strong> Balancing property rights in blended families: Scales of justice and children&apos;s statutory legitimacy.</span>
                  <button
                    onClick={() => setShowImageModal(true)}
                    className="text-[#C65378] font-bold hover:underline inline-flex items-center gap-1 text-xs"
                  >
                    <span>Enlarge Blueprint</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 6: INTERACTIVE SHARE ESTIMATOR */}
            <section id="interactive-share-estimator" className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>Interactive Legal Tool</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                6. Interactive Share Estimator: Blended Family Tool
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Calculate the exact percentage and estimated value in Rupees each family member inherits under the Hindu Succession Act and Supreme Court guidelines when the father dies without a Will:
              </p>

              <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Parameter 1: Marriage Validity of 2nd Wife */}
                  <div>
                    <label className="block text-xs font-bold text-[#172228] mb-1.5">
                      Second Marriage Status
                    </label>
                    <select
                      value={secondMarriageType}
                      onChange={(e) => setSecondMarriageType(e.target.value as "valid" | "void")}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-[#C65378]"
                    >
                      <option value="void">Void / Bigamous (First Marriage Active)</option>
                      <option value="valid">Valid (After Divorce / First Wife Deceased)</option>
                    </select>
                  </div>

                  {/* Parameter 2: First Wife Alive? */}
                  <div>
                    <label className="block text-xs font-bold text-[#172228] mb-1.5">
                      Is First Wife Surviving?
                    </label>
                    <select
                      value={firstWifeAlive ? "yes" : "no"}
                      onChange={(e) => setFirstWifeAlive(e.target.value === "yes")}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-[#C65378]"
                    >
                      <option value="yes">Yes, First Wife is Alive</option>
                      <option value="no">No, First Wife is Deceased</option>
                    </select>
                  </div>

                  {/* Parameter 3: Number of First Marriage Children */}
                  <div>
                    <label className="block text-xs font-bold text-[#172228] mb-1.5">
                      Children from First Marriage
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="5"
                        value={numFirstChildren}
                        onChange={(e) => setNumFirstChildren(Number(e.target.value))}
                        className="w-full accent-[#C65378]"
                      />
                      <span className="text-sm font-bold text-[#172228] w-8 text-center">
                        {numFirstChildren}
                      </span>
                    </div>
                  </div>

                  {/* Parameter 4: Number of Second Marriage Children */}
                  <div>
                    <label className="block text-xs font-bold text-[#172228] mb-1.5">
                      Children from Second Marriage
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={numSecondChildren}
                        onChange={(e) => setNumSecondChildren(Number(e.target.value))}
                        className="w-full accent-[#C65378]"
                      />
                      <span className="text-sm font-bold text-[#172228] w-8 text-center">
                        {numSecondChildren}
                      </span>
                    </div>
                  </div>

                  {/* Parameter 5: Father's Mother Alive? */}
                  <div>
                    <label className="block text-xs font-bold text-[#172228] mb-1.5">
                      Is Father&apos;s Mother Alive? (Class I Heir)
                    </label>
                    <select
                      value={fatherMotherAlive ? "yes" : "no"}
                      onChange={(e) => setFatherMotherAlive(e.target.value === "yes")}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-[#C65378]"
                    >
                      <option value="no">No (Deceased)</option>
                      <option value="yes">Yes (Class I Heir)</option>
                    </select>
                  </div>

                  {/* Parameter 6: Estate Valuation in Lakhs */}
                  <div>
                    <label className="block text-xs font-bold text-[#172228] mb-1.5">
                      Estimated Property Value (in Lakhs)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="10"
                        max="2000"
                        step="5"
                        value={estateValueLakhs}
                        onChange={(e) => setEstateValueLakhs(Number(e.target.value))}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-[#C65378]"
                      />
                      <span className="text-xs font-bold text-slate-600 shrink-0">Lakhs (₹)</span>
                    </div>
                  </div>
                </div>

                {/* Calculation Output Cards */}
                <div className="pt-4 border-t border-[#172228]/10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[#55636D]">
                    <span>STATUTORY BREAKDOWN ({results.totalHeirsCount} EQUAL SHARES)</span>
                    <span className="text-[#C65378]">Intestate Succession Result</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <span className="text-[11px] font-bold text-slate-500 uppercase block">Each 2nd Marriage Child</span>
                      <span className="text-xl sm:text-2xl font-black text-[#C65378]">
                        {results.eachSecondChildPercent}%
                      </span>
                      <span className="text-xs text-slate-700 block mt-1 font-semibold">
                        ₹ {results.eachSecondChildRupees.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <span className="text-[11px] font-bold text-slate-500 uppercase block">Second Wife Entitlement</span>
                      <span className="text-xl sm:text-2xl font-black text-slate-900">
                        {results.secondWifePercent}%
                      </span>
                      <span className="text-xs text-slate-500 block mt-1">
                        {secondMarriageType === "void" ? "0% (Void Marriage - No Succession)" : `Class I Share: ₹ ${(results.eachSecondChildRupees).toLocaleString("en-IN")}`}
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <span className="text-[11px] font-bold text-slate-500 uppercase block">First Wife Entitlement</span>
                      <span className="text-xl sm:text-2xl font-black text-slate-900">
                        {results.firstWifePercent}%
                      </span>
                      <span className="text-xs text-slate-500 block mt-1">
                        {firstWifeAlive ? `Class I Share: ₹ ${(results.eachSecondChildRupees).toLocaleString("en-IN")}` : "0% (Deceased)"}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-white/80 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
                    <strong>Statutory Note:</strong> Under Section 8 and Section 10 of the Hindu Succession Act, property is divided equally per capita among all living Class I heirs. Because Section 16 of the HMA confers statutory legitimacy, each child of the second marriage receives the exact same share as each child of the first marriage.
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: SECOND WIFE RIGHTS (MAINTENANCE VS SUCCESSION) */}
            <section id="second-wife-own-rights" className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Heart className="w-4 h-4" />
                <span>Spousal Entitlements</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                7. Second Wife Rights: Maintenance vs Inheritance
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                A critical distinction in Indian matrimonial jurisprudence is the difference between the <strong>right to property inheritance</strong> and the <strong>right to maintenance</strong>. While an invalid second marriage denies succession rights under the Hindu Succession Act, courts have progressively created legal shields to prevent destitute women from being abandoned.
              </p>

              <div className="space-y-4 pt-2">
                <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
                  <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Maintenance Under Section 125 CrPC / BNSS</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    In the landmark case of <em>Badshah v. Urmila Badshah Godse (2014) 1 SCC 188</em>, the Supreme Court ruled that where a man marries a woman by concealing his first marriage, he cannot take advantage of his own wrongdoing to deny maintenance under Section 125 of the Criminal Procedure Code. The second wife is legally entitled to monthly financial maintenance.
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
                  <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
                    <Building className="w-4 h-4 text-blue-600" />
                    <span>Residence Rights Under Domestic Violence Act (PWDVA 2005)</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Under the Protection of Women from Domestic Violence Act, 2005, a woman who lived in a domestic relationship &ldquo;in the nature of marriage&rdquo; has a protected statutory right of residence in the shared household. The first family cannot summarily throw her onto the street upon the husband&apos;s demise without following due process of civil law.
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
                  <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#C65378]" />
                    <span>Why a Will is Her Only Guaranteed Inheritance Shield</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Because an invalid second marriage gives zero statutory inheritance under intestacy, the husband MUST execute a valid, registered Will specifically bequeathing self-acquired assets, life-interest in the residence, or dedicated financial investments to the second wife. Without a Will, she is completely dependent on discretionary court maintenance.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>Enforcement Protocol</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                8. Step-by-Step SOP: How to Claim Your Legal Share
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                If children or family members of a second marriage face resistance, exclusion, or illegal property sale attempts from the first family, follow this proven 6-stage legal protocol:
              </p>

              <div className="space-y-4">
                {[
                  {
                    step: "Stage 1",
                    title: "Gather Paternity and Identification Records",
                    desc: "Secure certified municipal birth certificates, school marksheets, Aadhaar cards, and passport copies clearly establishing the deceased father's parentage. This establishes statutory legitimacy under HMA Section 16.",
                  },
                  {
                    step: "Stage 2",
                    title: "Obtain Land Title Records and Sub-Registrar Extracts",
                    desc: "Procure certified copies of sale deeds from the local Sub-Registrar Office, along with the latest Khata, Jamabandi, or 7/12 extract from the Tehsil. Determine whether each asset is self-acquired or ancestral.",
                  },
                  {
                    step: "Stage 3",
                    title: "Lodge Formal Revenue Objections & Caveat",
                    desc: "Inspect the local revenue office for any pending unilateral mutation (Dakhil Kharij) applications filed by the first family. Submit a formal written objection and caveat before the Tehsildar or Municipal Commissioner.",
                  },
                  {
                    step: "Stage 4",
                    title: "Issue a Statutory Legal Notice for Partition",
                    desc: "Engage an advocate to issue a formal Legal Notice to all co-heirs, demanding partition by metes and bounds. Explicitly cite Section 16 HMA, Section 8 HSA, and the Supreme Court Revanasiddappa (2023) benchmark.",
                  },
                  {
                    step: "Stage 5",
                    title: "File Civil Suit for Partition & Injunction (CPC Order 39)",
                    desc: "If the first family refuses amicable partition, file a Civil Suit for Partition and Separate Possession under CPC Order 20 Rule 18 in District Court, together with an urgent temporary injunction application under CPC Order 39 Rules 1 & 2 to prevent any sale.",
                  },
                  {
                    step: "Stage 6",
                    title: "Secure Preliminary & Final Decree with Mutation",
                    desc: "Obtain a Preliminary Decree defining the exact share fractions, followed by a Final Decree appointing a Court Commissioner to divide properties physically. Mutate your separate share in government revenue records.",
                  },
                ].map((s, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="w-8 h-8 rounded-full bg-[#172228] text-white flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#C65378] mb-0.5">{s.step}</div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1">{s.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 9: PRINTABLE ACTION PROTOCOL & CHECKLIST */}
            <section id="printable-checklist-section" className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>Printable Legal Toolkit</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                9. Printable Legal Protocol: Blended Family Checklist
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Use this comprehensive, clause-annotated legal checklist to safeguard your inheritance and navigate revenue and court proceedings without procedural missteps:
              </p>

              <div className="relative rounded-2xl border border-slate-300 bg-slate-900 text-slate-100 p-5 font-mono text-xs overflow-hidden">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-700">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                    Format: Plain Text Legal Checklist &bull; Ready for Court / Advocate Use
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyChecklist}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-sans font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedChecklist ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Text</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handlePrint}
                      className="px-3 py-1.5 rounded-lg bg-[#C65378] hover:bg-[#a13c5d] text-white text-xs font-sans font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Checklist</span>
                    </button>
                  </div>
                </div>
                <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-96 pr-2 text-slate-300">
                  {PRINTABLE_CHECKLIST_TEXT}
                </pre>
              </div>
            </section>

            {/* SECTION 10: 6 COMMON INHERITANCE MYTHS */}
            <section id="inheritance-myths" className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertCircle className="w-4 h-4" />
                <span>Legal Clarity</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                10. 6 Dangerous Inheritance Myths in Second Marriages
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Misinformation surrounding blended family property rights often leads to families losing their lawful inheritance or entering into fraudulent settlements:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {MYTHS_DATA.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold text-sm shrink-0 mt-0.5">&#10006;</span>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {item.myth}
                      </p>
                    </div>
                    <div className="flex items-start gap-2 border-t border-slate-200/80 pt-2">
                      <span className="text-emerald-600 font-bold text-sm shrink-0 mt-0.5">&#10004;</span>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {item.reality}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 11: WHY A WILL IS ESSENTIAL (CONVERSION BRIDGE) */}
            <section id="why-a-will-is-essential" className="scroll-target bg-gradient-to-br from-[#172228] to-[#212F35] text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-300">
                <ShieldAlert className="w-4 h-4 text-[#C65378]" />
                <span>The Definitive Solution</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                11. Why a Will is Essential in Blended Families
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                When a person passes away without a Will (intestate), the law applies rigid statutory formulas that almost inevitably trigger bitter, multi-decade litigation between the first and second families. The absence of a Will leaves bank accounts frozen, properties locked in injunctions, and vulnerable family members penniless.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/15 space-y-1.5">
                  <strong className="block text-white font-bold">1. Guaranteed Shield for Second Wife</strong>
                  <p className="text-slate-300 leading-relaxed">
                    If the second marriage was technically void under Section 5(i), a Will is the ONLY legal instrument in India that can leave her self-acquired property, apartments, and bank funds.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/15 space-y-1.5">
                  <strong className="block text-white font-bold">2. Specific Bequests Avoid Conflict</strong>
                  <p className="text-slate-300 leading-relaxed">
                    Instead of leaving properties as undivided fractions where co-heirs fight over physical possession, a Will assigns specific properties to specific children.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/15 space-y-1.5">
                  <strong className="block text-white font-bold">3. Life Interest Protection</strong>
                  <p className="text-slate-300 leading-relaxed">
                    You can grant a &ldquo;Life Interest&rdquo; allowing your second wife to reside in the family home for her lifetime, after which the property seamlessly transfers to your children without dispute.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/15 space-y-1.5">
                  <strong className="block text-white font-bold">4. Impartial Executor Appointment</strong>
                  <p className="text-slate-300 leading-relaxed">
                    Appoint a trusted third-party executor (like a professional legal counsel or senior relative) to administer and distribute assets smoothly without sibling confrontation.
                  </p>
                </div>
              </div>

              <div className="pt-2 text-center sm:text-left">
                <button
                  onClick={handleStartWill}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/30 cursor-pointer text-sm sm:text-base"
                >
                  <span>Create Your Legally Verified Will in 15 Minutes</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* SECTION 12: OTHER PERSONAL LAWS (MUSLIM, CHRISTIAN & PARSI) */}
            <section id="other-personal-laws" className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>Comparative Personal Laws</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                12. Other Personal Laws: Muslim, Christian &amp; Parsi Rules
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Succession laws in India vary significantly across different religious communities. Here is how second marriage property rights operate for other communities:
              </p>

              <div className="space-y-3 pt-1">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
                  <strong className="block text-slate-900 font-bold mb-1">Muslim Law (Shariat Application Act, 1937):</strong>
                  Under Muslim Personal Law, polygamy up to four wives is legally recognized. Therefore, a second wife is a 100% legal wife. If the deceased husband has children, all surviving widows collectively share <strong>1/8th</strong> of his net estate equally between them. If there are no children, the widows share <strong>1/4th</strong>. Children of both wives inherit as full legitimate heirs (sons receive twice the share of daughters).
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
                  <strong className="block text-slate-900 font-bold mb-1">Christian Law (Indian Succession Act, 1925):</strong>
                  Christian law strictly mandates monogamy. Bigamous marriages are null and void under civil law. A second bigamous wife has no statutory inheritance right in the husband&apos;s estate. However, children born of such unions can be provided for via testamentary bequests (Wills) without restriction, as Christians enjoy complete testamentary freedom over their property.
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
                  <strong className="block text-slate-900 font-bold mb-1">Parsi Law (Parsi Marriage and Divorce Act, 1936):</strong>
                  Parsis are governed by strict monogamy rules. Bigamous unions are void. Under Chapter III of the Indian Succession Act, 1925, only legally wedded spouses and their legitimate children inherit upon intestacy.
                </div>
              </div>
            </section>

            {/* SECTION 13: FREQUENTLY ASKED QUESTIONS */}
            <section id="frequently-asked-questions" className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>Common Enquiries</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                Frequently Asked Questions: Second Wife &amp; Child Rights
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Direct, practical answers to common questions regarding second wife and child inheritance in India:
              </p>

              <div className="space-y-3 pt-2">
                {FAQ_ITEMS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-slate-900 bg-white hover:bg-slate-50 flex items-center justify-between gap-4 transition-colors cursor-pointer"
                      aria-expanded={openFaqIndex === idx}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                          openFaqIndex === idx ? "rotate-180 text-[#C65378]" : ""
                        }`}
                      />
                    </button>
                    {openFaqIndex === idx && (
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/50 border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 14: STATUTORY CITATIONS & AUTHORITIES */}
            <section id="statutory-citations" className="scroll-target bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4 border-t-2 border-t-[#C65378]">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>Statutory References</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                Statutory Citations: Acts &amp; Landmark Precedents
              </h2>
              <div className="text-xs sm:text-sm text-slate-700 space-y-2">
                <p>This guide is authored with reference to primary statutory provisions and Supreme Court authorities:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                  <li><strong>Hindu Marriage Act, 1955:</strong> Sections 5 (Conditions for Hindu Marriage), 11 (Void Marriages), 12 (Voidable Marriages), 16 (Legitimacy of Children of Void &amp; Voidable Marriages).</li>
                  <li><strong>Hindu Succession Act, 1956:</strong> Section 6 (Devolution of Interest in Coparcenary Property), Section 8 (General Rules of Succession in Male Intestacy), Section 10 (Distribution of Property among Class I Heirs), Section 30 (Testamentary Succession).</li>
                  <li><strong>Code of Civil Procedure, 1908:</strong> Order XX Rule 18 (Decree in Suit for Partition), Order XXXIX Rules 1 &amp; 2 (Temporary Injunctions).</li>
                  <li><strong>Supreme Court of India:</strong> <em>Revanasiddappa &amp; Ors. v. Mallikarjun &amp; Ors.</em> (2023) 10 SCC 1 &bull; <em>Badshah v. Urmila Badshah Godse</em> (2014) 1 SCC 188 &bull; <em>Vineeta Sharma v. Rakesh Sharma</em> (2020) 9 SCC 1.</li>
                </ul>
              </div>

              {/* Related internal guides */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-[#172228] uppercase tracking-wider block mb-2">
                  Related Internal Legal Resources
                </span>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/tools/succession-calculator"
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-[#C65378] text-slate-700 font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>Succession Calculator Tool</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    href="/blogs/married-daughter-rights-in-fathers-property"
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-[#C65378] text-slate-700 font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>Married Daughter Property Rights</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    href="/blogs/property-transfer-after-death-without-will-india"
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-[#C65378] text-slate-700 font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>Property Transfer After Death Without Will</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    href="/blogs/will-for-unmarried-childless-single-india"
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-[#C65378] text-slate-700 font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>Will for Single &amp; Childless Testators</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR CARDS
              ===================================================================== */}
          <aside className="space-y-6 sticky top-24">
            
            {/* CARD 1: AUTHOR BIO */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] flex items-center justify-center font-bold text-sm font-bold shrink-0">
                  AAM
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Advocate Anuj Anand Malik</h3>
                  <p className="text-[11px] font-bold text-[#C65378]">Senior Succession Counsel</p>
                  <p className="text-[10px] text-slate-500">WillDrafting.in</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Specialist in family estate planning, partition litigation, coparcenary disputes, and complex blended family succession in High Courts and the Supreme Court.
              </p>
              <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Counsel
                </span>
                <span>Bar Council Verified</span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-6 desktop-sidebar-only">
{/* CARD 2: EMERGENCY CTA CARD */}
            <div className="hidden lg:block bg-[#172228] text-white rounded-2xl p-6 shadow-md text-center space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                Blended Family Protection
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold leading-snug">
                Protect Your Second Family With a Valid Will
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Avoid multi-decade court battles between children of different marriages. Clearly bequeath properties, grant residence rights, and eliminate ambiguity.
              </p>
              <button
                onClick={handleStartWill}
                className="w-full py-3 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-md cursor-pointer text-xs sm:text-sm"
              >
                Start Your Will Online
              </button>
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <Lock className="w-3 h-3 text-[#5F7E75]" />
                <span>100% Confidential &amp; Advocate Verified</span>
              </div>
            </div>

            {/* CARD 3: TRUST & BENEFITS CHECKLIST */}
            <div className="hidden lg:block bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3">
              <div className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                Why Plan With WillDrafting.in
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Statutorily Verified:</strong> Clauses strictly compliant with Section 63 ISA &amp; Section 30 HSA.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Dispute Elimination:</strong> Clear bequests leave zero room for bitter sibling litigation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Life Interest Clauses:</strong> Protect your spouse&apos;s lifelong residence rights.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Advocate Consultation:</strong> Direct legal counsel from WillDrafting.in succession advocates.</span>
                </li>
              </ul>
            </div>

            {/* CARD 4: RELATED GUIDES */}
            <div className="hidden lg:block bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3">
              <div className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                Related Succession Guides
              </div>
              <div className="space-y-2">
                <Link
                  href="/blogs/married-daughter-rights-in-fathers-property"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/40 transition-colors group"
                >
                  <p className="font-bold text-slate-900 text-xs group-hover:text-[#C65378] transition-colors">
                    Married Daughter Rights
                  </p>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                    Vineeta Sharma &bull; Ancestral Property &rarr;
                  </span>
                </Link>

                <Link
                  href="/blogs/property-transfer-after-death-without-will-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/40 transition-colors group"
                >
                  <p className="font-bold text-slate-900 text-xs group-hover:text-[#C65378] transition-colors">
                    Property Transfer After Death
                  </p>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                    Mutation &bull; Succession Roadmap &rarr;
                  </span>
                </Link>

                <Link
                  href="/blogs/how-to-challenge-a-will-in-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/40 transition-colors group"
                >
                  <p className="font-bold text-slate-900 text-xs group-hover:text-[#C65378] transition-colors">
                    How to Challenge a Will
                  </p>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                    Legal Grounds &bull; Limitation Period &rarr;
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
                  href="/blogs/married-daughter-rights-in-fathers-property"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Married Daughter Property Rights
                </Link>
                <Link
                  href="/blogs/property-transfer-after-death-without-will-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Property Transfer After Death
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
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* FULLSCREEN IMAGE MODAL */}
      {showImageModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 bg-slate-800 text-white">
              <span className="text-xs sm:text-sm font-bold">
                Second Wife and Children Property Rights in India &bull; Visual Legal Architecture
              </span>
              <button
                onClick={() => setShowImageModal(false)}
                className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>
            <div className="relative aspect-video w-full">
              <Image
                src="/images/second-wife-children-property-rights-india.jpg"
                alt="Second Wife and Children Property Rights in India Full Diagram"
                fill
                className="object-contain"
              />
            </div>
            <div className="p-4 bg-slate-800 text-xs text-slate-300 text-center">
              Statutory Protection under Section 16 Hindu Marriage Act &amp; Revanasiddappa (2023) Supreme Court Precedent.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
