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
} from "lucide-react";

const TOC_ITEMS = [
  { id: "executive-summary", label: "Executive Summary: Daughter Rights" },
  { id: "rights-matrix-2x2", label: "1. The 2x2 Property Rights Matrix" },
  { id: "hindu-succession-act-2005", label: "2. Hindu Succession Act 2005" },
  { id: "vineeta-sharma-judgment", label: "3. Vineeta Sharma (2020) Ruling" },
  { id: "self-acquired-property-rules", label: "4. Self-Acquired Property Rules" },
  { id: "ancestral-property-rules", label: "5. Ancestral Property & Coparcenary" },
  { id: "succession-share-calculator", label: "6. Interactive Share Calculator" },
  { id: "visual-blueprint", label: "7. Visual Blueprint: Inheritance Law" },
  { id: "step-by-step-sop", label: "8. SOP: If Your Share Is Denied" },
  { id: "relinquishment-noc-warning", label: "9. Coercive Relinquishment & NOCs" },
  { id: "stridhan-distinction", label: "10. Stridhan vs Father's Property" },
  { id: "myths-vs-reality", label: "11. 6 Common Inheritance Myths" },
  { id: "protect-with-will", label: "12. Protect Rights With a Will" },
  { id: "other-religions-succession", label: "13. Muslim, Christian & Parsi Laws" },
  { id: "frequently-asked-questions", label: "14. Frequently Asked Questions" },
  { id: "statutory-citations", label: "15. Acts & Landmark Precedents" },
];

const PRINTABLE_CHECKLIST_TEXT = `================================================================================
MARRIED DAUGHTER PROPERTY RIGHTS LEGAL PROTOCOL (INDIA)
Statutory Authority: Hindu Succession Act, 1956 (Sections 6, 8, 14, 30)
Supreme Court Authority: Vineeta Sharma v. Rakesh Sharma (2020) 9 SCC 1
Prepared by WillDrafting.in - Powered by AMA Legal Solutions
================================================================================

PHASE 1: TITLE & PROPERTY CLASSIFICATION (DAYS 1 TO 15)
[ ] Step 1.1: Determine property type: Ancestral (4 generations undivided) vs Father's Self-Acquired.
[ ] Step 1.2: Obtain certified copies of Title Deeds, Registered Sale Deeds, or Patta from Sub-Registrar.
[ ] Step 1.3: Secure latest Record of Rights (7/12 extract in MH/GJ, Jamabandi in PB/HR, Khata in KA).
[ ] Step 1.4: Obtain official death certificates of father and mother from the local Municipal Corporation.
[ ] Step 1.5: Verify whether any registered partition deed was signed and registered prior to Dec 20, 2004.

PHASE 2: PREVENTING UNILATERAL MUTATION & ENCUMBRANCE (DAYS 16 TO 30)
[ ] Step 2.1: Check local Tehsil or Municipal revenue office for any pending mutation (Dakhil Kharij) applications.
[ ] Step 2.2: NEVER sign blank papers, affidavits, or unverified No Objection Certificates (NOCs).
[ ] Step 2.3: If brothers apply for unilateral mutation, file a written objection before the Revenue Tehsildar.
[ ] Step 2.4: Attach proof of daughterhood (Birth Certificate, 10th marksheet, Aadhaar, Passport).

PHASE 3: FORMAL LEGAL DEMAND & SETTLEMENT ATTEMPTS (DAYS 31 TO 45)
[ ] Step 3.1: Engage a verified succession advocate to review family pedigree and title records.
[ ] Step 3.2: Issue a formal Legal Notice to all legal heirs demanding partition by metes and bounds.
[ ] Step 3.3: Specify the exact coparcenary share (under HSA Section 6) or Class I share (under HSA Section 8).
[ ] Step 3.4: Provide 15 to 30 days statutory notice period for peaceful amicable execution of a Partition Deed.

PHASE 4: CIVIL COURT PROCEEDINGS (IF SHARE IS DENIED)
[ ] Step 4.1: File a Civil Suit for Partition & Separate Possession under CPC Order 20 Rule 18 in District Court.
[ ] Step 4.2: File an urgent Application for Temporary Injunction under CPC Order 39 Rules 1 & 2.
[ ] Step 4.3: Secure court order restraining brothers/relatives from selling, mortgaging, or creating third-party rights.
[ ] Step 4.4: Challenge fraudulent mutation entries or unregistered partition documents set up after 2004.
[ ] Step 4.5: Obtain Preliminary Decree declaring share, followed by Court Commissioner's physical division (Final Decree).

================================================================================
CRITICAL LEGAL REMINDER: Under the Supreme Court's ruling in Vineeta Sharma (2020),
a daughter becomes an equal coparcener by birth. Her marriage does not alter her
rights, and the father does not need to have been alive in 2005.
For confidential advocate counsel, visit WillDrafting.in or call AMA Legal Solutions.
================================================================================`;

const MATRIX_DATA = [
  {
    id: "quad-1",
    propType: "Ancestral Property",
    willStatus: "Without Will (Intestate)",
    tag: "Equal Coparcener by Birth",
    daughterShare: "Equal to Son",
    description:
      "Daughter inherits an equal undivided coparcenary share alongside sons and father by birth under Section 6 of the Hindu Succession Act. Her marital status has zero effect.",
    canDisinherit: "No. Father cannot exclude her from ancestral property.",
    legalBasis: "HSA Section 6 (Amended 2005) & Vineeta Sharma (2020)",
    color: "emerald",
  },
  {
    id: "quad-2",
    propType: "Ancestral Property",
    willStatus: "With Father's Will",
    tag: "Protected Birthright Share",
    daughterShare: "Protected Coparcenary Share",
    description:
      "Under Section 30 of HSA, a father can ONLY bequeath his own notional undivided coparcenary share. He CANNOT Will away the daughter's independent birthright coparcenary share.",
    canDisinherit: "No. The daughter's own coparcenary share remains completely protected.",
    legalBasis: "HSA Section 30 read with Section 6(1)",
    color: "blue",
  },
  {
    id: "quad-3",
    propType: "Self-Acquired Property",
    willStatus: "Without Will (Intestate)",
    tag: "Class I Legal Heir",
    daughterShare: "Equal Per-Capita Share",
    description:
      "When the father dies without a Will, all self-acquired properties divide equally among all Class I legal heirs (mother, widow, sons, and married daughters) under Section 8.",
    canDisinherit: "No. Intestacy guarantees an equal share to all Class I heirs.",
    legalBasis: "HSA Section 8 & Schedule Class I",
    color: "purple",
  },
  {
    id: "quad-4",
    propType: "Self-Acquired Property",
    willStatus: "With Father's Will",
    tag: "Testamentary Discretion",
    daughterShare: "As Specified in Will",
    description:
      "The father has 100% absolute ownership and testamentary freedom. He can bequeath self-acquired property to anyone. If excluded, daughter cannot claim unless the Will is challenged for fraud, coercion, or lack of capacity.",
    canDisinherit: "Yes. Father may exclude any heir from self-acquired property through a valid Will.",
    legalBasis: "HSA Section 30 & Indian Succession Act Section 59",
    color: "amber",
  },
];

