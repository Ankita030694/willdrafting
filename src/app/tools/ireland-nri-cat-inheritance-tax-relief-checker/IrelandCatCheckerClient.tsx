"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
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
  Sparkles,
  HelpCircle,
  FileCheck,
  RefreshCw,
  Landmark,
  Check,
  Building2,
  Info,
  Gavel,
  Calculator,
  Copy,
  CheckCheck,
  Users,
  FileText,
  Layers,
  History,
  GitBranch,
  Globe,
  Coins,
  Send,
  Calendar,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-scope", label: "1. Legal Framework: Irish CAT on Indian Assets" },
  { id: "interactive-calculator", label: "2. Free Irish CAT & Repatriation Calculator" },
  { id: "budget-2024-thresholds", label: "3. Budget 2024 Thresholds: Group A, B & C" },
  { id: "five-year-non-dom-rule", label: "4. The 5-Year Non-Dom Tax Shield Rule" },
  { id: "section-72-and-dtaa", label: "5. Section 72 Insurance & Double Tax Rules" },
  { id: "it38-reporting-stepper", label: "6. Form IT38 Filing Stepper: 31 October Rule" },
  { id: "fema-repatriation-box", label: "7. FEMA USD 1M Repatriation via 15CA & 15CB" },
  { id: "tax-comparison-matrix", label: "8. Tax Comparison: Irish CAT vs Indian CGT" },
  { id: "real-world-case-studies", label: "9. Real NRI Case Studies: Dublin, Cork & Galway" },
  { id: "cross-border-sop", label: "10. Step-by-Step SOP: Cross-Border Inheritance" },
  { id: "document-checklist", label: "11. Form IT38 & FEMA 15CA/15CB Checklist" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions: Irish NRI CAT" },
  { id: "statutory-citations", label: "13. Legal Citations & Official Portals" },
];

const FAQS = [
  {
    q: "Does Irish 33% Capital Acquisitions Tax apply to Indian inherited property?",
    a: "Yes. Under Irish tax law, if you live in Ireland, you pay tax on gifts and inheritances from anywhere in the world. This tax is called Capital Acquisitions Tax, or CAT. The flat tax rate is 33%. But you only pay tax on the value above your tax-free limit. Indian citizens who have lived in Ireland for under 5 years may be exempt under non-domiciled rules.",
  },
  {
    q: "What is the Group A inheritance tax threshold in Ireland for inherited Indian assets?",
    a: "Under Budget 2024, the Group A tax-free limit is 400,000 Euros. This rule applies to gifts or inheritances from a parent to a child. You only pay 33% tax on the amount above 400,000 Euros. Prior gifts from parents since 5 December 1991 reduce this available limit.",
  },
  {
    q: "What is the 5-year non-domiciled residency rule for Indian expats in Dublin?",
    a: "Under Section 11 of the CAT Act 2003, non-domiciled Indian citizens are not taxed on foreign assets unless they have lived in Ireland for 5 tax years in a row. If you have lived in Ireland for under 5 years, you pay zero Irish CAT on property inherited in India from your parents.",
  },
  {
    q: "When is Form IT38 mandatory even if no Irish inheritance tax is payable?",
    a: "Under Section 46 of the CAT Act, you must file Form IT38 if the asset value reaches 80% of your group limit. For Group A, 80% is 320,000 Euros. If you inherit an Indian house worth 330,000 Euros, your tax is zero Euros. But you must still file Form IT38 online. If you fail to file, Irish Revenue charges late filing surcharges.",
  },
  {
    q: "What is the filing and payment deadline for Irish Form IT38?",
    a: "The deadline depends on your valuation date. If the valuation date falls between 1 January and 31 August, you must file and pay by 31 October of that same year. If the date falls between 1 September and 31 December, you must file and pay by 31 October of the next year.",
  },
  {
    q: "Can Irish CAT be credited against Indian capital gains tax under the DTAA?",
    a: "No. India has no inheritance tax. It ended Estate Duty in 1985. Since you pay zero inheritance tax in India, there is no Indian tax to credit against Irish CAT. But if you sell the inherited flat in India, Indian tax on that sale can be credited against Irish Capital Gains Tax under Article 13 of the tax treaty.",
  },
  {
    q: "How can an NRI repatriate sales proceeds of inherited Indian property to Ireland?",
    a: "Under RBI rules, an NRI or OCI can send up to 1,000,000 US Dollars per financial year back to Ireland from their Indian NRO bank account. You must get Form 15CB from an Indian Chartered Accountant. Then you upload Form 15CA on the tax portal and wire the Euros to your Irish bank.",
  },
  {
    q: "What is Section 72 relief under Irish tax law for Indian family properties?",
    a: "Section 72 allows parents to take an approved life insurance policy to pay inheritance tax. The money from this policy is 100% tax-free when used to pay Irish CAT on death. This prevents heirs from having to sell family lands in India to pay the tax bill.",
  },
];

