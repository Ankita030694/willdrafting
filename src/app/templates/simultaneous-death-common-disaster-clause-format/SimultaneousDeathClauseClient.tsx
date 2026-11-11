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
  Clock,
  Building2,
  CheckSquare,
  Layers,
} from "lucide-react";

// Table of Contents Items (strictly <= 70 chars, 0 em-dashes, unique matching anchor IDs)
const TOC_ITEMS = [
  { id: "statutory-purpose-scope", label: "1. Section 21 HSA & Common Disaster Will Clause Scope" },
  { id: "survivorship-risk-calculator", label: "2. Common Disaster & Survivorship Risk Calculator" },
  { id: "double-probate-avoidance-table", label: "3. Double Probate Avoidance & Fee Comparison Table" },
  { id: "survivorship-clause-format", label: "4. 30-Day Survivorship & Common Disaster Clause Format" },
  { id: "section-21-hsa-override", label: "5. Section 21 HSA Statutory Override Draft Clause" },
  { id: "indian-succession-act-rules", label: "6. Indian Succession Act Rules: Sections 105 & 124" },
  { id: "common-disaster-pathway", label: "7. Common Disaster Outcome Scenarios: Step-by-Step" },
  { id: "landmark-court-precedents", label: "8. Gujarat High Court Precedent: Jayantilal Case" },
  { id: "minor-child-couple-rules", label: "9. Couple & Minor Child Protection Clause Rules" },
  { id: "step-by-step-clause-sop", label: "10. Step-by-Step SOP: Adding Clause to Your Will" },
  { id: "common-drafting-mistakes", label: "11. Four Costly Errors in Couple Will Clauses" },
  { id: "institutional-profile", label: "12. Institutional Profile: Legal Excellence" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions: Survivorship Clauses" },
  { id: "statutory-citations", label: "14. Legal Rules & Official Government Portals" },
];

const FAQS = [
  {
    q: "What happens if a husband and wife die together in an accident in India?",
    a: "If spouses die together and no proof shows who lived longer, Section 21 of the Hindu Succession Act presumes the younger spouse outlived the elder spouse. Assets from the elder spouse pass to the younger spouse's estate first, then pass again to the next heirs. This often triggers two court cases and double probate fees.",
  },
  {
    q: "What is a 30-day survivorship clause in an Indian Will?",
    a: "A 30-day survivorship clause is a Will rule stating that your spouse or heir must outlive you by at least 30 full days to inherit your assets. If your spouse dies in the same crash or within 30 days of your death, your property skips their estate and passes straight to your alternate heirs or child trust.",
  },
  {
    q: "How does a survivorship clause prevent double probate court fees?",
    a: "Without a wait clause, the elder spouse's assets pass into the younger spouse's estate. Heirs may have to file two separate probate cases and pay two sets of court fees. With a 30-day clause, assets bypass the deceased spouse completely and vest straight in your children or alternate heirs through one clean transfer.",
  },
  {
    q: "Does Section 21 of the Hindu Succession Act apply if a Will exists?",
    a: "Yes, unless your Will overrides it. In Jayantilal Mansukhlal v. Mehta Chhanalal Ambalal, the Gujarat High Court applied Section 21 to a Will when a mother and daughter died together in a fire. A clear common disaster clause lets you set your own survivorship rule and prevent unintended asset transfers.",
  },
  {
    q: "What law applies to Christians, Parsis, or couples married under the Special Marriage Act?",
    a: "Non-Hindus are governed by the Indian Succession Act, 1925, which has no age-based survival rule like Section 21 HSA. Under Section 105 ISA, if heirs cannot prove the beneficiary outlived the Will maker, the gift lapses into the residue. Adding a 30-day clause with Sections 124 and 129 gift-over wording prevents lapse disputes.",
  },
  {
    q: "Why is naming an alternate executor critical in a common disaster clause?",
    a: "Most couples name only each other as sole executor. If both spouses die in one crash, nobody is left to apply for probate under Section 222 of the Indian Succession Act. Your family must then apply for Letters of Administration under Section 232, which takes much longer. Always name a backup executor.",
  },
  {
    q: "What happens to a childless couple's assets if they die together without this clause?",
    a: "If a childless Hindu couple dies together without a survivorship clause, Section 21 treats the younger spouse as surviving. Assets given to the younger spouse under a Will may then pass solely to the younger spouse's parents or siblings, cutting off the elder spouse's parents completely.",
  },
  {
    q: "Should we add this clause using a Codicil or draft fresh Mirror Wills?",
    a: "If your existing Will already covers all your assets well, you can add a 30-day survivorship clause and backup executor through a registered Codicil under Section 62 ISA. If both spouses have old or basic Wills, drafting two fresh Mirror Wills with matching common disaster clauses is cleaner and safer.",
  },
];

export default function SimultaneousDeathClauseClient() {
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

  const [activeId, setActiveId] = useState<string>("statutory-purpose-scope");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedSurvivorship, setCopiedSurvivorship] = useState<boolean>(false);
  const [copiedOverride, setCopiedOverride] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // ==========================================
  // INTERACTIVE COMMON DISASTER RISK CALCULATOR
  // ==========================================
  const [governingStatute, setGoverningStatute] = useState<string>("hsa_1956");
  const [ageOrder, setAgeOrder] = useState<string>("husband_elder");
  const [familyStatus, setFamilyStatus] = useState<string>("childless_parents");
  const [clauseStatus, setClauseStatus] = useState<string>("no_clause");
  const [cityForum, setCityForum] = useState<string>("mumbai");

  const elderLabel = ageOrder === "husband_elder" ? "Husband" : "Wife";
  const youngerLabel = ageOrder === "husband_elder" ? "Wife" : "Husband";

  let cityFeeLabel = "Up to Rs. 75,000 cap per Probate grant (Bombay Court Fees Act)";
  if (cityForum === "delhi") {
    cityFeeLabel = "4% ad valorem court fee (uncapped) per Probate grant";
  } else if (cityForum === "kolkata") {
    cityFeeLabel = "Up to 5.5% ad valorem fee per Probate grant (West Bengal)";
  } else if (cityForum === "chennai") {
    cityFeeLabel = "3% court fee per Probate grant (Tamil Nadu)";
  } else if (cityForum === "bengaluru") {
    cityFeeLabel = "Probate optional for Hindus, but banks may ask for court orders";
  }

  let hasHighRisk = clauseStatus === "no_clause";
  let statutoryOutcome = "";
  let doubleProbateImpact = "";
  let assetDestination = "";
  let recommendedFix = "";

  if (clauseStatus === "protected_30") {
    hasHighRisk = false;
    statutoryOutcome =
      "Protected: Both spouses are treated as having predeceased each other if death occurs within 30 days. Section 21 HSA default fiction is overridden.";
    doubleProbateImpact = `Single Clean Pass: Zero double transfer through the deceased spouse's estate. Saves one full set of ${cityForum === "mumbai" ? "Rs. 75,000 capped" : "ad valorem"} probate court fees and months of freeze.`;
    assetDestination =
      familyStatus === "minor_kids"
        ? "Assets pass straight into your Minor Child Testamentary Trust under your named Alternate Executor and Trustee."
        : "Each spouse's assets pass directly to their chosen alternate heirs or split 50-50 fairly between both parents' families.";
    recommendedFix =
      "Sync your bank, Demat, and term life insurance secondary nominees so they match your 30-day survivorship clause.";
  } else {
    // No clause
    if (governingStatute === "hsa_1956") {
      statutoryOutcome = `Section 21 HSA Triggered: Law presumes ${youngerLabel} (younger) survived ${elderLabel} (elder) for a split second.`;
      doubleProbateImpact = `Double Probate Risk: ${elderLabel}'s assets route into ${youngerLabel}'s estate first, then pass onward. Triggers two court petitions and ${cityFeeLabel}.`;
      if (familyStatus === "minor_kids") {
        assetDestination = `Assets from ${elderLabel} vest briefly in ${youngerLabel}'s estate before reaching minor children, stalling bank and property claims without a Backup Executor.`;
      } else {
        assetDestination = `High Conflict Alert: Because ${youngerLabel} is deemed the survivor, assets bequeathed by Will to ${youngerLabel} may pass solely to ${youngerLabel}'s parents or siblings, cutting off ${elderLabel}'s parents.`;
      }
      recommendedFix =
        "Insert our 30-Day Survivorship Clause + Section 21 HSA Override Clause and appoint a Backup Executor immediately.";
    } else {
      statutoryOutcome =
        "Section 105 ISA Lapse Risk: Indian Succession Act has no age rule. Without proof of survival, primary spousal gifts lapse.";
      doubleProbateImpact = `Litigation & Delay Risk: Contested claims over exact time of death stall probate grants under ${cityFeeLabel}.`;
      assetDestination =
        familyStatus === "minor_kids"
          ? "Gifts to the spouse lapse into residue or intestacy, leaving minor children exposed to court guardianship delays."
          : "Primary gifts fail under Section 105 ISA and pass under intestate shares, sparking disputes between both families.";
      recommendedFix =
        "Add a 30-Day Survivorship Clause backed by Sections 124 and 129 ISA alternate gift-over language and a Backup Executor.";
    }
  }

  const copySurvivorshipToClipboard = () => {
    const text = `CLAUSE [__]: 30-DAY SURVIVORSHIP & COMMON DISASTER PROVISION

1. THIRTY-DAY SURVIVORSHIP CONDITION:
Any bequest, devise, gift, or appointment made under this Will in favour of my spouse, [Full Name of Spouse], or any other beneficiary named herein, shall take effect ONLY if such spouse or beneficiary survives me for a minimum period of thirty (30) full calendar days from the date of my death.

2. COMMON DISASTER & SIMULTANEOUS DEATH PRESUMPTION:
If my spouse, [Full Name of Spouse], and I die in the same accident, air crash, road collision, natural calamity, or under circumstances where it is impossible or uncertain to prove which of us survived the other, or if my spouse dies within thirty (30) days following my death from any cause whatsoever, then for all purposes affecting succession under this Will, my spouse shall be conclusively deemed to have predeceased me.

3. STATUTORY OVERRIDE OF SECTION 21 HINDU SUCCESSION ACT, 1956:
To the fullest extent permitted by law, the provisions of this Clause expressly override and displace the statutory presumption of survivorship based on age contained in Section 21 of the Hindu Succession Act, 1956 (and any corresponding rule of commorientes), so that no asset of my estate shall vest in or pass through the estate of my deceased spouse.

4. ALTERNATE GIFT-OVER & SECTION 129 ISA SUBSTITUTION:
In the event my spouse fails to survive me for the aforesaid period of thirty (30) full days, all gifts, legacies, and residuary property intended for my spouse shall stand diverted under Sections 124 and 129 of the Indian Succession Act, 1925, and shall pass directly and absolutely to:
(a) [Option A - With Children]: My surviving child/children, [Name(s) of Children], in equal shares, to be held in the Testamentary Trust created under Clause [__] until each child attains the age of [21 / 25] years; OR
(b) [Option B - If No Children Survive]: Equally (50% each) to my surviving parents, [Names of Testator's Parents], and my spouse's surviving parents, [Names of Spouse's Parents], or to the survivor among them in equal shares per stirpes.

5. APPOINTMENT OF ALTERNATE EXECUTOR:
If my spouse is unable or unwilling to act, or dies simultaneously with me or within thirty (30) days of my death, I appoint [Full Name of Alternate Executor], residing at [Complete Address], as the sole Alternate Executor of this Will with full powers to seek Probate and distribute my estate.`;
    navigator.clipboard.writeText(text);
    setCopiedSurvivorship(true);
    setTimeout(() => setCopiedSurvivorship(false), 3000);
  };

  const copyOverrideToClipboard = () => {
    const text = `PROPRIETARY SECTION 21 HSA STATUTORY OVERRIDE & CHILDLESS COUPLE SPLIT CLAUSE:

"Notwithstanding the statutory presumption contained in Section 21 of the Hindu Succession Act, 1956 (that the younger person survived the elder), I expressly direct that if my spouse [Spouse Name] and I die in a common disaster or in circumstances rendering the order of our deaths uncertain, or if my spouse dies within thirty (30) calendar days of my demise regardless of cause, my spouse shall be deemed to have predeceased me for all testamentary and succession purposes. No asset owned by me shall pass into my spouse's estate or require administration in my spouse's probate proceedings. Instead, all my net movable and immovable property shall pass directly under Sections 124 and 129 of the Indian Succession Act, 1925, as follows: [50% / Full Share] to my surviving children (or Testamentary Minor Trust), and failing surviving issue, 50% to my surviving parents [Names] and 50% to my spouse's surviving parents [Names]."`;
    navigator.clipboard.writeText(text);
    setCopiedOverride(true);
    setTimeout(() => setCopiedOverride(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const text = `SIMULTANEOUS DEATH CLAUSE WILL CHECKLIST (INDIA):
1. Include explicit 30-day survivorship window (covers crashes + ICU stays)
2. Expressly override Section 21 of the Hindu Succession Act, 1956
3. Add Section 124 and Section 129 ISA alternate gift-over beneficiaries
4. Name an independent Alternate Executor (never leave spouse as sole executor)
5. Name a Testamentary Guardian & Minor Trust if you have children under 18
6. Execute paired Mirror Wills (two separate signed Wills) instead of one Joint Will
7. Update secondary nominees on term insurance, bank accounts, EPF, and Demat
8. Sign before two independent adult witnesses under Section 63 ISA (non-beneficiaries)`;
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

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
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          LAYER 1: HERO SECTION
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-12 pb-16 md:pt-16 md:pb-20 border-b border-[#FAF7F0]/10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Statutory Category Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C65378]/20 border border-[#C65378]/40 text-rose-200 text-xs font-bold uppercase tracking-wider mb-6">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>HINDU SUCCESSION ACT S. 21 • INDIAN SUCCESSION ACT SS. 105 &amp; 124</span>
          </div>

          {/* Strict H1 Tag (55 chars, 30-65 range, 0 em-dashes, distinct from Page Title) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Simultaneous Death &amp; Common Disaster Will Clause Format
          </h1>

          {/* Subtitle Paragraph (Plain language, readable, active voice) */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Protect your family if spouses pass away in the same crash or travel accident. Use our free 30-day
            survivorship clause and Section 21 HSA override draft. Stop double probate court fees today.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#survivorship-clause-format"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get 30-Day Clause Format</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/start"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Will with Clause</span>
            </Link>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">30 Days</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SURVIVORSHIP WAIT WINDOW
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 21</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                HSA COMMORIENTES OVERRIDE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sections 105 &amp; 124</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ISA ALTERNATE GIFT-OVER
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Zero Double Fee</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SINGLE PROBATE TRANSFER
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
                <span>Couple Estate Desk</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                This format covers Section 21 of the Hindu Succession Act, 1956, and Sections 105, 124, and 129 of
                the Indian Succession Act, 1925.
              </p>
            </div>

            {/* Quick Limitation Alert */}
            <div className="bg-rose-50/80 rounded-2xl border border-rose-200/90 p-4 text-xs text-rose-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#C65378]">
                <Clock className="w-4 h-4 text-[#C65378]" />
                <span>Critical Warning</span>
              </div>
              <p className="leading-relaxed text-[11px] text-rose-900">
                Generic Wills skip the 30-day rule. Without it, the law treats the younger spouse as living longer.
                Assets pass twice, triggering double court fees and family claims.
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
                <span>EXECUTIVE BRIEF: SIMULTANEOUS DEATH WILL RULES</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>The Section 21 Trap:</strong> If spouses die in one crash, Section 21 HSA treats the
                    younger spouse as outliving the elder.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Double Probate Fees:</strong> Assets flow from the elder spouse to the younger spouse,
                    then onward. Families face two court cases and double fees.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>30-Day Wait Clause:</strong> A 30-day survivorship clause blocks this chain transfer. Your
                    spouse must outlive you by 30 full days to inherit.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Backup Executor Rule:</strong> Always name an alternate executor. If both spouses die
                    together, your backup executor can obtain probate without delay.
                  </span>
                </li>
              </ul>
            </div>

            {/* EDITORIAL BANNER IMAGE CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="relative aspect-[16/9] w-full bg-slate-900">
                <Image
                  src="/images/simultaneous-death-common-disaster-clause-format-og.jpg"
                  alt="Simultaneous Death and Common Disaster Will Clause Format India"
                  width={1200}
                  height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                />
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
                <span className="font-semibold text-slate-700">
                  Couple Will Formats: 30-Day Survivorship &amp; Section 21 HSA Override Pack
                </span>
                <span className="text-[11px] font-mono text-[#C65378] font-bold">
                  UPDATED FOR 2026 WILL RULES
                </span>
              </div>
            </div>

            {/* SECTION 1: STATUTORY PURPOSE & SCOPE (STRICT SINGLE H2 ON ENTIRE PAGE) */}
            <section id="statutory-purpose-scope" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Section 21 HSA &amp; Common Disaster Will Clause Scope
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  Indian couples often travel together by car or flight. In a severe crash, both spouses may die at the
                  same time. Doctors often cannot tell who died first.
                </p>
                <p>
                  Generic Will formats ignore this risk. Most Indian Wills leave everything to a spouse with no waiting
                  rule. This missing line sets off Section 21 of the Hindu Succession Act, 1956.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                    Legal Text: Section 21, Hindu Succession Act, 1956
                  </div>
                  <p className="text-xs text-slate-700 italic">
                    Where two persons die in circumstances making it uncertain who survived the other, the law
                    presumes, until the contrary is proved, that the younger survived the elder.
                  </p>
                </div>
                <p>
                  Under this rule, the younger spouse is treated as alive for one split second after the elder spouse
                  dies. As a result, the elder spouse&apos;s property passes into the younger spouse&apos;s estate first.
                  It then passes a second time to the final heirs.
                </p>
                <p>
                  This two-step shift causes two huge problems. First, families in Mumbai, Kolkata, Chennai, or Delhi
                  may pay double probate court fees. Second, if the couple has no children, assets may move only to the
                  younger spouse&apos;s parents or siblings.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE COMMON DISASTER & SURVIVORSHIP RISK CALCULATOR */}
            <section id="survivorship-risk-calculator" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>DIAGNOSTIC &amp; RISK TOOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Common Disaster &amp; Survivorship Risk Calculator
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Test what happens to your assets if both spouses die in a crash. Pick your family profile below to
                check probate fee risk and asset flow.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Select 1: Law */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Personal Succession Law:
                    </label>
                    <select
                      value={governingStatute}
                      onChange={(e) => setGoverningStatute(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="hsa_1956">Hindu, Sikh, Jain, Buddhist (Section 21 HSA)</option>
                      <option value="isa_1925">Christian, Parsi, Special Marriage Act (ISA 1925)</option>
                    </select>
                  </div>

                  {/* Select 2: Age Order */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Age Comparison Between Spouses:
                    </label>
                    <select
                      value={ageOrder}
                      onChange={(e) => setAgeOrder(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="husband_elder">Husband is Elder, Wife is Younger</option>
                      <option value="wife_elder">Wife is Elder, Husband is Younger</option>
                    </select>
                  </div>

                  {/* Select 3: Family Status */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Family &amp; Children Profile:
                    </label>
                    <select
                      value={familyStatus}
                      onChange={(e) => setFamilyStatus(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="childless_parents">Childless Couple (Parents Living)</option>
                      <option value="minor_kids">Couple with Minor or Adult Children</option>
                    </select>
                  </div>

                  {/* Select 4: City Forum */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Primary Property City:
                    </label>
                    <select
                      value={cityForum}
                      onChange={(e) => setCityForum(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="mumbai">Mumbai / Maharashtra (Rs. 75,000 cap)</option>
                      <option value="delhi">Delhi NCR (4% uncapped court fee)</option>
                      <option value="kolkata">Kolkata / West Bengal (up to 5.5% fee)</option>
                      <option value="chennai">Chennai / Tamil Nadu (3% court fee)</option>
                      <option value="bengaluru">Bengaluru / Other Cities</option>
                    </select>
                  </div>

                  {/* Toggle 5: Clause Status */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Current Will Clause Setup:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setClauseStatus("no_clause")}
                        className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-colors text-left ${
                          clauseStatus === "no_clause"
                            ? "bg-[#C65378] text-white border-[#C65378]"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        Generic Will (No Survivorship Clause)
                      </button>
                      <button
                        type="button"
                        onClick={() => setClauseStatus("protected_30")}
                        className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-colors text-left ${
                          clauseStatus === "protected_30"
                            ? "bg-emerald-700 text-white border-emerald-700"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        Protected Will (30-Day Clause + Sec 21 Override)
                      </button>
                    </div>
                  </div>
                </div>

                {/* COMPUTED RESULT DISPLAY */}
                <div className="rounded-2xl border border-slate-200 p-5 bg-gradient-to-br from-slate-50 via-white to-rose-50/40 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      {hasHighRisk ? (
                        <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      <span className="font-extrabold text-sm text-slate-900">
                        {hasHighRisk
                          ? "High Risk: Double Probate & Family Conflict"
                          : "Protected: Clean Direct Asset Transfer"}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
                        hasHighRisk ? "bg-rose-100 text-rose-800" : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {hasHighRisk ? "NO WAIT CLAUSE" : "30-DAY SHIELD ACTIVE"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Statutory Rule Outcome</div>
                      <p className="text-xs font-semibold text-slate-800 leading-relaxed">{statutoryOutcome}</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Court Fee &amp; Probate Impact</div>
                      <p className="text-xs font-semibold text-slate-800 leading-relaxed">{doubleProbateImpact}</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Final Asset Destination</div>
                    <p className="text-xs text-slate-700 leading-relaxed">{assetDestination}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#172228] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs leading-relaxed">
                      <strong className="text-rose-200">Next Step:</strong> {recommendedFix}
                    </div>
                    <Link
                      href="/start"
                      className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors"
                    >
                      <span>Create Protected Will</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: DOUBLE PROBATE AVOIDANCE TABLE */}
            <section id="double-probate-avoidance-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>DOUBLE PROBATE AVOIDANCE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Double Probate Avoidance &amp; Fee Comparison Table
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                See how adding a 30-day survivorship clause protects your family from double court filings and saves
                heavy probate fees across India.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-1/4">
                        Estate Factor
                      </th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-3/8 text-slate-300">
                        Generic Will (No Clause)
                      </th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-3/8 text-rose-200">
                        Protected Will (30-Day Clause + Sec 21 Override)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Section 21 HSA Rule</td>
                      <td className="p-3.5">Law presumes younger spouse survived elder by a moment</td>
                      <td className="p-3.5 font-semibold text-[#172228]">
                        Overridden cleanly; spouse treated as predeceasing testator
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Probate Grants Needed</td>
                      <td className="p-3.5 text-rose-700 font-bold">
                        Two separate Probate cases for transferred assets
                      </td>
                      <td className="p-3.5 text-emerald-800 font-bold">
                        One direct grant per estate with zero crossover transfer
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Mumbai / Metro Fee Impact</td>
                      <td className="p-3.5">
                        Assets valued twice; up to Rs. 75,000 paid twice in Mumbai (or 4% in Delhi)
                      </td>
                      <td className="p-3.5 font-semibold text-[#172228]">
                        Single estate valuation; stops double court fee charges
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">ICU / 48-Hour Survival</td>
                      <td className="p-3.5">
                        Hospital life support for 2 days still triggers double probate
                      </td>
                      <td className="p-3.5 font-semibold text-[#172228]">
                        30-day buffer prevents double transfer even after brief ICU survival
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Childless Couple Split</td>
                      <td className="p-3.5">
                        Combined wealth risks passing solely to younger spouse&apos;s parents
                      </td>
                      <td className="p-3.5 font-semibold text-[#172228]">
                        Splits wealth cleanly 50-50 between both families or chosen heirs
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Executor Continuity</td>
                      <td className="p-3.5">
                        Fails if spouses named only each other; triggers Section 232 LOA delay
                      </td>
                      <td className="p-3.5 font-semibold text-[#172228]">
                        Backup executor steps in immediately to unlock bank and Demat funds
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: COPY-PASTE TEMPLATE 1 - 30-DAY SURVIVORSHIP CLAUSE FORMAT */}
            <section id="survivorship-clause-format" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>COPY-PASTE TEMPLATE 1</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. 30-Day Survivorship &amp; Common Disaster Clause Format
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Copy this complete clause into your Indian Will or Mirror Will. Replace the words in brackets with your
                exact family names before signing.
              </p>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900">
                    30-Day Survivorship &amp; Common Disaster Will Clause (India)
                  </div>
                  <button
                    type="button"
                    onClick={copySurvivorshipToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                  >
                    {copiedSurvivorship ? (
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
{`CLAUSE [__]: 30-DAY SURVIVORSHIP & COMMON DISASTER PROVISION

1. THIRTY-DAY SURVIVORSHIP CONDITION:
Any bequest, devise, gift, or appointment made under this Will in favour of my spouse, [Full Name of Spouse], or any other beneficiary named herein, shall take effect ONLY if such spouse or beneficiary survives me for a minimum period of thirty (30) full calendar days from the date of my death.

2. COMMON DISASTER & SIMULTANEOUS DEATH PRESUMPTION:
If my spouse, [Full Name of Spouse], and I die in the same accident, air crash, road collision, natural calamity, or under circumstances where it is impossible or uncertain to prove which of us survived the other, or if my spouse dies within thirty (30) days following my death from any cause whatsoever, then for all purposes affecting succession under this Will, my spouse shall be conclusively deemed to have predeceased me.

3. STATUTORY OVERRIDE OF SECTION 21 HINDU SUCCESSION ACT, 1956:
To the fullest extent permitted by law, the provisions of this Clause expressly override and displace the statutory presumption of survivorship based on age contained in Section 21 of the Hindu Succession Act, 1956 (and any corresponding rule of commorientes), so that no asset of my estate shall vest in or pass through the estate of my deceased spouse.

4. ALTERNATE GIFT-OVER & SECTION 129 ISA SUBSTITUTION:
In the event my spouse fails to survive me for the aforesaid period of thirty (30) full days, all gifts, legacies, and residuary property intended for my spouse shall stand diverted under Sections 124 and 129 of the Indian Succession Act, 1925, and shall pass directly and absolutely to:
(a) [Option A - With Children]: My surviving child/children, [Name(s) of Children], in equal shares, to be held in the Testamentary Trust created under Clause [__] until each child attains the age of [21 / 25] years; OR
(b) [Option B - If No Children Survive]: Equally (50% each) to my surviving parents, [Names of Testator's Parents], and my spouse's surviving parents, [Names of Spouse's Parents], or to the survivor among them in equal shares per stirpes.

5. APPOINTMENT OF ALTERNATE EXECUTOR:
If my spouse is unable or unwilling to act, or dies simultaneously with me or within thirty (30) days of my death, I appoint [Full Name of Alternate Executor], residing at [Complete Address], as the sole Alternate Executor of this Will with full powers to seek Probate and distribute my estate.`}
                </pre>
              </div>
            </section>

            {/* SECTION 5: COPY-PASTE TEMPLATE 2 - SECTION 21 HSA STATUTORY OVERRIDE DRAFT */}
            <section id="section-21-hsa-override" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>COMPETITOR BLIND SPOT &amp; STATUTORY OVERRIDE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Section 21 HSA Statutory Override Draft Clause
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Most short Will templates only mention dying in the same accident. That fails if your spouse survives
                for two days in an ICU before passing away. Use this override recital to cover both crashes and
                delayed deaths.
              </p>

              <div className="rounded-2xl border border-rose-200/90 bg-rose-50/70 p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-rose-200">
                  <div className="font-extrabold text-xs sm:text-sm text-rose-950">
                    Section 21 HSA Override &amp; Fair Family Split Recital
                  </div>
                  <button
                    type="button"
                    onClick={copyOverrideToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-rose-300 hover:bg-rose-100 text-xs font-bold text-[#C65378] transition-colors cursor-pointer"
                  >
                    {copiedOverride ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Override Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-white border border-rose-100 text-slate-800 text-[11px] sm:text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"Notwithstanding the statutory presumption contained in Section 21 of the Hindu Succession Act, 1956 (that the younger person survived the elder), I expressly direct that if my spouse [Spouse Name] and I die in a common disaster or in circumstances rendering the order of our deaths uncertain, or if my spouse dies within thirty (30) calendar days of my demise regardless of cause, my spouse shall be deemed to have predeceased me for all testamentary and succession purposes. No asset owned by me shall pass into my spouse's estate or require administration in my spouse's probate proceedings. Instead, all my net movable and immovable property shall pass directly under Sections 124 and 129 of the Indian Succession Act, 1925, as follows: [50% / Full Share] to my surviving children (or Testamentary Minor Trust), and failing surviving issue, 50% to my surviving parents [Names] and 50% to my spouse's surviving parents [Names]."`}
                </pre>
                <div className="text-xs text-rose-900 space-y-1.5 pt-1 leading-relaxed">
                  <p>
                    <strong>Why short &quot;same accident&quot; clauses fail:</strong> If a hospital report shows one
                    spouse died 12 hours after the other, Section 21 HSA is rebutted by medical proof. Only a 30-day
                    wait period stops the double probate chain in both crash and hospital scenarios.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 6: INDIAN SUCCESSION ACT SECTIONS 105 & 124 */}
            <section id="indian-succession-act-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>INDIAN SUCCESSION ACT 1925 FRAMEWORK</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Indian Succession Act Rules: Sections 105 &amp; 124
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  The Indian Succession Act, 1925 applies directly to Christians, Parsis, Jews, and Special Marriage Act
                  couples. Its rules on wills (Sections 105, 124, 129, and 131) also guide Hindu Wills under Schedule
                  III.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-xs">Section 105: Lapse of Legacy</div>
                    <p className="text-xs text-slate-600">
                      If a beneficiary dies before the Will maker, the gift lapses and falls into the residue. Without
                      proof of survival in a crash, a spousal gift lapses under Section 105 unless an alternate heir
                      is named.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-xs">Section 124: Uncertain Time Rule</div>
                    <p className="text-xs text-slate-600">
                      Writing &quot;to my spouse, and if she dies, to my brother&quot; with no time limit creates legal
                      confusion. Section 124 restricts that backup gift unless the death happens before distribution.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-xs">Section 129: Prior Gift Failure</div>
                    <p className="text-xs text-slate-600">
                      Section 129 protects alternate gifts. If the first gift fails because the spouse dies within 30
                      days, the second bequest to your children or parents takes effect smoothly.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-xs">Section 131: Conditional Gift-Over</div>
                    <p className="text-xs text-slate-600">
                      Section 131 lets you attach a clear survival condition. If the 30-day condition is not met, the
                      estate moves directly to your backup beneficiary.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: STEP-BY-STEP PATHWAY COMPARISON (NO FLOWCHART IMAGE, PURE TAILWIND CARDS) */}
            <section id="common-disaster-pathway" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>ASSET FLOW COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Common Disaster Outcome Scenarios: Step-by-Step
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Compare how property moves in a common travel accident depending on whether your Will contains our
                30-day survivorship clause.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Pathway A: Without Clause */}
                <div className="rounded-2xl bg-rose-50/70 border border-rose-200 p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-rose-200 pb-2.5">
                    <span className="font-extrabold text-rose-950 text-xs sm:text-sm">
                      Without Survivorship Clause
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-200 text-rose-900 text-[10px] font-bold uppercase">
                      High Litigation
                    </span>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-white border border-rose-100">
                      <div className="font-bold text-slate-900">Step 1: Accident Occurs</div>
                      <p className="text-slate-600 mt-0.5">
                        Both spouses die together; exact death order is unknown.
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-rose-100">
                      <div className="font-bold text-slate-900">Step 2: Section 21 HSA Triggers</div>
                      <p className="text-slate-600 mt-0.5">
                        Law presumes younger spouse survived elder spouse for one moment.
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-rose-100">
                      <div className="font-bold text-rose-700">Step 3: Double Probate &amp; Family Fight</div>
                      <p className="text-slate-600 mt-0.5">
                        Elder&apos;s estate passes to younger spouse&apos;s estate, triggering two court fees and
                        parent disputes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pathway B: With 30-Day Clause */}
                <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200 p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-2.5">
                    <span className="font-extrabold text-emerald-950 text-xs sm:text-sm">
                      With 30-Day Survivorship Clause
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-bold uppercase">
                      Zero Double Fees
                    </span>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-white border border-emerald-100">
                      <div className="font-bold text-slate-900">Step 1: 30-Day Test Applied</div>
                      <p className="text-slate-600 mt-0.5">
                        Neither spouse outlived the other by 30 full calendar days.
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-emerald-100">
                      <div className="font-bold text-slate-900">Step 2: Section 21 Override Blocks Transfer</div>
                      <p className="text-slate-600 mt-0.5">
                        Each spouse is treated as dying first in their own Will. No crossover occurs.
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-emerald-100">
                      <div className="font-bold text-emerald-800">Step 3: Direct Single Transfer</div>
                      <p className="text-slate-600 mt-0.5">
                        Backup executor sends assets straight to children&apos;s trust or both families 50-50.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: LANDMARK COURT PRECEDENTS */}
            <section id="landmark-court-precedents" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>JUDICIAL PRECEDENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Gujarat High Court Precedent: Jayantilal Case
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  Indian High Courts have repeatedly examined Section 21 of the Hindu Succession Act when family members
                  perish in the same fire or accident.
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-xs">
                      1. Jayantilal Mansukhlal v. Mehta Chhanalal Ambalal, AIR 1968 Guj 212
                    </div>
                    <p className="text-xs text-slate-600">
                      A mother and her daughter died together in a fire. No proof showed who died first. The Gujarat
                      High Court applied Section 21 HSA and held that the younger daughter legally survived the mother.
                      Because the Will lacked a survivorship clause, the legacy vested in the daughter&apos;s estate
                      and passed to her husband&apos;s side.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-xs">
                      2. In re Mahabir Singh, AIR 1963 Punj 66
                    </div>
                    <p className="text-xs text-slate-600">
                      The Punjab High Court clarified that Section 21 acts as a rebuttable rule of evidence. It holds
                      good unless concrete medical or witness proof shows that the elder person actually lived longer.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-xs">
                      3. Kanta Yadav v. Om Prakash Yadav, (2019) SCC
                    </div>
                    <p className="text-xs text-slate-600">
                      The Supreme Court reaffirmed that probate under Section 213 ISA is mandatory in Mumbai, Kolkata,
                      and Chennai for Hindu Wills, making double probate in those cities especially costly without a
                      30-day clause.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: COUPLE & MINOR CHILD PROTECTION */}
            <section id="minor-child-couple-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>FAMILY &amp; GUARDIANSHIP SAFEGUARDS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Couple &amp; Minor Child Protection Clause Rules
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  A 30-day survivorship clause works best when paired with three vital family rules for Indian couples:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900">1. Mirror Wills Over Joint Wills</div>
                    <p className="text-slate-600">
                      Draft two separate Mirror Wills instead of one single Joint Will. Each spouse gets clean probate
                      rights and can update their Will easily under Section 62 ISA.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900">2. Minor Child Trust &amp; Guardian</div>
                    <p className="text-slate-600">
                      Minor kids cannot manage real estate directly. Link your backup gift-over to a Testamentary Trust
                      and name a Testamentary Guardian for school and medical care.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900">3. Sync Secondary Nominees</div>
                    <p className="text-slate-600">
                      If both spouses die together, sole spousal nominations on term insurance, Demat, and EPF freeze.
                      Add secondary nominees or direct proceeds into your Will trust.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: STEP-BY-STEP SOP */}
            <section id="step-by-step-clause-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>PRACTICAL EXECUTION SOP</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Step-by-Step SOP: Adding Clause to Your Will
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Set Your 30-Day Wait Window</div>
                    <p className="text-slate-600 mt-0.5">
                      Pick a 30-day survivorship window in both spouses&apos; Wills so crash and ICU deaths are covered.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Insert Section 21 Override &amp; Backup Gift</div>
                    <p className="text-slate-600 mt-0.5">
                      Include the Section 21 HSA override text and clearly name alternate heirs under Sections 124 and
                      129 ISA.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Appoint a Backup Executor</div>
                    <p className="text-slate-600 mt-0.5">
                      Name a trusted brother, sister, or friend as Alternate Executor in case both spouses die together.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Sign with Two Adult Witnesses</div>
                    <p className="text-slate-600 mt-0.5">
                      Sign your fresh Mirror Wills or registered Codicil before two non-beneficiary adult witnesses under
                      Section 63 ISA.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                    5
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Update Bank &amp; Term Insurance Nominees</div>
                    <p className="text-slate-600 mt-0.5">
                      Add secondary nominees on bank accounts, Demat holdings, and term policies so payouts match your
                      Will.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: FOUR COSTLY ERRORS */}
            <section id="common-drafting-mistakes" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertCircle className="w-4 h-4" />
                <span>PREVENT ESTATE FREEZE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Four Costly Errors in Couple Will Clauses
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Only Covering &quot;Same Accident&quot;</span>
                  </div>
                  <p className="text-slate-600">
                    If one spouse lives 3 days in ICU after a crash, a pure &quot;same accident&quot; clause fails.
                    Always use a 30-day survivorship window.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Leaving Out Backup Executor</span>
                  </div>
                  <p className="text-slate-600">
                    Naming only your spouse as executor forces your heirs into a slow Section 232 Letters of
                    Administration case if you die together.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Missing Residuary Gift-Over</span>
                  </div>
                  <p className="text-slate-600">
                    Without a backup residuary clause, lapsed assets under Section 105 ISA fall into intestacy and spark
                    heir court fights.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Drafting One Joint Will</span>
                  </div>
                  <p className="text-slate-600">
                    A single Joint Will creates probate blocks and revocation fights. Always use two separate Mirror
                    Wills with matching clauses.
                  </p>
                </div>
              </div>
            </section>

            {/* MID-ARTICLE DUAL CONVERSION CTA & DIAGNOSTIC TOOLS */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-[#172228] text-white space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-300 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#C65378]" />
                <span>ONLINE WILL DRAFTING &amp; PROBATE TOOLS</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold">
                Protect Your Spouse &amp; Children with a 30-Day Survivorship Will
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Draft a complete online Will with built-in common disaster clauses, or consult our estate lawyers to
                amend an existing registered Will via Codicil.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  href="/start"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate New Will or Codicil</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-xs shadow-md transition-colors"
                >
                  <Gavel className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>Advocate Consultation</span>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold">
                <Link
                  href="/tools/probate-court-fee-timeline-calculator"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-between transition-colors"
                >
                  <span>Probate Fee Calculator</span>
                  <ArrowRight className="w-4 h-4 text-rose-300" />
                </Link>
                <Link
                  href="/tools/probate-checker"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-between transition-colors"
                >
                  <span>Probate Checker Tool</span>
                  <ArrowRight className="w-4 h-4 text-rose-300" />
                </Link>
                <Link
                  href="/tools/succession-calculator"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-between transition-colors"
                >
                  <span>Heir Share Tool</span>
                  <ArrowRight className="w-4 h-4 text-rose-300" />
                </Link>
              </div>
            </div>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Institutional Profile: Legal Excellence
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Couple &amp; Family Succession Desk
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Checked Will Bench</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is powered by AMA Legal Solutions. Our estate lawyers craft paired Mirror Wills,
                  30-day survivorship clauses, minor child trusts, and SRO registration files across India so couples
                  avoid double probate costs and family litigation.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/mirror-wills-for-couples"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Couple Mirror Wills Service</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/services/probate-lawyer"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Probate Advisory Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/templates"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>All Legal Templates Hub</span>
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
                13. Frequently Asked Questions: Survivorship Clauses
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-[#C65378] transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
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

            {/* SECTION 14: STATUTORY CITATIONS & OFFICIAL PORTALS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY CITATIONS &amp; OFFICIAL PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Legal Rules &amp; Official Government Portals
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs">
                <div className="space-y-2">
                  <div className="font-extrabold text-slate-900">
                    Governing Statutes &amp; Sections Covered:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      <strong>Hindu Succession Act, 1956 (Section 21):</strong> Presumption that the younger person
                      survived the elder in simultaneous deaths.
                    </li>
                    <li>
                      <strong>Hindu Succession Act, 1956 (Section 15):</strong> Devolution rules for a female Hindu&apos;s
                      property upon death without children.
                    </li>
                    <li>
                      <strong>Indian Succession Act, 1925 (Section 105):</strong> Lapse of legacy if a legatee dies
                      before the Will maker.
                    </li>
                    <li>
                      <strong>Indian Succession Act, 1925 (Sections 124, 129 &amp; 131):</strong> Contingent bequests,
                      prior gift failure, and conditional gift-over rules.
                    </li>
                    <li>
                      <strong>Indian Succession Act, 1925 (Sections 63 &amp; 213):</strong> Two-witness execution rules
                      and metro probate rules.
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-3">
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Succession Acts</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://ecourts.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>eCourts Services Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>Supreme Court of India</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Estate Guides &amp; Templates
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/templates/joint-mutual-mirror-will-format-husband-wife"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Mirror Will Format for Couples
                    </Link>
                    <Link
                      href="/templates/testamentary-trust-clause-minor-child-will-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Minor Child Trust Clause Format
                    </Link>
                    <Link
                      href="/templates/codicil-to-registered-will-amendment-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Codicil Amendment Format
                    </Link>
                    <Link
                      href="/templates/will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Standard Indian Will Format
                    </Link>
                    <Link
                      href="/blogs/simultaneous-death-husband-wife-accident-commorientes-rule-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Commorientes Rule Guide
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* THREE PLAIN LANGUAGE SUMMARY CARDS (Readability Support) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Add a 30-Day Clause?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A 30-day clause stops double probate court cases if spouses die together. Your assets go straight to
                  your kids or chosen heirs with no costly delays.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Simple Signing Rules</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You can write your Will or Codicil on plain white paper. Sign it in front of two adult witnesses who
                  do not get any gift under the Will.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers draft paired Mirror Wills with Section 21 overrides, backup executors, and child trusts.
                  Your family stays safe in every Indian state.
                </p>
              </div>
            </div>
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
                  <div className="font-extrabold text-slate-900 text-sm">Lawyer Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Expert in Indian succession law, couple Mirror Wills, Section 21 HSA survivorship clauses, and High
                Court probate matters across India.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Checked Counsel</span>
                </span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-6">
              {/* CARD 2: DUAL CTA 1 - WILL DRAFTING (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>AVOID DOUBLE PROBATE FEES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Draft a Protected Will in 15 Minutes
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Create a legally vetted Will or Codicil online with built-in 30-day survivorship, Section 21 override,
                  and backup executor clauses.
                </p>
                <button
                  type="button"
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Online Will Draft</span>
                </button>
                <Link
                  href="/start"
                  className="block text-[11px] font-bold text-rose-200 hover:text-white underline underline-offset-2"
                >
                  Open Instant Will Builder
                </Link>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Section 63 &amp; SRO Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Gavel className="w-3 h-3" />
                  <span>ESTATE LEGAL DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need Custom Couple Mirror Wills?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers draft custom paired Mirror Wills, minor child trusts, and registered Codicils tailored to
                  your assets and family structure.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Consult Estate Lawyer</span>
                </Link>
              </div>

              {/* CARD 4: DOCUMENT CHECKLIST CARD */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-[#C65378]" />
                    <span>Clause Drafting Checklist</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="text-[11px] font-bold text-[#C65378] hover:underline cursor-pointer"
                  >
                    {copiedChecklist ? "Copied!" : "Copy"}
                  </button>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-600">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>30-Day Survivorship Window</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Section 21 HSA Override Text</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Section 124 &amp; 129 Backup Heirs</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Alternate Executor &amp; Guardian</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>2 Independent Adult Witnesses</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
