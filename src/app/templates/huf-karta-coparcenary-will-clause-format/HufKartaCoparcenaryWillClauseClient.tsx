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
  Lock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Landmark,
  Check,
  X,
  Gavel,
  Calculator,
  Copy,
  CheckCheck,
  Users,
  FileText,
  AlertCircle,
} from "lucide-react";

// Table of Contents Items (strictly <= 70 chars, 0 em-dashes, unique matching anchor IDs)
const TOC_ITEMS = [
  { id: "huf-will-statutory-rules", label: "1. Statutory Rules: Bequeathing HUF Share" },
  { id: "notional-partition-simulator", label: "2. Interactive HUF Notional Partition Tool" },
  { id: "void-vs-valid-comparison", label: "3. Void vs Valid HUF Bequest Clauses" },
  { id: "section-30-coparcenary-rights", label: "4. Section 30 Hindu Succession Act Rights" },
  { id: "radhamma-supreme-court-precedent", label: "5. Radhamma v. Muddukrishna Ruling" },
  { id: "huf-will-clause-template", label: "6. Section 30 HUF Coparcenary Clause Format" },
  { id: "karta-powers-and-limitations", label: "7. HUF Karta Powers: Self vs HUF Estate" },
  { id: "daughter-coparcenary-shares", label: "8. Daughter Rights Under Vineeta Sharma" },
  { id: "step-by-step-drafting-sop", label: "9. Step-by-Step SOP: HUF Will Drafting" },
  { id: "common-fatal-mistakes", label: "10. Five Fatal HUF Bequest Mistakes" },
  { id: "frequently-asked-questions", label: "11. Frequently Asked Questions" },
  { id: "statutory-citations", label: "12. Statutory Citations & Precedents" },
];

const FAQS = [
  {
    q: "Can a Karta bequeath the entire HUF property in his Will?",
    a: "No. A Karta does not own the whole HUF property. Joint family property belongs to all coparceners together by birth. Any clause giving away the entire house is void from the start. A Karta can only give his own undivided share in a Will.",
  },
  {
    q: "What is the correct way to mention an HUF share in a Will?",
    a: "Under Section 30 of the Hindu Succession Act, 1956, you must state: 'I bequeath my undivided coparcenary share in the HUF as determined on notional partition under Section 6 immediately before my death.' This legal formula keeps your Will valid.",
  },
  {
    q: "What did the Supreme Court hold in Radhamma v. Muddukrishna (2019)?",
    a: "In Radhamma v. H.N. Muddukrishna (2019), the Supreme Court ruled that Section 30 gives a coparcener the right to bequeath his share by Will. However, the bequest applies only to his individual notional share. He cannot give away shares of other coparceners.",
  },
  {
    q: "How is the testator's undivided coparcenary share calculated?",
    a: "Under Section 6(3) of the Act, the share is found by a notional partition. The law assumes a partition happened just before death. The property is divided equally among the living coparceners and the wife to determine the testator's exact fraction.",
  },
  {
    q: "Do daughters have equal coparcenary rights in an HUF?",
    a: "Yes. In Vineeta Sharma v. Rakesh Sharma (2020), the Supreme Court ruled that daughters are equal coparceners by birth. They hold the exact same rights as sons. In any notional partition calculation, daughters receive equal shares with sons.",
  },
  {
    q: "Can an HUF coparcener bequeath his share to a non-family outsider?",
    a: "Yes. Section 30 gives you testamentary power over your own share. You can leave your share to your spouse, one child, a trust, or an outside legatee. The person who gets the share can then ask for a formal partition.",
  },
  {
    q: "Does bequeathing an HUF share dissolve the HUF for income tax purposes?",
    a: "No. Bequeathing your share does not automatically close the HUF entity. Under Section 171 of the Income Tax Act, 1961, the HUF continues under its PAN until a complete partition by metes and bounds is accepted by the tax officer.",
  },
  {
    q: "Who becomes the new Karta after the death of the existing Karta?",
    a: "When the Karta passes away, the senior-most surviving coparcener becomes the new Karta by law. The Delhi High Court held in Sujata Sharma v. Manu Gupta that an elder daughter can also legally serve as Karta.",
  },
];

