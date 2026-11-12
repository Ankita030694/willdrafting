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
  Scale,
  Lock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Landmark,
  Check,
  Building2,
  Calculator,
  Copy,
  CheckCheck,
  Users,
  FileText,
  Layers,
  Coins,
  FileSpreadsheet,
  Briefcase,
  ShieldAlert,
} from "lucide-react";

// Table of Contents Items (all <= 70 chars, 0 em-dashes, matching section IDs)
const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Buy-Sell Agreement Rules" },
  { id: "interactive-calculator", label: "2. Buyout & Rule 11UA Tool" },
  { id: "comparison-table", label: "3. Cross-Purchase vs Buyback" },
  { id: "insurance-escrow-mechanism", label: "4. Insurance Trust Escrow Box" },
  { id: "rule-11ua-valuation", label: "5. Rule 11UA Valuation Formula" },
  { id: "companies-act-compliance", label: "6. Sec 56, Sec 58 & Sec 37 Rules" },
  { id: "buy-sell-template", label: "7. Cross-Purchase Format Draft" },
  { id: "execution-sop", label: "8. AoA Filing & Execution SOP" },
  { id: "case-studies", label: "9. Real Founder Case Studies" },
  { id: "statutory-citations", label: "10. Legal Citations & Guides" },
  { id: "frequently-asked-questions", label: "11. Partner Buy-Sell FAQs" },
];

type EntityKey = "pvt_ltd" | "partnership" | "llp";
type ValuationKey = "rule_11ua_nav" | "rule_11ua_dcf" | "ebitda_multiple";

const ENTITY_CONFIG: Record<
  EntityKey,
  {
    label: string;
    shortName: string;
    statute: string;
    transferForm: string;
    stampRateLabel: string;
    stampRatePct: number;
    keyRisk: string;
  }
> = {
  pvt_ltd: {
    label: "Private Limited Company (Pvt Ltd)",
    shortName: "Private Limited",
    statute: "Companies Act, 2013 ss. 56 & 58",
    transferForm: "Form SH-4 + AoA Pre-Emption",
    stampRateLabel: "0.015% (Stamp Act Art. 62)",
    stampRatePct: 0.00015,
    keyRisk: "Transfer ban fails unless added to the AoA.",
  },
  partnership: {
    label: "Registered Partnership Firm",
    shortName: "Partnership Firm",
    statute: "Indian Partnership Act, 1932 ss. 37 & 42(c)",
    transferForm: "Reconstitution Deed + Form V",
    stampRateLabel: "State Stamp Duty (Partnership Deed)",
    stampRatePct: 0.005,
    keyRisk: "Firm dissolves on death unless deed bars it.",
  },
  llp: {
    label: "Limited Liability Partnership (LLP)",
    shortName: "LLP Entity",
    statute: "LLP Act, 2008 ss. 24 & 25",
    transferForm: "Supplemental LLP Deed + Form 3 & 4",
    stampRateLabel: "State Stamp Duty on Capital Shift",
    stampRatePct: 0.002,
    keyRisk: "Dropping below 2 partners risks personal liability.",
  },
};

const VALUATION_CONFIG: Record<
  ValuationKey,
  {
    label: string;
    formulaTitle: string;
    taxNote: string;
    multiplier: number;
  }
> = {
  rule_11ua_nav: {
    label: "Rule 11UA(1)(c)(b) Book Value (NAV)",
    formulaTitle: "FMV = (A + B + C + D - L) x PV / PE",
    taxNote: "Sets the minimum tax-safe floor under Sec 56(2)(x) and Sec 50CA.",
    multiplier: 1.0,
  },
  rule_11ua_dcf: {
    label: "Rule 11UA(2) Merchant Banker DCF",
    formulaTitle: "FMV = Present Value of Free Cash Flows",
    taxNote: "Best for high-growth startups where brand value exceeds book assets.",
    multiplier: 1.25,
  },
  ebitda_multiple: {
    label: "Agreed EBITDA Multiple (Floor: Rule 11UA)",
    formulaTitle: "Price = Max(3.5 x EBITDA, Rule 11UA NAV)",
    taxNote: "Locks in fair growth value while staying above the Rule 11UA floor.",
    multiplier: 1.4,
  },
};

const FAQS = [
  {
    q: "What is a Cross-Purchase Buy-Sell Agreement in India?",
    a: "It is a binding deal signed by business partners or co-founders. When one partner dies or retires, the surviving partners agree to buy the outgoing partner's shares. The estate agrees to sell at a preset formula price.",
  },
  {
    q: "Why is Keyman Insurance taxable if used directly for a buyout?",
    a: "Under Section 10(10D)(b) and Section 28(vi) of the Income Tax Act, company-owned Keyman payouts are taxed as business income. Using individual cross-purchase policies inside a Life Insurance Trust Escrow keeps death payouts tax-free under Section 10(10D).",
  },
  {
    q: "Must we update our Private Limited Articles of Association?",
    a: "Yes. Under Section 58(1) of the Companies Act, 2013 and V.B. Rangaraj v. V.B. Gopalakrishnan, share transfer rules bind the company only if written into the Articles of Association. Pass a special resolution and file Form MGT-14 with the ROC.",
  },
  {
    q: "How does Rule 11UA apply to a deceased partner's shares?",
    a: "Rule 11UA fixes the Fair Market Value floor for unquoted shares. If surviving partners pay less than Rule 11UA value, Section 56(2)(x) taxes the buyer on the gap. Section 50CA also taxes the estate on the higher deemed value.",
  },
  {
    q: "What happens under Section 37 of the Partnership Act without this pact?",
    a: "Under Section 42(c), a firm dissolves when a partner dies unless the deed states otherwise. If survivors keep running the firm without settling accounts, Section 37 lets the heirs claim future profits or 6% annual interest.",
  },
  {
    q: "Does a Section 72 share nominee override a Buy-Sell Agreement?",
    a: "No. In Shakti Yezdani v. Jayanand Salgaonkar (2023), the Supreme Court ruled that a share nominee only holds shares temporarily in trust. The nominee cannot defeat a valid Will or an AoA-backed Buy-Sell duty.",
  },
  {
    q: "What forms and stamp duty apply to transfer a deceased founder's shares?",
    a: "First, legal heirs transmit shares into their names under Section 56(2) with a death certificate and succession proof. Next, heirs and buyers sign Form SH-4 stamped at 0.015% under Article 62 of the Indian Stamp Act.",
  },
  {
    q: "How many policies do three co-founders need in a Cross-Purchase plan?",
    a: "Without an escrow trust, N partners need N times (N minus 1) policies, so three co-founders need six policies. One Irrevocable Life Insurance Trust Escrow holds one policy per partner and pays heirs directly.",
  },
  {
    q: "Can a surviving partner pay the buyout price in installments if insurance falls short?",
    a: "Yes. A well-drafted agreement lets insurance proceeds act as the down payment. The balance above the policy cover is paid via equal quarterly notes over 24 to 36 months with a fixed interest rate.",
  },
  {
    q: "Should every co-founder also write a personal Will alongside this agreement?",
    a: "Yes. The Will names the executor who has legal power to sign Form SH-4 and receive buyout funds on behalf of the spouse and children. Without a Will, bank and share transfers stall in court.",
  },
];