const MYTHS_LIST = [
  {
    myth: "Married daughters lose all property rights once they leave for their matrimonial home.",
    reality:
      "Completely False. The Hindu Succession (Amendment) Act, 2005 eliminated any distinction between married and unmarried daughters. A daughter remains a lifelong coparcener of her parental family by birth.",
  },
  {
    myth: "If the father died before September 9, 2005, the daughter cannot claim ancestral property.",
    reality:
      "Completely False. The landmark Supreme Court ruling in Vineeta Sharma v. Rakesh Sharma (2020) declared that coparcenary rights are acquired by birth. The father did not need to be alive on September 9, 2005.",
  },
  {
    myth: "Receiving jewelry, cash, or wedding gifts (Stridhan) means a daughter gave up her inheritance.",
    reality:
      "Completely False. Stridhan belongs exclusively to the woman under Section 14 of HSA. Receiving marriage gifts does not extinguish or waive statutory inheritance in parental ancestral or intestate property.",
  },
  {
    myth: "Brothers can sell ancestral family property without their married sister's signature.",
    reality:
      "Completely False. Since a daughter is an equal coparcener holding an undivided share, any alienation or sale of ancestral property without her registered consent is voidable and can be stayed by a civil court.",
  },
  {
    myth: "A daughter cannot act as the Karta (manager) of a Hindu Undivided Family (HUF).",
    reality:
      "Completely False. The Delhi High Court in Mrs. Sujata Sharma v. Shri Manu Gupta (2015) ruled that the eldest coparcener, whether male or female, married or unmarried, has the legal right to become Karta.",
  },
  {
    myth: "If the local revenue tehsildar entered only the brother's name in the Patta/Khata, the sister has lost her rights.",
    reality:
      "Completely False. The Supreme Court has repeatedly held that revenue mutation is merely for fiscal tax collection and does not decide or extinguish title. Title remains intact until formal registered partition.",
  },
];