export default function HufKartaCoparcenaryWillClauseClient() {
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

  const [activeId, setActiveId] = useState<string>("huf-will-statutory-rules");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedClause1, setCopiedClause1] = useState<boolean>(false);
  const [copiedClause2, setCopiedClause2] = useState<boolean>(false);
  const [copiedClause3, setCopiedClause3] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // ==========================================
  // INTERACTIVE NOTIONAL PARTITION CALCULATOR
  // ==========================================
  const [numSons, setNumSons] = useState<number>(1);
  const [numDaughters, setNumDaughters] = useState<number>(1);
  const [hasSpouse, setHasSpouse] = useState<boolean>(true);
  const [totalHufValue, setTotalHufValue] = useState<number>(40000000); // ₹4.00 Cr default

  // Total shares on notional partition:
  // Karta (1) + Spouse (1, if alive) + Sons + Daughters
  const totalPartitionUnits = 1 + (hasSpouse ? 1 : 0) + numSons + numDaughters;
  const unitPercentage = 100 / totalPartitionUnits;
  const unitValue = Math.round(totalHufValue / totalPartitionUnits);

  // Karta bequeathable portion
  const kartaSharePercent = unitPercentage.toFixed(2);
  const kartaShareValue = unitValue;
  const remainingSharePercent = (100 - unitPercentage).toFixed(2);
  const remainingShareValue = totalHufValue - unitValue;

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

  const copyClause1ToClipboard = () => {
    const clauseText = `SECTION 30 HINDU SUCCESSION ACT: BEQUEST OF UNDIVIDED COPARCENARY INTEREST IN HUF
"BEQUEST OF COPARCENARY SHARE IN HINDU UNDIVIDED FAMILY:
1. I declare that I am a coparcener and the present Karta of the Hindu Undivided Family (HUF) known and styled as '[Name of HUF]' (holding Permanent Account Number [HUF PAN Number]).

2. The said HUF possesses joint family properties, immovable real estate, capital assets, bank accounts, and demat holdings as set out in Schedule 'H' annexed hereto.

3. In exercise of the testamentary powers expressly conferred upon me by Section 30 read with the Explanation thereto of the Hindu Succession Act, 1956, and in accordance with the law laid down by the Hon'ble Supreme Court of India in Radhamma v. H.N. Muddukrishna (2019) 3 SCC 611, I hereby devise, bequeath, and give my entire undivided coparcenary share, right, title, and interest in the said HUF, as shall be ascertained and quantified upon a notional partition taking place immediately prior to my demise under Section 6(3) of the said Act, absolutely and forever to my [Relationship with Legatee], [Full Name of Legatee], son/daughter of [Parent Name], residing at [Address], Aadhaar No. [XXXX-XXXX-XXXX].

4. I expressly clarify that I am not bequeathing the whole of any specific HUF physical asset or infringing upon the coparcenary shares of my surviving co-coparceners, but am strictly disposing of my lawful undivided interest therein. The said legatee shall be entitled to step into my shoes, demand partition, and receive the separated physical portion or financial proceeds corresponding to my share."`;

    navigator.clipboard.writeText(clauseText);
    setCopiedClause1(true);
    setTimeout(() => setCopiedClause1(false), 3000);
  };

  const copyClause2ToClipboard = () => {
    const clauseText = `DISTINCTION CLAUSE: SEPARATE SELF-ACQUIRED PROPERTY VS HUF COPARCENARY SHARE
"DECLARATION OF INDIVIDUAL VS JOINT FAMILY ESTATE:
I hereby specifically declare and clarify the distinction between my self-acquired individual assets and my coparcenary interest in the HUF:

(a) Schedule 'A' to 'D' properties are my exclusive, self-acquired, and self-earned properties purchased out of my individual funds and income without any aid of joint family nucleus or ancestral funds. Over these properties, I hold full, absolute, and unencumbered testamentary power under Section 30 of the Hindu Succession Act, 1956.

(b) Schedule 'H' properties belong to the Hindu Undivided Family known as '[Name of HUF]'. In respect of Schedule 'H', this Will operates exclusively upon my undivided coparcenary interest determined on notional partition immediately prior to my death, and does not alter the coparcenary title of the remaining members of the family."`;

    navigator.clipboard.writeText(clauseText);
    setCopiedClause2(true);
    setTimeout(() => setCopiedClause2(false), 3000);
  };

  const copyClause3ToClipboard = () => {
    const clauseText = `KARTA MANAGEMENT SUCCESSION AND CONTINUITY DIRECTIVE:
"APPOINTMENT OF NEW KARTA AND MANAGEMENT CONTINUITY:
Upon my demise, the management and administration of the joint family affairs of '[Name of HUF]' shall devolve upon the senior-most surviving coparcener of the family, namely my [elder son / elder daughter / brother], [Full Name], in accordance with Hindu law and the principles recognized by the Hon'ble Delhi High Court in Mrs. Sujata Sharma v. Shri Manu Gupta.

The surviving coparceners shall be at liberty to continue the HUF entity under its existing PAN [HUF PAN Number] or effect a complete partition by metes and bounds under Section 171 of the Income Tax Act, 1961 upon mutual registered agreement."`;

    navigator.clipboard.writeText(clauseText);
    setCopiedClause3(true);
    setTimeout(() => setCopiedClause3(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `HUF COPARCENARY WILL DRAFTING AUDIT CHECKLIST:
1. HUF PAN Card copy and latest 3 years of Income Tax Returns (ITR-2/3) filed for the HUF.
2. Complete Family Pedigree Tree (Shajra / Genealogic Chart) identifying all living coparceners (sons and daughters) and female members entitled to maintenance or partition share.
3. Original title deeds establishing whether the property was inherited through ancestral lineage (3 generations of male descent) or impressed with joint family character.
4. Clear list of separate individual bank accounts vs HUF bank accounts to prevent blending claims under Section 171.
5. Verification that daughters born before or after September 9, 2005 are recognized as equal coparceners pursuant to Vineeta Sharma v. Rakesh Sharma.
6. Insertion of the precise 'Section 30 notional partition' formula in the Will, avoiding any physical room-by-room bequest of undivided HUF real estate.
7. Nomination of two independent witnesses who are not beneficiaries or coparceners in the HUF under Section 67 of the Indian Succession Act, 1925.`;

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
            <span>HINDU SUCCESSION ACT, 1956 • SECTION 6 &amp; SECTION 30</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            How to Mention HUF Coparcenary Share in Will Format
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Learn the exact statutory formula to bequeath an undivided coparcenary interest in your Will.
            Master Section 30 wording, notional partition math, and the landmark Supreme Court ruling in{" "}
            <strong>Radhamma v. Muddukrishna</strong> to avoid costly family litigation.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#huf-will-clause-template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get HUF Will Clause Format</span>
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
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Consult Succession Counsel</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 30</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                COPARCENARY WILL BEQUEST POWER
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 6(3)</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                STATUTORY NOTIONAL PARTITION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Radhamma (SC)</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                LANDMARK 2019 PRECEDENT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">100% Equal</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                DAUGHTER COPARCENARY BY BIRTH
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
                <span>Governing Law</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed by Sections 6 and 30 of the Hindu Succession Act, 1956, and upheld by the Supreme Court of
                India in Radhamma v. Muddukrishna (2019) and Vineeta Sharma v. Rakesh Sharma (2020).
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
                <span>EXECUTIVE BRIEF: HOW TO MENTION HUF SHARE IN A WILL</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>The Fatal Error:</strong> Never write <em>&quot;I give the HUF property at Connaught Place to my son.&quot;</em>{" "}
                    A Karta does not own the whole building. Writing this makes your clause legally void.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>The Legal Formula:</strong> State: <em>&quot;I give my undivided coparcenary share in the HUF as determined on notional partition under Section 30 of the Hindu Succession Act, 1956.&quot;</em>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Supreme Court Precedent:</strong> In <em>Radhamma v. Muddukrishna (2019)</em>, the Supreme Court confirmed that a coparcener can make a will for his share, but only for his personal notional share.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Daughters Hold Equal Shares:</strong> Under the <em>Vineeta Sharma (2020)</em> ruling, daughters are equal coparceners by birth. Each daughter receives an equal share in the notional partition pool.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION */}
            <section id="huf-will-statutory-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Statutory Rules: Bequeathing HUF Share in a Will
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A Hindu Undivided Family (HUF) holds joint family property. In old Hindu law, this property passed by
                  survivorship. When a family member died, his share went to the remaining members. A person could not give
                  away this share in a will.
                </p>
                <p>
                  In 1956, Parliament changed this rule. Section 30 of the Hindu Succession Act created a new right. Now,
                  a coparcener can give his own share in a will. But the Karta cannot give the entire property. The joint
                  house belongs to all members by birth. You only own an undivided share. This guide shows how to write that
                  share correctly.
                </p>
                <p>
                  Because the property is not split during life, the testator does not own a single room or floor. If a Karta
                  names a specific room in his will, the clause fails in court. The will must refer to the undivided interest.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR */}
            <section id="notional-partition-simulator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE SIMULATOR</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Tool: HUF Notional Partition Calculator
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Under Section 6(3) of the Act, your share is found by a legal fiction. This is called a notional partition.
                The law assumes a partition happened just before death. Use this tool to compute your exact share.
              </p>

              {/* Calculator Box */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-6 border-b border-slate-100">
                  {/* Sons Count */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                      <span>Sons (Coparceners)</span>
                      <span className="text-[#C65378] font-black">{numSons}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setNumSons(Math.max(0, numSons - 1))}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-black text-slate-700 flex items-center justify-center"
                      >
                        -
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="6"
                        value={numSons}
                        onChange={(e) => setNumSons(parseInt(e.target.value))}
                        className="w-full accent-[#C65378]"
                      />
                      <button
                        type="button"
                        onClick={() => setNumSons(Math.min(6, numSons + 1))}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-black text-slate-700 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Daughters Count */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
                      <span>Daughters (Coparceners)</span>
                      <span className="text-[#C65378] font-black">{numDaughters}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setNumDaughters(Math.max(0, numDaughters - 1))}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-black text-slate-700 flex items-center justify-center"
                      >
                        -
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="6"
                        value={numDaughters}
                        onChange={(e) => setNumDaughters(parseInt(e.target.value))}
                        className="w-full accent-[#C65378]"
                      />
                      <button
                        type="button"
                        onClick={() => setNumDaughters(Math.min(6, numDaughters + 1))}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-black text-slate-700 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Surviving Spouse */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Wife / Surviving Spouse
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setHasSpouse(true)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          hasSpouse
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Yes (Alive)
                      </button>
                      <button
                        type="button"
                        onClick={() => setHasSpouse(false)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          !hasSpouse
                            ? "bg-[#C65378] text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        No / Deceased
                      </button>
                    </div>
                  </div>

                  {/* Total HUF Valuation */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Total HUF Asset Value
                    </label>
                    <select
                      value={totalHufValue}
                      onChange={(e) => setTotalHufValue(parseInt(e.target.value))}
                      className="w-full py-2 px-3 rounded-xl text-xs font-bold border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value={10000000}>₹1.00 Crore</option>
                      <option value={20000000}>₹2.00 Crores</option>
                      <option value={40000000}>₹4.00 Crores</option>
                      <option value={75000000}>₹7.50 Crores</option>
                      <option value={100000000}>₹10.00 Crores</option>
                      <option value={200000000}>₹20.00 Crores</option>
                    </select>
                  </div>
                </div>

                {/* Calculation Output Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Result: Karta's Bequeathable Share */}
                  <div className="bg-rose-50/80 rounded-2xl border-2 border-rose-200 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase bg-[#C65378] text-white tracking-wider">
                        YOUR MAXIMUM BEQUEATHABLE LIMIT
                      </span>
                      <span className="text-xs font-bold text-rose-800">
                        1 of {totalPartitionUnits} Equal Shares
                      </span>
                    </div>

                    <div>
                      <div className="text-xs text-rose-900/80 font-bold uppercase tracking-wider">
                        Karta / Testator Coparcenary Share
                      </div>
                      <div className="text-3xl sm:text-4xl font-black text-[#C65378] mt-1">
                        {kartaSharePercent}%
                      </div>
                      <div className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                        {formatINR(kartaShareValue)}
                      </div>
                    </div>

                    <p className="text-xs text-rose-950/80 leading-relaxed pt-2 border-t border-rose-200/80">
                      Under Section 30, your Will can <strong>ONLY</strong> dispose of this exact {kartaSharePercent}% share ({formatINR(kartaShareValue)}).
                      You can leave this part to your wife, one child, or any chosen person.
                    </p>
                  </div>

                  {/* Right Result: Surviving Coparceners Protected Estate */}
                  <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase bg-slate-200 text-slate-800 tracking-wider">
                        SURVIVING COPARCENARY ESTATE
                      </span>
                      <span className="text-xs font-bold text-slate-600">
                        {totalPartitionUnits - 1} Shares Untouchable
                      </span>
                    </div>

                    <div>
                      <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                        Protected Family Coparcenary Share
                      </div>
                      <div className="text-3xl sm:text-4xl font-black text-slate-800 mt-1">
                        {remainingSharePercent}%
                      </div>
                      <div className="text-lg sm:text-xl font-bold text-slate-700 mt-0.5">
                        {formatINR(remainingShareValue)}
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200">
                      {hasSpouse && (
                        <div className="flex justify-between">
                          <span>Wife&apos;s Notional Share:</span>
                          <span className="font-bold text-slate-900">{kartaSharePercent}% ({formatINR(unitValue)})</span>
                        </div>
                      )}
                      {numSons > 0 && (
                        <div className="flex justify-between">
                          <span>Each Son&apos;s Coparcenary Share:</span>
                          <span className="font-bold text-slate-900">{kartaSharePercent}% ({formatINR(unitValue)})</span>
                        </div>
                      )}
                      {numDaughters > 0 && (
                        <div className="flex justify-between">
                          <span>Each Daughter&apos;s Coparcenary Share:</span>
                          <span className="font-bold text-emerald-700">{kartaSharePercent}% ({formatINR(unitValue)})</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Statutory Warning Box inside tool */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong>Critical Legal Warning:</strong> If your Will states <em>&quot;I give the entire HUF property to my younger son,&quot;</em>{" "}
                    other coparceners can file a civil suit. The court will declare the bequest void for their {remainingSharePercent}% share. Always use the Section 30 formula.
                  </div>
                </div>

                {/* Contextual Link to Full HUF Tool */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                  <span className="text-slate-500">Need a full family tree division?</span>
                  <Link
                    href="/tools/huf-coparcenary-share-partition-calculator"
                    className="font-bold text-[#C65378] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Open HUF Partition Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* VISUAL FEATURE BLUEPRINT (MATCHING REFERENCE STRUCTURE) */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>STATUTORY VISUAL GUIDE: HUF COPARCENARY WILL CLAUSE</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Hindu Succession Act, 1956</span>
              </div>
              <div className="relative w-full aspect-[16/9] sm:aspect-[1200/675] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                <Image
                  src="/images/huf-karta-coparcenary-will-clause-format-og.jpg"
                  alt="HUF Karta Coparcenary Will Clause Format and Section 30 Bequest Guide"
                  width={1200} height={675}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
              <div className="pt-1 text-center">
                <p className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center justify-center gap-2">
                  <Scale className="w-4 h-4 text-[#C65378]" />
                  <span>
                    Official Section 30 HUF Coparcenary Bequest Architecture: Notional Partition Calculation &amp; Supreme Court Precedent
                  </span>
                </p>
              </div>
            </div>

            {/* SECTION 3: VOID VS VALID COMPARISON TABLE */}
            <section id="void-vs-valid-comparison" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>ON-PAGE ASSET: CLAUSE COMPARATOR</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Void vs Valid HUF Bequest Clauses Comparison Table
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Compare common drafting mistakes against the Supreme Court approved Section 30 wording.
                Using incorrect phrasing leads to probate disputes and civil court injunctions.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 shadow-xs bg-white">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="py-3.5 px-4 font-bold border-b border-slate-700 w-1/4">Drafting Approach</th>
                      <th className="py-3.5 px-4 font-bold border-b border-slate-700 w-1/3 text-rose-300">
                        Void HUF Clause (Invalid)
                      </th>
                      <th className="py-3.5 px-4 font-bold border-b border-slate-700 w-1/3 text-emerald-300">
                        Valid Section 30 Clause (Legally Sound)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        Bequest of Physical Immovable Asset
                      </td>
                      <td className="py-3.5 px-4 text-rose-700 bg-rose-50/40">
                        <em>&quot;I give the family home at Plot 12, belonging to our HUF, to my elder son.&quot;</em>
                        <div className="text-[11px] text-slate-500 mt-1 font-sans">
                          <strong>Outcome:</strong> VOID. Karta cannot give away assets owned by all coparceners.
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-emerald-800 bg-emerald-50/40 font-medium">
                        <em>&quot;I give my undivided coparcenary share in Plot 12 as determined on notional partition to my elder son.&quot;</em>
                        <div className="text-[11px] text-slate-600 mt-1 font-sans">
                          <strong>Outcome:</strong> VALID. Confined strictly to the testator&apos;s individual notional share.
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        Floor-Wise Room Demarcation in HUF Home
                      </td>
                      <td className="py-3.5 px-4 text-rose-700 bg-rose-50/40">
                        <em>&quot;I give the Ground Floor of our family house to my wife and First Floor to my daughter.&quot;</em>
                        <div className="text-[11px] text-slate-500 mt-1 font-sans">
                          <strong>Outcome:</strong> VOID. No member can split physical floors in a Will before actual partition.
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-emerald-800 bg-emerald-50/40 font-medium">
                        <em>&quot;I give my undivided share in the house to my wife for life, with remainder to my daughter.&quot;</em>
                        <div className="text-[11px] text-slate-600 mt-1 font-sans">
                          <strong>Outcome:</strong> VALID. Heirs receive financial or physical shares after partition.
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        Disinheriting a Married Daughter
                      </td>
                      <td className="py-3.5 px-4 text-rose-700 bg-rose-50/40">
                        <em>&quot;Since my daughter is married, she gets no share in our HUF assets.&quot;</em>
                        <div className="text-[11px] text-slate-500 mt-1 font-sans">
                          <strong>Outcome:</strong> VOID. Violates Section 6 (Vineeta Sharma). Daughter is coparcener by birth.
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-emerald-800 bg-emerald-50/40 font-medium">
                        <em>&quot;I give my personal undivided share to my son; my daughter keeps her own coparcenary share.&quot;</em>
                        <div className="text-[11px] text-slate-600 mt-1 font-sans">
                          <strong>Outcome:</strong> VALID. Does not touch the daughter&apos;s independent share.
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        HUF Bank Accounts &amp; Demat Portfolios
                      </td>
                      <td className="py-3.5 px-4 text-rose-700 bg-rose-50/40">
                        <em>&quot;All money in HUF Account 1234 belongs to my second son.&quot;</em>
                        <div className="text-[11px] text-slate-500 mt-1 font-sans">
                          <strong>Outcome:</strong> VOID. The bank account belongs to all family members together.
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-emerald-800 bg-emerald-50/40 font-medium">
                        <em>&quot;My undivided share in all HUF bank balances and investments shall pass to my second son.&quot;</em>
                        <div className="text-[11px] text-slate-600 mt-1 font-sans">
                          <strong>Outcome:</strong> VALID. Disposes only of testator&apos;s percentage share.
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: SECTION 30 HINDU SUCCESSION ACT */}
            <section id="section-30-coparcenary-rights" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>STATUTORY ANALYSIS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Section 30 Hindu Succession Act: Coparcenary Rights
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Section 30 of the Hindu Succession Act grants full power to write a will for your HUF share. Before 1956,
                  this was not allowed. The law treats your undivided share as personal property for your will.
                </p>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Statutory Text: Section 30 Explanation</span>
                  </div>
                  <blockquote className="italic text-xs text-slate-600 leading-relaxed pl-3 border-l-2 border-[#C65378]">
                    &quot;The interest of a Hindu Mitakshara coparcener in an undivided coparcenary property shall,
                    notwithstanding anything contained in this Act or in any other law for the time being in force,
                    be deemed to be property capable of being disposed of by him or by her within the meaning of this sub-section.&quot;
                  </blockquote>
                </div>
                <p>
                  You can leave this share to your wife, a single child, or any chosen person. But you must not name
                  specific rooms or physical floors. Your will gives a share of the whole estate. After death, the person
                  who receives the share can ask for a formal division of the property.
                </p>
              </div>
            </section>

            {/* SECTION 5: RADHAMMA V. MUDDUKRISHNA PRECEDENT */}
            <section id="radhamma-supreme-court-precedent" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>LANDMARK JUDICIAL PRECEDENT</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Radhamma v. Muddukrishna: Landmark Supreme Court Ruling
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In Radhamma v. Muddukrishna (2019), the Supreme Court settled this exact issue. A Hindu family head gave
                  joint family land to his wife in a will. The other family members challenged the will. They argued that joint
                  land cannot pass through a will.
                </p>
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C65378]" />
                    <span>Case Brief: Radhamma v. H.N. Muddukrishna (2019 SC)</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-slate-800">The Dispute:</span>
                      <span>
                        Family members claimed that joint family land passes only by survivorship and cannot be given in a will.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-slate-800">Supreme Court Holding:</span>
                      <span>
                        The Supreme Court rejected that claim. The Court held that Section 30 gives every coparcener the right to make a will for his share.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-slate-800">The Limit:</span>
                      <span>
                        However, the Court set one strict limit. The will only covers the testator&apos;s personal share. It cannot take away the shares of other coparceners. That share is fixed by notional partition right before death.
                      </span>
                    </li>
                  </ul>
                </div>
                <p>
                  This judgment protects will drafters. By citing Section 30 and the Radhamma precedent in your clause,
                  you prevent costly court challenges.
                </p>
              </div>
            </section>

            {/* SECTION 6: DOWNLOAD HUF WILL CLAUSE FORMAT */}
            <section id="huf-will-clause-template" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>LAWYER-VETTED CLAUSE TEMPLATES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Download Section 30 HUF Coparcenary Will Clause Format
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Copy and insert these lawyer-vetted statutory clauses directly into your Will. Each template is drafted
                to withstand scrutiny in High Courts and probate proceedings.
              </p>

              {/* Template Box 1: Core Bequest Clause */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>CLAUSE 1: SECTION 30 UNDIVIDED COPARCENARY BEQUEST</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyClause1ToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors"
                  >
                    {copiedClause1 ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-5 font-mono text-xs text-slate-800 bg-slate-50/60 leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"BEQUEST OF COPARCENARY SHARE IN HINDU UNDIVIDED FAMILY:
1. I declare that I am a coparcener and the present Karta of the Hindu Undivided Family (HUF) known and styled as '[Name of HUF]' (holding Permanent Account Number [HUF PAN Number]).

2. The said HUF possesses joint family properties, immovable real estate, capital assets, bank accounts, and demat holdings as set out in Schedule 'H' annexed hereto.

3. In exercise of the testamentary powers expressly conferred upon me by Section 30 read with the Explanation thereto of the Hindu Succession Act, 1956, and in accordance with the law laid down by the Hon'ble Supreme Court of India in Radhamma v. H.N. Muddukrishna (2019) 3 SCC 611, I hereby devise, bequeath, and give my entire undivided coparcenary share, right, title, and interest in the said HUF, as shall be ascertained and quantified upon a notional partition taking place immediately prior to my demise under Section 6(3) of the said Act, absolutely and forever to my [Relationship with Legatee], [Full Name of Legatee], son/daughter of [Parent Name], residing at [Address], Aadhaar No. [XXXX-XXXX-XXXX].

4. I expressly clarify that I am not bequeathing the whole of any specific HUF physical asset or infringing upon the coparcenary shares of my surviving co-coparceners, but am strictly disposing of my lawful undivided interest therein. The said legatee shall be entitled to step into my shoes, demand partition, and receive the separated physical portion or financial proceeds corresponding to my share."`}
                </div>
              </div>

              {/* Template Box 2: Separation of Self-Acquired vs HUF */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>CLAUSE 2: SEPARATE PROPERTY VS HUF DEMARCATION</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyClause2ToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors"
                  >
                    {copiedClause2 ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-5 font-mono text-xs text-slate-800 bg-slate-50/60 leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"DECLARATION OF INDIVIDUAL VS JOINT FAMILY ESTATE:
I hereby specifically declare and clarify the distinction between my self-acquired individual assets and my coparcenary interest in the HUF:

(a) Schedule 'A' to 'D' properties are my exclusive, self-acquired, and self-earned properties purchased out of my individual funds and income without any aid of joint family nucleus or ancestral funds. Over these properties, I hold full, absolute, and unencumbered testamentary power under Section 30 of the Hindu Succession Act, 1956.

(b) Schedule 'H' properties belong to the Hindu Undivided Family known as '[Name of HUF]'. In respect of Schedule 'H', this Will operates exclusively upon my undivided coparcenary interest determined on notional partition immediately prior to my death, and does not alter the coparcenary title of the remaining members of the family."`}
                </div>
              </div>

              {/* Template Box 3: Karta Succession Clause */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>CLAUSE 3: KARTA CONTINUITY &amp; MANAGEMENT TRANSITION</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyClause3ToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors"
                  >
                    {copiedClause3 ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-5 font-mono text-xs text-slate-800 bg-slate-50/60 leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"APPOINTMENT OF NEW KARTA AND MANAGEMENT CONTINUITY:
Upon my demise, the management and administration of the joint family affairs of '[Name of HUF]' shall devolve upon the senior-most surviving coparcener of the family, namely my [elder son / elder daughter / brother], [Full Name], in accordance with Hindu law and the principles recognized by the Hon'ble Delhi High Court in Mrs. Sujata Sharma v. Shri Manu Gupta.

The surviving coparceners shall be at liberty to continue the HUF entity under its existing PAN [HUF PAN Number] or effect a complete partition by metes and bounds under Section 171 of the Income Tax Act, 1961 upon mutual registered agreement."`}
                </div>
              </div>

              {/* Checklist Box */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="bg-rose-900 text-white px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    <FileCheck className="w-4 h-4 text-rose-300" />
                    <span>PRE-DRAFTING HUF COPARCENARY AUDIT CHECKLIST</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors"
                  >
                    {copiedChecklist ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Checklist</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-5 text-xs text-slate-700 space-y-2 bg-rose-50/20">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-slate-900">1.</span>
                    <span>HUF PAN Card and recent 3 years of filed Income Tax Returns (ITR-2/3).</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-slate-900">2.</span>
                    <span>Complete family pedigree tree showing all living sons and daughters.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-slate-900">3.</span>
                    <span>Parent title deeds showing ancestral origin through three generations.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-slate-900">4.</span>
                    <span>Clear separation of personal bank accounts from HUF bank accounts.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-slate-900">5.</span>
                    <span>Equal inclusion of married and unmarried daughters in the notional partition pool.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: KARTA POWERS AND LIMITATIONS */}
            <section id="karta-powers-and-limitations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>POWERS &amp; RESTRICTIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. HUF Karta Powers: Self-Acquired vs Coparcenary Estate
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many family heads make a basic mistake. They think managing the HUF means they own it. During his lifetime,
                  a Karta can sell family land only for family need or benefit. This is called legal necessity.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Lifetime Sale Powers</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      During his lifetime, a Karta can sell joint land only for genuine legal necessity or estate benefit.
                      He manages the property for all family members.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <X className="w-4 h-4 text-rose-600" />
                      <span>Powers in a Will</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      In a will, legal necessity does not apply. A Karta has zero power over the shares of his children.
                      He can only give his own fraction. Any attempt to give more is void in court.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: DAUGHTER COPARCENARY RIGHTS */}
            <section id="daughter-coparcenary-shares" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>GENDER EQUALITY &amp; COPARCENARY</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Daughter Coparcenary Rights Under Vineeta Sharma Ruling
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In 2020, the Supreme Court delivered the historic Vineeta Sharma verdict. The Court ruled that daughters
                  are equal coparceners from birth. They have the same rights and duties as sons.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700">
                  <li>
                    A daughter receives coparcenary rights by birth, even if her father died before 2005.
                  </li>
                  <li>
                    Marriage does not end her rights. Married daughters keep full coparcenary shares.
                  </li>
                  <li>
                    When calculating the notional division, daughters get equal shares with sons. This applies even if
                    the daughter lives elsewhere. A father cannot reduce a daughter&apos;s share in his will.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP DRAFTING SOP */}
            <section id="step-by-step-drafting-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <CheckCircle2 className="w-4 h-4" />
                <span>PRACTICAL DRAFTING SOP</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Drafting HUF Coparcenary Will Clauses
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <strong className="text-slate-900 text-sm block">Separate Your Assets</strong>
                    List your self-acquired assets separately from HUF assets. Never mix your personal salary into HUF bank accounts.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <strong className="text-slate-900 text-sm block">Count All Family Members</strong>
                    Count all living sons, daughters, and your spouse. Every daughter gets an equal share with each son.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <strong className="text-slate-900 text-sm block">Use the Section 30 Formula</strong>
                    Insert our lawyer-vetted Section 30 clause. State clearly that you give your undivided share, not a specific building.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div>
                    <strong className="text-slate-900 text-sm block">Sign with Independent Witnesses</strong>
                    Sign the will before two adult witnesses who are not family coparceners or beneficiaries under the will.
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: FIVE FATAL HUF MISTAKES */}
            <section id="common-fatal-mistakes" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertCircle className="w-4 h-4" />
                <span>LITIGATION PITFALLS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Five Fatal HUF Bequest Mistakes That Invalidate Wills
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="p-4 rounded-xl bg-white border border-rose-200 space-y-1">
                  <strong className="text-rose-900 text-sm flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-600" />
                    <span>Mistake 1: Claiming the Whole HUF Asset</span>
                  </strong>
                  <p className="text-slate-600 leading-relaxed">
                    A Karta does not own the whole building. Writing &quot;I give the family shop to my son&quot; makes the clause void.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-rose-200 space-y-1">
                  <strong className="text-rose-900 text-sm flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-600" />
                    <span>Mistake 2: Leaving Out Married Daughters</span>
                  </strong>
                  <p className="text-slate-600 leading-relaxed">
                    Daughters are coparceners by birth under Supreme Court law. Leaving them out leads to court suits.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-rose-200 space-y-1">
                  <strong className="text-rose-900 text-sm flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-600" />
                    <span>Mistake 3: Appointing an Outside Karta</span>
                  </strong>
                  <p className="text-slate-600 leading-relaxed">
                    A will cannot appoint an outside person as Karta. Karta status passes automatically to the eldest coparcener.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-rose-200 space-y-1">
                  <strong className="text-rose-900 text-sm flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-600" />
                    <span>Mistake 4: Mixing Salary into HUF Accounts</span>
                  </strong>
                  <p className="text-slate-600 leading-relaxed">
                    Depositing personal salary into HUF bank accounts mixes the funds and causes heavy tax disputes.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-rose-200 space-y-1">
                  <strong className="text-rose-900 text-sm flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-600" />
                    <span>Mistake 5: Not Registering the Will</span>
                  </strong>
                  <p className="text-slate-600 leading-relaxed">
                    Registering your will at the Sub-Registrar Office proves you were of sound mind and stops false claims.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Frequently Asked Questions: HUF Share Will Formats
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm">
                Get direct legal answers to common questions about bequeathing HUF coparcenary interests in India.
              </p>

              <div className="space-y-3 pt-2">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
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

            {/* SECTION 12: CITATIONS AND ADVOCATE PROFILE */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>AUTHORITY &amp; CITATIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Statutory Citations &amp; High Court Precedents
              </h2>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-4 text-xs leading-relaxed">
                <div>
                  <div className="font-extrabold text-slate-900 mb-1">
                    Key Sections of the Law:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      <strong>Hindu Succession Act, 1956 s. 6:</strong> Transfer of coparcenary share at death and
                      equal birth rights for daughters.
                    </li>
                    <li>
                      <strong>Hindu Succession Act, 1956 s. 30:</strong> Power to make a will for undivided coparcenary share.
                    </li>
                    <li>
                      <strong>Indian Succession Act, 1925 ss. 63 &amp; 67:</strong> Signing, witness rules, and safe execution of wills.
                    </li>
                    <li>
                      <strong>Income Tax Act, 1961 s. 171:</strong> Tax rules for partition of a Hindu Undivided Family.
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="font-extrabold text-slate-900 mb-1">
                    Key Supreme Court Rulings:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      <strong>Radhamma v. H.N. Muddukrishna (2019 SC):</strong> Upheld right of a coparcener
                      to make a will for his undivided share.
                    </li>
                    <li>
                      <strong>Vineeta Sharma v. Rakesh Sharma (2020 SC):</strong> Confirmed that daughters are equal
                      coparceners by birth from the start.
                    </li>
                    <li>
                      <strong>Mrs. Sujata Sharma v. Shri Manu Gupta (Delhi HC):</strong> Confirmed that an eldest daughter
                      can serve as Karta.
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
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>Supreme Court Judgments Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Guides &amp; Succession Calculators
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/tools/huf-coparcenary-share-partition-calculator"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      HUF Coparcenary Partition Calculator
                    </Link>
                    <Link
                      href="/blogs/huf-property-after-death-of-karta"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      HUF Property After Death of Karta Guide
                    </Link>
                    <Link
                      href="/templates/will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Indian Legal Will Template
                    </Link>
                    <Link
                      href="/templates/partition-deed-format-between-family-members"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Partition Deed Format Between Family Members
                    </Link>
                    <Link
                      href="/services/will-registration"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Will Registration &amp; SRO Verification
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
                Specialist in Hindu Succession Act jurisprudence, HUF coparcenary partitions, High Court probate
                petitions, and family estate dispute resolution pan-India.
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
                  <span>PREVENT FUTURE FAMILY DISPUTES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Children from HUF Partition Lawsuits
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A legally sound Will drafted with the exact Section 30 coparcenary formula prevents disputes among
                  brothers, sisters, and surviving coparceners.
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

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>HUF ESTATE DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Complex HUF Assets or Business Properties?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our succession advocates assist with HUF notional partition deeds, family settlement agreements,
                  and Sub-Registrar Office will registration across India.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
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
                      <strong>Section 30 Precision:</strong> Protects your Will from being struck down as void ab initio.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Radhamma Compliance:</strong> Aligns fully with Supreme Court coparcenary precedents.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Equal Daughter Shares:</strong> Fully compliant with Vineeta Sharma gender equality rulings.
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
          href="#notional-partition-simulator"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>HUF Tool</span>
        </a>
        <button
          onClick={handleStartDraft}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Draft Will</span>
        </button>
      </div>
    </div>
  );
}
