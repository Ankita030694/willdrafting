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
  BookOpen,
  Scale,
  Building2,
  Lock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Landmark,
  Check,
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
  Briefcase,
  Layers,
  Globe,
  Share2,
} from "lucide-react";

// Table of Contents Items (strictly <= 70 chars, 0 em-dashes)
const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Legal Rules: Business Succession" },
  { id: "interactive-simulator", label: "2. Deadlock Risk Diagnostic Tool" },
  { id: "corporate-matrix", label: "3. Corporate Succession Matrix" },
  { id: "family-constitution-framework", label: "4. Family Constitution Framework" },
  { id: "nclt-risk-mitigation", label: "5. NCLT Oppression Defense" },
  { id: "continuity-protocol", label: "6. Business Continuity Protocol" },
  { id: "synchronization-audit", label: "7. AoA & Will Synchronization Audit" },
  { id: "deadlock-escalation-mechanism", label: "8. Deadlock Escalation Mechanism" },
  { id: "copyable-clauses", label: "9. Lawyer-Vetted Succession Clauses" },
  { id: "statutory-citations", label: "10. Statutory Citations & Precedents" },
  { id: "consultation-retainer", label: "11. Corporate Retainer Packages" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
];

const FAQS = [
  {
    q: "Does a nominee of company shares become the absolute legal owner?",
    a: "No. A nominee under Section 72 of the Companies Act, 2013 is only a caretaker. In Shakti Yezdani (2023 SC), the Supreme Court settled this rule. Nominees hold shares in trust. Legal ownership goes to the heirs named in the promoter's Will.",
  },
  {
    q: "What happens if company articles (AoA) conflict with a founder's Will?",
    a: "Company rules come first for share transfers. Under Section 56 of the Companies Act, directors can reject a transfer if the Will breaks AoA terms. Founders must match their Will with the company AoA and SHA.",
  },
  {
    q: "Is a Family Constitution legally binding in Indian courts?",
    a: "A plain family constitution is a moral pact. But it becomes legally binding once you add its terms into the company AoA. You can also sign it as a filed family deal under the Registration Act.",
  },
  {
    q: "How can promoters prevent NCLT deadlocks upon sudden death?",
    a: "Promoters can stop Section 241-242 NCLT court fights with five simple steps. First, set clear board rules in your AoA. Second, add mandatory mediation before court filings. Third, set fixed share buyout prices. Fourth, use non-voting shares for non-working heirs. Fifth, add shotgun exit clauses.",
  },
  {
    q: "What happens to a partnership firm if a partner dies without a clause?",
    a: "Under Section 42(c) of the Indian Partnership Act, 1932, a firm ends when a partner dies. Banks freeze firm accounts at once. The business can only stay open if the deed has a clear continuity clause.",
  },
  {
    q: "What is the role of a Private Family Trust in business succession?",
    a: "A private trust holds company shares safely outside court probate. It protects your business assets from personal debt risks. It also skips long High Court probate delays of 2 to 5 years.",
  },
  {
    q: "How do you pay non-active family heirs without giving up control?",
    a: "You can separate equity profit from daily voting power. Non-working heirs get Class B dividend shares or family real estate. Active heirs keep voting shares and board seats.",
  },
  {
    q: "What is the retainer fee for business succession planning in India?",
    a: "For Indian SMEs, MSMEs, and family firms, legal retainers range from ₹1,00,000 to ₹5,00,000 or more. This fee covers company audits, AoA changes, Family Charters, buy-sell pacts, and matched Wills.",
  },
];