export default function MarriedDaughterRightsClient() {
  const router = useRouter();
  const { data: session } = useSession();

  // Active section tracking for TOC
  const [activeSection, setActiveSection] = useState<string>("executive-summary");
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);
  const [selectedMatrixId, setSelectedMatrixId] = useState<string>("quad-1");
  const [showImageModal, setShowImageModal] = useState<boolean>(false);

  // Interactive Share Calculator State
  const [calcPropertyType, setCalcPropertyType] = useState<"ancestral" | "self-acquired-no-will">("ancestral");
  const [calcMotherAlive, setCalcMotherAlive] = useState<boolean>(true);
  const [calcNumSons, setCalcNumSons] = useState<number>(1);
  const [calcNumDaughters, setCalcNumDaughters] = useState<number>(1);
  const [calcEstateValueLakhs, setCalcEstateValueLakhs] = useState<number>(100);

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

  // Dynamic Calculation of Inheritance Share
  const calculateShare = () => {
    let totalShares = 0;
    let daughterPercent = 0;
    let descriptionText = "";

    if (calcPropertyType === "ancestral") {
      // In ancestral coparcenary property (assuming father's branch with father, sons, daughters)
      // Daughters and sons are equal coparceners by birth
      const totalCoparceners = (calcMotherAlive ? 1 : 0) + calcNumSons + calcNumDaughters;
      totalShares = totalCoparceners > 0 ? totalCoparceners : 1;
      daughterPercent = 100 / totalShares;
      descriptionText = `Under HSA Section 6 & Vineeta Sharma (2020), each daughter and son is an equal coparcener by birth. Divided among ${totalShares} primary heirs/coparceners.`;
    } else {
      // Self-acquired without Will: Section 8 Class I legal heirs
      const totalClass1Heirs = (calcMotherAlive ? 1 : 0) + calcNumSons + calcNumDaughters;
      totalShares = totalClass1Heirs > 0 ? totalClass1Heirs : 1;
      daughterPercent = 100 / totalShares;
      descriptionText = `Under HSA Section 8, self-acquired property devolves equally per-capita among all Class I heirs (mother/widow, sons, daughters). Divided among ${totalShares} heirs.`;
    }

    const estimatedValueRupees = (calcEstateValueLakhs * 100000 * (daughterPercent / 100));

    return {
      totalShares,
      daughterPercent: Number(daughterPercent.toFixed(2)),
      estimatedValueRupees: Math.round(estimatedValueRupees),
      descriptionText,
    };
  };

  const calcResults = calculateShare();

  const FAQ_ITEMS = [
    {
      q: "Does a married daughter have equal rights in her father's ancestral property?",
      a: "Yes. Under Section 6 of the Hindu Succession Act as amended in 2005, a daughter becomes a coparcener by birth with the exact same rights and liabilities as a son. Her marital status has zero legal impact on her coparcenary entitlement.",
    },
    {
      q: "Can a father disinherit his married daughter from self-acquired property through a Will?",
      a: "Yes. Under Section 30 of the Hindu Succession Act, an individual enjoys absolute testamentary freedom over self-acquired property. A father can bequeath his self-acquired property to anyone he chooses, including excluding daughters, provided the Will is genuine, properly executed, and uncoerced.",
    },
    {
      q: "Does it matter if the father passed away before the 2005 amendment?",
      a: "No. The Supreme Court in Vineeta Sharma v. Rakesh Sharma (2020) ruled that coparcenary rights are acquired by birth. Therefore, the father does not need to have been alive on September 9, 2005, provided no registered partition or court decree was finalized before December 20, 2004.",
    },
    {
      q: "Does receiving gold, cash, or gifts at marriage disqualify a daughter from property inheritance?",
      a: "No. Gifts received by a woman during wedding celebrations constitute her Stridhan under Section 14 of the Hindu Succession Act. Stridhan belongs entirely to the woman and does not extinguish or reduce her independent statutory inheritance share in her father's ancestral or intestate estate.",
    },
    {
      q: "Can brothers sell or partition ancestral property without the married sister's signature?",
      a: "No. As an equal coparcener, the daughter holds an undivided share in ancestral property. Any sale deed, transfer, mortgage, or partition executed without her written consent and registered signature is legally voidable and can be challenged in a civil court.",
    },
    {
      q: "Can a married daughter become the Karta (manager) of a Hindu Undivided Family (HUF)?",
      a: "Yes. The Delhi High Court in Mrs. Sujata Sharma v. Shri Manu Gupta (2015) affirmed that since the 2005 amendment conferred equal coparcenary status on daughters, the eldest coparcener of an HUF, whether male or female, married or unmarried, is legally entitled to act as Karta.",
    },
    {
      q: "What if brothers mutated the father's property exclusively in their names in revenue records?",
      a: "Revenue mutation (dakhil kharij) is purely for property tax collection purposes and does not create or extinguish legal ownership title. The Supreme Court has repeatedly confirmed that an illegal or unilateral mutation does not strip a daughter of her lawful coparcenary or Class I inheritance rights.",
    },
    {
      q: "What is a married daughter's right in her father's self-acquired property if he dies without a Will?",
      a: "If the father dies intestate (without a Will), his self-acquired property devolves equally upon all Class I legal heirs under Section 8 of the Hindu Succession Act. The married daughter inherits an equal per-capita share alongside her mother, brothers, and sisters.",
    },
    {
      q: "Can a daughter be forced to sign a No Objection Certificate (NOC) or Release Deed?",
      a: "No. Relinquishment of property rights must be completely voluntary. Under Section 17 of the Registration Act, 1908, any relinquishment of immovable property valued over Rs 100 must be executed via a registered deed with appropriate stamp duty. Unregistered affidavits or coerced NOCs have no legal standing to divest title.",
    },
    {
      q: "What is the time limitation period for a married daughter to file a partition suit?",
      a: "Under Article 110 of the Limitation Act, 1963, the limitation period to enforce a right to share in joint family property is 12 years from the date when the exclusion from the property becomes known to the claimant. Prompt legal action upon learning of exclusion is strongly recommended.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Charcoal Navy)
      ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold uppercase tracking-wider text-rose-200">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>Family Rights & Women&apos;s Succession Guide</span>
          </div>

          {/* H1 Title: Strict SEO Compliance (51 characters, distinct from page title) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
            Married Daughter Rights in Father Property in India
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            A complete statutory breakdown under the Hindu Succession Act, the 2005 Amendment,
            and the landmark Supreme Court ruling in <em>Vineeta Sharma</em>. Understand ancestral coparcenary
            birthrights, self-acquired property, and what to do if your share is denied.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={handleStartWill}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/20 cursor-pointer"
            >
              <span>Protect Your Daughter - Draft a Will</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection("succession-share-calculator")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold border border-white/20 transition-all cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-rose-300" />
              <span>Calculate Inheritance Share</span>
            </button>
          </div>

          {/* Trust Metadata Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-300 border-t border-white/10">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#5F7E75]" />
              Updated: October 2026
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Reviewed by Senior Succession Advocates
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Gavel className="w-3.5 h-3.5 text-amber-300" />
              Supreme Court Bench Compliant
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-300" />
              12 Min Practical Read
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Full-Width Social Proof)
      ========================================================================= */}
      <section className="w-full bg-gradient-to-r from-[#FAF7F0] via-white to-[#FAF7F0] border-y border-[#172228]/10 py-5 sm:py-6 shadow-[0_2px_10px_rgba(23,34,40,0.02)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-x-3 gap-y-6 md:gap-0">
            <div className="text-center md:border-r border-[#172228]/10 px-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Equal Share</p>
              <p className="text-xs uppercase font-bold tracking-wider text-[#C65378] mt-1">
                Same Rights as Sons Since 2005
              </p>
            </div>
            <div className="text-center md:border-r border-[#172228]/10 px-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#172228]">By Birth</p>
              <p className="text-xs uppercase font-bold tracking-wider text-[#5F7E75] mt-1">
                Coparcenary Right in Ancestral Property
              </p>
            </div>
            <div className="text-center md:border-r border-[#172228]/10 px-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Vineeta Sharma</p>
              <p className="text-xs uppercase font-bold tracking-wider text-[#C65378] mt-1">
                2020 SC 3-Judge Bench Authority
              </p>
            </div>
            <div className="text-center px-3">
              <div className="flex items-center justify-center gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#172228]">4.9 / 5</span>
                <span className="text-amber-500 font-bold text-lg">★</span>
              </div>
              <p className="text-xs uppercase font-bold tracking-wider text-slate-600 mt-1">
                12,000+ Families Advised Nationwide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN EDITORIAL GRID
      ========================================================================= */}
      <main className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_300px] xl:grid-cols-[280px_minmax(0,1fr)_330px] gap-8 items-start">
          {/* =====================================================================
              LEFT COLUMN: Table of Contents & Quick Action Tools (Sticky)
          ===================================================================== */}
          <aside className="hidden lg:block sticky top-28 self-start space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <span className="text-xs font-black uppercase tracking-wider text-[#172228] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#C65378]" />
                  Contents Guide
                </span>
                <span className="text-[10px] bg-[#FAF2EB] text-[#C65378] font-bold px-2 py-0.5 rounded-full">
                  15 Sections
                </span>
              </div>

              <nav className="space-y-1 max-h-[65vh] overflow-y-auto pr-1 text-xs">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-all flex items-center justify-between group cursor-pointer ${
                        isActive
                          ? "bg-[#FAF2EB] text-[#C65378] font-bold shadow-xs border-l-2 border-[#C65378]"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C65378] shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                <button
                  onClick={handleCopyChecklist}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-all cursor-pointer"
                >
                  {copiedChecklist ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Protocol Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Copy Legal Protocol</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handlePrint}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-all cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  <span>Print Article / SOP</span>
                </button>
              </div>
            </div>

            {/* Quick Diagnostic Card */}
            <div className="rounded-2xl bg-[#FAF2EB] border border-[#C65378]/20 p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>Succession Calculator</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Test different family structures, intestate shares, and Stridhan calculations instantly.
              </p>
              <Link
                href="/tools/succession-calculator"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#C65378] hover:text-[#a13c5d] group"
              >
                <span>Open Calculator Tool</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: Rich Editorial Content & Interactive Features
          ===================================================================== */}
          <article className="min-w-0 space-y-10">
            {/* EXECUTIVE SUMMARY */}
            <section
              id="executive-summary"
              className="scroll-target rounded-2xl bg-[#FAF2EB] border-l-[5px] border-l-[#C65378] p-6 sm:p-7 shadow-xs space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>Executive Summary</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                Executive Summary: Married Daughter Rights in Father Property
              </h2>
              <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  Until September 9, 2005, married Hindu daughters were treated as members of their husband&apos;s
                  family and possessed severely limited rights in their father&apos;s ancestral estate. The landmark{" "}
                  <strong>Hindu Succession (Amendment) Act, 2005</strong>, followed by the definitive Supreme Court
                  ruling in <strong>Vineeta Sharma v. Rakesh Sharma (2020) 9 SCC 1</strong>, fundamentally transformed
                  Indian property law by establishing complete gender equality.
                </p>
                <p>
                  Today, an Indian daughter acquires coparcenary rights <strong>by birth</strong>. Marriage does not
                  affect her legal entitlement. In ancestral coparcenary property, she holds the exact same birthright
                  share as a son. In self-acquired property, if her father dies without a Will, she is a prime Class I
                  legal heir entitled to an equal per-capita share. However, if the father leaves a valid Will
                  bequeathing his self-acquired property exclusively to sons or third parties, he possesses full legal
                  freedom to do so.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white rounded-xl p-3 border border-slate-200/80">
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Ancestral Property</p>
                  <p className="text-sm font-extrabold text-emerald-700">100% Equal Birthright</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Cannot be disinherited by Will</p>
                </div>
                <div className="bg-white rounded-xl p-3 border border-slate-200/80">
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Self-Acquired (No Will)</p>
                  <p className="text-sm font-extrabold text-[#C65378]">Equal Class I Heir</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Equal share with mother &amp; brothers</p>
                </div>
                <div className="bg-white rounded-xl p-3 border border-slate-200/80">
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Father Died Pre-2005</p>
                  <p className="text-sm font-extrabold text-blue-700">Rights Protected</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Supreme Court Vineeta Sharma verdict</p>
                </div>
              </div>
            </section>

            {/* SECTION 1: 2x2 RIGHTS MATRIX */}
            <section id="rights-matrix-2x2" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>Statutory Decision Matrix</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                1. Ancestral vs Self-Acquired: The 2x2 Property Rights Matrix
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                A married daughter&apos;s legal inheritance rights depend on two critical legal variables:{" "}
                <strong>(1) Property Nature</strong> (Ancestral vs Self-Acquired) and <strong>(2) Testamentary Status</strong>{" "}
                (With a Will vs Without a Will). Below is the comprehensive 2x2 rights matrix governing Indian succession.
              </p>

              {/* Interactive Matrix Selector Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MATRIX_DATA.map((quad) => {
                  const isSelected = selectedMatrixId === quad.id;
                  return (
                    <div
                      key={quad.id}
                      onClick={() => setSelectedMatrixId(quad.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-white border-[#C65378] shadow-md ring-2 ring-[#C65378]/20"
                          : "bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                          {quad.propType} • {quad.willStatus}
                        </span>
                        <span
                          className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                            quad.color === "emerald"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : quad.color === "blue"
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : quad.color === "purple"
                              ? "bg-purple-50 text-purple-700 border border-purple-200"
                              : "bg-amber-50 text-amber-800 border border-amber-200"
                          }`}
                        >
                          {quad.tag}
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900 mb-1">
                        Daughter&apos;s Share: {quad.daughterShare}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                        {quad.description}
                      </p>
                      <div className="pt-2 border-t border-slate-100 flex flex-col gap-1 text-[11px]">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-semibold">Can Father Disinherit?</span>
                          <span className="font-bold text-slate-800">{quad.canDisinherit}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-semibold">Statutory Authority:</span>
                          <span className="font-bold text-[#C65378]">{quad.legalBasis}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Matrix Comparison Table for SEO & Quick Reference */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3.5 font-bold border-b border-slate-700">Property Category</th>
                      <th className="p-3.5 font-bold border-b border-slate-700">Scenario</th>
                      <th className="p-3.5 font-bold border-b border-slate-700">Daughter&apos;s Legal Entitlement</th>
                      <th className="p-3.5 font-bold border-b border-slate-700">Father&apos;s Testamentary Power</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Ancestral Property</td>
                      <td className="p-3.5 text-slate-600">Without Will (Intestate)</td>
                      <td className="p-3.5 font-bold text-emerald-700">
                        Equal Coparcener Share by birth (same as brother)
                      </td>
                      <td className="p-3.5 text-slate-600">Zero power to disinherit coparceners</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Ancestral Property</td>
                      <td className="p-3.5 text-slate-600">Father Leaves a Will</td>
                      <td className="p-3.5 font-bold text-blue-700">
                        Protected birthright share cannot be touched
                      </td>
                      <td className="p-3.5 text-slate-600">
                        Father can only Will his notional share (Section 30)
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Self-Acquired Property</td>
                      <td className="p-3.5 text-slate-600">Without Will (Intestate)</td>
                      <td className="p-3.5 font-bold text-purple-700">
                        Equal Class I legal heir share with mother &amp; sons
                      </td>
                      <td className="p-3.5 text-slate-600">Devolves strictly by Section 8 rules</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Self-Acquired Property</td>
                      <td className="p-3.5 text-slate-600">Father Leaves a Will</td>
                      <td className="p-3.5 font-bold text-amber-800">
                        Only what is explicitly bequeathed in the Will
                      </td>
                      <td className="p-3.5 text-slate-600">
                        100% absolute freedom to bequeath or exclude
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 2: HINDU SUCCESSION ACT 2005 */}
            <section id="hindu-succession-act-2005" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>Statutory Authority</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                2. Hindu Succession Act 2005: Equal Coparcenary by Birth
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  The foundational charter of daughters&apos; property rights in India is the{" "}
                  <strong>Hindu Succession (Amendment) Act, 2005</strong>, which substituted Section 6 of the original
                  1956 Act with effect from <strong>September 9, 2005</strong>.
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-[#C65378] space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                    Text of Section 6(1), Hindu Succession Act, 1956 (As Amended):
                  </p>
                  <blockquote className="text-slate-800 italic text-xs sm:text-sm">
                    &ldquo;On and from the commencement of the Hindu Succession (Amendment) Act, 2005, in a Joint Hindu
                    family governed by the Mitakshara law, the daughter of a coparcener shall:
                    <br />
                    (a) by birth become a coparcener in her own right in the same manner as the son;
                    <br />
                    (b) have the same rights in the coparcenary property as she would have had if she had been a son;
                    <br />
                    (c) be subject to the same liabilities in respect of the said coparcenary property as that of a son...&rdquo;
                  </blockquote>
                </div>

                <p>
                  Prior to this amendment, daughters were mere members of a Hindu Undivided Family (HUF), while sons
                  alone held the privileged status of coparceners. A member had maintenance rights and marriage expense
                  claims, but could never demand partition of the ancestral family estate. The 2005 amendment
                  eliminated this patriarchal barrier.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#FAF2EB] border border-[#C65378]/20 space-y-1.5">
                    <p className="font-bold text-sm text-[#C65378] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Rights Conferred on Daughters
                    </p>
                    <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                      <li>Equal right to demand partition of ancestral property</li>
                      <li>Equal undivided share in Mitakshara coparcenary property</li>
                      <li>Right to reside in parental family home</li>
                      <li>Eligibility to become Karta (manager) of the HUF</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <p className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      Corresponding Liabilities
                    </p>
                    <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                      <li>Equal responsibility for ancestral coparcenary debts</li>
                      <li>Subject to pious obligations under ancestral estate rules</li>
                      <li>Liable in partition accounting for family business losses</li>
                      <li>Liable to clear genuine joint family obligations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: VINEETA SHARMA JUDGMENT */}
            <section id="vineeta-sharma-judgment" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>Landmark Supreme Court Precedent</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                3. Vineeta Sharma (2020) Ruling: Retrospective Legal Equality
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  Following the 2005 amendment, Indian courts were divided by conflicting judgments regarding whether a
                  daughter could claim coparcenary rights if her father had died before September 9, 2005.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-100">
                    <p className="text-xs font-black text-rose-800 uppercase tracking-wider">The Old Conflict (2016)</p>
                    <p className="text-sm font-bold text-slate-900 mt-1">Prakash v. Phulavati (2016) 2 SCC 36</p>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      A 2-judge bench held that the 2005 amendment applied only to &ldquo;living daughters of living
                      coparceners&rdquo; as on September 9, 2005. If the father had died prior to September 9, 2005,
                      daughters were denied coparcenary status.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100">
                    <p className="text-xs font-black text-emerald-800 uppercase tracking-wider">The Final Settlement (2020)</p>
                    <p className="text-sm font-bold text-slate-900 mt-1">Vineeta Sharma v. Rakesh Sharma (2020) 9 SCC 1</p>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      A 3-judge bench headed by Justice Arun Mishra overruled <em>Phulavati</em> and held that coparcenary
                      rights are acquired <strong>by birth</strong>, not by the father&apos;s death. The father does{" "}
                      <strong>NOT</strong> need to be alive on September 9, 2005.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F0] border-l-4 border-[#5F7E75] text-xs sm:text-sm text-slate-800 space-y-1.5">
                  <p className="font-extrabold text-slate-900">
                    Justice Arun Mishra&apos;s Celebrated Words in Paragraph 137:
                  </p>
                  <p className="italic text-slate-700">
                    &ldquo;Daughters have to be given equal rights of inheritance as sons to ensure equality. A daughter
                    remains a loving daughter throughout her life. The coparcenary right is by birth. It is not
                    necessary that the father coparcener should be living as on September 9, 2005.&rdquo;
                  </p>
                </div>

                <h3 className="text-base font-bold text-slate-900 pt-2">The Sole Exception: Registered Pre-2004 Partitions</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Under the proviso to Section 6(1), the only scenario where a daughter cannot overturn an earlier
                  division is if the ancestral property was partitioned by a <strong>registered partition deed</strong>{" "}
                  or finalized by a <strong>court decree</strong> prior to <strong>December 20, 2004</strong>.
                  Crucially, oral family settlements or unregistered partition papers claimed to have occurred before 2004
                  are scrutinized strictly by courts and generally rejected if set up to defraud daughters.
                </p>
              </div>
            </section>

            {/* SECTION 4: SELF-ACQUIRED PROPERTY */}
            <section id="self-acquired-property-rules" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>Property Classification</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                4. Self-Acquired Property: Rules With and Without a Will
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  Self-acquired property is any asset purchased by the father using his own earnings, savings, business
                  income, bank loans, or received as an exclusive gift or inheritance under a separate Will. Unlike
                  ancestral property, children have <strong>no birthright</strong> in their father&apos;s self-acquired
                  assets during his lifetime.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2">
                    <div className="flex items-center gap-2 text-rose-800 font-extrabold text-sm">
                      <FileCheck className="w-4 h-4 text-[#C65378]" />
                      <span>If Father Leaves a Valid Will (Testate)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Section 30 of the Hindu Succession Act, an owner of self-acquired property enjoys complete
                      testamentary freedom. He can bequeath the property to his sons, his wife, a charity, or any third
                      party.
                    </p>
                    <p className="text-xs font-semibold text-slate-800">
                      Can a married daughter challenge this? Only if the Will was forged, executed under undue influence,
                      or if the father lacked testamentary capacity (unsound mind).
                    </p>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-4 bg-[#FAF2EB] space-y-2">
                    <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm">
                      <Users className="w-4 h-4 text-emerald-600" />
                      <span>If Father Dies Without a Will (Intestate)</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Section 8 of the Hindu Succession Act, the self-acquired estate devolves simultaneously upon
                      all <strong>Class I Legal Heirs</strong> in equal per-capita shares.
                    </p>
                    <p className="text-xs font-semibold text-slate-800">
                      Class I heirs include: Mother, Widow, Sons, and Daughters. A married daughter receives the EXACT same
                      share as her brother or mother.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-xs sm:text-sm text-slate-700 flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Practical Example:</strong> If a father leaves a self-acquired house worth ₹1 Crore and passes
                    away without a Will, leaving behind his wife, one son, and two married daughters, the property divides
                    into 4 equal shares (25% or ₹25 Lakhs each). Neither the son nor the mother can reduce the daughters&apos;
                    share.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: ANCESTRAL PROPERTY */}
            <section id="ancestral-property-rules" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>Coparcenary Mechanics</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                5. Ancestral Property: Coparcenary Share &amp; HUF Rights
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  Ancestral property strictly refers to property inherited up to <strong>four generations</strong> of
                  male lineage (father, grandfather, great-grandfather) that has remained undivided. As soon as a child
                  is born into the family, they acquire an undivided coparcenary interest.
                </p>

                <h3 className="text-base font-bold text-slate-900">How Notional Partition Works</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  When a partition is demanded or when calculating inheritance upon the father&apos;s demise, Indian law
                  applies a <strong>notional partition</strong> (a deemed legal division immediately prior to death):
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 font-bold text-slate-900">
                    <span>Family Structure: Father, Mother, 1 Son, 1 Daughter</span>
                    <span className="text-[#C65378]">Ancestral Farm: 40 Acres</span>
                  </div>
                  <div className="space-y-1.5 text-slate-700">
                    <p>
                      <strong>Step 1 (Coparcenary Division):</strong> Under Section 6, the coparceners are the Father,
                      Son, and Daughter (3 coparceners). Each holds an undivided 1/3rd birthright share (13.33 acres each).
                    </p>
                    <p>
                      <strong>Step 2 (Devolution of Father&apos;s Share):</strong> When the father passes away, his 1/3rd
                      share devolves upon his Class I legal heirs (Mother, Son, Daughter) in equal parts (4.44 acres each).
                    </p>
                    <p className="font-extrabold text-emerald-800 pt-1 border-t border-slate-200">
                      Total Daughter&apos;s Share: 13.33 acres (coparcenary) + 4.44 acres (inheritance) = 17.77 Acres (44.4% of total estate).
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Can a Father Write a Will for Ancestral Property?</strong> A father can ONLY write a Will for
                    his own notional share (his 1/3rd). Any Will attempting to bequeath the entire 40 acres to the son is{" "}
                    <strong>void in law</strong> regarding the daughter&apos;s 13.33-acre birthright share.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 6: INTERACTIVE SHARE CALCULATOR */}
            <section id="succession-share-calculator" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>Interactive Legal Tool</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                6. Calculate Your Share: Interactive Inheritance Calculator
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Estimate a married daughter&apos;s statutory inheritance share based on your family structure, property
                classification, and estimated estate value.
              </p>

              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Property Type Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Property Category
                    </label>
                    <select
                      value={calcPropertyType}
                      onChange={(e) => setCalcPropertyType(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="ancestral">Ancestral (HUF Coparcenary Property)</option>
                      <option value="self-acquired-no-will">Father&apos;s Self-Acquired (No Will / Intestate)</option>
                    </select>
                  </div>

                  {/* Mother / Widow Alive */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Is Mother (Father&apos;s Wife) Alive?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCalcMotherAlive(true)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          calcMotherAlive
                            ? "bg-[#C65378] text-white border-[#C65378]"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        Yes (Class I Heir)
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalcMotherAlive(false)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          !calcMotherAlive
                            ? "bg-[#C65378] text-white border-[#C65378]"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        No (Predeceased)
                      </button>
                    </div>
                  </div>

                  {/* Number of Sons */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Number of Sons (Brothers)
                      </label>
                      <span className="text-xs font-extrabold text-[#C65378]">{calcNumSons}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={6}
                      value={calcNumSons}
                      onChange={(e) => setCalcNumSons(parseInt(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>0 Sons</span>
                      <span>3 Sons</span>
                      <span>6 Sons</span>
                    </div>
                  </div>

                  {/* Number of Daughters */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Number of Daughters (Including You)
                      </label>
                      <span className="text-xs font-extrabold text-[#C65378]">{calcNumDaughters}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={6}
                      value={calcNumDaughters}
                      onChange={(e) => setCalcNumDaughters(parseInt(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>1 Daughter</span>
                      <span>3 Daughters</span>
                      <span>6 Daughters</span>
                    </div>
                  </div>
                </div>

                {/* Estate Value Slider */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Estimated Market Value of Property: ₹{calcEstateValueLakhs >= 100 ? `${(calcEstateValueLakhs / 100).toFixed(2)} Crore` : `${calcEstateValueLakhs} Lakhs`}
                    </label>
                    <span className="text-xs font-bold text-slate-500">₹{(calcEstateValueLakhs * 100000).toLocaleString("en-IN")}</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={1000}
                    step={10}
                    value={calcEstateValueLakhs}
                    onChange={(e) => setCalcEstateValueLakhs(parseInt(e.target.value))}
                    className="w-full accent-[#C65378] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>₹10 Lakhs</span>
                    <span>₹5 Crores</span>
                    <span>₹10 Crores</span>
                  </div>
                </div>

                {/* Calculation Output Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-[#FAF2EB] via-white to-[#FAF2EB] border border-[#C65378]/30 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                        Each Married Daughter&apos;s Legal Share
                      </p>
                      <p className="text-2xl sm:text-3xl font-black text-slate-900">
                        {calcResults.daughterPercent}% of Estate
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs font-bold text-slate-500 uppercase">Estimated Value</p>
                      <p className="text-xl sm:text-2xl font-extrabold text-emerald-700">
                        ₹{calcResults.estimatedValueRupees.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 border-t border-slate-200/60 pt-2.5 leading-relaxed">
                    {calcResults.descriptionText}
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-slate-500">
                      Need a formal legal audit of your family pedigree?
                    </span>
                    <Link
                      href="/tools/succession-calculator"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#172228] text-white text-xs font-bold hover:bg-slate-800 transition-all shrink-0"
                    >
                      <span>Full Multi-Asset Calculator</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: VISUAL BLUEPRINT */}
            <section id="visual-blueprint" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Eye className="w-4 h-4" />
                <span>Visual Legal Blueprint</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                7. Visual Blueprint: Daughter Inheritance Rights in India
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                The visual roadmap below captures the core transformation brought about by the 2005 Hindu Succession
                Amendment and the Supreme Court&apos;s <em>Vineeta Sharma</em> judgment.
              </p>

              {/* Image Frame Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-xs space-y-4">
                <div
                  onClick={() => setShowImageModal(true)}
                  className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer group"
                >
                  <Image
                    src="/images/married-daughter-rights-in-fathers-property.png"
                    alt="Married Daughter Rights in Father Property in India Visual Guide"
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    sizes="(max-width: 1024px) 100vw, 850px"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-sm backdrop-blur-[2px]">
                    <Eye className="w-5 h-5" />
                    <span>Click to Expand Blueprint</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1.5">
                  <p className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Key Statutory Takeaways from this Blueprint:
                  </p>
                  <ul className="space-y-1 list-disc list-inside text-slate-600 text-xs">
                    <li>
                      <strong>Coparcenary by Birth:</strong> Conferred immediately at birth, entirely independent of marital status.
                    </li>
                    <li>
                      <strong>Unilateral Actions Void:</strong> Brothers cannot sell, gift, or partition ancestral property without the daughter&apos;s registered signature.
                    </li>
                    <li>
                      <strong>Mutation vs Title:</strong> Revenue mutation in patwari/tehsil registers does not divest or extinguish legal inheritance.
                    </li>
                    <li>
                      <strong>Protective Will Drafting:</strong> Fathers can eliminate future litigation by drafting registered Wills with clear asset distribution.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 8: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>Enforcement Protocol</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                8. Step-by-Step SOP: What to Do If Your Share Is Denied
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                If brothers, uncles, or relatives refuse to recognize your lawful inheritance or attempt to sell family
                properties behind your back, execute this 5-stage legal protocol immediately.
              </p>

              <div className="space-y-4">
                {/* STEP 1 */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Stage 1 • Days 1 to 15
                    </span>
                    <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                      Documentation Audit
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Gather Certified Revenue Records &amp; Pedigree Proof
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Apply online or at the Sub-Registrar Office for certified copies of the Father&apos;s registered sale
                    deeds, title deeds, and latest land revenue records (Khata, Jamabandi, or 7/12 extract). Obtain the
                    official death certificate and an official Family Tree / Pedigree certificate (Pariwar Register) from
                    the local Tehsildar or Municipal Councilor.
                  </p>
                </div>

                {/* STEP 2 */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Stage 2 • Days 16 to 30
                    </span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                      Prevent Fraudulent Mutation
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    File Written Objections at the Local Tehsil Office
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Brothers frequently attempt unilateral mutation (Dakhil Kharij) by omitting married sisters from the
                    heir list. Submit a formal written Objection Petition before the Revenue Tehsildar / Taluk office
                    asserting your Class I and coparcenary status under Section 6 of the Hindu Succession Act. This freezes
                    exclusive name transfers.
                  </p>
                </div>

                {/* STEP 3 */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Stage 3 • Days 31 to 45
                    </span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                      Formal Demand Notice
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Issue a Statutory Legal Notice via Advocate
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Have a verified property advocate dispatch a formal Legal Notice to all co-heirs. The notice must
                    quantify your undivided share, specify all known properties, and demand partition by metes and bounds
                    within 15 to 30 days. This creates an unassailable evidentiary record of date of demand.
                  </p>
                </div>

                {/* STEP 4 */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Stage 4 • Days 46 to 60
                    </span>
                    <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">
                      Court Action &amp; Injunction
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    File Civil Partition Suit &amp; Urgent Injunction
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    File a <strong>Civil Suit for Partition and Separate Possession</strong> under Order 20 Rule 18 of the
                    Code of Civil Procedure (CPC) in the competent District Court. Concurrently, move an urgent
                    application under <strong>Order 39 Rules 1 &amp; 2 CPC</strong> seeking an interim temporary injunction
                    restraining brothers from creating third-party rights, selling, or altering the character of the property.
                  </p>
                </div>

                {/* STEP 5 */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Stage 5 • Final Stage
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      Decree &amp; Physical Division
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Preliminary Decree, Court Commissioner &amp; Final Decree
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The civil court passes a <strong>Preliminary Decree</strong> declaring your exact percentage share.
                    Subsequently, the court appoints a Court Commissioner to inspect the land, demarcate boundaries, or
                    recommend sale with distribution of net sale proceeds. Upon confirmation, a <strong>Final Decree</strong>{" "}
                    is executed, granting physical possession.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 9: RELINQUISHMENT DEED / NOC WARNING */}
            <section id="relinquishment-noc-warning" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldAlert className="w-4 h-4" />
                <span>Legal Caution</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                9. Relinquishment Deeds: Can You Be Forced to Sign an NOC?
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  In countless Indian households, brothers pressure married sisters to sign &ldquo;No Objection
                  Certificates&rdquo; (NOCs) or blank papers under the emotional pretext of &ldquo;customary family
                  tradition&rdquo; or &ldquo;simplifying mutation.&rdquo;
                </p>

                <div className="p-4 rounded-xl bg-rose-50 border-l-4 border-rose-600 text-xs sm:text-sm space-y-2 text-rose-950">
                  <p className="font-extrabold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    WARNING: Section 17, Registration Act, 1908
                  </p>
                  <p className="leading-relaxed">
                    Any relinquishment, surrender, or release of rights in immovable property valued over ₹100{" "}
                    <strong>MUST be made through a registered Relinquishment Deed (Release Deed)</strong> on proper
                    non-judicial stamp paper and signed before the Sub-Registrar. A handwritten letter, informal affidavit,
                    or unnotarized NOC has <strong>zero legal validity</strong> to extinguish ownership title.
                  </p>
                </div>

                <h3 className="text-base font-bold text-slate-900">What If You Signed Under Coercion or Fraud?</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  If you were misled into signing documents (e.g., told it was for pension release or electricity meter
                  transfer), you can file a civil declaration suit under Section 31 of the Specific Relief Act, 1963 to
                  cancel the fraudulent deed on grounds of fraud, misrepresentation, or lack of free consent (Sections 14
                  and 19 of the Indian Contract Act, 1872).
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="font-semibold text-slate-700">
                    Need to understand how legal release deeds work?
                  </span>
                  <Link
                    href="/templates/release-deed-format"
                    className="inline-flex items-center gap-1 text-[#C65378] font-bold hover:underline shrink-0"
                  >
                    <span>Read Release Deed Format Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 10: STRIDHAN VS PROPERTY */}
            <section id="stridhan-distinction" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Heart className="w-4 h-4" />
                <span>Women&apos;s Absolute Property</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                10. Stridhan vs Father Property: Key Legal Distinctions
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  A common misconception across India is that if a father gave gold jewelry, cash gifts, or funded a
                  daughter&apos;s marriage, she has received her &ldquo;share&rdquo; and cannot claim parental property.
                  Indian law explicitly rejects this argument.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1.5">
                    <p className="text-xs font-black uppercase tracking-wider text-purple-900">
                      Stridhan (Section 14 HSA)
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      All gifts, gold, jewelry, clothes, vehicles, and assets presented to a woman before, during, or
                      after marriage by parents, in-laws, or relatives constitute her <strong>Stridhan</strong>. Under
                      Section 14(1) of the Hindu Succession Act, she is the <strong>absolute owner</strong>. In-laws or
                      husbands have zero claim over it.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1.5">
                    <p className="text-xs font-black uppercase tracking-wider text-blue-900">
                      Parental Inheritance (Sections 6 &amp; 8 HSA)
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Inheritance rights in ancestral coparcenary property and intestate self-acquired estates are
                      statutory birthrights governed by Sections 6 and 8. The Supreme Court has confirmed that Stridhan
                      gifts cannot be set off or deducted against her lawful coparcenary inheritance.
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  For deeper guidance on protecting and will-planning for women&apos;s separate assets, explore our guide on{" "}
                  <Link
                    href="/blogs/hindu-woman-property-rights-stridhan-will"
                    className="text-[#C65378] font-bold hover:underline"
                  >
                    Hindu Woman Property Rights, Stridhan &amp; Will Planning
                  </Link>
                  .
                </p>
              </div>
            </section>

            {/* SECTION 11: MYTHS VS REALITY */}
            <section id="myths-vs-reality" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>Myth Busters</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                11. Common Myths About Married Daughters and Property Rights
              </h2>
              <div className="space-y-3">
                {MYTHS_LIST.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-black bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full shrink-0">
                        MYTH #{idx + 1}
                      </span>
                      <p className="text-sm font-extrabold text-slate-900 leading-snug">{item.myth}</p>
                    </div>
                    <div className="pl-0 sm:pl-9 text-xs sm:text-sm text-slate-600 leading-relaxed flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <p>
                        <strong className="text-emerald-900">Legal Reality: </strong>
                        {item.reality}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 12: THE PERMANENT SOLUTION */}
            <section id="protect-with-will" className="scroll-target">
              <div className="rounded-2xl bg-[#172228] text-white p-6 sm:p-8 space-y-4 shadow-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-rose-200">
                  <Sparkles className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>THE PERMANENT SOLUTION</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold leading-snug text-white">
                  Don&apos;t Let Property Disputes Disinherit Your Daughter
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Drafting a legally binding Will on WillDrafting.in takes just 15 minutes. It lets you catalog all your ancestral and self-acquired assets, name your married daughters as direct beneficiaries, and eliminate bitter sibling disputes before they reach civil courts.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <a
                    href="/start"
                    onClick={(e) => {
                      e.preventDefault();
                      handleStartWill();
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 text-sm cursor-pointer shadow-lg"
                  >
                    <span>Create Your Will Online in 15 Mins</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <Link
                    href="/tools/succession-calculator"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
                  >
                    <span>Check Legal Heir Shares</span>
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 13: OTHER RELIGIONS */}
            <section id="other-religions-succession" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Globe2Icon className="w-4 h-4" />
                <span>Comparative Succession Law</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                13. Rights Under Muslim, Christian &amp; Parsi Personal Laws
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  While the Hindu Succession Act applies to Hindus, Buddhists, Jains, and Sikhs, succession rights for
                  daughters of other religious communities are governed by separate statutory and personal frameworks:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <p className="font-bold text-sm text-slate-900">Muslim Personal Law (Shariat)</p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Muslim inheritance does not recognize the concept of ancestral coparcenary property; all property
                      is treated as personal estate. Daughters are recognized Quranic sharers. Where there are sons and
                      daughters, a daughter receives <strong>half the share of a son</strong>. A Muslim father cannot Will
                      away more than <strong>1/3rd of his estate</strong> without the consent of all legal heirs.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <p className="font-bold text-sm text-slate-900">Christian &amp; Parsi Law (ISA 1925)</p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Governed by Sections 31 to 56 of the <strong>Indian Succession Act, 1925</strong>. Daughters and
                      sons inherit <strong>100% equal shares</strong> in intestate property. A Christian or Parsi father
                      enjoys complete testamentary power to bequeath his property through a written Will without limits.
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-500">
                  Learn more about Christian and Parsi testamentary rules in our detailed guide on{" "}
                  <Link
                    href="/blogs/christian-parsi-will-indian-succession-act"
                    className="text-[#C65378] font-bold hover:underline"
                  >
                    Christian &amp; Parsi Will Succession under the ISA 1925
                  </Link>
                  .
                </p>
              </div>
            </section>

            {/* SECTION 14: FREQUENTLY ASKED QUESTIONS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                14. Frequently Asked Questions: Daughter Property Rights
              </h2>

              <div className="space-y-3">
                {FAQ_ITEMS.map((item, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs transition-all"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-slate-900 hover:text-[#C65378] transition-colors cursor-pointer"
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 15: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target space-y-4 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
                <BookOpen className="w-4 h-4 text-[#5F7E75]" />
                <span>Legal Framework &amp; Authorities</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] leading-tight">
                15. Official Legal Citations &amp; Landmark Court Precedents
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-3 text-xs sm:text-sm text-slate-600">
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    <strong>Hindu Succession Act, 1956:</strong> Section 6 (Devolution of interest in coparcenary
                    property); Section 8 (General rules of succession in the case of males); Section 14 (Property of a
                    female Hindu to be her absolute property); Section 30 (Testamentary disposition).
                  </li>
                  <li>
                    <strong>Supreme Court of India:</strong> <em>Vineeta Sharma v. Rakesh Sharma</em> (2020) 9 SCC 1
                    (Daughters are coparceners by birth, retrospective coparcenary status, overruling Phulavati).
                  </li>
                  <li>
                    <strong>Supreme Court of India:</strong> <em>Arunachala Gounder v. Ponnusamy</em> (2022) 11 SCC 520
                    (Inheritance of self-acquired property of a male Hindu dying intestate prior to 1956).
                  </li>
                  <li>
                    <strong>Delhi High Court:</strong> <em>Mrs. Sujata Sharma v. Shri Manu Gupta</em> (2015) SCC OnLine Del
                    13897 (Right of an eldest daughter to act as Karta of an HUF).
                  </li>
                  <li>
                    <strong>Supreme Court of India:</strong> <em>Jitendra Singh v. State of M.P.</em> 2021 SCC OnLine SC 802
                    (Mutation entries in revenue records do not confer or extinguish title).
                  </li>
                  <li>
                    <strong>Code of Civil Procedure, 1908:</strong> Order 20 Rule 18 (Decrees in partition suits); Order
                    39 Rules 1 &amp; 2 (Temporary injunctions restraining alienation).
                  </li>
                  <li>
                    <strong>Limitation Act, 1963:</strong> Article 110 (12-year limitation period to enforce a right to
                    share in joint family property from date of exclusion).
                  </li>
                </ul>
              </div>
            </section>
          </article>

          {/* =====================================================================
              RIGHT COLUMN: Author Card, Urgent CTA & Trust Badges (Sticky)
          ===================================================================== */}
          <aside className="sticky top-28 self-start space-y-5">
            {/* Author Profile Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#C65378] bg-[#FAF2EB] px-2 py-0.5 rounded-full">
                Senior Counsel Review
              </span>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  RR
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 leading-tight">Advocate Rajeshwar Rao</h4>
                  <p className="text-xs text-slate-500">Senior Succession Counsel</p>
                  <p className="text-[11px] text-[#5F7E75] font-semibold">15+ Years High Court Practice</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5">
                Specializes in ancestral coparcenary disputes, Section 6 HSA partition suits, and High Court testamentary
                litigation across Delhi NCR, Mumbai, and Bangalore.
              </p>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-5 desktop-sidebar-only">
{/* Emergency Consultation Card */}
            <div className="hidden lg:block bg-[#172228] rounded-2xl p-5 text-white space-y-3 shadow-lg shadow-slate-900/10">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-300">
                <Lock className="w-3.5 h-3.5 text-[#C65378]" />
                <span>Urgent Rights Consultation</span>
              </div>
              <h4 className="text-base font-extrabold text-white leading-tight">
                Are Brothers Denying Your Share?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect directly with AMA Legal Solutions succession advocates to inspect revenue records, send a legal
                notice, or secure an injunction.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#C65378] text-white font-bold text-xs hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-md cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Talk to a Succession Lawyer</span>
              </Link>
            </div>

            {/* Trust & Guarantee Indicators */}
            <div className="hidden lg:block bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3 text-xs">
              <h4 className="font-extrabold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Why Trust WillDrafting.in
              </h4>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>100% Statutory precision under HSA 1956 &amp; ISA 1925</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Aligned with Supreme Court 3-Judge Bench rulings</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Zero hidden consultation charges</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Advocate verification available on demand</span>
                </li>
              </ul>
            </div>

            {/* Related Family Succession Guides */}
            <div className="hidden lg:block bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                Related Family Guides
              </h4>
              <div className="space-y-2 text-xs">
                <Link
                  href="/blogs/hindu-woman-property-rights-stridhan-will"
                  className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                >
                  <p className="font-bold text-slate-800 hover:text-[#C65378]">Hindu Woman Property &amp; Stridhan</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Section 14 &amp; 15 succession rules</p>
                </Link>
                <Link
                  href="/blogs/second-wife-children-property-rights-india"
                  className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                >
                  <p className="font-bold text-slate-800 hover:text-[#C65378]">Second Wife &amp; Children Rights</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">HMA Section 16 &amp; Revanasiddappa ruling</p>
                </Link>
                <Link
                  href="/blogs/huf-property-after-death-of-karta"
                  className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                >
                  <p className="font-bold text-slate-800 hover:text-[#C65378]">HUF Property After Karta Death</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Devolution of coparcenary share</p>
                </Link>
                <Link
                  href="/templates/release-deed-format"
                  className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                >
                  <p className="font-bold text-slate-800 hover:text-[#C65378]">Release Deed Format India</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Download valid template &amp; stamp rules</p>
                </Link>
              </div>
            </div>
            </div>

            {/* MOBILE ONLY: Related WillDrafting Guides */}
            <div className="pt-4 border-t border-slate-100 block lg:hidden">
              <span className="text-xs font-bold text-[#172228] block mb-2">Related WillDrafting Guides:</span>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/blogs/hindu-woman-property-rights-stridhan-will"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Hindu Woman Property Rights & Stridhan
                </Link>
                <Link
                  href="/blogs/second-wife-children-property-rights-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Second Wife & Children Rights
                </Link>
                <Link
                  href="/blogs/huf-property-after-death-of-karta"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  HUF Property After Karta Death
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
      </main>

      {/* =========================================================================
          IMAGE LIGHTBOX MODAL
      ========================================================================= */}
      {showImageModal && (
        <div
          onClick={() => setShowImageModal(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center cursor-pointer animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">
                Married Daughter Rights in Father Property in India - Visual Roadmap
              </h3>
              <button
                onClick={() => setShowImageModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-100">
              <Image
                src="/images/married-daughter-rights-in-fathers-property.png"
                alt="High Resolution Visual Blueprint of Married Daughter Property Rights in India"
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <span>Verified Statutory Blueprint • Supreme Court Authority: Vineeta Sharma (2020)</span>
              <a
                href="/images/married-daughter-rights-in-fathers-property.png"
                download
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#172228] text-white font-bold hover:bg-slate-800 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download High-Res Graphic</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Globe2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}
