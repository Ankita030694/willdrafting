"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  Scale,
  Calculator,
  Clock,
  ShieldCheck,
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
  Landmark,
  Gavel,
  AlertCircle,
  Users,
  Building,
  Heart,
  FileCheck,
  RotateCcw,
  Sparkles,
  Info,
  Maximize2,
  X,
  HelpCircle,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "executive-summary", label: "Executive Summary: HUF Estate" },
  { id: "karta-death-huf-continuation", label: "1. What Happens When Karta Dies?" },
  { id: "who-becomes-new-karta", label: "2. Who Becomes the New Karta?" },
  { id: "hsa-section-6-deemed-partition", label: "3. Section 6: Deemed Split" },
  { id: "can-karta-will-huf-property", label: "4. Can Karta Will HUF Asset?" },
  { id: "huf-vs-personal-property", label: "5. HUF vs Personal Asset Matrix" },
  { id: "visual-flowchart-huf-succession", label: "6. Visual Blueprint & Flowchart" },
  { id: "interactive-share-calculator", label: "7. Joint Share Tool" },
  { id: "tax-implications-and-kyc", label: "8. Tax & KYC Rules (Sec 171)" },
  { id: "step-by-step-karta-update-sop", label: "9. Step-by-Step Bank & PAN SOP" },
  { id: "common-huf-mistakes", label: "10. Fatal HUF Mistakes to Avoid" },
  { id: "specialized-huf-scenarios", label: "11. 4 Real-Life Family Scenarios" },
  { id: "how-to-handle-huf-in-will", label: "12. How to Handle HUF in Your Will" },
  { id: "huf-audit-checklist", label: "13. HUF Legal & Estate Checklist" },
  { id: "frequently-asked-questions", label: "14. Frequently Asked Questions" },
  { id: "statutory-citations", label: "15. Official Legal Citations" },
];

const PRINTABLE_CHECKLIST_TEXT = `================================================================================
HUF PROPERTY & KARTA SUCCESSION AUDIT CHECKLIST (INDIA)
Statutory Authority: Hindu Succession Act, 1956 (Sections 6, 8, 30) & Income Tax Act, 1961 (Sec 171)
Judicial Precedents: Sujata Sharma (2015), Vineeta Sharma (2020), Gurupad Magdum (1978)
Prepared by WillDrafting.in
================================================================================

PHASE 1: IMMEDIATE POST-DEATH LEGAL FORMALITIES
[ ] Item 1.1: Obtain 10-15 original copies of the deceased Karta's Municipal Death Certificate.
[ ] Item 1.2: Retrieve the original HUF Deed / HUF PAN Card and ancestral title deeds.
[ ] Item 1.3: Confirm the exact coparcenary tree: identify all living sons, daughters, and widow.
[ ] Item 1.4: Confirm that married and unmarried daughters hold equal coparcenary rights by birth.

PHASE 2: APPOINTMENT OF THE NEW KARTA
[ ] Item 2.1: Identify the eldest living coparcener (eldest son OR eldest daughter under Sujata Sharma).
[ ] Item 2.2: If coparceners are minors, have the mother/natural guardian act as de facto manager.
[ ] Item 2.3: Execute a unanimous family Declaration / Resolution signed by all surviving coparceners.
[ ] Item 2.4: Prepare a standard Letter of Indemnity and Affidavit for institutional record updates.

PHASE 3: INSTITUTIONAL, BANK & TAX PORTAL UPDATES
[ ] Item 3.1: Submit new Karta KYC documents, death certificate, and resolution to HUF bank accounts.
[ ] Item 3.2: Update Authorized Signatory details across all HUF fixed deposits and lockers.
[ ] Item 3.3: Submit new Karta details to the Demat Depository Participant (NSDL/CDSL) and mutual funds.
[ ] Item 3.4: Log in to the Income Tax e-Filing portal and update the Karta details under HUF profile.

PHASE 4: EVALUATING WILLS & PARTITION RIGHTS
[ ] Item 4.1: Check whether the deceased Karta executed a Last Will disposing of his Section 6 deemed share.
[ ] Item 4.2: Verify that the Will does not attempt to bequeath entire physical HUF properties.
[ ] Item 4.3: If family continues as an HUF, operate under the new Karta without disturbing assets.
[ ] Item 4.4: If partition is demanded, execute a registered Partition Deed and apply for total partition under IT Act Section 171.

================================================================================
CRITICAL REMINDER: The death of the Karta does NOT dissolve an HUF. Under Section 30
of the Hindu Succession Act, the Karta can Will his coparcenary share, but not the
entire joint property. To draft your legally sound Will, visit https://www.willdrafting.in`;

