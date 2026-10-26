"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
  Building,
  UserCheck,
  Clock,
  Sparkles,
  HelpCircle,
  AlertCircle,
  FileCheck,
  RefreshCw,
  Landmark,
  Gavel,
  X,
  FileSignature,
  Check,
  Copy,
  Printer,
  ShieldAlert,
  Sliders,
  DollarSign,
  ArrowUpRight,
  Eye,
  Info,
  Lock,
  PhoneCall,
  Users,
  HeartHandshake,
  Briefcase,
  Layers,
  Shield,
  EyeOff,
  Coins,
  Compass,
} from "lucide-react";

interface ComparisonRow {
  parameter: string;
  willIndia: string;
  familyTrust: string;
  verdict: "will" | "trust" | "tie";
  note: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    parameter: "Governing Law in India",
    willIndia: "Indian Succession Act, 1925 (Sections 2(h) & 63).",
    familyTrust: "Indian Trusts Act, 1882 (Sections 3 to 6).",
    verdict: "tie",
    note: "Both legal vehicles are fully recognized and enforced across Indian civil courts.",
  },
  {
    parameter: "When it Takes Effect",
    willIndia: "Only upon death of the testator. Zero effect while alive.",
    familyTrust: "Immediately upon execution or upon specified trigger events.",
    verdict: "trust",
    note: "Trusts can manage wealth during your lifetime, illness, or mental incapacity.",
  },
  {
    parameter: "Initial Setup Cost",
    willIndia: "Extremely low: ₹0 stamp duty nationwide. Plain paper execution valid.",
    familyTrust: "Substantial: State stamp duty on trust deed, registration, and legal structuring.",
    verdict: "will",
    note: "A Will costs 95% less to create than a private family trust.",
  },
  {
    parameter: "Annual Running Cost & Taxes",
    willIndia: "₹0 annual cost: No PAN card, no bank accounts, and no annual tax returns.",
    familyTrust: "Recurring: Separate PAN, bank account, book-keeping, audit, and annual ITR-5.",
    verdict: "will",
    note: "Wills require zero maintenance fees throughout your lifetime.",
  },
  {
    parameter: "Privacy & Confidentiality",
    willIndia: "Becomes public record during court probate (newspaper citations issued).",
    familyTrust: "100% Private: Confidential contract between settlor, trustees, and heirs.",
    verdict: "trust",
    note: "Trusts prevent nosy relatives or business competitors from seeing family wealth.",
  },
  {
    parameter: "Protection from Business Creditors",
    willIndia: "Zero protection: Personal assets remain vulnerable to debts, SARFAESI, or IBC.",
    familyTrust: "Strong shield: Irrevocable trust assets are isolated from future personal debts.",
    verdict: "trust",
    note: "Transfers must be made before debts arise to comply with Section 53 of the TPA.",
  },
  {
    parameter: "Staged & Conditional Payouts",
    willIndia: "Rigid: Assets pass outright in a single lump-sum upon probate and transmission.",
    familyTrust: "Highly flexible: Payouts can be tied to age (e.g. 25 or 30), marriage, or milestones.",
    verdict: "trust",
    note: "Trusts protect young or vulnerable heirs from squandering large fortunes.",
  },
  {
    parameter: "Minor & Special-Needs Heirs",
    willIndia: "Requires court-appointed guardian for minors; risk of guardian mismanagement.",
    familyTrust: "Dedicated trustees provide lifelong care, healthcare funds, and housing safety.",
    verdict: "trust",
    note: "Family trusts are the gold standard for children with physical or mental disabilities.",
  },
  {
    parameter: "Court Probate Requirement",
    willIndia: "Mandatory in Kolkata, Chennai, Mumbai, or if any legal heir contests.",
    familyTrust: "Completely exempt: Assets transfer smoothly without setting foot in a court.",
    verdict: "trust",
    note: "Trusts eliminate the 2 to 7 year delay typical of contested Indian probate cases.",
  },
  {
    parameter: "Ease of Changing or Revoking",
    willIndia: "Simple: Can be modified or replaced anytime on plain paper with two witnesses.",
    familyTrust: "Depends: Revocable trusts are easy to change; irrevocable trusts cannot be cancelled.",
    verdict: "will",
    note: "Section 62 of the Indian Succession Act allows testators to alter Wills freely.",
  },
  {
    parameter: "Income Tax Treatment",
    willIndia: "100% Tax-free transfer to beneficiaries under Section 56(2)(x) proviso.",
    familyTrust: "Determinate trusts taxed at slab rates; discretionary trusts taxed at MMR (up to ~39%).",
    verdict: "will",
    note: "Discretionary trusts can incur high tax rates unless drafted with specific exemptions.",
  },
];

const TOC_ITEMS = [
  { id: "executive-summary", label: "Executive Summary" },
  { id: "fundamental-concepts", label: "1. Core Legal Concepts" },
  { id: "comparison-matrix", label: "2. Will vs Trust Matrix" },
  { id: "when-will-is-sufficient", label: "3. When a Will is Enough" },
  { id: "when-trust-makes-sense", label: "4. When a Trust Makes Sense" },
  { id: "visual-breakdown", label: "5. Visual Comparison" },
  { id: "trust-classifications", label: "6. Trust Classifications" },
  { id: "taxation-framework", label: "7. Taxation Rules & MMR" },
  { id: "asset-protection", label: "8. Asset & Creditor Shield" },
  { id: "privacy-and-probate", label: "9. Privacy & Probate Reality" },
  { id: "hybrid-strategy", label: "10. Pour-Over Will Strategy" },
  { id: "interactive-decision-tool", label: "11. Estate Strategy Selector" },
  { id: "frequently-asked-questions", label: "12. Questions People Often Ask" },
];

