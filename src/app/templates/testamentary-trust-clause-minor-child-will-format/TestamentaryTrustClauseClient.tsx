"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ArrowRight,
  BookOpen,
  Scale,
  Building,
  UserCheck,
  Lock,
  PhoneCall,
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Landmark,
  Check,
  Building2,
  Info,
  DollarSign,
  Gavel,
  Calculator,
  Copy,
  CheckCheck,
  Sliders,
  Users,
  FileText,
  Layers,
  Globe,
  Coins,
  Heart,
  GraduationCap,
  ShieldAlert,
  Baby,
  CalendarCheck,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Section 5 Trusts Act Moat" },
  { id: "pitfalls-direct-inheritance", label: "2. Pitfall: Direct Minor Bequests" },
  { id: "comparison-table", label: "3. Direct vs Trust Comparison" },
  { id: "core-architecture", label: "4. Architecture of Minor Trust" },
  { id: "milestone-schedule", label: "5. Milestone Payouts: 18, 21, 25" },
  { id: "special-needs-trust", label: "6. Special Needs Child Safeguards" },
  { id: "spendthrift-protection", label: "7. Spendthrift Protection Clause" },
  { id: "ready-legal-clauses", label: "8. Ready-to-Use Legal Clauses" },
  { id: "step-by-step-sop", label: "9. Step-by-Step Execution SOP" },
  { id: "income-tax-treatment", label: "10. Income Tax & Representative Slabs" },
  { id: "practical-case-studies", label: "11. Real Indian Family Case Studies" },
  { id: "diagnostic-tool", label: "12. Interactive Diagnostic Tool" },
  { id: "trustee-checklist", label: "13. Trustee Operational Checklist" },
  { id: "frequently-asked-questions", label: "14. Frequently Asked Questions" },
  { id: "legal-backing", label: "15. Legal Backing & Advocate Profile" },
  { id: "statutory-citations", label: "16. Statutory Citations & Acts" },
];

const FAQS = [
  {
    q: "What is a testamentary trust clause in a Will under Indian law?",
    a: "A testamentary trust clause is a specific provision inserted into a Will that directs the testator's executor to transfer designated assets into a private trust upon the testator's demise, rather than handing them over directly to beneficiaries. Governed under Section 5 of the Indian Trusts Act, 1882, the trust comes into legal existence only after the death of the testator when the Will takes effect.",
  },
  {
    q: "Does creating a testamentary trust require stamp duty during my lifetime?",
    a: "No. Unlike an inter-vivos (living) trust which requires an immediate registered trust deed attracting state stamp duty (often 3% to 5% of asset value) and annual accounting compliance, a testamentary trust created under Section 5 of the Indian Trusts Act, 1882 requires ZERO upfront stamp duty or registration during your lifetime. It is established directly through your validly executed Will at no additional setup expense.",
  },
  {
    q: "Why should I create a testamentary trust instead of leaving property directly to my minor child?",
    a: "If a minor child inherits immovable property directly, Section 29 of the Guardians and Wards Act, 1890 strictly prohibits any legal guardian from selling, mortgaging, or leasing the property for more than 5 years without prior permission from the District Court. This often traps family assets in judicial delays during educational emergencies. Furthermore, at age 18, the child gets sudden unrestricted access to substantial wealth. A testamentary trust bypasses court approvals and staggers distributions over mature milestones.",
  },
  {
    q: "How does a milestone payout schedule (e.g., ages 18, 21, and 25) work under Indian law?",
    a: "Under Section 119 and 120 of the Indian Succession Act, 1925, a testator has testamentary freedom to specify contingent or deferred vesting terms. The clause provides that the corpus remains with the trustees who fund medical and educational needs until age 18, release a partial lump-sum (e.g., 20%) at 18 for undergraduate studies, another tranche (e.g., 30%) at age 21 for post-graduate education or career launch, and the final 50% capital at age 25 when the child possesses mature financial judgment.",
  },
  {
    q: "Can a testamentary trust protect my child's inheritance from creditors or spendthrift spouses?",
    a: "Yes. By incorporating an express 'Spendthrift / Protective Clause', the legal title remains vested in the trustees while the beneficiary holds only a beneficial right to discretionary distributions. Under Indian trust jurisprudence, because the child does not possess absolute ownership of the underlying capital until milestone vesting, creditors, business liabilities, or estranged matrimonial partners cannot attach or liquidate the trust corpus.",
  },
  {
    q: "How does a testamentary trust safeguard a child with special needs or intellectual disability?",
    a: "For children with physical or intellectual disabilities, a Special Needs Testamentary Trust ensures lifelong medical treatment, caretaking, and assisted living without terminating upon reaching majority. The clause coordinates with Section 14 of the National Trust Act, 1999 and the Rights of Persons with Disabilities Act, 2016 to appoint a Local Level Committee guardian alongside independent co-trustees or corporate fiduciary managers.",
  },
  {
    q: "How is income earned by a testamentary trust taxed under the Income Tax Act, 1961?",
    a: "Under Section 160(1)(iv) and Section 161 of the Income Tax Act, 1961, trustees of a testamentary trust are assessed as 'Representative Assessees'. When the trust is created for a minor child with determinate beneficiaries and defined shares (a Specific Trust created under a Will), the income is taxed at the individual personal tax slab rate of the beneficiary, rather than at the punitive Maximum Marginal Rate (MMR) of 42.744% that applies to discretionary living trusts.",
  },
  {
    q: "Can the legal guardian of the child also be appointed as the trustee?",
    a: "While legally permissible, it is strongly advised by succession lawyers to separate the role of 'Guardian of the Person' (who provides daily care, shelter, and emotional nurture) from the 'Trustee of the Property' (who manages investments, bank accounts, and approvals). Alternatively, appoint a trusted financial advisor or professional co-trustee alongside the guardian to provide vital fiduciary checks and balances.",
  },
];

