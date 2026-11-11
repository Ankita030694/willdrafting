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
  HeartHandshake,
  Stethoscope,
} from "lucide-react";

// Table of Contents Items (strictly <= 70 chars, 0 em-dashes, unique matching anchor IDs)
const TOC_ITEMS = [
  { id: "statutory-purpose-scope", label: "1. Testamentary Special Needs Trust: Legal Framework" },
  { id: "trust-corpus-calculator", label: "2. Trust Corpus & Trustee Structure Calculator" },
  { id: "bequest-vs-trust-comparison", label: "3. Direct Bequest vs Guardianship vs Private Trust" },
  { id: "master-trust-clause-format", label: "4. Master Special Needs Testamentary Trust Format" },
  { id: "successor-trustee-clause", label: "5. Successor Trustee & Institutional Co-Trustee Clause" },
  { id: "medical-buffer-fund-rule", label: "6. Medical Emergency Buffer Fund & Caregiver Rules" },
  { id: "disability-act-safeguards", label: "7. National Trust Act 1999 & RPwD Act 2016 Safeguards" },
  { id: "income-tax-slab-relief", label: "8. Tax Exemption: Section 164(1) Individual Slab Rates" },
  { id: "step-by-step-trust-sop", label: "9. Step-by-Step SOP: Setting Up a Special Needs Trust" },
  { id: "common-planning-mistakes", label: "10. Five Fatal Mistakes to Avoid for Disabled Children" },
  { id: "institutional-profile", label: "11. Institutional Profile: Private Trust Desk" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions: Special Needs Trusts" },
  { id: "statutory-citations", label: "13. Statutory Rules & Government Portals" },
];

const FAQS = [
  {
    q: "What is a special needs testamentary private trust under Indian law?",
    a: "A special needs testamentary private trust is a protective legal arrangement established inside a parent's Will under Section 5 and Section 6 of the Indian Trusts Act, 1882. It takes effect only upon the death of the parents. The trust property is managed by dedicated trustees for the lifelong welfare, medical treatment, and therapy of the child, without granting direct asset title to the vulnerable child.",
  },
  {
    q: "Why should Indian parents never leave property directly to a special needs child in a Will?",
    a: "Directly bequeathing flats, bank accounts, or mutual funds to an individual with intellectual, developmental, or psychiatric disabilities creates severe risks. A disabled person cannot resist coercion from predatory relatives or handle legal matters like property maintenance, tenant negotiations, or tax filings. Relatives frequently siphon funds or leave the child abandoned once property is seized.",
  },
  {
    q: "How does the National Trust Act 1999 interact with a testamentary private trust?",
    a: "Section 14 of the National Trust Act, 1999 empowers the Local Level Committee (headed by the District Magistrate or Collector) to appoint a Legal Guardian for persons with autism, cerebral palsy, mental retardation, and multiple disabilities. A well-crafted Will harmonizes with this system by distinguishing the physical care guardian from the financial trustees who control the investment corpus.",
  },
  {
    q: "How is a special needs private trust taxed under Section 164(1) of the Income Tax Act?",
    a: "Normally, discretionary private trusts are taxed at the Maximum Marginal Rate (over 39% to 42%). However, the first proviso to Section 164(1) grants a statutory tax exemption: when a testamentary trust is established exclusively for the benefit of a dependent relative with a disability, the income is taxed at normal individual slab rates. This saves significant corpus funds each year.",
  },
  {
    q: "What is the Medical Emergency Buffer Fund Rule inside the trust clause?",
    a: "The Medical Emergency Buffer Fund Rule requires trustees to keep a minimum percentage of the trust corpus (typically 20% to 25%, or a fixed liquid deposit of ₹25 Lakhs to ₹50 Lakhs) in high-liquidity government-backed securities or bank fixed deposits. Trustees cannot lock this capital in long-term lock-ins, ensuring immediate access during acute health crises or emergency surgeries.",
  },
  {
    q: "How does an institutional co-trustee safeguard the child against predatory relatives?",
    a: "An institutional co-trustee (such as a professional SEBI-registered trustee company or an NGO registered under the National Trust Act) provides institutional oversight. Individual family trustees cannot withdraw large sums or liquidate estate properties without institutional dual-signoff and verified proof of child-related expenditures.",
  },
  {
    q: "Can the trust assets be attached by civil courts or family creditors?",
    a: "No. A properly worded spendthrift and protective trust clause specifies that the beneficiary holds only a right to maintenance and care, not transferable title to the capital corpus. Under Section 60 of the Code of Civil Procedure, trust property cannot be attached to satisfy the debts of relatives, guardians, or third parties.",
  },
  {
    q: "What is a gift-over clause in a special needs testamentary trust?",
    a: "A gift-over clause defines what happens to the residual trust property when the special needs child passes away. Parents can specify that the remaining corpus passes to surviving siblings, named family members, or a dedicated autism or cerebral palsy charity, preventing distant relatives from fighting over the estate.",
  },
];

export default function SpecialNeedsTrustClauseClient() {
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
  const [copiedMasterClause, setCopiedMasterClause] = useState<boolean>(false);
  const [copiedSuccessorClause, setCopiedSuccessorClause] = useState<boolean>(false);
  const [copiedBufferClause, setCopiedBufferClause] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // ==========================================
  // INTERACTIVE TRUST CORPUS & STRUCTURE CALCULATOR
  // ==========================================
  const [monthlyExpense, setMonthlyExpense] = useState<number>(65000);
  const [childAge, setChildAge] = useState<number>(20);
  const [planningHorizonYears, setPlanningHorizonYears] = useState<number>(45);
  const [trusteeGovernanceModel, setTrusteeGovernanceModel] = useState<string>("institutional_dual");
  const [disabilityTier, setDisabilityTier] = useState<string>("severe_80plus");

  // Dynamic Computation
  // Annualized expense
  const annualBaseExpense = monthlyExpense * 12;
  // Capitalization using conservative 3% real return (FD return minus inflation)
  const realReturnRate = 0.03;
  const estimatedRequiredCorpus = Math.round(
    annualBaseExpense * ((1 - Math.pow(1 / (1 + realReturnRate), planningHorizonYears)) / realReturnRate)
  );
  const emergencyBufferAmount = Math.max(2500000, Math.round(estimatedRequiredCorpus * 0.22));
  const totalRecommendedFund = estimatedRequiredCorpus + emergencyBufferAmount;

  // Taxation and Risk Feedback
  let taxBracketStatus = "Normal Individual Slab Rates (Section 164(1) Proviso Exemption Applies)";
  let taxWarningNote = "Eligible for individual slab rates. Trust avoids the punitive 42.74% Maximum Marginal Rate.";

  if (disabilityTier === "mild_unregistered") {
    taxBracketStatus = "Risk of MMR (42.74%) if UDID / 80U Certificate Missing";
    taxWarningNote = "Crucial: Obtain Form 10-IA or UDID card before executing Will to secure Section 164(1) tax relief.";
  }

  let siphoningRiskLevel = "Low Risk (Dual Institutional Sign-Off)";
  let siphoningColor = "text-emerald-700";

  if (trusteeGovernanceModel === "family_sole") {
    siphoningRiskLevel = "High Risk: Sole relative trustee can liquidate funds without oversight.";
    siphoningColor = "text-rose-700";
  } else if (trusteeGovernanceModel === "family_multiple") {
    siphoningRiskLevel = "Moderate Risk: Sibling conflict or aging trustees can cause paralysis.";
    siphoningColor = "text-amber-700";
  } else {
    siphoningRiskLevel = "Protected: Independent institutional co-trustee prevents unauthorized withdrawals.";
    siphoningColor = "text-emerald-700";
  }

  const copyMasterClauseToClipboard = () => {
    const text = `BEQUEST IN TRUST FOR SPECIAL NEEDS CHILD (INDIAN TRUSTS ACT, 1882 & NATIONAL TRUST ACT, 1999)

I. CREATION OF TESTAMENTARY PRIVATE TRUST
Upon my death, I hereby devise, bequeath, and transfer the assets, investments, properties, and bank accounts detailed in Schedule [A] of this Will unto my appointed Trustees:
1. [Full Name of Trustee 1, Relationship, Address, Aadhaar No.]
2. [Full Name of Trustee 2, Relationship, Address, Aadhaar No.]
3. [Name of Institutional Co-Trustee / Registered NGO under National Trust Act / Corporate Trustee]
TO HOLD THE SAME IN TRUST for the sole, exclusive, and lifelong benefit, maintenance, medical care, therapy, shelter, and recreation of my child [Full Legal Name of Special Needs Child], born on [Date of Birth], holder of UDID No. [Number] (hereinafter referred to as the 'Beneficiary').

The trust created under this clause shall be known as the "[Child Name] Lifelong Protection Private Trust" and shall be administered strictly in accordance with the Indian Trusts Act, 1882 and the terms set forth herein.

II. MANDATORY SEPARATION OF GUARDIANSHIP AND TRUSTEESHIP
To safeguard against conflict of interest, I hereby nominate [Full Name of Caregiver/Guardian], residing at [Address], to act as the Legal Guardian of the PERSON of my said child under Section 14 of the National Trust Act, 1999 / Rights of Persons with Disabilities Act, 2016.
PROVIDED ALWAYS that the Legal Guardian of the person shall NOT exercise financial control over the trust corpus. The Trustees shall directly pay medical facilities, caregivers, residential homes, therapists, and utility providers, or disburse a monthly living allowance to the Guardian strictly upon receipt of verified care expense accounts.

III. DISBURSEMENT OF MAINTENANCE & DISCRETIONARY POWERS
The Trustees shall utilize the net income, dividends, and interest generated by the Trust Corpus to meet all living, dietary, assisted living, nursing, psychiatric, occupational therapy, and general welfare expenses of the Beneficiary.
If the income generated is insufficient to maintain the standard of living and medical care of the Beneficiary, the Trustees are empowered to encroach upon and liquidate portions of the capital corpus.

IV. ANTI-ALIENATION AND SPENDTHRIFT CLAUSE
The Beneficiary holds no transferable, assignable, or alienable proprietary right in the Trust Corpus. Neither the Beneficiary, nor any guardian, relative, or creditor shall have any power to pledge, mortgage, sell, assign, or encumber any asset or income of the Trust. The Trust Corpus shall remain completely exempt from attachment by any civil court in execution of decrees against any family member or guardian.`;
    navigator.clipboard.writeText(text);
    setCopiedMasterClause(true);
    setTimeout(() => setCopiedMasterClause(false), 3000);
  };

  const copySuccessorClauseToClipboard = () => {
    const text = `SUCCESSOR TRUSTEE & INSTITUTIONAL CO-TRUSTEE APPOINTMENT CLAUSE

1. VACANCY AND REPLACEMENT:
In the event that any individual Trustee appointed hereunder dies, becomes incapacitated, resigns, or refuses to act as Trustee, the surviving Trustees shall within forty-five (45) days appoint a replacement Trustee possessing known integrity and genuine interest in the welfare of the Beneficiary.

2. MANDATORY INSTITUTIONAL OVERSIGHT:
If at any time the number of individual Trustees falls below two (2), or if all nominated family Trustees predecease the Beneficiary, the administration of the Trust shall automatically vest in [Name of Professional Trust Company / Registered NGO under Section 12 of the National Trust Act, 1999] as the Institutional Managing Trustee.

3. DUAL-AUTHORIZATION RULE:
All bank accounts, demat accounts, and investments held in the name of the Trust shall require joint operational signatures, of which one signature must be that of the Institutional Co-Trustee or an independent Chartered Accountant / Advocate Trustee. No single family member shall hold unmonitored withdrawal powers.

4. INDEPENDENT ANNUAL AUDIT:
The Trustees shall maintain meticulous accounts of all receipts, interest, medical bills, and care disbursements. An independent Chartered Accountant shall audit the Trust accounts annually, and a copy of the audited report shall be submitted to the Local Level Committee constituted under the National Trust Act, 1999 for the district of [District Name].`;
    navigator.clipboard.writeText(text);
    setCopiedSuccessorClause(true);
    setTimeout(() => setCopiedSuccessorClause(false), 3000);
  };

  const copyBufferClauseToClipboard = () => {
    const text = `RING-FENCED MEDICAL EMERGENCY BUFFER FUND & GIFT-OVER PROVISION

1. RING-FENCED EMERGENCY MEDICAL RESERVE:
Out of the total trust assets, the Trustees shall immediately earmark and maintain a liquid sum of not less than INR [e.g., 25,00,000 / 50,00,000] in auto-renewing Fixed Deposits with a Scheduled Commercial Bank or sovereign-backed liquid funds, titled the "Emergency Medical Buffer Fund".
This reserve fund shall remain inviolable and shall not be deployed in real estate, equity instruments, or long-term lock-ins. The Trustees shall draw upon this fund strictly for emergency hospitalization, critical surgeries, life-saving pharmaceuticals, or intensive palliative care required by the Beneficiary.

2. RESIDUAL GIFT-OVER UPON DEMISE OF BENEFICIARY:
Upon the eventual demise of my beloved child [Name of Beneficiary], the Trust shall stand dissolved, and any remaining Trust Corpus, unexpended income, and investments shall be distributed strictly as follows:
(a) [Percentage, e.g., 50%] shall devolve absolutely upon my surviving child [Full Name of Sibling], or their legal heirs;
(b) [Percentage, e.g., 50%] shall be paid as a corpus donation to [Name of Registered Special Needs NGO / Autism Foundation / Charitable Society], to be utilized for the welfare of underprivileged individuals with developmental disabilities.
Under no circumstances shall the residual trust property devolve under general intestate succession to collateral relatives who did not participate in the care of the Beneficiary.`;
    navigator.clipboard.writeText(text);
    setCopiedBufferClause(true);
    setTimeout(() => setCopiedBufferClause(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const text = `SPECIAL NEEDS WILL & PRIVATE TRUST DRAFTING CHECKLIST (INDIA):
1. Disability Certificate / UDID Card issued by competent medical authority under RPwD Act 2016
2. Form 10-IA / Section 80U certification confirming severe or permanent disability
3. Clear separation of Legal Guardian of Person (under Sec 14 National Trust Act) and Financial Trustees
4. Nomination of minimum 2 individual Trustees plus 1 Institutional Co-Trustee or Registered NGO
5. Ring-fenced Medical Emergency Buffer Fund clause (liquid fixed deposits)
6. Anti-alienation / spendthrift protective clause prohibiting creditor attachment
7. Annual audit requirement by independent Chartered Accountant
8. Clear Gift-Over / residuary bequest clause for remaining corpus upon child's eventual demise
9. Bank and demat account transition protocol with joint-signoff rules
10. Two independent adult witnesses (not named as Trustees or residuary beneficiaries)`;
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
            <span>INDIAN TRUSTS ACT, 1882 • NATIONAL TRUST ACT, 1999 • RPWD ACT, 2016</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes, distinct from Page Title) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Special Needs Child Trust Clause Format for Indian Wills
          </h1>

          {/* Subtitle Paragraph (Plain language, readable, active voice) */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Protect your disabled or autistic child with a legally sound testamentary trust clause. Ensure lifelong care,
            prevent relatives from siphoning assets, and retain individual tax slab rates under Indian law.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#master-trust-clause-format"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>Get Trust Clause Format</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/services/private-family-trust-formation"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <HeartHandshake className="w-4 h-4 text-[#C65378]" />
              <span>Create Protective Trust</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 5 &amp; 6</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                INDIAN TRUSTS ACT, 1882
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 14</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                NATIONAL TRUST ACT GUARDIAN
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Sec 164(1)</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                INDIVIDUAL SLAB TAX BENEFIT
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Zero Siphoning</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                INSTITUTIONAL CO-TRUSTEE
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
                <span>Private Trust Bench</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Complies with Sections 5, 6, 11, and 20 of the Indian Trusts Act, 1882, the National Trust Act, 1999,
                and Section 164(1) of the Income Tax Act, 1961.
              </p>
            </div>

            {/* Critical Care Alert */}
            <div className="bg-rose-50/80 rounded-2xl border border-rose-200/90 p-4 text-xs text-rose-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#C65378]">
                <Clock className="w-4 h-4 text-[#C65378]" />
                <span>Crucial Estate Rule</span>
              </div>
              <p className="leading-relaxed text-[11px] text-rose-900">
                Never appoint a single family relative as sole trustee and sole caregiver. Always separate the physical
                caregiver from financial management to prevent financial abuse.
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
                <span>EXECUTIVE BRIEF: SPECIAL NEEDS WILL TRUST RULES</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Why Direct Bequests Fail:</strong> Leaving real estate or cash directly to an autistic or
                    intellectually disabled child leaves them prey to unscrupulous relatives, title disputes, and court
                    delays.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Testamentary Private Trust Mechanism:</strong> Assets move into a trust under your Will upon
                    your demise, managed by trustees strictly for the lifelong maintenance, housing, and therapy of the
                    child.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Separation of Guardian &amp; Trustees:</strong> The caregiver managing personal hygiene and
                    daily living is kept separate from the trustees managing the financial investments, eliminating conflict
                    of interest.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Section 164(1) Tax Relief:</strong> Unlike commercial discretionary trusts taxed at 42.74%
                    Maximum Marginal Rate, trusts created for disabled relatives are taxed at standard individual slab rates.
                  </span>
                </li>
              </ul>
            </div>

            {/* EDITORIAL BANNER IMAGE CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="relative aspect-[16/9] w-full bg-slate-900">
                <Image
                  src="/images/special-needs-child-private-trust-clause-format-og.jpg"
                  alt="Special Needs Child Private Trust Clause Format for Indian Wills under Indian Trusts Act"
                  width={1200}
                  height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                />
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
                <span className="font-semibold text-slate-700">
                  Estate Security Series: Testamentary Private Trust Formats for Special Needs Children
                </span>
                <span className="text-[11px] font-mono text-[#C65378] font-bold">
                  NATIONAL TRUST ACT 1999 COMPLIANT
                </span>
              </div>
            </div>

            {/* SECTION 1: STATUTORY PURPOSE & SCOPE (ONLY H2 ON THE PAGE) */}
            <section id="statutory-purpose-scope" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Testamentary Special Needs Trust: Legal Framework
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  Every parent of a child with autism, Down syndrome, cerebral palsy, or intellectual disabilities lives
                  with one consuming anxiety: <em>Who will protect and provide for my child after my demise?</em> Leaving
                  wealth to extended relatives with verbal promises almost invariably results in broken trust, asset
                  diversion, and institutional abandonment.
                </p>
                <p>
                  Indian law provides a robust institutional solution: creating a <strong>Testamentary Private Family
                  Trust</strong> within your Last Will and Testament under Section 5 and Section 6 of the Indian Trusts
                  Act, 1882. A testamentary trust costs zero rupees to maintain while you are alive, coming into full
                  legal operation only upon your demise.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                    Statutory Rule: Section 5 &amp; 6 of the Indian Trusts Act, 1882
                  </div>
                  <p className="text-xs text-slate-700 italic">
                    A trust in relation to immovable property may be created by a valid Will executed in accordance with
                    the Indian Succession Act, 1925, vesting specified corpus property in named Trustees for the benefit of
                    a designated beneficiary with absolute certainty of intention, purpose, and property.
                  </p>
                </div>
                <p>
                  Unlike an outright gift or direct bequest, a testamentary trust establishes a protective corporate
                  umbrella. The trust holds legal title to the apartments, fixed deposits, mutual funds, and insurance
                  proceeds, while the special needs child holds the equitable right to lifelong maintenance, attendant
                  care, medical therapies, and dignified housing.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE TRUST CORPUS & STRUCTURE CALCULATOR */}
            <section id="trust-corpus-calculator" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>DIAGNOSTIC &amp; CORPUS ESTIMATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Trust Corpus &amp; Trustee Structure Calculator
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Estimate the lifelong inflation-adjusted corpus required to maintain your child, calculate the emergency
                medical buffer fund, and verify your trustee protection rating.
              </p>

              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Input 1: Monthly Expenses */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Current Monthly Care &amp; Therapy Expense (₹):
                    </label>
                    <div className="text-base font-black text-[#C65378]">₹{monthlyExpense.toLocaleString("en-IN")} / month</div>
                    <input
                      type="range"
                      min={25000}
                      max={250000}
                      step={5000}
                      value={monthlyExpense}
                      onChange={(e) => setMonthlyExpense(parseInt(e.target.value) || 25000)}
                      className="w-full accent-[#C65378]"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                      <span>₹25,000 (Basic)</span>
                      <span>₹1,00,000 (Therapy + Nursing)</span>
                      <span>₹2,50,000 (24/7 Assisted Living)</span>
                    </div>
                  </div>

                  {/* Input 2: Planning Horizon */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Expected Care Horizon: {planningHorizonYears} Years (Child Age: {childAge})
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="w-1/2">
                        <span className="text-[11px] text-slate-600 block mb-1">Child Current Age:</span>
                        <input
                          type="number"
                          min={1}
                          max={60}
                          value={childAge}
                          onChange={(e) => setChildAge(parseInt(e.target.value) || 1)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
                        />
                      </div>
                      <div className="w-1/2">
                        <span className="text-[11px] text-slate-600 block mb-1">Care Lifespan (Years):</span>
                        <input
                          type="number"
                          min={10}
                          max={70}
                          value={planningHorizonYears}
                          onChange={(e) => setPlanningHorizonYears(parseInt(e.target.value) || 10)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Input 3: Trustee Governance Model */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Proposed Trustee Governance Setup:
                    </label>
                    <select
                      value={trusteeGovernanceModel}
                      onChange={(e) => setTrusteeGovernanceModel(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="institutional_dual">Institutional Co-Trustee + Family Trustee (Highest Protection)</option>
                      <option value="family_multiple">Multiple Siblings / Relatives + CA Oversight</option>
                      <option value="family_sole">Single Relative as Sole Trustee (High Risk)</option>
                    </select>
                  </div>

                  {/* Input 4: Disability Certification Status */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Disability Certification / Tax Exemption:
                    </label>
                    <select
                      value={disabilityTier}
                      onChange={(e) => setDisabilityTier(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C65378]"
                    >
                      <option value="severe_80plus">Severe Disability (≥ 80% / Form 10-IA / Section 80U Certified)</option>
                      <option value="moderate_40to80">Moderate Disability (40% to 79% UDID Card Holder)</option>
                      <option value="mild_unregistered">Unregistered / Certificate Pending</option>
                    </select>
                  </div>
                </div>

                {/* COMPUTED RESULTS SUMMARY CARD */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#172228] text-white space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="text-xs uppercase font-extrabold tracking-wider text-rose-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#C65378]" />
                      <span>ACTUARIAL ESTIMATE &amp; RISK PROFILE</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-300 font-bold">
                      INFLATION-ADJUSTED (3% NET REAL YIELD)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-[11px] text-slate-300 font-bold uppercase">Estimated Maintenance Corpus</div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-1">
                        ₹{(estimatedRequiredCorpus / 10000000).toFixed(2)} Cr
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Covers ₹{(annualBaseExpense / 100000).toFixed(1)} Lakh/year for {planningHorizonYears} years
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-[11px] text-slate-300 font-bold uppercase">Ring-Fenced Emergency Buffer</div>
                      <div className="text-xl sm:text-2xl font-black text-rose-300 mt-1">
                        ₹{(emergencyBufferAmount / 100000).toFixed(1)} Lakhs
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Liquid FDs for hospitalization and critical care
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-[11px] text-slate-300 font-bold uppercase">Total Estate Corpus Needed</div>
                      <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
                        ₹{(totalRecommendedFund / 10000000).toFixed(2)} Cr
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Combined capital across flats, FDs, and insurance
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>
                        <strong>Tax Treatment:</strong> {taxBracketStatus}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>
                        <strong>Governance Safeguard:</strong> {siphoningRiskLevel}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 italic">
                      {taxWarningNote}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: DIRECT BEQUEST VS GUARDIANSHIP VS PRIVATE TRUST */}
            <section id="bequest-vs-trust-comparison" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>LEGAL COMPARISON MATRIX</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Direct Bequest vs Guardianship vs Private Trust
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Understand how different estate succession methods perform when protecting a vulnerable dependent child
                under Indian law:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800">
                      <th className="p-3.5 font-extrabold uppercase tracking-wider">Evaluation Parameter</th>
                      <th className="p-3.5 font-extrabold uppercase tracking-wider text-rose-800">
                        Direct Will Bequest to Child
                      </th>
                      <th className="p-3.5 font-extrabold uppercase tracking-wider text-amber-800">
                        Guardianship Only (Court / LLC)
                      </th>
                      <th className="p-3.5 font-extrabold uppercase tracking-wider text-emerald-800">
                        Testamentary Private Trust
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Asset Title &amp; Control</td>
                      <td className="p-3.5 text-rose-700 font-medium">Child holds title; frozen due to legal incapacity</td>
                      <td className="p-3.5 text-amber-700">Guardian holds control; high temptation to siphon</td>
                      <td className="p-3.5 text-emerald-800 font-bold">
                        Trustees hold title in fiduciary trust; child gets maintenance
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Misappropriation Safeguard</td>
                      <td className="p-3.5 text-rose-700 font-bold">Zero. Relatives easily forge papers or coerce</td>
                      <td className="p-3.5 text-amber-700">Weak. Minimal ongoing judicial monitoring</td>
                      <td className="p-3.5 text-emerald-800 font-bold">
                        Absolute. Dual institutional sign-off prevents unauthorized withdrawals
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Succession on Child Demise</td>
                      <td className="p-3.5">Devolves under intestate law to distant collaterals</td>
                      <td className="p-3.5">Fierce property disputes among legal heirs</td>
                      <td className="p-3.5 text-emerald-800 font-bold">
                        Pre-defined Gift-Over clause sends residual funds to siblings or charity
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Income Tax Slab Relief</td>
                      <td className="p-3.5">Individual slab rates apply to child</td>
                      <td className="p-3.5">Individual slab rates apply to child</td>
                      <td className="p-3.5 text-emerald-800 font-bold">
                        Individual slab rates protected under Section 164(1) Proviso
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Emergency Liquidity Access</td>
                      <td className="p-3.5 text-rose-700">Requires court permission to sell or pledge land</td>
                      <td className="p-3.5">Subject to District Magistrate LLC sanction</td>
                      <td className="p-3.5 text-emerald-800 font-bold">
                        Instant access via ring-fenced Emergency Medical Buffer Fund
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: MASTER COPY-PASTE TRUST CLAUSE FORMAT */}
            <section id="master-trust-clause-format" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>COPY-PASTE TEMPLATE 1</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Master Special Needs Testamentary Trust Format
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Insert this comprehensive master clause directly into your Will. Replace bracketed text with your family
                details, trustee names, and asset schedules.
              </p>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900">
                    Master Testamentary Private Trust Clause (Indian Trusts Act, 1882)
                  </div>
                  <button
                    type="button"
                    onClick={copyMasterClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedMasterClause ? (
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
{`BEQUEST IN TRUST FOR SPECIAL NEEDS CHILD (INDIAN TRUSTS ACT, 1882 & NATIONAL TRUST ACT, 1999)

I. CREATION OF TESTAMENTARY PRIVATE TRUST
Upon my death, I hereby devise, bequeath, and transfer the assets, investments, properties, and bank accounts detailed in Schedule [A] of this Will unto my appointed Trustees:
1. [Full Name of Trustee 1, Relationship, Address, Aadhaar No.]
2. [Full Name of Trustee 2, Relationship, Address, Aadhaar No.]
3. [Name of Institutional Co-Trustee / Registered NGO under National Trust Act / Corporate Trustee]
TO HOLD THE SAME IN TRUST for the sole, exclusive, and lifelong benefit, maintenance, medical care, therapy, shelter, and recreation of my child [Full Legal Name of Special Needs Child], born on [Date of Birth], holder of UDID No. [Number] (hereinafter referred to as the 'Beneficiary').

The trust created under this clause shall be known as the "[Child Name] Lifelong Protection Private Trust" and shall be administered strictly in accordance with the Indian Trusts Act, 1882 and the terms set forth herein.

II. MANDATORY SEPARATION OF GUARDIANSHIP AND TRUSTEESHIP
To safeguard against conflict of interest, I hereby nominate [Full Name of Caregiver/Guardian], residing at [Address], to act as the Legal Guardian of the PERSON of my said child under Section 14 of the National Trust Act, 1999 / Rights of Persons with Disabilities Act, 2016.
PROVIDED ALWAYS that the Legal Guardian of the person shall NOT exercise financial control over the trust corpus. The Trustees shall directly pay medical facilities, caregivers, residential homes, therapists, and utility providers, or disburse a monthly living allowance to the Guardian strictly upon receipt of verified care expense accounts.

III. DISBURSEMENT OF MAINTENANCE & DISCRETIONARY POWERS
The Trustees shall utilize the net income, dividends, and interest generated by the Trust Corpus to meet all living, dietary, assisted living, nursing, psychiatric, occupational therapy, and general welfare expenses of the Beneficiary.
If the income generated is insufficient to maintain the standard of living and medical care of the Beneficiary, the Trustees are empowered to encroach upon and liquidate portions of the capital corpus.

IV. ANTI-ALIENATION AND SPENDTHRIFT CLAUSE
The Beneficiary holds no transferable, assignable, or alienable proprietary right in the Trust Corpus. Neither the Beneficiary, nor any guardian, relative, or creditor shall have any power to pledge, mortgage, sell, assign, or encumber any asset or income of the Trust. The Trust Corpus shall remain completely exempt from attachment by any civil court in execution of decrees against any family member or guardian.`}
                </pre>
              </div>
            </section>

            {/* SECTION 5: SUCCESSOR TRUSTEE & INSTITUTIONAL CO-TRUSTEE CLAUSE */}
            <section id="successor-trustee-clause" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>COPY-PASTE TEMPLATE 2</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Successor Trustee &amp; Institutional Co-Trustee Clause
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Prevent the trust from lapsing when family trustees age, relocate, or pass away. This clause guarantees
                institutional oversight and dual-signoff.
              </p>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900">
                    Successor Trustee &amp; Dual Institutional Sign-Off Clause
                  </div>
                  <button
                    type="button"
                    onClick={copySuccessorClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedSuccessorClause ? (
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
{`SUCCESSOR TRUSTEE & INSTITUTIONAL CO-TRUSTEE APPOINTMENT CLAUSE

1. VACANCY AND REPLACEMENT:
In the event that any individual Trustee appointed hereunder dies, becomes incapacitated, resigns, or refuses to act as Trustee, the surviving Trustees shall within forty-five (45) days appoint a replacement Trustee possessing known integrity and genuine interest in the welfare of the Beneficiary.

2. MANDATORY INSTITUTIONAL OVERSIGHT:
If at any time the number of individual Trustees falls below two (2), or if all nominated family Trustees predecease the Beneficiary, the administration of the Trust shall automatically vest in [Name of Professional Trust Company / Registered NGO under Section 12 of the National Trust Act, 1999] as the Institutional Managing Trustee.

3. DUAL-AUTHORIZATION RULE:
All bank accounts, demat accounts, and investments held in the name of the Trust shall require joint operational signatures, of which one signature must be that of the Institutional Co-Trustee or an independent Chartered Accountant / Advocate Trustee. No single family member shall hold unmonitored withdrawal powers.

4. INDEPENDENT ANNUAL AUDIT:
The Trustees shall maintain meticulous accounts of all receipts, interest, medical bills, and care disbursements. An independent Chartered Accountant shall audit the Trust accounts annually, and a copy of the audited report shall be submitted to the Local Level Committee constituted under the National Trust Act, 1999 for the district of [District Name].`}
                </pre>
              </div>
            </section>

            {/* SECTION 6: MEDICAL EMERGENCY BUFFER FUND RULE */}
            <section id="medical-buffer-fund-rule" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Stethoscope className="w-4 h-4" />
                <span>COPY-PASTE TEMPLATE 3</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Medical Emergency Buffer Fund &amp; Caregiver Rules
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Ensure that emergency surgeries, unexpected psychiatric hospitalizations, and specialized care can be funded
                instantly without needing to sell real estate. Includes a definitive Gift-Over distribution rule.
              </p>

              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900">
                    Emergency Medical Reserve &amp; Residuary Gift-Over Clause
                  </div>
                  <button
                    type="button"
                    onClick={copyBufferClauseToClipboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedBufferClause ? (
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
{`RING-FENCED MEDICAL EMERGENCY BUFFER FUND & GIFT-OVER PROVISION

1. RING-FENCED EMERGENCY MEDICAL RESERVE:
Out of the total trust assets, the Trustees shall immediately earmark and maintain a liquid sum of not less than INR [e.g., 25,00,000 / 50,00,000] in auto-renewing Fixed Deposits with a Scheduled Commercial Bank or sovereign-backed liquid funds, titled the "Emergency Medical Buffer Fund".
This reserve fund shall remain inviolable and shall not be deployed in real estate, equity instruments, or long-term lock-ins. The Trustees shall draw upon this fund strictly for emergency hospitalization, critical surgeries, life-saving pharmaceuticals, or intensive palliative care required by the Beneficiary.

2. RESIDUAL GIFT-OVER UPON DEMISE OF BENEFICIARY:
Upon the eventual demise of my beloved child [Name of Beneficiary], the Trust shall stand dissolved, and any remaining Trust Corpus, unexpended income, and investments shall be distributed strictly as follows:
(a) [Percentage, e.g., 50%] shall devolve absolutely upon my surviving child [Full Name of Sibling], or their legal heirs;
(b) [Percentage, e.g., 50%] shall be paid as a corpus donation to [Name of Registered Special Needs NGO / Autism Foundation / Charitable Society], to be utilized for the welfare of underprivileged individuals with developmental disabilities.
Under no circumstances shall the residual trust property devolve under general intestate succession to collateral relatives who did not participate in the care of the Beneficiary.`}
                </pre>
              </div>
            </section>

            {/* SECTION 7: NATIONAL TRUST ACT 1999 & RPWD ACT 2016 SAFEGUARDS */}
            <section id="disability-act-safeguards" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>STATUTORY HARMONIZATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. National Trust Act 1999 &amp; RPwD Act 2016 Safeguards
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  A Will clause cannot operate in an institutional vacuum. To guarantee complete protection against
                  hostile relatives, your trust clause must explicitly harmonize with India&apos;s two landmark disability
                  statutes:
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-xs">
                      1. The National Trust Act, 1999 (Section 14 Guardianship Integration)
                    </div>
                    <p className="text-xs text-slate-600">
                      Covers autism, cerebral palsy, mental retardation, and multiple disabilities. Parents can apply
                      during their lifetime to the Local Level Committee (headed by the District Collector) to appoint a
                      statutory Legal Guardian. Your Will trust clause must acknowledge this statutory guardianship while
                      restricting financial withdrawal powers to the Trustees.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-xs">
                      2. Rights of Persons with Disabilities Act, 2016 (RPwD Act, Section 14 Limited Guardianship)
                    </div>
                    <p className="text-xs text-slate-600">
                      Recognizes the legal capacity of disabled persons and introduces &quot;limited guardianship&quot; based on mutual
                      trust and consultation. For individuals with mild to moderate conditions, limited guardianship ensures
                      the child participates in personal lifestyle decisions while trustees safeguard capital assets.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-xs">
                      3. Registered NGO as Institutional Supervisor
                    </div>
                    <p className="text-xs text-slate-600">
                      Under Section 12 of the National Trust Act, registered non-governmental organizations can be named as
                      supervisory monitors. The NGO conducts bi-annual home visits, assesses living conditions, and submits
                      welfare audits to the District Magistrate.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: INCOME TAX SLAB RELIEF UNDER SECTION 164(1) */}
            <section id="income-tax-slab-relief" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>INCOME TAX ACT EXEMPTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Tax Exemption: Section 164(1) Individual Slab Rates
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  One of the biggest pitfalls in Indian private trust planning is taxation. As a general rule,
                  discretionary private family trusts are taxed at the <strong>Maximum Marginal Rate (MMR)</strong> of
                  39% to 42.74%. Taxing rental income or interest at 42.74% can decimate the child&apos;s maintenance corpus.
                </p>
                <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-2">
                  <div className="font-extrabold text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>The Section 164(1) First Proviso Statutory Shelter</span>
                  </div>
                  <p className="text-xs text-emerald-900">
                    Under the first proviso to Section 164(1) of the Income Tax Act, 1961, if a trust is declared by a
                    Will and created exclusively for the benefit of any relative wholly dependent on the testator for
                    support and maintenance who suffers from a disability (referenced under Section 80U or Section 80DD),
                    <strong> the entire trust income is taxed at normal individual slab rates</strong> instead of the
                    punitive MMR!
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="font-bold text-slate-900 mb-1">Standard Trust (MMR)</div>
                    <p className="text-slate-600">
                      An ordinary private trust generating ₹15 Lakhs annual income pays over ₹6.4 Lakhs in taxes at 42.74%,
                      leaving only ₹8.6 Lakhs for maintenance.
                    </p>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="font-bold text-emerald-950 mb-1">Special Needs Trust (Slab Rates)</div>
                    <p className="text-emerald-900">
                      A compliant Section 164(1) trust pays under ₹1.5 Lakhs in individual slab taxes on the same ₹15 Lakhs
                      income, preserving nearly ₹5 Lakhs extra annually for child care.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: STEP-BY-STEP SOP */}
            <section id="step-by-step-trust-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>PRACTICAL IMPLEMENTATION SOP</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Step-by-Step SOP: Setting Up a Special Needs Trust
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Procure Disability Certification &amp; UDID Card</div>
                      <p className="text-slate-600 mt-0.5">
                        Ensure the child possesses a valid UDID card and medical disability certificate under the RPwD Act,
                        2016, and Form 10-IA for Section 80U income tax slab eligibility.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Separate the Caregiver from Trustees</div>
                      <p className="text-slate-600 mt-0.5">
                        Nominate a dedicated loving guardian of the person (who lives with the child) and appoint 2
                        financially astute trustees plus an institutional co-trustee to manage the money.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Incorporate the Trust Clause in Your Will</div>
                      <p className="text-slate-600 mt-0.5">
                        Draft your Last Will and Testament incorporating the Master Testamentary Trust Clause, Successor
                        Trustee Clause, and Medical Emergency Buffer Fund Rule.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Execute &amp; Attest with Two Witnesses</div>
                      <p className="text-slate-600 mt-0.5">
                        Sign the Will in the presence of two independent adult witnesses (not named as trustees or
                        beneficiaries). Obtain a registered medical practitioner fitness certificate.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                      5
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Register the Will at Sub-Registrar Office</div>
                      <p className="text-slate-600 mt-0.5">
                        While optional under Indian law, registering the Will at the SRO establishes unimpeachable evidentiary
                        authenticity and stops relatives from challenging testamentary capacity.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#172228] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                      6
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Activate Bank &amp; PAN Documentation Post-Demise</div>
                      <p className="text-slate-600 mt-0.5">
                        Upon the demise of the parents, the executor applies for probate (if required) and registers the
                        Trust PAN card with the Income Tax Department to commence tax-exempt operations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 10: COMMON FATAL MISTAKES */}
            <section id="common-planning-mistakes" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertCircle className="w-4 h-4" />
                <span>PREVENT COSTLY ESTATE BLUNDERS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Five Fatal Mistakes to Avoid for Disabled Children
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Appointing a Sole Relative Trustee</span>
                  </div>
                  <p className="text-slate-600">
                    Never leave complete control to a single brother, sister, or uncle. When family pressures or financial
                    hardships arise, sole trustees frequently siphon the child&apos;s maintenance corpus.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Leaving Property Directly in Child&apos;s Name</span>
                  </div>
                  <p className="text-slate-600">
                    A child with cognitive disability cannot sign sale deeds, rent agreements, or banking KYC. The estate
                    becomes paralyzed in lengthy guardianship litigation.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Omitting the Successor Trustee Clause</span>
                  </div>
                  <p className="text-slate-600">
                    If your named trustees age or die, who manages the funds? Without a successor clause, trust assets get
                    frozen until civil courts appoint an administrator.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-extrabold text-rose-600 text-xs flex items-center gap-1.5">
                    <X className="w-4 h-4" />
                    <span>Forgetting the Residual Gift-Over Rule</span>
                  </div>
                  <p className="text-slate-600">
                    If the Will doesn&apos;t specify who gets remaining money after the child passes away, distant relatives who
                    never visited will wage bitter court battles over the estate.
                  </p>
                </div>
              </div>
            </section>

            {/* MID-ARTICLE CONTEXTUAL TOOLS INTEGRATION */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-[#172228] text-white space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-300 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#C65378]" />
                <span>INTEGRATED ESTATE PLANNING DIAGNOSTIC SUITE</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold">
                Analyze Legal Validity, Trust Corpuses &amp; Heir Entitlements
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Before finalizing your testamentary trust, assess baseline probate requirements, statutory heir shares,
                and trust corpus models with our free tools:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold">
                <Link
                  href="/tools/minor-child-testamentary-trust-corpus-calculator"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-between transition-colors"
                >
                  <span>Minor Trust Corpus Tool</span>
                  <ArrowRight className="w-4 h-4 text-rose-300" />
                </Link>
                <Link
                  href="/tools/probate-checker"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-between transition-colors"
                >
                  <span>Probate Mandate Checker</span>
                  <ArrowRight className="w-4 h-4 text-rose-300" />
                </Link>
                <Link
                  href="/tools/succession-calculator"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-between transition-colors"
                >
                  <span>Legal Heir Share Tool</span>
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
                11. Institutional Profile: Private Trust Desk
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Private Family Trust Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Checked Estate Bench</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is powered by AMA Legal Solutions. Our senior trust counsels and estate planners guide
                  parents across India and NRI families abroad. We structure bulletproof testamentary private trusts,
                  coordinate institutional co-trustee partnerships with National Trust NGOs, and secure Section 164(1)
                  individual slab tax exemptions for disabled beneficiaries.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/private-family-trust-formation"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Private Trust Formation Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/services/will-registration"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>SRO Registration Desk</span>
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
                12. Frequently Asked Questions: Special Needs Trusts
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
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-[#C65378] transition-colors"
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

            {/* SECTION 13: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY CITATIONS &amp; OFFICIAL PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Statutory Rules &amp; Government Portals
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 text-xs">
                <div className="space-y-2">
                  <div className="font-extrabold text-slate-900">
                    Governing Laws of Indian Testamentary Trusts &amp; Disability Rights:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      <strong>Indian Trusts Act, 1882 (Sections 5 &amp; 6):</strong> Legal creation of testamentary
                      private trusts via Last Will and Testament.
                    </li>
                    <li>
                      <strong>The National Trust Act, 1999 (Section 14):</strong> Statutory appointment of Legal
                      Guardians by Local Level Committees for autism, cerebral palsy, and intellectual disability.
                    </li>
                    <li>
                      <strong>The Rights of Persons with Disabilities Act, 2016 (Section 14):</strong> Provision for
                      limited guardianship and equal legal capacity.
                    </li>
                    <li>
                      <strong>Income Tax Act, 1961 (Section 164(1) Proviso):</strong> Mandatory tax exemption granting
                      individual slab rates to private trusts for disabled relatives.
                    </li>
                    <li>
                      <strong>Code of Civil Procedure, 1908 (Section 60):</strong> Spendthrift protection shielding trust
                      corpus from civil court creditor attachment.
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
                    <span>India Code: Indian Trusts Act</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://thenationaltrust.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>The National Trust Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.incometax.gov.in/iec/foportal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>Income Tax Filing Portal (Sec 164)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.swavlambancard.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-semibold"
                  >
                    <span>UDID Disability Card Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Estate Guides &amp; Templates
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/templates/testamentary-trust-clause-minor-child-will-format"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Minor Child Trust Clause Format
                    </Link>
                    <Link
                      href="/templates/life-interest-clause-for-spouse-will-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Spouse Life Interest Clause Format
                    </Link>
                    <Link
                      href="/templates/disinheritance-exclusion-clause-format-will"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Relative Exclusion Clause Format
                    </Link>
                    <Link
                      href="/templates/executor-consent-and-renunciation-letter-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Executor Consent Letter Format
                    </Link>
                    <Link
                      href="/templates/family-settlement-agreement-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Family Settlement Agreement Format
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* PLAIN-ENGLISH 3-CARD SUMMARY GRID */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/70 pt-6">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Why Write a Will Now?</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A clear Will keeps your special needs child safe. It stops greedy relatives from seizing assets. You
                  appoint who manages the money and who provides daily care. Do not delay your child&apos;s protection.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">Simple Plain Paper Rules</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You can write a testamentary trust clause on plain white paper inside your Will. No stamp paper is
                  needed. Sign in front of two adult witnesses who are not trustees to make it legally binding.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 mb-1">How Our Team Helps</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our private trust bench structures airtight clauses with institutional co-trustees. We verify your UDID
                  tax eligibility and help register your Will at the Sub-Registrar Office so your child stays safe forever.
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
                    Senior Private Trust Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Expert in Indian private family trusts, testamentary trusts for special needs children, National Trust
                Act LLC guardianship, and Section 164(1) tax shelters pan-India.
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
                  <span>PREVENT RELATIVE MISAPPROPRIATION</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Draft a Fight-Proof Will for Your Child
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A comprehensive Will with an integrated private trust clause protects your special needs child for
                  their entire life.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Protective Will in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>UDID Ready &amp; SRO Sub-Registrar Compliant</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - PRIVATE FAMILY TRUST FORMATION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <HeartHandshake className="w-3 h-3" />
                  <span>SPECIAL NEEDS TRUST DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need a Customized Private Family Trust?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Looking to establish an immediate living trust or need institutional co-trustee appointment under the
                  National Trust Act? Our senior trust attorneys handle end-to-end formation.
                </p>
                <Link
                  href="/services/private-family-trust-formation"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Consult Trust Formation Lawyer</span>
                </Link>
              </div>

              {/* CARD 4: DOCUMENT CHECKLIST CARD */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-[#C65378]" />
                    <span>Trust Clause Papers Required</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyChecklistToClipboard}
                    className="text-[11px] font-bold text-[#C65378] hover:underline"
                  >
                    {copiedChecklist ? "Copied!" : "Copy"}
                  </button>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-600">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>UDID Disability Card &amp; Form 10-IA</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>National Trust Act LLC Guardianship</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Written Consent of Appointed Trustees</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Asset Schedule (Flats, FDs, Demat)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Two Independent Attesting Witnesses</span>
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