const FAQS = [
  {
    q: "What is the main difference between a Will and a family trust in India?",
    a: "A Will is a testamentary document that takes effect only after your death and can be revoked or changed anytime during your life. In contrast, a private family trust is a legal arrangement created under the Indian Trusts Act, 1882, where you transfer assets to trustees during your lifetime or upon death to manage for beneficiaries according to specific rules, staged milestones, and conditions.",
  },
  {
    q: "When is a simple Will enough for an Indian family?",
    a: "A Will is 100% sufficient for most Indian families where total estate value is below ₹5 Crores, assets are straightforward (such as a family home, bank deposits, mutual funds, and insurance), family relationships are harmonious, and adult children receive outright shares. It costs virtually nothing to maintain and avoids complex trust compliance.",
  },
  {
    q: "When does creating a private family trust make sense?",
    a: "A family trust makes sense for High Net Worth Individuals (HNIs with assets of ₹5 Crores or more), business owners planning corporate succession, families with minor children or special needs dependents requiring lifetime financial care, blended families with children from previous marriages, or individuals seeking complete privacy to avoid public court probate.",
  },
  {
    q: "Does a family trust bypass probate in Mumbai, Chennai, or Kolkata?",
    a: "Yes. While Section 213 of the Indian Succession Act makes probate mandatory for Wills of Hindus, Buddhists, Sikhs, and Jains executed in or covering immovable property within Mumbai, Chennai, or Kolkata, a private living trust bypasses probate completely. Trust assets pass directly to beneficiaries or remain under trustee management without any court proceedings or public scrutiny.",
  },
  {
    q: "Is a private family trust completely private in India?",
    a: "Yes. A private family trust is a confidential legal agreement between the settlor and the trustees. Unlike a Will that becomes a matter of public court record once a probate petition is filed with newspaper notices, a trust deed and its asset distributions remain private and confidential among the family members and trustees.",
  },
  {
    q: "How are private family trusts taxed in India?",
    a: "Under the Income Tax Act, 1961, trust taxation depends on its structure. A determinate (specific) trust where beneficiaries and their exact shares are named is taxed at the individual income slab rates of the beneficiaries (Section 161). A discretionary trust where trustees decide payouts is taxed at the Maximum Marginal Rate (MMR of approx. 39% or 42.74%) under Section 164, unless created under a Will exclusively for dependent relatives.",
  },
  {
    q: "Does a family trust protect my assets from creditors or insolvency?",
    a: "An irrevocable family trust provides strong asset protection against future business liabilities and personal creditors, provided the trust was settled legitimately before any debt arose. However, under Section 53 of the Transfer of Property Act, 1882, transfers made to defraud existing creditors can be set aside by courts. A revocable trust offers zero creditor protection because the settlor retains control.",
  },
  {
    q: "What is a Pour-Over Will and how does it work with a trust?",
    a: "A Pour-Over Will is a specialized Will designed to work alongside an existing living family trust. It acts as a legal safety net by directing that any assets left in your personal name at death that were not previously transferred into your family trust should automatically 'pour over' into the trust upon your demise to be distributed under the trust rules.",
  },
  {
    q: "How much does it cost to set up and maintain a family trust vs a Will?",
    a: "A Will has zero stamp duty across India and negligible maintenance costs (₹0 per year). A private family trust requires state stamp duty on the trust deed (ranging from nominal fixed duty to 2% to 5% depending on state and whether immovable property is settled), registration fees, obtaining a PAN card, opening a dedicated bank account, and recurring annual accounting, audit, and ITR-5 tax filing fees (typically ₹25,000 to ₹1,00,000+ annually).",
  },
  {
    q: "Can I change my mind after creating a family trust in India?",
    a: "If you create a Revocable Family Trust, you can alter, amend, or completely revoke the trust at any time under Section 77 and 78 of the Indian Trusts Act, 1882. However, if you create an Irrevocable Family Trust, you cannot cancel the trust or take back the assets without the consent of all beneficiaries, which is why irrevocable trusts require careful legal planning.",
  },
];