export default function CrossPurchaseBuySellClient() {
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
  const [copiedEscrowClause, setCopiedEscrowClause] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Interactive Calculator State
  const [numPartners, setNumPartners] = useState<number>(3);
  const [entityType, setEntityType] = useState<EntityKey>("pvt_ltd");
  const [valuationMethod, setValuationMethod] = useState<ValuationKey>("rule_11ua_nav");
  const [bookNetWorth, setBookNetWorth] = useState<number>(30000000); // Rs. 3.00 Cr
  const [deceasedStakePct, setDeceasedStakePct] = useState<number>(33);

  const entityInfo = ENTITY_CONFIG[entityType];
  const valInfo = VALUATION_CONFIG[valuationMethod];

  const adjustedEnterpriseValue = Math.round(bookNetWorth * valInfo.multiplier);
  const buyoutPrice = Math.round((adjustedEnterpriseValue * deceasedStakePct) / 100);
  const survivingPartnersCount = Math.max(1, numPartners - 1);
  const perSurvivorBuyout = Math.round(buyoutPrice / survivingPartnersCount);
  const directPoliciesCount = numPartners * (numPartners - 1);
  const escrowTrustPoliciesCount = numPartners;
  const stampDutyEstimate = Math.round(buyoutPrice * entityInfo.stampRatePct);
  // Assuming 30% corporate/slab tax saved by avoiding Section 28(vi) Keyman payout taxability
  const keymanTaxLeakageRisk = Math.round(buyoutPrice * 0.3);

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

  const copyEscrowClauseToClipboard = () => {
    const escrowText = `KEYMAN & LIFE INSURANCE TRUST ESCROW CLAUSE (SECTION 10(10D) TAX-SAFE ARCHITECTURE):
"1. ESCROW POLICY STRUCTURE: To ensure immediate liquidity without triggering business income taxation under Section 28(vi) of the Income Tax Act, 1961, the Partners hereby establish an Irrevocable Buy-Sell Insurance Escrow Trust ('Escrow Trust') managed by an independent Escrow Trustee. Each Partner shall maintain an individual term life policy on their life (or cross-owned policies held under trust) with a Sum Assured equal to their pro-rata Rule 11UA Fair Market Value as revised annually.
2. PROHIBITION OF SECTION 37(1) DEDUCTION: The Company / Firm shall NOT claim premiums paid on these cross-purchase escrow policies as a business expense under Section 37(1) of the Income Tax Act, 1961, nor designate them as employer-owned Keyman policies, preserving full death-benefit tax exemption under Section 10(10D).
3. SIMULTANEOUS CLOSING MECHANISM: Upon the demise of any Partner ('Deceased Partner'), the Escrow Trustee shall collect the tax-free policy proceeds directly into a designated Escrow Bank Account. Within thirty (30) days of receiving the death certificate and transmission confirmation, the Escrow Trustee shall release the Buyout Consideration to the Deceased Partner's Executor / Legal Heirs strictly against simultaneous delivery of duly stamped and executed Form SH-4 transfer instruments (or Supplemental Partnership / LLP Deed) in favour of the Surviving Partners pro-rata."`;

    navigator.clipboard.writeText(escrowText);
    setCopiedEscrowClause(true);
    setTimeout(() => setCopiedEscrowClause(false), 3000);
  };

  const copyTemplateToClipboard = () => {
    const templateText = `CROSS-PURCHASE BUY-SELL AGREEMENT BETWEEN BUSINESS PARTNERS
(Aligned with Companies Act, 2013 ss. 56 & 58, Income Tax Rules Rule 11UA, & Indian Partnership Act, 1932 s. 37)

THIS CROSS-PURCHASE BUY-SELL AGREEMENT ("Agreement") is executed on this [Day] day of [Month], [Year] at [City, State], by and among:

1. [PARTNER 1 FULL NAME], son/daughter of [Parent's Name], aged [Age] years, PAN: [ABCDE1234F], residing at [Address] ("First Partner");
2. [PARTNER 2 FULL NAME], son/daughter of [Parent's Name], aged [Age] years, PAN: [ABCDE1234F], residing at [Address] ("Second Partner"); and
3. [PARTNER 3 FULL NAME], son/daughter of [Parent's Name], aged [Age] years, PAN: [ABCDE1234F], residing at [Address] ("Third Partner").
(Collectively referred to as the "Partners" and individually as a "Partner").

CONFIRMING PARTY:
[COMPANY / FIRM NAME], a [Private Limited Company incorporated under the Companies Act, 2013 / Partnership Firm under the Indian Partnership Act, 1932] having CIN/Reg. No. [XXXX] and registered office at [Registered Address] ("Company / Firm").

RECITALS:
A. The Partners collectively hold 100% of the issued equity shares / capital contribution in the Company / Firm as detailed in SCHEDULE 'A'.
B. To ensure uninterrupted business continuity, prevent deadlock with non-operating legal heirs, and protect the financial security of a deceased Partner's family, the Partners wish to establish a mandatory Cross-Purchase Buy-Sell mechanism funded by Life Insurance Escrow.
C. The Partners intend to mirror the share transfer restrictions contained herein into the Articles of Association ("AoA") of the Company under Section 44 and Section 58 of the Companies Act, 2013.

NOW THIS AGREEMENT WITNESSETH AS FOLLOWS:

1. MANDATORY CROSS-PURCHASE TRIGGER ON DEATH OR PERMANENT DISABILITY:
1.1 Upon the death or medically certified permanent total incapacity of any Partner ("Outgoing Partner"), the Surviving Partners shall be jointly and severally obligated to purchase, and the Legal Heirs / Executor of the Outgoing Partner shall be obligated to sell, all Equity Shares / Capital Stake held by the Outgoing Partner ("Sale Shares") in exact proportion to the Surviving Partners' existing inter-se shareholding ratio.
1.2 No third-party sale or transmission to non-partner family heirs for retention shall be permitted contrary to this buy-sell obligation.

2. RULE 11UA FAIR MARKET VALUE (FMV) VALUATION FORMULA:
2.1 The Buyout Price for the Sale Shares shall be the higher of:
(a) The Fair Market Value determined strictly as per Rule 11UA(1)(c)(b) of the Income Tax Rules, 1962 using the Adjusted Net Asset Value formula: FMV = (A + B + C + D - L) x PV / PE, certified by the Company's Statutory Auditor or a Chartered Accountant as on the last day of the quarter preceding the Trigger Event; OR
(b) [Optional: Discounted Cash Flow (DCF) Valuation certified by a SEBI-Registered Merchant Banker under Rule 11UA(2) / Agreed EBITDA Multiple of [X] times trailing 12-month EBITDA].
2.2 Fixing the floor price at or above Rule 11UA FMV ensures full compliance with Section 56(2)(x) and Section 50CA of the Income Tax Act, 1961.

3. LIFE INSURANCE TRUST ESCROW FUNDING MECHANISM:
3.1 The Partners have arranged individual life insurance policies detailed in SCHEDULE 'B' held via an Irrevocable Insurance Escrow Trust. Premiums shall not be claimed as a business deduction under Section 37(1) so that death proceeds remain tax-free under Section 10(10D) rather than taxable Keyman proceeds under Section 28(vi).
3.2 Upon a Trigger Event, the Escrow Trustee shall collect the insurance proceeds and pay the Buyout Price directly to the Outgoing Partner's Estate / Legal Heirs within 45 days.
3.3 If the Rule 11UA Buyout Price exceeds the insurance proceeds received, the Surviving Partners shall pay the shortfall in equal quarterly instalments over 24 months carrying simple interest at 8% per annum.

4. COMPANIES ACT SECTION 56 & SECTION 58 TRANSFER MECHANICS:
4.1 Upon transmission of the Sale Shares to the Outgoing Partner's Legal Representatives under Section 56(2) of the Companies Act, 2013, the Legal Representatives and Surviving Partners shall execute Form SH-4 Securities Transfer Deed duly stamped at 0.015% under Article 62 of the Indian Stamp Act, 1899.
4.2 The Board of Directors shall approve registration of the transfer within 30 days. Any attempted transfer to an outside party in breach of this Agreement shall be refused by the Board under Section 58(1) read with the Company's Articles of Association.
4.3 Each Partner confirms that any Section 72 Share Nominee (Form SH-13) acts solely as a temporary trustee and remains bound to complete this cross-purchase sale.

5. PARTNERSHIP ACT SECTION 42(c) & SECTION 37 CONTINUITY WAIVER (IF FIRM):
5.1 Pursuant to Section 42(c) of the Indian Partnership Act, 1932, the Firm shall NOT dissolve upon the death of a Partner.
5.2 Pursuant to the Proviso to Section 37 of the Indian Partnership Act, 1932, once the Surviving Partners exercise this mandatory purchase option and settle accounts per Clause 2 and Clause 3, the Outgoing Partner's estate shall have no further claim to subsequent firm profits or 6% statutory interest.

6. GOVERNING LAW & ARBITRATION:
6.1 This Agreement shall be governed by the laws of India. Any dispute regarding valuation or closing shall be referred to a sole arbitrator under the Arbitration and Conciliation Act, 1996 seated at [City].

SCHEDULE 'A' (CAP TABLE / PARTNER SHAREHOLDING):
- Partner 1: [Name] | [Shares / % Stake] | [Folio / DIN]
- Partner 2: [Name] | [Shares / % Stake] | [Folio / DIN]
- Partner 3: [Name] | [Shares / % Stake] | [Folio / DIN]

SCHEDULE 'B' (LIFE INSURANCE ESCROW POLICIES):
- Insured Partner: [Name] | Insurer & Policy No.: [No.] | Sum Assured: Rs. [Amount]/- | Escrow Trustee: [Name]

IN WITNESS WHEREOF, the Partners and Confirming Party have executed this Agreement on the date first written above.

PARTNER 1: ________________________   PARTNER 2: ________________________
PARTNER 3: ________________________   FOR COMPANY / FIRM: ________________________

WITNESSES:
1. Name & Address: ________________________  Signature: ______________
2. Name & Address: ________________________  Signature: ______________`;

    navigator.clipboard.writeText(templateText);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `CROSS-PURCHASE BUY-SELL EXECUTION & ROC / TAX COMPLIANCE CHECKLIST:
1. Execute the Cross-Purchase Buy-Sell Agreement on Non-Judicial e-Stamp paper per State Stamp Act.
2. Amend Private Limited Company Articles of Association (AoA) via Special Resolution (Form MGT-14) to embed transfer restrictions under Section 58.
3. Obtain annual Rule 11UA Fair Market Value certificate from Statutory Auditor / CA / Merchant Banker.
4. Establish Irrevocable Life Insurance Trust Escrow and assign cross-purchase term policies (avoiding Section 28(vi) Keyman tax).
5. Ensure every Partner's personal Will authorizes their Executor to sign Form SH-4 and receive buyout funds.
6. Update Section 72 Nomination (Form SH-13) with acknowledgment of AoA Buy-Sell obligations.
7. For Partnership Firms: Execute registered Partnership Deed Addendum contracting out of Section 42(c) dissolution and capping Section 37 profit claims.
8. On Trigger Event: File Death Certificate + Legal Heir / Probate proof for Section 56(2) transmission first.
9. Execute Form SH-4 stamped at 0.015% (Indian Stamp Act Art. 62) and submit with original Share Certificates within 60 days.
10. Pass Board Resolution recording transfer in Register of Members (Form MGT-1) and release Escrow payout simultaneously.`;

    navigator.clipboard.writeText(checklistText);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Navy - Matching PartitionDeed Theme)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Briefcase className="w-3.5 h-3.5 text-[#C65378]" />
            <span>COMPANIES ACT, 2013 SS. 56 &amp; 58 • RULE 11UA • PARTNERSHIP ACT S. 37</span>
          </div>

          {/* Strict H1 Tag (53 chars, 0 em-dashes, distinct from <title>) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Buy-Sell Agreement Format for Business Partners India
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Download a lawyer-vetted cross-purchase buy-sell agreement format for co-founders and
            partners in India. Lock in Rule 11UA share pricing, avoid Section 28(vi) Keyman taxes
            via an Insurance Trust Escrow, and protect control under Companies Act Section 58.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#buy-sell-template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get Buy-Sell Format</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Matching Founder Will</span>
            </button>
            <Link
              href="/services/business-succession-family-constitution-lawyer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Consult Corporate Counsel</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sec 56 &amp; 58</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SH-4 &amp; AOA TRANSFER LOCK
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Rule 11UA</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                TAX-SAFE SHARE FMV FLOOR
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sec 10(10D)</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                TAX-FREE ESCROW PAYOUT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 37</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                PARTNERSHIP PROFIT SHIELD
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
                <span>Legal Office</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Drafted under Companies Act 2013 ss. 56 &amp; 58, Partnership Act 1932 ss. 37
                &amp; 42(c), and Income Tax Rules Rule 11UA.
              </p>
            </div>

            {/* Document Download Quick Box */}
            <div className="bg-[#FAF7F0] rounded-2xl border border-[#C65378]/20 p-4 text-xs space-y-2.5">
              <div className="font-extrabold text-[#172228] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#C65378]" />
                <span>Agreement Format</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Ready to align your co-founder cap table and AoA? Copy the full draft or book a
                counsel review.
              </p>
              <a
                href="#buy-sell-template"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-[11px] transition-colors"
              >
                <span>Jump to Full Format</span>
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
                  src="/images/cross-purchase-buy-sell-agreement-format-india-og.jpg"
                  alt="Cross-Purchase Buy-Sell Agreement Format for Business Partners in India"
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
                  <span>
                    Cross-Purchase Buy-Sell Framework: Companies Act Sec 56 &amp; 58, Rule 11UA
                    FMV &amp; Life Insurance Escrow
                  </span>
                </p>
              </div>
            </div>

            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: PARTNER BUY-SELL ESSENTIALS</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Stops Unwanted Co-Owners:</strong> If a co-founder dies, shares pass to
                    their spouse or kids by default. A Cross-Purchase pact lets survivors buy those
                    shares fast.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Must Match Your AoA:</strong> Under Section 58 of the Companies Act,
                    2013, share buyout rules bind a Private Limited company only when added to its
                    Articles of Association.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Tax-Safe Rule 11UA Pricing:</strong> Buying shares below Rule 11UA Fair
                    Market Value triggers tax penalties under Section 56(2)(x) and Section 50CA.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Avoids Keyman Tax Leakage:</strong> Direct Keyman payouts get taxed
                    under Section 28(vi). A Life Insurance Trust Escrow keeps death payouts tax-free
                    under Section 10(10D).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Blocks Section 37 Claims:</strong> In a Partnership firm, this pact
                    prevents automatic death dissolution under Section 42(c) and stops open-ended
                    Section 37 profit suits.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (ONLY H2 ON THE ENTIRE PAGE) */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>CORPORATE SUCCESSION LAW</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Cross-Purchase Buy-Sell Agreement Rules in India
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Picture three co-founders who own equal shares in a growing Private Limited
                  company. If one founder passes away, their 33.3% stake passes to their spouse or
                  children. Suddenly, the surviving partners must run the business with an heir who
                  may lack industry skill or want fast cash dividends.
                </p>
                <p>
                  At the same time, the deceased founder&apos;s family holds illiquid private shares
                  that earn zero salary and cannot be sold on an open market. Without cash, the
                  surviving partners cannot buy the family out either. Both sides get trapped in a
                  boardroom deadlock.
                </p>
                <p>
                  A <strong>Cross-Purchase Buy-Sell Agreement</strong> solves both problems at
                  once. Each partner signs a binding promise while alive. If one partner dies, the
                  surviving partners buy the outgoing shares pro-rata, and the deceased
                  partner&apos;s estate agrees to sell at a fair formula price.
                </p>
                <p>
                  Generic templates copied from US websites fail in Indian courts. They miss Form
                  SH-4 stamp duty rules under <strong>Section 56</strong>, AoA lock-in rules under{" "}
                  <strong>Section 58</strong>, tax floor rules under <strong>Rule 11UA</strong>, and
                  profit-share limits under <strong>Section 37 of the Partnership Act</strong>.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE BUYOUT &amp; TAX SIMULATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Buy-Sell Payout &amp; Rule 11UA Tax Tool
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Model a partner buyout for your Private Limited company, Partnership, or LLP. Check
                each survivor&apos;s share of the buyout cost, stamp duty, and Keyman tax risk.
              </p>

              {/* Calculator Panel Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Configuration Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Total Co-Founders / Partners</span>
                    </label>
                    <select
                      value={numPartners}
                      onChange={(e) => setNumPartners(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      <option value={2}>2 Business Partners</option>
                      <option value={3}>3 Co-Founders / Partners</option>
                      <option value={4}>4 Co-Founders / Partners</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Business Entity Type</span>
                    </label>
                    <select
                      value={entityType}
                      onChange={(e) => setEntityType(e.target.value as EntityKey)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      {Object.entries(ENTITY_CONFIG).map(([key, item]) => (
                        <option key={key} value={key}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Valuation Standard</span>
                    </label>
                    <select
                      value={valuationMethod}
                      onChange={(e) => setValuationMethod(e.target.value as ValuationKey)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-sm focus:border-[#C65378] focus:bg-white focus:outline-hidden"
                    >
                      {Object.entries(VALUATION_CONFIG).map(([key, item]) => (
                        <option key={key} value={key}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Valuation & Equity Sliders */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Book Net Worth (A - L): {formatINR(bookNetWorth)}
                      </label>
                    </div>
                    <input
                      type="range"
                      min={5000000}
                      max={250000000}
                      step={2500000}
                      value={bookNetWorth}
                      onChange={(e) => setBookNetWorth(Number(e.target.value))}
                      className="w-full accent-[#C65378] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                      <span>₹50 Lakhs</span>
                      <span>₹5 Cr</span>
                      <span>₹15 Cr</span>
                      <span>₹25 Cr</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Outgoing Partner Equity: {deceasedStakePct}%
                      </label>
                      <span className="text-xs font-semibold text-slate-500">
                        Total Buyout: {formatINR(buyoutPrice)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={50}
                      step={1}
                      value={deceasedStakePct}
                      onChange={(e) => setDeceasedStakePct(Number(e.target.value))}
                      className="w-full accent-[#172228] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                      <span>10%</span>
                      <span>25%</span>
                      <span>33%</span>
                      <span>50%</span>
                    </div>
                  </div>
                </div>

                {/* Per-Partner Breakdown Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Each Survivor&apos;s Buyout Share
                    </div>
                    <div className="text-lg font-extrabold text-[#172228]">
                      {formatINR(perSurvivorBuyout)}
                    </div>
                    <div className="text-[11px] text-slate-600">
                      Split across {survivingPartnersCount} surviving partner
                      {survivingPartnersCount > 1 ? "s" : ""}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Policies Needed (Direct vs Escrow)
                    </div>
                    <div className="text-lg font-extrabold text-[#C65378]">
                      {directPoliciesCount} Direct vs {escrowTrustPoliciesCount} Escrow
                    </div>
                    <div className="text-[11px] text-slate-600">
                      Escrow Trust cuts policy count from N(N-1) to just N
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Estimated Transfer Stamp Duty
                    </div>
                    <div className="text-lg font-extrabold text-[#172228]">
                      {formatINR(stampDutyEstimate)}
                    </div>
                    <div className="text-[11px] text-slate-600">{entityInfo.stampRateLabel}</div>
                  </div>
                </div>

                {/* COMPUTATION RESULTS BOX */}
                <div className="p-6 rounded-3xl bg-[#172228] text-white space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-rose-300" />
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-200">
                        RULE 11UA &amp; ESCROW FUNDING SUMMARY
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-white/10 px-2.5 py-1 rounded-full">
                      {entityInfo.statute}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Rule 11UA Tax-Safe Buyout
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-1">
                        {formatINR(buyoutPrice)}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">{valInfo.formulaTitle}</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Keyman Tax Risk (Sec 28(vi))
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-rose-300 mt-1">
                        {formatINR(keymanTaxLeakageRisk)}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Est. 30% tax lost if bought as company Keyman policy
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                        Escrow Policy Tax (Sec 10(10D))
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
                        ₹0 (Tax-Free)
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        When held in Irrevocable Life Insurance Escrow Trust
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs text-slate-200 space-y-1.5">
                    <div className="font-extrabold text-white flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-300" />
                      <span>Required Corporate Filing ({entityInfo.shortName}):</span>
                    </div>
                    <p className="leading-relaxed text-[11px]">
                      Use <strong>{entityInfo.transferForm}</strong>. Remember:{" "}
                      <strong>{entityInfo.keyRisk}</strong> {valInfo.taxNote}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileSpreadsheet className="w-4 h-4" />
                <span>STRUCTURE COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Cross-Purchase vs Entity Buyback vs No Agreement
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Co-founders often confuse a Cross-Purchase pact with a company share buyback under
                Section 68. Look at how the three options differ in India:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-extrabold">
                      <th className="py-3.5 px-4">Legal &amp; Tax Factor</th>
                      <th className="py-3.5 px-4 text-[#C65378]">Cross-Purchase + Escrow</th>
                      <th className="py-3.5 px-4">Company Buyback (Sec 68)</th>
                      <th className="py-3.5 px-4">No Buy-Sell Agreement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Who Buys Shares?</td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        Surviving partners pro-rata
                      </td>
                      <td className="py-3 px-4">Company redeems and cancels shares</td>
                      <td className="py-3 px-4 text-rose-700">
                        Legal heirs inherit shares directly
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Insurance Payout Tax</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        Tax-free under Sec 10(10D)
                      </td>
                      <td className="py-3 px-4 text-rose-700">
                        Taxable Keyman income (Sec 28(vi))
                      </td>
                      <td className="py-3 px-4">No funding mechanism</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Buyback Tax / Cap</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        No 25% Sec 68 annual cap
                      </td>
                      <td className="py-3 px-4">Capped at 25% of paid-up capital</td>
                      <td className="py-3 px-4">N/A (Boardroom deadlock)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Transfer Instrument</td>
                      <td className="py-3 px-4">Form SH-4 (0.015% stamp duty)</td>
                      <td className="py-3 px-4">Form SH-8, SH-9, SH-11 ROC filings</td>
                      <td className="py-3 px-4">Probate or Succession Certificate</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Bank &amp; Client Impact</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        Seamless continuity in 30-45 days
                      </td>
                      <td className="py-3 px-4">Slow solvency &amp; ROC checks</td>
                      <td className="py-3 px-4 text-rose-700">
                        Accounts frozen; Sec 37 profit suits
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: INSURANCE ESCROW MECHANISM BOX */}
            <section id="insurance-escrow-mechanism" className="scroll-target scroll-mt-28 space-y-5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Lock className="w-4 h-4" />
                <span>INSURANCE ESCROW ARCHITECTURE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Keyman Life Insurance Trust Escrow Mechanism
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Many agents tell founders to buy a company-owned Keyman policy to fund a partner
                buyout. That creates a major tax trap. Under <strong>Section 10(10D)(b)</strong>{" "}
                and <strong>Section 28(vi)</strong> of the Income Tax Act, any payout from a Keyman
                policy is fully taxable as business income. If the cover is ₹3 Crore, roughly ₹90
                Lakhs can vanish in tax before reaching the deceased partner&apos;s family.
              </p>

              {/* MANDATORY COMPONENT: Insurance Escrow Mechanism Box */}
              <div className="rounded-3xl bg-white border-2 border-[#172228]/15 shadow-sm overflow-hidden">
                <div className="bg-[#172228] text-white px-5 py-4 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-rose-200">
                    <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                    <span>INSURANCE ESCROW MECHANISM BOX (TAX-FREE SEC 10(10D) MODEL)</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold">
                    Zero Sec 28(vi) Leakage
                  </span>
                </div>

                <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#FAF7F0]/60">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <div className="text-xs font-black text-[#C65378] uppercase">
                      Step 1: Policy Ownership
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      Escrow Trustee Holds Policies
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Each founder takes an individual term life plan assigned to an Irrevocable
                      Insurance Escrow Trust. Premiums are NOT deducted as a Section 37(1)
                      business expense.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <div className="text-xs font-black text-[#C65378] uppercase">
                      Step 2: Claim Collection
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      Tax-Free Death Payout
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      When a partner passes away, the insurer pays 100% of the sum assured to the
                      Escrow Trustee. Because it is not a Keyman policy, the sum is tax-free under
                      Section 10(10D).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <div className="text-xs font-black text-[#C65378] uppercase">
                      Step 3: Simultaneous Swap
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      Cash for Signed Form SH-4
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The Escrow Trustee pays the deceased partner&apos;s widow or heirs ONLY when
                      they hand over signed Form SH-4 and share certificates to the surviving
                      partners.
                    </p>
                  </div>
                </div>
              </div>

              {/* Copyable Escrow Clause Box */}
              <div className="rounded-2xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                    <CheckCheck className="w-4 h-4" />
                    <span>Keyman Life Insurance Trust Escrow Clause</span>
                  </div>
                  <button
                    onClick={copyEscrowClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-[#C65378] text-xs font-bold transition-colors cursor-pointer"
                  >
                    {copiedEscrowClause ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied Escrow Clause!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Escrow Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] leading-relaxed text-slate-800 overflow-x-auto">
                  &ldquo;To preserve tax exemption under Section 10(10D) of the Income Tax Act,
                  1961, the Company shall not deduct policy premiums under Section 37(1) nor classify
                  policies as Keyman policies under Section 28(vi). Upon a Partner&apos;s death,
                  the Escrow Trustee shall collect the policy proceeds and release the Buyout Price
                  to the Estate strictly against simultaneous execution of Form SH-4 share transfer
                  instruments.&rdquo;
                </div>
              </div>
            </section>

            {/* SECTION 5: RULE 11UA VALUATION FORMULA BOX */}
            <section id="rule-11ua-valuation" className="scroll-target scroll-mt-28 space-y-5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Coins className="w-4 h-4" />
                <span>INCOME TAX RULES VALUATION FLOOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Rule 11UA Valuation Formula &amp; Section 56(2)(x) Safety
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Many online contracts let founders put a fixed price like &ldquo;₹10 per face value
                share.&rdquo; In India, that triggers severe double taxation. Under{" "}
                <strong>Section 56(2)(x)</strong>, if surviving partners buy unquoted shares below
                their Rule 11UA Fair Market Value (FMV), the tax officer treats the discount as
                taxable income in the buyers&apos; hands. At the same time,{" "}
                <strong>Section 50CA</strong> taxes the deceased partner&apos;s estate on the higher
                deemed FMV.
              </p>

              {/* MANDATORY COMPONENT: Valuation Formula Box */}
              <div className="rounded-3xl bg-white border-2 border-[#C65378]/30 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#172228] to-[#24343d] text-white px-5 py-4 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-rose-200">
                    <Calculator className="w-4 h-4 text-[#C65378]" />
                    <span>RULE 11UA(1)(c)(b) FAIR MARKET VALUE FORMULA BOX</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[11px] font-bold">
                    Income Tax Rules, 1962
                  </span>
                </div>

                <div className="p-5 sm:p-6 space-y-5">
                  <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#172228]/10 text-center">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#C65378] mb-1">
                      Statutory Adjusted NAV Equation
                    </div>
                    <div className="text-lg sm:text-2xl font-black text-[#172228] font-mono">
                      FMV = (A + B + C + D - L) &times; PV / PE
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <strong className="text-[#172228]">A = Book Assets:</strong> Book value of
                      general balance sheet assets (excluding items B, C, D and tax refunds).
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <strong className="text-[#172228]">B &amp; C = Valuables &amp; Shares:</strong>{" "}
                      Open market price of jewellery/art (B) and FMV of held securities (C).
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <strong className="text-[#172228]">D = Immovable Property:</strong> Stamp
                      duty circle rate value of all company-owned land and buildings.
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <strong className="text-[#172228]">L, PV &amp; PE:</strong> Ascertained
                      liabilities (L) excluding equity capital and reserves; PV = Share face value;
                      PE = Total paid-up equity.
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>
                      <strong>Startup &amp; Services Tip:</strong> If your startup has high revenue
                      but low book assets, pair Rule 11UA NAV as a floor with a{" "}
                      <strong>Rule 11UA(2) Merchant Banker DCF valuation</strong> or EBITDA
                      multiple so the deceased partner&apos;s family receives true enterprise value.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: COMPANIES ACT SEC 56, 58 & PARTNERSHIP ACT SEC 37 */}
            <section id="companies-act-compliance" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>COMPETITOR BLIND SPOT: STATUTORY ENFORCEMENT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Companies Act Sec 56 &amp; 58 and Partnership Sec 37
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Signing a standalone Buy-Sell Agreement in a drawer is not enough. Three Indian
                  statutes control whether a surviving partner can actually force the transfer:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">
                      Companies Act Sec 58
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">AoA Embedding</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    V.B. Rangaraj Principle &amp; Board Refusal
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    In <em>V.B. Rangaraj v. V.B. Gopalakrishnan</em>, the Supreme Court held that
                    private share transfer limits bind the company only when placed in the Articles
                    of Association. Section 58(1) lets the Board refuse outside transfers within 30
                    days if backed by the AoA.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">
                      Companies Act Sec 56
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">Form SH-4 Rules</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Transmission First, Then Form SH-4 Sale
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A company cannot transfer shares directly from a dead person. First, legal heirs
                    transmit shares under Section 56(2). Then, heirs sign Form SH-4 stamped at
                    0.015% under Article 62 and lodge certificates within 60 days.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">
                      Partnership Act Sec 37
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">Firm Continuity</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Stopping Post-Death Profit Claims
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 42(c), a partnership ends at death unless agreed otherwise. Without
                    a buyout option, Section 37 lets heirs demand future business profits or 6%
                    interest. A valid buyout pact activates the Section 37 proviso bar.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#C65378]">
                      Companies Act Sec 72
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">Nominee Limit</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Shakti Yezdani (2023 SC) Nominee Rule
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    In <em>Shakti Yezdani v. Jayanand Salgaonkar (2023)</em>, the Supreme Court
                    confirmed that a Form SH-13 nominee is only a caretaker. Pairing your Buy-Sell
                    pact with a Will keeps the estate aligned and avoids family lawsuits.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 7: COMPLETE CROSS-PURCHASE BUY-SELL AGREEMENT TEMPLATE */}
            <section id="buy-sell-template" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>LAWYER-VETTED LEGAL DRAFT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Cross-Purchase Buy-Sell Agreement Format India
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Below is our complete Cross-Purchase Buy-Sell Agreement draft for Private Limited
                co-founders and Partnership firms, incorporating Rule 11UA pricing, Insurance Escrow,
                and Section 56/58 compliance:
              </p>

              {/* Template Container Box */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-rose-300" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      CROSS-PURCHASE BUY-SELL AGREEMENT FORMAT (INDIA)
                    </span>
                  </div>
                  <button
                    onClick={copyTemplateToClipboard}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                  >
                    {copiedTemplate ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied Complete Format!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Entire Template</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-5 sm:p-6 max-h-[600px] overflow-y-auto bg-slate-50/60 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-800 whitespace-pre-wrap select-all border-b border-slate-200">
                  {`CROSS-PURCHASE BUY-SELL AGREEMENT BETWEEN BUSINESS PARTNERS
(Aligned with Companies Act, 2013 ss. 56 & 58, Income Tax Rules Rule 11UA, & Indian Partnership Act, 1932 s. 37)

THIS CROSS-PURCHASE BUY-SELL AGREEMENT ("Agreement") is executed on this [Day] day of [Month], [Year] at [City, State], by and among:

1. [PARTNER 1 FULL NAME], son/daughter of [Parent's Name], aged [Age] years, PAN: [ABCDE1234F], residing at [Address] ("First Partner");
2. [PARTNER 2 FULL NAME], son/daughter of [Parent's Name], aged [Age] years, PAN: [ABCDE1234F], residing at [Address] ("Second Partner"); and
3. [PARTNER 3 FULL NAME], son/daughter of [Parent's Name], aged [Age] years, PAN: [ABCDE1234F], residing at [Address] ("Third Partner").
(Collectively referred to as the "Partners" and individually as a "Partner").

CONFIRMING PARTY:
[COMPANY / FIRM NAME], a [Private Limited Company / Partnership Firm] having CIN/Reg. No. [XXXX] and registered office at [Registered Address] ("Company / Firm").

RECITALS:
A. The Partners collectively hold 100% of the equity shares / capital contribution in the Company / Firm as detailed in SCHEDULE 'A'.
B. To protect business continuity and provide fair liquidity to a deceased Partner's family, the Partners establish this mandatory Cross-Purchase Buy-Sell mechanism funded by a Life Insurance Trust Escrow.
C. The Partners undertake to embed these transfer limits in the Company's Articles of Association ("AoA") under Section 44 and Section 58 of the Companies Act, 2013.

NOW THIS AGREEMENT WITNESSETH AS FOLLOWS:

1. MANDATORY CROSS-PURCHASE TRIGGER:
1.1 Upon the death or permanent total incapacity of any Partner ("Outgoing Partner"), the Surviving Partners shall purchase, and the Legal Heirs / Executor of the Outgoing Partner shall sell, all Equity Shares / Capital Stake held by the Outgoing Partner ("Sale Shares") pro-rata to the Surviving Partners' existing shareholding ratio.

2. RULE 11UA FAIR MARKET VALUE (FMV) VALUATION:
2.1 The Buyout Price shall be the higher of:
(a) Fair Market Value computed under Rule 11UA(1)(c)(b) of the Income Tax Rules, 1962: FMV = (A + B + C + D - L) x PV / PE, certified by a Chartered Accountant; OR
(b) [Optional: Rule 11UA(2) Merchant Banker DCF Valuation / Agreed EBITDA Multiple].
2.2 Pricing at or above Rule 11UA FMV protects all parties from Section 56(2)(x) and Section 50CA tax penalties.

3. LIFE INSURANCE TRUST ESCROW FUNDING:
3.1 Policies listed in SCHEDULE 'B' are held by an Irrevocable Escrow Trustee. Premiums shall not be claimed as a Section 37(1) expense so death payouts remain tax-free under Section 10(10D) rather than taxable under Section 28(vi).
3.2 Within 45 days of death, the Escrow Trustee shall pay the Buyout Price to the Estate against simultaneous Form SH-4 delivery. Any balance above policy cover shall be paid in 8 equal quarterly instalments at 8% simple interest p.a.

4. COMPANIES ACT SECTION 56 & SECTION 58 COMPLIANCE:
4.1 Legal Heirs shall transmit shares under Section 56(2) and immediately execute Form SH-4 (stamped at 0.015% under Indian Stamp Act Art. 62) within 60 days.
4.2 Pursuant to the AoA and Section 58(1), the Board shall reject any transfer violating this Agreement.

5. PARTNERSHIP ACT SECTION 42(c) & SECTION 37 CLAUSE:
5.1 Under Section 42(c), the Firm shall NOT dissolve upon death of any Partner.
5.2 Under the Proviso to Section 37, full buyout payment bars any subsequent profit share or 6% interest claim by the Outgoing Partner's estate.

SCHEDULE 'A' (PARTNER SHAREHOLDING): [Partner Names, Shareholding %, Folio / DIN]
SCHEDULE 'B' (ESCROW LIFE POLICIES): [Policy Numbers, Insurers, Sum Assured, Escrow Trustee]

PARTNER 1: ________________________   PARTNER 2: ________________________
PARTNER 3: ________________________   FOR COMPANY / FIRM: ________________________

WITNESSES:
1. ________________________   2. ________________________`}
                </div>
                <div className="p-4 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
                  <span>
                    Compliant with Companies Act 2013, Partnership Act 1932 &amp; Income Tax Rules
                  </span>
                  <button
                    onClick={copyTemplateToClipboard}
                    className="text-[#C65378] font-bold hover:underline cursor-pointer"
                  >
                    Copy Clean Text
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 8: EXECUTION & AOA FILING SOP */}
            <section id="execution-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>STEP-BY-STEP EXECUTION PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. AoA Filing, Stamping &amp; Closing SOP
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Print Agreement on State Non-Judicial e-Stamp Paper",
                    desc: "Execute the Buy-Sell Agreement on appropriate state stamp paper (typically ₹200 to ₹500 for commercial agreements) with the company signing as Confirming Party.",
                  },
                  {
                    step: 2,
                    title: "Amend Articles of Association (Form MGT-14)",
                    desc: "Hold an Extraordinary General Meeting (EGM), pass a Special Resolution inserting the Buy-Sell pre-emption clause into the AoA, and file Form MGT-14 with the ROC within 30 days.",
                  },
                  {
                    step: 3,
                    title: "Set Up Irrevocable Insurance Escrow Trust",
                    desc: "Issue individual term life policies for each founder and assign them to the Escrow Trustee. Record clearly that premiums are not claimed as Section 37(1) deductions.",
                  },
                  {
                    step: 4,
                    title: "Certify Annual Rule 11UA Valuation",
                    desc: "Ask your Statutory Auditor or CA to issue an updated Rule 11UA valuation note after every annual balance sheet so insurance cover matches buyout value.",
                  },
                  {
                    step: 5,
                    title: "Align Personal Wills & Form SH-13 Nominations",
                    desc: "Update every co-founder's personal Will to name a clear executor authorized to sign Form SH-4 and receive escrow cash on behalf of family heirs.",
                  },
                  {
                    step: 6,
                    title: "Trigger Closing: Transmission + Form SH-4 Swap",
                    desc: "Upon death, file death proof for Section 56(2) transmission, execute 0.015%-stamped Form SH-4 within 60 days, and release Escrow payout simultaneously.",
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
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-extrabold text-slate-900 text-xs">
                    Need the 10-Point ROC &amp; Tax Compliance Checklist?
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Covers Form MGT-14, Form SH-4, Rule 11UA, and Escrow setup steps.
                  </div>
                </div>
                <button
                  onClick={copyChecklistToClipboard}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-colors shrink-0 cursor-pointer"
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

            {/* SECTION 9: REAL CASE STUDIES */}
            <section id="case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>PRACTICAL BUSINESS SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Practical Case Studies: Bengaluru &amp; Mumbai
              </h3>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE STUDY 1: BENGALURU SAAS PVT LTD</span>
                    <span className="text-slate-500 font-semibold">3 Equal Co-Founders</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    33.3% Co-Founder Buyout Funded Tax-Free via Insurance Escrow
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Three tech founders in Bengaluru held equal equity in a ₹12 Crore SaaS Private
                    Limited company. Instead of buying company Keyman plans (which would have lost
                    30% to Section 28(vi) tax), they assigned ₹4 Crore term plans into an
                    Irrevocable Escrow Trust and amended their AoA via Form MGT-14. When one
                    founder passed away in a road accident, the Escrow Trustee paid his widow ₹4
                    Crore tax-free within 40 days against signed Form SH-4 transfer deeds.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C65378]">
                    <span>CASE STUDY 2: MUMBAI MANUFACTURING FIRM</span>
                    <span className="text-slate-500 font-semibold">Partnership Act Sec 37</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    Preventing Automatic Dissolution and 6% Profit Claims
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Two brothers ran a registered partnership factory in Navi Mumbai. Their old deed
                    had no death buyout clause. After reviewing Section 42(c) and Section 37 risks,
                    they executed a Cross-Purchase Partnership Addendum backed by Rule 11UA asset
                    valuation. The factory stayed operational without bank account freezes, and the
                    surviving brother had a clear 24-month payment window for the family.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: STATUTORY CITATIONS & INTERNAL LINKS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>PRIMARY SOURCES &amp; RELATED GUIDES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Legal Citations &amp; Corporate Succession Desk
              </h3>
              <div className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs">
                <div className="font-extrabold text-slate-900 text-sm">
                  Primary Governing Statutes &amp; Judgments:
                </div>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li>
                    <strong>Companies Act, 2013 ss. 44, 56, 58 &amp; 72:</strong> Form SH-4 share
                    transfers, private company AoA refusal powers, and nominee trust rules.
                  </li>
                  <li>
                    <strong>Indian Partnership Act, 1932 ss. 37 &amp; 42(c):</strong> Firm
                    continuity upon death and statutory bar on subsequent profit claims.
                  </li>
                  <li>
                    <strong>Income Tax Act, 1961 ss. 10(10D), 28(vi), 50CA &amp; 56(2)(x):</strong>{" "}
                    Keyman insurance taxability vs life insurance exemption and Rule 11UA FMV floor.
                  </li>
                  <li>
                    <strong>Supreme Court Precedents:</strong>{" "}
                    <em>V.B. Rangaraj v. V.B. Gopalakrishnan (1992)</em> and{" "}
                    <em>Shakti Yezdani v. Jayanand Salgaonkar (2023)</em>.
                  </li>
                </ul>

                <div className="pt-2 flex flex-wrap gap-3 text-xs font-semibold">
                  <a
                    href="https://www.mca.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#C65378] hover:underline"
                  >
                    <span>Ministry of Corporate Affairs (MCA)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.incometax.gov.in/iec/foportal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#C65378] hover:underline"
                  >
                    <span>Income Tax India Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#C65378] hover:underline"
                  >
                    <span>India Code Statutory Repository</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                  <Link
                    href="/services/business-succession-family-constitution-lawyer"
                    className="px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] hover:bg-rose-100 font-bold"
                  >
                    Corporate Business Succession Advisory
                  </Link>
                  <Link
                    href="/tools/startup-founder-equity-succession-calculator"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Startup Equity Succession Calculator
                  </Link>
                  <Link
                    href="/tools/opc-nominee-director-activation-timeline-calculator"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    OPC Nominee Director Timeline Tool
                  </Link>
                  <Link
                    href="/services/private-family-trust-formation"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Private Family &amp; Escrow Trust Desk
                  </Link>
                  <Link
                    href="/templates/family-settlement-agreement-format-india"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Family Settlement Agreement Format
                  </Link>
                  <Link
                    href="/templates"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    All Legal Templates Hub
                  </Link>
                  <Link
                    href="/contact"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold"
                  >
                    Contact Legal Desk
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 11: FAQS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Frequently Asked Questions: Partner Buy-Sell Pacts
              </h3>
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
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-slate-900 hover:text-[#C65378] transition-colors cursor-pointer"
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

            {/* PLAIN-ENGLISH SUMMARY CARDS */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Write a Will Too?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A Buy-Sell pact sets the share buyer. A clear Will names your executor so your
                  spouse and kids get the buyout cash fast without court delays.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Protect Your Co-Founders</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Update your company AoA and add an Escrow Trust today. That keeps operations smooth
                  and prevents unwanted outsiders on your board.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers align your Buy-Sell pact, AoA clauses, and personal Wills in one clean
                  package. Note: this guide gives general info, not case advice.
                </p>
              </div>
            </div>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (DUAL CONVERSION CTA)
              ===================================================================== */}
          <aside className="space-y-6 sticky top-24">
            {/* CARD 1: AUTHOR BIO CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                  AAM
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">
                    Advocate Anuj Anand Malik
                  </div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Corporate Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Advises Indian co-founders and family businesses on shareholder buyout pacts, AoA
                amendments, and promoter succession at AMA Legal Solutions.
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
                  <span>SYNC YOUR WILL WITH YOUR BUY-SELL</span>
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Name an Executor to Close Your Share Buyout
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  Pair your Cross-Purchase Agreement with a valid Will so your family receives
                  escrow cash smoothly without probate fights.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Reviewed &amp; Promoter Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - CORPORATE ADVISORY (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>CORPORATE SUCCESSION DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need Custom AoA Clauses &amp; Insurance Trust Escrow?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our corporate lawyers draft custom Buy-Sell pacts, file Form MGT-14 AoA changes,
                  and structure Rule 11UA valuation clauses.
                </p>
                <Link
                  href="/services/business-succession-family-constitution-lawyer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Corporate Advisory Service</span>
                </Link>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-slate-200 hover:border-[#C65378] text-slate-800 hover:text-[#C65378] font-bold text-xs transition-colors"
                >
                  <span>Book Legal Consultation</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Founders Rely on WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>AoA Section 58 Lock:</strong> Enforceable share transfer protection.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Rule 11UA Floor:</strong> Prevents Section 56(2)(x) tax surprises.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Section 10(10D) Escrow:</strong> Keeps buyout payouts tax-free.
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
          href="#buy-sell-template"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Buy-Sell Format</span>
        </a>
        <button
          onClick={handleStartDraft}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Draft Founder Will</span>
        </button>
      </div>
    </div>
  );
}