export default function IrelandCatCheckerClient() {
  const router = useRouter();

  const handleStartConsultation = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    router.push("/services/nri-inherited-real-estate-repatriation-15ca-15cb");
  };

  const [activeId, setActiveId] = useState<string>("statutory-scope");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Interactive Calculator State
  const [relationshipGroup, setRelationshipGroup] = useState<"A" | "B" | "C">("A");
  const [propertyValueInrCrores, setPropertyValueInrCrores] = useState<number>(3.0);
  const [exchangeRateEurInr, setExchangeRateEurInr] = useState<number>(90.0);
  const [priorGiftsEur, setPriorGiftsEur] = useState<number>(0);
  const [yearsResidentInIreland, setYearsResidentInIreland] = useState<"under_5" | "5_or_more">("5_or_more");
  const [disponerResidence, setDisponerResidence] = useState<"india" | "ireland">("india");

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

  // Group Threshold Values (Budget 2024 updates)
  const thresholds: Record<"A" | "B" | "C", number> = {
    A: 400000, // Parent to Child
    B: 40000,  // Brother, Sister, Nephew, Niece, Grandchild
    C: 20000,  // Other relatives, non-relatives
  };

  const groupThreshold = thresholds[relationshipGroup];
  const propertyValueInr = propertyValueInrCrores * 10000000;
  const propertyValueEur = Math.round(propertyValueInr / exchangeRateEurInr);

  // Non-Domiciled 5-year tax shield logic under Section 11(5) CATCA 2003:
  const isTaxShieldActive = disponerResidence === "india" && yearsResidentInIreland === "under_5";

  const availableThreshold = Math.max(0, groupThreshold - priorGiftsEur);
  const taxableSurplusEur = isTaxShieldActive ? 0 : Math.max(0, propertyValueEur - availableThreshold);
  const estimatedCatLiabilityEur = Math.round(taxableSurplusEur * 0.33);
  const estimatedCatLiabilityInr = Math.round(estimatedCatLiabilityEur * exchangeRateEurInr);

  // 80% Threshold Filing Rule (Section 46 CATCA)
  const eightyPercentThreshold = groupThreshold * 0.8;
  const totalCumulativeBenefits = priorGiftsEur + (isTaxShieldActive ? 0 : propertyValueEur);
  const isIt38Mandatory = !isTaxShieldActive && totalCumulativeBenefits >= eightyPercentThreshold;

  const handleReset = () => {
    setRelationshipGroup("A");
    setPropertyValueInrCrores(3.0);
    setExchangeRateEurInr(90.0);
    setPriorGiftsEur(0);
    setYearsResidentInIreland("5_or_more");
    setDisponerResidence("india");
  };

  const copySummaryToClipboard = () => {
    const summaryText = `IRELAND NRI CAT INHERITANCE TAX ASSESSMENT SUMMARY
Generated via WillDrafting.in (https://www.willdrafting.in/tools/ireland-nri-cat-inheritance-tax-relief-checker)
--------------------------------------------------------------------------------
1. Beneficiary Relationship: Group ${relationshipGroup} (Statutory Threshold: €${groupThreshold.toLocaleString()})
2. Inherited Indian Asset Value: ₹${propertyValueInrCrores.toFixed(2)} Crore (~€${propertyValueEur.toLocaleString()} at €1 = ₹${exchangeRateEurInr})
3. Disponer Residence: ${disponerResidence === "india" ? "India (Non-Irish)" : "Ireland"}
4. Irish Tax Residency Duration: ${yearsResidentInIreland === "5_or_more" ? "5+ Consecutive Years (Worldwide CAT Scope Applies)" : "Under 5 Years (Non-Dom Tax Shield Eligible)"}
5. Available Net Threshold (after €${priorGiftsEur.toLocaleString()} prior gifts): €${availableThreshold.toLocaleString()}
6. Taxable Amount Over Threshold: €${taxableSurplusEur.toLocaleString()}
7. Estimated Irish CAT Liability (33% flat rate): €${estimatedCatLiabilityEur.toLocaleString()} (~₹${(estimatedCatLiabilityInr / 100000).toFixed(2)} Lakhs)
8. Form IT38 Revenue Filing Obligation: ${isIt38Mandatory ? "MANDATORY (Value exceeds 80% of Group Threshold under s. 46 CATCA)" : "Not required under current thresholds"}
9. RBI FEMA Repatriation Channel: Up to USD 1,000,000 per financial year via Form 15CA/15CB & NRO Account.
--------------------------------------------------------------------------------
Governing Authority: Capital Acquisitions Tax Consolidation Act 2003 (CATCA) & FEMA 1999`;
    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  const copyChecklistToClipboard = () => {
    const checklistText = `CROSS-BORDER CHECKLIST: IRISH CAT (FORM IT38) & FEMA 15CA/15CB
Compiled by WillDrafting.in
--------------------------------------------------------------------------------
STAGE 1: IRISH REVENUE (FORM IT38) COMPLIANCE
[ ] Proof of Valuation Date: Certified copy of Indian Grant of Probate or Legal Heir Mutation.
[ ] Registered Valuer Report: Government-approved property valuation in India converted to EUR via ECB reference rate.
[ ] Irish PPS Number: Beneficiary and deceased PPSN (or non-resident registration with Irish Revenue).
[ ] Historical Records: Summary of prior gifts received within Group A, B, or C since 5 Dec 1991.
[ ] Form IT38 Submission: Completed online return submitted via ROS or myAccount before 31 October.

STAGE 2: INDIAN SUCCESSION & REVENUE MUTATION
[ ] Registered Will Deed or Class I / Class II Legal Heir Certificate.
[ ] Revenue mutation extract (Patta / Khata / Jamabandi / 7-12) showing title in legal heir's name.
[ ] Encumbrance Certificate (30 years) from Indian Sub-Registrar Office.
[ ] Deceased PAN card deactivation / final legal representative ITR under Section 159.

STAGE 3: FEMA SALE REPATRIATION TO IRELAND
[ ] Form 13 Nil / Lower TDS Certificate under Section 197 to avoid 20% Section 195 withholding.
[ ] Registered Sale Deed executed in India through physical presence or registered Special Power of Attorney.
[ ] Deposit of net sale proceeds into Indian Non-Resident Ordinary (NRO) bank account.
[ ] Form 15CB: Audit certification signed by an Indian practicing Chartered Accountant.
[ ] Form 15CA: Electronic declaration uploaded to the Indian Income Tax e-filing portal.
[ ] Form A2 & Outward Remittance request submitted to Authorized Dealer Bank for transfer to Irish bank.`;
    navigator.clipboard.writeText(checklistText);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 3000);
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Brand Navy Background)
          ========================================================================= */}
      <section className="relative bg-[#172228] text-white pt-10 pb-16 sm:pt-14 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Statutory Authority Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold tracking-wider uppercase text-rose-200 mb-6">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>REVENUE COMMISSIONERS IRELAND • CATCA 2003 • FEMA 1999</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Irish CAT Inheritance Tax Checker for Indian Assets
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Check your 33% Capital Acquisitions Tax (CAT) on inherited Indian properties. Compute Budget
            2024 Group A thresholds, test the 5-year non-dom tax shield, and plan your RBI Form 15CA and
            15CB remittances.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Run CAT Tax Checker</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartConsultation}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Cross-Border 15CA/15CB Retainer</span>
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
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">€400,000</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                BUDGET 2024 GROUP A THRESHOLD
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">33% Flat CAT</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                TAX ON EXCESS INHERITANCE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">5-Year Rule</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                NON-DOMICILE RESIDENCY SHIELD
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">USD $1M / Year</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                FEMA NRO REMITTANCE LIMIT
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
                Governed under Capital Acquisitions Tax Consolidation Act 2003 (CATCA), Revenue Commissioners
                Guidelines, and RBI FEMA Regulations 2018.
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
                <span>EXECUTIVE BRIEF: IRISH CAT ON INHERITED INDIAN PROPERTY</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Top Cross-Border Misconception:</strong> India charges zero estate duty. But
                    Ireland taxes its residents on assets across the world. The flat tax rate is 33%.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Budget 2024 Threshold Hike:</strong> The Group A tax-free limit rose to{" "}
                    <strong>400,000 Euros</strong>. This gives children major tax relief when inheriting from
                    parents.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>5-Year Non-Dom Tax Shield:</strong> Indian citizens living in Ireland for under 5
                    years do not pay Irish CAT on Indian assets.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Mandatory Form IT38 Rule:</strong> You must file Form IT38 if the asset value
                    reaches 80% of your group limit. You must file even if you owe zero tax.
                  </span>
                </li>
              </ul>
            </div>

            {/* Visual Topic Banner */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
              <Image
                src="/images/ireland-nri-cat-inheritance-tax-relief-checker.jpg"
                alt="Ireland NRI Capital Acquisitions Tax Inheritance Checker on Indian Property"
                width={1200}
                height={675}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 text-center font-medium">
                Cross-border succession assessment for Indian NRIs in Ireland: Irish CATCA 2003 rules and FEMA 1999 remittances.
              </div>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION (STRICTLY THE ONLY H2 ON THE PAGE) */}
            <section id="statutory-scope" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>LEGAL FRAMEWORK</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Statutory Scope: Irish CAT on Inherited Indian Assets
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Ireland charges Capital Acquisitions Tax (CAT) on gifts and inheritances. Under the CAT Act 2003,
                  the tax is paid by the person who receives the asset. The deceased person&rsquo;s estate in India does
                  not pay this tax.
                </p>
                <p>
                  <strong>When does Ireland tax foreign properties?</strong> Under Section 11 and Section 13 of the
                  CAT Act, Irish tax applies to assets outside Ireland if either test is met:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-3">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white">
                    <div className="font-bold text-xs uppercase tracking-wider text-[#C65378] mb-1">
                      Test 1: Disponer Test
                    </div>
                    <p className="text-xs text-slate-600">
                      The person who died lived in Ireland as a tax resident on the date of death.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-white">
                    <div className="font-bold text-xs uppercase tracking-wider text-[#C65378] mb-1">
                      Test 2: Beneficiary Test
                    </div>
                    <p className="text-xs text-slate-600">
                      The heir who gets the asset lives in Ireland as a tax resident on the Valuation Date.
                    </p>
                  </div>
                </div>
                <p>
                  Most Indian tech professionals in Dublin or Cork meet Test 2. If you have lived in Ireland for more
                  than 5 years, you must pay 33% tax on any value above your tax-free limit.
                </p>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR TOOL */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE TAX CALCULATOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Free Irish CAT &amp; Repatriation Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your relationship, asset value in India, and time in Ireland. Calculate your exact tax-free limit,
                33% tax bill, and Form IT38 filing rules.
              </p>

              {/* Calculator Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Step 1: Relationship Group Selection */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#C65378]" />
                      <span>Step 1: Your Relationship to the Deceased Person</span>
                    </span>
                    <span className="text-[11px] text-[#C65378] font-bold">
                      Limit: €{groupThreshold.toLocaleString()}
                    </span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        group: "A",
                        title: "Group A: Child / Son / Daughter",
                        desc: "Child from parent. Includes adopted child or minor child of a deceased child.",
                        threshold: "€400,000",
                      },
                      {
                        group: "B",
                        title: "Group B: Sibling / Niece / Grandchild",
                        desc: "Brother, sister, nephew, niece, grandchild, great-grandchild, or parent.",
                        threshold: "€40,000",
                      },
                      {
                        group: "C",
                        title: "Group C: Cousin / In-law / Other",
                        desc: "Cousins, relatives by marriage, friends, or unrelated third parties.",
                        threshold: "€20,000",
                      },
                    ].map((item) => (
                      <button
                        key={item.group}
                        type="button"
                        onClick={() => setRelationshipGroup(item.group as any)}
                        className={`text-left p-4 rounded-2xl border transition-all ${
                          relationshipGroup === item.group
                            ? "border-[#C65378] bg-rose-50/50 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-slate-900">{item.title}</span>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#172228] text-white">
                            {item.threshold}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Property Value & Exchange Rate */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#C65378]" />
                        <span>Inherited Property Value (INR Crores)</span>
                      </span>
                      <span className="text-[11px] text-slate-500">
                        ₹{(propertyValueInrCrores * 100).toFixed(0)} Lakhs
                      </span>
                    </label>
                    <input
                      type="number"
                      min={0.1}
                      max={50}
                      step={0.1}
                      value={propertyValueInrCrores}
                      onChange={(e) => setPropertyValueInrCrores(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#C65378]"
                    />
                    {/* Quick Presets */}
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] text-slate-500 font-semibold">Presets:</span>
                      {[1.0, 2.0, 3.5, 5.0].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setPropertyValueInrCrores(preset)}
                          className={`text-[10px] font-bold px-2 py-1 rounded-md border ${
                            propertyValueInrCrores === preset
                              ? "bg-[#C65378] text-white border-[#C65378]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          ₹{preset} Cr
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-[#C65378]" />
                        <span>EUR / INR Exchange Rate</span>
                      </span>
                      <span className="text-[11px] text-slate-500">ECB Rate</span>
                    </label>
                    <input
                      type="number"
                      min={60}
                      max={120}
                      step={0.5}
                      value={exchangeRateEurInr}
                      onChange={(e) => setExchangeRateEurInr(parseFloat(e.target.value) || 90)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#C65378]"
                    />
                    <p className="text-[11px] text-slate-500">
                      Converted Value: <strong>€{propertyValueEur.toLocaleString()}</strong>
                    </p>
                  </div>
                </div>

                {/* Step 3: Residency & Prior Gifts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 border-t border-slate-100">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-[#C65378]" />
                      <span>Heir Irish Residence</span>
                    </label>
                    <select
                      value={yearsResidentInIreland}
                      onChange={(e) => setYearsResidentInIreland(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#C65378]"
                    >
                      <option value="5_or_more">5+ Years (Full Irish Tax Scope)</option>
                      <option value="under_5">Under 5 Years (Non-Dom Shield)</option>
                    </select>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      Section 11(5): Expats in Ireland under 5 years pay zero tax on foreign inheritances.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Landmark className="w-4 h-4 text-[#C65378]" />
                      <span>Deceased Person (Disponer)</span>
                    </label>
                    <select
                      value={disponerResidence}
                      onChange={(e) => setDisponerResidence(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#C65378]"
                    >
                      <option value="india">Resident in India (Passed away in India)</option>
                      <option value="ireland">Resident in Ireland (Irish Disponer)</option>
                    </select>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      Disponer residency governs CAT liability regardless of heir location.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <History className="w-4 h-4 text-[#C65378]" />
                        <span>Prior Gifts in Group (€)</span>
                      </span>
                    </label>
                    <input
                      type="number"
                      min={0}
                      step={5000}
                      value={priorGiftsEur}
                      onChange={(e) => setPriorGiftsEur(parseFloat(e.target.value) || 0)}
                      placeholder="e.g. 0"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#C65378]"
                    />
                    <p className="text-[10px] text-slate-500 leading-tight">
                      Lifetime gifts received in this group since 5 December 1991.
                    </p>
                  </div>
                </div>

                {/* Calculation Results Card */}
                <div className="rounded-2xl border border-slate-200 bg-[#FAF7F0] p-5 sm:p-6 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80">
                    <div>
                      <div className="text-[11px] font-black uppercase tracking-wider text-[#C65378]">
                        DIAGNOSTIC CAT ASSESSMENT RESULT
                      </div>
                      <div className="text-lg sm:text-xl font-extrabold text-[#172228] mt-0.5">
                        {isTaxShieldActive
                          ? "100% Tax-Exempt Under 5-Year Non-Dom Shield"
                          : taxableSurplusEur === 0
                          ? "€0 Tax Due (Within Tax-Free Group Threshold)"
                          : `Estimated Irish CAT: €${estimatedCatLiabilityEur.toLocaleString()}`}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={copySummaryToClipboard}
                        type="button"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
                      >
                        {copiedSummary ? (
                          <>
                            <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-500" />
                            <span>Copy Summary</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleReset}
                        type="button"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-semibold"
                        title="Reset inputs"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Reset</span>
                      </button>
                    </div>
                  </div>

                  {/* Summary Metric Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                      <div className="text-[10px] uppercase font-bold text-slate-500">Asset Value (EUR)</div>
                      <div className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">
                        €{propertyValueEur.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-500">₹{propertyValueInrCrores} Crore</div>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                      <div className="text-[10px] uppercase font-bold text-slate-500">Group {relationshipGroup} Free Limit</div>
                      <div className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">
                        €{availableThreshold.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-500">Net remaining</div>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                      <div className="text-[10px] uppercase font-bold text-slate-500">Taxable Surplus</div>
                      <div className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">
                        €{taxableSurplusEur.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-500">Subject to 33% rate</div>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-[#C65378]/30">
                      <div className="text-[10px] uppercase font-bold text-[#C65378]">Irish CAT (33%)</div>
                      <div className="text-sm sm:text-base font-extrabold text-[#C65378] mt-0.5">
                        €{estimatedCatLiabilityEur.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-500">~₹{(estimatedCatLiabilityInr / 100000).toFixed(1)} Lakhs</div>
                    </div>
                  </div>

                  {/* Non-dom Tax Shield Notification */}
                  {isTaxShieldActive && (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                      <div className="flex items-center gap-2 font-bold text-emerald-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Statutory Tax Shield Active (CATCA 2003 s. 11(5))</span>
                      </div>
                      <p className="leading-relaxed">
                        You have lived in Ireland for <strong>under 5 years</strong>. You are non-domiciled. The deceased lived
                        in India. Under Section 11(5), this inheritance is <strong>outside Irish CAT</strong>. You owe zero tax.
                      </p>
                    </div>
                  )}

                  {/* Form IT38 Mandatory Filing Alert */}
                  {isIt38Mandatory && (
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 space-y-1">
                      <div className="flex items-center gap-2 font-bold text-amber-800">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Mandatory Form IT38 Filing Required (80% Rule)</span>
                      </div>
                      <p className="leading-relaxed">
                        Your total gifts in Group {relationshipGroup} exceed 80% of your limit (€{eightyPercentThreshold.toLocaleString()}).
                        Even if your net tax is zero, you must file Form IT38 online via ROS by <strong>31 October</strong>.
                        Late filing leads to a 10% penalty.
                      </p>
                    </div>
                  )}

                  {/* Action Recommendation */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 space-y-1.5">
                    <div className="font-bold text-slate-900">Recommended Next Steps for Your Indian Estate:</div>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      <li>Get a valuation report from a registered valuer in India.</li>
                      <li>Convert the value to Euros using the ECB exchange rate on your valuation date.</li>
                      <li>
                        To send funds to Ireland, use the RBI 1,000,000 USD route with Form 15CA and Form 15CB to avoid 20% TDS.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: BUDGET 2024 THRESHOLDS */}
            <section id="budget-2024-thresholds" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>STATUTORY REFORM</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Budget 2024 Thresholds: Group A, B and C Rules
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In Budget 2024, Ireland increased its tax-free limits. For gifts and inheritances taken on or after{" "}
                  <strong>2 October 2024</strong>, the new limits are:
                </p>

                {/* Comparative Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-[#172228] font-bold">
                      <tr>
                        <th className="py-3 px-4">CAT Group</th>
                        <th className="py-3 px-4">Relationship to Deceased</th>
                        <th className="py-3 px-4">Old Limit</th>
                        <th className="py-3 px-4 text-[#C65378]">New Limit (Oct 2024)</th>
                        <th className="py-3 px-4">Tax on Excess</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">Group A</td>
                        <td className="py-3 px-4">Child (Son, Daughter, Foster Child)</td>
                        <td className="py-3 px-4">€335,000</td>
                        <td className="py-3 px-4 font-extrabold text-emerald-700 bg-emerald-50/50">€400,000</td>
                        <td className="py-3 px-4 font-semibold">33%</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">Group B</td>
                        <td className="py-3 px-4">Sibling, Niece, Nephew, Grandchild</td>
                        <td className="py-3 px-4">€32,500</td>
                        <td className="py-3 px-4 font-extrabold text-emerald-700 bg-emerald-50/50">€40,000</td>
                        <td className="py-3 px-4 font-semibold">33%</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">Group C</td>
                        <td className="py-3 px-4">Cousin, In-Law, Non-Relative, Friend</td>
                        <td className="py-3 px-4">€16,250</td>
                        <td className="py-3 px-4 font-extrabold text-emerald-700 bg-emerald-50/50">€20,000</td>
                        <td className="py-3 px-4 font-semibold">33%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p>
                  <strong>Lifetime Rule:</strong> These limits are lifetime amounts. All gifts you receive in the same group
                  since <strong>5 December 1991</strong> count together. Once your limit is used up, any future gift or
                  inheritance is taxed at 33%.
                </p>
              </div>
            </section>

            {/* SECTION 4: 5-YEAR NON-DOM TAX SHIELD */}
            <section id="five-year-non-dom-rule" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ShieldCheck className="w-4 h-4" />
                <span>EXPAT TAX SHIELD</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. The 5-Year Non-Dom Tax Shield Rule for Expats
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Indian workers in Dublin, Cork, or Galway can use the <strong>5-year non-dom rule</strong> under Section
                  11(5) of the CAT Act.
                </p>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="text-xs font-bold text-[#C65378] uppercase tracking-wider">
                    Statutory Rule Under CATCA 2003 s. 11(5)
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    A foreign citizen who is not domiciled in Ireland is not taxed on foreign assets until they have been an
                    Irish tax resident for <strong>five tax years in a row</strong>.
                  </p>
                </div>
                <p>
                  <strong>How it works:</strong> Suppose you moved from Bengaluru to Dublin three years ago on Stamp 1 or Stamp
                  4. If your parents in India leave you a home today, you pay <strong>zero Irish tax</strong>. Ireland only
                  taxes your Indian inheritance after you pass five years of living in Ireland.
                </p>
              </div>
            </section>

            {/* SECTION 5: SECTION 72 & DTAA */}
            <section id="section-72-and-dtaa" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>DOUBLE TAXATION &amp; RELIEF</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Section 72 Insurance &amp; Double Taxation Relief
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Many NRIs ask if the India-Ireland tax treaty protects them from double taxation.
                </p>
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-1.5">
                  <div className="font-bold flex items-center gap-2 text-amber-900">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    <span>No Indian Inheritance Tax to Credit</span>
                  </div>
                  <p className="leading-relaxed">
                    India ended Estate Duty in 1985. You pay zero inheritance tax in India. Because you pay nothing in India,
                    there is no Indian tax to offset Irish CAT.
                  </p>
                </div>
                <p>
                  <strong>What if you sell the property?</strong> If you sell the inherited house, you pay capital gains tax in
                  India. You can credit that Indian tax against Irish Capital Gains Tax under Article 13 of the treaty.
                </p>
                <p>
                  <strong>Section 72 Life Insurance:</strong> To protect family land from being sold to pay Irish tax, parents
                  can buy a Section 72 life policy. Under Irish law, money from this policy is 100% tax-free when used to pay
                  CAT on death.
                </p>
              </div>
            </section>

            {/* SECTION 6: IT38 REPORTING STEPPER */}
            <section id="it38-reporting-stepper" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calendar className="w-4 h-4" />
                <span>REPORTING COMPLIANCE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Form IT38 Filing Stepper: 31 October Deadline
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Filing Form IT38 with Irish Revenue has strict deadlines. Follow these four steps:
                </p>

                {/* 4-Step Stepper Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-[#172228] text-white text-xs font-bold flex items-center justify-center">
                        1
                      </span>
                      <span className="text-[10px] font-bold uppercase text-[#C65378]">VALUATION DATE</span>
                    </div>
                    <div className="font-bold text-sm text-slate-900">Find the Valuation Date</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      This is the date when probate is granted in India, or when the land is transferred to your name.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-[#172228] text-white text-xs font-bold flex items-center justify-center">
                        2
                      </span>
                      <span className="text-[10px] font-bold uppercase text-[#C65378]">80% RULE CHECK</span>
                    </div>
                    <div className="font-bold text-sm text-slate-900">Check the 80% Rule</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      If the value is at least 80% of your group limit (€320k for Group A), you must file Form IT38 even if you
                      owe zero tax.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-[#172228] text-white text-xs font-bold flex items-center justify-center">
                        3
                      </span>
                      <span className="text-[10px] font-bold uppercase text-[#C65378]">VALUATION REPORT</span>
                    </div>
                    <div className="font-bold text-sm text-slate-900">Convert INR to Euro</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Get a property valuation report from a registered valuer in India. Convert the amount to Euro using the
                      ECB rate on your valuation date.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-[#C65378] text-white text-xs font-bold flex items-center justify-center">
                        4
                      </span>
                      <span className="text-[10px] font-bold uppercase text-[#C65378]">ONLINE FILING</span>
                    </div>
                    <div className="font-bold text-sm text-slate-900">File by 31 October via ROS</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Submit Form IT38 online through Revenue Online Service (ROS). Pay any tax due before 31 October.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: FEMA REPATRIATION BOX */}
            <section id="fema-repatriation-box" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Send className="w-4 h-4" />
                <span>CROSS-BORDER REMITTANCE</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. FEMA USD 1 Million Repatriation via 15CA and 15CB
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When you sell inherited land in India, moving the funds to an Irish bank is governed by RBI rules under FEMA
                  1999.
                </p>

                {/* FEMA Repatriation Box */}
                <div className="rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-50/60 to-white p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-emerald-600" />
                      <span>RBI 1 MILLION USD ANNUAL REMITTANCE LIMIT</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                      LIMIT: $1,000,000 USD / YEAR
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Under RBI regulations, an NRI or OCI who inherits land or flats in India can send up to{" "}
                    <strong>1,000,000 US Dollars per financial year</strong> from their Indian NRO bank account to Ireland.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white border border-emerald-200">
                      <div className="font-bold text-slate-900 mb-1">Step 1: Form 13 Nil TDS</div>
                      <p className="text-slate-600">
                        Apply for Form 13 online before the sale to avoid a 20% TDS deduction by the buyer under Section 195.
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-emerald-200">
                      <div className="font-bold text-slate-900 mb-1">Step 2: CA Form 15CB</div>
                      <p className="text-slate-600">
                        An Indian Chartered Accountant checks capital gains and signs Form 15CB confirming all taxes are paid.
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-emerald-200">
                      <div className="font-bold text-slate-900 mb-1">Step 3: Online Form 15CA</div>
                      <p className="text-slate-600">
                        Upload Form 15CA to the tax website. Submit Form A2 to your bank to wire the Euros to Ireland.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between">
                    <span>Covers inherited family houses, flats, and farm lands.</span>
                    <Link
                      href="/services/nri-inherited-real-estate-repatriation-15ca-15cb"
                      className="font-bold text-[#C65378] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Explore 15CA/15CB Retainer Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: TAX COMPARISON MATRIX */}
            <section id="tax-comparison-matrix" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>TAX COMPARISON</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Tax Comparison: Irish CAT vs Indian Capital Gains
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Taxes happen at two stages: when you inherit the property, and when you later sell it.
                </p>

                {/* Comparison Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#172228] text-white font-bold">
                      <tr>
                        <th className="py-3 px-4">Event</th>
                        <th className="py-3 px-4">Tax in India</th>
                        <th className="py-3 px-4">Tax in Ireland</th>
                        <th className="py-3 px-4">Double Tax Relief</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">Inheriting on Death</td>
                        <td className="py-3 px-4">
                          <span className="font-extrabold text-emerald-700">0% (Nil)</span>
                          <div className="text-[11px] text-slate-500">Section 56 exempts inheritance</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-[#C65378]">33% CAT</span>
                          <div className="text-[11px] text-slate-500">On value above group limit</div>
                        </td>
                        <td className="py-3 px-4 text-slate-600">None (India has no estate duty)</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">Selling the Property</td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-slate-900">12.5% / 20% Tax</span>
                          <div className="text-[11px] text-slate-500">Capital gains tax in India</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-slate-900">33% Irish CGT</span>
                          <div className="text-[11px] text-slate-500">Cost base is value on death</div>
                        </td>
                        <td className="py-3 px-4 text-emerald-700 font-bold">
                          Treaty Art. 13 allows Indian tax credit against Irish CGT
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-900">Rent from Property</td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-slate-900">Indian Tax Slabs</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-slate-900">Irish Income Tax</span>
                        </td>
                        <td className="py-3 px-4 text-emerald-700 font-bold">
                          Treaty Art. 6 credit avoids double tax on rental income
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* SECTION 9: REAL WORLD CASE STUDIES */}
            <section id="real-world-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>CROSS-BORDER SCENARIOS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Real-World NRI Scenarios: Dublin, Cork and Galway
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                {/* Case 1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-rose-50 text-[#C65378]">
                      SCENARIO 1: DUBLIN TECH WORKER (STAMP 4)
                    </span>
                    <span className="text-xs font-extrabold text-slate-900">₹3.50 Crore Villa in Bengaluru</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <strong>Facts:</strong> An engineer living in Dublin for 7 years inherited a villa worth ₹3.50 Crore
                    (~€388,888) from his father in Bengaluru. He had received no earlier gifts since 1991.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Outcome:</strong> Because he lived in Ireland for over 5 years, Irish tax rules apply. But his
                    inheritance (€388,888) is under the Budget 2024 Group A limit of €400,000. He owes <strong>zero tax</strong>.
                    However, because the value is over 80% of his limit (€320,000), he must file Form IT38 online by 31 October.
                  </p>
                </div>

                {/* Case 2 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-rose-50 text-[#C65378]">
                      SCENARIO 2: CORK DOCTOR (IRISH RESIDENT)
                    </span>
                    <span className="text-xs font-extrabold text-slate-900">₹90 Lakh Flat in Hyderabad</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <strong>Facts:</strong> A doctor in Cork inherited a commercial flat worth ₹90 Lakhs (~€100,000) from an
                    uncle in Hyderabad.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Outcome:</strong> Uncles fall in Group B with a €40,000 limit. The excess is €60,000. At 33% tax,
                    he owes <strong>€19,800</strong> to Irish Revenue. He must file Form IT38 and pay by 31 October.
                  </p>
                </div>

                {/* Case 3 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800">
                      SCENARIO 3: GALWAY RESIDENT (3 YEARS IN IRELAND)
                    </span>
                    <span className="text-xs font-extrabold text-slate-900">₹2.0 Crore Flat in Pune</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <strong>Facts:</strong> A professional in Galway has lived in Ireland for three years on Stamp 4. She
                    inherited a flat in Pune from her mother.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Outcome:</strong> Under Section 11(5), non-domiciled expats living in Ireland for under 5 years are
                    exempt from tax on foreign assets. She owes <strong>zero Irish tax</strong> and does not need to file Form IT38.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: STEP-BY-STEP SOP */}
            <section id="cross-border-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <GitBranch className="w-4 h-4" />
                <span>CHRONOLOGICAL ACTION PLAN</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Step-by-Step SOP: Cross-Border Inheritance Flow
              </h3>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Follow this clear six-phase plan to handle your Indian estate and Irish tax filing safely:
                </p>

                <div className="space-y-3">
                  {[
                    {
                      phase: "Phase 1: Update Land Records in India",
                      text: "Submit the Will or apply for a Legal Heir Certificate at the local Tehsil office. Update the Patta or Khata into your name.",
                    },
                    {
                      phase: "Phase 2: Get a Valuation Report",
                      text: "Hire a government-registered valuer in India to value the land on your valuation date.",
                    },
                    {
                      phase: "Phase 3: File Form IT38 with Irish Revenue",
                      text: "Convert the value to Euros with ECB rates. File Form IT38 on the ROS portal before 31 October.",
                    },
                    {
                      phase: "Phase 4: Apply for Form 13 Lower TDS",
                      text: "Before selling the property, apply for Form 13 online. This stops the buyer from taking 20% TDS under Section 195.",
                    },
                    {
                      phase: "Phase 5: Obtain CA Certificate Form 15CB",
                      text: "Have an Indian Chartered Accountant check capital gains tax and sign Form 15CB.",
                    },
                    {
                      phase: "Phase 6: Upload Form 15CA and Wire Funds",
                      text: "Submit Form 15CA on the tax portal. Instruct your bank to wire the Euros to your bank in Ireland.",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200/90 flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-[#172228] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="font-extrabold text-xs sm:text-sm text-slate-900">{item.phase}</div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 11: DOCUMENT CHECKLIST */}
            <section id="document-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>STATUTORY COMPLIANCE CHECKLIST</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Form IT38 &amp; FEMA 15CA/15CB Document Checklist
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Keep these key papers ready for Irish Revenue and your Indian bank:
                </p>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#172228]">
                      MANDATORY DOCUMENTS LIST
                    </span>
                    <button
                      onClick={copyChecklistToClipboard}
                      type="button"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-[#C65378] text-xs font-bold hover:bg-rose-100 transition-colors"
                    >
                      {copiedChecklist ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied Checklist</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Full Checklist</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
                    <div className="space-y-2">
                      <div className="font-bold text-[#C65378] uppercase text-[11px]">Irish Revenue (Form IT38) Papers</div>
                      <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                        <li>Irish PPS Number for you and the deceased</li>
                        <li>Certified copy of the Indian Will or Heir Certificate</li>
                        <li>Valuer report showing property market value</li>
                        <li>ECB exchange rate on the valuation date</li>
                        <li>Records of prior gifts in the same group since 1991</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <div className="font-bold text-[#C65378] uppercase text-[11px]">RBI / FEMA Remittance Papers</div>
                      <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                        <li>Registered Sale Deed and updated land record</li>
                        <li>Chartered Accountant signed Form 15CB certificate</li>
                        <li>Form 15CA acknowledgment from tax portal</li>
                        <li>Form A2 application for foreign remittance</li>
                        <li>Active NRO bank account in India</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQS ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: Irish NRI CAT Relief
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Plain English answers to common tax and inheritance questions for Indian families living in Ireland.
              </p>

              <div className="space-y-3 pt-2">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-2xs"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full py-4 px-5 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                            isOpen ? "rotate-180 text-[#C65378]" : ""
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

            {/* SECTION 13: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>LEGAL CITATIONS &amp; OFFICIAL PORTALS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Statutory Citations &amp; Official Tax Portals
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <a
                  href="https://www.revenue.ie/en/gains-gifts-and-inheritance/gift-and-inheritance-tax-cat/index.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors flex items-start justify-between group"
                >
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Revenue Commissioners Ireland
                    </div>
                    <p className="text-slate-500 mt-0.5">Capital Acquisitions Tax (CAT) Consolidation Act 2003</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#C65378] shrink-0" />
                </a>

                <a
                  href="https://www.incometax.gov.in/iec/foportal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors flex items-start justify-between group"
                >
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Income Tax Department of India
                    </div>
                    <p className="text-slate-500 mt-0.5">Form 15CA &amp; Form 13 Lower Deduction Portal</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#C65378] shrink-0" />
                </a>

                <a
                  href="https://www.rbi.org.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors flex items-start justify-between group"
                >
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Reserve Bank of India (RBI)
                    </div>
                    <p className="text-slate-500 mt-0.5">FEMA 1999 &amp; Notification FEMA 21(R)/2018-RB Guidelines</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#C65378] shrink-0" />
                </a>

                <a
                  href="https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors flex items-start justify-between group"
                >
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-[#C65378] transition-colors">
                      European Central Bank (ECB)
                    </div>
                    <p className="text-slate-500 mt-0.5">Euro Reference Exchange Rates (EUR/INR conversion)</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#C65378] shrink-0" />
                </a>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY ADVISORY SIDEBAR
              ===================================================================== */}
          <aside className="sticky top-24 hidden lg:block space-y-5">
            {/* Quick Summary Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>QUICK ESTIMATE SUMMARY</span>
              </div>

              <div className="space-y-2 text-xs border-y border-slate-100 py-3">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Selected Group:</span>
                  <span className="font-bold text-slate-900">Group {relationshipGroup}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Free Allowance:</span>
                  <span className="font-bold text-slate-900">€{groupThreshold.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Inheritance Value:</span>
                  <span className="font-bold text-slate-900">€{propertyValueEur.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Tax Status:</span>
                  <span className="font-bold text-[#C65378]">
                    {isTaxShieldActive ? "Exempt (Non-Dom)" : `€${estimatedCatLiabilityEur.toLocaleString()} Tax`}
                  </span>
                </div>
              </div>

              <a
                href="#interactive-calculator"
                className="w-full py-2.5 px-4 rounded-xl bg-[#172228] hover:bg-slate-800 text-white font-bold text-xs text-center block transition-colors"
              >
                Adjust Values in Calculator
              </a>
            </div>

            {/* Dedicated Service Retainer Card */}
            <div className="rounded-2xl bg-gradient-to-br from-[#172228] to-slate-900 text-white p-5 space-y-4 shadow-md">
              <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-rose-300">
                <Sparkles className="w-4 h-4 text-[#C65378]" />
                <span>CROSS-BORDER RETAINER</span>
              </div>
              <h4 className="text-base font-extrabold leading-snug">
                Inherited Real Estate Sale &amp; 15CA/15CB Repatriation
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Complete end-to-end legal support for NRIs in Ireland: Indian mutation, Form 13 Lower TDS exemption, CA
                Form 15CB certification, and Irish Revenue disclosure advisory.
              </p>
              <Link
                href="/services/nri-inherited-real-estate-repatriation-15ca-15cb"
                className="w-full py-2.5 px-4 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white font-bold text-xs text-center inline-flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Retain Cross-Border Team</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Contact Consultation Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <HelpCircle className="w-4 h-4 text-[#5F7E75]" />
                <span>Need Custom Legal Opinion?</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Consult with our senior cross-border advocates and chartered tax advisors on ancestral property sales,
                probate in India, and Irish CAT compliance.
              </p>
              <Link
                href="/contact"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#172228] font-bold text-xs text-center block transition-colors"
              >
                Schedule Consultation
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>WillDrafting &amp; AMA Legal</span>
              </div>
              <p className="leading-snug">
                Specialized cross-border succession desk serving NRIs across Dublin, Cork, Galway, Limerick, and London.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
