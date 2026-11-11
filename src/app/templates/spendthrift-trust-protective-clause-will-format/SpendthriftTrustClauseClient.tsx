"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
  Building2,
  CheckSquare,
  Shield,
} from "lucide-react";

// Table of Contents Items (strictly <= 70 chars, 0 em-dashes, matching section IDs)
const TOC_ITEMS = [
  { id: "statutory-framework", label: "1. Spendthrift Trust Clause: Section 138 ISA & Trusts Act" },
  { id: "spendthrift-protection-analyzer", label: "2. Free Spendthrift Trust & Attachment Risk Tool" },
  { id: "absolute-vs-spendthrift-trust", label: "3. Direct Gift vs Fixed Trust vs Spendthrift Trust" },
  { id: "cpc-section-60-immunity-table", label: "4. CPC Section 60 Immunity Table: Creditor Limits" },
  { id: "creditor-proof-spendthrift-clause", label: "5. Creditor-Proof Spendthrift Trust Clause Format" },
  { id: "discretionary-stipend-insolvency-bar", label: "6. Discretionary Monthly Stipend & Insolvency Bar Format" },
  { id: "trustee-powers-draft", label: "7. Trustee Powers Draft & Fiduciary Safeguard Rules" },
  { id: "section-12-tpa-and-tax-rules", label: "8. Transfer Act Limits & Section 164(1)(ii) Tax Shield" },
  { id: "step-by-step-execution-sop", label: "9. Step-by-Step SOP: Adding a Spendthrift Trust Clause" },
  { id: "fatal-drafting-mistakes", label: "10. Four Fatal Mistakes That Break Creditor Protection" },
  { id: "institutional-profile", label: "11. Institutional Profile: Private Trust & Estate Desk" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions: Spendthrift Trusts" },
  { id: "statutory-citations", label: "13. Governing Statutes, Case Law & Official Portals" },
];

const FAQS = [
  {
    q: "Can creditors seize property left to my son through a Will in India?",
    a: "Yes, if you leave property directly to an indebted son. Once legal title passes to him, his business creditors can attach and sell the asset under Section 60(1) of the Code of Civil Procedure, 1908. A discretionary spendthrift trust inside your Will keeps legal title with independent Trustees, so creditors cannot seize the trust fund.",
  },
  {
    q: "Why does writing 'my son cannot sell this house' fail under Section 138 ISA?",
    a: "Section 138 of the Indian Succession Act, 1925 voids any restriction put on an absolute gift of property or cash. Section 10 of the Transfer of Property Act, 1882 also voids total bans on sale. To shield the estate, you must leave legal title to Trustees on a discretionary trust instead of making a direct gift to your son.",
  },
  {
    q: "How does CPC Section 60 protect a discretionary monthly stipend?",
    a: "Under Section 60(1) of the Code of Civil Procedure, 1908, creditors can seize only saleable property or fixed rights owned by the debtor. In a pure discretionary trust, your son has no fixed legal claim to demand cash. Also, proviso (n) to Section 60(1) bars creditors from attaching a pure right to future maintenance.",
  },
  {
    q: "What happens if Trustees deposit trust cash into my son's personal bank account?",
    a: "That triggers the post-distribution trap. Trust assets stay protected only while they remain inside the trust. Once money enters your son's own bank account, creditors can freeze it under Order 21 Rule 46 of the CPC. To prevent this, our Trustee Powers Draft lets Trustees pay rent, school fees, and hospital bills directly to vendors.",
  },
  {
    q: "How is a spendthrift testamentary trust taxed under Section 164(1) of the Income Tax Act?",
    a: "Most discretionary trusts pay the highest Maximum Marginal Rate of tax. However, proviso (ii) to Section 164(1) of the Income Tax Act, 1961 grants a vital tax break. When a trust is created by a Will and is the only trust declared in that Will, its income is taxed at normal individual slab rates.",
  },
  {
    q: "Can an indebted person put their own assets into a spendthrift trust to avoid loans?",
    a: "No. A debtor cannot transfer their own property into a self-settled trust to defeat existing creditors. Indian courts strike down such transfers as fraud under Section 53 of the Transfer of Property Act, 1882 and the Insolvency and Bankruptcy Code, 2016. Only a parent or third party can shield their own assets for a child through a Will.",
  },
  {
    q: "Can I put ancestral or HUF property into a spendthrift trust for my son?",
    a: "You can only place your own self-acquired assets or your own undivided coparcenary share under Section 30 of the Hindu Succession Act, 1956 into a Will trust. You cannot lock away your son's existing birthright coparcenary share in ancestral HUF property through your Will.",
  },
  {
    q: "Who should I appoint as Trustees for a protective spendthrift trust?",
    a: "Always name at least two independent, debt-free adults, such as your spouse, an unindebted child, a trusted family Chartered Accountant, or a corporate trustee. Never appoint the indebted beneficiary as sole trustee, because holding full legal control and enjoyment removes creditor protection.",
  },
];

export default function SpendthriftTrustClauseClient() {
  const [activeId, setActiveId] = useState<string>("statutory-framework");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedSpendthrift, setCopiedSpendthrift] = useState<boolean>(false);
  const [copiedStipend, setCopiedStipend] = useState<boolean>(false);
  const [copiedTrusteePowers, setCopiedTrusteePowers] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // ==========================================
  // INTERACTIVE SPENDTHRIFT PROTECTION ANALYZER
  // ==========================================
  const [debtScenario, setDebtScenario] = useState<string>("business_debt");
  const [assetNature, setAssetNature] = useState<string>("self_acquired");
  const [payoutMethod, setPayoutMethod] = useState<string>("vendor_direct");
  const [trusteeSetup, setTrusteeSetup] = useState<string>("independent_dual");
  const [singleTrustInWill, setSingleTrustInWill] = useState<boolean>(true);

  let shieldRating = "Strong Creditor Shield";
  let shieldColor = "text-emerald-700";
  let isSafeStructure = true;
  let primaryRule = "Sections 6 & 9 Indian Trusts Act + Sec 60(1)(n) CPC";
  let diagnosticAdvice =
    "Your setup avoids Section 138 ISA absolute vesting. Independent Trustees hold legal title, while direct vendor payments keep cash out of attached bank accounts.";

  if (trusteeSetup === "debtor_sole") {
    shieldRating = "Fatal Control Risk";
    shieldColor = "text-rose-600";
    isSafeStructure = false;
    primaryRule = "Section 60(1) CPC Disposing Power Risk";
    diagnosticAdvice =
      "Never make the debt-burdened heir the sole trustee. Courts treat full control plus enjoyment as attachable disposing power under Section 60(1) CPC. Appoint two debt-free Trustees instead.";
  } else if (payoutMethod === "lump_sum_bank") {
    shieldRating = "Garnishee Leak Warning";
    shieldColor = "text-amber-700";
    isSafeStructure = false;
    primaryRule = "Order 21 Rule 46 CPC Bank Attachment Risk";
    diagnosticAdvice =
      "Trust protection stops once cash lands in your son's personal bank account. Creditors can freeze bank deposits fast. Switch to direct third-party vendor payments for rent, school, and hospital bills.";
  } else if (assetNature === "huf_coparcenary") {
    shieldRating = "Partial Asset Shield";
    shieldColor = "text-amber-700";
    isSafeStructure = true;
    primaryRule = "Section 30 Hindu Succession Act, 1956";
    diagnosticAdvice =
      "A Will can only place your own undivided share or self-acquired property into the spendthrift trust. Your son's own birthright share in ancestral property remains open to his creditors.";
  } else if (debtScenario === "self_settled_debt") {
    shieldRating = "Void Against Existing Creditors";
    shieldColor = "text-rose-600";
    isSafeStructure = false;
    primaryRule = "Section 53 Transfer of Property Act & IBC";
    diagnosticAdvice =
      "An indebted person cannot shield their own assets from existing creditors. Only parents or relatives leaving their own self-acquired estate via a Will can create a valid spendthrift shield.";
  }

  const taxStatusText = singleTrustInWill
    ? "Normal Individual Slab Rates (Sec 164(1)(ii) Carve-Out)"
    : "Maximum Marginal Rate Risk (Multiple Trusts in Will)";

  // ==========================================
  // COPY-PASTE TEMPLATE HANDLERS
  // ==========================================
  const copySpendthriftToClipboard = () => {
    const text = `CLAUSE [X]: DISCRETIONARY SPENDTHRIFT AND PROTECTIVE TESTAMENTARY TRUST
(Under Sections 5, 6 & 9 of the Indian Trusts Act, 1882; Avoiding Absolute Vesting under Section 138 of the Indian Succession Act, 1925)

1. CREATION OF SOLE TESTAMENTARY TRUST & VESTING IN TRUSTEES:
I intentionally make NO absolute bequest of the assets listed in Schedule [A] hereto to my son/daughter, [Full Name of Indebted Beneficiary], residing at [Address] (hereinafter referred to as the "Primary Beneficiary"). Instead, I devise, bequeath, and vest all legal title, ownership, and control over the said Schedule [A] properties, bank deposits, and investments (the "Trust Corpus") absolutely in my Trustees named hereunder, TO HOLD upon a purely discretionary protective trust under Sections 5, 6, and 9 of the Indian Trusts Act, 1882, to be known as the "[Family Surname] Family Protective Trust". I declare that this Trust is the sole and only trust declared by this my Will for purposes of Proviso (ii) to Section 164(1) of the Income Tax Act, 1961.

2. APPOINTMENT OF INDEPENDENT TRUSTEES:
I appoint (1) [Full Name of Trustee 1, e.g., Spouse / Unindebted Sibling], residing at [Address], and (2) [Full Name of Trustee 2, e.g., Independent Relative / Chartered Accountant], residing at [Address], as Joint Trustees ("Trustees"). Under no circumstances shall the Primary Beneficiary act as sole Trustee or exercise any unilateral power over Trust bank accounts or capital.

3. CLASS OF BENEFICIARIES & NO VESTED PROPRIETARY INTEREST:
The discretionary class of beneficiaries ("Beneficiary Class") shall consist of:
(a) My said son/daughter, [Name of Primary Beneficiary];
(b) The lawfully wedded spouse of the Primary Beneficiary, [Spouse Name]; and
(c) The lineal descendants (children) of the Primary Beneficiary, born or in the womb at my demise.

4. PURE DISCRETION & SPENDTHRIFT PROTECTION (NON-ALIENABLE):
No member of the Beneficiary Class, and in particular the Primary Beneficiary, shall hold any fixed, vested, determinable, or enforceable share, title, or disposing power in the Trust Corpus or its undistributed income. Until my Trustees affirmatively resolve in writing to apply a specific sum, the Primary Beneficiary holds only a bare hope to be considered. Consistent with Section 58 of the Indian Trusts Act, 1882 and Section 60 of the Code of Civil Procedure, 1908, no beneficiary shall have any power to sell, mortgage, pledge, anticipate, charge, or assign any interest in the Trust Corpus or future income, nor shall the Trust Corpus be liable to attachment, execution, garnishment, or seizure by any creditor, bank, decree-holder, or insolvency receiver of any beneficiary.

5. REMAINDER GIFT-OVER UPON TERMINATION:
Upon the demise of the Primary Beneficiary (or upon unanimous written resolution of the Trustees after all personal debts and insolvency proceedings against the Primary Beneficiary stand legally discharged for at least three continuous years), the Trustees shall distribute the remaining Trust Corpus outright in equal shares to [Names of Grandchildren / Remainder Beneficiaries], failing whom to [Fallback Heir / Registered Charity].`;
    navigator.clipboard.writeText(text);
    setCopiedSpendthrift(true);
    setTimeout(() => setCopiedSpendthrift(false), 3000);
  };

  const copyStipendToClipboard = () => {
    const text = `SUB-CLAUSE [X.A]: DISCRETIONARY MONTHLY STIPEND RULE & INSOLVENCY ATTACHMENT BAR

1. DISCRETIONARY MONTHLY MAINTENANCE STIPEND & DIRECT VENDOR PAYMENT RULE:
My Trustees may, in their absolute and uncontrolled discretion, apply such portion of the net annual income (and, if income is insufficient for urgent medical care, up to [10%] of Trust Corpus per year) solely for the personal maintenance, shelter, medical treatment, food, and household support of the Primary Beneficiary and the Beneficiary Class. To preserve immunity under Section 60(1) and Proviso (n) of the Code of Civil Procedure, 1908 and avoid bank garnishment:
(a) DIRECT VENDOR PAYMENTS: Trustees are expressly authorized and encouraged to discharge residential rent, electricity and utility bills, hospital and pharmacy expenses, health insurance premiums, grocery vouchers, and school or college tuition fees of the Primary Beneficiary's children directly to the landlord, hospital, school, or service provider, rather than transferring lump-sum cash into any personal bank account held by the Primary Beneficiary.
(b) MODEST SUBSISTENCE STIPEND: Any direct monthly maintenance allowance paid to the Primary Beneficiary shall be strictly earmarked as a non-transferable right to current maintenance and sustenance, capped at a modest subsistence ceiling determined quarterly by the Trustees.

2. AUTOMATIC INSOLVENCY ATTACHMENT BAR & PROTECTIVE SHIFT-OVER CLAUSE:
If at any time during the Trust Term:
(i) any creditor, bank, financial institution, Recovery Officer, Debt Recovery Tribunal (DRT), or Civil Court serves any warrant of attachment, prohibitory order, or garnishee notice under Order 21 CPC against any benefit intended for the Primary Beneficiary; or
(ii) an insolvency petition or personal guarantor resolution process under the Insolvency and Bankruptcy Code, 2016 (IBC) is admitted against the Primary Beneficiary; or
(iii) the Primary Beneficiary attempts to charge, mortgage, assign, or transfer any future expectation under this Trust;
THEN, automatically and without need for formal notice, any discretionary allocation in favor of the Primary Beneficiary individually shall stand immediately SUSPENDED. During the entire period of such attachment, insolvency, or attempted alienation, the Trustees shall hold and apply all Trust income exclusively for the direct housing, education, medical care, and maintenance of the Primary Beneficiary's spouse and children (or other unindebted members of the Beneficiary Class), and may pay basic survival expenses directly to third-party essential vendors on behalf of the family unit so that no rupee becomes attachable by creditors or vests in an Insolvency Resolution Professional.`;
    navigator.clipboard.writeText(text);
    setCopiedStipend(true);
    setTimeout(() => setCopiedStipend(false), 3000);
  };

  const copyTrusteePowersToClipboard = () => {
    const text = `SUB-CLAUSE [X.B]: TRUSTEE POWERS DRAFT & FIDUCIARY ADMINISTRATION SCHEDULE

My Trustees shall possess the following express powers in administering the Spendthrift Protective Trust:
1. CUSTODY, INVESTMENT & PROPERTY MANAGEMENT: To retain immovable properties in specie, execute leave and license or residential leases (without transferring title to any beneficiary), invest surplus funds in sovereign bonds, mutual funds, or bank fixed deposits in the dedicated Trust PAN and bank account, and repair or insure Trust properties.
2. POWER TO ALLOW RENT-FREE FAMILY RESIDENCE: To permit the Primary Beneficiary and their spouse and minor children to reside in any residential flat owned by the Trust strictly as a revocable personal licensee at the pleasure of the Trustees, with zero transferable tenancy, leasehold, or ownership rights capable of attachment under Section 60 CPC.
3. POWER TO REFUSE CREDITOR OR BENEFICIARY DEMANDS: To reject any demand by the Primary Beneficiary, any spouse, or any third-party creditor or liquidator for capital release, early termination, or fixed income payouts.
4. TAX COMPLIANCE (SECTION 164(1)(ii) INCOME TAX ACT): To obtain a separate Trust PAN, maintain audited annual books of account, file annual Income Tax Returns as representative assessee under Sections 160 to 164 of the Income Tax Act, 1961 claiming sole testamentary trust slab-rate treatment under Proviso (ii) to Section 164(1), and deduct tax dues from Trust income before applying maintenance funds.
5. SUCCESSOR TRUSTEE APPOINTMENT & INDEMNITY: Any retiring or surviving Trustee may by registered deed appoint an independent replacement Trustee so that at least two unindebted Trustees act at all times. Trustees acting in good faith shall be fully indemnified out of the Trust Corpus for legal costs incurred in defending the Trust against third-party creditor attachment suits.`;
    navigator.clipboard.writeText(text);
    setCopiedTrusteePowers(true);
    setTimeout(() => setCopiedTrusteePowers(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const text = `SPENDTHRIFT TRUST WILL CLAUSE CHECKLIST (INDIA):
1. Confirm assets placed in trust are self-acquired or testator's own Sec 30 HSA share
2. Declare ONLY ONE discretionary trust in the entire Will (Sec 164(1)(ii) tax shield)
3. Vest legal title in 2 unindebted Trustees (never the indebted beneficiary alone)
4. Avoid absolute bequest language to prevent Section 138 ISA invalidation
5. Include Direct Vendor Payment power + Insolvency Attachment Bar shift-over rule
6. Execute Will with 2 independent adult witnesses (Section 63 ISA)
7. Attach Doctor Sound Mind Certificate and consider Book 3 SRO registration`;
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
            <span>INDIAN TRUSTS ACT, 1882 SS. 6 &amp; 9 • ISA S. 138 • CPC S. 60</span>
          </div>

          {/* Strict H1 Tag (58 chars, 0 em-dashes, distinct from Page Title) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Spendthrift Trust Clause in Will Format: India Legal Guide
          </h1>

          {/* Subtitle Paragraph (Plain language, active voice, answers user demand signal) */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Does your son have heavy business debts or pending lawsuits? Leaving property directly lets creditors
            seize it. Download our spendthrift trust clause format to shield your family estate legally.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#creditor-proof-spendthrift-clause"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get Spendthrift Trust Clause</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/start"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Creditor-Proof Will</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sections 6 &amp; 9</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                INDIAN TRUSTS ACT, 1882
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 138</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ISA REPUGNANCY BYPASS
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 60 CPC</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                CREDITOR ATTACHMENT SHIELD
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sec 164(1)(ii)</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SOLE WILL TRUST TAX RULE
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
                <span>Trust Law Desk</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Covers Indian Trusts Act 1882 ss. 5, 6, 9, 58, 59, Indian Succession Act 1925 s. 138, CPC s. 60, and
                Income Tax Act s. 164(1)(ii).
              </p>
            </div>

            {/* Quick Trap Alert */}
            <div className="bg-rose-50/80 rounded-2xl border border-rose-200/90 p-4 text-xs text-rose-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#C65378]">
                <AlertTriangle className="w-4 h-4 text-[#C65378]" />
                <span>Post-Distribution Trap</span>
              </div>
              <p className="leading-relaxed text-[11px] text-rose-900">
                Never send lump-sum cash to your son&apos;s attached bank account. Have Trustees pay rent, school fees,
                and hospital bills directly to vendors.
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
                <span>EXECUTIVE BRIEF: CREDITOR-PROOF WILL TRUST RULES</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 138 ISA Trap:</strong> A direct gift in a Will with a &quot;do not sell&quot; line
                    is void. Your son takes full title, and creditors can seize the house.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 6 &amp; 9 Trusts Act Shield:</strong> Vesting title in independent Trustees on a
                    discretionary trust gives your son zero attachable property rights.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Direct Vendor Stipend Rule:</strong> Paying rent, healthcare, and school fees directly keeps
                    funds away from CPC Section 60 bank attachment orders.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 164(1)(ii) Tax Relief:</strong> Creating only one trust inside your Will lets the
                    trust pay normal individual slab tax rates instead of top peak rates.
                  </span>
                </li>
              </ul>
            </div>

            {/* EDITORIAL BANNER IMAGE CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="relative aspect-[16/9] w-full bg-slate-900">
                <Image
                  src="/images/spendthrift-trust-protective-clause-will-format-og.jpg"
                  alt="Spendthrift Trust Clause Format for Indian Wills under Indian Trusts Act 1882"
                  width={1200}
                  height={675}
                  priority
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                />
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
                <span className="font-semibold text-slate-700">
                  Asset Protection Series: Spendthrift &amp; Discretionary Will Trust Formats
                </span>
                <span className="text-[11px] font-mono text-[#C65378] font-bold">
                  UPDATED FOR 2026 TRUST &amp; IBC RULES
                </span>
              </div>
            </div>

            {/* SECTION 1: STATUTORY FRAMEWORK (THE SINGLE H2 ON THIS PAGE) */}
            <section id="statutory-framework" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Spendthrift Trust Clause: Section 138 ISA &amp; Trusts Act
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  Parents often ask a painful question on Indian legal forums: &quot;My son has massive business debts.
                  If I leave him my house or money directly, his creditors will seize it. How can I protect his
                  inheritance?&quot;
                </p>
                <p>
                  Many Indian blogs share bad advice. They tell parents to gift the house to the son and add a line
                  saying he cannot sell it or pay debts with it. Under Indian law, that simple trick fails completely.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                    Why Simple Restrictions Fail: Section 138 of the Indian Succession Act, 1925
                  </div>
                  <p className="text-xs text-slate-700">
                    When a Will gives property or cash &quot;absolutely&quot; to a person, any later line trying to
                    limit how he spends or uses it is void. The son takes full ownership free of those rules. Once he
                    owns the asset, creditors can attach and sell it under Section 60 of the Code of Civil Procedure.
                  </p>
                </div>
                <p>
                  A <strong>spendthrift trust clause</strong> fixes this legal gap cleanly. Under Sections 5, 6, and 9
                  of the <strong>Indian Trusts Act, 1882</strong>, your Will can create a{" "}
                  <strong>discretionary protective trust</strong>. Legal ownership passes to independent Trustees, not
                  to your indebted son.
                </p>
                <p>
                  Because your son never receives an absolute gift, Section 138 of the Indian Succession Act never
                  applies. The Trustees hold total power over whether and how much income to spend on his family&apos;s
                  needs. Without a fixed share to claim, banks and recovery agents have nothing legal to attach.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE SPENDTHRIFT PROTECTION ANALYZER */}
            <section id="spendthrift-protection-analyzer" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>DIAGNOSTIC &amp; STRUCTURING TOOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Spendthrift Trust &amp; Attachment Risk Tool
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Test your family Will plan against creditor claims, Section 60 CPC attachment, and Section 164 tax
                rules.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Select 1: Debt Risk */}
                  <div className="space-y-2">
                    <label
                      htmlFor="debt-scenario-select"
                      className="text-xs font-bold text-slate-800 uppercase tracking-wider block"
                    >
                      Beneficiary Debt or Risk Profile:
                    </label>
                    <select
                      id="debt-scenario-select"
                      value={debtScenario}
                      onChange={(e) => setDebtScenario(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="business_debt">Son/Daughter Has Business Loans or Personal Guarantees</option>
                      <option value="pending_lawsuit">Pending Civil Decree, DRT, or IBC Notice</option>
                      <option value="spendthrift_habit">Compulsive Spending or Matrimonial Risk</option>
                      <option value="self_settled_debt">Debtor Wants to Shield Their Own Present Assets</option>
                    </select>
                  </div>

                  {/* Select 2: Property Source */}
                  <div className="space-y-2">
                    <label
                      htmlFor="asset-nature-select"
                      className="text-xs font-bold text-slate-800 uppercase tracking-wider block"
                    >
                      Source of Assets Entering the Trust:
                    </label>
                    <select
                      id="asset-nature-select"
                      value={assetNature}
                      onChange={(e) => setAssetNature(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="self_acquired">Parent&apos;s Self-Acquired Flat, Plot, Shares, or Cash</option>
                      <option value="huf_coparcenary">Undivided Coparcenary Share (Sec 30 HSA)</option>
                      <option value="business_equity">Private Limited Family Business Shares</option>
                    </select>
                  </div>

                  {/* Select 3: Payout Method */}
                  <div className="space-y-2">
                    <label
                      htmlFor="payout-method-select"
                      className="text-xs font-bold text-slate-800 uppercase tracking-wider block"
                    >
                      How Trustees Support the Beneficiary:
                    </label>
                    <select
                      id="payout-method-select"
                      value={payoutMethod}
                      onChange={(e) => setPayoutMethod(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="vendor_direct">Direct Payment to Landlord, Hospital &amp; School</option>
                      <option value="modest_stipend">Modest Monthly Maintenance Stipend (Sec 60(1)(n))</option>
                      <option value="lump_sum_bank">Fixed Cash Transfers to Son&apos;s Personal Bank</option>
                    </select>
                  </div>

                  {/* Select 4: Trustee Setup */}
                  <div className="space-y-2">
                    <label
                      htmlFor="trustee-setup-select"
                      className="text-xs font-bold text-slate-800 uppercase tracking-wider block"
                    >
                      Who Holds Legal Control as Trustee:
                    </label>
                    <select
                      id="trustee-setup-select"
                      value={trusteeSetup}
                      onChange={(e) => setTrusteeSetup(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="independent_dual">Unindebted Spouse + Independent Co-Trustee</option>
                      <option value="single_relative">Single Debt-Free Sibling or Relative</option>
                      <option value="debtor_sole">Indebted Son Appointed as Sole Trustee</option>
                    </select>
                  </div>
                </div>

                {/* Toggle: Sole Trust in Will */}
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    How Many Trusts Will Your Will Create? (Income Tax Sec 164(1)(ii) Check)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSingleTrustInWill(true)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-colors ${
                        singleTrustInWill
                          ? "bg-[#C65378] text-white border-[#C65378]"
                          : "bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      Only One Trust in This Will (Tax Slab Relief)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSingleTrustInWill(false)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-colors ${
                        !singleTrustInWill
                          ? "bg-[#C65378] text-white border-[#C65378]"
                          : "bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      Two or More Trusts in Same Will
                    </button>
                  </div>
                </div>

                {/* Computed Diagnostic Output */}
                <div className="rounded-2xl border border-slate-200 p-5 bg-gradient-to-br from-slate-50 via-white to-rose-50/40 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      {isSafeStructure ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                      <span className={`font-extrabold text-sm ${shieldColor}`}>{shieldRating}</span>
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-200 text-slate-800">
                      {primaryRule}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">{diagnosticAdvice}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Creditor Attachment Shield</div>
                      <div className={`text-sm font-black mt-0.5 ${shieldColor}`}>
                        {isSafeStructure ? "Corpus Protected" : "High Seizure Risk"}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Income Tax Treatment</div>
                      <div className="text-xs font-bold text-slate-900 mt-0.5">{taxStatusText}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Next Drafting Step</div>
                      <div className="text-xs font-bold text-[#C65378] mt-0.5">
                        {isSafeStructure ? "Use Clauses 1, 2 & 3 Below" : "Fix Trustee / Payout Selection"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: DIRECT GIFT VS FIXED TRUST VS SPENDTHRIFT TRUST */}
            <section id="absolute-vs-spendthrift-trust" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LEGAL STRUCTURE COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Direct Gift vs Fixed Trust vs Spendthrift Trust
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Many people confuse a fixed family trust with a true discretionary spendthrift trust. Only a pure
                discretionary trust removes attachable ownership from a debt-burdened child.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-1/4">Legal Feature</th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-1/4 text-slate-300">
                        Direct Gift in Will
                      </th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-1/4 text-slate-300">
                        Fixed Share Trust
                      </th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-1/4 text-rose-200">
                        Spendthrift Discretionary Trust
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Governing Statute</td>
                      <td className="p-3.5">Sec 138 Indian Succession Act; Sec 10 TPA</td>
                      <td className="p-3.5">Sec 58 Indian Trusts Act (determinate share)</td>
                      <td className="p-3.5 font-semibold text-[#172228]">
                        Secs 5, 6 &amp; 9 Indian Trusts Act, 1882
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Son&apos;s Legal Right</td>
                      <td className="p-3.5">Full ownership; restrictions are void</td>
                      <td className="p-3.5">Fixed right to demand his exact share</td>
                      <td className="p-3.5 font-semibold text-[#172228]">
                        Zero fixed claim; only a hope to be considered
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Section 60 CPC Risk</td>
                      <td className="p-3.5 text-rose-700 font-bold">100% Attachable by Creditors</td>
                      <td className="p-3.5 text-amber-700 font-bold">Beneficial Interest Can Be Seized</td>
                      <td className="p-3.5 text-emerald-800 font-bold">Corpus &amp; Undistributed Income Immune</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Insolvency / IBC Reach</td>
                      <td className="p-3.5">Vests in Insolvency Resolution Professional</td>
                      <td className="p-3.5">Fixed share vests in insolvency estate</td>
                      <td className="p-3.5 font-semibold text-[#172228]">
                        Shift-over clause redirects support to family
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Income Tax Rule</td>
                      <td className="p-3.5">Taxed in son&apos;s hands at slab rates</td>
                      <td className="p-3.5">Representative assessee at beneficiary rate</td>
                      <td className="p-3.5 font-semibold text-[#172228]">
                        Individual slab rates if sole trust in Will (Sec 164(1)(ii))
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: CPC SECTION 60 IMMUNITY TABLE (MANDATORY COMPONENT) */}
            <section id="cpc-section-60-immunity-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Shield className="w-4 h-4" />
                <span>CREDITOR ATTACHMENT IMMUNITY MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. CPC Section 60 Immunity Table: Creditor Limits
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Section 60(1) of the Code of Civil Procedure, 1908 lets decree-holders attach property held in trust for
                a debtor if the debtor holds a saleable right or disposing power. Here is what stays immune versus what
                creditors can grab:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-1/4">
                        Asset or Payout Layer
                      </th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-1/4 text-slate-300">
                        Governing Law / Precedent
                      </th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-1/6 text-rose-200">
                        CPC Sec 60 Status
                      </th>
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-1/3 text-slate-200">
                        Practical Legal Reason
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Undistributed Trust Capital Corpus</td>
                      <td className="p-3.5">Sec 60(1) CPC; Sec 6 Indian Trusts Act</td>
                      <td className="p-3.5 text-emerald-700 font-extrabold">Immune</td>
                      <td className="p-3.5">
                        Legal title belongs to Trustees. Beneficiary has zero disposing power over trust capital.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Unallocated Discretionary Income</td>
                      <td className="p-3.5">Sec 60(1) CPC; CWT v. Nizam&apos;s Family Trust</td>
                      <td className="p-3.5 text-emerald-700 font-extrabold">Immune</td>
                      <td className="p-3.5">
                        Beneficiary holds only a mere expectancy, not a fixed, saleable, or enforceable debt.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Direct Vendor Payments (Rent, Fees, Hospital)</td>
                      <td className="p-3.5">Discretionary Trustee Payment Power</td>
                      <td className="p-3.5 text-emerald-700 font-extrabold">Immune</td>
                      <td className="p-3.5">
                        Money moves from the Trust bank account straight to the landlord, school, or hospital.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Right to Future Maintenance Stipend</td>
                      <td className="p-3.5">Proviso (n) to Section 60(1) CPC</td>
                      <td className="p-3.5 text-emerald-700 font-extrabold">Statutorily Exempt</td>
                      <td className="p-3.5">
                        A pure right to future maintenance cannot be attached or sold in execution of any decree.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Cash Wired to Debtor&apos;s Bank Account</td>
                      <td className="p-3.5">Order 21 Rule 46 CPC (Garnishee Order)</td>
                      <td className="p-3.5 text-rose-700 font-extrabold">Attachable</td>
                      <td className="p-3.5">
                        Once cash hits the debtor&apos;s personal bank balance, trust immunity ends and banks can
                        freeze it.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Self-Settled Trust by Debtor Himself</td>
                      <td className="p-3.5">Sec 53 Transfer of Property Act; IBC 2016</td>
                      <td className="p-3.5 text-rose-700 font-extrabold">Voidable</td>
                      <td className="p-3.5">
                        Debtors cannot hide their own assets from existing creditors. Only parents can shield their own
                        estate.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 5: CREDITOR-PROOF SPENDTHRIFT TRUST CLAUSE (MANDATORY TEMPLATE BOX) */}
            <section id="creditor-proof-spendthrift-clause" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>CREDITOR-PROOF TEMPLATE BOX 1</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Creditor-Proof Spendthrift Trust Clause Format
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Insert this core clause directly into your Will instead of making an outright gift. Replace the bracketed
                placeholders with your family&apos;s exact names, addresses, and Schedule of self-acquired assets.
              </p>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900">
                    Spendthrift Trust Will Clause (Indian Trusts Act ss. 5, 6 &amp; 9)
                  </div>
                  <button
                    type="button"
                    onClick={copySpendthriftToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                  >
                    {copiedSpendthrift ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
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
{`CLAUSE [X]: DISCRETIONARY SPENDTHRIFT AND PROTECTIVE TESTAMENTARY TRUST
(Under Sections 5, 6 & 9 of the Indian Trusts Act, 1882; Avoiding Absolute Vesting under Section 138 of the Indian Succession Act, 1925)

1. CREATION OF SOLE TESTAMENTARY TRUST & VESTING IN TRUSTEES:
I intentionally make NO absolute bequest of the assets listed in Schedule [A] hereto to my son/daughter, [Full Name of Indebted Beneficiary], residing at [Address] (hereinafter referred to as the "Primary Beneficiary"). Instead, I devise, bequeath, and vest all legal title, ownership, and control over the said Schedule [A] properties, bank deposits, and investments (the "Trust Corpus") absolutely in my Trustees named hereunder, TO HOLD upon a purely discretionary protective trust under Sections 5, 6, and 9 of the Indian Trusts Act, 1882, to be known as the "[Family Surname] Family Protective Trust". I declare that this Trust is the sole and only trust declared by this my Will for purposes of Proviso (ii) to Section 164(1) of the Income Tax Act, 1961.

2. APPOINTMENT OF INDEPENDENT TRUSTEES:
I appoint (1) [Full Name of Trustee 1, e.g., Spouse / Unindebted Sibling], residing at [Address], and (2) [Full Name of Trustee 2, e.g., Independent Relative / Chartered Accountant], residing at [Address], as Joint Trustees ("Trustees"). Under no circumstances shall the Primary Beneficiary act as sole Trustee or exercise any unilateral power over Trust bank accounts or capital.

3. CLASS OF BENEFICIARIES & NO VESTED PROPRIETARY INTEREST:
The discretionary class of beneficiaries ("Beneficiary Class") shall consist of:
(a) My said son/daughter, [Name of Primary Beneficiary];
(b) The lawfully wedded spouse of the Primary Beneficiary, [Spouse Name]; and
(c) The lineal descendants (children) of the Primary Beneficiary, born or in the womb at my demise.

4. PURE DISCRETION & SPENDTHRIFT PROTECTION (NON-ALIENABLE):
No member of the Beneficiary Class, and in particular the Primary Beneficiary, shall hold any fixed, vested, determinable, or enforceable share, title, or disposing power in the Trust Corpus or its undistributed income. Until my Trustees affirmatively resolve in writing to apply a specific sum, the Primary Beneficiary holds only a bare hope to be considered. Consistent with Section 58 of the Indian Trusts Act, 1882 and Section 60 of the Code of Civil Procedure, 1908, no beneficiary shall have any power to sell, mortgage, pledge, anticipate, charge, or assign any interest in the Trust Corpus or future income, nor shall the Trust Corpus be liable to attachment, execution, garnishment, or seizure by any creditor, bank, decree-holder, or insolvency receiver of any beneficiary.

5. REMAINDER GIFT-OVER UPON TERMINATION:
Upon the demise of the Primary Beneficiary (or upon unanimous written resolution of the Trustees after all personal debts and insolvency proceedings against the Primary Beneficiary stand legally discharged for at least three continuous years), the Trustees shall distribute the remaining Trust Corpus outright in equal shares to [Names of Grandchildren / Remainder Beneficiaries], failing whom to [Fallback Heir / Registered Charity].`}
                </pre>
              </div>
            </section>

            {/* SECTION 6: DISCRETIONARY MONTHLY STIPEND RULE + INSOLVENCY ATTACHMENT BAR */}
            <section id="discretionary-stipend-insolvency-bar" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Lock className="w-4 h-4" />
                <span>CREDITOR-PROOF TEMPLATE BOX 2</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Discretionary Monthly Stipend &amp; Insolvency Bar Format
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                This companion sub-clause solves two tough real-world problems: paying living expenses without triggering
                bank account garnishment, and automatically cutting off payouts if a creditor or insolvency court moves
                to attach benefits.
              </p>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900">
                    Discretionary Monthly Stipend Rule + Insolvency Attachment Bar
                  </div>
                  <button
                    type="button"
                    onClick={copyStipendToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                  >
                    {copiedStipend ? (
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
{`SUB-CLAUSE [X.A]: DISCRETIONARY MONTHLY STIPEND RULE & INSOLVENCY ATTACHMENT BAR

1. DISCRETIONARY MONTHLY MAINTENANCE STIPEND & DIRECT VENDOR PAYMENT RULE:
My Trustees may, in their absolute and uncontrolled discretion, apply such portion of the net annual income (and, if income is insufficient for urgent medical care, up to [10%] of Trust Corpus per year) solely for the personal maintenance, shelter, medical treatment, food, and household support of the Primary Beneficiary and the Beneficiary Class. To preserve immunity under Section 60(1) and Proviso (n) of the Code of Civil Procedure, 1908 and avoid bank garnishment:
(a) DIRECT VENDOR PAYMENTS: Trustees are expressly authorized and encouraged to discharge residential rent, electricity and utility bills, hospital and pharmacy expenses, health insurance premiums, grocery vouchers, and school or college tuition fees of the Primary Beneficiary's children directly to the landlord, hospital, school, or service provider, rather than transferring lump-sum cash into any personal bank account held by the Primary Beneficiary.
(b) MODEST SUBSISTENCE STIPEND: Any direct monthly maintenance allowance paid to the Primary Beneficiary shall be strictly earmarked as a non-transferable right to current maintenance and sustenance, capped at a modest subsistence ceiling determined quarterly by the Trustees.

2. AUTOMATIC INSOLVENCY ATTACHMENT BAR & PROTECTIVE SHIFT-OVER CLAUSE:
If at any time during the Trust Term:
(i) any creditor, bank, financial institution, Recovery Officer, Debt Recovery Tribunal (DRT), or Civil Court serves any warrant of attachment, prohibitory order, or garnishee notice under Order 21 CPC against any benefit intended for the Primary Beneficiary; or
(ii) an insolvency petition or personal guarantor resolution process under the Insolvency and Bankruptcy Code, 2016 (IBC) is admitted against the Primary Beneficiary; or
(iii) the Primary Beneficiary attempts to charge, mortgage, assign, or transfer any future expectation under this Trust;
THEN, automatically and without need for formal notice, any discretionary allocation in favor of the Primary Beneficiary individually shall stand immediately SUSPENDED. During the entire period of such attachment, insolvency, or attempted alienation, the Trustees shall hold and apply all Trust income exclusively for the direct housing, education, medical care, and maintenance of the Primary Beneficiary's spouse and children (or other unindebted members of the Beneficiary Class), and may pay basic survival expenses directly to third-party essential vendors on behalf of the family unit so that no rupee becomes attachable by creditors or vests in an Insolvency Resolution Professional.`}
                </pre>
              </div>
            </section>

            {/* SECTION 7: TRUSTEE POWERS DRAFT (MANDATORY COMPONENT) */}
            <section id="trustee-powers-draft" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>FIDUCIARY ADMINISTRATION DRAFT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Trustee Powers Draft &amp; Fiduciary Safeguard Rules
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A spendthrift trust fails if Trustees lack clear written powers to hold property, let the family stay in
                the house as mere licensees, reject creditor demands, and file Trust tax returns.
              </p>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900">
                    Trustee Powers Draft &amp; Successor Safeguard Schedule
                  </div>
                  <button
                    type="button"
                    onClick={copyTrusteePowersToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                  >
                    {copiedTrusteePowers ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Powers</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`SUB-CLAUSE [X.B]: TRUSTEE POWERS DRAFT & FIDUCIARY ADMINISTRATION SCHEDULE

My Trustees shall possess the following express powers in administering the Spendthrift Protective Trust:
1. CUSTODY, INVESTMENT & PROPERTY MANAGEMENT: To retain immovable properties in specie, execute leave and license or residential leases (without transferring title to any beneficiary), invest surplus funds in sovereign bonds, mutual funds, or bank fixed deposits in the dedicated Trust PAN and bank account, and repair or insure Trust properties.
2. POWER TO ALLOW RENT-FREE FAMILY RESIDENCE: To permit the Primary Beneficiary and their spouse and minor children to reside in any residential flat owned by the Trust strictly as a revocable personal licensee at the pleasure of the Trustees, with zero transferable tenancy, leasehold, or ownership rights capable of attachment under Section 60 CPC.
3. POWER TO REFUSE CREDITOR OR BENEFICIARY DEMANDS: To reject any demand by the Primary Beneficiary, any spouse, or any third-party creditor or liquidator for capital release, early termination, or fixed income payouts.
4. TAX COMPLIANCE (SECTION 164(1)(ii) INCOME TAX ACT): To obtain a separate Trust PAN, maintain audited annual books of account, file annual Income Tax Returns as representative assessee under Sections 160 to 164 of the Income Tax Act, 1961 claiming sole testamentary trust slab-rate treatment under Proviso (ii) to Section 164(1), and deduct tax dues from Trust income before applying maintenance funds.
5. SUCCESSOR TRUSTEE APPOINTMENT & INDEMNITY: Any retiring or surviving Trustee may by registered deed appoint an independent replacement Trustee so that at least two unindebted Trustees act at all times. Trustees acting in good faith shall be fully indemnified out of the Trust Corpus for legal costs incurred in defending the Trust against third-party creditor attachment suits.`}
                </pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-1">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm pb-1 border-b border-slate-100 flex items-center justify-between">
                    <span>Best Choice: Dual Family</span>
                    <span className="text-[10px] text-emerald-700 font-bold">Ideal</span>
                  </div>
                  <p className="text-slate-600">
                    Appoint your surviving spouse plus an unindebted sister, brother, or family Chartered Accountant. Dual
                    signing blocks undue pressure from the indebted son.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm pb-1 border-b border-slate-100 flex items-center justify-between">
                    <span>Corporate Co-Trustee</span>
                    <span className="text-[10px] text-[#C65378] font-bold">HNI Estates</span>
                  </div>
                  <p className="text-slate-600">
                    For estates above Rs. 5 Crore, pair a family member with a SEBI-registered private trustee company for
                    long-term neutral oversight.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm pb-1 border-b border-slate-100 flex items-center justify-between">
                    <span>Never Sole Indebted Heir</span>
                    <span className="text-[10px] text-rose-600 font-bold">Fatal Flaw</span>
                  </div>
                  <p className="text-slate-600">
                    If the debt-burdened son is named sole trustee, courts treat control and benefit as merged, opening
                    assets to creditors under Section 60 CPC.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 8: TRANSFER ACT LIMITS & INCOME TAX SECTION 164(1)(ii) */}
            <section id="section-12-tpa-and-tax-rules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>PROPERTY &amp; TAX LAW GUARDRAILS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Transfer Act Limits &amp; Section 164(1)(ii) Tax Shield
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-xs">
                      1. Sections 10 &amp; 12, Transfer of Property Act, 1882 (Why Determinable Gifts Fail)
                    </div>
                    <p className="text-xs text-slate-600">
                      Section 12 of the Transfer of Property Act voids any rule that takes away a vested interest when a
                      recipient goes bankrupt. That is why our spendthrift clause never gives a vested share at all. By
                      using a pure discretionary class trust from day one, no vested interest exists for Section 12 to
                      strike down.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-xs">
                      2. Proviso (ii) to Section 164(1), Income Tax Act, 1961 (Slab Rate Exception)
                    </div>
                    <p className="text-xs text-slate-600">
                      Normally, a discretionary trust pays the Maximum Marginal Rate of income tax (over 39% to 42%).
                      However, Proviso (ii) to Section 164(1) makes a huge exception. If the trust is created by a
                      Will and is the <strong>only trust</strong> declared in that Will, it is taxed at normal
                      individual slab rates.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-xs">
                      3. Section 53 TPA &amp; IBC Clawback Limit (Parents Only, Never Self-Settled)
                    </div>
                    <p className="text-xs text-slate-600">
                      Parents can safely place their own self-acquired property into a testamentary spendthrift trust
                      for a debt-burdened child. However, the debtor cannot shift their own existing assets into a trust
                      to dodge unpaid banks. Courts undo self-settled fraudulent transfers under Section 53 TPA and
                      the Insolvency and Bankruptcy Code, 2016.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-execution-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>PRACTICAL EXECUTION ROADMAP</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Adding a Spendthrift Trust Clause
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Separate Self-Acquired Assets</div>
                    <p className="text-slate-600 mt-0.5">
                      List only self-acquired flats, plots, shares, and fixed deposits, plus your own undivided Section
                      30 Hindu Succession Act share.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Keep Only One Trust in the Will</div>
                    <p className="text-slate-600 mt-0.5">
                      Ensure your Will declares only one testamentary trust so the family keeps the Section 164(1)(ii)
                      slab-rate tax benefit.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Pick Two Debt-Free Trustees</div>
                    <p className="text-slate-600 mt-0.5">
                      Name your spouse and an independent relative or professional co-trustee, plus at least one backup
                      successor trustee.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Insert All Three Protective Clauses</div>
                    <p className="text-slate-600 mt-0.5">
                      Add the Spendthrift Trust Clause, Discretionary Monthly Stipend &amp; Insolvency Bar, and Trustee
                      Powers Schedule cleanly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                    5
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Sign Before Two Independent Witnesses</div>
                    <p className="text-slate-600 mt-0.5">
                      Sign every page of your Will before two adult witnesses who are not beneficiaries or married to any
                      beneficiary (Section 63 and 67 ISA).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                    6
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Register in Book 3 &amp; Attach Doctor Note</div>
                    <p className="text-slate-600 mt-0.5">
                      Register the Will in Book 3 at the Sub-Registrar Office with a doctor sound mind note. If your son
                      has active recovery suits now, ask an advocate about a living irrevocable family trust too.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: FOUR FATAL MISTAKES */}
            <section id="fatal-drafting-mistakes" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertCircle className="w-4 h-4" />
                <span>AVOID CREDITOR SEIZURE GAPS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Four Fatal Mistakes That Break Creditor Protection
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Leaving Property Directly With a Ban</span>
                  </div>
                  <p className="text-slate-600">
                    Saying &quot;My son gets my flat, but he cannot sell it&quot; is void under Section 138 ISA and
                    Section 10 TPA. Creditors still seize the flat.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Sending Cash to Attached Bank Accounts</span>
                  </div>
                  <p className="text-slate-600">
                    Once trust cash enters your son&apos;s personal bank account, bank creditors can freeze it under
                    Order 21 Rule 46 CPC. Use direct vendor payments instead.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Naming the Indebted Son Sole Trustee</span>
                  </div>
                  <p className="text-slate-600">
                    Making the debtor son sole trustee gives him full legal power over assets, letting courts treat them
                    as his own attachable property.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Creating Multiple Trusts in One Will</span>
                  </div>
                  <p className="text-slate-600">
                    Putting two or more discretionary trusts inside one Will breaks the Section 164(1)(ii) tax shield and
                    triggers top peak tax rates.
                  </p>
                </div>
              </div>
            </section>

            {/* MID-ARTICLE DUAL CONVERSION CTA & DIAGNOSTIC TOOLS */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-slate-900 to-[#172228] text-white space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-300 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#C65378]" />
                <span>DUAL ASSET PROTECTION &amp; WILL DRAFTING PATHWAYS</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold">
                Protect Family Inheritance Today: Choose Your Legal Pathway
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Need a clear registered Will with protective clauses, or an immediate inter-vivos Private Family Trust to
                ring-fence wealth during your lifetime? Pick the route that fits your family:
              </p>

              {/* Dual Conversion CTA Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <Link
                  href="/start"
                  className="p-4 rounded-2xl bg-[#C65378] hover:bg-[#a33b5c] text-white flex items-center justify-between transition-colors shadow-md"
                >
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-rose-100">
                      Pathway 1: Online Will
                    </div>
                    <div className="text-sm font-extrabold mt-0.5">Start Your Online Will Draft</div>
                  </div>
                  <ArrowRight className="w-5 h-5 shrink-0" />
                </Link>
                <Link
                  href="/services/private-family-trust-formation"
                  className="p-4 rounded-2xl bg-white text-[#172228] hover:bg-slate-100 flex items-center justify-between transition-colors shadow-md"
                >
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#C65378]">
                      Pathway 2: Advocate Trust Structuring
                    </div>
                    <div className="text-sm font-extrabold mt-0.5">Private Family Trust Formation</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#C65378] shrink-0" />
                </Link>
              </div>

              {/* Supporting Diagnostic Tools */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/10 text-xs font-bold">
                <Link
                  href="/tools/ancestral-vs-self-acquired-property-classifier"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-between transition-colors"
                >
                  <span>Ancestral vs Self-Acquired Tool</span>
                  <ArrowRight className="w-4 h-4 text-rose-300" />
                </Link>
                <Link
                  href="/tools/minor-child-testamentary-trust-corpus-calculator"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-between transition-colors"
                >
                  <span>Trust Corpus Calculator</span>
                  <ArrowRight className="w-4 h-4 text-rose-300" />
                </Link>
                <Link
                  href="/tools/will-validity-section-63-audit-checker"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-between transition-colors"
                >
                  <span>Section 63 Will Audit Tool</span>
                  <ArrowRight className="w-4 h-4 text-rose-300" />
                </Link>
              </div>
            </div>

            {/* SECTION 11: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Institutional Profile: Private Trust &amp; Estate Desk
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Private Trust &amp; Succession Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Checked Trust Counsel</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is powered by AMA Legal Solutions. Our trust and succession lawyers draft airtight
                  spendthrift testamentary trusts, private family trusts, and High Court asset protection plans across
                  India. We verify property title, align Section 164(1)(ii) tax rules, and support Sub-Registrar
                  registration in every state.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/private-family-trust-formation"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Private Family Trust Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/start"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Online Will Builder</span>
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

            {/* SECTION 12: FAQ ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>DIRECT ANSWERS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: Spendthrift Trusts
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

            {/* SECTION 13: GOVERNING STATUTES & OFFICIAL PORTALS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY CITATIONS &amp; OFFICIAL PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Governing Statutes, Case Law &amp; Official Portals
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs">
                <div className="space-y-2">
                  <div className="font-extrabold text-slate-900">Primary Indian Statutory Authorities:</div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      <strong>Indian Trusts Act, 1882 (Sections 5, 6, 9, 58 &amp; 59):</strong> Valid creation of a
                      testamentary trust by Will without lifetime transfer, beneficiary rules, and trust execution rights.
                    </li>
                    <li>
                      <strong>Indian Succession Act, 1925 (Sections 63 &amp; 138):</strong> Mandatory two-witness Will
                      attestation and why conditions on absolute gifts fail.
                    </li>
                    <li>
                      <strong>Code of Civil Procedure, 1908 (Section 60(1) &amp; Proviso (n)):</strong> Limits on
                      attaching discretionary trust property and immunity for a pure right to future maintenance.
                    </li>
                    <li>
                      <strong>Transfer of Property Act, 1882 (Sections 10, 12 &amp; 53):</strong> Rules against
                      restraints on sale, insolvency forfeiture on vested interests, and fraudulent transfer limits.
                    </li>
                    <li>
                      <strong>Income Tax Act, 1961 (Proviso (ii) to Section 164(1)):</strong> Individual slab-rate tax
                      exception for a sole discretionary trust created by a Will.
                    </li>
                    <li>
                      <strong>CWT v. Trustees of H.E.H. Nizam&apos;s Family Trust (1977) 3 SCC 362:</strong> Supreme
                      Court analysis confirming indeterminate beneficial rights in discretionary family trusts.
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-3">
                  <a
                    href="https://www.indiacode.nic.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Trusts &amp; Succession Acts</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.sci.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>Supreme Court of India Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.incometax.gov.in/iec/foportal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>Income Tax e-Filing Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Trust &amp; Protective Clause Formats
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/templates/special-needs-child-private-trust-clause-format"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Special Needs Child Trust Clause
                    </Link>
                    <Link
                      href="/templates/testamentary-trust-clause-minor-child-will-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Minor Child Trust Clause Format
                    </Link>
                    <Link
                      href="/templates/life-interest-clause-for-spouse-will-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Life Interest Clause for Spouse
                    </Link>
                    <Link
                      href="/templates/disinheritance-exclusion-clause-format-will"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Disinheritance Exclusion Clause
                    </Link>
                    <Link
                      href="/templates/codicil-to-registered-will-amendment-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Codicil to Registered Will Format
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* 3-CARD BOTTOM PLAIN-ENGLISH SUMMARY STRIP */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Use a Spendthrift Trust?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Direct gifts expose your hard-earned property to your child&apos;s business debts. A discretionary
                  trust keeps family homes and savings safe under independent Trustees while paying real living costs.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Simple Plain Paper Execution</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You can write a Will with a spendthrift trust clause on plain paper in India. Sign it in front of two
                  independent adult witnesses. Each witness signs in your clear view to meet Section 63 rules.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers at AMA Legal Solutions check your property titles and debt risks. We draft clean protective
                  Will clauses or set up a registered private family trust so your family wealth stays intact.
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
                  <div className="font-extrabold text-slate-900 text-sm">Advocate Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Estate &amp; Trust Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialist in Indian testamentary trusts, spendthrift asset protection, Section 60 CPC defense, and
                private family trust structuring across India.
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
              {/* CARD 2: DUAL CTA 1 - ONLINE WILL (/start) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>CREDITOR-PROOF WILL DRAFTING</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Draft Your Online Will With Protective Clauses
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Protect your family house and savings from debt claims. Build a Section 63 compliant Will online in
                  minutes.
                </p>
                <Link
                  href="/start"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Your Will Online</span>
                </Link>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Checked &amp; SRO Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - PRIVATE FAMILY TRUST FORMATION (/services/private-family-trust-formation) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Building2 className="w-3 h-3" />
                  <span>PRIVATE TRUST STRUCTURING</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need Immediate Lifetime Creditor Protection?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our lawyers structure custom discretionary family trusts under the Indian Trusts Act, 1882 with full
                  Sub-Registrar and tax compliance.
                </p>
                <Link
                  href="/services/private-family-trust-formation"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Explore Family Trust Service</span>
                </Link>
              </div>

              {/* CARD 4: DOCUMENT CHECKLIST CARD */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-[#C65378]" />
                    <span>Trust Will Checklist</span>
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
                    <span>Self-Acquired Asset Schedule</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>2 Debt-Free Joint Trustees</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Sole Trust Tax Clause (Sec 164)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Direct Vendor Payment Mandate</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>2 Witnesses + SRO Book 3 Filing</span>
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