const CLAUSE_VARIANTS = {
  minor_milestone: {
    title: "Variant 1: Minor Child Testamentary Trust with Staggered Payouts (18 / 21 / 25)",
    text: `TESTAMENTARY TRUST CLAUSE FOR MINOR CHILDREN (MILESTONE VESTING SCHEDULE):

1. CONSTITUTION OF TESTAMENTARY TRUST:
I hereby devise, bequeath, and direct my Executor(s) that all properties, bank deposits, mutual funds, shares, and immovable properties specified in Schedule [A] of this my Last Will and Testament, intended for the benefit of my minor child [Full Name of Minor Child], born on [Date of Birth of Child], shall NOT pass directly to said minor upon my demise. Instead, all such properties shall immediately upon my death vest in the Trustees hereinafter named, who shall hold, manage, administer, and distribute the same as a Private Testamentary Trust, hereinafter referred to as the "[Family Name] Minor Child Trust", under the provisions of Section 5 and Section 6 of the Indian Trusts Act, 1882.

2. APPOINTMENT OF TRUSTEES & SUCCESSION:
I hereby appoint (1) [Full Name of Trustee 1], residing at [Address 1], and (2) [Full Name of Trustee 2], residing at [Address 2], as the joint Trustees of the said Trust. In the event of death, incapacity, or disclaimer of either Trustee, [Full Name of Alternate Trustee], residing at [Address 3], shall act as the substitute Trustee. The Trustees shall act in a fiduciary capacity without personal liability except for willful breach of trust.

3. DISCRETIONARY EXPENDITURE DURING MINORITY (UPTO AGE 18):
Until my said child attains the age of 18 (eighteen) years, the Trustees shall stand possessed of the Trust Corpus and the net income arising therefrom, with full power and unfettered discretion to apply such portion of income, and if necessary the capital, as the Trustees deem requisite for the maintenance, boarding, lodging, health insurance, emergency medical treatments, and standard of living of my said child, and specifically for school tuition, coaching, extracurricular development, and international educational exposure.

4. STAGGERED MILESTONE DISTRIBUTION SCHEDULE:
Upon my said child attaining the following respective ages, the Trustees shall release and transfer the Trust Corpus to my child as absolute owner according to the following mandatory tranches:
   (a) Milestone 1 (At Age 18 Years): The Trustees shall disburse 20% (twenty percent) of the then-existing Trust Corpus to fund undergraduate university education, professional entrance fees, or academic living stipends.
   (b) Milestone 2 (At Age 21 Years): The Trustees shall disburse 30% (thirty percent) of the original Trust Corpus (or proportionate remaining corpus) to fund post-graduate studies, foreign education, professional certification, or career establishment.
   (c) Milestone 3 (At Age 25 Years): Upon my child attaining the age of 25 (twenty-five) years, the Trustees shall convey, transfer, and deliver the entire balance remaining of the Trust Corpus (both immovable properties and liquid assets) to my child absolutely, whereupon this Testamentary Trust shall stand dissolved.

5. GIFT-OVER UPON PREDECEASE:
If my said child should predecease me, or survive me but die before attaining the age of 25 years without leaving lawful issue, the remaining Trust Corpus shall devolve upon [Name of Contingent Beneficiary / Surviving Sibling] in equal shares absolutely.`,
  },
  special_needs: {
    title: "Variant 2: Special Needs Child Lifelong Protective Trust Clause",
    text: `TESTAMENTARY TRUST CLAUSE FOR SPECIAL NEEDS / DEPENDENT CHILD (LIFELONG CARE):

1. CREATION OF LIFELONG SPECIAL NEEDS TRUST:
In order to guarantee uninterrupted medical care, therapy, assisted living, and financial security for my child [Child Name], who has [Nature of Physical / Intellectual Disability / Medical Condition], I hereby create and establish under Section 5 of the Indian Trusts Act, 1882 a permanent Testamentary Trust titled "[Family Name] Special Needs Trust", to take effect immediately upon my demise.

2. ASSET ALLOCATION & IRREVOCABILITY:
I direct my Executor to convey into this Trust the immovable residential property situated at [Property Description], along with fixed deposits and liquid investments amounting to Rs. [Amount]/-. The Trustees shall hold the Trust Corpus exclusively for the lifelong benefit, maintenance, medical welfare, caregiver expenses, and therapy of my said child. The Trust shall NOT dissolve upon my child attaining 18 years of age and shall continue for the entire natural life of my child.

3. GUARDIANSHIP & STATUTORY COORDINATION:
Under Section 14 of the National Trust Act, 1999 and the Rights of Persons with Disabilities Act, 2016, I recommend the appointment of [Guardian Name] as the Legal Guardian of the Person of my child. The Trustees shall coordinate closely with said Guardian, providing monthly disbursement funds to meet medical bills, attendant salaries, specialized diet, recreational needs, and assistive devices.

4. RESTRICTION ON ENCUMBRANCE & PRESERVATION OF GOVT BENEFITS:
The Trust Corpus and its income shall be insulated from attachment, encumbrance, or alienation. The Trust is structured as a non-discretionary protective trust to ensure that receipt of trust benefits does not disqualify my child from any government welfare scheme, healthcare subsidy, or disability pension under Central or State enactments.

5. REMAINDER INTEREST UPON DEMISE OF SPECIAL NEEDS CHILD:
Upon the sad demise of my said child [Child Name], the Trust shall terminate, and the remaining corpus, after settling all medical and funeral expenses, shall devolve upon [Surviving Sibling Name / Charitable Organization Name] absolutely.`,
  },
  trustee_powers: {
    title: "Variant 3: Comprehensive Trustee Powers, Investments & Spendthrift Protection",
    text: `TRUSTEE FIDUCIARY POWERS & SPENDTHRIFT IMMUNITY CLAUSE:

1. INVESTMENT POWERS:
The Trustees shall have full power to retain existing investments or reinvest the Trust Corpus in sovereign bonds, Reserve Bank of India Floating Rate Savings Bonds, scheduled commercial bank fixed deposits, mutual funds, and AAA-rated corporate debt, prioritizing capital preservation and inflation-hedged growth for the beneficiaries.

2. BYPASS OF GUARDIANSHIP RESTRICTIONS:
The Trustees are expressly empowered to lease, renovate, let out, or, if strictly required for the beneficiary's medical emergency or international university fee, sell any immovable property comprised in the Trust Corpus without seeking prior permission from any District Court or Guardian Court under Section 29 of the Guardians and Wards Act, 1890, this power being derived directly from my testamentary authority as the absolute owner.

3. SPENDTHRIFT & ANTI-ALIENATION PROVISION:
No beneficiary shall have the power or authority to assign, pledge, mortgage, encumber, anticipate, or transfer their prospective or contingent interest in the Trust Corpus or the income therefrom. The Trust Corpus and income shall be entirely exempt from the claims, debts, liabilities, bankruptcies, or matrimonial attachment of any creditor or spouse of the beneficiary until actual physical transfer into the hands of the beneficiary under the milestone distribution terms.

4. ACCOUNTS & AUDIT:
The Trustees shall maintain clean, double-entry books of account for the Trust, reconcile all bank statements annually as on 31st March, and arrange for an annual audit by a qualified Chartered Accountant. True copies of the audited annual accounts shall be furnished to the legal guardian of the child and filed with the jurisdictional Income Tax Officer under Section 161 of the Income Tax Act, 1961.`,
  },
};

