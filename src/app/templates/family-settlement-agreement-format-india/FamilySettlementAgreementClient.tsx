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
  Building,
  UserCheck,
  Lock,
  Clock,
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
  FileText,
  Layers,
  Coins,
  MapPin,
  Building2,
  Info,
  Calendar,
  Download,
  AlertCircle,
  Sliders,
  DollarSign,
  TrendingUp,
  Percent,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "what-is-family-settlement", label: "1. What is a Family Settlement in India?" },
  { id: "kale-supreme-court-precedent", label: "2. Supreme Court Precedents: The Kale Rule" },
  { id: "memorandum-vs-partition-deed", label: "3. Memorandum vs Partition Deed Comparison" },
  { id: "interactive-drafting-selector", label: "4. Interactive Settlement Drafting Selector" },
  { id: "memorandum-oral-settlement-template", label: "5. Format 1: Past Oral Settlement (Yadasht)" },
  { id: "operative-settlement-deed-template", label: "6. Format 2: Registered Settlement Deed" },
  { id: "essential-settlement-clauses", label: "7. Key Clauses: Estoppel, Owelty & Title" },
  { id: "registration-stamp-duty-rules", label: "8. Registration Act Sec 17 & Stamp Duty" },
  { id: "taxation-capital-gains-rules", label: "9. Tax Exemptions: Section 47 IT Act" },
  { id: "step-by-step-execution-sop", label: "10. Step-by-Step SOP: Execution to Mutation" },
  { id: "practical-case-studies", label: "11. Real Family Settlement Case Studies" },
  { id: "institutional-profile", label: "12. Legal Review by AMA Legal Solutions" },
  { id: "frequently-asked-questions", label: "13. Frequently Asked Questions" },
  { id: "statutory-citations", label: "14. Statutory Citations & Official Portals" },
];

const FAQS = [
  {
    q: "What is a Family Settlement Agreement in Indian law?",
    a: "A Family Settlement Agreement is an amicable agreement among family members who share antecedent rights, claims, or title in family properties. Instead of fighting expensive partition lawsuits in civil court, the family agrees to divide their shared properties peacefully. It preserves family harmony and resolves rival property claims permanently.",
  },
  {
    q: "Is an oral family settlement legally valid without registration in India?",
    a: "Yes, 100%. The Supreme Court of India in Kale v. Deputy Director of Consolidation (AIR 1976 SC 807) held that an oral family settlement is completely valid in law. When family members orally partition property and later record the agreed terms in a Memorandum (Yadasht), that memorandum does not require compulsory registration under Section 17 of the Registration Act, 1908.",
  },
  {
    q: "What is the crucial difference between a Memorandum of Settlement and a Partition Deed?",
    a: "A Partition Deed creates new rights and divides property on the spot (in praesenti). Therefore, Section 17(1)(b) of the Registration Act makes its registration compulsory, attracting heavy state stamp duty (often 2% to 6%). A Memorandum of Past Oral Settlement merely records a partition that already took place orally in the past. It does not create new title, so it avoids heavy stamp duty and mandatory registration.",
  },
  {
    q: "How does the Supreme Court ruling in Korukonda Chalapathi Rao (2021) protect families?",
    a: "In Korukonda Chalapathi Rao v. Korukonda Annapurna Sampath Kumar (2021), the Supreme Court ruled that an unregistered family settlement memorandum is admissible in evidence under the proviso to Section 49 of the Registration Act for collateral purposes. This includes proving the nature and character of separate possession and the severance of joint family status.",
  },
  {
    q: "Do married daughters and sisters have equal rights in a family settlement?",
    a: "Yes. Under Section 6 of the Hindu Succession Act, 1956 (amended in 2005) and the Supreme Court judgment in Vineeta Sharma v. Rakesh Sharma (2020), daughters have equal coparcenary rights by birth. Any family settlement that excludes married daughters or sisters without their written consent can be challenged and overturned in civil court.",
  },
  {
    q: "Does a family settlement agreement attract capital gains tax in India?",
    a: "No. Under Section 47(i) of the Income Tax Act, 1961, any distribution of capital assets during a family partition or settlement is not regarded as a transfer. Therefore, executing a family settlement attracts zero capital gains tax. Tax liability arises only when a family member subsequently sells their allotted share to a third-party buyer.",
  },
  {
    q: "What is an Owelty clause, and when is it required?",
    a: "An Owelty clause is used when properties cannot be physically divided into equal financial shares. For example, if one sibling receives the primary family bungalow and another receives a smaller apartment, the party receiving the more valuable property pays a cash sum (owelty) to equalize the division.",
  },
  {
    q: "How does the doctrine of estoppel prevent family members from reopening a settlement?",
    a: "Under the Supreme Court ruling in Subraya M.N. v. Vittala M.N. (2016), once a family member agrees to an oral settlement, signs the memorandum, and takes possession of their allocated share, they are legally estopped from challenging the settlement later. They cannot claim that the document was unregistered to reopen the partition.",
  },
  {
    q: "Can a family settlement agreement be registered voluntarily before the Sub-Registrar?",
    a: "Yes. While a past oral memorandum does not require compulsory registration, families can choose to register an Operative Family Settlement Deed voluntarily under Section 18 or Section 17 of the Registration Act. This provides registered public notice and eliminates any risk when obtaining bank mortgages or buyer title clearance.",
  },
  {
    q: "What documents are required to mutate property records after a family settlement?",
    a: "You need: (1) The executed Family Settlement Memorandum or registered deed, (2) Joint affidavit and no-objection certificates from all participating members, (3) Death certificates of original property owners, (4) Title documents and previous purchase deeds, and (5) Latest municipal property tax receipts and electricity bills.",
  },
];