export default function HufPropertyAfterDeathOfKartaClient() {
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

  // Free Share Tool State
  const [calcEstateValueLakhs, setCalcEstateValueLakhs] = useState<number>(200); // 2 Crore default
  const [calcHasWife, setCalcHasWife] = useState<boolean>(true);
  const [calcSonsCount, setCalcSonsCount] = useState<number>(1);
  const [calcDaughtersCount, setCalcDaughtersCount] = useState<number>(1);
  const [calcHasWill, setCalcHasWill] = useState<boolean>(false);

  // Checklist free state
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

  // Section 6 Deemed Partition Computation Logic
  const calculateDeemedPartition = () => {
    const totalRupees = calcEstateValueLakhs * 100000;
    // In Mitakshara deemed partition before death:
    // Coparceners include Karta (1) + Sons + Daughters.
    // If wife is alive, under Mitakshara law, she gets a share equal to a son/daughter upon partition!
    const coparcenerCount = 1 + calcSonsCount + calcDaughtersCount;
    const partitionUnits = calcHasWife ? coparcenerCount + 1 : coparcenerCount;

    const notionalSharePerUnit = totalRupees / partitionUnits;
    const kartaDeemedShare = notionalSharePerUnit;
    const wifeInitialPartitionShare = calcHasWife ? notionalSharePerUnit : 0;
    const sonInitialShare = notionalSharePerUnit;
    const daughterInitialShare = notionalSharePerUnit;

    // Devolution of Karta's Deemed Share:
    // If Karta dies without a Will, his share passes equally to his Class I heirs:
    // Class I heirs = Wife (if alive) + Sons + Daughters (assuming mother of deceased is not factored or already passed).
    const class1HeirCount = (calcHasWife ? 1 : 0) + calcSonsCount + calcDaughtersCount;
    const kartaSharePerHeir = class1HeirCount > 0 ? kartaDeemedShare / class1HeirCount : 0;

    // Final calculations:
    let finalWifeTotal = wifeInitialPartitionShare;
    let finalSonTotal = sonInitialShare;
    let finalDaughterTotal = daughterInitialShare;

    if (!calcHasWill) {
      if (calcHasWife) finalWifeTotal += kartaSharePerHeir;
      finalSonTotal += kartaSharePerHeir;
      finalDaughterTotal += kartaSharePerHeir;
    }

    return {
      partitionUnits,
      notionalSharePerUnit,
      kartaDeemedShare,
      class1HeirCount,
      kartaSharePerHeir,
      finalWifeTotal,
      finalSonTotal,
      finalDaughterTotal,
    };
  };

  const calcResults = calculateDeemedPartition();
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const isAllValid = checkedCount === 6;

  const formatLakhs = (amount: number) => {
    const inLakhs = amount / 100000;
    return `₹${inLakhs.toFixed(2)} Lakh`;
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy #172228)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6">
            <Landmark className="w-3.5 h-3.5 text-[#C65378]" />
            <span>Family Rights &amp; HUF Estate Law</span>
          </div>

          {/* H1 Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            HUF Asset After Death of Karta: Estate &amp; Rights
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-white/95 max-w-3xl mx-auto leading-relaxed mb-8">
            Understand who becomes the new Karta, how deemed split works under Section 6, why the Karta can Will his joint share under Section 30, and how to protect family assets.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-extrabold text-sm hover:bg-[#b04568] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#C65378]/25"
            >
              <span>Draft a Protective Will in 15 Mins</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/tools/succession-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm transition-all"
            >
              <Calculator className="w-4 h-4 text-rose-300" />
              <span>Open Estate Tool</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Full-Width Social Proof)
          ========================================================================= */}
      <section className="w-full border-y border-slate-200/80 bg-gradient-to-r from-rose-50/70 via-white to-amber-50/70 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center divide-x-0 lg:divide-x divide-slate-200">
            <div className="p-2">
              <p className="text-xl sm:text-2xl font-black text-[#172228]">100%</p>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                Will Freedom for Joint Share (Sec 30)
              </p>
            </div>
            <div className="p-2">
              <p className="text-xl sm:text-2xl font-black text-[#172228]">2005</p>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                Equal Joint for Daughters (HSA Sec 6)
              </p>
            </div>
            <div className="p-2">
              <p className="text-xl sm:text-2xl font-black text-[#172228]">₹0 Tax</p>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                Capital Gains on HUF Split (Sec 47(i))
              </p>
            </div>
            <div className="p-2">
              <p className="text-xl sm:text-2xl font-black text-[#172228]">Delhi HC</p>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                Eldest Daughter as Karta (Sujata Sharma)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content Area)
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_280px] xl:grid-cols-[260px_minmax(0,1fr)_300px] 2xl:grid-cols-[280px_minmax(0,1fr)_320px] gap-5 xl:gap-6 items-start">
          
          {/* =====================================================================
              LEFT COLUMN: STICKY TABLE OF CONTENTS
              ===================================================================== */}
          <aside className="sticky top-28 hidden lg:block">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Table of Contents
                </span>
              </div>
              <nav className="max-h-[calc(100vh-190px)] overflow-y-auto space-y-1 text-xs">
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

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75] shrink-0" />
                <span>Legal compliance: HSA 1956 &amp; ITA 1961</span>
              </div>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN EDITORIAL CONTENT
              ===================================================================== */}
          <main className="space-y-8 md:space-y-10 min-w-0">

            {/* SECTION 0: EXECUTIVE SUMMARY BOX */}
            <section
              id="executive-summary"
              className="scroll-target rounded-2xl bg-[#F4F8FE] border-l-[5px] border-l-[#C65378] p-6 shadow-xs"
            >
              <div className="flex items-center gap-2 text-[#C65378] mb-3">
                <Sparkles className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-wider">
                  Executive Brief: Key Takeaways
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] mb-4">
                Executive Summary: HUF Estate After Karta Death
              </h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <p>
                    <strong>The HUF Never Dies:</strong> The death of the Karta does not terminate or dissolve the Hindu Undivided Family. The HUF remains an active legal and income-tax entity with its unique PAN.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <p>
                    <strong>New Karta by Seniority:</strong> Management passes automatically to the senior-most surviving coparcener. Under the Delhi High Court ruling in <em>Sujata Sharma</em>, an eldest daughter has the exact same right as an eldest son to act as Karta.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <p>
                    <strong>Can the Karta Will HUF Asset?</strong> The Karta cannot will away the entire HUF asset. However, under Section 30 of the Hindu Succession Act, he can validly bequeath his own undivided joint share.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <p>
                    <strong>Section 6 Deemed Split:</strong> To identify the deceased Karta&apos;s share, the law presumes a notional split occurred right before death. His separate share then passes to his heirs under a Will or intestacy rules.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5F7E75] shrink-0 mt-0.5" />
                  <p>
                    <strong>Zero Capital Gains on Split:</strong> Under Section 47(i) of the Income Tax Act, physical split of assets during an HUF split attracts zero capital gains tax.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 1: WHAT HAPPENS WHEN KARTA DIES */}
            <section id="karta-death-huf-continuation" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>Legal Status &amp; Family Continuity</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                1. What Happens to HUF When the Karta Passes Away?
              </h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                When the head of an Indian joint family passes away, grieving families often worry that the Hindu Undivided Family (HUF) is automatically terminated. Many fear that bank accounts will freeze permanently, businesses will close, or assets will enter legal limbo.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Under Hindu law, an HUF is an ongoing collective institution. The death of the Karta changes the manager, not the existence of the entity. The family unit continues uninterrupted with its assets, liabilities, tenant leases, and bank accounts.
              </p>
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#5F7E75]" />
                  Coparceners vs Members: Know the Legal Difference
                </h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  Every coparcener is a member of the HUF, but not every member is a coparcener. Coparceners (sons and daughters by birth) possess an undivided birthright in family asset and can demand split. Members who join by marriage (such as wives and daughters-in-law) possess rights to maintenance and a split share, but cannot claim family birthright or initiate split on their own.
                </p>
              </div>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Because coparceners acquire their rights by birth, the demise of the Karta merely shifts the office reins to the next generation without disrupting asset ownership.
              </p>
            </section>

            {/* SECTION 2: WHO BECOMES THE NEW KARTA */}
            <section id="who-becomes-new-karta" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>Estate to Kartaship</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                2. Who Becomes the New Karta: Rules &amp; Precedents
              </h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Under traditional Hindu Mitakshara jurisprudence, Kartaship is not an elective political office. It devolves by operation of law based on seniority among living coparceners.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-[#C65378]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Rule of Seniority</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900">Next Senior-Most Coparcener</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The senior-most surviving coparcener naturally assumes the position of Karta. If the deceased Karta has two sons and one daughter, the eldest of the three siblings becomes the Karta.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-[#5F7E75]">
                    <Scale className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Daughter Rights</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900">Eldest Daughter as Karta</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    In <em>Sujata Sharma v. Manu Gupta (2015)</em>, the Delhi High Court confirmed that post-2005 amendment, an eldest daughter possesses equal rights as a son and can be recognized as the Karta.
                  </p>
                </div>
              </div>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                What happens if all remaining coparceners are minors? The Supreme Court in <em>CIT v. Laxmi Narayan Bhadani</em> confirmed that a mother, acting as the natural guardian, can manage the HUF estate for the benefit of minor coparceners until the eldest child turns 18.
              </p>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs md:text-sm leading-relaxed flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  <strong>Family Consent Option:</strong> While the senior-most coparcener holds the legal presumption, all surviving coparceners can mutually sign a written family resolution appointing a younger adult coparcener as manager if the elder member resides overseas or declines the duty.
                </p>
              </div>
            </section>

            {/* SECTION 3: HSA SECTION 6 DEEMED PARTITION */}
            <section id="hsa-section-6-deemed-partition" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>Legal Asset Division</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                3. HSA Section 6: Deemed Split on Karta Death
              </h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Prior to 2005, an undivided joint share devolved by the doctrine of survivorship (passing only to surviving male coparceners). Following the landmark 2005 amendment to the Hindu Succession Act, Section 6(3) abolished pure survivorship when female relatives or daughters survive.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Instead, the law applies the doctrine of <strong>Notional or Deemed Split</strong>, first formulated by the Supreme Court in <em>Gurupad Khandappa Magdum v. Hirabai Khandappa Magdum (1978)</em>.
              </p>

              {/* Data Table */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs my-4">
                <div className="bg-slate-900 text-white p-4">
                  <h3 className="text-sm sm:text-base font-bold flex items-center justify-between">
                    <span>Agent Deemed Split Calculation</span>
                    <span className="text-xs text-rose-300 font-mono">Total HUF Estate: ₹3 Crore</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Family: Deceased Karta, Surviving Wife, 1 Adult Son, 1 Adult Daughter
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm text-left">
                    <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold">
                      <tr>
                        <th className="p-3">Family Member</th>
                        <th className="p-3">Notional Split Share</th>
                        <th className="p-3">Estate from Karta</th>
                        <th className="p-3 text-right">Net Share Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">Deceased Karta</td>
                        <td className="p-3">1/4th (25%)</td>
                        <td className="p-3 text-rose-600">Devolves to legal heirs</td>
                        <td className="p-3 text-right font-mono font-bold">₹75,00,000</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">Surviving Wife (Mother)</td>
                        <td className="p-3">1/4th (25%)</td>
                        <td className="p-3 text-emerald-600">+ 1/3rd of Karta share</td>
                        <td className="p-3 text-right font-mono font-bold text-emerald-700">₹1,00,00,000</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">Surviving Son</td>
                        <td className="p-3">1/4th (25%)</td>
                        <td className="p-3 text-emerald-600">+ 1/3rd of Karta share</td>
                        <td className="p-3 text-right font-mono font-bold text-emerald-700">₹1,00,00,000</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900">Surviving Daughter</td>
                        <td className="p-3">1/4th (25%)</td>
                        <td className="p-3 text-emerald-600">+ 1/3rd of Karta share</td>
                        <td className="p-3 text-right font-mono font-bold text-emerald-700">₹1,00,00,000</td>
                      </tr>
                      <tr className="bg-rose-50/50 font-bold text-slate-900">
                        <td className="p-3" colSpan={3}>Total Family Split</td>
                        <td className="p-3 text-right font-mono text-[#C65378]">₹3,00,00,000 (100%)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">
                *Note: Under Mitakshara law, when a split occurs between a father and sons/daughters, the wife receives a share equal to a child. In deemed split, she retains her 25% share plus inherits an equal 1/3rd portion of the Karta&apos;s personal 25% share.
              </p>
            </section>

            {/* SECTION 4: CAN KARTA WILL HUF PROPERTY */}
            <section id="can-karta-will-huf-property" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>Will Freedom Under HSA Sec 30</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                4. Can the Karta Will HUF Asset Under Section 30?
              </h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                This is one of the most frequently asked questions in Indian estate planning. Many patriarchs mistakenly draft Wills stating: <em>&quot;I give our entire family family home to my younger son.&quot;</em>
              </p>
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 text-xs md:text-sm leading-relaxed space-y-2">
                <p className="font-extrabold text-rose-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  The Legal Limitation: Entire HUF vs Joint Share
                </p>
                <p>
                  The Karta does <strong>NOT</strong> own the entire HUF asset. It belongs collectively to all coparceners. Any clause in a Will attempting to bequeath other coparceners&apos; shares is void from the beginning.
                </p>
              </div>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                However, Section 30 of the Hindu Succession Act provides a vital exception:
              </p>
              <blockquote className="p-4 rounded-xl bg-slate-50 border-l-4 border-l-[#5F7E75] text-slate-800 text-xs md:text-sm italic leading-relaxed">
                &quot;Any Hindu may dispose of by will or other Will gift any asset which is capable of being so disposed of by him... The undivided interest of a Hindu in Mitakshara joint asset shall be deemed to be asset capable of being disposed of by will.&quot;
              </blockquote>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                <strong>The Crucial Takeaway:</strong> The Karta can legally bequeath his own deemed joint share (e.g. his 25% share) to whoever he chooses, such as his wife, daughter, or a charity. If he leaves no Will, that share automatically splits equally among his Class I legal heirs under Section 8.
              </p>
            </section>

            {/* SECTION 5: HUF VS PERSONAL PROPERTY MATRIX */}
            <section id="huf-vs-personal-property" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>Asset Classification</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                5. HUF Asset vs Karta Personal Assets Comparison
              </h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Before drafting a Will or distributing assets after a death, family members must strictly segregate HUF joint assets from the Karta&apos;s single self-acquired estate.
              </p>

              {/* Comparison Matrix Table */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs my-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm text-left">
                    <thead className="bg-[#172228] text-white">
                      <tr>
                        <th className="p-3.5">Parameter</th>
                        <th className="p-3.5">HUF Joint Asset</th>
                        <th className="p-3.5">Karta&apos;s Personal Asset</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Source of Acquisition</td>
                        <td className="p-3 text-slate-700">Family line (3 paternal generations) or blended into common stock</td>
                        <td className="p-3 text-slate-700">Personal salary, professional fees, business without HUF nucleus, or gifts</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Ownership Type</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold text-[11px]">
                            Collective Joint
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[11px]">
                            100% Sole Single
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Will Power (Will)</td>
                        <td className="p-3 text-rose-700 font-semibold">
                          Only his deemed undivided share (Sec 30)
                        </td>
                        <td className="p-3 text-emerald-700 font-semibold">
                          Full 100% freedom to bequeath to anyone
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Split Demand</td>
                        <td className="p-3 text-slate-700">Any coparcener can demand split at any time</td>
                        <td className="p-3 text-slate-700">Children cannot demand split during his lifetime</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Income Tax Assessment</td>
                        <td className="p-3 text-slate-700">Assessed separately under HUF PAN with basic exemption</td>
                        <td className="p-3 text-slate-700">Assessed under single PAN</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 6: VISUAL FLOWCHART & UPLOADED IMAGE */}
            <section id="visual-flowchart-huf-succession" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>Visual Roadmap &amp; Flow Diagram</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                6. Visual Flowchart: HUF Assets &amp; Karta Estate
              </h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Review this visual blueprint illustrating how Karta estate, Section 6 deemed split, and Section 30 Will bequests interact when the Karta passes away.
              </p>

              {/* Infographic Image Card */}
              <div className="rounded-2xl bg-white border border-slate-200/80 p-3 sm:p-5 shadow-xs overflow-hidden">
                <div 
                  className="relative aspect-video w-full rounded-xl overflow-hidden cursor-pointer group bg-slate-950"
                  onClick={() => setShowImageModal(true)}
                >
                  <Image
                    src="/images/huf-property-after-death-of-karta.jpg"
                    alt="HUF Property After Death of Karta Flow Diagram and Succession Authority"
                    width={1200} height={675}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    sizes="(max-width: 1200px) 100vw, 900px"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 text-white text-xs font-semibold backdrop-blur-xs">
                      <Maximize2 className="w-3.5 h-3.5" /> Click to View Full Image
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <p>
                    <strong>Figure 1.1:</strong> HUF Asset, New Karta Estate &amp; HSA Sections 6 and 30 Framework.
                  </p>
                  <button
                    onClick={() => setShowImageModal(true)}
                    className="text-[#C65378] font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>View High Resolution</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Step-by-Step Flow Diagram Cards */}
              <div className="space-y-3 mt-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Demise of the Karta</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      HUF entity remains alive. Family secures original death paper and initiates bank and tax portal transitions.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Senior Coparcener Assumes Kartaship</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Eldest son or eldest daughter automatically becomes Karta by law. Family signs unanimous declaration.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Section 6 Deemed Split Ascertainment</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Karta&apos;s fractional share is isolated as if a split occurred right away prior to his death.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Split of Deemed Share: Will vs Intestacy</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      If Karta wrote a valid Will under Section 30, his share passes to named heirs. If no Will exists, it splits equally among Class I legal heirs.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-rose-100 text-[#C65378] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    5
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Family Choice: Continuation or Total Split</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Family can continue operating the HUF under the new Karta, or execute a filed Split Deed under Section 171 of the Income Tax Act.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: INTERACTIVE SHARE CALCULATOR */}
            <section id="interactive-share-calculator" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>Simulation Tool</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                7. Free Joint Share &amp; Split Tool
              </h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Estimate how deemed split divides your family&apos;s HUF assets upon the death of the Karta based on your exact family configuration.
              </p>

              {/* Interactive Widget Box */}
              <div className="rounded-2xl bg-white border border-slate-200 shadow-md p-5 sm:p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Estate Value */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Total HUF Asset Value: <span className="text-[#C65378] font-extrabold">₹{calcEstateValueLakhs} Lakh</span>
                    </label>
                    <input
                      type="range"
                      min={20}
                      max={1000}
                      step={10}
                      value={calcEstateValueLakhs}
                      onChange={(e) => setCalcEstateValueLakhs(Number(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>₹20 Lakh</span>
                      <span>₹5 Crore</span>
                      <span>₹10 Crore</span>
                    </div>
                  </div>

                  {/* Surviving Wife */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Surviving Wife / Mother Living?
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCalcHasWife(true)}
                        className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                          calcHasWife
                            ? "bg-[#172228] text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        Yes (Receives Share)
                      </button>
                      <button
                        onClick={() => setCalcHasWife(false)}
                        className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                          !calcHasWife
                            ? "bg-[#172228] text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>

                  {/* Will Status */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Did Karta Leave a Will?
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCalcHasWill(false)}
                        className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                          !calcHasWill
                            ? "bg-[#172228] text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        No Will (No-Will)
                      </button>
                      <button
                        onClick={() => setCalcHasWill(true)}
                        className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                          calcHasWill
                            ? "bg-[#C65378] text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        Valid Will (Sec 30)
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                  {/* Sons count */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Number of Sons: <span className="text-slate-900 font-bold">{calcSonsCount}</span>
                    </label>
                    <div className="flex gap-1.5">
                      {[0, 1, 2, 3, 4].map((num) => (
                        <button
                          key={`son-${num}`}
                          onClick={() => setCalcSonsCount(num)}
                          className={`w-9 h-8 rounded-lg text-xs font-bold transition-all ${
                            calcSonsCount === num
                              ? "bg-[#172228] text-white shadow-xs"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Daughters count */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Number of Daughters: <span className="text-slate-900 font-bold">{calcDaughtersCount}</span>
                    </label>
                    <div className="flex gap-1.5">
                      {[0, 1, 2, 3, 4].map((num) => (
                        <button
                          key={`dau-${num}`}
                          onClick={() => setCalcDaughtersCount(num)}
                          className={`w-9 h-8 rounded-lg text-xs font-bold transition-all ${
                            calcDaughtersCount === num
                              ? "bg-[#172228] text-white shadow-xs"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Calculation Output Card */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 border-b border-slate-200 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Calculated Deemed Split Breakdown
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      Partition Units: {calcResults.partitionUnits} equal shares
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-white rounded-lg border border-slate-200">
                      <p className="text-[11px] text-slate-500 font-bold">Karta&apos;s Deemed Share</p>
                      <p className="text-base font-extrabold text-[#C65378] mt-0.5">
                        {formatLakhs(calcResults.kartaDeemedShare)}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1">
                        {calcHasWill
                          ? "Passes via Will to chosen heir"
                          : `Divides among ${calcResults.class1HeirCount} Class I heirs`}
                      </p>
                    </div>

                    {calcHasWife && (
                      <div className="p-3 bg-white rounded-lg border border-slate-200">
                        <p className="text-[11px] text-slate-500 font-bold">Wife Total Net Claim</p>
                        <p className="text-base font-extrabold text-slate-900 mt-0.5">
                          {formatLakhs(calcResults.finalWifeTotal)}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-1">
                          Notional share + estate
                        </p>
                      </div>
                    )}

                    <div className="p-3 bg-white rounded-lg border border-slate-200">
                      <p className="text-[11px] text-slate-500 font-bold">Each Child Net Claim</p>
                      <p className="text-base font-extrabold text-emerald-700 mt-0.5">
                        {formatLakhs(calcResults.finalSonTotal)}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1">
                        Equal birthright + estate
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs">
                    <p className="text-slate-600">
                      Need detailed estate calculation covering self-acquired asset and family debts?
                    </p>
                    <Link
                      href="/tools/succession-calculator"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#172228] text-white font-bold shrink-0 hover:bg-slate-800 transition-colors"
                    >
                      <Calculator className="w-3.5 h-3.5 text-rose-300" />
                      <span>Full Estate Tool</span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: TAX IMPLICATIONS AND KYC */}
            <section id="tax-implications-and-kyc" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>Taxation &amp; Regulatory Compliance</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                8. Tax Implications: Income Tax Section 171 &amp; KYC
              </h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Navigating the Income Tax Act, 1961 is essential after the demise of the Karta. The HUF possesses a separate PAN and is treated as a distinct person under Section 2(31) of the Act.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Section 47(i) Exemption</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900">Zero Capital Gains on Split</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 47(i), any split of capital assets during a total split of an HUF is not regarded as a transfer. No capital gains tax is payable when physical assets are allotted to coparceners.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Section 171(9) Warning</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900">No Partial Partitions Recognized</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Partial partitions effected after December 31, 1978 are not recognized for tax purposes. To stop HUF tax assessments, the family must claim a total split before the Assessing Officer under Section 171.
                  </p>
                </div>
              </div>

              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                <strong>Cost of Acquisition (Section 49(1)):</strong> When a coparcener then sells an asset received from an HUF split, the cost of acquisition is deemed to be the cost at which the HUF originally acquired the asset. The holding period also includes the years the asset was held by the HUF.
              </p>
            </section>

            {/* SECTION 9: STEP-BY-STEP SOP FOR UPDATING KARTA */}
            <section id="step-by-step-karta-update-sop" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>Practical Protocol</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                9. Step-by-Step SOP: Updating Karta Records &amp; Bank
              </h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Follow this 6-stage standard operating step to update institutions, bank accounts, and tax records smoothly following the Karta&apos;s death:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Stage 1: Secure Death Paper</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Obtain multiple certified copies of the deceased Karta&apos;s city death paper. Ensure name spelling matches the HUF deed and PAN records exactly.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Stage 2: Execute Family Declaration</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Draft a Declaration of Estate to Kartaship. Have all adult surviving coparceners and members sign, verifying the family tree and the new Karta&apos;s seniority.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Stage 3: Update HUF Bank Accounts</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Submit the death paper, family declaration, new Karta&apos;s KYC (Aadhaar &amp; PAN), and a standard Letter of Indemnity to change authorized bank account signing powers.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Stage 4: Update Demat &amp; Mutual Funds</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Approach the Depository Participant (DP) for demat shares and mutual fund RTAs with form Annexure L, changing the filed Karta profile without liquidating investments.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    5
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Stage 5: Update Income Tax e-Filing Profile</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Log into the HUF&apos;s e-filing portal account. Go to &apos;Register as Legal Heir&apos; / update Karta details, attaching the death paper and consent letter.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    6
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Stage 6: Asset Name Change (If Partitioning)</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      If the family decides on a total split, register the split deed at the SRO office and apply for city revenue name change in each coparcener&apos;s name.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: COMMON HUF MISTAKES TO AVOID */}
            <section id="common-huf-mistakes" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4" />
                <span>Risk Prevention</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                10. Common HUF Asset Mistakes Families Must Avoid
              </h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                During stressful bereavement, families frequently commit avoidable procedural errors that trigger tax penalties or years of bitter split court fights.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-rose-100 shadow-xs space-y-1.5">
                  <h3 className="text-sm font-bold text-rose-900 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-600" />
                    Willing Entire Family Assets
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Will makers often bequeath an entire family house to a single child. The Will is right away challenged in court because other coparceners have unalienable birthrights.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-rose-100 shadow-xs space-y-1.5">
                  <h3 className="text-sm font-bold text-rose-900 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-600" />
                    Excluding Married Daughters
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Following the Supreme Court&apos;s ruling in <em>Vineeta Sharma (2020)</em>, married daughters are equal coparceners by birth. Excluding them from estate or split invalidates the deal.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-rose-100 shadow-xs space-y-1.5">
                  <h3 className="text-sm font-bold text-rose-900 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-600" />
                    Informal Oral Partitions Without Tax Approval
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dividing bank money verbally without a formal Section 171 assessment order leaves the HUF subject to continued income tax notices and penalties.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-rose-100 shadow-xs space-y-1.5">
                  <h3 className="text-sm font-bold text-rose-900 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-600" />
                    Ignoring Income Clubbing Under Section 64(2)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If personal assets were transferred into the HUF without adequate payment, income generated from the spouse&apos;s partitioned share continues to be clubbed with the transferor.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: 4 REAL LIFE SCENARIOS */}
            <section id="specialized-huf-scenarios" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>Case Studies</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                11. 4 Real Life Family Scenarios After Karta Death
              </h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Review these common scenarios illustrating how Indian succession statutes apply in real-world family arrangements:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-[#C65378]">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase">Scenario A: Only Daughters Surviving</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900">Eldest Daughter Takes Charge</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A father passes away leaving a wife and two daughters. Under the <em>Sujata Sharma</em> ruling, the eldest daughter steps into the role of Karta. The family operates the HUF smoothly without needing a male manager.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-[#5F7E75]">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase">Scenario B: Minor Children Surviving</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900">Mother as Natural Guardian Manager</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A Karta passes away leaving two children aged 10 and 14. The surviving mother acts as legal guardian and manager of the HUF asset until the 14-year-old turns 18 and becomes eligible to assume Kartaship.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-amber-700">
                    <Scale className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase">Scenario C: One Child Demands Split</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900">Right to Split is Absolute</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If an adult son or daughter requests a split, other coparceners cannot legally block it. A filed split deed must be drawn up dividing assets according to deemed split shares.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-indigo-700">
                    <FileCheck className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase">Scenario D: Karta Wills Share to Wife</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900">Protected Will Allocation</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Karta writes a Will bequeathing his personal 25% deemed share exclusively to his wife for her financial security. Under Section 30, this bequest is valid and cannot be challenged by the children.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: HOW TO HANDLE HUF IN WILL */}
            <section id="how-to-handle-huf-in-will" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>Drafting Strategy</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                12. How to Handle HUF Asset in Your Last Will
              </h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                When drafting a Will in India, precision in language prevents family fights. Here is the recommended clause structure when addressing an undivided joint interest:
              </p>

              <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed space-y-3">
                <div className="flex items-center justify-between text-rose-300 font-sans font-bold text-xs pb-2 border-b border-slate-800">
                  <span>Standard Joint Bequest Clause</span>
                  <span>HSA Section 30 Compliant</span>
                </div>
                <p>
                  &quot;I declare that I hold an undivided joint share in the [Family Name] HUF. Under Section 30 of the Hindu Succession Act, 1956, I hereby bequeath my entire undivided joint share, right, title, and interest in the said HUF, as ascertainable under Section 6 of the said Act, absolutely to my [Spouse/Daughter/Son/Heir Name].
                </p>
                <p>
                  I further clarify that this bequest is restricted solely to my undivided fractional entitlement, and does not alter the independent joint shares of my surviving coparceners.&quot;
                </p>
              </div>

              {/* Conversion Callout */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="text-base font-extrabold text-slate-900">
                    Protect Your Family From Costly Split Fights
                  </h3>
                  <p className="text-xs text-slate-600">
                    Create a lawyer-checked Will clearly distinguishing personal asset from your HUF share in 15 minutes.
                  </p>
                </div>
                <button
                  onClick={handleStartDraft}
                  className="px-6 py-3 rounded-full bg-[#C65378] text-white font-extrabold text-xs shrink-0 hover:bg-[#b04568] transition-all transform hover:-translate-y-0.5 shadow-md shadow-[#C65378]/20 inline-flex items-center gap-2"
                >
                  <span>Start Your Will Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>

            {/* SECTION 13: HUF AUDIT CHECKLIST */}
            <section id="huf-audit-checklist" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>Free Audit Protocol</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                13. Post-Death HUF Legal &amp; Estate Audit Checklist
              </h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Use this free check checklist to ensure your family fulfills all legal obligations under the Hindu Succession Act and Income Tax Act.
              </p>

              <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-slate-700">
                    Completed {checkedCount} of 6 key checks
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyChecklist}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs inline-flex items-center gap-1.5 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied" : "Copy Checklist"}</span>
                    </button>
                    <button
                      onClick={handlePrint}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {[
                    {
                      id: "check-1",
                      label: "Obtain original City Death Paper of the Karta with checked name spelling.",
                    },
                    {
                      id: "check-2",
                      label: "Identify the senior-most living coparcener (eldest son or eldest daughter).",
                    },
                    {
                      id: "check-3",
                      label: "Execute a unanimous family resolution and declaration of Kartaship.",
                    },
                    {
                      id: "check-4",
                      label: "Update KYC and signatory credentials at the HUF's bank branches.",
                    },
                    {
                      id: "check-5",
                      label: "Update Karta details in the Income Tax e-Filing portal profile.",
                    },
                    {
                      id: "check-6",
                      label: "Segregate personal self-acquired assets from family joint assets.",
                    },
                  ].map((item) => (
                    <label
                      key={item.id}
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={!!checkedItems[item.id]}
                        onChange={() => toggleCheck(item.id)}
                        className="mt-1 w-4 h-4 accent-[#C65378] rounded cursor-pointer"
                      />
                      <span className={`text-xs md:text-sm ${checkedItems[item.id] ? "text-slate-900 font-medium" : "text-slate-500"}`}>
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 14: FREQUENTLY ASKED QUESTIONS */}
            <section id="frequently-asked-questions" className="scroll-target space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>Direct Answers</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                14. Frequently Asked Questions: HUF Karta Estate
              </h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Find clear answers to everyday questions regarding HUF assets, split, and estate rights after the Karta&apos;s death:
              </p>

              <div className="space-y-3">
                {[
                  {
                    q: "Does an HUF automatically dissolve when the Karta dies?",
                    a: "No, an HUF does not dissolve automatically upon the death of the Karta. The HUF continues to exist as a separate legal and tax entity. The management naturally passes to the next senior coparcener, unless the surviving coparceners choose to carry out a full split of assets.",
                  },
                  {
                    q: "Who becomes the new Karta after the death of the father or existing Karta?",
                    a: "By law, the senior-most surviving coparcener automatically becomes the new Karta. This can be the eldest son or the eldest daughter. In Sujata Sharma v. Manu Gupta (2015), the Delhi High Court confirmed that the eldest daughter can legally become the Karta of an HUF.",
                  },
                  {
                    q: "Can the Karta give away the entire HUF asset in his Will?",
                    a: "No. The Karta cannot will away the entire HUF asset because it belongs collectively to all coparceners. However, under Section 30 of the Hindu Succession Act, 1956, the Karta has full legal power to bequeath his own undivided joint share through a Will.",
                  },
                  {
                    q: "What is deemed or notional split under Section 6 of the Hindu Succession Act?",
                    a: "Under Section 6(3) of the Act, when a coparcener dies, the law calculates his share by assuming a notional split took place right away before his death. The share that would have been allotted to him in that split becomes his personal estate, which passes according to his Will or legal estate rules.",
                  },
                  {
                    q: "Can an eldest daughter become the Karta of an HUF?",
                    a: "Yes. Following the Hindu Succession (Amendment) Act, 2005 and the landmark Delhi High Court judgment in Sujata Sharma v. Manu Gupta (2015), daughters are coparceners by birth and have equal rights as sons. The senior-most coparcener, regardless of gender, is legally entitled to act as Karta.",
                  },
                  {
                    q: "What happens if all surviving coparceners are minors?",
                    a: "If all surviving coparceners are minors, the surviving mother can act as the natural guardian and legal manager of the HUF asset on behalf of the minors until the eldest coparcener attains majority. This principle was upheld by the Supreme Court in CIT v. Laxmi Narayan Bhadani.",
                  },
                  {
                    q: "Does split of HUF asset attract capital gains tax in India?",
                    a: "No. Under Section 47(i) of the Income Tax Act, 1961, any split of capital assets on the total or partial split of an HUF is not regarded as a transfer. Therefore, no capital gains tax is payable at the time of HUF asset split.",
                  },
                  {
                    q: "Are partial partitions of an HUF recognized by the Income Tax Office?",
                    a: "No. Under Section 171(9) of the Income Tax Act, partial partitions effected after December 31, 1978, are not recognized for tax purposes. For income tax assessment, only a full (total) split is recognized, requiring an inquiry and order by the Assessing Officer.",
                  },
                  {
                    q: "How should an single mention their HUF share in their personal Will?",
                    a: "A Will maker should clearly distinguish self-acquired assets from their HUF share. In the Will, they should mainly bequeath their 'undivided joint share and interest in the HUF as determined under Section 6 and Section 30 of the Hindu Succession Act, 1956', without attempting to gift specific physical family assets.",
                  },
                  {
                    q: "What papers are required to update bank accounts and PAN after Karta death?",
                    a: "The family must provide the original death paper of the deceased Karta, a declaration of estate signed by all surviving coparceners, identity and address proofs of the new Karta, fresh KYC forms for the bank, and a formal letter of indemnity.",
                  },
                ].map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={`faq-${index}`}
                      className="rounded-xl bg-white border border-slate-200/80 overflow-hidden shadow-xs"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 15: STATUTORY CITATIONS & AUTHORITIES */}
            <section id="statutory-citations" className="scroll-target pt-6 border-t border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>Legal Office &amp; Links</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                15. Legal Offices &amp; Landmark Judicial Precedents
              </h3>
              <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <p>
                  <strong>Legal Enactments:</strong> Hindu Succession Act, 1956 (Section 6: Devolution of interest in joint asset; Section 8: General rules of estate in the case of males; Section 30: Will gift); Income Tax Act, 1961 (Section 171: Assessment after split of a Hindu undivided family; Section 47(i): Transactions not regarded as transfer; Section 49(1): Cost of acquisition).
                </p>
                <p>
                  <strong>Key Supreme Court &amp; High Court Precedents:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <em>Sujata Sharma v. Shri Manu Gupta &amp; Ors. [CS (OS) 2011/2006, Delhi HC 2015]</em> — Held that an eldest daughter can legally be the Karta of an HUF following the 2005 amendment.
                  </li>
                  <li>
                    <em>Vineeta Sharma v. Rakesh Sharma [(2020) 9 SCC 1]</em> — Held that daughters are equal coparceners by birth with retrospective effect under amended Section 6.
                  </li>
                  <li>
                    <em>Gurupad Khandappa Magdum v. Hirabai Khandappa Magdum [1978 AIR 1239 (SC)]</em> — Established the mathematical method of deemed notional split.
                  </li>
                  <li>
                    <em>Commissioner of Income Tax v. Laxmi Narayan Bhadani [(1944) 12 ITR 355]</em> — Management rights of natural guardian over minor coparceners.
                  </li>
                </ul>
              </div>

              {/* Related Internal Guides */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-700 block mb-2">
                  Related Guides &amp; Tools in Family Rights Cluster:
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Link
                    href="/blogs/married-daughter-rights-in-fathers-property"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-[#C65378] text-slate-700 font-semibold transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Married Daughter Asset Rights</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    href="/tools/succession-calculator"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-[#C65378] text-slate-700 font-semibold transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Estate Share Tool</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    href="/blogs/property-transfer-after-death-without-will-india"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-[#C65378] text-slate-700 font-semibold transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Asset Transfer Without Will</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    href="/start"
                    className="px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] font-bold hover:bg-rose-100 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Draft Your Will</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </section>
          
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">Why Write a Will Now?</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                A clear Will keeps your spouse and kids safe. It stops long court fights. You pick who gets your house, land, shop, gold, and bank cash. Do not wait to put your plan in writing.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">Simple Plain Paper Rules</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                You can write a Will on plain white paper. No stamp paper is needed in India. Sign it in front of two adult witnesses. Each witness signs in your view to make it valid.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our team checks your asset list and tax bills. We write your Will in clear words with no mix-ups. Then we guide you step by step so your heirs get their share fast.
              </p>
            </div>
          </div>

      </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (Author, CTA, Trust Cards)
              ===================================================================== */}
          <aside className="space-y-5 sticky top-28">
            {/* CARD 1: AUTHOR BIO CARD */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] flex items-center justify-center font-extrabold text-sm shrink-0">
                  AAM
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    <a
                      href="https://www.linkedin.com/in/iamanujmalik/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#C65378] transition-colors"
                    >
                      Lawyer Anuj Anand Malik
                    </a>
                  </h3>
                  <p className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Estate Counsel
                  </p>
                  <p className="text-[11px] text-slate-500">WillDrafting.in</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Expert in Hindu succession, joint split suits, and high-value Will estate planning with over 18 years of court experience.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Bar Council Checked
                </span>
                <a
                  href="https://www.linkedin.com/in/iamanujmalik/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#C65378] hover:underline"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-5 desktop-sidebar-only">
{/* CARD 2: EMERGENCY CTA CARD */}
            <div className="hidden lg:block rounded-2xl bg-[#172228] p-6 text-white text-center space-y-4 shadow-lg shadow-[#172228]/15">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold tracking-wider uppercase text-rose-200">
                <Lock className="w-3 h-3 text-[#C65378]" />
                <span>Fight-Proof Drafting</span>
              </div>
              <h3 className="text-lg font-extrabold leading-tight">
                Own an HUF Share or Family Asset?
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Avoid bitter fights. Create a customized, lawyer-checked Will clearly securing your joint share in 15 minutes.
              </p>
              <button
                onClick={handleStartDraft}
                className="w-full py-3 px-4 rounded-full bg-[#C65378] text-white font-extrabold text-xs hover:bg-[#b04568] transition-all transform hover:-translate-y-0.5 shadow-md shadow-[#C65378]/30 flex items-center justify-center gap-2"
              >
                <span>Draft Your Will Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <div className="pt-2 border-t border-white/10 text-[11px] text-white/70 flex items-center justify-center gap-2">
                <PhoneCall className="w-3 h-3 text-rose-300" />
                <span>Lawyer talk included</span>
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
                    <strong>Legal Precision:</strong> Clauses checked under Sections 6 &amp; 30 of HSA.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Capital Gains:</strong> Structured for Section 47(i) tax compliance.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Daughter Rights Protected:</strong> Incorporates <em>Vineeta Sharma</em> principles.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>High Court Precedents:</strong> Formats updated for the <em>Sujata Sharma</em> ruling.
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
                  href="/blogs/married-daughter-rights-in-fathers-property"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/40 transition-colors"
                >
                  <p className="text-xs font-bold text-slate-900 leading-snug">
                    Married Daughter Rights in Father Asset
                  </p>
                  <span className="text-[10px] text-[#C65378] font-semibold mt-1 inline-flex items-center gap-1">
                    Read Guide <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </Link>
                <Link
                  href="/blogs/second-wife-children-property-rights-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/40 transition-colors"
                >
                  <p className="text-xs font-bold text-slate-900 leading-snug">
                    Second Wife &amp; Children Asset Rights
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
                    Free Hindu Succession Tool
                  </p>
                  <span className="text-[10px] text-[#C65378] font-semibold mt-1 inline-flex items-center gap-1">
                    Open Tool <ArrowRight className="w-2.5 h-2.5" />
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
                  Married Daughter Asset Rights
                </Link>
                <Link
                  href="/blogs/second-wife-children-property-rights-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Second Wife & Children Rights
                </Link>
                <Link
                  href="/templates/release-deed-format"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Release Deed Format
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
          IMAGE MODAL (FOR VIEWING HIGH RESOLUTION INFOGRAPHIC)
          ========================================================================= */}
      {showImageModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-950 rounded-2xl overflow-hidden shadow-2xl p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 text-white">
              <span className="text-xs font-bold">
                HUF Asset After Death of Karta — Flow Diagram &amp; Legal Framework
              </span>
              <button
                onClick={() => setShowImageModal(false)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full rounded-xl overflow-hidden">
              <Image
                src="/images/huf-property-after-death-of-karta.jpg"
                alt="HUF Property After Death of Karta Full Flow Diagram"
                width={1200} height={675}
                className="absolute inset-0 w-full h-full object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