export default function CorporateSuccessionClient() {
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
  const [copiedTransmission, setCopiedTransmission] = useState<boolean>(false);
  const [copiedBuySell, setCopiedBuySell] = useState<boolean>(false);
  const [copiedCharter, setCopiedCharter] = useState<boolean>(false);
  const [copiedAudit, setCopiedAudit] = useState<boolean>(false);

  // ==========================================
  // INTERACTIVE CORPORATE DEADLOCK SIMULATOR
  // ==========================================
  const [entityType, setEntityType] = useState<"pvt_ltd" | "llp" | "partnership" | "proprietorship" | "huf">("pvt_ltd");
  const [promoterEquity, setPromoterEquity] = useState<number>(65);
  const [numHeirs, setNumHeirs] = useState<number>(3);
  const [hasCustomAoA, setHasCustomAoA] = useState<boolean>(false);
  const [hasSynchronizedWill, setHasSynchronizedWill] = useState<boolean>(false);
  const [hasFamilyConstitution, setHasFamilyConstitution] = useState<boolean>(false);
  const [hasBuySellSHA, setHasBuySellSHA] = useState<boolean>(false);

  // Compute Deadlock Risk Metrics
  const calculatedRisk = (() => {
    let score = 20;

    if (entityType === "proprietorship") score += 40;
    if (entityType === "partnership" && !hasCustomAoA) score += 35;
    if (entityType === "pvt_ltd" && !hasCustomAoA) score += 30;
    if (entityType === "llp" && !hasCustomAoA) score += 25;
    if (entityType === "huf") score += 30;

    if (numHeirs >= 3) score += 15;
    if (numHeirs >= 4) score += 10;

    if (promoterEquity >= 51 && promoterEquity < 75) score += 10;
    if (promoterEquity === 50) score += 25;

    if (hasCustomAoA) score -= 25;
    if (hasSynchronizedWill) score -= 25;
    if (hasFamilyConstitution) score -= 20;
    if (hasBuySellSHA) score -= 20;

    const clamped = Math.max(5, Math.min(98, score));

    let riskLevel = "Low Risk";
    let colorClass = "text-emerald-700 bg-emerald-50 border-emerald-200";
    let badgeText = "PROTECTED";
    let summary = "Your company rules show good legal controls. Your business is well guarded against sudden fights.";

    if (clamped >= 75) {
      riskLevel = "High Deadlock Risk";
      colorClass = "text-rose-700 bg-rose-50 border-rose-200";
      badgeText = "HIGH DANGER";
      summary = "High risk of frozen bank accounts, halted work, and NCLT court fights if the founder passes away.";
    } else if (clamped >= 50) {
      riskLevel = "Moderate Danger";
      colorClass = "text-amber-800 bg-amber-50 border-amber-200";
      badgeText = "VULNERABLE";
      summary = "Large gaps exist between your company papers and your Will. Second-generation heirs may fight over control.";
    } else if (clamped >= 30) {
      riskLevel = "Mild Vulnerability";
      colorClass = "text-blue-800 bg-blue-50 border-blue-200";
      badgeText = "NEEDS SYNC";
      summary = "You have some basic legal tools. But your Will and company papers do not fully match yet.";
    }

    return { score: clamped, riskLevel, colorClass, badgeText, summary };
  })();

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

  const copyTransmissionClause = () => {
    const text = `MODEL ARTICLES OF ASSOCIATION (AoA) SHARE TRANSMISSION CLAUSE
(Companies Act, 2013 s. 56 & Table F Modification)

Article [X]. SHARE TRANSFER ON FOUNDER DEMISE:
1. Upon the death of a Member holding shares, the Company shall recognize only the person named in a valid Will, or lawful heirs under personal law.
2. A nomination under Section 72 gives the nominee power only as a trustee for the legal heirs. The nominee holds shares for the heirs named in the Will.
3. Within 60 days of getting the Will copy and Death Certificate, the Board shall enter the heirs in the Register of Members.
4. Share transfer does not give any non-working heir an automatic right to a seat on the Board of Directors.`;

    navigator.clipboard.writeText(text);
    setCopiedTransmission(true);
    setTimeout(() => setCopiedTransmission(false), 3000);
  };

  const copyBuySellClause = () => {
    const text = `CROSS-PURCHASE BUY-SELL RESTRICTION & RIGHT OF FIRST REFUSAL (ROFR)
(Shareholders' Agreement & AoA Synchronized Provision)

Clause [Y]. SURVIVOR PURCHASE OPTION UPON DEMISE:
1. When a founder dies or falls ill, surviving partners have first right to buy the shares.
2. The buyout price must match the Fair Market Value (FMV) under Rule 11UA of the Income Tax Rules.
3. The firm may fund this buyout using Keyman life insurance held in an escrow account.
4. Surviving partners have 90 days to buy the shares. If they do not, heirs keep Class B dividend shares.`;

    navigator.clipboard.writeText(text);
    setCopiedBuySell(true);
    setTimeout(() => setCopiedBuySell(false), 3000);
  };

  const copyCharterClause = () => {
    const text = `FAMILY CONSTITUTION DISPUTE ESCALATION & OMBUDSMAN PROTOCOL
(Binding Governance Charter for Promoter Family Business)

Article [Z]. 4-STEP DISPUTE RESOLUTION LADDER:
Step 1: Family Council meets within 14 days of written notice to talk through issues.
Step 2: If unresolved in 30 days, an independent Family Elder or Ombudsman gives written guidance.
Step 3: If still unresolved, family branches go to conciliation before filing any court case.
Step 4: If a deadlock lasts 180 days, either branch can trigger a fair buyout offer to buy or sell out.`;

    navigator.clipboard.writeText(text);
    setCopiedCharter(true);
    setTimeout(() => setCopiedCharter(false), 3000);
  };

  const copyAuditChecklist = () => {
    const text = `FAMILY BUSINESS SUCCESSION & AOA SYNCHRONIZATION AUDIT CHECKLIST:
1. AoA Share Rules: Replace default Table F rules to stop board blocks on heir shares.
2. Section 72 Nominee Check: Match RoC share nominees with the heirs named in your Will.
3. Quorum Rules: Allow valid board meetings even if one director is ill or deceased.
4. Casting Vote: Name who gets the tie-breaking vote if founders disagree.
5. Keyman Insurance: Use insurance cash to buy out shares from non-working heirs.
6. Bank Mandates: Add multiple signers so banks never freeze company accounts.
7. Next-Gen Rules: Set clear work rules and degree benchmarks for kids joining the firm.
8. Non-Voting Shares: Give non-working family members Class B dividend shares.
9. Dispute Steps: Use matching 4-step dispute steps in your AoA and Family Charter.
10. SRO Registration: Register family property settlements with the Sub-Registrar.`;

    navigator.clipboard.writeText(text);
    setCopiedAudit(true);
    setTimeout(() => setCopiedAudit(false), 3000);
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
            <span>COMPANIES ACT, 2013 • SECTIONS 56, 72 &amp; 241-242 • LLP ACT 2008</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Business Succession Planning &amp; Family Constitution
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Expert legal counsel for Indian business founders, SMEs, and family firms.
            Match your personal Will with company articles (AoA). Draft clear Family Constitutions.
            Stop court fights and keep your company running smoothly when leadership changes.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Briefcase className="w-4 h-4" />
              <span>Consult Succession Lawyer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Founder Will</span>
            </button>
            <Link
              href="/templates/cross-purchase-buy-sell-agreement-format-india"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-colors"
            >
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span>Buy-Sell Agreement Draft</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 56 &amp; 72</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SHARE TRANSFER RULES
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 241-242</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                NCLT DEFENSE SHIELD
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Shakti Yezdani</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SUPREME COURT NOMINEE RULE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">5-Pillar Rules</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                FAMILY CHARTER FRAMEWORK
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
                <span>Corporate Law Office</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Companies Act 2013 ss. 56, 72, 241, 242; Partnership Act 1932 ss. 37, 42;
                LLP Act 2008 s. 24; and Supreme Court judgments.
              </p>
            </div>

            {/* Corporate Retainer Quick Box */}
            <div className="bg-[#FAF7F0] rounded-2xl border border-[#C65378]/20 p-4 text-xs space-y-2.5">
              <div className="font-extrabold text-[#172228] flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-[#C65378]" />
                <span>Succession Retainer</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Keep your company safe from next-gen disputes. Hire senior corporate advocates to review
                your articles, draft your Family Charter, and sync your Will.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-[11px] transition-colors"
              >
                <span>Book Legal Talk</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
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
                  src="/images/corporate-business-succession-family-constitution-og.jpg"
                  alt="Corporate Business Succession Planning and Family Constitution Legal Framework India"
                  width={1200}
                  height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 850px"
                />
              </div>
              <div className="p-3 text-center">
                <p className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center justify-center gap-2">
                  <Landmark className="w-4 h-4 text-[#C65378]" />
                  <span>Indian Corporate Succession &amp; Founder Equity Legal Shield</span>
                </p>
              </div>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (Single H2 per page strictly <= 70 chars) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Legal Rules: Business Succession &amp; Family Governance
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Most Indian businesses are family-owned firms. But fewer than one in seven have a written succession plan.
                  When a founder dies without papers, chaos follows. Sibling fights start quickly. Banks freeze cash accounts.
                  Vendors stop supplies.
                </p>
                <p>
                  Many founders make one big mistake. They write a personal Will but forget company rules. Or they assume that
                  an RoC share nominee owns the company. Both ideas are wrong in Indian law.
                </p>
                <p>
                  Under <strong>Section 56 of the Companies Act, 2013</strong>, company articles govern share transfers.
                  If your AoA has default Table F rules, the remaining board can block your heirs. Also, the Supreme Court ruled
                  in <strong>Shakti Yezdani v. Jayanand Salgaonkar (2023)</strong> that a nominee is just a trustee. A nominee does
                  not own the shares. True ownership goes only to the heirs in your Will.
                </p>
                <p>
                  Without a clear <strong>Family Constitution</strong> and a matched <strong>Buy-Sell Agreement</strong>,
                  disputes land in the National Company Law Tribunal (NCLT). Minorities file Section 241 cases. This locks
                  company funds and stalls work. Our corporate advocates help you avoid these traps.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE SIMULATOR */}
            <section id="interactive-simulator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>DIAGNOSTIC SIMULATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Corporate Deadlock &amp; NCLT Risk Diagnostic Tool
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Check how safe your business is from sudden leadership deadlocks, bank freezes, and court fights.
                Choose your business type and check your risk score.
              </p>

              {/* Calculator Panel */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 sm:p-7 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Entity Type Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block">
                      Business Entity Type
                    </label>
                    <select
                      value={entityType}
                      onChange={(e) => setEntityType(e.target.value as any)}
                      aria-label="Business Entity Type"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C65378]/30"
                    >
                      <option value="pvt_ltd">Private Limited Company (Companies Act 2013)</option>
                      <option value="llp">Limited Liability Partnership (LLP Act 2008)</option>
                      <option value="partnership">Partnership Firm (Partnership Act 1932)</option>
                      <option value="proprietorship">Sole Proprietorship Firm</option>
                      <option value="huf">Hindu Undivided Family (HUF) Business</option>
                    </select>
                  </div>

                  {/* Promoter Shareholding */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      <span>Founder Shareholding:</span>
                      <span className="text-[#C65378] font-black text-sm">{promoterEquity}%</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      step="5"
                      value={promoterEquity}
                      onChange={(e) => setPromoterEquity(Number(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>20% (Minority)</span>
                      <span>50% (Deadlock Risk)</span>
                      <span>75%+ (Super Majority)</span>
                    </div>
                  </div>

                  {/* Number of Second-Gen Heirs */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-extrabold uppercase tracking-wider text-slate-700">
                      <span>Number of Heirs or Family Branches:</span>
                      <span className="text-[#C65378] font-black text-sm">{numHeirs} Heirs</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="6"
                      step="1"
                      value={numHeirs}
                      onChange={(e) => setNumHeirs(Number(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                  </div>

                  {/* Legal Safeguards Checkboxes */}
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block">
                      Legal Papers Already in Place
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100">
                        <input
                          type="checkbox"
                          checked={hasCustomAoA}
                          onChange={(e) => setHasCustomAoA(e.target.checked)}
                          className="accent-[#C65378]"
                        />
                        <span className="font-semibold text-slate-800">Custom AoA Rules</span>
                      </label>
                      <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100">
                        <input
                          type="checkbox"
                          checked={hasSynchronizedWill}
                          onChange={(e) => setHasSynchronizedWill(e.target.checked)}
                          className="accent-[#C65378]"
                        />
                        <span className="font-semibold text-slate-800">Matched Will</span>
                      </label>
                      <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100">
                        <input
                          type="checkbox"
                          checked={hasFamilyConstitution}
                          onChange={(e) => setHasFamilyConstitution(e.target.checked)}
                          className="accent-[#C65378]"
                        />
                        <span className="font-semibold text-slate-800">Family Constitution</span>
                      </label>
                      <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100">
                        <input
                          type="checkbox"
                          checked={hasBuySellSHA}
                          onChange={(e) => setHasBuySellSHA(e.target.checked)}
                          className="accent-[#C65378]"
                        />
                        <span className="font-semibold text-slate-800">Buy-Sell Agreement</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Score Output Banner */}
                <div className={`rounded-2xl border p-5 ${calculatedRisk.colorClass} transition-all`}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      <span className="font-black text-base sm:text-lg">{calculatedRisk.riskLevel}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide bg-white/80 border border-current">
                      DEADLOCK INDEX: {calculatedRisk.score}/100 • {calculatedRisk.badgeText}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed opacity-90">{calculatedRisk.summary}</p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                  <div className="text-xs text-slate-500">
                    Need a full legal review of your company articles and agreements?
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#172228] hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                  >
                    <span>Request Legal Audit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 3: CORPORATE SUCCESSION MATRIX (Mandatory Component 1) */}
            <section id="corporate-matrix" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>STRUCTURE COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Corporate Succession Matrix Across Indian Business Entities
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every business format has its own statutory rules and death risks.
                The table below shows what happens when a founder dies and how to fix gaps.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                  <thead className="bg-[#172228] text-white text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Entity Type</th>
                      <th className="py-3 px-4">Key Statute</th>
                      <th className="py-3 px-4">What Happens on Death</th>
                      <th className="py-3 px-4">Bank Freeze Risk</th>
                      <th className="py-3 px-4">How to Protect</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3.5 px-4 font-bold text-slate-900">Private Limited Company</td>
                      <td className="py-3.5 px-4">Companies Act ss. 56, 72, 241</td>
                      <td className="py-3.5 px-4">Shares pass to heirs, but directorship is vacant. Deadlocks can stall votes.</td>
                      <td className="py-3.5 px-4 text-amber-700 font-bold">Medium (if signers exist)</td>
                      <td className="py-3.5 px-4">Matched Will + Custom AoA + Non-Voting Class B shares.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3.5 px-4 font-bold text-slate-900">Limited Liability Partnership (LLP)</td>
                      <td className="py-3.5 px-4">LLP Act 2008 s. 24</td>
                      <td className="py-3.5 px-4">Heir gets profit rights but is not a partner unless the agreement says so.</td>
                      <td className="py-3.5 px-4 text-amber-700 font-bold">Medium to High</td>
                      <td className="py-3.5 px-4">Amended LLP deed with heir entry terms.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3.5 px-4 font-bold text-slate-900">Partnership Firm</td>
                      <td className="py-3.5 px-4">Partnership Act 1932 s. 42(c)</td>
                      <td className="py-3.5 px-4 text-rose-700 font-bold">Firm ends at once by law unless the deed says it continues.</td>
                      <td className="py-3.5 px-4 text-rose-700 font-black">CRITICAL (Immediate freeze)</td>
                      <td className="py-3.5 px-4">Add a continuity clause or convert to a Pvt Ltd company.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3.5 px-4 font-bold text-slate-900">Sole Proprietorship</td>
                      <td className="py-3.5 px-4">Common Law Rules</td>
                      <td className="py-3.5 px-4 text-rose-700 font-bold">Business ends legally. GST and trade licenses expire.</td>
                      <td className="py-3.5 px-4 text-rose-700 font-black">CRITICAL (Immediate freeze)</td>
                      <td className="py-3.5 px-4">Convert to OPC or Pvt Ltd firm, or use a private trust.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3.5 px-4 font-bold text-slate-900">Hindu Undivided Family (HUF)</td>
                      <td className="py-3.5 px-4">Hindu Succession Act s. 6</td>
                      <td className="py-3.5 px-4">Next coparcener takes over as Karta. Coparceners can file court split suits.</td>
                      <td className="py-3.5 px-4 text-amber-700 font-bold">High (if heirs fight)</td>
                      <td className="py-3.5 px-4">Signed Family Settlement Deal with cash balancing.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: FAMILY CONSTITUTION FRAMEWORK (Mandatory Component 2) */}
            <section id="family-constitution-framework" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>GOVERNANCE CHARTER</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. The 5-Pillar Family Business Constitution Framework
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                A Family Constitution is a shared set of rules. It sets family values and business boundaries.
                Here are the five core pillars:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#172228]">
                    <span className="w-6 h-6 rounded-full bg-rose-50 text-[#C65378] flex items-center justify-center text-xs font-black">1</span>
                    <h4>Core Values &amp; Family Vision</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Writes down the founder&apos;s vision and work ethics. Family members agree to protect the firm across generations.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#172228]">
                    <span className="w-6 h-6 rounded-full bg-rose-50 text-[#C65378] flex items-center justify-center text-xs font-black">2</span>
                    <h4>Family Council vs Company Board</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Keeps home matters separate from business operations. The <strong>Family Council</strong> handles family matters,
                    while the <strong>Board of Directors</strong> runs the firm.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#172228]">
                    <span className="w-6 h-6 rounded-full bg-rose-50 text-[#C65378] flex items-center justify-center text-xs font-black">3</span>
                    <h4>Next-Gen Work Rules &amp; Pay</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Sets real standards before children join the firm. Heirs must earn good degrees and work outside for 2 to 3 years.
                    Pay is based on market rates, not birthright.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#172228]">
                    <span className="w-6 h-6 rounded-full bg-rose-50 text-[#C65378] flex items-center justify-center text-xs font-black">4</span>
                    <h4>Share Transfer &amp; ROFR Rules</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Stops shares from going to outsiders. Family members get the first right to buy out departing relatives at a fair price.
                  </p>
                </div>
              </div>

              {/* Pillar 5 Spotlight Box */}
              <div className="bg-gradient-to-br from-rose-50 via-white to-amber-50 rounded-2xl border border-rose-200 p-5 space-y-3">
                <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
                  <span className="w-6 h-6 rounded-full bg-[#C65378] text-white flex items-center justify-center text-xs font-black">5</span>
                  <h4>Dispute Ladder &amp; Family Ombudsman</h4>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Family arguments will happen. But going to court destroys company value.
                  Our framework uses four quiet steps: (1) Family Council chat, (2) Respected Elder or Ombudsman review,
                  (3) Neutral mediation, and (4) Private arbitration in India.
                </p>
              </div>
            </section>

            {/* SECTION 5: NCLT RISK MITIGATION BOX (Mandatory Component 3) */}
            <section id="nclt-risk-mitigation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>NCLT COURT DEFENSE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. NCLT Oppression &amp; Mismanagement Risk Mitigation
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Sections 241 and 242 of the Companies Act let any 10% shareholder sue in the NCLT for unfair bias.
                In family firms, these lawsuits can freeze all bank accounts in days.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="font-extrabold text-xs text-slate-900 uppercase tracking-wide">
                      The Cyrus Mistry Case
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      In <em>Tata v. Cyrus Investments (2021 SC)</em>, the Supreme Court ruled that removing a director
                      is not oppression unless the AoA grants a guaranteed seat. The AoA rules are supreme.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="font-extrabold text-xs text-slate-900 uppercase tracking-wide">
                      Sangramsinh Gaekwad Ruling
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      The Supreme Court held that simple family fights cannot be turned into Section 241 company oppression
                      if directors acted within their legal powers under company articles.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="font-extrabold text-xs text-slate-900 uppercase tracking-wide">
                      Shakti Yezdani Nominee Rule
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Nominees registered with the company cannot keep shares away from Will heirs. The top court confirmed
                      that nomination is only a temporary custody step.
                    </p>
                  </div>
                </div>

                {/* 5-Step Mitigation Protocol Box */}
                <div className="p-4 rounded-2xl bg-[#172228] text-white space-y-3">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-rose-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>5-Step NCLT Defense Protocol for Private Companies</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-200">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Quorum Clauses:</strong> Prevent one angry heir from stopping board meetings.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Casting Vote Rule:</strong> Give the Chairman a tie-breaker vote on 50:50 splits.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Mandatory Mediation:</strong> Bar court suits before a 60-day quiet conciliation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Fixed Valuation:</strong> Use clear formula pricing so no one claims cheap buyouts.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 6: BUSINESS CONTINUITY PROTOCOL (Mandatory Unique Asset 1) */}
            <section id="continuity-protocol" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <TrendingUp className="w-4 h-4" />
                <span>CONTINUITY PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Family Business Continuity Protocol: Day 1 to Day 180
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                When a founder dies, business operations cannot stop. Our phased steps ensure your payroll stays running
                and bank accounts remain active.
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">Day 1 to 7: Banking &amp; Cash Flow Safety</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Use ready dual signing powers. Show pre-signed board resolutions to your bank managers so payroll
                      and vendor payments continue without pauses.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">Day 8 to 30: Board Meeting &amp; RoC Filings</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Hold an urgent board meeting. File RoC Form DIR-12 for the deceased director and appoint the agreed
                      successor or interim leader based on your AoA terms.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">Day 31 to 90: Share Transfer &amp; Will Proof</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      File share transfer papers under Section 56 backed by the founder&apos;s Will.
                      Issue updated share certificates and update the company member register.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">Day 91 to 180: Share Buyout &amp; Council Balance</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Complete buyouts of non-working heirs using insurance funds. Give voting control to working heirs
                      and steady dividend shares to other family members.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: SYNCHRONIZATION AUDIT (Mandatory Unique Asset 2) */}
            <section id="synchronization-audit" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>LEGAL AUDIT CHECKLIST</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. AoA and Will Synchronization Audit Checklist
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                A private Will cannot override company articles on share transfers or board seats.
                Use our 10-point checklist to match your Will with your company rulebook.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="font-extrabold text-xs text-slate-900 uppercase tracking-wide">
                    10-Point Legal Synchronization Audit
                  </div>
                  <button
                    onClick={copyAuditChecklist}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold text-xs transition-colors"
                  >
                    {copiedAudit ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAudit ? "Copied Checklist" : "Copy Audit Checklist"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>AoA Table F Override:</strong> Add custom share transfer rules to avoid board vetoes.</span>
                  </div>
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Nominee Match:</strong> Check that company nominees match the heirs in your Will.</span>
                  </div>
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Quorum Rules:</strong> Ensure board meetings stay valid if a director falls ill.</span>
                  </div>
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Casting Vote Rule:</strong> Set clear rules for who breaks ties on the board.</span>
                  </div>
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Keyman Insurance:</strong> Put insurance money in escrow to buy back heir shares.</span>
                  </div>
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Bank Mandates:</strong> Set two or more signers so cash is never locked.</span>
                  </div>
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Next-Gen Standards:</strong> Require degrees and work experience before kids join.</span>
                  </div>
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Class B Shares:</strong> Give non-working family members dividend shares without votes.</span>
                  </div>
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Matching Clauses:</strong> Use the same 4 dispute steps across all papers.</span>
                  </div>
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>SRO Registration:</strong> Register your family deal with the Sub-Registrar.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: DEADLOCK ESCALATION MECHANISM (Mandatory Unique Asset 3) */}
            <section id="deadlock-escalation-mechanism" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>DEADLOCK ESCALATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Dispute Escalation &amp; Deadlock Resolution Mechanisms
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                When two family branches each hold 50% shares, votes can freeze.
                These three proven exit tools end deadlocks fairly without winding up the firm.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-2">
                  <div className="font-extrabold text-xs text-[#C65378] uppercase tracking-wide">
                    Option A: Russian Roulette
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Shotgun Buyout Offer</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Partner A names a price per share. Partner B must either sell out at that price or buy out Partner A
                    at the exact same price. This forces honest pricing.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-2">
                  <div className="font-extrabold text-xs text-[#C65378] uppercase tracking-wide">
                    Option B: Texas Shootout
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Sealed Bid Auction</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Both sides submit a sealed cash bid to a lawyer. The higher bidder buys out the lower bidder in cash,
                    resolving the tie on the spot.
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-2">
                  <div className="font-extrabold text-xs text-[#C65378] uppercase tracking-wide">
                    Option C: Vertical Demerger
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Tax-Free Firm Split</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Sections 230 to 232 of the Companies Act, the company splits into two separate firms.
                    Each branch runs its own firm with zero capital gains tax under Section 47.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 9: COPYABLE LAWYER-VETTED SUCCESSION CLAUSES */}
            <section id="copyable-clauses" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>MODEL LEGAL CLAUSES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Lawyer-Vetted Corporate Succession Clauses
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Read and copy these sample legal clauses drafted by corporate advocates for company AoA amendments,
                Shareholders&apos; Agreements (SHA), and Family Charters.
              </p>

              {/* Clause Box 1: AoA Share Transmission */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-xs text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#C65378]" />
                    <span>AoA Model Share Transmission Clause (Section 56 &amp; Table F)</span>
                  </div>
                  <button
                    onClick={copyTransmissionClause}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold text-xs transition-colors"
                  >
                    {copiedTransmission ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTransmission ? "Copied" : "Copy Clause"}</span>
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-800 leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
{`Article [X]. SHARE TRANSFER ON FOUNDER DEMISE:
1. Upon the death of a Member holding shares, the Company shall recognize only the person named in a valid Will, or lawful heirs under personal law.
2. A nomination under Section 72 gives the nominee power only as a trustee for the legal heirs. The nominee holds shares for the heirs named in the Will.
3. Within 60 days of getting the Will copy and Death Certificate, the Board shall enter the heirs in the Register of Members.
4. Share transfer does not give any non-working heir an automatic right to a seat on the Board of Directors.`}
                </div>
              </div>

              {/* Clause Box 2: Buy-Sell & ROFR */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-xs text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[#C65378]" />
                    <span>Cross-Purchase Buy-Sell Restriction &amp; ROFR Clause</span>
                  </div>
                  <button
                    onClick={copyBuySellClause}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold text-xs transition-colors"
                  >
                    {copiedBuySell ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedBuySell ? "Copied" : "Copy Clause"}</span>
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-800 leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
{`Clause [Y]. SURVIVOR PURCHASE OPTION UPON DEMISE:
1. When a founder dies or falls ill, surviving partners have first right to buy the shares.
2. The buyout price must match the Fair Market Value (FMV) under Rule 11UA of the Income Tax Rules.
3. The firm may fund this buyout using Keyman life insurance held in an escrow account.
4. Surviving partners have 90 days to buy the shares. If they do not, heirs keep Class B dividend shares.`}
                </div>
              </div>

              {/* Clause Box 3: Family Constitution Dispute Charter */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-xs text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#C65378]" />
                    <span>Family Constitution 4-Tier Dispute Escalation Clause</span>
                  </div>
                  <button
                    onClick={copyCharterClause}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold text-xs transition-colors"
                  >
                    {copiedCharter ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCharter ? "Copied" : "Copy Clause"}</span>
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-800 leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
{`Article [Z]. 4-STEP DISPUTE RESOLUTION LADDER:
Step 1: Family Council meets within 14 days of written notice to talk through issues.
Step 2: If unresolved in 30 days, an independent Family Elder or Ombudsman gives written guidance.
Step 3: If still unresolved, family branches go to conciliation before filing any court case.
Step 4: If a deadlock lasts 180 days, either branch can trigger a fair buyout offer to buy or sell out.`}
                </div>
              </div>
            </section>

            {/* SECTION 10: STATUTORY CITATIONS & PRECEDENTS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>CASE LAW &amp; PRECEDENTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Landmark Authorities &amp; Judicial Precedents
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Indian company law and succession rules rely on these key statutes and Supreme Court judgments:
              </p>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1">
                  <div className="font-extrabold text-slate-900 text-sm">
                    Companies Act, 2013 ss. 56, 72 &amp; 241-242
                  </div>
                  <p className="leading-relaxed">
                    Section 56 covers share transfers. Section 72 sets share nominee rules. Sections 241 and 242 give
                    powers to the NCLT court to hear shareholder cases.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1">
                  <div className="font-extrabold text-slate-900 text-sm">
                    Shakti Yezdani v. Jayanand Salgaonkar (2023 SC)
                  </div>
                  <p className="leading-relaxed">
                    The Supreme Court held that Section 72 does not change inheritance law. A nominee holds company shares
                    solely as a trustee for the heirs named in the founder&apos;s Will.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1">
                  <div className="font-extrabold text-slate-900 text-sm">
                    Tata Consultancy Services v. Cyrus Investments (2021 SC)
                  </div>
                  <p className="leading-relaxed">
                    The Supreme Court confirmed that company articles bind all members. Unless the AoA promises a board seat,
                    removing a director does not count as oppression.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1">
                  <div className="font-extrabold text-slate-900 text-sm">
                    Indian Partnership Act, 1932 ss. 37 &amp; 42(c)
                  </div>
                  <p className="leading-relaxed">
                    Section 42(c) ends a firm when a partner dies unless the deed has a continuity clause. Section 37 gives the
                    heirs a right to firm profits or 6% interest until dues are cleared.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 11: CONSULTATION RETAINER PACKAGES (Mandatory Component 4) */}
            <section id="consultation-retainer" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Briefcase className="w-4 h-4" />
                <span>CORPORATE LEGAL RETAINER</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. High-Ticket Business Succession Retainer Packages
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                AMA Legal Solutions provides end-to-end legal counsel for Indian family firms, promoters, and mid-market companies.
                Choose a plan tailored to your enterprise.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Package 1 */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 flex flex-col justify-between shadow-xs">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                      SME Foundation
                    </div>
                    <div className="text-2xl font-black text-slate-900">₹1,00,000</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      For growing private firms and LLPs seeking core founder share protection.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-700 border-t border-slate-100 pt-3">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>AoA Share Transfer Review</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Matched Founder Will Draft</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Section 72 Nominee Fix</span>
                      </li>
                    </ul>
                  </div>
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                  >
                    <span>Engage Counsel</span>
                  </Link>
                </div>

                {/* Package 2: Featured */}
                <div className="bg-[#172228] text-white rounded-3xl border border-[#C65378]/40 p-6 space-y-4 flex flex-col justify-between shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-[#C65378] text-[10px] font-black uppercase tracking-wider rounded-bl-xl text-white">
                    MOST POPULAR
                  </div>
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[11px] font-bold text-rose-200 uppercase tracking-wide">
                      Enterprise Suite
                    </div>
                    <div className="text-2xl font-black text-white">₹2,50,000</div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Complete legal harmony for established multi-branch family firms.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-200 border-t border-white/10 pt-3">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Full Family Constitution</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>AoA &amp; Buy-Sell Synchronization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>4-Step Dispute Ladder</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Keyman Insurance Escrow Setup</span>
                      </li>
                    </ul>
                  </div>
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs shadow-md transition-colors"
                  >
                    <span>Book Strategy Session</span>
                  </Link>
                </div>

                {/* Package 3 */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 flex flex-col justify-between shadow-xs">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                      Conglomerate / HNI
                    </div>
                    <div className="text-2xl font-black text-slate-900">₹5,00,000+</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Multi-firm holding setups, private family trusts, and cross-border assets.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-700 border-t border-slate-100 pt-3">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Private Family Trust Formation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Tax-Free Demerger Design</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Filed SRO Family Settlement</span>
                      </li>
                    </ul>
                  </div>
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                  >
                    <span>Request Custom Quote</span>
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 12: FREQUENTLY ASKED QUESTIONS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions on Corporate Succession
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Clear legal answers to top questions on business succession, share transfers, and family governance.
              </p>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full py-4 px-5 text-left font-extrabold text-slate-900 text-sm flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C65378] shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
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
              RIGHT COLUMN: STICKY AUTHOR PROFILE & DUAL CTAS
              ===================================================================== */}
          <aside className="sticky top-24 space-y-6">
            {/* AUTHOR PROFILE CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#172228] text-white flex items-center justify-center font-black text-sm tracking-wide">
                  AAM
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">Lawyer Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Corporate &amp; Estate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Advising Indian business families, founder boards, and private firms on corporate succession,
                AoA harmony, and NCLT deadlock defense at AMA Legal Solutions.
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
              {/* CARD 2: DUAL CTA 1 - CORPORATE SUCCESSION RETAINER (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>PREVENT NCLT DEADLOCKS</span>
                </div>
                <h4 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Enterprise from Sibling Shareholder Lawsuits
                </h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  A synchronized succession structure aligns company AoA, promoter Wills, and family governance,
                  guaranteeing uninterrupted business operations.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Book Corporate Consultation</span>
                </Link>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>NDA Protected &amp; High Court / NCLT Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - WILL DRAFTING (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>FOUNDER WILL DRAFTING DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Draft Your Comprehensive Founder Will Online
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bequeath shares, private assets, and real estate with lawyer-vetted testamentary clauses designed
                  for Indian business owners.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Draft a Will in 15 Mins</span>
                </button>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Promoters Trust WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>NCLT &amp; RoC Precision:</strong> Strict compliance with Companies Act ss. 56 &amp; 72.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Voting Deadlock:</strong> Customized casting vote and Russian Roulette clauses.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Cross-Entity Integration:</strong> Aligns Pvt Ltd, LLP, Partnership, and Private Trusts.
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
        <Link
          href="/contact"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Consult Lawyer</span>
        </Link>
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