export default function FamilySettlementAgreementClient() {
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

  const [activeId, setActiveId] = useState<string>("what-is-family-settlement");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<"memorandum" | "operative" | "clauses">("memorandum");
  const [copiedState, setCopiedState] = useState<string | null>(null);

  // Interactive Selector State
  const [settlementTiming, setSettlementTiming] = useState<"past_oral" | "fresh_today">("past_oral");
  const [propertyNature, setPropertyNature] = useState<"ancestral" | "self_acquired" | "mixed">("ancestral");
  const [propertyState, setPropertyState] = useState<string>("delhi");
  const [assetValue, setAssetValue] = useState<number>(15000000); // 1.50 Crore default
  const [heirCount, setHeirCount] = useState<number>(3);
  const [heirAgreement, setHeirAgreement] = useState<"unanimous" | "dispute_risk">("unanimous");

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

    TOC_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedState(label);
    setTimeout(() => setCopiedState(null), 3000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  // Stamp duty calculation based on State & Timing
  const getStateDutyRate = (stateKey: string): number => {
    switch (stateKey) {
      case "maharashtra":
        return 0.02; // 2% on separated shares
      case "up":
        return 0.04; // 4-5% in UP
      case "delhi":
        return 0.02; // 2-3%
      case "karnataka":
        return 0.03; // ~3%
      case "tamil_nadu":
        return 0.04; // 4%
      case "west_bengal":
        return 0.03;
      default:
        return 0.03;
    }
  };

  const standardPartitionDuty = Math.round(assetValue * getStateDutyRate(propertyState));
  const memorandumStampCost = 500; // Flat agreement stamp
  const estimatedSavings = Math.max(0, standardPartitionDuty - memorandumStampCost);

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
            <span>REGISTRATION ACT, 1908 • SUPREME COURT KALE PRECEDENT</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Family Settlement Agreement Format India: Legal Templates
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Divide ancestral and self-acquired family property amicably. Compare the past-tense{" "}
            <strong>Memorandum of Past Oral Settlement (Yadasht)</strong> against a registered{" "}
            <strong>Partition Deed</strong> to prevent family disputes and save heavy state stamp duty.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-drafting-selector"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Select Settlement Format</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">AIR 1976 SC 807</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                KALE RATIO PRECEDENT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">0% Capital Gains</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SECTION 47(i) IT ACT EXEMPTION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 17(1)(b)</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                PAST MEMORANDUM EXEMPTION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹0 Court Fees</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                PREVENTS PARTITION LAWSUITS
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
                Governed under Sections 17 &amp; 49 of the Registration Act, 1908, Indian Stamp Act, 1899,
                and Section 47(i) of the Income Tax Act, 1961, read with landmark Supreme Court precedents
                Kale v. Deputy Director (1976) and Korukonda Chalapathi Rao (2021).
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
                <span>EXECUTIVE BRIEF: FAMILY SETTLEMENT RULES IN INDIA</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Oral Partition is Completely Valid:</strong> Under settled Indian law, coparceners
                    and co-heirs can partition family property orally. A written agreement is not mandatory at
                    the time of oral division.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>The Supreme Court Kale Rule:</strong> If you later record the past oral division as
                    a <em>Memorandum of Family Settlement (Yadasht)</em>, it does not create rights on the spot
                    (in praesenti). Therefore, it does NOT require mandatory registration under Section 17.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Avoid the Present-Tense Drafting Trap:</strong> Online templates that use phrases
                    like &ldquo;parties hereby transfer and assign&rdquo; create an operative deed. This triggers
                    full partition stamp duty (2% to 6%) and requires SRO registration.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Capital Gains Tax:</strong> Under Section 47(i) of the Income Tax Act, a bona
                    fide family settlement is not a transfer. No capital gains tax is triggered during family
                    division.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION */}
            <section id="what-is-family-settlement" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. What is a Family Settlement Agreement in India?
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When parents pass away or joint family assets grow complex, disputes often arise among
                  siblings, coparceners, and legal heirs. In India, civil partition lawsuits take 15 to 25
                  years to reach a final decree. A <strong>Family Settlement Agreement</strong> (also known as a
                  Family Arrangement) is an amicable, legally recognized mechanism to divide properties without
                  litigation.
                </p>
                <p>
                  Unlike a Sale Deed or Gift Deed, a family arrangement does not create a new title from a
                  stranger. Instead, it recognizes and reorganizes existing, pre-existing rights among family
                  members who already hold an antecedent title, interest, or claim in the property.
                </p>
                <p>
                  Indian courts lean strongly in favor of upholding family arrangements. In the words of the
                  Supreme Court in <em>Ram Charan Das v. Girja Nandini Devi (AIR 1966 SC 323)</em>, the courts
                  view family settlements with favor because they maintain peace, prevent family feuds, and
                  shield the family honor from protracted public litigation.
                </p>
              </div>

              {/* Visual Banner Component: Open Graph Visual */}
              <div className="my-6 rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-white">
                <Image
                  src="/images/family-settlement-agreement-format-india-og.jpg"
                  alt="Family Settlement Agreement Format India Memorandum of Oral Settlement vs Partition Deed"
                  width={1200}
                  height={675}
                  priority
                  className="w-full h-auto object-cover"
                />
                <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Scale className="w-4 h-4 text-[#C65378]" />
                    <span>Statutory Drafting Protocol • Registration Act 1908 &amp; Supreme Court Precedents</span>
                  </span>
                  <span className="font-bold text-slate-800">WillDrafting.in Legal Desk</span>
                </div>
              </div>
            </section>

            {/* SECTION 2: SUPREME COURT KALE PRECEDENTS */}
            <section id="kale-supreme-court-precedent" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>LANDMARK JUDICIAL PRECEDENTS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Kale v. Deputy Director: Landmark Supreme Court Tests
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                The foundational judgment governing all family settlements in India is the three-judge bench
                ruling of the Supreme Court in <strong>Kale v. Deputy Director of Consolidation (AIR 1976 SC 807)</strong>.
                The apex court laid down five mandatory tests for a valid family arrangement:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                    <div className="w-6 h-6 rounded-full bg-rose-100 text-[#C65378] flex items-center justify-center text-xs">
                      1
                    </div>
                    <span>Bona Fide Resolution of Disputes</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The arrangement must be genuine, aimed at resolving real family disputes, rival claims, or
                    competing property expectations once and for all.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                    <div className="w-6 h-6 rounded-full bg-rose-100 text-[#C65378] flex items-center justify-center text-xs">
                      2
                    </div>
                    <span>Fair and Equitable Allotment</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The division of properties must be fair to all branches. It should not be an unfair sham
                    intended to defraud creditors or exclude rightful legal heirs.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                    <div className="w-6 h-6 rounded-full bg-rose-100 text-[#C65378] flex items-center justify-center text-xs">
                      3
                    </div>
                    <span>Voluntary and Free from Coercion</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    All participating family members must execute the arrangement freely, without undue
                    influence, fraud, or misrepresentation.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                    <div className="w-6 h-6 rounded-full bg-rose-100 text-[#C65378] flex items-center justify-center text-xs">
                      4
                    </div>
                    <span>Antecedent Title or Possible Claim</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Parties must have some antecedent title, claim, or interest in the property. It can also
                    include a possible claim based on family ties or moral claims.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-slate-800 text-xs sm:text-sm leading-relaxed space-y-2">
                <div className="flex items-center gap-2 font-extrabold text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>The Fifth Test: Oral Settlement Followed by Written Memorandum</span>
                </div>
                <p>
                  Justice S. Murtaza Fazal Ali explicitly held: <em>&ldquo;The family arrangement may be even
                  oral in which case no registration is necessary. The terms may be subsequently reduced into
                  writing as a memorandum of what had been agreed upon by the parties. In such cases the
                  memorandum does not create or extinguish any rights and does not require registration.&rdquo;</em>
                </p>
              </div>
            </section>

            {/* SECTION 3: COMPARISON TABLE */}
            <section id="memorandum-vs-partition-deed" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>COMPARATIVE ANALYSIS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Memorandum of Oral Settlement vs Partition Deed Table
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Understanding whether you need a past-tense Memorandum or a registered Partition Deed is
                essential to avoid legal delays and save substantial stamp duty costs:
              </p>

              {/* Structured Comparison Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#172228] text-white border-b border-slate-700">
                      <th className="p-4 font-bold">Feature</th>
                      <th className="p-4 font-bold text-rose-200">
                        Format 1: Memorandum of Past Oral Settlement
                      </th>
                      <th className="p-4 font-bold text-emerald-200">
                        Format 2: Registered Operative Settlement Deed
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4 font-bold text-slate-900">Timing of Partition</td>
                      <td className="p-4">Partition already completed orally in the past.</td>
                      <td className="p-4">Partition occurs on the spot upon deed signing.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4 font-bold text-slate-900">Operative Grammatical Tense</td>
                      <td className="p-4">
                        <span className="font-mono bg-rose-50 text-[#C65378] px-2 py-0.5 rounded text-xs">
                          Past Tense (&ldquo;had mutually agreed and taken possession&rdquo;)
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-mono bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-xs">
                          Present Tense (&ldquo;hereby partition, convey and release&rdquo;)
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4 font-bold text-slate-900">Registration under Sec 17</td>
                      <td className="p-4">
                        <strong className="text-emerald-700">NOT Compulsory</strong> (Exempt under Kale Rule).
                      </td>
                      <td className="p-4">
                        <strong className="text-rose-700">Mandatory Registration</strong> before Sub-Registrar.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4 font-bold text-slate-900">Stamp Duty Expense</td>
                      <td className="p-4">
                        Nominal agreement stamp (₹100 to ₹500 depending on state).
                      </td>
                      <td className="p-4">
                        Full partition stamp duty (typically 2% to 6% of property value).
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4 font-bold text-slate-900">Legal Precedent Basis</td>
                      <td className="p-4">Kale (1976 SC) &amp; Korukonda Chalapathi Rao (2021 SC).</td>
                      <td className="p-4">Section 17(1)(b) of Registration Act &amp; Sita Ram (2018 SC).</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4 font-bold text-slate-900">Bank Mortgage Feasibility</td>
                      <td className="p-4">
                        Accepted by many lenders along with continuous revenue mutation records.
                      </td>
                      <td className="p-4">
                        Universally accepted by all nationalized and private banks.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4 font-bold text-slate-900">Revenue Mutation (Dakhil Kharij)</td>
                      <td className="p-4">
                        Mutated via joint affidavit, memorandum, and possession proof.
                      </td>
                      <td className="p-4">
                        Direct mutation on production of registered deed from SRO.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: INTERACTIVE DRAFTING SELECTOR */}
            <section id="interactive-drafting-selector" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE DRAFTING SELECTOR</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Interactive Family Settlement Drafting Selector
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Use our diagnostic selector below to determine whether your family needs a Past-Tense
                Memorandum or a Registered Partition Deed, and estimate your state stamp duty savings:
              </p>

              {/* Selector Box */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-slate-100">
                  {/* Timing Option */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      When Was the Physical Division Agreed?
                    </label>
                    <select
                      value={settlementTiming}
                      onChange={(e) => setSettlementTiming(e.target.value as any)}
                      aria-label="Settlement timing selector"
                      className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C65378]/20 focus:border-[#C65378]"
                    >
                      <option value="past_oral">Already divided orally in the past (Parties in possession)</option>
                      <option value="fresh_today">Dividing fresh today in writing for the first time</option>
                    </select>
                  </div>

                  {/* Property State */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      State Where Property is Located
                    </label>
                    <select
                      value={propertyState}
                      onChange={(e) => setPropertyState(e.target.value)}
                      aria-label="Property state selector"
                      className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C65378]/20 focus:border-[#C65378]"
                    >
                      <option value="delhi">Delhi NCR (2% - 3%)</option>
                      <option value="maharashtra">Maharashtra (2% on separated shares)</option>
                      <option value="up">Uttar Pradesh (4% - 5%)</option>
                      <option value="karnataka">Karnataka (~3%)</option>
                      <option value="tamil_nadu">Tamil Nadu (4%)</option>
                      <option value="west_bengal">West Bengal (3%)</option>
                    </select>
                  </div>

                  {/* Property Nature */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Nature of Family Assets
                    </label>
                    <select
                      value={propertyNature}
                      onChange={(e) => setPropertyNature(e.target.value as any)}
                      aria-label="Property nature selector"
                      className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C65378]/20 focus:border-[#C65378]"
                    >
                      <option value="ancestral">Ancestral / Coparcenary / Joint Family Property</option>
                      <option value="self_acquired">Self-Acquired by Parents (Inherited by Co-Heirs)</option>
                      <option value="mixed">Mixed Assets (Properties + Family Business + Gold)</option>
                    </select>
                  </div>

                  {/* Heirs Agreement Status */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Consent Status Among Legal Heirs
                    </label>
                    <select
                      value={heirAgreement}
                      onChange={(e) => setHeirAgreement(e.target.value as any)}
                      aria-label="Heir agreement status selector"
                      className="w-full p-3 rounded-xl border border-slate-200 text-sm font-semibold bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C65378]/20 focus:border-[#C65378]"
                    >
                      <option value="unanimous">100% Unanimous Consent (All adult heirs agree)</option>
                      <option value="dispute_risk">Minor heir involved or risk of future dispute</option>
                    </select>
                  </div>
                </div>

                {/* Approximate Property Value Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>APPROXIMATE TOTAL PROPERTY VALUE</span>
                    <span className="text-[#C65378] font-extrabold text-sm sm:text-base">
                      ₹{(assetValue / 100000).toLocaleString("en-IN")} Lakhs (₹{(assetValue / 10000000).toFixed(2)} Cr)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2000000}
                    max={100000000}
                    step={1000000}
                    value={assetValue}
                    onChange={(e) => setAssetValue(Number(e.target.value))}
                    aria-label="Approximate property value slider"
                    className="w-full accent-[#C65378] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                    <span>₹20 Lakhs</span>
                    <span>₹50 Lakhs</span>
                    <span>₹1 Crore</span>
                    <span>₹5 Crores</span>
                    <span>₹10 Crores</span>
                  </div>
                </div>

                {/* Calculation Output Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-[#172228] text-white space-y-4 shadow-md">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div>
                      <div className="text-[11px] font-bold text-rose-300 uppercase tracking-wider">
                        RECOMMENDED LEGAL INSTRUMENT
                      </div>
                      <div className="text-lg sm:text-xl font-extrabold text-white">
                        {settlementTiming === "past_oral" && heirAgreement === "unanimous"
                          ? "Format 1: Memorandum of Past Oral Settlement (Yadasht)"
                          : "Format 2: Registered Operative Settlement cum Partition Deed"}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-emerald-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>
                        {settlementTiming === "past_oral" && heirAgreement === "unanimous"
                          ? "Sec 17 Registration Exempt"
                          : "Compulsory Registration Required"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-white/60 text-[11px]">Standard Partition Stamp Duty</div>
                      <div className="text-base sm:text-lg font-black text-rose-300 mt-1">
                        ₹{standardPartitionDuty.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] text-white/50 mt-0.5">Based on State Stamp Act</div>
                    </div>

                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-white/60 text-[11px]">Memorandum Stamp Duty</div>
                      <div className="text-base sm:text-lg font-black text-emerald-300 mt-1">
                        ₹{settlementTiming === "past_oral" ? "500" : standardPartitionDuty.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] text-white/50 mt-0.5">Non-judicial stamp paper</div>
                    </div>

                    <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/30">
                      <div className="text-emerald-300 text-[11px] font-bold">Estimated Stamp Savings</div>
                      <div className="text-base sm:text-lg font-black text-emerald-400 mt-1">
                        {settlementTiming === "past_oral" && heirAgreement === "unanimous"
                          ? `₹${estimatedSavings.toLocaleString("en-IN")}`
                          : "₹0 (Registration Needed)"}
                      </div>
                      <div className="text-[10px] text-emerald-200/60 mt-0.5">Under Kale Rule Ratio</div>
                    </div>
                  </div>

                  <p className="text-xs text-white/80 leading-relaxed pt-1">
                    {settlementTiming === "past_oral" && heirAgreement === "unanimous"
                      ? "Because your family already partitioned the assets orally and holds peaceful separate possession, drafting a past-tense Memorandum (Yadasht) protects all legal heirs via estoppel without paying high partition stamp duty."
                      : "Because you are dividing properties fresh today or an heir has reservations, executing a registered Partition Deed before the Sub-Registrar provides absolute legal finality and ensures clear marketable title."}
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: FORMAT 1 - MEMORANDUM OF PAST ORAL SETTLEMENT */}
            <section id="memorandum-oral-settlement-template" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>LEGAL TEMPLATE 1</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Format 1: Memorandum of Past Oral Family Settlement
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Use this format when family members have <strong>already orally partitioned</strong> their
                properties on an earlier date and are now putting the agreed terms into writing merely for
                future record and peace. This format strictly follows the <em>Kale v. Deputy Director</em> rule
                using past-tense non-operative language:
              </p>

              {/* Template Box 1 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-sm text-slate-900">
                    Memorandum of Oral Family Settlement (Yadasht / Yad-dasht)
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `MEMORANDUM OF PAST ORAL FAMILY SETTLEMENT (YADASHT)

THIS MEMORANDUM OF PAST ORAL FAMILY SETTLEMENT is executed on this [Day] day of [Month], [Year] at [City/Place], by and between:

1. [Full Name of First Party], son/daughter of [Late Father/Mother Name], aged about [Age] years, residing at [Full Address], Aadhaar No: [Number] (hereinafter referred to as the "FIRST PARTY");

2. [Full Name of Second Party], son/daughter of [Late Father/Mother Name], aged about [Age] years, residing at [Full Address], Aadhaar No: [Number] (hereinafter referred to as the "SECOND PARTY");

3. [Full Name of Third Party], son/daughter of [Late Father/Mother Name], aged about [Age] years, residing at [Full Address], Aadhaar No: [Number] (hereinafter referred to as the "THIRD PARTY");

(The First, Second, and Third Parties are hereinafter collectively referred to as the "PARTIES" and individually as a "PARTY").

WHEREAS:
A. The Parties hereto are the real brothers, sisters, and sole surviving Class I legal heirs of Late [Name of Deceased Parent/Ancestor], who departed this life on [Date of Death] at [Place of Death].
B. The said deceased parent died intestate without executing any Will or Testamentary disposition, leaving behind the immovable and movable properties described in the General Schedule hereinbelow.
C. The Parties have antecedent title, interest, and equal coparcenary/inheritance rights in the said family estate as tenants-in-common.
D. With a view to preserving family harmony, avoiding disputes, and averting bitter litigation in civil courts, the Parties, with the mediation of respected family elders, had previously convened on [Date of Past Oral Partition, e.g., 15th January 2024] at [Place] and arrived at a complete, amicable, and final ORAL FAMILY SETTLEMENT AND PARTITION of all the properties.
E. In pursuance of the said oral family settlement arrived on [Date of Past Oral Settlement], the Parties had already taken actual, physical, exclusive, and peaceful possession of their respective allocated shares and parcels of property, and have been enjoying the same independently ever since.
F. This Memorandum is being executed now merely to record, confirm, and memorize the terms of the said antecedent oral settlement arrived at between the Parties, and does not of itself create, declare, assign, limit, or extinguish any right, title, or interest in immovable property in praesenti, in accordance with the law laid down by the Hon'ble Supreme Court of India in Kale v. Deputy Director of Consolidation (AIR 1976 SC 807).

NOW, THEREFORE, THIS MEMORANDUM WITNESSETH AND IT IS HEREBY CONFIRMED AS FOLLOWS:

1. CONFIRMATION OF PAST ORAL SETTLEMENT:
The Parties hereby mutually declare and confirm that the oral partition arrived at between them on [Date of Past Oral Settlement] was final, binding, and conclusive, and the division was made as follows:

(a) ALLOTMENT TO FIRST PARTY (SCHEDULE 'A' PROPERTY):
The First Party had been allotted and had entered into exclusive physical possession of all that piece and parcel of property described in SCHEDULE 'A' hereunder written. The First Party is the sole absolute owner thereof, free from any claims by the other Parties.

(b) ALLOTMENT TO SECOND PARTY (SCHEDULE 'B' PROPERTY):
The Second Party had been allotted and had entered into exclusive physical possession of all that piece and parcel of property described in SCHEDULE 'B' hereunder written. The Second Party is the sole absolute owner thereof, free from any claims by the other Parties.

(c) ALLOTMENT TO THIRD PARTY (SCHEDULE 'C' PROPERTY):
The Third Party had been allotted and had entered into exclusive physical possession of all that piece and parcel of property described in SCHEDULE 'C' hereunder written. The Third Party is the sole absolute owner thereof, free from any claims by the other Parties.

2. EQUALIZATION PAYMENT (OWELTY), IF ANY:
To equalize the valuation of the physical shares, the [Party Name] had paid a sum of Rs. [Amount]/- (Rupees [Amount in Words] only) to [Other Party Name] via Cheque/NEFT bearing No. [Reference] dated [Date], the receipt of which is hereby acknowledged.

3. MUTUAL RELEASE AND ESTOPPEL:
Each Party confirms that they have no right, title, claim, or interest whatsoever in the properties allotted to the other Parties. The Parties hereby covenant that they, their heirs, executors, administrators, and assigns are legally estopped from challenging, reopening, or questioning the said oral family settlement at any time hereafter.

4. REVENUE MUTATION:
Each Party shall be fully entitled to have their respective name mutated in the revenue records, municipal records, electricity, and water records independently, and all other Parties undertake to sign any necessary affidavits, forms, or No-Objection Certificates (NOCs) upon request.

IN WITNESS WHEREOF, the Parties hereto have signed and confirmed this Memorandum of Oral Family Settlement on the day, month, and year first above written.

WITNESSES:
1. [Signature, Name & Address of Witness 1]
2. [Signature, Name & Address of Witness 2]

PARTIES:
1. ____________________ (FIRST PARTY)
2. ____________________ (SECOND PARTY)
3. ____________________ (THIRD PARTY)`,
                        "memorandum"
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedState === "memorandum" ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Format 1</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-96">
{`MEMORANDUM OF PAST ORAL FAMILY SETTLEMENT (YADASHT)

THIS MEMORANDUM OF PAST ORAL FAMILY SETTLEMENT is executed on this [Day] day of [Month], [Year] at [City/Place], by and between:
1. [Full Name of First Party] ... (FIRST PARTY)
2. [Full Name of Second Party] ... (SECOND PARTY)
3. [Full Name of Third Party] ... (THIRD PARTY)

WHEREAS:
A. The Parties are the surviving Class I legal heirs of Late [Parent/Ancestor Name], who died intestate on [Date of Death].
B. The Parties have antecedent title, interest, and equal coparcenary/inheritance rights in the family estate.
C. With a view to preserving family harmony, the Parties had previously convened on [Date of Past Oral Partition, e.g., 15th January 2024] and arrived at a complete, amicable, and final ORAL FAMILY SETTLEMENT AND PARTITION.
D. In pursuance thereof, the Parties had already taken actual, physical, exclusive, and peaceful possession of their respective allocated shares.
E. This Memorandum is executed now merely to record, confirm, and memorize the terms of the said past oral settlement, and does not of itself create or extinguish rights in praesenti (Kale v. Deputy Director, AIR 1976 SC 807).

NOW, THEREFORE, THIS MEMORANDUM CONFIRMS:
1. ALLOTMENT TO FIRST PARTY: SCHEDULE 'A' PROPERTY.
2. ALLOTMENT TO SECOND PARTY: SCHEDULE 'B' PROPERTY.
3. ALLOTMENT TO THIRD PARTY: SCHEDULE 'C' PROPERTY.
4. ESTOPPEL & RELEASE: Each Party covenants that they are legally estopped from challenging this settlement at any time hereafter.
5. REVENUE MUTATION: Parties authorize independent mutation in municipal and revenue records.`}
                </pre>
              </div>
            </section>

            {/* SECTION 6: FORMAT 2 - REGISTERED OPERATIVE SETTLEMENT DEED */}
            <section id="operative-settlement-deed-template" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>LEGAL TEMPLATE 2</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Format 2: Registered Operative Family Settlement Deed
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Use this format when the family wishes to divide properties <strong>fresh today</strong> in
                writing and register the deed formally before the Sub-Registrar Office (SRO). This format uses
                operative present-tense conveyance clauses:
              </p>

              {/* Template Box 2 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-sm text-slate-900">
                    Operative Family Settlement cum Partition Deed (For Registration)
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `FAMILY SETTLEMENT CUM PARTITION DEED (OPERATIVE INSTRUMENT)

THIS DEED OF FAMILY SETTLEMENT is executed on this [Day] day of [Month], [Year] at [City], by and between:
[Full details of Co-owners / Heirs]

NOW THIS DEED WITNESSETH AS FOLLOWS:
1. PARTITION IN PRAESENTI:
In consideration of the mutual covenants herein contained, the Parties hereto hereby partition, divide, allot, grant, convey, and assign the Schedule Properties in severalty to the respective parties as absolute, independent owners.

2. ALLOTMENT OF PARCELS:
- Party 1 is hereby allotted Schedule A property exclusively.
- Party 2 is hereby allotted Schedule B property exclusively.

3. COVENANT OF REGISTRATION & STAMP DUTY:
The Parties covenant to present this Deed before the Sub-Registrar at [Location] for registration under Section 17(1)(b) of the Registration Act, 1908, and have paid appropriate stamp duty under the [State] Stamp Act.

IN WITNESS WHEREOF...`,
                        "operative"
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedState === "operative" ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Format 2</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-96">
{`FAMILY SETTLEMENT CUM PARTITION DEED (OPERATIVE INSTRUMENT)

THIS DEED OF FAMILY SETTLEMENT is executed on this [Day] day of [Month], [Year] at [City], by and between:
1. [Party 1 Details]
2. [Party 2 Details]

NOW THIS DEED WITNESSETH AS FOLLOWS:
1. OPERATIVE DIVISION IN PRAESENTI:
The Parties hereto hereby partition, divide, allot, convey, and release unto each other the properties described in Schedules 'A', 'B', and 'C' in severalty.

2. STAMP DUTY & REGISTRATION:
This deed is duly stamped in accordance with Article 45 of the Stamp Act and shall be presented for registration under Section 17(1)(b) of the Registration Act, 1908 before the Sub-Registrar.

3. INDEMNITY AGAINST ENCUMBRANCES:
Each party covenants that their allotted share is free from any individual charge or encumbrance created prior hereto.`}
                </pre>
              </div>
            </section>

            {/* SECTION 7: ESSENTIAL LEGAL CLAUSES */}
            <section id="essential-settlement-clauses" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>MANDATORY DRAFTING CLAUSES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Essential Clauses Every Family Settlement Must Have
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Whether you draft an oral memorandum or an operative deed, including these four protective
                clauses prevents future litigation and protects family titles:
              </p>

              <div className="space-y-4">
                {/* Clause 1: Estoppel Clause */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-sm">
                      1. Doctrine of Estoppel &amp; Covenant Against Future Litigation
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Subraya M.N. Rule
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <em>&ldquo;Each Party hereby unconditionally covenants and agrees that having participated in
                    the family settlement and having taken benefit or possession thereunder, they and their legal
                    heirs shall be permanently estopped from filing any suit for partition, declaration, or
                    injunction to reopen the division.&rdquo;</em>
                  </p>
                </div>

                {/* Clause 2: Owelty Equalization Clause */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-sm">
                      2. Monetary Equalization (Owelty Payment Clause)
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Owelty Doctrine
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <em>&ldquo;WHEREAS the physical parcel allotted to Party A is of higher circle rate value than
                    the parcel allotted to Party B, Party A has paid to Party B a sum of Rs. [Amount]/- as owelty
                    money to achieve mathematical and financial parity in satisfaction of Party B&rsquo;s share.&rdquo;</em>
                  </p>
                </div>

                {/* Clause 3: Antecedent Title Recital */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-sm">
                      3. Antecedent Title &amp; Pre-Existing Interest Recital
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                      Kale Test 4
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <em>&ldquo;WHEREAS the Parties herein are co-owners holding pre-existing undivided shares in
                    the properties as Class I legal heirs, and this instrument only reorganizes antecedent titles
                    rather than creating any new conveyance from strangers.&rdquo;</em>
                  </p>
                </div>

                {/* Clause 4: Revenue Mutation Authorization */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-sm">
                      4. Revenue Mutation &amp; Khata Transfer Power
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      Dakhil Kharij
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <em>&ldquo;Each Party is expressly authorized to present this instrument to the Tehsildar,
                    Panchayat, or Municipal Corporation to record independent mutation and Khata transfer
                    without requiring the physical presence of other parties.&rdquo;</em>
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: REGISTRATION & STAMP DUTY */}
            <section id="registration-stamp-duty-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>REGISTRATION &amp; STAMP LAWS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Section 17 Registration Act &amp; Stamp Duty Analysis
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The legal validity of a family settlement in court hinges upon Section 17 and Section 49 of
                  the Registration Act, 1908. Under Section 17(1)(b), any non-testamentary instrument that purports
                  to create, declare, assign, limit, or extinguish any right, title, or interest of the value of
                  one hundred rupees and upwards in immovable property must be compulsorily registered.
                </p>
                <p>
                  However, the Supreme Court has consistently held that a <strong>Memorandum of Past Oral
                  Settlement</strong> does not fall within Section 17(1)(b) because it merely records a
                  pre-existing factual status. In <em>Korukonda Chalapathi Rao (2021)</em>, the Supreme Court
                  reiterated that when a document does not itself create rights, Section 49 does not bar its
                  admission into evidence.
                </p>

                {/* State Stamp Duty Comparison Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <div className="font-extrabold text-slate-900">Maharashtra (Article 46)</div>
                    <div className="text-slate-600 mt-1">
                      Registered Partition: 2% of the market value of the separated share. Past Oral Memorandum:
                      Stamp duty on agreement under Article 5(h).
                    </div>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <div className="font-extrabold text-slate-900">Delhi (Article 45)</div>
                    <div className="text-slate-600 mt-1">
                      Registered Partition: 2% (women) or 3% (men) of separated shares. Memorandum: Fixed stamp
                      paper with notarization.
                    </div>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <div className="font-extrabold text-slate-900">Uttar Pradesh</div>
                    <div className="text-slate-600 mt-1">
                      Registered Partition: Concessional rates for co-heirs or 5% circle rate. Memorandum used
                      for Tehsildar mutation under Land Revenue Code.
                    </div>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <div className="font-extrabold text-slate-900">Karnataka (Article 39)</div>
                    <div className="text-slate-600 mt-1">
                      Partition Deed: Fixed slabs for family members or percentage for non-family. Past
                      memorandum recognized under customary Hindu Law.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: TAXATION RULES */}
            <section id="taxation-capital-gains-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Coins className="w-4 h-4" />
                <span>INCOME TAX EXEMPTIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Tax Impact: Section 47 Exemption &amp; Capital Gains
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A critical financial advantage of executing a family settlement agreement is its complete
                  neutrality under the Income Tax Act, 1961:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 pl-4 list-disc">
                  <li>
                    <strong>Zero Capital Gains on Settlement:</strong> Under Section 47(i) of the Income Tax
                    Act, any distribution of capital assets on the total or partial partition of a Hindu
                    Undivided Family (HUF) or a bona fide family settlement is not treated as a &ldquo;transfer&rdquo;.
                    No capital gains tax is payable when the agreement is signed.
                  </li>
                  <li>
                    <strong>No Gift Tax under Section 56(2)(x):</strong> Section 56(2)(x) exempts transfers
                    received from &ldquo;relatives&rdquo; (including siblings, parents, spouses, and lineal
                    descendants) or under inheritance. An amicable family arrangement attracts zero income tax.
                  </li>
                  <li>
                    <strong>Subsequent Sale Tax Computation:</strong> When an heir eventually sells their
                    allotted property to a third party, capital gains are calculated using{" "}
                    <strong>Section 49(1)</strong> cost to the previous owner, aggregating holding periods under
                    Section 2(42A).
                  </li>
                </ul>

                {/* Contextual Calculator Callout */}
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-extrabold text-rose-950">
                      Selling Inherited Property After Family Settlement?
                    </div>
                    <div className="text-rose-800 mt-0.5">
                      Calculate your post-settlement capital gains tax and compare 12.5% flat vs 20% indexation.
                    </div>
                  </div>
                  <Link
                    href="/tools/capital-gains-tax-calculator-inherited-property"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] text-white font-bold hover:bg-[#a33b5c] transition-colors shrink-0"
                  >
                    <span>Use Capital Gains Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 10: STEP-BY-STEP SOP */}
            <section id="step-by-step-execution-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>STEP-BY-STEP SOP</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Step-by-Step SOP: Execution to Revenue Mutation
              </h2>

              <div className="space-y-3">
                {[
                  {
                    step: "1",
                    title: "Asset Inventory & Title Verification",
                    desc: "Collate original title deeds, sale deeds of parents, property tax receipts, Khata extracts, and death certificates of deceased family owners.",
                  },
                  {
                    step: "2",
                    title: "Oral Deliberation & Physical Apportionment",
                    desc: "Convene with all Class I legal heirs and family elders. Agree on physical parcels, boundaries, and any cash owelty adjustments to equalize shares.",
                  },
                  {
                    step: "3",
                    title: "Drafting the Past-Tense Memorandum or Deed",
                    desc: "Draft the document using precise legal language. Ensure past-tense recitals for an oral settlement memorandum, or present-tense operative clauses for a partition deed.",
                  },
                  {
                    step: "4",
                    title: "Execution and Attestation",
                    desc: "Execute on required non-judicial stamp paper in the presence of two independent adult witnesses who are not beneficiaries of the partition.",
                  },
                  {
                    step: "5",
                    title: "Revenue Mutation (Dakhil Kharij / Khata Transfer)",
                    desc: "Submit the executed instrument along with joint affidavits to the municipal corporation or Tehsildar office to transfer property records into individual names.",
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

            {/* SECTION 11: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <TrendingUp className="w-4 h-4" />
                <span>PRACTICAL CASE STUDIES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Practical Case Studies: Real Family Asset Division
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Case Study 1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900">
                      Scenario A: Three Siblings Dividing Delhi House
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Delhi NCR
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Father left a 300 sq. yard house in Greater Kailash worth ₹6 Crore. The two brothers
                    occupied Ground and First floors; the sister resided in Bangalore. The brothers orally agreed
                    to take the floors and paid ₹2 Crore cash owelty to their sister.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Instrument Used:</span>
                      <span className="font-bold text-slate-900">Past Oral Memorandum + Owelty Recital</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Standard Partition Duty Saved:</span>
                      <span className="font-bold text-emerald-700">₹18,00,000 Saved!</span>
                    </div>
                    <div className="pt-1 text-slate-700 font-medium border-t border-slate-200">
                      Sister signed the estoppel clause; revenue records mutated smoothly in MCD.
                    </div>
                  </div>
                </div>

                {/* Case Study 2 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900">
                      Scenario B: Ancestral Agricultural Land in UP
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Uttar Pradesh
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Four cousins inherited 12 acres of farmland. They had already farmed separate physical parcels
                    for 7 years. They executed a Memorandum of Past Oral Settlement and submitted it before the
                    Revenue Court of the Sub-Divisional Magistrate (SDM).
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Legal Outcome:</span>
                      <span className="font-bold text-emerald-700">Mutual Khatauni Division under Sec 116</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Litigation Averted:</span>
                      <span className="font-bold text-slate-900">Zero Court Feud / Instant Revenue Record</span>
                    </div>
                    <div className="pt-1 text-slate-700 font-medium border-t border-slate-200">
                      SDM passed consensual decree under UP Revenue Code based on oral possession.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 12: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>INSTITUTIONAL PROFILE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Legal Backing &amp; Senior Advocate Review Bench
              </h2>
              <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">AMA Legal Solutions</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Senior Property Partition, Succession &amp; High Court Appellate Practice
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Property Bench</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is India&rsquo;s leading estate planning and succession technology platform,
                  powered by AMA Legal Solutions. Our property bench includes senior advocates practicing in
                  the Supreme Court of India, Delhi High Court, Bombay High Court, and regional revenue courts.
                  We specialize in challenge-proof family settlement agreements, HUF coparcenary partitions,
                  and estate dispute mediation pan-India.
                </p>

                {/* Service Grid Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/family-settlement-deed-lawyer"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Settlement Deed Lawyer</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/ancestral-vs-self-acquired-property-classifier"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Property Classifier</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/services/will-registration"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>SRO Registration Desk</span>
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
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Frequently Asked Questions: Family Settlement
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Answers to common legal questions regarding family settlement agreements, stamp duty, and
                oral memorandum validity in India:
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
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Statutory Citations &amp; Official Judicial Portals
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 text-xs text-slate-700 shadow-xs">
                <div>
                  <div className="font-extrabold text-slate-900 mb-1">
                    Governing Statutory Framework &amp; Key Sections:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      <strong>Registration Act, 1908:</strong> Section 17(1)(b) (compulsory registration of
                      non-testamentary instruments) &amp; Section 49 (admissibility for collateral purpose).
                    </li>
                    <li>
                      <strong>Indian Stamp Act, 1899:</strong> Article 45 (Instrument of Partition) vs Article
                      5 (Agreement or Memorandum of Agreement).
                    </li>
                    <li>
                      <strong>Income Tax Act, 1961:</strong> Section 47(i) (exclusion of partition distribution
                      from capital gains transfer) &amp; Section 49(1) (cost of acquisition).
                    </li>
                    <li>
                      <strong>Hindu Succession Act, 1956:</strong> Section 6 (coparcenary rights of daughters)
                      and Section 8 (general rules of succession).
                    </li>
                    <li>
                      <strong>Landmark Supreme Court Judgments:</strong> Kale v. Deputy Director of Consolidation
                      (1976), Tek Bahadur Bhujil v. Debi Singh Bhujil (1966), Subraya M.N. v. Vittala M.N.
                      (2016), and Korukonda Chalapathi Rao (2021).
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-3">
                  <a
                    href="https://www.sci.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>Supreme Court of India Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>India Code: Registration Act 1908</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Income Tax Section 47(i) Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Guides &amp; Succession Calculators
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/templates/will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Legal Will Format India
                    </Link>
                    <Link
                      href="/templates/release-deed-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Relinquishment Deed Format
                    </Link>
                    <Link
                      href="/tools/capital-gains-tax-calculator-inherited-property"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Inherited Capital Gains Calculator
                    </Link>
                    <Link
                      href="/tools/ancestral-vs-self-acquired-property-classifier"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Ancestral Property Classifier
                    </Link>
                    <Link
                      href="/services/family-settlement-deed-lawyer"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Family Settlement Deed Lawyer
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
                Specialist in ancestral partition litigation, High Court appellate practice, Section 17
                Registration Act compliance, and family dispute resolution across India.
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
                  <span>PREVENT FAMILY PARTITION FEUDS</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Children from Bitter Property Lawsuits
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A clearly drafted, legally registered Will eliminates ambiguity between siblings,
                  preventing painful partition litigation after your lifetime.
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
              {/* STRICT COMPLIANCE: NO MOBILE NUMBER ADDED */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Scale className="w-3 h-3" />
                  <span>DISPUTE RESOLUTION DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need an Advocate to Draft Your Family Settlement?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our senior succession and partition advocates structure custom settlement agreements,
                  draft past oral memorandums, and assist with revenue mutation across India.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Landmark className="w-3.5 h-3.5" />
                  <span>Consult Succession Advocate</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Families Trust WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Kale Precedent Precision:</strong> Formats tested against landmark Supreme Court
                      rulings.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Stamp Duty Optimization:</strong> Legally save lakhs in state partition stamp
                      fees.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Hidden Fees:</strong> Free downloadable legal drafts with lawyer review
                      options.
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
          href="#interactive-drafting-selector"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Select Format</span>
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