export default function WillVsFamilyTrustClient() {
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
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // State for Interactive Estate Decision Tool
  const [estateValue, setEstateValue] = useState<string>("below-1cr");
  const [familyProfile, setFamilyProfile] = useState<string>("adults-harmonious");
  const [assetNature, setAssetNature] = useState<string>("standard-liquid");
  const [primaryGoal, setPrimaryGoal] = useState<string>("low-cost");

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

  // Evaluation for Interactive Strategy Selector
  const computeRecommendation = () => {
    let trustScore = 0;
    if (estateValue === "5cr-25cr") trustScore += 3;
    if (estateValue === "above-25cr") trustScore += 4;
    if (familyProfile === "special-needs") trustScore += 4;
    if (familyProfile === "blended-risk") trustScore += 3;
    if (assetNature === "operating-business") trustScore += 3;
    if (assetNature === "nri-cross-border") trustScore += 2;
    if (primaryGoal === "privacy-no-probate") trustScore += 3;
    if (primaryGoal === "creditor-protection") trustScore += 4;
    if (primaryGoal === "staged-milestones") trustScore += 3;

    if (trustScore >= 5) {
      return {
        strategy: "Private Family Trust Strongly Recommended",
        color: "text-emerald-800 bg-emerald-50 border-emerald-300",
        badge: "High Control & Complete Privacy Required",
        summary:
          "Because your situation involves high estate value, minor or special-needs dependents, business interests, or the need for creditor protection and privacy, a Private Family Trust under the Indian Trusts Act 1882 is the optimal structure. It bypasses court probate completely and safeguards family wealth.",
        actionUrl: "https://www.willdrafting.in/contact",
        actionText: "Book HNI Trust Structuring with WillDrafting.in advocates",
        isExternal: true,
      };
    } else if (trustScore >= 3) {
      return {
        strategy: "Hybrid Strategy: Pour-Over Will + Family Trust",
        color: "text-blue-800 bg-blue-50 border-blue-300",
        badge: "Comprehensive Dual Protection",
        summary:
          "Your estate benefits from establishing a living private trust for core businesses or sensitive assets, combined with a Section 63 Pour-Over Will that captures any personal property acquired later. This gives you both privacy and complete legal closure.",
        actionUrl: "https://www.willdrafting.in/contact",
        actionText: "Consult AMA Estate Advocates on Hybrid Planning",
        isExternal: true,
      };
    } else {
      return {
        strategy: "Simple Section 63 Will is 100% Sufficient",
        color: "text-rose-800 bg-rose-50 border-rose-300",
        badge: "Best for 90%+ of Indian Households",
        summary:
          "For estates below ₹5 Crores with standard residential properties, bank deposits, and adult heirs, a simple Will executed under Section 63 of the Indian Succession Act is completely legally binding. It costs zero stamp duty and requires no expensive annual trust accounting.",
        actionUrl: "/start",
        actionText: "Draft Your Legally Valid Will in 15 Mins",
        isExternal: false,
      };
    }
  };

  const recommendation = computeRecommendation();

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
            <span>ESTATE PLANNING &bull; STATUTORY DECISION GUIDE</span>
          </div>

          {/* Single H1 Title (Strictly 30-65 chars, no em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6 drop-shadow-xs">
            Will vs Family Trust in India: Which is Right for You?
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            Understand when a simple Section 63 Will is 100% sufficient, when an HNI family trust under the Indian Trusts Act makes strategic sense, and how setup costs, privacy, and taxes compare.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/start"
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] text-white font-bold hover:bg-[#a13c5d] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-rose-950/20 cursor-pointer"
            >
              <span>Draft a Legally Valid Will Online</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#comparison-matrix"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all"
            >
              <span>View Head-to-Head Matrix</span>
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
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                15+ Years
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Estate &amp; Trust Law
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/10">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                ₹1,500Cr+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Family Assets Protected
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/10">
              <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight leading-none whitespace-nowrap">
                10,000+
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Wills &amp; Trusts Executed
              </span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 md:border-l md:border-[#172228]/10">
              <div className="flex items-center justify-center gap-1.5 leading-none">
                <span className="text-xl min-[400px]:text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#172228] tracking-tight">
                  4.9
                </span>
                <span className="text-amber-500 text-lg sm:text-xl">★</span>
              </div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#55636D] mt-2">
                Rated by Indian Families
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Editorial Layout)
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_280px] xl:grid-cols-[260px_minmax(0,1fr)_300px] 2xl:grid-cols-[280px_minmax(0,1fr)_320px] gap-6 xl:gap-8 items-start">
          {/* =====================================================================
              LEFT COLUMN: STICKY TABLE OF CONTENTS
              ===================================================================== */}
          <aside className="sticky top-6 hidden lg:block">
            <div className="bg-white rounded-2xl border border-[#172228]/10 shadow-xs p-5">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#172228]/10">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#172228]">
                  Table of Contents
                </span>
              </div>

              <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block px-3 py-2 rounded-lg text-xs transition-colors leading-snug ${
                        isActive
                          ? "bg-rose-50 text-[#C65378] font-bold border-l-2 border-[#C65378]"
                          : "text-[#55636D] hover:bg-slate-50 hover:text-[#172228]"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>

              {/* Bottom Trust Badge */}
              <div className="mt-6 pt-4 border-t border-[#172228]/10">
                <div className="flex items-start gap-2 text-[#55636D]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    Verified under the Indian Trusts Act, 1882 &amp; Indian Succession Act, 1925.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN EDITORIAL CONTENT
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* ===================================================================
                SECTION 0: EXECUTIVE SUMMARY BOX
                =================================================================== */}
            <section
              id="executive-summary"
              className="rounded-2xl bg-white border border-[#172228]/10 border-l-4 border-l-[#C65378] p-6 sm:p-8 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Executive Brief &bull; Estate Planning Decision
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172228] mb-4">
                Executive Summary: Core Differences at a Glance
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
                Choosing between a Will and a Private Family Trust is one of the most significant wealth decisions an Indian family can make. Here is the distilled legal truth to guide your estate planning:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-[#172228] block">
                      A Will is Enough for 90%+ of Families
                    </strong>
                    <span className="text-xs text-slate-600 leading-relaxed">
                      For estates below ₹5 Crores with standard assets and adult heirs, a simple Section 63 Will costs ₹0 stamp duty and requires zero annual maintenance.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-[#172228] block">
                      Trusts Offer Complete Privacy
                    </strong>
                    <span className="text-xs text-slate-600 leading-relaxed">
                      Wills can become public court records during probate. A private family trust is a confidential contract with zero public filings or court proceedings.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-[#172228] block">
                      Trusts Enable Staged Payouts
                    </strong>
                    <span className="text-xs text-slate-600 leading-relaxed">
                      A Will distributes property outright. A trust lets you release funds at milestones, such as age 25 or 30, protecting young heirs from rash spending.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F0] border border-[#172228]/5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-[#172228] block">
                      Asset Protection Requires Irrevocability
                    </strong>
                    <span className="text-xs text-slate-600 leading-relaxed">
                      A Will gives zero protection against business creditors. Only an irrevocable trust established before debt arose isolates wealth under Section 53 of the TPA.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 1: FUNDAMENTAL CONCEPTS
                =================================================================== */}
            <section id="fundamental-concepts" className="space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Statutory Definitions
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                1. Fundamental Concepts: Understanding Wills and Trusts
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Before comparing costs and tax benefits, we must understand the core legal difference between these two instruments. Indian succession law treats them in fundamentally distinct ways.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                {/* Will Card */}
                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <div className="flex items-center gap-2 mb-3 text-[#C65378]">
                    <FileSignature className="w-5 h-5" />
                    <h3 className="text-base font-bold text-[#172228]">What is a Will in India?</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
                    Under Section 2(h) of the Indian Succession Act, 1925, a Will is a legal declaration of your intention regarding your property after your death. It is an <em>ambulatory instrument</em>, which means it has zero legal force while you are alive.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
                    You remain the 100% absolute owner of your assets until your last breath. You can sell, mortgage, gift, or rewrite your Will whenever you wish under Section 62. The Will only springs to life once death is legally proven.
                  </p>
                  <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/5 text-xs text-[#55636D]">
                    <strong>Statutory rule:</strong> Requires physical signature and attestation by two independent witnesses under Section 63. No stamp duty is required.
                  </div>
                </div>

                {/* Trust Card */}
                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <div className="flex items-center gap-2 mb-3 text-[#5F7E75]">
                    <Building className="w-5 h-5" />
                    <h3 className="text-base font-bold text-[#172228]">What is a Private Family Trust?</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
                    Under Section 3 of the Indian Trusts Act, 1882, a private trust is an obligation annexed to the ownership of property. You (the <em>Settlor</em>) transfer property to trusted managers (the <em>Trustees</em>) to hold and manage for the benefit of chosen family members (the <em>Beneficiaries</em>).
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
                    Unlike a Will, a family trust can take effect immediately during your lifetime (a <em>Living Trust</em>). Legal title separates from beneficial enjoyment, allowing you to establish continuous rules that survive your death.
                  </p>
                  <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/5 text-xs text-[#55636D]">
                    <strong>Statutory rule:</strong> Trusts holding real estate must be registered under Section 5 of the Indian Trusts Act and Section 17 of the Registration Act.
                  </div>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 2: COMPARISON MATRIX
                =================================================================== */}
            <section id="comparison-matrix" className="space-y-4">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Comparative Matrix
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                2. Head-to-Head Comparison: Will vs Private Family Trust
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                To evaluate which instrument fits your family wealth goals, examine this detailed side-by-side comparison across eleven crucial parameters:
              </p>

              {/* Responsive Table */}
              <div className="overflow-x-auto rounded-2xl border border-[#172228]/10 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3.5 sm:p-4 font-bold text-xs uppercase tracking-wider border-r border-white/10 w-1/4">
                        Parameter
                      </th>
                      <th className="p-3.5 sm:p-4 font-bold text-xs uppercase tracking-wider border-r border-white/10 w-1/3">
                        Will in India
                      </th>
                      <th className="p-3.5 sm:p-4 font-bold text-xs uppercase tracking-wider w-1/3">
                        Private Family Trust
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#172228]/10 text-slate-700">
                    {COMPARISON_DATA.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-[#FAF7F0]/40" : "bg-white"}>
                        <td className="p-3.5 sm:p-4 font-semibold text-[#172228] border-r border-[#172228]/10">
                          {row.parameter}
                          <span className="block text-[11px] text-[#55636D] font-normal mt-0.5">
                            {row.note}
                          </span>
                        </td>
                        <td className="p-3.5 sm:p-4 border-r border-[#172228]/10 align-top">
                          <span className="leading-relaxed">{row.willIndia}</span>
                        </td>
                        <td className="p-3.5 sm:p-4 align-top">
                          <span className="leading-relaxed font-medium text-[#172228]">
                            {row.familyTrust}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  <strong>The Core Trade-off:</strong> A Will delivers simplicity, lowest cost, and complete flexibility during your life. A Private Family Trust delivers ironclad confidentiality, protection against probate battles, and multi-generational control, but requires upfront stamp duty and ongoing accounting.
                </p>
              </div>
            </section>

            {/* ===================================================================
                SECTION 3: WHEN A WILL IS SUFFICIENT
                =================================================================== */}
            <section id="when-will-is-sufficient" className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-black uppercase tracking-wider text-emerald-700">
                  Practical Guidance
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                3. When a Will is 100% Sufficient for Most Indian Families
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Despite marketing from corporate wealth managers pushing high-fee family trusts, the statistical reality is that more than 90% of Indian households only need a well-drafted Will. Here is why:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs">
                  <h3 className="font-bold text-sm text-[#172228] mb-1.5 flex items-center gap-2">
                    <Coins className="w-4 h-4 text-[#C65378]" />
                    Estates Valued Under ₹5 Crores
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Setting up a trust involves legal fees of ₹50,000 to ₹3,00,000, plus recurring annual audit charges of ₹25,000+. For a modest estate, these expenses eat up hard-earned family savings without providing proportional benefit.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs">
                  <h3 className="font-bold text-sm text-[#172228] mb-1.5 flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4 text-[#5F7E75]" />
                    Harmonious Family Dynamics
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If your children maintain cordial relationships and you are dividing property equally or amicably, there is minimal litigation risk. A registered or witnessed Will easily settles the estate upon death.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs">
                  <h3 className="font-bold text-sm text-[#172228] mb-1.5 flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C65378]" />
                    Mature, Financially Independent Heirs
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If your children are adults in stable careers, you do not need trustees micromanaging their allowances. A one-time outright inheritance via a Will gives them direct ownership with zero bureaucracy.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#172228]/10 shadow-xs">
                  <h3 className="font-bold text-sm text-[#172228] mb-1.5 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#5F7E75]" />
                    Desire for Complete Lifetime Freedom
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Once assets are transferred into an irrevocable trust, you surrender ownership. With a Will, you retain absolute title to buy, sell, or mortgage your home at any time without asking permission from trustees.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#172228]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-[#172228]">Do You Fall in This Category?</h4>
                  <p className="text-xs text-slate-600">
                    Draft a legally binding Section 63 Will online in 15 minutes with our guided wizard.
                  </p>
                </div>
                <a
                  href="/start"
                  onClick={handleStartDraft}
                  className="shrink-0 px-5 py-2.5 rounded-full bg-[#C65378] text-white font-bold text-xs hover:bg-[#a13c5d] transition-colors cursor-pointer"
                >
                  Start Your Will Now
                </a>
              </div>
            </section>

            {/* ===================================================================
                SECTION 4: WHEN A TRUST MAKES SENSE
                =================================================================== */}
            <section id="when-trust-makes-sense" className="space-y-4">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Strategic Structuring
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                4. When a Private Family Trust Makes Strategic Sense
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                While a Will handles straightforward bequests, certain complex family situations and substantial net worth brackets demand the structural protections of a Private Family Trust:
              </p>

              <div className="space-y-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-[#172228] mb-1">
                      Minor Children or Special-Needs Dependents
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      If both parents pass away, leaving assets to minor children in a Will requires legal guardianship proceedings under the Guardians and Wards Act, 1890. For children with physical or cognitive disabilities, a Will leaves them vulnerable to predatory relatives. A Private Trust appoints corporate or trusted family trustees to manage monthly allowances, medical bills, and housing without court interference.
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-[#172228] mb-1">
                      Family Business Succession &amp; Voting Control
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Dividing shares in an operating private limited company among three children via a Will often causes boardroom deadlocks and destroys enterprise value. Placing operating equity into a Family Trust keeps shareholding unified under chosen managing trustees while distributing dividend income equally among heirs.
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-[#172228] mb-1">
                      Blended Families and Remarriage Concerns
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      In second marriages, testators frequently worry that if they leave everything to their surviving spouse in a Will, the spouse might later write a new Will disinheriting the children from the first marriage. A trust solves this by granting the spouse a lifetime right to income or residence, while legally guaranteeing that the principal property automatically devolves to biological children upon the spouse&apos;s death.
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <EyeOff className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-[#172228] mb-1">
                      High Net Worth (₹5 Cr+) Seeking Absolute Privacy
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Prominent industrialists, celebrities, and HNI families often want to keep their wealth, corporate stakes, and family agreements private. In mandatory probate jurisdictions like Mumbai, probate proceedings require public newspaper advertisements and court filings. A trust completely bypasses court probate, keeping your family&apos;s net worth 100% confidential.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 5: VISUAL BREAKDOWN (Uploaded Graphic Analysis)
                =================================================================== */}
            <section id="visual-breakdown" className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Visual Architecture
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                5. Visual Comparison: Will vs Family Trust Breakdown
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                This diagram illustrates the core dichotomy between a straightforward testamentary Will and a private family trust:
              </p>

              {/* Graphic Display Card */}
              <div className="rounded-2xl border border-[#172228]/10 bg-white overflow-hidden shadow-md">
                <div className="relative aspect-video w-full bg-[#172228]/5">
                  <Image
                    src="/images/will-vs-family-trust-india.jpg"
                    alt="Will vs Family Trust in India: Simple & Straightforward vs Greater Control & Privacy"
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-contain p-2 sm:p-4"
                    priority
                  />
                </div>
                <div className="p-4 sm:p-5 bg-gradient-to-r from-[#FAF7F0] via-white to-[#FAF7F0] border-t border-[#172228]/10 text-xs sm:text-sm text-[#55636D]">
                  <strong className="text-[#172228]">Figure 1:</strong> The Strategic Spectrum in Indian Estate Planning. A Will offers simplicity and lowest cost, whereas a Family Trust offers privacy, granular control, and asset shielding.
                </div>
              </div>

              {/* Breakdown Cards for the 6 Graphic Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Left 3 Pillars: Will */}
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-3">
                  <span className="inline-block text-[11px] font-black uppercase tracking-wider text-amber-900 bg-amber-200/50 px-2.5 py-0.5 rounded-md">
                    Will: Simple &amp; Straightforward
                  </span>

                  <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#172228] block">Easier to Create</strong>
                        Can be drafted on plain A4 paper, signed before two adult witnesses, and executed at home without government bureaucracy.
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#172228] block">Lower Cost</strong>
                        Exempt from stamp duty nationwide under the Indian Stamp Act, 1899. Zero annual accounting or tax filing fees.
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#172228] block">Becomes Public After Probate</strong>
                        If probate is required in Mumbai, Chennai, or Kolkata, or if challenged in court, citations become public judicial records.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right 3 Pillars: Family Trust */}
                <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
                  <span className="inline-block text-[11px] font-black uppercase tracking-wider text-emerald-900 bg-emerald-200/50 px-2.5 py-0.5 rounded-md">
                    Family Trust: Greater Control &amp; Privacy
                  </span>

                  <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#172228] block">Stays Private</strong>
                        A confidential contract under the Indian Trusts Act, 1882. Zero public court filings, newspaper notices, or probate registry listings.
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#172228] block">More Control</strong>
                        Enables milestone-based payouts (e.g. at ages 25 or 30), conditional allowances, and multi-generational business governance.
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#172228] block">Better Asset Protection</strong>
                        When structured as an irrevocable trust, assets are legally separated from the settlor, shielding wealth from future business debts.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 6: TRUST CLASSIFICATIONS
                =================================================================== */}
            <section id="trust-classifications" className="space-y-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Legal Structures
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                6. Trust Classifications: Revocable vs Irrevocable
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                If you decide that a Private Family Trust is appropriate for your family, you must choose its structural classification under the Indian Trusts Act, 1882. There are two primary dividing lines:
              </p>

              {/* 2x2 Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-wider mb-2">
                    Revocability Spectrum
                  </span>
                  <h3 className="font-bold text-base text-[#172228] mb-2">
                    Revocable Family Trust
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    In a revocable trust, the Settlor retains the legal right to amend, alter, or dissolve the trust at any point. You can reclaim trust property into your personal name whenever you wish.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Limitation:</strong> Because you retain control, the Income Tax Department treats the income as yours under Sections 61 to 63 of the Income Tax Act. Furthermore, it offers zero protection against personal bankruptcy or creditor attachments.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider mb-2">
                    Revocability Spectrum
                  </span>
                  <h3 className="font-bold text-base text-[#172228] mb-2">
                    Irrevocable Family Trust
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    In an irrevocable trust, the Settlor permanently parts with ownership and control of the settled assets. You cannot unilaterally cancel the trust or take back the property.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Advantage:</strong> Because the property no longer belongs to you, it provides strong asset protection against future business debts, guarantees, and insolvency proceedings, assuming the trust was created before debts arose.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-black uppercase tracking-wider mb-2">
                    Distribution Spectrum
                  </span>
                  <h3 className="font-bold text-base text-[#172228] mb-2">
                    Determinate (Specific) Trust
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    In a determinate trust, the trust deed explicitly names the beneficiaries and fixes their exact percentage entitlements (e.g. 50% to Son, 50% to Daughter). The trustees have zero discretion to change shares.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Tax Benefit:</strong> Under Section 161, trust income is taxed in the hands of the trustees as representative assessees at the beneficiaries&apos; individual personal tax slab rates, avoiding penal tax brackets.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-wider mb-2">
                    Distribution Spectrum
                  </span>
                  <h3 className="font-bold text-base text-[#172228] mb-2">
                    Discretionary Family Trust
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    In a discretionary trust, the trustees have complete freedom to decide when, how much, and to which beneficiary funds are distributed, based on emerging life events, medical emergencies, or education needs.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Tax Penalty:</strong> Under Section 164 of the Income Tax Act, discretionary trusts are taxed at the Maximum Marginal Rate (MMR of ~39% or 42.74%), making them tax-inefficient unless specific statutory exceptions apply.
                  </p>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 7: TAXATION FRAMEWORK
                =================================================================== */}
            <section id="taxation-framework" className="space-y-4">
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Taxation Architecture
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                7. Taxation Framework: Income Tax Act Sections 161 &amp; 164
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Tax planning is a decisive factor in choosing between a Will and a Family Trust. India currently has zero inheritance tax or estate duty, but income tax rules apply differently to each structure:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-[#172228]/10 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[650px]">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3.5 sm:p-4 font-bold text-xs uppercase tracking-wider border-r border-white/10 w-1/3">
                        Tax Dimension
                      </th>
                      <th className="p-3.5 sm:p-4 font-bold text-xs uppercase tracking-wider border-r border-white/10 w-1/3">
                        Will Transfer
                      </th>
                      <th className="p-3.5 sm:p-4 font-bold text-xs uppercase tracking-wider w-1/3">
                        Family Trust
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#172228]/10 text-slate-700">
                    <tr className="bg-white">
                      <td className="p-3.5 sm:p-4 font-semibold text-[#172228] border-r border-[#172228]/10">
                        Transfer of Assets (Gift Tax)
                      </td>
                      <td className="p-3.5 sm:p-4 border-r border-[#172228]/10">
                        100% Exempt under Section 56(2)(x) proviso. Inheriting property through a Will triggers ₹0 income tax.
                      </td>
                      <td className="p-3.5 sm:p-4 font-medium text-[#172228]">
                        Exempt only if trust is created solely for the benefit of relative beneficiaries as defined under Section 56(2)(x).
                      </td>
                    </tr>
                    <tr className="bg-[#FAF7F0]/40">
                      <td className="p-3.5 sm:p-4 font-semibold text-[#172228] border-r border-[#172228]/10">
                        Ongoing Income Tax Rate
                      </td>
                      <td className="p-3.5 sm:p-4 border-r border-[#172228]/10">
                        Zero trust income tax. Heirs pay normal personal income tax slabs on income earned from inherited assets.
                      </td>
                      <td className="p-3.5 sm:p-4 font-medium text-[#172228]">
                        Determinate trusts: Taxed at beneficiary individual slab rates (Sec 161). Discretionary trusts: Taxed at MMR (~39%-42.74%) under Sec 164.
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3.5 sm:p-4 font-semibold text-[#172228] border-r border-[#172228]/10">
                        Clubbing Provisions
                      </td>
                      <td className="p-3.5 sm:p-4 border-r border-[#172228]/10">
                        Not applicable. A Will only operates upon death, so lifetime clubbing rules never arise.
                      </td>
                      <td className="p-3.5 sm:p-4 font-medium text-[#172228]">
                        Applicable to Revocable Trusts under Sections 61-63. Income from assets is clubbed back with the Settlor.
                      </td>
                    </tr>
                    <tr className="bg-[#FAF7F0]/40">
                      <td className="p-3.5 sm:p-4 font-semibold text-[#172228] border-r border-[#172228]/10">
                        Capital Gains on Asset Transfer
                      </td>
                      <td className="p-3.5 sm:p-4 border-r border-[#172228]/10">
                        Section 47(iii) exempts transfers under a gift or Will from capital gains tax.
                      </td>
                      <td className="p-3.5 sm:p-4 font-medium text-[#172228]">
                        Settling property into an irrevocable trust for relatives is generally exempt under Section 47(iii), but requires precise deed drafting.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs sm:text-sm text-blue-900 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <p>
                  <strong>Tax Insight:</strong> If your primary goal is tax minimization and you have standard residential properties, a Will is vastly simpler and avoids the Maximum Marginal Rate trap that often catches carelessly drafted discretionary trusts.
                </p>
              </div>
            </section>

            {/* ===================================================================
                SECTION 8: ASSET PROTECTION
                =================================================================== */}
            <section id="asset-protection" className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Creditor Ring-Fencing
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                8. Asset Protection: Shielding Estates from Creditors
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                For promoters, business directors, startup founders, and professionals facing commercial risks, asset protection is paramount. Here is how Indian courts handle creditor claims against Wills and Trusts:
              </p>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <h3 className="font-extrabold text-base text-[#172228] mb-2 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-rose-600" />
                    A Will Provides Zero Creditor Protection
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    Because a Will only operates upon death, your assets remain in your personal name throughout your life. If your business defaults on bank loans, recovery tribunals (DRT) or insolvency courts (IBC 2016) can attach your properties, bank accounts, and shares under Section 60 of the Code of Civil Procedure.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Even after your death, Section 325 of the Indian Succession Act mandates that the executor must pay off all your debts and funeral expenses before distributing a single rupee to your beneficiaries. Your heirs only inherit what is left over.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <h3 className="font-extrabold text-base text-[#172228] mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    How an Irrevocable Trust Shields Wealth
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    When you settle assets into an Irrevocable Private Family Trust, legal title transfers permanently to the trustees. The assets no longer form part of your personal balance sheet. Consequently, future personal creditors, bank guarantees, or commercial litigants cannot attach trust assets.
                  </p>
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                    <strong>Critical Statutory Warning (Section 53, Transfer of Property Act, 1882):</strong> You cannot create a trust to hide assets from existing creditors. If a court finds that you transferred assets with the intention of defeating or delaying existing creditors, the transfer is voidable. To enjoy legal asset protection, the trust must be established well before commercial liabilities or bank claims arise.
                  </div>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 9: PRIVACY AND PROBATE
                =================================================================== */}
            <section id="privacy-and-probate" className="space-y-4">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Probate Reality Check
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                9. Privacy and Probate: Public Records vs Private Wealth
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Many families overlook the privacy implications of estate planning until it is too late. The difference between a public probate proceeding and private trust administration is profound:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <div className="flex items-center gap-2 mb-2 text-[#C65378]">
                    <Eye className="w-5 h-5" />
                    <h3 className="font-bold text-base text-[#172228]">The Will Probate Reality</h3>
                  </div>
                  <ul className="text-xs sm:text-sm text-slate-600 space-y-2.5">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">&bull;</span>
                      <span><strong>Mandatory Jurisdictions:</strong> Section 213 of the ISA requires probate for Hindu, Buddhist, Sikh, and Jain Wills executed in or covering immovable property in Mumbai, Chennai, or Kolkata.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">&bull;</span>
                      <span><strong>Public Court Notice:</strong> The court issues citations in local newspapers, inviting anyone to inspect the Will and raise objections.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">&bull;</span>
                      <span><strong>Public Document:</strong> Once probate is granted, the Will becomes a matter of public judicial record. Distant relatives, journalists, or business rivals can obtain certified copies.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">&bull;</span>
                      <span><strong>Time &amp; Court Fees:</strong> Uncontested probate takes 6 to 18 months; contested probate can take 3 to 7 years. State court fees range up to ₹75,000 or more.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <div className="flex items-center gap-2 mb-2 text-[#5F7E75]">
                    <EyeOff className="w-5 h-5" />
                    <h3 className="font-bold text-base text-[#172228]">The Family Trust Advantage</h3>
                  </div>
                  <ul className="text-xs sm:text-sm text-slate-600 space-y-2.5">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">&bull;</span>
                      <span><strong>Zero Probate Requirement:</strong> Trusts completely bypass the probate court. Property never gets stuck in judicial delays.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">&bull;</span>
                      <span><strong>Complete Privacy:</strong> The trust deed is a confidential private contract. There are no newspaper notices or public disclosure of family wealth.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">&bull;</span>
                      <span><strong>Immediate Continuity:</strong> If the Settlor becomes incapacitated or passes away, the successor trustees step in immediately without waiting for death certificates or court orders.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">&bull;</span>
                      <span><strong>No Interruption to Business:</strong> Operating companies held under a trust continue daily business without bank accounts being frozen during succession claims.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 10: HYBRID STRATEGY
                =================================================================== */}
            <section id="hybrid-strategy" className="space-y-4">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Advanced Solutions
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                10. Hybrid Strategy: Pour-Over Wills &amp; Testamentary Trusts
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                You do not necessarily have to choose exclusively between a Will and a Family Trust. Sophisticated Indian estate planners frequently combine both vehicles into a unified, leak-proof structure:
              </p>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <h3 className="font-extrabold text-base text-[#172228] mb-2 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#C65378]" />
                    The Pour-Over Will Solution
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    Even after settling a Living Family Trust, individuals frequently acquire new savings accounts, mutual fund folios, or inherit ancestral shares that were never transferred into the trust.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    A <strong>Pour-Over Will</strong> acts as a legal net. It states: <em>&ldquo;Any property standing in my personal name at the time of my death shall be given entirely to the trustees of my Family Trust, to be added to the trust principal and administered according to its terms.&rdquo;</em>
                  </p>
                  <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#172228]/5 text-xs text-[#55636D]">
                    This ensures zero assets fall into intestate succession, creating a unified estate plan.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#172228]/10 shadow-xs">
                  <h3 className="font-extrabold text-base text-[#172228] mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#5F7E75]" />
                    Testamentary Trust: The Budget Alternative
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    If you want trust protections for minor children or elderly parents, but do not want to pay annual accounting and audit fees while you are young and healthy, you can create a <strong>Testamentary Trust</strong> inside your Will.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Under Section 5 of the Indian Trusts Act, a trust can be created by a Will. The trust only springs into existence upon your death. During your lifetime, you pay ₹0 trust maintenance fees, while still securing milestone protections for your family when you pass away.
                  </p>
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 11: INTERACTIVE DECISION TOOL
                =================================================================== */}
            <section id="interactive-decision-tool" className="space-y-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Diagnostic Tool
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                11. Estate Strategy Selector: Interactive Decision Tool
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Answer four simple questions to receive an instant, objective legal recommendation tailored to your family&apos;s financial profile:
              </p>

              <div className="rounded-2xl border border-[#172228]/10 bg-white p-5 sm:p-7 shadow-xs space-y-6">
                {/* Question 1: Net Worth */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#172228] mb-2.5">
                    1. Approximate Total Net Worth (Real Estate + Financial Assets)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: "below-1cr", label: "Below ₹1 Crore" },
                      { id: "1cr-5cr", label: "₹1 Crore to ₹5 Crores" },
                      { id: "5cr-25cr", label: "₹5 Crores to ₹25 Crores+" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setEstateValue(opt.id)}
                        className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                          estateValue === opt.id
                            ? "border-[#C65378] bg-rose-50/50 text-[#C65378] font-bold"
                            : "border-slate-200 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 2: Family Profile */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#172228] mb-2.5">
                    2. Family &amp; Beneficiary Situation
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: "adults-harmonious", label: "Adult heirs, harmonious relationships" },
                      { id: "special-needs", label: "Minor children or special needs dependent" },
                      { id: "blended-risk", label: "Blended family, remarriage, or dispute risk" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFamilyProfile(opt.id)}
                        className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                          familyProfile === opt.id
                            ? "border-[#C65378] bg-rose-50/50 text-[#C65378] font-bold"
                            : "border-slate-200 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 3: Asset Nature */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#172228] mb-2.5">
                    3. Nature of Primary Assets
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: "standard-liquid", label: "Residential home, bank FDs, demat shares" },
                      { id: "operating-business", label: "Operating family business or private shares" },
                      { id: "nri-cross-border", label: "Cross-border / NRI multi-jurisdiction assets" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setAssetNature(opt.id)}
                        className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                          assetNature === opt.id
                            ? "border-[#C65378] bg-rose-50/50 text-[#C65378] font-bold"
                            : "border-slate-200 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 4: Primary Goal */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#172228] mb-2.5">
                    4. Most Critical Planning Priority
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: "low-cost", label: "Lowest cost & simplest execution" },
                      { id: "privacy-no-probate", label: "Total privacy & avoiding court probate" },
                      { id: "creditor-protection", label: "Business creditor & insolvency shielding" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPrimaryGoal(opt.id)}
                        className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                          primaryGoal === opt.id
                            ? "border-[#C65378] bg-rose-50/50 text-[#C65378] font-bold"
                            : "border-slate-200 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Output Card */}
                <div className={`p-5 sm:p-6 rounded-2xl border ${recommendation.color}`}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/70">
                      {recommendation.badge}
                    </span>
                    <span className="text-xs font-bold">Calculated Strategy</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold mb-2">
                    {recommendation.strategy}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed mb-4">
                    {recommendation.summary}
                  </p>
                  {recommendation.isExternal ? (
                    <a
                      href={recommendation.actionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#172228] text-white text-xs font-bold hover:bg-[#C65378] transition-colors cursor-pointer"
                    >
                      <span>{recommendation.actionText}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <a
                      href={recommendation.actionUrl}
                      onClick={handleStartDraft}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#172228] text-white text-xs font-bold hover:bg-[#C65378] transition-colors cursor-pointer"
                    >
                      <span>{recommendation.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </section>

            {/* ===================================================================
                SECTION 12: FREQUENTLY ASKED QUESTIONS
                =================================================================== */}
            <section id="frequently-asked-questions" className="space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C65378]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#C65378]">
                  Got Questions?
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#172228] tracking-tight">
                12. Frequently Asked Questions: Will vs Family Trust
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Clear, straightforward answers to the most common questions regarding Wills, Private Family Trusts, and Indian succession planning:
              </p>

              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-[#172228]/10 bg-white overflow-hidden shadow-xs transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#172228] hover:text-[#C65378] transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 text-[#55636D] transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-[#172228]/5 pt-3">
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
              RIGHT COLUMN: STICKY AUTHOR / TRUST / CTA CARDS
              ===================================================================== */}
          <aside className="sticky top-6 space-y-5">
            {/* Card 1: Author Bio Card */}
            <div className="rounded-2xl bg-white border border-[#172228]/10 p-5 shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-[#172228] text-white font-extrabold flex items-center justify-center text-sm">
                  AAM
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#172228]">
                    <a
                      href="https://www.linkedin.com/in/iamanujmalik/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#C65378] transition-colors"
                    >
                      Advocate Anuj Anand Malik
                    </a>
                  </h4>
                  <p className="text-[11px] text-[#C65378] font-bold">
                    Senior Succession &amp; Trust Counsel
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Advocate specializing in testamentary succession, private family trusts, and cross-border NRI estate governance under the Indian Trusts Act and Succession Act.
              </p>
              <div className="pt-2 border-t border-[#172228]/5 flex items-center justify-between text-[11px] text-[#55636D]">
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Bar Verified
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
{/* Card 3: Free 15-Minute DIY Will Card */}
            <div className="hidden lg:block rounded-2xl bg-white border border-[#172228]/10 p-5 shadow-xs">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 text-[#C65378] text-[10px] font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                <span>Instant DIY Will</span>
              </div>
              <h3 className="text-sm font-extrabold text-[#172228] mb-1.5">
                Draft a Valid Will in 15 Minutes
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                For most Indian families, a Will provides 100% legal protection without any ongoing trust maintenance fees.
              </p>
              <a
                href="/start"
                onClick={handleStartDraft}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a13c5d] text-white font-bold text-xs transition-colors cursor-pointer"
              >
                <span>Draft Your Will Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Card 4: Trust & Estate Benefits Checklist */}
            <div className="hidden lg:block rounded-2xl bg-white border border-[#172228]/10 p-5 shadow-xs">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#172228] mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Why Plan Your Estate Early</span>
              </h4>
              <ul className="text-xs text-slate-600 space-y-2.5">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Family Disputes:</strong> Eliminates painful partition suits among legal heirs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Protect Minor Children:</strong> Designate trusted guardians and financial managers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Bypass Bank Freezes:</strong> Direct nominations and bequests unlock FDs and demat shares.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Peace of Mind:</strong> Guarantee that your lifelong savings reach your chosen family.</span>
                </li>
              </ul>
            </div>

            {/* Card 5: Related Guides List */}
            <div className="hidden lg:block rounded-2xl bg-white border border-[#172228]/10 p-5 shadow-xs">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#172228] mb-3 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#C65378]" />
                <span>Related Legal Guides</span>
              </h4>
              <div className="space-y-2 text-xs">
                <Link
                  href="/blogs/gift-deed-vs-will-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all font-semibold text-[#172228]"
                >
                  Gift Deed vs Will Which is Better in India
                  <span className="block text-[10px] text-[#55636D] font-normal mt-0.5">
                    Stamp duty, Section 56(2)(x) &amp; revocability &rarr;
                  </span>
                </Link>
                <Link
                  href="/blogs/notarized-will-vs-registered-will-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all font-semibold text-[#172228]"
                >
                  Is a Notarized Will Valid in India?
                  <span className="block text-[10px] text-[#55636D] font-normal mt-0.5">
                    Section 63 witness rules vs SRO registration &rarr;
                  </span>
                </Link>
                <Link
                  href="/templates/will-format-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all font-semibold text-[#172228]"
                >
                  Free Will Format India
                  <span className="block text-[10px] text-[#55636D] font-normal mt-0.5">
                    Clause-annotated printable template &rarr;
                  </span>
                </Link>
                <Link
                  href="/service/nri-will-india"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all font-semibold text-[#172228]"
                >
                  NRI Will Drafting &amp; Inheritance
                  <span className="block text-[10px] text-[#55636D] font-normal mt-0.5">
                    FEMA compliance &amp; Two-Will Strategy &rarr;
                  </span>
                </Link>
                <Link
                  href="/tools/succession-calculator"
                  className="block p-2.5 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all font-semibold text-[#172228]"
                >
                  Interactive Legal Succession Calculator
                  <span className="block text-[10px] text-[#55636D] font-normal mt-0.5">
                    HSA Section 8 &amp; 15 legal heir shares &rarr;
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
                  href="/templates/will-format-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Free Indian Will Format
                </Link>
                <Link
                  href="/blogs/notarized-will-vs-registered-will-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Notarized vs Registered Will
                </Link>
                <Link
                  href="/blogs/digital-assets-crypto-will-india"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Digital Assets & Crypto Will
                </Link>
                <Link
                  href="/service/will-registration"
                  className="text-[11px] px-3 py-1 rounded-lg bg-slate-100 text-[#172228] hover:bg-slate-200 transition-colors"
                >
                  Will Registration Service
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