export default function TestamentaryTrustClauseClient() {
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
  const [selectedVariant, setSelectedVariant] = useState<
    "minor_milestone" | "special_needs" | "trustee_powers"
  >("minor_milestone");
  const [copiedClause, setCopiedClause] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  const copyClauseToClipboard = () => {
    navigator.clipboard.writeText(CLAUSE_VARIANTS[selectedVariant].text);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `TESTAMENTARY TRUST OPERATIONAL CHECKLIST FOR EXECUTORS & TRUSTEES:
1. Obtain Certified Death Certificate of Testator from Municipal Corporation / Gram Panchayat.
2. Locate Original Registered Will containing the Testamentary Trust Clause (Section 5 Indian Trusts Act).
3. If property situated in Kolkata, Chennai, or Mumbai (Presidential Towns), file Probate Petition in High Court (ISA Section 213).
4. Apply for Separate PAN Card for the Testamentary Trust under Category: Trust / AOP (Section 160/161 Income Tax Act).
5. Open Dedicated Bank Current/Savings Account in name of "[Family Name] Minor Child Trust" operated jointly by designated Trustees.
6. Transfer Demat Shares, Mutual Funds, and Fixed Deposits from Testator's name into Trust Bank Account using transmission forms.
7. Record Revenue Mutation in Land Records / Municipal Records reflecting Trustees as Legal Representatives for Minor Beneficiary.
8. Set up Automated Milestone Tracking for Beneficiary Ages (18th Birthday: 20%, 21st Birthday: 30%, 25th Birthday: 50%).
9. Appoint independent Chartered Accountant to file Annual Income Tax Returns (ITR-5) assessing income at beneficiary slab rates.
10. Ensure complete separation of personal funds of Trustees from Trust Corpus to avoid breach of fiduciary duty (Section 51 Indian Trusts Act).`;
    navigator.clipboard.writeText(checklistText);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy - Exact Reference Style)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN TRUSTS ACT, 1882 • SECTIONS 5 &amp; 6 • ZERO UPFRONT STAMP DUTY</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Testamentary Trust Clause in Will Format for Minor Children
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Create an ironclad Private Trust inside your Will at <strong>zero upfront registration cost</strong>.
            Stagger inheritance distributions across mature milestones (ages 18, 21, and 25), bypass cumbersome
            Guardianship Court restrictions, and protect your child from financial predators.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#ready-legal-clauses"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Ready-to-Use Trust Clauses</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft a Will with Trust Clause</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹0 Stamp Duty</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SECTION 5 TRUSTS ACT EXEMPTION
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">18 / 21 / 25 Yrs</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                STAGGERED MILESTONE VESTING
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sec 29 Bypass</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                AVOID GUARDIANSHIP COURT DELAY
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Slab Rate Tax</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SECTION 161 REPRESENTATIVE TAX
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content, Table of Contents & Sticky CTAs)
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
                      onClick={() => setActiveId(item.id)}
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
                Governed under Sections 5 &amp; 6 of the Indian Trusts Act, 1882; Sections 119, 120
                &amp; 307 of the Indian Succession Act, 1925; Section 29 of the Guardians and Wards
                Act, 1890; and Sections 160 &amp; 161 of the Income Tax Act, 1961.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE CLAUSE BUILDER
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: TESTAMENTARY TRUST CLAUSE ESSENTIALS</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Upfront Stamp Duty:</strong> Under Section 5 of the Indian Trusts Act,
                    1882, a private family trust can be lawfully created directly inside a Will. Unlike a
                    living trust, it requires ₹0 upfront stamp duty, zero registration fees, and zero
                    annual compliance filings while you are alive.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Bypassing Guardianship Court Hurdles:</strong> If a minor inherits property
                    directly, Section 29 of the Guardians and Wards Act, 1890 forbids the guardian from selling
                    or leasing the asset without prior District Court permission. A testamentary trust avoids
                    this bottleneck completely.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Preventing 18th Birthday Wealth Destruction:</strong> Standard inheritance hands
                    unfettered wealth to a child the minute they turn 18. A testamentary trust allows you
                    to legally stagger capital releases across mature ages: 20% at 18, 30% at 21, and 50% at 25.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Beneficiary Slab Taxation:</strong> Under Sections 160 and 161 of the Income
                    Tax Act, 1961, a determinate testamentary trust for minor children is taxed at the
                    beneficiary&apos;s personal income tax slab rate, avoiding the punitive 42.744% Maximum Marginal Rate.
                  </span>
                </li>
              </ul>
            </div>

            {/* VISUAL SHOWCASE: EDITORIAL OG BANNER */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm p-4 sm:p-5 space-y-3">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-xs border border-slate-100 bg-[#172228]">
                <Image
                  src="/images/testamentary-trust-clause-minor-child-will-format-og.jpg"
                  alt="Testamentary Trust Clause in Will Format India for Minor and Special Needs Children"
                  width={1376}
                  height={768}
                  className="w-full h-auto object-contain rounded-2xl"
                  priority
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-xs text-slate-500 border-t border-slate-100">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                  Statutory Format: Indian Trusts Act, 1882 &amp; Indian Succession Act, 1925
                </span>
                <span className="text-[11px] text-slate-400">
                  WillDrafting.in Editorial Archive • Verified by Senior Succession Counsel
                </span>
              </div>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION &amp; COMPETITOR MOAT</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Statutory Foundation: Indian Trusts Act Section 5 Moat
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Most wealth managers and high-net-worth individuals in India assume that protecting minor
                  children requires creating an immediate <strong>Private Family Living Trust</strong> during
                  their lifetime. However, setting up a living trust requires drafting an extensive indenture of
                  trust, paying state stamp duty (ranging from 2% to 5% of asset values in states like
                  Maharashtra and Karnataka), registering with the Sub-Registrar Office, applying for a PAN card,
                  and filing separate annual income tax returns year after year.
                </p>
                <p>
                  Almost nobody in India realizes that the Indian legal system provides a vastly superior,
                  cost-free alternative: <strong>Section 5 of the Indian Trusts Act, 1882</strong> explicitly
                  mandates that a valid trust in relation to immovable property can be declared:
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-[#C65378] text-xs sm:text-sm font-mono text-slate-800">
                  &ldquo;No trust in relation to immovable property is valid unless declared by a non-testamentary
                  instrument in writing signed by the author of the trust or the trustee and registered, OR BY
                  THE WILL OF THE AUTHOR OF THE TRUST OR OF THE TRUSTEE.&rdquo;
                </div>
                <p>
                  This single statutory phrase creates the ultimate legal moat: a <strong>Testamentary Trust</strong>.
                  By inserting a tailored testamentary trust clause directly inside your plain-paper or registered
                  Will, the trust comes into legal existence <em>only upon your demise</em>. You retain 100%
                  unfettered ownership, modification rights, and asset control throughout your lifetime without
                  spending a single rupee on stamp duty or trust compliance today.
                </p>
              </div>
            </section>

            {/* SECTION 2: PITFALLS OF DIRECT INHERITANCE */}
            <section id="pitfalls-direct-inheritance" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>LEGAL PITFALLS TO PREVENT</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. The Pitfall: Why Direct Minor Bequests Trigger Court Delay
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When parents draft a simple Will stating &ldquo;I leave my flat and investments equally to my minor
                  child,&rdquo; they believe they have secured their child&apos;s future. In reality, they have
                  inadvertently walked into two severe legal and practical traps:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white border border-rose-200/80 p-4 space-y-2 shadow-xs">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <ShieldAlert className="w-4 h-4 text-[#C65378]" />
                      <span>1. Guardians and Wards Act Section 29 Trap</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under Section 29 of the Guardians and Wards Act, 1890, a legal guardian cannot mortgage,
                      charge, sell, gift, or exchange immovable property belonging to a minor, nor lease it for
                      more than 5 years, without prior permission of the District Court. If your child requires
                      urgent funds for foreign medical treatment or university tuition, the surviving spouse or
                      guardian faces 18 to 36 months of tedious court proceedings.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white border border-rose-200/80 p-4 space-y-2 shadow-xs">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <Baby className="w-4 h-4 text-[#C65378]" />
                      <span>2. The 18th Birthday Sudden Wealth Shock</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Under the Indian Majority Act, 1875, childhood legally ends at midnight on the 18th
                      birthday. Direct bequests force bank accounts, demat portfolios, and property titles to pass
                      entirely into the teenager&apos;s independent control. Very few 18-year-olds possess the emotional
                      maturity to manage multi-crore wealth, leaving them vulnerable to reckless spending, peer
                      exploitation, or predatory influences.
                    </p>
                  </div>
                </div>

                <p>
                  A testamentary trust completely eliminates both hazards. Because legal ownership is held by
                  responsible adult Trustees, Section 29 court permission is bypassed, and distributions can be
                  graduated across the child&apos;s early adulthood milestones.
                </p>
              </div>
            </section>

            {/* SECTION 3: COMPARISON TABLE */}
            <section id="comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>STRUCTURED COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Legal Comparison: Direct Inheritance vs Testamentary Trust
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Examine how a Testamentary Trust compares against direct Will bequests and living private trusts
                under Indian succession and trust statutes:
              </p>

              {/* Comparison Table */}
              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#172228] text-white font-bold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3.5 px-4 sm:px-6">Parameter</th>
                        <th className="py-3.5 px-4 sm:px-6">Direct Bequest in Will</th>
                        <th className="py-3.5 px-4 sm:px-6 bg-[#C65378]/20 text-rose-200">
                          Testamentary Trust in Will (Recommended)
                        </th>
                        <th className="py-3.5 px-4 sm:px-6">Living Private Family Trust</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="hover:bg-slate-50/70">
                        <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">Upfront Setup Cost</td>
                        <td className="py-3.5 px-4 sm:px-6">Zero (Standard Will)</td>
                        <td className="py-3.5 px-4 sm:px-6 font-bold text-emerald-700 bg-rose-50/30">
                          Zero (Embedded in Will)
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-rose-700">High (₹50k - ₹3 Lakhs legal fees)</td>
                      </tr>
                      <tr className="hover:bg-slate-50/70">
                        <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">Stamp Duty on Real Estate</td>
                        <td className="py-3.5 px-4 sm:px-6">Zero during lifetime</td>
                        <td className="py-3.5 px-4 sm:px-6 font-bold text-emerald-700 bg-rose-50/30">
                          Zero during lifetime (Sec 5)
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-rose-700">2% to 5% upfront conveyance duty</td>
                      </tr>
                      <tr className="hover:bg-slate-50/70">
                        <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">District Court Approval</td>
                        <td className="py-3.5 px-4 sm:px-6 text-rose-700">
                          Mandatory under Sec 29 GWA to sell property
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 font-bold text-emerald-700 bg-rose-50/30">
                          Completely Bypassed (Trustees execute)
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-emerald-700">Bypassed (Trustees execute)</td>
                      </tr>
                      <tr className="hover:bg-slate-50/70">
                        <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">Age of Asset Control</td>
                        <td className="py-3.5 px-4 sm:px-6 text-rose-700">18 Years (Mandatory statutory age)</td>
                        <td className="py-3.5 px-4 sm:px-6 font-bold text-emerald-700 bg-rose-50/30">
                          Custom Milestones (e.g. 18, 21, 25 Yrs)
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-emerald-700">Custom Milestones (Any age)</td>
                      </tr>
                      <tr className="hover:bg-slate-50/70">
                        <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">Annual Tax Filings Today</td>
                        <td className="py-3.5 px-4 sm:px-6 text-emerald-700">None</td>
                        <td className="py-3.5 px-4 sm:px-6 font-bold text-emerald-700 bg-rose-50/30">
                          None (Trust forms only post-death)
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-rose-700">Mandatory ITR-5 + Audit annually</td>
                      </tr>
                      <tr className="hover:bg-slate-50/70">
                        <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">Income Tax Rate Post-Death</td>
                        <td className="py-3.5 px-4 sm:px-6">Clubbed with parent under Sec 64(1A)</td>
                        <td className="py-3.5 px-4 sm:px-6 font-bold text-emerald-700 bg-rose-50/30">
                          Beneficiary Personal Slab (Sec 161)
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-amber-700">
                          42.744% MMR if discretionary
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/70">
                        <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900">Spendthrift Creditor Shield</td>
                        <td className="py-3.5 px-4 sm:px-6 text-rose-700">No (Assets fully attachable at 18)</td>
                        <td className="py-3.5 px-4 sm:px-6 font-bold text-emerald-700 bg-rose-50/30">
                          High (Protected until milestone transfer)
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-emerald-700">High (Protected until distribution)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 4: CORE ARCHITECTURE */}
            <section id="core-architecture" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>LEGAL MECHANICS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Core Architecture: 4 Pillars of a Minor Child Trust
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Under Section 6 of the Indian Trusts Act, 1882, a valid private trust requires four essential
                  legal certainties: certainty of intention, certainty of purpose, certainty of beneficiaries,
                  and certainty of trust property. To ensure your testamentary trust clause is legally challenge-proof,
                  it must clearly define these four pillars:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2 shadow-xs">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <Coins className="w-4 h-4 text-[#C65378]" />
                      <span>1. Specific Trust Corpus</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Explicitly identify which assets pass into the trust: residential apartments, ancestral shares,
                      fixed deposits, mutual fund folios, insurance proceeds, or a defined percentage of your residuary
                      estate. Ambiguity invalidates trust creation.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2 shadow-xs">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <Users className="w-4 h-4 text-[#5F7E75]" />
                      <span>2. Dual Trustees &amp; Alternate Fiduciaries</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Always name at least two trustworthy co-trustees (such as a financially astute sibling and a
                      trusted family friend) plus a designated alternate successor trustee. This prevents trust
                      paralysis if one trustee passes away or refuses to act.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2 shadow-xs">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <UserCheck className="w-4 h-4 text-[#C65378]" />
                      <span>3. Guardian vs Trustee Separation</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A vital estate planning best practice is appointing one person as the <em>Guardian of the Person</em>
                      (who handles parenting, emotional care, and daily home life) while appointing a separate individual
                      or co-trustees as <em>Trustees of the Estate</em> (who manage investments and approve funds). This
                      creates vital checks and balances.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-2 shadow-xs">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <GraduationCap className="w-4 h-4 text-[#5F7E75]" />
                      <span>4. Education &amp; Medical Spending Mandates</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Give trustees clear discretionary mandates to fund school tuition, coaching, undergraduate and
                      overseas university expenses, health insurance, emergency hospitalization, and reasonable
                      maintenance, without requiring judicial intervention.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: MILESTONE PAYOUT SCHEDULE */}
            <section id="milestone-schedule" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>CAPITAL PRESERVATION STRATEGY</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Milestone Payout Schedule: Staggered Vesting at 18, 21, 25
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Under Sections 119 and 120 of the Indian Succession Act, 1925, testators have the statutory right
                  to create contingent and deferred interests. Instead of an all-or-nothing release, our tested
                  Indian testamentary trust clause utilizes a <strong>three-tier milestone framework</strong>:
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                    <div className="w-12 h-12 rounded-xl bg-rose-100 text-[#C65378] font-black text-base flex items-center justify-center shrink-0">
                      18 Y
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-slate-900">
                        Milestone 1: Undergraduate Launch Tranche (20% Corpus)
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Released upon reaching 18 years of age. Designated specifically for college admission fees,
                        hostel deposits, laptops, and undergraduate stipends. The remaining 80% remains locked in the
                        trust under professional trustee management.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#5F7E75] font-black text-base flex items-center justify-center shrink-0">
                      21 Y
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-slate-900">
                        Milestone 2: Higher Education &amp; Career Capital (30% Corpus)
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Released upon completing undergraduate studies or attaining age 21. Tailored for master&apos;s
                        degrees, foreign university tuition, professional licensing, or early seed capital for career
                        initiatives.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 font-black text-base flex items-center justify-center shrink-0">
                      25 Y
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-slate-900">
                        Milestone 3: Final Capital Vesting &amp; Dissolution (Remaining 50% Corpus)
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        At age 25, the beneficiary has entered the workforce, developed financial awareness, and gained
                        real-world experience. The trustees convey the remaining liquid assets and execute conveyance of
                        immovable properties, dissolving the trust.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: SPECIAL NEEDS CHILD TRUST */}
            <section id="special-needs-trust" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>VULNERABLE HEIR SAFEGUARDS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Special Needs Child Trust: Lifelong Care &amp; Safeguards
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  For parents of children with physical, cognitive, or psychiatric disabilities (such as autism,
                  cerebral palsy, or intellectual impairment), estate planning is a matter of survival. An ordinary
                  Will that passes assets to a special needs child upon age 18 creates catastrophic vulnerability: the
                  child cannot manage accounts, while unscrupulous relatives or third parties can siphon off assets.
                </p>
                <p>
                  A <strong>Special Needs Testamentary Trust</strong> established inside your Will solves this through
                  three vital safeguards:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-1.5 shadow-xs">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>Lifelong Duration</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      The trust never dissolves at age 18 or 25; it continues for the entire natural lifespan of the
                      child, funding institutional care, specialized therapy, and 24/7 nursing.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-1.5 shadow-xs">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-[#5F7E75]" />
                      <span>National Trust Act Sync</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Coordinates with Section 14 of the National Trust Act, 1999 for statutory legal guardianship
                      via Local Level Committees (LLC headed by District Collector).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-1.5 shadow-xs">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-slate-700" />
                      <span>Institutional Trustee</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Enables appointing an established NGO, bank trust division, or corporate trustee as successor to
                      prevent abandonment after family trustees pass away.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: SPENDTHRIFT PROTECTION */}
            <section id="spendthrift-protection" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>CREDITOR &amp; MATRIMONIAL SHIELD</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Spendthrift Protection: Shielding Corpus from Creditors
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A major risk in modern estate transmission is that a child may face future business insolvency,
                  personal loans, startup liquidation, or acrimonious divorce proceedings. If assets were inherited
                  outright, creditors or estranged spouses can attach bank accounts, claim alimony charges, or auction
                  properties under the Insolvency and Bankruptcy Code (IBC) or Code of Civil Procedure (CPC).
                </p>
                <p>
                  By inserting a <strong>Spendthrift &amp; Anti-Alienation Clause</strong> into your testamentary trust:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc pl-5">
                  <li>
                    <strong>Legal Title REMAINS with Trustees:</strong> The child holds only an equitable beneficial
                    right to discretionary income and milestone tranches, not legal title.
                  </li>
                  <li>
                    <strong>Immunity from Attachment:</strong> Because the beneficiary cannot assign, pledge, or
                    mortgage their future expectancy, creditors have zero legal standing to attach the trust corpus.
                  </li>
                  <li>
                    <strong>Matrimonial Separation:</strong> Assets held inside an irrevocable testamentary trust do not
                    constitute shared marital property or personal assets in maintenance or alimony disputes.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION 8: READY-TO-USE LEGAL CLAUSES (INTERACTIVE BOX) */}
            <section id="ready-legal-clauses" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Copy className="w-4 h-4" />
                <span>READY-TO-USE LEGAL CLAUSE BOX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Ready-to-Use Legal Clauses: Complete Copyable Formats
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your required clause variant below. These clauses have been vetted by Senior Succession Counsel
                compliant with the Indian Trusts Act, 1882 and Indian Succession Act, 1925. Click &ldquo;Copy Clause to Clipboard&rdquo;
                to insert directly into your Will draft.
              </p>

              {/* Interactive Clause Selector Panel */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-5">
                {/* Variant Tabs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pb-4 border-b border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedVariant("minor_milestone")}
                    className={`py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between ${
                      selectedVariant === "minor_milestone"
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <span>1. Milestone Trust (18/21/25)</span>
                    {selectedVariant === "minor_milestone" && <Check className="w-3.5 h-3.5 text-rose-300" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedVariant("special_needs")}
                    className={`py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between ${
                      selectedVariant === "special_needs"
                        ? "bg-[#C65378] text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <span>2. Special Needs Child Trust</span>
                    {selectedVariant === "special_needs" && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedVariant("trustee_powers")}
                    className={`py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between ${
                      selectedVariant === "trustee_powers"
                        ? "bg-[#5F7E75] text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <span>3. Trustee Powers &amp; Shield</span>
                    {selectedVariant === "trustee_powers" && <Check className="w-3.5 h-3.5 text-emerald-200" />}
                  </button>
                </div>

                {/* Active Variant Header & Copy Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">
                    {CLAUSE_VARIANTS[selectedVariant].title}
                  </div>
                  <button
                    type="button"
                    onClick={copyClauseToClipboard}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    {copiedClause ? (
                      <>
                        <CheckCheck className="w-4 h-4 text-emerald-300" />
                        <span>Clause Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Clause to Clipboard</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Preformatted Clause Code Box */}
                <div className="relative rounded-2xl bg-slate-900 text-slate-100 p-4 sm:p-6 font-mono text-xs leading-relaxed max-h-[460px] overflow-y-auto whitespace-pre-wrap border border-slate-800 selection:bg-rose-600 selection:text-white">
                  {CLAUSE_VARIANTS[selectedVariant].text}
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Drafting Tip:</strong> Replace all bracketed items (such as [Full Name], [Date of Birth],
                    and [Address]) with exact legal identities matching Aadhaar cards. For multi-child families,
                    create separate sub-trusts or specify identical percentage allocations for each child.
                  </span>
                </div>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <CalendarCheck className="w-4 h-4" />
                <span>OPERATIONAL PROTOCOL</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Executing a Will with a Trust Clause
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  To ensure that your testamentary trust clause executes seamlessly upon your demise without family
                  litigation or revenue rejection, follow this verified five-step protocol:
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      1
                    </span>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 text-sm">
                        Embed Clauses Inside the Main Will Document
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Do not execute a separate trust deed during your lifetime. Embed the testamentary trust clause
                        directly within your Will, designating the Executor and Trustees by name, PAN, and Aadhaar.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      2
                    </span>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 text-sm">
                        Two Independent Witnesses under Section 63 ISA
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Under Section 63 of the Indian Succession Act, 1925, sign the Will in the simultaneous presence
                        of two witnesses. Crucially, under Section 67 ISA, neither the designated Trustees, nor the
                        Guardian, nor the minor child should be attesting witnesses to prevent legacy disqualification.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      3
                    </span>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 text-sm">
                        Register the Will at Sub-Registrar Office (Recommended)
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        While Will registration is optional under Section 18 of the Registration Act, 1908, registering
                        a Will containing a testamentary trust at the SRO establishes undisputed authenticity, mental
                        soundness, and date of execution, dramatically minimizing probate contests.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      4
                    </span>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 text-sm">
                        Post-Demise Activation &amp; PAN Application
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Upon the testator&apos;s death, the Executor obtains the Death Certificate. The Trustees apply online
                        on NSDL/UTIITSL for a separate PAN card for the trust under category &ldquo;Trust / Association of
                        Persons (AOP)&rdquo; using the registered Will as the constitutional charter document.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      5
                    </span>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 text-sm">
                        Bank Transmission &amp; Milestone Tracking
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        The Trustees open a bank account in the name of &ldquo;[Family Name] Minor Child Trust&rdquo;, transmit
                        investments from the deceased, and schedule milestone payouts under chartered accountant supervision.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: INCOME TAX TREATMENT */}
            <section id="income-tax-treatment" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>INCOME TAX ACT, 1961</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Income Tax Treatment: Representative Assessee Slabs
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A common worry among parents is how rental yield, interest, and dividends earned by the testamentary
                  trust will be taxed before the child turns 18. Under Indian tax law, the rules are highly favorable:
                </p>
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-3 shadow-xs">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#C65378]" />
                    <span>Sections 160(1)(iv) &amp; 161: Representative Assessee Mechanism</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Trustees are treated as &ldquo;Representative Assessees&rdquo; on behalf of the minor beneficiary. Under
                    Section 161, tax is levied upon and recoverable from the trustee in like manner and to the same
                    extent as it would be leviable upon the beneficiary.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-slate-900">Specific Determinate Trust</div>
                      <p className="text-slate-600 mt-1">
                        Because the Will clearly identifies the child and their percentage share, it is a &ldquo;determinate
                        trust&rdquo;. Tax is charged at the beneficiary&apos;s individual personal income tax slab rate
                        (benefiting from the basic exemption limit), NOT the Maximum Marginal Rate.
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-slate-900">Clubbing Exemption Post-Death</div>
                      <p className="text-slate-600 mt-1">
                        Section 64(1A) clubbing provisions apply when income arises to a minor child whose parents are
                        alive. Upon the demise of the parent who created the testamentary trust, income belongs to the
                        trust/minor and is not clubbed with unrelated third parties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 11: PRACTICAL CASE STUDIES */}
            <section id="practical-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>REAL-WORLD SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Real-World Precedents: Practical Family Case Studies
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Case 1 */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-2 shadow-xs">
                    <div className="text-[11px] font-black uppercase text-[#C65378]">Case 1: Bengaluru</div>
                    <div className="font-bold text-slate-900 text-sm">Tech Couple with 6-Year-Old Child</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Two software executives held 2 flats and ₹4.5 Crores in ESOPs. Feared sudden accidental demise
                      leaving minor child under the control of distant relatives. They created mirror Wills with a
                      testamentary trust, appointing the maternal aunt as Guardian of Person and a trusted CA friend
                      as Trustee of Estate with 18/21/25 milestone vesting.
                    </p>
                  </div>

                  {/* Case 2 */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-2 shadow-xs">
                    <div className="text-[11px] font-black uppercase text-[#C65378]">Case 2: Mumbai</div>
                    <div className="font-bold text-slate-900 text-sm">Business Family &amp; Special Needs Child</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A textile industrialist in South Mumbai had a 12-year-old child with severe autism. Standard
                      succession would leave the child helpless. A Special Needs Testamentary Trust was drafted
                      appointing a family elder and a registered national disability trust as joint trustees with
                      lifelong caregiver funding and spendthrift protection.
                    </p>
                  </div>

                  {/* Case 3 */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-2 shadow-xs">
                    <div className="text-[11px] font-black uppercase text-[#C65378]">Case 3: New Delhi</div>
                    <div className="font-bold text-slate-900 text-sm">Single Mother Protecting from In-Laws</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A widowed doctor in Delhi with an 8-year-old daughter faced pressure from aggressive in-laws.
                      Direct bequest would give estranged in-laws leverage to apply for Section 29 court guardianship.
                      By using a testamentary trust, legal title was securely vested in her own brother and an advocate
                      co-trustee, shielding the child completely.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 12: CONTEXTUAL LINK TO INTERACTIVE TOOL */}
            <section id="diagnostic-tool" className="scroll-target scroll-mt-28">
              <div className="rounded-3xl bg-gradient-to-br from-[#172228] to-[#212F35] text-white p-6 sm:p-8 shadow-md space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[11px] font-bold uppercase tracking-wider text-rose-200">
                  <Calculator className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>INTERACTIVE DIAGNOSTIC CALCULATOR</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  12. Diagnostic Tool: Minor Trust vs Guardianship Estimator
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl">
                  Wondering whether your family situation requires a simple guardian nomination or an advanced
                  Testamentary Trust? Use our interactive diagnostic tool to calculate Section 29 court approval
                  timelines, stamp duty differences, and milestone distribution modeling.
                </p>
                <div className="pt-2">
                  <Link
                    href="/tools/minor-child-trust-vs-guardianship-estimator"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs sm:text-sm transition-transform hover:-translate-y-0.5 shadow-md"
                  >
                    <span>Launch Minor Child Trust vs Guardianship Tool</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 13: TRUSTEE CHECKLIST (COPYABLE) */}
            <section id="trustee-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>TRUSTEE SOP CHECKLIST</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Trustee Operational Checklist: Post-Demise Action Plan
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Share this practical 10-point operational checklist with your nominated trustees so they know exact
                post-demise legal procedures:
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-4">
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    10-Point Post-Demise Action Protocol
                  </span>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
                  >
                    {copiedChecklist ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Checklist</span>
                      </>
                    )}
                  </button>
                </div>

                <ol className="space-y-2.5 text-xs text-slate-700 leading-relaxed list-decimal pl-4">
                  <li>Obtain certified original Death Certificate from Municipal Corporation / Gram Panchayat.</li>
                  <li>Locate original registered Will containing the Section 5 Testamentary Trust Clause.</li>
                  <li>
                    If property is situated in Kolkata, Chennai, or Mumbai, apply for High Court Probate (ISA Section 213).
                  </li>
                  <li>
                    Apply for separate PAN Card for the Trust under category &ldquo;Trust / Association of Persons&rdquo; (Section 160/161).
                  </li>
                  <li>
                    Open dedicated joint bank current/savings account in name of &ldquo;[Family Name] Minor Child Trust&rdquo;.
                  </li>
                  <li>
                    Submit transmission claims for demat equities, mutual funds, and fixed deposits into the trust bank account.
                  </li>
                  <li>
                    Record Revenue Mutation in Land Records / Municipal Records reflecting Trustees as Legal Representatives.
                  </li>
                  <li>
                    Configure automated calendar alerts for beneficiary milestone birthdays (18th: 20%, 21st: 30%, 25th: 50%).
                  </li>
                  <li>
                    Appoint independent Chartered Accountant to audit annual accounts and file ITR-5 at beneficiary slab rates.
                  </li>
                  <li>
                    Strictly segregate Trustee personal funds from Trust funds to avoid breach of trust under Section 51 Indian Trusts Act.
                  </li>
                </ol>
              </div>
            </section>

            {/* SECTION 14: FAQS ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Frequently Asked Questions: Testamentary Trust Clauses
              </h3>
              <div className="space-y-3 pt-2">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-[#C65378]"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 transition-transform text-slate-400 ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 15: LEGAL BACKING & ADVOCATE PROFILE */}
            <section id="legal-backing" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4 text-[#C65378]" />
                <span>LEGAL EXPERTISE &amp; INSTITUTIONAL BACKING</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Legal Backing: Senior Succession Counsel &amp; AMA Solutions
              </h3>
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-xs">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-rose-100 text-[#C65378] font-black text-lg flex items-center justify-center shrink-0">
                    AAM
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 text-base sm:text-lg">
                      Advocate Anuj Anand Malik
                    </div>
                    <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                      Senior Succession Counsel • AMA Legal Solutions
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Specializing in testamentary trust engineering, cross-border NRI estate structuring, High Court
                  probate litigation, and Guardians and Wards Act defense. All templates and clauses on WillDrafting.in
                  are continuously vetted to conform with latest Supreme Court precedents and statutory amendments.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-slate-600 border-t border-slate-100">
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Bar Council of India Verified
                  </span>
                  <span>•</span>
                  <span>Pan-India Testamentary Trust Advisory</span>
                  <span>•</span>
                  <Link href="/contact" className="text-[#C65378] hover:underline font-bold">
                    Schedule Private Consultation
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 16: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>OFFICIAL PORTALS &amp; STATUTES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Statutory Citations: Governing Indian Acts &amp; Precedents
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-1">
                  <div className="font-bold text-slate-900">Indian Trusts Act, 1882</div>
                  <div className="text-slate-500">Sections 5, 6, 11, 20 &amp; 51</div>
                  <div className="text-[11px] text-slate-400">Creation of testamentary trusts without stamp duty.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-1">
                  <div className="font-bold text-slate-900">Indian Succession Act, 1925</div>
                  <div className="text-slate-500">Sections 63, 67, 119, 120 &amp; 307</div>
                  <div className="text-[11px] text-slate-400">Attestation, contingent vesting, and executor powers.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-1">
                  <div className="font-bold text-slate-900">Guardians and Wards Act, 1890</div>
                  <div className="text-slate-500">Sections 7, 28 &amp; 29</div>
                  <div className="text-[11px] text-slate-400">Restrictions on alienation of minor property.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-1">
                  <div className="font-bold text-slate-900">Income Tax Act, 1961</div>
                  <div className="text-slate-500">Sections 160, 161 &amp; 164</div>
                  <div className="text-[11px] text-slate-400">Representative assessee tax slabs for trusts.</div>
                </div>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (Matching Exact Reference Style)
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
                Specialist in Indian testamentary jurisprudence, Section 5 private trust creation inside Wills,
                minor child estate protection, and High Court probate representation.
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
                  <span>PREVENT GUARDIANSHIP COURT RED TAPE</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Minor Child with a Testamentary Trust Will
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Draft a comprehensive Indian Will incorporating milestone payout schedules (18, 21, 25 years),
                  trusted guardian nominations, and zero upfront trust stamp duty.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will Online in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lawyer Reviewed &amp; Stamp Duty Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>CUSTOM TRUST STRUCTURING DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  High-Net-Worth Estate or Special Needs Child?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Consult Senior Succession Advocates at AMA Legal Solutions for custom multi-generational family
                  trust structuring, institutional trusteeship, and business succession.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
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
                      <strong>Indian Trusts Act Section 5:</strong> Zero upfront stamp duty or registration costs.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Section 29 Court Bypass:</strong> Trustees can lease or sell without court delay.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Staggered Milestones:</strong> Prevents reckless wealth loss on 18th birthday.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Spendthrift Protection:</strong> Shields child from creditors and marital disputes.
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
          href="#ready-legal-clauses"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>Copy Clauses</span>
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
